import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newObject) => {
  console.log('create object ', newObject)
  const request =  axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  console.log('updateid ', id)
  console.log('updateobject ', newObject)
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}
const removePerson = (id, rmObject) => {
  console.log('käsittelijä poistaa', rmObject)
  const request = axios.delete(`${baseUrl}/${id}`, rmObject)
  return request.then(response => response.data)
}

export default { getAll, create, update, removePerson}