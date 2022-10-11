<!-- 预约 -->
<template>
	<div class="anchor-page-content-wrap anchor-page-content-wrap-not-home" style="">
		<div class="reserve-page-main">
			<div class="title-box">
				<div class="title">预约观看</div>
			</div>
			<div class="content-box-wrap">
				<div class="content-box-reserve" v-for="(item,index) in list" :key="index">
					<div class="date-box">
						<div class="icon"></div>
						<div class="date">{{item.name}}</div>
					</div>
					<div class="content-box-item" v-for="(item1,index1) in item.list">
						<div class="reserve-match-item reserve-match-item-2">
							<div class="team-info">
								<div class="team-row"><img :src="item1.home_logo?item1.home_logo:require('../../assets/images/team.png')" width="32" height="32"><span
										class="team-name" title="">{{item1.home_name}}</span><span
										class="score">{{item1.home_scores}}</span></div>
								<div class="team-row"><img :src="item1.away_logo?item1.away_logo:require('../../assets/images/team.png')" width="32" height="32"><span
										class="team-name" title="">{{item1.away_name}}</span><span
										class="score">{{item1.away_scores}}</span></div>
							</div>
							<div class="league-info">
								<div class="league-info-wrap">
									<div class="league-name" title="中甲">{{item1.name}}</div>
									<div class="league-time">{{item1.start}}</div>
								</div>
								<div class="league-status-wrap" @click="reserveMatch(item1)">
									<div class="league-status">
										<div class="already-reserve-button"></div>
									</div>
								</div>
							</div>
							<div class="anchor-list-container">
								<!-- <div class="pre-button disabled"></div>
								<div class="next-button "></div> -->
								<div class="anchor-list">
									<ul style="width: 498px; margin-left: 0px;">
										
										<li class="anchor-item" v-for="(item2,index2) in item1.anchorList">
											<div class="img-wrap" title=""><img
													:src="item2.avatar"
													width="48" height="48"></div>
											<div class="anchor-name" title="">{{item.user_nickname}}</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="no-data-react" v-if="list.length == 0"><img class="no-data-img" src="../../assets/images/qsy.png" alt="no-data">
					<p class="no-data-text">暂无数据</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		reserveMatch2,
		getUserReserveLiveList
	} from '../../api/user.js'
	export default {
		data() {
			return {
				page:1,
				list:[],
				detail:{},//分页使用
			}
		},
		mounted() {
			this.getUserReserveLiveList()
		},
		methods:{
			// 取消预约
			reserveMatch(item){
				reserveMatch2({match_id:item.match_id,type:item.type}).then(res=>{
					this.getUserReserveLiveList()
					this.$message.success('操作成功')
				}).catch(res=>{})
			},
			// 获取预约列表
			getUserReserveLiveList(){
				getUserReserveLiveList({page:this.page}).then(res=>{
					// this.list = res.data.data
					let list = []
					res.data.data.map((item, index) => {
						let obj = {
							name: item.key,
							list: [item]
						}
						// console.log(item);
						res.data.data.map((option, optionIndex) => {
							if (item.key == option.key && optionIndex > index) {
								// obj.list = [...obj.list, ...[option]]
								obj.list.push(option)
							}
						})
						let intos = list.filter(res => {
							return res.name == obj.name
						})
						if (intos.length) return
						list.push(obj)
					})
					this.list = list
					res.data.data = []
					this.detail = res.data
				}).catch(res=>{
					
				})
			}
		}
	}
</script>

<style>
	

	.reserve-page-main .title-box .title {
		height: 50px;
		font-size: 16px;
		line-height: 50px;
		text-align: center;
		width: 140px;
		color: #bb9352;
		font-weight: 700;
		border-bottom: 1px solid #d8ad66;
		background-image: url(../../assets/images/tab-bar-xuanzhongqianbu.png);
		background-size: cover;
	}

	.content-box-wrap {
		position: relative;
		height: calc(100vh - 190px);
		width: 1192px;
		overflow-y: auto;
		background-color: #fafafa;
		border-bottom-left-radius: 40px;
		border-bottom-right-radius: 4px;
		padding-bottom: 42px;
	}

	.no-data-react {
		position: absolute;
		width: 100%;
		height: 100%;
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #fff;
	}

	.no-data-react .no-data-img {
		width: 276px;
		height: 221px;
	}

	.no-data-react .no-data-text {
		position: relative;
		top: -60px;
		font-size: 16px;
		color: #999;
	}
	.reserve-match-item.reserve-match-item-2 .league-info {
	    width: 320px;
	}
</style>
