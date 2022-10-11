<!-- 即时比分详情 -->
<template>
	<div class="score-detail-container" style="padding-top: 60px;">
		<div id="bg-linear"></div>
		<div class="score-detail-header-container" v-if="query.type == 'basketball'">
			<div class="score-detail-header" style="width: 1200px;">
				<div class="team">
					<div class="guest-name1 name tip-basketball"><span class="ellipsis match-name"
							style="max-width: 340px;">{{detail.home_team_data.short_name_zh}}</span><img
							style="object-fit: initial;"
							v-if="detail.home_team_data.logo"
							:src="detail.home_team_data.logo || require('../../assets/images/team.png')"><span
							class="num">{{detail.home_scores_total}}</span></div>
					<div class="score">
						<p class="league-name"><span>{{detail.match_time}}</span> {{detail.short_name_zh}}</p>
						<p class="time" style="margin-top: 4px;">VS</p>
					</div>
					<div class="host-name1 name tip-basketball"><span class="num">{{detail.away_scores_total}}</span><img
							v-if="detail.away_team_data.logo"
							:src="detail.away_team_data.logo || require('../../assets/images/team.png')"><span
							class="ellipsis match-name" style="max-width: 340px;">{{detail.away_team_data.short_name_zh}}</span></div>
				</div>
			</div>
		</div>
		<div class="score-detail-header-container" v-else>
			<div class="score-detail-header" style="width:1200px;background-image:">
				<div class="team">
					<div class="guest-name name"><span class="num" style="color:" v-if="detail.away_data">{{detail.away_data[0]}}</span><img
							:src="detail.away_team_log || require('../../assets/images/team.png')"><span
							class="ellipsis match-name" style="color:">{{detail.away_team_name_zh}}</span></div>
					<div class="score">
						<p class="league-name"><span>{{detail.time}}</span> {{detail.competition_name_zh}}</p>
						<div>
							<div class="on-time flex-center custom-score-wrap" style="color:">
								<div>
									<p class="time-text">{{detail.status == 1?'未开始':detail.status == 8?'完':'比赛中'}}</p>
								</div>
							</div>
							<p class="color-999 score-text"><span>半:
									<!-- -->{{detail.half_score}}
								</span><span v-if="detail.home_data">&nbsp;&nbsp;角:
									<!-- -->{{detail.away_data[8]}}-{{detail.home_data[8]}}
								</span></p>
						</div>
					</div>
					<div class="host-name name"><span class="ellipsis match-name" style="color:">{{detail.home_team_name_zh}}</span><img
							:src="detail.home_team_log || require('../../assets/images/team.png')"><span
							class="num" style="color:" v-if="detail.home_data">{{detail.home_data[0]}}</span></div>
					<div class="custom-matchData-info"></div>
				</div>
			</div>
		</div>
		<div class="score-detail-nav-container">
			<ul class="navs">
				<li class="item" v-for="(item,index) in tabList" :key="index"><a :class="index==tabIndex?'active':''" @click="tabIndex = index">{{item}}</a></li>
			</ul>
		</div>
		<div class="match-detail-analyze">
			<detail1 v-if="tabIndex == 4 && query.type == 'basketball'" :query="query" :analyze='analyze' :list="detail" @getDetail="getDetail"></detail1>
			<detail7 v-if="tabIndex == 4 && query.type == 'football'" :query="query" :analyze='analyze' :list="detail" @getDetail="getDetail"></detail7>
			<detail2 v-if="tabIndex == 1" :query="query" @getDetail="getDetail" :list="dataBase"></detail2>
			<detail3 v-if="tabIndex == 2" :query="query" @getDetail="getDetail" :list="dataBase"></detail3>
			<detail4 v-if="tabIndex == 3" :query="query" @getDetail="getDetail" :list="dataBase"></detail4>
			<!-- <detail5 v-if="tabIndex == 4" @getDetail="getDetail" :list="dataBase"></detail5> -->
			<detail6 v-if="tabIndex == 6" @getDetail="getDetail" :list="dataBase" :type="type" :id="id"></detail6>
		</div>
	</div>
</template>

<script>
	import detail1 from './detail1.vue'
	import detail2 from './detail2.vue'
	import detail3 from './detail3.vue'
	import detail4 from './detail4.vue'
	import detail5 from './detail5.vue'
	import detail6 from './detail6.vue'
	import detail7 from './detail7.vue'
	import {
		getExponent,
		getInfo
	} from '@/api/basketball.js'
	import {
		getAnalyze,
		footballOddsList,
		getfootballDetail
	} from '@/api/football.js'
	export default {
		components: {
			detail1,
			detail2,
			detail3,
			detail4,
			detail5,
			detail6,
			detail7
		},
		data() {
			return {
				id: null,
				type: '',
				detail: {},
				analyze:{},
				dataBase: {},
				tabIndex: 2,
				tabList: [] //'数据分析' '三合一' 暂时不做隐藏10-28
			}
		},
		watch: {
			tabIndex(e) {

				if (e == 0) {
					this.$router.push('/score-live?type='+this.query.type+'&id='+this.query.id+ '&vid=' + this.query.vid )
				}
			}
		},
		created() {
			// 获取type详情
			// // console.log()
			this.query = this.$route.query
			
			if (this.query.type == 'basketball') {
				this.getInfo()
				this.getExponent()
				this.tabList = ['视频直播', '欧赔', '让分', '总分','数据分析']
			} else {
				this.getAnalyse()
				this.footballOddsList()
				this.getfootballDetail()
				this.tabList = ['视频直播','欧赔指数', '亚盘', '大小球','数据分析'] //足球
				
			}
			if(this.query.tabIndex == 4){
				this.tabIndex = 4
			}
		},
		methods: {
			// 蓝球详情
			getExponent() {
				// console.log('我是篮球')
				getExponent({
					id: this.query.id
				}).then(res => {
					this.dataBase = res.data
				}).catch(res => {

				})
			},
			// 篮球对战详情
			getInfo() {
				getInfo({
					id: this.query.id
				}).then(res => {
					this.detail = res.data
				}).catch(res => {

				})
			},
			// 获取分析 足球
			getAnalyse(){
				getAnalyze({
					id: this.query.id
				}).then(res => {
					this.analyze = res.data
				}).catch(res => {
				
				})
			},
			
			// 足球
			footballOddsList() {
				footballOddsList({
					id: this.query.id
				}).then(res => {
					this.dataBase = res.data
				}).catch(res => {

				})
			},

			// 足球对战详情
			getfootballDetail() {
				getfootballDetail({
					id: this.query.id
				}).then(res => {
					this.detail = res.data
				}).catch(res => {

				})
			},
			// 监听子集点击查看按钮触发切换detail6
			getDetail(e) {
				// console.log(e)
				this.id = e.id
				this.type = e.type
				this.tabIndex = 6
			}
		}
	}
</script>

<style scoped="scoped">
	@import '../../styles/style.css';
	.ant-table-thead>tr>th {
	    height: 44px;
	    line-height: 44px;
	    color: #333 !important;
	    background-color: #f1f3f4;
	}
</style>
