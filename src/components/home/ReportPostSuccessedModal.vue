<template>
  <el-dialog id="report-post-successed-modal"
    :visible.sync="visible"
    :before-close="closeAgreememtModal"
    :modal-append-to-body="!!modalType ? true : false"
    :append-to-body="!!modalType ? true: false"
  >
      <div class="modal_content">
        <div class="header">
          {{$t('lang.thank_for_know')}}
          <div class="love"></div>
        </div>
        <div class="content">
          <div class="text">
            {{$t('lang.report_important')}}
          </div>
          <button @click="$emit('close')">{{$t('lang.understand')}}</button>
        </div>
      </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'report-post-successed-modal',
  props: {
    visible: {
      type: Boolean
    },
    modalType: {
      type: Number,
      default: 0 // 0貼文 1用戶
    }
  },
  methods: {
    closeAgreememtModal () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
#report-post-successed-modal {
    // position: fixed;
    // width: 100%;
    // height: 100%;
    // top: 0;
    // left: 0;
    // background-color: rgba(0, 0, 0, .5);
    // z-index: 5;
  .modal_content {
    position: absolute;
    width: 270px;
	  // height: 199px;
    padding-bottom: 20px;
    top: calc(50vh - (199px/2));
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    background-color: #f5f4f4;
    border-radius: 4px;
    z-index: 3;
    .header {
      height: 65px;
      font-size: 15px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 65px;
      letter-spacing: 0rem;
      color: #6c757d;
      border-bottom: 1px solid #6c757d;
      text-align: center;
      .love {
        width: 2.4rem;
        height: 2rem;
        background: url('~@/assets/register/ic-heart.png') 1rem center no-repeat;
        background-size: auto 1.4rem;
        position: absolute;
        top: 1rem;
        left: 30px;
      }
    }
    .content {
      width: calc(100% - 4rem);
      margin: 0 auto;
      .text {
        width: 100%;
        padding-top: 1rem;
        padding-bottom: 1rem;
        text-align: left;
        color: #6c757d;
        font-size: 14px;
      }
      button {
        width: 100%;
	      height: 36px;
        font-size: 16px;
        margin-top: 4px;
        border: 0;
        background-image: radial-gradient(
                            circle at 50% 50%,
                            #f46fe0,
                            #f8a9ec 97%);
        color: #fff;
        border-radius: 5px;
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
