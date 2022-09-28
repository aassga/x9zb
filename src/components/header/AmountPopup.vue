<template>
  <el-drawer
    :withHeader="false"
    :append-to-body="true"
    :modal-append-to-body="false"
    custom-class="amountPopup_context"
    :visible.sync="show"
    direction="ttb"
    :before-close="close"
  >
    <div class="amountPopup_context_box">
      <div class="amount_list">
        <div v-for="(item,index) in list" :key="index" class="amount_item">
          <div class="amount_num">{{`＄${item.num+''+$t('lang.current_platform')}`}}</div>
          <div v-if="item.discount" class="amount_icon" alt srcset>
            <div class="amount_icon_text">{{item.discount}}{{$t('lang.discount')}}</div>
          </div>
          <div class="amount_btn">＄{{item.amount}}</div>
        </div>

        <!-- 底部自定义输入框 -->
        <div class="amount_item">
          <img class="amount_item_icon" src="@/assets/my/ic-money@3x.png" alt srcset />
          <CommonInput
            color="#cccccc"
            @change="(value)=>{this.amount = value}"
            type="number"
            class="amount_item_input"
            :value="amount"
            :placeholder="$t('lang.enter_recharge_amount')"
          ></CommonInput>
          <div @click="onHandleSbumit" class="amount_btn">{{$t('lang.submit')}}</div>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import CommonInput from '@/components/my/CommonInput.vue'
export default {
  name: 'amountPopup',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  components: {
    CommonInput
  },
  data () {
    return {
      amount: '',
      list: [
        {
          num: 5,
          discount: false,
          amount: 5
        },
        {
          num: 20,
          discount: 8,
          amount: 16
        },
        {
          num: 50,
          discount: false,
          amount: 50
        },
        {
          num: 100,
          discount: 7,
          amount: 70
        },
        {
          num: 1000,
          discount: false,
          amount: 1000
        }
      ]
    }
  },

  // props:{
  //     title:{
  //         type:String,
  //         default:'标题'
  //     }
  // },

  mounted () {},

  methods: {
    close () {
      this.$emit('close')
    },
    onHandleSbumit () {
      this.$message({
        type: 'success',
        message: '暂未开放~'
      })
      this.close()
    },
    // 将弹框挂载到组件元素下
    getContainer () {
      return document.querySelector('.my_context')
    }
  }
}
</script>

<style lang="scss">
.amountPopup_context {
  // position: absolute;
  box-shadow: 0px 12px 12px 0px rgba(0, 0, 0, 0.16);
  border-radius: 0px 0px 8px 8px;
  width: 100%;
  min-height: 300px;
  height: auto !important;
  .amountPopup_context_box {
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    .amount_list {
      margin-top: 65px;
      margin-bottom: 33px;
      width: 270px;
      // height: 62px;
      // display: flex;
      .amount_item {
        display: flex;
        align-items: center;
        width: 100%;
        height: 62px;
        border-bottom: 1px solid rgba(60, 60, 67, 0.36);
        .amount_num {
          font-family: PingFang TC;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #6c757d;
        }
        .amount_item_icon {
          width: 34px;
          height: 34px;
        }
        .amount_item_input {
          width: 148px;
          height: 36px;
        }
        .amount_icon {
          width: 56px;
          height: 56px;
          background: url("../../assets/my/ic-sale@3x.png") no-repeat no-repeat;
          background-size: 100% 100%;
          display: flex;
          align-items: center;
          justify-content: center;

          .amount_icon_text {
            font-family: PingFang TC;
            font-size: 13px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 18px;
            letter-spacing: 0px;
            color: #ffffff;
            transform: rotate(21deg);
          }
        }
        .amount_btn {
          width: 68px;
          height: 34px;
          background-image: linear-gradient(90deg, #f46fe0 0%, #f8a9ec 100%);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: auto;
          font-family: PingFang TC;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 22px;
          letter-spacing: 0px;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
