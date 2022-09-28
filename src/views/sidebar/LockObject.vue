<template>
  <div class="pripacy_context">
    <CommonHeader :title="$t('lang.blocked_add')"></CommonHeader>
    <div v-for="(item,index) in list" :key="index" class="pripacy_context_i">
      <div class="pripacy_context_i_l">
        <!-- <img class="pripacy_context_i_l_avater" src="@/assets/my/userpic@3x.png" alt srcset /> -->
        <img class="pripacy_context_i_l_avater" :src="item.avatar" alt srcset />
        <div class="pripacy_context_i_l_name_box">
          <div class="pripacy_context_i_l_name_box_t">{{item.nick}}</div>
          <div class="pripacy_context_i_l_name_box_b">@{{item.username}}</div>
        </div>
      </div>
      <div class="pripacy_context_i_btn" @click="unLock(item)">{{$t('lang.unblock')}}</div>
    </div>
    <!-- <div @click="onHandleSave" class="context_box_btn">儲存</div> -->
  </div>
</template>

<script>
import CommonHeader from '@/components/header/CommonHeader.vue'
import userApi from '@/api/user.js'

export default {
  name: 'WebFeXcPripacy',
  components: {
    CommonHeader
  },
  data () {
    return {
      list: []
    }
  },

  mounted () {
    this.getPrivacyBan()
  },

  methods: {
    onHandleGo (path) {
      this.$router.push({ path })
    },
    onHandleSave () {
      // 返回上一页
      this.$router.go(-1)
    },
    getPrivacyBan () {
      userApi.getPrivacyBan().then(res1 => {
        if (res1.status === 200) {
          if (res1.data.buids && res1.data.buids.length > 0) {
            userApi.getOtherUserInfo(res1.data.buids).then(res2 => {
              console.log(res2, '--reres2s')
              if (res2.status === 200) {
                this.list = res2.data
              }
            })
          } else {
            this.list = []
          }
        }
      })
    },
    // 解除封锁
    unLock (data) {
      const uid = data.uid
      userApi.deleteBan({ buid: uid }).then(res => {
        if (res.status === 200) {
          this.$message.success(this.$t('lang.message_operated_done'))
          this.getPrivacyBan()
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
    margin-top: 24px;
    height: 50px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .pripacy_context_i_l {
      height: 50px;
      display: flex;
      align-items: center;
      .pripacy_context_i_l_avater {
        width: 50px;
        height: 50px;
        margin-right: 10px;
        border-radius: 50%;
        background-color: #ccc;
        border: solid 2.5px #f46fe0;
      }
      .pripacy_context_i_l_name_box {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        .pripacy_context_i_l_name_box_t {
          font-family: SF Pro Text;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #6c757d;
        }
        .pripacy_context_i_l_name_box_b {
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
  .pripacy_context_i_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    // width: 126px;
    // height: 36px;
    padding: 5px 20px;
    background-image: linear-gradient(90deg, #f46fe0 0%, #f8a9ec 100%);
    border-radius: 5px;
    font-family: SourceHanSansSC-Regular;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 2px;
    color: #ffffff;
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
