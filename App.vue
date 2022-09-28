<script>
	import {
		getQueryString
	} from '@/common/Qs'
	export default {
		onLaunch: function() {
			let _this = this
			console.log("小九直播");
			setTimeout(res => {
				this.getSystem()
				let information = this.$common.get('information') || {}
				let im = this.$common.get('imTouristAccount') || {}

				if (JSON.stringify(information) !== '{}') {
					//_this.$store.dispatch('getInfo', _this.$u)

				} else if (JSON.stringify(information) == '{}' && JSON.stringify(im) == '{}') {
					this.$u.get('/api/Universal/imTouristAccount').then(res => {
						this.$common.set('imTouristAccount', res)
					})
				}
				// uni.getStorage({
				//     key: 'information',
				//     success: function (res) {

				//     }
				// });

			}, 100)
			// setTimeout(res => {
				// _this.$store.dispatch('loginTim', '')
			// }, 500)
			// let self = this
			// uni.getStorage({
			// 	key:'information',
			// 	success: function (res) {
			// 		if(res.data != null && res.data){

			// 		}
			// 	}
			// })
			// setTimeout(res => {
			// 	this.getList()
			// }, 1000)
			
			uni.getSystemInfo({
				success(e){
					// 是否为移动设备
					let isMobile = /iOS|Android/i.test(e.system);
					if(!isMobile){
						/**
						 * 窗口宽度大于768px且不在PC页面且不在移动设备时跳转至 PC.html 页面
						 * 这里为什么不做窗口尺寸的大小监听，
						 * 因为正常用户的设备不可能尺寸一会大一会小（你当用户的手机是变形金刚啊）。
						* */						
						if(e.windowWidth > 768 && !window.top.isPC){
							let basic = '/static/html/pc.html';
							// 若你的项目未设置根目录（默认为 / 时），则使用下方代码
							// let basic = '/static/html/pc.html';
							
							let src = basic + window.location.hash;
							window.location.replace(src);
						}
					}
				}
			});
			
		},
		onShow: function() {},
		onHide: function() {},
		methods: {
			// 获取系统配置
			getSystem() {
				const channel = getQueryString().channel_code || localStorage.getItem('channel');
				console.log('获取url参数')
				console.log(getQueryString())
				console.log(channel)
				this.$u.get(channel ? `/api/universal/getHot?channel_code=${channel}` : '/api/universal/getHot', {}).then(res => {
					// this.$db.set('system'.res.data)
					res.announcement1 = []
					res.announcement1.push(res.announcement)
					this.$store.state.system = res
					// console.log(res);
				})
			},
			getList() {
				let self = this
				// 监听事件
				self.tim.on(self.TIM.EVENT.SDK_READY, function(event) {
					// 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
					console.log("SDK_READY ===================");
				});

				self.tim.on(self.TIM.EVENT.ERROR, function(event) {
					// 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
					console.error("ERROR ===================", event);
				});

				self.tim.on(self.TIM.EVENT.KICKED_OUT, function(event) {
					// 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
					console.error("KICKED_OUT ===================", event);
				});
				self.tim.on(self.TIM.EVENT.CONVERSATION_LIST_UPDATED, function(event) {
					console.error("KICKED_OUT ===================", event);
					self.$store.commit('getSystemNotice', JSON.parse(JSON.stringify(event.data[0].lastMessage)))
				});

				self.tim.on(self.TIM.EVENT.NET_STATE_CHANGE, function(event) {
					// 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
					console.error("NET_STATE_CHANGE ===================", event);
				});
				self.tim.on(self.TIM.EVENT.MESSAGE_RECEIVED, function(event) {
					// 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
					// console.error('查看触发次数');
					// self.$store.dispatch('getabc',1)
					console.error("NET_STATE_CHANGE ===================", event);
					self.$store.commit('getHistory', JSON.parse(JSON.stringify(event.data)))
				}); //喇叭消息
			}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import 'uview-ui/theme.scss';
	@import 'static/css/common.css';

	.todownload-box {
		width: 600rpx;
		height: 300rpx;
		font-size: 30rpx;
		background-color: #fff;
		padding: 20rpx;
		border-radius: 30rpx;
		text-align: center;

		.todownload-title {
			margin-top: 40rpx;
		}

		.todownload-subtitle {
			margin: 20px 0;
		}

		.todownload-btn {
			color: #fff;
			width: 200rpx;
			margin: 0 auto;
			padding: 7px 8px;
			border-radius: 3px;
			background: linear-gradient(90deg, #FFDFAB 0%, #E3AC72 100%);
		}
	}

	body,
	page {
		max-width: 600px !important;
		margin: auto;
		height: 100%;
	}
</style>
