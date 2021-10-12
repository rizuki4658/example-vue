import request from '@/utils/login'
import requestHeader from '@/utils/request'
// import store from '@/store'
const endpointLogin = '/auth/signin'
const endpointSignup = '/auth/signup'
const endpointUsers = '/users'
export function loginUser (data) {
  return request({
    url: endpointLogin,
    method: 'post',
    data
  })
}

export function signupUser (data) {
  return request({
    url: endpointSignup,
    method: 'post',
    data
  })
}

export function getAllUser () {
  return requestHeader({
    url: endpointUsers,
    method: 'get'
  })
}

export function addNewUser (data) {
  return requestHeader({
    url: endpointUsers + '/add',
    method: 'post',
    data
  })
}

export function updateUser (data, id) {
  return requestHeader({
    url: endpointUsers + '/' + id,
    method: 'put',
    data
  })
}

export function updateStatus (data, id) {
  return requestHeader({
    url: endpointUsers + '/status/' + id,
    method: 'put',
    data
  })
}

export function deleteUser (id) {
  return requestHeader({
    url: endpointUsers + '/' + id,
    method: 'delete'
  })
}
