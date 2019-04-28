import request from '@/utils/request'

export function getAdmins(params) {
  return request({
    url: '/admins/list',
    method: 'get',
    params
  })
}
