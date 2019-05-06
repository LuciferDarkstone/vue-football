import request from '@/utils/request'

export function getTeam(params) {
  return request({
    url: '/team/list',
    method: 'get',
    params
  })
}

export function addTeam(params) {
  return request({
    url: '/team/create',
    method: 'post',
    params
  })
}

export function updateTeam(params) {
  return request({
    url: '/team/update',
    method: 'post',
    params
  })
}
