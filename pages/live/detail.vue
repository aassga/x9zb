<!-- 直播间 -->
<template>
  <view class="detail detail_box">
    <downloadHead v-if="show1 && !hidevideo"></downloadHead>
    <view
      class="video"
      @click="play(1)"
      v-if="!hidevideo"
      :style="{
        paddingTop: show1 ? '108rpx' : '0',
        height: show1 ? '528rpx' : '420rpx',
      }"
    >
      <!-- <image class="play" src="../../static/images/live/play-img.png" mode=""></image> -->
      <view
        class="counttDownShow"
        v-if="counttDown"
        :style="{ marginTop: show1 ? '108rpx' : '0' }"
      >
        <view class="center_date">
          <view class="title_date">开赛倒计时：</view>
          <view class="date_out"
            ><span class="d_date">{{ counttDownDay[0] }}</span
            ><span class="h_date">{{ counttDownDay[1] }}</span
            ><span class="m_date">{{ counttDownDay[2] }}</span
            ><span class="s_date">{{ counttDownDay[3] }}</span>
          </view>
          <view class="date_tile"
            ><span class="d_date_d">天</span><span class="h_date_h">小时</span
            ><span class="m_date_m">分钟</span
            ><span class="s_date_s">秒</span></view
          >
          <view class="concern_box_shou">
            <view
              @click="copyTextLink()"
              class="txt_control"
              title="分享"
            ></view>
          </view>
        </view>
      </view>
      <!-- //腾讯 -->
      <!-- <TcVideoPlayer  /> -->
      <!-- 原播放器 -->
      <view class="thumb" ref="video" v-if="videoPlay"> </view>
      <view class="voice" @click.stop="play(2)" v-if="isVolume && videoPlay">
        取消静音
      </view>
      <image
        class="thumb"
        v-if="room.info && !videoPlay"
        :src="room.info.thumb"
        mode="aspectFill"
      ></image>
      <view class="video-bar flex" v-if="videoBar && videoPlay" @click.stop="">
        <view class="video-bar-left" @click="play(3)">
          <image
            :src="
              isPlay
                ? '/static/images/live/puase.png'
                : '/static/images/live/play.png'
            "
            mode=""
          ></image>
          <image
            src="/static/images/live/reset.png"
            @click="play(4)"
            mode=""
          ></image>
        </view>
        <view class="video-bar-right flex-end">
          <text @click="isQuality = !isQuality">{{
            quality[qualityIndex]
          }}</text>
          <view class="quality" v-if="isQuality">
            <text
              v-for="(item, index) in quality"
              :key="index"
              @click="(qualityIndex = index), (isQuality = false)"
              >{{ item }}</text
            >
          </view>
        </view>
      </view>
      <image
        class="video_logo"
        src="/static/images/live/logo_red.png"
        mode=""
      ></image>
    </view>

    <view @touchmove.stop="(e) => {}" class="tabs">
      <u-tabs
        :style="{
          width: '620rpx',
        }"
        :bar-width="50"
        :list="tabList"
        font-size="24"
        active-color="#C41D48"
        :is-scroll="true"
        :current="current"
        @change="change"
      ></u-tabs>
      <view
        class="tabs-btn flex-center"
        :class="{ active: userInfo.is_attention == 1 || alreadyAttention }"
      >
        <view class="flex-center" @click="getShow()">
          <image src="/static/images/live/live-7.png" mode=""></image>
          <text>关注</text>
        </view>
        <view class="">
          {{ userInfo.attention }}
        </view>
      </view>
    </view>
    <!-- <view class="activity">
			<image v-for="(item,index) in 4" :src="'/static/images/live/icon'+(index+1)+'.png'" mode="aspectFill" @click="getShow(index)"></image>
		</view> -->

    <template v-if="chat_msg_close == '0'">
      <view
        :class="['tabs_context', show1 && !hidevideo ? '' : 'tabs_context_max']"
      >
        <newDetail1
          :headShow="show1 && !hidevideo"
          :activeIndex="activeIndex2"
          @onHandleClickItem="onHandleClickItem"
          :current="current"
          v-if="current == 1 && showTabs.includes(current) && !showMsgInfo"
          :list="messageList"
        ></newDetail1>
        <MessageInfo
          :headShow="show1 && !hidevideo"
          @close="onHandleMsgInfoBack"
          v-if="current == 1 && showMsgInfo"
          :current="current"
          :roomInfo="roomInfo"
        >
        </MessageInfo>
        <detail1
          :headShow="show1 && !hidevideo"
          :giftList="giftList"
          :current="current"
          :showMsgInfo="showMsgInfo"
          @getShow="getShow"
          @leaveRoom="leaveRoom"
          :qsVid="qsVid"
          v-if="
            (qsVid && showTabs.includes(current)) ||
            (current == 1 && showMsgInfo)
          "
          :roomInfo="roomInfo"
          :roomDetailData="roomInfo"
          :userInfo="userInfo"
          @getMessageList="getMessageList"
        ></detail1>
        <detail2
          v-if="current == 3"
          :userInfo="userInfo"
          @getShow="getShow"
        ></detail2>
        <detail3
          v-if="current == 4"
          ref="detail3"
          :userInfo="userInfo"
        ></detail3>
        <detail4 v-if="current == 5"></detail4>
      </view>
    </template>
    <template v-else>
      <view class="tabs_context" :class="{ hasHeader: show1 && !hidevideo }">
        <detail2
          v-if="current == 0"
          :userInfo="userInfo"
          @getShow="getShow"
        ></detail2>
        <detail3
          v-if="current == 1"
          ref="detail3"
          :userInfo="userInfo"
        ></detail3>
        <detail4 v-if="current == 2"></detail4>
      </view>
    </template>
    <u-popup v-model="show" mode="center" border-radius="20" :closeable="true">
      <view class="todownload-box">
        <view class="close-btn"> </view>
        <view class="todownload-title">赶紧去下载小九直播APP</view>
        <view class="todownload-subtitle"> 收获完整内容体验～ </view>
        <view class="todownload-btn" @click="$navigateTo('../download')"
          >立即下载</view
        >
      </view>
    </u-popup>
  </view>
</template>

<script>
import detail1 from "./compontent/detail-1.vue";
import newDetail1 from "./compontent/newDetail1.vue";
import MessageInfo from "./compontent/MessageInfo.vue";
import detail2 from "./compontent/detail-2.vue";
import detail3 from "./compontent/detail-3.vue";
import detail4 from "./compontent/detail-4.vue";
import TcVideoPlayer from "./tencentPlayer.vue";
import tim from "@/store/index.js";
import { getQueryString } from "@/common/Qs";
import { getUUID } from "@/common/uuid";
// let tim = TIM.create(options); // SDK 实例通常用 tim 表示
export default {
  components: {
    detail1,
    detail2,
    detail4,
    detail3,
    newDetail1,
    MessageInfo,
    TcVideoPlayer,
  },
  data() {
    return {
      showMsgInfo: false, // 房间是否显示的状态
      msgList2: [], // 红点的列表
      oneChat: 0, // 主播私聊的未读总数
      msgCount: 0, // 列表红点的总数
      modalMsgList: [],
      messageList: [], // 获取聊天列表
      activeIndex2: 0, // 聊天列表的选中索引
      parmUserInfo: {},
      roomInfo: {},
      timer: null, //定时器
      i: 0, //计数
      show: false,
      showTabs: [0, 1, 2],
      tabList: [],
      groupID: "",
      room: {},
      current: 0,
      userInfo: {},
      giftList: [],
      counttDown: 0, //开赛倒计时
      counttDownDay: 0, //开赛倒计时分秒
      isPlay: false,
      isVolume: true, //是否播放声音
      videoBar: false,
      videoPlay: false,
      isQuality: false,
      qualityIndex: 0,
      qualityArr: [], //画质数组
      quality: [], //画质
      hidevideo: getQueryString().hidevideo,
      alreadyAttention: false,
      chat_msg_close: "0",
      channel_code: getQueryString().channel_code,
      timeInterval: null,
      qsVid: "",
    };
  },
  mounted() {
    // console.log(this.$store.state.system,"system========")
  },
  created() {
    this.tabList = [
      {
        name: "主播",
      },
      {
        name: "排行榜",
      },
      {
        name: "相关视频",
      },
    ];
    if (
      this.$store.state.system.chat_msg_close == "1" &&
      getQueryString().hidevideo
    ) {
      this.chat_msg_close = "1";
      return;
    }
    let tabList = getQueryString().tabList;
    let newTabList = [];
    if (tabList) {
      newTabList = tabList.split(",").reverse();
    } else {
      newTabList = ["2", "1", "0"];
    }
    newTabList.forEach((item) => {
      if (item === "0") {
        this.tabList.unshift({
          name: "广场",
        });
      }
      if (item === "1") {
        this.tabList.unshift({
          name: "聊天",
        });
      }
      if (item === "2") {
        this.tabList.unshift({
          name: "主播私聊",
        });
      }
    });
  },
  computed: {
    unReadInfo() {
      return this.$store.state.unRead;
    },
    show1: {
      get() {
        return this.$store.state.show;
      },
      set() {
        // this.$store.state.info.midMask = !this.$store.state.info.midMask
      },
    },
  },
  onLoad(option) {
    this.groupID = option.id;
    this.getUserGiftList();
    this.getLiveDetail(option.id);
    this.$store.state.timMessage = [];
    this.recordUsageTime();
    this.timeInterval = setInterval(() => {
      this.recordUsageTime();
    }, 60000);
    this.Iime();
    // this.getMessageList(); // 获取聊天列表
  },
  onUnload() {
    // this.player = null
    this.videoPlay = false;
    this.player.dispose();
    this.$store.dispatch("quitGroup", {
      groupID: this.groupID,
    });
    /* 退出群组 */
    // this.quitGroup()
  },
  onShow() {
    this.videoPlay = true;
    // this.$nextTick(function(){
    // 	this.play(4)
    // })
  },
  onHide() {
    // this.player = null
    // this.videoPlay = false
    // this.player.dispose();
  },
  watch: {
    chat_msg_close(newVal, oldVal) {
      if (newVal != oldVal) {
        this.tabList = [
          {
            name: "主播",
          },
          {
            name: "排行榜",
          },
          {
            name: "相关视频",
          },
        ];
      }
    },
    unReadInfo(newVal, oldVal) {
      if (newVal != oldVal) {
        this.onHandleUnRead(newVal.msgList, newVal.type);
      }
    },
    qualityIndex(e) {
      //监听改变画质
      this.play(4);
    },
    current(e) {
      if (e == 1) {
        this.getMessageList(); // 获取聊天列表
      }
    },
    msgList2(e) {},
    msgCount(e) {
      // console.log('监听到了总数的变化')
      // console.log(e)
      let tablist = JSON.parse(JSON.stringify(this.tabList));
      for (let index = 0; index < tablist.length; index++) {
        let element = tablist[index];
        if (element.name == "聊天") {
          if (e && e > 0) {
            element.count = e;
          } else if (element.hasOwnProperty("count")) {
            delete element.count;
          }
        }
      }
      // console.log('改变后的总数tablist')
      // console.log(tablist)
      this.tabList = tablist;
    },
  },
  onReady() {
    this.$nextTick((res) => {
      let video = document.createElement("video");
      video.id = "video";
      video.style = "width: 100%; height: 100%;padding-top:0;z-index:-999";
      video.controls = true;
      video.preload = "auto";
      video.setAttribute("playsinline", true); //IOS微信浏览器支持小窗内播放
      video.setAttribute("webkit-playsinline", true); //这个bai属性是ios 10中设置可以让视频在小du窗内播放，也就是不是全zhi屏播放的video标签的一个属性
      video.setAttribute("x5-video-player-type", "h5"); //安卓 声明启用同层H5播放器 可以在video上面加东西
      let source = document.createElement("source");
      source.src =
        "http://yun-live.oss-cn-shanghai.aliyuncs.com/record/yunlive/record/yunlive/meeting_1070/2020-11-25-09-27-59_2020-11-25-09-35-52.m3u8";
      source.style = "width: 100%; height: 100%;padding-top:0";
      video.appendChild(source);
      this.$refs.video.$el.appendChild(video);
      let that = this;
      this.player = this.$video(
        "video",
        {
          poster: "", // 视频封面图地址
          title: "",
          playbackRates: [], //播放速度
          autoDisable: true,
          preload: "none", //auto - 当页面加载后载入整个视频 meta - 当页面加载后只载入元数据 none - 当页面加载后不载入视频
          language: "zh-CN",
          fluid: true, // 自适应宽高
          muted: false, //  是否静音
          aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          controls: false, //是否拥有控制条 【默认true】,如果设为false ,那么只能通过api进行控制了。也就是说界面上不会出现任何控制按钮
          autoplay: "muted", //如果true,浏览器准备好时开始回放。 autoplay: "muted", // //自动播放属性,muted:静音播放
          loop: false, // 导致视频一结束就重新开始。 视频播放结束后，是否循环播放
          screenshot: true,
          controlBar: {
            volumePanel: {
              //声音样式
              inline: false, // 不使用水平方式
            },
            timeDivider: false, // 时间分割线
            durationDisplay: false, // 总时间
            progressControl: false, // 进度条
            remainingTimeDisplay: false, //当前以播放时间
            fullscreenToggle: false, //全屏按钮
            pictureInPictureToggle: false, //画中画
          },
        },
        function () {
          this.on("error", function (err) {
            //请求数据时遇到错误
            // console.log("请求数据时遇到错误", err)
            that.videoPlay = false;
          });
          this.on("stalled", function (stalled) {
            //网速失速
            // console.log("网速失速", stalled)
            that.isPlay = false;
            //改变播放的状态
          });
          this.on("play", function () {
            //开始播放
            // console.log("开始播放")
            that.isPlay = true;
          });
          this.on("pause", function () {
            //暂停
            // console.log("暂停")
            that.isPlay = false;
          });
          // this.on('timeupdate', function(timeupdate) {
          // console.log(timeupdate)
          // })
        }
      );
    });
    // console.log(getQueryString(), "getQueryString=====")
    if (getQueryString()) {
      this.parmUserInfo = {
        vid: getQueryString().vid,
      };
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
    // console.log('this.parmUserInfo')
    // console.log(this.parmUserInfo)
    // console.log(this.userInfo)
    this.getMessageList();
  },
  methods: {
    // 列表已读未读比对事件
    mapList(list1, list2) {
      // 是否是新增的消息 是的话就讲房间移动到列表最前面
      if (list2.length > 0 && list2[list2.length - 1].text) {
        list1.sort((x, y) => {
          return x.vid == list2[list2.length - 1].vid
            ? -1
            : y.vid == list2[list2.length - 1].vid
            ? 1
            : 0;
        });
        // 如果是重整之后的数组，则重新校对active的索引，使页面样式规范
        for (let index = 0; index < list1.length; index++) {
          let element = list1[index];
          if (element.vid == this.roomInfo.vid) {
            this.activeIndex2 = index;
          }
        }
      }

      let menuList = list1;
      let changeList = list2;

      for (let indexs = 0; indexs < menuList.length; indexs++) {
        let elements = menuList[indexs];
        for (let index = 0; index < changeList.length; index++) {
          let element = changeList[index];
          if (element.vid == elements.vid) {
            elements.unread_count = element.unread_count;
            // 如果页面有text则替换最后的text
            if (element.text) {
              elements.last_msg.text = element.text;
            }
          }
        }
      }

      // console.log("新消息变更之后的数组");
      // console.log(menuList);

      return menuList;
    },
    // 群组消息总数计算事件
    onHandleGroupMsgChange(list) {
      let num = 0;
      for (let index = 0; index < list.length; index++) {
        const element = list[index];
        if (element.unread_count > 0) {
          num += element.unread_count;
        }
      }

      this.msgCount = num;
    },
    // 列表红点刷新事件
    onHandleUnRead(msgList, type) {
      // console.log('已读未读的ws消息接收')
      // console.log(msgList)
      // console.log(type)
      if (type == 0) {
        // console.log("默认的未读消息数组");
        // console.log(msgList);
        this.msgList2 = msgList;
      } else {
        if (this.messageList.length <= 0) {
          this.getMessageList();
          return;
        }

        let falg = true;
        let arr = JSON.parse(JSON.stringify(this.msgList2));
        for (let index = 0; index < arr.length; index++) {
          let element = arr[index];
          if (element.vid === msgList.vid) {
            falg = false;
            element.unread_count += 1;
            element.text = msgList.text;
          }
        }

        if (falg) {
          arr.push(msgList);
        }
        // console.log("我接受到了新消息");
        // console.log(arr);
        this.msgList2 = arr;
        this.msgCount += 1;
        this.messageList = this.mapList(this.messageList, this.msgList2);
        this.onHandleGroupMsgChange(this.messageList);
      }
    },
    // 已读事件
    readItem(item) {
      let msgList2 = this.msgList2;
      for (let index = 0; index < msgList2.length; index++) {
        let element = msgList2[index];
        if (element.vid == item.vid) {
          element.unread_count = 0;
        }
      }
      this.msgList2 = msgList2;
    },
    // 显示隐藏
    play(type) {
      //视频进度
      if (type == 1) {
        this.videoBar = !this.videoBar;
        if (this.videoBar) {
          //如果是开启 5s后自动关闭
          this.i = 0;
          this.setInter();
        } else {
          clearInterval(this.timer);
        }
      } else if (type == 2) {
        //解除声音（100%
        this.player.volume(1);
        this.player.muted(false);
        this.isVolume = false;
      } else if (type == 3) {
        //播放/暂停
        if (this.isPlay) {
          this.player.pause();
        } else {
          this.player.play();
        }
      } else if (type == 4) {
        //刷新重置
        this.player.pause();
        // console.log(this.player);
        this.player.src({
          src: this.qualityArr[this.qualityIndex],
        });
        this.player.load({
          src: this.qualityArr[this.qualityIndex],
        });
        this.player.play();
      }
    },
    setInter() {
      //s后自动关闭 自定义进度条
      this.timer = setInterval((res) => {
        this.i++;
        if (this.i == 5) {
          this.videoBar = false;
          clearInterval(this.timer);
        }
      }, 1000);
    },

    // 点击活动图标
    getShow(i) {
      if (!getQueryString().hidevideo) {
        this.show = true;
        return;
      } else {
        if (!getQueryString().token) {
          this.$u.toast("请先登录");
          return;
        }
        this.$u
          .post("/api/Member/attention", {
            id: getQueryString().id,
          })
          .then((res) => {
            this.getLiveDetail(getQueryString().id);
          });
      }
    },
    async getMessageList() {
      // const userid = JSON.parse(localStorage.getItem("userid"))
      // const _that = this;
      let res = await this.$u.get("/api/chat/getChatRoomList", {
        user_id: this.parmUserInfo.user_id,
        type: "1,2",
        channel_code: this.channel_code ? this.channel_code : "",
      });
      for (let index = 0; index < res.length; index++) {
        let element = res[index];
        element.unread_count = 0;
      }
      // console.log("请求拿到的数据");
      // console.log(res);
      if (this.msgList2.length > 0) {
        res = this.mapList(res, this.msgList2);
        // this.list2 = this.mapList(this.list2, newV);
        // if (this.activeIndex == 1) {
        //   this.$emit("onHandleGroupMsgChange", this.modalMsgList);
        // } else if (this.activeIndex == 2) {
        this.onHandleGroupMsgChange(res);
      }
      // this.onHandleMenuChange(this.messageList);
      // console.log('列表的数据')
      // console.log(res)
      this.messageList = res;
    },
    // 获取礼物列表
    getUserGiftList() {
      this.$u.get("api/Gift/getList", {}).then((res) => {
        this.giftList = res;
      });
    },

    // 点击聊天列表事件
    onHandleClickItem(item, index) {
      // console.log(item, this.current, "item-info=======");

      this.showMsgInfo = true;
      this.roomInfo = item;
      this.activeIndex2 = index;
      let messageList = JSON.parse(JSON.stringify(this.messageList));
      this.msgCount -= messageList[index].unread_count || 0;
      messageList[index].unread_count = 0;
      this.messageList = messageList;
      this.readItem(item);
      this.parmUserInfo.vid = item.vid;
      // this.showChatList = false;
      // this.showMsgInfo = true;
      // this.inRoomInfo(this.fd);
      // this.getChatHistoryMsg();
    },
    // 私聊(type=2)離開聊天室
    leaveRoom() {
      this.roomInfo = {};
    },
    // 聊天室返回事件
    onHandleMsgInfoBack() {
      this.showMsgInfo = false;
      this.getMessageList();
    },
    // 获取直播详情
    getLiveDetail(id) {
      this.$u
        .post("/api/Live_streaming/getRoomInfo", {
          uid: id,
          channel_code: this.channel_code ? this.channel_code : "",
        })
        .then((res) => {
          this.userInfo = res.userData;
          this.qsVid = res.vid;
          // console.log("==============res.userData.vid",res.vid)
          this.chat_msg_close = res.chat_msg_close;
          // 编辑主播公告
          res.userData.announcement1 = [];
          res.userData.announcement1.push(res.userData.announcement);
          this.room = res;
          // this.$store.dispatch('joinGroup', {
          // 	id: id
          // })
          // console.log(res.info.starttime, res.info.servertime)
          // if ((res.info.starttime) - (res.info.servertime) > 0 && (res.info.starttime) > 0) {
          // 	this.counttDown = (res.info.starttime) - (res.info.servertime)
          this.$store.dispatch("joinGroup", {
            id: id,
          });
          // console.log(res.info.starttime, res.info.servertime)
          if (
            res.info.starttime - res.info.servertime > 0 &&
            res.info.starttime > 0
          ) {
            // console.log("qsqweqweqewqerwerqqwrqer")
            this.counttDown = res.info.starttime - res.info.servertime;
          }
          if (JSON.stringify(res.info.clarity) == "{}") {
            this.quality = ["原画"];
          } else {
            this.quality = ["流畅", "标清", "高清"];
            // 重组清晰画质连接
            let qualityArr = [];
            for (let var1 in res.info.clarity) {
              // console.log(res.info.clarity[var1]);
              qualityArr.push(res.info.clarity[var1]);
            }
            qualityArr.unshift(res.info.pull);
            this.qualityArr = qualityArr;
            // .forEach((item,index)=>{
            // console.log(item[index]);
            // })
          }

          // 播放
          this.$nextTick(function () {
            this.player.src({
              src: res.info.pull,
            });
            this.player.load({
              src: res.info.pull,
            });
            this.player.play();
          });
          // console.log(resdata);
        });
    },

    change(e) {
      // console.log(e,"e==========")
      this.current = e;
      this.showMsgInfo = false;
      if (e == 4) {
        setTimeout((res) => {
          this.$refs.detail3.getList({
            uid: this.userInfo.uid,
            type: 0,
          });
        }, 100);
      }
    },
    counttDownF() {
      let d = parseInt(this.counttDown / (24 * 60 * 60));
      d = d < 10 ? "0" + d : d;
      let h = parseInt((this.counttDown / (60 * 60)) % 24);
      h = h < 10 ? "0" + h : h;
      let m = parseInt((this.counttDown / 60) % 60);
      m = m < 10 ? "0" + m : m;
      let s = parseInt(this.counttDown % 60);
      s = s < 10 ? "0" + s : s;
      let date = [d, h, m, s];
      this.counttDownDay = date;
    },
    copyTextLink() {
      let str = window.location.href;
      const qrUrlContent = document.querySelector("#cp-input input");
      qrUrlContent.value =
        window.location.origin +
        "/room/" +
        getQueryString().id +
        "?&c=" +
        getQueryString().channel_code;
      qrUrlContent.select();
      let range = document.createRange();
      let selection = document.getSelection();
      range.selectNode(qrUrlContent);
      selection.addRange(range);
      qrUrlContent.setSelectionRange(0, qrUrlContent.value.length);
      let isSucess = document.execCommand("copy");
      this.tipsId = -1;
      if (isSucess) {
        alert("复制成功");
      }
    },
    Iime() {
      setInterval(() => {
        if (this.counttDown > 0) {
          this.counttDown -= 1;
          this.counttDownF();
        }
      }, 1000);
    },
    // 記錄進入直播間時長
    recordUsageTime() {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let user_id = userInfo ? userInfo.id : localStorage.getItem("userid");

      let data = {
        user_id: getQueryString().user_id || user_id,
        match_id: getQueryString().id,
      };
      this.$u
        .post("api/statistics/recordUsageTime", data)
        .then((res) => {})
        .catch((res) => {});
    },
  },
  destroyed() {
    clearTimeout(this.Iime);
    clearInterval(this.timeInterval);
  },
};
</script>

<style lang="scss">
.detail {
  height: 100%;
  &.detail_box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
}

.activity {
  z-index: 9;
  position: fixed;
  right: 16rpx;
  width: 100rpx;
  bottom: 132rpx;

  image {
    width: 100rpx;
    height: 100rpx;
    margin-top: 17rpx;
  }
}

.video {
  position: relative;
  padding-top: 106rpx;
  box-sizing: border-box;
  .video_logo {
    z-index: 999;
    position: absolute;
    bottom: 20rpx;
    right: 20rpx;
    width: 120rpx;
    height: 45rpx;
  }
  .thumb {
    width: 100%;
    height: 100%;
    z-index: -100;
    position: relative;
    background-color: #000;
  }

  .video-bar {
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    color: #fff;
    height: 60rpx;
    background: rgba(0, 0, 0, 0.4);

    image {
      width: 30rpx;
      height: 30rpx;
      margin-left: 20rpx;
    }

    text {
      margin-right: 60rpx;
    }
  }

  .video-bar-right {
    position: relative;

    .quality {
      width: 80rpx;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      position: absolute;
      left: -40rpx;
      color: #fff;
      bottom: 50rpx;
      padding: 20rpx 22rpx;
      border-radius: 20rpx;
      background-color: rgba(0, 0, 0, 0.7);

      text {
        display: block;
        width: 100%;
        margin-right: 0;
        text-align: center;
        padding-bottom: 20rpx;
      }
    }
  }

  .voice {
    position: absolute;
    bottom: 50px;
    left: 50%;
    z-index: 4;
    margin: -34rpx 0 0 -190rpx;
    width: 368rpx;
    height: 122rpx;
    line-height: 122rpx;
    border-radius: 8rpx;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: #ff5d23;
    font-size: 32rpx;
    text-align: center;
    color: #fff;
    background-size: 100% 100%;
  }

  .counttDownShow {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 420rpx;
    background: url(../../static/images/live/live_bg.png);
    background-size: 100%;
    // height: 218px;
    // background: #000;
    z-index: 10;
    color: #fff;

    .center_date {
      text-align: center;
      // margin-top: 20%;
      margin-top: 14%;
      display: inline-block;
      margin-left: 10%;
      background: rgba(0, 0, 0, 0.7);
      padding: 10px 16px;
      // margin-left: 33%;
      // background: #6363b5;
      // padding: 6px 16px;
      border-radius: 6px;
      width: 520rpx;
      position: relative;

      .txt_control {
        display: inline-block;
        width: 70rpx;
        height: 70rpx;
        background-image: url("../../static/images/live/ic-share.png");
        background-size: 100% 100%;
        cursor: pointer;
      }

      #cp-input1 {
        position: absolute;
        z-index: -1;
        opacity: 0;
      }

      .concern_box_shou {
        position: absolute;
        right: 1%;
        top: 2%;
      }

      .title_date {
        font-size: 17px;
        margin: 10px 0 6px 0px;
      }

      .d_date,
      .h_date,
      .m_date,
      .s_date {
        display: inline-block;
        padding: 10rpx 0;
        background: #000;
        color: #fff;
        margin: 0 4rpx;
        text-align: center;
        width: 90rpx;
        font-size: 32rpx;
        font-family: "LcdD";
        font-display: swap;
      }

      .d_date_d,
      .h_date_h,
      .m_date_m,
      .s_date_s {
        display: inline-block;
        padding: 10rpx 0;
        color: #fff;
        margin: 0 4rpx;
        text-align: center;
        width: 90rpx;
        font-size: 32rpx;
      }
    }
  }
}

.play {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -50rpx;
  width: 100rpx;
  height: 100rpx;
  z-index: 9;
}

.myVideo {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -50rpx;
  width: 100rpx;
  height: 100rpx;
  z-index: 9;
}

.tabs {
  position: relative;
}

.tabs_context {
  position: relative;

  .detail {
    height: calc(100vh - 620rpx);
  }

  .HuyaXWebhMessagelist {
    height: calc(100vh - 620rpx);
  }

  .HuyaXWebhMessageinfo {
    height: calc(100vh - 620rpx);
  }
}

.tabs_context_max {
  position: relative;
  .detail {
    height: calc(100vh - 508rpx);
  }

  .HuyaXWebhMessagelist {
    height: calc(100vh - 508rpx);
  }

  .HuyaXWebhMessageinfo {
    height: calc(100vh - 508rpx);
  }
}

.hasHeader {
  .detail {
    height: calc(100vh - 620rpx - 104rpx);
  }

  .HuyaXWebhMessagelist {
    height: calc(100vh - 620rpx - 104rpx);
  }

  .HuyaXWebhMessageinfo {
    height: calc(100vh - 620rpx - 104rpx);
  }
}

.tabs-btn {
  min-width: 140rpx;
  position: absolute;
  right: 0;
  top: 0;
  color: #fff;
  height: 80rpx;
  flex-wrap: wrap;
  text-align: center;
  // padding: 0 28rpx;
  background: #C41D48;

  image {
    width: 28rpx;
    height: 25rpx;
    margin-right: 14rpx;
  }

  view {
    width: 100%;
  }
}

.active {
  background: #b0b0b0;
}
</style>
