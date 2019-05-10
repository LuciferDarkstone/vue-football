import request from '@/utils/request'

export function getSchedule(params) {
  return request({
    url: '/schedule/list',
    method: 'get',
    params
  })
}

export function addSchedule(params) {
  return request({
    url: '/schedule/create',
    method: 'post',
    params
  })
}

export function updateSchedule(params) {
  return request({
    url: '/schedule/update',
    method: 'post',
    params
  })
}
