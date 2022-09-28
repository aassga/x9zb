<template>
  <el-dialog id="report-post-reason-modal"
    :visible.sync="visible"
    :before-close="closeReportPostReasonModal"
    :modal-append-to-body="!!modalType ? true : false"
    :append-to-body="!!modalType ? true: false"
  >
    <div class="modal_content">
      <div class="header">
          {{!!modalType ? $t('lang.report_describe') : $t('lang.report_describe')}}
        <div class="close" @click="$emit('close-report-post-reason-modal')"></div>
      </div>
      <div class="content">
        <textarea class="reason" v-model="reason" :placeholder="!!modalType ? $t('lang.report_account_reason') : $t('lang.report_reason_describe')"></textarea>
        <div class="reason-length">{{reason.length}}/1000</div>
        <button @click="$emit('next', reason)">{{$t('lang.submit')}}</button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'report-post-reason-modal',
  props: {
    visible: {
      type: Boolean
    },
    modalType: {
      type: Number,
      default: 0 // 0貼文 1用戶
    }
  },
  data () {
    return {
      reason: ''
    }
  },
  methods: {
    closeReportPostReasonModal () {
      this.$emit('close-report-post-reason-modal')
    }
  }
}
</script>

<style lang="scss" scoped>
#report-post-reason-modal {
  overflow-y: hidden;
  .modal_content {
    position: absolute;
    width: 344px;
	  height: 396px;
    // top: calc(50vh - 3.2rem - (396px/2));
    top: 35vh;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    background-color: #f5f4f4;
    border-radius: 4px;
    z-index: 3;
    .header {
      height: 3rem;
      font-size: 15px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 3rem;
      letter-spacing: 0rem;
      color: #6c757d;
      border-bottom: 1px solid #6c757d;
      text-align: center;
      .close {
        width: 2rem;
        height: 15px;
        background: url('~@/assets/register/ic-cross@3x.png') 15px center no-repeat;
        background-size: auto 15px;
        position: absolute;
        top: 1.1rem;
        right: 1.6rem;
      }
    }
    .content {
      width: 286px;
      margin: 0 auto;
      font-size: 14px;
      padding-top: 18px;
      .reason {
        width: calc(100% - 1.6rem);
        height: 242px;
        background-color: #ffffff;
        border-radius: 8px;
        border: solid 1px #cccccc;
        padding: 0 .8rem 0 .8rem;
        font-size: 14px;
        line-height: 2rem;
        &::placeholder {
          color: #cccccc;
          font-size: 14px;
          line-height: 2rem;
        }
      }
      .reason-length {
        text-align: right;
        font-size: 14px;
        line-height: 16px;
        letter-spacing: 0px;
        color: #6c757d;
      }
      button {
        width: 100%;
        height: 36px;
        margin-top: 10px;
        border: 0;
        background-image: radial-gradient(
                            circle at 50% 50%,
                            #f46fe0,
                            #f8a9ec 97%);
        color: #fff;
        border-radius: 5px;
        font-size: 14px;
      }
    }
  }
}
</style>

<style lang="scss">
.el-dialog__header, .el-dialog__body {
  padding: 0;
}
.el-dialog__close {
  display: none;
}
</style>
