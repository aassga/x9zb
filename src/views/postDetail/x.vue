<template>
  <div class="post_content">
    <CommonHeader title="限时动态"></CommonHeader>
    <div class="dynamic-post xsdta" v-for="(item, index) in dynamicAllPost" :key="index">
      <div class="title">
        <el-image @click="goToUserPage(item.uid)" class="avatar" fit="cover" :src="item.avatar">
          <div slot="error">
            <img class="avatar" src="@/assets/my/img-user.jpg" alt srcset />
          </div>
        </el-image>
        <div class="user" @click="goToUserPage(item.uid)">
          <div class="name">{{item.nick}}</div>
          <div class="id">@{{item.userName}}</div>
        </div>
        <!-- <div class="postSetting">
          <div class="postDate">{{ dateFormat(item.dateline) }}</div>
          <div class="setting" @click="isShowDynamicSettingModalStep = true"></div>
        </div> -->
      </div>
      <!-- <div class="post-text" v-html="item.postText"></div> -->
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
        <div class="response-title xsdt">
          <div
            :class="likeList.includes(item.tid) ?'like active':'like'"
            @click="likePost(item.tid,index)"
          >
            <span class="icon-heart1"></span>
          </div>
        </div>

        <div class="response-items" v-if="item.showComment">
          <div class="response-item" v-for="(commentItem, index) in item.commentItems" :key="index">
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
                <div class="time">&nbsp;&nbsp;&nbsp;{{ dateFormat(commentItem.dateline) }}</div>
              </div>
              <div class="comment" v-html="commentItem.message">
                <!-- <span @click="set"></span> -->
              </div>
            </div>
            <!-- <div
              class="response-items__show-all"
              v-if="index===item.commentItems.length-1"
            >{{$t('lang.view_more')}}</div> -->
          </div>
          <div class="creat-comment_box">
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
      isExist: false // 判断是否被收藏
    }
  },
  components: {
    VideoPlay,
    CommonHeader,
    Swiper,
    DynamicSettingModalStep
  },
  created () {
    this.getInsertList()
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
        showComment: this.allData.showComment
      })
      console.log(allNewData, '--allNewData')

      if (allNewData && allNewData.length > 0) {
        // if(!allNewData[0].showComment){
        //   let tid = allNewData[0].tid;
        //   let pid = allNewData[0].pid;
        //   this.getCommentDetails(tid, pid);
        // }
      }
      return allNewData
    }
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
      const params = {
        tid,
        pid,
        message: comm_content,
        tag: null
      }
      const result = await this.$store.dispatch('creatComment', params)
      const { status, data } = result
      if (status == 200) {
        this.allData = {
          ...item,
          commentItems: data.newComment,
          floors: data.count,
          comm_content: null
        }
        this.getNewCommentNum(this.tid)
      }
    },
    // 查看评论
    getCommentDetails (tid, pid) {
      const params = { tid, pid }
      if (!this.allData.showComment) {
        this.allData.showComment = !!this.allData.showComment
        this.$store.dispatch('getCommemtDetails', params).then(res => {
          var { status, data } = res
          if (status == 200) {
            this.allData = {
              ...this.allData,
              commentItems: data.models,
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
    // 判断该帖子是否被收藏
    postIsBooked (tid) {
      userApi.bookExist(tid).then(res => {
        if (res.status == 200) {
          this.isExist = res.data.exist
        }
      })
    },
    // 加入收藏的功能
    onHandleAddBook (tid, pid) {
      // 如果已经收藏  则是取消收藏
      const _this = this
      const data = { tid, pid }
      const falg = false
      const _index = 0
      // if (_this.collectedList) {
      //   _this.collectedList.forEach((element, index) => {
      //     if (tid == element) {
      //       falg = true;
      //     }
      //   });
      // }

      if (this.isExist) {
        this.$store.dispatch('delFavoriteInsert', tid).then(res => {
          if (res.status == 200) {
            this.postIsBooked(tid)
          }
        })
      } else {
        this.$store.dispatch('favoriteInsert', data).then(res => {
          if (res.status == 200) {
            this.postIsBooked(tid)
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
    dateFormat (dateline) {
      const date = new Date(dateline * 1000)
      const dateNew =
        date.getFullYear() + ' ' + (date.getMonth() + 1) + '-' + date.getDate()
      return dateNew
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
    padding-top: 3.2rem;
    .title {
      display: flex;
      padding-left: 20px;
      padding-top: .5rem;
      position: fixed;
      left: 0;
      top: 3.2rem;
      z-index: 999;

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
          color: #fff;
        }
        .id {
          font-size: 12px;
          line-height: 18px;
          color: #fff;
        }
      }
      .postSetting{
        margin-right: 10px;
        position: absolute;
        right: 0;
        top: 15px;
        float: right;
        vertical-align: middle;
        .postDate{
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
      span{
        color: #00f;
      }
      .hotInputTag {
        color: #00f;
      }
    }
    .post-img-content {
      position: relative;
      // margin-top: 10px;
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
        // padding-top: 1rem;
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

        &.xsdt{
          position: fixed;
          width: 100%;
          bottom: 0;
          background-image: linear-gradient(360deg, #23272b 0%, #4b4b4b 100%);
          opacity: 0.8;
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
          padding-left: 20px;
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
              font-size: 12px;
              line-height: 18px;
              color: #23272b;
              word-break: break-all;
            }
          }
          .response-items__show-all {
            line-height: 23px;
            font-size: 14px;
            color: #82b1fd;
            margin-left: auto;
            margin-right: calc(20px + 21px);
            margin-top: auto;
            text-decoration: underline;
          }
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
/deep/ .dynamiccustomClass {
  width: 250px !important;
}
/deep/ .dynamicconfirmButtonClass {
  background-color: #f46fe0;
  border-color: #f46fe0;
}
/deep/ .dynamiccancelButtonClass {
  color: #f46fe0;
}
</style>
