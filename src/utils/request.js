import Vue from 'vue'
import axios from 'axios'
import apiUrl from "./devApi";
import {
	MessageBox,
	Message
} from 'element-ui'
import store from '@/store'
import router from '../router'
import {
	getToken,
	removeToken
} from '@/utils/auth'

let baseURL = process.env;

// if (process.env.NODE_ENV == "development") {
// 	baseURL = Object.assign({}, process.env, apiUrl);
// }
let i = 0;
// create an axios instance
const service = axios.create({
	baseURL: apiUrl.VUE_APP_API_WS, //  url = base url + request url https://api.longya.tv/ http://lyapi.test6.vip/
	withCredentials: false, // send cookies when cross-domain requests
	timeout: 20000 // request timeout
})

// request interceptor
service.interceptors.request.use(
	config => {
		// do something before request is sent
		// 模拟接口暂无请求头
		// let token = getToken() || ''
		//    if (token) {
		// let each request carry token
		// ['token'] is a custom headers key
		// please modify it according to the actual situation
		// }
		config.headers['token'] = getToken() || ''
		return config
	},
	error => {
		// do something with request error
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
		//   let info = ''
		//   if(localStorage.getItem('userInfo')){
		// 	  info = JSON.parse(localStorage.getItem('userInfo')) || ''
		//   }
		// if(info){
		// 	store.state.user.data = info
		// }
		let _this = this
		const res = response.data
		const api_url = response.config.url
		let showMsg = api_url.indexOf("api/chat") < 0
		// if the custom code is not 20000, it is judged as an error.
		// if(res.msg!="connection error"&&res.msg!="成功"&&res.msg!="success"&&res.msg!=""&&res.msg!="操作成功"&&res.msg!="登录成功"&&res.msg!="赠送礼物成功"){
		// 	// Message({
		// 	// 	message: res.msg || 'Error',
		// 	// 	type: 'error',
		// 	// 	duration: 5 * 1000
		// 	// })
		// 	console.log(res.msg,"res.msg======")
		// }
		if (res.code == 1&&res.msg!="connection error") {
			// Message({
			// 	message: res.msg || 'Error',
			// 	type: 'error',
			// 	duration: 5 * 1000
			// })
			// 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
			if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
				// to re-login
				MessageBox.confirm('您已退出，您可以取消停留在此页面，或重新登录', '确认退出', {
					confirmButtonText: 'Re-Login',
					cancelButtonText: 'Cancel',
					type: 'warning'
				}).then(() => {
					store.dispatch('user/resetToken').then(() => {
						location.reload()
					})
				})
			}
			if (showMsg) {
				Message({
					message: res.msg || 'Error',
					type: 'error',
					duration: 5 * 1000
				})
			} else {
			}
			return Promise.reject(new Error(res.msg || 'Error'))
		} else if (res.code == 700) { //登录过期
			var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
			if(keys){
				for(var i = keys.length; i--;){
					document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString() + ";max-age=0";
				}
			}
			localStorage.clear()
			// 控制弹窗1s内出现一次
			i++
			if(i>1) return
			if(i==1){
				setTimeout( res =>{
					i = 0
				},2000)
			}
			// router.app.fullPath = '/main'
			localStorage.setItem('index', 0)
			// store.dispatch('delToken','')
			store.state.user.data = {}
			store.state.user.islogin = false
			localStorage.removeItem('userInfo')
			// console.log(_this);
			MessageBox.confirm(res.msg, '确认', {
				confirmButtonText: '确认',
				showCancelButton:false,
				type: 'warning'
			}).then(() => {
				window.location.reload()
			})
			// Vue.prototype.$message.error(res.msg)
			// console.log('--------------------'+router);
			//  setTimeout(res=>{
			return Promise.reject(new Error('Error'))
			// router.push({path:'/main',name:'main'})
			//  },1500)
			// if(!store.state.user.islogin) return
			// Vue.prototype.$message.error('已退出登录')
			// this.$router.push('/mian')
			// location.reload()
			// this.$
		} else if (res.code != 700 && res.code != 1 && res.code !== 0) { //其它状态
			
			return res
			
		} else {
			return res
		}
		removeToken()
	},
	error => {
		// console.log('err' + error) // for debug
		// Message({
		// 	// message: error.message == 'errError: timeout of 10000ms exceeded'?'请求超时,请重试':error.message,
		// 	message: '连接超时,请重试',
		// 	type: 'error',
		// 	duration: 5 * 1000
		// })
		return Promise.reject(error)
	}
)

export default service
