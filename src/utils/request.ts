import axios from 'axios'
import { getToken, removeToken, setToken } from './token'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const request = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  withCredentials: true
})

request.interceptors.request.use(config => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

request.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    if (error.response.status === 401) {
      try {
        const accessToken = await axios.put('/refresh-token', null, {
          baseURL: BASE_URL,
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        })
        error.config.headers.Authorization = `Bearer ${accessToken.data.accessToken}`
        setToken(accessToken.data.accessToken)
        return request(error.config)
      } catch (error) {
        removeToken()
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export const mockRequest = axios.create({
  baseURL: 'https://64106f42be7258e14529c12f.mockapi.io/',
  timeout: 30000
})
