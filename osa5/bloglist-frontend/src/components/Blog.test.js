/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com',
  likes: 7,
  user: {
    username: 'john',
    name: 'John Doe'
  }
}

const bloglist_user = {
  username: 'john',
  name: 'John Doe',
  password: 'secret'
}

const mockHandler1 = jest.fn()
const mockHandler2 = jest.fn()

test('<Blog /> renders title', () => {
  render(<Blog key={blog.id} blog={blog} updateBlog={mockHandler1} removeBlog={mockHandler2} user={bloglist_user} />)

  const title = screen.getByText('React patterns', { exact: false })
  const author = screen.getByText('Michael Chan', { exact: false })
  
  expect(title).toBeDefined()
  expect(author).toBeDefined()
})

test('<Blog /> renders url, likes and user when button is clicked', async () => {
  render(<Blog key={blog.id} blog={blog} updateBlog={mockHandler1} removeBlog={mockHandler2} user={bloglist_user} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const url = screen.getByText('https://reactpatterns.com', { exact: false })
  const likes = screen.getByText('7', { exact: false })
  const name = screen.getByText('John Doe', { exact: false })
  
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
  expect(name).toBeDefined()
})

test('<Blog /> calls the event handler of the like button twice if clicked twice', async () => {
  render(<Blog key={blog.id} blog={blog} updateBlog={mockHandler1} removeBlog={mockHandler2} user={bloglist_user} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler1.mock.calls).toHaveLength(2)
})