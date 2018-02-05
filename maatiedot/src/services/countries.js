import axios from 'axios'
const baseUrl = 'https://restcountries.eu/rest/v2/all'

const getAll = () => {
  return axios.get(baseUrl)
}

const findCountry = (name) => {
  console.log(`${baseUrl}/${name}`)
  return axios.get(`${baseUrl}/${name}`)
}

export default { getAll, findCountry}