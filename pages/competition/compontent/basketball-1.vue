<!-- 赛况 -->
<template>
	<view class="detail">
		<view class="detail-title">
			<view class="detail-title-head flex">
				<text class="detail-title-head-t">球队</text>
				<view class="flex-around detail-title-head-l">
					<text>一节</text>
					<text>二节</text>
					<text>三节</text>
					<text>四节</text>
					<text>总分</text>
				</view>
			</view>
			<view class="detail-title-content flex" v-if="base.away_team_data">
				<view class="detail-title-content-l">
					<view>{{base.home_team_data.short_name_zh}}</view>
					<view style="margin-top: 16rpx;">{{base.away_team_data.short_name_zh}}</view>
				</view>
				<view class="detail-title-content-r">
					<view class="flex-around">
						<text v-for="(item,index) in base.home_scores">{{item}}</text>
						<!-- <text>10</text>
						<text>10</text>
						<text>10</text> -->
						<view>{{base.home_scores_total}}</view>
					</view>
					<view class="flex-around" style="margin-top: 20rpx;">
						<text v-for="(item,index) in base.away_scores">{{item}}</text>
						<view>{{base.away_scores_total}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 图表 -->
		<view class="detail-content-match flex" v-if="base.players.length != 0">
			<view class="detail-content-match-progres" v-for="(item,index) in progress">
				<view class="detail-content-match-title">
					{{item}}%
				</view>
				<view class="flex" v-if="base.players.home">
					<text>{{index == 0?base.players.home.hits:index == 1?base.players.home.three_pointer_shot:base.players.home.free_throw_shots}}</text>
					
					<!--  -->
					<u-circle-progress style="padding: 0 16rpx;" v-if="index==0" :class="base.players.home.hits > base.players.away.hits?'mirrorRotateLevel':''" :active-color="index != 2?'#F84A4B':'#687AE0'" border-width="8" :percent="count(base.players.home.hits,base.players.away.hits)"
						height="4" width="100" duration="2000"></u-circle-progress>
					<u-circle-progress style="padding: 0 16rpx;" v-if="index==1" :class="base.players.home.three_pointer_shot > base.players.away.three_pointer_shot?'mirrorRotateLevel':''" :active-color="index != 2?'#F84A4B':'#687AE0'" border-width="8" :percent="count(base.players.home.three_pointer_shot,base.players.away.three_pointer_shot)"
						height="4" width="100" duration="2000"></u-circle-progress>
					<u-circle-progress style="padding: 0 16rpx;" :class="base.players.home.free_throw_shots > base.players.away.free_throw_shots?'mirrorRotateLevel':''" v-if="index==2" :active-color="index != 2?'#F84A4B':'#687AE0'" border-width="8" :percent="count(base.players.home.free_throw_shots,base.players.away.free_throw_shots)"
						height="4" width="100" duration="2000"></u-circle-progress>
						
					<text>{{index == 0?base.players.away.hits:index == 1?base.players.away.three_pointer_shot:base.players.away.free_throw_shots}}</text>
				</view>
			</view>
		</view>

		<view class="numerical-tab flex">
			<view class="" v-for="(item,index) in numericalList" @click="numericalIndex = index" :class="index==numericalIndex?'numerical-active':''">
				{{item}}
			</view>
		</view>

		<!-- <u-collapse :item-style="itemStyle">
			
		</u-collapse> -->
		<!-- <view class="list">
			<u-collapse :head-style="headStyle" :item-style="itemStyle" event-type="close" @change="change">
				<u-collapse-item :title="item.head" v-for="(item, index) in itemList" :key="index" :open="item.open" :disabled="item.disabled">
					{{item.body}}
				</u-collapse-item>
			</u-collapse>
		</view> -->
		
		<view class="list" v-if="numericalIndex == 0">
			<view class="list-li" v-for="(item,index) in base.tlive" :key="index">
				<view class="list-li-head flex" @click="setCheck(index)">
					<text>第{{index+1}}节</text>
					<image src="/static/images/competition/down.png" mode=""></image>
				</view>
				<view class="list-li-content" v-show="indexOF.indexOf(index) != -1">
					<view class="list-li-content-l flex-start" v-for="(item1,index1) in item" :class="[item1.goal_type == 1?'red':item1.goal_type == 2?'blue':'']">
						<text>{{item1.conducttime}}</text>
						<view>{{item1.info}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 技术统计 -->
		<view class="statistics" v-if="numericalIndex==1">
			<view class="statistics-title flex">
				<view class="flex">
					<image :src="base.home_team_data.logo" mode=""></image>
					<text v-if="base.home_team_data">{{base.home_team_data.short_name_zh}}</text>
				</view>
				<view class="flex">
					<text v-if="base.away_team_data">{{base.home_team_data.short_name_zh}}</text>
					<image :src="base.away_team_data.logo" mode=""></image>
				</view>
			</view>
			<view class="statistics-ul" v-if="comList">
				<view class="statistics-li" v-for="(item1,i,index) in comList.home" :key="index">
					<view class="flex">
						<text>{{item1}}</text>
						<text>{{$common.getBasketName(i)}}</text>
						<text>{{comList.away[i]}}</text>
					</view>
					<view class="flex" style="margin-top: 12rpx;">
						<u-line-progress  style="transform: rotate(180deg);" height="6" :striped="true" :percent="count(item1,comList.away[i])" :show-percent="false" active-color="#F84A4B" :striped-active="true"></u-line-progress>
						<u-line-progress  height="6" :striped="true" :percent="100 - count(item1,comList.away[i])" :show-percent="false" active-color="#687AE0" :striped-active="true"></u-line-progress>
					</view>
				</view>
			</view>
		</view>
		
		
		<!-- 没有数据显示
		<view class="nones">
			<image src="/static/images/competition/none.png" class="none" mode=""></image>
			<view>暂无数据</view>
		</view> -->

	</view>
</template>

<script>
	export default {
		props:{
			base:{
				type:Object,
				default:{}
			},
			comList:{
				type:Array,
				default:[]
			},
		},
		data() {
			return {
				indexOF:[],
				progress:['投篮','三分','罚球'],
				itemStyle: {
					margin:'0 24rpx',
					overflow: 'hidden',
					borderBottom:'2rpx solid #EAEAEA'
				},
				headStyle: {
					color:'#999999',
					fontSize:'24rpx',
					borderRadius:'40px',
					background:'#EAEAEA',
					padding:'12rpx 24rpx',
					margin:'40rpx 0',
					
				},
				itemList: [{
					head: "赏识",
					body: "只要我们正确择取一个合适的参照物乃至稍降一格去看待他人，值得赏识的东西便会扑面而来",
					open: true,
					disabled: true
				},{
					head: "赏识",
					body: "学会欣赏，实际是一种积极生活的态度，是生活的调味品，会在欣赏中发现生活的美",
					open: false,
				},{
					head: "赏识",
					body: "但是据说雕刻大卫像所用的这块大理石，曾被多位雕刻家批评得一无是处，有些人认为这块大理石采凿得不好，有些人嫌它的纹路不够美",
					open: false,
				}],
				numericalList: ['事件直播', '技术统计'],
				numericalIndex: 0
			}
		},
		methods:{
			// 计算 进攻 危险进攻 控球率
			count(home_data,away_data){
				if(home_data > away_data){
					return home_data / (home_data + away_data) * 100
				}else {
					return away_data / (home_data + away_data) * 100
				}
			},
			// 事件直播 显示隐藏
			setCheck(i){
				if(this.indexOF.indexOf(i) == -1){
					this.indexOF.push(i)
				}else {
					this.indexOF.splice(this.indexOF.indexOf(i),1)
				}
				console.log(this.indexOF);
			}
		},
	}
</script>

<style lang="scss">
	.detail {
		padding: 0 24rpx;
	}

	.detail-title {
		overflow: hidden;
		margin-top: 20rpx;
		border-radius: 12rpx;
		background-color: white;

		.detail-title-head {
			color: #999;
			padding: 16rpx 0;
			border-bottom: 2rpx solid #F1F1F1;

			.detail-title-head-t {
				width: 250rpx;
				padding-left: 42rpx;
			}

			.detail-title-head-l {
				flex: 1;

				font-size: 20rpx;
			}

		}

		.detail-title-content {
			padding: 16rpx 0;
		}

		.detail-title-content-l {
			width: 250rpx;
			font-size: 28rpx;
			padding-left: 42rpx;
			border-right: 2rpx solid #F1F1F1;
		}

		.detail-title-content-r {
			flex: 1;

			text {
				color: #333;
				font-size: 20rpx;
			}

			view {
				view {
					color: #87390E;
					font-size: 24rpx;
					font-weight: bold;
				}
			}
		}
	}

	.detail-content-match {
		margin-top: 20rpx;
		text-align: center;
		padding: 22rpx 28rpx;
		border-radius: 12rpx;
		background-color: white;
		border-bottom: 2rpx solid #F3F3F7;

		.detail-content-match-title {
			color: #999;
			margin-bottom: 12rpx;
		}
	}

	.numerical-tab {
		width: 320rpx;
		margin: 24rpx auto;
		border-radius: 12rpx;
		border: 2rpx solid #E3AC72;

		view {
			color: #E3AC72;
			font-size: 28rpx;
			padding: 16rpx 24rpx;
		}

		.numerical-active {
			color: #fff;
			background: linear-gradient(91deg, #FFDFAB 0%, #E3AC72 100%);
		}
	}

	.nones {
		padding-bottom: 100rpx;

		image {
			width: 474rpx;
			display: block;
			height: 312rpx;
			margin: 68rpx auto;
		}

		view {
			color: #999;
			font-size: 20rpx;
			text-align: center;
		}
	}

	.list,.statistics {
		border-radius: 12rpx;
		background-color: white;
	}
	.statistics {
		padding-bottom: 48rpx;
	}
	.list-li {
		padding: 0 24rpx;
	}
	.list-li-head {
		padding: 40rpx 0;
		border-bottom: 2rpx solid #F0F0F0;
		text {
			color: #87390E;
			font-weight: bold;
			border-radius: 50rpx;
			padding: 12rpx 24rpx;
			background-color: #FFDFAB;
		}
		image {
			width: 48rpx;
			height: 48rpx;
		}
	}
	
	.list-li-content-l {
		color: #333;
		margin: 10rpx 0;
		padding: 20rpx 0;
		font-size: 24rpx;
		padding-left: 10rpx;
		view {
			margin-left: 48rpx;
		}
		
	}
	.red {
		border-left: 4rpx solid #F84A4B;
	}
	.blue {
		border-left: 4rpx solid #687AE0;
	}
	.statistics-title{
		padding: 24rpx;
		image {
			width: 44rpx;
			height: 44rpx;
		}
		text {
			padding: 0 16rpx;
			font-size: 28rpx;
		}
	}
	.statistics-ul {
		padding: 0 24rpx;
		.statistics-li {
			font-size: 24rpx;
			margin-top: 48rpx;
		}
	}
	/* 方法一 */
	.mirrorRotateLevel {
		transform: rotateY(180deg);   /* 水平镜像翻转 */
	}
	
</style>
