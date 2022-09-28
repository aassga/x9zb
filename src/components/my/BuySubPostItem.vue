<template>
  <div class="buySubPostItem" @click="openPosts(items)">
    <!-- 左上角标志 -->
    <div v-if="items.isunlock" class="my_context_tabs_1_left_top_icon">{{$t('lang.unlocked')}}</div>
    <!-- 右上角标志 -->
    <!-- <el-image
      fit="cover"
      :src="require('@/assets/my/fi-rr-credit-card@3x.png')"
      class="my_context_tabs_1_right_top_icon"
    ></el-image>-->
    <el-image v-if="items.preview" class="my_context_tabs_1_img" fit="cover" :src="items.preview"></el-image>
    <div v-else class="my_context_tabs_1_img_text">{{$t('lang.no_content')}}</div>

    <!-- 遮罩层 -->
    <div v-if="!items.isunlock" @click.stop="()=>{}" class="buySubPostItem_mask">
      <div @click="onLock(items,index)" class="buySubPostItem_mask_unlock">{{$t('lang.vipx_unblock').replace(/{%}/,items.level)}}</div>
      <div class="buySubPostItem_mask_date">{{items.date}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WebFeXcBuysubpostitem',

  data () {
    return {}
  },
  props: {
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
    // goToPostPage(tid) {
    //   this.$router.push({
    //     path: "/p/" + tid
    //   });
    // },
    // 展开帖子详情
    openPosts (item) {
      if (item.preview) {
        this.$emit('openPosts', item)
      } else {
        this.$message({
          type: 'success',
          message: '当前VIP套餐未发布帖文'
        })
      }
    },
    // 解锁订阅套餐
    onLock (item, index) {
      this.$emit('onLock', item, index)
    }
  }
}
</script>

<style lang="scss" scoped>
.buySubPostItem {
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
  }
  .my_context_tabs_1_img {
    width: 108px;
    height: 108px;
    border-radius: 4px;
  }
  .my_context_tabs_1_img_text {
    background-image: linear-gradient(90deg, #cbcbcb 0%, #aaa 100%);
    border-radius: 4px;
    width: 108px;
    height: 108px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    color: #fff;
  }
  .buySubPostItem_mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.17);
    .buySubPostItem_mask_unlock {
      margin: 39px auto 0;
      width: 80px;
      height: 30px;
      background-image: linear-gradient(90deg, #f46fe0 0%, #f8a9ec 100%);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: SF Pro;
      font-size: 10px;
      letter-spacing: 0px;
      color: #ffffff;
    }
    .buySubPostItem_mask_date {
      position: relative;
      left: -20px;
      margin-top: 20px;
      width: 140%;
      height: 15px;
      align-items: center;
      justify-content: center;
      font-family: SF Pro;
      font-size: 10px;
      color: #ffffff;
      transform: scale(0.75);
    }
  }
}
</style>
