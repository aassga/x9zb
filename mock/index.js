//import user from './user.js'
const user = require('./user')
const table = require('./table')

const mocks = Object.assign(user, table)

function mockFtn(app){
    for (let i in mocks) {
        switch(mocks[i].type){
            case "post":
                app.post(`${i}`, function (req, res) {
                    res.json(mocks[i].response)
                })
                break;
            case "get":
                app.get(`${i}`, function (req, res) {
                    res.json(mocks[i].response)
                })
                break;;
            default:
                console("请求类型错误");
                break;
        }
    }
}

//返回一个函数
module.exports = function(app){
    if(process.env.Mock == "true"){// 对环境变量进行一个判断，方便我们替换真实接口
        //监听http请求
        mockFtn(app)
    }
}


