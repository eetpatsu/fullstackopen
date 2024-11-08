import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input id="title" value={newTitle} onChange={event => setTitle(event.target.value)} placeholder='write blog title here' />
        </div>
        <div>
          author:
          <input id="author" value={newAuthor} onChange={event => setAuthor(event.target.value)} placeholder='write blog author here' />
        </div>
        <div>
          url:
          <input id="url" value={newUrl} onChange={event => setUrl(event.target.value)} placeholder='write blog url here' />
        </div>
        <button id="create-button" type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm