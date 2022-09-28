<template>
  <div id="home-index">
    <MyAnimation  v-if="isSHowProgress"/>
    <template v-if="!isShowTimeLimitedDynamicShowList">
      <UserAddress
        :visible="isShowAddress"
        @change-ShowAddress="isShowAddress=false;isShowChangeSearchRangeModal=true;isShowPurchaseModal=false"
      />
      <HomeHeader
        v-if="!isShowSearchModal"
        @change-city="clickChangeCity"
        @open-purchase-modal="isShowPurchaseModal=!isShowPurchaseModal"
        @open-search-modal="isShowSearchModal=true;isShowPurchaseModal=false"
      />
      <!-- <AmountPopup @close="isShowPurchaseModal=false" :show="isShowPurchaseModal" /> -->
      <ChangeCity
        v-if="isShowChangeCityModal"
        :isshow="isShowChangeCityModal"
        @change-city-back="isShowChangeCityModal=false"
        @change-search-range="isShowChangeCityModal=false;isShowChangeSearchRangeModal=true;"
      />
      <ChangeSearchRange
        v-if="isShowChangeSearchRangeModal"
        :isshow="isShowChangeSearchRangeModal"
        @change-search-range-back="isShowChangeSearchRangeModal=false"
        @change-city="isShowChangeSearchRangeModal=false;isShowChangeCityModal=true"
      />
      <Search v-if="isShowSearchModal" @search-cancel="isShowSearchModal=false" />
      <div class="home-content">
        <TimeLimitedDynamic
          @open-purchase-modal="isShowPurchaseModal=true"
          @open-time-limited-dynamic-show="isShowTimeLimitedDynamicShowList=true"
        />
        <Dynamic
          @open-purchase-modal="isShowPurchaseModal=true"
          @open-dynamic-setting-modal="openDynamicSettingModal"
        />
        <DynamicSettingModalStep
          v-if="isShowDynamicSettingModalStep"
          :visible="isShowDynamicSettingModalStep"
          :tid="tid"
          :pid="pid"
          :uid="uid"
          :tshare="tshare"
          @close-dynamic-setting-modal-step="isShowDynamicSettingModalStep=false"
          @closeNotEnable="() => isShowDynamicSettingModalStep = false"
        />
      </div>
    </template>
    <TimeLimitedDynamicShowList
      v-else
      :autoplayTimeLimitedDynamicShowCarousel="autoplayTimeLimitedDynamicShowCarousel"
      @close-time-limited-dynamic-show="isShowTimeLimitedDynamicShowList=false"
      @open-unlock-modal="openNnlockModal"
    />
    <UnlockModal
      v-if="isShowUnlockModal"
      :price="unlockPrice"
      walletBalance="548.00"
      @close-unlock-modal="isShowUnlockModal=false; autoplayTimeLimitedDynamicShowCarousel=true;"
    />
    <Footer />
  </div>
</template>

<script>
import MyAnimation from '@/components/home/animation.vue'
import HomeHeader from '@/components/home/Header.vue'
import AmountPopup from '@/components/header/AmountPopup.vue'
import ChangeCity from '@/components/home/ChangeCity.vue'
import UserAddress from '@/components/home/UserAddress.vue'
import ChangeSearchRange from '@/components/home/ChangeSearchRange.vue'
import Search from '@/components/home/Search.vue'
import TimeLimitedDynamic from '@/components/home/TimeLimitedDynamic.vue'
import Dynamic from '@/components/home/Dynamic.vue'
import DynamicSettingModalStep from '@/components/home/DynamicSettingModalStep.vue'
import Footer from '@/components/footer/Index.vue'

import TimeLimitedDynamicShowList from '@/components/home/TimeLimitedDynamicShowList.vue'
import UnlockModal from '@/components/home/UnlockModal.vue'

import RecommendApi from '@/api/recommend.js'
export default {
  name: 'home-index',
  data () {
    return {
      isShowPurchaseModal: false,
      isShowChangeCityModal: false,
      isShowChangeSearchRangeModal: false,
      isShowSearchModal: false,
      isShowTimeLimitedDynamicShowList: false,
      isShowUnlockModal: false,
      isShowDynamicSettingModalStep: false,
      autoplayTimeLimitedDynamicShowCarousel: true,
      unlockPrice: 0,
      tid: 0,
      pid: 0,
      uid: 0,
      tshare: '',
      isShowAddress: false
    }
  },
  computed: {
    isSHowProgress: function () {
      return this.$store.state.base.isSHowProgress
    }
  },
  components: {
    HomeHeader,
    AmountPopup,
    ChangeCity,
    ChangeSearchRange,
    Search,
    TimeLimitedDynamic,
    Dynamic,
    DynamicSettingModalStep,
    TimeLimitedDynamicShowList,
    UnlockModal,
    Footer,
    UserAddress,
    MyAnimation
  },
  methods: {
    openNnlockModal (price) {
      this.unlockPrice = price
      this.isShowUnlockModal = true
      this.autoplayTimeLimitedDynamicShowCarousel = false
    },
    openDynamicSettingModal (data) {
      // 值传过去undfine 暂时存
      localStorage.setItem('u_id', data.uid)
      this.uid = data.uid
      this.tid = data.tid
      this.pid = data.pid
      this.tshare = data.tshare
      this.isShowDynamicSettingModalStep = true
    },
    onSuccess (position) {
      console.log(position)
      try {
        const lon = position.coords.longitude
        const lat = position.coords.latitude
        this.locationName(lon, lat)
      } catch (err) {}
    },
    locationName (lng, lat) {
      const self = this
      let location_name = ''
      // 获取定位名称
      try {
        const new_point = new BMap.Point(lng, lat)
        const gc = new BMap.Geocoder() // 初始化，Geocoder类
        gc.getLocation(new_point, rs => {
          console.log(rs, 'rs rs rs rs')
          // getLocation函数用来解析地址信息，分别返回省市区街等
          const addComp = rs.addressComponents
          const province = addComp.province // 获取省份
          const city = addComp.city // 获取城市
          const district = addComp.district // 区
          const street = addComp.street // 街
          const streetNumber = addComp.streetNumber
            ? addComp.streetNumber + '号'
            : ''
          location_name = province + city + district + street + streetNumber
          this.$store.commit('SET_STATE_NAME', city)
          this.pushLocation({
            latitude: lat,
            longitude: lon,
            distance: 0.5,
            city_name: city
          })
          console.log(location_name, 'location_name; location_name;')
        })
      } catch (err) {
        console.log(err, 'err err err')
      }
    },
    // 获取定位逻辑
    // 1.前端获取经纬度，使用百度地图通过经纬度获取到当前城市传给后端
    // 2.前端没有获取到经纬度，不传参数，后端通过ip获取到当前城市
    // 3.前端没有获取到经纬度且后端没有获取到ip，弹窗弹出用户选择国家和城市
    pushLocation (params = {}) {
      // 获取城市定位信息
      this.$store.dispatch('setStateName')
      // 框架已获取
      // this.$store.dispatch("setStateName").then(res => {
      //   if (res.data.code == 100) {
      //     //this.$store.commit("SET_STATE_NAME", res.data.current_city.name);
      //   } else {
      //     //this.$store.commit("SET_STATE_NAME", "未知");

      //   }
      // });
    },
    onError (error) {
      this.pushLocation()
      switch (error.code) {
        case 1:
          console.log('位置服务被拒绝')
          break

        case 2:
          console.log('暂时获取不到位置信息')
          break

        case 3:
          console.log('获取信息超时')
          break

        case 4:
          console.log('未知错误')
          break
      }
    },
    clickChangeCity () {
      const that = this
      const option = {
        enableHighAccuracy: true,
        maximumAge: 1000
      }
      // 没有定位城市的时候
      if (!this.$store.state.user.stateName) {
        if (navigator.geolocation) {
          console.log('0000000')
          navigator.geolocation.getCurrentPosition(
            that.onSuccess,
            that.onError,
            option
          )
        } else {
          this.pushLocation()
        }
      }
      // else {
      //   this.isShowChangeSearchRangeModal = true;
      //   this.isShowPurchaseModal = false;
      // }
    }
  },
  created () {
    this.pushLocation()
    // this.$store.dispatch("getProvinceList", {
    //       country_id: 45
    //     });
  }
}
</script>

<style lang="scss" >
.home-content {
  background-color: rgba(0, 0, 0, 0.16);
  width: 100%;
  height: calc(100% - 3.2rem - 13.3vw);
  padding-top: 3.2rem;height: 100%;
}
input,
button,
textarea {
  &:focus {
    outline: none !important;
  }
}
input:focus,
textarea:focus {
  border: 1px solid #449fdb !important;
}
#home-index {
  width: 100%;
  height: 100%;
}
</style>
