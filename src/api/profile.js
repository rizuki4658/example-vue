import requestHeader from '@/utils/request'
// import store from '@/store'
const endpoint = '/profile'
export function getProfile (username) {
  return requestHeader({
    url: endpoint + '/' + username,
    method: 'get'
  })
}

export function updateProfile (data, id) {
  return requestHeader({
    url: endpoint + '/' + id,
    method: 'put',
    data
  })
}

export function updatePassword (data, id, username) {
  return requestHeader({
    url: endpoint + '/password/' + id + '/' + username,
    method: 'put',
    data
  })
}
