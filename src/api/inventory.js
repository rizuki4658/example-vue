import requestHeader from '@/utils/request'

const endpoint = '/inventory'

export function getAll () {
  return requestHeader({
    url: endpoint,
    method: 'get'
  })
}

export function create (data) {
  return requestHeader({
    url: endpoint + '/create',
    method: 'post',
    data
  })
}

export function update (data, id) {
  return requestHeader({
    url: endpoint + '/' + id,
    method: 'put',
    data
  })
}

export function deleteInventory (id) {
  return requestHeader({
    url: endpoint + '/' + id,
    method: 'delete'
  })
}
