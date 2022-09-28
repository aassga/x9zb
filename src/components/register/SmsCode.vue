<template>
  <div class="smscode" id="register_create_account">
    <Header @back="$emit('change-current-step', 'CreateAccount')" :isvisible="true"/>
    <div class="login-header">
      <div class="logo"></div>
    </div>
    <div class="sendcode">
      <p>{{$t('lang.send_code')}}</p>
      <p class="sendcode-gmail">{{emial}}</p>
      <input type="text" :placeholder="$t('lang.pls_enter_code')" v-model="smscode" />
      <p class="hassend" v-if="cutdownTime > 0">{{$t('lang.has_been_sent')}}({{cutdownTime}})</p>
      <p class="resend" @click="sendCode" v-else>{{sendCodeText}}</p>
    </div>
    <div class="next-step" @click="choseInterest">{{$t('lang.next')}}</div>
  </div>
</template>

<script>
import Header from '@/components/register/Header.vue'
import userApi from '@/api/user.js'
export default {
  components: {
    Header
  },
  data () {
    return {
      smscode: '',
      emial: window.localStorage.getItem('registeremail'),
      cutdownTime: 0,
      timer: null, // 定时器标识
      sendCodeText: this.$t('lang.first_send_code')
    }
  },
  methods: {
    choseInterest () {
      if (this.smscode == '') {
        this.$message.info('验证码不能为空')
      } else {
        userApi.verifyEmail({ captcha: this.smscode }).then(res => {
          if (res.status === 200) {
            this.$emit('change-current-step', 'ChoiceInterest')
            this.$message.success(res.message)
          }
        })
      }
    },
    // 发送验证码
    sendCode () {
      if (this.cutdownTime > 0) return
      userApi.getEmailVerifyCode({ emial: this.emial }).then(res => {
        if (res.status === 200) {
          this.$message.success('验证码发送成功')
          this.cutDown()
        }
      })
    },
    // 倒计时方法
    cutDown () {
      this.cutdownTime = 60
      this.timer = setInterval(() => {
        this.cutdownTime--
        if (this.cutdownTime <= 0) {
          clearInterval(this.timer)
          this.sendCodeText = this.$t('lang.resend_code')
          this.cutdownTime = 0
        }
      }, 1000)
    }
  },
  mounted () {
    if (localStorage.getItem('needResend') == '1') {
      localStorage.removeItem('needResend')
    }
    // this.cutDown();
  }
}
</script>

<style lang="scss" scoped>
$main-width: 302px;
.login-header {
  div.logo {
    padding-top: 21px;
    height: 74px;
    background: url("~@/assets/register/YoloShow-logo-H@3x.png") no-repeat
      center center / 100% 100%;
    background-size: $main-width auto;
  }
  div.btn-login {
    font-size: 1rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: 2rem;
    letter-spacing: 0rem;
    color: #5a6268;
  }
}
.sendcode {
  p {
    &:first-child {
      margin-bottom: 53px;
    }
    &:nth-child(2) {
      margin-bottom: 20px;
    }
    &:last-child {
      text-align: center;
    }
  }
  .sendcode-gmail {
    color: #f46fe0;
  }
  .resend {
    color: #007aff;
    font-size: 14px;
  }
  .hassend {
    color: #666;
    font-size: 14px;
  }
  input {
    width: 100%;
    height: 30px;
    border-radius: 8px;
    border: 1px solid #ccc;
    margin-bottom: 23px;
    &::placeholder {
      color: #ccc;
      padding-left: 14px;
      font-size: 14px;
    }
  }
}
.next-step {
  background-image: radial-gradient(circle at 50% 50%, #f46fe0, #f8a9ec 97%);
  color: #fff;
  position: absolute;
  bottom: 100px;
  width: 146px;
  line-height: 30px;
  border-radius: 5px;
  right: 36px;
}
</style>
