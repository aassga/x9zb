<!-- 指数详情 -->
<template>
	<view class="detail">
		<downloadHead></downloadHead>
		<view class="detail-th flex">
			<view class="detail-th-box">公司</view>
			<view class="flex-around detail-th-tr">
				<text>主</text>
				<text>盘口</text>
				<text>客</text>
				<view class="">
					<text>变盘时间</text>
				</view>
			</view>
		</view>
		
		<view class="detail-content flex">
			<view class="detail-left">
				<view v-for="(item,index) in list" @click="setIndex(index)" :class="index == tabIndex?'active':''">
					{{item.name}}
				</view>
			</view>
			<scroll-view scroll-y="true" style="max-height: 90vh;align-self: flex-start;">
				<view class="detail-right" style="flex: 1;">
					<view class="detail-right-li flex-around" v-for="(item,index) in child" :key="index">
						<text>{{item.host}}</text>
						<text>{{item.early}}</text>
						<text>{{item.guest}}</text>
						<view class="">
							<view>{{item.date}}</view>
							<view>{{item.change_time}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex: 0,
				list:[],
				child:[]
			}
		},
		onLoad(option) {
			this.$u.get('api/Football/football_odds_history_detail',{id:option.id,type:option.index == 0?'asia':option.index == 1?'eu':'bs'}).then(res=>{
				this.list = res
				this.child = res[option.idx].list
				this.tabIndex = option.idx
			})
		},
		methods: {
			setIndex(e){
				this.tabIndex = e
				this.child = this.list[e].list
			}
		}
	}
</script>

<style lang="scss">
	.detail-th {
		color: #333;
		font-size: 28rpx;
		padding: 22rpx 0;
		background-color: #F3F3F7;
		.detail-th-tr {
			flex: 1;
			padding: 0 24rpx;
			text,view {
				flex: 1;
				text-align: center;
			}
		}
		.detail-th-box {
			padding: 0 64rpx;
		}
	}
	
	.detail-left {
		color: #999;
		width: 184rpx;
		font-size: 24rpx;
		text-align: center;
		align-self: flex-start;
		view {
			display: block;
			padding: 26rpx 0;
			margin-bottom: 2rpx;
		}
	}
	.active {
		color: #E3AC72;
		position: relative;
		background-color: white;
		&::after{
			content: '';
			width: 6rpx;
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			background-color: #E3AC72;
		}
	}
	
	.detail-right {
		color: #999;
		background-color: #fff;
		align-self: flex-start;
		padding: 0 24rpx;
		.detail-right-li {
			padding: 10rpx 0;
			margin-bottom: 2rpx;
			view,text{
				flex: 1;
				text-align: center;
			}
		}
	}
</style>
