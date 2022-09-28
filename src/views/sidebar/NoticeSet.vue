<template>
  <div class="pripacy_context">
    <CommonHeader :title="$t('lang.set_notification')"></CommonHeader>
    <div v-for="(item,index) in list" :key="index" :class="['pripacy_context_i',index==0 ? 'pripacy_context_i_b' : '']">
      <div class="pripacy_context_i_text">{{item.name}}</div>
      <img @click="onHandleActive(index)" :src="item.checkout ? require('@/assets/my/ic-toggle.png') : require('@/assets/my/ic-toggle-close.png')" class="pripacy_context_i_icon" />

    </div>
    <!-- <div @click="onHandleSave" class="context_box_btn">儲存</div> -->

  </div>
</template>

<script>
import CommonHeader from '@/components/header/CommonHeader.vue'

export default {
  name: 'WebFeXcPripacy',
  components: {
    CommonHeader
  },
  data () {
    return {
      list: [
        {
          checkout: true,
          name: this.$t('lang.push_notice')
        },
        {
          checkout: true,
          name: this.$t('lang.like')
        },
        {
          checkout: true,
          name: this.$t('lang.comment')
        },
        {
          checkout: true,
          name: this.$t('lang.new_fans')
        },
        {
          checkout: false,
          name: this.$t('lang.mentioned')
        },
        {
          checkout: false,
          name: this.$t('lang.new_msg')
        }
      ]
    }
  },

  mounted () {

  },

  methods: {
    onHandleGo (path) {
  		this.$router.push({ path })
    },
    onHandleSave () {
      // 返回上一页
      this.$router.go(-1)
    },
    onHandleActive (index) {
      const list = JSON.parse(JSON.stringify(this.list))

      list[index].checkout = !list[index].checkout

      this.list = list
    }
  }
}
</script>

<style lang="scss" scoped>
.pripacy_context {
  width: 100%;
  min-height: 100vh;
  background-color: rgba(249, 249, 249, 0.94);
  box-sizing: border-box;
  padding: 44px 30px 0;
  .pripacy_context_i {
    width: 100%;
    height: 50px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &.pripacy_context_i_b{
      border-bottom: solid 1px #6c757d;
    }
    .pripacy_context_i_text {
      font-family: SF Pro;
      font-size: 14px;
      font-weight: 700;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #6c757d;
    }
    .pripacy_context_i_icon {
      width: 40px;
      height: 20px;
    }
  }
  .context_box_btn {
    position: absolute;
    left: 17px;
    bottom: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 342px;
    height: 44px;
    background-image: linear-gradient(90deg, #f46fe0 0%, #f8a9ec 100%);
    border-radius: 5px;
    font-family: SourceHanSansSC-Regular;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 2px;
    color: #ffffff;
  }
}
</style>
