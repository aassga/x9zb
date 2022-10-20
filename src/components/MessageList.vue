<template>
  <div class="HuyaXWebhMessagelist">
    <div
      @click="onHandleClickItem(item,index)"
      :class="['HuyaXWebhMessagelist_i',activeIndex === index ? 'active' : '']"
      v-for="(item,index) in list"
      :key="index"
    >
      <div class="HuyaXWebhMessagelist_i_avater_box">
        <img
          class="HuyaXWebhMessagelist_i_avater"
          :src="item.avater || require('@/assets/images/userLogo.png')"
          alt
          srcset
        />
        <div
          class="HuyaXWebhMessagelist_i_avater_tips"
          v-show="item.unread_count && item.unread_count > 0"
        >{{item.unread_count > 99 ? '99+' : item.unread_count}}</div>
      </div>
      <div class="HuyaXWebhMessagelist_i_context">
        <div class="HuyaXWebhMessagelist_i_context_t">
          <div class="HuyaXWebhMessagelist_i_context_t_name">{{item.name || '未知'}}</div>
          <div
            class="HuyaXWebhMessagelist_i_context_t_date"
          >{{item.last_msg ? item.last_msg.creation_time : '未知'}}</div>
        </div>
        <div class="HuyaXWebhMessagelist_i_context_b">{{item.last_msg ? item.last_msg.text : '未知'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HuyaXWebhMessagelist",
  props:{
    list:{
      type:Array
    },
    activeIndex:{
      type:null
    }
  },
  data() {
    return {
    };
  },

  mounted() {},

  methods: {
    // 点击tab事件
    onHandleClickItem(item, index) {
      // this.activeIndex = index;
      this.$emit("onHandleClickItem", item, index);
    }
  }
};
</script>

<style lang="scss" scoped>
.HuyaXWebhMessagelist {
  position: absolute;
  z-index: 99;
  // top: 46px;
  left: 0;
  width: 100%;
  height: calc(100% - 38px);
  background-color: #fff;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  .HuyaXWebhMessagelist_i {
    box-sizing: border-box;
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #dcd8d8;
    cursor: pointer;
    &.active {
      background-color: #fffbf5;
    }
    &:hover {
      background-color: #fffbf5;
    }
    .HuyaXWebhMessagelist_i_avater_box {
      width: 22%;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      .HuyaXWebhMessagelist_i_avater {
        width: 50px;
        height: 50px;
        border-radius: 5px;
      }
      .HuyaXWebhMessagelist_i_avater_tips {
        position: absolute;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        right: 3px;
        top: 18px;
        background-color: red;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .HuyaXWebhMessagelist_i_context {
      width: 78%;
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .HuyaXWebhMessagelist_i_context_t {
        width: 100%;
        height: 30px;
        padding-right: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .HuyaXWebhMessagelist_i_context_t_name {
          width: 48%;
          height: 30px;
          color: #000;
          font-size: 16px;
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 30px;
        }
        .HuyaXWebhMessagelist_i_context_t_date {
          width: 52%;
          height: 30px;
          font-size: 14px;
          color: #a5a5a5;
          white-space: nowrap;
          line-height: 30px;
        }
      }
      .HuyaXWebhMessagelist_i_context_b {
        line-height: 20px;
        width: 100%;
        padding-right: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: 20px;
        font-size: 16px;
        color: #000000cc;
      }
    }
  }
}
</style>