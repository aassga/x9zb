<template>
  <div id="register_create_account">
    <Header @back="$router.push('login')" :isvisible="true"/>
    <div class="login-header">
      <div class="logo"></div>
      <div class="btn-login">{{$t('lang.creat_acc')}}</div>
    </div>
    <div class="login-content">
      <div>
        <span class="login-content__account"></span>
        <input class="account" v-model="username" :placeholder="$t('lang.acc')" />
      </div>
      <div>
        <span class="login-content__nickname"></span>
        <input class="nickname" v-model="nick" :placeholder="$t('lang.nick_name')" />
      </div>
      <div>
        <span class="login-content__email"></span>
        <input class="email" v-model="email" :placeholder="$t('lang.email')" />
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
      <div class="sex">
        <button :class="sex==='1'? 'sex-m selectd' : 'sex-m'" @click="sex='1'">{{$t('lang.male')}}</button>
        <button :class="sex==='2'? 'sex-f selectd' : 'sex-f'" @click="sex='2'">{{$t('lang.female')}}</button>
      </div>
      <button class="btn-login" @click="emailRegister">{{$t('lang.next')}}</button>
    </div>
    <div class="register-jump">
      {{$t('lang.policy_title1')}}
      <span @click="$emit('show-agreememt-modal')">{{$t('lang.policy_title2')}}</span>{{$t('lang.policy_title3')}}
      <span @click="$emit('show-agreememt-modal')">{{$t('lang.policy_title4')}}</span>
    </div>
    <div class="or">
      <hr />
    </div>
    <div class="login-type">
      <button class="facebook-login" @click="loginWithThird('facebook')">{{$t('lang.login_with_fb')}}</button>
      <button class="google-login" @click="loginWithThird('google')">{{$t('lang.login_with_gl')}}</button>
     <!--  <button class="twitter-login" @click="showNotEnable">{{$t('lang.login_with_twt')}}</button>
      <button class="appleid-login" @click="showNotEnable">{{$t('lang.login_with_appleId')}}</button> -->
    </div>
    <NotEnable :isshow="isShowEnable" @closeNotEnable="() => isShowEnable = false" />
  </div>
</template>

<script>
import Header from '@/components/register/Header.vue'
import NotEnable from '@/components/header/NotEnable.vue'
import hello from '@/utils/hello.all.min.js'
import thirdLogin from '@/config/loginInfo.js'
export default {
  name: 'CreateAccount',
  components: {
    NotEnable,
    Header
  },
  data () {
    return {
      isShowEnable: false,
      username: '',
      nick: '',
      email: '',
      password: '',
      sex: '',
      isShowPassword: false,
      loginInfo: ''
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
    showNotEnable () {
      this.isShowEnable = true
    },
    emailRegister () {
      const that = this
      const params = {
        username: this.username,
        password: this.password,
        nick: this.nick,
        email: this.email,
        sex: this.sex
      }
      if (!this.username) {
        return this.$message.warning('用户名不能为空')
      }
      // if(!this.nick){
      //   return this.$message.warning(this.$t('lang.nick_not_null'))
      // }
      if (this.username.length < 6) {
        return this.$message.warning('用户名不能少于个6字元')
      }
      if (this.username.length > 10) {
        return this.$message.warning('用户名不能超过个10字元')
      }

      // 必须包含数字和字母的正则
      const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/
      if (!reg.test(this.username)) {
        return this.$message.warning('用户名必须包含英文與數字')
      }
      if (this.password.length < 6 || this.password.length > 16 || !reg.test(this.password)) {
        return this.$message.warning(this.$t('lang.password_must_text'))
      }
      this.$store.dispatch('emailRegister', params).then(res => {
        if (res.status == 200) {
          // window.localStorage.setItem('registeremail',that.email)
          // that.$emit("change-current-step", "SmsCode");
        } else if (res.status == 501) {
          window.localStorage.setItem('registeremail', that.email)
          that.$emit('change-current-step', 'SmsCode')
          // this.$router.push({ path: "/my" });
        }
      })
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
    padding-top: 21px;
    height: 120px;
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
.login-content {
  margin-top: 19px;
  display: flex;
  flex-direction: column;
  div {
    margin: 0 auto;
    width: $input-width;
    padding-bottom: 1rem;
    position: relative;
    span.login-content__account,
    span.login-content__nickname,
    span.login-content__email,
    span.login-content__password {
      position: absolute;
      height: 44px;
      margin-top: 0.3rem;
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
      &.account {
        background: url("~@/assets/register/ic-user@3x.png") 1rem center
          no-repeat;
        background-size: auto 1rem;
        background-position: left 0.6rem top 1.1rem;
      }
      &.nickname {
        background: url("~@/assets/register/ic-nickname@3x.png") 1rem center
          no-repeat;
        background-size: auto 1rem;
        background-position: left 0.6rem top 1.1rem;
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
  .sex {
    button {
      width: 44%;
      &.sex-m {
        margin-left: 0px;
      }
      &.sex-f {
        margin-right: 0px;
      }
      &.sex-m,
      &.sex-f {
        border: 1px solid #cccccc;
        background-image: none;
        background-color: transparent;
        color: #6c757d;
        &.selectd {
          background-image: radial-gradient(
            circle at 50% 50%,
            #f46fe0,
            #f8a9ec 97%
          );
          color: #fff;
        }
      }
    }
    display: flex;
    justify-content: space-between;
  }
}
.register-jump {
  // display: flex;
  // justify-self: center;
  width: $main-width;
  margin: 0 auto;
  // justify-content: space-between;
  padding-top: 1rem;
  font-size: 14px;
  span {
    text-decoration: none;
    color: #6c757d;
    padding-bottom: 0px;
    color: rgb(244, 111, 224);
  }
}
.or {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  hr {
    overflow: visible;
    text-align: center;
    line-height: 0px;
    background: #cccccc;
    width: $main-width;
    &::after {
      content: "\00a0\00a0\00a0or\00a0\00a0\00a0";
      font-size: 14px;
      color: #cccccc;
      background: white;
      z-index: 2;
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
