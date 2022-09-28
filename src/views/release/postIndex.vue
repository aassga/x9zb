<template>

    <div class="release-page">
      <div class="release-container">

        <div class="top_area">
          <!--<span class="close_btn" @click="goHome"></span>
          <span class="filter" @click="isShowEnable=true">{{$t('lang.filter')}}</span>
          <span class="beauty" @click="isShowEnable=true">{{$t('lang.beauty')}}</span>-->
        </div>
        <div v-if="imgUrl.length > 0" class="prviewImgBox">
          <Swiper :dataList="imgUrl" @closeImg="deletedImg"/>
        </div>
        <div class="bottom_area">
          <div class="functional_area">

            <div v-if="!isH5" class="shoot_time">
              <span class="time60">{{$t('lang.second60')}}</span>
              <span class="time15">{{$t('lang.second15')}}</span>
            </div>
            <div class="functional_area_right" >
              <span
                :class="['sticker',isActiveColor?'active_color':'default_color']"
                @click="SetStickerAnimate('sticker')"
              >{{$t('lang.post')}}</span>
              <span
                :class="['shoot_animate',isActiveColor?'default_color':'active_color']"
                @click="SetStickerAnimate('animate')"
              >{{$t('lang.time_limit_dyna')}}</span>
            </div>
          </div>
          <div class="shoot_area">
            <div v-if="!isH5" class="switch_camera">
              <span>{{$t('lang.switch_camera')}}</span>
            </div>
            <div v-else class="switch_camera">
              <!-- <span>切換鏡頭</span> -->
            </div>
            <div class="shoot_btn">
              <!-- <el-upload class="d-inline-block"
              ref="upload"
              id="upload"
              action=""
              :auto-upload="false"
              :show-file-list="false"
              :on-change="preview"

              >
                <span class="openCamera"></span>
              </el-upload> -->

            </div>
            <div class="upload">
              <div>
                <el-upload
                class="d-inline-block"
                ref="uploadImg"
                id="uploadImg"
                action=""
                :auto-upload="false"
                :show-file-list="false"
                :on-change="previewImg"
                multiple
                >
                  <span class="up">{{$t('lang.upload')}}</span>
                </el-upload>
              </div>

            </div>
          </div>
        </div>
        <SetStickerAnimate
          v-if="isShowFunctional"
          v-bind:stickerOrAnimate="stickerOrAnimate"
          v-bind:isShowFunctional="isShowFunctional"
          @closePop="closePop"
          @change-city="isShowChangeSearchRangeModal=true"
          @submit="submit"
          ref="animatiBox"
        />
        <ChangeCity
          v-if="isShowChangeCityModal"
          @change-city-back="isShowChangeCityModal = false"
          @change-search-range="
            isShowChangeCityModal = false;
            isShowChangeSearchRangeModal = true;
          "
        />
        <ChangeSearchRange
          v-if="isShowChangeSearchRangeModal"
          @change-search-range-back="isShowChangeSearchRangeModal = false"
          @change-city="
            isShowChangeSearchRangeModal = false;
            isShowChangeCityModal = true;
          "
        />

      </div>

    </div>

</template>

<script>
import Footer from '@/components/footer/Index.vue'
import SetStickerAnimate from './SetStickerAnimate.vue'
import ChangeCity from '@/components/home/ChangeCity.vue'
import ChangeSearchRange from '@/components/home/ChangeSearchRange.vue'
import NotEnable from '@/components/header/NotEnable.vue'
import { isH5 } from '@/utils/config'
import PostApi from '@/api/post.js'
import MyApi from '@/api/my.js'
import { Message } from 'element-ui'
import Swiper from './Swiper.vue'
export default {
  name: 'PostIndex',
  props: {
    select: {
      type: String
    },
    imgData: {
      type: Array
    }
  },
  components: {
    Footer,
    SetStickerAnimate,
    ChangeCity,
    ChangeSearchRange,
    NotEnable,
    Swiper

  },
  data () {
    return {
      isShowFunctional: false,
      stickerOrAnimate: '',
      isShowChangeCityModal: false,
      isShowChangeSearchRangeModal: false,
      isActiveColor: true, // 是否是限时贴文和普通贴文  true为普通贴文 false为限时贴文
      isShowEnable: false,
      stickerOrAnimate: 'sticker', // 默认普通贴文
      isH5
      // imgData:[],//
      // imgUrl:[]
    }
  },
  computed: {
    haveSecond () {
      if (this.imgUrl.length > 0) {
        return true
      } else {
        return false
      }
    },
    imgUrl () {
      const { imgData } = this
      const _arr = []
      for (const item of imgData) {
        const url = URL.createObjectURL(item)
        _arr.push(url)
      }
      return _arr
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.setCameraInit()
    })
  },
  methods: {
    // 删除图片
    deletedImg (index) {
      this.$emit('deletedImg', index)
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
      this.imgUrl = []
      this.imgData = []
      setTimeout(() => {
        this.setCameraInit()
      }, 1000)
    },
    // 初始化相机按钮
    setCameraInit () {
      const boxImg = document.getElementById('uploadImg')
      const inputImg = boxImg.getElementsByTagName('input')[0]
      inputImg.setAttribute('accept', 'image/*')
    },
    // 添加相册图片或者封面图片
    previewImg ({ raw }) {
      // console.log(raw)
      // let url = URL.createObjectURL(raw)
      // this.imgUrl.push(url)
      // this.imgData.push(raw)
      this.$emit('addImg', raw)
    },
    // 添加拍摄照片或者video
    // preview({raw}){
    //   console.log(raw)
    //   let url = URL.createObjectURL(raw)
    //   this.imgUrl.push(url)
    //   this.imgData.push(raw)
    //   setTimeout(()=>{
    //     this.setCameraInit()
    //   },1000)
    // },

    // 关闭弹出组件
    closePop (e) {
      this.isShowFunctional = e
      setTimeout(() => {
        this.setCameraInit()
      }, 1000)
    },
    // 不同按钮点开的sticker组件值设置
    SetStickerAnimate (value) {
      if (this.imgData.length == 0) {
        return Message({
          message: '请上传照片',
          duration: 3 * 1000,
          showClose: true,
          customClass: 'message-override'
        })
      }
      this.$store.dispatch('setImgFiles', this.imgData)
      if (value == 'sticker') {
        this.isActiveColor = true
      } else {
        this.isActiveColor = false
      }
      this.stickerOrAnimate = value
      this.isShowFunctional = true
      setTimeout(() => {
        this.$refs.animatiBox.$refs.post.getPhoto(this.imgData)
      }, 2000)
    },
    // 打开图文发帖按钮
    openPostBox () {
      this.$store.dispatch('setImgFiles', this.imgData)
      this.isShowFunctional = true
      setTimeout(() => {
        this.$refs.animatiBox.$refs.post.getPhoto(this.imgData)
      }, 1000)
    },
    // 提交
    submit (data) {
      const self = this
      console.log('submit---------')
      console.log(data)
      PostApi.postImage(data).then(res => {
        if (res.status !== 200) {
          return
        }
        console.log('submit++++++++++')
        console.log(res)
        self.isShowFunctional = false
        Message({
          message: this.$t('lang.upload_succuss'),
          type: 'success',
          duration: 5 * 1000,
          showClose: true,
          customClass: 'message-override'
        })
      })
    }

  },
  watch: {
    imgData (newData, oldVal) {
      setTimeout(() => {
        this.setCameraInit()
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.release-page-top{
}
.release-page {
  height: 100%;
  height: calc(100% - 13vw);
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
  .release-container {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100%;
    background: url("~@/assets/release/img-demoRecording.png") no-repeat center
      center / cover;
    .prviewImgBox {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 0;
      .imgbox {
        width: 100%;
        height: 100%;
        position: relative;
      }
    }

    .top_area {
      flex: 1;
      position: relative;
      color: #fff;
      font-size: 0.35rem;
      .close_btn {
        position: absolute;
        top: 4vw;
        left: 6vw;
        width: 5vw;
        height: 5vw;
        background: url("~@/assets/release/ic_close.png") no-repeat center
          center / auto 100%;
      }
      .filter {
        position: absolute;
        top: 10vw;
        right: 4vw;
        width: 8vw;
        height: 5vw;
        padding-top: 8vw;
        background: url("~@/assets/release/ic_filter.png") no-repeat center top /
          80% auto;
      }
      .beauty {
        position: absolute;
        top: 28vw;
        right: 4vw;
        width: 8vw;
        height: 5vw;
        padding-top: 8vw;
        background: url("~@/assets/release/ic_beauty.png") no-repeat center top /
          80% auto;
      }
    }
    .bottom_area {
      display: flex;
      flex-direction: column;
      height: 45vw;
      // padding-bottom: 10vw;
      z-index: 1;
      .functional_area {
        display: flex;
        height: 15vw;
        justify-content: space-between;
        align-items: center;
        margin: 0 5vw;
        .shoot_time {
          font-size: 0.35rem;
          flex: 1;
          text-align: left;
          & > span {
            display: inline-block;
            width: 17.5vw;
            height: 8vw;
            line-height: 7vw;
            text-align: center;
            box-sizing: border-box;
          }
          .time60 {
            font-size: 12px;
            color: #6f7070;
            border-radius: 21px;
            border: solid 1px #707070;
            margin-right: 0.6rem;
          }
          .time15 {
            font-size: 12px;
            background-image: linear-gradient(90deg, #f46fe0 0%, #f8a9ec 100%);
            border-radius: 21px;
            color: #fff;
          }
        }
        .functional_area_right {
          font-size: 0.8rem;
          flex: 1;
          text-align: right;
          & > span {
            display: inline-block;
            height: 8vw;
            line-height: 8vw;
            text-align: center;
            box-sizing: border-box;
            color: #fff;
          }
          .sticker {
            width: 16vw;
            background-color: #6c757d;
            border-radius: 8px 0px 0px 8px;
          }
          .shoot_animate {
            width: 17.5vw;
            background-color: #82b1fd;
            border-radius: 0px 8px 8px 0px;
          }
          .default_color {
            background-color: #6c757d;
          }
          .active_color {
            background-color: #82b1fd;
          }
        }
      }
      .shoot_area {
        flex: 1;
        display: flex;
        align-items: center;
      padding-bottom: 10vw;

        background-image: linear-gradient(rgba(0,0,0,0.02) 0%,rgba(0,0,0,0.47) 100%);
        & > div {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          span {
            display: block;
            width: 18vw;
            padding-top: 14vw;
            color: #fff;
            text-shadow: 0.02em 0.02em 0.2em #333;
          }
        }
        .shoot_btn {
          button {
            width: 18vw;
            height: 18vw;
            background-color: #ff4646;
            border-radius: 50%;
            border: none;
            box-shadow: 2px 2px 3px 6px #ff4646;
          }
        }
        .switch_camera {
          span {
            background: url("~@/assets/release/ic_switch_camera.png") no-repeat
              center top / 80% auto;
          }
        }
        .upload {
          span.up {
            background: url("~@/assets/release/ic_upload.png") no-repeat center
              top / 80% auto;
          }
        }
      }
    }
  }
}
</style>
