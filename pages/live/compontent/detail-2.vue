<!-- 主播 -->
<template>
	<view class="detail">
		<view class="detail-info flex">
			<image :src="userInfo.avatar" mode=""></image>
			<view class="detail-info-name">
				<text>{{userInfo.user_nickname}}</text>
				<view class="text-clamp">
					{{userInfo.signature}}
				</view>
			</view>
			<view class="detail-info-btn flex" :class="{'active':userInfo.is_attention == 1}">
				<image src="/static/images/live/live-7.png" mode=""></image>
				<text @click="getShow">关注</text>
			</view>
		</view>
		<!-- 主播公告 -->
		<view class="detail-tips">
			<u-notice-bar style="width: 100%;" mode="horizontal" :list="userInfo.announcement1"></u-notice-bar>
		</view>
	</view>
</template>

<script>
	export default {
		props:['userInfo'],
		data() {
			return {
				ba:['454545313131']
			}
		},
		methods:{
			getShow(){
				 	this.$emit('getShow');
			}
		}
	}
</script>

<style lang="scss">
	.detail-tips {
		color: #87390E;
		// position: absolute;
		// top: 0;
		// left: 0;
		// right: 0;
		padding: 0 24rpx;
		background-color: #F4E8D3;
		image {
			width: 32rpx;
			height: 28rpx;
			margin-right: 20rpx;
		}
	}
	.detail-info {
		margin-top: 20rpx;
		padding: 20rpx 24rpx;
		background-color: white;
		image {
			width: 72rpx;
			height: 72rpx;
			border-radius: 50%;
			margin-right: 12rpx;
		}
		.detail-info-name {
			flex: 1;
			text {
				color: #333;
				font-size: 32rpx;
			}
			view {
				color: #999;
				font-size: 24rpx;
			}
		}
		.detail-info-btn {
			color: #fff;
			font-size: 28rpx;
			padding: 16rpx 20rpx;
			border-radius: 12rpx;
			background: linear-gradient(90deg, #FFDFAB 0%, #E3AC72 100%);
			image {
				width: 28rpx;
				height: 25rpx;
				margin-right: 14rpx;
			}
		}
		.active{
			background: #ccc;
		}
	}
</style>
