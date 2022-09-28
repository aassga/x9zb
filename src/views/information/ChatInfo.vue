<template>
  <div class="HuyaXWebhMessageuserlist">
    <div class="HuyaXWebhMessageuserlist_header" @click="test()">
      <div @click="onHandleChatInfoBack()">
        <el-icon class="el-icon-arrow-left HuyaXWebhMessageuserlist_header_icon"></el-icon>返回
      </div>
    </div>
    <div class="HuyaXWebhMessageuserlist_content">
      <!-- 头部区域 -->
      <div class="HuyaXWebhMessageuserlist_name_box">
        <template v-if="roomDetailData.type == 1">
          <el-upload
            action="#"
            :http-request="uploadAvatar"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <template v-if="roomDetailData.pic.length > 0">
              <el-avatar :src="roomDetailData.pic" class="HuyaXWebhMessageuserlist_name_box_avater"></el-avatar>
            </template>
            <template v-else>
              <el-avatar
                class="HuyaXWebhMessageuserlist_name_box_avater"
              >{{roomDetailData.title ? roomDetailData.title.substr(0,1) : ''}}</el-avatar>
            </template>
          </el-upload>
          <div class="HuyaXWebhMessageuserlist_name_box_name">{{roomDetailData.title}}</div>
        </template>
        <template v-else>
          <el-avatar
            class="HuyaXWebhMessageuserlist_name_box_avater"
          >{{roomDetailData.user_nickname ? roomDetailData.user_nickname.substr(0,1) : ''}}</el-avatar>
          <div class="HuyaXWebhMessageuserlist_name_box_name">{{roomDetailData.user_nickname}}</div>
        </template>
        <div class="HuyaXWebhMessageuserlist_name_box_index">{{roomDetailData.online_count}}</div>
      </div>
      <!-- 图标列表 -->
      <div class="HuyaXWebhMessageuserlist_icon_list" v-if="roomDetailData.type == 1">
        <div
          class="el-icon-circle-plus-outline HuyaXWebhMessageuserlist_icon_list_i"
          @click="addUserToGroup()"
        ></div>
        <div
          class="el-icon-remove-outline HuyaXWebhMessageuserlist_icon_list_i"
          @click="removeUserFromGroup()"
        ></div>
        <div
          class="el-icon-delete HuyaXWebhMessageuserlist_icon_list_i"
          @click="delUserFromGroup()"
        ></div>
        <div
          class="el-icon-edit-outline HuyaXWebhMessageuserlist_icon_list_i"
          @click="editGroupName()"
        ></div>
      </div>
      <!-- 输入框 -->
      <div class="HuyaXWebhMessageuserlist_search">
        <el-input
          class="HuyaXWebhMessageuserlist_input"
          maxlength="30"
          v-model="filterInput"
          placeholder="用户名/ID/标签"
        ></el-input>
      </div>
      <!-- tab栏 -->
      <el-radio-group
        class="HuyaXWebhMessageuserlist_tabs"
        @change="onHandleTabsChange"
        v-model="filterListType"
      >
        <el-radio-button label="0">全部</el-radio-button>
        <el-radio-button label="1">注冊</el-radio-button>
        <el-radio-button label="2">未注冊</el-radio-button>
        <el-radio-button label="3">禁言</el-radio-button>
        <el-radio-button label="4">冻结</el-radio-button>
      </el-radio-group>

      <div class="HuyaXWebhMessageuserlist_context">
        <userItem
          @onHandleClickItem="onHandleClickItem"
          @onHandleChangeNickName="onHandleChangeNickName"
          @onHandleAddTag="onHandleAddTag"
          @onHandleDeleteTag="onHandleDeleteTag"
          @onHandleAddToGroup="onHandleAddToGroup"
          @onHandleLeaveGroup="onHandleLeaveGroup"
          @onHandleMute="onHandleMute"
          @onHandleFreeze="onHandleFreeze"
          @onHandleSendMessage="onHandleSendMessage"
          :item="item"
          :active="activeIndex == index"
          :index="index"
          :chatRoomUserInfo="chatRoomUserInfo"
          :roomDetailData="roomDetailData"
          v-for="(item, index) in filterList"
          :key="index"
          :parmUserInfo="parmUserInfo"
        />
      </div>
    </div>
    <!-- 添加/刪除群組成員 -->
    <GroupList
      :show="showGroupList"
      :action="showGroupListAction"
      :userList="list"
      @close="showGroupList = false"
      @submit="onHandleGroupListSubmit"
    ></GroupList>

    <EditGroupName
      @onHandleMuteGroup="onHandleMuteGroup"
      :roomDetailData="roomDetailData"
      :imUserInfo="imUserInfo"
      :show="showEditGroupName"
      :title="roomDetailData.title"
      @close="showEditGroupName = false"
      @submit="onHandleEditGroupName"
    ></EditGroupName>
  </div>
</template>

<script>
import userItem from '@/components/information/UserItem.vue'
import GroupList from '@/components/menus/GroupList.vue'
import EditGroupName from '@/components/menus/EditGroupName.vue'

export default {
  name: 'ChatInfo',
  props: ['roomDetailData', 'imUserInfo', 'parmUserInfo', 'show'],
  components: {
    userItem,
    GroupList,
    EditGroupName
  },
  data () {
    return {
      filterInput: '',
      filterListType: 0,
      activeIndex: null,
      selectedItem: {},
      list: [],
      list2: [],
      chatRoomUserInfo: {},
      showGroupList: false, // 添加/刪除群組成員
      showGroupListAction: 1, // 1添加/2刪除
      showEditGroupName: false, // 修改群組名
      avatarData: {}
    }
  },
  watch: {
    roomDetailData (newV, oldV) {
      // this.getChatMemberList();
      this.reset()
    },
    show (e) {
      if (e) {
        this.getChatMemberList()
      }
    }
  },
  computed: {
    filterList () {
      let result = []
      const filterListType = this.filterListType
      const arr = []
      const arr2 = []

      if (filterListType == 0) {
        result = this.list
      } else if (filterListType == 1) {
        result = this.list.filter(it => it.user_type > 0)
      } else if (filterListType == 2) {
        result = this.list.filter(it => it.user_type == 0)
      } else if (filterListType == 3) {
        result = this.list.filter(it => it.is_mute == 1)
      } else if (filterListType == 4) {
        result = this.list.filter(it => it.is_freeze == 1)
      }

      for (let index = 0; index < result.length; index++) {
        const element = result[index]
        if (element.is_online == 0) {
          arr.push(element)
        } else {
          arr2.push(element)
        }
      }
      console.log('筛选之后的数组')
      console.log(arr)
      console.log(arr2)
      result = [...arr, ...arr2]
      console.log(result)

      // 搜尋框篩選
      if (this.filterInput.length > 0) {
        result = result.filter(
          it =>
            it.user_nickname.indexOf(this.filterInput) != -1 ||
            it.user_id.toString().indexOf(this.filterInput) != -1
        )
      }

      return result
    }
  },
  mounted () {},
  methods: {
    // 返回事件
    onHandleChatInfoBack () {
      this.$emit('onHandleChatInfoBack')
    },
    // 群组的禁言状态
    onHandleMuteGroup (mute) {
      this.$emit('onHandleMuteGroup', mute)
    },
    onHandleTabsChange (e) {
      this.filterListType = e
      this.activeIndex = null
      this.selectedItem = {}
      // this.getChatMemberList();
    },
    // 点击子项的事件
    onHandleClickItem (item, index) {
      if (this.activeIndex == index) {
        this.activeIndex = null
        this.selectedItem = {}
        this.chatRoomUserInfo = {}
      } else {
        this.activeIndex = index
        this.selectedItem = item
        this.getChatRoomUserInfo()
      }
      console.log(this.activeIndex, this.selectedItem)
    },
    // 編輯暱稱
    onHandleChangeNickName (editNickName, item) {
      if (editNickName == item.user_nickname) {
        return
      }
      if (editNickName.length > 0) {
        this.$store
          .dispatch('updateUser', {
            user_id: item.user_id,
            user_nickname: editNickName
          })
          .then(res => {
            if (res.code == 0) {
              this.getChatMemberList()
            }
          })
      }
    },
    // 新增標籤
    onHandleAddTag (tag, item) {
      if (tag.length == 0) return

      this.$store
        .dispatch('addTag', {
          tag: tag,
          user_id: item.user_id
        })
        .then(res => {
          if (res.code == 0) {
            this.getChatMemberList()
          }
        })
    },
    // 刪除標籤
    onHandleDeleteTag (tag, item) {
      if (tag.length == 0) return

      this.$store
        .dispatch('deleteTag', {
          tag: tag,
          user_id: item.user_id
        })
        .then(res => {
          if (res.code == 0) {
            this.getChatMemberList()
          }
        })
    },
    // 取得成員列表
    getChatMemberList () {
      const data = {
        vid: this.roomDetailData.vid,
        type: this.roomDetailData.type
      }
      this.$store.dispatch('getChatRoomUserList', { ...data }).then(res => {
        if (res.code == 0) {
          this.list = res.data
          this.list2 = res.data
        }
      })
    },
    // 取得成員詳細資料
    getChatRoomUserInfo () {
      const data = {
        vid: this.roomDetailData.vid,
        user_id: this.selectedItem.user_id
      }
      this.$store.dispatch('getChatRoomUserInfo', { ...data }).then(res => {
        if (res.code == 0) {
          this.chatRoomUserInfo = res.data
        } else {
          this.chatRoomUserInfo = {}
        }
      })
    },
    // 私聊
    onHandleSendMessage (item, channel) {
      const _that = this
      const data = {
        fd: this.roomDetailData.fd,
        token: this.imUserInfo.token,
        type: 2,
        user_id: item.user_id,
        is_new: 1,
        channel
      }
      this.$store.dispatch('addGroup', { ...data }).then(res => {
        _that.$emit('onHandleAddGroup', res.data.vid)
      })
    },
    // 加群
    onHandleAddToGroup () {
      this.$emit('onHandleAddToGroup', 0, this.selectedItem)
    },
    onHandleLeaveGroup () {
      const user_id = `${this.selectedItem.user_id}`
      this.showGroupListAction = 2
      this.onHandleGroupListSubmit(user_id)
    },
    // 禁言
    onHandleMute (chatRoomUserInfo) {
      this.$store
        .dispatch('mute', {
          fd: this.roomDetailData.fd,
          vid: this.roomDetailData.vid,
          token: this.imUserInfo.token,
          type: 0,
          mute: chatRoomUserInfo.is_mute == 0 ? 1 : 2, // 1:禁言, 2:解禁
          user_id: chatRoomUserInfo.user_id
        })
        .then(res => {
          this.$message({
            type: res.code == '0' ? 'success' : 'error',
            message: res.msg
          })
          this.getChatRoomUserInfo()
          this.getChatMemberList()
        })
    },
    // 凍結
    onHandleFreeze (chatRoomUserInfo) {
      this.$store
        .dispatch('freeze', {
          fd: this.roomDetailData.fd,
          vid: this.roomDetailData.vid,
          token: this.imUserInfo.token,
          type: 0,
          freeze: chatRoomUserInfo.is_freeze == 0 ? 1 : 2, // 1:凍結, 2:解凍
          user_id: chatRoomUserInfo.user_id
        })
        .then(res => {
          this.$message({
            type: res.code == '0' ? 'success' : 'error',
            message: res.msg
          })
          this.getChatRoomUserInfo()
          this.getChatMemberList()
        })
    },
    // 添加群組成員
    addUserToGroup () {
      this.showGroupList = true
      this.showGroupListAction = 1
    },
    // 刪除群組成員
    removeUserFromGroup () {
      this.showGroupList = true
      this.showGroupListAction = 2
    },
    // 删除整个群组
    delUserFromGroup () {
      const _this = this
      this.$confirm('确定要删除此群组吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '确定'
      }).then(async () => {
        const res = await this.$store.dispatch('delGroup', {
          token: _this.imUserInfo.token,
          vid: _this.roomDetailData.vid,
          fd: _this.roomDetailData.fd,
          type: 1
        })

        if (res.code == 0) {
          _this.$message({
            type: 'success',
            message: '删除成功~'
          })
          _this.$emit('refreshGroup')
        }
      })
    },
    onHandleGroupListSubmit (user_id) {
      const action = {
        1: 'addGroup',
        2: 'leaveGroup'
      }[this.showGroupListAction]
      const data = {
        fd: this.roomDetailData.fd,
        token: this.imUserInfo.token,
        user_id: user_id,
        vid: this.roomDetailData.vid
      }
      if (this.showGroupListAction == 1) {
        data.type = this.roomDetailData.type
        data.is_new = 0
      }

      this.$store.dispatch(action, data).then(res => {
        this.$message({
          type: res.code == '0' ? 'success' : 'error',
          message: res.msg
        })
        if (res.code == 0) {
          this.showGroupList = false
          this.getChatMemberList()
        }
      })
    },
    // 修改群組名
    editGroupName () {
      this.showEditGroupName = true
    },
    onHandleEditGroupName (name) {
      if (name == this.roomDetailData.title) {
        return
      }
      this.$store
        .dispatch('editGroupName', {
          fd: this.roomDetailData.fd,
          token: this.imUserInfo.token,
          vid: this.roomDetailData.vid,
          name: name
        })
        .then(res => {
          this.$message({
            type: res.code == '0' ? 'success' : 'error',
            message: res.msg
          })
          if (res.code == 0) {
            this.showEditGroupName = false
            this.$emit('refreshGroup')
          }
        })
    },
    // 上傳群組圖片之前
    handleAvatarSuccess (res, file) {
      console.log(res, file)
    },
    // 上傳群組圖片
    beforeAvatarUpload (file) {
      console.log(file)
      this.avatarData = file
    },
    uploadAvatar () {
      const form_data = new FormData()
      form_data.append('fd', this.roomDetailData.fd)
      form_data.append('token', this.imUserInfo.token)
      form_data.append('vid', this.roomDetailData.vid)
      form_data.append('pic', this.avatarData, this.avatarData.name)

      this.$store.dispatch('uploadGroupPic', form_data).then(res => {
        if (res.code == 0) {
          this.$emit('refreshGroup')
        }
      })
    },
    reset () {
      Object.assign(this.$data, this.$options.data())
    },
    test () {
      console.log('roomDetailData =>>', this.roomDetailData)
    }
  }
}
</script>

<style lang="scss" scoped>
.HuyaXWebhMessageuserlist {
  width: 569px;
  height: 720px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  // margin-left:10px;
  .HuyaXWebhMessageuserlist_header {
    display: flex;
    align-items: center;
    position: absolute;
    top: 10px;
    left: 0px;
    width: 569px;
    height: 40px;
    padding-left: 20px;
    font-size: 16px;
    box-sizing: border-box;
    background-color: #fff;
    color: #b4b1b1;
    cursor: pointer;
    .HuyaXWebhMessageuserlist_header_icon {
      color: #b4b1b1;
      font-size: 16px;
      margin-right: 10px;
    }
  }
  .HuyaXWebhMessageuserlist_content {
    width: 569px;
    height: calc(100% - 40px);
    margin-top: 40px;
    box-sizing: border-box;
    overflow: auto;
    .HuyaXWebhMessageuserlist_name_box {
      width: 100%;
      padding: 20px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .HuyaXWebhMessageuserlist_name_box_avater {
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
        cursor: pointer;
      }
      .HuyaXWebhMessageuserlist_name_box_name {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        color: #222;
        margin-top: 5px;
      }
      .HuyaXWebhMessageuserlist_name_box_index {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        color: #757575;
        margin-top: 5px;
      }
    }
    .HuyaXWebhMessageuserlist_icon_list {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin: 10px 0;
      .HuyaXWebhMessageuserlist_icon_list_i {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        margin: 0 20px;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
      }
    }
    .HuyaXWebhMessageuserlist_search {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 0 40px;
      .HuyaXWebhMessageuserlist_input {
        &:focus {
          border: 1px solid #409eff;
        }
      }
    }
    .HuyaXWebhMessageuserlist_tabs {
      margin-top: 20px;
    }
    .HuyaXWebhMessageuserlist_context {
      width: 100%;
      margin-top: 20px;
      padding: 0 20px 20px;
      box-sizing: border-box;
    }
  }
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.06);
    -webkit-box-shhadow: inset 0 0 5px rgba(0, 0, 0, 0.08);
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.12);
    -webkit-box-shhadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  }
}
</style>

<style lang="scss">
.HuyaXWebhMessageuserlist_tabs {
}
</style>
