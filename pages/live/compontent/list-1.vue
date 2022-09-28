<!-- 分类 -->
<template>
	<view class="list">
		<view class="tabList">
			<view class="">
				<text :class="{'active':tabIndex == 0}" @click="setIndex(0)">足球</text>
				<text :class="{'active':tabIndex == 1}" @click="setIndex(1)">篮球</text>
			</view>
			<view class="index-time-type flex">
				<view class="index-time-type-i flex-center" :class="timeIndex==0?'index-time-type-li':''" @click="getTimeIndex(0)">
					<view>今日</view>
				</view>
				<view class="index-time-type-i flex-center" :class="index==timeIndex?'index-time-type-li':''"  @click="getTimeIndex(index)" v-for="(item,index) in dateTime" v-if="index!=0" :key="index">
					<view>{{item.data}}</view>
					<view>{{item.time}}</view>
				</view>
			</view>
		</view>
		
		<view class="list-li" v-for="(item,index) in list.data" :key="index" @click="goDetail(item)">
			<view class="list-li-title">
				{{item.competition}}
				<text>{{item.match_time}}</text>
			</view>
			<view class="list-li-content flex-center">
				<view class="list-li-content-i flex">
					<text class="text-clamp">{{item.home_team_name}}</text>
					<image :src="item.home_team_logo" mode=""></image>
				</view>
				<view class="list-li-content-VS">{{item.home_scores}}-{{item.away_scores}}</view>
				<view class="list-li-content-i flex">
					<image :src="item.away_team_logo" mode=""></image>
					<text  class="text-clamp">{{item.away_team_name}}</text>
				</view>
			</view>
			<!-- 0 未开始 2 已结束 -->
			<view class="list-status" :class="{'start':item.status_type == 0}">
				{{item.status_type == 0?'预约':item.status_str}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page:1,
				tabIndex:0,
				list:{},
				dateTime:[],
				timeIndex:0,
			}
		},
		mounted() {
			this.get6Days()
			this.getList(1)
		},
		methods:{
			goDetail(item){
				const userInfo = localStorage.getItem("userInfo")
					if(!userInfo){
						this.$u.toast("请先登录");
						return;
					}
				const url =this.tabIndex == 0?'../competition/detail?id=' + item.sourceid:'../competition/basketballDetail?id=' + item.sourceid;
				this.$navigateTo(url);

			},
			// 切换
			setIndex(index){
				this.tabIndex = index
				this.page = 1
				this.getList(index+1)
				
			},
			getTimeIndex(i){
				this.timeIndex = i
				this.page = 1
				this.list = {}
				
				this.getList(this.tabIndex)
			},
			/*  */
			get6Days() {//type==1前,2后
				//获取系统当前时间
				var now = new Date();
				var nowTime = now.getTime();
				var oneDayTime = 24 * 60 * 60 * 1000;
				let arr = []
				for (var i = 0; i < 6; i++) {
					//显示周一
					var ShowTime = nowTime + i * oneDayTime;
					
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
				this.dateTime = arr
			},
			getList(index){
				// 赛事/赛程
				let data = {
					page:this.page,
					match_type:index,
					date:this.dateTime[this.timeIndex].day
				}
				this.$u.post('/api/hot_match/schedule',data).then(res => {
					
					if(this.page == 1){
						this.list = res
					}else {
						this.list.data = [...this.list.data,...res.data]
					}
					console.log(res);
					if(this.list.data.length < res.total){
						this.page++
					}
				})
				
			}
		}
	}
</script>

<style lang="scss">
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
	.list {
		// height: 40vh;
		padding: 0 24rpx;
		padding-bottom: 200rpx;
		position: relative;
		margin-top: 22vh;
	}
	.list-li {
		overflow: hidden;
		padding: 0 24rpx;
		margin-bottom: 20rpx;
		text-align: center;
		border-radius: 12rpx;
		background-color: white;
		.list-li-title {
			color: #959DB0;
			font-size: 24rpx;
			position: relative;
			padding: 16rpx 0 12rpx 0;
			text {
				position: absolute;
				left: 0;
				
			}
		}
		.list-li-content {
			flex-wrap: nowrap;
			image {
				width: 44rpx;
				height: 44rpx;
				margin: 0 6rpx;
			}
		}
		.list-li-content-i {
			
			flex: 1;
			color: #333;
			font-size: 28rpx;
			text {
				max-width: 79px;
			}
		}
		.list-li-content-VS {
			color: #87390E;
			padding: 0 48rpx;
			font-size: 36rpx;
			font-weight: bold;
		}
		.list-status {
			color: #999;
			width: 136rpx;
			font-size: 24rpx;
			margin: 12rpx auto;
			padding: 8rpx 32rpx;
			border-radius: 40rpx;
			background-color: #F1F1F1;
		}
		.start {
			color: #87390E;
			background-color: #FFDFAB;
		}
	}
	.tabList {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 99;
		padding: 20rpx 0;
		// margin: 10rpx 0;
		text-align: center;
		background-color: #F3F3F7;
		text {
			color: #666;
			width: 100rpx;
			height: 44rpx;
			font-size: 28rpx;
			padding: 8rpx 22rpx;
			border-radius: 4rpx;
			
		}
		.active {
			color: #FFF;
			background: linear-gradient(90deg, #FFDFAB 0%, #E3AC72 100%);
		}
	}

</style>
