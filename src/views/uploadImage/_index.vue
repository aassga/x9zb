<template lang="pug">
  .bg-athens-gray.text-mine-shaft(:style="{height: viewHeight }")
    .p-3.pwa-pt-3.user-block.border-bottom.position-relative
      .d-flex.iphonetop.align-items-center(v-if="hasLogin" @click="$router.push({ name: 'user-password' })")
        img.avatar(:src="profile.avatar" @error="$event.target.src = '/user/account.png'")
        .ml-3.font-weight-bold.fixiphoneX
          .font-size-20.fontcolor {{ profile.username }}
          .d-flex.align-items-start.font-size-14.text-dove-gray
            .position-relative
              img(:src="getSex")
              .confirm(v-if="profile.gender_checked === 1")
                img(src="../../assets/user/icAcConfirm.png")
            img.ml-2(src="/user/level.svg")
            span.ml-2 {{ `${profile.level.grouptitle.slice(6)} 级` }}
            img.ml-2(:src="getVipIcon")
            span.ml-2(v-if="isVIP") {{ expire }}
        .arrowview
          img(src="../../assets/user/icAcNext.png")

      .d-flex.iphonetop(v-else)
        img(src="/user/default.png")
        .ml-3.textheight
          .top 开启一段新的旅程
          .bottom(@click="gotoLoginView") 登陆 / 注册

    .user-block.border-bottom(v-if="hasLogin")
      .p-3.title.font-weight-bold 我的圈子
      div
        el-row.py-3.px-3
          el-col.text-center(
            v-for="row,index in mygroups" :key="index"
            :span="6"
            tag="a"
            @click.native="myGroupsAction(index)"
          )
            p.mygroupnumber {{ getMyRelaction(index) }}
            p.content {{ row }}

    img.d-block.w-100(v-if="hasLogin" :src="entranceImage" @click="$router.push({ name: 'propaganda' })")
    .user-block.border-bottom
      .p-3.title.font-weight-bold 小游戏
      div(v-if="apps !== null")
        el-row.py-3.px-3(v-for="row in Math.ceil(apps.length / 4)" :key="row")
          el-col.text-center(
            v-for="app, index in apps.slice((row - 1 ) * 4, row * 4)"
            :key="index"
            :span="6"
            tag="a"
          )
            img.app(:src="getImgUrl(app.pic)" @click="clickapp(app)")
            p {{ app.app_name }}

    .user-block
      .p-3.title.font-weight-bold 工具箱
      div
        el-row.py-3.px-3
          el-col.text-center(
            v-for="row,index in tools" :key="index"
            :span="6"
            tag="a"
            @click.native="toolsAction(index)"
          )
            .mytoolsicon
              img(:src="`/user/tool/${row.icon}.png`")
            p.content(:class="row.class") {{ row.name }}

    .user-block.logoutview(v-if="hasLogin" @click="logout")
      p 退出登录

    ad
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import VIEWMODEL from '../../plugins/viewModel/vmStatic'
import { isMillion } from '@/plugins/universal'
import Ad from '~/components/Ad'
export default {
  layout: 'info',
  components: { Ad },
  data () {
    return {
      viewHeight: 0,
      loading: false,
      tools: [
        { name: '礼品兑换', icon: 'icPay' },
        // { name: '任务中心', icon: 'icTask' },
        { name: '积分记录', icon: 'icCard' },
        { name: '客服小秘', icon: 'icService' },
        { name: '分享赚钱', icon: 'task', class: 'text-carnation' }
      ],
      mygroups: ['好友', '关注', '粉丝', '群']
    }
  },
  computed: {
    getSex () {
      switch (this.profile.gender) {
        case 1:
          return require('../../assets/user/icAcM.png')
        case 2:
          return require('../../assets/user/icAcW.png')
        default:
          return require('../../assets/user/icAcNoGender.png')
      }
    },
    getVipIcon () {
      if (this.isVIP) return require('../../assets/user/icAcVip.png')
      return require('../../assets/user/icAcVipN.png')
    },
    expire () {
      if (!this.hasLogin || !this.profile.group || !this.profile.group.length) { return }
      const { expire, groupid } = this.profile.group.find(({ is_main }) => is_main)
      return (expire && groupid === 51) ? new Date(expire * 1000).toLocaleDateString() : 0
    },
    ...mapState({
      profile: ({ user }) => user.profile,
      apps: ({ user }) => user.application,
      fanList: ({ user }) => user.fanList,
      attentionList: ({ user }) => user.attentionList,
      publicgroup: ({ user }) => user.publicgroup,
      entranceImage: ({ propaganda }) => propaganda.entranceImage
    }),
    ...mapGetters('user', ['hasLogin', 'isVIP'])
  },
  async created () {
    if (localStorage.getItem('token')) {
      await this.$store.dispatch('user/profile')
      this.getEntranceImage()
    }
  },
  mounted () {
    // footer selected
    this.setSelectedIndexState(4)
    if (window.imAndroid) {
      this.viewHeight = '100%'
    } else {
      this.viewHeight = window.frames.innerHeight - 44 + 'px'
    }

    this.getApplication()
    window.refreshProfile = this.imRefresh
    window.toEditProfile = this.toEditProfile
  },
  methods: {
    async imRefresh () {
      if (localStorage.getItem('token')) {
        await this.$axios.$delete('v1/member/profile')
      }
      await this.refresh()
    },
    sortFriend (first, sec) {
      // fan & attention sam uid == friend
      const sameData = []
      first.forEach((fan) => {
        sec.forEach((att) => {
          if (fan === att) {
            sameData.push(att)
          }
        })
      })
      const filterdata = sameData.filter((el, i, arr) => {
        return arr.indexOf(el) === i
      })

      return isMillion(filterdata.length) || 0
    },
    sortFan (first, sec) {
      const temp = []
      const tempArray = []
      sec.forEach((val) => {
        temp[val] = true
      })
      first.forEach((val) => {
        if (!temp[val]) {
          tempArray.push(val)
        }
      })
      return isMillion(tempArray.length) || 0
    },
    toEditProfile () {
      this.$router.push({ name: 'user-password' })
    },
    myGroupsAction (index) {
      if (this.$isApp()) {
        this.$app('toPersonalData', index)
      } else {
        this.$toast.center('请下载安卓版杏吧App')
        this.$router.push({ name: 'makefriends' })
      }
    },
    toolsAction (index) {
      switch (index) {
        case 0: {
          const token = localStorage.getItem('token')
          if (!token) {
            this.$toast.center('登入后才可以兑换喔!')
            this.$router.push({ name: 'login' })
          } else if (this.$isApp()) {
            const url = location.origin + '/exchange'
            this.$app('openPage', url)
          } else {
            this.$router.push({ name: 'exchange' })
          }

          break
        }
        case 1:
          if (this.$isApp()) {
            this.$app('openPage', location.origin + '/propaganda/record')
          } else {
            this.$router.push({ name: 'propaganda-record' })
          }
          break
        case 2:
          if (this.$isApp()) {
            this.$app('openPage', 'https://tawk.to/sex8')
          } else {
            window.open('https://tawk.to/sex8')
          }
          break
        case 3: {
          const token = localStorage.getItem('token')
          if (!token) {
            this.$toast.center('请先登入!')
            this.$router.push({ name: 'login' })
          } else if (this.$isApp()) {
            this.$app('openPage', '/propaganda')
          } else {
            this.$router.push({ name: 'propaganda' })
          }
          break
        }
        default:
          break
      }
    },
    getMyRelaction (index) {
      switch (index) {
        case 0:
          return this.sortFriend(this.fanList.models, this.attentionList.models)
        case 1:
          return this.sortFan(this.attentionList.models, this.fanList.models)

        case 2:
          return this.sortFan(this.fanList.models, this.attentionList.models)

        case 3:
          return this.publicgroup
        default:
          break
      }
    },
    async logout () {
      try {
        await this.$store.dispatch('user/logout')
      } catch {}
    },
    gotoLoginView () {
      this.$router.push({ name: 'login' })
    },
    getImgUrl (url) {
      return VIEWMODEL.getADZimgURL(url, 42)
    },
    clickapp (val) {
      const openType = parseInt(val.open_type)
      let url = val.open_url
      switch (openType) {
        case 1: {
          if (this.$device.isAndroid) {
            url = val.android_url
          } else {
            url = val.ios_url
          }
          break
        }
        default:
          break
      }
      if (this.$isApp()) {
        this.$app('openBrowser', url)
      } else if (/^http|https?:\/\//.test(url)) {
        window.open(url, '_blank')
      } else this.$router.push(url)
    },
    ...mapActions({
      setSelectedIndexState: 'footer/setSelectedIndex',
      getApplication: 'user/getApplication',
      refresh: 'user/profile',
      getEntranceImage: 'propaganda/getEntranceImage'
    })
  }
}
</script>

<style lang="scss" scoped>
img {
  &.avatar {
    width: 60px;
    height: 60px;
    border-radius: 30px;
    object-fit: cover;
  }
  &.app {
    width: 42px;
  }
}
.logoutview {
  margin-top: 60px;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0px;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  font-size: 15px;
  color: #5b5b5b;
}
.fixiphoneX {
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .fontcolor {
    color: #222222;
  }
  .confirm {
    position: absolute;
    width: 14px;
    height: 14px;
    right: -4px;
    bottom: 0;
  }
}
.user-block {
  .title {
    font-size: 1.1rem;
    color: #5b5b5b;
  }
  .mygroupnumber {
    font-size: 17px;
  }
  .content {
    font-size: 12px;
  }
  .mytoolsicon {
    height: 30px;
    margin-bottom: 7.5px;

    img {
      max-height: 30px;
    }
  }
}
.iphonetop {
  height: 60px;
  height: calc(60px + constant(safe-area-inset-top));
  height: calc(60px + env(safe-area-inset-top));
  box-sizing: content-box;
  align-items: flex-end;

  .arrowview {
    position: absolute;
    right: 18px;
  }
}
.textheight {
  height: 60px;
  .top {
    font-size: 14.5px;
    letter-spacing: -0.2px;
    color: #222222;
  }
  .bottom {
    border: 1px solid #222222;
    border-radius: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0px;
    color: #000000;
    margin-top: 9px;
  }
}

.bg-athens-gray {
  overflow-x: scroll;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.bg-athens-gray::-webkit-scrollbar {
  display: none;
  width: 0px !important;
  height: 0px !important;
  background: transparent;
  -webkit-appearance: none;
}
.text-mine-shaft {
  color: #222;
}
.text-dove-gray {
  color: #6b6b6b;
}
.text-carnation {
  color: #fc5b5b;
}
</style>
