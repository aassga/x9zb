<template>
  <div class="my_context">
    <MainHeader></MainHeader>
    <!-- 个人信息 -->
    <div class="my_context_user_info">
      <div
        @click="onHandleGoPage('/my',{user_type : 4,target_uid:64})"
        class="my_context_user_info_avatar"
      >
        <el-image class="my_context_user_info_avatar_img" fit="cover" :src="user_info.avatar">
          <div slot="error">
            <img class="my_context_user_info_avatar_img" src="@/assets/my/img-user.jpg" alt srcset />
          </div>
        </el-image>
        <!-- <UpLoadImg/> -->
        <div class="my_context_user_info_avatar_bage">
          <div class="my_context_user_info_avatar_bage_center"></div>
        </div>
      </div>

      <div class="my_context_user_info_box">
        <div class="my_context_user_info_box_i">
          <div class="my_context_user_info_box_i_t">{{user_info.follow || 0}}</div>
          <div class="my_context_user_info_box_i_b">{{$t('lang.following')}}</div>
        </div>
        <div class="my_context_user_info_box_i">
          <div class="my_context_user_info_box_i_line"></div>
          <div class="my_context_user_info_box_i_t">{{user_info.fans || 0}}</div>
          <div class="my_context_user_info_box_i_b">{{$t('lang.fan')}}</div>
        </div>
        <div class="my_context_user_info_box_i">
          <div class="my_context_user_info_box_i_line"></div>
          <div class="my_context_user_info_box_i_t">{{user_info.follow || 0}}</div>
          <div class="my_context_user_info_box_i_b">{{$t('lang.tracking')}}</div>
        </div>
      </div>
    </div>
    <!-- 签名 -->
    <div class="my_context_user_info_text">
      <div class="my_context_user_info_text_name">{{user_info.nick}}</div>
      <div class="my_context_user_info_text_account">@{{user_info.username}}</div>
      <!-- <div class="my_context_user_info_text_link">
        {{user_info.link}}
        <div class="my_context_user_info_text_link_copy el-icon-document-copy" />
      </div>-->
      <div class="my_context_user_info_text_sign">{{user_info.sign}}</div>
    </div>
    <!-- 编辑资料  成为模特 -->
    <div class="my_context_botton">
      <div
        :class="['my_context_botton_l', btn_class_list[user_type - 1]]"
        @click="onHandleAttention"
      >{{user_info.is_follow ? $t('lang.following') :$t('lang.free_follow')}}</div>
      <!-- <div
        @click="onHandleModel"
        :class="['my_context_botton_r', btn_class_list[user_type - 1]]"
      >{{user_type == 1 ? $t('lang.became_model') : $t('lang.set_vip_price')}}</div> -->
    </div>

    <!-- 底部tab -->
    <el-tabs class="my_context_tabs" @tab-click="onHandleTabClick" v-model="tabIndex">
      <el-tab-pane :label="tab_name_list[(user_type - 1) || 0][0]">
        <div class="my_context_tabs_1">
          <div class="my_context_tabs_1_i" v-for="(item,index) in tabImgList" :key="'a' + index">
            <!-- 左上角标志 -->
            <div class="my_context_tabs_1_left_top_icon" v-if="user_type == 2">VIP解锁</div>
            <!-- 右上角标志 -->
            <el-image
              fit="cover"
              :src="require('@/assets/my/fi-rr-credit-card@3x.png')"
              class="my_context_tabs_1_right_top_icon"
              v-if="user_type == 2"
            ></el-image>
            <el-image class="my_context_tabs_1_img" fit="cover" :src="item"></el-image>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="tab_name_list[(user_type - 1) || 0][1]">
        <div class="my_context_tabs_2">
          <div class="my_context_tabs_2_i" v-for="(item,index) in subscribeList" :key="'b' + index">
            <el-image
              @click="onHandleGoPreson"
              class="my_context_tabs_2_img"
              fit="cover"
              :src="item.img"
            ></el-image>
            <div class="my_context_tabs_2_name">{{item.account}}</div>
            <!-- <div class="my_context_tabs_2_vip">
              已成為
              <i>VIP</i>
            </div>
            <div class="my_context_tabs_2_date">
              剩
              <i>{{item.date}}天</i>到期
            </div>-->
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="tab_name_list[(user_type - 1) || 0][2]">
        <div class="my_context_tabs_3">
          <div v-for="(item,index) in payList" :key="'c' + index" class="my_context_tabs_3_box">
            <el-image
              @click="onHandleOpenVideo"
              class="my_context_tabs_3_img"
              fit="cover"
              :src="item"
            ></el-image>
            <div class="my_context_tabs_3_icon el-icon-video-play"></div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 编辑信息弹框 -->
    <editModel
      :birthday="birthday"
      @openDate="openDatePopup"
      :user_info="user_info"
      @submit="onHandleEditSubmit"
      :showEditModel="showEditModel"
      @close="onHandleEdit"
    ></editModel>

    <!-- 订阅价格设定弹框 -->
    <OrderAmoutSet :showModel="showModel" @close="close"></OrderAmoutSet>

    <!-- 互动报告弹框 -->
    <InterReport :showModel="showInterReport" @close="closeInterReport"></InterReport>

    <!-- 提现弹框 -->
    <WithdarwModel @close="closeWithdarwModel" :show="showWithdarwModel"></WithdarwModel>

    <!-- 营收报告弹框 -->
    <RevenueReport :showModel="showRevenueReport" :userInfo="user_info" @close="closeRevenueReport"></RevenueReport>

    <!-- 时间上推框 -->
    <DatePopup :show="showDatePopup" @close="closeDatePopup" @confirm="onHandleDatePopup"></DatePopup>

    <Footer :active="4" />
  </div>
</template>

<script>
import Footer from '@/components/footer/Index.vue'
import OrderAmoutSet from '@/components/my/OrderAmoutSet.vue'
import editModel from '@/components/my/editModel.vue'
import MainHeader from '@/components/header/MainHeader.vue'
import DatePopup from '@/components/popup/DatePopup.vue'
import WithdarwModel from '@/components/header/WithdarwModel.vue'
// 互动报告弹框
import InterReport from '@/components/header/InterReport.vue'
// 营收报告弹框
import RevenueReport from '@/components/header/RevenueReport.vue'

// 引入gtters计算函数
import { mapGetters, mapState } from 'vuex'
// 引入图片上传组件
import UpLoadImg from '@/views/uploadImage/index.vue'

import MyApi from '@/api/my.js'

import userApi from '@/api/user.js'

export default {
  name: 'my-index',
  components: {
    Footer,
    MainHeader,
    OrderAmoutSet,
    DatePopup,
    editModel,
    RevenueReport,
    WithdarwModel,
    InterReport,
    UpLoadImg
  },
  data () {
    return {
      userInfo: {},
      btn_class_list: ['user', 'modal', 'user', 'user'],
      tab_name_list: [
        ['個人貼文', '已訂閱', '已購買'],
        ['全部', '已訂閱', '已購買'],
        ['個人貼文', '已訂閱', '已購買'],
        ['全部', 'VIP套餐包', this.$t('lang.paid_post')]
      ],
      showDatePopup: false, // 时间上推框的显示状态
      birthday: '', // 时间上推框的返回值
      isAtt: false, // 用户是否关注当面视角的用户
      target_uid: null, // 如果是进入他人的个人首页，会携带这个参数 被观看用户的uid
      info: {
        follow: 0,
        avatar: require('@/assets/my/userpic@3x.png'),
        fans: 0,
        likes: 0,
        user_name: 'Casey Boonstra',
        account: '@caseboon',
        link: 'userqpgona89vtg',
        sign: '關注我喔～這是個人自介的區域'
      },
      // tab第一项的list
      tabList1: [],
      // tab第二项的list
      tabList2: [],
      // tab第三项的list
      tabList3: [],
      tabIndex: 0,
      // tab 第一页的图片列表
      tabImgList: [
        // require("@/assets/my/video1@3x.png"),
        // require("@/assets/my/video2@3x.png"),
        // require("@/assets/my/video3@3x.png")
      ],
      // tab 第二页的数据列表
      subscribeList: [
        {
          img: require('@/assets/my/userpic1@3x.png'),
          account: '＠belleouo',
          date: '10'
        },
        {
          img: require('@/assets/my/userpic2@3x.png'),
          account: '＠belleouo',
          date: '23'
        },
        {
          img: require('@/assets/my/userpic2@3x.png'),
          account: '＠belleouo',
          date: '23'
        },
        {
          img: require('@/assets/my/userpic2@3x.png'),
          account: '＠belleouo',
          date: '23'
        },
        {
          img: require('@/assets/my/userpic2@3x.png'),
          account: '＠belleouo',
          date: '23'
        },
        {
          img: require('@/assets/my/userpic2@3x.png'),
          account: '＠belleouo',
          date: '23'
        },
        {
          img: require('@/assets/my/userpic2@3x.png'),
          account: '＠belleouo',
          date: '23'
        }
      ],
      // tab 第三页的数据列表
      payList: [
        require('@/assets/my/video1@3x.png'),
        require('@/assets/my/video2@3x.png'),
        require('@/assets/my/video3@3x.png'),
        require('@/assets/my/video3@3x.png'),
        require('@/assets/my/video3@3x.png'),
        require('@/assets/my/video3@3x.png')
      ],
      // 个人编辑弹框的显示状态
      showEditModel: false,
      // 模特价格编辑弹框的显示状态
      showModel: false,
      // 互动报告弹框的显示状态
      showInterReport: false,
      // 营收报告弹框的显示状态
      showRevenueReport: false,
      // 提现弹框的显示状态
      showWithdarwModel: false
    }
  },
  computed: {
    ...mapGetters(['user_type', 'att_list', 'model_type', 'user']),
    // ...mapState({
    //   userInfo: state => state.user.user_info
    // }),
    user_info () {
      return {
        ...this.info,
        ...this.userInfo
      }
    }
  },
  // 0为互动报告，1为营收报告  2为充值弹框  3为提现弹框
  watch: {
    model_type (newV, oldV) {
      if (newV === 0) {
        this.showInterReport = true
      } else if (newV === 1) {
        this.showRevenueReport = true
      } else if (newV === 3) {
        this.onHandleShowWithdarwModel()
      }
    },
    // 底部tab的索引
    tabIndex (newV, oldV) {
      console.log(newV)
      if (newV == 0 && this.tabList1.length == 0) {
        this.getBuyComboList()
      } else if (newV == 1 && this.tabList2.length == 0) {
        this.getBuyComboList()
      } else if (newV == 2 && this.tabList3.length == 0) {
        this.getBuyPostList()
      }
    }
  },

  created () {
    // 如果当前页面进入的时候携带参数 一般为点击他人个人主页的时候
    if (this.$route.query.user_type) {
      this.target_uid = this.$route.query.target_uid
      this.$store.commit('SET_USER_TYPE', this.$route.query.user_type)
      // 根据项目初始化的时候 获取的用户关注列表  判断当前查看的用户是否在本人的关注列表里
      this.isFllow()
    }

    this.getFansCount()
    this.getAttentionCount()
  },

  methods: {
    getOtherUserInfo (uid) {
      userApi
        .getOtherUserInfo(uid)
        .then(res => {
          this.userInfo = res.data[0]
        })
    },
    // tab的点击事件
    onHandleTabClick (value) {
      // console.log(value.index)
    },
    // 点击去到个人主页
    onHandleGoPreson (uid) {
      this.$message({
        type: 'success',
        message: '暂未开放~'
      })
    },
    // 点击播放视频或者放大贴文
    onHandleOpenVideo () {
      this.$message({
        type: 'success',
        message: '暂未开放~'
      })
    },
    // 获取已订阅模特列表
    getBuyComboList () {
      this.$store.dispatch('getBuyCombo').then(res => {
        if (res.status == 200) {
          console.log(res)
        }
      })
    },
    // 获取已购买贴文列表
    getBuyPostList () {
      this.$store.dispatch('getBuyPost').then(res => {
        if (res.status == 200) {
          console.log(res)
        }
      })
    },
    // 获取关注数的请求
    getAttentionCount () {
      const _this = this
      // 获取他人关注数
      if (this.user_type == 4) {
        this.$store
          .dispatch('getOtherAttentionCount', { target_uid: this.target_uid })
          .then(res => {
            // console.log(res)
            if (res.status == 200) {
              _this.info.follow = _this.$common.convertNumber(res.data.count)
            }
          })
      } else {
        this.$store.dispatch('getAttentionCount').then(res => {
          // console.log(res)
          if (res.status == 200) {
            _this.info.follow = _this.$common.convertNumber(res.data.count)
          }
        })
      }
    },
    // 获取粉丝数的请求
    getFansCount () {
      const _this = this
      // 获取他人粉丝数
      if (this.user_type == 4) {
        this.$store
          .dispatch('getOtherFansCount', { target_uid: this.target_uid })
          .then(res => {
            // console.log(res)
            if (res.status == 200) {
              _this.info.fans = _this.$common.convertNumber(res.data.count)
            }
          })
      } else {
        this.$store.dispatch('getFansCount').then(res => {
          // console.log(res)
          if (res.status == 200) {
            _this.info.fans = _this.$common.convertNumber(res.data.count)
          }
        })
      }
    },
    // 时间选择器的确定事件
    onHandleDatePopup (date) {
      console.log(date)
      this.birthday = this.$common.dateFormat(date)
      this.showDatePopup = false
    },
    // 时间选择器打开事件
    openDatePopup () {
      this.showDatePopup = true
      console.log('my打开')
    },
    // 时间选择器的关闭事件
    closeDatePopup () {
      console.log('my关闭')
      this.showDatePopup = false
    },
    // 提现弹框打开事件
    onHandleShowWithdarwModel () {
      console.log('提现弹框')
      this.showWithdarwModel = true
    },
    // 提现弹框关闭事件
    closeWithdarwModel () {
      this.$store.commit('OPEN_MENU_MODEL', null)
      this.showWithdarwModel = false
    },
    // 关注按钮的点击
    onHandleAttention () {
      // 如果已经关注了用户  则是取消关注
      if (this.isAtt) {
        this.delAttention()
        this.getOtherUserInfo(uid)
      } else {
        this.addAttention()
        this.getOtherUserInfo(uid)
      }
    },
    // 添加关注请求
    addAttention () {
      const _this = this
      const uid = this.$route.params.uid
      this.$store
        .dispatch('addAttention', {
          target_uid: uid
        })
        .then(res => {
          if (res.status == 200) {
            // 将当前用户ID传入已关注的列表里
            const list = _this.att_list || []
            list.push({ target_uid: _this.target_uid })
            _this.$store.commit('SET_ATT_LIST', list)
            _this.isAtt = true
            _this.$message({
              type: 'success',
              message: '关注成功~'
            })
          }
        })
    },
    // 取消关注请求
    delAttention () {
      const _this = this
      const uid = this.$route.params.uid
      this.$store
        .dispatch('delAttention', {
          target_uid: uid
        })
        .then(res => {
          console.log(res)
          if (res.status == 200) {
            // 将当前用户ID在已关注的列表里删除
            const list = _this.att_list || []
            list.forEach((element, index, array) => {
              if (element.uid == _this.target_uid) {
                array.splice(index, 1)
              }
            })
            _this.$store.commit('SET_ATT_LIST', list)
            _this.isAtt = false
            _this.$message({
              type: 'warning',
              message: '已取消关注~'
            })
          }
        })
    },
    // 用户是否关注当前查看的用户
    isFllow () {
      const _this = this
      const list = this.att_list || []
      list.forEach((element, index) => {
        if (element.uid == _this.target_uid) {
          _this.isAtt = true
        }
      })
    },
    // 将弹框挂载到组件元素下
    getContainer () {
      return document.querySelector('.my_context')
    },
    // 编辑个人资料的关闭弹框事件
    onHandleEdit () {
      this.showEditModel = !this.showEditModel
    },
    // 编辑个人资料的提交事件
    onHandleEditSubmit (obj, username) {
      const _this = this
      // 检查是否修改了用户账号  这是单独的请求，如果没有更改则不需要请求
      // if (username != _this.user_info.username) {
      //   this.$store.dispatch("putUsername", {
      //     username: username
      //   }).then(res=>{
      //        if (res.status == 200) {
      //       _this.$store.dispatch("delProfileCache");
      //     }
      //   });
      // }
      // 修改用户资料
      this.$store
        .dispatch('putProfile', {
          ...obj
        })
        .then(res => {
          if (res.status == 200) {
            _this.onHandleEdit()
            _this.$message({
              type: 'success',
              message: '修改成功~'
            })
            _this.$store.dispatch('delProfileCache')
          }
        })
    },
    // 页面跳转事件
    onHandleGoPage (path, query = {}) {
      console.log(1)
      this.$router.push({ path, query })
    },
    // 成为模特页面
    onHandleModel () {
      if (this.user_type == 1) {
        this.$router.push({ path: '/RegisterModel' })
      } else {
        this.showModel = true
      }
    },
    // 关闭模特价格订阅弹框
    close () {
      this.showModel = false
    },
    // 关闭互动报告弹框
    closeInterReport () {
      this.showInterReport = false
      this.$store.commit('OPEN_MENU_MODEL', null)
    },
    // 关闭营收报告弹框
    closeRevenueReport () {
      this.showRevenueReport = false
      this.$store.commit('OPEN_MENU_MODEL', null)
    },
    getMyGuide () {
      MyApi.myGuide(0, 10).then(res => {
        const tabImgList = res.data.models
        this.tabImgList = tabImgList.map(item => {
          return item.preview
        })
      })
    }
  },
  mounted () {
    this.getMyGuide()
    const uid = this.$route.params.uid
    this.getOtherUserInfo(uid)
  }
}
</script>

<style lang="scss">
.my_context {
  padding-top: 44px;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: #fff;
  min-height: 100vh;
  padding-bottom: 50px;
  box-sizing: border-box;
  position: relative;
  .my_context_user_info {
    display: flex;
    width: 100%;
    padding: 0 17px;
    margin-top: 18px;
    height: 78px;
    align-items: center;
    box-sizing: border-box;
    .my_context_user_info_avatar {
      margin-left: 6px;
      width: 62px;
      height: 62px;
      border-radius: 50%;
      background-color: #f46fe0;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      .my_context_user_info_avatar_img {
        width: 58px;
        height: 58px;
        border-radius: 50%;
      }
      .my_context_user_info_avatar_bage {
        position: absolute;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        .my_context_user_info_avatar_bage_center {
          width: 13px;
          height: 13px;
          background-color: #35eb5f;

          border-radius: 50%;
        }
      }
    }
    .my_context_user_info_box {
      margin-left: 18px;
      width: 254px;
      height: 78px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .my_context_user_info_box_i {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        .my_context_user_info_box_i_line {
          position: absolute;
          left: 0;
          top: 14px;
          width: 1px;
          height: 20px;
          background-color: #6c757d;
        }
        .my_context_user_info_box_i_t {
          height: 22px;
          font-family: PingFang SC;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 22px;
          letter-spacing: 0px;
          color: #f46fe0;
        }
        .my_context_user_info_box_i_b {
          height: 20px;
          font-family: PingFang TC;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 20px;
          letter-spacing: 0px;
          color: #6c757d;
        }
      }
    }
  }
  .my_context_user_info_text {
    margin-top: 7px;
    width: 100%;
    padding: 0 17px;
    box-sizing: border-box;
    .my_context_user_info_text_name {
      display: flex;
      align-items: center;
      height: 16px;
      font-family: SF Pro Text;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #6c757d;
    }
    .my_context_user_info_text_account {
      margin-top: 4px;
      display: flex;
      align-items: center;
      height: 14px;
      font-family: SF Pro Text;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #6c757d;
    }
    .my_context_user_info_text_link {
      margin-top: 4px;
      height: 14px;
      font-family: SF Pro;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 22px;
      letter-spacing: 0px;
      color: #6c757d;
      display: flex;
      align-items: center;
    }
    .my_context_user_info_text_link_copy {
      margin-left: 7px;
      width: 16px;
      height: 17px;
      font-family: uicons-solid-rounded;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 22px;
      letter-spacing: 0px;
      color: #6c757d;
    }
    .my_context_user_info_text_sign {
      display: flex;
      align-items: center;
      margin-top: 12px;
      height: auto;
      overflow-y: auto;
      font-family: PingFang TC;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #343a40;
    }
  }
  .my_context_botton {
    margin-top: 57px;
    margin-bottom: 30px;
    width: 100%;
    padding: 0 17px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .my_context_botton_l {
      width: 166px;
      height: 36px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: PingFang TC;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 2px;
      color: #ffffff;
      &.user {
        background-image: linear-gradient(90deg, #f46fe0 0%, #f8a9ec 100%);
      }
      &.modal {
        background-color: #82b1fd;
      }
    }
    .my_context_botton_r {
      width: 166px;
      height: 36px;

      &.user {
        background-image: linear-gradient(
          316deg,
          #efdd05 0%,
          #03d5e6 46%,
          #f26fe1 100%
        );
      }
      &.modal {
        background-color: #82b1fd;
      }
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: PingFang TC;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 2px;
      color: #ffffff;
    }
  }
  .my_context_tabs {
    width: 100%;
    .el-tabs__header {
      margin: 0;
    }
    .el-tabs__active-bar {
      display: none;
    }
    .el-tabs__nav {
      width: 100%;
      display: flex;
      justify-content: space-around;
      padding: 0 20px;
      box-sizing: border-box;
      border-top: solid 1px rgba(176, 181, 184, 0.4);
      // border-bottom: solid 1px rgba(176, 181, 184, 0.4);
      .el-tabs__active-bar {
        background-color: #f46fe0;
      }
      .el-tabs__item {
        flex: 1;
        padding: 0 !important;
        display: flex;
        align-items: center;
        justify-content: center;
        &.is-active {
          border-bottom: 2px solid #f46fe0;
          // background-color: #f46fe0;
        }
      }
    }
    .el-tabs__item:hover {
      color: #f46fe0;
    }
    .el-tabs__item.is-active {
      color: #f46fe0;
    }
    // height: 70px;
    .my_context_tabs_1 {
      margin-top: 27px;
      width: 100%;
      // height: 108px;
      padding: 0 17px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      // justify-content: space-between;
      .my_context_tabs_1_i {
        position: relative;
        width: 108px;
        height: 108px;
        margin-right: 7px;
        margin-top: 5px;
        &:nth-child(3n) {
          margin-right: 0;
        }
        .my_context_tabs_1_left_top_icon {
          z-index: 9;
          position: absolute;
          top: 0;
          left: 0;
          background-image: linear-gradient(90deg, #f46fe0 0%, #f8a9ec 100%);
          // width: 36px;
          padding: 0 2px;
          height: 14px;
          font-family: PingFang TC;
          font-size: 8px;
          border-radius: 2px;
          font-weight: normal;
          font-stretch: normal;
          display: flex;
          align-items: center;
          justify-content: center;
          letter-spacing: 0px;
          color: #ffffff;
        }
        .my_context_tabs_1_right_top_icon {
          z-index: 9;
          position: absolute;
          top: 0;
          right: 0;
          width: 16px;
          height: 16px;
        }
        .my_context_tabs_1_img {
          width: 108px;
          height: 108px;
          border-radius: 4px;
        }
      }
    }
    .my_context_tabs_2 {
      margin-top: 27px;
      width: 100%;
      // height: 113px;
      padding: 0 17px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .my_context_tabs_2_i {
        width: 78px;
        height: 113px;
        margin-right: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        &:nth-child(4n) {
          margin-right: 0;
        }
        .my_context_tabs_2_img {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          border: #f46fe0 2px solid;
        }
        .my_context_tabs_2_name {
          height: 17px;
          font-family: SF Pro Text;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 22px;
          letter-spacing: 0px;
          color: #6c757d;
        }
        .my_context_tabs_2_vip {
          height: 17px;
          font-family: SF Pro Text;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 22px;
          letter-spacing: 0px;
          color: #6c757d;
          > i {
            font-style: normal;
            color: #f46fe0;
          }
        }
        .my_context_tabs_2_date {
          height: 17px;
          font-family: SF Pro Text;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 22px;
          letter-spacing: 0px;
          color: #6c757d;
          > i {
            font-style: normal;
            color: #82b1fd;
          }
        }
      }
    }
    .my_context_tabs_3 {
      margin-top: 27px;
      width: 100%;
      padding: 0 17px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      // justify-content: space-between;
      .my_context_tabs_3_box {
        width: 110px;
        height: 110px;
        position: relative;
        margin-right: 5px;
        &:nth-child(3n) {
          margin-right: 0;
        }
        .my_context_tabs_3_img {
          width: 108px;
          height: 108px;
          border-radius: 4px;
        }
        .my_context_tabs_3_icon {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: #fff;
          font-size: 31px;
        }
      }
    }
  }
}
</style>
