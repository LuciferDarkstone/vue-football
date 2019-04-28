import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    school: '@name',
    address: '@county(true)',
    'status|1': ['enable', 'disable']
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
  },
  
  {
    url: '/school/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/school/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
