<template>
	<view class="privacy_page" >
		<view class="privacy_page_title">
			<image @click="onHandleBack" class="privacy_page_title_back" src="../../static/images/topic/topic-left.png" mode=""></image>
			隐私协议
		</view>
		<scroll-view class="privacy_page_context" scroll-y="true" >
			<div v-html="html" ></div>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				html:''
			};	
		},
		mounted() {
			// if(navigator.userAgent.indexOf('Mobile') > -1) {
				this.getList();
			// }else{
			// 	window.location.href = window.location.origin+"/about-user"
			// }
		},
		methods:{
			onHandleBack(){
				uni.navigateBack({
					delta:1
				})
			},
			// 获取协议
			async getList (){
				let res = await this.$u.get('/api/Portal_post/getList2?id=26');
				// console.log(res)
				if(res.length && res.length > 0){
					this.html = res[0].post_content;
				}
			}
		}
	}
</script>

<style lang="scss" scoped >
.privacy_page{
	width: 750rpx;
	min-height: 100vh;
	position: relative;
	background-color: #fff;
	padding-top: 118rpx;
	.privacy_page_title{
		background-color: #fff;
		z-index: 999;
		position: absolute;
		left: 0;
		top: 0;
		width: 750rpx;
		height: 88rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #222;
		font-size: 36rpx;
		font-weight: 700;
		border-bottom: 1px solid #eee;
		.privacy_page_title_back{
			position: absolute;
			width: 40rpx;
			height: 40rpx;
			left: 30rpx;
			top: 24rpx;
		}
	}
	.privacy_page_context{
		width: 750rpx;
		height: calc(100vh - 118rpx);
		padding: 0 30rpx;
		box-sizing: border-box;
	}
}
</style>
