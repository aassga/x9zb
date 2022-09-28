<template>
  <div class="CommonHeader_context">
    <div @click="onBack" class="mainHeader_back el-icon-arrow-left"></div>
    <div class="CommonHeader_context_title">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: 'WebFeXcCommonheader',

  data () {
    return {}
  },
  props: {
    title: {
      type: String,
      default: '标题'
    }
  },
  mounted () {},

  methods: {
    // 返回事件
    onBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.CommonHeader_context {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f1f0ef;
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.1);
  z-index: 999;
  .mainHeader_back {
    // margin-left: 16px;
    color: #f46fe0;
    font-size: 23px;
    padding: 11px 20px 11px 10px;
    position: absolute;
    left: 0;
  }
  .CommonHeader_context_title {
    font-family: SF Pro;
    font-size: 17px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #6c757d;
  }
}
</style>
