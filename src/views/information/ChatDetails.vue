<template>
  <div id="chat-models">
    <input id="cp-input" />
    <div class="ChatDetails_container">
      <div v-if="pinInfo" class="pin-info">
        {{pinInfo.text}}
        <i class="el-icon-close" @click="pin(pinInfo,true)"></i>
      </div>
      <div class="cc-header">
        <div class="cc-header-left">
          <div class="ch-top">
            <span class="ch-type">{{roomDetailData.type|filterTitle}}</span>
            <span class="ch-title">{{roomDetailData.title}}</span>
          </div>
          <div v-if="headerIndex == 2" class="ch-info">
            <div class="ch-state">
              <div class="statue" :class="{'online': is_online == 0}"></div>
              {{is_online == 0 ? "在线" : "离线"}}
            </div>
            {{roomDetailData.channel}}
          </div>
        </div>
        <div class="cc-header-right">
          <div class="member-list-icon">
            <i class="el-icon-collection-tag open-new" @click.stop="openNew"></i>
            <i @click.stop="onHandleShowChatInfo" class="el-icon-user"></i>
          </div>
        </div>
      </div>
      <div class="chat-window" @click="clearStatus()">
        <div class="chat-detail-main" ref="content-list">
          <div v-for="(item,index) in msgList" :key="index">
            <div class="is-self" v-if="parmUserInfo.user_id.toString()==item.sender">
              <div class="msg-box">
                <div class="msg-thumb">{{item.sender_nickname&&item.sender_nickname.substr(0,1)}}</div>
                <div class="msg-container">
                  <div class="msg-content" @click.stop="showControl(index)">
                    <template v-if="item.pic&&!item.text">
                      <el-image  :preview-src-list="[item.pic]"
                          fit="cover" :src="item.pic|picFilter" class="pic-info" />
                    </template>
                    <template v-if="item.pic&&item.text">
                      <div class="thumb-container" @click.stop="openLink(item.link)">
                        <el-image  :preview-src-list="[item.pic]"
                          fit="cover" class="thumb-pic" :src="item.pic|picFilter" />
                        <div class="thumb-title">{{item.title}}</div>
                        <br />
                        <div class="thumb-text">{{item.text}}</div>
                      </div>
                    </template>
                    <div v-else v-html="getText(item.text)"></div>
                    <div class="msg-footer">
                      <span class="is_read" v-if="headerIndex == 2">{{(parseInt(item.readed_count) > 1) ? '已渎' : '未渎'}}</span>
                      {{item.channel}}
                      {{item.time}}
                      <span>{{item.sender_nickname}}</span>
                    </div>
                    <div v-if="controlIndex==index" class="msg-control">
                      <div @click="pin(item)">置顶</div>
                      <div @click="delMsg(item)">删除</div>
                      <div @click="copyText(item)">复制</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="other-side" v-else>
              <div class="msg-box">
                <div class="msg-thumb">{{item.sender_nickname&&item.sender_nickname.substr(0,1)}}</div>
                <div class="msg-container">
                  <div class="msg-content" @click.stop="showControl(index, item.sender)">
                    <template v-if="item.pic&&!item.text">
                      <el-image  :preview-src-list="[item.pic]"
                          fit="cover" :src="item.pic|picFilter" class="pic-info" />
                    </template>
                    <template v-if="item.pic&&item.text">
                      <div class="thumb-container" @click.stop="openLink(item.link)">
                        <el-image  :preview-src-list="[item.pic]"
                          fit="cover" class="thumb-pic" :src="item.pic|picFilter" />
                        <div class="thumb-title">{{item.title}}</div>
                        <br />
                        <div class="thumb-text">{{item.text}}</div>
                      </div>
                    </template>
                    <div v-else v-html="getText(item.text)"></div>
                    <div class="msg-footer">
                      <span>{{item.sender_nickname}}</span>
                      {{item.time}}
                      {{item.channel}}
                    </div>
                    <div v-if="controlIndex==index" class="msg-control other">
                      <div @click="showUserInfo(item)">个人详情</div>
                      <div @click="pin(item)">置顶</div>
                      <div v-if="headerIndex !==2" @click="message(item)">私聊</div>
                      <div v-if="headerIndex !==2"
                        @click="mute(item)"
                      >{{userInfoData.is_mute ? (userInfoData.is_mute == 0 ? "禁言" : "解禁") : "禁言"}}</div>
                      <div v-if="headerIndex !==2"
                        @click="freeze(item)"
                      >{{userInfoData.is_freeze ? (userInfoData.is_freeze == 0 ? "冻结" : "解冻") : "冻结"}}</div>
                      <div @click="delMsg(item)">删除</div>
                      <div @click="copyText(item)">复制</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-show="systemStatus" class="system-msg">{{systemMsg}}</div>
        </div>
      </div>
      <div class="send-container">
        <div class="sender-content">
          <el-button type="primary" plain size="mini" @click="msgType(1)">普通消息</el-button>
          <el-button type="primary" plain size="mini" @click="msgType(3)">广告</el-button>
          <el-button type="primary" plain size="mini" @click="msgType(2)">图片</el-button>
          <!-- <el-button type="primary" plain size="mini" >投票</el-button> -->
          <svg
            @click="isShowEmoji = !isShowEmoji"
            class="emoji-btn"
            style="max-height:30px;"
            width="30"
            height="30"
            fill="#c1c1c1"
            viewBox="0 0 106.059 106.059"
          >
            <path
              d="M90.544 90.542c20.687-20.684 20.685-54.341.002-75.024-20.688-20.689-54.347-20.689-75.031-.006-20.688 20.687-20.686 54.346.002 75.034 20.682 20.684 54.341 20.684 75.027-.004zM21.302 21.3c17.494-17.493 45.959-17.495 63.457.002 17.494 17.494 17.492 45.963-.002 63.455-17.494 17.494-45.96 17.496-63.455.003-17.498-17.498-17.496-45.966 0-63.46zM27 69.865s-2.958-11.438 6.705-8.874c0 0 17.144 9.295 38.651 0 9.662-2.563 6.705 8.874 6.705 8.874C73.539 86.824 53.03 85.444 53.03 85.444S32.521 86.824 27 69.865zm6.24-31.194a6.202 6.202 0 1 1 12.399.001 6.202 6.202 0 0 1-12.399-.001zm28.117 0a6.202 6.202 0 1 1 12.403.001 6.202 6.202 0 0 1-12.403-.001z"
            />
          </svg>
        </div>
        <div class="msg-arr" v-if="dialogVisible">
          <div class="ma-header">
            一键回复
            <i class="el-icon-close" @click.stop="dialogVisible=false" />
          </div>
          <div v-for="(item,index) in modalMsgList" :key="index">
            <div @click.stop="setMsg(item)">
              {{JSON.parse(item.content).text}}
              <i
                class="el-icon-delete-solid"
                @click.stop="delQuickReply(item)"
              />
            </div>
          </div>
        </div>
        <template v-if="messageType==3||messageType==2">
          <div class="msg-img-text-container">
            <div class="mitc-upload">
              <form id="msgForm" ref="mf" method="post" enctype="multipart/form-data">
                <input type="file" id="fileUp" name="pic" @change="changeFile" />
                <span v-if="!prevImg" class="add-img">添加图片</span>
                <img v-else :src="prevImg" />
                <div v-if="messageType!=2" class="fomr-container">
                  <textarea
                    id="msg-title"
                    type="text"
                    placeholder="请输入标题"
                    rows="1"
                    v-model="msgTitle"
                  ></textarea>
                  <textarea
                    v-if="messageType!=2"
                    id="msg-text"
                    type="text"
                    placeholder="请输入聊天内容"
                    rows="2"
                    v-model="msgContent"
                    v-on:keyup.enter="sendMsg"
                  ></textarea>
                  <textarea
                    id="msg-text"
                    type="text"
                    v-if="messageType!=2"
                    placeholder="请输入链接"
                    rows="1"
                    v-model="msgLink"
                    v-on:keyup.enter="sendMsg"
                  ></textarea>
                </div>
                <button
                  @click="sendMsgByApi($event)"
                  v-if="messageType==3||messageType==2"
                  class="fm-sub"
                >提交</button>
              </form>
            </div>
          </div>
        </template>
        <textarea
          v-else
          id="msg"
          type="text"
          placeholder="请输入聊天内容"
          rows="2"
          v-model="msgText"
          ref="msg"
          v-on:keyup.enter="sendMsg"
        ></textarea>

        <div class="control-footer">
          <div>
            <el-button-group class="quick-container">
              <el-button type="primary" round size="mini" @click="clearHistory">一键请屏</el-button>
              <el-button type="primary" round size="mini" @click="quickReplyList">一键回复</el-button>
              <el-button type="primary" round size="mini" @click="saveMsg">保存</el-button>
            </el-button-group>
            <el-button type="primary" round size="mini" @click="drawer = true">渠道信息选择</el-button>
            <div class="send-model">
              <el-checkbox v-model="checked">发送弹幕</el-checkbox>
              <div class="send" v-if="messageType !==3" @click="sendMsg">发送</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--    <el-dialog title="快捷消息" :visible.sync="dialogVisible">
        <div class="msg-arr" v-if="dialogVisible">
                <div v-for="(item,index) in modalMsgList" :key="index">
                     <div >{{item.content}}</div>
                </div>
          </div>
    </el-dialog>-->
    <div class="emoji-box">
      <VEmojiPicker @select="selectEmoji" v-show="isShowEmoji" />
    </div>
    <!-- 渠道側欄 -->
    <Channel :drawer="drawer" @handleClose="handleClose" @quickMessage="quickMessage"></Channel>
    <!-- 個人詳情彈框 -->
    <UserInfo
      :show="userInfoShow"
      :userInfo="userInfoData"
      :userTags="userTags"
      @onHandleChangeNickName="onHandleChangeNickName"
      @onHandleAddTag="onHandleAddTag"
      @onHandleDeleteTag="onHandleDeleteTag"
      @onHandleMessage="onHandleMessage"
      @onHandleAddToGroup="onHandleAddToGroup"
      @onHandleMute="onHandleMute"
      @onHandleFreeze="onHandleFreeze"
      @close="userInfoShow = false"
    ></UserInfo>
  </div>
</template>

<script>
import { getQueryString } from '@/utils/Qs'
import { getUUID } from '@/utils/uuid'
import UserInfo from '@/components/menus/UserInfo.vue'
import Channel from '@/components/menus/Channel.vue'
import axios from 'axios'
export default {
  name: 'information-detail',
  props: ['roomDetailData', 'imUserInfo', 'headerIndex', 'userId'],
  components: {
    UserInfo,
    Channel
  },
  data () {
    return {
      msgTitle: '',
      msgContent: '',
      msgLink: '',
      isReadOnly: false,
      msgText: '',
      msgList: [],
      myUserinfo: { uid: '' },
      fd: '',
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
      // imUserInfo:null,
      vid: '0DE7F2AD0706AD723BBD06F0B58EEE87',
      inRoom: false,
      parmUserInfo: {
        // user_id:13,
        //  username:"lukee",
        //  vid:"0DE7F2AD0706AD723BBD06F0B58EEE878"
      },
      controlIndex: -1,
      pinInfo: '',
      page: 1,
      checked: false,
      dialogVisible: false,
      modalMsgList: [],
      userInfoShow: false,
      userInfoData: {}, // 個人詳情資料
      userTags: [], // 個人詳情標籤
      formData: {},
      isMore: true,
      messageType: 1,
      drawer: false,
      channel: '',
      systemStatus: false,
      systemMsg: '',
      prevImg: '',
      chatMemberList: [],
      canSend: true
    }
  },
  computed: {
    is_online () {
      // 0 在線 1 離線
      let is_online = 1
      if (this.headerIndex == 2) {
        const user_id = this.parmUserInfo.user_id
        if (this.chatMemberList.length == 2) {
          const chatUserInfo = this.chatMemberList.filter(
            it => it.user_id != user_id
          )[0]

          is_online = chatUserInfo.is_online
        }
      }
      return is_online
    }
  },
  // 给新的ws实例添加监听事件
  filters: {
    filterTitle (type) {
      return type === 0 ? '直播间' : type === 1 ? '群组' : '私信'
    },
    picFilter (url) {
      let newUrl = url
      if (url.includes('base64')) {
        const split = window.location.hostname.includes('10')
          ? 'http://lukee.huya.com/upload/'
          : window.location.origin + '/'
        newUrl = newUrl.replace(split, '')
      }
      return newUrl
    }
  },
  mounted () {
    const domScroll = document.querySelector('.chat-window')
    domScroll.addEventListener('scroll', e => {
      console.log(domScroll.scrollTop - domScroll.offsetHeight, '=====')
      if (domScroll.scrollTop - domScroll.offsetHeight <= -500 && this.isMore) {
        this.page++
        this.getChatHistoryMsg()
      }
    })

    // this.initInfo();
    // this.showUserInfo({sender: "20"})
  },
  watch: {
    'roomDetailData.vid' (newVal, oldVal) {
      console.log(this.roomDetailData, '=======roomDetailData')
      if (newVal != oldVal) {
        this.page = 1
        this.pinInfo = ''
        this.isMore = true
        this.initInfo()
        if (this.headerIndex == 2) {
          this.getChatMemberList()
        }
      }
    },
    imUserInfo () {
      this.newSocket(this.imUserInfo)
    },
    fd: {
      handler (newVal, oldVal) {
        this.$emit('onHandleGetFd', newVal)
      },
      immediate: true
    },
    userId (item) {
      this.userInfoShow = true
      this.getUserInfo(item.id)
      this.getUserTag(item.id)
    }
  },
  created () {
    this.uid = this.$route.query.id
  },
  beforeDestroy () {
    this.$store.dispatch('chatInOut', {
      touid: this.uid,
      dateline: new Date().getTime(),
      status: 2
    })
  },
  methods: {
    openNew () {
      window.parent.open(
        window.location.protocol +
          '//' +
          window.location.hostname +
          `${window.location.port != '80' ? ':' + window.location.port : ''}` +
          '/admin/chat/index.html?vid=' +
          this.parmUserInfo.vid +
          '&headIndex=' +
          this.headerIndex
      )
    },
    openLink (link) {
      window.open(link)
    },
    // 打开详情弹框
    onHandleShowChatInfo () {
      this.$emit('onHandleShowChatInfo')
    },
    msgType (e) {
      this.messageType = e
    },
    changeFile () {
      const fileUp = document.querySelector('#fileUp')
      const file = fileUp.files[0]
      this.formData.pic = file
      var reader = new FileReader()
      reader.readAsDataURL(file)
      const _that = this
      reader.onload = function (e) {
        var newUrl = this.result
        _that.prevImg = newUrl
      }
    },
    clearHistory () {
      const _that = this
      if (this.fd == '') {
        this.initInfo()
        return
      }
      this.$store
        .dispatch('clearHistory', {
          type: this.roomDetailData.type || 0,
          token: this.imUserInfo.token,
          vid: this.roomDetailData.vid,
          fd: this.fd
        })
        .then(res => {
          if (res.code == 0) {
            this.$message({
              type: 'success',
              message: '清屏成功'
            })
            this.msgList = []
            this.getChatHistoryMsg()
          }
        })
    },
    delQuickReply (item) {
      const _that = this
      if (this.fd == '') {
        this.initInfo()
        return
      }
      this.$store
        .dispatch('delQuickReply', {
          user_id: item.user_id,
          id: item.id
        })
        .then(res => {
          if (res.code == 0) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.quickReplyList()
          }
          // this.dialogVisible = true;
        })
    },
    setMsg (item) {
      this.msgText = JSON.parse(item.content).text
      this.dialogVisible = false
    },
    quickReplyList () {
      const _that = this
      this.$store
        .dispatch('getQuickReplyList', {
          user_id: this.parmUserInfo.user_id
        })
        .then(res => {
          console.log(res, '======res')
          this.modalMsgList = res.data
          this.dialogVisible = true
          this.controlIndex = ''
        })
    },
    saveMsg () {
      const _that = this
      console.log(this.parmUserInfo)
      this.$store
        .dispatch('addQuickReply', {
          user_id: this.parmUserInfo.user_id,
          text: this.msgText
        })
        .then(res => {
          if (res.code == 0) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
          }
        })
    },
    selectEmoji (emoji) {
      var msg = document.getElementById('msg')
      var startpos = msg.selectionStart
      var endpos = msg.selectionEnd
      if (startpos === undefined || endpos === undefined) return
      var result =
        this.msgText.substring(0, startpos) +
        emoji.data +
        this.msgText.substring(endpos)
      this.isShowEmoji = false
      this.msgText = result
    },
    clearStatus () {
      this.controlIndex = -1
    },
    getText (str) {
      var reg = /(https?:\/\/[^\s]+)/g
      str = str.replace(
        reg,
        "<a style='text-decoration:underline;color:blue' target='_blank' href='$1'>$1</a>"
      )
      str = str.replace(/\r\n/g, '<br/>')
      str = str.replace(/\n/g, '<br/>')
      str = str.replace(/\r/g, '<br/>')
      return str
    },
    copyText (item) {
      const str = item.text
      const qrUrlContent = document.getElementById('cp-input')
      qrUrlContent.value = str
      qrUrlContent.select()
      const range = document.createRange()
      const selection = document.getSelection()
      range.selectNode(qrUrlContent)
      selection.addRange(range)
      qrUrlContent.setSelectionRange(0, qrUrlContent.value.length)
      const isSucess = document.execCommand('copy')
      if (isSucess) {
        this.$alert('复制成功', '提示')
        this.tipsId = ''
      }
    },
    initInfo () {
      // this.$emit("closeLoading", true);
      this.msgList = []
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if (getQueryString()) {
        this.parmUserInfo = {
          vid: getQueryString().vid || this.roomDetailData.vid
        }
      }
      let userid = ''
      if (!userInfo && !localStorage.getItem('userid')) {
        userid =
          10000000 +
          Math.random()
            .toString()
            .slice(-6)
        localStorage.setItem('userid', userid)
      }

      if (userInfo || this.roomDetailData) {
        this.parmUserInfo.user_id = userInfo && userInfo.user_id
        this.parmUserInfo.username = userInfo && userInfo.username
        this.parmUserInfo.type = userInfo && userInfo.type
      } else {
        this.parmUserInfo.user_id = localStorage.getItem('userid') || userid
        this.parmUserInfo.username = getUUID()
      }

      const _that = this
      if (_that.imUserInfo) {
        if (this.fd) {
          this.inRoomInfo(this.fd)
        }
        this.getChatHistoryMsg(true)
      } else {
        this.getChatHistoryMsg()
      }
      setTimeout(function () {
        _that.toBottom()
      }, 3000)
    },
    getChatHistoryMsg (isNew = false) {
      const _that = this
      if (isNew) {
        this.msgList = []
      }
      this.$store
        .dispatch('getChatHistory', {
          page: this.page,
          limit: 20,
          type: this.roomDetailData.type || 0,
          vid: this.parmUserInfo.vid,
          user_id: this.parmUserInfo.user_id
        })
        .then(res => {
          if (this.roomDetailData.vid != this.parmUserInfo.vid) {
            return
          }
          const dataList = res.data.reverse()
          if (dataList.length === 0) {
            this.isMore = false
            return
          }
          if (_that.parmUserInfo.vid != dataList[0].vid) {
            return
          }
          _that.msgList.unshift(...dataList)
        })
    },
    async showControl (index, user_id = null) {
      if (this.controlIndex == index) {
        this.controlIndex = -1
        return
      }
      if (user_id != null) {
        await this.getUserInfo(user_id)
      }
      this.controlIndex = index
    },
    async showUserInfo (item) {
      this.controlIndex = -1
      this.userInfoShow = true
      this.getUserInfo(item.sender)
      this.getUserTag(item.sender)
    },
    async getUserInfo (user_id) {
      const data = {
        vid: this.roomDetailData.vid,
        user_id: user_id
      }
      this.$store.dispatch('getChatRoomUserInfo', { ...data }).then(res => {
        if (res.code == 0) {
          this.userInfoData = res.data
        } else {
          this.userInfoData = {}
        }
      })
    },
    getUserTag (user_id) {
      this.$store
        .dispatch('getUserTag', {
          user_id: user_id
        })
        .then(res => {
          if (res.code == 0) {
            this.userTags = res.data
          } else {
            this.userTags = []
          }
        })
    },
    message (item) {
      const _that = this
      const data = {
        fd: this.fd,
        token: this.imUserInfo.token,
        type: 2,
        user_id: item.sender || item.user_id,
        is_new: 1,
        channel: item.channel
      }
      console.log('私聊的请求数据')
      console.log(item)
      console.log(data)
      this.$store.dispatch('addGroup', { ...data }).then(res => {
        _that.$emit('onHandleAddGroup', res.data.vid)
      })
    },
    async mute (item) {
      if (this.fd == '') {
        this.initInfo()
        return
      }
      const user_id = item.sender || item.user_id
      this.$store
        .dispatch('mute', {
          type: this.roomDetailData.type || 0,
          mute: this.userInfoData.is_mute == 0 ? 1 : 2, // 1:禁言, 2:解禁
          token: this.imUserInfo.token,
          vid: item.vid,
          fd: this.fd,
          user_id: user_id
        })
        .then(res => {
          this.$message({
            type: res.code == '0' ? 'success' : 'error',
            message: res.msg
          })
          this.controlIndex = -1
          this.getUserInfo(user_id)
        })
    },
    async freeze (item) {
      if (this.fd == '') {
        this.initInfo()
        return
      }
      const user_id = item.sender || item.user_id
      this.$store
        .dispatch('freeze', {
          type: this.roomDetailData.type || 0,
          freeze: this.userInfoData.is_freeze == 0 ? 1 : 2, // 1:凍結, 2:解凍
          token: this.imUserInfo.token,
          vid: item.vid,
          fd: this.fd,
          user_id: user_id
        })
        .then(res => {
          this.$message({
            type: res.code == '0' ? 'success' : 'error',
            message: res.msg
          })
          this.controlIndex = -1
          this.getUserInfo(user_id)
        })
    },
    onHandleChangeNickName (editNickName, item) {
      if (editNickName == item.user_nickname) {
        return
      }
      if (editNickName.length > 0) {
        this.$store
          .dispatch('updateUser', {
            user_id: item.user_id,
            user_nickname: editNickName
          })
          .then(res => {
            if (res.code == 0) {
              this.getUserInfo(item.user_id)
            }
          })
      }
    },
    onHandleAddTag (tag, item) {
      if (tag.length == 0) return

      this.$store
        .dispatch('addTag', {
          tag: tag,
          user_id: item.user_id
        })
        .then(res => {
          this.$message({
            type: res.code == '0' ? 'success' : 'error',
            message: res.msg
          })
          if (res.code == 0) {
            this.getUserTag(item.user_id)
          }
        })
    },
    onHandleDeleteTag (tag, item) {
      if (tag.length == 0) return

      this.$store
        .dispatch('deleteTag', {
          tag: tag,
          user_id: item.user_id
        })
        .then(res => {
          this.$message({
            type: res.code == '0' ? 'success' : 'error',
            message: res.msg
          })
          if (res.code == 0) {
            this.getUserTag(item.user_id)
          }
        })
    },
    onHandleMessage (item) {
      this.message(item)
      this.userInfoShow = false
    },
    onHandleAddToGroup (item) {
      this.$emit('onHandleAddToGroup', 0, item)
      this.userInfoShow = false
    },
    onHandleMute (item) {
      this.mute(item)
    },
    onHandleFreeze (item) {
      this.freeze(item)
    },
    pin (item, unPin = false) {
      if (this.fd == '') {
        this.initInfo()
        return
      }
      const _that = this
      this.$store
        .dispatch('pin', {
          type: this.roomDetailData.type || 0,
          pin: unPin ? 2 : 1,
          token: this.imUserInfo.token,
          vid: item.vid,
          fd: this.fd,
          msg_id: item.msg_id
        })
        .then(res => {
          if (res.code == 0) {
            this.$message({
              type: 'success',
              message: unPin ? '取消置顶成功' : '置顶成功'
            })
          }
          this.controlIndex = -1
        })
    },
    delMsg (item) {
      const _that = this
      this.$store
        .dispatch('deleteMessage', {
          type: this.roomDetailData.type || 0,
          msg_id: item.msg_id,
          token: this.imUserInfo.token,
          both: 2,
          vid: item.vid,
          fd: this.fd
        })
        .then(res => {
          if (res.code == 0) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          }
          this.controlIndex = -1
          // this.getChatHistoryMsg(true);
        })
    },
    inRoomInfo (fd) {
      if (!fd || !this.parmUserInfo.vid) {
        return
      }
      const inRoomData = {
        vid: this.parmUserInfo.vid,
        token: this.imUserInfo.token,
        fd: fd,
        type: this.roomDetailData.type || 0
      }
      const _that = this
      // if(_that.inRoom){
      //   return
      // }
      this.$store.dispatch('inRoom', inRoomData).then(res => {
        _that.inRoom = true
        // setTimeout(()=>{
        // _that.$emit("closeLoading", false);
        // },1000)
      })
    },
    newSocket (data) {
      const wsprotocol =
        window.location.protocol == 'http:' ? 'ws://' : 'wss://'
      this.WSURL = `${wsprotocol}${
        window.location.hostname.includes('10')
          ? '10.83.107.92:9021'
          : window.location.hostname
        // "10.83.107.92:9021"
      }${window.location.protocol == 'http:' ? '/wss/' : '/wss/'}?token=${
        data.token
      }&tokenid=${data.id}&vid=${getQueryString().vid ||
        this.roomDetailData.vid}`
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
      const _that = this
      this.timeoutnum = setTimeout(() => {
        // 新连接
        _that.newSocket(_that.imUserInfo)
        _that.lockReconnect = false
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
          this.ws.send(actions) // 这里可以自己跟后端约定
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
    formSub (event) {
      event.preventDefault()
      const form = new FormData()
      form.append('text', '123')
      console.log(form, 'form======')
    },
    sendMsgByApi (event) {
      if (!this.canSend) {
        return
      }
      if (event) {
        event.preventDefault()
      }
      const msgType = this.checked ? 0 : 1
      const data = {
        vid: this.parmUserInfo.vid,
        fd: this.fd,
        type: this.roomDetailData.type || 0,
        text: this.msgText,
        method: 'notice',
        msg_type: msgType, // 0为弹幕,1文字
        color: '#000',
        // pic:this.pic,
        sender: this.parmUserInfo.user_id,
        token: this.imUserInfo.token,
        channel: this.channel
      }
      if (this.messageType == 3 || this.messageType == 2) {
        var formData = new FormData()
        formData.append('vid', this.parmUserInfo.vid)
        formData.append('fd', this.fd)
        formData.append('type', this.roomDetailData.type || 0)
        formData.append('text', this.msgContent)
        formData.append('title', this.msgTitle)
        formData.append('link', this.msgLink)
        formData.append('method', 'notice')
        formData.append('msg_type', this.messageType)
        formData.append('color', '#000')
        formData.append('sender', this.parmUserInfo.user_id)
        formData.append('token', this.imUserInfo.token)
        formData.append('channel', this.channel)
        formData.append('pic', this.formData.pic)
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        const baseUrl = window.location.hostname.includes('10')
          ? 'http://lukee.huya.com/'
          : window.location.origin + '/'
        axios
          .post(baseUrl + 'admin/chat/sendMessage', formData, config)
          .then(res => {
            console.log(res, '=======')
            this.$emit('sendMsg')
            this.msgText = ''
            this.channel = ''
            this.msgTitle = ''
            this.msgLink = ''
            this.prevImg = ''
            this.msgContent = ''
            this.formData.pic = ''
            this.toBottom()
          })
        return
      }
      this.canSend = false
      this.$store.dispatch('sendMessage', data).then(res => {
        this.$emit('sendMsg', this.formData.pic ? '我：[图片]' : `我：${this.msgText}`)
        this.msgText = ''
        this.channel = ''
        this.formData.pic = ''
        this.canSend = true
        if (res.msg == 'connection error' || res.msg == '参数错误') {
          this.newSocket(this.imUserInfo)
        }
        // setTimeout(() => {
        //     this.$refs["content-list"].$el.scrollTop           =   this.$refs["content-list"].$el.scrollHeight;
        // }, 300)
        this.toBottom()
      })
    },
    sendMsg () {
      this.isShowEmoji = false
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
      if (e.r == '1') {
        return
      }
      const data = JSON.parse(e.data)
      if (data.fd !== null && data.action === 'open') {
        this.fd = data.fd
        this.inRoomInfo(data.fd)
      }
      if (data.action === 'delmsg') {
        const msgListArr = this.msgList
        const delIndex = msgListArr.findIndex(
          item => item.msg_id * 1 === data.msg_id * 1
        )
        msgListArr.splice(delIndex, 1)
        this.msgList = msgListArr
      }
      if (data.action === 'pin') {
        if (data.pin == '1') {
          this.pinInfo = JSON.parse(data.data)
        }
        this.pinInfo.msg_id = data.msg_id
        if (data.pin == '2') {
          this.pinInfo = ''
        }
      }
      // 未读的消息列表
      if (data.action === 'unread') {
        const msgList = data.data || []
        this.$emit('onHandleUnRead', msgList, 0)
      }
      // 新收到的未读消息
      if (data.action === 'newMsg') {
        const msgList = {
          vid: data.newMsgRoomvid,
          room_type: data.room_type,
          unread_count: 1,
          text: data.text
        }
        this.$emit('onHandleUnRead', msgList, 1)
      }
      if (data.action === 'newRoom') {
        const msgData = this.$store.state.user.newMsg
        if (data.room_type === '2') {
          msgData.oneChat = true
          this.$store.commit('SET_NEW_MSG', msgData)
        }
        if (data.room_type === '1') {
          msgData.groupChat = true
          this.$store.commit('SET_NEW_MSG', msgData)
        }
      }
      if (data.action === 'send') {
        // let list = this.msgList;
        // list.push(data);
        data.readed_count = 1
        this.msgList.push(data)
      }
      if (data.action === 'system') {
        if (data.text.includes('进入直播间') && this.headerIndex != 0) {
          return
        }
        if (!data.r || (data.r && data.r != '1')) {
          this.systemStatus = true
          this.systemMsg = data.text
          this.addMember(data)
          setTimeout(() => {
            this.systemStatus = false
          }, 5000)
        }
      }
      if (data.action === 'readed') {
        // 把未讀的部分設成已讀
        console.log('someone is readed')
        for (let i = 0; i < this.msgList.length; i++) {
          if (parseInt(this.msgList[i].readed_count) <= 1) {
            this.msgList[i].readed_count = parseInt(data.readed_count)
          }
        }
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
        main.scrollTop = content.clientHeight - main.clientHeight + 140
      })
    },
    handleClose () {
      this.drawer = false
    },
    quickMessage (item) {
      this.msgText = item.content
      this.channel = item.channel
    },
    addMember (item) {
      this.getUserInfo(item.userid)
      setTimeout(() => {
        this.$set(item, 'channel_code', this.userInfoData.channel)
        this.$emit('onHandleAddMember', item)
      }, 1000)
    },
    getChatMemberList () {
      const data = {
        vid: this.roomDetailData.vid,
        type: this.roomDetailData.type
      }
      this.$store.dispatch('getChatRoomUserList', { ...data }).then(res => {
        if (res.code == 0) {
          this.chatMemberList = res.data
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.pic-info {
  max-height: 80px;
  max-width: 100%;
}
.open-new {
  margin-right: 20px;
  position: absolute;
  right: 30px;
  &:hover {
    cursor: pointer;
  }
}
.thumb-container {
  padding: 10px 10px 10px 90px;
  background: #ebebeb;
  min-height: 70px;
  position: relative;
  .thumb-pic {
    width: 70px;
    height: 70px;
    display: inline-block;
    position: absolute;
    left: 10px;
  }
  .thumb-title {
    font-weight: bold;
    font-size: 16px;
  }
  .thumb-text {
    font-size: 14px;
  }
}

.fomr-container {
  padding: 10px;
  width: 400px;
  line-height: 1.3;
  position: absolute;
  left: 100px;
  top: -4px;
  textarea {
    vertical-align: top;
    margin-right: 20px;
    border: 1px solid #47a2ff;
    border-radius: 4px;
    padding: 6px;
  }
}
.fm-sub {
  position: absolute;
  z-index: 99;
  outline: none;
  border: 1px solid transparent;
  display: inline-block;
  padding: 0 20px;
  position: absolute;
  right: -20px;
  bottom: -30px;
  border-radius: 6px;
  color: #fff;
  background: #000;
  height: 30px;
  line-height: 30px;
  &:hover {
    cursor: pointer;
  }
}
.mitc-upload {
  position: relative;
  display: inline-block;

  border-radius: 4px;
  line-height: 50px;
  color: #c1c1c1;
  form {
    width: 554px;
    height: 100px;
    position: relative;
    top: -21px;
  }
  img {
    position: absolute;
    width: 70px !important;
    height: 70px !important;
    border-radius: 4px;
    line-height: 70px;
    border: 1px solid #c1c1c1;
    top: 4px;
  }
  .add-img {
    position: absolute;
    width: 70px !important;
    height: 70px !important;
    border-radius: 4px;
    line-height: 70px;
    border: 1px solid #c1c1c1;
    left: 3px;
    top: 4px !important;
  }
  input {
    position: absolute;
    width: 70px !important;
    height: 70px !important;
    opacity: 0;
    z-index: 99;
    &:hover {
      cursor: pointer;
    }
  }
}

.send-model {
  width: 200px;
  position: absolute;
  right: -19px;
  display: inline-block;
}
.quick-container {
  margin-right: 10px;
}
.msg-arr {
  position: absolute;
  background: #ffe9c7;
  border-radius: 6px;
  bottom: 40px;
  padding: 10px;
  z-index: 99;
  height: 240px;
  width: 96%;
  overflow-y: scroll;
  & > div {
    cursor: pointer;
    width: 100%;
    border-bottom: 1px solid #c9c9c9;
    position: relative;
    i {
      position: absolute;
      right: 20px;
      top: 20px;
    }
  }
}
.sender-content {
  position: relative;
}

#cp-input {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.cc-header {
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background: #ffe9c7;
  z-index: 999;
  border-radius: 6px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  .cc-header-left {
    flex: 1;
    text-align: left;
    .ch-top {
      display: flex;
      align-items: center;
      .ch-type {
        display: inline-block;
        background: orange;
        color: #fff;
        font-size: 12px;
        padding: 4px 10px;
        border-radius: 14px;
      }
      .ch-title {
        display: inline-block;
        margin-left: 10px;
      }
    }
    .ch-info {
      display: flex;
      padding: 5px 0 0 5px;
      font-size: 12px;
      .ch-state {
        display: flex;
        align-items: center;
        width: 50px;
        color: #b4b1b1;
        .statue {
          width: 8px;
          height: 8px;
          margin-right: 5px;
          border-radius: 50%;
          background-color: grey;
          &.online {
            background-color: green;
          }
        }
      }
    }
  }
  .cc-header-right {
    .member-list-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: transparent;
      transition: all 0.15s;
      cursor: pointer;
      &:hover {
        background: #fff;
        border-radius: 50%;
      }
      i {
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
}

.sender-content {
  position: relative;
  top: -14px;
}
#msg {
  border: 1px solid #47a2ff;
  border-radius: 4px;
  padding: 6px;
  width: 97%;
  line-height: 32px;
  position: relative;
  top: -9px;
}

 .el-drawer__header {
  margin-bottom: 0;
  padding-top: 2vw;
}
.el-drawer.btt {
  height: auto;
}
.emoji-btn {
  position: relative;
  top: 10px;
  margin-left: 20px;
  width: 24px;
  cursor: pointer;
}
.emoji-box {
  position: absolute;
  bottom: 200px;
  right: 50px;
}
.switch-box {
  text-align: right;
  padding-bottom: 2vh;
  padding-right: 2vw;
}
.ChatDetails_container {
  background: #f7f7f7;
  max-height: 720px;
  position: relative;
  min-width: 600px;
  .send-container {
    height: 180px;
    position: absolute;
    width: 100%;
    line-height: 50px;
    background: #fff;
    padding: 10px;
    border-top: 1px solid #f1f1f1;
    text-align: left;
    box-sizing: border-box;
    .inputcover {
      position: absolute;
      height: 33px;
      width: calc(100% - 185px);
      margin: 5px 10px 0 0;
      z-index: 1000;
      border-radius: 17px;
      background: rgba(255, 255, 255, 0.5);
      padding-left: 10px;
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
      height: 66px;
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

    .control-footer {
      position: absolute;
      bottom: 0;
      width: 96%;
      height: 50px;
      .send {
        display: inline-block;
        padding: 0 20px;
        position: absolute;
        right: 20px;
        bottom: 10px;
        border-radius: 6px;
        font-size: 14px;
        color: #fff;
        background: #000;
        height: 30px;
        line-height: 30px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .chat-window {
    height: 479px;
    padding-top: 60px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .chat-detail-main {
    background: #f7f7f7;
    padding: 26px 20px 20px 20px;
    & > div {
      margin-bottom: 30px;
    }
    .msg-container {
      position: relative;
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
      &:hover {
        cursor: pointer;
      }
      .msg-footer {
        font-size: 12px;
        color: #707070;
        text-align: right;
        position: absolute;
        display: inline-block;
        top: -18px;
        right: 0;
        .is_read {
          color: #b4b1b1;
        }
        span {
          margin: 0 4px;
          color: #3a3afa;
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
        top: -14px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        background: orange;
      }
      .msg-footer {
        left: 0 !important;
        text-align: left;
      }
    }
    .is-self {
      padding-right: 50px;
      position: relative;
      text-align: left;
      margin-bottom: 20px;
      .msg-thumb {
        color: #fff;
        text-align: center;
        line-height: 40px;
        background: orange;
        width: 40px;
        height: 40px;
        border-radius: 40px;
        position: absolute;
        right: 0;
        top: -18px;
      }
    }
    .system-msg {
      position: absolute;
      width: 93%;
      bottom: -15px;
    }
  }
}
.msg-control {
  display: inline-block;
  position: absolute;
  background: #000;
  color: #fff;
  padding: 10px;
  z-index: 99;
  bottom: -100px;
  border-radius: 6px;
  div {
    padding: 4px 0;
    &:hover {
      cursor: pointer;
    }
  }
  &.other {
    bottom: -210px;
  }
}
.pin-info {
  background: #ffdb9a;
  padding: 10px;
  text-align: left;
  border-radius: 4px;
  position: absolute;
  z-index: 999;
  width: 96%;
  white-space: normal;
  top: 54px;
  word-break: break-all;
  i {
    position: absolute;
    right: 22px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
}
</style>
