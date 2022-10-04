<!-- 设置 -->
<template>
	<view class="setting">
		<downloadHead v-if="show1"></downloadHead>
		<view class="back" @click="$u.route({type:'back'})" :style="{top:show1?'116rpx':'0'}">
			<image src="../../static/images/topic/topic-left.png" mode=""></image>
			<text>设置</text>
		</view>
		
		<view class="setting-li"  @click="show = true">
			<view class="setting-li-i flex">
				<text>支付密码</text>
				<image src="/static/images/home/home-right.png" mode=""></image>
			</view>
		</view>
		<view class="setting-li"  @click="show = true">
			<view class="setting-li-i flex">
				<text>悬浮窗播放</text>
				<switch :checked="false" color="#E3AC72" @change="" />
			</view>
		</view>
		<view class="setting-li"  @click="show = true">
			<view class="setting-li-i flex border">
				<text>检查更新</text>
				<image src="/static/images/home/home-right.png" mode=""></image>
			</view>
			<view class="setting-li-i flex">
				<text>关于我们</text>
				<image src="/static/images/home/home-right.png" mode=""></image>
			</view>
		</view>
		<view class="setting-li" @click="show = true">
			<view class="setting-li-i flex border">
				<text>修改密码</text>
				<image src="/static/images/home/home-right.png" mode=""></image>
			</view>
			<view class="setting-li-i flex">
				<text>注销账号</text>
				<image src="/static/images/home/home-right.png" mode=""></image>
			</view>
		</view>
		<u-popup v-model="show" mode="center" border-radius="20" :closeable="true">
			<view class="todownload-box">
				<view class="close-btn">
					
				</view>
				<view class="todownload-title">赶紧去下载小九直播APP</view>
				<view class="todownload-subtitle">
					收获完整内容体验～
				</view>
				<view class="todownload-btn">立即下载</view>
			</view>
		</u-popup>
		<view class="setting-li-i" @click="getOut()" style="background-color: white;margin-top: 48rpx;border-radius: 14rpx;color: #FF7B7F;text-align: center;">
			退出登录
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false
			}
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
		methods:{
			getOut(){
				this.$store.state.info = {}
				this.$common.del('information')
				uni.removeStorageSync('token')
				uni.reLaunch({
					url:'../login/index'
				})
				localStorage.removeItem("userInfo");
				let userid = 10000000 + Math.random().toString().slice(-6);
				localStorage.setItem("userid", userid);
			}
		}
	}
</script>

<style lang="scss">
	.back {
		height: 96rpx;
		padding: 0 24rpx;
		position: fixed;
		left: 0;
		right: 0;
		top: 112rpx;
		background-color: white;
		text {
			width: 100%;
			color: #333;
			display: block;
			font-size: 34rpx;
			line-height: 96rpx;
			text-align: center;
		}
		image {
			position: absolute;
			width: 60rpx;
			height: 60rpx;
			left: 24rpx;
			top: 18rpx;
			
		}
	}
	
	.setting {
		padding: 0 24rpx;
		padding-top: 100rpx;
	}
	.border {
		border-bottom: 2rpx solid #E9E9E9;
	}
	.setting-li {
		margin-top: 20rpx;
		border-radius: 12rpx;
		background-color: white;
	}
	.setting-li-i {
		font-size: 28rpx;
		padding: 40rpx 24rpx;
		image {
			width: 48rpx;
			height: 48rpx;
			
		}
		switch {
			transform: scale(.6);
		}
	}
</style>
