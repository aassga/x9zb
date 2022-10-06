<!-- 榜单 -->
<template>
  <div
    class="anchor-page-content-wrap anchor-page-content-wrap-not-home"
    style="padding-top: 62px"
  >
    <div class="anchor-rank-page">
      <div class="left-container">
        <div class="anchor-rank-content">
          <div class="anchor-rank-content-header">
            <div class="header-logo">
              <img
                class="title-logo"
                src="../../assets/images/no-pai.png"
                alt=""
              /><span class="title-name">人气主播榜</span>
            </div>
            <!-- <div class="time">距榜单刷新还有3天14小时</div> -->
            <div class="btn-group">
              <div
                class="btn"
                v-for="(item, index) in zhouTab"
								:key="index"
                :class="index == renIndex ? 'active' : ''"
                @click="renIndex = index"
              >
                {{ item }}
              </div>
            </div>
            <div class="top3">
              <div class="top3-common two">
                <div class="header-img">
                  <div class="outline"></div>
                  <div class="img-container">
                    <div class="lazyload-wrapper">
                      <img
                        :src="renList[1].avatar"
                        alt="head-img"
                        width="144"
                        height="144"
                        title="head-img"
                      />
                    </div>
                  </div>
                  <div class="num">NO.2</div>
                </div>
                <div class="name">{{ renList[1].user_nickname }}</div>
                <div class="info">
                  <div class="level" v-if="renList[1].amount !== 0">
                    <img :src="renList[1].votestotal_icon" alt="" />
                  </div>
                  <div class="popular">人气{{ renList[1].amount }}</div>
                </div>
                <div
                  class="status-btn add-btn"
                  @click="attention(renList[1])"
                  v-if="
                    renList[1].is_watchlist != null &&
                    renList[1].is_watchlist == 0 &&
                    renList[1].is_live == 0
                  "
                >
                  <span class="img"></span>关注
                </div>
                <div
                  class="status-btn no-add-btn"
                  @click="attention(renList[1])"
                  v-if="
                    renList[1].is_watchlist != null &&
                    renList[1].is_watchlist == 1 &&
                    renList[1].is_live == 0
                  "
                >
                  已关注
                </div>
                <div v-if="renList[1].is_live == 1">
                  <router-link
                    class="status-btn live-btn"
                    :to="
                      '/live?router=live&type=' +
                      renList[1].live_type +
                      '&id=' +
                      renList[1].match_id +
                      '&uid=' +
                      renList[1].uid
                    "
                    tag="a"
                    target="_blank"
                  >
                    <div class="living_box">
                      <div class="strip"></div>
                      <div class="strip"></div>
                      <div class="strip"></div>
                    </div>
                    直播中
                  </router-link>
                </div>
              </div>
              <div class="top3-common one">
                <div class="header-img">
                  <div class="outline"></div>
                  <div class="img-container bigger">
                    <div class="lazyload-wrapper">
                      <img
                        :src="renList[0].avatar"
                        alt="head-img"
                        width="144"
                        height="144"
                        title="head-img"
                      />
                    </div>
                  </div>
                  <div class="num">NO.1</div>
                </div>
                <div class="name">{{ renList[0].user_nickname }}</div>
                <div class="info">
                  <div class="level" v-if="renList[0].amount != 0">
                    <img :src="renList[0].votestotal_icon" alt="" />
                  </div>
                  <div class="popular">人气{{ renList[0].amount }}</div>
                </div>
                <div
                  class="status-btn add-btn"
                  @click="attention(renList[0])"
                  v-if="
                    renList[0].is_watchlist != null &&
                    renList[0].is_watchlist == 0 &&
                    renList[0].is_live == 0
                  "
                >
                  <span class="img"></span>关注
                </div>
                <div
                  class="status-btn no-add-btn"
                  @click="attention(renList[0])"
                  v-if="
                    renList[0].is_watchlist != null &&
                    renList[0].is_watchlist == 1 &&
                    renList[0].is_live == 0
                  "
                >
                  已关注
                </div>
                <div v-if="renList[0].is_live == 1">
                  <router-link
                    class="status-btn live-btn"
                    :to="
                      '/live?router=live&type=' +
                      renList[0].live_type +
                      '&id=' +
                      renList[0].match_id +
                      '&uid=' +
                      renList[0].uid
                    "
                    tag="a"
                    target="_blank"
                  >
                    <div class="living_box">
                      <div class="strip"></div>
                      <div class="strip"></div>
                      <div class="strip"></div>
                    </div>
                    直播中
                  </router-link>
                </div>
              </div>
              <div class="top3-common three">
                <div class="header-img">
                  <div class="outline"></div>
                  <div class="img-container">
                    <div class="lazyload-wrapper">
                      <img
                        :src="renList[2].avatar"
                        alt="head-img"
                        width="144"
                        height="144"
                        title="head-img"
                      />
                    </div>
                  </div>
                  <div class="num">NO.3</div>
                </div>
                <div class="name">{{ renList[2].user_nickname }}</div>
                <div class="info">
                  <div class="level" v-if="renList[2].amount != 0">
                    <img :src="renList[2].votestotal_icon" alt="" />
                  </div>
                  <div class="popular">人气{{ renList[2].amount }}</div>
                </div>
                <div
                  class="status-btn add-btn"
                  @click="attention(renList[2])"
                  v-if="
                    renList[2].is_watchlist != null &&
                    renList[2].is_watchlist == 0 &&
                    renList[2].is_live == 0
                  "
                >
                  <span class="img"></span>关注
                </div>
                <div
                  class="status-btn no-add-btn"
                  @click="attention(renList[2])"
                  v-if="
                    renList[2].is_watchlist != null &&
                    renList[2].is_watchlist == 1 &&
                    renList[2].is_live == 0
                  "
                >
                  已关注
                </div>
                <div v-if="renList[2].is_live == 1">
                  <router-link
                    class="status-btn live-btn"
                    :to="
                      '/live?router=live&type=' +
                      renList[2].live_type +
                      '&id=' +
                      renList[2].match_id +
                      '&uid=' +
                      renList[2].uid
                    "
                    tag="a"
                    target="_blank"
                  >
                    <div class="living_box">
                      <div class="strip"></div>
                      <div class="strip"></div>
                      <div class="strip"></div>
                    </div>
                    直播中
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="anchor-rank-content-list">
            <div
              class="list-item"
              v-for="(item, index) in renList"
							:key="index"
              v-if="index > 2"
            >
              <div class="left">
                <div class="img">
                  <div class="lazyload-wrapper">
                    <img
                      :src="item.avatar"
                      alt="head-img"
                      width="80"
                      height="80"
                      title="head-img"
                    />
                  </div>
                </div>
                <div class="level-logo" v-if="item.amount != 0">
                  <img :src="item.votestotal_icon" alt="" />
                </div>
                <div class="name" style="margin-left: 10px">
                  {{ item.user_nickname }}
                </div>
              </div>
              <div class="middle">人气 {{ item.amount }}</div>
              <div class="right" v-if="item.amount != 0">
                <div class="blank"></div>
                <div v-if="item.is_live == 1">
                  <router-link
                    class="status-btn live-btn"
                    :to="
                      '/live?router=live&type=' +
                      item.live_type +
                      '&id=' +
                      item.match_id +
                      '&uid=' +
                      item.uid
                    "
                    tag="a"
                    target="_blank"
                  >
                    <div class="living_box">
                      <div class="strip"></div>
                      <div class="strip"></div>
                      <div class="strip"></div>
                    </div>
                    直播中
                  </router-link>
                </div>
                <div
                  class="status-btn add-btn"
                  @click="attention(item)"
                  v-if="item.is_watchlist == 0 && item.is_live == 0"
                >
                  <span class="img"></span>关注
                </div>
                <div
                  class="status-btn no-add-btn"
                  @click="attention(item)"
                  v-if="item.is_watchlist == 1 && item.is_live == 0"
                >
                  已关注
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-container">
        <div class="anchor-rank-content">
          <div class="anchor-rank-content-header">
            <div class="header-logo">
              <img
                class="title-logo"
                src="../../assets/images/no-ren.png"
                alt=""
              /><span class="title-name">壕气达人榜</span>
            </div>
            <!-- <div class="time">距榜单刷新还有14小时</div> -->
            <div class="btn-group">
              <div
                class="btn"
                v-for="(item, index) in zhouTab"
								:key="index"
                :class="index == zhouIndex ? 'active' : ''"
                @click="zhouIndex = index"
              >
                {{ item }}
              </div>
            </div>
            <div class="top3">
              <div class="top3-common two">
                <div class="header-img">
                  <div class="outline"></div>
                  <div class="img-container">
                    <div class="lazyload-wrapper">
                      <img
                        :src="zhouList[1].avatar"
                        alt="head-img"
                        width="144"
                        height="144"
                        title="head-img"
                      />
                    </div>
                  </div>
                  <div class="num">NO.2</div>
                </div>
                <div class="name">{{ zhouList[1].user_nickname }}</div>
                <div class="info">
                  <div class="popular">
                    <img
                      width="60px"
                      v-if="zhouList[1].amount != 0"
                      :src="zhouList[1].exp_icon"
                    />壕气 {{ zhouList[1].amount }}
                  </div>
                </div>
                <div
                  class="status-btn add-btn"
                  @click="attention(zhouList[1])"
                  v-if="
                    zhouList[1].is_watchlist != null &&
                    zhouList[1].is_watchlist == 0
                  "
                >
                  <span class="img"></span>关注
                </div>
                <div
                  class="status-btn no-add-btn"
                  @click="attention(zhouList[1])"
                  v-if="
                    zhouList[1].is_watchlist != null &&
                    zhouList[1].is_watchlist == 1
                  "
                >
                  已关注
                </div>
              </div>
              <div class="top3-common one">
                <div class="header-img">
                  <div class="outline"></div>
                  <div class="img-container bigger">
                    <div class="lazyload-wrapper">
                      <img
                        :src="zhouList[0].avatar"
                        alt="head-img"
                        width="144"
                        height="144"
                        title="head-img"
                      />
                    </div>
                  </div>
                  <div class="num">NO.1</div>
                </div>
                <div class="name">{{ zhouList[0].user_nickname }}</div>
                <div class="info">
                  <div class="popular">
                    <img
                      width="60px"
                      v-if="zhouList[0].amount != 0"
                      :src="zhouList[0].exp_icon"
                    />壕气 {{ zhouList[0].amount }}
                  </div>
                </div>
                <div
                  class="status-btn add-btn"
                  @click="attention(zhouList[0])"
                  v-if="
                    zhouList[0].is_watchlist != null &&
                    zhouList[0].is_watchlist == 0
                  "
                >
                  <span class="img"></span>关注
                </div>
                <div
                  class="status-btn no-add-btn"
                  @click="attention(zhouList[0])"
                  v-if="
                    zhouList[0].is_watchlist != null &&
                    zhouList[0].is_watchlist == 1
                  "
                >
                  已关注
                </div>
              </div>
              <div class="top3-common three">
                <div class="header-img">
                  <div class="outline"></div>
                  <div class="img-container">
                    <div class="lazyload-wrapper">
                      <img
                        :src="zhouList[2].avatar"
                        alt="head-img"
                        width="144"
                        height="144"
                        title="head-img"
                      />
                    </div>
                  </div>
                  <div class="num">NO.3</div>
                </div>
                <div class="name">{{ zhouList[2].user_nickname }}</div>
                <div class="info">
                  <div class="popular">
                    <img
                      width="60px"
                      v-if="zhouList[2].amount != 0"
                      :src="zhouList[2].exp_icon"
                    />壕气 {{ zhouList[2].amount }}
                  </div>
                </div>
                <div
                  class="status-btn add-btn"
                  @click="attention(zhouList[2])"
                  v-if="
                    zhouList[2].is_watchlist != null &&
                    zhouList[2].is_watchlist == 0
                  "
                >
                  <span class="img"></span>关注
                </div>
                <div
                  class="status-btn no-add-btn"
                  @click="attention(zhouList[2])"
                  v-if="
                    zhouList[2].is_watchlist != null &&
                    zhouList[2].is_watchlist == 1
                  "
                >
                  已关注
                </div>
              </div>
            </div>
          </div>
          <div class="anchor-rank-content-list">
            <div
              class="list-item"
              v-for="(item, index) in zhouList"
              v-if="index > 2"
              :key="index"
            >
              <div class="left">
                <div class="img">
                  <div class="lazyload-wrapper">
                    <img
                      :src="item.avatar"
                      alt="head-img"
                      width="80"
                      height="80"
                      title="head-img"
                    />
                  </div>
                </div>
                <div class="level-wealth" v-if="item.amount != 0">
                  <img :src="item.exp_icon" alt="" />
                </div>
                <div class="name">{{ item.user_nickname }}</div>
              </div>
              <div class="middle">壕气 {{ item.amount }}</div>
              <div class="right">
                <div class="blank"></div>
                <div
                  class="status-btn add-btn"
                  @click="attention(item)"
                  v-if="item.is_watchlist != null && item.is_watchlist == 0"
                >
                  <span class="img"></span>关注
                </div>
                <div
                  class="status-btn no-add-btn"
                  @click="attention(item)"
                  v-if="item.is_watchlist != null && item.is_watchlist == 1"
                >
                  已关注
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { attention } from "@/api/user.js";
import { LeaderboardAnchor, LeaderboardUser } from "@/api/competition.js";
export default {
  data() {
    return {
      renIndex: 0,
      zhouIndex: 0,
      renList: [],
      zhouList: [],
      zhouTab: ["周榜", "月榜", "总榜"],
    };
  },
  mounted() {
    this.LeaderboardAnchor();
    this.LeaderboardUser();
  },
  watch: {
    renIndex() {
      this.LeaderboardAnchor();
    },
    zhouIndex() {
      this.LeaderboardUser();
    },
  },
  methods: {
    // 关注
    attention(item) {
      attention({ id: item.uid })
        .then((res) => {
          item.is_watchlist == 0
            ? (item.is_watchlist = 1)
            : (item.is_watchlist = 0);
          this.$message.success(res.msg);
        })
        .catch((res) => {});
    },

    // 平台人气主播排行榜
    LeaderboardAnchor() {
      let arr = [];
      // res = [1,3,4,5]

      for (var i = 0; i < 10; i++) {
        let obj = {
          amount: 0,
          user_nickname: "虚位已待",
          avatar: require("../../assets/images/userLogo.png"),
          is_guard: 0,
          is_watchlist: null,
        };
        arr.push(obj);
      }
      LeaderboardAnchor({ type: this.renIndex })
        .then((res) => {
          res.data.forEach((item, index) => {
            arr[index] = { ...arr[index], ...item };
          });
          this.renList = arr;
          console.log(arr);
        })
        .catch((res) => {});
    },
    // 平台豪气排行榜
    LeaderboardUser() {
      let arr = [];
      // res = [1,3,4,5]

      for (var i = 0; i < 10; i++) {
        let obj = {
          amount: 0,
          user_nickname: "虚位已待",
          avatar: require("../../assets/images/userLogo.png"),
          is_guard: 0,
          is_watchlist: null,
        };
        arr.push(obj);
      }
      LeaderboardUser({ type: this.zhouIndex })
        .then((res) => {
          res.data.forEach((item, index) => {
            arr[index] = { ...arr[index], ...item };
          });
          this.zhouList = arr;
        })
        .catch((res) => {});
    },
  },
};
</script>

<style>
/* @import url("../../styles/rank.css"); */
.anchor-page-content-wrap {
  margin-top: 62px;
  position: relative;
  padding-top: 20px;
}
.level img,
.popular img,
.level-wealth img,
.level-logo img {
  width: 54px !important;
  height: 24px;
  /* margin-right: 10px; */
}
.info .level {
  width: 54px !important;
}
</style>
