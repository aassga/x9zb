<template>
  <div class="tencent_player_container">
    <div class="button-container">
      <button @click="changeQualitySwitcher('sd')">顺畅</button>
      <button @click="changeQualitySwitcher('hd')">高清</button>
    </div>
    <div class="danmu-container" :style="danmakuSystem.show ? 'opacity: 1' : 'opacity: 0'">
      <vue-danmaku
        ref="danmaku"
        class="demo"
        :danmus="danmus"
        v-bind="config"
        style="height:100px;width:100%"
      >
        <!-- 容器slot :style="{height:danmakuSystem == 1?'20%':danmakuSystem == 2?'50%':'100%'}"-->
        <!-- <div :style="{height:danmakuSystem.area == 3?'10vh':danmakuSystem.area == 2?'30vh':'60vh'}"></div> -->
        <!-- 弹幕slot -->
        <template v-slot:dm="{ index, danmu }">
          <div class="danmu-item xuan-bg">
            <span style="font-size: 20px;">{{danmu.messageForShow}}</span>
          </div>
        </template>
      </vue-danmaku>
    </div>

    <div id="videoContain" v-show="hdShow">
      <!-- <video id="player-container-id" preload="auto" playsinline webkit-playsinline></video> -->
    </div>
    
    <div id="videoContainSd" v-show="sdShow"></div>

    <div class="mute_btn" @click="unmute()" v-if="showUnmute">
      <div class="mute_btn_icon"></div>
      <div class="mute_btn_text">点击取消静音</div>
    </div>
    
    <div class="layout-anchor-nostart-content" v-if="UpSowing">
      <div>
        <img
          src="../assets/images/live-none.png"
          style="width: 64px;height: 64px;margin: 0 auto;display: block;"
        />
        <div
          style="font-size: 20px;text-align: center;color: #666;padding: 10px 0;margin-bottom: 40px;"
        >主播暂未开播</div>
      </div>
    </div>

    <div class="layout-anchor-nostart-content" v-if="TcPlayerUrlLoding">
      <div>
        <img
          src="../assets/images/giphy.gif"
          style="width: 250px;height: 100px;margin: 0 auto;display: block;"
        />
        <div
          style="font-size: 20px;text-align: center;color: #666;padding: 10px 0;margin-bottom: 40px;"
        >加载中。。。</div>
      </div>
    </div>
    <el-image class="video_bottom_logo" :src="require('@/assets/images/logo.png')" alt srcset />
  </div>
</template>
<!--播放器脚本文件-->

<script>
let tcPlayer = null;
import vueDanmaku from "./vue-danmaku.vue";
import { getRoomInfo } from "../../src/api/user.js";
export default {
  name: "TcVideoPlayer",
  components: {
    vueDanmaku
  },
  props: {
    // info: {
    // 		type: Object,
    // 		default: {},
    // },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      showUnmute: false, //播放器静音
      query: {}, //路由参数
      qsVid: "",
      danmus: [],
      config: {
        channels: 2, // 轨道数量，为0则弹幕轨道数会撑满容器
        useSlot: true, // 是否开启slot
        loop: false, // 是否开启弹幕循环
        speeds: 50, // 弹幕速度，实际为每秒弹幕走过的像素距离
        fontSize: 20, // 文本模式下的字号 (slot開啟後無效)
        top: 10, // 弹幕轨道间的垂直间距
        right: 0, // 同一轨道弹幕的水平间距
        debounce: 100 // 弹幕刷新频率（多少毫秒插入一条弹幕，建议不小于50）
      },
      UpSowing: false, //主播是否上播
      TcPlayerUrlLoding: true, //数据加载前loding
      timer: null, //直播倒计时
      counttDown: 0, //开赛倒计时
      urlPlayer: "", //直播链接
      sdVideo:"",
      hdVideo:"",
      sdShow:false,
      hdShow:true,
    };
  },
  mounted() {
    let query = this.$route.query;
    this.query = query;
    this.getRoomInfo(getRoomInfo);
    this.eventAdd();
    if (!localStorage.getItem("danmakuShow")) {
      localStorage.setItem("danmakuShow", "1");
    };
    this.$store.state.danmakuSystem.show = localStorage.getItem("danmakuShow") === "1";
  },
  watch: {
    "$store.state.item"(e) {
      let list = this.$store.state.item;
      if (this.$refs.danmaku == null) return;
      this.$refs.danmaku.push(list);
    } 
  },
  computed: {
    //弹幕配置
    danmakuSystem() {
      let system = this.$store.state.danmakuSystem;
      this.config.channels = system == 3 ? 3 : system == 2 ? 6 : 10;
      return this.$store.state.danmakuSystem;
    }
  },
  methods: {
    changeQualitySwitcher(type){
      if(type === "sd"){
        this.sdShow = false
        this.hdShow = true
      } else {
        this.sdShow = true
        this.hdShow = false
      }
    },
    // 获取直播详情
    getRoomInfo() {
      getRoomInfo({
        uid: this.query.uid
      })
        .then(res => {
          this.qsVid = res.data.vid;
          setTimeout(res1 => {
            this.$store.dispatch("joinGroup", this.query.uid);
          }, 500);
          let info = res.data.info;
          this.sdVideo = info.pull
          this.hdVideo = info.pull_tc
          if (
            info.pull_tc &&
            info.starttime - info.servertime > 0 &&
            info.starttime > 0
          ) {
            this.TcPlayerUrlLoding = false;
            this.urlPlayer = info.pull_tc;
            this.counttDown = info.starttime - info.servertime;
            // 先卸载定时器从新加载定时器
            clearInterval(this.timeInterval);
            this.Iime();
            // this.counttDown=10
            return;
          } else if (info.islive != 1) {
            this.TcPlayerUrlLoding = false;
            this.counttDown = false;
            return (this.UpSowing = true); //主播未开播
          } else {
            this.TcPlayerUrlLoding = false;
            this.counttDown = false;
            this.initTcPlayer(info.pull_tc); //已开播
            this.initTcSdPlayer(info.pull); //已开播
            return;
          }
        })
        .catch(res => {});
    },
    eventAdd(e) {
      window.addEventListener("keydown", e => {
        if (e.key == 'F5') {
          window.location.reload(true);
        }
      });
    },
    initTcPlayer(url) {
      if (url == "") return;
      // sdk引入有顺序
      new Promise((resolve, reject) => {
        let link = document.createElement("link");
        link.href = "/sdk/player/tcplayer.min.css";
        link.rel = "stylesheet";
        document.getElementsByTagName("head")[0].appendChild(link);

        // 创建script标签，引入外部文件
        let script2 = document.createElement("script");
        script2.type = "text/javascript";
        script2.src = "/sdk/player/TXLivePlayer-1.2.0.min.js";
        document.getElementsByTagName("head")[0].appendChild(script2);

        let script1 = document.createElement("script");
        script1.type = "text/javascript";
        script1.src = "/sdk/player/hls.min.0.13.2m.js";
        document.getElementsByTagName("head")[0].appendChild(script1);

        let script3 = document.createElement("script");
        script3.type = "text/javascript";
        script3.src = "/sdk/player/flv.min.1.6.2.js";
        document.getElementsByTagName("head")[0].appendChild(script3);
        script2.onload = function() {
          resolve(1);
        };
      }).then(data => {
        if (data == 1) {
          let script = document.createElement("script");
          script.type = "text/javascript";
          script.src = "/sdk/player/tcplayer.v4.5.3.js";
          document.getElementsByTagName("head")[0].appendChild(script);
          const video = document.createElement("video");
          video.setAttribute("id", "player-container-id");
          video.setAttribute("muted", true);
          video.setAttribute("playsinline", true);
          video.setAttribute("controls", true);
          video.setAttribute("webkit-playsinline", true);
          video.style.width = "100%";
          video.style.minHeight = "500px";
          // video.setAttribute('autoplay',true)
          document.getElementById("videoContain").appendChild(video);
          // 引入成功
          let _this = this;
          script.onload = function() {
            tcPlayer = TCPlayer("player-container-id", {
              autoplay: true,
              width: "1098", //播放器宽度
            });
            tcPlayer.src(url);
            // 音量改變時
            tcPlayer.on("volumechange", function() {
              let muted = tcPlayer.muted();
              let valume = tcPlayer.volume();
              if (muted || valume == 0) _this.showUnmute = true;
              else {
                _this.showUnmute = false;
              }
            });
            tcPlayer.on("webrtcevent", event => {
              if (event.data.code == 1010) {
                tcPlayer.play();
              }
            });
            tcPlayer.on("canplay", canplay => {
              tcPlayer.play();
            });
          };

          // 引入失败
          script.onerror = function() {
          };
        }
      });
    },

    initTcSdPlayer(url) {
      if (url == "") return;
      // sdk引入有顺序
      new Promise((resolve, reject) => {
        let link = document.createElement("link");
        link.href = "/sdk/player/tcplayer.min.css";
        link.rel = "stylesheet";
        document.getElementsByTagName("head")[0].appendChild(link);

        // 创建script标签，引入外部文件
        let script2 = document.createElement("script");
        script2.type = "text/javascript";
        script2.src = "/sdk/player/TXLivePlayer-1.2.0.min.js";
        document.getElementsByTagName("head")[0].appendChild(script2);

        let script1 = document.createElement("script");
        script1.type = "text/javascript";
        script1.src = "/sdk/player/hls.min.0.13.2m.js";
        document.getElementsByTagName("head")[0].appendChild(script1);

        let script3 = document.createElement("script");
        script3.type = "text/javascript";
        script3.src = "/sdk/player/flv.min.1.6.2.js";
        document.getElementsByTagName("head")[0].appendChild(script3);
        script2.onload = function() {
          resolve(1);
        };
      }).then(data => {
        if (data == 1) {
          let script = document.createElement("script");
          script.type = "text/javascript";
          script.src = "/sdk/player/tcplayer.v4.5.3.js";
          document.getElementsByTagName("head")[0].appendChild(script);
          const video = document.createElement("video");
          video.setAttribute("id", "sd-player-container-id");
          video.setAttribute("muted", true);
          video.setAttribute("playsinline", true);
          video.setAttribute("controls", true);
          video.setAttribute("webkit-playsinline", true);
          video.style.width = "100%";
          video.style.minHeight = "500px";
          // video.setAttribute('autoplay',true)
          document.getElementById("videoContainSd").appendChild(video);
          // 引入成功
          let _this = this;
          script.onload = function() {
            tcPlayer = TCPlayer("sd-player-container-id", {
              autoplay: true,
              width: "1098", //播放器宽度
            });
            tcPlayer.src(url);
            // 音量改變時
            tcPlayer.on("volumechange", function() {
              let muted = tcPlayer.muted();
              let valume = tcPlayer.volume();
              if (muted || valume == 0) _this.showUnmute = true;
              else {
                _this.showUnmute = false;
              }
            });
            tcPlayer.on("webrtcevent", event => {
              if (event.data.code == 1010) {
                tcPlayer.play();
              }
            });
            tcPlayer.on("canplay", canplay => {
              tcPlayer.play();
            });
          };

          // 引入失败
          script.onerror = function() {
          };
        }
      });
    }, 

    // 解除靜音
    unmute() {
      tcPlayer.muted(false);
      tcPlayer.volume(1);
      clearInterval(this.timer);
    },
    Iime() {
      this.timeInterval = setInterval(() => {
        if (this.counttDown > 0) {
          this.counttDown -= 1;
        } else if (this.counttDown === 0) {
          //倒计时结束隐藏倒计时并拉流直播，结束定时器
          this.counttDown = 0;
          this.initTcPlayer(this.urlPlayer);
          clearInterval(this.timeInterval);
        }
      }, 1000);
    }
  },
  destroyed() {
    // clearTimeout(this.Iime)
    // clearInterval(this.timeInterval)
  }
};
</script>
<style lang="scss" scoped>
.danmu-container {
  position: absolute;
  height: 112px;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 99;
}
.tencent_player_container {
  position: relative;
  min-height: 500px;
  background: #14092a;
  .video_bottom_logo {
    z-index: 99;
    position: absolute;
    left: 20px;
    bottom: 20px;
    width: 120px;
  }
  .layout-anchor-nostart-content {
    padding-top: 24%;
  }
  .mute_btn {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 50px;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 4;
    width: 184px;
    height: 62px;
    border-radius: 4px;
    cursor: pointer;
    background: #ff5d23;
    background-size: 100% 100%;
    .mute_btn_text {
      display: block;
      font-size: 16px;
      text-align: center;
      color: #fff;
      margin-left: 2px;
    }
    .mute_btn_icon {
      width: 22px;
      height: 22px;
      display: block;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAKKADAAQAAAABAAAAKAAAAAB65masAAAERUlEQVRYCeWYS4hOYRjHzQwjuUzuFu4LCyFZSGLELLAQEcrOQqNZEAtlQ7MSK+XSFCtCuZekXLJAyYLcipIm5d5Mxv0+fs/nPMfzPed857zHzIq3/vM+l//zvP/vO+d9z/mmR4//aXR2dk4HN8BH0AJquv3z03Qg6F20MTVLwWdgx/qifTL5dF4HfoA20JBJNkm4jVEdU9k4ZWhdN2ndatrLZcoVCWeLqfHm5a6rMh3oftitUFEkvGqwx/G92+0C+7HCFbdKQiT5WnDU8cSVjXHPxLtXoHyZNM8VCeesEaFmc1R/RwPMmQLJy717CMw1FzLfpCBTJPkFQHesbKom7YodJBDeDKDjO8Ya7ZE6QxgE5KhYC2pAiMgOeMttQ/xQgbPh2vETZ5XtFdskGsBrwz6CHSKyLm4SGdQFCRQ63G1mTTHlfp9S1pOAHMyvgB9BIsua/V40WKDUsugmt7A8iarivjiLHcG6hUVSnCqQ+HwgD4Kh8eKRQewgsGN1zCEqRXbIzTvKoFbI+Jn3pDaElxBIbC7QIbdS2a7FrwP2Fruv/WRhL3B0nHQG3FyRcG4DHaVjBmeNBqL5E/Mc2x5/g+PUl/IEgwVKAfxMkeTtEaQCexE/D+x4hjNYRWLLXhDhOnZVEjhGiyrNdAgVWRIofaiRU+GArh7N2+0axE6a/O1SjoD/BnMFRguGiDznBPRkvQdGxBvsnsrB3mhy8gCoS7sHx2pB3kyDPJGJXtSsNCLEnKPrYPvDe2q1Jv9mrqqqek/dQnDV1PfBPsNiDeRbTVxNy5XYJE0wPze2mIO7JFA65IkUjh3wn+J3mNgIY7cbW8whaQL/nOKOXcktKpI+70yvn8b+amwxa9MEOk6YGyqSSy+bwj5NnpgV/LO9vdsEyiKBIocZQWJagUNcrk0+zTcXXM2nbHOx7/gXEfDQxROuiKReNo4cMbMigm6cReQvkV9C/DT4Aa5HHJkmG1vM53LM1IOQIS+oy1yDhAtnMwh5VZMnzj7bAH8n0PGilMOTHz/XNJozy+G51jb1Nnl5WQh6C4JX9sMe/zHQ8ecnK5Fh4Dj4qtmceasXpj51+jYTJNLU+UO6UXPxTPPeYCwYZzAe+wTwYy+BxCYjpgKFv1uaM2c+cSKOHO46PmD4HR3rTBiQ5TZo0WozH8Mu+zcJvhVoXxYyRVJn34L2J0SEBGjSDPyQXdlf67FTBUqeXIjIdngjtV/hmeImIJvFjps4wyMRFQVG+TyR9tFXWF+pADHLwRerEPsRkPs1U2CIyL9T5aoQMg+8BXa8wHlpAvE96MqzLnf8+uVrCvsImeYEGW0ls6JAWQxG2uW+a4UkjgmbzLN5bN2EMxM8zuOm5eWxSNy/T35I43YpxjcxAtwqfWflfw6FNKakL9gB5PfxhJCawhwaDwAXgA7Z6bn/AM1bqPDLaVZDBEm/FWAiOM8lvJbF/ydyvwBeczm56psw7AAAAABJRU5ErkJggg==);
      background-size: 100% 100%;
    }
  }
}
::v-deep.vjs-playback-rate{
  display: none;
}

.button-container {
  position: absolute;
  z-index: 999;
  button {
    padding: 0 10px;
    -webkit-appearance: none;
    background: #006eff;
    border: 0;
    color: #fff;
    height: 30px;
    min-width: 24px;
    font-size: 15px;
    margin-right: 5px;
    z-index: 99999999;
    border-radius: 5px;
    opacity: 0;
    cursor: pointer;
    &:nth-child(1){
      background: #006eff;
    }
    &:nth-child(2){
      background: #ff0000;
    }
  }
}
.button-container:hover button{
  opacity: 1;
}
</style>
