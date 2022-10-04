<!-- 相关视频 -->
<template>
	<view class="detail">
		<!-- 暂时隐藏 -->
		<view class="detail-title flex-start" style="display: none;">
			<image src="/static/images/competition/detail01.png" mode=""></image>
			<text style="">更多视频</text>
		</view>
		<view class="detail-video-list flex-wrap">
			
			<view class="detail-video-li" v-for="(item,index) in 0">
				<image class="detail-video-li-logo" src="/static/images/competition/video-bg.png" mode=""></image>
				<view class="detail-video-content flex">
					<image class="detail-video-content-logo" src="/static/images/competition/01.png" mode=""></image>
					<view class="detail-video-right">
						<view class="detail-video-title text-clamp">
							NBA2021年度总...
						</view>
						<view class="detail-video-info flex">
							<text>昵称</text>
							<image src="/static/images/competition/detail-hot.png" mode=""></image>
							<view>1.5w</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-empty text="暂无视频" src="/static/images/competition/none.png" icon-size="400" mode="list"></u-empty>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.detail {
		padding: 0 24rpx;
	}
	.detail-title {
		font-weight: bold;
		margin-top: 32rpx;
		image {
			width: 40rpx;
			height: 40rpx;
			margin-right: 16rpx;
		}
		text {
			color: #333;
			font-size: 32rpx;
		}
	}
	.detail-video-li {
		overflow: hidden;
		margin-top: 20rpx;
		width: calc(100% / 2 - 9rpx);
		border-radius: 12rpx;
		background-color: white;
		.detail-video-li-logo {
			width: 100%;
			height: 176rpx;
			display: block;
		}
		.detail-video-content {
			padding: 16rpx;
			.detail-video-content-logo {
				width: 64rpx;
				height: 64rpx;
				margin-right: 16rpx;
			}
			.detail-video-title {
				color: #333;
				font-size: 28rpx;
			}
		}
		.detail-video-info {
			font-size: 24rpx;
			image {
				width: 24rpx;
				height: 24rpx;
				margin-right: 6rpx;
			}
			text {
				flex: 1;
				color: #9193B4;
				
			}
			view {
				color: #999;
			}
		}
	}
</style>
