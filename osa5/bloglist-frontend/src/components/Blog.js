import { useState } from 'react'

import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    const updateableBlog = (
      { ...blog, likes: blog.likes + 1 }
    )
    updateBlog(updateableBlog)
  }

  const handleRemove = () => {
    removeBlog(blog)
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const showBlog = () => {
    return (
      <div>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          <li><a href={blog.url}>{blog.url}</a></li>
          <li>likes: {blog.likes} <button onClick={handleLike}>like</button></li>
          <li>{blog.user.name}</li>
          {console.log(user, blog.user)}
          {(user.username === blog.user.username) ? <li><button onClick={handleRemove}>remove</button></li> : <li></li>}
        </ul>
      </div>
    )
  }

  return (
    <div className='blog' style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      {visible && showBlog()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog