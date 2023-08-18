import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async updateableObject => {
  const response = await axios.put(`${baseUrl}/${updateableObject.id}`,updateableObject)
  return response.data
}

const remove = async removeableObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = axios.delete(`${baseUrl}/${removeableObject.id}`, config)
  return response.data
}

const blogTools = { getAll, create, update, remove, setToken }

export default blogTools