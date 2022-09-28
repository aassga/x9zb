<template>
  <div class="pripacy_context">
    <CommonHeader :title="$t('lang.privacy_security')"></CommonHeader>
    <div @click="onHandleGo(item.path)" v-for="(item,index) in list" :key="index" class="pripacy_context_i">
      <div class="pripacy_context_i_text">{{item.name}}</div>
      <div class="pripacy_context_i_icon el-icon-arrow-right"></div>

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
          path: '/openComment',
          name: this.$t('lang.comments_choose')
        },
        {
          path: '/lockObject',
          name: this.$t('lang.blocked_add')
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
    .pripacy_context_i_text {
      font-family: SF Pro;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #6c757d;
    }
    .pripacy_context_i_icon {
      width: 20px;
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
