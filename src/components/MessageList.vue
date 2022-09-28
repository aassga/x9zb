<template>
  <div class="HuyaXWebhMessagelist">
    <div
      @click="onHandleClickItem(item,index)"
      :class="['HuyaXWebhMessagelist_i',activeIndex == index ? 'active' : '']"
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
  props: ["list","activeIndex"],
  data() {
    return {
      // activeIndex: 0
      //   list: [
      //     {
      //       avater: require("@/assets/images/userLogo.png"),
      //       name: "阿里里",
      //       last_msg: {
      //         text: "dsfsfsasdfsafsffdasgadga",
      //         date: "10:00"
      //       },
      //       tips: 34
      //     }
      //   ]
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
  z-index: 2;
  top: 38px;
  left: 0;
  width: 100%;
  height: 504px;
  background-color: #fff;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  .HuyaXWebhMessagelist_i {
    padding-left: 10px;
    box-sizing: border-box;
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: space-between;
    &.active {
      background-color: #f5f7fa;
    }
    &:hover {
      background-color: #f5f7fa;
    }
    .HuyaXWebhMessagelist_i_avater_box {
      width: 25%;
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
        width: 25px;
        height: 25px;
        border-radius: 50%;
        right: 3px;
        top: 13px;
        background-color: red;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .HuyaXWebhMessagelist_i_context {
      border-bottom: 1px solid #dcd8d8;
      width: 75%;
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .HuyaXWebhMessagelist_i_context_t {
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .HuyaXWebhMessagelist_i_context_t_name {
          width: 70%;
          height: 30px;
          color: #222;
          font-size: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 30px;
        }
        .HuyaXWebhMessagelist_i_context_t_date {
          width: 30%;
          height: 30px;
          font-size: 12px;
          color: #a5a5a5;
        }
      }
      .HuyaXWebhMessagelist_i_context_b {
        line-height: 20px;
        width: 75%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: 20px;
        font-size: 14px;
        margin-top: 10px;
        color: #a5a5a5;
      }
    }
  }
}
</style>