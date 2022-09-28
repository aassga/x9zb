<template>
  <div class="attention_context">
    <CommonHeader :title="$t('lang.follow_details')"></CommonHeader>
    <div v-for="(item,index) in list" :key="index" class="attention_context_i">
      <div class="attention_context_i_l" @click="goToUserPage(item.uid)">
        <!-- <img class="attention_context_i_l_avater" src="@/assets/my/userpic@3x.png" alt srcset /> -->
        <img class="attention_context_i_l_avater" :src="item.avatar" alt srcset />
        <div class="attention_context_i_l_name_box">
          <div class="attention_context_i_l_name_box_t">{{item.nick}}</div>
          <div class="attention_context_i_l_name_box_b">@{{item.username}}</div>
        </div>
      </div>
      <div class="attention_context_i_btn isSet" @click="unAttention(item)">{{$t('lang.following')}}</div>
    </div>
    <!-- <div @click="onHandleSave" class="context_box_btn">儲存</div> -->
  </div>
</template>

<script>
import CommonHeader from '@/components/header/CommonHeader.vue'
import userApi from '@/api/user.js'
import { mapState } from 'vuex'
export default {
  name: 'attentionDetail',
  components: {
    CommonHeader
  },
  data () {
    return {
      list: []
    }
  },
  computed: {
    ...mapState({
      userInfo: ({ user }) => user.user_info
    })
  },
  mounted () {
    this.getAttentionList()
  },

  methods: {
    onHandleGo (path) {
      this.$router.push({ path })
    },
    onHandleSave () {
      // 返回上一页
      this.$router.go(-1)
    },
    getAttentionList () {
      userApi.getAttentionList().then(res => {
        if (res.status === 200) {
          this.list = res.data.models
        }
      })
    },
    // 取消关注
    unAttention (data) {
      const uid = data.uid
      userApi.delAttention({ target_uid: uid }).then(res => {
        if (res.status === 200) {
          this.$message.success(this.$t('lang.message_operated_done'))
          this.getAttentionList()
        }
      })
    },
    // 跳转到个人详情页面
    goToUserPage (uid) {
      if (this.userInfo.uid == uid) {
        this.$router.push({ path: '/my' })
      } else {
        this.$router.push({ path: '/userInfo/' + uid })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.attention_context {
  width: 100%;
  min-height: 100vh;
  background-color: rgba(249, 249, 249, 0.94);
  box-sizing: border-box;
  padding: 44px 30px 0;
  .attention_context_i {
    width: 100%;
    margin-top: 24px;
    height: 50px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .attention_context_i_l {
      height: 50px;
      display: flex;
      align-items: center;
      .attention_context_i_l_avater {
        width: 50px;
        height: 50px;
        margin-right: 10px;
        border-radius: 50%;
        background-color: #ccc;
        border: solid 2.5px #f46fe0;
        object-fit: cover;
      }
      .attention_context_i_l_name_box {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        .attention_context_i_l_name_box_t {
          font-family: SF Pro Text;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #6c757d;
        }
        .attention_context_i_l_name_box_b {
          margin-top: 4px;
          font-family: SF Pro;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #343a40;
        }
      }
    }
  }
  .attention_context_i_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 36px;
    // padding: 5px 20px;
    background-image: linear-gradient(90deg, #f46fe0 0%, #f8a9ec 100%);
    border-radius: 5px;
    font-family: SourceHanSansSC-Regular;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 2px;
    color: #ffffff;
  }
  .isSet {
    background-image: linear-gradient(90deg, #fff 0%, #fff 100%);
    border: 1px solid #f46fe0;
    color: #f46fe0;
    box-sizing: border-box;
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
