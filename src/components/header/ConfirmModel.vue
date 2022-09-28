<template>
  <el-dialog
    id="confirm_model"
    :visible.sync="isShow"
    :before-close="() => $emit('close')"
    :append-to-body="true"
    :modal-append-to-body="true"
  >
    <div class="modal_content">
      <div class="header">
        {{ title }}
      </div>
      <div class="content">
        <div class="text">{{ content }}</div>
				<div class="footer">
					<button @click="$emit('close')">{{ cancelButtonText }}</button>
					<button @click="$emit('confirm')">{{ confirmButtonText }}</button>
      	</div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'ConfirmModel',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '確認'
    },
    content: {
      type: String,
      default: '內容'
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    confirmButtonText: {
      type: String,
      default: '確認'
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.el-dialog{
    margin-top: 20vh!important;
}
/deep/.el-dialog__header{
    display: none;
}
#confirm_model {
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
			.footer {
				display: flex;
				button {
					width: 100%;
					height: 36px;
					font-size: 14px;
					margin: 4px 4px 0;
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
