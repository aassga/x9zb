<!-- 聊天 -->
<template>
  <div
    class="detail"
    v-show="showMsgInfo || current != 2"
    :class="{
      'app-version': hidevideo,
      'add-margin': current == 2,
      'is-ios': iosDevice,
    }"
  >
    <div v-if="false" class="animation-loading-container">
      <div class="animation-loading" v-for="i in 10" :key="i"></div>
    </div>
    <div class="announcement" v-if="current !== 2 || $store.state.system.announcement === undefined">
      <div class="announcement-icon">
        <img src="./../../../static/images/live/volume.png" />
      </div>
      <div class="announcement-item">
        {{ $store.state.system.announcement }}
      </div>
    </div>
    <div id="chat-models">
      <input id="cp-input" />
      <div class="ChatDetails_container">
        <div v-if="pinInfo" class="pin-info">
          {{ pinInfo.text }}
        </div>
        <div class="chat-window" :class="{ 'chat-pin': pinInfo }" @click="clearStatus()">
          <div class="chat-detail-main current0" ref="content-list">
            <!-- v-if="current == 0" -->
            <div v-for="(item, index) in messageDataList" :key="index">
              <div class="system-tips" v-if="item.action === 'system'">
                {{ item.text }}
              </div>
              <template v-else>
                <div
                  class="other-side"
                  v-if="
                    item.channel == 'null' ||
                    !item.channel ||
                    item.channel === channel ||
                    (!channel && item.channel === '000') ||
                    item.channel === null
                  "
                >
                  <div class="msg-box">
                    <div class="msg-container">
                      <div
                        class="msg-content"
                        @click.stop="showControl(index)"
                        :style="
                          item.text === '进入直播间' ||
                          item.text.includes('进入直播间')
                            ? 'text-align:center'
                            : ''
                        "
                      >
                        <div class="msg-footer">
                          <span
                            :style="
                              item.text === '进入直播间' ||
                              item.text.includes('进入直播间')
                                ? 'color:rgba(0 0 0 /20%)'
                                : ''
                            "
                            >{{ item.sender_nickname || "我"
                            }}<span
                              v-if="
                                item.text !== '进入直播间' &&
                                !item.text.includes('进入直播间')
                              "
                              >:</span
                            ></span
                          >
                        </div>
                        <template v-if="item.pic && !item.text">
                          <img
                            @click.stop="onHandleClickImg(item.pic)"
                            :src="item.pic | picFilter"
                            class="pic-info"
                          />
                        </template>
                        <template v-if="item.pic && item.text">
                          <div
                            class="thumb-container"
                            @click.stop="openAppUrl(item.link)"
                          >
                            <img
                              class="thumb-pic"
                              :src="item.pic | picFilter"
                            />
                            <div class="thumb-title">
                              {{ item.title }}
                            </div>
                            <br />
                            <div class="thumb-text">
                              {{ item.text }}
                            </div>
                          </div>
                        </template>
                        <div
                          v-else
                          @click="openAppUrl(item.text)"
                          class="text-info"
                          v-html="getText(item.text)"
                          :style="
                            item.text === '进入直播间'
                              ? 'color:rgba(0 0 0 /20%)'
                              : ''
                          "
                        ></div>
                        <i
                          class="el-icon-warning error-msg"
                          v-if="item.isError"
                          @click="resend(item)"
                          >重新发送</i
                        >
                        <div
                          v-if="controlIndex === index" class="msg-control other"
                        >
                          <div @click="copyText(item)">复制</div>
                          <div
                            v-if="system.report == 1"
                            @click="onHandleReportShow(item)"
                          >
                            举报
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <!-- <div
            class="chat-detail-main current1"
            ref="content-list"
            v-if="current == 1"
          >
            <div v-for="(item, index) in messageDataList" :key="index">
              <div class="system-tips" v-if="item.action === 'system'">
                {{ item.text }}
              </div>
              <template v-else>
                <div
                  class="other-side"
                  v-if="
                    item.channel == 'null' ||
                    !item.channel ||
                    item.channel === channel ||
                    (!channel && item.channel === '000')
                  "
                >
                  <div class="msg-box">
                    <div class="msg-container">
                      <div class="msg-content" @click.stop="showControl(index)">
                        <div class="msg-footer">
                          <span>{{ item.sender_nickname || "我" }}:</span>
                        </div>
                        <template v-if="item.pic && !item.text">
                          <img
                            @click.stop="onHandleClickImg(item.pic)"
                            :src="item.pic | picFilter"
                            class="pic-info"
                          />
                        </template>
                        <template v-if="item.pic && item.text">
                          <div
                            class="thumb-container"
                            @click.stop="openAppUrl(item.link)"
                          >
                            <img
                              class="thumb-pic"
                              :src="item.pic | picFilter"
                            />
                            <div class="thumb-title">
                              {{ item.title }}
                            </div>
                            <br />
                            <div class="thumb-text">
                              {{ item.text }}
                            </div>
                          </div>
                        </template>
                        <div
                          v-else
                          @click="openAppUrl(item.text)"
                          class="text-info"
                          v-html="getText(item.text)"
                        ></div>
                        <i
                          class="el-icon-warning error-msg"
                          v-if="item.isError"
                          @click="resend(item)"
                          >重新发送</i
                        >
                        <div
                          v-if="controlIndex === index"
                          class="msg-control other"
                        >
                          <div @click="freeze(item)">冻结</div>
                          <div @click="copyText(item)">复制</div>
                          <div
                            v-if="system.report == 1"
                            @click="onHandleReportShow(item)"
                          >
                            举报
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div
            class="chat-detail-main current2"
            ref="content-list"
            v-if="current == 2"
          >
            <div v-for="(item, index) in messageDataList" :key="index">
              <div class="system-tips" v-if="item.action === 'system'">
                {{ item.text }}
              </div>
              <template v-else>
                <div
                  class="other-side"
                  v-if="
                    item.channel == 'null' ||
                    !item.channel ||
                    item.channel === channel ||
                    (!channel && item.channel === '000')
                  "
                >
                  <div class="msg-box">
                    <div class="msg-container">
                      <div class="msg-content" @click.stop="showControl(index)">
                        <div class="msg-footer">
                          <span>{{ item.sender_nickname || "我" }}:</span>
                        </div>
                        <template v-if="item.pic && !item.text">
                          <img
                            @click.stop="onHandleClickImg(item.pic)"
                            :src="item.pic | picFilter"
                            class="pic-info"
                          />
                        </template>
                        <template v-if="item.pic && item.text">
                          <div
                            class="thumb-container"
                            @click.stop="openAppUrl(item.link)"
                          >
                            <img
                              class="thumb-pic"
                              :src="item.pic | picFilter"
                            />
                            <div class="thumb-title">
                              {{ item.title }}
                            </div>
                            <br />
                            <div class="thumb-text">
                              {{ item.text }}
                            </div>
                          </div>
                        </template>
                        <div
                          v-else
                          @click="openAppUrl(item.text)"
                          class="text-info"
                          v-html="getText(item.text)"
                        ></div>
                        <i
                          class="el-icon-warning error-msg"
                          v-if="item.isError"
                          @click="resend(item)"
                          >重新发送</i
                        >
                        <div
                          v-if="controlIndex === index"
                          class="msg-control other"
                        >
                          <div @click="copyText(item)">复制</div>
                          <div
                            v-if="system.report == 1"
                            @click="onHandleReportShow(item)"
                          >
                            举报
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <div class="send-container" v-show="showMsgInfo || current != 2">
      <div v-if="isShowEmoji" class="emoji-box">
        <VEmojiPicker
          :showSearch="false"
          :showCategories="false"
          :emojisByRow="10"
          @select="selectEmoji"
          v-show="isShowEmoji"
        />
      </div>
      <div class="quick-reply-list">
        <div class="send-type-container">
          <svg
          @click="isShowEmoji = !isShowEmoji"
          class="emoji-btn"
          style="max-height: 30px"
          width="25"
          height="25"
          viewBox="0 0 40 40"
          fill="none"
        >
          <circle
            cx="20"
            cy="20"
            r="18.3333"
            stroke="black"
            stroke-opacity="0.4"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.6667 23.6667C12.6667 23.6667 15.4167 27.3334 20 27.3334C24.5834 27.3334 27.3334 23.6667 27.3334 23.6667"
            stroke="black"
            stroke-opacity="0.4"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14.5 14.5H14.5184"
            stroke="black"
            stroke-opacity="0.4"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M25.5 14.5H25.5184"
            stroke="black"
            stroke-opacity="0.4"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          </svg>           
        </div>
      
        <div v-if="current != 0" class="send-type-container">
          <svg
            width="25"
            height="25"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            v-if="!hidevideo"
            @click="uploadImg = true"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.166687 6.06669C0.166687 2.80822 2.8082 0.166687 6.06669 0.166687H33.9333C37.1918 0.166687 39.8334 2.8082 39.8334 6.06669V33.9333C39.8334 37.1918 37.1918 39.8334 33.9334 39.8334H6.06669C5.99387 39.8334 5.92134 39.832 5.84915 39.8294C5.70403 39.8399 5.55771 39.8293 5.41507 39.7978C2.46321 39.4735 0.166687 36.9716 0.166687 33.9334V6.06669ZM9.36188 36.8334H33.9334C35.535 36.8334 36.8334 35.535 36.8334 33.9333V26.7326L28.148 18.0472L9.36188 36.8334ZM36.8334 22.49L29.2086 14.8653C28.9273 14.584 28.5458 14.4259 28.148 14.4259C27.7502 14.4259 27.3686 14.584 27.0873 14.8653L5.23905 36.7135C4.04067 36.3573 3.16669 35.2474 3.16669 33.9334V6.06669C3.16669 4.46507 4.46506 3.16669 6.06669 3.16669H33.9333C35.535 3.16669 36.8334 4.46506 36.8334 6.06669V22.49ZM12.8704 11.3148C12.0113 11.3148 11.3149 12.0113 11.3149 12.8704C11.3149 13.7295 12.0113 14.4259 12.8704 14.4259C13.7295 14.4259 14.426 13.7295 14.426 12.8704C14.426 12.0113 13.7295 11.3148 12.8704 11.3148ZM8.31488 12.8704C8.31488 10.3544 10.3545 8.31483 12.8704 8.31483C15.3864 8.31483 17.426 10.3544 17.426 12.8704C17.426 15.3863 15.3864 17.4259 12.8704 17.4259C10.3545 17.4259 8.31488 15.3863 8.31488 12.8704Z"
              fill="black"
              fill-opacity="0.4"
            />
          </svg>
        </div>
        <div class="send-type-container">
          <svg
            width="25"
            height="25"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            @click="getshare"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M30.2778 3.16669C28.0237 3.16669 26.2222 4.97173 26.2222 7.16669C26.2222 7.86403 26.4041 8.52201 26.7245 9.09526C26.744 9.12418 26.7626 9.15398 26.7803 9.18464C26.7935 9.20744 26.806 9.23045 26.8178 9.25363C27.5284 10.3979 28.8067 11.1667 30.2778 11.1667C32.5319 11.1667 34.3334 9.36165 34.3334 7.16669C34.3334 4.97173 32.5319 3.16669 30.2778 3.16669ZM25.0793 11.8997C26.3713 13.2948 28.2254 14.1667 30.2778 14.1667C34.1602 14.1667 37.3334 11.0469 37.3334 7.16669C37.3334 3.28652 34.1602 0.166687 30.2778 0.166687C26.3954 0.166687 23.2222 3.28652 23.2222 7.16669C23.2222 7.91616 23.3406 8.63727 23.5596 9.31301L13.2541 15.267C11.9621 13.8719 10.1079 13 8.05556 13C4.17313 13 1 16.1199 1 20C1 23.8802 4.17313 27 8.05556 27C10.1082 27 11.9627 26.1279 13.2546 24.7324L23.5623 30.6789C23.3416 31.357 23.2222 32.0809 23.2222 32.8334C23.2222 36.7135 26.3954 39.8334 30.2778 39.8334C34.1602 39.8334 37.3334 36.7135 37.3334 32.8334C37.3334 28.9532 34.1602 25.8334 30.2778 25.8334C28.2285 25.8334 26.3769 26.7026 25.0852 28.094L14.774 22.1455C14.9928 21.47 15.1111 20.7492 15.1111 20C15.1111 19.2505 14.9927 18.5294 14.7737 17.8537L25.0793 11.8997ZM11.5156 17.9133C11.5274 17.9364 11.5399 17.9593 11.5531 17.9821C11.5707 18.0127 11.5893 18.0424 11.6088 18.0713C11.9292 18.6446 12.1111 19.3026 12.1111 20C12.1111 20.6974 11.9293 21.3554 11.6088 21.9287C11.5892 21.9579 11.5704 21.9879 11.5526 22.0188C11.5396 22.0413 11.5273 22.064 11.5156 22.0868C10.805 23.2311 9.52669 24 8.05556 24C5.80149 24 4 22.195 4 20C4 17.8051 5.80149 16 8.05556 16C9.52671 16 10.8051 16.7689 11.5156 17.9133ZM26.2222 32.8334C26.2222 32.1747 26.3844 31.5512 26.6724 31.001C26.7186 30.943 26.7611 30.8808 26.7993 30.8146C26.8317 30.7584 26.8601 30.701 26.8845 30.6427C27.6067 29.5559 28.8516 28.8334 30.2778 28.8334C32.5319 28.8334 34.3334 30.6384 34.3334 32.8334C34.3334 35.0283 32.5319 36.8334 30.2778 36.8334C28.0237 36.8334 26.2222 35.0283 26.2222 32.8334Z"
              fill="black"
              fill-opacity="0.4"
            />
          </svg>
        </div>

        <div
          v-if="current == 0 && system.report == 1"
          @click="onHandleReportShow(false)"
          class="quick-reply-list-btn"
        >
          举报
        </div>
        <div class="footer-box">
          <!-- v-if="msgType != 2" -->
          <textarea
            id="msg"
            :style="current !== 0 ? 'width:11.5em':'width:14em'"
            type="text"
            @blur="toTop"
            placeholder="请输入内容"
            rows="1"
            v-model="msgText"
            ref="msg"
            v-on:keyup.enter="sendMsg"
          >
          </textarea>
          <span class="send" @click="sendMsg">发送</span>
        </div>
      </div>


      <!-- <div
        id="add-img"
        :class="{
          'show-img-container': msgType == 2,
          'add-img-container': current != 0,
        }"
      >
        <div id="inputContent" ref="inputContent"></div>
        <span v-if="!prevImg && current != 0" class="add-img">添加图片</span>
        <img v-else :src="prevImg" />
      </div> -->
    </div>
    <u-popup border-radius="20" mode="bottom" v-model="reportListShow">
      <scroll-view class="reportList">
        <div class="reportList_context">
          <div class="reportList_title">
            <div class="reportList_title_close" @click="coloseReport">取消</div>
            <div class="reportList_title_confirm" @click="confirmReport">
              确认
            </div>
          </div>
          <u-radio-group wrap v-model="reportValue" @change="radioChange">
            <u-radio
              v-for="(item, index) in reportList"
              :key="index"
              :name="item.id"
              >{{ item.name }}</u-radio
            >
          </u-radio-group>
        </div>
      </scroll-view>
    </u-popup>
    <u-popup v-model="share" mode="center" border-radius="20" :closeable="true">
      <view class="share-box">
        <view class="share-box-title">分享直播间</view>
        <view class="share-box-row">
          <input type="text" v-model="shareUrl" disabled />
          <text class="share-box-copy" @click="copyUrl()">复制链接</text>
        </view>
      </view>
    </u-popup>
    <u-popup
      v-model="uploadImg"
      mode="center"
      border-radius="20"
      :closeable="true"
    >
      <u-upload
        ref="uUpload"
        :auto-upload="false"
        :multiple="false"
        :maxCount="1"
      ></u-upload>
      <u-button @click="submit">上傳</u-button>
    </u-popup>
  </div>
</template>

<script>
import { getQueryString } from "@/common/Qs";
import { getUUID } from "@/common/uuid";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import { VEmojiPicker } from "v-emoji-picker";
export default {
  name: "information-detail",
  props: ["roomDetailData", "current", "roomInfo", "showMsgInfo", "qsVid",],
  components: {
    VEmojiPicker,
  },
  data() {
    return {
      reportListShow: false,
      reportList: [],
      reportValue: "",
      isErrorMsg:true,
      url: window.location.href,
      modalMsgList: [],
      isReadOnly: false,
      uploadImg: false,
      msgText: "",
      messageDataList: [],
      msgList0: [],
      msgList1: [],
      msgList2: [],
      prevImg: "",
      myUserinfo: {
        uid: "",
      },
      fd: "",
      page: 1,
      isShowGiftBox: false,
      giftNum: 1,
      currentGiftId: "",
      isShowEmoji: false,
      uid: "",
      gift_jpg: "",
      targetUserInfo: {},
      isAllowedSendMsg: true,
      hasSendMsgCount: 0,
      needBuy: false,
      that: this,
      hidevideo: getQueryString().hidevideo,
      iosDevice: getQueryString().device == "iphone" ? true : false,
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
      inRoom: false,
      senderid: "",
      parmUserInfo: {
        user_id: 19,
        username: "手机用户8",
        vid: "12",
      },
      formData: {},
      controlIndex: -1,
      pinInfo: "",
      channel: getQueryString().channel_code || localStorage.getItem("channel"),
      channel_code: getQueryString().channel_code,
      url: window.location.href,
      showLoading: true,
      isScroller: false,
      lockPage: false,
      lastpage: "",
      reconnectStatus: false,
      share: false,
      shareUrl: "",
      info: null,
      type0_local_msg_list: [],
      type2_local_msg_list: [],
      historyData:[],
      initInvite:true,
    };
  },
  computed: {
    system() {
      return this.$store.state.system;
    },
  },
  //给新的ws实例添加监听事件
  watch: {
    page(newVal, oldVal) {
      if (newVal != oldVal) {
        if (newVal == 2 && this.reconnectStatus) {
          return;
        }else if(this.historyData.length < 50 ){
          return;
        }else{
          this.getChatHistoryMsg();
        }
      }
    },

    fd(newVal, oldVal) {
      if (newVal != oldVal) {
        if (this.current == 0) {
        	this.inviteRoom();
        } 
        this.inRoomInfo(newVal);
        
      }
    },
    showLoading(newV, oldV) {
      if (!newV && !this.isScroller) {
        setTimeout(() => {
          this.toBottom();
        }, 20);
      }
    },
    roomDetailData(newVal, oldVal) {
      if (newVal.vid != this.parmUserInfo.vid) {
        this.page = 1;
        this.pinInfo = "";
        this.isMore = true;
        // this.handleLocalMsgList(this.current,'empty')
        this.isScroller = false;
        this.parmUserInfo.vid = newVal.vid;
        this.inRoomInfo(this.fd);
      }
    },
    current(newVal, oldVal) {
      this.messageDataList = []
      this.initBase();
      if (oldVal == 2) {
        this.leaveRoom();
        this.$emit("leaveRoom");
      }
      if (newVal != oldVal) {
        //this.addDom();
        this.msgType = 1;
        this.formData = {};
        this.prevImg = "";
        this.reconnectStatus = false;
        this.isScroller = false;
        this.parmUserInfo.vid = "";
        if (newVal != 1) {
          this.showLoading = true;
        }
      }
      if (newVal == 0) {
        const qVid = this.qsVid;
        this.parmUserInfo.vid = qVid;
        this.inRoomInfo(this.fd);
      }
      if (newVal == 1) {
        const qVid = this.qsVid;
        let vInfo = JSON.parse(localStorage.getItem("vidInfo")) || {};
        if (!vInfo.hasOwnProperty(qVid)) {
          this.inviteRoom();
          return;
        }
        this.parmUserInfo.vid = vInfo[qVid];
        this.inviteRoom();
      }
    },
    showMsgInfo(newVal, oldVal) {
      // console.log(123123,newVal,"newVal=====")
      if (this.roomDetailData.room_type == 2 && newVal == false) {
        this.leaveRoom();
        this.$emit("leaveRoom");
      }
    },
  },
  filters: {
    picFilter(url) {
      let newUrl = url;
      if (url.includes("base64")) {
        let split = window.location.hostname.includes("10")
          // ? "https://www.x9zb.live/upload/"
          // ? window.location.origin + "/"
          // ? "http://huyapreadmin.oxldkm.com/upload/"
          ? "http://http://huidu.x9zb.live/upload/"
          : // window.location.origin + "/";
        newUrl = newUrl.replace(split, "");
      }
      return newUrl;
    },
  },
  updated() {
    this.toBottom();
  },

  mounted() {
    // this.addDom();
    if (window.ws) {
      window.ws.close();
      // console.log("close init")
    }
    this.getReportList();
    this.initInfo(true);
    const domScroll = document.querySelector(".chat-window");
    domScroll.addEventListener("scroll", (e) => {
      // console.log( domScroll.scrollTop,
      //   domScroll.scrollTop - domScroll.offsetHeight,
      //   "domScroll.scrollTop-domScroll.offsetHeight==="
      // );
      if (domScroll.scrollTop <= 2) {
        this.reconnectStatus = false;
        if(!this.isErrorMsg){
          this.isErrorMsg = true
          this.getChatHistoryMsg()
          return
        }
        this.debounce(this.addPage(),2000)
        this.isScroller = true;
      }
    });
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.info = userInfo || {
      token: "",
    };

    let query = this.$route.query;
    let string = "?";
    for (const i in query) {
      switch (i) {
        case "id":
        case "vid":
        case "channel_code":
          string += i + "=" + query[i] + "&";
          break;
      }
    }
    // this.shareUrl = window.location.origin + "/room/" + getQueryString().id;
    this.shareUrl = window.location.href;
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
    addPage(){
      return this.page ++ ;
    },
    debounce(fn,delay){
      let timer = null;
      return function () {
        if(timer){
          clearTimeout(timer)
        }
        timer = setTimeout(fn,delay)
      }
    },
    clearStatus(){
      this.controlIndex = -1
    },
    submit() {
      let files = [];
      // 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
      files = this.$refs.uUpload.lists.filter((val) => {
        return val.progress == 100;
      });
      // 如果您不需要进行太多的处理，直接如下即可
      files = this.$refs.uUpload.lists;
      const file = files[0].file;
      this.formData.pic = file;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      const _that = this;
      reader.onload = function (e) {
        var newUrl = this.result;
        _that.prevImg = newUrl;
      };
      this.msgType = 2;
      let currentDate = new Date().getTime();
      this.sendMsgByApi(currentDate);
    },
    //取得圖片
    // addDom(){
    // 	var input =document.createElement("input");
    // input.type = "file";
    // input.name = "pic";
    // input.id = "fileUp"
    // input.onchange = (e)=>{
    // 		this.changeFile(e);
    // }
    // var form =document.createElement("form");
    // form.enctype ="multipart/form-data";
    // form.method = "post";
    // form.id = "msgForm"
    // var inputContent =document.getElementById("inputContent");
    // inputContent.appendChild(form);
    // //this.$refs.inputContent.$el.appendChild(form);
    // var formContainer = document.getElementById("msgForm");
    // formContainer.appendChild(input);
    // },
    onHandleClickImg(img) {
      // console.log('我是点击图片事件')
      let url = img;
      if (img.indexOf("/") == 0) {
        url = window.location.origin + img;
      }
      uni.previewImage({
        indicator:"number",
        loop:true,
        urls: [url],
      });
    },
    // 获取开关
    // 获取系统配置
    // getSystem() {
    // 	this.$u.get(`api/universal/getHot?channel_code=${this.channel}`, {}).then(res => {
    // 		this.system = res
    // 		// console.log(res);
    // 	})
    // },
    // 关闭弹框事件

    initBase() {
      this.page = 1;
      this.pinInfo = "";
      this.isMore = true;
      this.isScroller = false;
    },
    resend(item) {
      // console.log(item)
      this.handleLocalMsgList(this.current).map((val, index) => {
        if (val == item) {
          this.handleLocalMsgList(this.current).splice(index, 1);
        }
      });
      this.msgText = item.text;
    },
    coloseReport() {
      this.reportListShow = false;
    },
    // 举报弹框确认事件
    confirmReport() {
      this.report();
    },
    // 变化事件
    radioChange(e) {
      this.reportValue = e;
    },
    getReportList() {
      const _this = this;
      this.$u.get("api/report/classifyList").then((res) => {
        // console.log('举报列表')
        // console.log(res)
        _this.reportList = res;
        if (res.length > 0) {
          _this.reportValue = res[0].id;
        }
      });
    },
    onHandleReportShow(item) {
      this.reportItem = item;
      this.reportListShow = true;
    },
    // 举报事件
    report(item = false) {
      const _this = this;
      if (this.reportItem) {
        this.$u
          .get("api/report_user/insert", {
            relateId: this.reportItem.msg_id,
            classifyId: this.reportValue || 0,
            type: 3,
          })
          .then((res) => {
            _this.coloseReport();
            _this.$u.toast("举报成功");
          });
      } else {
        this.$u
          .get("api/report_user/insert", {
            relateId: this.parmUserInfo.vid,
            classifyId: this.reportValue || 0,
            type: 4,
          })
          .then((res) => {
            _this.coloseReport();
            _this.$u.toast("举报成功");
          });
      }
    },
    sendImg(e) {
      this.msgType = e;
      if (e == 2) {
        var dol = document.getElementById("add-img");
        // console.log(dol,'dol--------')
        dol.innerHtml += "<div>666</div>";
      }
    },

    openLink(link) {
      window.open(link);
    },
    initInfo(init = false) {
      if (!this.reconnectStatus) {
        this.handleLocalMsgList(this.current, "empty");
      }
      if (getQueryString() || this.roomDetailData) {
        let roomInfo = JSON.parse(localStorage.getItem("vidInfo")) || {};
        if (!this.roomDetailData && !roomInfo) {
          this.getImToken(true);
          return;
        }
        if (this.current == 2) {
          this.parmUserInfo = {
            vid: roomInfo[this.qsVid],
          };
        } else {
          this.parmUserInfo = {
            vid: this.roomDetailData ? this.roomDetailData.vid : this.qsVid,
          };
        }
      }
      let userid = "";
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo && !localStorage.getItem("userid")) {
        userid = 10000000 + Math.random().toString().slice(-6);
        localStorage.setItem("userid", userid);
      }
      if (userInfo) {
        this.parmUserInfo.user_id = getQueryString().user_id
          ? getQueryString().user_id
          : userInfo.id;
        this.parmUserInfo.username = getQueryString().user_name
          ? getQueryString().user_name
          : userInfo.user_nickname;
      } else {
        this.parmUserInfo.user_id = getQueryString().user_id
          ? getQueryString().user_id
          : localStorage.getItem("userid") || userid;
        this.parmUserInfo.username = getQueryString().user_name
          ? getQueryString().user_name
          : localStorage.getItem("userid");
      }
      this.getImToken();
      this.quickReplyList();
    },
    delQuickReply(item) {
      const _that = this;
      this.$u
        .post("api/chat/delQuickReply", {
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
    },
    quickReplyList() {
      const _that = this;
      this.$u
        .post("api/chat/getQuickReplyList", {
          user_id: this.parmUserInfo.user_id,
        })
        .then((res) => {
          this.modalMsgList = res;
          // console.log(this.modalMsgList, "this.modalMsgList======")
          this.controlIndex = -1;
        });
    },
    saveMsg() {
      const _that = this;
      this.$u
        .post(`api/chat/addQuickReply`, {
          user_id: this.parmUserInfo.user_id,
          text: this.msgText,
        })
        .then((res) => {
          if (res.msg == "成功") {
            this.$message({
              type: "success",
              message: "保存成功",
            });
          }
        });
    },
    selectEmoji(emoji) {
      const msg = document.querySelector("#msg textarea");
      var startpos = msg.selectionStart;
      var endpos = msg.selectionEnd;
      if (startpos === undefined || endpos === undefined) return;
      var result =
        this.msgText.substring(0, startpos) +
        emoji.data +
        this.msgText.substring(endpos);
      this.isShowEmoji = false;
      this.msgText = result;
    },
    openAppUrl(str) {
      var strRegex = /(https?:\/\/[^\s]+)/g;
      var re = new RegExp(strRegex);
      if (re.test(str)) {
        let data = { action: "blank", message: str };
        if (this.hidevideo) {
          // console.log("开始调用======")
          // console.log("Android======",JSON.stringify(data),data)
          if (getQueryString().device == "iphone") {
            // console.log("开始调用IOS======",data)
            window.webkit.messageHandlers.interOp.postMessage(data);
            return;
          }
          if (typeof AndroidInterface !== undefined) {
            // console.log("Android======",JSON.stringify(data),data)
            AndroidInterface.postmaessage(JSON.stringify(data));
          }
        } else {
          window.open(str);
        }
      }
    },
    getText(str) {
      var reg = /(https?:\/\/[^\s]+)/g;
      if (!str) {
        return "";
      }
      if (this.hidevideo) {
        str =
          str &&
          str.replace(
            reg,
            "<a  style='text-decoration:underline;color:blue' target='_blank' >$1</a>"
          );
      } else {
        str =
          str &&
          str.replace(
            reg,
            "<a style='text-decoration:underline;color:blue' target='_blank' href='$1'>$1</a>"
          );
      }
      str = str.replace(/\r\n/g, "<br>");
      str = str.replace(/\n/g, "<br>");
      str = str.replace(/\r/g, "<br>");

      return str;
    },
    copyText(item) {
      const str = item.text;
      const qrUrlContent = document.querySelector("#cp-input input");
      qrUrlContent.value = str;
      qrUrlContent.select();
      let range = document.createRange();
      let selection = document.getSelection();
      range.selectNode(qrUrlContent);
      selection.addRange(range);
      qrUrlContent.setSelectionRange(0, qrUrlContent.value.length);
      let isSucess = document.execCommand("copy");
      if (isSucess) {
        this.$u.toast("复制成功");
        this.tipsId = "";
        this.controlIndex = -1
      }
    },
    getImToken(initSec = false) {
      const _that = this;
      const data = this.parmUserInfo;
      // console.log(window.ws,"=======,1234")
      // if(window.ws){
      // 	window.ws.close();
      // }
      this.$u
        .get(
          `api/chat/getChatToken?user_id=${data.user_id}&type=${
            this.parmUserInfo.type || 1
          }&username=${data.username}`
        )
        .then((res) => {
          _that.imUserInfo = res;
          _that.$emit("onHandleGetImUserInfo", res);
          _that.newSocket(res);
          if (initSec) {
            _that.inviteRoom();
          }
        });
    },
    getChatHistoryMsg(iniPage) {
      // console.log(this.reconnectStatus,"this.reconnectStatus========")
      if (
        this.parmUserInfo.vid == null ||
        this.parmUserInfo.vid == "" ||
        this.reconnectStatus
      ) {
        return;
      }
      const _that = this;
      const params = {
        page: iniPage || this.page,
        limit: 50,
        type:
          this.current == 2
            ? this.roomDetailData.room_type
            : this.current === 1
            ? 2
            : this.current || 0,
        vid: this.parmUserInfo.vid,
        user_id: this.parmUserInfo.user_id,
      };
      this.lastpage = params.page;
      if (!iniPage && this.page == 1) {
        return;
      }
      // console.log(this.roomDetailData,"this.roomDetailData======")
      this.showLoading = true;
      this.$u
        .get(
          `api/chat/getChatHistory?type=${params.type}&user_id=${
            params.user_id
          }&vid=${params.vid}&limit=${params.limit}&page=${
            params.page
          }&channel_code=${
            this.channel_code ? this.channel_code : ""
          }&channel=${this.channel_code ? this.channel_code : ""}`
        )
        .then((res) => {
          if (
            this.roomDetailData.hasOwnProperty("vid") &&
            this.roomDetailData.vid != this.parmUserInfo.vid
          ) {
            return;
          }
          let dataList = res.reverse();
          this.historyData = res
          this.lockPage = true;
          if (dataList.length <= 10) {
            this.isScroller = true;
          }
          this.showLoading = false;
          if (dataList.length === 0) {
            this.isMore = false;
            return;
          }
          // console.log(params,"======params",dataList)
          this.handleLocalMsgList(
            params.type == 2 && this.current == 1 ? 1 : params.type,
            params.page != 1 ? "unshift" : "init",
            dataList
          );
          // console.log('///////////////////')
          // _that.msgList.unshift(...dataList);
        })
    },
    showControl(index) {
      // console.log('我是点击消息事件')
      this.controlIndex = index;
    },
    mute(item) {
      const _that = this;
      const data = {
        type: 0,
        mute: 1,
        token: this.imUserInfo.token,
        vid: item.vid,
        fd: this.fd,
        user_id: item.sender,
      };
      this.$u.post("api/chat/mute", data).then((res) => {
        this.controlIndex = "";
      });
    },
    freeze(item) {
      const _that = this;
      const data = {
        type: 0,
        freeze: 1,
        token: this.imUserInfo.token,
        vid: item.vid,
        fd: this.fd,
        user_id: item.sender,
      };
      this.$u.post("api/chat/freeze", data).then((res) => {
        this.controlIndex = "";
      });
    },
    pin(item) {
      const _that = this;
      const data = {
        type: 0,
        pin: 1,
        token: this.imUserInfo.token,
        vid: item.vid,
        fd: this.fd,
        msg_id: item.msg_id,
      };
      this.$u.post("api/chat/pin", data).then((res) => {
        this.controlIndex = "";
      });
    },
    delMsg(item) {
      const _that = this;
      const data = {
        type: 0,
        msg_id: item.msg_id,
        token: this.imUserInfo.token,
        both: 2,
        vid: item.vid,
        fd: this.fd,
      };
      this.$u.post("api/chat/deleteMessage", data).then((res) => {
        this.controlIndex = "";
        this.getChatHistoryMsg();
        // console.log('shanchu')
      });
    },
    inviteRoom() {
      if (!this.fd) {
        return;
      }
      const _that = this;
      const roomId = this.qsVid;
      let roomInfo = JSON.parse(localStorage.getItem("vidInfo")) || {};
      this.$u
        .post("api/chat/inviteRoom", {
          // type: this.current === 1 ? 2 : this.current,
          type: 2,
          is_new: 1,
          token: this.imUserInfo.token,
          // vid:this.parmUserInfo.vid,
          fd: this.fd,
          name: this.parmUserInfo.username,
          user_id: getQueryString().id,
          channel: this.channel,
          channel_code: this.channel_code ? this.channel_code : "",
        })
        .then((res) => {
          if(this.initInvite){
            this.initInvite = false
            roomInfo[roomId] = res.vid;
            localStorage.setItem("vidInfo", JSON.stringify(roomInfo));
            return
          }
          roomInfo[roomId] = res.vid;
          this.parmUserInfo.vid = res.vid;
          localStorage.setItem("vidInfo", JSON.stringify(roomInfo));
          this.inRoomInfo(this.fd);
          this.controlIndex = "";
        });
    },
    inRoomInfo(fd) {
      if (this.current == 0) {
        this.parmUserInfo.vid = this.qsVid;
      }
      if (!this.parmUserInfo.vid || !fd) {
        return;
      }

      if (this.current == 2 && !this.parmUserInfo.vid) {
        this.getImToken(true);
        return;
      }

      const inRoomData = {
        vid: this.parmUserInfo.vid,
        token: this.imUserInfo.token,
        fd: fd,
        type: this.current === 1 ? 2 : this.current || 0,
        channel: this.channel,
        channel_code: this.channel_code ? this.channel_code : "",
      };
      const _that = this;
      // if(_that.inRoom){
      //   return
      // }
      this.$u.post("api/chat/inRoom", inRoomData).then((res) => {
        if (res == "connection token error") {
          this.initInfo(true);
          return;
        }
        if(res.pinData && res.pinData !== ""){
          _that.pinInfo = {
            text:res.pinData
          }
        }
        _that.getChatHistoryMsg(1);
      });
    },
    // 離開聊天室
    leaveRoom() {
      if (!this.fd) {
        return;
      }
      const data = {
        vid: this.parmUserInfo.vid,
        token: this.imUserInfo.token,
        fd: this.fd,
        type:
          this.roomInfo && this.roomInfo.room_type
            ? this.roomInfo.room_type
            : this.current || 0,
      };

      this.$u.post("api/chat/leaveRoom", data).then((res) => {});
    },
    newSocket(data) {
      // this.WSURL = `${wsprotocol}${
        // 	window.location.hostname.includes('10')
        // 		? '10.83.107.92:9021'
        // 		: window.location.hostname
      // 	// '10.83.107.92:9021'
      // }${window.location.protocol == "http:" ? "/wss/" : "/wss/"}?token=${data.token}&tokenid=${data.id}`;
      const wsprotocol = window.location.protocol == "http:" ? "ws://" : "wss://"
      const locationHost = window.location.hostname
      // this.WSURL = `${wsprotocol}://${locationHost}/wss/?token=${data.token}&tokenid=${data.id}&vid=${this.qsVid}`;


      // this.WSURL = `wss://www.x9zb.live/wss/?token=${data.token}&tokenid=${data.id}&vid=${this.qsVid}`;
      // this.WSURL = `ws://huyapreadmin.oxldkm.com/wss/?token=${data.token}&tokenid=${data.id}&vid=${this.qsVid}`;
      this.WSURL = `ws://huidu.x9zb.live/wss/?token=${data.token}&tokenid=${data.id}&vid=${this.qsVid}`;
      this.ws = new WebSocket(this.WSURL);
      window.ws = this.ws;
      // this.$global.setWs(this.ws);
      //
      // 连接建立时触发
      this.ws.onopen = this.websocketonopen;
      // 通信发生错误时触发
      this.ws.onerror = this.websocketonerror;
      // 连接关闭时触发
      this.ws.onclose = this.websocketclose;

      this.ws.onmessage = this.websocketonmessage;

      // this.$store.commit('HANDLE_WSRECONNECT')
    },
    websocketonopen() {
      //开启心跳
      this.start();

      // setTimeout(()=>{
      //   this.ws.close()
      // },10000)
    },
    // 通信发生错误时触发
    websocketonerror() {
      // console.log("出现错误");
      this.reconnect();
    },
    // 连接关闭时触发
    websocketclose(e) {
      //关闭
      // console.log("断开连接", e);
      // this.ws.close()
      //重连
      this.reconnect();
    },
    reconnect() {
      //重新连接
      this.reconnectStatus = true;
      if (this.lockReconnect) {
        return;
      }
      this.lockReconnect = true;

      //没连接上会一直重连，设置延迟避免请求过多
      this.timeoutnum && clearTimeout(this.timeoutnum);
      this.timeoutnum = setTimeout(() => {
        //新连接
        // this.initBase();
        this.initInvite = true
        this.initInfo(true);
        this.lockReconnect = false;
      }, 5000);
    },
    reset() {
      //重置心跳
      //清除时间
      clearTimeout(this.timeoutObj);
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
        if (this.ws.readyState == 1) {
          //如果连接正常
          let actions = "heart";
          this.ws.send(JSON.stringify(actions)); //这里可以自己跟后端约定
        } else {
          //否则重连
          this.reconnect();
        }
        // this.serverTimeoutObj = setTimeout(() => {
        //   console.log(123456)
        //   //超时关闭
        //   this.ws.close();
        // }, this.timeout);
        this.heart(i);
      }, this.timeout);
    },
    sendMsgByApi(uiCode) {
      let type =
        this.roomDetailData && this.roomDetailData.room_type
          ? this.roomDetailData.room_type
          : this.current === 1
          ? 2
          : this.current || 0;
      let data = {
        vid: this.parmUserInfo.vid,
        fd: this.fd,
        type: type,
        text: this.msgText,
        method: "notice",
        msg_type: this.parmUserInfo.user_id.toString().includes("1000") ? 0 : 1, //0为弹幕,1文字
        color: "#000",
        sender: this.parmUserInfo.user_id,
        token: this.imUserInfo.token,
        channel: this.channel,
        channel_code: this.channel_code ? this.channel_code : "",
      };
      this.senderid = data.sender;
      if (this.msgType == 2) {
        var formData = new FormData();
        formData.append("vid", this.parmUserInfo.vid);
        formData.append("fd", this.fd);
        formData.append("title", "");
        formData.append("link", "");
        formData.append("type", type);
        formData.append("method", "notice");
        formData.append("msg_type", 2);
        formData.append("color", "#000");
        formData.append("sender", this.parmUserInfo.user_id);
        formData.append("token", this.imUserInfo.token);
        formData.append("channel", this.channel);
        formData.append("pic", this.formData.pic);
        formData.append("text", "");
        data = formData;
        let xhr = new XMLHttpRequest();
        // xhr.open("POST",window.location.origin+"/api/chat/sendMessage");
        // xhr.open("POST","http://huyapreadmin.oxldkm.com/api/chat/sendMessage");
        xhr.open("POST","http://huidu.x9zb.live/api/chat/sendMessage");
        // xhr.open("POST", "https://www.x9zb.live/api/chat/sendMessage");
        xhr.send(data);
        this.formData = {};
        this.prevImg = "";
        this.uploadImg = false;
        this.msgType = 1;
        // const fileUp = document.querySelector("#fileUp");
        // const file = fileUp.files[0];
        // file = "";
        return;
      }
      this.$u
        .post("api/chat/sendMessage", data)
        .then((res) => {
          this.msgText = "";
          if (res.code == 0) {
            this.uploadImg = false;
          } else {
            this.handleLocalMsgList(this.current).find(function (item) {
              return item.uiCode == uiCode;
            }).isError = true;
          }
          this.toBottom();
        })
        .catch((error) => {
          this.handleLocalMsgList(this.current).find(function (item) {
            return item.uiCode == uiCode;
          }).isError = true;
        });
    },
    sendMsg() {
      this.isShowEmoji = false;
      // if (this.needBuy) {
      // 	this.$message({
      // 		type: "error",
      // 		message: "需购买模特含对话的套餐"
      // 	});
      // 	return;
      // }
      // if (!this.isAllowedSendMsg || this.msgText == ""&&this.current!=0) {
      // 	return;
      // }
      let currentDate = new Date().getTime();
      let msgItem = {
        sender: this.parmUserInfo.user_id,
        sender_nickname: this.info.user_nickname,
        text: this.msgText,
        uiCode: currentDate,
        isError: false,
      };
      if (this.info.user_nickname === undefined) {
        this.$u.toast("游客不可在直播间发话报成功");
        this.msgText = "";
        return;
      } else {
        this.handleLocalMsgList(this.current,"push",msgItem)
        this.sendMsgByApi(currentDate);
      }
      return;
      let msg = {
        action: "system",
        server: "notice",
        uid: this.uid,
        fd: this.fd,
        txt: this.msgText,
        method: "notice",
      };

      this.$global.ws.send(JSON.stringify(msg));
      this.msgText = "";
      this.toBottom();
    },
    // 客户端接收服务端数据时触发
    websocketonmessage(e) {
      let data = JSON.parse(e.data);
      if (data.fd !== null && data.action === "open") {
        this.fd = data.fd;
        // this.inRoomInfo(data.fd);
      }
      if (data.action === "delmsg") {
        let msgListArr = this.handleLocalMsgList(this.current);
        let delIndex = msgListArr.findIndex(
          (item) => item.msg_id * 1 === data.msg_id * 1
        );
        msgListArr.splice(delIndex, 1);
        this.handleLocalMsgList(this.current, "init", msgListArr);
      }

      // 未读的消息列表
      if (data.action === "unread") {
        let msgList = data.data || [];
        this.$store.dispatch("updateMsg", {
          msgList,
          type: 0,
        });
        this.$emit("getMessageList");
        // this.$emit('onHandleUnRead',msgList, 0);
      }
      // 新收到的未读消息
      if (data.action === "newMsg") {
        let msgList = {
          vid: data.newMsgRoomvid,
          room_type: data.room_type,
          unread_count: 1,
          text: data.text,
        };
        this.$store.dispatch("updateMsg", {
          msgList,
          type: 1,
        });
        // this.$emit('getMessageList')
        // this.$emit('onHandleUnRead',msgList, 1);
      }
      if (data.action === "pin") {
        this.pinInfo = JSON.parse(data.data);
      }
      if (data.action === "send") {
        // let list = this.msgList;
        // list.push(data);
        // console.log( this.senderid,"123123",data," this.info======")
        //自己发送的消息不渲染到列表
        if (data.pic !== undefined) {
          this.handleLocalMsgList(this.current, "push", data);
        }
        if (data.sender == this.senderid) {
          return;
        }
        if (data.sender_nickname.includes("游客") && this.current == 0) {
          return;
        }
        this.handleLocalMsgList(this.current, "push", data);
        this.toBottom();
      }
      if (data.action === "system") {
        if (data.text.includes("进入直播间") && this.current != 0) {
          return;
        }
        this.handleLocalMsgList(this.current, "push", data);
        this.toBottom();
      }
      if (data.status == 200) {
        if (data.data) {
          // 晚点封装成switch case
          if (data.data.type == "dialog") {
            this.handleLocalMsgList(
              this.current,
              "init",
              data.data.historyMessageList
            );
            this.myUserinfo = data.data.targetUserInfo;
            this.fd = data.data.targetUserInfo.fd;
          }

          if (data.data.type == "call") {
            if (data.data.content.type == 1) {
              this.handleLocalMsgList(this.current).push({
                ...data.data.content,
                uid: this.userInfo.uid,
              });
              this.msgText = "";
              this.toBottom();
              if (this.hasSendMsgCount > 0) {
                this.hasSendMsgCount = this.hasSendMsgCount - 1;
              }
            }
            if (data.data.content.type == 2) {
              this.handleLocalMsgList(this.current).push({
                ...data.data.content,
                uid: this.userInfo.uid,
              });
              this.toBottom();
            }
          }
          // if (data.data.type == "userinfo") {
          //   this.fd = data.data.userinfo.fd
          // }
          if (data.data.type == "message") {
            this.$store.dispatch("getUnReadMsgNum");
            if (data.data.content.type == 1) {
              this.handleLocalMsgList(this.current).push({
                ...data.data.content,
                uid: this.uid,
              });
              this.msgText = "";
              this.toBottom();
            }
            if (data.data.content.type == 2) {
              this.handleLocalMsgList(this.current).push({
                ...data.data.content,
                uid: this.uid,
              });
              this.toBottom();
            }
          }
        }
      } else {
        // this.$message.warning(data.message);
      }
    },
    toTop() {
      window.scrollTo(0, 0);
    },
    // 聊天框滚动到最底部
    toBottom() {
      let main = document.querySelector(".chat-window");
      let content = document.querySelector(".chat-detail-main");
      main.scrollTop = content.clientHeight - main.clientHeight + 500;
    },
    getshare() {
      this.share = true;
    },
    copyUrl() {
      let textarea = document.createElement("textarea");
      textarea.value = this.shareUrl;
      textarea.readOnly = "readOnly";
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, this.shareUrl.length);
      let result = document.execCommand("copy");
      if (result) {
        this.share = false;
        this.$u.toast("复制成功");
      }
    },
    //解耦合
    handleLocalMsgList(type, m, data) {
      // console.log(type,m,data,"========2222")
      if (type != this.current) {
        return;
      }
      const set = new Set();
      switch (m) {
        case "init":
          data.forEach((el) => {
          });
          this.messageDataList = data
          break;
        case "push":
          this.messageDataList.push(data);
          break;
        case "unshift":
  
          data.forEach((el) => {
            this.messageDataList.unshift(el);
          });
          break;
        case "empty":
          this.messageDataList = [];
          break;

        default:
          break;
      }
      this.toBottom();

      // if (type == 0) {
      //   if (m == "init") {
      //     this.msgList0 = data;
      //   }
      //   if (m == "push") {
      //     this.msgList0.push(data);
      //   }
      //   if (m == "unshift") {
      //     data.forEach((el) => {
      //       this.msgList0.unshift(el);
      //     });
      //   }
      //   if (m == "empty") {
      //     this.msgList0 = [];
      //   }
      //   return this.msgList0;
      // }
      // if (type == 2) {
      //   if (m == "init") {
      //     this.msgList2 = data;
      //   }
      //   if (m == "push") {
      //     this.msgList2.push(data);
      //   }
      //   if (m == "unshift") {
      //     data.forEach((el) => {
      //       this.msgList2.unshift(el);
      //     });
      //   }
      //   if (m == "empty") {
      //     this.msgList2 = [];
      //   }
      //   return this.msgList2;
      // }
      // if (type == 1) {
      //   if (m == "init") {
      //     this.msgList1 = data;
      //   }
      //   if (m == "push") {
      //     if(data.pic !== undefined){
      //       data.pic =  "https://www.x9zb.live" + data.pic
      //       // data.pic =  "http://huyapreadmin.oxldkm.com" + data.pic
      //     }
      //     this.msgList1.push(data);
      //   }
      //   if (m == "unshift") {
      //     data.forEach((el) => {
      //       this.msgList1.unshift(el);
      //     });
      //   }
      //   if (m == "empty") {
      //     this.msgList1 = [];
      //   }
      //   console.log(this.msgList1)
      //   return this.msgList1;
      // }
      // this.toBottom()
    },
  },
};
</script>
<style lang="scss" scoped>
.show-img-container {
  opacity: 1 !important;
  z-index: 99;
}
#fileUp {
  width: 100px;
  height: 100px;
  position: absolute;
  z-index: 999;
}
.send-type-container {
  display: inline-block;
  margin-right: 15px;
  span {
    display: inline-block;
    padding: 0 8px;
    margin: 0 4px;
    color: #fff;
    background: #c1c1c1;
    border-radius: 4px;
    &.active-status {
      background: #d8ad66;
    }
  }
}
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
  overflow: scroll;
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
  font-size: 12px;
  color: red;
  display: inline-block;
  margin-left: 5px;
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
  display: inline-block;
  opacity: 0;
}
.add-img-container img {
  width: 100% !important;
  height: 100% !important;
  position: absolute;
  left: 0;
  top: 0;
}
.add-img-container {
  z-index: -1;
  opacity: 0;
  border: 1px dashed #ababab;
  height: 40px;
  position: absolute;
  width: 80px;
  top: 45px;
  input {
    position: absolute;
    width: 100% !important;
    height: 100% !important;
  }
}
.msg-type-container {
  position: absolute;
  left: 60px;
}

.pic-info {
  max-height: 80px;
  max-width: 100%;
}
.reportList {
  width: 750rpx;
  min-height: 400rpx;
  .reportList_context {
    width: 750rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .reportList_title {
    width: 750rpx;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30rpx;
    box-sizing: border-box;
    font-size: 26rpx;
    border-bottom: 1px solid #f6f6f6;
    .reportList_title_close {
      width: 120rpx;
      height: 60rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgb(48, 49, 51);
    }
    .reportList_title_confirm {
      width: 120rpx;
      height: 60rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgb(227, 172, 114);
    }
  }
  .u-radio-group {
    margin-top: 30rpx;
    justify-content: center;
    width: 500rpx;
    .u-radio {
      height: 70rpx;
      justify-content: space-between;
    }
  }
}
.thumb-container {
  padding: 10px 10px 10px 90px;
  min-height: 70px;
  position: relative;
  background: #fff;
  box-shadow: 0 0 5px 2px #d9d9d9;
  .thumb-pic {
    width: 70px;
    height: 70px;
    display: inline-block;
    position: absolute;
    left: 10px;
  }
  .thumb-title {
    font-weight: bold;
    font-size: 14px;
  }
  .thumb-text {
    font-size: 12px;
  }
}

.emoji-picker {
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 440rpx;
  background: #fff;
}

.detail {
  height: calc(100% - 80rpx);
  overflow-y: scroll;
  background: #e9e9f5;
}
.add-margin {
  margin-top: 40px;
  height: calc(100vh - 300px) !important;
  width: 100%;
  position: fixed;
  border-top: 1px solid #dcd8d8;
}
.detail.app-version {
  height: calc(100vh - 82px) !important;
  padding-bottom: 40px;
}

.detail.is-ios {
  height: calc(100vh - 82px) !important;
}

.detail.app-version {
  .chat-window {
    height: 65vh !important;
  }
}

.quick-reply-list {
  position: relative;
  width: 100%;
  // height: 30px;
  // line-height: 30px;
  display: flex;
  align-content: center;
  margin-top: 5px;

  i {
    margin-right: 10px;
    height: 30px;
    line-height: 30px;
    font-style: normal;
    padding: 4px 8px;
    border-radius: 10px;
    border: 1px solid #e9e9f5;
  }

  .quick-reply-list-btn {
    position: absolute;
    right: 160rpx;
    top: 10rpx;
    display: inline-block;
    padding: 0 20rpx;
    margin-left: auto;
    border-radius: 8rpx;
    text-align: center;
    color: #fff;
    background: linear-gradient(114deg, #eecfb5 -2%, #d8ad66);
    height: 40rpx !important;
    line-height: 40rpx;
    font-size: 26rpx;
  }
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
    /*总长再加上margin-left*/
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

#cp-input {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.header-list {
  height: 45px;

  span {
    color: #fff;
    line-height: 45px;
    background: #6363b5;
    text-align: center;
    display: inline-block;
    margin-right: 1px;
    width: 33%;

    &.on {
      background: linear-gradient(-23deg, #ffcc0b 0%, #fdd632 100%),
        linear-gradient(#000000, #000000);
    }
  }
}

.footer-box {
  display: flex;
  justify-content: space-around;
  // margin-top: 10px;
}
#msg {
  border: 1px solid #c41d48;
  border-radius: 4px;
  padding: 6px;
  // width: 80%;
  height: 25px;
  // bottom: -6px;
  line-height: 25px;
  margin: 0 10px 0 0;
}

/deep/ .el-drawer__header {
  margin-bottom: 0;
  padding-top: 2vw;
}

#chat-models {
  height: calc(100% - 128px);
}
/deep/.u-list-item {
  width: 160px !important;
  height: 160px !important;
}
.send-container {
  height: 50px;
  line-height: 50px;
  position: fixed;
  bottom: 0;
  width: 95%;
  background: #fff;
  padding: 20rpx;
  border-top: 1px solid #f1f1f1;
  text-align: left;
  z-index: 2;
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

  .control-footer {
    position: absolute;
    bottom: 0;
    width: 96%;
    height: 50px;
  }
}

.send {
  display: inline-block;
  padding: 0 14px;
  position: relative;
  // right: 10px;
  // bottom: 10px;
  border-radius: 4px;
  text-align: center;
  color: #fff;
  // background: linear-gradient(114deg, #eecfb5 -2%, #d8ad66);
  background-color: #c41d48;
  height: 39px;
  line-height: 39px;
}

.el-drawer.btt {
  height: auto;
}

.emoji-btn {
  // position: absolute;
  // left: 10px;
  // top: 10px;
  cursor: pointer;
}

.emoji-box {
  position: absolute;
  top: -444rpx;
  left: 0;
  width: 100%;
  height: calc(100vh - 182rpx);
}

.switch-box {
  text-align: right;
  padding-bottom: 2vh;
  padding-right: 2vw;
}

.ChatDetails_container {
  background: #e9e9f5;
  height: 100%;
  position: relative;

  .chat-window {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    box-sizing: border-box;
    padding-top: 5px;
  }

  .chat-pin {
    padding-top: 43px;
  }

  .chat-detail-main {
    background: #e9e9f5;
    padding: 0 10px 60px 10px;
    .msg-container {
      color: #363636;

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

    .system-tips {
      padding: 4px 2px;
      border-radius: 4px;
      font-size: 12px;
      text-align: center;
      color: rgba(0, 0, 0, 0.2);
    }

    .msg-content {
      padding: 4px;
      border-radius: 4px;
      font-size: 15px;
      word-break: break-all;
    }
    .text-info {
      display: initial;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.8);
    }
    .msg-footer {
      font-size: 15px;
      color: rgba(0, 0, 0, 0.4);
      text-align: right;
      display: inline-block;
      span {
        margin-right: 4px;
        font-size: 12px;
      }
    }

    .other-side {
      position: relative;
      text-align: left;

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
        line-height: 40px;
        text-align: center;
        color: #fff;
        background: orange;
      }
    }

    .is-self {
      padding-right: 50px;
      position: relative;
      text-align: left;

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
        top: -8px;
      }
    }
  }
}

.msg-control {
  display: inline-block;
  position: absolute;
  background: #5b5b5b;
  padding: 10px;
  z-index: 99;
  bottom: -46px;
  border-radius: 6px;

  div {
    padding: 4px 0;
    color: #fff;

    &:hover {
      cursor: pointer;
    }
  }

  &.other {
    bottom: -46px;
  }
}
.announcement {
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  background: #dde7ff;
  &-icon {
    background: #dde7ff;
    width: 28px;
    height: 28px;
    position: absolute;
    left: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 16px;
      height: 16px;
    }
  }
  &-item {
    white-space: nowrap;
    animation: scroll 10s linear infinite;
    font-size: 13px;
    margin: 5px 0 5px 28px;
  }
}
.pin-info {
  background: #f4e8d3;
  padding: 5px;
  text-align: left;
  border-radius: 4px;
  position: absolute;
  width: 100%;
  left: 0;
  z-index: 99;
  word-break: break-all;
  box-sizing: border-box;
  font-size: 13px;
}
.share-icon {
  position: absolute;
  right: 52rpx;
  width: 60rpx;
  height: 60rpx;
  z-index: 10;
}
.share-box {
  width: 80vw;
  height: 100px;
  padding: 15px;

  &-title {
    font-size: 20px;
    font-weight: bold;
  }
  &-row {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    input {
      border: 1px solid gray;
      font-size: 15px;
      padding: 5px;
      width: 50vw;
    }
  }
  &-copy {
    background: linear-gradient(90deg, #ffdfab 0%, #e3ac72 100%);
    color: white;
    font-size: 15px;
    padding: 5px 0;
    width: 25vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
