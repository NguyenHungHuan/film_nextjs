import envConfig from '@/config'
import axios from 'axios'

export const axiosClients = axios.create({
  baseURL: `${envConfig.NEXT_PUBLIC_API_ENDPOINT}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  responseType: 'json'
})

axiosClients.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axiosClients.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)
