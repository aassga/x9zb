<!-- 预约观看 -->
<template>
	<div class="i-tabs-container" style="min-height: auto;">
		<div class="header-nav nav-bottom-space" style="margin-bottom: 0;">
			<a v-for="(item,index) in tabList" :key="index" @click="tabIndex=index">
				<div class="item" :class="[{'first-item':index==tabIndex},{'first-active':index!=0}]">{{item}}</div>
			</a>
		</div>
		<div class="tab-pane-item" name="预约观看" style="background-color: #fafafa;min-height: 550px;">
			<div class="collection-post-container" v-if="list.length !== 0">
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
									<div class="league-name" title="">{{item1.name}}</div>
									<div class="league-time">{{item1.start}}</div>
									<!-- <div class="league-status-wrap" >
										
									</div> -->
									<div class="league-status" @click="reserveMatch(item1)">
										<div class="already-reserve-button"></div>
									</div>
								</div>
								
							</div>
							<div class="anchor-list-container">
								<!-- <div class="pre-button disabled"></div> -->
								<!-- <div class="next-button "></div> -->
								<div class="anchor-list">
									<ul style="width: 498px; margin-left: 0px;">
			
										<li class="anchor-item" v-for="(item2,index2) in item1.anchorList">
											<div class="img-wrap" title=""><img :src="item2.avatar" width="48"
													height="48"></div>
											<div class="anchor-name" title="">{{item.user_nickname}}</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div class="collection-post-container" v-else>
				<div class="collection-list" style="padding-bottom: 80px;"></div>
				<div class="common-empty-view"><img class="no-data-img  "
						src="../../assets/images/qsy.png" alt="no-data"
						style="margin-top: 0px;">
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
				list:[],
				tabIndex: 0,
				tabList: ['预约观看']
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
						// // console.log(item);
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
	 .date-box {
	    height: 50px;
	    line-height: 50px;
	    position: relative;
	    margin-bottom: 5px;
	}
	 .date-box .icon {
	    height: 24px;
	    width: 3px;
	    background-color: #d8ad66;
	    position: absolute;
	    left: 0;
	    top: 0;
	    bottom: 0;
	    margin: auto;
	    border-radius: 1px;
	}
	 .date-box .date {
	    text-align: left;
	    font-size: 22px;
	    color: #333;
	    margin-left: 20px;
	}
	.reserve-match-item.reserve-match-item-2 .league-info  {
		width: 200px;
	}
	/* .i-tabs-container .header-nav.nav-bottom-space {
		margin-bottom: 0;
	} */
</style>
