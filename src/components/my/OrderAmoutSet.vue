<template>
  <el-dialog
    :before-close="close"
    custom-class="order_model_context_big"
    :visible.sync="showModel"
    :title="$t('lang.set_vip_price')"
  >
    <!-- :append-to-body="true"
    :modal-append-to-body="false"-->

    <div class="order_model_context">
      <div class="order_model_context_line"></div>
      <!-- 档案时间头部栏 -->
      <div class="order_model_context_date">
        <img
          @click="onHandleOpenTip"
          class="order_model_context_date_icon"
          src="@/assets/my/ic-info.png"
          alt
          srcset
        />
        {{$t('lang.schedule_time')}} {{date}}
        <div v-show="showTip" class="order_model_context_date_tip">
          <div class="order_model_context_date_tip_top"></div>
          <div class="order_model_context_date_tip_title">{{$t('lang.setting_instructions_1')}}</div>
          <div class="order_model_context_date_tip_i">{{$t('lang.setting_instructions_2')}}</div>
          <div
            class="order_model_context_date_tip_i"
          >{{$t('lang.setting_instructions_3')}}</div>
          <div class="order_model_context_date_tip_i">{{$t('lang.setting_instructions_4')}}</div>
        </div>
      </div>

      <div v-for="(item,index) in combo" :key="index">
        <div class="order_model_context_line"></div>
        <div class="order_model_context_title">
          <img
            class="order_model_context_title_icon"
            src="@/assets/my/ic-king@3x.png"
            alt
            srcset
          />
          <!-- {{ getCurrentInfo(index,'name') }} -->
           {{ 'VIP' + Number(index)}}
          <img
            v-if="index > 0 && !isSet"
            @click="onHandleDelVip(index)"
            style="margin-left:auto;"
            class="order_model_context_title_icon"
            src="@/assets/my/ic-minus.png"
            alt
            srcset
          />
        </div>

        <div style="margin-top:5px;" class="order_model_context_i">
          <div :class="['order_model_context_i_title',isSet ? 'black' : '']">{{$t('lang.photo_package')}}</div>
          <CommonInput
            v-if="!isSet"
            color="#cccccc"
            type="number"
            class="order_model_context_i_input"
            @change="(value)=>{item.photo = value}"
            :value="item.photo"
            :placeholder="$t('lang.fill_in_numbers')"
          ></CommonInput>
          <div v-else class="order_model_context_i_num">
            {{item.photo}}
            <div
              class="order_model_context_i_num_black"
            >(-{{item.photo_effect}})</div>
          </div>
        </div>
        <div class="order_model_context_i">
          <div :class="['order_model_context_i_title',isSet ? 'black' : '']">{{$t('lang.video_package')}}</div>
          <CommonInput
            v-if="!isSet"
            color="#cccccc"
            type="number"
            class="order_model_context_i_input"
            @change="(value)=>{item.video = value}"
            :value="item.video"
            :placeholder="$t('lang.fill_in_numbers')"
          ></CommonInput>
          <div v-else class="order_model_context_i_num">
            {{item.video}}
            <div
              class="order_model_context_i_num_black"
            >(-{{item.video_effect}})</div>
          </div>
        </div>
        <div class="order_model_context_i">
          <div :class="['order_model_context_i_title',isSet ? 'black' : '']">{{$t('lang.chat_package')}}</div>
          <CommonInput
            v-if="!isSet"
            color="#cccccc"
            type="number"
            class="order_model_context_i_input"
            @change="(value)=>{item.chat = value}"
            :value="item.chat"
            :placeholder="$t('lang.fill_in_numbers')"
          ></CommonInput>
          <div v-else class="order_model_context_i_num">{{item.chat}}</div>
        </div>
        <div style="margin-bottom:20px;" class="order_model_context_i">
          <div :class="['order_model_context_i_title',isSet ? 'black' : '']">{{$t('lang.monthly_price')}}</div>
          <CommonInput
            v-if="!isSet"
            color="#cccccc"
            type="number"
            class="order_model_context_i_input"
            @change="(value)=>{item.amount = value}"
            :value="item.amount"
            :placeholder="$t('lang.fill_in_numbers')"
          ></CommonInput>
          <div v-else class="order_model_context_i_num">${{item.amount}}</div>
        </div>
      </div>

      <!-- 新增阅读阶级 -->
      <div class="order_model_context_line"></div>
      <div v-if="!isSet" @click="onHandleAddVip" class="order_model_context_add_title">
        <img class="order_model_context_add_title_icon" src="@/assets/my/ic-add.png" alt srcset />
        {{$t('lang.new_subscription')}}
      </div>
      <div class="order_model_context_line"></div>

      <div v-if="!isSet" @click="onHandleBecomeModel" class="order_model_btn">{{$t('lang.set_up')}}</div>
    </div>
  </el-dialog>
</template>

<script>
import CommonInput from '@/components/my/CommonInput.vue'
// 引入gtters计算函数
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'WebFeXcOrderamoutset',
  props: {
    showModel: {
      type: Boolean,
      default: false
    },
    isSet: {
      type: Boolean,
      default: false
    }
  },
  components: {
    CommonInput
  },
  data () {
    return {
      vipIconList: [
        {
          img: require('@/assets/my/ic-king@3x.png'),
          name: 'VIP'
        },
        {
          img: require('@/assets/my/ic-VVIP.png'),
          name: 'VVIP'
        },
        {
          img: require('@/assets/my/ic-VVIP.png'),
          name: 'VVVIP'
        },
        {
          img: require('@/assets/my/ic-VVIP.png'),
          name: 'VVVVIP'
        }
      ],
      date: '', // 时间
      showTip: false, // 是否显示tip
      // 订阅套餐的配置
      combo: [
        {
          photo: 0,
          video: 0,
          chat: 0,
          amount: 0
        },
        {
          photo: 0,
          video: 0,
          chat: 0,
          amount: 0
        }
      ]
    }
  },
  computed: {
    ...mapState({
      user_info: state => state.user.user_info
    })
  },
  watch: {
    showModel (newV, oldV) {
      if (newV) {
        // 获取当前的年月日时间
        const date = new Date()
        this.date = this.$common.getNextMonthToday(date, 1)[0]
        console.log(this.date)
      }
    }
  },
  created () {
    // 获取设置的订阅套餐
    this.getSubCombo()
  },
  mounted () {},
  methods: {
    close () {
      this.$emit('close')
    },
    // 获取订阅套餐
    getSubCombo () {
      const _this = this
      const comboList = this.user_info.mcn_data.combo_data
      const list = []
      if (comboList && comboList.length > 0) {
        comboList.forEach((ele, idx) => {
          list.push({
            photo: ele[0].combo.photo,
            video: ele[0].combo.photo,
            chat: ele[0].combo.photo,
            amount: ele[0].amount,
            photo_effect: ele[0].combo.photo_effect,
            video_effect: ele[0].combo.video_effect
          })
        })
        console.log('已设置订阅的套餐')
        console.log(list)
        this.combo = list
      }
    },
    // 获取当前模特层级的icon和name
    getCurrentInfo (index, key) {
      const num = index + 1
      let res = ''
      let str = 'VIP'
      for (let index = 0; index < num; index++) {
        str = 'V' + str
      }
      if (key == 'name') {
        res = str
      } else if (key == 'icon') {
        res =
          index == 0
            ? require('@/assets/my/ic-king@3x.png')
            : require('@/assets/my/ic-VVIP.png')
      }
      return res
    },
    // 显示和取消显示tip
    onHandleOpenTip () {
      this.showTip = !this.showTip
    },
    // 删除VIP层级
    onHandleDelVip (index) {
      const list = JSON.parse(JSON.stringify(this.combo))
      list.splice(index, 1)
      this.combo = list
    },
    // 新增VIP层级
    onHandleAddVip () {
      // if (this.combo.length > 4) {
      //   this.$message("最多设置四个订阅套餐层级~");
      //   return;
      // }
      this.combo.push({
        photo: 0,
        video: 0,
        chat: 0,
        amount: 0
      })
    },
    // 配置订阅套餐
    onHandleBecomeModel () {
      const _this = this
      this.$store.dispatch('setSubCombo', { combo: this.combo }).then(res => {
        console.log(res)
        if (res.status == 200) {
          // _this.$message("订阅套餐设置成功~");
          _this.$emit('changeSet', true)
          _this.$message({
            type: 'success',
            message: '订阅套餐设置成功~'
          })
          // 返回上一页
          // _this.$router.go(-1);
          // _this.close();
        }
      })
      //   this.$message({
      //   type: "success",
      //   message: "暂未开放~"
      // });
      // this.close();
    }
  }
}
</script>

<style lang="scss">
// 编辑弹框的样式
.order_model_context_big {
  width: 344px !important;
  min-height: 350px;
  height: auto;
  border-radius: 6px;
  background-color: #f5f4f4;
  .el-dialog__body {
    padding: 0;
  }
  .order_model_context {
    position: relative;
    width: 100%;
    padding-bottom: 34px;
    // padding-top: 0px;
    .order_model_context_date {
      position: relative;
      padding: 0 26px;
      box-sizing: border-box;
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: SF Pro;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #e97b86;
      .order_model_context_date_icon {
        width: 19px;
        height: 19px;
        margin-right: 6px;
      }
      .order_model_context_date_tip {
        width: 100%;
        height: 287px;
        position: absolute;
        bottom: -287px;
        left: 0;
        padding: 0 20px;
        box-sizing: border-box;
        border-radius: 5px;
        background-color: #e97b86;
        .order_model_context_date_tip_top {
          position: absolute;
          top: -7px;
          left: 58px;
          width: 0;
          height: 0;
          transform: rotate(45deg);
          border-top: 10px solid #e97b86;
          border-right: 10px solid transparent;
          border-left: 10px solid #e97b86;
          border-bottom: 10px solid transparent;
        }
        .order_model_context_date_tip_title {
          margin-top: 30px;
          font-family: SF Pro;
          font-size: 15px;
          font-weight: 400;
          font-stretch: normal;
          line-height: 16px;
          letter-spacing: 0px;
          color: #ffffff;
        }
        .order_model_context_date_tip_i {
          margin-top: 10px;
          font-family: SF Pro;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 16px;
          letter-spacing: 0px;
          color: #ffffff;
        }
      }
    }
    .order_model_context_line {
      width: 100%;
      height: 1px;
      background-color: rgba(60, 60, 67, 0.36);
    }
    .order_model_context_add_title {
      padding: 0 26px;
      box-sizing: border-box;
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      font-family: SF Pro;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #6c757d;
      .order_model_context_add_title_icon {
        width: 17px;
        height: 17px;
        margin-right: 6px;
      }
    }
    .order_model_context_title {
      padding: 0 26px;
      box-sizing: border-box;
      width: 100%;
      height: 38px;
      display: flex;
      align-items: center;
      font-family: PingFang TC;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #f46fe0;
      .order_model_context_title_icon {
        margin-right: 4px;
        width: 22px;
        height: 23px;
      }
    }
    .order_model_context_box {
      padding: 0 26px;
      box-sizing: border-box;
      border-top: 1px solid #f5f4f4;
      background-color: #f5f4f4;
      width: 100%;
      height: 108px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .order_model_context_camera {
        position: relative;
        width: 52px;
        height: 52px;
        display: flex;
        align-items: center;
        justify-content: center;
        .order_model_context_camera_img {
          width: 52px;
          height: 52px;
          border-radius: 50%;
        }
        .order_model_context_camera_icon {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: #fff;
          font-size: 27px;
        }
      }
      .order_model_context_box_text {
        margin-top: 5px;
        height: 14px;
        font-family: PingFang TC;
        font-size: 10px;
        font-weight: normal;
        font-stretch: normal;
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 0px;
        color: #6c757d;
      }
    }
    .order_model_context_i {
      padding: 0 26px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #f5f4f4;
      //   padding: 0 26px;
      box-sizing: border-box;
      width: 100%;
      height: 44px;
      .order_model_context_i_title {
        // width: 82px;
        height: 20px;
        font-family: PingFang TC;
        font-size: 12px;
        font-weight: 400;
        font-stretch: normal;
        line-height: 22px;
        letter-spacing: 0px;
        color: #6c757d;
        // &.black{
        //   color: #6c757d;
        // }
      }
      .order_model_context_i_input {
        width: 148px;
        height: 36px;
      }
      .order_model_context_i_num {
        width: 148px;
        height: 36px;
        display: flex;
        align-items: center;
        font-family: SF Pro;
        font-size: 16px;
        font-weight: 400;
        letter-spacing: 0px;
        color: #f46fe0;
        .order_model_context_i_num_black {
          margin-left: 20px;
          color: #6c757d;
          font-weight: 400;
        }
      }
    }
    .order_model_btn {
      margin: 34px auto 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 286px;
      height: 35px;
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
}
.el-dialog__header {
  height: 40px !important;
  line-height: 40px !important;
}
</style>
