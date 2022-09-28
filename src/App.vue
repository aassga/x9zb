<template>
  <div id="app">
    <keep-alive>
      <router-view  v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view  v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
import '@/common/font/PingFang SC Regular.css'
import { mapState } from 'vuex'
import userApi from '@/api/user.js'
export default {
  data () {
    return {
      active: 0,
      ws: '',
      WSURL: '',
      lockReconnect: false, // 是否真正建立连接
      timeout: 6 * 1000, // 6秒一次心跳
      timeoutObj: null, // 心跳心跳倒计时
      serverTimeoutObj: null, // 心跳倒计时
      timeoutnum: null, // 断开 重连倒计时
      userInfo: null
    }
  },
  computed: {
    // ...mapState({
    //   token: state => state.user.token,
    //   // WSURL: state => state.user.WSURL
    // })
  },
  mounted () {
    if (process.env.NODE_ENV !== 'development') {
		      setInterval(() => {
		        debugger
		      }, 50)
		    }
    // const data = {
    //   user_id:2,
    //   username:"tang"
    // }
    // let _that =this;
    //   this.$store.dispatch("getImToken",data).then(res=>{
    //     console.log(res,"=====")
    //     _that.userInfo = res.data;
    //     _that.newSocket(res.data);
    //   })
    // 如果是登录状态 就请求接口  不是的话就去登陆页
    // if (this.token) {
    //   // 获取用户信息
    //   this.$store.dispatch("getProfile");
    //   // 获取城市定位信息
    //   this.$store.dispatch("setStateName");
    //   // 获取关注列表
    //   this.$store.dispatch("getAttentionList");
    //   // 获取购买的贴文列表
    //   this.$store.dispatch("getBuyPost");
    //   // 获取订阅的模特列表
    //   this.$store.dispatch("getBuyCombo");

    // } else {
    //   this.$router.push({ path: "/Login" });
    // }
  },
  created () {
    // if (this.token) {
    // this.initWebSocket();
    // }
  },
  methods: {
    // vue清缓存通用工具函数，执行时this.$parent.clearCache,注意执行时机。
    clearCache (obj) {
      if (obj.$vnode && obj.$vnode.data.keepAlive) {
        if (obj.$vnode.parent && obj.$vnode.parent.componentInstance && obj.$vnode.parent.componentInstance.cache) {
          if (obj.$vnode.componentOptions) {
            var key = obj.$vnode.key == null ? obj.$vnode.componentOptions.Ctor.cid + (obj.$vnode.componentOptions.tag ? `::${obj.$vnode.componentOptions.tag}` : '') : obj.$vnode.key
            var cache = obj.$vnode.parent.componentInstance.cache
            var keys = obj.$vnode.parent.componentInstance.keys
            if (cache[key]) {
              if (keys.length) {
                var index = keys.indexOf(key)
                if (index > -1) {
                  keys.splice(index, 1)
                }
              }
              delete cache[key]
            }
          }
        }
      }
      obj.$destroy()
    },
    initWebSocket (data) {
      console.log(4444)
      return
      if (!this.WSURL) {
        this.WSURL = 'http://10.83.107.92:9024'
        return
        userApi.getWsurl().then(res => {
          if (res.status == 200) {
            let wsUrlTmp = res.data.ws
            if (location.protocol == 'https:') {
              wsUrlTmp = wsUrlTmp.replace('ws://', 'wss://')
            }
            // this.WSURL = wsUrlTmp;
            this.WSURL = 'http://10.83.107.92:9024'

            console.log(this.WSURL, '--this.WSUR')
            this.newSocket()
          }
        })
      } else {
        console.log(3333)
        this.newSocket()
      }
    },
    // 建立socket链接
    newSocket (data) {
      this.WSURL = `ws://10.83.107.92:9024?token=${data.token}&tokenid=${data.id}`
      // this.WSURL="ws://10.83.107.92:9021/?tokenid=vxzNHJmeQUV&vid=1510F80DF3B73C3C652F92A137D55986&token=4429111a-af55-8eb2-798e-a400921cc34c"
      this.ws = new WebSocket(this.WSURL)
      console.log(1123123, this.ws)
      // 本地测试用的
      // this.ws = new WebSocket(
      //   this.WSURL + "/chat",
      //   // "ws://socket.yoloshow.com/chat",
      //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTA5NTI3OTEsIm5iZiI6MTY1MDk1Mjc5MSwiZGF0YSI6eyJ1aWQiOjExLCJ1c2VybmFtZSI6ImxpZ2h0MiIsImF2YXRhciI6Im5vYXZhdGFyLnBuZyJ9fQ.dh7O6H7-JeV3nqmWYWfDL9nyro5P2uC8pv3ES2R_wL4"
      // );
      this.$global.setWs(this.ws)
      // 连接建立时触发
      this.ws.onopen = this.websocketonopen
      // 通信发生错误时触发
      this.ws.onerror = this.websocketonerror
      // 连接关闭时触发
      this.ws.onclose = this.websocketclose

      this.ws.onmessage = this.websocketonmessage

      this.$store.commit('HANDLE_WSRECONNECT')
    },
    // 客户端接收服务端数据时触发
    websocketonmessage (e) {
      const data = JSON.parse(e.data)
      console.log(data, '--e.data.data')
      if (data.status == 200) {
        if (data.data && data.data.type) {
          if (data.data.type == 'message') {
            this.$store.dispatch('getUnReadMsgNum')
          }
        }
      }
    },
    websocketonopen () {
      // 开启心跳
      this.start()
      // setTimeout(()=>{
      //   this.ws.close()
      // },10000)
    },
    // 通信发生错误时触发
    websocketonerror () {
      console.log('出现错误')
      this.reconnect()
    },
    // 连接关闭时触发
    websocketclose (e) {
      // 关闭
      console.log('断开连接', e)
      this.ws.close()
      // 重连
      this.reconnect()
    },
    reconnect () {
      // 重新连接
      if (this.lockReconnect) {
        return
      }
      this.lockReconnect = true
      // 没连接上会一直重连，设置延迟避免请求过多
      this.timeoutnum && clearTimeout(this.timeoutnum)
      this.timeoutnum = setTimeout(() => {
        // 新连接
        this.initWebSocket()
        this.lockReconnect = false
      }, 5000)
    },
    reset () {
      // 重置心跳
      // 清除时间
      clearTimeout(this.timeoutObj)
      clearTimeout(this.serverTimeoutObj)
      // 重启心跳
      this.start()
    },
    start () {
      // 开启心跳
      console.log('开启心跳')
      this.timeoutObj && clearTimeout(this.timeoutObj)
      this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj)
      const i = 0
      this.heart(i)
    },
    heart (i) {
      this.timeoutObj = setTimeout(() => {
        // 这里发送一个心跳，后端收到后，返回一个心跳消息，
        if (this.ws.readyState == 1) {
          // 如果连接正常
          const actions = { action: 'home.headrest', body: '' }
          this.ws.send(JSON.stringify(actions)) // 这里可以自己跟后端约定
        } else {
          // 否则重连
          this.reconnect()
        }
        // this.serverTimeoutObj = setTimeout(() => {
        //   console.log(123456)
        //   //超时关闭
        //   this.ws.close();
        // }, this.timeout);
        this.heart(i)
      }, this.timeout)
    }
  }
}
</script>

<style lang="scss">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // font-family: PingFangSC-Regular,-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Segoe UI,Arial,Roboto,'PingFang SC',miui,'Hiragino Sans GB','Microsoft Yahei',sans-serif;
  font-family: "PingFang SC", "Microsoft Yahei", -apple-system,
    BlinkMacSystemFont, "Helvetica Neue", Helvetica, Segoe UI, Arial, Roboto,
    miui, "Hiragino Sans GB", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // overflow-y: hidden;
}

html {
  font: 16px sans-serif;
}
.el-dialog__title {
  font-size: 15px;
}

html,
body {
  margin: 0 auto;
  width: 100vw;
  overflow-x: hidden;
}
html,
body,
#app {
  height: auto;
}

ul,
li,
ol {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

.message-override {
  z-index: 2050 !important;
}
.el-dialog__header {
  display: none !important;
}
.el-dialog__body{
  padding: 0 !important;
}
.el-message{
  top:3.2rem !important;
}
</style>
