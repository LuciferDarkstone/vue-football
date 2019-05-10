import request from '@/utils/request'

export function getLeague(params) {
  return request({
    url: '/league/list',
    method: 'get',
    params
  })
}

export function addLeague(params) {
  return request({
    url: '/league/create',
    method: 'post',
    params
  })
}

export function updateLeague(params) {
  return request({
    url: '/league/update',
    method: 'post',
    params
  })
}
