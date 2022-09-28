<template>
  <div :class="['mainHeader_context',zIndex == 999 ? '' : 'mainHeader_context_9999']">
    <div
      @click="onBack"
      v-if="back || pageRouterName == 'userInfo'"
      class="mainHeader_back el-icon-arrow-left"
    ></div>
    <!-- <van-nav-bar :z-index="999" flxed :left-arrow="false" >
    <template #title >-->
    <div v-if="isShowLogo" :style="{marginLeft: back ? '4px' : '8px'}" class="mainHeader_title">
      <img
        @click.stop="onHandleGoHome"
        class="mainHeader_title_img"
        src="@/assets/my/ic-logo-enText@3x.png"
        alt
        srcset
      />
    </div>
    <template>
      <slot name="avatar"></slot>
    </template>
    <!-- 中英文切换组件 -->
    <div
      v-if="!noNeedMenu && pageRouterName == 'my'"
      @click="onHandleLangChange"
      class="mainHeader_lang_text"
    >{{$t('lang.lang')}}</div>
    <!-- </template>
    <template #right >-->
    <div :class="['mainHeader_right',noNeedMenu ? 'mainHeader_right_padding_r' : '']">
      <img
        @click.stop="onHandleShowAmountPopup"
        class="mainHeader_right_img_1"
        src="@/assets/my/ic-money@3x.png"
        alt
        srcset
      />
      <div @click.stop="onHandleShowAmountPopup" class="mainHeader_right_num">{{amount || '0.00'}}</div>
      <img
        v-if="pageRouterName == 'my'"
        class="mainHeader_right_img_1_2"
        src="@/assets/my/ic-location@3x.png"
        alt
        srcset
      />
      <div
        v-if="pageRouterName == 'my'"
        class="mainHeader_right_img_1_2_text"
      >{{ stateName || $t('lang.unknown') }}</div>
      <!-- <img
        @click.stop="goChat"
        class="mainHeader_right_img_2"
        src="@/assets/my/ic-location.png"
        alt
        srcset
        v-if="isShowGoChat"
      /> -->
      <img
        @click.stop="onHandleShowShare"
        class="mainHeader_right_img_2"
        src="@/assets/my/ic-share@3x.png"
        alt
        srcset
        v-if="pageRouterName == 'userInfo' && showShare"
      />
      <img
        @click.stop="onHandleShowRIghtMenu"
        class="mainHeader_right_img_2"
        src="@/assets/my/ic-search@3x.png"
        alt
        srcset
        v-if="!noNeedMenu && pageRouterName == 'my'"
      />
    </div>
    <!-- </template> -->
    <!-- </van-nav-bar> -->
    <!-- 侧边栏 -->
    <RightMenu @close="closeRIghtMenu" :show="showRIghtMenu"></RightMenu>

    <!-- 金额的下拉框 -->
    <NotEnable :isshow="isShowEnable" @closeNotEnable="() => isShowEnable = false"></NotEnable>
    <!-- <AmountPopup  @close="closeAmountPopup" :show="showAmountPopup"></AmountPopup> -->

    <!-- 分享弹框 -->
    <ShareModel @close="closeShare" :show="showSharePopup"></ShareModel>
  </div>
</template>

<script>
import RightMenu from './RightMenu.vue'
import AmountPopup from './AmountPopup.vue'
import NotEnable from './NotEnable.vue'
import ShareModel from './ShareModel.vue'
import userApi from '@/api/user.js'
// 引入gtters计算函数
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'mainHeader',
  components: {
    RightMenu,
    AmountPopup,
    ShareModel,
    NotEnable
  },
  // props:{
  //   pageRouterName
  // },
  data () {
    return {
      langList: [
        {
          value: 'tc',
          name: '繁'
        },
        {
          value: 'cn',
          name: '简'
        },
        {
          value: 'en',
          name: 'EN'
        }
      ],
      activeLang: 2, // 中文和英语的切换  中文为  英文为EN
      zIndex: 999,
      showRIghtMenu: false,
      showAmountPopup: false,
      showSharePopup: false,
      timer: null,
      isShowEnable: false,
      isGoChat: false, // 是否允许前往聊天界面
      uid: '',
      isShowGoChat: false
    }
  },
  computed: {
    ...mapGetters(['model_type', 'user_type', 'amount']),
    ...mapState({
      stateName: state => state.user.stateName,
      userInfo: ({ user }) => user.user_info,
      pageRouterName: state => state.user.route_name, // 当前的routername
      comboSubList: state => state.base.comboSubList // 用户已经订阅的模特套餐列表
    })
  },
  watch: {
    showRIghtMenu (newV, lodV) {
      console.log(newV)
    },
    // 0为互动报告，1为营收报告  2为充值弹框  3为提现弹框
    model_type (newV, oldV) {
      if (newV === 2) {
        this.closeRIghtMenu()
        this.onHandleShowAmountPopup()
      }
    }
  },
  props: {
    // title:{
    //     type:String,
    //     default:'标题'
    // }
    isShowLogo: {
      type: Boolean,
      default: true
    },
    showShare: {
      type: Boolean,
      default: true
    },
    currentSubList: {
      // 当前查看的模特或者MCN的订阅套餐列表
      type: Array,
      default () {
        return []
      }
    },
    isFllow: {
      type: Boolean,
      default: false
    },
    back: {
      type: Boolean,
      default: false
    },
    noNeedMenu: {
      type: Boolean,
      default: false
    },
    isDialog: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    if (this.$route.name == 'userInfo') {
      this.isShowGoChat = true
    } else {
      this.isShowGoChat = false
    }

    this.uid = this.$route.params.uid
    // 获取语言配置的方法
    this.getCurrentLang()
    // 如果当前查看的用户是模特或者MCN用户，则会判断是否已经订阅了套餐  并且还需要关注当前用户
    //   console.log(this.currentSubList)
    // if (this.currentSubList.length > 0) {
    //   this.isSub();
    // } else {
    //   this.isGoChat = false;
    // }
  },
  beforeDestroy () {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  },
  methods: {
    // 返回事件
    onBack () {
      if (this.$route.name === 'ChatDetails') {
        this.$router.push('/information')
        return
      }
      // 如果当前pageRouterName == 'userInfo' 并且在my页面的时候  返回重置当前角色的pageRouterName
      if (this.pageRouterName == 'userInfo') {
        // 修改pageRouterName为my
        // this.$emit('onHandleSetRouterName', 'my');

        this.$store.commit('SET_ROUTE_NAME', 'my')
        // 获取用户信息
        this.$store.dispatch('getProfile')
      }
      this.$router.go(-1)
    },
    // 计算当前查看的模特是否已经被订阅
    isSub () {
      let falg = false
      console.log('已经订阅了的套餐列表和当前模特的套餐列表')
      console.log(this.currentSubList)
      console.log(this.comboSubList)
      for (let index = 0; index < this.currentSubList.length; index++) {
        const element = this.currentSubList[index]
        for (let idx = 0; idx < element.length; idx++) {
          const ele = element[idx]
          if (this.comboSubList.includes(ele.id)) {
            falg = true
          }
        }
      }
      console.log(falg)
      this.isGoChat = falg
    },
    // 通用的popup打开事件的
    commonOpenPopup () {
      if (this.showAmountPopup) {
        this.closeAmountPopup()
        return
      }
      if (this.showSharePopup) {
        this.closeShare()
        return
      }
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.zIndex = 9999
    },
    // 前往聊天页面
    goChat () {
      // return
      const _this = this
      _this.$router.push({
        path: '/ChatDetails',
        query: { id: _this.uid }
      })
    },
    // 分享栏打开事件
    onHandleShowShare () {
      // this.commonOpenPopup();
      this.showSharePopup = true
    },
    // 获取当前的语言本地配置
    getCurrentLang () {
      const _this = this
      const activeLang = localStorage.getItem('locale') || 'en'
      this.langList.forEach((element, idx) => {
        if (activeLang == element.value) {
          _this.activeLang = idx
        }
      })
    },
    // 语言切换事件
    onHandleLangChange () {
      let index = this.activeLang
      if (index >= 2) {
        index = 0
      } else {
        index += 1
      }
      const _this = this
      localStorage.setItem('locale', this.langList[index].value)
      this.$i18n.locale = this.langList[index].value
      this.activeLang = index
      // 添加强制刷新
      window.location.reload()
      // this.$message({
      //   type: "success",
      //   message: _this.$t("lang.save_success")
      // });
    },
    // 分享栏关闭事件
    closeShare () {
      const _this = this
      this.showSharePopup = false
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        _this.zIndex = 999
      }, 2000)
    },
    // 侧边栏关闭事件
    closeRIghtMenu () {
      this.zIndex = 999
      this.showRIghtMenu = !this.showRIghtMenu
    },
    // 侧边栏打开事件
    onHandleShowRIghtMenu () {
      if (this.showAmountPopup) {
        this.closeAmountPopup()
      }
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.zIndex = 999
      this.showRIghtMenu = !this.showRIghtMenu
    },
    // 下拉框的关闭事件
    closeAmountPopup () {
      const _this = this
      this.showAmountPopup = false
      this.$store.commit('OPEN_MENU_MODEL', null)
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        _this.zIndex = 999
      }, 2000)
    },
    // 下拉框的打开事件
    onHandleShowAmountPopup () {
      this.commonOpenPopup()
      this.isShowEnable = true
      // this.showAmountPopup = true;
    },
    // 返回首页
    onHandleGoHome () {
      this.$router.push({ path: '/home' })
    }
  }
}
</script>

<style lang="scss" scoped>
.mainHeader_context {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  background-color: #f1f0ef;
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.1);
  z-index: 999;
  &.mainHeader_context_9999 {
    z-index: 9999;
  }
  .mainHeader_back {
    // margin-left: 16px;
    color: #5a6268;
    font-size: 23px;
    padding: 11px 20px 11px 10px;
  }
  .mainHeader_title {
    width: 104px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    .mainHeader_title_img {
      width: 110px;
      height: 22px;
    }
  }
  .mainHeader_lang_text {
    display: flex;
    align-items: center;
    // margin: 0 13px;
    margin-left: 5px;
    height: 19px;
    font-family: SF Pro Text;
    font-size: 19px;
    font-weight: 400;
    font-stretch: normal;
    // line-height: 19px;
    letter-spacing: 0px;
    color: #f46fe0;
  }
  .mainHeader_right {
    flex: 1;
    // margin-left: 8px;
    // width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    &.mainHeader_right_padding_r {
      padding-right: 10px;
    }
    // justify-content: center;
    // cursor: pointer;
    .mainHeader_right_img_1 {
      margin-left: auto;
      width: 44px;
      height: 44px;
    }
    .mainHeader_right_num {
      //   width: 52px;
      height: 19px;
      font-family: SF Pro Text;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 19px;
      letter-spacing: 0px;
      color: #f46fe0;
    }
    .mainHeader_right_img_1_2 {
      width: 40px;
      height: 40px;
      margin-left: auto;
    }
    .mainHeader_right_img_1_2_text {
      font-family: uicons-regular-rounded;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 22px;
      letter-spacing: 0px;
      color: #6c757d;
      max-width: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .mainHeader_right_img_2 {
      width: 44px;
      height: 44px;
    }
  }
}
</style>
