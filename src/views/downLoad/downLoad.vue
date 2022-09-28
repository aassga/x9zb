<!-- 下载 -->
<template>
	<div class="download-page" style="padding-top: 60px;z-index: 0;"><img class="download-page-bg"
			src="../../assets/images/download/bg.png" alt="">
		<div class="download-page-top">
			<div class="download-page-top-box">
				<section>
					<img class="imgTitle" src="../../assets/images/download/12.png" alt="">
					<div class="imgText">下载APP注册成为体育用户</div>
					<div class="imgtext">与主播互动抢千元红包</div>
					<div class="download-page-content">
						<div class="contentqr">
							<div class="qr">
								<div class="qr-info">
									<!-- <img  id="DownloadPageQRCode" style="width: 120px;height: 120px;" :src="system.android_qr_code" > -->
									<div id="qrcode" ref="qrcode"></div>
								</div>
							</div>
							<p class="qr-text">扫描二维码下载APP</p>
						</div>
						<div class="btn">
							<a :href="system.androidDownloadUrl">
							<div class="iconAnd download-app-btn-android">
								
									<img class="imgBtn" src="https://sta-fe.zkreen.com/download/icon-android@2x.png" alt="">
									<div class="imgText">Android下载</div>
								
							</div>
							</a>
							<a :href="system.iosDownloadUrl">
							<div class="iconIos download-app-btn-ios-firm"><img class="imgBtn"
									src="https://sta-fe.zkreen.com/download/icon-ios@3x.png" alt="">
								
									<div class="imgText">IOS下载</div>
								
							</div>
							</a>
							<a class="offWeb official-website-address"
								rel="noreferrer" :href="system.official_website">官网地址：{{system.official_website}}</a>
						</div>
					</div>
				</section>
			</div>
		</div>
		<div id="download_page_bottom" class="download-page-bottom">
			<div class="imgBoxs">
				<div class="box">
					<div class="text" style="margin-top:38px">魅力主播解说</div>
					<div class="cont">看比赛就要一起嗨</div>
					<img class="img"
						src="../../assets/images/download/1.png" alt="">
				</div>
				<div class="box">
					<div class="text">精准赛事分析</div>
					<div class="cont">专业解读精准分析</div>
					<img class="img"
						src="../../assets/images/download/2.png" alt="">
				</div>
				<div class="box">
					<div class="text">火爆体育社区</div>
					<div class="cont">志趣相投球友聚集地</div>
					<img class="img"
						src="../../assets/images/download/3.png" alt="">
				</div>
			</div>
			<div id="installation_tutorial" class="installation-tutorial">
				<div class="install-header">
					<h2>安装教程</h2><span>需在同一网络环境下下载安装和注册，勿切换网络若无法正常下载，请使用手机自带浏览器打开（Chrome谷歌浏览器、Safari浏览器）</span>
				</div>
				<div class="yellow-line"></div>
				<div class="install-tips"><img
						src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAUVBMVEUAAADNqX7Xsoa9mHHPq4DOqX67lm/fvY27lW/du4vcuYrbuInfvIzBnHTevIzMqH3cuovUsYS7lG7VsoXQrIDCnXXbt4nHo3nLp3y+mXHfvY2tcLS5AAAAEnRSTlMAOw2LVB/t79amjmy8tOHfzu7ykV2UAAACnklEQVRYw6SUDY+DIAyGi8EQPuJpWIjh///Qw574Zqxe7uxDdaUtLx0Lo38yRb8upMam2lALGZbRC4V6kkjDlGonqnSWemFIQYLOqjsfYBU6cwWJFHjouFnfkP6k43BA+p/MGVLhTh0/k47KJENalrqk+KSb2Qafkg92Gi+KDck1Vh/NH/661lpqYZxvWkgkVytnWkFdwvyrTHCl13K984YT1juO8nPuEya6wyylwZXA+dBUIIOKxZBMwOp6DlCvp0IykoQv7+Qig6ysFDiL0YDznsmQsjQShxYwleK5Bz0NzNjxABPMy+A3E77amjtQA0X0y2ZoxOYHQAes+QGWPjD5lZtJ3McDfeK5/EftxXT/jF9zfG7SDdlegFfBvyVKd6ytgB3Azze2kUC8NoeTd7ahMfiBBMKR2Y8XnL0bQt3nmSWBr8/SLrIj9R6dZKGds32gJX6JcRKFvlsvoxWJQRiKRtOKL7JQGGz//0c3DZU7tbdQt3vMTGK8hkSYh1mdQ0NjwwLkf3ghOwKIse24LzQML1RrXetq5t5AfOdX/th25jSP+HY/C6HssqZcEbvj+zrxQuMUIWg1Pk3y2Q0J5MAeR/ZbgxrmCWxwcmhVrgS/Y+a+g+ZtS5+70xzOV5evbk5hr31t4gFkOCWyB4Un6QmW3WyZ4WMc2d13OVu0p/QlMoP4uEdzZiX2s20NOx3gk7rxwvZnspzI27Jsy+YsHp/8AfbQajcbtLjX3bdvQpATMe06XwiwGtcDTEZaotx0hMdGS+OgoYGWAGnodUtZCNMyThBGWUZRocyjw6UonOnlYEDfDQZiHqhTBLx5pjzLv1RKqMMJ6VmdIDJUKWuYo8Q5aHo4F5hLkycNAr5qaZRHBM0pZSX/1zXnXPTazi+yKug/zYZy3AAAAABJRU5ErkJggg=="
						alt=""><span>IOS如何安装？</span></div>
				<div class="ios-step-des-container">
					<div class="step-description">1. APP 下载完成后，请打开「设置」
						<!-- -->&gt;
						<!-- -->点选「通用」选项
					</div>
					<div class="step-description">2. 点选「设备管理」</div>
					<div class="step-description">3. 点击「信任」APP 即完成设置</div>
				</div>
				<div class="step-description-img">
					<img class="ios-step-img-1" style="height: 234px;" src="https://sta-fe.zkreen.com/download/img-jiaocheng-01@2x.png" alt="">
					<img class="ios-step-img-2" style="height: 234px;" src="../../assets/images/download/yanzheng.png" alt="">
				</div>
				<div class="yellow-line"></div>
				<div class="install-tips"><img
						src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAVFBMVEUAAADcuovdu4zNqX7RrYHauYq9l3DKpnzDnnW7lG/Tr4Lcuou8lnC+l3HfvY3cuYvgvo7gvo67lW/gvY7YtYe8lW/VsoXfvY3Pq3/HonjCnHTLp3wat3uYAAAAFXRSTlMASt3SLhClhrbftYR8Ur5q9Zrv5+Ss2B1GAAACmklEQVRYw9SSYYvDIAyG1YscTFBLixH6///nTfteM1mluvt0j8XFRJ+lVNXD0HVeGzXHYuxV2pplQoITPf8kmvVVktQ0brVKWR3c4v3igi6r1akPMD74yCfxufSfeKznN7yd94TIF8QwqSHDHTzNeHTkLlFPeLiwUFgbhaMQp0xU+/EwnpQb6mpPNHqpz3PEL4TTPHi9HVdWW0OAFj1ecqihyDAtnhvMmYh2tKE+4y2tPIC59xAPQbeiwJxkYNEOfMIbnBkiqH+D1YFqQHoIbA7ath69pZR8qbo0xKNo/DPYdPPNU2WzMyK7HSEp4YGymxG5MxTgljJjegfph/z7poQEvn5FGdMVGaKvBDqi3mnRiii/iXIZVfRdy/JgVGQlHeVWVPfkQ4TdraNd5kOEvBJyIR2iuv2WIsrgVYSzVQSSzAm/KLSi1IiAiKY76ov2v4v207LLAxDuHdFP+2S06jAIBFGhxqsQKQg+rP7/f96ODqySUs1joccEd6R7sqGkdrqINdpZq5fnXVTJKGILRKwVjYp0EZSzqEHRFv79RCJSpVaBSPjMyrP3O19NsCZRFdBEHfxeS2YFEwm5TEQRSj6Xa8xcELGeRYAitAzUwkjqYqJRVGSm8GbxUVTaogiRDRToQalIFOF0Enm6HSfixX4a9OoTOQEolWf7fRH7EhXWupin/dVtWy7yNAOu4Og0EKEqM9cDjHGiEGcmon+4aCjawLcm9/BounBLtOLMORcsbhqmtRb99S7cvIBWLLYmKliLoTZfjTf7x8C4OxHQXYM+wy1FMW9xmiV+xxOOteg4A8gkhUaasoNnD5uJ0/+gEXv+iX6i7xSZNH+dMRN7V+TmxoPiYO5yBB1IR0rW3De5kHzUbF368NX/A3pp2ui1tNK9AAAAAElFTkSuQmCC"
						alt=""><span>Android如何安装？</span></div>
				<div class="android-step-des-container">
					<div class="step-description">1. 点击本頁的「立即下载」选择「本地下载」</div>
					<div class="step-description">2. APP下载完成后，选择允许安装应用，即可完成安装</div>
				</div>
				<div class="step-description-img">
					<img class="android-step-img-1" style="height: 234px;" src="../../assets/images/download/download.png" alt="">
					<img class="android-step-img-2" style="height: 234px;" src="https://sta-fe.zkreen.com/download/img-jiaocheng-04@2x.png"alt=""></div>
			</div>
		</div>
	</div>
</template>

<script>
import QRCode from 'qrcodejs2';
	export default {
		components:{QRCode},
		data() {
			return {
				appUrl: location.protocol + "//" + window.location.host + "/m/#/pages/download",
				channel: localStorage.getItem("channel")
			}
		},
		computed:{
			system(){
				return this.$store.state.system
			}
		},
		mounted() {
			window.scrollTo(0,0);
			this.showQRcode()
		},
		methods: {
			qrcode(qWidth,qHeight,qText,qRender) {
				let qrcode = new QRCode("qrcode",{
					width: qWidth,
					height: qHeight,
					text: qText,
					render: qRender
				})
			},
			showQRcode() {
				const appUrl = this.channel ? this.appUrl + '?channel_code=' + this.channel : this.appUrl 
				this.$refs.qrcode.innerHTML = "";
				this.$nextTick(()=>{
					this.qrcode(124,124,appUrl,"canvas")
				})
			}
		}
	}
</script>

<style>
	.download-page .show-more-block>img {
		width: 3.2vw;
		margin-top: 3px
	}
	
	.download-page .download-page-top {
		padding-top: 80px;
		width: 100%;
		position: relative;
	}
	
	.download-page .download-page-top-box {
		max-width: 1100px;
		margin: 0 auto;
		display: flex;
		flex-direction: row-reverse;
		position: relative;
		box-sizing: border-box
	}
	
	.download-page .download-page-top-box .qiuyuan {
		width: 582px;
		height: 508px;
		position: absolute;
		right: 500px;
		z-index: 2;
		padding-top: 57px
	}
	
	.download-page .download-page-top-box section {
		width: 500px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 5
	}
	
	.download-page .download-page-top-box section .logo {
		width: 180px
	}
	
	.download-page .download-page-top-box section .imgTitle {
		width: 608px;
		height: 108px;
		margin: 32px 0 0
	}
	
	.download-page .download-page-top-box section .imgText {
		max-width: 504px
	}
	
	.download-page .download-page-top-box section .imgText,
	.download-page .download-page-top-box section .imgtext {
		font-size: 28px;
		font-stretch: normal;
		font-style: normal;
		letter-spacing: normal;
		text-align: center;
		color: #67728f;
		font-weight: 700
	}
	
	.download-page .download-page-top-box section .imgtext {
		max-width: 598px;
		line-height: normal;
		margin-bottom: 20px
	}
	
	.download-page .Unqiuyuan {
		display: none
	}
	
	.download-page .download-page-content {
		width: 100%;
		height: 270px;
		display: flex;
		justify-content: space-between;
		position: relative;
		box-sizing: border-box;
		padding: 0 30px
	}
	
	.download-page .btn,
	.download-page .qr {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center
	}
	
	.download-page .btn {
		justify-content: flex-start;
		padding-top: 7px;
		box-sizing: border-box;
		top: 0;
		right: 0
	}
	
	.download-page .btn .download-app-btn-android {
		margin: 4px 0 13px
	}
	
	.download-page .btn .download-app-btn-ios-firm {
		margin-bottom: 8px
	}
	
	.download-page .qr-info {
		width: 194px;
		height: 194px;
		border-radius: 15px;
		background-image: url(data:image/png;base64,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);
		background-size: 100% 100%;
		display: flex;
		justify-content: center;
		align-items: center
	}
	
	.download-page .download-page-top-box section .download-page-content .btn-text,
	.download-page .download-page-top-box section .download-page-content .qr-text {
		height: 23px;
		font-size: 16px;
		font-weight: 400;
		font-stretch: normal;
		font-style: normal;
		line-height: normal;
		letter-spacing: normal;
		text-align: center;
		color: #67728f
	}
	
	.download-page .download-page-top-box section .download-page-content .btn .iconAnd,
	.download-page .download-page-top-box section .download-page-content .btn .iconIos {
		width: 230px;
		height: 80px;
		box-sizing: border-box;
		padding: 0 15px 7px;
		border-radius: 12px;
		background-image: url(data:image/png;base64,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);
		background-size: 100% 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer
	}
	
	.download-page .download-page-top-box section .download-page-content .btn .iconAnd .imgBtn,
	.download-page .download-page-top-box section .download-page-content .btn .iconIos .imgBtn {
		width: 30px;
		height: 30px
	}
	
	.download-page .download-page-top-box section .download-page-content .btn .iconAnd .imgText,
	.download-page .download-page-top-box section .download-page-content .btn .iconIos .imgText {
		height: 17px;
		font-size: 14px;
		font-weight: 400;
		color: #fff;
		margin-left: 7px
	}
	
	.download-page .download-page-top-box section .download-page-content .btn .iconIos {
		background-image: url(data:image/png;base64,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);
		background-size: 100% 100%
	}
	
	.download-page .download-page-top-box section .download-page-content .btn .iconAnd:hover {
		/* background-image: url(/_next/static/images/but-03_2@2x-dcaffdeed81b83b18dba8a547dc96d31.png); */
		background-size: 100% 100%
	}
	
	.download-page .download-page-top-box section .download-page-content .btn .iconIos:hover {
		background-image: url(data:image/png;base64,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);
		background-size: 100% 100%
	}
	
	.download-page .offWeb {
		height: 18px;
		font-size: 16px;
		font-weight: 500;
		font-stretch: normal;
		font-style: normal;
		line-height: normal;
		letter-spacing: normal;
		text-align: center;
		color: #67728f
	}
	
	.download-page .download-page-bottom {
		width: 100%;
		position: relative;
	}
	
	.download-page .download-page-bottom .imgBoxs {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		justify-content: space-around;
		align-items: center
	}
	
	.download-page .download-page-bottom .imgBoxs .img {
		width: 300px
	}
	
	.download-page .download-page-bottom .imgBoxs .text {
		height: 42px;
		background-image: linear-gradient(180deg, #dfbd8d 22%, #ba946e 79%);
		font-size: 30px;
		font-weight: 500;
		font-stretch: normal;
		font-style: normal;
		line-height: normal;
		letter-spacing: normal;
		text-align: center;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		margin-top: 38px
	}
	
	.download-page .download-page-bottom .imgBoxs .cont {
		font-size: 18px;
		font-weight: 500;
		font-stretch: normal;
		font-style: normal;
		line-height: normal;
		letter-spacing: normal;
		text-align: center;
		color: #67728f;
		margin-bottom: 26px
	}
	
	.download-page .download-page-bottom .installation-tutorial {
		max-width: 1200px;
		margin-left: auto;
		margin-right: auto
	}
	
	.download-page .download-page-bottom .installation-tutorial .yellow-line {
		width: 100%;
		height: 1px;
		background: #e0be90
	}
	
	.download-page .download-page-bottom .installation-tutorial .install-header {
		min-height: 70px;
		padding-left: 10px;
		display: flex;
		font-weight: 500;
		padding-top: 13px;
		box-sizing: border-box
	}
	
	.download-page .download-page-bottom .installation-tutorial .install-header h2 {
		color: #67728f;
		font-size: 30px;
		margin-right: 20px;
		min-width: 120px
	}
	
	.download-page .download-page-bottom .installation-tutorial .install-header span {
		display: inline-block;
		width: 643px;
		color: #67728f;
		font-size: 16px;
		padding-top: 5px
	}
	
	.download-page .download-page-bottom .installation-tutorial .install-tips {
		height: 42px;
		padding-left: 10px;
		margin-top: 30px;
		margin-bottom: 18px;
		display: flex;
		align-items: center
	}
	
	.download-page .download-page-bottom .installation-tutorial .install-tips>span {
		font-size: 30px;
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
	
	.download-page .download-page-bottom .installation-tutorial .install-tips>img {
		width: 34px;
		height: 35px;
		margin-right: 10px
	}
	
	.download-page .download-page-bottom .installation-tutorial .ios-step-des-container {
		height: 100px;
		display: flex;
		flex-direction: column;
		justify-content: space-between
	}
	
	.download-page .download-page-bottom .installation-tutorial .android-step-des-container {
		height: 60px;
		display: flex;
		flex-direction: column;
		justify-content: space-between
	}
	
	.download-page .download-page-bottom .installation-tutorial .step-description {
		font-size: 18px;
		font-weight: 500;
		color: #67728f;
		padding-left: 10px
	}
	
	.download-page .download-page-bottom .installation-tutorial .step-description-img {
		padding-top: 33px;
		padding-bottom: 50px;
		display: flex;
		justify-content: space-between
	}
	
	.download-page .download-page-bottom .installation-tutorial .step-description-img .ios-step-img-1 {
		width: 576px;
		margin-left: 13px
	}
	
	.download-page .download-page-bottom .installation-tutorial .step-description-img .ios-step-img-2 {
		width: 597px
	}
	
	.download-page .download-page-bottom .installation-tutorial .step-description-img .android-step-img-1 {
		width: 582px
	}
	
	.download-page .download-page-bottom .installation-tutorial .step-description-img .android-step-img-2 {
		width: 560px;
		margin-right: 8px
	}
	
	.download-page .download-page-bottom footer {
		max-width: 1200px;
		padding-bottom: 30px;
		margin: 0 auto;
		font-size: 16px;
		font-weight: 500;
		font-stretch: normal;
		font-style: normal;
		line-height: normal;
		letter-spacing: normal;
		text-align: center;
		color: #67728f
	}
	.download-page .download-page-bg {
	    width: 100%;
	    position: absolute;
	    left: 50%;
		/* top: 10%; */
	    transform: translateX(-50%);
	}
	.download-page .download-page-top-box section .imgTitle {
		    width: 670px;
		    height: 108px;
		    margin: 32px 0 24px 114px;
	}
</style>
