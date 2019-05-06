import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    player: '@name',
    'position|1': ['上', '中', '野'],
    'status|1': ['enable', 'disable']
  }]
})

export default [
  {
    url: '/player/list',
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
    url: '/player/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/player/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
