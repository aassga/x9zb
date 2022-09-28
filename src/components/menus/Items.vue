<template>
  <div @click="onHandleClickItem" :class="['HuyaXWebhItems',active ? 'active' : '']">
    <div class="HuyaXWebhItems_l">
      <template v-if="item.pic && item.pic.length > 0">
        <el-avatar :src="`/upload/${item.pic}`" class="HuyaXWebhItems_steam_avater"></el-avatar>
      </template>
      <template v-else>
        <el-avatar
          class="HuyaXWebhItems_steam_avater"
        >{{item.name ? item.name.substr(0,1) : ''}}</el-avatar>
      </template>
      <!-- <el-image v-else :src="item.img" class="HuyaXWebhItems_l_avater" /> -->
      <div class="HuyaXWebhItems_l_text">{{item.online_count || 0}}</div>
    </div>
    <div class="HuyaXWebhItems_r">
      <div class="HuyaXWebhItems_r_t">
        <p
          v-show="headerIndex == 0"
          class="HuyaXWebhItems_r_name"
        >{{item.room_source == 'system' ? (item.name ? item.name.split(' ')[0] : '未知') : (item.user_nickname ? item.user_nickname : '未知')}}</p>
        <p v-show="headerIndex != 0" class="HuyaXWebhItems_r_name">{{item.name || '未知'}}</p>
        <!-- <div v-else class="HuyaXWebhItems_r_name">{{item.team_name}}</div> -->
        <p class="HuyaXWebhItems_r_date">{{item.last_msg ? item.last_msg.creation_time : '未知'}}</p>
        <!-- <div v-else class="HuyaXWebhItems_r_date">{{checkTime(item.created_time)}}</div> -->
      </div>
      <p class="HuyaXWebhItems_r_m">
        <template
          v-if="headerIndex !== 2"
        >{{item.name ? item.name.split(' ')[1] : (headerIndex == 0 ? '未知' : '')}}</template>
        <template v-else>{{item.channel}}</template>
        <span v-if="item.anchor_nickname">来自:{{item.anchor_nickname}}</span>
      </p>
      <p class="HuyaXWebhItems_r_b">{{ item.last_msg ? item.last_msg.text : '未知'}}</p>
      <div v-if="item.unread_count > 0" class="HuyaXWebhItems_r_b_tips">{{item.unread_count > 99 ? '99+' : item.unread_count}}</div>
    </div>
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
      const msgData = this.$store.state.user.newMsg
      if (this.item.room_type == 1) {
        msgData.groupChat = false
        this.$store.commit('SET_NEW_MSG', msgData)
      }
      if (this.item.room_type == 2) {
        msgData.oneChat = false
        this.$store.commit('SET_NEW_MSG', msgData)
      }
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
    }
  }
}
</script>

<style lang="scss" scoped>
.HuyaXWebhItems {
  position: relative;
  &.active {
    background-color: #f5f7fa;
  }
  &:hover {
    background-color: #f5f7fa;
  }
  cursor: pointer;
  background-color: #fff;
  border-bottom: 2px solid #eee;
  height: 100px;
  display: flex;
  padding: 10px 20px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  .HuyaXWebhItems_l {
    margin-right: 10px;
    width: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .HuyaXWebhItems_l_avater {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
    .HuyaXWebhItems_steam_avater {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      line-height: 40px;
      background-color: orange;
      font-size: 18px;
    }
    .HuyaXWebhItems_l_text {
      margin-top: 5px;
      font-size: 12px;
      color: #b4b1b1;
      width: 100%;
      height: 20px;
      align-items: center;
      display: flex;
      justify-content: center;
    }
  }
  .HuyaXWebhItems_r {
    width: 190px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    .HuyaXWebhItems_r_t {
      width: 190px;
      height: 20px;
      align-items: center;
      display: flex;
      justify-content: space-between;
      .HuyaXWebhItems_r_name {
        font-size: 15px;
        font-weight: 400;
        color: #222;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-family: Arial, Helvetica, sans-serif;
      }
      .HuyaXWebhItems_r_date {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 14px;
        color: #b4b1b1;
      }
    }

    .HuyaXWebhItems_r_m {
      // margin-top: 4px;
      width: 190px;
      height: 20px;
      align-items: center;
      display: flex;
      font-size: 12px;
      font-weight: 400;
      color: #222;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-family: Arial, Helvetica, sans-serif;
    }
    .HuyaXWebhItems_r_b {
      // margin-top: 10px;
      width: 190px;
      height: 20px;
      font-family: Arial, Helvetica, sans-serif;
      // align-items: center;
      line-height: 25px;
      text-align: left;
      // display: flex;
      font-size: 12px;
      font-weight: 400;
      color: #b4b1b1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .HuyaXWebhItems_r_b_tips {
      position: absolute;
      right: 15px;
      bottom: 20px;
      width: 37px;
      height: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #F5481e;
      color: #fff;
      font-size: 12px;
      border-radius: 20px;
    }
  }
}
</style>
