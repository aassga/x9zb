<template>
  <el-dialog
    :before-close="close"
    custom-class="order_model_context_big_3"
    :visible.sync="showModel"
    :title="$t('lang.interactive_report')"
  >
    <div class="order_model_context">
      <div class="order_model_context_title_box">
        <div class="order_model_context_title">
          {{$t('lang.withdrawal_selection')}}
          <img
            class="order_model_context_title_icon"
            src="@/assets/my/ic-msg@3x.png"
            alt
            srcset
          />
        </div>

        <div class="order_model_context_title_date">2/28 ~ 3/6</div>
      </div>

      <img class="order_model_context_table" src="@/assets/my/tableBg.png" alt srcset />

      <div class="order_model_context_data">
        <div class="order_model_context_data_num">60</div>
        <div class="order_model_context_data_title">{{$t('lang.interactive_accounts_num')}}</div>
        <div class="order_model_context_data_date">
          <div class="order_model_context_data_date_l">{{$t('lang.compared')}} 2/21 ~ 2/27</div>
          <div class="order_model_context_data_date_r">-10%</div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import CommonInput from '@/components/my/CommonInput.vue'

export default {
  name: 'WebFeXcOrderamoutset',
  props: {
    showModel: {
      type: Boolean,
      default: false
    }
  },
  components: {
    CommonInput
  },
  data () {
    return {
      set_info: {
        free_photo: ''
      }
    }
  },

  mounted () {},

  methods: {
    close () {
      this.$emit('close')
    },
    // 成为模特
    onHandleBecomeModel () {
      // 返回上一页
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
// 编辑弹框的样式
.order_model_context_big_3 {
  width: 344px !important;
  height: 650px;
  border-radius: 6px;
  background-color: #f5f4f4;
  .el-dialog__body {
    padding: 0;
  }
  .order_model_context {
    position: relative;
    width: 100%;

    .order_model_context_title_box {
      width: 100%;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      box-sizing: border-box;
      background-color: #fff;
      .order_model_context_title {
        width: 176px;
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
      .order_model_context_title_date {
        font-family: SF Pro Text;
        font-size: 16px;
        letter-spacing: 0px;
        color: #6c757d;
      }
    }
    .order_model_context_table {
      width: 100%;
    }

    .order_model_context_data {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .order_model_context_data_num {
        font-family: SF Pro Text;
        font-size: 50px;
        font-weight: 700;
        letter-spacing: 0px;
        color: #f46fe0;
      }
      .order_model_context_data_title {
        font-family: SF Pro Text;
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 0px;
        color: #343a40;
      }
      .order_model_context_data_date {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 20px;
        .order_model_context_data_date_l {
          font-family: SF Pro Text;
          font-size: 14px;
          letter-spacing: 0px;
          color: #7a7e83;
        }
        .order_model_context_data_date_r {
          font-family: SF Pro Text;
          font-size: 14px;
          letter-spacing: 0px;
          color: #e53f4f;
        }
      }
    }
  }
}
</style>
