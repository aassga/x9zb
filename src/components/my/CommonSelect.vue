<template>
  <div
    :style="{backgroundColor: bgColor,color: fontColor}"
    @click="onHandleOpen"
    id="order_model_context_title"
  >
    <!-- {{value ? value : title}} -->
     {{currentChoose ? currentChoose : ''}}
    <!-- <img
      :class="['order_model_context_title_icon',open ? '' : 'close']"
      src="@/assets/my/ic-msg@3x.png"
      alt
      srcset
    /> -->
    <!-- 下拉列表 -->
    <div :style="{width:width}" v-show="open" class="order_model_context_select">
      <div :style="{fontSize:fontSize}" @click="onHandleClickItem(item,idx)" v-for="(item,idx) in list" :key="idx" :class="['order_model_context_select_i',active == idx ? 'active' : '']">{{item}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'commoninput',
  props: {
    title: {
      type: String | Number,
      default: '下拉框'
    },
    width: {
      type: String | Number,
      default: '100%'
    },
    list: {
      type: Array,
      default () {
        return []
      }
    },
    index: {
      type: String | Number,
      default: 0
    },
    open: {
      type: Boolean,
      default: false
    },
    fontSize: {
      type: String,
      default: '13px'
    },
    bgColor: {
      type: String,
      default: '#82b1fd'
    },
    fontColor: {
      type: String,
      default: '#fff'
    }
  },
  watch: {},
  data () {
    return {
      value: '',
      active: 0,
      currentChoose: this.list[0]
    }
  },
  created () {},
  mounted () {},

  methods: {
    // 点击展开收起事件
    onHandleOpen () {
    //   console.log(111);
      this.$emit('open', this.value, this.index)
    },
    // 点击下拉框选择事件
    onHandleClickItem (item, idx) {
      this.value = item
      this.active = idx
      this.$emit('onHandleClickItem', item, this.index)
      this.currentChoose = this.list[idx]
    }
  }
}
</script>

<style lang="scss" scoped>
#order_model_context_title {
  position: relative;
  height: auto;
  background-color: #82b1fd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  box-sizing: border-box;
  font-family: SF Pro Text;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ffffff;
  .order_model_context_title_icon {
    margin-right: 4px;
    width: 22px;
    height: 23px;
    &.open {
    }
    &.close {
      transform: rotate(180deg);
    }
  }
  .order_model_context_select {
    position: absolute;
    transform: translateY(100%);
    bottom: 0;
    left: 0;
    border-radius: 0 0 10px 10px;
    background-color: #fff;
    width: 100%;
    height: auto;
    .order_model_context_select_i {
    //   width: 100%;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: SF Pro Text;
      font-size: 16px;
      font-weight: 400;
      line-height: 22px;
      letter-spacing: 0px;
      color: #6c757d;
      &.active {
        background-color: #82b1fd;
        color: #ffffff;
      }
    }
  }
}
</style>
