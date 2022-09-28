<!-- 活动 -->
<template>
	<view class="active">
		<scroll-view scroll-y="true" style="height: 100vh;width: 100%;">
			<view class="active-content">
				<view class="balance flex-start">
					<image src="../../static/images/activity/cicon1.png" mode=""></image>
					<text>已获得0钻石</text>
				</view>
				<view class="numerical-tab flex">
					<view class="" v-for="(item,index) in numericalList" @click="numericalIndex = index" :class="index==numericalIndex?'numerical-active':''">
						{{item}}
					</view>
				</view>
				<view class="list1 list" v-if="numericalIndex == 2">
					<view class="li flex" style="border: none;">
						<view class="li-content flex-start">
							<text>邀请好友注册(<text>0</text>/1)</text>
							<view>2钻石</view>
						</view>
						<view class="li-btn">
							去完成
						</view>
					</view>
					<view class="flex-wrap list1-li flex-start">
						<text></text><view>100~2500每10个阅读/播放5钻石</view>
					</view>
				</view>
				<view class="list" v-else>
					<view class="li flex" v-for="(item,index) in 5">
						<view class="li-content flex-start">
							<text>邀请好友注册(<text>0</text>/1)</text>
							<view>2钻石</view>
						</view>
						<view class="li-btn">
							去完成
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				numericalIndex:0,
				numericalList:['新手任务','每日任务','创作者']
			}
		},
		methods:{
			
		}
	}
</script>

<style scoped lang="scss">
	.active {
		min-height: 120vh;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
	}
	.active-content{
		// position: absolute;
		// top: 0;
		left: 0;
		right: 0;
		height: 100%;
		padding-bottom: 100px;
		overflow: hidden;
		background: url(../../static/images/activity/icon-bg.png)center top / 100% auto no-repeat;
		
	}
	.balance {
		color: #87390E;
		margin: 0 16rpx;
		font-size: 32rpx;
		margin-top: 388rpx;
		padding: 17rpx 24rpx;
		border-radius: 12rpx;
		background: linear-gradient(180deg, #FFF2D0 0%, #FFF9B6 100%);
		image {
			width: 60rpx;
			height: 60rpx;
			margin-right: 12rpx;
		}
	}
	.numerical-tab {
		width: 562rpx;
		overflow: hidden;
		margin: 80rpx auto;
		border-radius: 12rpx;
		background-color: rgba(0,0,0,0.2);
		view {
			color: #fff;
			font-size: 28rpx;
			padding: 16rpx 42rpx;
			border-radius: 12rpx;
		}
	
		.numerical-active {
			color: #87390E;
			background: linear-gradient(91deg, #FFDFAB 0%, #E3AC72 100%);
		}
	}
	
	.list {
		color: #87390E;
		font-size: 28rpx;
		margin: 0 24rpx;
		border-radius: 12rpx;
		background: #FFF1E0;
		.li {
			margin: 0 32rpx;
			padding: 40rpx 0;
			border-bottom: 2rpx solid  #FED7AC;
		}
		.li-content {
			
			text {
				text {
					color: #E3AC72;
				}
			}
			view {
				margin-left: 12rpx;
				border-radius: 4rpx;
				padding: 10rpx 12rpx;
				background-color: #FED7AC;
			}
		}
		.li-btn {
			width: 132rpx;
			padding: 12rpx 0;
			text-align: center;
			border-radius: 4rpx;
			background: linear-gradient(90deg, #FFDFAB 0%, #E3AC72 100%);
		}
		.list1-li {
			margin: 0 28rpx;
			
			margin-bottom: 20rpx;
			text{
				width: 10rpx;
				height: 10rpx;
				border-radius: 50%;
				margin-right: 12rpx;
				background-color: #87390E;
			}
		}
	}
	.list1 {
		overflow: hidden;
		margin-bottom: 24rpx ;
	}
	.li:last-child{
		
		border-bottom: none;
	}
</style>
