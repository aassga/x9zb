<template lang="pug">
  .text-mine-shaft(v-loading.fullscreen="loading")
    .topview
      img.bg(:src="profile.avatar" @error="$event.target.src = '/user/bgAcd4.png'")
      img.left(src="~/assets/user/icBack.png" @click="backbtnact")
      label(for="cheese")
        img.right(src="~/assets/user/icMore.png")
      input(id="cheese" type="file" style="display:none" accept='image/*' name="file" @change="fileChange($event)" @focus="focus" @blur="blur")
      .bottomleft
        img(:src="getSex")
        .confirm(v-if="profile.gender_checked === 1")
          img(src='../../assets/user/icAcConfirm.png')
      .bottomright
        img(:src="getVipIcon")
    .scrollview
      .flex-between.p-4.bottomborder(@click="clickEditAction(0)")
        span 昵称
        .middleview
          .content {{profile.username}}
        img(v-if="profile.change_account !== 1" src="~/assets/user/icAcEditNickname.png")
      .flex-between.p-4.bottomborder(@click="clickEditAction(1)")
        span 出生日期
        .middleview
          .content {{birthday}}
        img(src="~/assets/user/icAcEditDate.png")
      .flex-between.p-4.bottomborder(@click="clickEditAction(2)")
        span 性别
        .middleview
          .sexicon
            img(:src="getSex")
            .confirm(v-if="profile.gender_checked === 1")
              img( src='../../assets/user/icAcConfirm.png')
        img( v-if="profile.change_gender !== 1" src="~/assets/user/icAcEditGender.png")
      .flex-between.p-4.bottomborder(@click="clickEditAction(3)")
        span 修改密码
        img(src="~/assets/user/icAcNextSmall.png")
      .bottomnotice.align-items-center.d-flex.flex-column
        .top 必须修改头像、昵称、性别后才能加入聊天
        .bottom 昵称与性别，提交一次后就不能修改
    mt-datetime-picker(ref="picker" type="date" :startDate="new Date('1970')" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" v-model="pickerDate" @confirm="handleDatePickerConfirm")
    mt-actionsheet(:actions="sheetArray" v-model="sheetVisible")
    el-dialog(:visible.sync="dialogVisible" width="100%")
      .editnameview.align-content-center.d-flex.flex-column.justify-content-around
        .notice 支持中英文, 数字
        .top.align-items-center.d-flex.justify-content-between
          el-input(ref="inputRef" v-model="editusername" placeholder="请输入用户名" @focus="focus" @blur="blur")
        .bottombutton.align-items-center.d-flex.justify-content-around
          .left.button.align-items-center.d-flex.justify-content-center(:style="{color: '#2a90d7'}" @click="dialogVisible=false") 取消
          .right.button.align-items-center.d-flex.justify-content-center(:style="{color: editusername.length > 0 ? '#2a90d7' : '#bebebe'}" @click="edituser") 确定

</template>

<script>
import Vue from 'vue'
import { mapState, mapActions, mapGetters } from 'vuex'
import { DatetimePicker, Actionsheet } from 'mint-ui'
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Actionsheet.name, Actionsheet)
export default {
  middleware: 'login',
  data () {
    return {
      loading: false,
      dialogVisible: false,
      preview: null,
      image: null,
      pickerDate: '',
      editusername: '',
      birthday: '-',
      sheetVisible: false,
      sheetArray: [
        { name: this.$t('lang.male'), method: this.sexBoy },
        { name: this.$t('lang.female'), method: this.sexGirl }
      ]
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
      const { expire } = this.profile.group.find(({ is_main }) => is_main)
      return expire ? new Date(expire * 1000).toLocaleDateString() : 0
    },
    ...mapState('user', ['profile']),
    ...mapGetters('user', ['hasLogin', 'isVIP'])
  },
  watch: {
    profile (data) {
      if (this.$isApp()) {
        this.$app('updatePersonalData', JSON.stringify(data))
      }
    }
  },
  beforeDestroy () {
    this.loading = false
  },
  async mounted () {
    if (this.$isApp()) {
      await this.$store.dispatch('user/profile')
    }
    this.birthday = this.profile.birthday || '-'
    this.getBirthday()
    this.showNotice()
    window.refreshProfile = this.refreshProfile
  },
  methods: {
    ...mapActions({
      setEditIndex: 'user/setEditIndex',
      setUploadPic: 'user/setUploadPic',
      editProfile: 'user/editProfile',
      editUserName: 'user/editUserName',
      setIsFocus: 'index/setIsFocus',
      refresh: 'user/profile'
    }),
    backbtnact () {
      if (this.$isApp()) {
        this.$app('closePage')
      } else {
        this.$router.push({ name: 'user' })
      }
    },
    async refreshProfile () {
      await this.$axios.$delete('v1/member/profile')
      this.showNotice()
    },
    showNotice () {
      // 必须修改头像、昵称、性别后才能加入聊天
      const left = '为了让更多朋友认识你，请修改'
      let middle = ''
      const right = '。'
      const isUserName = this.profile.change_account
      const isSex = this.profile.change_gender
      const isPic = this.profile.change_avatar
      if (isUserName === 1 && isSex === 1 && isPic === 1) return
      if (isUserName === 0 && isSex === 0 && isPic === 0) {
        middle = '头像、昵称、性别'
      } else if (isPic === 0) {
        if (isUserName === 0) {
          middle = '头像、昵称'
        } else if (isSex === 0) {
          middle = '头像、性别'
        } else {
          middle = '头像'
        }
      } else if (isUserName === 0) {
        if (isSex === 0) {
          middle = '昵称、性别'
        } else {
          middle = '昵称'
        }
      } else if (isSex === 0) {
        middle = '性别'
      }
      this.$toast.center(left + middle + right, {
        duration: 4500,
        type: 'center'
      })
    },
    async sexBoy () {
      this.loading = true
      const json = { gender: 1 }
      const bool = await this.editProfile(json)
      this.loading = false
      if (!bool) return
      this.toastSuccess()
    },
    async sexGirl () {
      this.loading = true
      const json = { gender: 2 }
      const bool = await this.editProfile(json)
      this.loading = false
      if (!bool) return
      this.toastSuccess()
    },
    async edituser () {
      if (this.editusername.length !== 0) {
        this.dialogVisible = false
        const defaultName = this.editusername.slice(0, 3)
        if (this.hasSpecialStr() || !this.WidthCheck(15)) {
          this.$toast.center('最多15字符 (1个中文为2字符)')
          return
        } else if (
          defaultName.toLowerCase().includes('xb') ||
          defaultName.toLowerCase().includes('sin')
        ) {
          this.$toast.center('内含有非法字元')
          return
        }
        this.loading = true
        const json = { username: this.editusername }
        const bool = await this.editUserName(json)
        this.loading = false
        if (!bool) return
        if (this.$isApp()) {
          this.$app('updateAccount', this.editusername)
        }
        this.toastSuccess()
      }
    },
    async handleDatePickerConfirm (val) {
      if (this.checkOver18(val)) {
        this.loading = true
        this.pickerDate = new Date(this.formatDate(val))
        const json = { birthday: this.formatDate(val) }
        const bool = await this.editProfile(json)
        this.loading = false
        if (!bool) return
        this.birthday = this.formatDate(val)
        this.toastSuccess()
      } else {
        this.$toast.center('本产品禁止未满18岁使用')
      }
    },
    toastSuccess () {
      this.$toast.center('修改成功')
    },
    formatDate (secs) {
      const t = new Date(secs)
      const year = t.getFullYear()
      let month = t.getMonth() + 1
      if (month < 10) month = '0' + month
      let date = t.getDate()
      if (date < 10) date = '0' + date
      return year + '-' + month + '-' + date
    },
    checkOver18 (secs) {
      const t = new Date(secs)
      const now = new Date()
      const yearDiff = now.getFullYear() - t.getFullYear()

      if (yearDiff < 18) {
        return false
      } else if (yearDiff === 18) {
        if (now.getMonth() + 1 - (t.getMonth() + 1) < 0) {
          return false
        } else if (now.getMonth() + 1 - (t.getMonth() + 1) === 0) {
          if (now.getDate() - t.getDate() < 0) {
            return false
          } else {
            return true
          }
        }
      } else {
        return true
      }
    },
    focus () {
      this.setIsFocus(true)
    },
    blur () {
      setTimeout(() => {
        this.setIsFocus(false)
      }, 300)
    },
    clickEditAction (index) {
      this.setEditIndex(index)
      switch (index) {
        case 0: {
          if (this.profile.change_account === 1) return
          this.editusername = this.profile.username
          this.dialogVisible = true
          this.$nextTick(() => {
            this.$refs.inputRef.focus()
          })
          break
        }
        case 1: {
          this.$nextTick(() => {
            this.$refs.picker.open()
          })
          break
        }
        case 2: {
          if (this.profile.change_gender === 1) return
          this.sheetVisible = true
          break
        }
        case 3:
          this.$router.push({ name: 'user-update' })
          break
      }
    },
    fileChange (event) {
      this.loading = true
      const input = event.target
      const reader = new FileReader()
      this.image = input.files[0]
      const picname = input.files[0].name
      const pictype = input.files[0].type
      reader.readAsDataURL(input.files[0])
      reader.onload = (e) => {
        this.preview = e.target.result
        this.setUploadPic({
          img: this.image,
          preview: this.preview,
          name: picname,
          type: pictype
        })
        this.$router.push({ name: 'user-uploadpic' })
      }
    },
    WidthCheck (n) {
      let w = 0
      for (let i = 0; i < this.editusername.length; i++) {
        const c = this.editusername.charCodeAt(i)
        // 单字节加1
        // eslint-disable-next-line unicorn/number-literal-case
        if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
          w++
        } else {
          w += 2
        }
      }

      if (w > n) {
        return false
      }
      return true
    },
    hasSpecialStr () {
      const specialChars =
        '~·`!！@#$￥%^…&*()（）—-_=+[]{}【】、|\\;:；：\'"“‘,./<>《》?？，。'
      const len = specialChars.length
      for (let i = 0; i < len; i++) {
        if (this.editusername.includes(specialChars.substring(i, i + 1))) {
          return true
        }
      }
      return false
    },
    getBirthday () {
      if (this.birthday !== '-') {
        // set js date format to get true Date
        const birthAry = this.profile.birthday.split('-')
        const year = birthAry[0]
        let month = birthAry[1]
        let day = birthAry[2]
        birthAry.forEach((val, index) => {
          switch (index) {
            case 1: {
              if (val.length < 2) {
                month = '0' + val
              }
              break
            }
            case 2: {
              if (val.length < 2) {
                day = '0' + val
              }
              break
            }
            default:
              break
          }
        })
        const formatDate = year + '-' + month + '-' + day
        this.pickerDate = new Date(formatDate).toISOString()
      } else {
        this.pickerDate = new Date()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.editnameview {
  height: 70px;
  background-color: #f8f8f8;
  border-radius: 12px;
  height: 150px;
  margin: 0px 8.5px;
  .bottombutton {
    height: 30px;
    width: 100%;
    border-top: 1px solid #e8e8e8;
    flex: 1;
    .left {
      flex: 1;
      height: 100%;
      border-right: 1px solid #e8e8e8;
    }
    .right {
      flex: 1;
    }
  }

  .top {
    flex: 1;
    .button {
      width: 64.5px;
      height: 80%;
      color: white;
      border-radius: 4.5px;
    }
  }
  .notice {
    font-size: 15px;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.bg-carnation {
  background-color: #f85959;
}
.text-mine-shaft {
  color: #222;
}
.bottomnotice {
  color: #fe373c;
  font-size: 13.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.7rem 0px;
  .top {
    margin-bottom: 10px;
  }
}
.topview {
  width: 100%;
  padding-bottom: 75%;
  height: 0;
  position: relative;
  img {
    object-fit: cover;
  }
  .bg {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .left {
    position: absolute;
    left: 15px;
    top: 18px;
  }
  .right {
    position: absolute;
    right: 10px;
    top: 18px;
  }
  .bottomleft {
    position: absolute;
    left: 15px;
    bottom: 10px;
    width: 22px;
    height: 22px;
    .confirm {
      position: absolute;
      width: 14px;
      height: 14px;
      right: -4px;
      bottom: 0;
    }
  }
  .bottomright {
    position: absolute;
    left: 50px;
    bottom: 10px;
    width: 22px;
    height: 22px;
  }
}
.scrollview {
  height: calc(100vh - 75vw);
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scrollview::-webkit-scrollbar {
  display: none;
  width: 0px !important;
  height: 0px !important;
  background: transparent;
  -webkit-appearance: none;
}
.bottomborder {
  border-bottom: 1px solid #d9d9d9;
  font-size: 15px;
  color: #5b5b5b;
  span {
    min-width: 60px;
  }
  .middleview {
    flex: 1;
    padding: 0px 2rem;
  }
  .content {
    font-size: 13px;
    color: #9e9e9e;
  }
  .sexicon {
    width: 22px;
    height: 22px;
    position: relative;
    .confirm {
      position: absolute;
      width: 14px;
      height: 14px;
      right: -4px;
      bottom: 0;
    }
  }
}

::v-deep {
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: unset;
    position: absolute;
    bottom: 0;
    width: 90%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .el-input {
    width: 100%;
    flex: 1;
    margin-bottom: 8px;
    padding: 0px 8.5px;
  }
  .picker-items {
    width: 100%;
  }
  .mint-actionsheet {
    bottom: 25px;
    width: 95%;
    background: transparent;
  }
  .mint-actionsheet-list {
    margin-bottom: 8px;
    font-size: 20px;
    color: #007aff;
    background-color: #fff;
    border-radius: 12px;
  }
  .mint-actionsheet-listitem {
    color: unset;
    font-size: unset;
    background-color: unset;
    border-radius: 12px;
  }
  .mint-actionsheet-button {
    border-radius: 12px;
    color: #007aff;
    font-size: 20px;
  }
}
</style>
