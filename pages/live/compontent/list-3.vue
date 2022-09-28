<!-- 足球 -->
<template>
	<view class="list">
		<view class="list-head" v-if="liveList.total != 0">
			<view class="list-title flex-start">
				<image src="/static/images/live/live-hot.png" mode=""></image>
				<text>热门主播</text>
			</view>
			<view class="list-list flex-start">
				<view class="list-list-li" v-for="(item,index) in liveList.data" :key="index">
					<image :src="item.avatar" mode=""></image>
					<view class="text-clamp">{{item.user_nickname}}</view>
				</view>
			</view>
		</view>
		
		<view class="detail-title flex-start">
			<image src="/static/images/competition/detail01.png" mode=""></image>
			<text style="">正在直播</text>
		</view>
		<view class="detail-video-list flex-wrap">
			<view class="detail-video-li" v-for="(item,index) in liveList.data" :key="index" @click="$navigateTo('./detail?id=' + item.uid + '&vid=' + item.vid)">
				<view class="detail-viedo-top">
					<image class="detail-video-li-logo" :src="item.thumb" mode="aspectFill"></image>
					<view class="detail-video-info">
						<image class="detail-video-content-logo" :src="item.avatar" mode="aspectFill"></image>
						<view class="detail-video-user-name">{{item.user_nickname}}</view>
					</view>
				</view>
				<view class="detail-video-content flex">
					<view class="detail-video-right">
						<view class="detail-video-title text-clamp">
							{{item.title.split(' ').length === 2 ? item.title.split(' ').slice(1, item.title.split(' ').length).join() : item.title}}
						</view>
						<view class="detail-video-info flex">
							<text class="text-clamp">{{item.title.split(' ').length === 2 ? item.title.split(' ')[0] : ''}}</text>
							<image src="/static/images/competition/detail-hot.png" mode=""></image>
							<view>{{item.heat}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-empty text="暂无直播"  v-if="liveList.total == 0" src="/static/images/competition/none.png" icon-size="400" mode="list"></u-empty>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				liveList: {}
			}
		},
		mounted() {
			console.log(3);
		},
		methods:{
			getList(type){
				// 正在直播
				let data = {
					type:type == 2?0:type == 3?1:2
				}
				this.$u.get('/api/live_streaming/getLiveList', data).then(res => {
					this.liveList = res
				})
			}
		}
	}
</script>

<style lang="scss">
	.list {
		padding: 0 24rpx;
		padding-top: 6vh;
	}
	.list-head {
		overflow: hidden;
		margin-top: 20rpx;
		border-radius: 12rpx;
		background-color: white;
		.list-title {
			padding: 16rpx 12rpx;
			background: url(/static/images/live/live-1.png)left top / 204rpx 100% no-repeat;
			image {
				width: 28rpx;
				height: 32rpx;
				margin-right: 12rpx;
			}
			text {
				color: #fff;
				font-size: 28rpx;
			}
		}
	}
	.list-list-li{
		margin-right: 20rpx;
		image {
			width: 72rpx;
			height: 72rpx;
			margin: 0 auto;
			display: block;
			border-radius: 50%;
			margin-bottom: 10rpx;
		}
		view {
			max-width: 99%;
		}
	}
	.list-list {
		padding: 0 8rpx;
		margin-top: 24rpx;
		margin-bottom: 24rpx;
	}
	.detail-title {
		margin-top: 32rpx;
		font-weight: bold;
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
		.detail-viedo-top {
			position: relative;
			display: block;
			width: 100%;
			height: 176rpx;
			.detail-video-li-logo {
				display: block;
				width: 100%;
				height: 100%;
			}
			.detail-video-info {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				position: absolute;
				bottom: 0;
				width: 100%;
				padding: 6rpx;
				border-radius: 5px;
				background: rgba(0, 0, 0, 0.3);
				box-sizing: border-box;
				.detail-video-content-logo {
					display: inline-block;
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					margin-right: 16rpx;
				}
				.detail-video-user-name {
					flex: 1;
					display: inline-block;
					font-size: 24rpx;
					color: #fff;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
		.detail-video-content {
			padding: 16rpx;
			.detail-video-title {
				width: 99%;
				margin-bottom: 6rpx;
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
	.detail-video-right {
		flex: 1;
		min-width: 100px;
	}
</style>
