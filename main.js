import App from './App'
import uView from "uview-ui";
import store from "store/index.js";
import common from "common/common.js";
import downloadHead from 'compontent/download-head.vue'
// http拦截器，此为需要加入的内容，如果不是写在common目录，请自行修改引入路径
import httpInterceptor from '@/common/http.interceptor.js'
// #ifndef VUE3
import Vue from 'vue'
// 引入video.js
import Videojs from 'video.js'
import VEmojiPicker from 'v-emoji-picker'
import 'video.js/dist/video-js.min.css' 
Vue.prototype.$video = Videojs //使用video.js时用$video



Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// // 腾讯im start
// import TIM from 'tim-js-sdk';
// import COS from "cos-js-sdk-v5";
// let options = {
//   SDKAppID: 1400699788// 修改无效，需要修改目录/store/index.js的SDKAppID
// };
// // 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
// let tim = TIM.create(options); // SDK 实例通常用 tim 表示
// // 设置 SDK 日志输出级别，详细分级请参见 setLogLevel 接口的说明
// tim.setLogLevel(6); // 普通级别，日志量较多，接入时建议使用
// // tim.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用
// // 注册 COS SDK 插件
// tim.registerPlugin({'cos-js-sdk': COS});
// Vue.prototype.tim = tim
// Vue.prototype.TIM = TIM
Vue.prototype.$common = common
// end

// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.component('downloadHead',downloadHead)
Vue.use(downloadHead)
Vue.use(uView);
Vue.use(VEmojiPicker)

Vue.prototype.$store = store;
// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif

Vue.prototype.$navigateTo = function navigateTo(url){
	uni.navigateTo({
		url:url
	})
}
 
 Vue.prototype.$back = function back(){
 	uni.navigateBack({
 		delta:1
 	})
 } 

Vue.use(httpInterceptor, app)