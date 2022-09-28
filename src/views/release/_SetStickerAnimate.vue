<template>
  <div :class="'functional_area ' + stickerOrAnimate">
    <div class="title">
      {{ stickerOrAnimate == "sticker" ? $t('lang.post_settings') : "限時動態設定" }}
      <span class="close_btn" @click="closeSet"></span>
    </div>
    <div class="functional_container">
      <div class="functional_main">
        <div class="functional_main_top">
          <div class="vip_area">
            <i class="ic_vip"></i>
            <div class="vip_select_box">
              <div class="vip_unlock vip">
                VIP解鎖<span
                  :class="
                    isSelect == 'vip' ? 'vip_select active' : 'vip_select'
                  "
                  @click="vipSelect('vip')"
                ></span>
              </div>
              <div class="vip_unlock vvip">
                VVIP解鎖<span
                  :class="
                    isSelect == 'vvip' ? 'vip_select active' : 'vip_select'
                  "
                  @click="vipSelect('vvip')"
                ></span>
              </div>
            </div>
          </div>
          <div class="money_area">
            <i class="ic_money"></i>
            <input type="text" />
          </div>
          <div
            v-if="stickerOrAnimate == 'sticker'"
            class="position_area"
            @click="$emit('change-city')"
          >
            <i class="ic_position"></i>
            <div>東京都</div>
          </div>
        </div>
        <div v-if="stickerOrAnimate == 'sticker'" class="text_area">
          <textarea type="text" placeholder="輸入貼文內容1000字" />
        </div>
        <div class="share_btn">分享</div>
      </div>
    </div>
    <div class="setAnimate" v-if="stickerOrAnimate == 'animate'">
      <div class="fi-rr-mobile"></div>
      <ul class="setFont">
        <li>Aa</li>
        <li>Aa</li>
        <li>Aa</li>
        <li>Aa</li>
      </ul>
      <div class="setColor"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'set-sticker',
  props: {
    isShowFunctional: {
      type: Boolean
    },
    stickerOrAnimate: {
      type: String
    }
  },
  components: {},
  data () {
    return {
      isSelect: 'vip'
    }
  },
  methods: {
    closeSet () {
      if (this.isShowFunctional == true) {
        this.$emit('changeFunctional', false)
      }
    },
    vipSelect (value) {
      this.isSelect = value
    }
  }
}
</script>

<style lang="scss" scoped>
.functional_area {
  position: absolute;
  bottom: 0;
  width: 100vw;
  background-color: #fff;
  padding-bottom: 5vw;
  border-radius: 10px 10px 0 0;
  .title {
    position: relative;
    height: 12vw;
    line-height: 12vw;
    background-color: rgba(249, 249, 249, 0.94);
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.3);
    .close_btn {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      width: 4.5vw;
      height: 4.5vw;
      background: url("~@/assets/release/ic-cross.png") no-repeat center top /
        100% auto;
    }
  }
  .functional_container {
    width: 90%;
    margin: 0 auto;
    .functional_main {
      margin-top: 10px;
      font-size: 0.8rem;
      color: #6c757d;
      .functional_main_top {
        & > div {
          display: flex;
          align-items: center;
          position: relative;
          padding-left: 26%;
          height: 12vw;
          & > i {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 10%;
            width: 11vw;
            height: 11vw;
          }
        }
        .vip_area {
          .ic_vip {
            background: url("~@/assets/release/ic-vip.png") no-repeat center top /
              100% auto;
          }
          .vip_select_box {
            display: flex;
            .vip_unlock {
              display: flex;
              align-items: center;
              .vip_select {
                display: inline-block;
                width: 6vw;
                height: 6vw;
                background: url("~@/assets/release/ic-Radio-2.png") no-repeat
                  center top / 100% auto;
                margin-left: 1vw;
                &.active {
                  background-image: url("~@/assets/release/ic-Radio.png");
                }
              }
              &.vip {
                margin-right: 5vw;
              }
            }
          }
        }
        .money_area {
          .ic_money {
            background: url("~@/assets/release/ic-money.png") no-repeat center
              top / 100% auto;
          }
          input {
            width: 44vw;
            height: 7vw;
            background-color: #ffffff;
            padding-left: 5px;
            border-radius: 4px;
            border: solid 1px #cccccc;
            color: #82b1fd;
          }
        }
        .position_area {
          .ic_position {
            background: url("~@/assets/release/ic-location.png") no-repeat
              center top / 100% auto;
          }
        }
      }
      .text_area {
        textarea {
          width: 100%;
          height: 23vw;
          background-color: #ffffff;
          padding: 3vw;
          border-radius: 8px;
          border: solid 1px #cccccc;
          box-sizing: border-box;
          outline-color: #f46fe0;
        }
      }
      .share_btn {
        width: 100%;
        height: 10vw;
        line-height: 10vw;
        margin-top: 5vw;
        background-image: linear-gradient(90deg, #f46fe0 0%, #f8a9ec 100%);
        border-radius: 8px;
        color: #fff;
      }
    }
  }
  .setAnimate {
    position: absolute;
    top: -15vw;
    width: 100%;
    .fi-rr-mobile {
      position: absolute;
      left: 5vw;
      width: 10vw;
      height: 10vw;
      background: url("~@/assets/release/ic-mobile.png") no-repeat center / 60%
        auto;
      background-color: #f46fe0;
      border-radius: 50%;
    }
    .setFont {
      position: absolute;
      display: flex;
      justify-content: space-between;
      left: 50%;
      transform: translateX(-50%);
      width: 50vw;
      li {
        width: 10vw;
        height: 10vw;
        line-height: 10vw;
        background-color: #6c757d;
        border-radius: 50%;
        color: #fff;
        font-family: SF Pro;
        &:nth-child(1) {
          font-size: 0.8rem;
        }
        &:nth-child(2) {
          font-style: oblique;
        }
        &:nth-child(4) {
          font-weight: bold;
        }
      }
    }
    .setColor {
      position: absolute;
      right: 5vw;
      width: 10vw;
      height: 10vw;
      background: url("~@/assets/release/ic-color.png") no-repeat center / 100%
        auto;
    }
  }
}
</style>
