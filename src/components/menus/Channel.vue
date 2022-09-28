<template>
  <div>
    <el-drawer
      :visible.sync="drawer"
      :with-header="false"
      :before-close="handleClose"
      class="drawer-box"
      size="30%"
    >
      <div class="drawer-header">
        <div class="drawer-header-title">渠道信息选择</div>
        <el-button type="primary" size="mini" @click="messageBox= true">信息添加</el-button>
      </div>
      <div v-for="(group) in messageDisplayList" :key="group.key" class="drawer-item">
        <div class="drawer-item-title">
          渠道号：
          <el-input
            class="drawer-item-input"
            maxlength="30"
            size="small"
            v-model="group.channel"
            disabled
          ></el-input>
        </div>
        <div class="drawer-item-row">
          <div>信息选择：</div>
        </div>
        <div v-for="(item) in group.msg" :key="item.key" class="drawer-item-msg">
          <span @click="quickMessage(item)">{{item.content}}</span>
          <i class="el-icon-close drawer-item-icon" @click="deleteMessage(item.id)"></i>
        </div>
      </div>
    </el-drawer>
    <el-dialog :visible.sync="messageBox" title="信息添加" width="35%">
      <div class="dialog-messgae">
        <div class="dialog-messgae-item">
          <span>*</span>选择添加渠道
          <el-select v-model="message.channel_id" class="dialog-messgae-select">
            <el-option
              v-for="(item,index) in channelList"
              :key="index"
              :label="item.channel_code"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="dialog-messgae-item">
          <span>*</span>添加內容
          <el-input
            class="dialog-messgae-input"
            maxlength="30"
            size="small"
            v-model="message.content"
          ></el-input>
        </div>
        <div>
          <el-button type="primary" size="mini" @click="addMessage()">确认</el-button>
          <el-button size="mini" @click="messageBox = false">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ['drawer'],
  data () {
    return {
      channelList: [],
      messageList: [],
      messageDisplayList: [],
      messageBox: false,
      message: {
        channel_id: '',
        content: ''
      }
    }
  },
  watch: {
    drawer (val) {
      if (val) {
        this.$store.dispatch('getAllChannel').then(res => {
          if (res.code == 0) {
            this.channelList = res.data
            this.message = {
              channel_id: this.channelList[0].id,
              content: ''
            }
            this.$store.dispatch('getAllMessageList').then(res => {
              if (res.code == 0) {
                this.messageList = res.data.data
                this.messageDisplay()
              }
            })
          }
        })
      }
    }
  },
  mounted () {},
  methods: {
    handleClose () {
      this.$emit('handleClose')
    },
    addMessage () {
      this.$store
        .dispatch('addMessageList', {
          channel_id: this.message.channel_id,
          content: this.message.content
        })
        .then(res => {
          if (res.code == 0) {
            this.messageBox = false
            this.message = {
              channel_id: this.channelList[0].id,
              content: ''
            }
            this.$store.dispatch('getAllMessageList').then(res => {
              if (res.code == 0) {
                this.messageList = res.data.data
                this.messageDisplay()
              }
            })
          }
        })
    },
    deleteMessage (id) {
      this.$store
        .dispatch('deleteMessageList', {
          id: id
        })
        .then(res => {
          if (res.code == 0) {
            this.$store.dispatch('getAllMessageList').then(res => {
              if (res.code == 0) {
                this.messageList = res.data.data
                this.messageDisplay()
              }
            })
          }
        })
    },
    quickMessage (item) {
      this.$emit('handleClose')
      this.$emit('quickMessage', item)
    },
    messageDisplay () {
      const array = []
      this.channelList.forEach(x => {
        const result = this.messageList.filter(y => y.channel_id === x.id)
        if (result.length > 0) {
          array.push(result)
        }
      })
      const array2 = []
      array.forEach(x => {
        x[0].msg = []
        array2.push(x[0])
        x.forEach(y => {
          array2.forEach(z => {
            if (y.channel_id === z.channel_id) {
              z.msg.push({ id: y.id, content: y.content, channel: y.channel })
            }
          })
        })
      })
      this.messageDisplayList = array2
    }
  }
}
</script>
<style lang="scss" scoped>
.drawer {
  &-header {
    padding: 20px 20px 0;
    display: flex;
    justify-content: space-between;
  }
  &-item {
    padding: 20px 20px 0;
    font-size: 14px;
    &-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    &-title {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 10px;
    }
    &-input {
      width: 200px;
      margin-bottom: 0;
    }
    &-msg {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 50px;
      color: gray;
      margin-bottom: 10px;
      span {
        cursor: pointer;
      }
    }
    &-icon {
      cursor: pointer;
    }
  }
  &-item:last-child {
    padding: 20px;
  }
}
.dialog-messgae {
  padding: 20px;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      color: red;
    }
  }
  &-item {
    margin-bottom: 20px;
  }
  &-input,
  &-select {
    width: 180px;
    margin-left: 20px;
    height: 40px;
  }
}
</style>
