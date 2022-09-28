<template>
  <div @click="onHandleClickItem" class="HuyaXWebhItems">
    <el-avatar :src="item.img" class="HuyaXWebhItems_l_avater" >{{item.name ? item.name.substr(0,1) : ''}}</el-avatar>
    <div class="HuyaXWebhItems_m">
      <div class="HuyaXWebhItems_m_t">
        <div class="HuyaXWebhItems_m_t_name">{{item.name}}</div>
        <div class="HuyaXWebhItems_m_t_status">
          <!-- 点 分为在线  离线两种状态 -->
          <div :class="['HuyaXWebhItems_m_t_status_bags',item.status == 1 ? 'green' : 'gray']"></div>
          <div class="HuyaXWebhItems_m_t_status_nick">昵称</div>
          <div
            @click="onHandleEditNickName"
            class="HuyaXWebhItems_m_t_status_icon el-icon-edit"
          ></div>
        </div>
      </div>
      <div class="HuyaXWebhItems_m_b">{{item.id}}</div>
    </div>
    <div class="HuyaXWebhItems_r_icon el-icon-arrow-right"></div>
  </div>
</template>

<script>
export default {
  name: 'HuyaXWebhItems',
  props: ['item', 'active', 'index', 'headerIndex'],
  data () {
    return {}
  },

  mounted () {},

  methods: {
    onHandleClickItem () {
      this.$emit('onHandleClickItem', this.item, this.index)
    },
    // 顯示時間
    checkTime (dateline) {
      const now = this.dateFormat()
      const date = this.dateFormat(dateline * 1000)

      const d1 = now.replace(/\-/g, '/')
      const date1 = new Date(d1)

      const d2 = date.replace(/\-/g, '/')
      const date2 = new Date(d2)

      const dateDiff = date1.getTime() - date2.getTime()

      // 相差天數
      const days = Math.floor(dateDiff / (24 * 3600 * 1000))
      // 相差小時數
      const residue1 = dateDiff % (24 * 3600 * 1000)
      const hours = Math.floor(residue1 / (3600 * 1000))
      // 相差分鐘數
      const residue2 = residue1 % (3600 * 1000)
      const minutes = Math.floor(residue2 / (60 * 1000))

      if (days > 10) return date.split(' ')[0]
      if (days > 0) return days + this.$t('lang.day_ago')
      if (hours > 0) return hours + this.$t('lang.hour_ago')
      if (minutes >= 0) { return (minutes > 0 ? minutes : '1') + this.$t('lang.minute_ago') }
    },
    // 轉換時間格式 YYYY-MM-DD hh:mm:ss
    dateFormat (dateline) {
      const date = dateline > 0 ? new Date(dateline) : new Date()
      const Y = date.getFullYear()
      const M = date.getMonth() + 1
      const D = date.getDate()
      const h = date.getHours()
      const m = date.getMinutes()
      const s = date.getSeconds()
      return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
    },
    // 编辑用户名
    onHandleEditNickName () {}
  }
}
</script>

<style lang="scss" scoped>
.HuyaXWebhItems {
  &:hover {
    background-color: #f5f7fa;
  }
  cursor: pointer;
  background-color: #fff;
  border-bottom: 2px solid #eee;
  width: 500px;
  height: 100px;
  display: flex;
  padding: 10px 20px;
  margin-top: 20px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  .HuyaXWebhItems_l_avater {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    line-height: 60px;
    background-color: orange;
    font-size: 30px;
  }
  .HuyaXWebhItems_m {
      margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .HuyaXWebhItems_m_t {
      display: flex;
      height: 30px;
      align-items: center;
      .HuyaXWebhItems_m_t_name {
        display: flex;
        height: 30px;
        align-items: center;
        font-size: 16px;
        color: #222;
      }
      .HuyaXWebhItems_m_t_status {
        display: flex;
        height: 30px;
        align-items: center;
        .HuyaXWebhItems_m_t_status_bags {
          margin: 0 10px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          &.green {
            background-color: green;
          }
          &.gray {
            background-color: gray;
          }
        }
        .HuyaXWebhItems_m_t_status_nick {
          font-size: 16px;
          color: #b4b1b1;
        }
        .HuyaXWebhItems_m_t_status_icon {
          cursor: pointer;
          width: 40px;
          height: 40px;
          margin-left: 10px;
                display: flex;
      align-items: center;
      justify-content: center;
        }
      }
    }
    .HuyaXWebhItems_m_b {
      margin-top: 20px;
      font-size: 16px;
      color: #222;
      display: flex;
      align-items: center;
    }
  }
  .HuyaXWebhItems_r_icon {
      display: flex;
      align-items: center;
      justify-content: center;
    width: 40px;
    height: 60px;
    margin-left: auto;
  }
}
</style>
