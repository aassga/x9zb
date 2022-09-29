<template>
  <div class="HuyaXWebhMessageinfo">
    <!-- 头部固定栏 -->
    <div class="HuyaXWebhMessageinfo_title">
      <div @click="onHandleBack" class="HuyaXWebhMessageinfo_title_icon el-icon-arrow-left"></div>
      {{roomInfo.name || '未知'}}
    </div>
  </div>
</template>

<script>
export default {
  name: "HuyaXWebhMessageinfo",
  props: ["roomInfo"],
  data() {
    return {
    };
  },

  mounted() {},

  methods: {
    // 返回上一页
    onHandleBack(){
        this.$emit('close');
    },
  }
};
</script>

<style lang="scss" scoped>
.HuyaXWebhMessageinfo {
  position: absolute;
  z-index: 1;
  top: 38px;
  min-height: 46px;
  left: 0;
  width: 100%;
  
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar{
    display: none;
  }
  .HuyaXWebhMessageinfo_title {
    position: relative;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;    
    padding: 0 15px;
    font-size: 14px;
    box-sizing: border-box;
    border-bottom: 1px solid #dcd8d8;
    background-color: #ececec;
    .HuyaXWebhMessageinfo_title_icon {
      position: absolute;
      left: 15px;
      top: 5px;
      width: 30px;
      height: 30px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .HuyaXWebhMessageinfo_context {
      position: absolute;
      top:40px;
      left:0;
    width: 100%;
    height: 319px;
    overflow-x: hidden;
    overflow-y: scroll;
      &::-webkit-scrollbar{
    display: none;
  }
  }
  .HuyaXWebhMessageinfo_send {
    .send-container {
      height: 140px;
      position: absolute;
      bottom: 0;
      min-width: 335px;
      line-height: 50px;
      background: #fff;
      padding: 10px;
      border-top: 1px solid #f1f1f1;
      text-align: left;
      .inputcover {
        position: absolute;
        height: 33px;
        width: calc(100% - 185px);
        margin: 5px 10px 0 0;
        z-index: 1000;
        border-radius: 17px;
        background: rgba(255, 255, 255, 0.5);
        padding-left: 10px;
        position: absolute;
        border-color: #f1f1f1;
        border: 1px solid #ccc;
        font-size: 14px;
        outline: none;
        -webkit-appearance: none;
        width: calc(100% - 185px);
        line-height: 33px;
      }
      input {
        height: 33px;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.5);
        padding: 0 10px;
        position: absolute;
        top: 4px;
        height: 66px;
        border-color: #f1f1f1;
        border: 1px solid #ccc;
        font-size: 14px;
        outline: none;
        -webkit-appearance: none;
        width: 85%;
      }
      span {
        display: inline-block;
        width: 44px;
        height: 44px;
        position: absolute;
        top: 4px;
      }

      .control-footer {
        position: absolute;
        bottom: 0;
        width: 96%;
        height: 50px;
        .send {
          display: inline-block;
          padding: 0 20px;
          position: absolute;
          right: 6px;
          bottom: 10px;
          border-radius: 6px;
          color: #fff;
          background: linear-gradient(114deg, #eecfb5 -2%, #d8ad66);
          height: 30px;
          line-height: 30px;
        }
      }
    }
  }
}
</style>