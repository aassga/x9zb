<!-- 关注 -->
<template>
	<div class="anchor-page-content-wrap anchor-page-content-wrap-not-home" style="">
		<div class="personal-following-page">
			<div class="nav">
				<div class="nav-item" :class="index==tabIndex?'active':''" @click="tabIndex=index"
					v-for="(item,index) in list">{{item}}</div>
			</div>
			<div class="content-container">
				<div class="content">
					<a class="item-container" v-for="(item,index) in dataList" :key="index">

						<div class="left">
							<div class="img-container">
								<div class="lazyload-wrapper "><img :src="item.avatar || require('../../assets/images/userLogo.png')" alt="" width="120" height="120" title=""></div>
							</div>
							<a target="_blank" :href="item.is_live == 1?'/live?router=live&type='+(item.live.type==0?'football':'basketball')+'&id='+item.live.match_id+'&uid=' + item.live.uid:'javascript:void(0)'">
							<div class="info">
								<div class="up">
									
									<div class="name">{{item.user_nickname}}</div>
									<div class="anchor-level" style="width: 50px;">
										<img :src="item.votestotal_icon">
									</div>
									
										
									
									<div class="living">
										<!-- animation -->
										<div class="" :class="item.is_live == 1?'animation':'no-animation'">
											<div class="strip"></div>
											<div class="strip"></div>
											<div class="strip"></div>
										</div>
										<div class="live-img " :class="item.is_live == 1?'live':'no-live'"></div>
									</div>
								</div>
								<div class="down">{{item.title}}</div>
							</div>
							</a>
							<!-- <router-link :to="'/live?router=live&type='+(item.live.type==0?'football':'basketball')+'&id='+item.live.match_id+'&uid=' + item.live.uid" tag="a" target="_blank">
								
							</router-link> -->
							<!--  -->
						</div>
						<div class="btn has" @click="attention(item)">取消关注</div>
					</a>
					
				</div>
				<div class="no-data" v-if="dataList.length == 0">
				
					<div class="no-data-react"><img class="no-data-img" src="../../assets/images/qsy.png"
							alt="no-data">
						<p class="no-data-text">暂未关注</p>
					</div>
				</div>
				<div class="page"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		attentionList,
		attention,
	} from '../../api/user.js'
	export default {
		data() {
			return {
				page: 1,
				tabIndex: 0,
				dataList: [],
				list: ['我关注的主播', '我关注的作者', '我关注的用户']
			}
		},
		mounted() {
			this.getList()
		},
		watch: {
			tabIndex(e) {
				this.getList()
			}
		},
		methods: {
			getList() {
				let data = {
					page: this.page,
					type: this.tabIndex
				}
				attentionList(data).then(res => {
					
					res.data.data.forEach(item => {
						if (item.is_live == 1 && JSON.stringify(item.live) !== "{}") { //正在直播
							item.title = item.live.name + ':' + item.live.home_name + '-' + item.live.away_name || ''
						} else if (item.is_live == 0 && JSON.stringify(item.reserve) !== "{}") {
							item.title = item.reserve.name + ' ' + item.reserve.match_time + ' ' + item.reserve.home_name + '-' + item.reserve.away_name || ''
						} else {
							item.title = ''
						}
					})
					this.dataList = res.data.data
				}).catch(res => {})
			},
			// 取消关注
			attention(item){
				// console.log(item);
				attention({id:item.followed_id}).then(res=>{
					this.attentionList()
				}).catch(res=>{})
			}
		}
	}
</script>

<style scoped="scoped">
	.living {
		display: flex;
		align-items: flex-end;
		width: 45px;
		height: 16px
	}

	.living .animation {
		display: flex;
		transform: rotate(180deg);
		width: 12px;
		height: 12px;
		margin-right: 4px
	}

	.living .animation .strip {
		width: 2px;
		height: 40%;
		margin-right: 2px;
		background-color: #f27432
	}

	.living .animation .strip:first-child {
		animation: surfa .7s linear .3s infinite
	}

	.living .animation .strip:nth-child(2) {
		animation: surfa .7s linear .6s infinite
	}

	.living .animation .strip:nth-child(3) {
		animation: surfa .7s linear 0s infinite
	}

	.living .live-img {
		width: 32px;
		height: 11px;
		background-repeat: no-repeat;
		background-size: contain
	}
</style>
