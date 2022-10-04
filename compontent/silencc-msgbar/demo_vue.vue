<template>
  <view>
    <Msgbar ref="msgbar" height="260rpx" width="500rpx">
      <template #item="{ data }">
        <view>
          {{ data.name }}
        </view>
      </template>
    </Msgbar>
  </view>
</template>

<script>
import Msgbar from '@/components/msgbar/index'
export default {
  components: {
    Msgbar
  },
  onShow() {
    this.$refs.msgbar && this.$refs.msgbar.start()
  },
  onReady() {
    this.getNames()
  },
  onHide() {
    this.$refs.msgbar.clear()
  },
  methods: {
    // 添加名单
    getNames() {
      this.$refs.msgbar.addData([
        {
          name: '刘xx',
          phone: 13322114433,
          gift: '保温杯'
        },
        {
          name: '刘xx',
          phone: 13322114433,
          gift: '保温杯'
        },
        {
          name: '刘xx',
          phone: 13322114433,
          gift: '保温杯'
        },
        {
          name: '刘xx',
          phone: 13322114433,
          gift: '保温杯'
        },
        {
          name: '刘xx',
          phone: 13322114433,
          gift: '保温杯'
        },
        {
          name: '刘xx',
          phone: 13322114433,
          gift: '保温杯'
        }
      ])
      this.$refs.msgbar.start()
    }
  }
}
</script>
