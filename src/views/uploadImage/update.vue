<template lang="pug">
  .text-mine-shaft(v-loading.fullscreen="loading")
    .d-flex.justify-content-between.p-3.bg-athens-gray.align-items-center
      span.text-carnation(@click="$router.push({ name: 'user-password' })")
        img(src="../../assets/ic-back/ic-back.png")
      span {{getHeaderName}}
      span.text-carnation(:style="{color: checkIsEdit ? '#222' : '#aeaeae'}" @click="beforeSubmit") 完成
    .cellview(v-if="editIndex === 1")
      .left {{$t('lang.date_of_birth')}}
      .middle {{birthday}}
      .right(@click="clcikChangeBirth")
    el-input(v-if="editIndex === 0" v-model="oldName"  @focus="focus" @blur="blur" clearable)
    el-form.passwordview(v-if="editIndex === 3" ref="form" :model="form" :rules="rules")
      .inputtop.align-items-center.d-flex.justify-content-center
        .text {{$t('lang.old_pwd')}}
        el-input(type="password" v-model="form.old_password" placeholder="请输入旧密码" @focus="focus" @blur="blur" show-password )
      .inputmiddle.align-items-center.d-flex.justify-content-center(prop="new_password")
        .text {{$t('lang.new_pwd')}}
        el-input(type="password" v-model="form.new_password" placeholder="请输入新密码"  @focus="focus" @blur="blurnew" show-password )
      .inputbottom.align-items-center.d-flex.justify-content-center(prop="confirm_password")
        .text {{$t('lang.confirm_new_pwd')}}
        el-input(type="password" v-model="form.confirm_password" placeholder="请确认新密码"  @focus="focus" @blur="blurrenew" show-password)
    mt-datetime-picker(ref="picker" type="date" :startDate="new Date('1970')" v-model="pickerDate" @confirm="handleDatePickerConfirm")
    .cellview(v-if="editIndex === 2")
      el-radio( label="1" v-model="radio")
        .secicon
        .text {{$t('lang.male')}}
      el-radio( label="2" v-model="radio")
        .secicon
        .text {{$t('lang.female')}}
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { DatetimePicker } from 'mint-ui'

Vue.component(DatetimePicker.name, DatetimePicker)
export default {
  middleware: 'login',

  data () {
    const password = (rule, value, callback) => {
      if (value.length < 6 || value.length > 16) { this.$toast.center('密码长度不符') }
    }
    const checkPassword = (rule, value, callback) => {
      if (value !== this.form.new_password) {
        this.$toast.center('两次输入密码不一致')
      }
    }

    return {
      radio: '1',
      birthday: '',
      loading: false,
      pickerDate: '',
      oldName: '',
      changeBirth: false,
      form: {
        old_password: '',
        new_password: '',
        confirm_password: ''
      },
      rules: {
        new_password: [{ validator: password, trigger: 'blur' }],
        confirm_password: [
          { validator: password, trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      profile: ({ user }) => user.profile,
      editIndex: ({ user }) => user.editIndex
    }),
    checkIsEdit () {
      if (
        this.form.old_password === '' ||
        this.form.new_password === '' ||
        this.form.confirm_password === '' ||
        this.form.confirm_password !== this.form.new_password ||
        this.form.new_password.length < 6 ||
        this.form.new_password.length > 16 ||
        this.form.confirm_password.length < 6 ||
        this.form.confirm_password.length > 16
      ) {
        return false
      } else {
        return true
      }
    },
    getHeaderName () {
      let title = '修改昵称'
      switch (this.editIndex) {
        case 3:
          title = '修改密码'
          break
        case 1:
          title = '修改出生日期'
          break
        default:
          break
      }
      return title
    }
  },
  mounted () {
    if (window.imAndroid) {
      this.form.old_password = window.imAndroid.getPassword()
    } else if (window.webkit) {
      this.form.old_password = localStorage.pw
    }
  },
  beforeDestroy () {
    this.setIsFocus(false)
  },
  created () {
    this.form.old_password = localStorage.pw
  },
  methods: {
    ...mapActions({
      setIsFocus: 'index/setIsFocus'
    }),
    setIosPassword (data) {
      this.form.old_password = data
    },
    focus () {
      this.setIsFocus(true)
    },
    blur () {},
    clcikChangeBirth () {
      this.$nextTick(() => {
        this.$refs.picker.open()
      })
    },
    blurrenew () {
      if (this.form.confirm_password !== this.form.new_password) {
        this.$toast.center('两次输入密码不一致')
      }
    },
    blurnew () {
      if (
        this.form.new_password.length < 6 ||
        this.form.new_password.length > 16
      ) { this.$toast.center('密码长度不符') }
    },
    handleDatePickerConfirm (val) {
      this.birthday = this.formatDate(val)
      this.pickerDate = new Date(this.birthday).toISOString()
    },
    beforeSubmit () {
      if (!this.checkIsEdit) return
      this.$refs.form.validate((valid) => {
        if (valid) this.submit()
        else return false
      })
    },
    async submit () {
      try {
        this.loading = true
        const { message } = await this.$axios.$put(
          'v1/password/change',
          this.form
        )
        if (message !== '成功') {
          this.$toast.center(message)
        } else {
          this.$toast.center('修改成功')
          localStorage.removeItem('pw')
          this.$router.go(-1)
          if (this.$isApp()) {
            this.$app('updatePassword', this.form.confirm_password)
          }
        }
      } catch {
      } finally {
        this.loading = false
      }
    },
    formatDate (secs) {
      const t = new Date(secs)
      const year = t.getFullYear()
      let month = t.getMonth() + 1
      if (month < 10) month = '0' + month
      let date = t.getDate()
      if (date < 10) date = '0' + date
      return year + '-' + month + '-' + date
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-athens-gray {
  background-color: #f9f9f9;
  box-sizing: content-box;
  height: 1rem;
  height: calc(env(safe-area-inset-top) + 1rem);
  height: calc(constant(safe-area-inset-top) + 1rem);
  align-items: flex-end;
}
.text-carnation {
  color: #aeaeae;
  font-size: 15px;
}
.text-mine-shaft {
  color: #222;
}
.cellview {
  height: 50px;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
  .secicon {
    width: 16px;
    height: 20px;
    background-color: black;
    margin-right: 10px;
  }
  .text {
    color: #5b5b5b;
    font-size: 20px;
  }
  .left {
    font-size: 15px;
    color: #5b5b5b;
  }
  .middle {
    flex: 0.5;
    color: #b0b0b0;
    font-size: 15px;
  }
  .right {
    width: 14px;
    height: 14px;
    background-color: black;
  }
}

.passwordview {
  .inputtop {
    margin-top: 10px;
    border-top: 0.5px solid #d9d9d9;
    height: 50px;
  }
  .inputmiddle {
    border-top: 0.5px solid #d9d9d9;
    height: 50px;
  }
  .inputbottom {
    border-top: 0.5px solid #d9d9d9;
    border-bottom: 0.5px solid #d9d9d9;
    height: 50px;
  }
  .text {
    min-width: 64px;
    margin: 0px 24px;
    font-size: 15px;
    color: #222;
  }
}

.changebirthbg {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid;
  margin: 0px 50px;
  padding: 20px 0px 10px 0px;
  font-size: 17px;
}

::v-deep .el-input__inner::placeholder {
  text-align: left;
}

::v-deep .el-input__inner {
  border: unset;
}

::v-deep {
  .el-drawer.btt {
    border-radius: 10px 10px 0px 0px;
  }
  .picker-items {
    margin: 0px 3rem;
  }
  .mint-popup.mint-datetime.mint-popup-bottom {
    border-radius: 10px 10px 0px 0px;
  }
  .el-radio {
    display: flex;
    align-items: center;
  }
  .el-radio__label {
    display: flex;
    align-items: center;
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: #5b5b5b;
  }
}
</style>
