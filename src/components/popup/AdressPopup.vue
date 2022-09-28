<template>
  <mt-popup class="AdressPopup" v-model="show" :position="position">
    <div class="AdressPopup_title">
      <div @click="close" class="AdressPopup_title_cancle">{{$t('lang.cancel')}}</div>
      <div @click="confirm(value)" class="AdressPopup_title_confirm">{{$t('lang.sure')}}</div>
    </div>
    <!-- 时间上推框 -->
    <mt-picker @change="onHandleValueChange" class="AdressPopup_context" :slots="slots" @confirm="confirm"></mt-picker>
  </mt-popup>
</template>

<script>
export default {
  name: 'WebFeXcAdressPopup',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    // 默认数字几就是多少级的联动
    type: {
      type: Number,
      default: 1
    },
    list: {
      type: Array,
      default: []
    },
    position: {
      type: String,
      default: 'bottom'
    }
  },
  watch: {
    show (newV, oldV) {
      //   console.log("popup打开");
      if (!newV) {
        this.close()
      }
    }
  },
  data () {
    return {
      slots: [
        {
          flex: 1,
          values: [],
          textAlien: 'center',
          calssName: ''
        }
      ],
      // 选中的值
      value: ''
    }
  },

  watch: {
    list (newV, oldV) {
      if (newV) {
        this.slots[0].values = newV
      }
    }
  },

  mounted () {},

  methods: {
    // 选中时间的事件
    confirm (value) {
      let values = value
      console.log(values)
      // 如果没有选中值  并且list有值  则默认取第一个
      if (value == '' && this.list.length > 0) {
        values = this.list[0]
      }
      // let date = '';
      console.log(values)
      this.$emit('confirm', values)
    },
    // 关闭popup的事件
    close () {
      this.$emit('close')
    },
    // 显示状态改变的事件
    // visibleChange(value) {
    //   if (!value) {
    //     this.close();
    //   }
    // },
    // 选中的值变化事件
    onHandleValueChange (picker, value) {
      this.value = value[0]
      // console.log(value[0])
    }
  }
}
</script>

<style lang="scss">
.AdressPopup {
  z-index: 9999;
  &.mint-popup {
    width: 100%;
    border-radius: 10px 10px 0 0;
    // position: relative;
    .AdressPopup_title {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 50px;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      .AdressPopup_title_cancle {
        font-family: SF Pro;
        font-size: 16px;
        line-height: 16px;
        letter-spacing: 0px;
        color: #f46fe0;
      }
      .AdressPopup_title_confirm {
        font-family: SF Pro;
        font-size: 14px;
        line-height: 16px;
        letter-spacing: 0px;
        color: #f46fe0;
      }
    }
    .mint-datetime-action {
      color: #f46fe0;
    }
  }
  .AdressPopup_context {
    width: 100%;
  }
}
</style>
