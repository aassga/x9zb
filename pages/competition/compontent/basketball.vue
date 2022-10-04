<!-- 篮球 -->
<template>
	<view class="ball">
		<view class="list">
			<view class="ball-list" @click="$navigateTo('basketballDetail?id=' + item.id + '&vid=' + item.vid)" v-for="(item,index) in baskballList" :key="index">
				<view class="ball-title flex-start">
					<view class="ball-title-left flex-start">
						<view class="text-clamp">{{item.short_name_zh}}</view>
						<text>{{item.match_time}}</text>
					</view>
					<view style="color: #87390E;">{{item.status_name}} {{item.time_left}}</view>
				</view>
				<view class="ball-content flex">
					<view class="ball-left flex-start">
						<image src="/static/images/competition/basketball2.png" mode=""></image>
						<view>
							<view v-if="item.home_team_data">{{item.home_team_data.short_name_zh}}</view>
							<view style="margin-top: 16rpx;" v-if="item.away_team_data">{{item.away_team_data.short_name_zh}}</view>
						</view>
					</view>
					<view class="ball-center">
						<view class="ball-center-top flex-around">
							<text v-for="(item1,index1) in item.home_scores">{{item1}}</text>
							<view >{{item.home_scores_total}}</view>
						</view>
						<view class="ball-center-top flex-around" style="margin-top: 20rpx;">
							<text v-for="(item1,index1) in item.away_scores">{{item1}}</text>
							<view >{{item.away_scores_total}}</view>
						</view>
					</view>
					<image :style="{visibility: item.mlive == 1?'hidden':''}" src="/static/images/competition/basketball1.png" class="ball-right" mode=""></image>
				</view>
			</view>
			
			<image src="/static/images/competition/none.png" v-if="baskballList.length == 0" mode="" class="none"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			baskballList: {
				type: Array,
				default: {}
			},
			loadStatus:{
				type:String,
				default:'more'
			}
		},
		watch: {
			baskballList(e) {
				this.baskballList = e
			},
		},
		data() {
			return {

			}
		},
		methods:{
			// 时间戳转时间
			timeStamp: function(value) {
				var date = new Date(value * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var year = date.getFullYear();
				var month = ("0" + (date.getMonth() + 1)).slice(-2);
				var sdate = ("0" + date.getDate()).slice(-2);
				var hour = ("0" + date.getHours()).slice(-2);
				var minute = ("0" + date.getMinutes()).slice(-2);
				var second = ("0" + date.getSeconds()).slice(-2);
				// 拼接
				var result = hour + ":" + minute //+ ":" + second;
				// 返回
				return result;
			},
		}

	}
</script>

<style lang="scss">
	.ball {
		padding: 0 24rpx;
	}
	.none {
		width: 474rpx;
		height: 312rpx;
		display: block;
		margin: 100rpx auto;
	}

	.ball-list {
		margin-bottom: 20rpx;
		overflow: hidden;
		border-radius: 12rpx;
		background-color: white;
	}

	.ball-title {
		padding: 6rpx 16rpx;
		border-bottom: 2rpx solid #F1F1F1;

		.ball-title-left {
			width: 292rpx;

			view {
				width: 116rpx;
				text-align: center;
				color: #fff;
				font-size: 20rpx;
				padding: 10rpx 30rpx;
				background: #607FCA;
				border-radius: 12rpx 4rpx 12rpx 12rpx;
			}

			text {
				color: #999;
				font-size: 20rpx;
				margin-left: 12rpx;
			}
		}
	}

	.ball-content {
		padding: 16rpx 0;

		.ball-left {
			width: 292rpx;
			border-right: 2rpx solid #F1F1F1;
		}

		.ball-center {
			flex: 1;

			.ball-center-top {
				text {
					color: #999;
					font-size: 20rpx;
				}

				view {
					color: #87390E;
					font-size: 24rpx;
					font-weight: bold;
					margin-left: 60rpx;
				}
			}
		}

		image {
			width: 34rpx;
			height: 32rpx;
			padding-left: 18rpx;
			padding-right: 20rpx;
		}

		.ball-right {
			width: 28rpx;
			height: 24rpx;
		}
	}

	.ball-top {
		width: 94rpx;
		height: 94rpx;
		position: fixed;
		bottom: 164rpx;
		right: 32rpx;
	}
</style>
