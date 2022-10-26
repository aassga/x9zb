<template>
  <div
    class="chat-window"
    :style="{ height: reversedHeight + 'px' }"
    @click="clearStatus()"
  >
    <div v-if="false" class="animation-loading-container">
      <div class="animation-loading" v-for="i in 4" :key="i" />
    </div>

    <div class="chat-detail-main" ref="content-list">
      <div
        v-for="(item, index) in msgList"
        :key="index"
        :class="{ 'is-anchor': tabNumber === 2 }"
      >
        <template>
          <div
            v-if="
              !item.channel ||
              item.channel === channel ||
              (!channel && item.channel === '000') ||
              item.channel === 'null'
            "
            class="other-side"
          >
            <div class="msg-box">
              <div class="msg-container">
                <div
                  class="msg-content"
                  :class="{
                    'my-self':
                      (Number(item.sender) === parmUserInfo.user_id ||
                        item.sender === parmUserInfo.user_id ||
                        item.sender === Number(parmUserInfo.user_id) ||
                        item.sender_nickname === parmUserInfo.username) &&
                      tabNumber === 2,
                  }"
                >
                  <template v-if="tabNumber === 0">
                    <img
                      :src="hiImg"
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
                    v-if="tabNumber !== 2"
                    class="text-name"
                    :style="
                      item.text.includes('进入直播间') ? 'color: #575757;' : ''
                    "
                  >
                    <template v-if="item.sender_nickname !== undefined">
                      <span>
                        {{
                          !item.text.includes("进入直播间") &&
                          item.sender_nickname.length > 5
                            ? item.sender_nickname.substr(0, 6) + "..."
                            : item.sender_nickname
                        }}
                      </span>
                    </template>
                    <template v-else>
                      <span>
                        {{
                          !item.text.includes("进入直播间") &&
                          item.sender.length > 5
                            ? "遊客" + item.sender.substr(0, 4) + "..."
                            : "遊客" + item.sender
                        }}
                      </span>
                    </template>
                    <span v-if="!item.text.includes('进入直播间')">:</span>
                  </div>
                  <div
                    v-if="tabNumber === 2 && !mySelf(item)"
                    class="msg-avatar"
                  >
                    <img class="avatar" :src="avatarImg(item)" />
                  </div>
                  <template v-if="item.pic && !item.text">
                    <el-image
                      :preview-src-list="[item.pic]"
                      fit="cover"
                      :src="item.pic"
                      class="pic-info"
                    />
                  </template>
                  <template v-if="item.pic && item.text">
                    <div
                      class="thumb-container"
                      @click.stop="openLink(item.link)"
                    >
                      <img class="thumb-pic" :src="item.pic" />
                      <div class="thumb-title">{{ item.title }}</div>
                      <br />
                      <div class="thumb-text">{{ item.text }}</div>
                    </div>
                  </template>
                  <div
                    v-if="!item.pic && item.text"
                    @click.stop="showControl(index, item)"
                    :style="tabNumber === 2 ? 'display: contents' : ''"
                  >
                    <div class="login-content" v-if="item.msg_type == '4'">
                      {{ item.text }}
                      <img
                        class="b-play-btn"
                        :src="require('../assets/images/play.png')"
                        @click="play(item)"
                      />
                    </div>
                    <div
                      v-else
                      class="text-info"
                      :class="{ 'is-login': item.msg_type == '4' }"
                      :style="
                        item.text.includes('进入直播间')
                          ? 'color: #575757;'
                          : tabNumber !== 2
                          ? 'width: 170px;'
                          : ''
                      "
                    >
                      <span v-html="getText(item.text)"></span>
                      <i
                        v-if="item.isError && [0, 1].includes(tabNumber)"
                        class="el-icon-loading"
                        @click="resend(item)"
                      ></i>
                    </div>
                    <i
                      v-if="item.isError && tabNumber === 2"
                      class="el-icon-loading"
                      @click="resend(item)"
                    ></i>
                  </div>
                  <div v-if="controlIndex === index" class="msg-control other">
                    <div @click="copyText(item)">
                      复制
                      <i />
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
import VueMarkdown from "vue-markdown";
export default {
  name: "ChatMessageNews",
  components: {
    VueMarkdown,
  },
  props: {
    msgList: {
      type: Array,
    },
    chatMsgHight: {
      type: Number,
    },
    parmUserInfo: {
      type: Object,
    },
    controlIndex: {
      type: Number,
    },
    tabNumber: {
      type: Number,
    },
    pinInfo: {
      type: null,
    },
    roomInfo: {
      type: null,
    },
    channel: {
      type: null,
    },
  },
  created() {
    this.uid = this.$route.query.id;
  },
  computed: {
    reversedHeight: function () {
      if (this.roomInfo.name !== undefined) {
        return this.chatMsgHight - 40;
      } else {
        return this.chatMsgHight;
      }
    },
  },
  data() {
    return {
      linkAttrs: {
        target: "_blank",
        class: "linkified",
      },
      uid: "",
      showBottom: false,
      hiImg: require("./../assets/images/HiTag.png"),
    };
  },

  filters: {
    picFilter(url) {
      console.log(url);
      return url;
      // if (url.includes("base64")) {
      //   let split = window.location.origin + "/";
      //   newUrl = newUrl.replace(split, "");
      // } else {
      //   return newUrl;
      // }
    },
  },
  methods: {
    play(item) {
      this.$store
        .dispatch("gettoburl", {
          terminal: "pc",
          share: item.sender,
        })
        .then((res) => {
          if (res.data.length > 0) {
            const url = res.data[0];
            let newTab = window.open("about:blank");
            newTab.location.href = url;
          }
        });
    },
    avatarImg(item) {
      if (item.avatar === "") {
        return require("@/assets/images/userLogo.png");
      } else {
        return item.avatar;
      }
    },
    mySelf(item) {
      if (
        Number(item.sender) === this.parmUserInfo.user_id ||
        item.sender === this.parmUserInfo.user_id ||
        item.sender === Number(this.parmUserInfo.user_id) ||
        item.sender_nickname === this.parmUserInfo.username 
      ) {
        return true;
      } else {
        return false;
      }
    },
    clearStatus() {
      this.$emit("controlNumber", -1);
    },
    // 聊天框滚动到最底部
    openLink(link) {
      window.open(link);
    },
    showControl(index, item) {
      if (item.msg_type == "4") {
        return;
      }
      if (this.controlIndex == index) {
        this.controlIndex = -1;
        return;
      }
      this.$emit("controlNumber", index);
      // this.controlIndex = index;
    },
    getText(str) {
      if (!str) {
        return;
      }
      var reg = /(https?:\/\/[^\s]+)/g;
      str = str.replace(
        reg,
        "<a style='text-decoration:underline;color:blue' target='_blank' href='$1'>$1</a>"
      );
      // str = str.replace(/\r\n/g, "<br>");
      // str = str.replace(/\n/g, "<br>");
      // str = str.replace(/\r/g, "<br>");
      return str;
    },
    resend(item) {
      this.$emit("msgAction", item);
    },
    copyText(item) {
      const str = item.text;
      const qrUrlContent = document.getElementById("cp-input");
      qrUrlContent.value = str;
      qrUrlContent.select();
      let range = document.createRange();
      let selection = document.getSelection();
      range.selectNode(qrUrlContent);
      selection.addRange(range);
      qrUrlContent.setSelectionRange(0, qrUrlContent.value.length);
      let isSucess = document.execCommand("copy");
      if (isSucess) {
        this.$alert("复制成功", "提示");
        this.tipsId = "";
      }
    },
    // 聊天框滚动到最底部
    toBottom() {
      let box = document.getElementsByClassName("chat-window")[0];
      this.$nextTick(() => (box.scrollTop = box.scrollHeight));
    },
  },
};
</script>

<style lang="scss" scoped>
@-webkit-keyframes pulse {
  0% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.2);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.2);
  }
  0% {
    transform: scale(1);
  }
}
.login-content {
  max-width: 170px;
}
.b-play-btn {
  animation: pulse 2s ease infinite;
  width: 80px;
  height: auto;
  &:hover {
    cursor: pointer;
  }
}
::v-deep.chat-detail-main {
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
    font-size: 12px;
    padding: 4px 0;
    word-break: break-all;
    color: #343a40;
    display: flex;
    .hi-tag {
      display: inline-block;
      height: 18px;
      margin-right: 4px;
      margin-bottom: 2px;
    }
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
      display: flex;
      color: rgb(0 0 0 / 80%);
      .linkified {
        color: blue;
        text-decoration: underline;
        cursor: pointer;
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
    .el-icon-loading {
      display: flex !important;
      align-items: center;
      margin: 0 3px;
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
      .el-icon-loading {
        display: flex !important;
        align-items: center;
        margin: 0 3px;
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
        padding: 8px;
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
.mt0 {
  margin-top: 0;
}
.el-image {
  height: 8em;
}
</style>