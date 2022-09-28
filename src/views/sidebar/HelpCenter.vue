<template>
  <div class="pripacy_context">
    <CommonHeader :title="$t('lang.hep_center')"></CommonHeader>
    <div class="pripacy_context_title">{{$t('lang.top_Questions')}}</div>
    <div
      @click="onHandleGo(item.path, index)"
      v-for="(item,index) in list"
      :key="index"
      class="pripacy_context_i"
    >
      <div class="pripacy_context_i_text">{{item.name}}</div>
      <div class="pripacy_context_i_icon el-icon-arrow-right"></div>
    </div>
    <NotEnable :isshow="isShowEnable" @closeNotEnable="() => isShowEnable = false" />

    <!-- <div @click="onHandleSave" class="context_box_btn">儲存</div> -->
  </div>
</template>

<script>
import CommonHeader from '@/components/header/CommonHeader.vue'
import NotEnable from '@/components/header/NotEnable.vue'
export default {
  name: 'WebFeXcPripacy',
  components: {
    CommonHeader,
    NotEnable
  },
  data () {
    return {
      isShowEnable: false,
      list: [
        {
          path: '/HelpInfo',
          name: this.$t('lang.rise_fan'),
          disabled: true
        },
        {
          path: '/ForestPwd',
          name: this.$t('lang.forget_psw'),
          disabled: false
        },
        {
          path: '/LockObject',
          name: this.$t('lang.blocked_user'),
          disabled: false
        },
        {
          path: '/HelpInfo',
          name: this.$t('lang.how_comments'),
          disabled: true
        }
      ]
    }
  },

  mounted () {},

  methods: {
    onHandleGo (path, index) {
      console.log(index)
      if (index == 0 || index == 3) {
        this.isShowEnable = true
      } else {
        this.$router.push({ path })
      }
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
  .pripacy_context_title {
    margin-top: 14px;
    margin-bottom: 30px;
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: SF Pro;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #7a7e83;
  }
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
