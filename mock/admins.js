import Mock from 'mockjs'

const data = Mock.mock({
  'items|6': [{
    id: '@id',
    avatar: '@name',
    email: '@email',
    'status|1': ['enable', 'disable', 'deleted']
  }]
})

export default [
  {
    url: '/admins/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          items: items
        }
      }
    }
  }
]
