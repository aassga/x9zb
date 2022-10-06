<!-- 详情 -->
<template>
  <view class="detail">
    <downloadHead v-if="show1"></downloadHead>
    <view
      class="detail-video flex"
      :style="{ marginTop: show1 ? '100rpx' : '0' }"
      v-if="mlive == 1"
    >
      <view class="detail-navBar flex-wrap">
        <image
          src="/static/images/competition/right.png"
          @click="$u.route({ type: 'back' })"
          mode=""
        ></image>
        <view class="detail-navBar-center">
          <view>{{ base.competition_name_zh }}</view>
          <view>{{ base.time }}</view>
        </view>
        <image src="" mode=""></image>
      </view>
      <view class="detail-vs flex">
        <view class="detail-vs-left">
          <image :src="base.home_team_log" mode=""></image>
          <view>{{ base.home_team_name_zh }}</view>
        </view>
        <view class="detail-vs-center">
          <view>{{ getStatus(base) }}</view>
          <view class="detail-vs-num" v-if="base.home_data"
            >{{ base.home_data[0] }}-{{ base.away_data[0] }}</view
          >
        </view>
        <view class="detail-vs-left">
          <image :src="base.away_team_log" mode=""></image>
          <view class="text-clamp">{{ base.away_team_name_zh }}</view>
        </view>
      </view>
      <view class="detail-video-btn flex">
        <text v-if="mlive == 1" @click="mlive = 2">动画直播</text>
        <!-- <text v-if="base.mlive == 1">|</text> <text>视频直播</text> -->
      </view>
    </view>
    <!--  -->
    <view
      class="detail-video flex"
      :style="{ marginTop: show1 ? '100rpx' : '0' }"
      style="height: 244px"
      v-else
    >
      <view class="detail-navBar flex-wrap">
        <image
          src="/static/images/competition/right.png"
          @click="toUrl(mlive)"
          mode=""
        ></image>
      </view>
      <iframe
        style="width: 100%; height: 100%"
        :src="base.live_animation_url"
        frameborder="0"
      ></iframe>
    </view>
    <!-- 切换 -->
    <u-tabs
      :list="tabList"
      :is-scroll="true"
      font-size="28"
      item-width="calc(100%/5)"
      active-color="#E3AC72"
      :current="current"
      @change="change"
    ></u-tabs>
    <detail1 :base="base" v-if="current == 0"></detail1>
    <detail2 :base="base" ref="detail2" v-if="current == 1"></detail2>
    <detail3 v-if="current == 2" ref="detail3"></detail3>
    <!-- <detail4 v-if="current==3" ref="detail4"></detail4> -->
    <detail5 v-if="current == 3" :base="base"></detail5>
  </view>
</template>

<script>
import detail1 from "./compontent/detail-1.vue";
import detail2 from "./compontent/detail-2.vue";
import detail3 from "./compontent/detail-3.vue";
import detail4 from "./compontent/detail-4.vue";
import detail5 from "./compontent/detail-5.vue";
import { getQueryString } from "@/common/Qs";
export default {
  components: { detail1, detail2, detail3, detail4, detail5 },
  data() {
    return {
      mlive: 1,
      base: {},
      current: 0,
      tabList: [
        {
          name: "赛况",
        },
        {
          name: "直播",
        },
        {
          name: "阵容",
        },
        // {
        // 	name: '指数'
        // },
        {
          name: "聊球",
        },
      ],
      timeInterval: null,
    };
  },
  onLoad(option) {
    this.getDetail(option.id);
    this.$store.state.timMessage = [];
    this.recordUsageTime();
    this.timeInterval = setInterval(() => {
      this.recordUsageTime();
    }, 60000);
  },
  computed: {
    system() {
      return this.$store.state.system;
    },
    show1: {
      get() {
        return this.$store.state.show;
      },
      set() {
        // this.$store.state.info.midMask = !this.$store.state.info.midMask
      },
    },
  },
  methods: {
    /* 监听是切换还是跳转 */
    toUrl(type) {
      if (type == 2) {
        this.mlive = 1;
      } else {
        this.$u.route({ type: "back" });
      }
    },

    change(e) {
      this.current = e;
      if (e == 1) {
        setTimeout((res) => {
          this.$refs.detail2.getdetail();
        }, 200);
      } else if (e == 2) {
        setTimeout((res) => {
          this.$refs.detail3.getdetail(this.base.id);
        }, 200);
        // }else if(e == 3){
        // 	setTimeout(res=>{
        // 		this.$refs.detail4.getdetail(this.base.id)
        // 	},200)
      }
    },
    // 获取篮球详情
    getDetail(id) {
      this.$u
        .get("/api/Football/football_match_detail", { id: id })
        .then((res) => {
          // res为服务端返回的数据
          res.tlive1 = res.tlive.reverse();
          this.base = res;
          this.$store.dispatch("joinGroup", { id: id });
        });
    },
    getStatus(item, type) {
      console.log(item.status);
      if (
        item.status == 3 ||
        item.status == 4 ||
        item.status == 5 ||
        item.status == 7
      ) {
        let newdata = new Date().getTime() / 1000;
        if (type == 1) {
          return this.formatSeconds((newdata - item.match_time).toFixed(0));
        } else {
          return this.formatMin((newdata - item.match_time).toFixed(0));
        }
      } else {
        return item.status == 1
          ? "未"
          : item.status == 3
          ? "中"
          : item.status == 8
          ? "完"
          : "";
      }
    },
    // 时间转成分
    formatMin(value) {
      var theTime = parseInt(value); // 需要转换的时间秒
      var theTime1 = 0; // 分
      var theTime2 = 0; // 小时
      var theTime3 = 0; // 天
      if (theTime > 60) {
        theTime1 = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        if (theTime1 > 60) {
          theTime2 = parseInt(theTime1 / 60);
          theTime1 = parseInt(theTime1 % 60);
          if (theTime2 > 24) {
            //大于24小时
            theTime3 = parseInt(theTime2 / 24);
            theTime2 = parseInt(theTime2 % 24);
          }
        }
      }
      var result = "";
      if (theTime1 > 0) {
        result = "" + parseInt(theTime1) + "'" + result;
      }
      return result;
    },
    // 記錄進入直播間時長
    recordUsageTime() {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let user_id = userInfo ? userInfo.id : localStorage.getItem("userid");

      let data = {
        user_id: getQueryString().user_id || user_id,
        match_id: getQueryString().id,
      };
      this.$u
        .post("api/statistics/recordUsageTime", data)
        .then((res) => {})
        .catch((res) => {});
    },
  },
  destroyed() {
    clearInterval(this.timeInterval);
  },
};
</script>

<style lang="scss">
.detail-video {
  position: relative;
  min-height: 392rpx;
  background: url(/static/images/competition/video-bg.png) center top / 100%
    auto no-repeat;
}
.detail-navBar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 14rpx 24rpx;
  image {
    width: 60rpx;
    height: 60rpx;
  }
  .detail-navBar-center {
    color: #fff;
    font-size: 24rpx;
    text-align: center;
  }
}
.detail-vs {
  color: #fff;
  width: 100%;
  // margin-top: 80rpx;
  align-self: center;
  text-align: center;
  padding: 0 78rpx;
  .detail-vs-left {
    flex: 1;
    image {
      width: 96rpx;
      height: 96rpx;
      margin: 0 auto;
      border-radius: 50%;
      // margin-bottom: 20rpx;
    }
    view {
      font-size: 28rpx;
    }
  }
  .detail-vs-center {
    font-size: 24rpx;
    .detail-vs-num {
      margin-top: 12rpx;
      font-size: 64rpx;
    }
  }
}

.detail-video-btn {
  color: #fff;
  width: 288rpx;
  position: absolute;
  bottom: 24rpx;
  right: 47%;
  opacity: 0.4;
  display: block;
  text-align: center;
  margin-right: -144rpx;
  font-size: 24rpx;
  padding: 16rpx 24rpx;
  border-radius: 80rpx;
  align-items: flex-end;
  background-color: #000;
}
</style>
