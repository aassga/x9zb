<template>
  <div class="pripacy_context">
    <CommonHeader :title="$t('lang.change_pwd')"></CommonHeader>
    <div class="pripacy_context_title">{{$t('lang.check_pwd')}}</div>
    <div v-for="(item,index) in list" :key="index">
      <!-- <div v-show="item.focus" class="pripacy_context_i_title">{{item.name}}</div> -->
      <div
        v-if="token?index==0?false:true:true"
        :class="['pripacy_context_i',item.focus ? 'pripacy_context_i_focus' : '']"
      >
        <div class="pripacy_context_i_title">{{item.name}}</div>
        <input
          @blur="onHandleBlur(index)"
          @focus="onHandleFocus(index)"
          :placeholder="item.focus ? '' : item.name"
          class="pripacy_context_i_input"
          v-model="item.value"
          :type="item.display?'text':(item.password?'password':'text')"
        />
        <i
          class="el-icon-view password-icon"
          v-if="!item.display"
          :style="{color:item.password?'':'#f46fe0'}"
          @click="toggleShowPassword(index)"
        ></i>
        <div
          @click="onHandleClear(index)"
          v-show="item.value != ''"
          class="pripacy_context_i_icon el-icon-error"
        />
      </div>
    </div>
    <div @click="onHandleSave" class="context_box_btn">{{$t('lang.save')}}</div>
  </div>
</template>

<script>
import CommonHeader from '@/components/header/CommonHeader.vue'
import UserApi from '@/api/user.js'
import { Message } from 'element-ui'

export default {
  name: 'WebFeXcAccountset',
  components: {
    CommonHeader
  },
  data () {
    return {
      list: [
        {
          focus: false,
          value: '',
          name: this.$t('lang.current_pwd'),
          display: true
        },
        {
          focus: false,

          value: '',
          name: this.$t('lang.new_pwd'),
          password: true
        },
        {
          focus: false,

          value: '',
          name: this.$t('lang.confirm_new_pwd'),
          password: true
        }
      ],
      token: this.$route.query.token
    }
  },

  mounted () {},

  methods: {
    // 获取焦点事件
    onHandleFocus (index) {
      const list = JSON.parse(JSON.stringify(this.list))
      list.forEach((element, idx) => {
        if (index == idx) {
          element.focus = true
        } else {
          element.focus = false
        }
      })
      this.list = list
    },
    // 失去焦点事件
    onHandleBlur (index) {
      const list = JSON.parse(JSON.stringify(this.list))
      list[index].focus = false
      this.list = list
    },
    // 清除输入框内容事件
    onHandleClear (index) {
      const list = JSON.parse(JSON.stringify(this.list))
      list[index].value = ''
      this.list = list
    },
    // 密码icon先生隐藏切换
    toggleShowPassword (index) {
      const list = JSON.parse(JSON.stringify(this.list))
      list[index].password = !list[index].password
      this.list = list
    },
    onHandleSave () {
      const parmas = {
        new_password: this.list[1].value,
        confirm_password: this.list[2].value
      }
      // 必须包含数字和字母的正则
      const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/
      // 旧密码
      if (!this.token) {
        parmas.old_password = this.list[0].value
        if (!this.list[0].value) {
          return this.$message.warning(this.list[0].name + '不能为空')
        }
        if (this.list[0].value.length < 6) {
          return this.$message.warning(this.list[0].name + '至少6字元')
        }
        if (!reg.test(this.list[0].value)) {
          return this.$message.warning(
            this.list[0].name + '必须包含英文與數字'
          )
        }
      } else {
        parmas.token = this.token
      }
      // 新密码
      if (!this.list[1].value) {
        return this.$message.warning(this.list[1].name + '不能为空')
      }
      if (this.list[1].value.length < 6) {
        return this.$message.warning(this.list[1].name + '至少6字元')
      }
      if (!reg.test(this.list[1].value)) {
        return this.$message.warning(this.list[1].name + '必须包含英文與數字')
      }
      // 确认密码
      if (!this.list[2].value) {
        return this.$message.warning(this.list[2].name + '不能为空')
      }
      // 新密码和旧密码不能相同校验
      if (!this.token) {
        if (this.list[0].value === this.list[1].value) {
          return this.$message.warning(
            this.list[0].name + '和' + this.list[1].name + '不能相同'
          )
        }
      }
      if (this.list[1].value != this.list[2].value) {
        return this.$message.warning(
          this.list[1].name + '和' + this.list[2].name + '不一致'
        )
      }
      if (!this.token) {
        UserApi.passwordChange(parmas).then(res => {
          if (res.status === 200) {
            this.$message.success(this.$t('lang.message_operated_done'))
            // 返回上一页
            this.$router.go(-1)
          }
        })
      } else {
        UserApi.passwordResetPassByEmail(parmas).then(res => {
          if (res.status === 200) {
            this.$message.success(this.$t('lang.message_operated_done'))
            // 返回上一页
            this.$router.go(-1)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pripacy_context {
  width: 100%;
  min-height: 100vh;
  background-color: rgba(249, 249, 249, 0.94);
  box-sizing: border-box;
  padding: 44px 30px 0;
  .pripacy_context_title {
    margin-top: 14px;
    margin-bottom: 30px;
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: SF Pro;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #7a7e83;
  }
  .pripacy_context_i {
    width: 100%;
    height: 44px;
    margin-top: 14px;
    font-weight: 600;
    border-bottom: solid 1px #999999;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    position: relative;
    &.pripacy_context_i_focus {
      border-bottom: solid 1px #f46fe0;
    }
    .pripacy_context_i_title {
      position: absolute;
      left: 0;
      top: 0;
      height: 17px;
      font-family: SF Pro;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 14px;
      letter-spacing: 0px;
      color: #f46fe0;
    }
    .pripacy_context_i_input {
      flex: 1;
      height: 25px;
      display: flex;
      align-items: center;
      background-color: rgba(249, 249, 249, 0.94);
      border: none !important;
      outline: none !important;
      font-family: SF Pro;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 19px;
      letter-spacing: 0px;
      color: #6c757d;
    }
    .pripacy_context_i_icon {
      // position: relative;
      // top: 20px;
      width: 25px;
      height: 25px;
    }
    .password-icon {
      width: 25px;
      height: 25px;
    }
  }
  .context_box_btn {
    position: absolute;
    left: 17px;
    bottom: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 342px;
    height: 44px;
    background-image: linear-gradient(90deg, #f46fe0 0%, #f8a9ec 100%);
    border-radius: 5px;
    font-family: SourceHanSansSC-Regular;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 2px;
    color: #ffffff;
  }
}
</style>
