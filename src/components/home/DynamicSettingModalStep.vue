<template>
  <div id="dynamic-setting-modal-step">
    <DynamicSettingModal v-if="visible"
      :visible="visible"
      linkUrl="http://localhost:9527/"
      :tid="tid"
      :pid="pid"
      :uid="uid"
      :tshare="tshare"
      @close-dynamic-setting-modal="$emit('close-dynamic-setting-modal-step')"
      @report-post="isShowReportPostModal=true;"
    />
    <ReportPostModal v-if="isShowReportPostModal"
      :visible="isShowReportPostModal"
      @next="reportPostModalClose"
      @close-report-post-modal="$emit('close-dynamic-setting-modal-step')"
    />
    <ReportPostReasonModal v-if="isShowReportPostReasonModal"
      :visible="isShowReportPostReasonModal"
      @next="reportPostReasonModal"
      @close-report-post-reason-modal="$emit('close-dynamic-setting-modal-step')"
    />
    <ReportPostSuccessedModal v-if="isShowReportPostSuccessedModal"
      :visible="isShowReportPostSuccessedModal"
      @close="$emit('close-dynamic-setting-modal-step')"
    />
  </div>
</template>

<script>
import DynamicSettingModal from '@/components/home/DynamicSettingModal.vue'
import ReportPostModal from '@/components/home/ReportPostModal.vue'
import ReportPostReasonModal from '@/components/home/ReportPostReasonModal.vue'
import ReportPostSuccessedModal from '@/components/home/ReportPostSuccessedModal.vue'

import ReportApi from '@/api/report.js'
// import { Message } from 'element-ui';
export default {
  name: 'dynamic-setting-modal-step',
  components: {
    DynamicSettingModal,
    ReportPostModal,
    ReportPostReasonModal,
    ReportPostSuccessedModal
  },
  props: {
    visible: {
      type: Boolean
    },
    uid: {
      type: Number
    },
    tid: {
      type: Number
    },
    pid: {
      type: Number
    },
    tshare: {
      type: String
    }
  },
  data () {
    return {
      isShowDynamicSettingModal: false,
      isShowReportPostModal: false,
      isShowReportPostReasonModal: false,
      isShowReportPostSuccessedModal: false,
      typeId: 0,
      text: ''
    }
  },
  methods: {
    closeDynamicSettingModalStep () {
      this.$emit('close-dynamic-setting-modal-step')
    },
    reportPostModalClose (typeId) {
      this.typeId = typeId
      if (typeId === 5) {
        this.isShowReportPostModal = false
        this.isShowReportPostReasonModal = true
      } else {
        // 直接调举报内容的接口
        this.reportPostReasonModal('')
      }
    },
    reportPostReasonModal (text) {
      this.text = text
      ReportApi.reportPost(this.tid, this.pid, this.typeId, this.text).then((res) => {
        if (res.status !== 200) {
          // 检举失败的时候可以关闭弹窗
          // if(this.typeId<5){
          //   this.$emit('closeNotEnable')
          // }
          return
        }
        this.isShowReportPostReasonModal = false
        this.isShowReportPostSuccessedModal = true
        // 不是其他举报内容的时候
        if (this.typeId < 5) {
          this.isShowReportPostModal = false
        }
      })
    }
  }
}
</script>
