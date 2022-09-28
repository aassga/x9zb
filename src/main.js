import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as  common from './utils/common.js'
// 引入echarts
import echarts from 'echarts'
import '@/styles/index.scss' // global css
import '@/styles/fonts.css' // ledD css
import "@/styles/element-ui/index.scss";
// import VueSocketIO from 'vue-socket.io'
import VideoPlayer from 'vue-videojs7'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 注册滚动条加载触发事件v-loadmore绑定
import {selectLoadMore} from './directives.js';
import '@/permission' // permission control
import hls from 'videojs-contrib-hls';
// import VideoPlayer from 'vue-video-player';
import "video.js/dist/video-js.css"
import "vue-video-player/src/custom-theme.css"
import "./element-variables.scss"
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/swiper-bundle.css'
import websocket from './utils/websocket.js'

// 图片预览插件 vue-photo-preview
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
const Base64 = require('js-base64').Base64
import COS from "cos-js-sdk-v5";
// import VEmojiPicker from 'v-emoji-picker'

// let options = {
//   SDKAppID: 1400699788// 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
// };
// 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
// let tim = TIM.create(options); 1
// SDK 实例通常用 tim 表示
// 设置 SDK 日志输出级别，详细分级请参见 setLogLevel 接口的说明
// tim.setLogLevel(1); 1
 // 普通级别，日志量较多，接入时建议使用
// tim.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用
// 注册 COS SDK 插件
// tim.registerPlugin({'cos-js-sdk': COS}); 1




// Vue.directive('selectLoadMore', { bind: selectLoadMore });
Vue.use(hls)
Vue.use(preview)
Vue.use(ElementUI);
Vue.use(VideoPlayer)
Vue.use(selectLoadMore)
// Vue.use(VEmojiPicker)

Vue.config.productionTip = false
Vue.prototype.$common = common;
Vue.prototype.$echarts = echarts;
Vue.prototype.$WebSocket = websocket
new Vue({
  router,
  store,
  Base64,
  render: h => h(App)
}).$mount('#app')
