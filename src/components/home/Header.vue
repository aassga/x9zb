<template>
  <div id="home-header">
    <!-- <div class="location" @click="showNotEnable"> -->
    <div class="logo"></div>
    <div class="money" @click="showNotEnable">
      <div class="icon"></div>
      <div class="amount">0.00</div>
    </div>
    <div class="location" @click="$emit('change-city')">
      <div class="icon"></div>
      <div class="name">{{ stateName || $t('lang.unknown') }}</div>
    </div>
    <div class="search" @click="$emit('open-search-modal')"></div>
    <NotEnable :isshow="isShowEnable" @closeNotEnable="() => isShowEnable = false" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NotEnable from '@/components/header/NotEnable.vue'
export default {
  name: 'home-header',
  components: {
    NotEnable
  },
  data () {
    return {
      isShowEnable: false
    }
  },
  methods: {
    showNotEnable () {
      this.isShowEnable = true
    }
  },
  computed: {
    ...mapState({
      stateName: state => state.user.stateName,
      userInfo: state => state.user.user_info
    }),
    user_info () {
      return {
        ...this.info,
        ...this.userInfo
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#home-header {
  width: 100vw;
  height: 3.2rem;
  top: 0px;
  left: 0px;
  position: fixed;
  background-color: #f1f0ef;
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.3);
  display: flex;
  z-index: 999;
  .location {
    display: flex;
    height: 44px;
    line-height: 3.2rem;
    color: #6c757d;
    font-size: 1rem;
    padding-right: 1rem;
    .icon {
      &:before {
        display: inline-block;
        content: "";
        background-image: url("~@/assets/home/ic-location@3x.png");
        background-size: 44px 44px;
        height: 44px;
        width: 44px;
        margin-top: 0.25rem;
      }
    }
    .name {
      // margin-left: .25rem;
      font-size: 14px;
    }
  }
  .logo {
    position: relative;
    width: 108px;
    height: 22px;
    background: url("~@/assets/home/ic-logo-enText@3x.png") no-repeat no-repeat;
    background-size: auto 22px;
    display: flex;
    align-self: center;
    margin-left: 20px;
  }
  .money {
    display: flex;
    // height: 2.2rem;
    // width: 100px;
    line-height: 2.4rem;
    color: #f46fe0;
    // font-size: 1rem;
    font-size: 16px;
    margin-left: auto;
    // margin-right: 1rem;
    // margin-right: 10px;
    .icon {
      &:before {
        display: inline-block;
        content: "";
        background-image: url("~@/assets/home/ic-money@3x.png");
        background-size: 44px 44px;
        height: 44px;
        width: 44px;
        margin-top: 0.15rem;
      }
    }
    .amount {
      // margin-right: 44px;
      font-size: 16px;
      position: relative;
      // height: 1.2rem;
      display: flex;
      align-self: center;
      // margin-left: auto;
    }
  }
  .search {
    position: relative;
    height: 44px;
    width: 44px;
    background: url("~@/assets/home/ic-search@3x.png");
    background-size: 44px 44px;
    // margin-left: auto;
    margin-right: 5px;
    display: flex;
    align-self: center;
  }
}
</style>
