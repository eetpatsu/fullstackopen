/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

const mockHandler = jest.fn()

test('<BlogForm /> calls the event handler with the right details when a blog is created', async () => {
  render(<BlogForm createBlog={mockHandler} />)

  const titleInput = screen.getByPlaceholderText('write blog title here')
  const authorInput = screen.getByPlaceholderText('write blog author here')
  const urlInput = screen.getByPlaceholderText('write blog url here')
  const sendButton = screen.getByText('create')

  const user = userEvent.setup()
  await user.type(titleInput, 'testing a form...' )
  await user.type(authorInput, 'tester' )
  await user.type(urlInput, 'http://localhost:3000/' )
  await user.click(sendButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('testing a form...' )
  expect(mockHandler.mock.calls[0][0].author).toBe('tester' )
  expect(mockHandler.mock.calls[0][0].url).toBe('http://localhost:3000/' )
})