import request from '@/utils/request'

export function getPlayer(params) {
  return request({
    url: '/player/list',
    method: 'get',
    params
  })
}

export function addPlayer(params) {
  return request({
    url: '/player/create',
    method: 'post',
    params
  })
}

export function updatePlayer(params) {
  return request({
    url: '/player/update',
    method: 'post',
    params
  })
}
