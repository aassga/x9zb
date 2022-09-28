<template>
  <el-dialog
    :before-close="close"
    custom-class="order_model_context_big_5"
    :visible.sync="show"
    :title="$t('lang.withdrawal')"
  >
    <!-- :append-to-body="true"
    :modal-append-to-body="false"-->
    <div class="order_model_context">
      <div class="order_model_context_amount_box">
        <img class="mainHeader_right_img_1" src="@/assets/my/ic-money@3x.png" alt srcset />
        <div class="mainHeader_right_num">{{`${$t('lang.balance')+''+amount || '0.00'}`}}</div>
      </div>

      <div class="order_model_context_input">
        <img class="mainHeader_right_img_1" src="@/assets/my/ic-tikuan.png" alt srcset />
        <CommonInput
          color="#cccccc"
          @change="(value)=>{this.money = value}"
          type="number"
          class="amount_item_input"
          :value="money"
          :placeholder="$t('lang.withdrawal_amount_enter')"
        />
      </div>

      <div class="order_model_context_tip">※{{$t('lang.single_withdrawal_range')}}100~1000</div>

      <div class="order_model_context_title">
        {{$t('lang.withdrawal_selection')}}
        <img
          class="order_model_context_title_icon"
          src="@/assets/my/ic-msg@3x.png"
          alt
          srcset
        />
      </div>
    </div>

      <!-- <div class="order_model_context_line" ></div> -->

      <div @click="onHandleSbumit" class="order_model_context_btn" >{{$t('lang.submit')}}</div>
  </el-dialog>
</template>

<script>
import CommonInput from '@/components/my/CommonInput.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'WebFeXcOrderamoutset',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['amount'])
  },
  components: {
    CommonInput
  },
  watch: {
    show (newV, oldV) {
      console.log(newV)
    }
  },
  data () {
    return {
      money: '' // 提款金额
    }
  },

  mounted () {},

  methods: {
    close () {
      this.$emit('close')
    },
    // 成为模特
    onHandleSbumit () {
      this.$message({
        type: 'success',
        message: '暂未开放~'
      })
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
// 编辑弹框的样式
.order_model_context_big_5 {
  width: 344px !important;
  height: 400px;
  border-radius: 6px;
  overflow: hidden;
  background-color: #f5f4f4;
  .el-dialog__body {
    padding: 0;
  }
  .el-dialog__header {
    height: 38px;
    border-bottom: rgba(60, 60, 67, 0.36);
    background-color: #f5f4f4;
    line-height: 38px;
    // .el-dialog__headerbtn{
    //   width: 25px;
    //   height: 25px;
    // }
  }
  .order_model_context {
    border-bottom: 1px solid #cccccc;
    border-top: 1px solid #cccccc;
    margin-top: 10px;
    width: 100%;
    padding: 0 24px 100px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    // background-color: #fff;
    align-items: center;
    .order_model_context_amount_box {
      width: 100%;
      height: 44px;
      display: flex;
      align-items: center;
      .mainHeader_right_img_1 {
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
    }
    .order_model_context_tip {
      width: 100%;
      height: 34px;
      display: flex;
      align-items: center;
      font-family: SF Pro;
      font-size: 16px;
      color: #6c757d;
      padding-left: 44px;
      box-sizing: border-box;
    }
    .order_model_context_input {
      width: 100%;
      height: 44px;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .mainHeader_right_img_1 {
        width: 30px;
        height: 30px;
        margin: 0 8px;
      }
      .amount_item_input {
        width: 252px;
        height: 32px;
      }
    }
    .order_model_context_title {
      margin-left: auto;
      width: 252px;
      height: 30px;
      background-color: #f26fe1;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 17px;
      box-sizing: border-box;
      font-family: SF Pro Text;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
      .order_model_context_title_icon {
        width: 22px;
        height: 23px;
      }
    }
  }
  .order_model_context_btn{
        margin: 17px auto;
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
</style>
