<template>
  <el-drawer
    :withHeader="false"
    :append-to-body="true"
    :modal-append-to-body="false"
    custom-class="share_model"
    :visible.sync="show"
    direction="btt"
    :before-close="close"
  >
    <div class="share_model_context">
      <div class="share_nodel_header">
        {{$t('lang.send_to')}}
        <div class="close" @click="close"></div>
      </div>
      <div class="share_nodel_content">
        <div class="share_nodel_content_list">
          <div class="item_group" @click="shareInfo('whatsapp')">
            <div class="icon"><div class="whatsapp"></div></div>
            <div class="text">whatsapp</div>
          </div>
          <div class="item_group" @click="shareInfo('sms')">
            <div class="icon"><div class="message"></div></div>
            <div class="text">{{$t('lang.message')}}</div>
          </div>
          <div class="item_group" @click="shareInfo('facebook')">
            <div class="icon"><div class="facebook"></div></div>
            <div class="text">Facebook</div>
          </div>
          <div class="item_group" @click="copyLink">
            <div class="icon"><div class="copylink"></div></div>
            <div class="text">{{$t('lang.copy_link')}}</div>
          </div>
          <div class="item_group" @click="shareInfo('telegram')">
            <div class="icon"><div class="telegram"></div></div>
            <div class="text">Telegram</div>
          </div>
          <div class="item_group" @click="shareInfo('email')">
            <div class="icon"><div class="email"></div></div>
            <div class="text">Email</div>
          </div>
        </div>
        <div class="share_nodel_content_list">
          <div class="item_group" @click="report">
            <div class="icon"><div class="report"></div></div>
            <div class="text">{{$t('lang.report')}}</div>
          </div>
          <div class="item_group" @click="blockade">
            <div class="icon"><div class="blockade"></div></div>
            <div class="text">{{$t('lang.block')}}</div>
          </div>
        </div>
      </div>
      <input id="cplink" />
    </div>
    <NotEnable :isshow="isShowEnable" @closeNotEnable="() => isShowEnable = false"></NotEnable>
    <ReportPostModal
      v-if="isShowReportPostModal"
      :visible="isShowReportPostModal"
      :modalType="1"
      @next="reportPostModalClose"
      @close-report-post-modal="isShowReportPostModal = false"
    />
    <ReportPostReasonModal
      v-if="isShowReportPostReasonModal"
      :visible="isShowReportPostReasonModal"
      :modalType="1"
      @next="reportPostReason"
      @close-report-post-reason-modal="isShowReportPostReasonModal = false"
    />
    <ReportPostSuccessedModal
      v-if="isShowReportPostSuccessedModal"
      :visible="isShowReportPostSuccessedModal"
      :modalType="1"
      @close="isShowReportPostSuccessedModal = false"
    />
  </el-drawer>
</template>

<script>
import NotEnable from '@/components/header/NotEnable.vue'
import ReportPostModal from '@/components/home/ReportPostModal.vue'
import ReportPostReasonModal from '@/components/home/ReportPostReasonModal.vue'
import ReportPostSuccessedModal from '@/components/home/ReportPostSuccessedModal.vue'
import ReportApi from '@/api/report.js'
import userApi from '@/api/user.js'
export default {
  name: 'shareModel',
  components: {
    NotEnable,
    ReportPostModal,
    ReportPostReasonModal,
    ReportPostSuccessedModal
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isShowEnable: false,
      isShowReportPostModal: false,
      isShowReportPostReasonModal: false,
      isShowReportPostSuccessedModal: false,
      uid: '',
      typeId: 0,
      reportReason: ''
    }
  },
  mounted () {
    this.uid = this.$route.params.uid
  },
  methods: {
    shareInfo (type) {
      const href = encodeURIComponent(document.location.href)
      const title = encodeURIComponent(document.title)
      switch (type) {
        case 'facebook':
          window.open('http://www.facebook.com/share.php?u=' + href + '&t=' + title)
          break
        case 'whatsapp':
          window.open('https://api.whatsapp.com/send?text=' + href + '&via=' + title)
          break
        case 'telegram':
          window.open('https://t.me/share/url?url=' + href)
          break
        case 'sms':
          window.open('sms:?body=' + href)
          break
        case 'email':
          window.open('mailto:?body=' + href)
          break
      }
    },
    close () {
      this.$emit('close')
    },
    showNotEnable () {
      this.isShowEnable = true
    },
    copyLink () {
      const url = document.location.href
      document.getElementById('cplink').value = url
      const copyLinkText = document.getElementById('cplink')
      copyLinkText.select()
      document.execCommand('copy')
      this.$message.success(this.$t('lang.message_copied'))
    },
    report () {
      this.isShowReportPostModal = true
    },
    reportPostModalClose (typeId) {
      this.typeId = typeId
      this.isShowReportPostModal = false
      this.$nextTick(() => {
        this.isShowReportPostReasonModal = true
      })
    },
    reportPostReason (reason) {
      this.reportReason = reason
      ReportApi.reportAcc({
        tid: 0, // tid先寫死
        touid: this.uid,
        typeId: this.typeId,
        txtmsg: this.reportReason
      }).then(res => {
        if (res.status === 200) {
          this.isShowReportPostReasonModal = false
          this.$nextTick(() => {
            this.isShowReportPostSuccessedModal = true
          })
        } else {

        }
      })
    },
    blockade () {
      userApi.putPrivacyBan({
        buid: this.uid
      }).then(res => {
        if (res.status === 200) {
          this.$message.success(this.$t('lang.message_operated_done'))
        }
      })
    }
  }
}
</script>

<style lang="scss">
#cplink{
  opacity: 0;
  position: absolute;
}
.share_model {
  // position: absolute;
  box-shadow: 0px 12px 12px 0px rgba(0, 0, 0, 0.16);
  border-radius: 8px 8px 0px 0px;
  width: 100%;
  min-height: 200px;
  height: auto !important;
  .share_model_context {
    background-color: #ffffff;
    .share_nodel_header {
      height: 44px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      font-weight: bold;
      background-color: rgba(249, 249, 249, 0.94);
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
    .share_nodel_content {
      padding-bottom: 20px;
      .share_nodel_content_list {
        display: flex;
        align-items: stretch;
        justify-content: flex-start;
        padding-bottom: 20px;
        &:first-child {
          border-bottom: 1px solid #ddd;
        }
        .item_group {
          width: 16.66667%;
          .icon {
            height: 60px;
            padding: 8px;
            box-sizing: border-box;
            .whatsapp {
              width: 100%;
              height: 100%;
              background: url("~@/assets/my/whatsapp.png") 24px center no-repeat;
              background-size: auto 24px;
              background-position: 50% 50%;
              background-color: #53d365;
              color: #fff;
              border-radius: 50%;
            }
            .message {
              width: 100%;
              height: 100%;
              background: url("~@/assets/my/fi-rs-envelope-1.png") 24px center no-repeat;
              background-size: auto 24px;
              background-position: 50% 50%;
              background-color: #e97b86;
              color: #fff;
              border-radius: 50%;
            }
            .facebook {
              width: 100%;
              height: 100%;
              background: url("~@/assets/my/facebook.png") 24px center no-repeat;
              background-size: auto 24px;
              background-position: 50% 50%;
              background-color: #6784fe;
              color: #fff;
              border-radius: 50%;
            }
            .copylink {
              width: 100%;
              height: 100%;
              background: url("~@/assets/my/fi-rs-envelope-2.png") 24px center no-repeat;
              background-size: auto 24px;
              background-position: 50% 50%;
              background-color: #f46fe0;
              color: #fff;
              border-radius: 50%;
            }
            .telegram {
              width: 100%;
              height: 100%;
              background: url("~@/assets/my/Telegram.png") 24px center no-repeat;
              background-size: auto 24px;
              background-position: 50% 50%;
              background-color: #82b1fd;
              color: #fff;
              border-radius: 50%;
            }
            .email {
              width: 100%;
              height: 100%;
              background: url("~@/assets/my/fi-rs-envelope.png") 24px center no-repeat;
              background-size: auto 24px;
              background-position: 50% 50%;
              background-color: #744fff;
              color: #fff;
              border-radius: 50%;
            }
            .report {
              width: 100%;
              height: 100%;
              background: url("~@/assets/my/fi-rr-flag.png") 24px center no-repeat;
              background-size: auto 24px;
              background-position: 50% 50%;
              background-color: #ccc;
              color: #fff;
              border-radius: 50%;
            }
            .blockade {
              width: 100%;
              height: 100%;
              background: url("~@/assets/my/ic- blockade.png") 24px center no-repeat;
              background-size: auto 24px;
              background-position: 50% 50%;
              background-color: #ccc;
              color: #fff;
              border-radius: 50%;
            }
          }
          .text {
            font-size: 12px;
            line-height: 12px;
            color: #6c757d;
            text-align: center;
            word-break: break-all;
          }
        }
      }
    }
  }
}
</style>
