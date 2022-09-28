<template>
  <div class="HuyaXWebhItems">
    <div class="HuyaXWebhItems_list">
      <el-avatar :src="item.img" class="HuyaXWebhItems_l_avater" >{{item.user_nickname ? item.user_nickname.substr(0,1) : ''}}</el-avatar>
      <div class="HuyaXWebhItems_m">
        <div class="HuyaXWebhItems_m_t">
          <div class="HuyaXWebhItems_m_t_name" :title="item.user_nickname">{{item.user_nickname}}</div>
          <div class="HuyaXWebhItems_m_t_status">
            <!-- 点 分为 在线0 / 离线1 两种状态 -->
            <div :class="['HuyaXWebhItems_m_t_status_bags', item.is_online == 0 ? 'green' : 'gray']"></div>
            <template v-if="!isEdited">
              <div class="HuyaXWebhItems_m_t_status_nick" :title="item.user_nickname">{{item.user_nickname}}</div>
              <div @click.stop="onHandleEditNickName" class="HuyaXWebhItems_m_t_status_icon el-icon-edit"></div>
            </template>
            <template v-else>
              <el-input
                class="HuyaXWebhItems_m_t_status_input"
                maxlength="30"
                size="small"
                v-model="editNickName"
                placeholder="昵称"
              >
                <el-button slot="append" icon="el-icon-check" @click.stop="onHandleChangeNickName"></el-button>
              </el-input>
            </template>
          </div>
        </div>
        <div class="HuyaXWebhItems_m_b">
          <div>{{item.user_id}}</div>
          <div>{{item.channel}}</div>
        </div>
      </div>
      <div class="HuyaXWebhItems_r_icon el-icon-arrow-right" :class="[active ? 'active' : '']" @click="onHandleClickItem(item.channel)"></div>
    </div>
    <div class="HuyaXWebhItems_content" :class="[active ? 'active' : '']">
      <div class="HuyaXWebhItems_tag">
        <div class="tag_list" v-show="item.tags.length > 0">
          <!-- <div class="tag">
            標籤
            <div class="delete">
              <i class="el-icon-close"></i>
            </div>
          </div> -->
          <div class="tag" v-for="it in item.tags" :key="it">
            {{it}}
            <div class="delete" @click="onHandleDeleteTag(it)">
              <i class="el-icon-close"></i>
            </div>
          </div>
        </div>
        <div class="add_tag_content">
          <div class="add_tag" v-if="!isAddTag" @click="onHandleAddTagClick">
            <i class="el-icon-plus"></i>新增
          </div>
          <template v-else>
            <el-input
              class="HuyaXWebhItems_m_t_status_input"
              maxlength="30"
              size="small"
              v-model="tag"
              placeholder="标签"
            >
              <el-button slot="append" icon="el-icon-check" @click="onHandleAddTag"></el-button>
            </el-input>
          </template>
        </div>
      </div>
      <div class="HuyaXWebhItems_info">
        <div class="info_list">
          注册时间： {{ chatRoomUserInfo.create_time ? checkTime(chatRoomUserInfo.create_time) : "-" }}
        </div>
        <div class="info_list">
          终端类型： {{ chatRoomUserInfo.device_type ? chatRoomUserInfo.device_type : "-" }}
        </div>
        <div class="info_list">
          观赛次数： {{ chatRoomUserInfo.view_times ? chatRoomUserInfo.view_times : "-" }}
        </div>
        <div class="info_list">
          最后观看： {{ chatRoomUserInfo.last_view_room ? chatRoomUserInfo.last_view_room : "-" }}
        </div>
        <div class="info_list">
          设置纪录： -
        </div>
      </div>
      <div class="HuyaXWebhItems_footer">
        <el-button v-if="item.user_id != parmUserInfo.user_id" plain size="medium" @click="message()">私聊</el-button>
        <el-button plain size="medium" @click="addGroup()">加群</el-button>
        <el-button plain size="medium" @click="leaveGroup()" v-if="roomDetailData.type == 1">移出</el-button>
        <el-button plain size="medium" @click="mute()">{{chatRoomUserInfo.is_mute == 0 ? "禁言" : "解禁"}}</el-button>
        <el-button plain size="medium" @click="freeze()">{{chatRoomUserInfo.is_freeze == 0 ? "冻结" : "解冻"}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HuyaXWebhItems',
  props: ['item', 'active', 'index', 'headerIndex', 'chatRoomUserInfo', 'parmUserInfo', 'roomDetailData'],
  data () {
    return {
      isEdited: false,
      editNickName: '',
      isAddTag: false,
      tag: '',
      channel: ''
    }
  },
  mounted () {},
  methods: {
    onHandleClickItem (channel) {
      this.channel = channel
      this.$emit('onHandleClickItem', this.item, this.index, channel)
      this.isEdited = false
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
      if (minutes >= 0) return (minutes > 0 ? minutes : '1') + this.$t('lang.minute_ago')
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
    // 點擊编辑用户名
    onHandleEditNickName () {
      this.isEdited = true
      this.editNickName = this.item.user_nickname
    },
    // 编辑用户名
    onHandleChangeNickName () {
      this.$emit('onHandleChangeNickName', this.editNickName, this.item)
      this.isEdited = false
      this.editNickName = ''
    },
    // 點擊新增標籤
    onHandleAddTagClick () {
      this.isAddTag = true
    },
    // 新增標籤
    onHandleAddTag () {
      this.$emit('onHandleAddTag', this.tag, this.item)
      this.isAddTag = false
      this.tag = ''
    },
    // 刪除標籤
    onHandleDeleteTag (it) {
      this.$emit('onHandleDeleteTag', it, this.item)
    },
    message () {
      this.$emit('onHandleSendMessage', this.item, this.channel)
    },
    // 加群
    addGroup () {
      this.$emit('onHandleAddToGroup')
    },
    // 移出
    leaveGroup () {
      this.$emit('onHandleLeaveGroup')
    },
    // 禁言
    mute () {
      this.$emit('onHandleMute', this.chatRoomUserInfo)
    },
    // 凍結
    freeze () {
      this.$emit('onHandleFreeze', this.chatRoomUserInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
.HuyaXWebhItems {
  background-color: #fff;
  border-bottom: 2px solid #eee;
  width: 100%;
  margin-top: 10px;
  .HuyaXWebhItems_list {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    cursor: pointer;
    .HuyaXWebhItems_l_avater {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      line-height: 50px;
      background-color: orange;
      font-size: 18px;
    }
    .HuyaXWebhItems_m {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 15px;
      .HuyaXWebhItems_m_t {
        display: flex;
        align-items: center;
        .HuyaXWebhItems_m_t_name {
          display: inline-block;
          width: 160px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: left;
        }
        .HuyaXWebhItems_m_t_status {
          flex: 1;
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
            max-width: 160px;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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
        font-size: 13px;
        color: #757575;
        display: flex;
        align-items: center;
        div {
          text-align: start;
          width: 170px;
        }
      }
    }
    .HuyaXWebhItems_r_icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 50px;
      margin-left: auto;
      transition: all .3s;
      &.active {
        transform: rotate(90deg);
      }
    }
  }
  .HuyaXWebhItems_content {
    padding: 0 10px;
    max-height: 0px;
    opacity: 0;
    overflow: auto;
    transition: all .3s linear;
    &.active {
      max-height: 1000px;
      opacity: 1;
    }
    .HuyaXWebhItems_tag {
      text-align: left;
      padding: 10px 0;
      border-top: 1px solid #eee;
      .tag_list {
        width: 100%;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        .tag {
          display: flex;
          margin: 0 8px 8px 0;
          padding: 2.5px 15px;
          font-size: 13px;
          border-radius: 50px;
          text-align: center;
          color: #fff;
          background: #2c455c;
          .delete {
            margin-left: 10px;
            cursor: pointer;
          }
        }
      }
      .add_tag_content {
        .add_tag {
          display: inline-block;
          padding: 1px 6px;
          border-radius: 50px;
          border: 1.5px dashed #ccc;
          font-size: 13px;
          box-shadow: 1px .5px 0 rgba(0, 0, 0, 0.05);
          cursor: pointer;
          i {
            font-weight: bold;
            margin-right: 5px;
          }
        }
      }
    }
    .HuyaXWebhItems_info {
      text-align: left;
      padding: 10px 0;
      border-top: 1px solid #eee;
      .info_list {
        font-size: 14px;
        margin-bottom: 5px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    .HuyaXWebhItems_footer {
      padding: 10px 0;
      border-top: 1px solid #eee;
    }
  }
}
</style>

<style lang="scss">
.HuyaXWebhItems_m_t_status_input {
  flex: 1;
  .el-input-group__append {
    padding: 0 10px;
  }
}
</style>
