<template>
  <el-dialog id="user_address" :visible.sync="isshow" @close="$emit('closeNotEnable')" :append-to-body="true"
    :modal-append-to-body="true">
    <div class="modal_content">
      <div class="header">
        {{$t('lang.available')}}
        <div class="love"></div>
      </div>
      <div class="content">
        <div class="text">{{$t('lang.not_open')}}</div>
        <button @click="$emit('closeNotEnable')">{{$t('lang.understand')}}</button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'NotEnable',
  props: {
    isshow: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
.el-dialog{
    margin-top: 20vh!important;
}
.el-dialog__header{
    display: none;
}
#user_address {
  display: block;
  .modal_content {
    position: absolute;
    width: 270px;
    height: 199px;
    top: calc(50vh - (351px / 2));
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
      text-align: center;
      color: #6c757d;
      border-bottom: 1px solid #6c757d;
      .love {
        width: 2.4rem;
        height: 2rem;
        background: url("~@/assets/register/ic-tools.png") 1rem center no-repeat;
        background-size: auto 1.4rem;
        position: absolute;
        top: 1rem;
        left: 12px;
      }
    }
    .content {
      width: calc(100% - 4rem);
      margin: 0 auto;
      .text {
        width: 100%;
        padding-top: 8px;
        padding-bottom: 8px;
        text-align: left;
        height: 60px;
        color: #6c757d;
        font-size: 14px;
        span {
          color: #f46fe0;
          &.line {
            color: #6c757d;
            text-decoration: underline;
          }
        }
      }
      button {
        width: 100%;
        height: 36px;
        font-size: 14px;
        margin-top: 4px;
        border: 0;
        background-image: radial-gradient(
          circle at 50% 50%,
          #f46fe0,
          #f8a9ec 97%
        );
        color: #fff;
        border-radius: 8px;
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
