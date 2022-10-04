<!-- 首页-赛事 -->
<template>
	<view class="index" @touchmove.stop.prevent="clear" :style="{top:show1?'116rpx':'0'}">
		<downloadHead v-if="show1"></downloadHead>
		<view class="" style="padding: 0 254rpx;background: #fff;">
			<u-tabs :list="tabList" :is-scroll="false" gutter="400" :active-item-style="style" font-size="34" active-color="#E3AC72" :current="current"
				@change="change"></u-tabs>
		</view>
		<view class="index-tab flex-center">
			<view class="" v-for="(item,index) in tablist1" @click="curNow=index" :class="curNow==index?'tabActive':''">
				{{item.name}}
			</view>
		</view>
		<!-- <view class="index-time flex-center" v-if="curNow==1||curNow==0">
			2021-05-25
		</view> -->
		<view class="index-time-type flex" v-if="curNow==2">
			<view class="index-time-type-i flex-center" :class="timeIndex==0?'index-time-type-li':''" @click="timeIndex=0">
				<view>今日</view>
			</view>
			<view class="index-time-type-i flex-center" :class="index==timeIndex?'index-time-type-li':''"  @click="timeIndex=index" v-for="(item,index) in dateTime" v-if="index!=0" :key="index">
				<view>{{item.data}}</view>
				<view>{{item.time}}</view>
			</view>
		</view>
		<view class="index-time-type flex" v-if="curNow==3">
			<view class="index-time-type-i flex-center" :class="index==timeIndex?'index-time-type-li':''"  @click="timeIndex=index" v-for="(item,index) in dateTime" v-if="index!=5" :key="index">
				<view>{{item.data}}</view>
				<view>{{item.time}}</view>
			</view>
			<view class="index-time-type-i flex-center" :class="timeIndex==5?'index-time-type-li':''" @click="timeIndex=5">
				<view>今日</view>
			</view>
		</view>
		<view class="list">
			<scroll-view scroll-y style="width: 100%;" :style="{height:height+'px'}" class="scroll" @scrolltolower="onreachBottom">
				<!-- 完整 || 赛程 -->
				<football :footballList='footballList' v-if="current==0" :loadStatus="loadStatus" :curNow="curNow"></football>
				<basketball :baskballList="baskballList" :loadStatus="loadStatus" v-if="current==1"></basketball>
			</scroll-view>
		</view>
		<image class="ball-top" src="/static/images/competition/basketball5.png" mode=""></image>
	</view>
</template>

<script>
	import football from './compontent/football.vue'
	import basketball from './compontent/basketball.vue'
	export default {
		components:{football,basketball},
		data() {
			return {
				style:{
					// fontSize:'40rpx'
				},
				curNow: 0, //二级
				current: 0, //一级切换
				dateTime:[],
				timeIndex:null,
				swiperCurrent: 0,
				tabList: [{
					name: '足球'
				}, {
					name: '篮球'
				}],
				tablist1: [{
						name: '完整'
					},
					{
						name: '已开赛'
					},
					{
						name: '赛程'
					},
					{
						name: '赛果'
					}
				],
				footballList:[],
				baskballList:[],
				loadStatus:"more",
				page:1,
				limit:20,
				height:null
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
		onLoad() {
			this.get6Days()
			this.getFootballList()
			uni.getSystemInfo({
				success: (res)=> {
					this.height= res.windowHeight-uni.upx2px(284) //获取系统信息，可使用窗口的高度
					
				}
			});
		},
		watch: {
			current(e){
				this.reset()
				if(e == 0){
					this.getFootballList()
				}else{
					this.getBaskballList()
				}
				
			},
			timeIndex(e){
				this.reset()
				if(this.current == 0){
					this.getFootballList()
				}else{
					this.getBaskballList()
				}
				
			},
			curNow(e) {
				this.reset()
				this.swiperCurrent = e
				// 重置日期
				if(e == 2){
					this.get6Days(1)
					this.timeIndex = 0
				}else if(e==3){
					this.get6Days(2)
					this.timeIndex = 5
				}
				// this.timeIndex = 5 || 0 时不用请求
				// if(this.current == 0 && this.timeIndex != 5 && this.timeIndex != 0){
				// 	this.getFootballList()
				// 	// this.timeIndex = null
				// }else if(this.current == 1 && this.timeIndex != 5 && this.timeIndex != 0){
				// 	this.getBaskballList()
				// }
				if(this.current == 0){
					this.getFootballList()
				}else {
					this.getBaskballList()
				}
			},
			
		},
		methods: {
			reset(){
				this.page = 1
				this.footballList = []
				this.baskballList = []
			},
			// 获取足球列表
			getBaskballList(){
				let data = {
					page:this.page,
					type: this.curNow
				}
				if(data.type == 2 || data.type == 3){
					data.time = this.dateTime[this.timeIndex].day
				}else{
					data.time = '0'
				}
				this.$u.get('/api/Basketball/getList', data).then(res => {
					// res为服务端返回的数据
					// this.baskballList = res
					this.baskballList = [...this.baskballList, ... res.data]
					// 判断所有数据是否请求完毕
					if (res.total > this.baskballList.length) {
						this.page++
						this.loadStatus = 'more'
					} else {
						this.loadStatus = 'noMore'
					}
				})
			},
			// 获取篮球列表
			getFootballList(){
				let data = {
					page:this.page,
					type: this.curNow
				}
				if(data.type == 2 || data.type == 3){
					data.time = this.dateTime[this.timeIndex].day
				}else{
					// data.time = ''
				}
				this.$u.get('/api/Football/football_match', data).then(res => {
					// res为服务端返回的数据
					this.footballList = [...this.footballList, ... res.data]
					if (res.total > this.footballList.length) {
						this.page++
						this.loadStatus = 'more'
					} else {
						this.loadStatus = 'noMore'
					}
				})
			},
			
			
			get6Days(type) {//type==1前,2后
				//获取系统当前时间
				var now = new Date();
				var nowTime = now.getTime();
				var oneDayTime = 24 * 60 * 60 * 1000;
				let arr = []
				for (var i = 0; i < 6; i++) {
					//显示周一
					if(type == 1){
						
						var ShowTime = nowTime + i * oneDayTime;
					}else {
						var ShowTime = nowTime - i * oneDayTime;
					}
					
					//                    var ShowTime = nowTime + (i+1)*oneDayTime ; 
					//初始化日期时间
					var myDate = new Date(ShowTime);
					var year = myDate.getFullYear();
					var month = myDate.getMonth() + 1;
					var date = myDate.getDate();
					var str = "星期" + "日一二三四五六".charAt(myDate.getDay());
					arr.push({
						data:month + "/" + date.toString().padStart(2,'0'),
						time:str,
						day:year + '-' + month + '-' +date
					})
				}
				if(type == 1){
					this.dateTime = arr
				}else{
					this.dateTime = arr.reverse()
				}
			},
			clear() {
				return
			},
			sectionChange(index) {
				// this.curNow = index
			},
			name() {
				
			},
			change(index) {
				console.log(index);
				this.current = index;
			},
			transition(e) {
				let dx = e.detail.dx;
			},
			// 触底加载
			onreachBottom(e) {
				if (this.loadStatus == 'more') {
					if(this.current == 0){
						this.getFootballList()
					}else{
						this.getBaskballList()
					}
				}
			}
		},
	}
</script>

<style lang="scss">
	// page,body{
	// 	overflow: hidden;
	// }
	* {
		touch-action: none;
		touch-action: pan-y;
	}
	.index-time-type {
		color: #999;
		margin: 20rpx 0;
		padding: 0 24rpx;
		font-size: 24rpx;
		text-align: center;
		.index-time-type-li {
			color: #87390E;
			background-color: #FFF1E0;
		}
		.index-time-type-i {
			width: 104rpx;
			height: 86rpx;
		}
	}
	.scroll::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: transparent !important;
	}

	.index {
		position: fixed;
		top: 112rpx;
		bottom: 0;
		right: 0;
		left: 0;
		overflow: hidden;
		height: calc(100vh - 106px) !important;
	}

	.index-tab {
		padding: 18rpx 0;
		background-color: white;
		border-top: 2rpx solid #F1F1F1;

		view {
			color: #666;
			margin: 0 20rpx;
			font-size: 28rpx;
			padding: 8rpx 24rpx;
		}

		.tabActive {
			color: #E3AC72;
			font-weight: bold;
			background: #FFF1E0;
			border-radius: 26rpx;
		}
	}

	.index-time {
		color: #666;
		font-size: 24rpx;
		padding-top: 20rpx;
	}

	// 列表
	.list {
		height: 100%;
	}

	
</style>
