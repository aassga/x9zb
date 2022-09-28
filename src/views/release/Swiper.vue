<template>
    <div class="home_swiper-box">
        <div class="swiper-container swiper">
            <div class="swiper-wrapper">
                <div v-for="(item,index) in dataList" :key="index" class="swiper-slide">
                        <img :src="item" alt="index">
                        <div class="closeImg" @click="deletedImg(index)"></div>
                </div>

            </div>
        </div>

        <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
import Swiper, {
  Autoplay,
  EffectCoverflow,
  EffectCube,
  Pagination,
  Navigation
} from 'swiper'
// swiper-bundle.min.css 决定了小圆点和左右翻页标签，如果不需要可以不引用
import 'swiper/swiper-bundle.min.css'
Swiper.use([Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation])

export default {
  name: 'Swiper',
  data () {
    return {
      swiper: null
    }
  },
  created () {

  },
  props: ['dataList'],
  data () {
    return {
      datalist: [
        {
          url: '',
          name: ''
        }
      ]
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initSwiper()
    })
  },
  methods: {
    initSwiper () {
      this.swiper = new Swiper('.swiper', {
        loop: false,
        speed: 500,
        observer: true
      })
    },
    deletedImg (index) {
      // this.swiper.off('deleted',()=>{
      this.$emit('closeImg', index)
      // })
    }
  },
  watch: {

  }
}
</script>
<style lang="scss" >
.home_swiper-box {
    height: 100%;
    position: relative;
    width: 100%;
    margin: 0 auto;
    .swiper {
        width: 100%;
        margin: 0 auto;
        height: 100%;
        .swiper-wrapper {
            height: 100%;
            white-space: nowrap;
            .swiper-slide {

                height: 100%;
                display: inline-block;
                box-sizing: border-box;
                //background: #000;
                position: relative;
                img {
                    width: 100%;
                    height: 100%;
                }
                .closeImg {
                    position: absolute;
                    top: 4vw;
                    left: 6vw;
                    width: 5vw;
                    height: 5vw;
                    background: url("~@/assets/release/ic_close.png") no-repeat center
                    center / auto 100%;

                }
            }
        }

    }
    .swiper-pagination {
        position: absolute;
        height: 30px;
        line-height: 30px;
        bottom: 0;
        left: 47%;
    }

    .swiper-pagination {
        text-align: center;
        transition: .3s opacity;
        transform: translate3d(0,0,0);
        z-index: 10;

        .swiper-pagination-bullet {
            width: 8px;
            height: 8px;

            display: inline-block;
            border-radius: 50%;
            background: #000;
            opacity: .2;

            &.swiper-pagination-bullet-active{
                background: #007aff;
                opacity: 1;
            }
        }
    }
    .swiper-pagination-bullet {
        margin-right: 5px!important;
    }
}

</style>
