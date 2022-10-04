<!-- 等级 -->
<template>
	<view class="grade" v-if="guardList[current]">
		<downloadHead></downloadHead>
		<view class="grade-back" @click="$u.route({type:'back'})">
			<image src="/static/images/live/grade-left.png" mode=""></image>
			<text>成为贵族，万众瞩目</text>
		</view>
		<view class="">
			<u-tabs :list="guardList" bg-color="" inactive-color="#B3B4B7" font-size="32" active-color="#E3AC72" :is-scroll="false" :current="current" @change="change"></u-tabs>
		</view>
		<image :src="guardList[current].icon" class="grade-logo" mode=""></image>
		<view class="grade-list flex-wrap">
			<view class="grade-list-li">
				<image src="/static/images/live/grade-0.png" mode=""></image>
				<view class="">
					专属坐骑
				</view>
				<text>{{guardList[current].swf_name}}高级入场特效</text>
			</view>
			<view class="grade-list-li">
				<image src="/static/images/live/grade-1.png" mode=""></image>
				<view class="">
					超值优惠
				</view>
				<text>惊喜礼遇</text>
			</view>
			<view class="grade-list-li">
				<image src="/static/images/live/grade-2.png" mode=""></image>
				<view class="">
					贵族标识
				</view>
				<text>专属身份 \n 皇帝勋章</text>
			</view>
			<view class="grade-list-li">
				<image src="/static/images/live/grade-3.png" mode=""></image>
				<view class="">
					发言特权
				</view>
				<text>尊享{{current+1}}级气泡{{guardList[current].gorgeous_num}}个 \n 解锁5级粉丝弹幕</text>
			</view>
			<view class="grade-list-li">
				<image src="/static/images/live/grade-4.png" mode=""></image>
				<view class="">贵宾席</view>
				<text>上座直播间贵宾席 \n 彰显高贵</text>
			</view>
			<view class="grade-list-li">
				<image src="/static/images/live/grade-5.png" mode=""></image>
				<view class="">开通通知</view>
				<text>开通续费时 \n 全平台广播</text>
			</view>
			<view class="grade-list-li" v-if="current == 4">
				<image src="/static/images/live/grade-6.png" mode=""></image>
				<view class="">喇叭</view>
				<text>10个免费发送广告弹幕 \n 范围:所有直播间</text>
			</view>
		</view>
		
		
		<view class="grade-detail flex">
			<view class="grade-detail-left">
				<view>开通{{guardList[current].name}}：<text>{{guardList[current].coin}}</text>钻石/月</view>
				<view style="margin-top: 16rpx;">续费{{guardList[current].name}}：<text>{{guardList[current].renew_coin}}</text>钻石/月</view>
				<view class="flex-start" style="margin-top: 28rpx;"><image src="../../static/images/live/live-8.png" mode=""></image><view>钻石余额：{{infos.balance}}</view></view>
				<text style="margin-top: 14rpx;display: block;">由主播“{{name}}”为你开通</text>
			</view>
			<view class="grade-detail-right flex-wrap">
				<view class="grade-detail-right-btn" @click="show = true">{{infos.is_guard == 1 && infos.guard.name == guardList[current].name?'立即续费':'立即开通'}}</view>
				<view style="margin-top: 20rpx;text-align: left;" v-if="infos.is_guard == 1">您的贵族为：{{infos.guard.name}}</view>
				<view style="margin-top: 12rpx;text-align: left;" v-if="infos.is_guard == 1">截止日期：{{$common.timeStamp1(infos.guard.endtime)}}</view>
			</view>
		</view>
		<u-popup v-model="show" mode="center" border-radius="20" :closeable="true">
			<view class="todownload-box">
				<view class="close-btn">
					
				</view>
				<view class="todownload-title">赶紧去下载小九直播APP</view>
				<view class="todownload-subtitle">
					收获完整内容体验～
				</view>
				<view class="todownload-btn" @click="$navigateTo('../download')">立即下载</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				tabList :[{
					name: '皇帝'
				}, {
					name: '公爵'
				}, {
					name: '侯爵'
				},
				{
					name: '子爵'
				},
				{
					name: '骑士'
				}
				],
				name:'',
				// goardList:[],
				current: 0,
				guardList:[
					// {
					// 	title:'专属坐骑',
					// 	text:'豪气元龙，君临天下高级入场特效'
					// },
					// {
					// 	title:'超值优惠',
					// 	text:'惊喜礼遇续费5.4折'
					// },
					// {
					// 	title:'贵族标识',
					// 	text:'专属身份 \n 皇帝勋章'
					// },
					// {
					// 	title:'发言特权',
					// 	text:'尊享5级气泡88个 \n 解锁5级粉丝弹幕'
					// },
					// {
					// 	title:'贵宾席',
					// 	text:'上座直播间贵宾席 \n 彰显高贵'
					// },
					// {
					// 	title:'开通通知',
					// 	text:'开通续费时 \n 全平台广播'
					// },
					// {
					// 	title:'喇叭',
					// 	text:'10个免费发送广告弹幕 \n 范围:所有直播间'
					// },
					
				]
			}
		},
		onLoad(option) {
			this.name = option.name
			this.getGuardList()
		},
		computed:{
			infos(){
				return this.$store.state.info
			}
		},
		methods:{
			change(e){
				this.current = e
			},
			// 贵族列表
			getGuardList(){
				this.$u.get('api/Guard/getList',{}).then(res=>{
					this.guardList = res.goard.reverse()
				})
			},
		}
	}
</script>

<style lang="scss">
	body,page {
		background: url(../../static/images/live/grade-bg.png)center top / 100% 1372rpx no-repeat;
	}
	.grade {
		overflow: hidden;
		min-height: 110vh;
	}
	.grade-back {
		height: 96rpx;
		padding: 0 24rpx;
		// position: fixed;
		// left: 0;
		// right: 0;
		// top: 112rpx;
		text {
			width: 100%;
			color: #fff;
			display: block;
			font-size: 32rpx;
			line-height: 96rpx;
			text-align: center;
		}
		image {
			position: absolute;
			width: 60rpx;
			height: 60rpx;
			left: 24rpx;
			top: 18rpx;
			
		}
		
	}
	.grade-logo {
		width: 248rpx;
		height: 248rpx;
		display: block;
		margin: 50rpx auto;
	}
	.grade-list {
		padding: 0 32rpx;
		&::after{
			content: '';
			flex: 1;
		}
		.grade-list-li {
			// flex: 1;
			margin-top: 24rpx;
			width: calc(100% / 3);
			text-align: center;
			align-self: flex-start;
			image{
				width: 48rpx;
				height: 48rpx;
			}
			view {
				color: #FFDFAB;
				font-size: 28rpx;
				padding: 16rpx 0 12rpx;
			}
			text{
				color: #959DB0;
				font-size: 24rpx;
				
			}
		}
	}
	.grade-detail {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 32rpx 24rpx 32rpx;
		background-color: white;
		border-radius: 20rpx 20rpx 0 0;
		.grade-detail-left {
			flex: 1;
			view{
				font-size: 28rpx;
				text {
					color: #FF7718;
				}
			}
			text{
				color: #666;
				font-size: 24rpx;
			}
			image {
				width: 26rpx;
				height: 32rpx;
				margin-right: 20rpx;
			}
		}
		.grade-detail-right {
			// flex: 1;
			width: 254rpx;
			view {
				width: 100%;
				color: #76809C;
				font-size: 24rpx;
				text-align: right;
			}
			.grade-detail-right-btn {
				color: #87390E;
				font-size: 28rpx;
				text-align: center;
				padding: 32rpx 44rpx;
				border-radius: 12rpx;
				background: linear-gradient(90deg, #FFDFAB 0%, #E3AC72 100%);
			}
		}
		
	}


</style>
