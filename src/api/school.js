import request from '@/utils/request'

export function getSchool(params) {
  return request({
    url: '/school/list',
    method: 'get',
    params
  })
}

export function addSchool(params) {
  return request({
    url: '/school/create',
    method: 'post',
    params
  })
}

export function updateSchool(params) {
  return request({
    url: '/school/update',
    method: 'post',
    params
  })
}
