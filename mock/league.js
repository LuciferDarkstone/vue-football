import Mock from 'mockjs'

const data = Mock.mock({
  'items|5': [{
    id: '@id',
    league: '@name',
    'type|1': ['1', '2'],
    'status|1': ['enable', 'disable']
  }]
})

export default [
  {
    url: '/league/list',
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
    url: '/league/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/league/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
