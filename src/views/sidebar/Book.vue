<template>
  <div class="Book_context">
    <CommonHeader :title="$t('lang.bookmark')"></CommonHeader>
    <div>
      <img
        v-for="(item, index) in collectedList"
        :key="index"
        class="Book_context_i"
        :src="item.preview"
        @click="goToPostPage(item.tid, item.tshare)"
      />
    </div>
  </div>
</template>

<script>
import CommonHeader from '@/components/header/CommonHeader.vue'
import { mapGetters, mapState, mapActions } from 'vuex'
import PostApi from '@/api/post.js'

export default {
  name: 'WebFeXcBook',
  components: {
    CommonHeader
  },
  data () {
    return {
      collectedList: []
    }
  },

  computed: {
    ...mapState({
      likeList: (state) => state.post.likeList, // 用户已点赞的列表
      postList: (state) => state.base.postList, // 用户已经购买的贴文
      collectList: ({ user }) => user.collectList // 书签数据
    }),
    dynamicAllPost () {
      const allNewData = []
      const { allData, likeList, postList } = this
      const allOldData = {
        ...allData
        // ...personData
      }
      for (const i in allOldData) {
        const item = allOldData[i]
        allNewData.push({
          ...item,
          tid: item.tid,
          avatar: item.user_info.avatar, // `${require(`@/assets/home/user-4@3x.png`)}`,
          nick: item.user_info.nick,
          postText: item.subject,
          userName: item.author,
          postImg: item.images,
          unlock: item.is_free ? false : !postList.includes(item.tid),
          price: item.mcnitem_price,
          likes: !!likeList.includes(i),
          likeCount: item.like
        })
      }
      allNewData.sort(this.compareAsc('tid'))
      return allNewData
    }
  },

  mounted () {
    this.getInsertList()
  },

  methods: {
    getInsertList () {
      const _this = this
      this.$store.dispatch('getInsertList').then(res => {
        if (res.status == 200) {
          _this.$store.commit('SET_COLLECTLIST_LIST', res.data.models.models)
          _this.collectedList = res.data.models.models
        }
      })
    },
    goToPostPage (tid, tshare) {
      this.$router.push({ path: '/p/' + tshare })
    }
  }
}
</script>

<style lang="scss" scoped>
.Book_context {
  width: 100%;
  min-height: 100vh;
  background-color: rgba(249, 249, 249, 0.94);
  box-sizing: border-box;
  padding: 44px 16px 0;
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  .Book_context_i {
    margin-top: 10px;
    margin-right: 7px;
    width: 108px;
    height: 108px;
    border-radius: 5px;
    overflow: hidden;
    &.Book_context_i:nth-child(3n) {
      margin-right: 0;
    }
  }
}
</style>
