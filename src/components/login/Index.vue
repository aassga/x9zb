<template>
  <div id="register_main">
    <div class="login-header">
      <div class="logo"></div>
      <div class="btn-login">{{$t('lang.have_login')}}</div>
    </div>
    <div class="login-content">
      <div>
        <span class="login-content__email"></span>
        <input class="email" v-model="username" :placeholder="$t('lang.email')" />
      </div>
      <div>
        <span class="login-content__password"></span>
        <input
          class="password"
          :type="isShowPassword ? '' : 'password'"
          v-model="password"
          :placeholder="$t('lang.psw')"
        />
        <span @click="isShowPassword=!isShowPassword">
          <a :class="password !== '' ? showPassword : ''">
            <i></i>
          </a>
        </span>
      </div>
      <button v-no-more-click @click="login_btn">{{$t('lang.login')}}</button>
      <button @click="fastRegister">{{$t('lang.quick_sign_up')}}</button>
    </div>
    <div class="register-jump">
      <div class="forget-password" @click="$emit('show-forget-pwd-modal')">{{$t('lang.forget_psw')}}？</div>
      <div class="register-yoloshow" @click="$router.push('register')" href>{{$t('lang.register')}}</div>
    </div>
    <div class="login-type">
     <button class="facebook-login" @click="loginWithThird('facebook')">{{$t('lang.login_with_fb')}}</button>
      <button class="google-login" @click="loginWithThird('google')">{{$t('lang.login_with_gl')}}</button>
     <!--  <button class="twitter-login" @click="showNotEnable">{{$t('lang.login_with_twt')}}</button>
      <button class="appleid-login" @click="showNotEnable">{{$t('lang.login_with_appleId')}}</button> -->
    </div>
    <NotEnable :isshow="isShowEnable" @closeNotEnable="() => isShowEnable = false"></NotEnable>
  </div>
</template>

<script>
import NotEnable from '@/components/header/NotEnable.vue'
import hello from '@/utils/hello.all.min.js'
import thirdLogin from '@/config/loginInfo.js'
export default {
  name: 'LoginIndex',
  components: { NotEnable },
  data () {
    return {
      username: '',
      password: '',
      isShowPassword: false,
      loginInfo: '',
      isShowEnable: false
    }
  },
  computed: {
    showPassword () {
      return this.isShowPassword ? 'showPassword' : 'hidePassword'
    }
  },
  mounted () {
    this.initThirdLogin()
  },
  methods: {
    showNotEnable () {
      this.isShowEnable = true
    },
    initThirdLogin () {
      this.loginInfo = hello.init(
        {
          facebook: thirdLogin.facebook,
          google: thirdLogin.google
        },
        { scope: 'email' }
      )
    },
    loginWithThird (e) {
      this.loginInfo(e)
        .login()
        .then(res => {
          const access_token = res.authResponse.access_token
          console.log(e, res)
          const params = {
            access_token: res.authResponse.access_token,
            type: e
          }
          this.$store.dispatch('thirdLogin', params)
        })
    },
    fastRegister () {
      const params = {
        captcha_code: 'Rz',
        password: 'admin123456'
      }
      this.$store.dispatch('fastRegister').then(res => {
        const params = {
          access_token: res.authResponse.access_token
        }
        localStorage.setItem('locale', 'en')
        this.$i18n.locale = 'en'
        this.$store.dispatch('login', params)
      })
    },
    login_btn () {
      const params = {
        username: this.username,
        password: this.password
      }
      this.$store.dispatch('login', params)
    }
  }
}
</script>

<style lang="scss" scoped>
$main-font-size: 14px;
$btn-font-size: 16px;
$main-width: 302px;
$input-width: 302px; // calc(81% + 30px);
.login-header {
  div.logo {
    height: 120px;
    background: url("~@/assets/register/YoloShow-logo-H@3x.png") no-repeat
      center center / 100% 100%;
    background-size: $main-width auto;
  }
  div.btn-login {
    font-size: 20px;
    line-height: 24px;
    color: #5a6268;
  }
}
.login-content {
  margin-top: 19px;
  display: flex;
  flex-direction: column;
  div {
    margin: 0 auto;
    position: relative;
    width: $input-width;
    padding-bottom: 1rem;
    span.login-content__email,
    span.login-content__password {
      position: absolute;
      height: 44px;
      margin-top: 0.35rem;
      margin-left: 0.8rem;
      border-right: 1px solid #cccccc;
      text-align: center;
      width: 1.7rem;
    }
    input {
      width: calc(99% - 50px);
      height: 44px;
      margin: 0.2rem auto;
      border-radius: 8px;
      border: 1px solid #cccccc;
      font-size: $main-font-size;
      padding-left: 50px;
      color: #343a40;
      &::placeholder {
        color: #cccccc;
        font-size: $main-font-size;
      }
      &.email {
        background: url("~@/assets/register/ic-email@3x.png") 1rem center
          no-repeat;
        background-size: auto 1rem;
        background-position: left 0.8rem top 1.1rem;
      }
      &.password {
        background: url("~@/assets/register/ic-pw@3x.png") 1rem center no-repeat;
        background-size: auto 1rem;
        background-position: left 0.8rem top 1.1rem;
      }
    }
    span {
      a {
        position: absolute;
        // height: 1rem;
        margin-left: -36px;
        text-align: center;
        width: 1rem;
        i {
          position: static;
          display: inline-block;
          margin-top: 1.25rem;
          // margin-right: .8rem;
          width: 19px;
          height: 18px;
          // background-size: 19px auto;
        }
        &.showPassword i {
          background: url("~@/assets/register/icon-eye-close.png") no-repeat 0
            center;
          background-size: 18px auto;
        }
        &.hidePassword i {
          background: url("~@/assets/register/icon-eye@3x.png") no-repeat 0
            center;
          background-size: 18px auto;
        }
      }
    }
  }
  button {
    width: $main-width;
    height: 44px;
    margin: 0.4rem auto;
    border: 0;
    background-image: radial-gradient(circle at 50% 50%, #f46fe0, #f8a9ec 97%);
    color: #fff;
    font-size: $btn-font-size;
    border-radius: 8px;
  }
}
.register-jump {
  display: flex;
  width: $main-width;
  margin: 0 auto;
  justify-content: space-between;
  padding-top: 20px;
  padding-bottom: 40px;
  div {
    font-size: 14px;
    text-decoration: none;
    color: #6c757d;
    padding-bottom: 0px;
    &.register-yoloshow {
      color: rgb(244, 111, 224);
    }
  }
}
.login-type {
  display: flex;
  flex-direction: column;
  button {
    width: $main-width;
    height: 44px;
    margin: 0.65rem auto;
    font-size: $btn-font-size;
    border-radius: 20px;
    &.twitter-login {
      background: url("~@/assets/register/ic-Twitter@3x.png") 24px center
        no-repeat;
      background-size: auto 24px;
      background-position: 1rem 50%;
      border: 1px solid #cccccc;
      background-color: #54abee;
      color: #fff;
    }
    &.google-login {
      background: url("~@/assets/register/ic-google@3x.png") 24px center
        no-repeat;
      background-size: auto 24px;
      background-position: 1rem 50%;
      border: 1px solid #cccccc;
      background-color: #fff;
    }
    &.facebook-login {
      background: url("~@/assets/register/ic-fb@3x.png") 24px center no-repeat;
      background-size: auto 24px;
      background-position: 1rem 50%;
      border: 1px solid #cccccc;
      background-color: #1977f2;
      color: #fff;
    }
    &.appleid-login {
      background: url("~@/assets/register/ic-Apple@3x.png") 24px center
        no-repeat;
      background-size: auto 24px;
      background-position: 1rem 50%;
      border: 1px solid #cccccc;
      background-color: #000000;
      color: #fff;
    }
  }
}
</style>
