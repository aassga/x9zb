<template>
<!-- 個人詳情 -->
    <el-dialog
        :before-close="onHandleClose"
        custom-class="user_info_modal"
        :visible.sync="show"
        title=""
    >
        <div class="user_info_content">
            <div class="user_info_header">
                <el-avatar src="@/assets/my/img-user.jpg" class="user_info_header_avater" >{{userInfo.user_nickname ? userInfo.user_nickname.substr(0,1) : ''}}</el-avatar>
				<div class="user_info_header_name">{{userInfo.user_nickname}}</div>
                <div class="user_info_header_nick_area">
                    <template v-if="!isEdited">
                        <div class="user_info_header_nick" :title="userInfo.user_nickname">{{userInfo.user_nickname}}</div>
                        <div @click.stop="onHandleEditNickName" class="user_info_header_nick_icon el-icon-edit"></div>
                    </template>
                    <template v-else>
                        <el-input
                            class="user_info_header_nick_input"
                            maxlength="30"
                            size="small"
                            v-model="editNickName"
                            placeholder="昵称"
                        >
                            <el-button slot="append" icon="el-icon-check" @click.stop="onHandleChangeNickName"></el-button>
                        </el-input>
                    </template>
                </div>
				<div class="user_info_header_id">{{userInfo.user_id}}</div>
            </div>
            <div class="user_info_actions">
                <el-button plain size="medium" @click="message()">私聊</el-button>
                <el-button plain size="medium" @click="addGroup()">加群</el-button>
                <el-button plain size="medium" @click="mute()">{{userInfo.is_mute == 0 ? "禁言" : "解禁"}}</el-button>
                <el-button plain size="medium" @click="freeze()">{{userInfo.is_freeze == 0 ? "冻结" : "解冻"}}</el-button>
            </div>
            <div class="user_info_details">
                <div class="user_info_title">个人资讯</div>
                <div class="info_list">
                    注册时间： {{ userInfo.create_time ? checkTime(userInfo.create_time) : "-" }}
                </div>
                <div class="info_list">
                    终端类型： {{ userInfo.device_type ? userInfo.device_type : "-" }}
                </div>
                <div class="info_list">
                    观赛次数： {{ userInfo.view_times ? userInfo.view_times : "-" }}
                </div>
                <div class="info_list">
                    最后观看： {{ userInfo.last_view_room ? userInfo.last_view_room : "-" }}
                </div>
                <div class="info_list">
                    设置纪录： -
                </div>
            </div>
            <div class="user_info_tag">
                <div class="user_info_title">标签</div>
                <div class="tag_list">
                    <!-- <div class="tag">
                        標籤
                        <div class="delete">
                        <i class="el-icon-close"></i>
                        </div>
                    </div> -->
                    <div class="tag" v-for="it in userTags" :key="it">
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
                            class="user_info_header_nick_input"
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
        </div>
    </el-dialog>
</template>

<script>
export default {
  name: 'HuyaXWebhUserInfo',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    userInfo: {
      type: Object,
      default: () => {}
    },
    userTags: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isEdited: false,
      editNickName: '',
      isAddTag: false,
      tag: ''
    }
  },
  watch: {
    userInfo (newV, oldV) {
      console.log('userInfo', newV)
    },
    userTags (newV, oldV) {
      console.log('userTags', newV)
    }
  },
  mounted () {

  },
  methods: {
    // 點擊编辑用户名
    onHandleEditNickName () {
      this.isEdited = true
      this.editNickName = this.userInfo.user_nickname
    },
    // 编辑用户名
    onHandleChangeNickName () {
      this.$emit('onHandleChangeNickName', this.editNickName, this.userInfo)
      this.isEdited = false
      this.editNickName = ''
    },
    // 點擊新增標籤
    onHandleAddTagClick () {
      this.isAddTag = true
    },
    // 新增標籤
    onHandleAddTag () {
      this.$emit('onHandleAddTag', this.tag, this.userInfo)
      this.isAddTag = false
      this.tag = ''
    },
    // 刪除標籤
    onHandleDeleteTag (it) {
      this.$emit('onHandleDeleteTag', it, this.userInfo)
    },
    // 私聊
    message () {
      this.$emit('onHandleMessage', this.userInfo)
    },
    // 加群
    addGroup () {
      this.$emit('onHandleAddToGroup', this.userInfo)
    },
    // 禁言
    mute () {
      this.$emit('onHandleMute', this.userInfo)
    },
    // 凍結
    freeze () {
      this.$emit('onHandleFreeze', this.userInfo)
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
    // 彈窗關閉
    onHandleClose () {
      this.$emit('close')
      this.reset()
    },
    reset () {
      Object.assign(this.$data, this.$options.data())
    }
  }
}
</script>

<style lang="scss">
.user_info_modal {
    width: 444px !important;
    min-height: 300px !important;
    border-radius: 6px;
    padding: 0 30px;
    box-sizing: border-box;
    background-color: #f5f4f4;
    .user_info_content {
        position: relative;
        width: 100%;
        padding: 40px 0;
        .user_info_header {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .user_info_header_avater {
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
            .user_info_header_name {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                color: #222;
                margin-top: 5px;
            }
            .user_info_header_id {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 13px;
                color: #757575;
                margin-top: 5px;
            }
            .user_info_header_nick_area {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 40px;
                .user_info_header_nick {
                    max-width: 160px;
                    text-align: left;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 16px;
                    color: #b4b1b1;
                }
                .user_info_header_nick_icon {
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
        .user_info_actions {
            padding: 10px 0;
            margin-top: 10px;
        }
        .user_info_title {
            font-weight: bold;
            margin-bottom: 5px;
        }
        .user_info_details {
            text-align: left;
            padding: 10px 0;
            .info_list {
                font-size: 14px;
                margin-bottom: 5px;
                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
        .user_info_tag {
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
    }
}
</style>
<style lang="scss">
.user_info_header_nick_input {
  flex: 1;
  .el-input-group__append {
    padding: 0 10px;
  }
}
</style>
