<template>

       <video-player
        ref="videoPlayer"
        class="video-player vjs-custom-skin"
        :playsinline="true"
        :options="playerOptions"

        />
        <!-- @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)" -->

</template>
<script>
// import 'videojs-contrib-hls'
export default {
  name: 'VideoPlay',
  props: {
    videoUrl: {
      type: String
    },
    posterUrl: {
      type: String
    },
    index: {
      type: String | Number,
      default: 0
    },
    item: {
      type: Object,
      default () {
        return {}
      }
    },
    uid: {
      type: String | Number,
      default: 0
    }
  },
  components: {
    // videoPlayer
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player// 自定义播放
    }
  },
  methods: {
    // onPlayerPlay(play){

    //     play.play()

    // },

    // onPlayerPause(player) {

    //     console.log("pause");

    // }
  },
  data () {
    return {
      playerOptions: {
        controls: true,
        allowUpdate: true,
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'application/x-mpegURL', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: null// url地址
          }
        ],
        hls: true,
        poster: null, // 你的封面地址
        width: document.documentElement.clientWidth, // 播放器宽度
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: false, // 当前时间和额持续时间的分隔符
          durationDisplay: false, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间的功能
          fullscreenToggle: true // 全屏按钮
        }
      }
    }
  },
  mounted () {
    console.log(this)
    this.playerOptions.sources[0].src = this.videoUrl
    this.playerOptions.poster = this.posterUrl
    // 如果当前付费视频是自己发布的  则会自动加载
    if (!this.videoUrl) {
      if (this.uid == this.item.uid) {
        this.$emit('getVideoInfo', this.item, this.index)
      } else {
        // this.playerOptions.notSupportedMessage = '请先解锁影片'
      }
    }
  },
  watch: {
    videoUrl (newData, oldData) {
      console.log(newData)
      this.playerOptions.sources[0].src = newData
    }
  }

}
</script>
