<template>
  <el-dialog id="register_forgetPwd"
    :visible.sync="visible"
    :before-close="closeForgetPwdModal">
      <div class="modal_content">
        <div class="header">
          {{$t('lang.forget_psw')}}
          <div class="close" @click="$emit('close')"></div>
        </div>
        <div class="content">
          <div class="text">
            {{$t('lang.find_psw')}}
          </div>
          <div class="sendToEmail">
            {{$t('lang.your_email')}}
          </div>
          <input class="txtSendToEmail" :placeholder="$t('lang.email')" v-model="email">
          <button @click="submit">{{$t('lang.send_email')}}</button>
        </div>
      </div>
  </el-dialog>
</template>

<script>
import UserApi from '@/api/user.js'
import { Message } from 'element-ui'
export default {
  name: 'ForgetPwd',
  props: {
    visible: {
      type: Boolean
    }
  },
  data () {
    return {
      email: ''
    }
  },
  methods: {
    closeForgetPwdModal () {
      this.$emit('close')
    },
    submit () {
      UserApi.forgotPassword(this.email).then((res) => {
        if (res.status !== 200) {
          return
        }
        this.$emit('close')
        Message({
          message: '邮件发送成功，请到邮箱查看链接重置密码',
          type: 'success',
          duration: 5 * 1000,
          showClose: true,
          customClass: 'message-override'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-dialog__header{
    display: none;
}
#register_forgetPwd {
    // position: fixed;
    // width: 100%;
    // height: 100%;
    // top: 50;
    // left: 50;
    // background-color: rgba(0, 0, 0, .5);
    // z-index: 5;
  .modal_content {
    position: absolute;
    width: 270px;
    height: 298px;
    top: calc(50vh - (298px/2));
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    background-color: #f5f4f4;
    border-radius: 4px;
    z-index: 3;
    .header {
      height: 3rem;
      font-size: 15px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 3rem;
      letter-spacing: 0rem;
      color: #6c757d;
      border-bottom: 1px solid #6c757d;
      .close {
        width: 2rem;
        height: 15px;
        background: url('~@/assets/register/ic-cross@3x.png') 15px center no-repeat;
        background-size: auto 15px;
        position: absolute;
        top: 1.1rem;
        right: 1.6rem;
      }
    }
    .content {
      // width: calc(100% - 4rem);
      width: 229px;
      margin: 0 auto;
      font-size: 14px;
      .text {
        width: 100%;
        padding-top: 1rem;
        padding-bottom: 1rem;
        text-align: left;
        color: #6c757d;
        span {
          color: #f46fe0;
        }
      }
      .sendToEmail {
        padding-left: .3rem;
        padding-bottom: .2rem;
        text-align: left;
        line-height: 2rem;
        color: #23272b;
        font-weight: bold;
        font-size: 14px;
      }
      .txtSendToEmail {
        width: calc(100% - .8rem);
	      height: 36px;
        background-color: #ffffff;
        border-radius: 8px;
        border: solid 1px #cccccc;
        padding: 0 0 0 .8rem;
        &::placeholder {
          color: #cccccc;
          font-size: 14px;
          line-height: 2rem;
        }
      }
      button {
        width: 100%;
        height: 36px;
        margin-top: 36px;
        border: 0;
        background-image: radial-gradient(
                            circle at 50% 50%,
                            #f46fe0,
                            #f8a9ec 97%);
        color: #fff;
        border-radius: 5px;
        font-size: 14px;
      }
    }
  }
}
</style>
<style lang="scss">
.el-dialog__header, .el-dialog__body {
  padding: 0;
}
.el-dialog__close {
  display: none;
}
</style>
