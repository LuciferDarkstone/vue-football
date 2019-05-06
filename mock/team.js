import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    team: '@name',
    school: '@sentence(3,6)',
    avatar: '@img(60x60)',
    'status|1': ['enable', 'disable']
  }]
})

export default [
  {
    url: '/team/list',
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
    url: '/team/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/team/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
