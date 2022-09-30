<!-- 人气榜 -->
<template>
	<view class="detail">
		<view class="numerical-tab flex">
			<view class="" v-for="(item,index) in numericalList" @click="numericalIndex=index" :class="index==numericalIndex?'numerical-active':''">
				{{item}}
			</view>
		</view>
		
		<view class="detail-list">
			<view class="detail-li flex" v-for="(item,index) in list" :key="index">
				<image class="detail-li-class" src="/static/images/live/live-9.png" mode=""></image>
				<view class="detail-li-center flex-start">
					<image class="detail-li-logo" :src="item.avatar" mode=""></image>
					<view class="detail-li-center-right">
						<view>{{item.user_nickname}}</view>
						<view class="flex-start">
							<text>豪气</text>
							<image src="/static/images/live/live-8.png" mode=""></image>
							<text>{{item.amount}}</text>
						</view>
					</view>
				</view>
				<image v-if="item.order == 1" class="detail-li-sort" src="/static/images/live/live-10.png" mode=""></image>
			</view>
			
		</view>
			<u-empty text="暂无豪气"  v-if="list.length == 0" src="/static/images/competition/none.png" icon-size="400" mode="list"></u-empty>
	</view>
</template>

<script>
	export default {
		// 
		props:['userInfo'],
		data() {
			return {
				list:[],
				numericalList: ['日榜','周榜'],
				numericalIndex: 0
			}
		},
		watch:{
			numericalIndex(e){
				this.getList({uid:this.userInfo.uid,type:e})
			}
		},
		methods:{
			getList(data){
				this.$u.get('/api/live_streaming/roomRanking',data).then(res=>{
					this.list = res
				})
			}
		}
	}
</script>

<style lang="scss">
	.detail {
		padding-bottom: 100rpx;
	}
	.numerical-tab {
		width: 320rpx;
		margin: 24rpx auto;
		border-radius: 12rpx;
		border: 2rpx solid #c41d48;
		view {
			flex: 1;
			color: #c41d48;
			font-size: 28rpx;
			text-align: center;
			padding: 16rpx 24rpx;
		}
		.numerical-active {
			color: #fff;
			// background: linear-gradient(91deg, #FFDFAB 0%, #E3AC72 100%);
			background-color:#c41d48
		}
	}
	.detail-list {
		background-color: white;
	}
	.detail-li {
		padding: 0 32rpx;
		.detail-li-class {
			width: 48rpx;
			height: 35rpx;
			text-align: center;
			margin-right: 40rpx;
		}
		.detail-li-center {
			flex: 1;
			padding: 24rpx 0;
			border-bottom: 2rpx solid #F1F1F1;
		}
		.detail-li-logo {
			width: 72rpx;
			height: 72rpx;
			border-radius: 50%;
			margin-right: 24rpx;
		}
		.detail-li-center-right {
			image {
				width: 20rpx;
				height: 24rpx;
				margin: 16rpx 12rpx 0 20rpx;
			}
			view {
				color: #333;
				font-size: 28rpx;
				text {
					color: #E3AC72;
					font-size: 20rpx;
					margin-top: 10rpx;
				}
			}
		}
		.detail-li-sort {
			width: 18rpx;
			height: 28rpx;
		}
	}












</style>
