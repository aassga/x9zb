<template>
  <div id="chat-models" style="height: 100%">
    <input id="cp-input" />
    <div class="ChatDetails_container">
      <div class="header-list">
        <span
          v-for="(item, index) in relationsFilter(relations)"
          :key="index"
          :class="{ on: tabNumber == item.id }"
          @click="changeType(item.id)"
        >
          <img
            v-if="item.id === 2"
            src="../../assets/images/HotTag.png"
            class="hot-tag"
          />
          {{ item.name }}
          <i
            v-show="(inviteCount > 0 && !hideChat) && item.id === 2"
            class="new-msg-icon"
            >{{
              inviteCount > 99 ? "99+" : inviteCount }}</i
          >
          <i
            v-show="unreadTotal && unreadTotal > 0 && item.id === 1"
            class="new-msg-icon"
            >{{ unreadTotal > 99 ? "99+" : unreadTotal }}</i
          >
        </span>
      </div>
      <div v-if="pinInfo && tabNumber === 0" class="pin-info">
        <i class="el-icon-message-solid"></i>
        {{ pinInfo.text }}
      </div>
      <!-- 聊天列表页面 -->
      <message-list
        v-show="tabNumber === 1 && showChatList"
        :list="chatList"
        :activeIndex="activeIndex2"
        @onHandleClickItem="onClickListEvent"
      />
      <message-info
        v-show="tabNumber === 1 && showMsgInfo && roomInfo"
        :dialogVisible="dialogVisible"
        :isShowEmoji="isShowEmoji"
        :modalMsgList="modalMsgList"
        :roomInfo="roomInfo"
        @close="backBefore"
      />
      <chat-message-new
        v-if="tabNumber === 0"
        :msgList="msgSquareList"
        :controlIndex="controlIndex"
        :parmUserInfo="parmUserInfo"
        :tabNumber="tabNumber"
        :roomInfo="roomInfo"
        :channel="channel"
        :chatMsgHight="chatMsgHight"
        @controlNumber="controlNumber"
        @msgAction="msgAction"
      />
      <chat-message-new
        v-if="tabNumber === 2"
        :msgList="msgAnchorList"
        :controlIndex="controlIndex"
        :parmUserInfo="parmUserInfo"
        :tabNumber="tabNumber"
        :roomInfo="roomInfo"
        :channel="channel"
        :chatMsgHight="chatMsgHight"
        @controlNumber="controlNumber"
        @msgAction="msgAction"
      />
      <chat-message-new
        v-if="tabNumber === 1"
        :msgList="msgChatList"
        :controlIndex="controlIndex"
        :parmUserInfo="parmUserInfo"
        :tabNumber="tabNumber"
        :roomInfo="roomInfo"
        :channel="channel"
        :chatMsgHight="chatMsgHight"
        @controlNumber="controlNumber"
        @msgAction="msgAction"
      />
      <div class="send-container">
        <div>
          <svg
            @click="isShowEmoji = !isShowEmoji"
            class="emoji-btn"
            style="max-height: 30px"
            width="20"
            height="20"
            fill="#c1c1c1"
            viewBox="0 0 106.059 106.059"
          >
            <path
              d="M90.544 90.542c20.687-20.684 20.685-54.341.002-75.024-20.688-20.689-54.347-20.689-75.031-.006-20.688 20.687-20.686 54.346.002 75.034 20.682 20.684 54.341 20.684 75.027-.004zM21.302 21.3c17.494-17.493 45.959-17.495 63.457.002 17.494 17.494 17.492 45.963-.002 63.455-17.494 17.494-45.96 17.496-63.455.003-17.498-17.498-17.496-45.966 0-63.46zM27 69.865s-2.958-11.438 6.705-8.874c0 0 17.144 9.295 38.651 0 9.662-2.563 6.705 8.874 6.705 8.874C73.539 86.824 53.03 85.444 53.03 85.444S32.521 86.824 27 69.865zm6.24-31.194a6.202 6.202 0 1 1 12.399.001 6.202 6.202 0 0 1-12.399-.001zm28.117 0a6.202 6.202 0 1 1 12.403.001 6.202 6.202 0 0 1-12.403-.001z"
            />
          </svg>
          <img
            v-if="tabNumber !== 0"
            class="uploadImg"
            src="./../../assets/images/image.png"
            alt=""
            @click="uploadImgShow = true"
          />
        </div>
        <div class="msg-arr" v-if="dialogVisible">
          <div class="ma-header">
            一键回复
            <i class="el-icon-close" @click.stop="dialogVisible = false"></i>
          </div>
          <div v-for="(item, index) in modalMsgList" :key="index">
            <div @click.stop="setMsg(item)">
              {{ JSON.parse(item.content).text }}
              <i class="el-icon-delete-solid" @click.stop="delQuickReply(item)">
              </i>
            </div>
          </div>
        </div>
        <div class="control-footer">
          <textarea
            id="msg"
            ref="msg"
            type="text"
            rows="1"
            v-model="msgText"
            v-on:keyup.enter="submitMessage()"
            placeholder="请输入聊天内容"
          ></textarea>
          <div>
            <div
              :class="[tabNumber == 0 && !token ? 'no_send' : 'send']"
              @click="submitMessage()"
            >
              发送
            </div>
          </div>
        </div>
      </div>
      <div class="emoji-box">
        <VEmojiPicker
          :showSearch="false"
          :showCategories="false"
          :emojisByRow="10"
          @select="selectEmoji"
          v-show="isShowEmoji"
        />
      </div>
    </div>
    <el-dialog
      title="上传图片"
      :before-close="closeModel"
      :visible.sync="uploadImgShow"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :append-to-body="false"
      v-loading.fullscreen.lock="fullscreenLoading"
      width="25%"
      class="el-upload-img el-dialog-loginOut"
      element-loading-text="圖片上传中"
      center
    >
      <el-upload
        class="upload-demo"
        action="#"
        :on-change="changeFile"
        :on-remove="handleRemove"
        :on-exceed="limitCheck"
        :auto-upload="false"
        :file-list="fileList"
        list-type="picture"
        multiple
        :limit="1"
      >
        <el-button type="danger" class="red">点击上传</el-button>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeModel()">取消</el-button>
        <el-button @click="submitMessage()">发送</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getQueryString } from "@/utils/Qs";
import MessageList from "@/components/MessageList";
import MessageInfo from "@/components/MessageInfo";
import ChatMessageNew from "@/components/ChatMessageNews";
export default {
  name: "ChatDetails",
  props: {
    hideChat: {
      type: null,
    },
    qsVid: {
      type: null,
    },
    giftList: {
      type: null,
    },
  },
  components: {
    MessageList,
    MessageInfo,
    ChatMessageNew,
  },
  data() {
    return {
      relations: [
        { name: "广场", id: 0 },
        { name: "主播私聊", id: 2 },
        { name: "聊天", id: 1 },
      ],
      unreadMsgList: [], // 红点的列表
      privateChatTotal: 0, // 主播私聊的未读总数
      unreadTotal: 0, // 列表红点的总数
      modalMsgList: [],
      showMsgInfo: false, // 房间是否显示的状态
      chatList: [], // 获取聊天列表
      activeIndex2: 0, // 聊天列表的选中索引
      roomInfo: {}, //聊天室的详情
      isReadOnly: false,
      msgText: "",
      msgSquareList: [],
      msgAnchorList: [],
      msgChatList: [],
      myUserinfo: { uid: "" },
      webSocketFd: "",
      isShowEmoji: false,
      uid: "",
      info: {
        token: "",
      },
      initInvite: true,
      dialogVisible: false,
      targetUserInfo: {},
      isAllowedSendMsg: true,
      hasSendMsgCount: 0,
      active: 0,
      ws: "",
      WSURL: "",
      msgType: 1,
      lockReconnect: false, //是否真正建立连接
      timeout: 6 * 1000, //6秒一次心跳
      timeoutObj: null, //心跳心跳倒计时
      serverTimeoutObj: null, //心跳倒计时
      timeoutnum: null, //断开 重连倒计时
      imUserInfo: null,
      vid: "0DE7F2AD0706AD723BBD06F0B58EEE87",
      inRoom: false,
      parmUserInfo: {
        user_id: 19,
        username: "手机用户8",
        vid: "12",
      },
      formData: {},
      controlIndex: -1,
      pinInfo: "",
      page: 1,
      tabNumber: 0,
      inviteCount: 0,
      prevImg: null,
      showChatList: false,
      isMore: true,
      newMsg: {
        privateChatTotal: false,
        groupChat: false,
      },
      room_type: "",
      channel: getQueryString().channel_code || localStorage.getItem("channel"),
      showLoading: true,
      initChatTab: true,
      initTab: true,
      leaveVid: "",
      chatMsgHight: 0, // 註記高度
      fullscreenLoading: false, // 全螢幕Loading
      uploadImgShow: false, // 上傳圖片
      fileList: [], //圖片清單
      anchor_id: "",
    };
  },
  computed: {
    token() {
      return this.$store.state.user.islogin;
    },
    infos() {
      return this.$store.state.infos;
    },
  },
  //给新的ws实例添加监听事件
  watch: {
    unreadMsgList: {
      handler(newV, oldV) {
        this.chatList = this.mapList(this.chatList, newV);
        this.onGroupNewsTotal(this.chatList);
        // 刷新视图
        this.$forceUpdate();
      },
      deep: true,
    },
    webSocketFd(newV, oldV) {
      if (newV !== oldV) this.inviteRoom(true);
    },
    showLoading(newV, oldV) {
      !newV ? this.toBottom() : false;
    },
    tabNumber(newV, oldV) {
      if (newV === 1) this.getChatMessageList(); // 获取聊天列表
      if (newV !== oldV) this.initTab = true;
    },
    pinInfo(newV, oldV) {
      if (newV !== "") this.changeHeight();
    },
  },
  mounted() {
    this.anchor_id = getQueryString().uid;
    const domScroll = document.querySelector(".chat-window");
    domScroll.addEventListener("scroll", (e) => {
      if (domScroll.scrollTop === 0 && this.isMore && this.tabNumber !==2) {
        this.page++;
        if (this.tabNumber === 1 && this.initChatTab) {
          this.initChatTab = false;
          return;
        }
        if(this.tabNumber !==2 || (this.tabNumber === 2 && this.msgAnchorList.length !== 0) ){
          this.getChatHistoryMsg(this.initTab ? 1 : "");
        }
      }
    });
    this.vid = this.qsVid || "";
    let userid = "";
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.info = userInfo || {
      token: "",
    };
    if (getQueryString()) {
      if (!userInfo) {
        if (!localStorage.getItem("userid")) {
          userid = 10000000 + Math.random().toString().slice(-6);
          localStorage.setItem("userid", userid);
          this.parmUserInfo = {
            user_id: userid,
            username: userid,
            vid: this.vid,
            type: 0,
          };
        } else {
          this.parmUserInfo = {
            user_id: localStorage.getItem("userid"),
            username: localStorage.getItem("userid"),
            vid: this.vid,
            type: 0,
          };
        }
      } else {
        this.parmUserInfo = {
          user_id: userInfo.id,
          username: userInfo.user_nickname,
          vid: this.vid,
          type: userInfo.user_type,
        };
      }
    }
    this.getChatMessageList(); // 获取聊天列表
    this.getUserToken();
  },
  created() {
    this.uid = this.$route.query.id;
  },
  beforeDestroy() {
    this.$store.dispatch("chatInOut", {
      touid: this.uid,
      dateline: new Date().getTime(),
      status: 2,
    });
  },
  methods: {
    controlNumber(num) {
      this.controlIndex = num;
    },
    msgAction(item) {
      this.mergeDataList(this.tabNumber).map((val, index) => {
        if (val == item) this.mergeDataList(this.tabNumber).splice(index, 1);
      });
      this.msgText = item.text;
    },
    relationsFilter(data) {
      if(this.hideChat){
        return data.filter((el) => el.id !== 2)
      }else{
        return data
      }
    },
    closeModel() {
      this.msgText = "";
      this.msgType = 1;
      this.formData.pic = "";
      this.fileList = [];
      this.uploadImgShow = false;
      this.fullscreenLoading = false;
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    handleChange(file, fileList) {
      let fileFilter = file.name.substring(file.name.lastIndexOf(".") + 1);
      if (file.name.length > 50) {
        this.$message.error("档案名称过长无法传送");
        fileList.splice(-1, 1);
        return false;
      } else if (["exe", "apk", "ipa"].includes(fileFilter)) {
        this.$message.error("不支援exe、apk、ipa档案格式上传");
        fileList.splice(-1, 1);
        return false;
      }
      this.fileData = fileList;
    },
    // 选择的文件超出限制的文件总数量时触发
    limitCheck() {
      this.$message({ message: "最多只能上传1张图片", type: "warning" });
    },
    sendImg(num) {
      this.msgType = num;
    },
    //取得圖片
    changeFile(fileList) {
      this.msgType = 2;
      // const fileUp = document.querySelector("#fileUp");
      const file = fileList.raw;
      this.formData.pic = file;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      const _that = this;
      reader.onload = function (e) {
        var newUrl = this.result;
        _that.prevImg = newUrl;
      };
    },

    // 列表已读未读比对事件
    mapList(readData, unReadData) {
      // 是否是新增的消息 是的话就讲房间移动到列表最前面
      if (unReadData.length > 0 && unReadData[unReadData.length - 1].text) {
        readData.sort((a, b) =>
          a.vid == unReadData[unReadData.length - 1].vid
            ? -1
            : b.vid == unReadData[unReadData.length - 1].vid
            ? 1
            : 0
        );
        // 如果是重整之后的数组，则重新校对active的索引，使页面样式规范
        readData.forEach((res)=>{
          if (res.vid == this.roomInfo.vid) this.activeIndex2 = item;
        })
      }
      readData.forEach((res)=>{
        unReadData.forEach((el)=>{
          if (res.vid === el.vid) {
            res.unread_count = el.unread_count;
            res.last_msg.text = el.text ? el.text : res.last_msg.text
          }
        })
      })
      return readData;
    },
    // 群组消息总数计算事件
    onGroupNewsTotal(list) {
      let num = 0;
      list.forEach((list)=>{
        if (list.unread_count > 0) num += list.unread_count;
      })
      this.unreadTotal = num;
    },
    // 列表红点刷新事件
    refreshUnreadEvent(msgList, type) {
      if (type == 0) {
        this.unreadMsgList = msgList;
      } else {
        let falg = true;
        let arr = JSON.parse(JSON.stringify(this.unreadMsgList));
        arr.forEach((res)=>{
          if (res.vid === msgList.vid) {
            falg = false;
            res.unread_count += 1;
            res.text = msgList.text;
          }
        })
        if (falg) arr.push(msgList);
        this.unreadMsgList = arr;
        this.inviteCount += 1;
        this.unreadTotal += 1;
      }
    },
    // 已读事件
    readEvent(item) {
      let newMessageData = this.unreadMsgList
      newMessageData.forEach((res)=>{
        if(res.vid === item.vid) res.unread_count = 0
      })
      this.unreadMsgList = newMessageData;
    },
    getUserToken() {
      const _that = this;
      this.$store
        .dispatch("getImToken", this.parmUserInfo)
        .then((res) => {
          _that.imUserInfo = res.data;
          _that.newSocket(res.data);
        })
        .catch((err) => {
          localStorage.clear();
        });
    },
    backBefore() {
      this.roomInfo = false;
      this.showChatList = true;
      this.showLoading = true;
      this.showMsgInfo = false;
      this.getChatMessageList();
      if (this.room_type == "2") this.leaveRoom(2);
      this.room_type = "";
    },
    delQuickReply(item) {
      const _that = this;
      this.$store
        .dispatch("delQuickReply", {
          user_id: item.user_id,
          id: item.id,
        })
        .then((res) => {
          if (res.msg == "成功") {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.quickReplyList();
          }
        });
    },
    setMsg(item) {
      this.msgText = JSON.parse(item.content).text;
      this.dialogVisible = false;
    },
    quickReplyList() {
      const _that = this;
      this.$store
        .dispatch("getQuickReplyList", {
          user_id: this.parmUserInfo.user_id,
        })
        .then((res) => {
          this.modalMsgList = res.data;
          this.dialogVisible = true;
          this.controlIndex = -1;
        });
    },
    getChatMessageList() {
      this.$store
        .dispatch("getMessageList", {
          id: this.parmUserInfo.user_id,
          type: "1,2",
        })
        .then((res) => {
          this.showLoading = false;
          if (res.code == 0) {
            res.data.forEach(data => data.unread_count = 0)
            if (this.unreadMsgList.length > 0) {
              res.data = this.mapList(res.data, this.unreadMsgList);
              this.onGroupNewsTotal(res.data);
            }
            this.chatList = res.data;
          }
        });
    },
    saveMessage() {
      if (!this.msgText) return;
      const _that = this;
      this.$store
        .dispatch("addQuickReply", {
          user_id: this.parmUserInfo.user_id,
          text: this.msgText,
        })
        .then((res) => {
          if (res.code == 0) {
            this.$message({
              type: "success",
              message: "保存成功",
            });
          }
        });
    },
    selectEmoji(emoji) {
      var msg = document.getElementById("msg");
      var startpos = msg.selectionStart;
      var endpos = msg.selectionEnd;
      if (startpos === undefined || endpos === undefined) return;
      var result =
        this.msgText.substring(0, startpos) +
        emoji.data +
        this.msgText.substring(endpos);
      this.msgText = result;
    },
    // 点击聊天列表事件
    onClickListEvent(item, index) {
      this.page = 1;
      this.showMsgInfo = true;
      this.roomInfo = item;
      this.showChatList = false;
      this.activeIndex2 = index;
      this.unreadTotal -= this.chatList[index].unread_count || 0;
      this.chatList[index].unread_count = 0;
      this.parmUserInfo.vid = item.vid;
      this.room_type = item.room_type;
      this.readEvent(item);
      this.inRoomInfo(this.webSocketFd);
      // this.mergeDataList(this.tabNumber, "empty");
    },
    // 私聊(type=2)離開聊天室
    leaveRoom() {
      this.roomInfo = {};
      const data = {
        vid: this.leaveVid,
        token: this.imUserInfo.token,
        fd: this.webSocketFd,
        type: this.tabNumber == 1 ? this.room_type : 2,
      };
      this.$store.dispatch("leaveRoom", data).then((res) => {});
    },
    changeHeight() {
      setTimeout(() => {
        let chatBox = document.querySelector(
          ".ChatDetails_container"
        ).clientHeight;
        let headerBox = document.querySelector(".header-list").clientHeight;
        let pinBox = this.pinInfo
          ? document.querySelector(".pin-info").clientHeight
          : 0;
        let senBox = document.querySelector(".send-container").clientHeight;
        this.chatMsgHight = chatBox - headerBox - pinBox - senBox;
      }, 1000);
    },
    changeType(num) {
      if (this.showLoading || this.tabNumber === num) return;
      const qVid = this.qsVid;
      this.page = 1;
      this.tabNumber = num;
      this.controlIndex = -1;
      this.showLoading = true;
      switch (num) {
        case 0:
          this.parmUserInfo.vid = qVid;
          this.inRoomInfo(this.webSocketFd);
          this.backBefore();
          break;
        case 1:
          this.newMsg.groupChat = false;
          this.showChatList = true;
          if (!this.showChatList) this.inRoomInfo(this.webSocketFd);
          break;
        case 2:
          this.inviteCount = 0;
          this.inRoomInfo(this.webSocketFd);
          this.newMsg.privateChatTotal = false;
          let vInfo = JSON.parse(localStorage.getItem("vidInfo")) || {};
          if(!vInfo.hasOwnProperty(qVid)){
            return
          }
          this.parmUserInfo.vid = vInfo[qVid];
          this.backBefore();
          break;  
      }
      this.changeHeight();
    },
    inviteRoom(init = false) {
      if (!this.webSocketFd) return;
      const _that = this;
      const roomId = this.qsVid;
      let roomInfo = JSON.parse(localStorage.getItem("vidInfo")) || {};
      this.$store
        .dispatch("inviteRoom", {
          type: init ? 2 : this.tabNumber,
          is_new: 1,
          token: this.imUserInfo.token,
          fd: this.webSocketFd,
          name: this.parmUserInfo.username,
          user_id: getQueryString().uid,
          channel: this.channel,
        })
        .then((res) => {
          roomInfo[roomId] = res.data.vid;
          localStorage.setItem("vidInfo", JSON.stringify(roomInfo));
          if (this.initInvite) {
            this.initInvite = false;
            return;
          }
          this.parmUserInfo.vid = res.data.vid;
          this.inRoomInfo(this.webSocketFd);
          this.controlIndex = -1;
        });
    },
    getChatHistoryMsg(iniPage) {
      const _that = this;
      this.showLoading = true;
      let params = {
        page: iniPage || this.page,
        limit: 20,
        type: this.tabNumber == 1 ? this.room_type : this.tabNumber || 0,
        vid: this.parmUserInfo.vid,
        user_id: this.parmUserInfo.user_id,
      };
      this.$store
        .dispatch("getChatHistory", params)
        .then((res) => {
          let dataList = res.data.reverse();
          this.showLoading = false;
          this.initTab = false;
          if (dataList.length === 0) {
            this.isMore = false;
            return;
          }
          this.mergeDataList(
            params.type == 2 && this.tabNumber == 1 ? 1 : params.type,
            params.page != 1 ? "unshift" : "init",
            dataList
          );
        })
        .catch((res) => {
          this.showLoading = false;
        });
    },
    inRoomInfo(webSocketFd) {
      const _that = this;
      const inRoomData = {
        vid: this.parmUserInfo.vid,
        token: this.imUserInfo.token,
        fd: webSocketFd,
        type: this.tabNumber == 1 ? this.room_type : this.tabNumber || 0,
        channel: this.channel,
      };
      if (this.tabNumber == 1 || this.tabNumber == 2) this.leaveVid = this.parmUserInfo.vid;
      this.$store.dispatch("inRoom", inRoomData).then((res) => {
        if (res.data.pinData && res.data.pinData != "") {
          _that.pinInfo = {
            text: res.data.pinData,
          };
        }

        _that.inRoom = true;
        _that.getChatHistoryMsg(1);
        _that.changeHeight();
      });
    },
    newSocket(data) {
      let wsprotocol = window.location.protocol === "http:" ? "ws" : "wss";
      let windowHost = window.location.hostname;
      // this.WSURL = `${wsprotocol}://${windowHost}/wss/?token=${data.token}&tokenid=${data.id}&vid=${this.qsVid}`;
      // this.WSURL = `ws://huyapre.oxldkm.com/wss/?token=${data.token}&tokenid=${data.id}&vid=${this.qsVid}`;
      // this.WSURL = `ws://huyapretest.oxldkm.com/wss/?token=${data.token}&tokenid=${data.id}&vid=${this.qsVid}`;
      // this.WSURL = `wss://www.x9zb.live/wss/?token=${data.token}&tokenid=${data.id}&vid=${this.qsVid}`;
      this.WSURL = `ws://huidu.x9zb.live/wss/?token=${data.token}&tokenid=${data.id}&vid=${this.qsVid}`;

      this.ws = new WebSocket(this.WSURL);
      // 连接建立时触发
      this.ws.onopen = this.websocketonopen;
      // 传送消息时触发
      this.ws.onmessage = this.websocketonmessage;      
      // 通信发生错误时触发
      this.ws.onerror = this.websocketonerror;
      // 连接关闭时触发
      this.ws.onclose = this.websocketclose;

    },
    websocketonopen() {
      //开启心跳
      this.start();
    },
    // 通信发生错误时触发
    websocketonerror() {
      this.reconnect();
    },
    // 连接关闭时触发
    websocketclose(e) {
      //关闭
      this.ws.close();
      //重连
      this.reconnect();
    },
    reconnect() {
      //重新连接
      if (this.lockReconnect) return;
      this.lockReconnect = true;
      //没连接上会一直重连，设置延迟避免请求过多
      this.timeoutnum && clearTimeout(this.timeoutnum);
      const _that = this;
      this.timeoutnum = setTimeout(() => {
        //新连接
        _that.initInvite = true;
        _that.lockReconnect = false;
      }, 5000);
    },
    reset() {
      //重置心跳
      clearTimeout(this.timeoutObj);
      //清除时间
      clearTimeout(this.serverTimeoutObj);
      //重启心跳
      this.start();
    },
    start() {
      //开启心跳
      this.timeoutObj && clearTimeout(this.timeoutObj);
      this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
      let i = 0;
      this.heart(i);
    },
    heart(i) {
      this.timeoutObj = setTimeout(() => {
        //这里发送一个心跳，后端收到后，返回一个心跳消息，
        this.ws.readyState === 1 ? this.ws.send("heart") : false;
        this.heart(i);
      }, this.timeout);
    },
    sendMessage(uiCode, text) {
      let data = {
        vid: this.parmUserInfo.vid,
        fd: this.webSocketFd,
        type: this.tabNumber === 1 ? this.room_type : this.tabNumber || 0,
        text: text,
        method: "notice",
        msg_type: this.tabNumber === 0 ? 0 : 1, //0为弹幕,1文字
        color: "#000",
        sender: this.parmUserInfo.user_id,
        token: this.imUserInfo.token,
        channel: this.channel,
      };
      if (this.tabNumber === 2) data.receiver = getQueryString().uid;
      if (this.msgType === 2) {
        let formData = new FormData();
        formData.append("vid", this.parmUserInfo.vid);
        formData.append("fd", this.webSocketFd);
        formData.append("title", "");
        formData.append("link", "");
        formData.append(
          "type",
          this.tabNumber === 1 ? this.room_type : this.tabNumber || 0
        );
        formData.append("method", "notice");
        formData.append("msg_type", 2);
        formData.append("color", "#000");
        formData.append("sender", this.parmUserInfo.user_id);
        formData.append("token", this.imUserInfo.token);
        formData.append("channel", this.channel);
        formData.append("pic", this.formData.pic);
        formData.append("text", "");
        data = formData;
      }
      this.$store
        .dispatch("sendMessage", data)
        .then((res) => {
          if (res.msg == "connection error") {
            this.getUserToken();
          } else if (res.code !== 0) {
            this.mergeDataList(this.tabNumber).find(
              (item) => item.uiCode === uiCode
            ).isError = true;
          }
          this.msgText = "";
          this.msgType = 1;
          this.formData.pic = "";
          this.fileList = [];
          this.uploadImgShow = false;
          this.toBottom();
        })
        .catch((error) => {
          this.mergeDataList(this.tabNumber).find(
            (item) => item.uiCode === uiCode
          ).isError = true;
        });
    },
    submitMessage() {
      this.isShowEmoji = false;
      var strRegex =
        /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
      var re = new RegExp(strRegex);
      if (re.test(this.msgText.replace(/(\s*$)/g, ""))) {
        this.$message.error("无法发送超连结");
        this.msgText = "";
        return;
      } else if (this.tabNumber === 0 && !this.token) {
        this.$message.error("未登录不能在直播间发言~");
        return;
      } else if (!this.isAllowedSendMsg || this.msgText == "") {
        if (this.msgType === 2) {
          this.msgText = "";
          this.sendMessage(null, this.msgText);
        }
        return;
      }
      let currentDate = new Date().getTime();
      let sendMessageList = {
        avatar: this.info.avatar,
        sender: this.parmUserInfo.user_id,
        sender_nickname: this.info.user_nickname,
        sender_exp: this.infos.exp,
        text: this.msgText,
        uiCode: currentDate,
        isError: false,
      };
      this.mergeDataList(this.tabNumber, "push", sendMessageList);
      this.sendMessage(currentDate, this.msgText);
      this.msgText = "";
      return;
    },
    // 客户端接收服务端数据时触发
    websocketonmessage(event) {
      let data = JSON.parse(event.data);
     
      switch (data.action) {
        case "open":
          if (data.fd !== null) {
            this.webSocketFd = data.fd;
            this.inRoomInfo(this.webSocketFd);
          }
          break;
        case "clearHistory":
          this.mergeDataList(this.tabNumber, "empty");
          break;
        case "delmsg":
          let mergeArrData = this.mergeDataList(this.tabNumber);
          let delIndex = mergeArrData.findIndex(
            (item) => item.msg_id * 1 === data.msg_id * 1
          );
          mergeArrData.splice(delIndex, 1);
          this.mergeDataList(this.tabNumber, "init", mergeArrData);
          break;
        case "newRoom":
          if (this.tabNumber !== 2 && data.room_type === "2")
            this.inviteCount = this.inviteCount + 1;
          if (data.fd !== this.webSocketFd) {
            switch (data.room_type) {
              case "1":
                this.newMsg.groupChat = true;
                this.unreadTotal++;
                break;
              case "2":
                this.newMsg.privateChatTotal = true;
                break;
            }
          }
          break;
        case "unread":
          let unreadMsgList = data.data || [];
          this.refreshUnreadEvent(unreadMsgList, 0);
          break;
        case "newMsg":
          let newMsgList = {
            vid: data.newMsgRoomvid,
            room_type: data.room_type,
            unread_count: 1,
            text: data.text,
          };
          this.refreshUnreadEvent(newMsgList, 1);
          break;
        case "send":
        case "system":
          if (data.action === "send" && data.msg_type === "0") {
            let sendMsgList = {
              messageForShow: data.text,
              textContent: data.text,
            };
            this.$store.commit("setdanmakuShow", sendMsgList);
          }
          //自己发送的消息不渲染到列表
          //遊客判斷sender過濾相同訊息
          if (
            data.sender === localStorage.getItem("userid") ||
            data.sender_nickname === this.info.user_nickname ||
            (data.sender_nickname.includes("游客") && this.tabNumber === 0) ||
            (data.text.includes("进入直播间") && this.tabNumber !== 0)
          ) {
            return;
          }
          this.mergeDataList(this.tabNumber, "push", data);
          this.toBottom();
          break;
        case "pin":
          this.pinInfo = data.pin === 1 ? JSON.parse(data.data) : "";
          this.pinInfo.msg_id = data.msg_id;
          break;
        case "gift":
          if (this.tabNumber !== 0) return;
          let gift = this.giftList.filter((item) => item.id == data.gift_id)[0];
          data.text = `感谢${data.sender_nickname}送了${gift.giftname}`;
          this.mergeDataList(this.tabNumber, "push", data);
          this.$emit("onhandleSendGift", data);
          break;
      }
      if (data.status == 200) {
        if (data.data) {
          switch (data.data.type) {
            case "dialog":
              this.mergeDataList(
                this.tabNumber,
                "init",
                data.data.historyMessageList
              );
              this.myUserinfo = data.data.targetUserInfo;
              this.webSocketFd = data.data.targetUserInfo.fd;
              break;
            case "call":
              this.mergeDataList(this.tabNumber).push({
                ...data.data.content,
                uid: this.userInfo.uid,
              });
              this.toBottom();
              if (data.data.content.type == 1) {
                this.msgText = "";
                if (this.hasSendMsgCount > 0)
                  this.hasSendMsgCount = this.hasSendMsgCount - 1;
              }
              break;
            case "message":
              this.$store.dispatch("getUnReadMsgNum");
              this.mergeDataList(this.tabNumber).push({
                ...data.data.content,
                uid: this.uid,
              });
              this.toBottom();
              if (data.data.content.type == 1) this.msgText = "";
              break;
          }
        }
      }
    },
    // 聊天框滚动到最底部
    toBottom() {
      let box = document.getElementsByClassName("chat-window")[0];
      this.$nextTick(() => (box.scrollTop = box.scrollHeight));
    },
    //解耦合
    mergeDataList(type, status, data) {
      if (type !== this.tabNumber) return;
      switch (status) {
        case "init":
          if (type === 0) {
            this.msgSquareList = data;
          } else if (type === 1) {
            this.msgChatList = data;
          } else {
            this.msgAnchorList = data;
          }
          break;
        case "push":
          if (data.pic !== undefined)
            data.pic = window.location.origin + data.pic;
          if (type === 0) {
            this.msgSquareList.push(data);
          } else if (type === 1) {
            this.msgChatList.push(data);
          } else {
            this.msgAnchorList.push(data);
          }
          break;
        case "unshift":
          data.forEach((el) => {
            if (type === 0) {
              this.msgSquareList.unshift(el);
            } else if (type === 1) {
              this.msgChatList.unshift(el);
            } else {
              this.msgAnchorList.unshift(el);
            }
          });
          break;
        case "empty":
          this.msgSquareList = [];
          this.msgChatList = [];
          this.msgAnchorList = [];
          break;
      }
      this.toBottom();
    },
    
  },
};
</script>
<style lang="scss" scoped>
@-webkit-keyframes el-skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
.animation-loading-container {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: #fbfbfb;
}
.animation-loading {
  margin-bottom: 30px;
  position: relative;
  width: 100%;
  height: 50px;
  z-index: 9999;
  background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
  background-size: 400% 100%;
  animation: el-skeleton-loading 1.4s ease infinite;
}
.error-msg {
  font-size: 14px;
  color: red;
  display: inline-block;
  margin-left: 5px;
}
.el-icon-message-solid {
  color: #c41d48;
  font-size: 16px;
  position: absolute;
  top: 10px;
  left: 10px;
  margin-right: 4px;
}
.hi-tag {
  display: inline-block;
  height: 18px;
  margin-right: 4px;
  margin-bottom: 2px;
}
.text-name {
  display: inline-block;
  color: rgb(0 0 0 / 40%);
  width: 130px;
}
.anchor-tag {
  display: inline-block;
  padding: 0 6px;
  height: 18px;
  margin-right: 4px;
  font-size: 12px;
  font-weight: bold;
  line-height: 18px;
  border-radius: 10px;
  background: linear-gradient(114deg, #ebcaa9 0%, #dab16f 100%);
  color: #9c583d;
}
.level-tag {
  color: #fff;
  display: inline-block;
  padding: 0 4px;
  height: 18px;
  margin-right: 4px;
  font-size: 14px;
  line-height: 18px;
  border-radius: 2px;
  &.level0 {
    background: #d1d1d1;
  }
  &.level1 {
    background: #8bf093;
  }
  &.level2 {
    background: #63d671;
  }
  &.level3 {
    background: #5ac8b5;
  }
  &.level4 {
    background: #3b8ea9;
  }
  &.level5 {
    background: #235b8a;
  }
  &.level6 {
    background: #3244b4;
  }
  &.level7 {
    background: #602ad0;
  }
  &.level8 {
    background: #9f2ad0;
  }
  &.level9 {
    background: #bd20ff;
  }
}
.text-info {
  display: initial;
  color: rgb(0 0 0 / 80%);
}
form {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  opacity: 0;
}
.add-img {
  font-size: 14px;
  width: 100% !important;
  height: 100% !important;
  text-align: center;
  left: 0;
  top: 0 !important;
}
.add-img-container img {
  width: 100% !important;
  height: 100% !important;
  position: absolute;
  left: 0;
  top: 0;
}
.add-img-container {
  padding: 4px;
  border: 1px dashed #ababab;
  height: 50px;
  position: absolute;
  width: 80px;
  top: 45px;
  input {
    position: absolute;
    width: 100% !important;
    height: 100% !important;
  }
}
.uploadImg {
  height: 20px;
  margin-left: 10px;
  position: relative;
  top: -6px;
  left: 7px;
  cursor: pointer;
}

.pic-info {
  max-height: 80px;
  max-width: 80px;
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

.new-msg-icon {
  font-style: normal;
  width: 15px;
  z-index: 1;
  height: 15px;
  border-radius: 20px;
  position: absolute;
  right: 3px;
  top: 1px;
  font-size: 10px;
  background-color: red;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.top-text-scroll {
  display: inline-block;
  /*inline样式不能使用动画*/
  animation: scroll 5s linear infinite;
}
.top-text-scroll:after {
  position: absolute;
  left: 100%;
  content: attr(data-text);
  margin-left: 4em;
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(calc(-100% - 4em));
  }
}

.quick-container {
  position: relative;
  bottom: 0;
}
.msg-arr {
  position: absolute;
  background: #ffe9c7;
  border-radius: 6px;
  color: #b67602;
  left: 0;
  bottom: 40px;
  padding: 10px;
  z-index: 99;
  height: 240px;
  width: 100%;
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
#cp-input {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
.header-list {
  height: 38px;
  display: flex;
  span {
    position: relative;
    color: #000;
    line-height: 38px;
    background: #f4f4f4;
    text-align: center;
    display: inline-block;
    margin-right: 1px;
    font-size: 14px;
    flex: 1;
    &:hover {
      cursor: pointer;
    }
    .hot-tag {
      display: inline-block;
      height: 25px;
      margin-right: 2px;
      margin-bottom: 3px;
      margin-left: -10px;
    }
    &.on {
      background-color: #c41d48;
      color: #fff;
    }
  }
}
#msg {
  border: 1px solid #c41d48;
  border-radius: 4px;
  padding: 6px;
  width: 75%;
  line-height: 20px;
}

::v-deep.el-drawer__header {
  margin-bottom: 0;
  padding-top: 2vw;
}
.el-drawer.btt {
  height: auto;
}
.emoji-btn {
  position: relative;
  cursor: pointer;
}
::v-deep.emoji-box {
  position: absolute;
  bottom: 110px;
  right: 20px;
  .emoji-picker {
    width: 300px;
    .container-emoji {
      .grid-emojis {
        .emoji {
          font-size: 21px !important;
        }
      }
    }
  }
}
.switch-box {
  text-align: right;
  padding-bottom: 2vh;
  padding-right: 2vw;
}
.ChatDetails_container {
  background: #fff;
  min-height: 549px;
  position: relative;
  min-width: 334px;
  height: 100%;
  .send-container {
    height: 122px;
    position: absolute;
    bottom: 0;
    min-width: 335px;
    line-height: 50px;
    background: #fff;
    padding: 10px;
    border-top: 1px solid #f1f1f1;
    border-right: 1px solid #f1f1f1;
    text-align: left;
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
      width: 96%;
      display: flex;
      height: 35px;
      align-content: center;
      .send {
        padding: 0 20px;
        position: relative;
        right: -12px;
        border-radius: 4px;
        color: #fff;
        background-color: #c41d48;
        height: 34px;
        line-height: 34px;
        &:hover {
          cursor: pointer;
        }
      }
      .no_send {
        padding: 0 20px;
        position: relative;
        right: -12px;
        border-radius: 4px;
        background-color: rgba(149, 152, 230, 0.1);
        color: #959db0;
        height: 34px;
        line-height: 34px;
      }
    }
  }
  .chat-window {
    background: #fff;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    &.isChat {
      padding-top: 46px;
    }
  }
  .chat-detail-main {
    background: #fff;
    padding: 0 10px 30px 10px;
    .system-tips {
      margin-top: -26px;
      font-size: 12px;
      color: #000;
    }
    .msg-container {
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
      border-radius: 4px;
      font-size: 16px;
      padding: 4px 0;
      word-break: break-all;
      color: #343a40;
      &.anchor-msg {
        .text-name,
        .text-info {
          color: #ffa930;
        }
      }
      .msg-footer {
        font-size: 12px;
        color: #707070;
        text-align: right;
        display: inline-block;
        span {
          font-size: 12px;
          margin: 0 4px;
          color: #47a2ff;
        }
      }
    }

    .other-side {
      position: relative;
      text-align: left;
      .model-img {
        width: 100%;
      }
      .msg-footer {
        text-align: left;
      }
    }
    .is-anchor {
      .msg-content {
        display: flex;
        margin-top: 10px;
        padding: 0 5px;
        .msg-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 40px;
          max-width: 40px;
          height: 40px;
          margin-right: 5px;
          border-radius: 5px;
          overflow: hidden;
          .avatar {
            width: 40px;
          }
        }
        .text-info {
          align-self: flex-start;
          position: relative;
          max-width: 65%;
          min-height: 30px;
          margin-left: 10px;
          padding: 4px;
          border-radius: 7px;
          background: #eee;
          &::after {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 0;
            height: 10px;
            margin-top: 5px;
            margin-left: -18px;
            border-color: transparent #eee transparent transparent;
            border-style: solid;
            border-width: 4px 10px;
          }
        }
        &.my-self {
          flex-direction: row-reverse;
          .text-info {
            margin-right: 10px;
            margin-left: 0;
            &::after {
              margin-left: calc(100% - 3px);
              border-color: transparent transparent transparent #eee;
            }
          }
        }
      }
    }
  }
}
.msg-control {
  display: inline-block;
  position: absolute;
  background: #000;
  padding: 4px 10px;
  z-index: 99;
  bottom: -50px;
  left: 88px;
  border-radius: 6px;
  div {
    padding: 4px 0;
    color: #fff;
    font-size: 12px;
    &:hover {
      cursor: pointer;
    }
    i {
      width: 0;
      height: 0;
      left: 14px;
      border-style: solid;
      border-color: transparent transparent #000 transparent;
      border-width: 0 10px 10px 10px;
      position: absolute;
      top: -10px;
    }
  }
  &.other {
    bottom: -40px;
  }
}
.pin-info {
  background: #f7e7ce;
  padding: 10px;
  text-align: left;
  border-radius: 4px;
  position: relative;
  color: #7d4628;
  width: 100%;
  left: 0;
  font-size: 12px;
  padding-left: 30px;
  z-index: 1;
  word-break: break-all;
}
.el-button--danger {
  background-color: #c41d48;
}
.el-button--danger:hover,
.el-button--danger:focus {
  background-color: #c41d47a1;
}
::v-deep.el-dialog-loginOut {
  .el-dialog {
    width: 25%;
    .el-dialog__body {
      .upload-demo {
        text-align: center;
      }
    }
  }
}
</style>
