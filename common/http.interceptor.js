// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token变量
import {
		getQueryString
	} from '@/common/Qs'
const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig({
		baseUrl: '/opc',  //dev测试
		// baseUrl: window.location.origin+"/",//master打包上线
		loadingText: '努力加载中~',
		loadingTime: 1000,
		// ......
	});
	
	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		// 引用token
		// 方式一，存放在vuex的token，假设使用了uView封装的vuex方式
		// 见：https://uviewui.com/components/globalVariable.html
		// config.header.token = vm.token;
		
		// 方式二，如果没有使用uView封装的vuex方法，那么需要使用$store.state获取
		// config.header.token = vm.$store.state.token;
		
		// 方式三，如果token放在了globalData，通过getApp().globalData获取
		// config.header.token = getApp().globalData.username;
		
		// 方式四，如果token放在了Storage本地存储中，拦截是每次请求都执行的
		// 所以哪怕您重新登录修改了Storage，下一次的请求将会是最新值
		// const information = uni.getStorageSync('information');
		const information = uni.getStorage('information')
		uni.getStorage({
			key:'information',   // 储存在本地的变量名
			success:res => {
				// 成功后的回调
				if(JSON.stringify(res.data) != '{}'){
					config.header.token = res.data.token;
				}
			}
		})
		if(getQueryString().token){
			config.header.token =getQueryString().token;
		}
		// 可以对某个url进行特别处理，此url参数为this.$u.get(url)中的url值
		if(config.url == '/user/login') config.header.noToken = true;
		// 最后需要将config进行return
		return config;
		// 如果return一个false值，则会取消本次请求
		// if(config.url == '/user/rest') return false; // 取消某次请求
	}
	
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		 if(res.msg!="成功"&&res.msg!="success"&&res.msg!=""&&res.msg!="操作成功"&&res.msg!="参数错误"){
 			vm.$u.toast(res.msg);
    	}
		if(res.code == 0) {
			// res为服务端返回值，可能有code，result等字段
			// 这里对res.result进行返回，将会在this.$u.post(url).then(res => {})的then回调中的res的到
			// 如果配置了originalData为true，请留意这里的返回值
			return res.data;
		} else if(res.code == 700) {
			// 假设201为token失效，这里跳转登录
			vm.$u.toast('请登录后进行操作');
			setTimeout(() => {
				// 此为uView的方法，详见路由相关文档
				// vm.$u.route('/pages/login/index')
			}, 1500)
			return false;
		} else {
			// vm.$u.toast(res.msg);
			console.log(res,"error-msg=============");
			// 如果返回false，则会调用Promise的reject回调，
			// 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
			return false;
		}
	}
}

export default {
	install
}