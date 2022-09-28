
<template lang="pug">
  .uploadpicbg
    mt-header(fixed title='移动照片到想要的位置')
      .icon-fi-rr-angle-left(slot="left" @click="$router.go(-1)")

      .finish(slot="right" @click="sureCropper") 完成
    .d-flex.justify-content-center.align-items-center.h-100
      //- img(:src="preview" v-if="!cropper")
      canvas(:id="preview" ref="canvas")
</template>

<script>
import Vue from 'vue'
import { Header, Indicator } from 'mint-ui'
import Cropper from 'cropperjs'

import { showLoading, hideLoading } from '@/utils/loading'
import 'cropperjs/dist/cropper.min.css'
import { mapState, mapActions } from 'vuex'
Vue.component(Header.name, Header)
export default {
  name: 'UploadPic',
  data () {
    return {
      cropper: null,
      loading: false
    }
  },

  computed: {
    ...mapState({
      file: ({ base }) => base.uploadpic,
      preview: ({ base }) => base.uploadpreveiw,
      isUploaded: ({ base }) => base.isUploaded,
      pictype: ({ base }) => base.pictype
    })

  },
  watch: {
    isUploaded (value) {
      this.loading = false
      if (value.key === 'suc' && value.val) {
        this.$router.go(-1)
        this.$toast.center('修改成功')
        this.$app('updateAvatar', value.avatar)
      } else if (value.key === 'fail') {
        this.$toast.center('上传失败')
      }
    }
  },
  mounted () {
    this.drawImg()
  },
  beforeDestroy () {
    this.setUploadPic({ img: null, preview: null, name: '' })
    this.setIsUpload({ key: 'suc', val: false })
  },
  methods: {
    ...mapActions({
      setUploadPic: 'base/setUploadPic',
      useWebSocket: 'base/useWebSocket',
      setIsUpload: 'base/setIsUpload'
    }),
    // 在canvas上绘制图片
    drawImg () {
      const _this = this
      this.$nextTick(() => {
        const canvas = document.getElementById(this.preview)
        if (canvas) {
          canvas.width = window.innerWidth
          canvas.height = window.innerHeight
          const ctx = canvas.getContext('2d')
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          const img = new Image()
          img.crossOrigin = 'Anonymous'
          img.src = this.preview
          img.onload = function () {
            const ratio = this.height / this.width

            const centerY = window.innerHeight / 2 - (canvas.width * ratio) / 2
            ctx.drawImage(
              img,
              0,
              centerY < 0 ? 0 : centerY,
              canvas.width,
              canvas.width * ratio
            )
            _this.initCropper()
          }
        }
      })
    },
    // 显示裁剪框
    initCropper () {
      this.croppShow = true
      this.cropper = new Cropper(this.$refs.canvas, {
        checkCrossOrigin: true,
        viewMode: 4,
        aspectRatio: 1, // 4 / 3,
        zoomOnWheel: false, // 是否可以通过移动鼠标来放大图像
        ready: () => {
          this.cropper.setData({
            x: 20,
            y:
              (window.innerHeight - 52) / 2 -
              parseInt((4 * (window.innerWidth - 40)) / 4) / 2,
            width: window.frames.innerWidth - 40,
            height: parseInt((4 * (window.innerWidth - 40)) / 4)
          })
        }
      })
      // this.cropper = cropper
    },
    // 确认裁剪
    sureCropper () {
      this.loading = true
      const _this = this
      // const cropParam = this.cropper.getData()
      // console.log(_this)
      this.cropper.getCroppedCanvas().toBlob(function (blob) {
        console.log('blob')
        console.log(blob)
        const oFileReader = new FileReader()
        oFileReader.readAsArrayBuffer(blob)
        oFileReader.onloadend = async function (e) {
          // Indicator.open({
          //   text:'loading',
          //   spinnerType:'fading-circle'
          // })
          showLoading

          console.log(e.target)

          await _this.$store.dispatch('useWebSocket', e.target)
          hideLoading()
          _this.$router.go(-1)

          // await _this.useWebSocket(e.target)
        }
      }, this.pictype)
    }
  }
}
</script>

<style lang="scss" scoped>
.uploadpicbg {
  height: 100%;
  padding-top: 52px;
  padding-top: calc(52px + constant(safe-area-inset-top));
  padding-top: calc(52px + env(safe-area-inset-top));
  position: relative;
  box-sizing: border-box;
  .rc-cropper__canvasCrop2 {
    width: 720px;
    height: 480px;
  }
}

::v-deep {
  .mint-header {
    height: 52px;
    height: calc(52px + constant(safe-area-inset-top));
    height: calc(52px + env(safe-area-inset-top));
    background-color: #fefefe;
    border-bottom: 1px solid #e8e8e8;
    color: #000;
    img {
      margin-left: 8px;
    }
    .finish {
      margin-right: 8px;
    }
  }
  .cropper-bg {
    background-image: unset;
  }
}

.h-100 {
    height: 100%!important;
}

.align-items-center {
    align-items: center!important;
}

.justify-content-center {
    justify-content: center!important;
}

.d-flex {
    display: flex!important;
}
</style>
