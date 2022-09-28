<template>
  <div>
    <div class="notify-page">
      <div class="header">{{$t('lang.all_notice')}}</div>
      <el-tabs ref="tabs" v-model="getNotifiType" style="width: 100vw" @tab-click="changeTab">
        <el-tab-pane
          :label="items.label"
          :name="items.name"
          v-for="items in tabList"
          :key="items.name"
          class="notify-area"
        >
          <div class="notify-main" v-for="(item, index) in notifyData" v-bind:key="index">
            <div class="card-item">
              <div class="card-box">
                <el-image
                  v-if="item.from_idtype != 'system'"
                  class="avatar"
                  fit="cover"
                  :src="userInfoData[item.authorid] ? userInfoData[item.authorid].avatar : '@/assets/my/img-user.jpg'"
                  @click="goUserinfoPage(item)"
                >
                  <div slot="error">
                    <img class="avatar" src="@/assets/my/img-user.jpg" alt srcset />
                  </div>
                </el-image>
                <img
                  v-else
                  class="avatar"
                  src="@/assets/my/img-yolo.png"
                  @click="goUserinfoPage(item)"
                />
                <div class="info" @click="goUserinfoPage(item)">
                  <span class="name">{{ item.form_user_info.nick }}</span>
                  <div class="message">{{ item.content }}</div>
                </div>
                <span class="time">{{ item.the_time }}</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <Footer :active="1" />
  </div>
</template>

<script>
import Footer from '@/components/footer/Index.vue'
import noticeApi from '@/api/notice.js'
import userApi from '@/api/user.js'
import { mapState } from 'vuex'
export default {
  name: 'discover-index',
  data () {
    return {
      getNotifiType: '1',
      currentPage: '1',
      limit: '10',
      userInfoData: {},
      tabList: [
        {
          label: this.$t('lang.all'),
          name: '1'
        },
        {
          label: this.$t('lang.comment'),
          name: '2'
        },
        {
          label: this.$t('lang.mention'),
          name: '3'
        },
        {
          label: this.$t('lang.official'),
          name: '4'
        }
      ],
      notifyData: [
        // {
        //   content: "開始她的訂閱促銷！",
        //   the_time: "3小時前",
        //   img: require("@/assets/notify/pic1.png"),
        //   form_user_info: {
        //     avatar: "",
        //     nick: ""
        //   }
        // }
        // {
        //   name: "🥣Ruby",
        //   message: "在一則評論中提及你",
        //   time: "5分鐘前",
        //   img: require("@/assets/notify/pic2.png")
        // },
        // {
        //   name: "💎Ana Cheri",
        //   message: "訂閱的vip將於3天到期",
        //   time: "5分鐘前",
        //   img: require("@/assets/notify/pic3.png")
        // },
        // {
        //   name: "YoloShow",
        //   message: "統維護時間為2/19 00:00",
        //   time: "10分鐘前",
        //   img: require("@/assets/notify/pic4.png")
        // }
      ]
    }
  },
  computed: {
    ...mapState({
      userInfo: ({ user }) => user.user_info
    })
  },
  created () {
    // 初始化加载
    this.getNotifiData()
  },
  methods: {
    // 切换tab栏目
    changeTab (tab, e) {
      this.getNotifiData(this.getNotifiType, this.currentPage, this.limit)
    },
    // 获取通知数据
    getNotifiData (type = 1, page = 1, limit = 10) {
      noticeApi
        .getNotifi({
          getNotifiType: Number(type),
          currentPage: Number(page),
          limit: Number(limit)
        })
        .then(res => {
          let noticeData = res.data[0]
          const uids = []
          if (noticeData && noticeData.length > 0) {
            noticeData.map(item => {
              uids.push(item.authorid)
            })
          } else {
            noticeData = []
          }
          this.notifyData = noticeData
          const userInfo = {}
          if (uids.length > 0) {
            userApi.getOtherUserInfo(uids).then(res => {
              const userInfoData = res.data
              if (userInfoData && userInfoData.length > 0) {
                userInfoData.map(item2 => {
                  userInfo[item2.uid] = item2
                })
                this.userInfoData = userInfo
              } else {
                this.userInfoData = {}
              }
            })
          }
        })
    },
    // 跳转到用户信息页面
    goUserinfoPage (item) {
      console.log(item, 'item')
      if (item.from_idtype === 'follow') {
        this.$router.push(`/userinfo/${item.authorid}`)
      } else if (item.from_idtype != 'system') {
        const j = JSON.parse(item.note)
        console.log(j, 'j')
        this.$router.push(`/p/${j.tshare}`)
      }

      // if (this.userInfo.uid == uid) {
      //   this.$router.push({ path: "/my" });
      // } else {
      //   this.$router.push(`/userinfo/${uid}`);
      // }
    }
  },
  components: {
    Footer
  }
}
</script>

<style scoped lang="scss">
/deep/.el-tabs__nav {
  width: 100%;
  display: flex;
  background-color: #f1f0ef;
  border-top: 1px solid #abaaaa;
  .el-tabs__item {
    flex: 1;
    color: #f46fe0;
  }
  .el-tabs__active-bar {
    background-color: #f46fe0;
  }
}
.notify-page {
  .header {
    height: 3rem;
    line-height: 3rem;
    background-color: #f1f0ef;
  }
  .notify-area {
    padding-bottom: 50px;
  }
  .notify-main {
    .card-item {
      padding: 0.5rem 1rem;
      .card-box {
        display: flex;
        align-items: center;
        .avatar {
          width: 14vw;
          height: 14vw;
          border-radius: 50%;
          background-color: #eee;
          margin-right: 10px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .info {
          flex: 1;
          text-align: left;
          margin-right: 20px;
          .name {
            font-size: 12px;
          }
          .message {
            font-size: 14px;
          }
        }
        .time {
          float: right;
        }
      }
    }
  }
}
</style>
