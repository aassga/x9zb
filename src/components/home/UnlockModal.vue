<template>
  <div id="unlock-modal">
      <div class="modal_content">
        <div class="header">
          <div class="close" @click="$emit('close-unlock-modal')"></div>
        </div>
        <div class="content">
          <div class="text">
            {{$t('lang.sure')}}＄{{ price }} {{$t('lang.unlock_post')}}？
          </div>
          <div class="amount">
            {{$t('lang.balance')}} {{ walletBalance }}
          </div>
        </div>
        <button @click="$emit('close-unlock-modal')">{{$t('lang.submit')}}</button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'unlock-modal',
  props: {
    price: {
      type: Number
    },
    walletBalance: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin icon-label {
    display: flex;
    height: 44px;
    line-height: 44px;
    font-size: 16px;
    padding-right: 1px;
    &:before {
      display: inline-block;
      height: 44px;
      width: 44px;
    }
}
  #unlock-modal {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 6;
  }
  .modal_content {
    position: absolute;
    width: 270px;
    height: 190px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    background-color: #f5f4f4;
    border-radius: 4px;
    z-index: 3;
    .header {
      height: 38px;
      font-size: 15px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 3rem;
      letter-spacing: 0rem;
      color: #6c757d;
      .close {
        width: 2rem;
        height: 15px;
        background: url('~@/assets/register/ic-cross@3x.png') 15px center no-repeat;
        background-size: auto 15px;
        position: absolute;
        top: 12px;
        right: 13px;
      }
    }
    .content {
      width: 259px;
      margin: 0 auto;
      font-size: 14px;
      border-bottom: 1px solid #6c757d;
      .text {
        height: 48px;
        line-height: 48px;
        text-align: left;
        color: #6c757d;
        @include icon-label();
        &:before {
            content: '';
            background-image: url('~@/assets/home/ic-smile@3x.png');
            background-size: 44px 44px;
        }
      }
      .amount {
        height: 48px;
        line-height: 48px;
        text-align: left;
        line-height: 2rem;
        color: #f46fe0;
        font-weight: bold;
        font-size: 14px;
        @include icon-label();
        &:before {
            content: '';
            background-image: url('~@/assets/home/ic-money@3x.png');
            background-size: 44px 44px;
        }
      }
    }
    button {
      width: 226px;
	    height: 35px;
      margin-top: 12px;
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
</style>
