import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    school: '@name',
    'status|1': ['running', 'deleted'],
    address: '@county(true)'
  }]
})

export default [
  {
    url: '/school/list',
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
