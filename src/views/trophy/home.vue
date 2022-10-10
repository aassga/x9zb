<template>
	<div style="padding-top: 60px;">
		<div class="page-zIndex-one">
			<!-- 头部 -->
			<div class="page-zIndex-two">
				<div class="bot-bgImg"></div>
				<div class="js-nav-top">
					<div class="euro-nav">
						<div class="line-box"></div>
						<div class="nva-cont">
							<ul>
								<li class="nva-li" v-for="(item,index) in list" :key="index" @click="tabIndex = index">
									<a href="javascript:;" :class="{'border-white':index == tabIndex}">{{item}}</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="banner"><img src="https://static.leisu.com/public/img/world/logo-50165f6255.png"
						alt="2022卡塔尔世界杯">
					<div class="banner-h1">
						<h1>2022卡塔尔世界杯</h1>
						<p>2022年12月3日-12月18日</p>
					</div>
				</div>
			</div>
			<!-- 数据 -->
			<indexPage v-if="tabIndex == 0"></indexPage>
			<fixturesPage v-if="tabIndex == 1"></fixturesPage>
			<pointPage v-if="tabIndex == 2"></pointPage>
			<courtPage v-if="tabIndex == 5"></courtPage>
			
			
			<!-- <div class="world-qr-code">
				<i style="background:url(https://static.leisu.com/public/img/world/QR-1323ed818d.png)"></i>
				<a target="_blank" href="https://www.leisu.com/app">前往APP查看</a>
			</div> -->
		</div>
	</div>
</template>

<script>
	import pointPage from './point.vue'
	import indexPage from './index.vue'
	import courtPage from './court.vue'
	import fixturesPage from './fixtures.vue'
	// import indexPage from './index.vue'
	export default {
		components:{indexPage,fixturesPage,pointPage,courtPage},
		data() {
			return {
				tabIndex:0,
				list:[
					'世界杯首页',
					'赛程赛果',
					'积分榜',
					'资料库',
					'热点资讯',
					'球馆介绍'
				]
			}
		},
	}
</script>

<style>
	@import url("./home.css");
	@import url("./style.css");
</style>
