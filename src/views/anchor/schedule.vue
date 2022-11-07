<!-- 赛程 -->
<template>
	<div class="anchor-schedule-page">
		<div class="schedule-page-nav">
			<div>
				<section class="all-box">
					<div class="content-box">
						<div class="content content-active"><span class="title" @click="type = 0,activeIndex = 0"  :class="activeIndex == 0?'active':''"> 全部赛事 </span></div>
					</div>
				</section>
				<div>
					<div class="nav-item-box">
						<div class="nav-item-header">
							<div class="header-left">
								<div class="img-box"></div>
								<div class="title">足球</div>
							</div>
							<div class="header-right">今日<span class="num" v-if="schedule.football">{{schedule.football.count}}</span>场比赛</div>
						</div>
						<div class="nav-item-content">
							<ul v-if="schedule.football">
								<li class="" @click="type = 1,activeIndex = -1" :class="activeIndex == -1?'active':''">全部</li>
								<li v-for="(item,index) in schedule.football.list"  @click="type = 1,activeIndex = item.sourceid" :class="item.sourceid == activeIndex?'active':''" v-show="index <  scheduleFootindex">
									{{item.short_name_zh}}
								</li>
							</ul>
							<div class="expand-box"  v-if="scheduleFootindex == 8" @click="setFootIndex()"><span class="text">展开</span><span class="icon-box"><img
										src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAKCAYAAAC9vt6cAAAAAXNSR0IArs4c6QAAAL5JREFUKBWVkM0NwyAMhUNAYobM0WPVJYqEWKILZQI4ZIieov7NkRnogdQPNQholShIgPH7bKzHnHPHEMJ1nmfe7FuBMXZq6XhQ8X1fbaRvnPMnQzgMQ+e9f1HYRWn7mKSUB6XU1IJFIIRQNM17qxYMWNSAjQ0QaK1HEi+I1xYYsAuTGiBhjOkJ6BexvqGByfNFAwhkDKZIP2Tw+NWyVNNEE4sMPf6Ymkyr2Z8JAOSm0tiFaXWD1be19oy9Bn0AZZ8/YJAiJD8AAAAASUVORK5CYII="></span>
							</div>
							<div class="expand-box" v-else @click="setFootIndex()"><span class="text">收起</span><span class="icon-box"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAKCAYAAAC9vt6cAAAAAXNSR0IArs4c6QAAAMFJREFUKBWVkF0OgyAQhFkh5Qyeo3/xzTOUhCN4oV6CkHAH33zqOTwDjYbuNtoCUpOaGHHnm3EdxnYuY8yN7h2EwS/RWtvM89yTzjlvtdZDiS0GOOdq7/0DDfViGqWUR6XUmIdU+QC/fECzi8yEUKAjLec3Abj2HaEmB2m2aImUBGBhXQihS4johTRiotG3xLU0hDZrJgaAZ1zqu8RCabGndP6UClTMNE09UqX/LpnX2SCEaCtc+QwAl3X6x/OKpZ5eFtxW5aP+uM4AAAAASUVORK5CYII="></span></div>
						</div>
					</div>
					<div class="nav-item-box">
						<div class="nav-item-header">
							<div class="header-left">
								<div class="img-box"></div>
								<div class="title">篮球</div>
							</div>
							<div class="header-right">今日<span class="num" v-if="schedule.basketball">{{schedule.basketball.count}}</span>场比赛</div>
						</div>
						
						<div class="nav-item-content">
							<ul v-if="schedule.football">
								<li class="" @click="type = 2,activeIndex = -2" :class="activeIndex == -2?'active':''">全部</li>
								<li v-for="(item,index) in schedule.basketball.list"  @click="type = 2,activeIndex = item.sourceid" :class="item.sourceid == activeIndex?'active':''" v-show="index <  scheduleBaskindex">
									{{item.short_name_zh}}
								</li>
							</ul>
							<div class="expand-box"  v-if="scheduleBaskindex == 8" @click="setBaskIndex()">
								<span class="text">展开</span><span class="icon-box">
								<img
										src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAKCAYAAAC9vt6cAAAAAXNSR0IArs4c6QAAAL5JREFUKBWVkM0NwyAMhUNAYobM0WPVJYqEWKILZQI4ZIieov7NkRnogdQPNQholShIgPH7bKzHnHPHEMJ1nmfe7FuBMXZq6XhQ8X1fbaRvnPMnQzgMQ+e9f1HYRWn7mKSUB6XU1IJFIIRQNM17qxYMWNSAjQ0QaK1HEi+I1xYYsAuTGiBhjOkJ6BexvqGByfNFAwhkDKZIP2Tw+NWyVNNEE4sMPf6Ymkyr2Z8JAOSm0tiFaXWD1be19oy9Bn0AZZ8/YJAiJD8AAAAASUVORK5CYII="></span>
							</div>
							<div class="expand-box" v-else @click="setBaskIndex()"><span class="text">收起</span><span class="icon-box"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAKCAYAAAC9vt6cAAAAAXNSR0IArs4c6QAAAMFJREFUKBWVkF0OgyAQhFkh5Qyeo3/xzTOUhCN4oV6CkHAH33zqOTwDjYbuNtoCUpOaGHHnm3EdxnYuY8yN7h2EwS/RWtvM89yTzjlvtdZDiS0GOOdq7/0DDfViGqWUR6XUmIdU+QC/fECzi8yEUKAjLec3Abj2HaEmB2m2aImUBGBhXQihS4johTRiotG3xLU0hDZrJgaAZ1zqu8RCabGndP6UClTMNE09UqX/LpnX2SCEaCtc+QwAl3X6x/OKpZ5eFtxW5aP+uM4AAAAASUVORK5CYII="></span></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="schedule-page-main">
			<section class="title-box">
				<div class="title">赛程</div>
			</section>
			<section class="weekdate-box">
				<div class="arrow arrow-left" @click="settabIndex(1)"><span class="pointer"><img class="arrow-img"
							src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAiJJREFUaAXt2M8rhEEYB/Dned9dpEg5qD0JS5F/ACclyoEcODi5bOTg6iJ7UJsbF8X/sCsHV0ellAvaFU4ixz2QrN3xjtp6ZVdjdn48b2Zq2vedZp53Pt/3svMCuOYScAm4BFwCLgGXgEvgvyXwkFvt5F2329P9AJH6hVxq/YWVnnnPH6ZWRNbIzrEOLmSX04xBhgH4vEMFtmQxIuusgr+wUNn8tlHEx2/3im9iiusJl6uFRYBizIcl4SISE6284XpY9GGyd2b/XMIhvCQI1Wz7Dds/e3CmezdGwbaxPExjYApYY2AqWCNgSljtYGpYrWCKWG1gqlgtYMpY5WDqWKXgKGCVgaOCVQKOErZhcD6bOgyKzPJC1Rb8Vy3yU4+Jg0D1mX/5lT4e3h0tLwYPihSWByMNLn+w4R/JIrtMJhMXP8YJDUiD/faOjIfwGrYwhqM3hcccu0o3hccpXUuDeye2i02trX0I3m0YFHyQm6aMlgZzZPfUzlM81jyGiNdRQSv5AHB/tNZVKr+dMMYGw3BEOO4fSMzhUPo9PG7zWgmYA6KCVgaOClopOApo5WDqaC1gymhtYKporWCKaO1gamgjYEpoY2AqaKNgCmjjYNvohk5LfPMyrWdm9znut4zXPGXln/ZkaoqusQLmm6uLBlgQ3bzMPGvgumhkpzIQ0TVWwVV0rI2NeB5u8B5vg3nRzbt5LgGXgEvAJeAScAm4BEgn8AnkBXkOOoQHeQAAAABJRU5ErkJggg=="></span>
				</div>
				<div class="content" id="content" style="" v-if="tabIndex == 0">
					<div class="content-item-box" 
						v-for="(item,index) in dateTime"
						:key="index"
						v-show="index < 7"
						:class="dateIndex == index?'content-item-active':''"
						@click="dateIndex = index">
						<p class="weekdate">{{item.time}}</p>
						<!-- <p class="date">(512场比赛)</p> -->
						<p class="date">{{dateIndex == index ?`(${total}场比赛)`:item.day}}</p>
					</div>
				</div>
				<div class="content" id="content" style="" v-if="tabIndex == 1">
					<div class="content-item-box" 
						v-for="(item,index) in dateTime"
						:key="index"
						v-show="index > 6 && index < 14"
						:class="dateIndex == index?'content-item-active':''" 
						@click="dateIndex = index"
						>
						<p class="weekdate">{{item.time}}</p>
						<!-- <p class="date">(512场比赛)</p> -->
						<p class="date">{{dateIndex == index ?`(${total}场比赛)`:item.day}}</p>
					</div>
				</div>
				<div class="content" id="content" style="" v-if="tabIndex == 2">
					<div class="content-item-box " 
						v-for="(item,index) in dateTime"
						:key="index"
						v-show="index > 13"
						:class="dateIndex == index?'content-item-active':''" 
						@click="dateIndex = index">
					
						<p class="weekdate">{{item.time}}</p>
						<!-- <p class="date">(512场比赛)</p> -->
						<p class="date">{{dateIndex == index ?`(${total}场比赛)`:item.day}}</p>
					</div>
				</div>
				<div class="arrow arrow-right" @click="settabIndex(0)"><span class="pointer"><img class="arrow-img"
							src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAh1JREFUaAXt2M9LAkEUB/A3rv1AkoJunUKzunTuUKdACjpoCF66dBIjunfLIJBuRYfK/yGrY/9AEARdKlqpWxgeg+pSOu0E0rqUrtK894oZGNwf4877fP0BMwCmmQRMAiYBk4BJwCRgEvgvCTwUVwZV5+IJ6Czk9iiz/CLfKqrbxcyazrn8PlsrGGqwKQGszy4hbx9mc34L0zVOK1gAPLoLl1Bbp0ZrBQeDYslBP3FCawVHEwcXwoJZTminFv2tdJyZlFU4dX7L/e7ZBAQ2xlL7Ofc13ccoYIXggkYDc0Gjgjmg0cHUaBIwJZoMTIUmBVOgycHYaBZgTDQbMBaaFRgDzQ6sG80S3Azt3DseTxUW1JhOmtblYScF1d8zmiycf7e0dO4n70+yi/Vx7b6yBStILDZ0CUJeeVHVdznhveb3POh3IPY4eZ3rLtnlopRiyj13QMCrFR7Iu6+1c8zyE/7Cwrwb42wY3HWHQiPR+FbDtpF7TKtjduAfsULcdAV7pofnths2BlsBvfdZ/Us3xVq9M5HETsULaPecDRgDq8JhAcbCsgBjYsnB2FhSMAWWDEyFJQFTYtHB1FhUMAcsGpgLFgXMCasdzA2rwFrXw7Zd3gPpWeKpVc8vLQQUoN2md3koRdpdkCDGqlr0goU8q4M5YFUtWr/SXWFIV5/FqprI6pO7kfhOxzsV6hmmmQRMAiYBk4BJwCRgEvhTCXwA1Nhuw72w+M8AAAAASUVORK5CYII="></span>
				</div>
			</section>
			<section class="date-box">
				<div class="icon-left"></div>
				<div class="date">
					<span class="date-digital" v-if="dateTime[dateIndex].day">{{(dateTime[dateIndex].day).slice(0,2)}}</span>
					<span>月</span>
					<span class="date-digital" v-if="dateTime[dateIndex].day">{{(dateTime[dateIndex].day).slice(-2)}}</span>
					<span>日</span> 
				</div>
				<div class="tab tab2 " @click="allIndex = 0" :class="allIndex == 0?'active':''">
					<span>所有</span>
				</div>
				<div class="tab tab1" v-if="dateIndex == 7" @click="allIndex = 1" :class="allIndex == 1?'active':''">
					<span>直播中</span>
				</div>
			</section>
			<section class="content-box" v-infinite-scroll="load" v-loading="loadingStaus">
				<div class="content-item-schedule" v-for="(item,index) in list" :key="index">
					<div class="box2">
						<div>
							<div class="line">
								<div class="img-box">
									<img class="decImg"
										:src="item.home_team_logo?item.home_team_logo:require('../../assets/images/team.png')"
										width="64" height="64">
										</div>
								<div class="team-name">{{item.home_team_name}}</div>
								<div class="score">{{item.home_scores}}</div>
							</div>
							<div class="line">
								<div class="img-box">
									<!-- <img class="decImg"
										:src="type == 'football'?item.away_team_log:item.away_team_data.logo"
										width="64" height="64"> -->
									<img class="decImg" :src="item.away_team_logo?item.away_team_logo:require('../../assets/images/team.png')"
										width="64" height="64">
										</div>
								<div class="team-name">{{item.away_team_name}}</div>
								<div class="score">{{item.away_scores}}</div>
							</div>
						</div>
					</div>
					<div class="box1">
						<div class="line line1">{{item.competition}}</div>
						<div class="line line2"><span class="time">{{item.match_time}}</span></div>
						<div class=" line line3">
							<!-- <div v-if="allIndex == 1">
								<button class="to-live-button">去观看</button>
								<span class="live-status">直播中</span>
							</div> -->
								
							<div v-if="item.status_type == 1">
								<router-link tag="a" target="_blank" :to="JSON.stringify(item.anchorList) === '{}'?'/score-live?type='+(item.type == 1?'basketball':'football')+'&id='+item.sourceid+ '&vid=' + item.vid :'/live?router=live&type='+item.type+'&id='+item.sourceid + '&uid=' + item.anchorList.id+ '&vid=' + item.vid  ">
									<button class="to-live-button">去观看</button>
									<span class="live-status">直播中</span>
								</router-link>
							</div>
							<div id="" v-else-if="item.status_type == 0 && item.reserve == 0">
								<div class="wei-yu-yue" @click="getReserveMatch(item)"><span>预约</span></div>
							</div>
							<!-- @click="getReserveMatch(item)" 列表中取消已预约 -->
							<div class="yi-yu-yue" v-else-if="item.status_type == 0 && item.reserve == 1">
								<span class="yi-yu-yue-test" id="flag0"  >
									已预约
								</span>
								<!-- <span class="gameStatus">未开始</span> -->
							</div>
							<div id="" v-else-if="item.status_type == 2">
								<span class="gameStatus">已结束</span>
							</div>
						</div>
					</div>
					<div class="box3-schedule">
						<div class="arrow arrow-left">
							<div class="img-box"></div>
						</div>
						<div class="content-schedule">
							<!-- {{item.anchor}} -->
							<div class="man-item" v-for="(item1,index1) in item.anchor" :key="index1">
								<div class="img-box">
									<div class="anchor-empty">
										<router-link tag="a" v-if="item1.avatar" target="_blank" :to="'/live?router=live&type='+item.type+'&id='+item.sourceid + '&uid=' + item1.id">
											<img :src="item1.avatar"  alt="">
										</router-link>
									</div>
								</div>
								<div class="name">{{item1.user_nickname}}</div>
							</div>
						</div>
						<div class="arrow arrow-right"></div>
					</div>
				</div>

			</section>
		<!-- <TcVideoPlayer /> -->

		</div>
	</div>
</template>

<script>
// import TcVideoPlayer from '../../components/tencentPlayer.vue'


	import {
		football_match
	} from "@/api/football.js";
	import {
		scheduleList,
		scheduleMatch
	} from "@/api/competition.js";
	import {
		getList
	} from "@/api/basketball.js";
	import {reserveMatch2} from "@/api/user.js"
	export default {
		components:{
			// TcVideoPlayer
		},
		data() {
			return {
				page: 1,
				list: [],
				total:null,
				allIndex:0,
				tabIndex: 1,
				schedule:{},//赛事分类
				dateTime: [],
				dateIndex: 7,
				activeIndex:0,//赛事分类选中
				loading: false,
				type: 0,
				loadStatus: 'more',
				loadingStaus: false,
				scheduleBaskindex:8,
				scheduleFootindex:8
			}
		},
		mounted() {
			this.get6Days()
			// this.getScheduleMatch()
			// this.getBasketballlist()
			// this.getFootballlist(2)
			this.scheduleList()
		},
		watch: {
			dateIndex(e) {
				this.list = []
				this.page = 1
				this.allIndex = 0
				this.reset(this.type)
				this.getScheduleMatch()
			},
			type(e) {
				this.list = []
				this.page = 1
				this.reset(e)
			},
			allIndex(e){
				this.list = []
				this.page = 1
				this.scheduleList()
			},
			activeIndex(e){
				this.list = []
				this.page = 1
				this.scheduleList()
			},
			
			
		},
		methods: {
			
			// 预约赛事
			getReserveMatch(item) {
				if(JSON.stringify(this.infos) === '{}' || JSON.stringify(this.infos) === undefined){
					return this.$store.state.user.showLoginMask = true
				}
				reserveMatch2({
					type:item.type,
					match_id: item.sourceid
				}).then(res => {
					if (item.reserve == 0) {
						item.reserve = 1
					} else {
						item.reserve = 0
					}
					this.$message.success('预约成功！')
				}).catch(res => {
			
				})
			},
			// 获取赛事列表
			scheduleList(){
				var d = new Date();
				let data = {
					page:this.page,
					live:this.allIndex,
					match_type:this.type,
					compensation_id:this.activeIndex == 0 || this.activeIndex == -1 || this.activeIndex == -2 ?0:this.activeIndex,
					date:this.dateTime[this.dateIndex].data1,
					// match_type:this.activeIndex == 0?0:this.activeIndex == -1?1:this.activeIndex == -2?2:''
				}
				scheduleList(data).then(res=>{
					// 
					let arr = []
					for (let i = 0; i <5; i++) {
						let i = {user_nickname:'',avatar:'',}
						arr.push(i)
					}
					
					
					this.total = res.data.total
					res.data.data.forEach((item,index)=>{
						item.anchorList = {}
						if(item.anchor.length != 0) {
							item.anchorList = item.anchor[0]
						}
						// item.anchor.forEach((itme1,index1)=>{
						// 	arr[index1] = itme1
						// })
						// item.anchor = arr
					})
					this.count = res.data.total
					this.list = [...this.list, ...res.data.data]
					if (res.data.total > this.list.length) {
						this.page++
						this.loading = true
						this.loadStatus = 'more'
					} else {
						this.loadStatus = 'noMore'
					}
				}).catch(res=>{})
			},
			
			
			// 获取左边赛事两个列表
			getScheduleMatch(){
				var d = new Date();
				let data= {
					date:this.dateTime[this.dateIndex].data1,
				}
				scheduleMatch(data).then(res=>{
					this.schedule = res.data
				}).catch(res=>{})
			},
			
			setBaskIndex(){
				if(this.scheduleBaskindex == 8) {
					return this.scheduleBaskindex = this.schedule.basketball.list.length
				}else {
					return this.scheduleBaskindex = 8
				}
				
			},
			setFootIndex(){
				if(this.scheduleFootindex == 8) {
					return this.scheduleFootindex = this.schedule.football.list.length
				}else {
					return this.scheduleFootindex = 8
				}
			},
			
			// 切换列表
			reset(type) {
				this.list = []
				this.page = 1
				this.loadingStaus = true
				
				this.scheduleList()
				setTimeout(res=>{
					this.loadingStaus = false
				},1500)
			},


			// 左右切换
			settabIndex(type) {
				if (type == 1) { //左
					if (this.tabIndex == 0) return
					this.tabIndex--
				} else { //右
					if (this.tabIndex == 2) return
					this.tabIndex++
				}
			},
			// 获取篮球赛程
			getFootballlist(NumType) {
				let data = {
					type: NumType,
					page: this.page,
					time: this.dateTime[this.dateIndex].data1
				}
				football_match(data)
					.then((res) => {
						this.list = [...this.list, ...res.data.data]
						this.total = res.data.total
						if (res.data.total > this.list.length) {
							this.page++
							this.loading = true
							this.loadStatus = 'more'
						} else {
							this.loadStatus = 'noMore'
						}
						// this.list = res.data.data
					})
					.catch((res) => {});
			},
			// 获取足球赛程
			getBasketballlist(NumType) {
				let data = {
					type: NumType,
					page: this.page,
					time: this.dateTime[this.dateIndex].data1
				};
				getList(data).then((res) => {
						this.list = [...this.list, ...res.data.data]
						this.total = res.data.total
						if (res.data.total > this.list.length) {
							this.page++
							this.loading = true
							this.loadStatus = 'more'
						} else {
							this.loadStatus = 'noMore'
						}
					})
					.catch((res) => {});
			},
			// setDate(type){
			// 	setTimeout(res=>{
			// 		console.log(this.dateTime[this.dateIndex])
			// 		if(type == 1){//月
			// 			return (this.dateTime[this.dateIndex].day).slice(0,2)
			// 		}else {//日
			// 			return (this.dateTime[this.dateIndex].day).slice(-2)
			// 		}
			// 	},200)
			// },
			// 加载更多
			load(e) {
				if (this.loadStatus == 'more' && this.loading) {
					// this.loading = false
					this.scheduleList()
				}
			},
			// 时间戳转时间
			timeStamp(value) {
				var date = new Date(value * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var year = date.getFullYear();
				var month = ("0" + (date.getMonth() + 1)).slice(-2);
				var sdate = ("0" + date.getDate()).slice(-2);
				var hour = ("0" + date.getHours()).slice(-2);
				var minute = ("0" + date.getMinutes()).slice(-2);
				var second = ("0" + date.getSeconds()).slice(-2);
				// 拼接
				var result = hour + ":" + minute //+ ":" + second;
				// 返回
				return result;
			},
			// 获取两周时间
			get6Days(type) {
				//type==1前,2后
				//获取系统当前时间
				var now = new Date();
				var oneDayTime = 24 * 60 * 60 * 1000;
				var nowTime = now.getTime() - oneDayTime * 7;
				let arr = [];
				let n = 21
				for (var i = 0; i < n; i++) {
					//显示周一
					var ShowTime = nowTime + i * oneDayTime;

					// var ShowTime = nowTime + (i+1)*oneDayTime ;
					//初始化日期时间
					var myDate = new Date(ShowTime);
					var year = myDate.getFullYear();
					var month = myDate.getMonth() + 1;
					var date = myDate.getDate();
					var str = "星期" + "日一二三四五六".charAt(myDate.getDay());
					arr.push({
						data1:year + "-" + month + "-" + date.toString().padStart(2, "0"),
						data: month + "-" + date.toString().padStart(2, "0"),
						time: str,
						day: month + "-" + date.toString().padStart(2, "0"),
					});
				}
				this.dateTime = arr;
				console.log('dateTime',this.dateTime)
				this.getScheduleMatch()
			},
		}
	}
</script>

<style>
	/* @import url("../../styles/schedule.css"); */
	.anchor-schedule-page {
		margin-top: 62px;
		position: relative;
		padding-top: 20px;
	}
</style>
