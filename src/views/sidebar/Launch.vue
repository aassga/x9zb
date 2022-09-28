<template>
  <div class="pripacy_context">
    <CommonHeader :title="$t('lang.choose_lang')"></CommonHeader>
    <div v-for="(item,index) in list" :key="index" class="pripacy_context_i">
      <div class="pripacy_context_i_text">{{item.name}}</div>
      <img @click="onHandleActive(index)" :src="item.active ? require('@/assets/my/ic-Radio-selected@3x.png') : require('@/assets/my/ic-Radio-default@3x.png')" class="pripacy_context_i_icon" />
    </div>
    <div @click="onHandleSave()" class="context_box_btn">{{$t('lang.save')}}</div>

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
          value: 'tc',
          active: false,
          name: '繁體中文'
        },
        {
          value: 'cn',
          active: false,
          name: '简体中文'
        },
        {
          value: 'en',
          active: true,
          name: 'English'
        }
      ],
      activeLang: 'en'
    }
  },

  created () {
    // 获取当前是何种语言，并且给予默认的选择项
    this.getCurrentLang()
  },

  mounted () {

  },

  methods: {
    onHandleActive (index) {
      const list = JSON.parse(JSON.stringify(this.list))
  		list.forEach((element, idx) => {
        if (index == idx) {
          element.active = true
        } else {
          element.active = false
        }
      })
      this.list = list
      this.activeLang = list[index].value
    },
    onHandleSave () {
      const _this = this
      localStorage.setItem('locale', this.activeLang)
      this.$i18n.locale = this.activeLang
      this.$message({
        type: 'success',
        message: _this.$t('lang.save_success')
      })
      window.location.reload()
      // 返回上一页
      // this.$router.go(-1)
    },
    // 获取当前的语言本地配置
    getCurrentLang () {
      const _this = this
      this.activeLang = localStorage.getItem('locale') || 'en'
      this.list.forEach((element, idx) => {
        if (_this.activeLang == element.value) {
          element.active = true
        } else {
          element.active = false
        }
      })
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
    height: 44px;
    margin-top: 6px;
    font-weight: 600;
    border-bottom: solid 1px #999999;
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
      width: 25px;
      height: 25px;
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
