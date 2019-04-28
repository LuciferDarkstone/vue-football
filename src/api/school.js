import request from '@/utils/request'

export function getSchool(params) {
  return request({
    url: '/school/list',
    method: 'get',
    params
  })
}
