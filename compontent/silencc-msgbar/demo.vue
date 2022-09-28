<template>
  <view>
    <Msgbar ref="msgbar" height="260rpx" width="500rpx">
      <template #item="{ data }">
        <view>
          {{ data }}
        </view>
      </template>
    </Msgbar>
  </view>
</template>

<script>
import Msgbar from '@/components/silencc-msgbar/index'
export default {
  components: {
    Msgbar
  },
  data() {
    return {
      list: []
    }
  },
  mounted() {
    setTimeout(() => {
      this.getNames()
    }, 1000)
  },
  methods: {
    // 添加名单
    getNames() {
      this.list = [
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
      ]
    }
  }
}
</script>
