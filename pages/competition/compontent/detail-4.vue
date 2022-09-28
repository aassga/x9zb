<!-- 指数 -->
<template>
	<view class="detail">
		<view class="numerical-tab flex">
			<view class="" v-for="(item,index) in numericalList" @click="numericalIndex = index" :class="index==numericalIndex?'numerical-active':''">
				{{item}}
			</view>
		</view>
		
		<view class="detail-content">
			<view class="detail-title flex">
				<view class="detail-title-tips">
					百家指数
				</view>
				<!-- <view class="detail-titl-tab flex">
					<view>主要公司</view>
					<text @click="$navigateTo('indexDetail')">全部14家</text>
				</view> -->
			</view>
			<view class="detail-li flex">
				<view style="width: 176rpx;text-align: center;">公司</view>
				<view class="flex-around detail-li-td">
					<text>{{numericalIndex == 0?'主':numericalIndex == 1?'胜':'大'}}</text>
					<text>{{numericalIndex == 0?'初':numericalIndex == 1?'平':'初'}}</text>
					<text>{{numericalIndex == 0?'客':numericalIndex == 1?'负':'小'}}</text>
				</view>
				<view class="flex-around detail-li-td">
					<text>{{numericalIndex == 0?'主':numericalIndex == 1?'胜':'大'}}</text>
					<text>{{numericalIndex == 0?'即':numericalIndex == 1?'平':'即'}}</text>
					<text>{{numericalIndex == 0?'客':numericalIndex == 1?'负':'小'}}</text>
				</view>
			</view>
			<view class="detail-li flex " :class="{'yecolor':index %2 == 0}" v-for="(item,index) in list" :key="index">
				<view style="width: 176rpx;text-align: center;position: relative;" @click="$navigateTo('indexDetail?id='+ id + '&index=' + numericalIndex + '&idx=' + index)">
					{{item.company_name}}
					<image src="/static/images/competition/detail-right.png" mode=""></image>
				</view>
				<view class="flex-around detail-li-td">
					<text>{{item.early_host}}</text>
					<text>{{item.early_early}}</text>
					<text>{{item.early_guest}}</text>
				</view>
				<view class="flex-around black detail-li-td">
					<text>{{item.scilicet_host}}</text>
					<text>{{item.scilicet_early}}</text>
					<text>{{item.scilicet_guest}}</text>
				</view>
			</view>
			<view class="detail-li flex allcolor" v-for="(item,i,index) in additional">
				<view style="width: 176rpx;text-align: center;">{{i == 'highest'?'平均值':i == 'lowest'?'最低值':'最高值'}}</view>
				<view class="flex-around detail-li-td">
					<text>{{item.host}}</text>
					<text>{{item.early}}</text>
					<text>{{item.guest}}</text>
				</view>
				<view class="flex-around black detail-li-td">
					<text>{{item.hosts}}</text>
					<text>{{item.earlys}}</text>
					<text>{{item.guests}}</text>
				</view>
			</view>
			
		</view>
		
		<view class="detail-content" style="margin-top: 20rpx;" v-if="numericalIndex == 1 && compensationsList">
			<view class="detail-title flex">
				<view class="detail-title-tips">
					历史同盘
				</view>
				<view class="detail-titl-tab flex-around" style="flex: 1;padding-left: 40rpx;" v-if="compensationsList">
					<text>{{compensationsList.initial_won}}</text>
					<text>{{compensationsList.initial_draw}}</text>
					<text>{{compensationsList.initial_loss}}</text>
				</view>
				<view class="" style="flex: 1;text-align: right;position: relative;padding-right: 40rpx;"  v-if="compensationsList" @click="selectorVisible=true">
					{{compensationsList.value}}
					<image src="/static/images/competition/up.png" class="image" mode=""></image>
				</view>
			</view>
			<view class="detail-li flex">
				<view style="width: 176rpx;text-align: center;">公司</view>
				<view class="flex-around detail-li-td">
					<text>赢</text>
					<text>走</text>
					<text>输</text>
				</view>
				<view class="flex-around detail-li-td">
					<text>赢%</text>
					<text>走%</text>
					<text>输%</text>
				</view>
			</view>
			<view class="detail-li flex yecolor">
				<view style="width: 176rpx;text-align: center;position: relative;" @click="$navigateTo('indexDetail?id='+ id + '&index=' + numericalIndex)">
					全部
					<image src="/static/images/competition/detail-right.png" mode=""></image>
				</view>
				<view class="flex-around detail-li-td" v-if="compensationsList.all">
					<text>{{compensationsList.all.won}}</text>
					<text>{{compensationsList.all.draw}}</text>
					<text>{{compensationsList.all.loss}}</text>
				</view>
				<view class="flex-around detail-li-td" v-if="compensationsList.tonglian">
					<text>{{compensationsList.tonglian.win_rate }}%</text>
					<text>{{compensationsList.tonglian.draw_rate }}%</text>
					<text>{{compensationsList.tonglian.loss_rate }}%</text>
				</view>
			</view>
			<view class="detail-li flex ">
				<view style="width: 176rpx;text-align: center;position: relative;" @click="$navigateTo('indexDetail?id='+ id + '&company_id=' + item.id + '&name=' + item.company_name)">
					同联赛
					<image src="/static/images/competition/detail-right.png" mode=""></image>
				</view>	
				<view class="flex-around detail-li-td" v-if="compensationsList.all">
					<text>{{compensationsList.all.won}}</text>
					<text>{{compensationsList.all.draw}}</text>
					<text>{{compensationsList.all.loss}}</text>
				</view>
				<view class="flex-around detail-li-td" v-if="compensationsList.tonglian">
					<text>{{compensationsList.tonglian.win_rate }}%</text>
					<text>{{compensationsList.tonglian.draw_rate }}%</text>
					<text>{{compensationsList.tonglian.loss_rate }}%</text>
				</view>
			</view>
			
		</view>
		<w-picker :visible.sync="selectorVisible" mode="selector" value="" default-type="name"
			:default-props="defaultProps" :options="compensations" @confirm="onConfirm($event,'selector')"
			@cancel="onCancel" ref="selector" title="指数公司">
		</w-picker>
	</view>
</template>

<script>
	import wPicker from "@/compontent/w-picker/w-picker.vue"
	export default {
		components:{wPicker},
		data() {
			return {
				id:null,
				numericalList: ['让球','欧赔','大小球'],
				numericalIndex: 1,
				defaultProps:{
					label: "name",
					value: "id"
				},
				type:1,
				list:[],
				dataBase:{},
				additional:[],//平均值
				compensations:[],//历史同盘
				compensationsList:{},//历史同盘参数
				selectorVisible: false,
				listData:[
					{
						value:'博彩',
						id:1
					},
					{
						value:'金币',
						id:2
					}
				]
			}
		},
		watch:{
			numericalIndex(e){
				if(e == 0) {
					this.list = this.dataBase.asia
					this.additional = this.dataBase.asia_additional
				}else if(e == 1) {
					if(this.type == 1){
						this.compensations = this.dataBase.compensations
						this.compensationsList = this.dataBase.compensations[0]
					}
					this.list = this.dataBase.eu
					this.additional = this.dataBase.eu_additional
				}else{
					this.list = this.dataBase.bs	
					this.additional = this.dataBase.bs_additional
				}
			}
		},
		methods: {
			getdetail(id,type){
				this.id = id
				let url = ''
				if(type == 2){
					this.type = 2
					url = 'api/Basketball/exponent'
					this.$u.get(url,{id:id}).then(res=>{
						this.dataBase = res
						this.list = res.eu
						this.additional = res.eu_additional
					})
				}else {
					url = 'api/Football/football_odds_history'
					this.$u.get(url,{id:id}).then(res=>{
						if(res.compensations.length != 0){
							res.compensations.forEach(item=>{
								item.value = item.name
							})
						}
						this.dataBase = res
						this.compensations = res.compensations
						this.compensationsList = res.compensations[0]
						this.list = res.eu
						this.additional = res.eu_additional
					})
				}
				// type:this.numericalIndex == 0?'asia':this.numericalIndex == 1?'eu':'bs'
				
				
			},
			onConfirm(e) {
				this.compensationsList = e.obj
			},
			onCancel(){
				
			}
		},
	}
</script>

<style lang="scss">
	.detail {
		padding: 0 24rpx;
	}
	.numerical-tab {
		width: 480rpx;
		margin: 24rpx auto;
		border-radius: 12rpx;
		border: 2rpx solid #E3AC72;
		view {
			flex: 1;
			color: #E3AC72;
			font-size: 28rpx;
			text-align: center;
			padding: 16rpx 24rpx;
		}
		.numerical-active {
			color: #fff;
			background: linear-gradient(91deg, #FFDFAB 0%, #E3AC72 100%);
		}
	}
	// 内容
	
	.detail-content {
		overflow: hidden;
		background-color: white;
		border-radius: 12rpx 12rpx 0 0;
	}
	.detail-title {
		padding: 24rpx;
		.image {
			width: 24rpx;
			height: 24rpx;
			position: absolute;
			right: 4rpx;
			top: 8rpx;
		}
		.detail-title-tips {
			color: #666;
			font-size: 28rpx;
			padding-left: 12rpx;
			position: relative;
			&::after{
				content: '';
				width: 6rpx;
				position: absolute;
				top: 0;
				left: 0;
				bottom: 0 ;
				background-color: #E3AC72;
				border-radius: 20rpx 20rpx 0 0;
			}
		}
		.detail-titl-tab {
			font-size: 28rpx;
			position: relative;
			&::after{
				content: '';
				width: 2rpx;
				position: absolute;
				top: 5rpx;
				bottom: 5rpx;
				right: 50%;
				background-color: #F1F1F1;
			}
			view {
				color: #E3AC72;
				margin-right: 48rpx;
			}
			text {
				color: #999;
			}
		}
	}
	
	.detail-li {
		font-size: 24rpx;
		padding: 38rpx 0;
		background-color: #FFFBF6;
		view {
			color: #333;
			text {
				color: #999;
			}
		}
		.detail-li-td {
			flex: 1;
			border-left: 2rpx solid #F1F1F1;
		}
		.black {
			text {
				
			color: #333 !important;
			}
		}
		image {
			width: 36rpx;
			height: 36rpx;
			position: absolute;
			right: 4rpx;
		}
	}
	.yecolor {
		background-color: #fff;
	}
	.allcolor {
		background-color: #FFF1E0;
	}
	
</style>
