<template>
  <div id="chat-models">
    <div class="header">
      <div class="searchBox">
        <!-- <div class="search-container" @click="isShowSearchModal = true">
          <div class="search-title">{{$t('lang.search_videos')}}</div>
          <input
            class="startSearch"
            type="text"
            :placeholder="$t('lang.search_videos')"
            v-model="searchValue"
            @input="search()"
          />
        </div>-->
        <div class="search-container1">
          <div></div>
          <div class="search-title" v-if="!isShowSearchModal">{{$t('lang.search_videos')}}</div>
          <div :class="'search-content ' + (isShowSearchModal ? 'inputWidth' : '')" style="right: -100%">
            <img src="~@/assets/home/ic-search@3x.png" />
            <input
              class="startSearch"
              type="text"
              :placeholder="$t('lang.search_videos')"
              v-model="searchValue"
              @input="search()"
            />
          </div>
          <img
            src="~@/assets/home/ic-search@3x.png"
            v-if="!isShowSearchModal"
            alt
            @click="isShowSearchModal = true"
          />
        </div>
        <span v-if="isShowSearchModal" class="cancel" @click="cancel()">{{$t('lang.dialog_btn_cancel')}}</span>
      </div>
    </div>
    <div class="myChatSearch" v-if="isShowSearchModal">
      <ChatItem
        @click.native="goDetail(item.uid)"
        :chatItem="item"
        v-for="item in resultArr"
        :key="item.uid"
      />
    </div>
    <div class="chat-container">
      <ChatItem
        @click.native="goDetail(item.uid)"
        :chatItem="item"
        v-for="item in chatList"
        :key="item.uid"
      />
    </div>
    <Footer :active="3" />
  </div>
</template>

<script>
import Footer from '@/components/footer/Index.vue'
import ChatItem from '@/components/chat/Index.vue'
import Search from '@/components/home/Search.vue'
import userApi from '@/api/user.js'
import { returnStatement } from 'babel-types'
export default {
  name: 'information-index',
  components: {
    Footer,
    ChatItem,
    Search
  },
  data () {
    return {
      chatItem: { name: 'bella thorene', id: 3, time: '三小时前' },
      isShowSearchModal: false,
      searchValue: '',
      resultArr: []
    }
  },
  computed: {
    chatList: function () {
      const arr = []
      const aldArr = this.$store.state.user.chat_list
      for (const i in aldArr) {
        const item = aldArr[i]
        if (!this.$store.state.user.banUser.some(it => it === item.uid)) {
          arr.push(item)
        }
      }
      return arr
    }
  },
  // 给新的ws实例添加监听事件
  watch: {
    '$store.state.user.wsReConnect': function () {
      this.$global.ws.onmessage = this.websocketonmessage
    },
    isShowSearchModal: function (show) {
      if (show) {
        setTimeout(() => {
          document
            .querySelector('.search-content')
            .setAttribute('style', 'right: 100px')
        }, 20)
      } else {
        setTimeout(() => {
          document
            .querySelector('.search-content')
            .setAttribute('style', 'right: -100%')
        }, 20)
      }
    }
  },
  mounted () {
    // let actions = { action: "home.get_dialogue_list", body: "" };
    // this.$global.ws.send(JSON.stringify(actions));
    // 异步转同步 hack方法，慎用
    setTimeout(() => {
      this.$global.ws.onmessage = this.websocketonmessage
    }, 20)
    this.getHeight()
  },
  created () {
    this.$store.dispatch('getChatList')
    userApi.getPrivacyBan().then(res1 => {
      if (res1.status === 200) {
        this.$store.commit('SET_BANUSER_LIST', res1.data.buids)
      }
    })
  },
  methods: {
    search () {
      if (this.searchValue == '') {
        this.resultArr = []
        return
      }
      this.resultArr = []
      for (var i = 0; i < this.chatList.length; i++) {
        if (this.chatList[i].nick.indexOf(this.searchValue) >= 0) {
          this.resultArr.push(this.chatList[i])
        }
      }
    },
    cancel () {
      this.isShowSearchModal = false
      this.searchValue = ''
      this.resultArr = []
    },
    currentTime () {
      setInterval(this.formatDate, 500)
    },
    // 客户端接收服务端数据时触发
    websocketonmessage (e) {
      const data = JSON.parse(e.data)
      console.log(data, '--e.data.data')
      if (data.status == 200) {
        if (data.data && data.data.type) {
          if (data.data.type == 'message') {
            this.$store.dispatch('getUnReadMsgNum')
            this.$store.dispatch('getChatList')
          }
        }
      }
    },
    // 前往聊天详情
    goDetail (uid) {
      this.$router.push({
        path: '/ChatDetails',
        query: { id: uid }
      })
    },
    // 获取聊天内容高度
    getHeight () {
      document.querySelector('.chat-container').style.height = window.innerHeight - 98 + 'px'
    }
  }
}
</script>
<style lang="scss" scoped>
.test1 {
  height: 20px;
}
.myChatSearch {
  width: 100%;
  background: #f1f0ef;
  position: absolute;
  z-index: 30;
  overflow-y: auto;
  padding: 0 10px;
}
.cancel {
  margin-left: 15px;
}
#chat-models {
  overflow: hidden;
  .header {
    height: 3rem;
    line-height: 3rem;
    background-color: #f1f0ef;
    .searchBox {
      position: relative;
      display: flex;
      height: 100%;
      align-items: center;
      padding: 0 6vw;
      .search-container,
      .search-container1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .search-container1 {
        flex: 1;
        img {
          widows: 40px;
          height: 40px;
        }
        // &::before {
        //   content: "";
        //   position: absolute;
        //   left: 0;
        //   top: 50%;
        //   transform: translateY(-50%);
        //   width: 2rem;
        //   height: 2rem;
        //   background: url("~@/assets/home/ic-search@3x.png") no-repeat center /
        //     100%;
        // }
      }
      .startSearch input {
        background: none;
      }
      .search-content {
        position: absolute;
        right: -100%;
        display: flex;
        align-items: center;
        img {
          position: absolute;
          width: 35px;
          height: 35px;
        }
      }
      .startSearch {
        flex: 1;
        height: 2.2rem;
        line-height: 2.2rem;
        text-align-last: left;
        padding-left: 8vw;
        background-color: rgba(118, 118, 128, 0.12);
        border-radius: 8px;
        border: none;
        color: #6c757d;
        font-size: 1rem;
      }
      .inputWidth {
        transition: right 0.5s;
      }
      .AZ {
        width: 2rem;
        height: 2rem;
      }
    }
  }
  .chat-container {
    padding: 0 20px;
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>
