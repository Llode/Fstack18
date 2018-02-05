import axios from 'axios'
const baseUrl = 'https://restcountries.eu/rest/v2/name'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}
const removePerson = (id, rmObject) => {
  console.log('käsittelijä poistt', rmObject)
  return axios.delete(`${baseUrl}/${id}`, rmObject)
}

const findCountry = (name) => {
  console.log(`${baseUrl}/${name}`)
  return axios.get(`${baseUrl}/${name}`)
}

export default { getAll, findCountry}