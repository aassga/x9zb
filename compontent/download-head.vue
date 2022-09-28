<!-- 头部下载 -->
<template>
	<view  class="download flex" >
		<image src="../static/logo.png"  class="download-logo" mode=""></image>
		<view class="download-title">
			<view>
				下载小九直播
			</view>
			<view>
				畅享高清小九直播
			</view>
		</view>
		<view class="download-btn" @click="$navigateTo('../download')">
			立即下载
		</view>
		<image src="/static/images/download/del.png" mode="" style="width: 70rpx;height: 70rpx;margin-left: 30rpx;" @click="$store.state.show = false"></image>
	</view>
	<!-- download -->
</template>

<script>
import {
getQueryString
	} from '@/common/Qs'
</script>

<style lang="scss">
	.download {
		z-index: 9;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		padding: 14rpx 24rpx;
		background-color: #333;
		.download-logo {
			width: 76rpx;
			height: 76rpx;
		}
		.download-title {
			flex: 1;
			color: #fff;
			font-size: 32rpx;
			margin-left: 20rpx;
		}
		.download-btn {
			padding: 14rpx 16rpx;
			border-radius: 6rpx;
			background: linear-gradient(90deg, #FFDFAB 0%, #E3AC72 100%);
		}
	}
	
</style>
