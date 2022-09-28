<template>
  <div id="dynamic">
    <div class="dynamic-post" v-for="(item, index) in dynamicAllPost" :key="index">
      <div class="title">
        <el-image @click="goToUserPage(item.uid)" class="avatar" fit="cover" :src="item.avatar">
          <div slot="error">
            <img class="avatar" src="@/assets/my/img-user.jpg" alt srcset />
          </div>
        </el-image>
        <div class="user">
          <div class="name" @click="goToUserPage(item.uid)">{{item.nick}}</div>
          <div class="id" @click="goToUserPage(item.uid)">@{{item.userName}}</div>
          <div class="address">
            <div class="icon"></div>
            {{item.otherInfo.address}}
          </div>
        </div>
        <div class="postSetting">
          <div class="postDate">{{ showDate(item.dateline) }}</div>
          <div
            class="setting"
            @click="$emit('open-dynamic-setting-modal', {tid: item.tid, pid: item.pid, uid: item.uid, tshare: item.tshare})"
          ></div>
        </div>
      </div>

      <div class="post-content" @click="goPostDetail(item)" v-if="!item.isAd">
        <span class="post-text" v-html="item.postText"></span>
      </div>
      <!-- 找不到方法，暂时隐藏 -->
      <!-- @click="getDetails(item.tid)"  -->
      <div class="post-img-content" v-if="item.dataType == 'img'" >
        <div class="swiperBox" v-if="(!item.unlock || item.unsub) && item.postImg.length > 1">
          <Swiper :dataList="item.postImg" :index="index+1" />
        </div>
        <!-- <img class="post-img" :src="item.postImg[0]" v-else /> -->
        <el-image :src="item.postImg[0]" :preview-src-list="item.postImg" v-else></el-image>

        <!-- 付费贴文的解锁 -->
        <div class="unlock" v-if="item.unlock && item.price > 0 && item.uid != userInfo.uid">
          <button
            @click.stop="onHandleOpenUnlockPost(item,index)"
          >＄{{item.price}} {{$t('lang.unlock_post')}}</button>
        </div>
        <!-- 订阅贴文的解锁 -->
        <div class="unlock" v-if="!item.unsub && item.uid != userInfo.uid">
          <button @click.stop="onHandleOpenUnsubPost(item,index)">{{$t('lang.unlock_after_plan')}}</button>
        </div>
      </div>
      <div class="post-img-content" v-if="item.dataType == 'video'">
        <VideoPlay
          :uid="userInfo.uid"
          :item="item"
          :index="index"
          @getVideoInfo="getVideoInfo"
          :videoUrl="item.video_url"
          :posterUrl="item.images[0]"
        />
        <!-- 付费贴文的解锁 -->
        <div class="unlock" v-if="item.unlock && item.price > 0 && item.uid != userInfo.uid">
          <button
            @click="onHandleOpenUnlockPost(item,index)"
          >＄{{item.price}} {{$t('lang.unlock_post')}}</button>
        </div>
        <!-- 订阅贴文的解锁 -->
        <div class="unlock" v-if="!item.unsub && item.uid != userInfo.uid">
          <button @click.stop="onHandleOpenUnsubPost(item,index)">{{$t('lang.unlock_after_plan')}}</button>
        </div>
      </div>
      <div class="ad-post-text" v-html="item.postText" @click="goPostDetail(item)" v-if="item.isAd"></div>

      <div class="response">
        <div class="response-title">
          <div
            :class="likeList.includes(item.tid) ?'like active':'like'"
            @click="likePost(item.tid,index,item.dataType)"
          >
            <span class="icon-heart1"></span>
          </div>
          <div class="comments" @click="getCommentDetails(item)"></div>

          <!-- 临时解开 -->
          <!-- <div class="like" @click="goChat(item)">
            <i class="el-icon-chat-round" style="font-size: 24px"></i>
          </div>-->
          <!-- 临时解开 -->

          <div
            :class="collectedList&&collectedList.filter((res) => res.tid == item.tid).length > 0 ? 'tag active' : 'tag'"
            @click="onHandleAddBook(item.tid, item.pid)"
          ></div>
        </div>
        <div class="response-content">
          <div class="likeCount">{{item.likeCount + getLikeCount(item)}}</div>&nbsp;Like&nbsp;&nbsp;
          <div class="commentsCount" @click="getCommentDetails(item)">{{item.floors}}</div>&nbsp;
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
                <span></span>
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
  </div>
</template>

<script>
// import LikeApi from '@/api/like.js';
import { mapGetters, mapState, mapActions } from 'vuex'
import { MessageBox, Toast } from 'mint-ui'
import VideoPlay from './video'
import Swiper from '@/common/swiper/index.vue'
import { type } from 'os'
import userApi from '@/api/user.js'
export default {
  name: 'dynamic',
  data () {
    return {
      // ImgData:{},//图片拉取到的list数据
      // likeList:[],//点赞的tid list
      allData: {}, // 视频数据
      lockTid: 0, // 解锁的帖子的ID
      collected: false,
      collectedList: []
    }
  },

  components: {
    VideoPlay,
    Swiper
  },
  created () {
    this.getInsertList()
    userApi.getPrivacyBan().then(res1 => {
      if (res1.status === 200) {
        this.$store.commit('SET_BANUSER_LIST', res1.data.buids)
      }
    })
  },
  computed: {
    ...mapState({
      dynamicImgData: state => state.post.imgData,
      tidList: state => state.post.tidListLike,
      collectList: ({ user }) => user.collectList, // 书签数据
      userInfo: ({ user }) => user.user_info,
      likeList: state => state.post.likeList, // 用户已点赞的列表
      comboSubList: state => state.base.comboSubList, // 用户已经订阅的模特套餐列表
      postList: state => state.base.postList, // 用户已经购买的贴文
      currentCity: ({ user }) => user.currentCity, // 获取定位的位置
      banUser: state => state.user.banUser
      // homeVideoList: ({post}) => post.homeVideoList
    }),
    dynamicAllPost () {
      const allNewData = []
      const { allData, likeList, postList, comboSubList } = this
      const allOldData = {
        ...allData
        // ...personData
      }
      for (const i in allOldData) {
        const item = allOldData[i]
        if (!this.banUser.some(it => it === item.user_info.uid)) {
          allNewData.push({
            ...item,
            tid: item.tid,
            avatar: item.user_info.avatar, // `${require(`@/assets/home/user-4@3x.png`)}`,
            nick: item.user_info.nick,
            postText: item.subject,
            userName: item.author,
            postImg: item.images,
            unlock: item.is_free ? false : !postList.includes(item.tid),
            unsub:
              !item.mcnsub_id || item.mcnsub_id == 0
                ? true
                : comboSubList.includes(item.mcnsub_id),
            price: item.mcnitem_price,
            likes: !!likeList.includes(i),
            likeCount: item.like
          })
        }
      }
      allNewData.sort(this.compareAsc('tid'))
      return allNewData
    }
  },
  mounted () {
    this.initPost()
  },
  methods: {
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
      const { comm_content, tid, pid, dataType } = item
      const arr = []
      const params = {
        tid,
        pid,
        message: comm_content,
        tag: null,
        dataType
      }
      const result = await this.$store.dispatch('creatComment', params)
      const { status, data } = result
      if (status == 200) {
        for (let i = 0; i < data.newComment.length; i++) {
          const item = data.newComment[i]
          if (!this.banUser.some(it => it === item.uid)) {
            arr.push(item)
          }
        }
        this.allData[tid] = {
          ...item,
          commentItems: arr,
          floors: data.count,
          comm_content: null
        }
      }
    },
    // 檢查是否能評論
    checkCanreply (item) {
      if (this.allData[item.tid].canReply === undefined) {
        this.$set(this.allData[item.tid], 'canReply', true)
      }

      if (this.userInfo.username === item.userName) {
        this.$set(this.allData[item.tid], 'canReply', true)
        return
      }

      this.$store
        .dispatch('checkCanReply', {
          auid: item.uid
        })
        .then(res => {
          this.$set(this.allData[item.tid], 'canReply', res.exist)
        })
    },
    // 查看评论
    getCommentDetails (item) {
      const { tid, pid } = item
      const params = { tid, pid }
      const that = this
      const arr = []
      if (!item.showComment) {
        this.checkCanreply(item)
        this.allData[item.tid].showComment = !item.showComment
        this.$store.dispatch('getCommemtDetails', params).then(res => {
          var { status, data } = res

          if (status == 200) {
            for (let i = 0; i < data.models.length; i++) {
              const item = data.models[i]
              if (!this.banUser.some(it => it === item.uid)) {
                arr.push(item)
              }
            }

            that.allData[tid] = {
              ...that.allData[tid],
              commentItems: arr,
              showComment: true
            }
          } else {
            Toast({
              message: '拉取评论失败'
            })
          }
        })
      } else {
        this.allData[item.tid].showComment = !item.showComment
      }
    },
    // 点击购买解锁帖子
    onHandleOpenUnlockPost (item, index) {
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
            // 解锁成功帖文之后，如果当前帖文是视频帖文，则会请求视频的地址
            if (items.dataType == 'video') {
              _this.getVideoInfo(items, index)
            }
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
      // 获取当前用户的所有订阅套餐
      const rep = await this.$store.dispatch('getOtherSubCombo', {
        uid: item.uid
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

      this.$alert(this.$t('lang.unblock_the_vippost').replace(/(.*){%}/, '$1' + amout), '提示', {
        center: true,
        showCancelButton: true,
        confirmButtonText: this.$t('lang.sure'),
        cancelButtonText: this.$t('lang.dialog_btn_cancel'),
        confirmButtonClass: 'dynamicconfirmButtonClass',
        cancelButtonClass: 'dynamiccancelButtonClass',
        customClass: 'dynamiccustomClass'
      }).then(res => {
        _this.$store
          .dispatch('buySubCombo', { subid: items.mcnsub_id })
          .then(res => {
            console.log(res)
            if (res.status == 200) {
              // _this.$store.dispatch("geHomePost");
              const comboSubList = _this.comboSubList
              comboSubList.push(items.mcnsub_id)
              _this.$store.commit('SET_SUB_LIST', comboSubList)
              // 解锁成功帖文之后，如果当前帖文是视频帖文，则会请求视频的地址
              if (items.dataType == 'video') {
                _this.getVideoInfo(items, index)
              }
              _this.$message({
                type: 'success',
                message: res.message
              })
            }
          })
      })
    },
    // 获取单个视频帖文的视频地址
    getVideoInfo (items, index) {
      const _this = this
      _this.$store.dispatch('getVideo', { tid: items.tid }).then(res => {
        const dynamicImgData = JSON.parse(JSON.stringify(_this.dynamicImgData))
        for (const key in dynamicImgData.videoData) {
          if (key == items.tid) {
            dynamicImgData.videoData[key].video_url = res.data.video_url
          }
        }
        console.log(dynamicImgData.videoData)
        _this.$store.commit('UPDATE_IMG_DATA', dynamicImgData)
      })
    },
    // 获取数据list
    initPost () {
      const {
        currentCity: { country_id }
      } = this
      this.$store.dispatch('geHomePost', country_id)
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

    likePost (tid, index, dataType) {
      console.log(dataType)
      const _this = this
      // 如果是点赞状态 就取消点赞  如果不是就
      // if(like){

      // }
      this.$store.dispatch('likeInsert', { tid, dataType }).then(res => {
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
          message: `${falg ? _this.$t('lang.cancel') : ''}${_this.$t('lang.liked_success')}~`
        })
        // }
        // console.log(res);
      })
    },
    // 前往聊天页面
    goChat (item) {
      // 需要添加用户是否被关注的逻辑 如果没有被关注提示用户关注 关注后才让跳转
      console.log(item, '--item')
      const actions = {
        action: 'home.dialogue',
        body: { uid: item.uid }
      }
      this.$global.ws.send(JSON.stringify(actions))
      this.$router.push({
        path: '/ChatDetails',
        query: { id: item.uid }
      })
    },
    goToUserPage (uid) {
      if (this.userInfo.uid == uid) {
        this.$router.push({ path: '/my' })
      } else {
        this.$router.push({ path: '/userInfo/' + uid })
      }
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
    },
    // 跳转到发帖详情
    goPostDetail (item) {
      // 修改路由传参方式
      // this.$router.push({
      //   path: "/postDetail",
      //   query: { tshare: item.tshare, tid: item.tid }
      // });
      if (item.jump_url) {
        window.open(item.jump_url)
      } else {
        this.$router.push({ path: '/p/' + item.tshare })
      }
    }
  },
  watch: {
    dynamicImgData (newVal, oldVal) {
      if (newVal != oldVal) {
        this.allData = {
          ...newVal.imgData,
          ...newVal.videoData,
          ...newVal.adList
        }
        // this.likeList = newVal.likeList
        // this.videoData = newVal.videoData
        // this.personData = newVal.personalPost
      }
    }
  }
}
</script>

<style>
.dynamiccustomClass {
  width: 250px !important;
}
.dynamicconfirmButtonClass {
  background-color: #f46fe0;
  border-color: #f46fe0;
  /* color: #f46fe0; */
}
.dynamiccancelButtonClass {
  color: #f46fe0;
}
</style>

<style lang="scss">
#dynamic {
  min-height: 100vh;
  background-color: #ffffff;
  margin-top: 5px;
  // padding-bottom: 3rem;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  .dynamic-post {
    border-bottom: 5px solid rgba(0, 0, 0, 0.16);
    &:last-child {
      padding-bottom: 45px;
    }
    .title {
      display: flex;
      padding-left: 20px;
      padding-top: 1rem;
      position: relative;
      .avatar {
        // display: flex;
        // align-items: center;
        // justify-content: center;
        height: 48px;
        width: 48px;
        border-radius: 50%;
        box-sizing: border-box;
        background-color: #ccc;
        border: solid 2.5px #f46fe0;
        img {
          width: 100%;
          height: auto;
          border-radius: 50%;
        }
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
          font-size: 12px;
          color: #6c757d;
          font-size: 14px;
          vertical-align: middle;
        }
      }
      .setting {
        // position: relative;
        display: inline-block;
        height: 44px;
        width: 44px;
        background: url("~@/assets/home/ic-setting@3x.png");
        background-size: 44px 44px;
        margin-left: auto;
        vertical-align: middle;
      }
    }
    .post-content {
      width: 100%;
      padding-top: 1rem;
      padding-right: 20px;
      padding-left: 20px;
      text-align: start;
      box-sizing: border-box;
      font-size: 12px;
      line-height: 18px;
      .post-text {
        width: 100%;
        display: inline-block;
        // white-space: nowrap;
        // text-overflow: ellipsis;
        // overflow: hidden;
        word-break: break-all;
        .tag {
          color: #00f;
        }
      }
      .show-more {
        display: inline-block;
        color: #82b1fd;
        text-decoration: underline;
      }
    }
    .ad-post-text {
      background: #191919;
      text-align: left;
      width: 100%;
      line-height: 35px;
      color: #fff;
      box-sizing: border-box;
      padding: 0 15px;
      position: relative;
      &:after {
        position: absolute;
        font-family: "icomoon" !important;
        speak: never;
        font-style: normal;
        font-weight: normal;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        -webkit-font-smoothing: antialiased;
        content: "\f1d4";
        line-height: 35px;
        font-size: 15px;
        right: 10px;
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
        align-items: center;
        justify-content: center;
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
          &.comment {
            display: block;
            width: 100%;
            box-sizing: border-box;
            padding-right: 10px;
            word-break: break-all;
            .avatar {
              display: inline-block;
            }
            .user {
              flex: none;
              display: inline-block;
              width: calc(100% - 48px);
              .comment {
                width: 100%;
                // overflow: hidden;
                // text-overflow: ellipsis;
                // white-space: nowrap;
                word-break: break-all;
              }
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
  .title{
    .el-image {
    img {
      height: 100% !important;
      width: 100% !important;
      border-radius: 50% !important;
      background-color: #f46fe0 !important;
      border: none !important;
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
      background-image: radial-gradient(
        circle at 50% 50%,
        #f46fe0,
        #f8a9ec 97%
      );
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
  .dynamic-post,
  .response,
  .response-items,
  .response-item {
    width: 100%;
  }
}
</style>
