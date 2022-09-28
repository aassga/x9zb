<template>
	<view class="">
		<view class="" v-if="curNow == 0">
			<view class="list-li" @click="$navigateTo('./detail?id=' + item.id + '&vid=' + item.vid);" v-for="(item,index) in footballList" :key="index">
				<view class="list-li-title flex-start">
					<text :style="{background: item.primary_color}" class="text-clamp">{{item.competition_name_zh || 0}}</text>
					{{timeStamp(item.time)}}
				</view>
				<view class="list-li-content flex">
					<view class="list-li-content-i flex">
						<image src="/static/images/competition/basketball2.png" mode=""></image>
						<view class="list-li-content-num red" v-if="item.home_red_card != 0">{{item.home_red_card}} </view>
						<view class="list-li-content-num" v-if="item.home_yellow_card != 0">{{item.home_yellow_card}} </view>
						<text class="team-name text-clamp" style="text-align: right;">{{item.home_team_name_zh}}</text>
					</view>
					<view class="list-li-mid" :class="{'start':item.status == 4 || item.status == 8}">
						{{item.status == 4 || item.status == 8?item.home_score:'-'}}
						<text :class="{'red':item.status == 4}">
							{{item.status == 4?item.match_str:item.status == 8 || item.status == 3?item.status_str:'未'}}
							<image v-if="item.status == 4" src="/static/images/competition/minite.gif" mode=""></image>
						</text>
						{{item.status == 4 || item.status == 8?item.away_score:'-'}}
					</view>
					<view class="list-li-content-i flex list-li-right">
						<text  class="team-name text-clamp">{{item.away_team_name_zh || 0}}</text>
						<view class="list-li-content-num" v-if="item.away_yellow_card != 0">{{item.away_yellow_card}} </view>
						<view class="list-li-content-num red" v-if="item.away_red_card != 0">{{item.away_red_card}} </view>
						<image src="/static/images/competition/basketball1.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="" v-if="curNow == 1">
			<view class="list-li" @click="$navigateTo('./detail?id=' + item.id + '&vid=' + item.vid);" v-for="(item,index) in footballList">
				<view class="list-li-title flex-start ">
					<text>{{item.competition_name_zh || 0}}</text>
					{{timeStamp(item.time)}}
				</view>
				<view class="list-li-content flex">
					<view class="list-li-content-i flex">
						<image src="/static/images/competition/basketball2.png" mode=""></image>
						<view class="list-li-content-num red" v-if="item.home_red_card != 0">{{item.home_red_card}} </view>
						<view class="list-li-content-num" v-if="item.home_yellow_card != 0">{{item.home_yellow_card}} </view>
						<text class="team-name text-clamp" style="text-align: right;">{{item.home_team_name_zh}}</text>
					</view>
					<view class="list-li-mid start">
						{{item.home_score}}
						<text class="red">
							{{item.match_str}}
							<image src="/static/images/competition/minite.gif" mode=""></image>
						</text>
						{{item.away_score}}
					</view>
					<view class="list-li-content-i flex list-li-right">
						<text class="team-name text-clamp">{{item.away_team_name_zh || 0}}</text>
						<view class="list-li-content-num" v-if="item.away_yellow_card != 0">{{item.away_yellow_card}} </view>
						<view class="list-li-content-num red" v-if="item.away_red_card != 0">{{item.away_red_card}} </view>
						<image src="/static/images/competition/basketball1.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="" v-if="curNow == 2">
			<view class="list-li" v-for="(item,index) in footballList" @click="$navigateTo('./detail?id=' + item.id + '&vid=' + item.vid);">
				<view class="list-li-title flex-start">
					<text>{{item.competition_name_zh || 0}}</text>
					{{timeStamp(item.time)}}
					<view class="list-li-title-start flex-center">
						<view>半 {{item.half_score}}</view>
						<view>角 {{item.corner_kick}}</view>
					</view>
				</view>
				<view class="list-li-content flex">
					<view class="list-li-content-i flex-end">
						<view style="flex: 1;">
							<image src="/static/images/competition/basketball2.png" mode=""></image>
						</view>
						<view class="list-li-content-num" v-if="item.home_yellow_card != 0">{{item.home_yellow_card}}
						</view>
						<view class="list-li-content-num" style="background: red;" v-if="item.home_red_card != 0">
							{{item.home_red_card}}</view>
						<text>{{item.home_team_name_zh}}</text>
						<!-- <view class="list-li-content-num1">3</view> -->
					</view>
					<view class="list-li-mid list-li-mid-start">
						{{item.home_score}}
						<text>{{getStatus(item)}}</text>
						{{item.away_score}}
					</view>
					<view class="list-li-content-i flex list-li-right">
						<!-- <view class="list-li-content-num1">3</view> -->
						<text>{{item.away_team_name_zh || 0}}</text>
						<view class="list-li-content-num" style="margin-left: 6rpx;background: red;"
							v-if="item.home_red_card != 0">{{item.home_red_card}}</view>
						<view class="list-li-content-num" style="margin-left: 6rpx;" v-if="item.away_yellow_card != 0">
							{{item.away_yellow_card}}</view>
						<view style="flex: 1;" class="flex-end">
							<image src="/static/images/competition/basketball1.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="" v-if="curNow == 3">
			<view class="list-li" v-for="(item,index) in footballList" @click="$navigateTo('./detail?id=' + item.id + '&vid=' + item.vid);">
				<view class="list-li-title flex-start">
					<text>{{item.competition_name_zh || 0}}</text>
					{{timeStamp(item.time)}}
					<view class="list-li-title-start flex-center">
						<view>半 {{item.half_score}}</view>
						<view>角 {{item.corner_kick}}</view>
					</view>
				</view>
				<view class="list-li-content flex">
					<view class="list-li-content-i flex-end">
						<view style="flex: 1;">
							<image src="/static/images/competition/basketball2.png" mode=""></image>
						</view>
						<view class="list-li-content-num" v-if="item.home_yellow_card != 0">{{item.home_yellow_card}} </view>
						<view class="list-li-content-num" style="margin-left: 6rpx;background: red;" v-if="item.home_red_card != 0">{{item.home_red_card}}</view>
						<view class="list-li-content-num" style="background: red;" v-if="item.home_red_card != 0">
							{{item.home_red_card}}
						</view>
						<text class="team-name text-clamp"  style="text-align: right;">{{item.home_team_name_zh}}</text>
						<!-- <view class="list-li-content-num1">3</view> -->
					</view>
					<view class="list-li-mid list-li-mid-start">
						{{item.home_score}}
						<text style="background: #F5F5F5;color: #999999;">{{getStatus(item)}}</text>
						{{item.away_score}}
					</view>
					<view class="list-li-content-i flex list-li-right">
						<!-- <view class="list-li-content-num1">3</view> -->
						<text class="team-name text-clamp">{{item.away_team_name_zh}}</text>
						<view class="list-li-content-num" style="margin-left: 6rpx;background: red;"
							v-if="item.away_red_card != 0">{{item.away_red_card}}</view>
						<view class="list-li-content-num" style="margin-left: 6rpx;" v-if="item.away_yellow_card != 0">
							{{item.away_yellow_card}}</view>
						<view style="flex: 1;" class="flex-end">
							<image src="/static/images/competition/basketball1.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<image src="/static/images/competition/none.png" v-if="footballList.length == 0" mode="" class="none"></image>
	</view>
</template>

<script>
	export default {
		props: {
			curNow: {
				type: Number,
				default: null
			},
			footballList: {
				type: Array,
				default: {}
			},
			loadStatus:{
				type:String,
				default:'more'
			}
			// ['curNow','footballList']
		},
		watch: {
			footballList(e) {
				this.list = e
			},
			curNow(e) {
				this.Index = e
			}
		},
		data() {
			return {
				Index: 0,
				list: []
			}
		},
		methods: {
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
			// 秒数转时分
			formatSeconds(value) {
				let result = parseInt(value)
				let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
				let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result /
					60 % 60));
				let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));

				let res = '';
				if (h !== '00') res += `${h}:`;
				if (m !== '00') res += `${m}:`;
				res += `${s}`;
				return res;
			},
			// 时间转成分
			formatMin(value) {
				var theTime = parseInt(value); // 需要转换的时间秒 
				var theTime1 = 0; // 分 
				var theTime2 = 0; // 小时 
				var theTime3 = 0; // 天
				if (theTime > 60) {
					theTime1 = parseInt(theTime / 60);
					theTime = parseInt(theTime % 60);
					if (theTime1 > 60) {
						theTime2 = parseInt(theTime1 / 60);
						theTime1 = parseInt(theTime1 % 60);
						if (theTime2 > 24) {
							//大于24小时
							theTime3 = parseInt(theTime2 / 24);
							theTime2 = parseInt(theTime2 % 24);
						}
					}
				}
				var result = '';
				if (theTime1 > 0) {
					result = "" + parseInt(theTime1) + "'" + result;
				}
				return result;
			},

			getStatus(item,type) {
				if (item.status == 3 || item.status == 4 || item.status == 5 || item.status == 7) {
					let newdata = new Date().getTime() / 1000
					if(type == 1){
						return this.formatSeconds((newdata - item.match_time).toFixed(0))
					}else{
						return this.formatMin((newdata - item.match_time).toFixed(0))
					}
				} else {
					return item.status == 1 ? '未' : item.status == 3 ? '中' : item.status == 8 ? '完' : ''
				}

			},
			getChange(e) {
				uni.showLoading({
					title: '加载中',
				})
				// console.log(e)
				this.$emit('changeIndex', e.detail.current)
			}
		}
	}
</script>

<style lang="scss">
	.none {
		width: 474rpx;
		height: 312rpx;
		display: block;
		margin: 100rpx auto;
	}
	.list-li {
		margin: 0 24rpx;
		margin-top: 20rpx;
		border-radius: 12rpx;
		background-color: white;

		.list-li-title {
			color: #999;
			font-size: 20rpx;
			position: relative;
			padding: 8rpx 16rpx;
			
			border-bottom: 2rpx solid #F1F1F1;

			text {
				color: #fff;
				width: 116rpx;
				text-align: center;
				margin-right: 12rpx;
				padding: 10rpx 30rpx;
				background-color: #607FCA;
				border-radius: 12rpx 4rpx 12rpx 12rpx;
			}
		}

		.list-li-title-start {
			position: absolute;
			left: 0;
			right: 0;
			color: #999;
			font-size: 20rpx;
			text-align: center;
		}

		.list-li-content {
			padding: 34rpx 24rpx;

		}

		.list-li-content-i {
			flex: 1;

			image {
				width: 34rpx;
				height: 32rpx;
			}

			text {
				color: #333;
				font-size: 28rpx;
			}
			.team-name {
				width: 160rpx;
			}
		}
		
		.list-li-content-num {
			// flex: 1;
			color: #fff;
			font-size: 20rpx;
			text-align: right;
			padding: 4rpx 8rpx;
			margin-right: 6rpx;
			border-radius: 2rpx;
			background-color: #FFB35B;
		}
		.red {
			background-color: #F9634E;
		}
		// .list-li-content-num1 {
		// 	color: #87390E;
		// 	font-size: 32rpx;
		// }
		.list-li-right {
			image {
				width: 28rpx;
				height: 28rpx;
				// border-radius: 50%;
			}
		}
		.start {
			display: flex;
			color: #87390E;
			font-weight: bold;
			align-items: center;
		}
		.list-li-mid {
			margin: 0 12rpx;

			text {
				color: #999;
				margin: 0 12rpx;
				font-size: 24rpx;
				background: #F5F5F5;
				border-radius: 12rpx;
				padding: 6rpx 14rpx;
				position: relative;
				font-weight: 400;
			}
			image {
				width: 8rpx;
				height: 12rpx;
				position: absolute;
				right: 0;
				top: 0;
			}
			.red {
				color: #87390E;
				background-color: #F7E6D2;
			}
		}

		.list-li-mid-start {
			color: #87390E;
			font-size: 32rpx;
			font-weight: bold;

			text {
				color: #87390E;
				background: #F7E6D2;
			}
		}
	}
</style>
