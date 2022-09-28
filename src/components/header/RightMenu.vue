<template>
  <el-drawer
    :withHeader="false"
    custom-class="rightMenu_context"
    position="right"
    :visible.sync="show"
    direction="rtl"
    :before-close="close"
    :append-to-body="true"
    :modal-append-to-body="true"
  >
    <div class="rightMenu_context_header">
      <el-image
        class="rightMenu_context_avart"
        fit="cover"
        :src="user_info.avatar"
      >
       <div slot="error" >
            <img class="rightMenu_context_avart" src="@/assets/my/img-user.jpg" alt="" srcset="">
          </div>
      </el-image>
      <div class="rightMenu_context_header_user">
        <div class="rightMenu_context_header_user_name">{{user_info.nick}}</div>
        <div
          @click="onHandleSwitchUser"
          :class="['rightMenu_context_header_user_icon el-icon-caret-right',openUserList ? 'rightMenu_context_header_user_icon_close' : '']"
        ></div>
      </div>
      <div v-show="openUserList" class="rightMenu_context_header_user_list">
        <div @click.stop="onHandleChangeAccount(item)" v-for="(item,index) in otherAccountInfo[user_info.username].slice(0,5)" :key="index" class="rightMenu_context_header_user_list_item">
          <el-image class="rightMenu_context_header_user_list_avatar" fit="cover" :src="item.avatar">
            <div slot="error">
              <img class="rightMenu_context_header_user_list_avatar" src="@/assets/my/img-user.jpg" alt srcset />
            </div>
          </el-image>
          <div class="rightMenu_context_header_user_list_user" :style="item.username == user_info.username ? 'font-weight: bold' : ''">
            <div class="rightMenu_context_header_user_list_user_nick">{{item.nick}}</div>
            <div class="rightMenu_context_header_user_list_user_name">
              <!-- 此处应该替换为个人网址 -->
              <span>{{item.username?(myAdress+item.uid):''}}</span>
              <input id="copy-input" />
              <i class="el-icon-document-copy" @click.stop="copyName(item.uid)"></i>
            </div>
          </div>
          <div class="rightMenu_context_header_user_list_check_icon">
            <div v-show="item.username == user_info.username" class="el-icon-check">
            </div>
          </div>
        </div>
        <div @click="addChangeAccount()" class="rightMenu_context_header_add_account">
          <img class="rightMenu_context_header_add_account_icon" src="@/assets/my/ic-add-blue.png" alt srcset />
          {{$t('lang.add_account')}}
        </div>
      </div>
      <!-- <div class="rightMenu_context_header_link">
        joyin.com/kikichou
        <div class="rightMenu_context_header_copy el-icon-document-copy"></div>
      </div> -->
    </div>

    <div class="rightMenu_context_box">
      <div @click="onHandleGoUrl(0)" class="rightMenu_context_box_i">
        <div class="rightMenu_context_box_i_title">{{$t('lang.set_security_acc')}}</div>
        <div class="rightMenu_context_box_i_icon el-icon-arrow-right"></div>
      </div>
      <div @click="onHandleGoUrl(1)" class="rightMenu_context_box_i">
        <div class="rightMenu_context_box_i_title">{{$t('lang.privacy_security')}}</div>
        <div class="rightMenu_context_box_i_icon el-icon-arrow-right"></div>
      </div>
      <div @click="onHandleGoUrl(2)" class="rightMenu_context_box_i">
        <div class="rightMenu_context_box_i_title">{{$t('lang.set_notification')}}</div>
        <div class="rightMenu_context_box_i_icon el-icon-arrow-right"></div>
      </div>
      <div @click="onHandleGoUrl(3)" class="rightMenu_context_box_i">
        <div class="rightMenu_context_box_i_title">{{$t('lang.bookmark')}}</div>
        <div class="rightMenu_context_box_i_icon el-icon-arrow-right"></div>
      </div>
      <!-- v-if="user_type == 2" -->
      <div @click="onHandleOpen(0)"  v-if="user_type == 2"  class="rightMenu_context_box_i">
        <div class="rightMenu_context_box_i_title">{{$t('lang.interactive_report')}}</div>
        <div class="rightMenu_context_box_i_icon el-icon-arrow-right"></div>
      </div>
      <div
        @click="onHandleOpen(1)"
        v-if="user_type !== 1"
        class="rightMenu_context_box_i"
      >
        <div class="rightMenu_context_box_i_title">{{$t('lang.revenue_report')}}</div>
        <div class="rightMenu_context_box_i_icon el-icon-arrow-right"></div>
      </div>
      <!-- <div @click="onHandleGoUrl(4)" v-if="user_type == 1 || user_type == 2" class="rightMenu_context_box_i rightMenu_context_box_i_t">
        <div class="rightMenu_context_box_i_title">添加信用卡</div>
        <div class="rightMenu_context_box_i_icon el-icon-arrow-right"></div>
      </div>-->

      <div
        style="padding-left: 0;"
        @click="onHandleOpen(2)"
        class="rightMenu_context_box_i rightMenu_context_box_i_t"
      >
        <div style="color:#82b1fd;" class="rightMenu_context_box_i_title">
          <img class="rightMenu_context_box_i_title" src="@/assets/my/ic-money@3x.png" alt srcset />
          {{$t('lang.load')}}
        </div>
        <div class="rightMenu_context_box_i_icon el-icon-arrow-right"></div>
      </div>
      <div
        style="padding-left: 0;"
         @click="onHandleOpen(3)"
       v-if="user_type == 2 || user_type == 3"
        class="rightMenu_context_box_i"
      >
       <!-- v-if="user_type == 2 || user_type == 3" -->
        <div style="color:#82b1fd;" class="rightMenu_context_box_i_title">
          <img style="height:30px;margin:0 8px;" class="rightMenu_context_box_i_title" src="@/assets/my/ic-tikuan.png" alt srcset />
          {{$t('lang.withdrawal')}}
        </div>
        <div class="rightMenu_context_box_i_icon el-icon-arrow-right"></div>
      </div>

      <div @click="onHandleGoUrl(5)" class="rightMenu_context_box_i rightMenu_context_box_i_t">
        <div class="rightMenu_context_box_i_title">{{$t('lang.choose_lang')}}</div>
        <div class="rightMenu_context_box_i_icon el-icon-arrow-right"></div>
      </div>
      <div @click="onHandleGoUrl(6)" class="rightMenu_context_box_i">
        <div class="rightMenu_context_box_i_title">{{$t('lang.hep_center')}}</div>
        <div class="rightMenu_context_box_i_icon el-icon-arrow-right"></div>
      </div>
      <div @click="onHandleLogout()" class="rightMenu_context_box_i rightMenu_context_box_i_t">
        <div style="color:#6c757d;" class="rightMenu_context_box_i_title">{{$t('lang.logout')}}</div>
        <div class="rightMenu_context_box_i_icon el-icon-arrow-right"></div>
      </div>
    </div>
    <ConfirmModel
      :isShow="showConfirmChangeAccount"
      :title="$t('lang.switch_account')"
      :content="$t('lang.sure')+$t('lang.switch_account')"
      @close="closeChangeAccount"
      @confirm="confirmChangeAccount"
      :cancelButtonText="this.$t('lang.dialog_btn_cancel')"
      :confirmButtonText="this.$t('lang.dialog_btn_confirm')"
    />
  </el-drawer>
</template>

<script>
// 引入gtters计算函数
import { mapGetters, mapState } from 'vuex'
import { removeCookie } from '@/utils/auth'
import ConfirmModel from '@/components/header/ConfirmModel.vue'
export default {
  name: 'rightMenu',
  components: {
    ConfirmModel
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['user_type']),
    ...mapState({
      user_info: state => state.user.user_info,
      otherAccountInfo: state => state.user.otherAccountInfo
    })
  },
  data () {
    return {
      // 用户栏的展开状态
      openUserList: true,
      // 跳转的页面
      pageList: [
        '/ForestPwd',
        '/Pripacy',
        '/NoticeSet',
        '/Book',
        '/AddCard',
        '/SidebarLaunch',
        '/HelpCenter',
        '/Recharge',
        '/Withdarw'
      ],
      selectChangeAccount: null,
      showConfirmChangeAccount: false,
      myAdress: location.origin + '/#/userinfo/'
    }
  },

  // props:{
  //     title:{
  //         type:String,
  //         default:'标题'
  //     }
  // },

  created () {
    this.initOtherAccountInfo()
  },

  mounted () {
    console.log(this.user_type, 'user_type======')
  },

  methods: {
    // 点击复制用户名
    copyName (name) {
      // 使用插件复制
      console.log(name)
      document.getElementById('copy-input').value = location.origin + '/#/userInfo/' + name
      const copyInput = document.getElementById('copy-input')
      copyInput.select()
      document.execCommand('copy')
      this.$message.success(this.$t('lang.message_copied'))
    },
    close () {
      // console.log(33);
      this.$emit('close')
    },
    // 将弹框挂载到组件元素下
    getContainer () {
      return document.querySelector('#app')
    },
    // 伸展用户栏
    onHandleSwitchUser () {
      this.openUserList = !this.openUserList
    },
    // 初始化切換帳號列表
    initOtherAccountInfo () {
      const nowAccountInfo = {
        nick: this.user_info.nick,
        username: this.user_info.username,
        token: localStorage.getItem('token'),
        avatar: this.user_info.avatar,
        uid: this.user_info.uid
      }
      const otherAccountInfo = JSON.parse(localStorage.getItem('otherAccountInfo')) ? JSON.parse(localStorage.getItem('otherAccountInfo')) : {}
      const addUserName = JSON.parse(localStorage.getItem('addUserName')) ? JSON.parse(localStorage.getItem('addUserName')) : ''
      // 檢查是否含有當前帳號資料
      if (!otherAccountInfo[this.user_info.username] && this.user_info.username) {
        otherAccountInfo[this.user_info.username] = [nowAccountInfo]
      }
      // 如果有addUserName代表需要加addUserName資料進當前登入資料
      if (addUserName.length > 0) {
        // 檢查當前資料是否有addUserName的資料
        const checkHaveAddUserName = otherAccountInfo[this.user_info.username].filter(it => it.username == addUserName).length === 0
        if (checkHaveAddUserName) {
          otherAccountInfo[this.user_info.username] = otherAccountInfo[addUserName].concat(otherAccountInfo[this.user_info.username])
        }
        // 資料同步
        otherAccountInfo[addUserName] = otherAccountInfo[this.user_info.username]
        // 可能還需要把資料同步回其他帳號(待需求確認)
        localStorage.removeItem('addUserName')
      }
      this.$store.commit('SET_OTHER_ACCOUNT_INFO', otherAccountInfo)
      localStorage.setItem('otherAccountInfo', JSON.stringify(otherAccountInfo))
    },
    // 切換用戶
    onHandleChangeAccount (item) {
      if (item.username == this.user_info.username) return
      this.selectChangeAccount = item
      this.showConfirmChangeAccount = true
    },
    // 確認切換用戶
    confirmChangeAccount () {
      localStorage.setItem('token', this.selectChangeAccount.token)
      location.reload()
    },
    // 取消切換用戶
    closeChangeAccount () {
      this.selectChangeAccount = null
      this.showConfirmChangeAccount = false
    },
    // 整理帳號列表
    cleanAccountInfo () {
      const otherAccountInfo = JSON.parse(localStorage.getItem('otherAccountInfo'))
      const needDeleteKey = []
      if (otherAccountInfo) {
        for (const key in otherAccountInfo) {
          if (otherAccountInfo[key].length === 1) needDeleteKey.push(key)
        }
        needDeleteKey.forEach(it => {
          delete otherAccountInfo[it]
        })
        return JSON.stringify(otherAccountInfo)
      }
      return null
    },
    // 新增切換帳號
    addChangeAccount () {
      if (this.otherAccountInfo[this.user_info.username].length === 5) { return this.$message.warning(this.$t('lang.message_add_account_max')) }
      this.$router.push({ path: '/AddAccount' })
    },
    // 退出登录
    onHandleLogout () {
      const otherAccountInfo = this.cleanAccountInfo()
      const storage = window.localStorage
      storage.clear()
      removeCookie('token')
      localStorage.removeItem('token')
      localStorage.setItem('otherAccountInfo', otherAccountInfo)
      this.$router.push({ path: '/Login' })
    },
    // 打开弹框 0是互动报告  1是营收报告
    onHandleOpen (num) {
      // console.log(num)
      // 打开侧边栏弹框
      this.$store.commit('OPEN_MENU_MODEL', num)
    },
    // 跳转其他页面
    onHandleGoUrl (num) {
      this.$router.push({ path: this.pageList[num] })
    }
  }
}
</script>

<style lang="scss">
.rightMenu_context {
  width: 202px !important;
  height: 100%;
  // border-radius:6px;
  background-color: #f5f4f4;
  .rightMenu_context_header {
    background-color: #f5f5f5;
    width: 100%;
    // height: 200px;
    .rightMenu_context_avart {
      margin-top: 41px;
      width: 62px;
      height: 62px;
      position: relative;
      left: 75px;
      border-radius: 50%;
      border: 2px solid #f46fe0;
    }
    .rightMenu_context_header_user {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 17px;
      box-sizing: border-box;
      flex-wrap: wrap;
      border-bottom: solid 1px #999999;
      .rightMenu_context_header_user_name {
        height: 41px;
        font-family: PingFang TC;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        display: flex;
        align-items: center;
        letter-spacing: 0px;
        color: #343a40;
      }
      .rightMenu_context_header_user_icon {
        transform: rotate(-90deg);
        margin-top: 6px;
        color: #6c757d;
        font-size: 17px;
        &.rightMenu_context_header_user_icon_close {
          transform: rotate(90deg);
        }
      }
    }
    .rightMenu_context_header_user_list {
      width: 100%;
      padding: 15px 15px 0;
      box-sizing: border-box;
      border-bottom: solid 1px #999999;
      .rightMenu_context_header_user_list_item {
        margin-bottom: 5px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        letter-spacing: 0px;
        .rightMenu_context_header_user_list_avatar {
          width: 40px;
          min-width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid #f46fe0;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }
        .rightMenu_context_header_user_list_user {
          font-family: PingFang TC;
          font-weight: normal;
          font-stretch: normal;
          margin-left: 5px;
          margin-right: auto;
          flex: 1;
          word-break: break-all;
          .rightMenu_context_header_user_list_user_nick {
            font-size: 13px;
            color: #23272b;
          }
          .rightMenu_context_header_user_list_user_name {
            font-size: 11px;
            color: #6c757d;
            display: flex;
            align-items: center;
            justify-content: space-between;
            #copy-input{
              position: absolute;
              z-index: -2;
            }
            span{
              width: 95px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            i{
              padding: 4px;
            }
          }
        }
        .rightMenu_context_header_user_list_check_icon {
          div {
            font-size: 20px;
            font-weight: bold;
            color: #f46fe0;
          }
        }
      }
    }
    .rightMenu_context_header_add_account {
      width: 100%;
      height: 41px;
      margin-left: 5px;
      font-family: PingFang TC;
      font-size: 13px;
      font-weight: normal;
      font-stretch: normal;
      display: flex;
      align-items: center;
      letter-spacing: 0px;
      color: #6c757d;
      .rightMenu_context_header_add_account_icon {
        width: 16px;
        margin-right: 4px;
      }
    }
    .rightMenu_context_header_link {
      border-top: solid 1px #cccccc;
      width: 100%;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      font-family: SF Pro;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #343a40;
      padding: 0 17px;
      .rightMenu_context_header_copy {
        font-family: uicons-regular-rounded;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #6c757d;
      }
    }
  }
  .rightMenu_context_box {
    width: 100%;
    .rightMenu_context_box_i {
      background-color: #fff;
      width: 100%;
      height: 44px;
      padding: 0 17px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      &.rightMenu_context_box_i_t {
        margin-top: 6px;
      }
      .rightMenu_context_box_i_title {
        // height: 20px;
        height: 44px;
        font-family: PingFang TC;
        font-size: 14px;
        font-weight: 700;
        display: flex;
        align-items: center;
        letter-spacing: 0px;
        color: #f46fe0;
      }
      .rightMenu_context_box_i_icon {
        margin-left: auto;
        color: #6c757d;
        font-size: 17px;
      }
    }
  }
}
</style>
