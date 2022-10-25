
<template>
  <div
    class="chat-window"
    :class="{ 'chat-pin': pinInfo }"
    @click="clearStatus()"
  >
    <div class="chat-detail-main current0" ref="content-list">
      <div v-for="(item, index) in messageDataList" :key="index">
        <div class="system-tips" v-if="item.action === 'system'">
          <img
            src="./../../static/images/live/HiTag.png"
            class="hi-tag"
            v-if="item.text ? item.text.indexOf('进入直播间') !== -1 : false"
          />
          <span class="anchor-tag" v-if="item.sender == uid">主播</span>
          <span
            class="level-tag"
            :class="`level${item.sender_exp ? item.sender_exp : 0}`"
            v-if="
              item.sender_exp && item.action !== 'gift' && item.sender != uid
            "
            >Lv.{{ item.sender_exp ? item.sender_exp : 0 }}</span
          >
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
              <div
                class="msg-container"
                :class="{ 'anchor-msg': current === 1 }"
              >

                <div
                  class="msg-content"
                  :class="{
                    'my-self':
                      (Number(item.sender) === parmUserInfo.user_id ||
                        item.sender === parmUserInfo.user_id||item.sender_nickname === parmUserInfo.username||
                        item.sender === localuserid) &&
                      current === 1,
                  }"
                  @click.stop="showControl(index, item)"
                >
                  <template v-if="current === 0">
                    <img
                      src="./../../static/images/live/HiTag.png"
                      class="hi-tag"
                      v-if="
                        item.text
                          ? item.text.indexOf('进入直播间') !== -1
                          : false
                      "
                    />
                    <span class="anchor-tag" v-if="item.sender == uid"
                      >主播</span
                    >
                    <span
                      class="level-tag"
                      :class="`level${item.sender_exp ? item.sender_exp : 0}`"
                      v-if="
                        item.sender_exp &&
                        item.action !== 'gift' &&
                        item.sender != uid
                      "
                      >Lv.{{ item.sender_exp ? item.sender_exp : 0 }}</span
                    >
                  </template>
                  <div
                    class="msg-avatar"
                    v-if="item.sender != parmUserInfo.user_id && current === 1"
                  >
                    <img class="avatar" :src="avararImg(item)" />
                  </div>
                  <div class="msg-footer" v-if="current !== 1">
                    <span
                      :style="
                        item.text === '进入直播间' ||
                        item.text.includes('进入直播间')
                          ? 'color: #665a64;'
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
                  <template v-if="item.pic && item.text&&(item.msg_type!=4||item.msg_type!='4')">
                    <div
                      class="thumb-container"
                      @click.stop="openAppUrl(item.link)"
                    >
                      <img class="thumb-pic" :src="item.pic | picFilter" />
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
                    v-if="!item.pic && item.text "
                    @click="openAppUrl(item.text)"
                    class="text-info"
                    v-html="getText(item.text)"
                    :style="item.text === '进入直播间' ? 'color: #665a64;' : ''"
                  ></div>
                  <div
                    v-if="item.msg_type == '4'||item.msg_type ==4"
                    class="text-info"
                  >
                    {{ item.text }}
                    <img
                      class="b-play-btn"
                      :src="require('./../../static/images/chat/play.png')"
                      @click="play(item)"
                    />
                    
                  </div>
                  <img v-if="item.isError" class="error-msg" src="./../../static/images/live/loading.png" alt="" @click="resend(item)"/>
                  <div v-if="controlIndex === index" class="msg-control other">
                    <!--  <div @click="mute(item)">禁言</div>
														<div @click="freeze(item)">冻结</div> -->
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
  </div>
</template>

<script>
export default {
  name: "chatNewMessage",
  data(){
    return{
      localuserid:localStorage.getItem("userid")
    }
  },
  props: {
    pinInfo: {
      type: null,
    },
    uid: {
      type: null,
    },
    controlIndex: {
      type: null,
    },
    messageDataList: {
      type: Array,
    },
    current: {
      type: Number,
    },
    parmUserInfo: {
      type: Object,
    },
  },
  methods: {
    play(item) {
      this.$u
        .post("api/tob/gettoburl", {
          terminal: "h5",
          share: item.sender,
        })
        .then((res) => {
          if (res.length > 0) {
            const url = res[0];
            let newTab = window.open("about:blank");
            newTab.location.href = url;
          }
        });
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
    avararImg(item) {
      if (item.avatar === "") {
        return require("./../../static/images/home/userLogo.png");
      } else {
        return item.avatar;
      }
    },
    showControl(index, item) {
      if (item.msg_type === "4"||item.msg_type === 4) return;
      this.$emit("controlEvent", index);
    },
    onHandleClickImg(url) {
      // console.log("我是点击图片事件");
      uni.previewImage({
        urls: [url],
      });
    },
    onHandleReportShow(item) {
      this.$emit("reportEvent", item);
    },
    openAppUrl(str) {
      var reg = /(https?:\/\/[^\s]+)/g;
      str = str.match(reg)[0];
      let data = {
        action: "blank",
        message: str,
      };
      if (this.hidevideo) {
        // console.log("开始调用======");
        // console.log("Android======", JSON.stringify(data), data);
        if (getQueryString().device == "iphone") {
          // console.log("开始调用IOS======", data);
          window.webkit.messageHandlers.interOp.postMessage(data);
          return;
        }
        if (typeof AndroidInterface !== undefined) {
          // console.log("Android======", JSON.stringify(data), data);
          AndroidInterface.postmaessage(JSON.stringify(data));
        }
      } else {
        window.open(str);
      }
    },
    resend(item) {
      this.$emit("resendEvent", item);
    },
  },
};
</script>

<style lang="scss" scoped>
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
  background: #fff;
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
  .hi-tag {
    height: 36rpx;
    margin-right: 6rpx;
    vertical-align: sub;
  }

  .anchor-tag {
    display: inline-block;
    height: 36rpx;
    padding: 0 12rpx;
    margin-right: 6rpx;
    font-size: 24rpx;
    line-height: 36rpx;
    border-radius: 10px;
    font-weight: bold;
    background: linear-gradient(114deg, #ebcaa9 0%, #dab16f 100%);
    color: #9c583d;
  }

  .level-tag {
    display: inline-block;
    height: 36rpx;
    margin-right: 6rpx;
    padding: 0 8rpx;
    line-height: 36rpx;
    border-radius: 2px;
    color: #fff;
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
  .anchor-msg {
    .msg-content {
      display: flex;

      .msg-avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 80rpx;
        max-width: 80rpx;
        height: 80rpx;
        margin-right: 10rpx;
        border-radius: 5px;
        overflow: hidden;

        .avatar {
          width: 80rpx;
        }
      }

      .text-info {
        align-self: flex-start;
        position: relative;
        max-width: 65%;
        min-height: 40rpx;
        margin-left: 20rpx;
        padding: 8px;
        border-radius: 7px;
        background: #eee;

        &::after {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 0;
          height: 4rpx;
          margin-top: 12rpx;
          margin-left: -36rpx;
          border-color: transparent #eee transparent transparent;
          border-style: solid;
          border-width: 8rpx 20rpx;
        }
      }

      &.my-self {
        flex-direction: row-reverse;

        .text-info {
          margin-right: 20rpx;
          margin-left: 0;

          &::after {
            margin-left: calc(100% - 6rpx);
            border-color: transparent transparent transparent #eee;
          }
        }
      }
    }
  }
  .system-tips {
    display: inline-block;
    padding: 4px 2px;
    border-radius: 4px;
    font-size: 12px;
    color: #000;
  }

  .msg-content {
    padding: 4px;
    border-radius: 4px;
    font-size: 15px;
    word-break: break-all;
    display:flex;
    align-items: center;
    &.anchor-msg {
      .text-info,
      .msg-footer {
        color: #ffa930;
      }
    }
  }

  .text-info {
    display: initial;
    font-size: 12px;
    color: #000;
  }

  .msg-footer {
    color: #707070;
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
    // display: inline-block;

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

  &.current1 {
    padding-top: 20rpx;
  }

  &.current2 {
    .other-side {
      width: 100%;
    }
    .msg-content {
      display: flex;
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
          width: 80rpx;
        }
      }
      .text-info {
        align-self: flex-start;
        position: relative;
        max-width: 65%;
        min-height: 40rpx;
        margin-left: 20rpx;
        padding: 8rpx;
        border-radius: 7px;
        background: #eee;
        &::after {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 0;
          height: 4rpx;
          margin-top: 12rpx;
          margin-left: -36rpx;
          border-color: transparent #eee transparent transparent;
          border-style: solid;
          border-width: 8rpx 20rpx;
        }
      }
    }
  }
}
.b-play-btn {
  animation: pulse 2s ease infinite;
  width: 80px;
  height: auto;
  &:hover {
    cursor: pointer;
  }
}
.error-msg {
  font-size: 12px;
  color: red;
  display: inline-block;
  margin-left: 5px;
  height:10px;
  animation: rotation 2s infinite linear;
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
