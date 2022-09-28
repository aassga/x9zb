<template>
  <div class="open_comment_context">
    <CommonHeader :title="$t('lang.comments_choose')"></CommonHeader>
    <div class="open_comment_context_title">{{this.$t('lang.who_posts')}}?</div>
    <div v-for="item in list" :key="item.value" class="open_comment_context_i" @click="onHandleActive(item)">
      <div class="open_comment_context_i_text">{{item.name}}</div>
      <img :src="canreply === item.value ? require('@/assets/my/ic-Radio-selected@3x.png') : require('@/assets/my/ic-Radio-default@3x.png')" class="open_comment_context_i_icon" />
    </div>
    <div @click="onHandleSave" class="context_box_btn">{{this.$t('lang.save')}}</div>
  </div>
</template>

<script>
import CommonHeader from '@/components/header/CommonHeader.vue'
import { mapState } from 'vuex'
export default {
  name: 'WebFeXcOpenComment',
  components: {
    CommonHeader
  },
  data () {
    return {
      list: [
        {
          name: this.$t('lang.all_person'),
          value: 0
        },
        {
          name: this.$t('lang.fan'),
          value: 1
        },
        {
          name: this.$t('lang.followers'),
          value: 2
        },
        {
          name: this.$t('lang.close_msg'),
          value: -1
        }
      ],
      canreply: 0
    }
  },
  computed: {
    ...mapState({
      user_info: state => state.user.user_info
    })
  },

  mounted () {
    this.canreply = this.user_info.canreply
  },

  methods: {
    onHandleActive (item) {
      this.canreply = item.value
    },
    onHandleSave () {
      this.$store
        .dispatch('putProfile', {
          canreply: this.canreply
        }).then(res => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: '修改成功~'
            })
            this.$store.dispatch('delProfileCache')
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.open_comment_context {
  width: 100%;
  min-height: 100vh;
  background-color: rgba(249, 249, 249, 0.94);
  box-sizing: border-box;
  padding: 44px 30px 0;
    .open_comment_context_title {
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
  .open_comment_context_i {
    width: 100%;
    height: 44px;
    margin-top: 6px;
    font-weight: 600;
    border-bottom: solid 1px #999999;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .open_comment_context_i_text {
      font-family: SF Pro;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #6c757d;
    }
    .open_comment_context_i_icon {
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
