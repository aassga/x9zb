<template>
  <div id="chat-models">
    <div class="ChatDetails_container">
<!--       <MainHeader :showShare="false" back noNeedMenu :isShowLogo="false">
        <template v-slot:avatar>
          <div style="display: flex;
    align-items: center;">
            <img
              v-if="targetUserInfo.avatar"
              :src="targetUserInfo.avatar"
              style="width: 30px;
    height: 30px;
    border-radius: 30px;
    margin-right: 10px;"
            />
            <div>{{targetUserInfo.nick ? targetUserInfo.nick : ''}}</div>
          </div>
        </template>
      </MainHeader> -->
      <div class="chat-window">
        <div class="chat-detail-main">
          <div v-if="pinInfo" class="pin-info">
            {{pinInfo.text}}
          </div>
          <div v-for="(item,index) in msgList" :key="index">
            <div class="is-self" v-if="parmUserInfo.user_id.toString()==item.sender">
              <div class="msg-box" >
                <div class="msg-thumb" >{{item.sender_nickname&&item.sender_nickname.substr(-1)}}</div>
                <div class="msg-container">
                  <div class="msg-content" @click="showControl(index)">
                    <div>{{item.text}}</div>
                    <div class="msg-footer">{{item.channel}}{{item.time}}<span>{{item.sender_nickname}}</span></div>
                    <div v-if="controlIndex==index" class="msg-control">
                      <div @click="pin(item)">置顶</div>
                      <div @click="delMsg(item)">删除</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="msg-box" v-if="item.type == 2">
                <div class="msg-thumb" >{{item.sender_nickname&&item.sender_nickname.substr(-1)}}</div>
                <div class="msg-container">
                  <div class="msg-content">
                    <div class="gift-img-box">
                      <img
                        :src="item.gift_id | findGiftImg"
                        :alt="item.gift_id"
                        width="130"
                        height="130"
                      />
                      <span>*{{item.count}}</span>
                    </div>
                    <div class="gift-text-box" v-html="returnText1(targetUserInfo.username,item.count)">
                      <!-- 你对
                      <span style="color:#f46fe0;">{{targetUserInfo.username}}</span>赠送了
                      <span style="color:#82b1fd;">{{item.count}}</span>个礼物 -->
                    </div>
                    <div class="msg-footer">{{checkTime(item.created_time)}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="other-side " v-else>
               <div class="msg-box" >
                <div class="msg-thumb" >{{item.sender_nickname&&item.sender_nickname.substr(-1)}}</div>
                <div class="msg-container">
                  <div class="msg-content" @click="showControl(index)">
                    <div>{{item.text}}</div>
                    <div class="msg-footer"><span>{{item.sender_nickname}}</span>{{item.time}}{{item.channel}}</div>
                     <div v-if="controlIndex==index" class="msg-control other">
                      <div @click="mute(item)">禁言</div>
                      <div @click="freeze(item)">冻结</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <Modal/> -->
      <div class="send-container">
        <div class="inputcover" @click="clickemojie" v-if="isShowEmoji">{{isReadOnly}}</div>
        <input
        v-else
          id="msg"
          type="text"
          :placeholder="hasSendMsgCount | placeholderFilter(that)"
          v-model="msgText"
          ref="msg"
        />
        <!-- <span class="gift" @click="showGiftBox" /> -->
        <div class="control-footer">
                <div class="send" @click="sendMsg" >发送</div>
        </div>

       <!--  <svg
          @click="isShowEmoji = !isShowEmoji"
          class="emoji-btn"
          style="max-height:30px;"
          width="30"
          height="30"
          fill="#f46fe0"
          viewBox="0 0 106.059 106.059"
        >
          <path
            d="M90.544 90.542c20.687-20.684 20.685-54.341.002-75.024-20.688-20.689-54.347-20.689-75.031-.006-20.688 20.687-20.686 54.346.002 75.034 20.682 20.684 54.341 20.684 75.027-.004zM21.302 21.3c17.494-17.493 45.959-17.495 63.457.002 17.494 17.494 17.492 45.963-.002 63.455-17.494 17.494-45.96 17.496-63.455.003-17.498-17.498-17.496-45.966 0-63.46zM27 69.865s-2.958-11.438 6.705-8.874c0 0 17.144 9.295 38.651 0 9.662-2.563 6.705 8.874 6.705 8.874C73.539 86.824 53.03 85.444 53.03 85.444S32.521 86.824 27 69.865zm6.24-31.194a6.202 6.202 0 1 1 12.399.001 6.202 6.202 0 0 1-12.399-.001zm28.117 0a6.202 6.202 0 1 1 12.403.001 6.202 6.202 0 0 1-12.403-.001z"
          />
        </svg> -->
      </div>
    </div>
    <!-- <Footer :active="3" /> -->
<!--     <el-drawer :title="$t('lang.gift')" :visible.sync="isShowGiftBox" :direction="`btt`" :size="'auto'">
      <div class="gift-list">
        <div
          :class="currentGiftId == o.id ? 'active gift-item' : 'gift-item'"
          v-for="(o,i) in giftList"
          :key="i"
          @click="checkedGift(o.id,o.git_jpg)"
        >
          <img :src="o.git_jpg" width="100%" alt />
          <p>${{o.amount}}</p>
        </div>
      </div>
      <div class="switch-box">
        <el-input-number v-model="giftNum" @change="handleChange" :min="1"></el-input-number>
        <el-button type="primary" @click="sendGift">{{$t('lang.give')}}</el-button>
      </div>
    </el-drawer> -->
    <div class="emoji-box">
      <VEmojiPicker @select="selectEmoji" v-show="isShowEmoji" />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
// import MainHeader from "@/components/header/MainHeader.vue";
import userApi from '@/api/user.js'
import Qs from '@/utils/Qs.js'

export default {
  name: 'information-detail',
  components: {
    Footer,
    Modal
    // MainHeader
  },
  data () {
    return {
      isReadOnly: false,
      modelImage: require('@/assets/chat/model.png'),
      msgText: '',
      msgList: [],
      myUserinfo: { uid: '' },
      fd: 27,
      isShowGiftBox: false,
      giftNum: 1,
      currentGiftId: '',
      isShowEmoji: false,
      uid: '',
      gift_jpg: '',
      targetUserInfo: {},
      isAllowedSendMsg: true,
      hasSendMsgCount: 0,
      needBuy: false,
      that: this,

      active: 0,
      ws: '',
      WSURL: '',
      lockReconnect: false, // 是否真正建立连接
      timeout: 6 * 1000, // 6秒一次心跳
      timeoutObj: null, // 心跳心跳倒计时
      serverTimeoutObj: null, // 心跳倒计时
      timeoutnum: null, // 断开 重连倒计时
      imUserInfo: null,
      vid: '0DE7F2AD0706AD723BBD06F0B58EEE87',
      inRoom: false,
      parmUserInfo: {
        user_id: '',
        username: '',
        vid: ''
      },
      controlIndex: -1,
      pinInfo: ''
    }
  },
  computed: {
    // giftList: function() {
    //   return this.$store.state.user.gift_list;
    // },
    // userInfo: function() {
    //   return this.$store.state.user.user_info;
    // }
  },
  // 给新的ws实例添加监听事件
  watch: {
    '$store.state.user.wsReConnect': function () {
      this.$global.ws.onmessage = this.websocketonmessage
    },
    isShowEmoji (show) {
      if (show) {
        this.isReadOnly = this.msgText
      } else {
        this.msgText = this.isReadOnly
      }
    }
  },
  filters: {
    findGiftImg: function (value) {
      const gift_list = JSON.parse(localStorage.getItem('giftList'))
      for (var i = 0; i < gift_list.length; i++) {
        if (gift_list[i].id == value) {
          return gift_list[i].git_jpg
        }
      }
    },
    placeholderFilter: (value, that) => {
      if (value > -1) {
        return that.$t('lang.remaining_chats').replace(/(.*)n/, '$1' + value)
      } else {
        return that.$t('lang.enter_chat')
      }
    }
  },
  mounted () {
    // 异步转同步
    //
    //
    //
    if (Qs.getQueryString()) {
      this.parmUserInfo = Qs.getQueryString()
    }
    this.getChatHistoryMsg()
    const _that = this
    this.$store.dispatch('getImToken', this.parmUserInfo).then(res => {
      _that.imUserInfo = res.data
      _that.newSocket(res.data)
    })
    setTimeout(() => {
      this.$global.ws.onmessage = this.websocketonmessage
    }, 20)
  },
  created () {
    this.uid = this.$route.query.id
    // userApi.checkPermission({ touid: this.uid }).then(res => {
    //   if (res.status == 200) {
    //     this.fd = res.data.targetUserInfo.fd;
    //     this.targetUserInfo = res.data.targetUserInfo;
    //     this.hasSendMsgCount = res.data.remaining_chat_count;
    //   } else {
    //     this.isAllowedSendMsg = false;
    //     if (res.status == 603 || res.status == 612) {
    //       this.needBuy = true;
    //     }
    //   }
    //   this.$store.dispatch("chatInOut", {
    //     touid: this.uid,
    //     dateline: new Date().getTime(),
    //     status: 1
    //   });
    // });
    // this.$store.dispatch("getGiftList");
    // userApi.getMsgHistoryList({ touid: this.uid }).then(res => {
    //   if (res.data) {
    //     this.msgList = res.data;
    //   } else {
    //     this.msgList = [];
    //   }
    //   this.toBottom();
    // });
  },
  beforeDestroy () {
    this.$store.dispatch('chatInOut', {
      touid: this.uid,
      dateline: new Date().getTime(),
      status: 2
    })
  },
  methods: {
    getChatHistoryMsg () {
      const _that = this
      this.$store.dispatch('getChatHistory', { page: 1, limit: 20, type: 0, vid: this.parmUserInfo.vid, user_id: this.parmUserInfo.user_id }).then(res => {
        const dataList = res.data
        const replaceList = _that.msgList
        replaceList.push(dataList)
        _that.msgList = dataList
      })
    },
    showControl (index) {
      this.controlIndex = index
    },
    mute (item) {
      const _that = this
      this.$store.dispatch('mute', { type: 0, mute: 1, token: this.imUserInfo.token, vid: item.vid, fd: this.fd, user_id: item.sender }).then(res => {
        this.controlIndex = ''
        // this.getChatHistoryMsg();
      })
    },
    freeze (item) {
      const _that = this
      this.$store.dispatch('freeze', { type: 0, freeze: 1, token: this.imUserInfo.token, vid: item.vid, fd: this.fd, user_id: item.sender }).then(res => {
        this.controlIndex = ''
        // this.getChatHistoryMsg();
      })
    },
    pin (item) {
      const _that = this
      this.$store.dispatch('pin', { type: 0, pin: 1, token: this.imUserInfo.token, vid: item.vid, fd: this.fd, msg_id: item.msg_id }).then(res => {
        this.controlIndex = ''
        // this.getChatHistoryMsg();
      })
    },
    delMsg (item) {
      const _that = this
      this.$store.dispatch('deleteMessage', { type: 0, msg_id: item.msg_id, token: this.imUserInfo.token, both: 2, vid: item.vid, fd: this.fd }).then(res => {
        this.controlIndex = ''
        this.getChatHistoryMsg()
      })
    },
    inRoomInfo (fd) {
      const inRoomData = {
        vid: this.parmUserInfo.vid,
        token: this.imUserInfo.token,
        fd: fd,
        type: '0'
      }
      const _that = this
      if (_that.inRoom) {
        return
      }
      this.$store.dispatch('inRoom', inRoomData).then(res => {
        _that.inRoom = true
      })
    },
    newSocket (data) {
      this.WSURL = `ws://10.83.107.92:9024?token=${data.token}&tokenid=${data.id}`
      // this.WSURL="ws://10.83.107.92:9021/?tokenid=vxzNHJmeQUV&vid=1510F80DF3B73C3C652F92A137D55986&token=4429111a-af55-8eb2-798e-a400921cc34c"
      this.ws = new WebSocket(this.WSURL)
      // this.$global.setWs(this.ws);
      //
      // 连接建立时触发
      this.ws.onopen = this.websocketonopen
      // 通信发生错误时触发
      this.ws.onerror = this.websocketonerror
      // 连接关闭时触发
      this.ws.onclose = this.websocketclose

      this.ws.onmessage = this.websocketonmessage

      // this.$store.commit('HANDLE_WSRECONNECT')
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
          const actions = 'heart'
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
    },

    returnText1 (name, n) {
      const text = this.$t('lang.give_to').replace(/{%1}/, `<span style="color:#f46fe0;">${name}</span`).replace(/{%2}/, `<span style="color:#82b1fd;">${n}</span>`)
      return text
    },
    returnText2 (count) {
      const text = this.$t('lang.gift_from').replace(/{%}/, `<span style="color:#82b1fd;">${count}</span>`)
      return text
    },
    clickemojie () {
      // this.isReadOnly = false;
      this.isShowEmoji = false
      this.msgText = this.isReadOnly
      setTimeout(() => {
        var msg = document.getElementById('msg')
        msg.focus()
      }, 200)
    },
    // 顯示時間
    checkTime (dateline) {
      const now = this.dateFormat()
      const date = this.dateFormat(dateline * 1000)

      const d1 = now.replace(/\-/g, '/')
      const date1 = new Date(d1)

      const d2 = date.replace(/\-/g, '/')
      const date2 = new Date(d2)

      const dateDiff = date1.getTime() - date2.getTime()

      // 相差天數
      const days = Math.floor(dateDiff / (24 * 3600 * 1000))
      // 相差小時數
      const residue1 = dateDiff % (24 * 3600 * 1000)
      const hours = Math.floor(residue1 / (3600 * 1000))
      // 相差分鐘數
      const residue2 = residue1 % (3600 * 1000)
      const minutes = Math.floor(residue2 / (60 * 1000))

      if (days > 10) return date.split(' ')[0]
      if (days > 0) return days + this.$t('lang.day_ago')
      if (hours > 0) return hours + this.$t('lang.hour_ago')
      if (minutes >= 0) return (minutes > 0 ? minutes : '1') + this.$t('lang.minute_ago')
    },
    // 轉換時間格式 YYYY-MM-DD hh:mm:ss
    dateFormat (dateline) {
      const date = dateline > 0 ? new Date(dateline) : new Date()
      const Y = date.getFullYear()
      const M = date.getMonth() + 1
      const D = date.getDate()
      const h = date.getHours()
      const m = date.getMinutes()
      const s = date.getSeconds()
      return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
    },
    goUserInfo () {
      this.$router.push(`/userinfo/${this.uid}`)
    },
    checkPermission () {
      userApi.checkPermission({ touid: this.uid }).then(res => {
        if (res.status == 200) {
          this.fd = res.data.targetUserInfo.fd
          this.targetUserInfo = res.data.targetUserInfo
          this.hasSendMsgCount = res.data.remaining_chat_count
        } else {
          this.isAllowedSendMsg = false
          if (res.status == 603 || res.status == 612) {
            this.needBuy = true
          }
        }
      })
    },
    selectEmoji (emoji) {
      // var msg = document.getElementById("msg");
      // var startpos = msg.selectionStart;
      // var endpos = msg.selectionEnd;
      // if (startpos === undefined || endpos === undefined) return;
      // var txt = msg.value;
      // var result =
      //   txt.substring(0, startpos) + emoji.data + txt.substring(endpos);
      // msg.value = result;
      this.isReadOnly = this.isReadOnly + emoji.data
      // msg.focus();
      // msg.selectionStart = startpos + emoji.data.length;
      // msg.selectionEnd = startpos + emoji.data.length;
    },
    handleChange () {},
    checkedGift (giftId, gift_jpg) {
      this.currentGiftId = giftId
      this.gift_jpg = gift_jpg
    },
    showGiftBox () {
      this.isShowGiftBox = true
      this.currentGiftId = ''
    },

    sendGift () {
      const msg = {
        action: 'home.send_gift_message',
        body: {
          type: 2,
          uid: this.uid,
          fd: this.fd,
          gift_id: this.currentGiftId,
          count: this.giftNum,
          created_time: new Date().getTime() / 1000,
          img: this.gift_jpg
        }
      }
      this.$global.ws.send(JSON.stringify(msg))
      // this.msgList.push({type:2, uid: this.uid, fd: this.fd, gift_id: this.currentGiftId, count: this.giftNum, created_time:new Date().getTime()/1000, gift_jpg:this.gift_jpg });
      this.toBottom()
    },
    sendMsgByApi () {
      const data = {
        vid: this.parmUserInfo.vid,
        fd: this.fd,
        type: 0,
        text: this.msgText,
        method: 'notice',
        msg_type: 1, // 0为弹幕,1文字
        color: '#000',
        sender: 13,
        token: this.imUserInfo.token,
        channel: ''
      }
      this.$store.dispatch('sendMessage', data).then(res => {
        this.msgText = ''
      })
    },
    sendMsg () {
      this.isShowEmoji = false
      if (this.needBuy) {
        this.$message({
          type: 'error',
          message: '需购买模特含对话的套餐'
        })
        return
      }
      if (!this.isAllowedSendMsg || this.msgText == '') {
        return
      }
      this.sendMsgByApi()
      return
      const msg = {
        action: 'system',
        server: 'notice',
        uid: this.uid,
        fd: this.fd,
        txt: this.msgText,
        method: 'notice'

      }

      this.$global.ws.send(JSON.stringify(msg))
      this.msgText = ''
      this.toBottom()
    },
    // 客户端接收服务端数据时触发
    websocketonmessage (e) {
      const data = JSON.parse(e.data)
      if (data.fd !== null && data.action === 'open') {
        this.fd = data.fd
        this.inRoomInfo(data.fd)
      }
      if (data.action === 'pin') {
        this.pinInfo = JSON.parse(data.data)
      }
      if (data.action === 'send') {
        // let list = this.msgList;
        // list.push(data);
        this.msgList.push(data)
      }
      if (data.status == 200) {
        if (data.data) {
          // 晚点封装成switch case
          if (data.data.type == 'dialog') {
            this.msgList = data.data.historyMessageList
            this.myUserinfo = data.data.targetUserInfo
            this.fd = data.data.targetUserInfo.fd
          }
          if (data.data.type == 'call') {
            if (data.data.content.type == 1) {
              this.msgList.push({
                ...data.data.content,
                uid: this.userInfo.uid
              })
              this.msgText = ''
              this.toBottom()
              if (this.hasSendMsgCount > 0) {
                this.hasSendMsgCount = this.hasSendMsgCount - 1
              }
            }
            if (data.data.content.type == 2) {
              this.msgList.push({
                ...data.data.content,
                uid: this.userInfo.uid
              })
              this.toBottom()
            }
          }
          // if (data.data.type == "userinfo") {
          //   this.fd = data.data.userinfo.fd
          // }
          if (data.data.type == 'message') {
            this.$store.dispatch('getUnReadMsgNum')
            if (data.data.content.type == 1) {
              this.msgList.push({ ...data.data.content, uid: this.uid })
              this.msgText = ''
              this.toBottom()
            }
            if (data.data.content.type == 2) {
              this.msgList.push({ ...data.data.content, uid: this.uid })
              this.toBottom()
            }
          }
        }
      } else {
        // this.$message.warning(data.message);
      }
    },
    // 聊天框滚动到最底部
    toBottom () {
      this.$nextTick(() => {
        const main = document.querySelector('.chat-window')
        const content = document.querySelector('.chat-detail-main')
        main.scrollTop = content.clientHeight - main.clientHeight + 20
      })
    }
  }
}
</script>
<style lang="scss" scoped>
 .el-drawer__header {
  margin-bottom: 0;
  padding-top: 2vw;
}
.el-drawer.btt {
  height: auto;
}
.emoji-btn {
  position: absolute;
  right: 30%;
  top: 16%;
}
.emoji-box {
  position: absolute;
  bottom: 14%;
  right: 3%;
}
.switch-box {
  text-align: right;
  padding-bottom: 2vh;
  padding-right: 2vw;
}
.gift-list {
  padding: 3vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .gift-item {
    width: 25%;
    box-sizing: border-box;
    p {
      color: rgb(38, 153, 247);
    }
    &.active {
      border: 1px solid #f46fe0;
    }
  }
}
.ChatDetails_container {
  background: #f7f7f7;
  min-height: 100vh;
  .send-container {
    height: 100px;
    position: fixed;
    bottom: 0;
    width: 100%;
    line-height: 50px;
    background: #fff;
    padding:10px;
    border-top:1px solid #f1f1f1;
    text-align: left;
    .inputcover {
      position: absolute;
      height: 33px;
      width: calc(100% - 185px);
      margin: 5px 10px 0 0;
      z-index: 1000;
      border-radius: 17px;
      background: rgba(255, 255, 255, 0.5);
      padding-left:10px;
      position: absolute;
      border-color: #f1f1f1;
      border: 1px solid #ccc;
      font-size: 14px;
      outline: none;
      -webkit-appearance: none;
      width: calc(100% - 185px);
      line-height: 33px;
    }
    input {
      height: 33px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.5);
      padding: 0 10px;
      position: absolute;
      top: 4px;
      height:66px;
      border-color: #f1f1f1;
      border: 1px solid #ccc;
      font-size: 14px;
      outline: none;
      -webkit-appearance: none;
      width: 85%;
    }
    span {
      display: inline-block;
      width: 44px;
      height: 44px;
      position: absolute;
      top: 4px;
    }
    .gift {
      right: 70px;
      background: url("~@/assets/chat/ic-gift.png") no-repeat 0 -4px;
      background-size: 44px;
    }
    .control-footer{
          position: absolute;
    bottom: 0;
    width: 96%;
    height:50px;
        .send {
          display:inline-block;
          padding: 0 20px;
          position:absolute;
      right: 20px;
      bottom: 10px;
      border-radius:6px;
      color:#fff;
      background:#000;
          height: 30px;
    line-height: 30px;
    }
    }
  }
  .chat-window {
    height: calc(100vh - 139px);
    padding-top: 45px;
    overflow-y: auto;
  }
  .chat-detail-main {
    background: #f7f7f7;
    padding: 0px 20px 20px 20px;
    &>div{
      margin-bottom:40px;
    }
    .msg-container {
      border-radius: 6px;
      background: #fff;
      .msg-content-header {
        position: relative;
        .price-tag {
          background-image: linear-gradient(90deg, #f46fe0 0%, #f8a9ec 100%);
          color: #fff;
          padding: 8px 10px;
          position: absolute;
          right: 10px;
          top: 10px;
          border-radius: 8px;
          font-size: 12px;
        }
      }
    }
    .msg-content {
      padding: 10px;
      border-radius: 4px;
      // display: inline-block;
      font-size: 14px;
      word-break: break-all;
      color: #343a40;
      .gift-img-box {
        height: 130px;
        text-align: center;
        span {
          font-size: 23px;
          color: #6c757d;
          vertical-align: 40px;
        }
      }
      .gift-text-box {
        font-size: 14px;
      }
      .msg-footer {
        font-size: 12px;
        color: #707070;
        text-align: right;
        position:absolute;
        width:100%;
        top:-18px;
        right: 62px;
        span{
          margin:0 4px;
          color:#3a3afa;
        }
      }
    }

    .other-side {
      padding-left: 50px;
      position: relative;
      text-align: left;
      margin-bottom: 20px;
      .model-img {
        width: 100%;
      }
      .msg-thumb {
        width: 40px;
        height: 40px;
        border-radius: 40px;
        position: absolute;
        left: 0;
        top: -8px;
        line-height:40px;
        text-align:center;
        color:#fff;
        background:orange;
      }
      .msg-footer{
        left:62px!important;
        text-align: left;
      }
    }
    .is-self {
      padding-right: 50px;
      position: relative;
      text-align: left;
      margin-bottom: 20px;
      .msg-thumb {
         color:#fff;
         text-align:center;
        line-height:40px;
        background:orange;
        width: 40px;
        height: 40px;
        border-radius: 40px;
        position: absolute;
        right: 0;
        top: -8px;
      }
    }
  }
}
.msg-control{
    display: inline-block;
    position: absolute;
    background: #fff;
    padding: 10px;
    z-index: 99;
    bottom: -76px;
    border-radius: 6px;
    div{
      padding: 4px 0;
      &:hover{
        cursor:pointer;
      }
    }
    &.other{
      bottom:-76px;
    }
    }
    .pin-info{
      background:#ffdb9a;
      padding:10px;
      text-align:left;
      border-radius:4px;
    }
</style>
