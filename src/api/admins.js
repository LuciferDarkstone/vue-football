import request from '@/utils/request'

export function getAdmins(params) {
  return request({
    url: '/admins/list',
    method: 'get',
    params
  })
}

export function addAdmins(params) {
  return request({
    url: '/admins/create',
    method: 'post',
    params
  })
}

export function updateAdmins(params) {
  return request({
    url: '/admins/update',
    method: 'post',
    params
  })
}
