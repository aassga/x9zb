<template>
  <view class="swiper-wrapper">
    <view class="mask" />
    <swiper
      class="swiper"
      :style="{ width, height }"
      :indicator-dots="false"
      :autoplay="true"
      :interval="speed"
      :duration="speed"
      :circular="true"
      :vertical="true"
      :display-multiple-items="count"
      easing-function="linear"
    >
      <swiper-item v-for="item of list">
        <view class="swiper-item">
          <slot name="item" :data="item">
            {{ item }}
          </slot>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  props: {
    speed: {
      type: Number,
      default: 2000 // ms
    },
    count: {
      type: Number,
      default: 5 // ms
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '500rpx'
    },
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scope>
.swiper-wrapper {
  position: relative;
  .swiper {
    width: 100%;
    height: 300rpx;
  }
  .mask {
    position: absolute;
    pointer-events: false;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 99;
  }
}
</style>
