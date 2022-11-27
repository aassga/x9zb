<template>
  <div class="recommend-list-view">
    <div class="grid-header">
      <div class="grid-header-left">
        <img
          class="grid-header-left-icon"
          src="@/assets/images/main-recommend-title.png"/>
        <div class="grid-header-left-text">赛事推荐</div>
        <div class="grid-header-left-nav">
          <div
            v-for="(item, index) in tabList"
            :key="index"
            :class="{ 
              'fifa-normal': index === 1,
              'fifa-active': type === 1 && type === index,
              active2: type === index }"
            @click="onHandleType(index)">
            <!-- 針對世界杯放置的足球小圖 -->
            <img 
              v-if="index === 1" 
              src="@/assets/images/fifa-football-icon.png" />
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
      <div class="grid-header-right">
        <div class="grid-header-right-text">
          <span>今日({{ count }})</span>
        </div>
      </div>
    </div>
    <div 
      class="type-section" 
      :class="{'prepare-section': key === 'type2'}"
      v-for="(sort, key) in recommendList" 
      :key="key">
      <div class="sort-header">
        <div class="sort-title">
          <img :src="typeInfo[key].icon">
          <span>{{typeInfo[key].context}}</span>
        </div>
        <a class="more" @click="onHandleNavigate(type < 3 ? 'football' : 'basketball')">
          查看全部
        </a>
      </div>
      <div v-if="sort.length === 0">
        <div class="empty-list">没有更多比赛了，请尝试变更过滤条件</div>
      </div>
      <div v-else>
        <div 
          class="sort-list"
          v-for="item in sort"
          :key="item.sourceid">
          <div class="match-left-info">
            <div class="match-time-info">
              <div class="match-time">{{ item.match_time.slice(6, 11) || "-"}}</div>
              <div class="match-date">{{ item.match_time.slice(0, 5) || "-" }}</div>
            </div>
            <div class="competition-name">
              {{ item.competition || "-" }}
            </div>
            <div class="match-state">
              {{ item.status_str || "-" }}
            </div>
          </div>
          <div class="match-main-info">
            <div class="team-name left-team">{{ item.home_team_name || "-" }}</div>
            <div class="match-score">
              <span>{{ item.home_scores || "0" }}</span>
              <span>-</span>
              <span>{{ item.away_scores || "0" }}</span>
            </div>
            <div class="team-name right-team">{{ item.away_team_name || "-" }}</div>
          </div>
          <div class="match-right-info">
            <div class="anchor-info" :class="{'show-panel': item.anchor_total > 0}">
              <div 
                v-if="item.anchor_total > 0"
                class="anchor-icon">
                <img src="@/assets/images/anchor-icon.png" /> 
              </div>
              <div class="hover-anchor-pannel">
                <div class="pannel-title">{{item.anchor_total}}位主播</div>
                <div 
                  class="anchor-list"
                  v-for="anchor in item.anchor_list" 
                  :key="anchor.id"
                  @click="onHandleNavigate(item, anchor.id)">
                  <span class="anchor-name">{{anchor.user_nickname}}</span>
                  <span class="live-lable">
                    直播中
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </div>
              </div>
            </div>
            <div class="mlive-button">
              <img
                @click="item.mlive === 1 ? onHandleNavigate(item, null, true) : false"
                :class="{'gray-effect': (item.mlive !== 1)}"
                src="@/assets/images/mlive-icon.png"
                alt="视频图标" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: Number,
      default: 0
    },
    count: {
      type: Number || String,
      default: 0
    },
    recommendList: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      tabList: [
        { name: "全部" },
        { name: "世界杯" },
        { name: "足球" },
        { name: "篮球" },
        // { name: "电竞" },
      ],
      typeInfo: {
        type1: {
          context: "进行中的比赛",
          icon: require("@/assets/images/main-beigin.png")
        },
        type2: {
          context: "未开始的比赛",
          icon: require("@/assets/images/main-end.png")
        },
        type3: {
          context: "已结束的比赛",
          icon: require("@/assets/images/main-ends.png")
        },
      }
    }
  },
  methods: {
    onHandleType (index) {
      this.$emit('onHandleType', index)
    },
    onHandleNavigate (item, anchor_id, isLive) {
      let url = ""
      if (anchor_id) {
        url = `live?type=${item.type == 1 ? 'basketball' : 'football'}&id=${item.sourceid}&uid=${anchor_id}&vid=${item.vid}`
      } else if (isLive) {
        url = `score-live?type=${item.type == 1 ? 'basketball' : 'football'}&id=${item.sourceid}&vid=${item.vid}`
      } else {
        url = item
      }
      
      this.$emit('onHandleNavigate', url)
    },
  }
}
</script>

<style lang="scss" scoped>
.recommend-list-view {
  width: 100%;
  .grid-header-left-nav {
    & > div {
      img {
        width: 16px;
        height: 16px;
        vertical-align: sub;
      }
      &.fifa-normal {
        width: 72px;
        font-size: 13px;
        font-weight: bolder;
        background: -webkit-linear-gradient(#CC0742, #770225, #770225);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        &:hover {
          color: white;
          -webkit-background-clip: unset;
          -webkit-text-fill-color: unset;
          background-size: 100% 100%;
          background-image: url('../assets/images/fifa-nav-bg.png');
        }
      }
      &.fifa-active {
        color: white;
        -webkit-background-clip: unset;
        -webkit-text-fill-color: unset;
        background-size: 100% 100%;
        background-image: url('../assets/images/fifa-nav-bg.png');
      }
    }
  }

  .type-section {
    border-radius: 4px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    background-color: white;
    box-shadow: 0 0 5px rgba($color: #a6a6a6, $alpha: .2);
    .sort-header {
      text-align: center;
      padding: 10px 0;
      .sort-title {
        display: inline-block;
        font-size: 18px;
        vertical-align: super;
        img {
          width: 18px;
          height: 18px;
          margin-right: 5px;
          vertical-align: sub;
        }
      }
      .more {
        float: right;
        margin-right: 16px;
        margin-top: 3px;
        font-size: 12px;
        color: #9497a4;
      }
    }
    .empty-list {
      font-size: 14px;
      text-align: center;
      padding: 15px 25px 20px;
      color: #9497a4;
    }
    .sort-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      padding: 5px 15px;
      border-bottom: 1px solid #e9eaeb;
      &:last-child {border-bottom: none;}
      .match-left-info {
        display: flex;
        align-items: center;
        text-align: center;
        width: 170px;
        font-weight: 500;
        .match-time-info {
          width: 50px;
          .match-time {
            font-size: 16px;
            font-weight: 600;
            letter-spacing: 1px;
          }
          .match-date {
            line-height: 1;
            color: #9497a4;
          }
        }
        .competition-name {
          width: 90px;
          padding: 0 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-break: break-all;
        }
        .match-state {
          min-width: 40px;
        }
      }
      .match-main-info {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 442px;
        font-weight: 500;
        .team-name {
          width: 170px;
          font-size: 13px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-break: break-all;
          &.left-team {text-align: right;}
          &.right-team {text-align: left;}
        }
        .match-score {
          min-width: 86px;
          font-size: 18px;
          text-align: center;
          margin: 0 5px;
          span {
            &:nth-child(2) {padding: 0 3px;}
          }
        }
      }
      .match-right-info {
        display: flex;
        justify-content: flex-end;
        width: 200px;
        .anchor-info {
          position: relative;
          width: 20px;
          margin-right: 15px;
          .anchor-icon {
            animation: shining 2s ease infinite alternate;
            cursor: pointer;
            img {
              width: 20px;
              height: 20px;
            }
            @keyframes shining {
              10% {
                transform: scale(1.2);
              }
              20% {
                transform: scale(1);
              }
              30% {
                transform: rotate(5deg);
              }
              40% {
                transform: rotate(-5deg);
              }
              50% {
                transform: rotate(5deg);
              }
              60% {
                transform: rotate(-5deg);
              }
              65% {
                transform: rotate(0);
              }
            }
          }
          .hover-anchor-pannel {
            display: none;
            min-width: 180px;
            width: max-content;
            height: auto;
            position: absolute;
            bottom: 0;
            right: 0;
            z-index: 99;
            padding: 5px 10px;
            transform: translate(5%, 98%);
            border-radius: 4px;
            background-color: white;
            border: 1px solid #ead8bd;
            .pannel-title {
              font-size: 12px;
              padding: 0 0 5px;
              color: #b2a38c;
              border-bottom: 1px solid #ead8bd;
            }
            .anchor-list {
              min-width: 100%;
              max-width: max-content;
              padding: 4px 4px;
              margin: 4px 0;
              cursor: pointer;
              .live-lable {
                display: inline-block;
                color: #5c4625;
                padding: 0 5px;
                margin-left: 10px;
                border-radius: 3px;
                background-color: #f0b864;
                transform: scale(0.8);
                span {
                  display: inline-block;
                  width: 3px;
                  height: 10px;
                  background-color: rgb(128, 96, 65);
                  border-radius: 2px;
                  margin-right: 1px;
                  transform-origin: bottom;
                  animation: bounce 2.2s ease infinite alternate;
                  &:nth-of-type(2) {animation-delay: -2.2s;}
                  &:nth-of-type(3) {animation-delay: -3.7s;}
                }
              }
              @keyframes bounce {
                10% {transform: scaleY(0.3);}
                30% {transform: scaleY(1);}
                60% {transform: scaleY(0.5);}
                80% {transform: scaleY(0.75);}
                100% {transform: scaleY(0.6);}
              }
              &:hover {
                color: #936621;
                border-radius: 4px;
                background-color: #f9f7f2;
                .live-lable {
                  color: #f9efe0;
                  background-color: #df310e;
                  span {
                    background-color: #f9efe0;
                  }
                }
              }
            }
          }
          &.show-panel:hover {
            .anchor-icon {
              animation-play-state: paused;
            }
            .hover-anchor-pannel {display: block;}
          }
        }
        .mlive-button {
          width: 20px;
          img {
            width: 18px;
            height: 18px;
            cursor: pointer;
            &:hover {
              filter: contrast(1.2) hue-rotate(10deg);
            }
            &.gray-effect {
              filter: grayscale(1) brightness(1.15);
              cursor: default;
            }
          }
        }
      }
    }
    &.prepare-section {
      .sort-list {
        .match-main-info {
          .match-score {min-width: 65px;}
        }
      }
    }
  }
}
</style>