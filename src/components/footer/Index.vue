<template>
  <div class="tabbar_context">
    <div class="tabbar_context_item" v-for="(item,index) in tabBarList" :key="index" @click="onHandleClickTab(index)">
    <!-- <template #icon="props" > -->
        <img class="tabbar_context_item_icon" :src="active == index ? item.active_img : item.img" alt="" srcset="">
    <!-- </template> -->
        <span class="red-point" v-if="item.to == '/information' && unReadNum>0"></span>
    </div>
</div>
</template>

<script>
export default {
  name: 'footer-new',
  props: {
    active: {
      type: Number,
      default: 0
    }
  },
  computed: {
    unReadNum: function () {
      return this.$store.state.user.unReadMsgNum
    }
  },
  data () {
    return {
      tabBarList: [
        {
          img: require('@/assets/footer/ic-home-normal.png'),
          active_img: require('@/assets/footer/ic-home-highlighted.png'),
          to: '/home'
        },
        {
          img: require('@/assets/footer/ic-notify-normal.png'),
          active_img: require('@/assets/footer/ic-notify-highlighted.png'),
          to: '/discover'
        },
        {
          img: require('@/assets/footer/ic-post-normal.png'),
          active_img: require('@/assets/footer/ic-post-highlighted.png'),
          to: '/release'
        },
        {
          img: require('@/assets/footer/ic-inbox-normal.png'),
          active_img: require('@/assets/footer/ic-inbox-highlighted.png'),
          to: '/information'
        },
        {
          img: require('@/assets/footer/ic-profile-normal.png'),
          active_img: require('@/assets/footer/ic-profile-highlighted.png'),
          to: '/my'
        }
      ]
    }
  },
  methods: {
    onHandleClickTab (index) {
      if (this.active == index) return
      // console.log(index);
      // this.active = index;
      this.$router.push({ path: this.tabBarList[index].to })
    }
  },
  created () {
    this.$store.dispatch('getUnReadMsgNum')
  }
}
</script>

<style lang="scss" scoped>
.red-point {
  position: absolute;
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background: red;
  right:100px;
  top:15px;
}
.tabbar_context{
  background-color: rgba(249, 249, 249, 0.94);
	box-shadow: 0px 0px 0px 0px
		rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
  justify-content: space-between;
  z-index: 999;
  position: fixed;
  bottom: 0;
  left: 0;
  .tabbar_context_item{
    width: 60px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    .tabbar_context_item_icon{
      width: 18px;
      height: 18px;
    }
  }
}
</style>
