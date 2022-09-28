<template>
  <el-dialog
    id="report-post-modal"
    :visible.sync="visible"
    :before-close="closeReportPostModal"
    :modal-append-to-body="!!modalType ? true : false"
    :append-to-body="!!modalType ? true: false"
    :top="'8vh'"
  >
    <div class="modal_content">
      <div class="header">
        {{!!modalType ? $t('lang.report') : $t('lang.report_post')}}
        <div class="close" @click="$emit('close-report-post-modal')"></div>
      </div>
      <div class="content">
        <div class="type">
          <div class="type-header">{{!!modalType ? $t('lang.report_account_1') : $t('lang.why_report_post')}}</div>
          <div class="type-desc more">{{!!modalType ? $t('lang.report_account_2') : $t('lang.worry_report_post')}}</div>
        </div>
        <div class="type" @click="$emit('next', 1)">
          <div class="type-header">
            {{!!modalType ? $t('lang.report_account_3') : $t('lang.malvertising')}}
            <span class="icon-angle-right"></span>
          </div>

          <div class="type-desc more">{{!!modalType ? $t('lang.report_account_4') : $t('lang.malvertising_describe')}}</div>
        </div>
        <div class="type" @click="$emit('next', 2)">
          <div class="type-header">
            {{!!modalType ? $t('lang.report_account_7') : $t('lang.hate_speech')}}
            <span class="icon-angle-right"></span>
          </div>
          <div class="type-desc">{{!!modalType ? $t('lang.report_account_8') : $t('lang.hate_speech_describe')}}</div>
        </div>
        <div class="type" @click="$emit('next', 3)">
          <div class="type-header">
            {{!!modalType ? $t('lang.report_account_9') : $t('lang.sell_contraband')}}
            <span class="icon-angle-right"></span>
          </div>
          <div class="type-desc">{{!!modalType ? $t('lang.report_account_10') : $t('lang.sell_contraband_describe')}}</div>
        </div>
        <div class="type" @click="$emit('next', 4)">
          <div class="type-header">
            {{!!modalType ? $t('lang.report_account_5') : $t('lang.violent')}}
            <span class="icon-angle-right"></span>
          </div>
          <div class="type-desc">{{!!modalType ? $t('lang.report_account_6') : $t('lang.violent_describe')}}</div>
        </div>
        <div class="type" @click="$emit('next', 5)">
          <!-- 其他需要替换多语言 -->
          <div class="type-header">
            {{!!modalType ? $t('lang.others') : $t('lang.others')}}
            <span class="icon-angle-right"></span>
          </div>
          <!-- <div class="type-desc">{{!!modalType ? '冒充自己或名人' : $t('lang.violent_describe')}}</div> -->
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'report-post-modal',
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
    closeReportPostModal () {
      this.$emit('close-report-post-modal')
    }
  }
}
</script>

<style lang="scss">
#report-post-modal {
  overflow-y: hidden;
  .el-dialog__body{
    padding: 0;
  }
  .modal_content {
    position: absolute;
    width: 344px;
    height: 467px;
    // top: calc(50vh - 3.2rem - (467px/2));
    top: 32vh;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    background-color: #f5f4f4;
    border-radius: 4px;
    z-index: 3;
    .header {
      height: 3rem;
      font-size: 15px;
      font-weight: bold;
      line-height: 3rem;
      letter-spacing: 0rem;
      color: #6c757d;
      // border-bottom: 1px solid #6c757d;
      background-color: #f5f4f4;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      text-align: center;
      .close {
        width: 2rem;
        height: 15px;
        background: url("~@/assets/register/ic-cross@3x.png") 15px center
          no-repeat;
        background-size: auto 15px;
        position: absolute;
        top: 1.1rem;
        right: 1.6rem;
      }
    }
    .content {
      margin: 0 auto;
      font-size: 14px;
      .type {
        min-height: 70px;
        width: 100%;
        border-bottom: 4px solid #f4f4f4;
        background-color: #fff;
        .type-header {
          padding: 9px 14px 3px 14px;
          text-align: left;
          font-size: 14px;
          line-height: 32px;
          color: #f46fe0;
          display: flex;
          justify-content: space-between;
          span {
            width: 15px;
            height: 15px;
            font-size: 15px;
            line-height: 22px;
            letter-spacing: 0px;
            color: #6c757d;
            margin-top: 6px;
          }
        }
        .type-desc {
          padding: 0px 40px 3px 14px;
          text-align: left;
          height: 39px;
          font-size: 12px;
          line-height: 20px;
          color: #6c757d;
          &.more {
            height: 55px;
          }
        }
        &:nth-last-child(1) {
          border-bottom: 0px solid rgba(0, 0, 0, 0.16);
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
        }
      }
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
