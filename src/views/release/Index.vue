<template>
  <div class="release-page-top">
    <PostIndex :select="select" :imgData="imgData" v-if="select == 'image'" @addImg="addImg" @deletedImg="deletedImg"  v-loading="isSHowProgress"/>
    <VideoPostIndex :select="select" :videoData="videoData" @deletVideo="deletVideo" v-if="select == 'video'"  v-loading="isSHowProgress"/>
    <!-- <ul>
      <li @click="changeType('image')" :class="select == 'image' ? 'active':null">照片</li>
      <li @click="changeType('video')" :class="select == 'video' ? 'active': null">短片</li>
    </ul> -->
    <div class="camera"  v-loading="isSHowProgress">
      <el-upload class="d-inline-block"
        ref="upload"
        id="upload"
        action=""
        key="1"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="preview"
        >
        <span class="openCamera"></span>
      </el-upload>
    </div>
    <Footer :active="2" />
  </div>
</template>

<script>
import Footer from '@/components/footer/Index.vue'
import SetStickerAnimate from './SetStickerAnimate.vue'
import NotEnable from '@/components/header/NotEnable.vue'
import { isH5 } from '@/utils/config'
import PostIndex from './postIndex.vue'
import VideoPostIndex from './videoPostIndex.vue'
export default {
  name: 'release-index',

  data () {
    return {
      isH5,
      select: 'image',
      isInit: true,
      imgData: [], // 图片地址
      imgUrl: [], // 图片url
      videoData: [], // video地址
      videoUrl: ''// videoUrl,

    }
  },
  components: {
    PostIndex,
    VideoPostIndex,
    Footer
  },
  computed: {
    isSHowProgress: function () {
      return this.$store.state.base.isSHowProgress
    }
  },
  watch: {
    isSHowProgress: function (newval, oldval) {
      // 当上传结束时，清除缓存
      if (newval == false && oldval == true) {
        this.$parent.clearCache(this)
        this.$store.dispatch('geHomePost')
      }
    }
  },
  activated () {
    console.log('这里是缓存')
  },
  mounted () {
    console.log('这是新加载')
    this.$nextTick(() => {
      this.setCameraInit()
      setTimeout(() => {
        this.clickInput()
      }, 500)
    })
  },
  methods: {
    // 删除视频
    deletVideo () {
      console.log('===========进入删除')
      this.videoData = []
    },
    // 首页进入页面自动打开相机
    clickInput () {
      const box = document.getElementById('upload')
      const _input = box.getElementsByTagName('input')[0]
      _input.dispatchEvent(new MouseEvent('click'))
    },

    // 切换照片 短片tab
    changeType (type) {
      this.select = type
      this.isInit = false
    },

    // 初始化相机按钮
    setCameraInit () {
      const box = document.getElementById('upload')
      const _input = box.getElementsByTagName('input')[0]
      _input.setAttribute('capture', 'camera')
    },
    // 图片贴文上传按钮添加图片
    addImg (data) {
      this.imgData.push(data)
    },
    // 删除图文
    deletedImg (index) {
      this.imgData.splice(index, 1)
    },
    // 获取input数据
    preview ({ raw }) {
      console.log(raw)
      const { type } = raw
      const { select } = this
      let _select = ''
      if (type.split('/')[0] == 'image') {
        _select = 'image'
      }
      if (type.split('/')[0] == 'video') {
        _select = 'video'
      }
      if (select == _select) {
        if (select == 'image') {
          this.imgData.push(raw)
        }
        if (select == 'video') {
          const _videoData = []
          _videoData.push(raw)
          this.videoData = _videoData
        }
      } else {
        if (_select == 'image') {
          this.videoData = []
          this.imgData.push(raw)
        }
        if (_select == 'video') {
          this.imgData = []
          this.videoData.push(raw)
        }
        this.select = _select
      }
    },
    // 添加拍摄照片
    previewImg ({ raw }) {
      console.log(raw)
      const url = URL.createObjectURL(raw)
      this.imgUrl.push(url)
      this.imgData.push(raw)
      setTimeout(() => {
        this.setCameraInit()
      }, 1000)
    },

    // 添加拍摄video
    previewVideo ({ raw }) {
      console.log(raw)
      const url = URL.createObjectURL(raw)
      const _videoData = []
      _videoData.push(raw)
      this.videoUrl = url
      this.videoData = _videoData
      setTimeout(() => {
        this.setCameraInit()
      }, 1000)
    }

  }
}
</script>

<style lang="scss" scoped>
.release-page-top{
  height:calc(100%);
  position: relative;
  ul {
      width: 100%;
      display: flex;
      li {
        flex: 1;
        position: relative;
        line-height: 35px;
        background: #6c757d;
         color: #ccc;
        &.active {
          background: #23272b;

          &::before {
            position: absolute;
            content: '';
            height: 5px;
            width: 5px;
            border-radius: 50%;
            background: #ff4646;
            left: 35%;
            top: calc(50% - 2.5px);
          }
        }
      }
    }
  .camera {
    position: absolute;
    bottom: 110px;
    z-index: 2;
    left: 35%;
    right: 35%;
    height: 60px;
    text-align: center;
    //background: #000;
    .openCamera {
      display: inline-block;
      padding: 0 !important;

      width: 50px !important;
      height: 50px !important;
      border-radius: 50%;
      background: #ff4646;
      position: relative;
      &:before {
        position: absolute;
        content: '';
        width: 60px;
        height: 60px;
        border-radius: 50%;
        left: -5px;
        top: -5px;
        background: rgba(255,70,70,.4);
      }

    }
  }
}

</style>
