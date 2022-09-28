<template>
  <div>
    <div class="release-page">
      <div class="release-container">
        <div class="top_area">
          <span class="close_btn"></span>
          <span class="filter">{{$t('lang.all_filter')}}</span>
          <span class="beauty">{{$t('lang.beauty')}}</span>
        </div>
        <div class="bottom_area">
          <div class="functional_area">
            <div class="shoot_time">
              <span class="time60">{{$t('lang.second60')}}</span>
              <span class="time15">{{$t('lang.second15')}}</span>
            </div>
            <div class="functional_area_right">
              <span class="sticker" @click="SetStickerAnimate('sticker')"
                >{{$t('lang.post')}}</span
              >
              <span class="shoot_animate" @click="SetStickerAnimate('animate')"
                >{{$t('lang.time_limit_dyna')}}</span
              >
            </div>
          </div>
          <div class="shoot_area">
            <div class="switch_camera">
              <span>{{$t('lang.switch_camera')}}</span>
            </div>
            <div class="shoot_btn">
              <!-- <button></button> -->
              <!-- <el-upload class="d-inline-block"
              ref="upload"
              id="upload"
              action=""
              :auto-upload="fase"
              :show-file-list="false"
              :on-change="preview"
              multiple
              >

              </el-upload> -->
              <button @click="gotoUpload"></button>

            </div>
            <div class="upload">
              <span>{{$t('lang.upload')}}</span>
            </div>
          </div>
        </div>
        <SetStickerAnimate
          v-if="isShowFunctional"
          v-bind:stickerOrAnimate="stickerOrAnimate"
          v-bind:isShowFunctional="isShowFunctional"
          @changeFunctional="changeFunctional"
          @change-city="isShowChangeSearchRangeModal=true"
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
    <Footer :active="2" />
  </div>
</template>

<script>
import Footer from '@/components/footer/Index.vue'
import SetStickerAnimate from './SetStickerAnimate.vue'
import ChangeCity from '@/components/home/ChangeCity.vue'
import ChangeSearchRange from '@/components/home/ChangeSearchRange.vue'
export default {
  name: 'release-index',
  components: {
    Footer,
    SetStickerAnimate,
    ChangeCity,
    ChangeSearchRange
  },
  data () {
    return {
      isShowFunctional: false,
      stickerOrAnimate: '',
      isShowChangeCityModal: false,
      isShowChangeSearchRangeModal: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      const box = document.getElementById('upload')
      const _input = box.getElementsByTagName('input')[0]
      _input.setAttribute('accept', 'image/*')
      _input.setAttribute('capture', 'camera')
      // console.log(_input)
    })
  },
  methods: {
    // 去到视频上传界面
    gotoUpload () {
      this.$router.push('uploadVideo')
    },
    setCameraInit () {
      const box = document.getElementById('upload')
      const _input = box.getElementsByTagName('input')[0]
      _input.setAttribute('accept', 'image/*')
      _input.setAttribute('capture', 'camera')
    },
    preview ({ raw }) {
      console.log(raw)
      const { type } = raw
      if (!type.indexOf('video/')) {
        console.log('这是video')
      }
      if (!type.indexOf('image/')) {
        console.log('这是image')
      }
      this.setCameraInit()
    },
    changeFunctional (e) {
      this.isShowFunctional = e
    },
    SetStickerAnimate (value) {
      this.isShowFunctional = true
      this.stickerOrAnimate = value
    }
  }
}
</script>

<style lang="scss" scoped>
.release-page {
  .release-container {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: calc(100vh - 13vw);
    background: url("~@/assets/release/img-demoRecording.png") no-repeat center
      center / cover;
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
      height: 60vw;
      .functional_area {
        display: flex;
        height: 15vw;
        justify-content: space-between;
        align-items: center;
        margin: 0 5vw;
        .shoot_time {
          font-size: 0.35rem;
          & > span {
            display: inline-block;
            width: 17.5vw;
            height: 8vw;
            line-height: 7vw;
            text-align: center;
            box-sizing: border-box;
          }
          .time60 {
            color: #6f7070;
            border-radius: 21px;
            border: solid 1px #707070;
            margin-right: 0.6rem;
          }
          .time15 {
            background-image: linear-gradient(90deg, #f46fe0 0%, #f8a9ec 100%);
            border-radius: 21px;
            color: #fff;
          }
        }
        .functional_area_right {
          font-size: 0.8rem;
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
        }
      }
      .shoot_area {
        flex: 1;
        display: flex;
        align-items: center;
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
          span {
            background: url("~@/assets/release/ic_upload.png") no-repeat center
              top / 80% auto;
          }
        }
      }
    }
  }
}
</style>
