<!-- 搴曢儴-鎴戠殑 -->
<template>
	<view class="home">
		<downloadHead v-if="show1"></downloadHead>
		<image class="home-setting" @click="$navigateTo('./setting')" src="../../static/images/home/home-setting.png" mode=""></image>
		<view class="home-info flex">
			<view class="home-info-logo">
				<image class="" :src="info.avatar || '/static/images/home/userLogo.png'" mode="aspectFill"></image>
				<image class="set" src="/static/images/home/home-set.png" mode=""></image>
			</view>
			<view class="home-info-right" v-if="JSON.stringify(info) == '{}'"  @click="$navigateTo('../login/index')">
				<view class="not-login">登录/注册</view>
				<text class="not-login-tips">登录后获取更多精彩内容~</text>
			</view>
			
			<view class="home-info-right" v-else>
				<view class="home-info-right-name">
					{{info.user_nickname}}
				</view>
				<text class="home-info-right-text">{{info.signature}}</text>
				 <!-- <view class="home-info-right-grade">
					<view class="flex">
						<text>LV10</text>
						<text>LV11</text>
					</view>
					<u-line-progress :height="16" :percent="70" :show-percent="false" active-color="#E3AC72"></u-line-progress>
					<text>当前1560经验值，距离升级还有240经验值</text>
				</view> -->
			</view>
			<!-- {{}} -->
		</view>
		<view class="home-money flex" @click="show= true">
			<view class="home-money-left">
				<view class="home-money-top flex">
					<text>我的钻石</text>
					<!-- <view>充值</view> -->
				</view>
				<view class="home-money-bot flex-start">
					<image src="../../static/images/home/home-money.png" mode=""></image>
					<text>{{info.balance || 0}}个</text>
				</view>
			</view>
			<view class="" style="width: 2rpx;margin: 0 24rpx 0 32rpx;background-color: #4B4C53;height: 136rpx;">
				
			</view>
			<view class="home-money-left">
				<view class="home-money-top flex">
					<text>可提现钻石</text>
					<!-- <view style="background: linear-gradient(92deg, #FFDFAB 0%, #E3AC72 100%);color: #87390E;">提现</view> -->
				</view>
				<view class="home-money-bot flex-start">
					<image src="../../static/images/home/home-money.png" mode=""></image>
					<text>{{info.withdrawal_balance || 0}}个</text>
				</view>
			</view>
		</view>
		
		
		<view class="home-bar flex">
			<view class="home-bar-li" v-for="(item,index) in homeBar"  @click="show= true">
				<image :src="'/static/images/home/home-bar'+index+'.png'" mode=""></image>
				<view>{{item}}</view>
			</view>
		</view>
		
		<view class="home-list">
			<view class="home-li flex" v-for="(item,index) in homeList"  @click="show= true">
				<image :src="'/static/images/home/home-li'+index+'.png'" mode=""></image>
				<text>{{item}}</text>
				<image src="../../static/images/home/home-right.png" mode=""></image>
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
				homeBar:['我的关注','我的预约','我的空间','我的消息'],
				homeList:['我的等级','我是主播','我是房管','活动中心','喇叭历史','在线客服','常见问题']
			}
		},
		computed:{
			info(){
				return this.$store.state.info
			},
			show1:{
				get() {
					return this.$store.state.show
				},
				set() {
					// this.$store.state.info.midMask = !this.$store.state.info.midMask
				}
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	.home {
		padding: 20rpx 32rpx;
		padding-bottom: 140rpx;
	}
	.home-setting {
		width: 40rpx;
		height: 36rpx;
	}
	.home-info {
		margin-top: 64rpx;
		.home-info-logo {
			width: 128rpx;
			height: 128rpx;
			position: relative;
			margin-right: 24rpx;
			align-self: flex-start;
			image{
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
			.set {
				width: 32rpx;
				height: 30rpx;
				position: absolute;
				bottom: 0;
				right: 0;
			}
			
		}
		.home-info-right {
			flex: 1;
			.not-login {
				width: 196rpx;
				color: #87390E;
				font-size: 32rpx;
				padding: 10rpx 0;
				font-weight: bold;
				text-align: center;
				border-radius: 50rpx;
				background: linear-gradient(88deg, #FFDFAB 0%, #E3AC72 100%);
			}
			.not-login-tips {
				color: #666;
				display: block;
				font-size: 24rpx;
				margin-top: 16rpx;
			}
		}
		.home-info-right-name {
			color: #000;
			font-size: 36rpx;
			font-weight: bold;
			margin-top: 22rpx;
			
		}
		.home-info-right-text {
			color: #666;
			font-size: 24rpx;
			margin-top: 24rpx;
		}
		.home-info-right-grade {
			margin-top: 24rpx;
			text {
				color: #333;
			}
			view {
				text{
					color: #E3AC72;
					font-size: 24rpx;
				}
			}
		}
	}
	.home-money {
		overflow: hidden;
		margin-top: 32rpx;
		padding: 20rpx 32rpx;
		border-radius: 14rpx;
		background: url(../../static/images/home/home-bg.png)center top / 100% 100% no-repeat;
		.home-money-left {
			flex: 1;
		}
		.home-money-top {
			text {
				color: #9D9EA3;
				font-size: 24rpx;
			}
			view {
				color: #fff;
				padding: 8rpx 26rpx;
				border-radius: 50rpx;
				background: linear-gradient(92deg, #F87342 0%, #E05B32 100%);
			}
		}
		.home-money-bot {
			margin-top: 8rpx;
			image {
				 width: 96rpx;
				 height: 96rpx;
				 margin-right: 9rpx;
			}
			text {
				color: #fff;
				font-size: 36rpx;
				font-weight: bold;
			}
		}
	}
	.home-bar {
		margin-top: 20rpx;
		border-radius: 14rpx;
		padding: 36rpx 20rpx;
		background-color: white;
		.home-bar-li {
			flex: 1;
			view {
				font-size: 24rpx;
				margin-top: 16rpx;
				text-align: center;
			}
			image {
				width: 80rpx;
				height: 80rpx;
				margin: 0 auto;
				display: block;
			}
		}
	}
	.home-list {
		padding: 0 32rpx;
		margin-top: 20rpx;
		border-radius: 20rpx;
		background-color: white;
		.home-li{
			padding: 28rpx 0;
			border-bottom: 2rpx solid #F1F1F1;
		}
		text {
			flex: 1;
			font-size: 28rpx;
			padding: 0 32rpx;
		}
		image {
			width: 48rpx;
			height: 48rpx;
		}
	}
	.home-li:last-child{
		border-bottom: none;
	}
	
</style>
