<template>
  <div>
    <div id="change-search-range" @click.stop="cancle(false)">
      <div class="change-search-range__header">
        <div class="change-search-range__back" @click="$emit('change-search-range-back')"></div>
        <div class="change-search-range__title">{{$t('lang.country_selection')}}</div>
        <!-- <div class="change-search-range__switch" @click="$emit('change-city')">下一步</div> -->
      </div>
      <div class="change-search-range__local">{{$t('lang.no_available')}}：{{ stateName || $t('lang.unknown') }}</div>
      <div class="change-city__city-list">
        <SelectCountry isshow @select-country="selectedCountry" />
      </div>
      <!-- <div class="change-search-range__setting">
                    <div class="change-search-range__setting-title">
                        手動設置距離偏好
                    </div>
                    <div class="change-search-range__setting__slider">
                        <el-slider v-model="distance"></el-slider>
                    </div>
            </div>
            <div class="change-search-range__add-range">
                <div class="change-search-range__add-range__title">
                    <div class="change-search-range__add-range__switch-title">
                        自動擴大範圍搜尋
                    </div>
                    <div class="change-search-range__add-range__switch">
                        <el-switch v-model="checked" :width="35" active-color="#f46fe0" inactive-color="#f1f0ef"/>
                    </div>
                </div>
                <div class="change-search-range__add-range__text">
                    如果附近用戶較少，將自動擴大範圍為當前定位+1000公里
                </div>
      </div>-->
    </div>
    <!-- <div id="change-search-range-modal" @click="cancle(true)"></div> -->
  </div>
</template>

<script>
import { Select } from 'element-ui'
import { mapState } from 'vuex'
import SelectCountry from '@/components/home/SelectCountry.vue'
export default {
  name: 'change-search-range',
  props: {
    isshow: Boolean
  },
  components: { SelectCountry },
  computed: {
    ...mapState({
      stateName: state => state.user.stateName
    })
  },
  data () {
    return {
      checked: true,
      distance: 1
    }
  },
  methods: {
    cancle (isCancle) {
      if (isCancle) {
        this.$emit('change-search-range-back')
      }
    },
    selectedCountry (country) {
      this.$store
        .dispatch('getNewCityList', {
          country_id: country.id
        })
        .then(res => {
          const { data } = res
          if (data) {
            this.$store.commit('SET_CITY_LIST', data)
            this.$emit('change-city')
          } else {
            this.$emit('change-search-range-back')
            this.$store.commit('SET_STATE_NAME', country.name)
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin icon-label {
  // height: 44px;
  // line-height: 44px;
  display: flex;
  height: 44px;
  line-height: 44px;
  font-size: 17px;
  padding-right: 1px;
  &:before {
    display: inline-block;
    height: 44px;
    width: 44px;
    // margin-top: 0.25rem;
  }
}
#change-search-range {
  width: 100vw;
  top: 0px;
  left: 0px;
  position: fixed;
  background-color: #ffffff;
  z-index: 2040;
  border-radius: 0px 0px 8px 8px;
  .change-search-range__header {
    height: 44px;
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.3);
    background-color: #f1f0ef;
    .change-search-range__back {
      width: 29px;
      height: 29px;
      background: url("~@/assets/ic-arrow-large-left@3x.png") 1rem center
        no-repeat;
      background-size: auto 29px;
      position: absolute;
      top: 7px;
    }
    .change-search-range__title {
      line-height: 44px;
      font-size: 17px;
      color: #6c757d;
    }
    .change-search-range__switch {
      //   width: 44px;
      line-height: 44px;
      //   background: url("~@/assets/home/ic-exchange@3x.png") 1rem center no-repeat;
      background-size: auto 36px;
      position: absolute;
      top: 7px;
      right: 10px;
    }
  }
  .change-search-range__local {
    @include icon-label();
    border-bottom: 1px solid rgba(60, 60, 67, 0.36);
    color: #6c757d;
    &:before {
      // content: url('~@/assets/home/ic-location@3x.png');
      content: "";
      background-image: url("~@/assets/home/ic-location@3x.png");
      background-size: 44px 44px;
    }
  }
  .change-search-range__setting {
    @include icon-label();
    border-bottom: 1px solid rgba(60, 60, 67, 0.36);
    color: #6c757d;
    padding-left: 20px;
    padding-right: 20px;
    height: 103px;
    display: block;
    text-align: left;
    font-size: 17px;
    .change-search-range__setting-title {
      text-align: left;
      padding-top: 15px;
      padding-bottom: 15px;
      font-size: 17px;
    }
  }
  .change-search-range__add-range {
    @include icon-label();
    border-bottom: 1px solid rgba(60, 60, 67, 0.36);
    color: #6c757d;
    display: block;
    height: 103px;
    box-shadow: 0px 12px 12px 0px rgba(0, 0, 0, 0.16);
    border-radius: 0px 0px 8px 8px;
    .change-search-range__add-range__title {
      display: flex;
      justify-content: space-between;
      padding-top: 10px;
      padding-left: 20px;
      margin-right: 22px;
    }
    .change-search-range__add-range__text {
      font-size: 12px;
      color: #999999;
    }
  }
}
#change-search-range-modal {
  width: 100vw;
  height: 100vh;
  top: 3.2rem;
  left: 0px;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
}
</style>
<style lang="scss">
.change-search-range__setting__slider {
  line-height: 24px;
  &::after {
    content: "+500公里" !important;
    position: relative !important;
    top: -72px !important;
    left: 78% !important;
    color: #f46fe0;
  }
  .el-slider {
    margin-top: -15px;
    .el-slider__runway {
      background-color: #cccccc !important;
      .el-slider__bar {
        background-color: #82b1fd !important;
      }
      .el-slider__button-wrapper {
        top: -30px;
        .el-tooltip.el-slider__button {
          border: none;
          margin-top: 6px;
          border-radius: 0%;
          width: 20px;
          height: 60px;
          background: url("~@/assets/home/ico-location-white.png") 1rem center
            no-repeat !important;
          background-size: auto 20px !important;
          background-position: 0 0px !important;
        }
      }
    }
  }
}
.el-tooltip__popper {
  display: none;
}
</style>
