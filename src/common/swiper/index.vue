<template>

        <div :class="setDomBoxClass">
            <div class="swiper-wrapper">
                <div v-for="(item,index) in dataList" :key="index" class="swiper-slide">
                        <!-- <img :src="item" alt="item.name"> -->
                        <el-image :src="item" :preview-src-list="[item]" class="img"></el-image>
                </div>

            </div>

            <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
            <div :class="setPageClass"></div>
        </div>

</template>

<script>
import Swiper, {
  Autoplay,
  Pagination,
  Navigation
} from 'swiper'
// swiper-bundle.min.css 决定了小圆点和左右翻页标签，如果不需要可以不引用
import 'swiper/swiper-bundle.min.css'
Swiper.use([Autoplay, Pagination, Navigation])

export default {
  name: 'Swiper',
  created () {

  },
  props: ['dataList', 'index'],
  computed: {
    setDomBoxClass () {
      if (this.index) {
        return `swiper-container swiper swiper${this.index}`
      } else {
        return 'swiper-container swiper'
      }
    },
    setPageClass () {
      if (this.index) {
        return `swiper-pagination swiper-pagination${this.index}`
      } else {
        return 'swiper-pagination'
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initSwiper()
    })
  },
  methods: {
    initSwiper () {
      const getDom = this.index ? `.swiper${this.index}` : '.swiper'
      const paginationDom = this.index ? `.swiper-pagination${this.index}` : '.swiper-pagination'
      console.log()
      new Swiper(getDom, {
        // initialSlide:0,
        loop: true,
        speed: 500,
        slidesPerView: 1,
        pagination: {
          el: paginationDom
          // clickable :true, //点击分页器的指示点分页器会控制Swiper切换
        }
      })
    }
  }
}
</script>
<style lang="scss" >
.swiper  {
    height: 100%;
    width: 100%;
    .swiper-wrapper {
        width: 100%;
        height: 100%;
        .swiper-slide {

            height: 100%;
            display: inline-block;
            box-sizing: border-box;

            .img {
                width:100%!important;
                height: 260px!important;
            }
        }
    }
    .swiper-pagination-bullet-active {
        background: #f46fe0;
    }
}

</style>
