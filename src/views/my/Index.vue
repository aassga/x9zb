<template>
  <div class="my_context">
    <MainHeader
      :currentSubList="current_info.mcn_data && current_info.mcn_data.combo_data ? current_info.mcn_data.combo_data : []"
      :isFllow="isAtt"
      :uid="current_info.uid"
      :isDialog="current_info.is_dialog"
    ></MainHeader>
    <!-- 个人信息 -->
    <div class="my_context_user_info">
      <!-- @click="onHandleGoPage('/my',{user_type : 4,target_uid:64})" -->
      <div class="my_context_user_info_avatar">
        <el-image class="my_context_user_info_avatar_img" fit="cover" :src="current_info.avatar">
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
          <div class="my_context_user_info_box_i_t">{{current_info.post || 0}}</div>
          <div class="my_context_user_info_box_i_b">{{$t('lang.post')}}</div>
        </div>
        <div class="my_context_user_info_box_i" @click="goDetail('/fans')">
          <div class="my_context_user_info_box_i_line"></div>
          <div class="my_context_user_info_box_i_t">{{current_info.fans || 0}}</div>
          <div class="my_context_user_info_box_i_b">{{$t('lang.fan')}}</div>
        </div>
        <div class="my_context_user_info_box_i" @click="goDetail('/attentionDetail')">
          <div class="my_context_user_info_box_i_line"></div>
          <div class="my_context_user_info_box_i_t">{{current_info.follow || 0}}</div>
          <div class="my_context_user_info_box_i_b">{{$t('lang.tracking')}}</div>
        </div>
      </div>
    </div>
    <!-- 签名 -->
    <div class="my_context_user_info_text">
      <div class="my_context_user_info_text_name">
        {{current_info.nick}}
        <img v-if="pageRouterName == 'userInfo'" @click="goChat" class="chat_icon" src="@/assets/my/ic-location.png" alt srcset/>
      </div>
      <div class="my_context_user_info_text_account">{{current_info.username}}</div>
      <!-- <div class="my_context_user_info_text_link">
        {{user_info.link}}
        <div class="my_context_user_info_text_link_copy el-icon-document-copy" />
      </div>-->
      <div class="my_context_user_info_text_sign">{{current_info.sign}}</div>
      <!-- <div class="my_context_user_info_text_translate">翻譯</div> -->
      <!-- <div class="my_context_user_info_text_sign">dusgfweiubib时刻将不断升级吧里看电视巴萨的几率比VB第三课纪律表vbdskvjb十点半数据库表是不是架空地板打开举报ujvbdl1sdlkvbjdsldsbj1222sbdskb看世界杯时的脚步收到货大家都VB设备设定VB大V不断深V环境不断升级了深V不是打击恐怖VS大V见不到深V大傻逼卡到了科技部卡为了本微博句问卡而为合并V领11圣诞节遍地都是VB不卡我快被我块交论文VB了我VB俄里翁1</div> -->
    </div>

    <!-- 编辑资料  成为模特 -->
    <div class="my_context_botton">
      <div
        v-if="pageRouterName == 'userInfo'"
        :class="['my_context_botton_l',isAtt ? 'isSet' :  btn_class_list[current_type - 1]]"
        @click="onHandleAttention"
      >{{isAtt ? $t('lang.following') :$t('lang.free_follow')}}</div>
      <div
        v-else
        @click="onHandleEdit"
        :class="['my_context_botton_l', btn_class_list[current_type - 1]]"
      >{{$t('lang.edit_profile')}}</div>
      <!-- 成为模特 订阅价格设置按钮 -->
      <div
        v-if="current_type != 4"
        @click="onHandleModel"
        :class="['my_context_botton_r',isSet ? 'isSet' : current_info.model_audit_status ==  0 ? 'isAudit' :  btn_class_list[current_type - 1]]"
      >{{current_type == 1 ? $t(became_model_list_text[current_info.model_audit_status == 0 ? 1 : 0]) : ( isSet ? $t('lang.seted_vip_price') : $t('lang.set_vip_price')) }}</div>
      <!-- 三方视角显示套餐按钮 -->
      <div
        v-if="current_type == 4 && current_info.mcn_data && current_info.mcn_data.usertype == 2"
        @click="onHandleLookSet"
        :class="['my_context_botton_r', btn_class_list[current_type - 1]]"
      >
        {{$t('lang.vip_sub')}}
        <div
          :class="['rightMenu_context_header_user_icon el-icon-caret-right',openUserList ? '' : 'rightMenu_context_header_user_icon_close']"
        ></div>
      </div>
    </div>

    <!-- 套餐订阅计划的三方视角展示 -->
    <PriceTranslate
      @openInfo="onHandleOpenSetInfo"
      :list="current_info.mcn_data && current_info.mcn_data.combo_data ? current_info.mcn_data.combo_data : []"
      v-if="openUserList"
    ></PriceTranslate>

    <!-- 底部tab -->
    <el-tabs class="my_context_tabs" @tab-click="onHandleTabClick" v-model="tabIndex">
      <el-tab-pane :label="tab_name_list[(current_type - 1) || 0][0]">
        <div v-if="pageRouterName == 'my'" class="my_context_tabs_1">
          <PostItem
            :pageRouterName="pageRouterName"
            :isunlock="true"
            :items="item"
            :index="index"
            @onPostLock="onPostLock"
            @onSubLock="onSubLock"
            v-for="(item,index) in tabImgList"
            :key="'a' + index"
          ></PostItem>
        </div>
        <div v-else class="my_context_tabs_1">
          <PostItem
            :uid="target_uid"
            :isunlock="true"
            :pageRouterName="pageRouterName"
            :items="item"
            :index="index"
            @onPostLock="onPostLock"
            @onSubLock="onSubLock"
            v-for="(item,index) in tabImgList"
            :key="'b' + index"
          ></PostItem>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="tab_name_list[(current_type - 1) || 0][1]">
        <div v-if="pageRouterName == 'my'" class="my_context_tabs_2">
          <div class="my_context_tabs_2_i" v-for="(item,index) in subscribeList" :key="'b' + index">
            <el-image
              @click="onHandleGoPreson(item.uid)"
              class="my_context_tabs_2_img"
              fit="cover"
              :src="item.avatar"
            ></el-image>
            <div class="my_context_tabs_2_name">{{item.username}}</div>
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
        <div v-else-if="!openPosts" class="my_context_tabs_1">
          <BuySubPostItem
            :items="item"
            @openPosts="onHandleOpenPosts"
            @onLock="onHandleOpenUnsubPost"
            :index="index"
            v-for="(item,index) in subscribeList"
            :key="index"
          ></BuySubPostItem>
        </div>
        <div v-else class="my_context_tabs_1">
          <div @click="openPosts = false" class="my_context_tabs_1_i">
            <div class="my_context_tabs_1_i_back">
              <div class="my_context_tabs_1_i_back_icon icon-arrow-left"></div>返回套餐
            </div>
          </div>
          <BuyPostItem
            :isunlock="true"
            :items="item"
            :index="index"
            @onLock="onHandleOpenUnlockPost"
            v-for="(item,index) in openPostsList"
            :key="index"
          ></BuyPostItem>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="tab_name_list[(current_type - 1) || 0][2]">
        <div v-if="pageRouterName == 'my'" class="my_context_tabs_3">
          <!-- <div v-for="(item,index) in payList" :key="'c' + index" class="my_context_tabs_3_box">
            <el-image
              @click="onHandleOpenVideo"
              class="my_context_tabs_3_img"
              fit="cover"
              :src="item.preview"
            ></el-image>
            <div class="my_context_tabs_3_icon el-icon-video-play"></div>
          </div>-->
          <PostItem
            :pageRouterName="pageRouterName"
            :isunlock="false"
            :items="item"
            :index="index"
            @onPostLock="onPostLock"
            @onSubLock="onSubLock"
            v-for="(item,index) in payList"
            :key="'c' + index"
          ></PostItem>
        </div>
        <div v-else class="my_context_tabs_2">
          <BuyPostItem
            :items="item"
            :index="index"
            @onLock="onHandleOpenUnlockPost"
            v-for="(item,index) in payList"
            :key="index"
          ></BuyPostItem>
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
    <OrderAmoutSet @changeSet="isSet = true" :isSet="isSet" :showModel="showModel" @close="close"></OrderAmoutSet>

    <!-- 互动报告弹框 -->
    <InterReport :showModel="showInterReport" @close="closeInterReport"></InterReport>

    <!-- 提现弹框 -->
    <WithdarwModel @close="closeWithdarwModel" :show="showWithdarwModel"></WithdarwModel>

    <!-- 营收报告弹框 -->
    <template v-if="showRevenueReport">
      <RevenueReport
        :showModel="showRevenueReport"
        :userInfo="user_info"
        @close="closeRevenueReport"
      ></RevenueReport>
    </template>

    <!-- 订阅套餐详情弹框 -->
    <PriceTranslateModel :list="setInfoData" :showModel="showSetInfo" @close="showSetInfo = false"></PriceTranslateModel>

    <!-- 时间上推框 -->
    <DatePopup :show="showDatePopup" @close="closeDatePopup" @confirm="onHandleDatePopup"></DatePopup>

    <Footer v-if="pageRouterName == 'my'" :active="4" />
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
// 套餐订阅计划组件
import PriceTranslate from '@/components/my/PriceTranslate.vue'
// 套餐订阅计划详情弹框
import PriceTranslateModel from '@/components/my/PriceTranslateModel.vue'
// 第三方视角  套餐帖文列表的套餐子组件
import BuySubPostItem from '@/components/my/BuySubPostItem.vue'
// 第三方视角  付费帖文列表的套餐子组件
import BuyPostItem from '@/components/my/BuyPostItem.vue'
// 普通帖文组件
import PostItem from '@/components/my/PostItem.vue'
// 引入gtters计算函数
import { mapGetters, mapState } from 'vuex'
// 引入图片上传组件
// import UpLoadImg from "@/views/uploadImage/index.vue";

import MyApi from '@/api/my.js'
import UserApi from '@/api/user.js'

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
    PriceTranslate,
    PriceTranslateModel,
    BuySubPostItem,
    BuyPostItem,
    PostItem
    // UpLoadImg
  },
  data () {
    return {
      btn_class_list: ['user', 'modal', 'user', 'user'],
      tab_name_list: [
        [
          this.$t('lang.personal_post'),
          this.$t('lang.subscribled'),
          this.$t('lang.bought')
        ], // "個人貼文", "已訂閱", "已購買"
        [
          this.$t('lang.personal_post'),
          this.$t('lang.subscribled'),
          this.$t('lang.bought')
        ], // "個人貼文", "已訂閱", "已購買"
        [
          this.$t('lang.personal_post'),
          this.$t('lang.subscribled'),
          this.$t('lang.bought')
        ], // "個人貼文", "已訂閱", "已購買"
        [
          this.$t('lang.all'),
          this.$t('lang.vip_package'),
          this.$t('lang.paid_post')
        ] // "全部", "VIP套餐包", "付費貼文"
      ],
      other_tab_name_list: [
        // 第三方视角下用户的tab列表
      ],
      showDatePopup: false, // 时间上推框的显示状态
      birthday: '', // 时间上推框的返回值
      isAtt: false, // 用户是否关注当面视角的用户
      target_uid: null, // 如果是进入他人的个人首页，会携带这个参数 被观看用户的uid
      openUserList: false, // 订阅套餐计划的开关状态
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
      // 是否已经设置了订阅套餐
      isSet: false,
      // 订阅套餐详情的显示状态
      showSetInfo: false,
      // 订阅套餐详情的数据
      setInfoData: [],
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
      // 成为模特按钮的文本
      became_model_list_text: ['lang.became_model', 'lang.audit_ing'],
      // tab 第二页的数据列表
      subscribeList: [],
      // tab 第三页的数据列表
      payList: [],
      // 个人编辑弹框的显示状态
      showEditModel: false,
      // 模特价格编辑弹框的显示状态
      showModel: false,
      // 互动报告弹框的显示状态
      showInterReport: false,
      // 营收报告弹框的显示状态
      showRevenueReport: false,
      // 提现弹框的显示状态
      showWithdarwModel: false,
      // 第三方视角，订阅套餐帖文的展开状态
      openPosts: false,
      // 第三方视角，订阅套餐帖文的数组
      openPostsList: [],
      // 当前页面的路由
      // pageRouterName:'my'
      // 当前在查看的用户的信息
      current_info: {}
    }
  },
  computed: {
    // newImage
    ...mapGetters(['user_type', 'att_list', 'model_type', 'user']),
    ...mapState({
      userInfo: state => state.user.user_info,
      comboList: state => state.base.comboList, // 用户已经订阅的模特
      postList: state => state.base.postList, // 用户已经购买的贴文
      comboSubList: state => state.base.comboSubList, // 用户已经订阅的模特套餐列表
      pageRouterName: state => state.user.route_name // 用户当前的页面路由的name
    }),
    user_info () {
      return {
        ...this.info,
        ...this.userInfo
      }
    },
    // 用户的类型  一般情况下为vuex内的usertype，在用户进入他人个人中心的时候会变为4
    current_type () {
      if (this.pageRouterName == 'my') {
        return this.user_type
      } else {
        return 4
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
    userInfo (newV, oldV) {
      this.current_info = { ...this.current_info, ...newV }
    },
    // 监控$router的路由变化
    $route (to, form) {
      this.tabImgList = []
      this.payList = []
      this.subscribeList = []
      this.openPostsList = []
      // 如果当前页面进入的时候携带参数 一般为点击他人个人主页的时候
      if (this.$route.name == 'userInfo') {
        this.$store.commit('SET_ROUTE_NAME', 'userInfo')
        // this.pageRouterName = this.$route.name;
        this.target_uid = this.$route.params.uid
        if (this.target_uid) {
          // 获取当前查看的用户信息
          this.getCurrentInfo([this.target_uid])
          // this.$store.commit("SET_USER_TYPE", this.$route.query.user_type);
          // 根据项目初始化的时候 获取的用户关注列表  判断当前查看的用户是否在本人的关注列表里
          this.isFllow()
        } else {
          this.$message({
            type: 'success',
            message: '用户缺少uid~'
          })
        }
      } else {
        this.current_info = this.user_info
        // 获取购买的贴文列表
        this.getBuyPostList()
        // 获取订阅的模特列表
        this.getBuyComboList()
      }

      this.$store.commit('SET_CURRENT_ROUTE_NAME', 'my')

      // 获取当前用户配置的套餐
      const comboList =
        this.current_info.mcn_data && this.current_info.mcn_data.combo_data
          ? this.current_info.mcn_data.combo_data
          : []

      if (comboList && comboList.length > 0) {
        // this.comboList = comboList;
        this.isSet = true
      }

      console.log(this.isSet)
      this.getMyselfAllPostList()
      this.getFansCount()
      this.getAttentionCount()
    }
    // 底部tab的索引
    // tabIndex(newV, oldV) {
    //   console.log(newV);
    //   if (newV == 0 && this.tabList1.length == 0) {
    //     // this.getBuyComboList();
    //   } else if (newV == 1 && this.tabList2.length == 0) {
    //     // this.getBuyComboList();
    //   } else if (newV == 2 && this.tabList3.length == 0) {
    //     // this.getBuyPostList();
    //   }
    // }
  },

  created () {
    // 如果当前页面进入的时候携带参数 一般为点击他人个人主页的时候
    if (this.$route.name == 'userInfo') {
      this.$store.commit('SET_ROUTE_NAME', 'userInfo')
      // this.pageRouterName = this.$route.name;
      this.target_uid = this.$route.params.uid
      if (this.target_uid) {
        // 获取当前查看的用户信息
        this.getCurrentInfo([this.target_uid])
        // this.$store.commit("SET_USER_TYPE", this.$route.query.user_type);
        // 根据项目初始化的时候 获取的用户关注列表  判断当前查看的用户是否在本人的关注列表里
        this.isFllow()
      } else {
        this.$message({
          type: 'success',
          message: '用户缺少uid~'
        })
      }
    } else {
      this.current_info = this.user_info
      // 获取购买的贴文列表
      this.getBuyPostList()
      // 获取订阅的模特列表
      this.getBuyComboList()
    }

    this.$store.commit('SET_CURRENT_ROUTE_NAME', 'my')

    // 获取当前用户配置的套餐
    const comboList =
      this.current_info.mcn_data && this.current_info.mcn_data.combo_data
        ? this.current_info.mcn_data.combo_data
        : []

    if (comboList && comboList.length > 0) {
      // this.comboList = comboList;
      this.isSet = true
    }

    console.log(this.isSet)
    this.getMyselfAllPostList()
    this.getFansCount()
    this.getAttentionCount()
  },
  methods: {
    // tab的点击事件
    onHandleTabClick (value) {
      // console.log(value.index)
    },
    // 获取当前查看的用户的信息
    getCurrentInfo (uidList) {
      const _this = this
      // 获取用户基本信息
      this.$store.dispatch('getOtherProfile', { uids: uidList }).then(data => {
        console.log(data[0][0])
        // if (res[0].status == 200) {
        _this.current_info = { ..._this.current_info, ...data[0][0] }
        if (
          _this.current_info.mcn_data.usertype == 2 ||
          _this.current_info.mcn_data.usertype == 3
        ) {
          // 获取的模特套餐列表  三方视角
          _this.getOtherSubCombo()
          // 获取 模特 的所有付费贴文  三方视角
          _this.getComboPost()
        }
        _this.isAtt = data[0][0].is_follow
        // }
      })
    },
    // 開啟聊天
    goChat () {
      this.$router.push({
        path: '/ChatDetails',
        query: { id: this.target_uid }
      })
    },
    // 伸展订阅套餐计划
    onHandleSwitchUser () {
      this.openUserList = !this.openUserList
    },
    // 点开用户的订阅套餐详情弹框
    onHandleOpenSetInfo (item) {
      console.log(item)
      this.setInfoData = item
      this.showSetInfo = true
    },
    // 点击去到个人主页
    onHandleGoPreson (uid) {
      // this.$message({
      //   type: "success",
      //   message: "暂未开放~"
      // });
      if (uid) {
        if (this.userInfo.uid == uid) {
          this.$router.push({ path: '/my' })
        } else {
          this.$router.push({ path: '/userInfo/' + uid })
        }
      } else {
        this.$message({
          type: 'success',
          message: '用户缺少uid~'
        })
      }
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
      const _this = this
      this.$store.dispatch('getBuyCombo').then(res => {
        console.log('已订阅的模特列表')
        console.log(res)
        if (res && res.length > 0) {
          // console.log('已订阅的模特列表');
          // console.log(res);
          _this.subscribeList = res[0]
        }
      })
    },
    // 获取已购买贴文列表
    getBuyPostList () {
      const _this = this
      this.$store.dispatch('getBuyPost').then(res => {
        if (res.status == 200) {
          console.log('已购买的贴文列表')
          console.log(res)
          _this.payList = res.data.models
        }
      })
    },
    // 获取的模特套餐列表  三方视角
    async getOtherSubCombo () {
      const _this = this
      const res = await this.$store.dispatch('getOtherSubCombo', {
        uid: this.target_uid
      })

      if (res.status == 200) {
        console.log('模特的套餐列表 三方视角')
        console.log(res.data.models)
        const list = []
        // 获取到的模特套餐列表轮询拿到所有的套餐贴文列表
        for (let index = 0; index < res.data.models.length; index++) {
          const element = res.data.models[index]
          element.date = element.starttime.split(' ')[0] + '~' + element.endtime.split(' ')[0]
          // let postres = await this.$store.dispatch("getOtherSubPosts", {
          //   sub_id: element.id
          // });
          // console.log("模特的套餐列表内的贴文 三方视角");
          // console.log(postres);
          // if (postres.status == 200) {
          //   postres.data.models.forEach(ele => {
          //     let date =
          //   element.starttime.split(" ")[0] +
          //   "~" +
          //   element.endtime.split(" ")[0];
          //     list.push({
          //       ...element,
          //       date,
          //       tid:ele
          //     })
          //   });
          // }
          list.push(element)
        }
        _this.subscribeList = list
      }
    },
    // 获取 模特 的所有付费贴文  三方视角
    async getComboPost () {
      const _this = this
      await this.$store
        .dispatch('getComboPost', { uid: this.target_uid })
        .then(res => {
          if (res.status == 200) {
            console.log('模特的贴文列表 三方视角')
            console.log(res.data.models)
            _this.payList = res.data.models
            // let pids = [];

            // for (let index = 0; index < res.data.models.length; index++) {
            //   const element = res.data.models[index];
            //   pids.push(element.pid);
            // }
            // console.log(pids);
            // // 根据贴文列表返回的ID获取贴文
            // this.$store.dispatch("postData", pids).then(rep => {
            //   console.log("模特的付费贴文详情  三方视角");
            //   console.log(rep);
            // });
            // _this.payList = res.data.models;
          }
        })
    },
    // 点击购买解锁帖子
    onHandleOpenUnlockPost (item, index) {
      const _this = this
      const items = item
      this.$alert(this.$t('lang.unblock_the_post').replace(/(.*){%}/, '$1' + items.mcnitem_price), this.$t('lang.Notice'), {
        center: true,
        showCancelButton: true,
        confirmButtonText: this.$t('lang.sure'),
        cancelButtonText: this.$t('lang.dialog_btn_cancel'),
        confirmButtonClass: 'dynamicconfirmButtonClass',
        cancelButtonClass: 'dynamiccancelButtonClass',
        customClass: 'dynamiccustomClass'
      }).then(res => {
        _this.$store.dispatch('putBuyPost', { tid: items.tid }).then(res => {
          console.log(res)
          if (res.status == 200) {
            const list = _this.payList
            list[index].isunlock = true
            _this.payList = JSON.parse(JSON.stringify(list))
            // _this.$store.dispatch("geHomePost");
            const postList = _this.postList
            postList.push(items.tid)
            console.log(postList)
            _this.$store.commit('SET_POST_LIST', postList)
            _this.$message({
              type: 'success',
              message: res.message
            })
          }
        })
      })
    },
    // 订阅该VIP
    onHandleOpenUnsubPost (item, index) {
      const _this = this
      const items = item
      this.$alert(this.$t('lang.unblock_the_vippost').replace(/(.*){%}/, '$1' + items.amount), this.$t('lang.Notice'), {
        center: true,
        showCancelButton: true,
        confirmButtonText: this.$t('lang.sure'),
        cancelButtonText: this.$t('lang.dialog_btn_cancel'),
        confirmButtonClass: 'dynamicconfirmButtonClass',
        cancelButtonClass: 'dynamiccancelButtonClass',
        customClass: 'dynamiccustomClass'
      }).then(res => {
        _this.$store.dispatch('buySubCombo', { subid: items.id }).then(res => {
          console.log(res)
          if (res.status == 200) {
            // 实时改变当前套餐的解锁状态
            const list = _this.subscribeList
            list[index].isunlock = true
            _this.subscribeList = JSON.parse(JSON.stringify(list))
            // _this.$store.dispatch("geHomePost");
            const comboSubList = _this.comboSubList
            comboSubList.push(items.id)
            _this.$store.commit('SET_SUB_LIST', comboSubList)
            _this.$message({
              type: 'success',
              message: res.message
            })
          }
        })
      })
    },
    // 解锁套餐  修改全局套餐数据
    onSubLock (id, index) {
      const list = this.tabImgList
      const sublist = this.subscribeList
      console.log('购买三方视角的订阅VIP帖文')
      // 遍历帖子列表，相同套餐下的帖文全部变为解锁
      for (let idx = 0; idx < list.length; idx++) {
        const element = list[idx]
        if (element.mcnsub_id == id) {
          element.isunlock = true
        }
      }
      console.log(list)
      this.tabImgList = JSON.parse(JSON.stringify(list))

      // 遍历套餐栏目，对应ID的套餐解锁
      for (let idx = 0; idx < sublist.length; idx++) {
        const element = sublist[idx]
        if (element.mcnsub_id == id) {
          element.isunlock = true
        }
      }
      console.log(sublist)
      this.subscribeList = JSON.parse(JSON.stringify(sublist))

      const comboSubList = this.comboSubList
      comboSubList.push(id)
      this.$store.commit('SET_SUB_LIST', comboSubList)
    },
    // 解锁帖文  修改全局帖文数据
    onPostLock (id, index) {
      const list = this.tabImgList
      list[index].isunlock = true
      this.tabImgList = JSON.parse(JSON.stringify(list))
      const postList = this.postList
      postList.push(id)
      console.log(postList)
      this.$store.commit('SET_POST_LIST', postList)
    },
    // 展开当前VIP套餐
    async onHandleOpenPosts (item) {
      const _this = this
      const postres = await this.$store.dispatch('getOtherSubPosts', {
        sub_id: item.id
      })
      console.log('模特的套餐列表内的贴文 三方视角')
      console.log(postres)
      if (postres.status == 200) {
        _this.openPostsList = postres.data.models
        _this.openPosts = true
      }
    },
    // 获取关注数的请求
    getAttentionCount () {
      const _this = this
      // 获取他人关注数
      if (this.pageRouterName == 'userInfo') {
        this.$store
          .dispatch('getOtherAttentionCount', { target_uid: this.target_uid })
          .then(res => {
            if (res.status == 200) {
              console.log(res.data.count)
              _this.current_info.follow = _this.$common.convertNumber(
                res.data.count
              )
            }
          })
      } else {
        this.$store.dispatch('getAttentionCount').then(res => {
          // console.log(res)
          if (res.status == 200) {
            _this.current_info.follow = _this.$common.convertNumber(
              res.data.count
            )
          }
        })
      }
    },
    // 获取粉丝数的请求
    getFansCount () {
      const _this = this
      // 获取他人粉丝数
      if (this.pageRouterName == 'userInfo') {
        this.$store
          .dispatch('getOtherFansCount', { target_uid: this.target_uid })
          .then(res => {
            // console.log(res)
            if (res.status == 200) {
              console.log(res.data.count)
              _this.current_info.fans = _this.$common.convertNumber(
                res.data.count
              )
            }
          })
      } else {
        this.$store.dispatch('getFansCount').then(res => {
          // console.log(res)
          if (res.status == 200) {
            _this.current_info.fans = _this.$common.convertNumber(
              res.data.count
            )
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
      } else {
        this.addAttention()
      }
    },
    // 添加关注请求
    addAttention () {
      const _this = this
      this.$store
        .dispatch('addAttention', {
          target_uid: this.target_uid
        })
        .then(res => {
          console.log(res)
          if (res.status == 200) {
            // 将当前用户ID传入已关注的列表里
            const list = _this.att_list || []
            list.push({ target_uid: _this.target_uid })
            _this.$store.commit('SET_ATT_LIST', list)
            _this.isAtt = true
            _this.current_info.fans += 1
            console.log(_this.current_info.fans)
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
      this.$store
        .dispatch('delAttention', {
          target_uid: this.target_uid
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
            _this.current_info.fans -= 1
            console.log(_this.current_info.fans)
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
      console.log(_this.target_uid)
      console.log(_this.att_list)
      list.forEach((element, index) => {
        if (element.target_uid == _this.target_uid) {
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
    onHandleEditSubmit (obj, user_info) {
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
            _this.current_info = { ..._this.current_info, ...user_info }
            _this.$store.dispatch('delProfileCache')
            this.getAttentionCount()
            this.getFansCount()
            if (obj.nick) {
              const otherAccountInfo = JSON.parse(
                localStorage.getItem('otherAccountInfo')
              )
              const index = otherAccountInfo[_this.user_info.username]
                .map(it => it.username)
                .indexOf(_this.user_info.username)
              otherAccountInfo[_this.user_info.username][index].nick = obj.nick
              otherAccountInfo[_this.user_info.username][index].uid = obj.uid
              this.$store.commit('SET_OTHER_ACCOUNT_INFO', otherAccountInfo)
              localStorage.setItem(
                'otherAccountInfo',
                JSON.stringify(otherAccountInfo)
              )
            }
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
      // 如果是审核中也不可点击
      if (this.current_info.model_audit_status == 0) {
        return
      }
      if (this.current_type == 1) {
        this.$router.push({ path: '/RegisterModel' })
      } else {
        this.showModel = true
      }
    },
    // 查看订阅套餐事件
    onHandleLookSet () {
      const current_info = this.current_info
      // 如果没有设置订阅套餐  则返回提示
      if (
        current_info.mcn_data &&
        current_info.mcn_data.combo_data &&
        current_info.mcn_data.combo_data.length > 0
      ) {
        this.openUserList = !this.openUserList
      } else {
        this.$message({
          type: 'success',
          message: '当前账号未设置订阅套餐'
        })
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
    // tab第一项的方法
    getMyselfAllPostList () {
      const target_uid = this.$route.params.uid
      // console.log(target_uid);
      if (target_uid) {
        this.getPostList()
      } else {
        this.getMyGuide()
      }
    },
    // 获取用户自己的个人帖文
    getMyGuide () {
      const _this = this
      MyApi.myGuide(0, 50).then(res => {
        if (res.status == 200) {
          const tabImgList = res.data.models

          for (let index = 0; index < tabImgList.length; index++) {
            const element = tabImgList[index]
            if (element.mcnsub_id != 0) {
              const date = new Date(element.dateline * 1000)
              element.date = _this.$common.getNextMonthToday(date, 1)[0]
              // console.log(element.date)
            }
          }

          this.current_info.post = res.data.count
          this.tabImgList = tabImgList
        }
      })
    },
    // 获取模特全部贴文列表
    getPostList () {
      const _this = this
      const target_uid = this.$route.params.uid
      UserApi.getPostList(target_uid, 0, 50).then(res => {
        if (res.status == 200) {
          const tabImgList = res.data.models
          for (let index = 0; index < tabImgList.length; index++) {
            const element = tabImgList[index]
            if (element.mcnsub_id != 0) {
              const date = new Date(element.dateline * 1000)
              element.date = _this.$common.getNextMonthToday(date, 1)[0]
              // console.log(element.date)
            }
          }
          this.tabImgList = tabImgList
          this.current_info.post = res.data.count
        }
      })
    },
    goToPostPage (tid, tshare) {
      this.$router.push({
        path: '/p/' + tshare
      })
    },
    goDetail (name) {
      if (this.$route.name == 'my') {
        this.$router.push(name)
      }
    }
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
    position: relative;
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
      .chat_icon {
        width: 36px;
        height: 36px;
      }
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
      flex-wrap: wrap;
      // line-height: 10px;
      margin-top: 12px;
      max-height: 80px;
      height: auto;
      text-align: left;
      font-family: PingFang TC;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #343a40;
      overflow: hidden;
      overflow-y: auto;
      text-overflow: ellipsis;
    }
    .my_context_user_info_text_translate {
      text-decoration: underline;
      position: absolute;
      right: 22px;
      bottom: -20px;
      font-family: SF Pro;
      font-size: 12px;
      line-height: 14px;
      letter-spacing: 0px;
      color: #82b1fd;
    }
  }
  .my_context_botton {
    margin-top: 27px;
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
      font-size: 13px;
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
      &.isSet {
        background-color: #fff;
        border: 2px solid #f46fe0;
        color: #f46fe0;
        box-sizing: border-box;
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
      &.isSet {
        background-color: #fff;
        border: 2px solid #f46fe0;
        color: #f46fe0;
        box-sizing: border-box;
      }
      &.isAudit {
        background-image: linear-gradient(90deg, #cbcbcb 0%, #aaa 100%);
        color: #fff;
      }
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
      font-size: 13px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 2px;
      color: #ffffff;
      .rightMenu_context_header_user_icon {
        transform: rotate(-90deg);
        // margin-top: 6px;
        margin-left: 6px;
        color: #fff;
        font-size: 17px;
        &.rightMenu_context_header_user_icon_close {
          transform: rotate(90deg);
        }
      }
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
        border-radius: 5px;
        overflow: hidden;
        position: relative;
        width: 108px;
        height: 108px;
        margin-right: 7px;
        margin-top: 5px;
        &:nth-child(3n) {
          margin-right: 0;
        }
        .my_context_tabs_1_i_back {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          z-index: 10;
          background-color: rgba(0, 0, 0, 0.17);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          color: #fff;
          .my_context_tabs_1_i_back_icon {
            font-size: 16px;
            color: #fff;
            margin-right: 5px;
          }
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
          width: 78px;
          height: 17px;
          line-height: 17px;
          text-align: center;
          font-family: SF Pro Text;
          font-size: 12px;
          // display: flex;
          // align-items: center;
          // justify-content: center;
          color: #6c757d;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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
