import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
// import MintUI from 'mint-ui'
// import VueTouch from 'vue-touch'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/icon/style.css'
import './elmentui.scss'
import 'mint-ui/lib/style.css'
import common from './utils/common.js'
import global from '@/websocket/global.js'
import moment from 'moment'
import VEmojiPicker from 'v-emoji-picker'
// 视频播放部分
import VideoPlayer from 'vue-video-player'

import VueI18n from 'vue-i18n'
Vue.prototype.$moment = moment
Vue.prototype.$global = global
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
const hls = require('videojs-contrib-hls')
Vue.use(hls)

// 添加自定义属性   给点击的元素添加此指令可使当前元素防抖
Vue.directive('noMoreClick', {
  inserted (el) {
    el.addEventListener('click', e => {
      el.calssList.add('is-disabled')
      el.disabled = true
      setTimeout(() => {
        el.disabled = false
        el.calssList.remove('is-disabled')
      }, 2000)
    })
  }
})

// 将通用方法工具函数插件 common 设置为全局变量
Vue.prototype.$common = common

Vue.config.productionTip = false
Vue.use(Element)
// Vue.use(MintUI)
Vue.use(VEmojiPicker)
// Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: localStorage.getItem('locale') || 'en',
  messages: {
    cn: require('./common/lang/cn'),
    en: require('./common/lang/en'),
    tc: require('./common/lang/tc')
  }
})

new Vue({
  router,
  store,
  i18n,
  render: function (h) { return h(App) }
}).$mount('#app')
