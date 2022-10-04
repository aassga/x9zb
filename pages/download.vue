<!-- 下载 -->
<template>
	<view class="download1">
		<!-- <downloadHead></downloadHead> -->
		<image class="d-1" src="../static/images/download/d-t1.png" mode=""></image>
		<view class="" style="text-align: center;color: #67728F;font-size: 36rpx;font-weight: bold;margin-top: 12rpx;">
			<text>下载APP注册成为小九直播用户 \n 与主播互动抢千元红包</text>
		</view>
		
		<view @click.native="setChannelCode()">
			<a :href="system.androidDownloadUrl" class="download-btn" v-if="isAndroid">
				<!-- <image class="download-btn" src="../static/images/download/d-btn.png" mode="">
				</image> -->
				Android下载
			</a>
			<a :href="system.iosDownloadUrl" class="download-btn" v-else>
				iOS下载
			</a>
		</view>
		
		<view class="" style="text-align: center;color: #67728F;font-size: 36rpx;margin: 42rpx 0;">
			官网地址：{{system.official_website}}
		</view>
		<view class="" style="text-align: center;color: #D3B083;">
			【点击查看安装教程】
		</view>
		<!-- <image src="../static/images/download/d0.png" mode=""></image> -->
		<u-swiper :list="list" :effect3d="true" mode="none" height="908" img-mode="aspectFit" effect3d-previous-margin="150" bg-color=""></u-swiper>
		<view v-if="isAndroid">
			<image class="title1" src="../static/images/download/d-t0.png" mode=""></image>
		</view>
		<view v-else>
			<view class="install-tips">
				<text>IOS如何安装？</text>
			</view>
		</view>
		<view class="title2">
			需在同一网络环境下下载安装和注册，勿切换网络若无法
			正常下载，请使用手机自带浏览器打开（Chrome谷歌浏
			览器、Safari浏览器）
		</view>
		
		<view v-if="isAndroid">
			<view class="title3">
				<view>1. 点击本頁的「立即下载」选择「本地下载」</view>
				<view>2. APP下载完成后，选择允许安装应用，即可完成安装</view>
			</view>
			
			<image class="title4" src="../static/images/download/d-c1.png" mode=""></image>
			<image class="title4" src="../static/images/download/d-c0.png" mode=""></image>
		</view>
		<view v-else>
			<view class="title3">
				<view>1. APP 下载完成后，请打开「设置」</view>
				<view>2. 点选「设备管理」</view>
				<view>3. 点击「信任」APP 即完成设置</view>
			</view>

			<image class="title4" src="https://sta-fe.zkreen.com/download/img-jiaocheng-01@2x.png" mode=""></image>
			<image class="title4" src="../static/images/download/yanzheng.png" mode=""></image>
		</view>
		
		<view class="title5">
			<view>软体名称:{{system.app_name}}</view>
			<view>开发者名称:{{system.app_company}}</view>
			<view>版本号:{{system.app_version}}</view>
			<view>更新时间:{{system.app_updatedate}}</view>
			<br>
			<view>客服QQ：{{system.feedback_qq}}</view>
			<view>{{system.site_gwa}}{{system.site_icp}}</view>
		</view>
		<!-- <a :href="system.CustomerService">
			
			<image  class="title6" src="../static/images/download/d-kefu.png" mode=""></image>
		</a> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{image: '/static/images/download/d0.png'},
					{image: '/static/images/download/d1.png',},
					{image: '/static/images/download/d2.png',}
				],
				channel:localStorage.getItem('channel')
			}
		},
		mounted() {
			console.log('this.system')
			console.log(this.system)
			console.log('isAndroid', this.isAndroid);
			
			let query = this.$route.query
			for(const i in query) {
				if(i === 'channel_code'){
					this.channel = query[i]
				}
			}
		},
		computed:{
			system(){
				return this.$store.state.system
			},
			isAndroid() {
				return navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1
			}
		},
		methods:{
			setChannelCode(){
				// #ifndef H5
				uni.setClipboardData({
					data: this.channel,
				})
				// #endif
				
				// #ifdef H5
				let textarea = document.createElement("textarea")
				textarea.value = this.channel
				textarea.readOnly = "readOnly"
				document.body.appendChild(textarea)
				textarea.select()
				textarea.setSelectionRange(0,this.channel.length)
				let result = document.execCommand('copy')
				// #endif
			}
		}
	}
</script>

<style lang="scss" scoped>
	.download1 {
		overflow: hidden;
		padding-bottom: 100rpx;
		background: url(../static/images/download/d-bg.png)center top / 100% auto no-repeat;
	}
	.d-1 {
		width: 676rpx;
		height: 106rpx;
		display: block;
		margin: 0 auto;
		margin-top: 562rpx;
	}
	.download-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 420rpx;
		height: 96rpx;
		margin: 52rpx auto;
		border-radius: 4px;
		font-size: 34rpx;
		font-weight: bold;
		text-decoration: none;
		color: #87390e;
		background: linear-gradient(90deg, #FFDFAB 0%, #E3AC72 100%);
		box-shadow: 6rpx 6rpx 12rpx rgba(0, 0, 0, 0.16);
	}
	.install-tips {
		height: 80rpx;
		margin-top: 50rpx;
		margin-bottom: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		text {
			font-size: 50rpx;
			font-weight: 500;
			background-image: linear-gradient(180deg, #dfbd8d 22%, #ba946e 79%);
			font-stretch: normal;
			font-style: normal;
			line-height: normal;
			letter-spacing: normal;
			-webkit-background-clip: text;
			background-clip: text;
			-webkit-text-fill-color: transparent
		}
	}
	.title1 {
		width: 700rpx;
		height: 62rpx;
		display: block;
		margin: 110rpx auto;
	}
	.title2 {
		color: #8A93AC;
		padding: 0 24rpx;
		font-size: 28rpx;
		font-weight: bold;
	}
	.title3 {
		color: #8A93AC;
		padding: 0 24rpx;
		font-size: 24rpx;
		margin-top: 48rpx;
	}
	.title4 {
		width: 682rpx;
		height: 274rpx;
		display: block;
		margin: 0 auto;
		margin-top: 48rpx;
	}
	.title5 {
		color: #8A93AC;
		margin: 96rpx 0;
		font-size: 24rpx;
		text-align: center;
	}
	.title6 {
		position: fixed;
		width: 100%;
		bottom: 0;
		right: 0;
		left: 0;
		height: 176rpx;
	}
</style>
