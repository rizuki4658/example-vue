import axios from 'axios'

import store from '../store'
import { setToken } from '@/utils/auth'

const service = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10 * 1000
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    setToken(response.data.token)
    store.dispatch('setToken', response.data.token)
    return Promise.resolve(response)
  },
  error => {
    // eslint-disable-next-line
    return Promise.reject({
      error: error.response
    })
  }
)

export default service
