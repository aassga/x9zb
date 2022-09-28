<!-- 大转盘 -->
<template>
	<view class="active">
		<scroll-view scroll-y="true" style="height: 100vh;width: 100%;">
			<view class="active-content">
				<view class="header flex">
					<text>
						<a :href="system.CustomerService">
							在线客服
						</a>
					</text>
					 
					<image src="../../static/images/activity/logo.png" mode=""></image>
					<text @click="showDetail= true">活动详情</text>
				</view>
				<!-- <image class="title" src="/static/images/activity/title.png" mode=""></image> -->
				<view class="active-pan">
					<view class="active-pan-tips">剩余<text>{{indexNum}}</text>次机会</view>
					<my-turntable-draw ref="raffleWheel" :num="indexNum" :width="boxData.width" :height="boxData.height"
						:prizeList="prizeList" :targetIndex="targetIndex" @befoterClick="befoterClick"
						@afterClick="afterClick">
					</my-turntable-draw>
				</view>
				<view class="active-nav">
					<view class="active-head flex">
						<view class="" v-for="(item,index) in numericalList" @click="getIndex(index)"
							:class="index==numericalIndex?'numerical-active':''">
							{{item}}
						</view>
					</view>
					<view class="" style="padding: 60rpx 70rpx;"  v-if="numericalIndex == 1">
						<scroll-view scroll-y="true" style="z-index: 99;width: 100%;height: 400rpx;">
							<view class="flex li" v-for="(item,index) in list" :key="index" style="padding-bottom: 20rpx;">
								<view class="name">{{item.user_nickname}}</view>
								<view class="border"></view>
								<view class="text">抽中</view>
								<view class="gift">获得{{item.num == 0?'':item.num}}{{item.gift_name}}</view>
								<!-- {{ data }} -->
							</view>
						</scroll-view>
					</view>
					<!-- <view class="" >
						
					</view> -->
					<Msgbar ref="msgbar" height="400rpx" width="100%" :list="list"
						style="z-index: 99;padding: 60rpx 70rpx" v-else>
						<template #item="{ data }">
							<view class="flex li">
								<view class="name">{{data.user_nickname}}</view>
								<view class="border"></view>
								<view class="text">抽中</view>
								<view class="gift">获得{{data.num == 0?'':data.num}}{{data.gift_name}}</view>
								<!-- {{ data }} -->
							</view>
						</template>
					</Msgbar>
				</view>
			</view>

		</scroll-view>
		<!-- 详情 -->
		<u-mask :show="showDetail" @click="showDetail = false">
			<view class="detail-mask">
				<view class="detail-content" v-html="article.post_content">
					<!-- <u-parse :html="article.post_content"></u-parse> -->
				</view>
			</view>
		</u-mask>
		<!-- 中奖 -->
		<u-mask :show="showPup" @click="showPup = false">
			<view class="pup-mask">
				<view class="pup-content flex-center">
					<image :src="selectAll.gift_img" mode="aspectFill"></image>
					<text>{{selectAll.num == 0?'':'获得'+selectAll.num}}{{selectAll.gift_name}}</text>
					<view>立即领取</view>
				</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	import myTurntableDraw from '@/compontent/my-turntable-draw/my-turntable-draw.vue'
	import Msgbar from '@/compontent/silencc-msgbar/index.vue'
	export default {
		components: {
			Msgbar,
			myTurntableDraw
		},
		data() {
			return {
				num:null,
				list: [],
				showPup:false,
				showDetail:false,
				// 大转盘参数
				boxData: {
					width: 266,
					height: 338
				},
				selectAll:{},
				article:{},//详情
				prizeList: [],
				// 中奖下标
				targetIndex: 0,
				// 需多次获取
				indexNum: 10,
				information:{
					token:''
				},
				// end 大转盘参数
				numericalIndex: 0,
				numericalList: ['中奖名单', '我的奖品']
			}
		},
		watch:{
			// numericalIndex(e){
				
			// }
		},
		computed: {
			system(){
				return this.$store.state.system
			}
		},
		onLoad(option) {
			// 1.双端进入
			if(option.token){
				let information = {
					token:option.token
				}
				this.information = information
				this.$common.set('information',information)
			}
			
			setTimeout(() => {
				this.getNames()
			}, 1000)
			this.$u.get('api/Activity_Config/turntable', {}).then(res => {
				this.prizeList = res.list
				this.indexNum = res.num
				// console.log(res);
			})
			this.getDetail()
			this.getTurntableList(0)
		},
		methods: {
			getIndex(e){
				// alert(this.information.token)
				if(e == 1 && !this.information.token) {
					this.numericalIndex = 0
					this.$u.toast('请登录后重试')
				}else {
					
				    this.getTurntableList(e)
				}
			},
			
			// 获取活动详情
			getDetail(){
				// 默认写死50
				this.$u.get('api/Portal_post/getList',{id:1}).then(res=>{
					res.forEach(item=>{
						if(item.id == 35){
							this.article = item
						}
					})
					
				})
			},
			
			
			befoterClick(data) {
				
				if (data.type == 'start') {
					this.$u.post('api/Activity/open_turntable', {}).then(res => {
						// console.log('开始抽奖')
						// 获取中奖单位下标
						let _n = null
						this.indexNum--
						let obj = this.prizeList.forEach((item,index) => {
							if(item.id == res.id){
								_n = index
								this.selectAll = item
								// console.log('选中商品项：' )
								// console.log(item);
							}
						})
						
						// console.log('选中商品名：' + this.prizeList[_n].gift_name)
						this.targetIndex = _n
						data.callback && data.callback(_n)
					})

					// this.$refs.raffleWheel.rotoreAction(_n)
				}

			},
			// 添加名单
			getNames() {

			},
			// 转盘结束
			afterClick(data) {
				if (data.type == 'end') {
					this.showPup = true
					console.log(data.content.count)
					data.callback && data.callback()
					// 多次执行
					// this.toBefoterClick()
				}
			},
			// 多次执行
			toBefoterClick(n) {
				console.log('剩余次数：' + this.indexNum)
				if (this.indexNum <= 0) {
					return false
				}
				setTimeout(() => {
					this.indexNum--
					this.$refs.raffleWheel.handleAction()
				}, 100)
			},
			// 中将记录
			getTurntableList(e) {
				this.$u.get('api/Activity_Config/turntable_list', {type:e}).then(res => {
					this.list = res
				})
			}
		}
	}
</script>

<style lang="scss">
	.detail-mask {
		width: 642rpx;
		height: 856rpx;
		margin: 0 auto;
		overflow: hidden;
		margin-top: 200rpx;
		background: url(/static/images/activity/detail.png)center top / 100% 100% no-repeat;
		.detail-content {
			// width: 100%;
			height: 554rpx;
			padding: 32rpx;
			border-radius: 20rpx;
			margin: 200rpx 64rpx 44rpx;
			background-color: white;
			box-shadow: 0px 6rpx 12rpx rgba(0, 0, 0, 0.16);
		}
	}
	.pup-mask {
		width: 642rpx;
		height: 856rpx;
		margin: 0 auto;
		overflow: hidden;
		margin-top: 200rpx;
		background: url(/static/images/activity/pup.png)center top / 100% 100% no-repeat;
		.pup-content {
			margin: 330rpx 200rpx 0;
			image {
				height: 240rpx;
			}
			text {
				color: #FFF1E0;
				margin-top: 32rpx;
			}
			view {
				width: 100%;
				height: 86rpx;
				color: #FFF1E0;
				text-align: center;
				margin-top: 50rpx;
				line-height: 86rpx;
				border-radius: 44rpx;
				background: linear-gradient(180deg, #F25D5F 0%, #FD3436 100%);
				box-shadow: 0px 6px 12px rgba(218, 38, 40, 0.39);
			}
		}
	}
	
	.li {
		.border {
			flex: 1;
			margin: 0 14rpx;
			max-width: 200rpx;
			border-bottom: 2rpx dashed #ccc;
		}

		.text {
			margin-right: 6rpx;
		}

		.gift {
			width: 200rpx;
			color: #E05B32;
		}
	}

	.header {
		font-size: 28rpx;
		padding: 30rpx 0;

		text {
			color: #87390E;
			padding: 12rpx 32rpx;
			background-color: #FFDFAB;
			border-radius: 120rpx;
		}

		image {
			width: 212rpx;
			height: 82rpx;
		}
	}

	.active-pan {
		width: 532rpx;
		height: 676rpx;
		margin: 0 auto;
		position: relative;
		// margin-top: 248rpx;
		background: url(../../static/images/activity/icon3.png)center top / 100% 100% no-repeat;
		.active-pan-tips {
			color: #fff;
			position: absolute;
			bottom: 36rpx;
			left: 0;
			right: 0;
			text-align: center;
			text {
				color: #FFDFAB;
			}
		}
	}

	.active-nav {
		width: 640rpx;
		height: 620rpx;
		margin: 0 auto;
		overflow: hidden;
		background: url(../../static/images/activity/icon2.png)center top / 100% 100% no-repeat;

		.active-head {
			font-size: 28rpx;
			margin: 10rpx 126rpx;
			border: 2rpx solid #FEDBE1;
			border-radius: 8rpx;

			view {
				color: #fff;
				font-weight: bold;
				padding: 14rpx 40rpx;
			}

			.numerical-active {
				color: #D4505A;
				background-color: #FEDBE1;
			}
		}
	}

	.active {
		min-height: 130vh;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
	}

	.active-content {
		// position: absolute;
		// top: 0;
		left: 0;
		right: 0;
		height: 100%;
		padding-bottom: 170px;
		overflow: hidden;
		background: url(../../static/images/activity/icon-bg2.png)center top / 100% 100% no-repeat;
		.title {
			width: 100%;
			height: 200rpx;
		}
	}
</style>
