<!-- 文章详情 -->
<template>
	<view class="detail">
		<downloadHead v-if="show1"></downloadHead>
		<view class="detail-head flex"  v-if="detail.info" :style="{marginTop:show1?'104rpx':'0'}">
			<image class="detail-head-left" @click="$u.route({type:'back'})" src="/static/images/topic/topic-left.png" mode=""></image>
			<image class="detail-head-logo" :src="detail.info.avatar" mode=""></image>
			<view class="detail-head-name">{{detail.info.user_nickname}}</view>
			<image src="/static/images/topic/topic3.png" mode="" @click="$navigateTo('../download')"></image>
			<view class="detail-head-status" @click="$navigateTo('../download')">
				关注
			</view>
		</view>
		<view class="detail-comtent">
			<view class="" style="width: 100%;overflow: hidden;" v-if="detail.info" v-html="detail.info.content"></view>
			<!-- <view class="detail-link flex-start">
				<view class="flex-start">
					<image src="/static/images/topic/topic8.png" mode=""></image>
					<text>世界杯</text>
				</view>
			</view> -->
		</view>
		
		<!-- 相关文章 -->
		<view class="detail-article">
			<view class="detail-article-title">
				相关文章
			</view>
			<view class="detail-article-li flex" @click="navigate(item)" v-for="(item,index) in detail.recommend" :key="index">
				<view class="text-clamp2">
					{{item.title}}
				</view>
				<image :src="item.img" mode="aspectFill"></image>
			</view>
		</view>
		<view class="detail-common flex" @click="$navigateTo('../download')">
			<view class="flex-start">
				<image src="/static/images/topic/topic9.png" mode=""></image>
				<text>我也来说几句...</text>
			</view>
			<image src="/static/images/topic/topic7.png" mode=""></image>
			<image src="/static/images/topic/topic4.png" mode=""></image>
			<text v-if="detail.info">{{detail.info.click}}</text>
			<image src="/static/images/topic/topic1.png" mode=""></image>
			<image src="/static/images/topic/topic2.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail:{}
			}
		},
		mounted() {
			
			
		},
		computed:{
			show1:{
				get() {
					return this.$store.state.show
				},
				set() {
					// this.$store.state.info.midMask = !this.$store.state.info.midMask
				}
			}
		},
		onLoad(optin) {
			this.$u.get('/api/Headlines/getInfo', {id:optin.id}).then(res => {
				this.detail = res
			})
		},
		methods:{
			navigate(item){
				// console.log(item);
				this.$u.get('/api/Headlines/getInfo', {id:item.id}).then(res => {
					this.detail = res
					uni.pageScrollTo({ 　　　　　　
				　　　　duration: 0,//过渡时间必须为0，否则运行到手机会报错
				　　　　scrollTop: 0 //滚动到实际距离是元素距离顶部的距离减去最外层盒子的滚动距离（如res.top - data.top）
				　　})
				})
			}
		}
	}
</script>

<style>
	.detail-comtent>>>img {
		height: auto !important;
		width: 100% !important;
	}
</style>
<style lang="scss" scoped>
	.detail-head {
		padding: 14rpx 24rpx;
		background-color: white;
		border-bottom: 2rpx solid #F0F0F0;
		image {
			width: 60rpx;
			height: 60rpx;
			margin-right: 20rpx;
		}
		.detail-head-left {
			width: 60rpx;
			height: 60rpx;
			margin-right: 32rpx;
		}
		.detail-head-logo {
			width: 72rpx;
			height: 72rpx;
			border-radius: 50%;
			margin-right: 16rpx;
		}
		.detail-head-name {
			flex: 1;
			font-size: 28rpx;
			
		}
		.detail-head-status {
			color: #fff;
			font-size: 24rpx;
			border-radius: 6rpx;
			padding: 10rpx 26rpx;
			border: 2rpx solid #F1F1F1;
			background: linear-gradient(90deg, #FFDFAB 0%, #E3AC72 100%);
		}
	}
	.detail-comtent {
		padding: 32rpx 24rpx;
		background-color: white;
		.detail-link {
			margin-top: 96rpx;
			view {
				width: 154rpx;
				color: #999;
				text-align: center;
				border-radius: 12rpx;
				padding: 12rpx 16rpx;
				background-color: #F1F1F1;
				image {
					width: 32rpx;
					height: 32rpx;
					margin-right: 6rpx;
					border-radius: 6rpx;
				}
			}
		}
	}
	.detail-article {
		padding: 0 24rpx;
		margin-top: 20rpx;
		padding-bottom: 120rpx;
		background-color: white;
		
		.detail-article-title {
			color: #333;
			font-size: 32rpx;
			font-weight: bold;
			padding-top: 32rpx;
			
		}
		.detail-article-li {
			padding: 30rpx 0;
			border-bottom: 2rpx solid #F0F0F0;
			view {
				flex: 1;
				color: #333;
				font-size: 32rpx;
				margin-right: 90rpx;
			}
			image {
				width: 242rpx;
				height: 136rpx;
				border-radius: 12rpx;
			}
		}
	}

	.detail-common {
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		background-color: white;
		padding: 18rpx 28rpx;
		image {
			width: 60rpx;
			height: 60rpx;
			margin-left: 16rpx;
		}
		text {
			color: #999;
		}
		view {
			color: #999;
			font-size: 28rpx;
			border-radius: 12rpx;
			padding: 22rpx 32rpx;
			background-color: #F5F5F5;
			image {
				width: 28rpx;
				height: 28rpx;
				margin-right: 32rpx;
			}
		}
	}
	
</style>
