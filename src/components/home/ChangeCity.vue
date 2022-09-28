<template>
  <div>
    <div id="change-city" @click.stop="cancle(false)">
      <div class="change-city__header">
        <div class="change-city__back" @click="$emit('change-city-back')"></div>
        <div class="change-city__title">{{$t('lang.switch_city')}}</div>
        <div class="change-city__switch" @click="change"></div>
      </div>
      <div class="change-city__local">{{$t('lang.position_city')}}：{{ stateName }}</div>
      <div class="change-city__hot-city">
        <div class="change-city__hot-city-title">{{$t('lang.pop_city')}}</div>
        <div class="change-city__hot-city-list">
          <div
            :class="['change-city__hot-city-item',currentCityId==item.id?'selected':'']"
            v-for="item in hotCity"
            :key="item.id"
            @click="selectedCity(item.name);currentCityId=item.id"
          >
            <button>{{item.name}}</button>
          </div>
        </div>
      </div>
      <div class="change-city__city-list">
        <SelectCity v-if="isshow" @select-city="selectedCity" />
      </div>
    </div>
    <div id="change-city-modal" @click="cancle(true)"></div>
  </div>
</template>

<script>
import SelectCity from '@/components/home/SelectCity.vue'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'change-city',
  props: {
    isshow: Boolean
  },
  data () {
    return {
      nearCityList: [
        { name: '東京', id: 1 },
        { name: '東京', id: 2 },
        { name: '東京', id: 3 },
        { name: '東京', id: 4 }
      ],
      currentCityId: 1
    }
  },
  components: {
    SelectCity
  },
  computed: {
    ...mapState({
      stateName: state => state.user.stateName,
      cityList: state => state.base.cityList
    }),
    hotCity () {
      let arr = []
      if (this.cityList && this.cityList.length) {
        arr = this.cityList.splice(0, 4)
      }
      return arr
    }
  },
  methods: {
    selectedCity (city) {
      this.$store.commit('SET_STATE_NAME', city)
      this.$emit('change-city-back')
    },
    cancle (isCancle) {
      if (isCancle) {
        this.$emit('change-city-back')
      }
    },
    change () {
      this.$emit('change-search-range')
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin icon-label {
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
#change-city {
  width: 100vw;
  top: 0px;
  left: 0px;
  position: fixed;
  background-color: #ffffff;
  z-index: 2040;
  border-radius: 0px 0px 8px 8px;
  box-shadow: 0px 12px 12px 0px rgba(0, 0, 0, 0.16);
  .change-city__header {
    height: 44px;
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.3);
    background-color: #f1f0ef;
    .change-city__back {
      width: 29px;
      height: 29px;
      background: url("~@/assets/ic-arrow-large-left@3x.png") 1rem center
        no-repeat;
      background-size: auto 29px;
      position: absolute;
      top: 7px;
    }
    .change-city__title {
      line-height: 44px;
      font-size: 17px;
      color: #6c757d;
    }
    .change-city__switch {
      width: 44px;
      height: 36px;
      background: url("~@/assets/home/ic-exchange@3x.png") 1rem center no-repeat;
      background-size: auto 36px;
      position: absolute;
      top: 7px;
      right: 10px;
    }
  }
  .change-city__local {
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
  .change-city__hot-city {
    padding-bottom: 1rem;
    .change-city__hot-city-title {
      @include icon-label();
      color: #f46fe0;
      &:before {
        // content: url('~@/assets/home/ico-hot@3x.png');
        content: "";
        background-image: url("~@/assets/home/ico-hot@3x.png");
        background-size: 44px 44px;
        transform: scale(0.6);
      }
    }
    .change-city__hot-city-list {
      padding-left: 1rem;
      padding-right: 1rem;
      display: inline-flex;
      flex-flow: row wrap;
      .change-city__hot-city-item {
        flex: 0 0 50%;
        padding-bottom: 0.8rem;
        button {
          width: 162px;
          height: 30px;
          border-radius: 4px;
          border: 0;
          background-color: #fff;
          border: solid 1px #b0b6ba;
          color: #6c757d;
          font-size: 16px;
        }
        &.selected {
          button {
            background-image: radial-gradient(
              circle at 50% 50%,
              #f46fe0,
              #f8a9ec 97%
            );
            border: solid 1px transparent;
            color: #fff;
          }
        }
      }
    }
  }
  .change-city__city-list {
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
    margin-top: -1rem;
  }
}
#change-city-modal {
  width: 100vw;
  height: 100vh;
  top: 3.2rem;
  left: 0px;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
}
</style>
