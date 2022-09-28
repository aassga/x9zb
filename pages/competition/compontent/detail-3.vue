<!-- 阵容 -->
<template>
	<view class="detail-content">
		<!--  v-if="base.length != 0" -->
		<view class="">
			<view class="detail-site" >
				<view class="detail-title flex" v-if="JSON.stringify(base) !== '{}'">
					<text>主教练：{{base.home_manager.name_zh}}</text>
					<text>阵型：{{base.home_formation}}</text>
				</view>
				<view class="detail-site-ball">
					<view class="detail-site-ball-top" v-if="JSON.stringify(base) !== '{}'">
						<!-- //列 -->
						<view class="detail-site-ball-top-ul flex" style="justify-content: center;" v-for="(item,index) in base.home_player_first">
							<view class="detail-site-ball-top-li" :style="{width:'calc(100% / '+item+')'}" v-for="(item1,index1) in item">
								<view class="flex-center">
									{{item1.shirt_number}}
								</view>
								<text>{{item1.name}}</text>
							</view>
						</view>
					</view>
					<view class="detail-site-ball-top" style="padding-top: 22vh;" v-if="JSON.stringify(base) !== '{}'">
						<!-- //列 -->
						<view class="detail-site-ball-top-ul flex" style="justify-content: center" v-for="(item,index) in base.away_player_first">
							<view class="detail-site-ball-top-li"  :style="{width:'calc(100% / '+item+')'}" v-for="(item1,index1) in item">
								<view class="flex-center" style="background: url(/static/images/competition/team1.png)center top / 100% 100%;">
									{{item1.shirt_number}}
								</view>
								<text class="text-clamp" style="">{{item1.name}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="detail-title flex" v-if="JSON.stringify(base) !== '{}'">
					<text>主教练：{{base.away_manager.name_zh}}</text>
					<text>阵型：{{base.away_formation}}</text>
				</view>
			</view>
		</view>
		
		<view class="detail-tips" v-if="JSON.stringify(base) !== '{}'">
			替补阵容
		</view>
		<view class="detail-substitution" v-if="JSON.stringify(base) !== '{}'">
			<view class="detail-substitution-li flex">
				<view class="" style="width: 50%;">
					<view v-for="(item,index) in base.home_player" :key="index" class="detail-substitution-li-content flex detail-substitution-li-content-after" style="margin-right:18rpx;">
						<view class="detail-substitution-li-logo flex-center">
							{{item.shirt_number}}
						</view>
						<view class="detail-substitution-li-nav">
							<view class="text-clamp">{{item.name}}</view>
							<text>{{getPostition(item.position)}}</text>
						</view>
						<view class="flex detail-substitution-li-time" v-if="item.incidents.length != 0">
							<image src="/static/images/competition/icon-up.png" mode=""></image>
							{{item.incidents[0].minute}}'
						</view>
					</view>
				</view>
				<view class="" style="width: 50%;align-self: flex-start;">
					<view class="detail-substitution-li-content flex" style="margin-left: 18rpx;" v-for="(item,index) in base.away_player" :key="index">
						<view class="flex detail-substitution-li-time" v-if="item.incidents.length != 0">
							<image src="/static/images/competition/icon-up.png" mode=""></image>
							{{item.incidents[0].minute}}'
						</view>
						
						<view class="detail-substitution-li-nav" style="text-align: right;">
							<view class="text-clamp">{{item.name}}</view>
							<text>{{getPostition(item.position)}}</text>
						</view>
						<view class="detail-substitution-li-logo flex-center" style="background: url(/static/images/competition/team1.png)center top / 100% 100%;">
							{{item.shirt_number}}
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
				base:{},
				list:[1,2,4,3]
			}
		},
		methods: {
			getdetail(id) {
				// return
				this.$u.get('api/Football/football_match_lineup',{id:id}).then(res=>{
					// console.log(res);
					this.base = res
					
				})
			},
			getPostition(i){
				// F前锋、M中场、D后卫、G守门员、其他为未知
				if(i == 'F'){
					return '前锋'
				}else if(i == 'M'){
					return '中场'
				}else if(i == 'D'){
					return '后卫'
				}else if(i == 'G'){
					return '守门员'
				}else{
					return '未知'
				}
			}
		},
	}
</script>

<style lang="scss">
	html{
	　　-webkit-text-size-adjust:none;
	}
	.detail-content {
		padding: 20rpx 24rpx;
	}
	.detail-site {
		border-radius: 20rpx;
		background-color: #78C258;
	}
	.detail-title {
		color: #fff;
		font-size: 24rpx;
		padding: 20rpx 24rpx;
	}
	.detail-site-ball {
		height: 1128rpx;
		padding: 52rpx 16rpx 44rpx;
		background: url(/static/images/competition/site-bg.png)center top / 100% 100% no-repeat;
	}
	.detail-tips {
		color: #333;
		font-size: 28rpx;
		padding: 24rpx 0;
		text-align: center;
	}
	.detail-site-ball-top-li {
		color: #fff;
		margin-bottom: 2rpx;
		view {
			width: 56rpx;
			height: 60rpx;
			margin: 0 auto;
			font-weight: bold;
			background: url(/static/images/competition/team.png)center top / 100% 100% no-repeat;
		}
		text {
			width: 100%;
			display: block;
			font-size: 20rpx;
			margin-top: 2rpx;
			text-align: center;
		}
	}
	
	.detail-substitution {
		background-color: white;
		border-radius: 12rpx 12rpx 0 0;
		.detail-substitution-li {
			// width: calc(100% / 2 - 20rpx);
			padding: 20rpx;
		}
		.detail-substitution-li-content {
			flex: 1;
			margin-bottom: 20rpx;
		}
		.detail-substitution-li-content-after {
			position: relative;
			&::after{
				content: '';
				right: -20rpx;
				width: 2rpx;
				top: 10rpx;
				bottom: 10rpx;
				position: absolute;
				background-color: #E3E3E3;
			}
		}
		.detail-substitution-li-logo {
			color: #fff;
			width: 56rpx;
			height: 60rpx;
			background: url(/static/images/competition/team.png)center top / 100% 100% no-repeat;
		}
		.detail-substitution-li-nav {
			flex: 1;
			width: 50%;
			padding: 0 20rpx;
			view {
				font-size: 28rpx;
			}
			text {
				color: #999;
				font-size: 24rpx;
			}
		}
		.detail-substitution-li-time {
			image {
				width: 20rpx;
				height: 20rpx;
				margin-right: 6rpx;
			}
		}
	}
	
</style>
