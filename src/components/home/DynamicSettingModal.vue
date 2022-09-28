<template>
  <div>
    <el-dialog
      id="dynamic-setting-modal"
      :visible.sync="visible"
      :before-close="closeDynamicSettingModal"
      :modal-append-to-body="true"
      :append-to-body="true"
      @close="$emit('closeNotEnable')"
    >
      <div class="modal_content">
        <div class="modal_content--action" @click="showNotEnable">{{$t('lang.block_user')}}</div>
        <input id="link" />
        <div class="modal_content--action" @click="copyPostLock">{{$t('lang.copy_url')}}</div>
        <div class="modal_content--action" @click="reportPost">{{$t('lang.report_post')}}</div>
      </div>
    </el-dialog>
    <NotEnable :isshow="isShowEnable" @closeNotEnable="closeVisible" />
  </div>
</template>

<script>
import NotEnable from '@/components/header/NotEnable.vue'
import userApi from '@/api/user.js'
export default {
  name: 'dynamic-setting-modal',
  components: { NotEnable },
  data () {
    return {
      isShowEnable: false
    }
  },
  props: {
    visible: {
      type: Boolean
    },
    linkUrl: {
      type: String
    },
    uid: { type: Number },
    tid: { type: Number },
    pid: { type: Number },
    tshare: { type: String }
  },
  methods: {
    closeVisible () {
      this.$emit('close-dynamic-setting-modal')
      this.isShowEnable = false
    },
    // 封锁用户
    showNotEnable () {
      userApi
        .putPrivacyBan({ buid: localStorage.getItem('u_id') })
        .then(res => {
          if (res.status === 200) {
            userApi.getPrivacyBan().then(res1 => {
              if (res1.status === 200) {
                // this.banUser = res1.data.buids;
                this.$store.commit('SET_BANUSER_LIST', res1.data.buids)
              }
            })
            this.$store.dispatch('geHomePost')
            this.$message.success(this.$t('lang.message_operated_done'))
            this.closeDynamicSettingModal()
          }
        })
    },
    // 关闭弹窗
    closeDynamicSettingModal () {
      this.$emit('close-dynamic-setting-modal')
    },
    // 复制链接
    copyPostLock () {
      const url = location.origin + '/#/p/' + this.tshare
      document.getElementById('link').value = url
      const copyLinkText = document.getElementById('link')
      copyLinkText.select()
      document.execCommand('copy')
      this.$emit('close-dynamic-setting-modal')
      this.$message.success(this.$t('lang.message_copied'))
    },
    reportPost () {
      // this.closeVisible();
      this.$emit('report-post')
    }
  },
  mounted () {}
}
</script>

<style lang="scss">
.el-dialog__header {
  display: none;
}
#dynamic-setting-modal {
  overflow-y: hidden;
  .el-dialog__body {
    padding: 0;
  }
  .modal_content {
    position: absolute;
    width: 270px;
    text-align: center;
    height: 132px;
    top: calc(50vh - 3.2rem - (132px / 2));
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    background-color: #f5f4f4;
    border-radius: 15px;
    z-index: 3;
    font-weight: 700;
    #link {
      position: absolute;
      top: 150vh;
    }
    .modal_content--action {
      height: 44px;
      font-size: 16px;
      line-height: 44px;
      color: #5a6268;
      border-bottom: 1px solid rgba(60, 60, 67, 0.36);
    }
    .modal_content--action:last-child {
      border-bottom: none;
    }
  }
}
</style>

<style lang="scss">
.el-dialog__header,
.el-dialog__body {
  padding: 0;
}
.el-dialog__close {
  display: none;
}
</style>
