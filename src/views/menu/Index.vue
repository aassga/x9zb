<template>
  <div class="menu_box">
    <menuHeader
      :oneChat="oneChat"
      :groupChat="groupChat"
      :headerIndex="headerIndex"
      @onHandleChange="onHandleChange"
    ></menuHeader>
    <div class="menu_box_context">
      <Menu
        :meSendMsgText="meSendMsgText"
        :addGroupVid="addGroupVid"
        :loading="menuLoading"
        v-for="(item,index) in 3"
        :key="index"
        :listInitStatus="listInitStatus"
        :imUserInfo="imUserInfo"
        :parmUserInfo="parmUserInfo"
        :msgText="msgText"
        :headerIndex="headerIndex"
        :activeIndex="index"
        :msgList="msgList"
        @onHandleDelVid="addGroupVid = ''"
        @onHandleGroupMsgChange="onHandleGroupMsgChange"
        @onHandleMsgChange="onHandleMsgChange"
        @onHandleClickItem="onHandleClickItem"
        @onHandleMenuChange="onHandleMenuChange"
        @onHandleGroupList="onHandleGroupList"
        @onHandleCreatGrounp="addgroupShow = true"
        @onHandleChange="onHandleSreachChange"
        v-show="headerIndex == index"
      ></Menu>
      <div class="menu_box_context_right">
        <!-- 群组详情 -->
        <!-- <MessageUserList></MessageUserList> -->
        <div style="display:flex">
          <ChatDetails
            @closeLoading="closeLoading"
            :imUserInfo="imUserInfo"
            :parmUserInfo="parmUserInfo"
            :headerIndex="headerIndex"
            :userId="userId"
            v-show="isShowDetail && menuList.length > 0"
            @sendMsg="sendMsg"
            @onHandleUnRead="onHandleUnRead"
            @onHandleAddGroup="onHandleAddGroup"
            @onHandleChangeText="onHandleChangeText"
            @onHandleAddToGroup="onHandleAddToGroup"
            @onHandleShowChatInfo="onHandleShowChatInfo"
            @onHandleGetFd="onHandleGetFd"
            @onHandleAddMember="onHandleAddMember"
            :roomDetailData="roomDetailData"
          />
          <ChatInfo
            :parmUserInfo="parmUserInfo"
            :show="!isShowDetail && headerIndex != 2"
            @onHandleAddGroup="onHandleAddGroup"
            v-show="!isShowDetail && headerIndex != 2"
            @onHandleChatInfoBack="onHandleChatInfoBack"
            @onHandleAddToGroup="onHandleAddToGroup"
            @onHandleMuteGroup="onHandleMuteGroup"
            @refreshGroup="onHandleInitList"
            :roomDetailData="roomDetailData"
            :imUserInfo="imUserInfo"
          />
          <EnterHall
            v-show="headerIndex == 0"
            :enterHallList="enterHallList"
            @onHandleChangeUseId="onHandleChangeUseId"
          />
        </div>

        <MsgInfo
          :imUserInfo="imUserInfo"
          :parmUserInfo="parmUserInfo"
          :roomDetailData="roomDetailData"
          :show="!isShowDetail && headerIndex == 2"
          v-show="!isShowDetail && headerIndex == 2"
          @onHandleAddToGroup="onHandleAddToGroup"
          @onHandleDelChat="onHandleInitList"
          @onHandleChatInfoBack="isShowDetail = true"
        ></MsgInfo>
      </div>
    </div>

    <!-- 添加群组弹框 -->
    <AddGroup
      :imUserInfo="imUserInfo"
      :parmUserInfo="parmUserInfo"
      :roomDetailData="roomDetailData"
      :groupList="groupList"
      :selectUserId="selectUserItem.user_id"
      :show="addgroupShow"
      @close="addgroupShow = false"
      @submit="onHandleInitList"
      ref="AddGroup"
    ></AddGroup>

    <!-- 音频播放组件 -->
    <audio ref="audio" controls="controls" hidden src="../../assets/home/y682.mp3"></audio>
  </div>
</template>

<script>
// 侧边栏的组件
import MessageUserList from '@/components/menus/MessageUserList.vue'
import menuHeader from '@/components/menus/Header.vue'
import Menu from '@/components/menus/Index.vue'
import AddGroup from '@/components/menus/AddGroup.vue'
import MsgInfo from '@/components/menus/MsgInfo.vue'
import EnterHall from '@/components/menus/EnterHall.vue'
import ChatDetails from '@/views/information/ChatDetails.vue'
import ChatInfo from '@/views/information/ChatInfo.vue'
import { getUUID } from '@/utils/uuid'
import { setCookie } from '@/utils/auth'
// import { getQueryString } from "@/utils/Qs.js";

export default {
  name: 'menu',
  components: {
    MessageUserList,
    menuHeader,
    Menu,
    AddGroup,
    ChatDetails,
    ChatInfo,
    MsgInfo,
    EnterHall
  },
  data () {
    return {
      addGroupVid: '', // 新增的私聊房间的VID
      menuLoading: false,
      msgText: '', // 直播间发送出去的文字
      groupChat: 0, // 未读的群组消息总数
      oneChat: 0, // 未读的私聊消息总数
      menuList: [], // 聊天列表的展示列表
      roomDetailData: {
        user_id: 13,
        username: 'lukee',
        type: 0, // 聊天类型
        vid: '0DE7F2AD0706AD723BBD06F0B58EEE878'
      },
      meSendMsgText: '', // 我刚刚发出去的消息
      headerIndex: 0,
      sreachValue: '',
      addgroupShow: false, // 添加群组弹框的显示状态
      parmUserInfo: {},
      imUserInfo: {},
      listInitStatus: false, // 列表是否重新刷新的状态
      isShowDetail: true,
      fd: null,
      groupList: [],
      msgList: [],
      msgType: 0, // 0是初始化的消息  1是新增的消息
      selectUserItem: {},
      enterHallList: [],
      userId: {}
    }
  },

  watch: {
    headerIndex (newV, oldV) {
      if (newV) {
        this.sreachValue = ''
      }
    },
    menuList (newV, oldV) {
      if (newV && newV.length > 0) {
        // this.sreachValue = "";
      }
    }
  },
  async mounted () {
    console.log('获取url参数')
    console.log(this.getQueryString('headIndex'))
    // 获取当前是否包含vid和headIndex
    if (this.getQueryString('vid') && this.getQueryString('headIndex')) {
      console.log('获取到了url参数')
      this.headerIndex = this.getQueryString('headIndex')[0]
      this.roomDetailData.vid = this.getQueryString('vid')
    }
    // 获取用户token
    await this.init()
  },

  methods: {
    closeLoading (loading) {
      console.log('我是变化的menu加载状态')
      console.log(loading)
      this.menuLoading = loading
    },
    // 获取url参数
    getQueryString (name) {
      const query = window.location.href.split('?')[1]
      console.log('获取到的参数')
      console.log(query)
      if (query && query.indexOf('&') > -1) {
        const vars = query.split('&')
        console.log('截取到的参数数组')
        console.log(vars)
        for (let index = 0; index < vars.length; index++) {
          const pair = vars[index].split('=')
          if (pair[0] == name) {
            return pair[1]
          }
        }
        return false
      } else {
        return false
      }
    },
    // 我发送的消息
    sendMsg (text) {
      this.meSendMsgText = text
    },
    // 获取当前发送出去的文本
    onHandleChangeText (text) {
      this.msgText = text
    },
    // 群组消息总数计算事件
    onHandleGroupMsgChange (list) {
      let num = 0
      for (let index = 0; index < list.length; index++) {
        const element = list[index]
        if (element.unread_count > 0) {
          num += element.unread_count
        }
      }
      this.groupChat = num
    },
    onHandleMsgChange (list) {
      let num = 0
      for (let index = 0; index < list.length; index++) {
        const element = list[index]
        if (element.unread_count > 0) {
          num += element.unread_count
        }
      }
      this.oneChat = num
    },
    // 列表红点刷新事件
    onHandleUnRead (msgList, type) {
      if (type == 0) {
        this.msgList = msgList
      } else {
        let falg = true
        const arr = JSON.parse(JSON.stringify(this.msgList))
        for (let index = 0; index < arr.length; index++) {
          const element = arr[index]
          if (element.vid === msgList.vid) {
            falg = false
            element.unread_count += 1
            element.text = msgList.text
          }
        }

        if (falg) {
          arr.push(msgList)
        }
        console.log('我接受到了新消息')
        console.log(arr)
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
        this.msgList = arr
      }
    },
    // 本地存储假的数据
    setLocal () {},
    async init () {
      const _that = this
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if (!userInfo && !localStorage.getItem('userid')) {
        const userid =
          10000000 +
          Math.random()
            .toString()
            .slice(-6)
        localStorage.setItem('userid', userid)
      }

      if (userInfo) {
        this.parmUserInfo.user_id = userInfo && userInfo.user_id
        this.parmUserInfo.username = userInfo && userInfo.username
        this.parmUserInfo.type = (userInfo && userInfo.type) || 0
      } else {
        this.parmUserInfo.user_id = localStorage.getItem('userid') || userid
        this.parmUserInfo.username = getUUID()
        this.parmUserInfo.type = 0
      }
      // if (_that.imUserInfo) {
      //   return;
      // }
      const res = await this.$store.dispatch('getImToken', this.parmUserInfo)
      _that.imUserInfo = res.data
      // setCookie("token", res.data.token);
      this.listInitStatus = !this.listInitStatus
    },
    // 初始化列表
    onHandleInitList () {
      this.listInitStatus = !this.listInitStatus
    },
    // 禁言和解禁群组的时候获取的状态
    onHandleMuteGroup (mute) {
      this.roomDetailData.room_mute = mute ? 1 : 2
    },
    onHandleChange (e) {
      console.log(e)
      this.headerIndex = e
      this.isShowDetail = true
    },
    // 输入框变化事件
    onHandleSreachChange (e) {
      console.log(e)
      this.sreachValue = e
    },
    // 创建私聊
    onHandleAddGroup (vid) {
      console.log('开启私聊')
      if (this.headerIndex != 2) {
        this.headerIndex = 2
      }
      console.log(vid)
      this.addGroupVid = vid
      this.listInitStatus = !this.listInitStatus
    },
    // 点击menu 子项的事件
    onHandleClickItem (item) {
      console.log(item, 'item=======')
      const roomDetailData = JSON.parse(JSON.stringify(this.roomDetailData))
      roomDetailData.vid = item.vid
      roomDetailData.type = item.room_type
      roomDetailData.title = item.name
      roomDetailData.pic = item.pic ? `/upload/${item.pic}` : ''
      roomDetailData.user_nickname = item.user_nickname
      roomDetailData.info = item.competition || ''
      roomDetailData.online_count = item.online_count || 0
      roomDetailData.fd = this.fd
      roomDetailData.channel = item.channel
      this.roomDetailData = roomDetailData
      this.isShowDetail = true
      this.enterHallList = []
      // this.$refs.audio.currentTime = 0;
      // this.$refs.audio.play();
      if (this.headerIndex == 0) {
        this.getEnterHallList(item)
      }
      this.readItem(item)
    },
    // 已读事件
    readItem (item) {
      const list1 = this.msgList
      const arr = []
      for (let index = 0; index < list1.length; index++) {
        const element = list1[index]
        if (element.vid != item.vid) {
          arr.push(element)
        }
      }
      this.msgList = arr
    },
    // menu变化的事件
    onHandleMenuChange (list) {
      console.log('直播间列表变化')
      console.log(list)
      this.menuList = list
    },
    // 群组列表变化事件
    onHandleGroupList (list) {
      // if (type == 0) {
      //   // 直播间列表
      //   console.log("直播间列表变化");
      //   console.log(list);
      //   this.liveList = list;
      // } else if (type == 1) {
      // 群组列表
      console.log('群组列表变化')
      console.log(list)
      this.groupList = list
      // } else if (type == 2) {
      //   // 私聊列表
      //   console.log("私聊列表变化");
      //   console.log(list);
      //   this.msgList = list;
      // }
    },
    // 顯示直播群成員列表
    onHandleShowChatInfo () {
      this.isShowDetail = false
    },
    // 返回聊天室
    onHandleChatInfoBack () {
      this.isShowDetail = true
    },
    onHandleGetFd (fd) {
      this.fd = fd
    },
    async onHandleAddToGroup (type, selectUserItem) {
      // await this.getGroupList();
      this.$refs.AddGroup.radio = type
      this.addgroupShow = true
      this.selectUserItem = selectUserItem
    },
    onHandleAddMember (item) {
      if (item.r == '1') {
        return
      }
      this.enterHallList.push(item)
    },
    onHandleChangeUseId (item) {
      this.userId = item
    },
    getEnterHallList (item) {
      const data = {
        vid: item.vid
      }
      this.$store.dispatch('getEnterHallList', { ...data }).then(res => {
        if (res.code == 0) {
          this.enterHallList = res.data.reverse()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.menu_box {
  width: 100%;
  .menu_box_context {
    width: 100%;
    display: flex;
    background: #eeeeee;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    &_right {
      width: 600px;
    }
    .menu_box_context_right {
      position: relative;
      padding-top: 10px;
      overflow: auto;
      width: 1000px;
    }
  }
}
</style>
