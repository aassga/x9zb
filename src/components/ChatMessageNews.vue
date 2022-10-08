<template>
  <div
    class="chat-window"

    :style="{'height':reversedHeight + 'px'}"
    @click="clearStatus()"
  >
    <div v-if="false" class="animation-loading-container">
      <div class="animation-loading" v-for="i in 4" :key="i" />
    </div>

    <div class="chat-detail-main" ref="content-list">
      <div v-for="(item, index) in msgList" :key="index">
        <!--   <div class="system-tips" v-if="item.action === 'system'">
                {{item.text}}
              </div>-->
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
                  :style="
                    item.text === '进入直播间' || item.text.includes('进入直播间')
                      ? 'justify-content: center;'
                      : ''
                  "
                >
                  <!-- <span class="level-1">Lv1</span> -->
                  <div
                    class="text-name"
                    :style="
                      item.text === '进入直播间' ||
                      item.text.includes('进入直播间')
                        ? 'color: rgba(0 0 0 / 20%);'
                        : ''
                    "
                  >
                    {{ item.sender_nickname }}
                    <span
                      v-if="
                        item.text !== '进入直播间' &&
                        !item.text.includes('进入直播间')
                      "
                      >:</span
                    >
                  </div>
                  <template v-if="item.pic && !item.text">
                    <el-image
                      :preview-src-list="[item.pic]"
                      fit="cover"
                      :src="item.pic | picFilter"
                      class="pic-info"
                    />
                  </template>
                  <template v-if="item.pic && item.text">
                    <div
                      class="thumb-container"
                      @click.stop="openLink(item.link)"
                    >
                      <img class="thumb-pic" :src="item.pic | picFilter" />
                      <div class="thumb-title">{{ item.title }}</div>
                      <br />
                      <div class="thumb-text">{{ item.text }}</div>
                    </div>
                  </template>
                  <div
                    class="text-info"
                    :style="
                      item.text === '进入直播间' ||
                      item.text.includes('进入直播间')
                        ? 'color: rgba(0 0 0 / 20%);'
                        : 'width: 180px;'
                    "
                    v-else
                    v-html="getText(item.text)"
                    @click.stop="showControl(index)"
                  ></div>
                  <i
                    class="el-icon-warning error-msg"
                    v-if="item.isError"
                    @click="resend(item)"
                  >重新发送</i>
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
export default {
  name: "ChatMessageNews",
  props: {
    msgList: {
      type: Array,
    },
    chatMsgHight:{
      type:Number,
    },
    controlIndex:{
      type:Number,
    },
    ctp:{
      type:Number,
    },
    pinInfo:{
      type:null
    },
    roomInfo:{
      type:null
    }
  },
  computed:{
    reversedHeight: function() {
      if(this.roomInfo.name !==undefined){
        return this.chatMsgHight - 40
      }else{
        return this.chatMsgHight
      }
    },

  },
  data() {
    return {
    }
  },
  filters: {
    picFilter(url) {
      let newUrl = url;
      if (url.includes("base64")) {
        let split = window.location.hostname.includes("10")
          ? window.location.origin + '/' 
          // ? "http://huyapre.oxldkm.com/"
          // ? "http://huyapretest.oxldkm.com/"
          // ? "https://www.x9zb.live/"
          : window.location.origin + "/";
        newUrl = newUrl.replace(split, "");
      } else {
        return newUrl;
      }
    },
  },
  methods: {
    clearStatus() {
      this.$emit('controlNumber',-1)
    },
    // 聊天框滚动到最底部
    openLink(link) {
      window.open(link);
    },
    showControl(index) {
      if (this.controlIndex == index) {
        this.controlIndex = -1;
        return;
      }
      this.$emit('controlNumber',index)
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
      str = str.replace(/\r\n/g, "<br>");
      str = str.replace(/\n/g, "<br>");
      str = str.replace(/\r/g, "<br>");
      return str;
    },
    resend(item) {
      this.$emit('msgAction',item)
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
  },
};
</script>

<style lang="scss" scoped>
.chat-detail-main {
  background: #f3f3f3;
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
.mt0{
  margin-top: 0;
}
.el-image{
  height: 8em;
}
</style>