<template>
  <div class="BuyPostItem" @click="goToPostPage(items.tid)">
    <!-- 左上角标志 -->
    <div v-if="isunlock && items.isunlock"  class="my_context_tabs_1_left_top_icon">已购买</div>
    <!-- 右上角标志 -->
    <div
      :class="['my_context_tabs_1_right_top_icon',items.type == 'img' ? 'icon-image' : 'icon-video']"
    ></div>
    <el-image class="my_context_tabs_1_img" fit="cover" :src="items.preview"></el-image>
    <!-- 遮罩层 -->
    <div v-if="!isunlock && !items.isunlock" @click.stop="()=>{}" class="BuyPostItem_mask">
      <div @click="onLock(items,index)" class="BuyPostItem_mask_unlock">${{items.mcnitem_price}}</div>
      <!-- <div class="BuyPostItem_mask_date">2022/3/9~2022/4/8</div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'WebFeXcBuyPostItem',

  data () {
    return {}
  },
  props: {
    isunlock: {
      type: Boolean,
      default: false
    },
    items: {
      type: Object,
      default () {
        return {}
      }
    },
    index: {
      type: String | Number,
      default: 0
    }
  },
  mounted () {},

  methods: {
    // 去往帖子详情
    goToPostPage (tid) {
      this.$router.push({
        path: '/p/' + tid
      })
    },
    // 解锁订阅套餐
    onLock (item, index) {
      this.$emit('onLock', item, index)
    }
  }
}
</script>

<style lang="scss" scoped>
.BuyPostItem {
            border-radius: 5px;
        overflow: hidden;
  position: relative;
  width: 108px;
  height: 108px;
  margin-right: 7px;
  margin-top: 5px;
  &:nth-child(3n) {
    margin-right: 0;
  }
  .my_context_tabs_1_left_top_icon {
    z-index: 9;
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(90deg, #f46fe0 0%, #f8a9ec 100%);
    // width: 36px;
    padding: 0 2px;
    height: 14px;
    font-family: PingFang TC;
    font-size: 8px;
    border-radius: 2px;
    font-weight: normal;
    font-stretch: normal;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0px;
    color: #ffffff;
  }
  .my_context_tabs_1_right_top_icon {
    z-index: 9;
    position: absolute;
    top: 0;
    right: 0;
    width: 16px;
    height: 16px;
    font-size: 16px;
    color: #222;
  }
  .my_context_tabs_1_img {
    width: 108px;
    height: 108px;
    border-radius: 4px;
  }
  .BuyPostItem_mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.17);
    .BuyPostItem_mask_unlock {
      margin: 39px auto 0;
      width: 80px;
      height: 30px;
      background-image: linear-gradient(90deg, #f46fe0 0%, #f8a9ec 100%);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: SF Pro;
      font-size: 14px;
      letter-spacing: 0px;
      color: #ffffff;
    }
    .BuyPostItem_mask_date {
      margin-top: 20px;
      width: 100%;
      height: 15px;
      align-items: center;
      justify-content: center;
      font-family: SF Pro;
      font-size: 10px;
      color: #ffffff;
    }
  }
}
</style>
