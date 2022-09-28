<template>
  <!-- 添加/刪除群組成員 -->
  <el-dialog
    :before-close="onHandleClose"
    custom-class="edit_group_name_modal"
    :visible.sync="show"
    title="群組成員"
  >
    <div class="edit_group_name_content">
      <div class="edit_group_name_title">修改群組名稱</div>
      <el-input class="edit_group_name_input" maxlength="100" v-model="name" placeholder="输入群组名称"></el-input>
      <!-- 禁言群组和解禁 -->
      <div @click="onHandleMute" class="edit_group_name_content_mute">
        <el-checkbox class="add_group_model_context_checklist_box_i_check" v-model="mute">群临时禁言</el-checkbox>
      </div>
    </div>
    <div slot="footer" class="edit_group_name_footer">
      <el-button @click="onHandleClose" class="edit_group_name_footer_button">取消</el-button>
      <el-button @click="submit" class="edit_group_name_footer_button" type="primary">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'HuyaXWebhEditGroupName',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    roomDetailData: {
      type: Object,
      default: {}
    },
    imUserInfo: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      mute: false,
      timer: null,
      name: ''
    }
  },
  beforeDestroy () {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  },
  //   computed:{
  //     mute() {
  //       if (this.roomDetailData.room_mute && this.roomDetailData.room_mute == 1) {
  //           return true;
  //       }else{
  //           return false;
  //       }
  //     },
  //   },
  watch: {
    show (newV, oldV) {
      if (newV) {
        this.reset()
        this.name = this.title
        console.log(this.roomDetailData.room_mute)
        if (this.roomDetailData.room_mute && this.roomDetailData.room_mute == 1) {
          this.mute = true
        } else {
          this.mute = false
        }
      }
    }
  },
  methods: {
    submit () {
      if (this.name.length == 0) {
        return this.$message('请输入群组名称')
      } else {
        this.$emit('submit', this.name)
      }
    },
    // 禁言的点击事件
    onHandleMute () {
      const _this = this
      console.log('禁言的点击事件')
      console.log(this.mute)
      if (this.timer) {
        this.mute = !this.mute
        return
      }
      this.timer = setTimeout(() => {
        _this.onHandleMuteGroup(_this.mute)
        clearTimeout(_this.timer)
        _this.timer = null
      }, 1000)
    },
    // 禁言和解禁群组
    onHandleMuteGroup (newV) {
      this.$store
        .dispatch('mute', {
          fd: this.roomDetailData.fd,
          vid: this.roomDetailData.vid,
          token: this.imUserInfo.token,
          type: 1,
          mute: newV ? 1 : 2, // 1:禁言, 2:解禁
          user_id: 0
        })
        .then(res => {
          this.$message({
            type: res.code == '0' ? 'success' : 'error',
            message: res.msg
          })
          this.$emit('onHandleMuteGroup', newV)
        })
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

<style lang="scss" scoped>
.edit_group_name_modal {
  width: 444px !important;
  min-height: 300px !important;
  border-radius: 6px;
  padding: 0 30px;
  box-sizing: border-box;
  background-color: #f5f4f4;
  .edit_group_name_content {
    position: relative;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    .edit_group_name_title {
      font-size: 18px;
      font-weight: bold;
      text-align: left;
    }
    .edit_group_name_input {
      margin-top: 20px;
    }
    .edit_group_name_content_mute {
      width: 100%;
      height: 25px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
