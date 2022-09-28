<template>
    <!-- 时间上推框 -->
    <mt-datetime-picker @visible-change="visibleChange" class="DatePopup" :start-date="startDate"  :end-date="endDate"  ref="datetimePicker" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" :type="type" @confirm="confirm" ></mt-datetime-picker>
</template>

<script>
export default {
  name: 'WebFeXcDatepopup',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'date'
    }
  },
  watch: {
    show (newV, oldV) {
      // console.log('popup打开')
      if (newV) {
        this.$refs.datetimePicker.open()
      }
    }
  },
  data () {
    return {
      endDate: new Date(), // 时间筛选范围的最大值
      startDate: new Date('January 1, 1900') // 时间筛选范围的最小值
    }
  },

  mounted () {

  },

  methods: {
    // 选中时间的事件
    confirm (value) {
      // let date = '';
      console.log(value)
      this.$emit('confirm', value)
    },
    // 关闭popup的事件
    close () {
      this.$emit('close')
    },
    // 显示状态改变的事件
    visibleChange (value) {
      if (!value) {
        this.close()
      }
    }
  }
}
</script>

<style lang="scss">
.DatePopup{
    &.mint-popup{
        z-index:9999 !important;
        border-radius: 10px 10px 0 0;
        .mint-datetime-action{
            color: #f46fe0;
        }
    }

}
</style>
