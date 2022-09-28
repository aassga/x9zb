<template>
  <div class="PostItem" @click="goToPostPage(items.tid)">
    <!-- 左上角标志 -->
    <div v-if="isunlock" class="my_context_tabs_1_left_top_icon">{{statusList[status]}}</div>
    <!-- 右上角标志 -->
    <div
      :class="['my_context_tabs_1_right_top_icon',items.type == 'img' ? 'icon-image' : 'icon-video']"
    ></div>
    <el-image class="my_context_tabs_1_img" fit="cover" :src="items.preview"></el-image>
    <!-- 遮罩层 -->
    <div
      v-if="!items.isunlock && pageRouterName != 'my'"
      @click.stop="()=>{}"
      class="PostItem_mask"
    >
      <div
        @click="onLock(items,index)"
        class="PostItem_mask_unlock"
      >{{ status == 2 ? this.$t('lang.subscrip_VIP') : '$' + items.mcnitem_price}}</div>
      <!-- <div v-if="status == 2" class="PostItem_mask_date">{{items.date}}</div> -->
    </div>
    <div v-if="status == 2" class="PostItem_mask_date">{{items.date}}</div>
  </div>
</template>

<script>
export default {
  name: 'WebFeXcPostItem',

  data () {
    return {
      statusList: [this.$t('lang.free_post'), this.$t('lang.paid_post'),, this.$t('lang.combo_post')],
      status: 0
    }
  },
  props: {
    pageRouterName: {
      type: String,
      default: 'my'
    },
    uid: {
      type: String | Number,
      default: 0
    },
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
  created () {},
  mounted () {
    // console.log(this.items)
    if (this.items.mcnsub_id != 0) {
      this.status = 2
    } else if (this.items.mcnitem_price > 0) {
      this.status = 1
    }
  },

  methods: {
    // 去往帖子详情
    goToPostPage (tid) {
      this.$router.push({
        path: '/p/' + tid
      })
    },
    // 解锁订阅套餐
    onLock (item, index) {
      if (this.status == 2) {
        this.onHandleOpenUnsubPost(item, index)
      } else {
        this.onHandleOpenUnlockPost(item, index)
      }
    },
    // 点击购买解锁帖子
    onHandleOpenUnlockPost (item, index) {
      const _this = this
      const items = item
      this.$alert(this.$t('lang.unblock_the_post').replace(/(.*){%}/, '$1' + items.mcnitem_price), this.$t('lang.Notice'), {
        center: true,
        showCancelButton: true,
        confirmButtonText: this.$t('lang.sure'),
        cancelButtonText: this.$t('lang.dialog_btn_cancel'),
        confirmButtonClass: 'dynamicconfirmButtonClass',
        cancelButtonClass: 'dynamiccancelButtonClass',
        customClass: 'dynamiccustomClass'
      }).then(res => {
        _this.$store.dispatch('putBuyPost', { tid: items.tid }).then(res => {
          console.log(res)
          if (res.status == 200) {
            _this.$emit('onPostLock', item.tid, index)
            _this.$message({
              type: 'success',
              message: res.message
            })
          }
        })
      })
    },
    // 订阅该VIP
    async onHandleOpenUnsubPost (item, index) {
      const _this = this
      const items = item
      // console.log('套餐的UID')
      // console.log(items)
      // 获取当前用户的所有订阅套餐
      const rep = await this.$store.dispatch('getOtherSubCombo', {
        uid: _this.uid
      })
      let amout = 0
      if (rep.status == 200) {
        // 获取到的模特套餐列表轮询拿到所有的套餐贴文列表
        for (let index = 0; index < rep.data.models.length; index++) {
          const element = rep.data.models[index]
          if (element.id == items.mcnsub_id) {
            amout = element.amount
          }
        }
      }
      this.$alert(this.$t('lang.unblock_the_vippost').replace(/(.*){%}/, '$1' + amout), this.$t('lang.Notice'), {
        center: true,
        showCancelButton: true,
        confirmButtonText: this.$t('lang.sure'),
        cancelButtonText: this.$t('lang.dialog_btn_cancel'),
        confirmButtonClass: 'dynamicconfirmButtonClass',
        cancelButtonClass: 'dynamiccancelButtonClass',
        customClass: 'dynamiccustomClass'
      }).then(res => {
        _this.$store.dispatch('buySubCombo', { subid: items.mcnsub_id }).then(res => {
          console.log(res)
          if (res.status == 200) {
            _this.$emit('onSubLock', item.mcnsub_id, index)
            _this.$message({
              type: 'success',
              message: res.message
            })
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.PostItem {
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
    // background-image: linear-gradient(90deg, #f46fe0 0%, #f8a9ec 100%);
    background: #000;
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
    position: absolute;
    left: 0;
    top: 0;
    width: 108px;
    height: 108px;
    border-radius: 4px;
  }
  .PostItem_mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.17);
    .PostItem_mask_unlock {
      margin: 39px auto 0;
      width: 80px;
      height: 30px;
      background-image: linear-gradient(90deg, #f46fe0 0%, #f8a9ec 100%);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: SF Pro;
      font-size: 12px;
      letter-spacing: 0px;
      color: #ffffff;
    }
  }
  .PostItem_mask_date {
    z-index: 11;
    position: absolute;
    left: -20px;
    bottom: 0;
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
</style>
