import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getCookie } from '@/utils/auth'
import { showLoading, hideLoading } from '@/utils/loading'
import Cookies from 'js-cookie'
import Router from '@/router/index'

// create an axios instance

const noTips = ['/chat/sendMessage', '/chat/getChatHistory', '/chat/deleteMessage']
console.log(document.location)
const service = axios.create({
  baseURL: process.env.NODE_ENV == 'development' ? process.env.VUE_APP_API_URL : document.location.origin + '/admin',
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    // config.headers['X-Token'] = '123'
    config.headers['content-type'] = 'application/json'
    // config.headers['token'] = getCookie() || ''
    // config.headers['Authorization'] = 'bearer ' + Cookies.get('auth')

    // 请求头里增加token
    // config.headers['Authtoken'] = localStorage.getItem('token') //'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTAyNjAwMjUsIm5iZiI6MTY1MDI2MDAyNSwiZGF0YSI6eyJ1aWQiOjI4NywidXNlcm5hbWUiOiJ4YmdIYjJmR245ZTRKRiIsImF2YXRhciI6Im5vYXZhdGFyLnBuZyJ9fQ.kIdjP5ltokZ_1DqQbmYqFh9ewtyQyvj-x2y-3nkchmQ'
    // noTips.forEach()
    if (!noTips.includes(config.url)) {
      // showLoading()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // const {status,message} = response.data
    // console.log(res,"-----")
    if (res.code == 1) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000,
        showClose: true,
        customClass: 'message-override'
      })
    }
    // if(res.msg!="connection error"&&res.msg!="参数错误"&&res.msg!="成功"&&res.msg!="success"&&res.msg!=""){
    //     Message({
    //       message: res.msg || 'Error',
    //       type: 'error',
    //       duration: 5 * 1000,
    //       showClose: true,
    //       customClass: 'message-override',
    //     })
    // }
    // if(res.code===0){
    //      hideLoading()
    // // 直接返回数据 不做验证拦截
    // return res
    // }
    // if(status == 200){
    //   // Message({
    //   //   message: message || 'sccess',
    //   //   type: 'success',
    //   //   duration: 5 * 1000,
    //   //   showClose: true
    //   // })
    // }else{
    //   if(status == 103 || status == 105){//登陆失败
    //     Message({
    //       message: message || 'Error',
    //       type: 'error',
    //       duration: 5 * 1000,
    //       showClose: true,
    //       customClass: 'message-override',
    //     })
    //     Router.push({path:'/login'})
    //   }else{
    //     Message.closeAll()
    //     Message({
    //       message: message || 'warning',
    //       type: 'warning',
    //       duration: 5 * 1000,
    //       showClose: true,
    //       customClass: 'message-override',
    //     })
    //   }
    // }
    hideLoading()
    // 直接返回数据 不做验证拦截
    return res
  },
  error => {
    console.log('err' + error) // for debug
    Message.closeAll()
    Message({
      message: error.msg,
      type: 'error',
      duration: 5 * 1000,
      customClass: 'message-override'
    })
    hideLoading()
    return Promise.reject(error)
  }
)

export default service
