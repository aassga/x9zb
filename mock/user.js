const Mock = require('mockjs')

const user = {
    '/user/login': {
        type: 'post',
        response: Mock.mock({
            "data": {
                "login": true, // 是否登录成功：true：登录成功，false：登录失败
                "message": "登陆成功", // 返回信息
                "token": "admin-token" // token：isLogin为false时，token没有，isLogin为true时，token有值
            },
            "statusCode": 200
        }),
    },
    '/user/info': {
        type: 'get',
        response: Mock.mock({
            "data": {
                "roles": "['admin']",
                "introduction": 'I am a super administrator',
                "avatar": 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
                "name": '疾风亦有归途'
            },
            "statusCode": 200
        })
    },
    '/user/logout': {
        type: 'post',
        response: Mock.mock({
            "data": {
                "loginoutStatus": true, // 是否退出登录成功：true：退出登录成功，false：退出登录失败
                "message": "退出登录成功", // 返回信息
            },
            "statusCode": 200
        }),
    }
}

// export default user;

module.exports = user