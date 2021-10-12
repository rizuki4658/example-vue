import axios from 'axios'

import store from '../store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 10 * 1000
})

service.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      if (store.getters.system_token) {
        config.headers['Authorization'] = 'Bearer ' + token
      }
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    return Promise.resolve(response)
  },
  error => {
    let errorData = error.response.data
    /*
    let errorCode = 0
    let statusCode = 500
    let message = 'Connection timeout, please check your internet connection'
    let string = 'Connection timeout, please check your internet connection'
    if (error.response) {
      const errorError = error.response.data.error.error
      let errArr = errorError
      string = errArr

      if (typeof errorError !== 'string') {
        string = ''
        errArr = Object.values(errorError)
        for (let index = 0; index < errArr.length; index++) {
          string += '- ' + errArr[index]
        }
      }

      if (error.response) {
        statusCode = error.response.data.error.status_code
        message = error.response.data.error.message
        errorCode = error.response.data.error.error_code
      } else {
        string = message
      }
    }
    */

    // eslint-disable-next-line
    return Promise.reject({
      errorData
    })
  }
)

export default service
