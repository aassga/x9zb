<template lang="pug">
.test
    span.instagram
        input.upload-input(id="cheese" type="file" style="opactiy:0" accept='image/*' name="file" @change="fileChange($event)" @focus="$emit('focus')" @blur="$emit('blur')")

</template>

<script>
import Vue from 'vue'
import { mapState, mapActions, mapGetters } from 'vuex'
import { DatetimePicker, Actionsheet } from 'mint-ui'

export default {
  // middleware: 'login',
  name: 'UpLoadImg',
  data () {
    return {
      loading: false,
      dialogVisible: false,
      preview: null,
      image: null,
      pickerDate: '',
      editbasename: '',
      birthday: '-',
      sheetVisible: false,
      sheetArray: [
        { name: this.$t('lang.male'), method: this.sexBoy },
        { name: this.$t('lang.female'), method: this.sexGirl }
      ]
    }
  },
  computed: {
    ...mapState('base', ['profile']),
    ...mapGetters('base', ['hasLogin', 'isVIP'])

  },
  watch: {
    // profile(data) {
    //   if (this.$isApp()) {
    //     this.$app('updatePersonalData', JSON.stringify(data))
    //   }
    // }
  },
  beforeDestroy () {
    this.loading = false
  },

  mounted () {
    // if (this.$isApp()) {
    //   await this.$store.dispatch('base/profile')
    // }
    // this.birthday = this.profile.birthday || '-'
    // this.getBirthday()
    // this.showNotice()
    // window.refreshProfile = this.refreshProfile
  },
  methods: {
    ...mapActions({
      setUploadPic: 'base/setUploadPic'

    }),
    fileChange (event) {
      console.log('===================test')
      this.loading = true
      const input = event.target
      const reader = new FileReader()
      this.image = input.files[0]
      const picname = input.files[0].name
      const pictype = input.files[0].type
      reader.readAsDataURL(input.files[0])
      reader.onload = (e) => {
        this.preview = e.target.result
        console.log(this.preview)

        this.$store.dispatch('setUploadPic', {
          img: this.image,
          preview: this.preview,
          name: picname,
          type: pictype
        })
        this.$router.push('/upLoadImg/editImg')
      }
    },
    WidthCheck (n) {
      let w = 0
      for (let i = 0; i < this.editbasename.length; i++) {
        const c = this.editbasename.charCodeAt(i)
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
        if (this.editbasename.includes(specialChars.substring(i, i + 1))) {
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
.test {
    .instagram {
        // font-size: 80px;
        .upload-input {
            opacity: 0;
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            &::focus {
                border: none;
            }
        }

    }
}
</style>
