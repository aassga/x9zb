<template>
	<div id="app">
		<router-view />
	</div>
</template>


<script>
	import {
		getQiniuToken
	} from './api/common.js'
	import {
		getHot
	} from './api/user.js'
	import store from './store/index.js'
	export default {
		name: "App",
		provide() {
			return {
				reload: this.reload
			}
		},
		mounted() {
			document.oncontextmenu = function () {
				return false
			}
			// window.onkeydown = window.onkeyup = window.onkeypress = function (event) {
			// 	if (event.keyCode == 123) {
			// 		event.preventDefault();
			// 		return false
			// 	}
			// }
			// console.log(process.env.NODE_ENV)
		    // if(process.env.NODE_ENV!=='dev'){
		    //   setInterval(()=>{
		    //     debugger;
		    //   },50)
		    // }
			// window.addEventListener('resize',function(){
			// 	let screenWidth = document.body.offsetWidth;
			// 	// if (screenWidth <= 500) {
			// 	// 	location.href = 'https://m.longya.live'
			// 	// }
			// })
			window.callback = function(res){
			    // res（用户主动关闭验证码）= {ret: 2, ticket: null}
			    // res（验证成功） = {ret: 0, ticket: "String", randstr: "String"}
			    if(res.ret === 0){
			        alert(res.ticket)   // 票据
			    }
			}
			// 获取即时比分的红黄牌设置
			let gameSeting = localStorage.getItem('gameSeting') 
			if(gameSeting == null){
				store.state.game = {
					red: true,
					voice: true,
					yellow: true
				}
			}else {
				store.state.game = JSON.parse(gameSeting)
			}
			// 即时比分的亚/太/欧
			let immediately = localStorage.getItem('immediately') || JSON.stringify({value1:true,value2:true,value3:false,value4:false})
			store.state.immediately = JSON.parse(immediately)
			
			const self = this;
			this.getSystem()
			let userid = '';
			const userInfo = JSON.parse(localStorage.getItem("userInfo"))
			if (!userInfo && !localStorage.getItem("userid")) {
				userid = 10000000 + Math.random().toString().slice(-6);
				localStorage.setItem("userid", userid);
			}
			return;//======
			// 监听事件
			self.tim.on(self.TIM.EVENT.SDK_READY, function(event) {
				// 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
			});

			self.tim.on(self.TIM.EVENT.ERROR, function(event) {
				// 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
			});

			self.tim.on(self.TIM.EVENT.KICKED_OUT, function(event) {
				// 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
			});
			self.tim.on(self.TIM.EVENT.CONVERSATION_LIST_UPDATED, function(event){//监听普通消息
			
				store.commit('updateConversationList', JSON.parse(JSON.stringify(event.data)))
			});

			self.tim.on(self.TIM.EVENT.NET_STATE_CHANGE, function(event) {
				// 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
			});

			self.tim.on(self.TIM.EVENT.MESSAGE_RECEIVED, function(event){//喇叭
			
				store.commit('getSystemNotice', JSON.parse(JSON.stringify(event.data)))
			}); //喇叭消息
			let info = localStorage.getItem('userInfo') || {}
			let im = localStorage.getItem('imTouristAccount') || {}
			if(JSON.stringify(info) == '{}' && JSON.stringify(im) == '{}'){//如何用户为空，获取腾讯im游客账号
				this.$store.dispatch('getimTouristAccount', '')
			}
			
			setTimeout(res=>{
				this.$store.dispatch('loginTim', '')
				this.$store.dispatch('updateMyProfile','')
				
			},500)
			if (JSON.stringify(info) == '{}') return
			// 获取用户信息
			this.$store.dispatch('getUserInfo', '')
			this.$store.dispatch('user/SET_QINIU_TOKEN')
			
			getQiniuToken().then(res => {
				store.state.user.QiniuToken = res.data

			}).catch(res => {})
		},
		watch: {
			'$store.state.infos'(e) {
				store.dispatch('updateMyProfile', e)
			}
		},
		methods: {
			isMobile() {
				return screen.width < 1080?true:false
			},
			reload() {

			},
			init() {
				//发起websocket连接
				// let config = {
				// 	a:123
				// }
				// this.$WebSocket.WebSocketFn((res,config) => {
				// 	if (!res) return;
				// 	this.retundata();
				// 	this.onclose();
				// });
			},
			retundata() {
				//监听接受到websocket的信息
				this.$WebSocket.onmessage((res) => {
					this.$store.dispatch("WS_DATA_ACTIONS", res);
				});
			},
			onclose() {
				//监听长连接的一个断开
				this.$WebSocket.ws.onclose = () => {
					// this.$store.dispatch("setDeviceNum", "");
					// let info = this.$store.state.Counter.websocketinfo;
					this.init();
				};
			},

			// 获取配置
			getSystem() {
				const channel = getQueryString().channel_code;
				getHot({
					channel_code: channel
				}).then(res => {
					// this.websocket
					this.$store.state.system = res.data
					// this.init();
				}).catch(res => {})
			},
			getSystemNotice(event) {
				store.commit('getSystemNotice', event.data)
			},
			// getmessageList(event) {
				
			// }
		}
	};
</script>
<style type="">
	body{
		/* height: 100vh !important;
		overflow-y: scroll; */
	}
	@import url("~@/styles/index.css");
	@import url("~@/styles/style.css");
	::-moz-selection{
	    background:#933;
	    color: #FFF
	}
	::selection{
	    background:#933/*#16364b*/;
	    color: #FFF
	}
	::-webkit-selection{
	    background:#933; 
	    color: #FFF
	}
	.el-loading-spinner .path{
		display: none;
	}
	.el-loading-spinner .circular{
		width: 100px !important;
		height: 100px !important;;
		animation: none !important;
		background: url(assets/images/loding.gif)center top / 100% 100%;
	}
	img {
		object-fit: fill;
	}
</style>
