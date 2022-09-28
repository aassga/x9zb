<template>
  <div class="release-page-top">
    <div class="release-page">
      <div class="release-container">
        <div class="top_area">
          <span class="close_btn" @click="goHome"></span>
          <span class="filter" @click="isShowEnable=true">{{$t('lang.filter')}}</span>
          <span class="beauty" @click="isShowEnable=true">{{$t('lang.beauty')}}</span>
        </div>
        <div class="bottom_area">
          <div class="functional_area">
            <div class="shoot_time">
              <span class="time60">{{$t('lang.secound60')}}</span>
              <span class="time15">{{$t('lang.secound15')}}</span>
            </div>
            <div class="functional_area_right">
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
            <div class="switch_camera">
              <span>{{$t('lang.switch_camera')}}</span>
            </div>
            <div class="shoot_btn">
              <button @click="gotoUpload"></button>
            </div>
            <div class="upload" @click="upload">
              <span>{{$t('lang.upload')}}</span>
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
    <NotEnable :isshow="isShowEnable" @closeNotEnable="() => isShowEnable = false"></NotEnable>
    <Footer :active="2" />
  </div>
</template>

<script>
import Footer from '@/components/footer/Index.vue'
import SetStickerAnimate from './SetStickerAnimate.vue'
import ChangeCity from '@/components/home/ChangeCity.vue'
import ChangeSearchRange from '@/components/home/ChangeSearchRange.vue'
import NotEnable from '@/components/header/NotEnable.vue'

import PostApi from '@/api/post.js'
import MyApi from '@/api/my.js'
import { Message } from 'element-ui'
export default {
  name: 'release-index',
  components: {
    Footer,
    SetStickerAnimate,
    ChangeCity,
    ChangeSearchRange,
    NotEnable
  },
  data () {
    return {
      isShowFunctional: false,
      stickerOrAnimate: '',
      isShowChangeCityModal: false,
      isShowChangeSearchRangeModal: false,
      isActiveColor: true,
      isShowEnable: false
    }
  },
  methods: {
    // 去到视频上传界面
    gotoUpload () {
      this.$router.push('uploadVideo')
    },
    // 关闭弹出组件
    closePop (e) {
      this.isShowFunctional = e
    },
    // 不同按钮点开的sticker组件值设置
    SetStickerAnimate (value) {
      if (value == 'sticker') {
        this.isActiveColor = true
      } else {
        this.isActiveColor = false
      }
      this.isShowFunctional = true
      this.stickerOrAnimate = value
    },
    // 提交
    submit (data) {
      const self = this
      PostApi.postImage(data).then(res => {
        if (res.status !== 200) {
          return
        }
        self.isShowFunctional = false
        Message({
          message: this.$t('lang.upload_succuss'),
          type: 'success',
          duration: 5 * 1000,
          showClose: true,
          customClass: 'message-override'
        })
      })
    },
    upload () {
      // MyApi.myGuide().then((res)=>{
      //   console.log(res);
      // });
      // PostApi.postCreate(15, 'test0414').then((res)=>{
      //   console.log(res);
      // });
    },
    goHome () {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="scss" scoped>
.release-page-top{
  height:100%;
}
.release-page {
  height: 100%;
  .release-container {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: calc(100% - 13vw);
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
      height: 45vw;
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
