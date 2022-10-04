<!-- 篮球详情 -->
<template>
	<view class="detail">
		<downloadHead  v-if="show1"></downloadHead>
		<view class="detail-video flex" :style="{marginTop:show1?'100rpx':'0'}">
			<view class="detail-navBar flex-wrap">
				 <image src="/static/images/competition/right.png" @click="$u.route({type:'back'})" mode=""></image>
				 <view class="detail-navBar-center">
				 	<view>{{base.short_name_zh}}</view>
					<view>{{base.match_time}}</view>
				 </view>
				 <image src="/static/images/competition/dian.png" mode=""></image>
			</view>
			<view class="detail-vs flex" v-if="base.home_team_data">
				<view class="detail-vs-left">
					<image :src="base.home_team_data.logo" mode=""></image>
					<view v-if="base.home_team_data">{{base.home_team_data.short_name_zh}}</view>
				</view>
				<view class="detail-vs-center">
					<view>{{base.status_name}}</view>
					<view class="detail-vs-num">{{base.home_scores_total}}-{{base.away_scores_total}}</view>
				</view>
				<view class="detail-vs-left">
					<image :src="base.away_team_data.logo" mode=""></image>
					<view v-if="base.away_team_data">{{base.away_team_data.short_name_zh}}</view>
				</view>
			</view>
			<view class="detail-video-btn flex">
				<text v-if="base.mlive == 1">动画直播</text> <text v-if="base.mlive == 1">|</text> <text>视频直播</text>
			</view>
		</view>
		<!-- 切换 -->
		<u-tabs :list="tabList" :is-scroll="true" font-size="28" item-width="calc(100%/4)" active-color="#E3AC72" :current="current" @change="change"></u-tabs>
		<basketball1 :base="base" :comList="comList" class="" v-show="current==0"></basketball1>
		<detail2 :base="base" ref="detail2"  v-show="current==1"></detail2>
		<!-- <detail4 :base="base" ref="detail3" v-show="current==2"></detail4> -->
		<detail5 :base="base" ref="detail4" v-show="current==2"></detail5>
	</view>
</template>

<script>
	import basketball1 from './compontent/basketball-1.vue'
	import detail2 from './compontent/detail-2.vue'
	import detail4 from './compontent/detail-4.vue'
	import detail5 from './compontent/detail-5.vue'
	import {
		getQueryString
	} from '@/common/Qs'
	export default {
		components:{basketball1,detail2,detail4,detail5},
		data() {
			return {
				current:0,
				comList:[],
				tabList: [
				{
					name: '赛况'
				}, 
				{
					name: '直播'
				},
				// {
				// 	name: '指数'
				// },
				{
					name: '聊球'
				}],
				base:{},
				timeInterval: null
			}
		},
		onLoad(option) {
			this.getDetail(option.id)
			this.recordUsageTime();
			this.timeInterval = setInterval(() => {
				this.recordUsageTime();
			}, 60000)
		},
		computed:{
			system(){
				return this.$store.state.system
			},
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
			change(e){
				this.current = e
				if(e == 1) {
					setTimeout(res=>{
						this.$refs.detail2.getdetail()
					},200)
				// } else if(e == 2) {
				// 	setTimeout(res=>{
				// 		this.$refs.detail3.getdetail(this.base.id,2)
				// 	}, 200)
				}
			},
			getStatus(type){
				if(type == 1){
					return ''
				}else if(type == 1){
					return ''
				}else if(type == 1){
					return ''
				}else if(type == 1){
					return ''
				}else if(type == 1){
					return ''
				}else if(type == 1){
					return ''
				}else if(type == 1){
					return ''
				}else if(type == 1){
					return ''
				}else if(type == 1){
					return ''
				}else if(type == 1){
					return ''
				}else if(type == 1){
					return ''
				}else if(type == 1){
					return ''
				}else if(type == 1){
					return ''
				}else if(type == 1){
					return ''
				}else if(type == 1){
					return ''
				}else if(type == 1){
					return ''
				}else{
					
				}
			},
			// 获取篮球详情
			getDetail(id){
				this.$u.get('/api/Basketball/getInfo', {id:id}).then(res => {
					// res为服务端返回的数据
					this.base = res
					let technology = res.players
					this.comList = res.players
				})
			},
			// 記錄進入直播間時長
			recordUsageTime() {
				const userInfo = JSON.parse(localStorage.getItem("userInfo"))
				let user_id = userInfo ? userInfo.id : localStorage.getItem("userid")
				
				let data = {
					user_id: getQueryString().user_id||user_id,
					match_id: getQueryString().id,
				}
				this.$u.post('api/statistics/recordUsageTime', data).then(res => {

				}).catch(res => {

				})
			}
		},
		destroyed() {
			clearInterval(this.timeInterval)
		}
	}
</script>

<style lang="scss">
	.detail-video {
		position: relative;
		min-height: 392rpx;
		background: url(/static/images/competition/basketball-bg.png)center top / 100% 100% no-repeat;
	}
	.detail-navBar {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		padding: 14rpx 24rpx;
		image {
			width: 60rpx;
			height: 60rpx;
		}
		.detail-navBar-center {
			color: #fff;
			font-size: 24rpx;
			text-align: center;
		}
	}
	.detail-vs {
		color: #fff;
		width: 100%;
		// margin-top: 80rpx;
		align-self: center;
		text-align: center;
		padding: 0 78rpx;
		.detail-vs-left {
			image {
				width: 96rpx;
				height: 96rpx;
				margin: 0 auto;
				border-radius: 50%;
				// margin-bottom: 20rpx;
			}
			view {
				font-size: 28rpx;
			}
		}
		.detail-vs-center {
			font-size: 24rpx;
			.detail-vs-num {
				margin-top: 12rpx;
				font-size: 64rpx;
			}
		}
	}
	
	.detail-video-btn {
		color: #fff;
		width: 288rpx;
		position: absolute;
		bottom: 24rpx;
		right: 47%;
		opacity: .4;
		display: block;
		text-align: center;
		margin-right: -144rpx;
		font-size: 24rpx;
		padding: 16rpx 24rpx;
		border-radius: 80rpx;
		align-items: flex-end;
		background-color: #000;
	}
	
	


</style>

