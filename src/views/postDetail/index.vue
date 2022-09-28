<template>
  <div class="post_content">
    <CommonHeader :title="$t('lang.post_detail')"></CommonHeader>
    <div class="dynamic-post" v-for="(item, index) in dynamicAllPost" :key="index">
      <div class="title">
        <el-image @click="goToUserPage(item.uid)" class="avatar" fit="cover" :src="item.avatar">
          <div slot="error">
            <img class="avatar" src="@/assets/my/img-user.jpg" alt srcset />
          </div>
        </el-image>
        <div class="user" @click="goToUserPage(item.uid)">
          <div class="name">{{item.nick}}</div>
          <div class="id">@{{item.userName}}</div>
          <div class="address">
            <div class="icon"></div>
            {{item.otherInfo.address}}
          </div>
        </div>
        <div class="postSetting">
          <div class="postDate">{{ showDate(item.dateline) }}</div>
          <div class="setting" @click="isShowDynamicSettingModalStep = true"></div>
        </div>
      </div>
      <div class="post-text" v-html="item.postText"></div>
      <div class="post-img-content" v-if="item.type == 'img'||item.type == 'other'">
        <div class="swiperBox" v-if="!item.unlock && item.postImg.length > 1">
          <Swiper :dataList="item.images" />
        </div>
        <!-- <img class="post-img" :src="item.images[0]" v-else /> -->
        <el-image :src="item.images[0]" :preview-src-list="item.images" v-else ></el-image>
        <!-- 接口缺少相关的字段 dataType floor-->
        <div
          class="unlock"
          v-if="item.unlock && item.mcnitem_price > 0 && item.uid != userInfo.uid"
        >
          <button @click.stop="onHandleOpenUnlockPost(item)">＄{{item.price}} {{$t('lang.unlock_post')}}</button>
        </div>
      </div>
      <div class="post-img-content" v-if="item.type == 'video'">
        <VideoPlay :videoUrl="item.video" :posterUrl="item.images[0]" />
        <!-- <video
          :src="item.video_url"
          width="100%"
          height="250"
          controls="true"
          x5-video-player-type="h5-page"
          playsinline="true"
          style="margin:10px 0;"
        ></video>-->
        <div
          class="unlock"
          v-if="item.unlock && item.mcnitem_price > 0 && item.uid != userInfo.uid"
        >
          <button @click="onHandleOpenUnlockPost(item)">＄{{item.price}} {{$t('lang.unlock_post')}}</button>
        </div>
      </div>

      <div class="response">
        <div class="response-title">
          <div
            :class="likeList.includes(item.tid) ?'like active':'like'"
            @click="likePost(item.tid,index)"
          >
            <span class="icon-heart1"></span>
          </div>
          <div class="comments" @click="getCommentDetails(item)"></div>
          <div
            :class="collectedList&&collectedList.filter((res) => res.tid == item.tid).length > 0 ? 'tag active' : 'tag'"
            @click="onHandleAddBook(item.tid, item.pid)"
          ></div>
        </div>
        <div class="response-content">
          <div
            class="likeCount"
            @click="likePost(item.tid,index)"
          >{{item.likeCount + getLikeCount(item)}}</div>&nbsp;Like&nbsp;&nbsp;
          <!-- 接口少了floor字段 -->
          <!-- <div class="commentsCount">{{item.commentItems?item.commentItems.length:0}}</div>&nbsp;Comment -->
          <div class="commentsCount" @click="getCommentDetails(item)">{{commentNum}}</div>&nbsp;
          <span @click="getCommentDetails(item)">Comment</span>
        </div>
        <div class="response-items" v-if="item.showComment">
          <div
            class="response-item"
            v-for="(commentItem, index2) in item.commentItems"
            :key="index2"
          >
            <el-image
              class="avatar"
              fit="cover"
              :src="commentItem.avatar"
              @click="goToUserPage(commentItem.uid)"
            >
              <div slot="error">
                <img class="avatar" src="@/assets/my/img-user.jpg" alt srcset />
              </div>
            </el-image>
            <div class="user">
              <div class="name" @click="goToUserPage(commentItem.uid)">
                {{commentItem.author}}
                <div class="time">&nbsp;&nbsp;&nbsp;{{ showDate(commentItem.dateline) }}</div>
              </div>
              <div class="comment" v-html="commentItem.message">
                <!-- <span @click="set"></span> -->
              </div>
            </div>
          </div>
          <!-- <div
            class="response-items__show-all"
            v-if="item.commentItems.length > 5"
          >{{$t('lang.view_more')}}</div> -->
          <div class="creat-comment_box" v-if="item.canReply">
            <el-image class="avatar" fit="cover" :src="userInfo.avatar">
              <div slot="error">
                <img class="avatar" src="@/assets/my/img-user.jpg" alt srcset />
              </div>
            </el-image>
            <div class="comment_content">
              <input type="text" :placeholder="$t('lang.add_comment')" v-model="item.comm_content" />
            </div>
            <span class="comment_btn" @click="submitComment(item)">{{$t('lang.submit')}}</span>
          </div>
          <div class="comment_disabled_tips" v-else>{{$t('lang.comments_disallow_for_post')}}</div>
        </div>
      </div>
    </div>
    <DynamicSettingModalStep
      v-if="isShowDynamicSettingModalStep"
      :visible="isShowDynamicSettingModalStep"
      :tid="allData.tid"
      :pid="allData.pid"
      :uid="allData.uid"
      :tshare="$route.params.tshare"
      @close-dynamic-setting-modal-step="isShowDynamicSettingModalStep=false"
      @closeNotEnable="() => isShowDynamicSettingModalStep = false"
    />
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { MessageBox, Toast } from 'mint-ui'
import VideoPlay from '@/components/home/video'
import Swiper from '@/common/swiper/index.vue'
import CommonHeader from '@/components/header/CommonHeader.vue'
import DynamicSettingModalStep from '@/components/home/DynamicSettingModalStep.vue'
// 引入API
import postApi from '@/api/post.js'
import userApi from '@/api/user.js'
export default {
  name: 'dynamic',
  data () {
    return {
      allData: {}, // 视频数据
      lockTid: 0, // 解锁的帖子的ID
      collected: false,
      collectedList: [],
      postDetail: null,
      commentNum: 0, // 评论数量
      tid: 0,
      pid: 0,
      uid: 0,
      isShowDynamicSettingModalStep: false,
      isInit: false,
      isExist: false // 判断是否被收藏
    }
  },
  components: {
    VideoPlay,
    CommonHeader,
    Swiper,
    DynamicSettingModalStep
  },
  computed: {
    ...mapState({
      // dynamicImgData: state => state.post.imgData,
      tidList: state => state.post.tidListLike,
      collectList: ({ user }) => user.collectList, // 书签数据
      userInfo: ({ user }) => user.user_info,
      likeList: state => state.post.likeList, // 用户已点赞的列表
      postList: state => state.base.postList // 用户已经购买的贴文
    }),
    dynamicAllPost () {
      const allNewData = []
      const { allData, likeList, postList } = this
      if (!allData.avatar) return []
      const allOldData = {
        ...allData
      }
      console.log(allOldData, '--allOldData')

      const item = allOldData

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
        likes: !!likeList.includes(item.like),
        likeCount: item.like,
        showComment: this.allData.showComment,
        canReply: this.allData.canReply ? this.allData.canReply : false
      })
      console.log(allNewData, '--allNewData')

      if (allNewData && allNewData.length > 0 && !this.isInit) {
        this.isInit = true
        this.getCommentDetails(allNewData[0])
      }

      return allNewData
    }
  },
  created () {
    this.getInsertList()
  },
  mounted () {
    // this.initPost();
    this.getpost()
  },
  methods: {
    // 跳转到用户详情页面
    goToUserPage (uid) {
      if (this.userInfo.uid == uid) {
        this.$router.push({ path: '/home' })
      } else {
        this.$router.push({ path: '/userInfo/' + uid })
      }
    },
    getpost () {
      const tshare = this.$route.params.tshare
      if (isNaN(tshare)) {
        this.$store.dispatch('postVersionByTshare', tshare).then(data => {
          if (data && data.length > 0) {
            const pid = data[0].pid
            this.$store.dispatch('postData', pid).then(postDetail => {
              console.log(postDetail, '---postDetail')

              this.allData = postDetail[0]
              const tid = this.allData.tid
              this.tid = tid
              this.getNewCommentNum(tid)
              this.postIsBooked(tid)
            })
          }
        })
      } else {
        const tid = tshare
        this.$store.dispatch('postVersionByTshare', tid).then(data => {
          if (data && data.length > 0) {
            const pid = data[0].pid
            this.$store.dispatch('postData', pid).then(postDetail => {
              console.log(postDetail, '---postDetail')

              this.allData = postDetail[0]
              const tid = this.allData.tid
              this.tid = tid
              this.getNewCommentNum(tid)
              this.postIsBooked(tid)
            })
          }
        })
      }
    },
    // 判断该帖子是否被收藏
    postIsBooked (tid) {
      userApi.bookExist(tid).then(res => {
        if (res.status == 200) {
          this.isExist = res.data.exist
        }
      })
    },
    getNewCommentNum (tid) {
      postApi.getNewCommentNum({ tid }).then(res => {
        if (res.status == 200) {
          this.commentNum = res.data.count
        }
      })
    },
    // 输入贴文的ID，判断贴文是否已购买
    isBuyPost (id) {
      let falg = false
      const postList = this.postList
      postList.forEach((ele, idx) => {
        if (ele == id) {
          falg = true
        }
      })
      return falg
    },
    // 动态计算点赞数
    getLikeCount (item) {
      let num = 0
      if (item.likes) {
        num = this.likeList.includes(item.tid) ? 0 : -1
      } else {
        num = this.likeList.includes(item.tid) ? 1 : 0
      }
      return num
    },
    // 排序
    compareAsc (properName) {
      return function (obj1, obj2) {
        var value1 = obj1[properName]
        var value2 = obj2[properName]
        if (value2 < value1) {
          return -1
        } else if (value2 > value1) {
          return 1
        } else {
          return 0
        }
      }
    },
    // 提交评论
    async submitComment (item) {
      const { comm_content, tid, pid } = item
      const arr = []
      const params = {
        tid,
        pid,
        message: comm_content,
        tag: null
      }
      const result = await this.$store.dispatch('creatComment', params)
      const { status, data } = result
      if (status == 200) {
        for (let i = 0; i < data.newComment.length; i++) {
          const item = data.newComment[i]
          if (!this.$store.state.user.banUser.some(it => it === item.uid)) {
            arr.push(item)
          }
        }
        this.allData = {
          ...item,
          commentItems: arr,
          floors: data.count,
          comm_content: null
        }
        this.getNewCommentNum(this.tid)
      }
    },
    // 檢查是否能評論
    checkCanreply (item) {
      if (this.allData.canReply === undefined) {
        this.$set(this.allData, 'canReply', true)
      }

      if (this.userInfo.username === item.userName) {
        this.$set(this.allData, 'canReply', true)
        return
      }

      this.$store
        .dispatch('checkCanReply', {
          auid: item.uid
        })
        .then(res => {
          this.$set(this.allData, 'canReply', res.exist)
        })
    },
    // 查看评论
    getCommentDetails (item) {
      const arr = []
      const params = {
        tid: item.tid,
        pid: item.pid
      }
      if (!this.allData.showComment) {
        this.checkCanreply(item)
        this.allData.showComment = !!this.allData.showComment
        this.$store.dispatch('getCommemtDetails', params).then(res => {
          var { status, data } = res
          if (status == 200) {
            for (let i = 0; i < data.models.length; i++) {
              const item = data.models[i]
              if (!this.$store.state.user.banUser.some(it => it === item.uid)) {
                arr.push(item)
              }
            }
            this.allData = {
              ...this.allData,
              commentItems: arr,
              showComment: true
            }
            console.log(this.allData, '--this.allData')
          } else {
            Toast({
              message: '拉取评论失败'
            })
          }
        })
      } else {
        this.allData.showComment = false
      }
    },
    // 点击购买解锁帖子
    onHandleOpenUnlockPost (item) {
      const _this = this
      const items = item
      this.$alert(this.$t('lang.unblock_the_post').replace(/(.*){%}/, '$1' + items.price), this.$t('lang.Notice'), {
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
            // _this.$store.dispatch("geHomePost");
            const postList = _this.postList
            postList.push(items.tid)
            _this.$store.commit('SET_POST_LIST', postList)
            _this.$message({
              type: 'success',
              message: res.message
            })
          }
        })
      })
    },
    // 获取数据list
    initPost () {
      this.$store.dispatch('geHomePost')
    },
    // 获取收藏数据
    getInsertList () {
      // 数据结构修改做如下判断
      this.collectedList = []
      const tempList = []
      this.$store.dispatch('getInsertList').then(res => {
        if (res.status == 200) {
          console.log(res.data.models.models, '获取收藏数据')
          res.data.models.models.forEach(item => {
            this.collectedList.push(item.tid)
            tempList.push(item.tid)
          })
          // 接口返回数据不是最新的  会有bug
          // this.collectedList = res.data.models.models;
        }
      })
    },
    // 获取收藏数据
    getInsertList () {
      const _this = this
      this.$store.dispatch('getInsertList').then(res => {
        if (res.status == 200) {
          _this.$store.commit('SET_COLLECTLIST_LIST', res.data.models.models)
          _this.collectedList = res.data.models.models
        }
      })
    },
    // 加入收藏的功能
    onHandleAddBook (tid, pid) {
      // 如果已经收藏  则是取消收藏
      const _this = this
      const data = { tid, pid }
      let falg = false
      const _index = 0
      if (_this.collectedList) {
        _this.collectedList.filter((res, index) => {
          if (tid == res.tid) {
            falg = true
          }
        })
      }

      if (falg) {
        this.$store.dispatch('delFavoriteInsert', tid).then(res => {
          if (res.status == 200) {
            _this.getInsertList()
          }
        })
      } else {
        this.$store.dispatch('favoriteInsert', data).then(res => {
          if (res.status == 200) {
            _this.getInsertList()
          }
        })
      }
      _this.$message({
        type: 'success',
        message: `${falg ? _this.$t('lang.Bookmark_canceled') : _this.$t('lang.Bookmark_successfully')}`
      })
    },

    likePost (tid, index) {
      console.log(tid, index)
      const _this = this
      // 如果是点赞状态 就取消点赞  如果不是就
      // if(like){

      // }
      this.$store.dispatch('likeInsert', { tid }).then(res => {
        // reset like class
        // this.$store.dispatch('geHomePost');
        console.log(_this.likeList)
        // if (res.status == 200) {
        // 改变点赞列表的对应项的状态  同时存储在store里
        const likeList = _this.likeList
        let falg = false
        let _index = 0
        _this.likeList.forEach((element, index) => {
          if (tid == element) {
            falg = true
            _index = index
          }
        })

        if (falg) {
          likeList.splice(_index, 1)
        } else {
          likeList.push(tid)
        }
        // // [index].like = !_this.dynamicAllPost[index].like;
        _this.$store.commit('SET_LIKE_LIST', likeList)
        console.log(_this.ImgData)
        // _this.$store.dispatch('geHomePost');
        _this.$message({
          type: 'success',
          message: `${falg ? '取消' : ''}点赞成功~`
        })
        // }
        // console.log(res);
      })
    },
    // 顯示時間
    showDate (dateline) {
      const now = this.dateFormat()
      const date = this.dateFormat(dateline * 1000)

      const d1 = now.replace(/\-/g, '/')
      const date1 = new Date(d1)

      const d2 = date.replace(/\-/g, '/')
      const date2 = new Date(d2)

      const dateDiff = date1.getTime() - date2.getTime()

      // 相差天數
      const days = Math.floor(dateDiff / (24 * 3600 * 1000))
      // 相差小時數
      const residue1 = dateDiff % (24 * 3600 * 1000)
      const hours = Math.floor(residue1 / (3600 * 1000))
      // 相差分鐘數
      const residue2 = residue1 % (3600 * 1000)
      const minutes = Math.floor(residue2 / (60 * 1000))

      if (days > 10) return date.split(' ')[0]
      if (days > 0) return days + this.$t('lang.day_ago')
      if (hours > 0) return hours + this.$t('lang.hour_ago')
      if (minutes >= 0) return (minutes > 0 ? minutes : '1') + this.$t('lang.minute_ago')
    },
    // 轉換時間格式 YYYY-MM-DD hh:mm:ss
    dateFormat (dateline) {
      const date = dateline > 0 ? new Date(dateline) : new Date()
      const Y = date.getFullYear()
      const M = date.getMonth() + 1
      const D = date.getDate()
      const h = date.getHours()
      const m = date.getMinutes()
      const s = date.getSeconds()
      return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
    }
  },
  watch: {
    // dynamicImgData(newVal, oldVal) {
    //   if (newVal != oldVal) {
    //     this.allData = {
    //       ...newVal.imgData,
    //       ...newVal.videoData
    //     };
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.post_content {
  .dynamic-post {
    padding-top: 50px;
    .title {
      display: flex;
      padding-left: 20px;
      padding-top: 1rem;
      position: relative;
      .avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 48px;
        width: 48px;
        border-radius: 50%;
        background-color: #ccc;
        border: solid 2.5px #f46fe0;
      }
      .user {
        padding-left: 10px;
        text-align: start;
        .name {
          font-size: 14px;
          line-height: 26px;
          color: #23272b;
        }
        .id {
          font-size: 12px;
          line-height: 18px;
          color: #6c757d;
        }
        .address {
          display: inline-block;
          font-size: 12px;
          color: #6c757d;
          position: relative;
          padding-left: 14px;
          .icon {
            content: "";
            background-image: url("~@/assets/home/ic-location@3x.png");
            background-size: 32px 32px;
            height: 32px;
            width: 32px;
            position: absolute;
            top: -8px;
            left: -10px;
          }
        }
      }
      .postSetting {
        margin-right: 10px;
        position: absolute;
        right: 0;
        top: 15px;
        float: right;
        vertical-align: middle;
        .postDate {
          display: inline-block;
          color: #6c757d;
          font-size: 14px;
          vertical-align: middle;
        }
      }
      .setting {
        display: inline-block;
        height: 44px;
        width: 44px;
        background: url("~@/assets/home/ic-setting@3x.png");
        background-size: 44px 44px;
        margin-left: auto;
        vertical-align: middle;
      }
    }
    .post-text {
      padding-left: 20px;
      padding-top: 1rem;
      text-align: start;
      font-size: 12px;
      line-height: 18px;
      padding-right: 20px;
      width: 100%;
      box-sizing: border-box;
      // white-space: nowrap;
      // text-overflow: ellipsis;
      // overflow: hidden;
      word-break: break-all;
      // text-indent: 1.5em;
      span {
        color: #00f;
      }
      .hotInputTag {
        color: #00f;
      }
    }
    .post-img-content {
      position: relative;
      margin-top: 10px;
      .el-image {
        img {
          height: 100% !important;
          width: 100% !important;
          border: none !important;
        }
      }
      .unlock {
        position: absolute;
        background-color: rgba(0, 0, 0, 1);
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        button {
          width: 50%;
          height: 2rem;
          border: 0;
          background-image: radial-gradient(
            circle at 50% 50%,
            #f46fe0,
            #f8a9ec 97%
          );
          color: #fff;
          border-radius: 8px;
          // margin-top: calc(50% - 1rem);

          &.videoBtn {
            margin-top: calc(25%);
          }
          //margin-top: calc(100vw / 2 - 1rem);
          // transform: translateY()
        }
      }
      img.post-img {
        display: flex;
        justify-content: center;
        align-items: center;
        height: auto;
        width: 100vw;
        padding-top: 1rem;
      }
      .swiperBox {
        width: 100%;
        height: 260px;
        overflow: hidden;
      }
    }
    .response {
      .response-title {
        display: flex;
        padding-left: 15px;
        .like {
          height: 44px;
          width: 44px;
          //background: url('~@/assets/home/ic-like@3x.png');
          //background-size: auto 44px;
          line-height: 50px;
          span {
            font-size: 22px;
            color: #999;
          }
          &.active {
            span {
              color: #f46fe0;
            }
          }
        }
        .unlike {
          height: 24px;
          width: 24px;
          background: url("~@/assets/home/ic-unlike.png");
          background-size: auto 24px;
          margin: auto 0.8rem;
        }
        .comments {
          height: 44px;
          width: 44px;
          background: url("~@/assets/home/ic-comments@3x.png");
          background-size: auto 44px;
        }
        .tag {
          height: 44px;
          width: 44px;
          background: url("~@/assets/home/ic-tag@3x.png");
          background-size: auto 44px;
          margin-left: auto;
          margin-right: 20px;
          &.active {
            background-image: url("~@/assets/home/ic-tag_active.png");
          }
        }
      }
      .response-content {
        display: flex;
        font-size: 16px;
        color: #6c757d;
        padding-left: 20px;
        padding-bottom: 1rem;
        .likeCount,
        .commentsCount {
          color: #f46fe0;
        }
      }
      .response-items {
        border-top: 1px solid rgba(0, 0, 0, 0.16);
        width: 100vw;
        padding-top: 0.8rem;
        .response-item {
          display: flex;
          width: 100vw;
          padding-bottom: 0.8rem;
          padding-left: 10px;
          .avatar {
            height: 48px;
            width: 48px;
            border-radius: 50%;
          }
          .user {
            padding-left: 10px;
            text-align: start;
            flex: 1;
            box-sizing: border-box;
            padding-right: 10px;
            .name {
              display: flex;
              font-size: 14px;
              line-height: 23px;
              color: #23272b;
            }
            .time {
              display: flex;
              font-size: 14px;
              line-height: 23px;
              color: #6c757d;
            }
            .comment {
              padding-right: 8px;
              font-size: 12px;
              line-height: 18px;
              color: #23272b;
              word-break: break-all;
            }
          }
        }
        .response-items__show-all {
          width: 100%;
          padding-right: 5px;
          line-height: 23px;
          font-size: 12px;
          color: #82b1fd;
          text-align: right;
          text-decoration: underline;
          box-sizing: border-box;
        }
      }
    }
  }
}
.title{
  .el-image {
  img {
    height: 48px !important;
    width: 48px !important;
    border-radius: 50% !important;
    background-color: #f46fe0 !important;
    border: solid 2.5px #f46fe0 !important;
  }
}
}

.creat-comment_box {
  width: 100%;
  display: flex;
  .avatar {
    display: inline-block;
    width: 50px;
    height: 50px;
    margin: 0 10px 10px;
    border-radius: 50%;
  }
  .comment_content {
    flex: 1;
    box-sizing: border-box;
    margin-right: 10px;
    height: 50px;
    input {
      width: 100%;
      vertical-align: middle;
      line-height: 30px;
      box-sizing: border-box;
      display: inline-block;
      margin-top: 10px;
      border-radius: 4px;
      padding: 0 10px;
      border: 1px solid rgba(0, 0, 0, 0.16);
    }
  }
  .comment_btn {
    height: 30px;
    line-height: 30px;
    border: 0;
    margin-right: 10px;
    padding: 0 10px;
    background-image: radial-gradient(circle at 50% 50%, #f46fe0, #f8a9ec 97%);
    color: #fff;
    border-radius: 4px;
    margin-top: 10px;
  }
}
.comment_disabled_tips {
  padding-bottom: 0.8rem;
  font-size: 12px;
  color: #6c757d;
}
 .dynamiccustomClass {
  width: 250px !important;
}
 .dynamicconfirmButtonClass {
  background-color: #f46fe0;
  border-color: #f46fe0;
}
 .dynamiccancelButtonClass {
  color: #f46fe0;
}
</style>
