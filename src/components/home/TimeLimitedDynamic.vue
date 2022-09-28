<template>
  <div id="time-limited-dynamic" v-if="getLimitdyn && getLimitdyn.length && getLimitdyn.length > 0">
      <!-- {{getLimitdyn}} -->
    <div class="dynamic-post" v-for="(item, index) in getLimitdyn" :key="index" @click="goToPostPage(item.tid, item.tshare,item)">
        <!-- @click="goToPostPage(item.tid, item.tshare)" -->

        <img :src="`${item.images}`"/>
        <!-- <div class="dynamic-post-avatar"
            :style="`background: url('${item.avatar}') no-repeat 0 center; background-size: 6.4vw 6.4vw;`">
        </div> -->
        <div class="dynamic-post-name">{{item.subject}}</div>
        <div v-if="!item.is_free" class="unlock">
            <div></div>
        </div>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  name: 'time-limited-dynamic',
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      getLimitdyn: state => state.post.imgData.getLimitdyn,
      userInfo: ({ user }) => user.user_info

    })
  },
  methods: {
    goToPostPage (tid, tshare, item) {
      const { jump_url } = item
      console.log(item)
      if (jump_url) { // 限动广告跳转至广告商的页面
        window.open(jump_url)
      } else {
        this.$router.push({ path: '/x/' + item.tshare })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#time-limited-dynamic {
    // height: 12rem;
    height: 120px;
    background-color: #ffffff;
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
    display: flex;
    overflow-x: auto;
    // display: none;
    .dynamic-post {
        height: 100px;
        width: 74px;
        padding: 10px;
        // padding-top: 18px;
        padding-right: 0px;
        img {
            height: 74px;
            width: 74px;
            border-radius: 4px;
            &.photo__live {
                height: 66px;
                width: 66px;
                margin-top: -.4rem;
                border: 2px solid #fff;
            }
        }
        .photo__live-background {
            height: 66px;
            width: 76px;
            border-radius: 4px;
            background: linear-gradient(to bottom,
                        #efdd05 0%,
                        #03d5e6 46%,
                        #f26fe1 100%);
        }
        .dynamic-post-name {
            &__live {
                // margin-top: calc(-3px - .1rem);
                margin-top: calc(-3px);
            }
            &__sponsor {
                margin-top: -6px;
            }
        }
        .unlock, .live, .sponsor {
            position: relative;
            height: 64px;
            width: 74px;
            border-radius: 4px;
            margin-top: -100px;
            z-index: 2;
            button {
                height: 18px;
                font-size: 12px;
                border: 0;
                border-radius: 1px;
            }
        }
        .unlock {
            div {
                height: 27px;
                width: 27px;
                margin: auto;
                margin-top: 10px;
                background: url('~@/assets/home/ic-lock@3x.png') 27px center no-repeat;
                background-size: auto 27px;
                background-position: center center;
            }
            &:before {
                content: '';
                background-color: rgba(0, 0, 0, 0.5);
                border-radius: 4px;
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                z-index: -99;
            }
        }
        .live {
            button {
                width: 52px;
                background-image: radial-gradient(circle at 50% 50%, #f46fe0, #f8a9ec 97%);
                color: #fff;
                margin-top: 17px;
            }
        }
        .sponsor {
            button {
                width: 63px;
                background-color: #82b1fd;
                color: #fff;
            }
        }
        .dynamic-post-avatar {
            position: relative;
            height: 24px;
            width: 24px;
            // background: url('~@/assets/home/Ellipse135@3x.png') no-repeat 0 center;
            // background-size: 24px 24px;
            margin-top: -80px;
            margin-bottom: 40px;
            margin-left: 5px;
            z-index: 2;
        }
        div {
            padding-top: 10px;
            color: #6c757d;
            font-size: .8rem;
        }
        .dynamic-post-name {
            padding-top: 0;
            overflow: hidden;
            width: 100%;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
}
</style>
