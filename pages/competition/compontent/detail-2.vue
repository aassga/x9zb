<template>
	<view class="detail-content">
		<view class="detail-title flex-start" v-if="info.length != 0">
			<image src="../../../static/images/competition/detail01.png" mode=""></image>
			<text style="">本场主播</text>
		</view>
		<view class="detail-list" v-if="info.length != 0">
			<view class="detail-li flex">
				<image class="detail-li-logo" src="/static/images/competition/01.png" mode=""></image>
				<view class="detail-li-center">
					<view class="detail-li-center-top flex-start">
						<view>
							{{info[0].user_nickname}}
						</view>
						<!-- <text>回放</text> -->
					</view>
					<view class="detail-li-center-bot">
						粉丝数：{{info[0].attention}}
					</view>
				</view>
				<view class="detail-li-right flex">
					<image src="/static/images/competition/detail-hot.png" mode=""></image>
					<text>{{info[0].heat}}</text>
					<image class="detail-li-right-img" src="/static/images/competition/detail-right.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="detail-title flex-start">
			<image src="/static/images/competition/detail01.png" mode=""></image>
			<text style="">更多直播</text>
		</view>
		<view class="detail-video-list flex-wrap">
			
			<view class="detail-video-li" v-for="(item,index) in list" :key="index" @click="$navigateTo('../live/detail?id=' + item.uid + '&vid=' + item.vid)">
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
	
	
	</view>
</template>

<script>
	export default {
		props:['base'],
		data() {
			return {
				info:[],
				list:[]
			}
		},
		methods:{
			// 获取本场主播在直播的主播列表
			getdetail(){
				this.$u.get('api/Live_streaming/getMatchLiveList',{id:this.base.id}).then(res=>{
					this.info = res
				})
				this.$u.get('api/live_streaming/getLiveList',{}).then(res=>{
					this.list = res.data
				})
			}
		}
	}
</script>

<style lang="scss">
	.detail-content {
		padding: 0 24rpx;
		padding-bottom: 40rpx;
	}
	.detail-title {
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
	.detail-li {
		margin-top: 20rpx;
		padding: 28rpx 24rpx;
		border-radius: 12rpx;
		background-color: white;
		.detail-li-logo {
			width: 96rpx;
			height: 96rpx;
			margin-right: 20rpx;
		}
		.detail-li-center {
			flex: 1;
			.detail-li-center-top {
				color: #333;
				font-size: 28rpx;
				text {
					color: #E3AC72;
					font-size: 24rpx;
					margin-left: 16rpx;
					padding: 3rpx 6rpx;
					border: 2rpx solid #E3AC72;
					border-radius: 4rpx 12rpx 4rpx 12rpx;
				}
			}
			.detail-li-center-bot {
				color: #959DB0;
				margin-top: 10rpx;
			}
			
		}
		.detail-li-right {
			color: #E3AC72;
			image {
				width: 20rpx;
				height: 24rpx;
			}
			text {
				font-size: 24rpx;
				padding: 0 6rpx 0 16rpx;
			}
			.detail-li-right-img {
				width: 36rpx;
				height: 36rpx;
			}
		}
	}
	// 更多视频
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
			flex: 1;
			font-size: 24rpx;
			image {
				width: 24rpx;
				height: 24rpx;
				margin-right: 6rpx;
			}
			text {
				flex: 1;
				width: 100rpx;
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
