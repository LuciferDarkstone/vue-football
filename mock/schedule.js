import Mock from 'mockjs'

const data = Mock.mock({
  'items|10': [{
    id: '@id',
    team_a: '@name',
    team_b: '@name',
    position: '@county',
    'type|1': ['1', '2', '3'],
    'status|1': ['enable', 'disable']
  }]
})

export default [
  {
    url: '/schedule/list',
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
    url: '/schedule/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/schedule/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
