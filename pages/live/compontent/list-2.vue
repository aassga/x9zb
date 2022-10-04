<!-- 推荐 -->
<template>
	<view class="list">
		<view class="list-swiper">
			<!-- <image src="" mode="scaleToFill"></image> -->
			<u-swiper :list="list" height="302" img-mode="scaleToFill" mode="rect" indicator-pos="bottomCenter">
			</u-swiper>
		</view>
		<view class="list-roll">
			<scroll-view scroll-x="true">
				<view class="list-roll-nav flex-start">
					<view class="list-roll-li" v-for="(item,index) in bannerList" :key="index">
						<view class="list-roll-li-top flex">
							<text>{{item.competition}}</text>
							<view @click.stop="getReserveMatch(item,index)" class=""
								v-if="item.status_id == 1 && item.reserve == 0">
								预约
							</view>
							<view @click.stop="getReserveMatch(item,index)"
								v-else-if="item.status_id == 1 && item.reserve != 0" class="">
								已预约
							</view>
							<view class="" v-else>
								{{item.status_type == 1?'进行中':item.status_type == 2?'已结束':item.match_time}}
							</view>
						</view>
						<view class="list-roll-li-nav">
							<view class="flex-start">
								<image :src="item.home_team_logo" mode=""></image>
								<view class="text-clamp">{{item.home_team_name}}</view>
								<text>{{item.home_scores}}</text>
							</view>
							<view class="flex-start" style="margin-top: 16rpx;">
								<image :src="item.away_team_logo" mode=""></image>
								<view class="text-clamp">{{item.away_team_name}}</view>
								<text>{{item.away_scores}}</text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>

		<view class="detail-title flex-start">
			<image src="/static/images/competition/detail01.png" mode=""></image>
			<text style="">正在直播</text>
			<image class="daily-icon" src="/static/images/daily/daily-icon.png" mode="" @click="$navigateTo('../dailyMission')"></image>
		</view>
		<view class="detail-video-list flex-wrap">
			<view class="detail-video-li " v-for="(item,index) in liveList.data" :key="index"
				@click="$navigateTo('detail?id=' + item.uid+'&vid='+item.vid)">
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
							<text
								class="text-clamp">{{item.title.split(' ').length === 2 ? item.title.split(' ')[0] : ''}}</text>
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
		data() {
			return {
				// list: [{
				// 		image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
				// 		title: '昨夜星辰昨夜风，画楼西畔桂堂东'
				// 	},
				// 	{
				// 		image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
				// 		title: '身无彩凤双飞翼，心有灵犀一点通'
				// 	},
				// 	{
				// 		image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
				// 		title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
				// 	}
				// ],
				liveList: {},
				bannerList: []
			}
		},
		props: {
			list: {
				type: Array,
				default: []
			}
		},
		mounted() {
			console.log(2);
		},
		methods: {
			// 预约赛事
			getReserveMatch(item, index) {
				console.log('我点击了预约')
				const _this = this;
				this.$u.post('/api/live/reserveMatch2', {
					type: item.type,
					match_id: item.sourceid
				}).then(res => {
					if (item.reserve == 0) {
						item.reserve = 1
					} else {
						item.reserve = 0
					}
					_this.bannerList[index] = item;
				}).catch(res => {

				})
			},
			getList() {
				// 全部赛事
				this.$u.post('/api/hot_match/all_match', {}).then(res => {
					this.bannerList = res.data

					// console.log(resdata);
				})

				// 正在直播
				this.$u.get('/api/live_streaming/getLiveList', {}).then(res => {
					this.liveList = res
				})
			}
		}
	}
</script>

<style lang="scss">
	.list {
		padding-top: 10vh;
		padding: 0 24rpx;
		padding-bottom: 120rpx;
	}

	.list-swiper {
		margin-top: 20rpx;
	}

	.list-roll {
		margin-top: 20rpx;
	}

	.list-roll-li {
		padding: 16rpx;
		min-width: 332rpx;
		margin-right: 20rpx;
		border-radius: 12rpx;
		background-color: white;
		box-shadow: 0px 4px 12px rgba(51, 51, 51, 0.06);

		.list-roll-li-top {
			margin-bottom: 26rpx;
			font-size: 24rpx;

			text {
				color: #999;
			}

			view {
				color: #87390E;
				padding: 8rpx 26rpx;
				background: linear-gradient(90deg, #FFDFAB 0%, #E3AC72 100%);
			}
		}

		.list-roll-li-nav {
			view {
				font-size: 28rpx;

				image {
					width: 44rpx;
					height: 44rpx;
					margin-right: 6rpx;
				}

				view {
					flex: 1;
				}
			}
		}
	}

	.detail-title {
		position: relative;
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

		.daily-icon {
			position: absolute;
			right: 0;
			bottom: -24rpx;
			width: 100rpx;
			height: 100rpx;
			margin: 0;
		}
	}

	.detail-video-li {
		overflow: hidden;
		margin-top: 20rpx;
		width: calc(100% / 2 - 9rpx);
		border-radius: 12rpx;
		background-color: white;
		position: relative;

		&::before {
			content: "LIVE";
			width: 30px;
			height: 30px;
			line-height: 16px;
			font-size: 12px;
			text-align: center;
			color: #fff;
			background-size: 100% auto;
			z-index: 1;
			position: absolute;
			top: 6px;
			left: 10px;
			background: url(../../../static/images/live/ic-live.png) center top / 100% 32rpx no-repeat;
		}

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
