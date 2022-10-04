<template>
    <div class="tencent_player_container">
        <div id="videoContain">
            <!-- <video id="player-container-id" preload="auto" playsinline webkit-playsinline></video> -->
        </div>
        <div class="mute_btn" @click="unmute()" v-if="showUnmute">
            <div class="mute_btn_icon"></div>
            <div class="mute_btn_text">点击取消静音</div>
        </div>
        <div class="layout-anchor-nostart-content" v-if="UpSowing">
            <div>
                <img src="../../static/images/live/live-none.png" style="width: 64px;height: 64px;margin: 0 auto;display: block;">
                <div style="font-size: 20px;text-align: center;color: #666;padding: 10px 0;margin-bottom: 40px;">
                    主播暂未开播
                </div>
            </div>
        </div>
        <div class="layout-anchor-nostart-content" v-if="TcPlayerUrlLoding">
            <div>
                <img src="../../static/images/live/giphy.gif" style="width: 250px;height: 100px;margin: 0 auto;display: block;">
                <div style="font-size: 20px;text-align: center;color: #666;padding: 10px 0;margin-bottom: 40px;">
                    加载中。。。
                </div>
            </div>
        </div>
    </div>
</template>
<!--播放器脚本文件-->

<script>
let tcPlayer = null;

// import {
// 		getRoomInfo,
// 	} from '../../src/api/user.js'
export default {
    name: 'TcVideoPlayer',
    props: {
        options: {
            type: Object,
            default: () => ({}),
        }
    },
    data() {
        return {
            showUnmute: false,
            query:{},
            UpSowing:false,//主播是否上播
            TcPlayerUrlLoding:true,
        }
    },
    mounted() {	
        let query = this.$route.query

        console.log(query)
        console.log(query.id)
         this.getLiveDetail(query.id)
    },  
    // created(){
    //     this.initTcPlayer(this.url)
    // },      
    methods: {
        // 获取直播详情
        getLiveDetail(id) {
            this.$u.post('/api/Live_streaming/getRoomInfo', {
                uid: id,
                channel_code:this.channel_code?this.channel_code:""
            }).then(res => {
                 let info=res.info
                //  console.log("搬砖ing=================================================")
                //  this.initTcPlayer(info.pull_tc) //已开播

                if(info.pull_tc&&((info.starttime)-(info.servertime)>0)&&(info.starttime)>0 ){
                    console.log("倒计时钟")
                    this.TcPlayerUrlLoding=false
                  return  
                }else if (info.islive!=1) {
                    console.log("主播未开播")
                    this.TcPlayerUrlLoding=false
					return this.UpSowing=true //主播未开播

                }else{
                    console.log("搬砖ing")
                    this.TcPlayerUrlLoding=false
                    this.initTcPlayer(info.pull_tc) //已开播
                    return
                }
            })
        },
        initTcPlayer(url) {
            if (url == "") return
            let p = document.getElementById("videoContain");
            const video = document.createElement("video")    
            video.setAttribute("id", "player-container-id")
            video.setAttribute('playsinline',true)
            video.setAttribute('webkit-playsinline',true)

            video.setAttribute("x5-video-player-type", "h5");
            video.setAttribute("x5-video-player-fullscreen", true);
            video.setAttribute("show-center-play-btn", false);
            video.setAttribute("x5-playsinline", '');
            video.setAttribute("x5-video-orientation", 'portrait');
            video.style.width = "100%";
            video.style.minHeight = "100%";
            // video.setAttribute('autoplay',true)
            p.appendChild(video)
            let _this = this;
            tcPlayer = TCPlayer("player-container-id", {
                autoplay: true, 
                // width: "10", //播放器宽度
                // height: "720", //播放器高度
            });
            tcPlayer.src(url);
            // 音量改變時
            tcPlayer.on('volumechange', function() {
                let muted = tcPlayer.muted();
                let valume = tcPlayer.volume();
                console.log("muted:", muted, "valume:", valume);
                if (muted || valume == 0)
                    _this.showUnmute = true;
                else {
                    _this.showUnmute = false;
                }
            });
        },
        // 解除靜音
        unmute() {
            tcPlayer.muted(false);
            tcPlayer.volume(1);
        },
    }
};
</script>
<style lang="scss" scoped>
.tencent_player_container {
    position: relative;
       min-height: 500px;
        background: #14092a;
    .layout-anchor-nostart-content{
        padding-top: 6%;
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
            background-size: 100% 100%
        }
    }
}
</style>
