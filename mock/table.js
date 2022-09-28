const Mock = require('mockjs')

const List = []
const count = 100


for (let i = 0; i < count; i++) {//写完后需要在index中引入
    List.push(Mock.mock({
      id: '@increment',
      title: '@title(5, 10)',
      cover: '@image("200x100")',
      try: '@cparagraph',
      content: '@cword(3, 5)',
      'price|1': [10,5,6,99,88,100], // 'price | 1':从数组中随机一个数字
      'status|1': [0,1],
      created_time: '@now',
      updated_time: '@now',
    }))
}

module.exports = {
    '/table/list': {
        type: 'get',
        response:  Mock.mock({
            "data": {
                'total': List.length,
                'items': List
            },
            "statusCode": 200
        })
    },
    '/table/create': {
        type: 'post',
        response: Mock.mock({
            "data": 'success',
            "statusCode": 200
        })
    },
    '/table/update': {
        type: 'post',
        response: Mock.mock({
            "data": 'success',
            "statusCode": 200
        }),
    }
}
