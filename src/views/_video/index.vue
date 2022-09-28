<template>
    <div v-loading="loading">
        <div class="post_content">
            <CommonHeader title="视频发帖"></CommonHeader>
            <VideoAuto ref="video" @CheckList="changeList" @setUrl="setVideoUrl" @closeLoading="closeLoading"/>
            <ImgUpload ref="post" @CheckStatus="changeStatus" @getTid="getTid" @closeLoading="closeLoading"/>
            <div class="submit flex-center"
            @click="submitData"
            :style="{color: checkUpLoadInfo ? 'white' : '#c1c1c1', background: checkUpLoadInfo? 'linear-gradient(90deg, #f46fe0 0%, #f8a9ec 100%)' : '#eaeaea'}"

            >
                {{$t('lang.release')}}
            </div>

        </div>
    </div>
</template>
<script>
import CommonHeader from '@/components/header/CommonHeader.vue'
import VideoAuto from './qiepian.vue'
import ImgUpload from './bulkUploadImg/post'
import { Loading } from 'element-ui'
import { Toast } from 'mint-ui'
export default {
  name: 'videoPost',
  components: {
    VideoAuto,
    ImgUpload,
    CommonHeader
  },
  data () {
    return {
      tid: null, // 上传文章后获取tid
      videoList: [], // 视频list
      isAlready: false, // 文章内容是否有
      videoUrlList: [], // 发文需用到的视频list
      loading: null
    }
  },
  computed: {
    checkUpLoadInfo () {
      const { tid, videoList, isAlready } = this
      if (isAlready && videoList && videoList.length > 0) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    // 关闭loading如果返回有错
    closeLoading (type) {
      this.loading = false
    },
    // 检测发文内容是否为空图片是否为空
    changeStatus (type) {
      this.isAlready = type
    },
    // 检测是否有添加,删除视频List
    changeList (data) {
      this.videoList = data
    },
    // 提交数据
    submitData () {
      if (this.checkUpLoadInfo) {
        // this.loading = Loading.service({
        //     text:'上传中,请耐心等待...'
        // })
        this.loading = true
        this.$refs.post.postDataAct()
      }
    },
    // 获得tid
    getTid (id) {
      this.tid = id
    },
    // 设置发布视频后得到的url
    setVideoUrl (url) {
      // Toast({
      //     message:'拿到url成功',
      //     iconClass: 'icon icon-success',
      // })
      this.videoUrlList.push(url)
    },
    // 上传视频
    upLoadVideo () {
      this.$refs.video.uploads()
    },
    // 真正的发布视频界面
    submitVideoPost (urlList) {
      const params = {
        tid: this.tid,
        url: this.videoUrlList[0]
      }
      // Toast({
      //     message:'请求真正发帖接口',
      //     iconClass: 'icon icon-success',
      // })
      this.$store.dispatch('upLoadVideoPost', params).then(res => {
        console.log(res)
        if (res.status == 200) {
          this.loading = false
          Toast({
            message: this.$t('lang.Post_success'),
            iconClass: 'icon icon-success'
          })
          this.$router.push({ name: 'home' })
        } else {
          this.loading = false
          Toast({
            message: '发佈失败'
          })
        }
      }).catch(err => {
        this.loading = false
        Toast({
          message: '发佈失败'
        })
      })
    }

  },
  watch: {
    tid (newVal, oldVal) {
      if (newVal) {
        this.upLoadVideo()
      }
    },
    videoUrlList (newVal, oldVal) {
      console.log(newVal)
      if (newVal.length > 0) {
        this.submitVideoPost(newVal)
      }
    }
  }
}
</script>
<style  lang="scss" scoped>
.submit {
  width: 90%;
  height: 40px;
  line-height: 40px;
  display: block;
  margin: 10px auto 0;
  //background-image: linear-gradient(90deg, #f46fe0 0%, #f8a9ec 100%);
  border-radius: 8px;
  color: #333;
}
.post_content {
    padding-top: 50px;
}
</style>
