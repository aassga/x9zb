<template>
	<view class="detail-content">
		<image src="/static/images/live/h5-banner.png" mode="" style="height: 120rpx;width: 100%;"></image>
		<view class="detail-content-top">
			<view class="detail-content-match flex">
				<view class="detail-content-match-progres" v-for="(item,index) in progress">
					<view class="detail-content-match-title">
						{{item}}
					</view>
					<view class="flex" v-if="base.home_data">
						<text>{{index == 0 && base.home_data ?base.home_data[3]:index == 1?base.home_data[4]:base.home_data[5]}}</text>

						<!--  -->
						<u-circle-progress style="padding: 0 16rpx;" v-if="index==0"
							:class="base.home_data[3] > base.away_data[3]?'mirrorRotateLevel':''"
							:active-color="index != 2?'#F84A4B':'#687AE0'" border-width="8"
							:percent="count(base.home_data[3],base.away_data[3])" height="4" width="100"
							duration="2000"></u-circle-progress>
						<u-circle-progress style="padding: 0 16rpx;" v-if="index==1"
							:class="base.home_data[4] > base.away_data[4]?'mirrorRotateLevel':''"
							:active-color="index != 2?'#F84A4B':'#687AE0'" border-width="8"
							:percent="count(base.home_data[4],base.away_data[4])" height="4" width="100"
							duration="2000"></u-circle-progress>
						<u-circle-progress style="padding: 0 16rpx;"
							:class="base.home_data[5] > base.away_data[5]?'mirrorRotateLevel':''" v-if="index==2"
							:active-color="index != 2?'#F84A4B':'#687AE0'" border-width="8"
							:percent="count(base.home_data[5],base.away_data[5])" height="4" width="100"
							duration="2000"></u-circle-progress>

						<text>{{index == 0?base.away_data[3]:index == 1?base.away_data[4]:base.away_data[5]}}</text>
					</view>
				</view>
			</view>
			<view class="detail-content-numerical flex" v-for="(item,index) in 2">
				<view class="detail-content-numerical-left flex"
					:class="index== 1?'detail-content-numerical-left-Active':''" v-if="base.home_data">
					<image src="/static/images/competition/numerical.png" v-if="index == 0" mode=""></image>
					<text v-else>{{base.home_data[8]}}</text>
					<text :style="{backgroundColor: index==0?'#EB5C51':''}">{{index == 0?'':base.home_data[1]}}</text>
					<text>{{index == 0?'':base.home_data[2]}}</text>
				</view>
				<view class="" style="width: 238rpx;position: relative;" v-if="base.home_data">
					<view class="detail-content-numerical-title">
						{{index == 0 ?base.home_data[6]:base.home_data[7]}}
						<text>{{index== 0 ?'射正球门':'射偏球门'}}</text>
						{{index == 0 ?base.away_data[6]:base.away_data[7]}}
					</view>
					<view class="flex">
						<u-line-progress :show-percent="false" :round="false" style="transform: rotate(180deg);"
							active-color="#F84A4B" width="70" height="8" :percent="valueS(index,base)">
						</u-line-progress>
						<u-line-progress :show-percent="false" :round="false" active-color="#687AE0" width="70"
							height="8" :percent="100 - valueS(index,base)"></u-line-progress>
					</view>
				</view>
				<view class="detail-content-numerical-left flex"
					:class="index== 1?'detail-content-numerical-left-Active':''">

					<text>{{index == 0?'':base.away_data[2]}}</text>
					<text :style="{backgroundColor: index==0?'#EB5C51':''}">{{index == 0?'':base.away_data[1]}}</text>
					<text v-if="index == 1">{{base.away_data[8]}}</text>
					<image src="/static/images/competition/numerical.png" v-else mode=""></image>
				</view>
			</view>
		</view>

		<!-- 切换 -->
		<view class="numerical-tab flex">
			<view class="" v-for="(item,index) in numericalList" @click="numericalIndex = index"
				:class="index==numericalIndex?'numerical-active':''">
				{{item}}
			</view>
		</view>
		
		<!-- 重要事件 -->
		<view class="statistics" v-if="numericalIndex == 0"  style="background-color: white;margin: 0 24rpx;">
			<view class="statistics-title flex">
				<view class="flex">
					<image :src="base.home_team_log" mode=""></image>
					<text>{{base.home_team_name_zh}}</text>
				</view>
				<view class="flex">
					<text>{{base.away_team_name_zh}}</text>
					<image :src="base.away_team_log" mode=""></image>
				</view>
			</view>
			<timeLine :tlive="base.tlive"  ref="timeline" location="center"></timeLine>
		</view>
		<!-- 重要事件-图标 -->
		<view class="statistics-icon flex-wrap" v-if="numericalIndex == 0">
			<view class="li flex-start" v-for="(item,index) in icon" :key="index">
				<image :src="'/static/images/competition/icon'+ item.num +'.png'" mode=""></image>
				{{item.name}}
			</view>
		</view>
		<!-- 事件直播 -->
		<view class="incident" v-if="numericalIndex == 1">
			<view class="" v-for="(item,index) in base.tlive1">
				<view class="incident-mid" v-if="item.position == 0">
					{{item.data}}
				</view>
				<view class="incident-li flex-start" v-else
					:style="{borderLeft:item.position == 1?'4rpx solid #F84A4B':'4rpx solid #687AE0'}">
					<view class="incident-li-left">
						{{item.time}}
					</view>
					<view class="flex-start incident-li-right">
						<image :src="'/static/images/competition/icon'+item.type+'.png'" mode=""></image>
						<view class="">
							{{item.data}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 技术统计 -->
		<view class="statistics" v-if="numericalIndex==2">
			<view class="statistics-title flex">
				<view class="flex">
					<image :src="base.home_team_log" mode=""></image>
					<text>{{base.home_team_name_zh}}</text>
				</view>
				<view class="flex">
					<text>{{base.away_team_name_zh}}</text>
					<image :src="base.away_team_log" mode=""></image>
				</view>
			</view>
			<view class="statistics-ul">
				<view class="statistics-li" v-if="base.technology.length != 0" v-for="(item,i,s) in base.technology[0]">
					<view class="flex">
						<text>{{item}}</text>
						<text>{{$common.getName(i)}}</text>
						<text>{{base.technology[1][i]}}</text>
					</view>
					<view class="flex" style="margin-top: 12rpx;">
						<u-line-progress style="transform: rotate(180deg);" height="6" active-color="#F84A4B"
							:striped="true" :percent="count(item,base.technology[1][i])" :show-percent="false"
							:striped-active="true"></u-line-progress>
						<u-line-progress height="6" :striped="true" :percent="100-count(item,base.technology[1][i])"
							active-color="#687AE0" :show-percent="false" :striped-active="true"></u-line-progress>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import timeLine from '@/compontent/timeLine/timeLine.vue'
	export default {
		components:{timeLine},
		props: {
			base: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				progress: ['进攻', '危险进攻', '控球率'],
				numericalList: ['重要事件', '事件直播', '技术统计'],
				numericalIndex: 1,
				icon:[
					{name:'进球',num:1},
					{name:'角球',num:2},
					{name:'黄牌',num:3},
					{name:'红牌',num:4},
					{name:'点球',num:8},
					{name:'换人',num:9},
					{name:'开球',num:10},
					{name:'两黄罚下',num:15},
					{name:'点球错失',num:16},
					{name:'乌龙球',num:17},
					{name:'受伤',num:19}
				]
			}
		},
		methods: {
			valueS(index, base) {
				if (index == 0) {
					if (base.home_data[6] > base.away_data[6]) {
						return base.home_data[6] / (base.home_data[6] + base.away_data[6]) * 100
					} else {
						return base.away_data[6] / (base.home_data[6] + base.away_data[6]) * 100
					}

				} else {
					if (base.home_data[7] > base.away_data[7]) {
						return base.home_data[7] / (base.home_data[7] + base.away_data[7]) * 100
					} else {
						return base.away_data[7] / (base.home_data[7] + base.away_data[7]) * 100
					}
				}
			},

			// 计算 进攻 危险进攻 控球率
			count(home_data, away_data) {
				if (home_data > away_data) {
					return home_data / (home_data + away_data) * 100
				} else if (home_data > away_data) {
					return away_data / (home_data + away_data) * 100
				}
			}
		}
	}
</script>

<style lang="scss">
	.detail-content-top {
		margin-top: 20rpx;
		padding: 22rpx 24rpx;
		background-color: white;
	}

	.detail-content-match {
		padding-bottom: 16rpx;
		margin-top: 20rpx;
		text-align: center;
		margin: 0 24rpx;
		border-bottom: 2rpx solid #F3F3F7;

		.detail-content-match-title {
			color: #999;
			margin-bottom: 12rpx;

		}
	}

	.detail-content-numerical-title {
		position: absolute;
		top: -30rpx;
		left: 0;
		right: 0;
		text-align: center;

		text {
			color: #999;
			padding: 0 18rpx;
		}
	}

	.detail-content-numerical {
		// padding-top: 20rpx;
		padding-top: 46rpx;

		image {
			width: 28rpx;
			height: 28rpx;
		}

		.detail-content-numerical-left {
			flex: 1;
			padding: 0 32rpx;

			text {
				width: 28rpx;
				height: 24rpx;
				display: block;
				text-align: center;
				border-radius: 2rpx;
				background-color: #F5C443;
			}
		}

		.detail-content-numerical-left-Active {
			text {
				// color: #fff;
				background-color: white;
			}
		}
	}

	.numerical-tab {
		width: 480rpx;
		margin: 24rpx auto;
		border-radius: 12rpx;
		border: 2rpx solid #E3AC72;

		view {
			color: #E3AC72;
			font-size: 28rpx;
			padding: 16rpx 24rpx;
		}

		.numerical-active {
			color: #fff;
			background: linear-gradient(91deg, #FFDFAB 0%, #E3AC72 100%);
		}
	}

	// 事件直播
	.incident {
		padding: 32rpx 24rpx;

		.incident-mid {
			color: #666;
			font-size: 24rpx;
			text-align: center;
			margin-bottom: 32rpx;
		}

		.incident-li {
			padding: 16rpx 0;
			font-size: 24rpx;
			border-radius: 6rpx;
			margin-bottom: 20rpx;
			background-color: white;

			.incident-li-left {
				width: 86rpx;
				border-right: 2rpx solid #E9E9E9;
				text-align: center;
			}

			.incident-li-right {
				flex: 1;
				color: #333;

				image {
					width: 28rpx;
					height: 28rpx;
					margin: 0 20rpx;
					align-self: flex-start;
				}

				view {
					flex: 1;
				}

			}
		}
	}
	// 技术统计图标
	.statistics-icon {
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		z-index: 99;
		padding: 16rpx;
		height: 146rpx;
		border-radius: 12rpx;
		background-color: white;
		box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.07);
		.li {
			font-size: 24rpx;
			margin-right: 16rpx;
		}
		image {
			width: 32rpx;
			height: 32rpx;
			margin-right: 6rpx;
		}
	}

	// 技术统计
	.statistics {
		padding-bottom: 208rpx;
		border-radius: 12rpx;
		background-color: white;

		.statistics-title {
			padding: 24rpx;

			image {
				width: 44rpx;
				height: 44rpx;
			}

			text {
				padding: 0 16rpx;
				font-size: 28rpx;
			}
		}

		.statistics-ul {
			
			padding: 0 24rpx;

			.statistics-li {
				font-size: 24rpx;
				margin-top: 48rpx;
			}
		}

	}

	/* 方法一 */
	.mirrorRotateLevel {
		transform: rotateY(180deg);
		/* 水平镜像翻转 */
	}
</style>
