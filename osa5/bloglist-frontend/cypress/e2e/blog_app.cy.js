Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { title, author, url },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})

describe('Blog app ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'John Doe',
      username: 'john',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Bloglist')
    cy.contains('log in').click()
    cy.contains('login')
    cy.contains('cancel')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('john')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
      cy.contains('John Doe logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('john')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain','wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'font-size', '20px')
        .and('have.css', 'border-style', 'solid')
        .and('have.css', 'border-radius', '5px')
        .and('have.css', 'padding', '10px')
        .and('have.css', 'margin-bottom', '10px')
      cy.get('html').should('not.contain', 'John Doe logged in')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.visit('http://localhost:3000')
        cy.contains('log in').click()
        cy.get('#username').type('john')
        cy.get('#password').type('secret')
        cy.get('#login-button').click()
        cy.contains('John Doe logged in')
      })
  
      it('A blog can be created', function() {
        cy.contains('new blog').click()
        cy.get('#title').type('a blog created by cypress')
        cy.get('#author').type('Cypress')
        cy.get('#url').type('cypress.io')
        cy.get('#create-button').click()
        cy.contains('a blog created by cypress Cypress')
      })

      describe('and a blog exists', function () {
        beforeEach(function () {
          cy.contains('new blog').click()
          cy.get('#title').type('another blog')
          cy.get('#author').type('Cypress')
          cy.get('#url').type('cypress.io')
          cy.get('#create-button').click()
          cy.contains('another blog Cypress')
        })
  
        it('it can be liked', function () {
          cy.contains('another blog Cypress')
            .contains('view').click()
          cy.contains('likes: 0')
          cy.contains('like').click()
          cy.contains('likes: 1')
        })

        it('it can be removed', function () {
          cy.contains('another blog Cypress')
            .contains('view').click()
          cy.contains('remove').click()
          cy.should('not.contain', 'another blog Cypress')
        })

        it('it can only be removed by the user that created it', function () {
          const anotherUser = {
            name: 'Matti Meikäläinen',
            username: 'matti',
            password: 'salainen'
          }
          cy.request('POST', 'http://localhost:3003/api/users/', anotherUser)

          cy.contains('logout').click()
          cy.login({ username: 'matti', password: 'salainen' })

          cy.contains('another blog Cypress')
            .contains('view').click()
          cy.should('not.contain', 'remove')
        })
      })

      describe('and several blogs exist', function () {
        beforeEach(function () {
          cy.createBlog({ title: 'The title with the second most likes', author: 'Cypress', url: 'cypress.io' })
          cy.createBlog({ title: 'The title with the most likes', author: 'Cypress', url: 'cypress.io' })
        })

        it('they are ordered by amount of likes from top to bottom', function () {
          cy.get('.blog').eq(0).should('contain', 'The title with the second most likes')
          cy.get('.blog').eq(1).should('contain', 'The title with the most likes')

          cy.get('.blog').eq(1)
            .contains('view').click()
          cy.get('.blog').eq(1)
            .contains('likes: 0')
            .contains('like').click()
          cy.get('.blog').eq(1)
            .contains('likes: 1')
          
          cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
          cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
        })
      })
    })
  })
})