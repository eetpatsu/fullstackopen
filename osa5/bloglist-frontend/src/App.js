import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationStyle, setNotificationStyle] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs(blogs.sort((a, b) => b.likes - a.likes))
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({ username, password, })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('wrong username or password')
      setNotificationStyle('error')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const getBlogs = async () => {
    const newBlogs = await blogService.getAll()
    setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      blogFormRef.current.toggleVisibility()
      getBlogs()
      setNotificationMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setNotificationStyle('success')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setNotificationMessage('a title and author are required')
      setNotificationStyle('error')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject)
      setBlogs(blogs.map(blog => blog.id !== blogObject.id ? blog : updatedBlog))
      getBlogs()
      setNotificationMessage(`liked blog ${blogObject.title} by ${blogObject.author}`)
      setNotificationStyle('success')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setNotificationMessage(`failed to like blog ${blogObject.title}`)
      setNotificationStyle('error')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const removeBlog = async (blogObject) => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
      try {
        await blogService.remove(blogObject)
        blogs.filter(blog => blog.id !== blogObject.id)
        getBlogs()
        setNotificationMessage(`removed blog ${blogObject.title} by ${blogObject.author}`)
        setNotificationStyle('success')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      } catch (exception) {
        console.log(exception)
        setNotificationMessage(`failed to remove blog ${blogObject.title}`)
        setNotificationStyle('error')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      }
    }
  }

  if (user === null) {
    return (
      <>
        <Notification style={notificationStyle} message={notificationMessage} />
        <h1>Bloglist</h1>
        <Togglable buttonLabel='log in'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
        </Togglable>
      </>
    )
  }

  return (
    <>
      <h2>blogs</h2>
      <Notification style={notificationStyle} message={notificationMessage} />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} user={user} />
      )}
    </>
  )
}

export default App