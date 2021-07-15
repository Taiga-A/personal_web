import Axios from 'axios'

export function request(config) {
  const instance = Axios.create({
    baseURL: 'http://localhost:8600/',
    timeout: 5000,
  })

  return instance(config)
}