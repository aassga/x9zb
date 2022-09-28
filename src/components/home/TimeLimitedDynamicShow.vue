<template>
  <div id="time-limited-dynamic-show">
    <div class="dynamic-post">
      <div class="title">
        <!-- <img class="avatar" :src="dynamicInfo.avatar"/> -->
        <el-image class="avatar" fit="cover" :src="dynamicInfo.avatar">
          <div slot="error">
            <img class="avatar" src="@/assets/my/img-user.jpg" alt srcset />
          </div>
        </el-image>
        <div class="user">
          <div class="name">{{dynamicInfo.userName}}</div>
          <div class="id">{{dynamicInfo.userId}}</div>
        </div>
        <div class="colse" @click="$emit('close-time-limited-dynamic-show')"></div>
      </div>
    </div>
    <div class="response"></div>
    <div class="unlock__button" v-if="carouselIndex.type==='unlock'">
      <button
        @click="$emit('open-unlock-modal', carouselIndex.price)"
      >{{$t('lang.cost')}}${{carouselIndex.price}}{{$t('lang.unlock_activity')}}</button>
      <div>
        已有
        <a>{{carouselIndex.lockCount}}</a>人解鎖
      </div>
    </div>
    <div class="response-title">
      <div :class="carouselIndex.like"></div>
    </div>
    <div class="carousel">
      <el-carousel
        :height="`${imgHeight}`"
        :interval="nowInterval"
        ref="carousel"
        arrow="always"
        @change="carouselChanged"
        :autoplay="autoplayTimeLimitedDynamicShowCarousel"
      >
        <el-carousel-item v-for="(item, index) in dynamicShowList" :key="index">
          <div class="unlock" v-if="item.type==='unlock'"></div>
          <img :src="`${item.img}`" :height="`${imgHeight}`" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: 'time-limited-dynamic-show',
  props: {
    autoplayTimeLimitedDynamicShowCarousel: {
      type: Boolean
    },
    dynamicInfo: {
      type: Object
    },
    dynamicShowList: {
      type: Array
    },
    initInterval: {
      type: Number
    }
  },
  data () {
    return {
      imgHeight: 0,
      carouselCurrentPage: 0
    }
  },
  computed: {
    carouselIndex () {
      return this.dynamicShowList[this.carouselCurrentPage]
    },
    nowInterval () {
      return this.carouselIndex.interval
        ? this.carouselIndex.interval
        : this.initInterval
    }
  },
  methods: {
    carouselChanged (newVal, oldVal) {
      if (oldVal === this.dynamicShowList.length - 1 && newVal === 0) {
        this.$emit('next-user')
      }
      if (oldVal === 0 && newVal === this.dynamicShowList.length - 1) {
        this.$emit('prev-user')
      }
      this.carouselCurrentPage = newVal
      const carouselItem = document.querySelectorAll(
        '.el-carousel__indicators--horizontal li'
      )
      const carouselItemData = document.querySelectorAll(
        '.el-carousel__indicators--horizontal li button'
      )
      for (let i = 0; i < this.dynamicShowList.length; i++) {
        if (i < newVal) {
          carouselItem[i].querySelectorAll(
            'li button'
          )[0].style.backgroundColor = '#fff'
          carouselItem[i].querySelectorAll('li button')[0].style.opacity = '1'
        } else {
          carouselItem[i].querySelectorAll(
            'li button'
          )[0].style.backgroundColor = 'rgba(201, 201, 201, 1)'
          carouselItem[i].querySelectorAll('li button')[0].style.opacity =
            '.48'
        }
        if (i === newVal) {
          this.$emit('update-interval', this.nowInterval)
          carouselItemData[i].style.animation = `slideCarousel ${parseInt(
            this.nowInterval / 1000
          )}s`
        } else {
          carouselItemData[i].style.animation = ''
        }
      }
    },
    updateCarouse () {
      const carouselItem = document.querySelectorAll(
        '.el-carousel__indicators--horizontal li'
      )
      const carouselItemData = document.querySelectorAll(
        '.el-carousel__indicators--horizontal li button'
      )
      const length = this.dynamicShowList.length
      for (let i = 0; i < length; i++) {
        carouselItem[i].style.padding = '3.2vw 0vw'
        carouselItem[i].style.paddingRight = '5px'
        if (i === length - 1) {
          carouselItem[i].style.paddingRight = '0px'
        }
        carouselItemData[i].style.width = `${(window.innerWidth -
          (length - 1) * 5) /
          length}px`
        if (i === this.carouselCurrentPage) {
          this.$emit('update-interval', this.nowInterval)
          carouselItemData[i].style.animation = `slideCarousel ${parseInt(
            this.nowInterval / 1000
          )}s`
        } else {
          carouselItemData[i].style.animation = ''
        }
      }
    },
    slideCarousel () {
      const box = document.querySelector('.el-carousel')
      // const box = document.querySelector('.el-carousel__container');
      let startPoint = 0
      let stopPoint = 0
      const resetPoint = () => {
        startPoint = 0
        stopPoint = 0
      }
      box.addEventListener('touchstart', e => {
        startPoint = e.changedTouches[0].pageX
      })
      box.addEventListener('touchmove', e => {
        stopPoint = e.changedTouches[0].pageX
      })

      const self = this
      box.addEventListener('touchend', e => {
        if (stopPoint === 0 || startPoint - stopPoint === 0) {
          resetPoint()
          return
        }
        if (startPoint - stopPoint > 0) {
          resetPoint()
          // self.$refs.carousel.next();
          self.$emit('next-user')
          return
        }
        if (startPoint - stopPoint < 0) {
          resetPoint()
          // self.$refs.carousel.prev();
          self.$emit('prev-user')
        }
      })
    }
  },
  mounted () {
    this.imgHeight = `${window.innerHeight - 50}px`
    setTimeout(() => {
      this.updateCarouse()
      this.slideCarousel()
    }, 150)
  }
}
</script>
<style lang="scss" scoped>
#time-limited-dynamic-show {
  position: relative;
  .dynamic-post {
    position: absolute;
    z-index: 3;
    width: 100vw;
    margin-top: 18px;
    .title {
      display: flex;
      padding-left: 20px;
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
          color: #ffffff;
        }
        .id {
          font-size: 12px;
          line-height: 18px;
          color: #ffffff;
        }
      }
      .colse {
        position: relative;
        height: 23px;
        width: 22px;
        background: url("~@/assets/home/ic-close@3x.png") no-repeat no-repeat;
        background-size: 23px 22px;
        margin-left: auto;
        margin-top: 11px;
        padding-right: 11px;
      }
    }
  }
  .response {
    background-image: linear-gradient(360deg, #23272b 0%, #4b4b4b 100%);
    opacity: 0.8;
    position: absolute;
    bottom: 0;
    z-index: 3;
    width: 100vw;
    height: 80px;
  }
  div.unlock__button {
    position: absolute;
    top: calc(100vh / 2 - 22px - 50px);
    left: calc(100vw / 2 - 135px);
    width: 270px;
    height: 44px;
    z-index: 5;
    z-index: 6;
    div {
      margin-top: 8px;
      font-size: 12px;
      color: #f46fe0;
      a {
        color: #fff;
      }
    }
    button {
      width: 270px;
      height: 44px;
      border-radius: 8px;
      border: 0;
      background-image: radial-gradient(
        circle at 50% 50%,
        #f46fe0,
        #f8a9ec 97%
      );
      color: #fff;
      font-size: 16px;
    }
  }
  .response-title {
    position: absolute;
    display: flex;
    bottom: 20px;
    left: 20px;
    z-index: 2040;
    .like {
      height: 50px;
      width: 50px;
      background: url("~@/assets/home/ic-like@3x.png");
      background-size: auto 50px;
    }
    .unlike {
      height: 44px;
      width: 44px;
      background: url("~@/assets/home/ic-like-normal@3x.png");
      background-size: auto 44px;
    }
  }
}
</style>

<style lang="scss">
#time-limited-dynamic-show {
  position: absolute;
  .carousel {
    position: relative;
    div.unlock {
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
      height: 100vh;
      width: 100vw;
      z-index: 5;
    }
    img {
      width: 100vw;
    }
    .el-carousel__indicators--horizontal {
      top: 0;
      width: 100vw;
      pointer-events: none;
      li {
        pointer-events: none;
        button {
          pointer-events: none;
          background-color: rgba(201, 201, 201, 1);
        }
        &.is-active {
          button {
            background-size: 200% 100%;
            background-image: linear-gradient(
              to left,
              #fff 50%,
              rgba(201, 201, 201, 1) 50%
            );
            -webkit-animation: slideCarousel 4s ease infinite;
            -moz-animation: slideCarousel 4s ease infinite;
            -o-animation: slideCarousel 4s ease infinite;
            animation: slideCarousel 4s ease infinite;
          }
        }
      }
    }
  }
}
@-webkit-keyframes slideCarousel {
  0% {
    opacity: 0.48;
    background-position: 0 0;
  }
  100% {
    opacity: 1;
    background-position: -100% 0;
  }
}
</style>
