const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const dummy = (blogs) => {
  if (blogs.length >= 0) return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    :  blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (mostLiked, blog) => {
    return mostLiked.likes < blog.likes
      ? blog
      : mostLiked
  }

  return blogs.length === 0
    ? 0
    :  blogs.reduce(reducer)
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  dummy,
  totalLikes,
  favoriteBlog,
  blogsInDb,
  usersInDb
}