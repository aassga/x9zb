<template>
	<div class="contents-main">
		<!-- 鼠标移入显示指数 -->
		
		<div class="contents" style="position: relative;">
			<div class="pop-tip-handicap" v-if="fightMask" style="position:fixed;right: 0;z-index: 9999;left: auto;" :style="{top:(top + 20) + 'px',right:(right - 1200)+'px'}">
				<div class="pop-header">
					<div class="left">
						<p class="team-name text-right opacity">
							{{lang==1?exponent.home_team_name_zht:lang==2?exponent.home_team_name_en:exponent.home_team_name_zh}}
						</p>
						<p class="vs">
							<span class="opacity">{{exponent.home_score}}</span><span>-</span><span
								class="">{{exponent.away_score}}</span>
						</p>
						<p class="team-name">
							{{lang==1?exponent.away_team_name_zht:lang==2?exponent.away_team_name_en:exponent.away_team_name_zh}}
						</p>
					</div>
					<a target="_blank" href="/score-detail/three?matchId=undefined&amp;sportId=1">
						<div style=" display: inline-block; max-width: 100%; overflow: hidden; position: relative; box-sizing: border-box; margin: 0px; "> <!-- <div style="box-sizing: border-box; display: block; max-width: 100%" @click="setId(item)">
								<img alt="" :src="footList.indexOf(item.id) == -1?require('@/assets/images/check.png'):require('@/assets/images/check1.png')" style="" />
							</div> -->
			
						</div>
					</a>
				</div>
				<div class="table">
					<div class="col_one">
						<div class="item bg-color">盘</div>
						<div class="item color-000">初盘</div>
						<div class="item color-000">即时</div>
						<div class="item color-000">滚球</div>
					</div>
					<div class="col_two">
						<div class="item title bg-color">让球指数</div>
						<div class="item chupan" v-if="expIndex.asia.initial.sealing_disk != 1">
							<div class="left"><span class="val">{{expIndex.asia.initial.win}}</span></div>
							<div class="middle"><span class="val">{{expIndex.asia.initial.draw}}</span></div>
							<div class="right"><span class="val">{{expIndex.asia.initial.fail}}</span></div>
						</div>
						<div class="item chupan" v-else>
							封
						</div>
						<div class="item jishi" v-if="expIndex.asia.immediate.sealing_disk != 1">
							<div class="left"><span class="val">{{expIndex.asia.immediate.win}}</span></div>
							<div class="middle"><span class="val">{{expIndex.asia.immediate.draw}}</span></div>
							<div class="right"><span class="val">{{expIndex.asia.immediate.fail}}</span></div>
						</div>
						<div class="item chupan" v-else>
							封
						</div>
						<div class="item gunqiu" v-if="expIndex.asia.scram.sealing_disk != 1">
							<div class="left"><span class="val">{{expIndex.asia.scram.win}}</span></div>
							<div class="middle"><span class="val">{{expIndex.asia.scram.draw}}</span></div>
							<div class="right"><span class="val">{{expIndex.asia.scram.fail}}</span></div>
						</div>
						<div class="item chupan" v-else>
							封
						</div>
					</div>
					<div class="col_thr">
						<div class="item title bg-color">大小指数</div>
						<div class="item chupan" v-if="expIndex.bs.initial.sealing_disk != 1">
							<div class="left"><span class="val">{{expIndex.bs.initial.win}}</span></div>
							<div class="middle"><span class="val">{{expIndex.bs.initial.draw}}</span></div>
							<div class="right"><span class="val">{{expIndex.bs.initial.fail}}</span></div>
						</div>
						<div class="item chupan" v-else>
							封
						</div>
						<div class="item jishi" v-if="expIndex.bs.immediate.sealing_disk != 1">
							<div class="left"><span class="val">{{expIndex.bs.immediate.win}}</span></div>
							<div class="middle"><span class="val">{{expIndex.bs.immediate.draw}}</span></div>
							<div class="right"><span class="val">{{expIndex.bs.immediate.fail}}</span></div>
						</div>
						<div class="item chupan" v-else>
							封
						</div>
						<div class="item gunqiu" v-if="expIndex.bs.scram.sealing_disk != 1">
							<div class="left"><span class="val">{{expIndex.bs.scram.win}}</span></div>
							<div class="middle"><span class="val">{{expIndex.bs.scram.draw}}</span></div>
							<div class="right"><span class="val">{{expIndex.bs.scram.fail}}</span></div>
						</div>
						<div class="item chupan" v-else>
							封
						</div>
			
					</div>
					<div class="col_four">
						<div class="item title bg-color">欧赔</div>
						<div class="item chupan" v-if="expIndex.eu.initial.sealing_disk != 1">
							<div class="left"><span class="val">{{expIndex.eu.initial.win}}</span></div>
							<div class="middle"><span class="val">{{expIndex.eu.initial.draw}}</span></div>
							<div class="right"><span class="val">{{expIndex.eu.initial.fail}}</span></div>
						</div>
						<div class="item chupan" v-else>
							封
						</div>
						<div class="item jishi" v-if="expIndex.eu.immediate.sealing_disk != 1">
							<div class="left"><span class="val">{{expIndex.eu.immediate.win}}</span></div>
							<div class="middle"><span class="val">{{expIndex.eu.immediate.draw}}</span></div>
							<div class="right"><span class="val">{{expIndex.eu.immediate.fail}}</span></div>
						</div>
						<div class="item chupan" v-else>
							封
						</div>
						<div class="item gunqiu" v-if="expIndex.eu.scram.sealing_disk != 1">
							<div class="left"><span class="val">{{expIndex.eu.scram.win}}</span></div>
							<div class="middle"><span class="val">{{expIndex.eu.scram.draw}}</span></div>
							<div class="right"><span class="val">{{expIndex.eu.scram.fail}}</span></div>
						</div>
						<div class="item chupan" v-else>
							封
						</div>
			
			
					</div>
				</div>
			</div>
			<div class="football-score-container list-view" :style="{ height: `${height}px`,marginTop:topShow?'100px':'40px' }" ref="contens"
				@mouseover.stop="changeFlag(true)" @scroll="handleScroll($event)" style="width: 1200px;">
				<section class="container-section " style="box-shadow: rgb(238, 238, 238) 0px 1px 0px 0px inset;">
					<div class="list-view-phantom" :style="{height: contentHeight}"></div>
					<ul ref="content" class="list-view-content">
						<template v-for="(item, index) in visibleData">
							<li :data-index="index" data-list="arrList1" :style="{
								height: itemHeight + 'px'
							}" class="football-score-item flex-center" style="position: relative;font-size: 14px;color: #9197ad;flex-wrap: nowrap;" v-if="!item.type">
								<img :src="item.imgUrl" class="logo-title">
								{{item.competition_name_zh}}
							</li>
							<li :data-index="index" :data-id="item.id" :ref="item.id" data-list="arrList1" :style="{
							height: itemHeight + 'px',marginBottom: item.note?'31px':''
						}" class="football-score-item" style="position: relative;" v-else>
								<!---->
								
								<div class="football-score-item-add-time immediate"
									style="position: absolute;bottom: -32px;left: 0;">
									<div class="desc-wrap">
										<div class="desc">
											{{item.note}}
											 <!-- 90分钟[1-1],120分钟[1-1],点球[5-4],托拉斯胜出 -->
											<!-- {{item.status == 5?item.overtime:item.penalty_kick}} -->
										</div>
									</div>
								</div>
								
								<div class="gou width40">
									<div  @click="setId(item)" style="display: inline-block; max-width: 100%; overflow: hidden; position: relative; box-sizing: border-box; margin: 0px;">
										<div style="box-sizing: border-box; display: block; max-width: 100%;">
											<img alt="" style="width: 20px;" :src="footList.indexOf(item.id) == -1?require('@/assets/images/check.png'):require('@/assets/images/check1.png')">
										</div>
									</div>
								</div>
								<div class="match-field width93">
									<div class="football-league-name-container false" style="height: 44.5px;">
										<div class="football-league-color-block" :style="{background: item.primary_color}"> </div>
										<div class="football-league-logo">
											<img :src="item.competition_logo" width="56" height="56"
												class="football-league-logo-img">
										</div>
										<div class="league-name ellipsis search-by-team-name" v-html="lang==1?item.competition_name_zht:lang==2?item.competition_name_en:item.competition_name_zh"></div>
									</div>
								</div>
								<div class="time width32 text-center">{{ $common.timeStamp(item.time) }}</div>
								<div class="match-status width40 football-all-status" >
									
									<span class="point-animation" style="color: rgb(255, 67, 67);" v-if="item.match_str || item.status == 3">{{item.status == 3?'中':item.match_str}}</span>
									<span class="" v-else>{{item.status == 1?'未':item.status_str}}</span>
									<!-- <span class="point-animation" style="color: rgb(255, 67, 67);">{{item.status == 3?'中':item.match_str:item.status_str}}</span> -->
								</div>
								<div class="teamName-and-vs football-score-item-teamRank width420">
									<div class="team-info host-container width189" :class="jinIdLeft == item.id?'score-item-goal-left':''">
										<!-- 旋转足球图标 -->
										<img src="../assets/images/icon-1.png" alt="goal" class="score-item-ball-left">
										<div class="card red-card" v-if="item.home_red_card != 0 && game.red">
											{{ item.home_red_card }}
										</div>
										<div class="card yellow-card" v-if="item.home_yellow_card != 0 && game.yellow">
											{{ item.home_yellow_card }}
										</div>
										<div class="name ellipsis search-by-team-name"
											v-html="lang==1?item.home_team_name_zht:lang==2?item.home_team_name_en:item.home_team_name_zh">
											<!-- {{}} -->
										</div>
									</div>
									<!-- @mouseleave="ishow = false,current = null" -->
									<div class="hover-box" @mouseenter="mouseenter1(index,4,item)" @mouseleave="ishow = false,current = null">
										<!-- 判断是否进行中得比分显示 -->
										<div slot="reference" class="vs width42 bf" v-if="item.status != 1">
											<span style="color: rgb(255, 67, 67);">{{item.home_score}}</span>
											<span data-a="0" data-b="2" style="color: rgb(255, 67, 67);">-</span>
											<span style="color: rgb(255, 67, 67);">{{item.away_score}}</span>
										</div>
										<div slot="reference" class="vs width42 bf" v-else>
											<span data-a="0" data-b="0" style="color: rgb(145, 151, 173)">-</span>
										</div>
										<div class="components-box" style="position: relative;">
											<exponent v-show="ishow && exponent.id == item.id" :tlive="tlive"
												:tliveLoading="tliveLoading"></exponent>
										</div>
									</div>
									<div class="team-info guest-container width189 " :class="jinIdRight == item.id?'score-item-goal-right':''">
										<div class="name ellipsis search-by-team-name"
											v-html="lang==1?item.away_team_name_zht:lang==2?item.away_team_name_en:item.away_team_name_zh">
										</div>
										<div class="card yellow-card" v-if="item.away_yellow_card != 0  && game.yellow">
											{{ item.away_yellow_card }}
										</div>
										<div class="card red-card" v-if="item.away_red_card != 0  && game.red">
											{{ item.away_red_card }}
										</div>
										<!-- 旋转的足球 -->
										<img src="../assets/images/icon-1.png" alt="goal" class="score-item-ball-right">
									</div>
								</div>
								<div class="variable width554" style="position: relative;">
									<div class="immediate">
										<div class="model-one width180">
											<div class="half width66 text-center">
												<span>{{ item.half_score }}</span>
											</div>
											<div class="corner width48 text-left">
												<span>{{ item.corner_kick }}</span>
											</div>
											<div class="live">
												<div class="football-score-item-live">
													<a :href="'/score-live?type=football&id='+item.id + '&competainId='+id+ '&vid=' + item.vid " class="" target="_blank">
														<div class="left"><img src="../assets/images/f-11.png" alt=""></div>
													</a>
													<div class="right" v-if="item.anchor && item.anchor.id">
														<router-link tag="a" target="_blank"
															:to="'/live?router=live&type=football&id='+item.anchor.match_id + '&uid=' + item.anchor.id + '&vid=' + item.vid">
															<img class="live-anchor" :src="item.anchor.avatar" alt="" width="36"
																height="36" title="" />
														</router-link>
													
													</div>
													<!---->
												</div>
											</div>
										</div>
										<div class="h45-w1-border"></div>
										<!--  @mouseleave="mousemove" 鼠标移入显示指数弹窗-->
										<div class="model-two width224"  ref="model"  @mouseleave="mousemove" @mouseenter="mouseenter(index,2,item)">
											<div class="football-score-item-odds">
												<div class="odds-handicap" style="display: flex" v-if="immediately.value1">
													<!-- odds-down -->
													<div class="left football"
														:class="item.asia.scram.win == 1?'odds-up':item.asia.scram.win == 2?'odds-down':''">
														{{item.exponent.asia.scram.win}}
													</div>
													<div class="middle football"
														:class="item.asia.scram.draw == 1?'odds-up':item.asia.scram.draw == 2?'odds-down':''">
														{{item.exponent.asia.scram.draw}}
													</div>
													<div class="right football"
														:class="item.asia.scram.fail == 1?'odds-up':item.asia.scram.fail == 2?'odds-down':''">
														{{item.exponent.asia.scram.fail}}
													</div>
												</div>
												<div class="odds-dx" style="display: flex" v-if="immediately.value2">
													<div class="left football"
														:class="item.bs.scram.win == 1?'odds-up':item.bs.scram.win == 2?'odds-down':''">
														{{item.exponent.bs.scram.win}}
													</div>
													<div class="middle football" 
														:class="item.bs.scram.draw == 1?'odds-up':item.bs.scram.draw == 2?'odds-down':''">
														{{item.exponent.bs.scram.draw}}
													</div>
													<div class="right football"
														:class="item.bs.scram.fail == 1?'odds-up':item.bs.scram.fail == 2?'odds-down':''">
														{{item.exponent.bs.scram.fail}}
													</div>
												</div>
												<div class="odds-dx" style="display: flex" v-if="immediately.value3">
													<div class="left football"
														:class="item.eu.scram.win == 1?'odds-up':item.eu.scram.win == 2?'odds-down':''">
														{{item.exponent.eu.scram.win}}
													</div>
													<div class="middle football"
														:class="item.eu.scram.draw == 1?'odds-up':item.eu.scram.draw == 2?'odds-down':''">
														{{item.exponent.eu.scram.draw}}
													</div>
													<div class="right football"
														:class="item.eu.scram.fail == 1?'odds-up':item.eu.scram.fail == 2?'odds-down':''">
														{{item.exponent.eu.scram.fail}}
													</div>
												</div>
											</div>
											<!-- :style="{left: left,top: top}" v-if="fightMask && item.id == exponent.id" -->
											
										</div>
										
										<div class="data width87" style="justify-content: space-around;">
											<div>
												<router-link tag="a" target="_blank"
													:to="'/score-detail?type=football&id='+item.id">指数</router-link>
											</div>
											<div>
												<router-link tag="a" target="_blank"
													:to="'/score-detail?type=football&tabIndex=4&id='+item.id">分析</router-link>
											</div>
										</div>
										<div class="match width74">
											<div class="football-score-item-operation">
												<img @click="setCollect(item)"
													:src="item.is_collect == 1?require('../assets/images/shoucang1.png'):require('../assets/images/shoucang.png')"
													class="collect">
												<div class="arrow-top arrow-solid"  @click="setTop(item,index)" v-if="topList1.indexOf(item.id) != -1"></div>
												<img v-else @click="setTop(item,index)" src="../assets/images/top.png" class="arrow-top">
											</div>
										</div>
									</div>
								</div>
							</li>
						</template>
					</ul>
				</section>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		match_filter,
		football_match,
		footballOddsList,
		getfootballDetail
	} from "@/api/football.js";
	import {
		collect
	} from "@/api/common.js";
	import exponent from "./score/exponent.vue"
	import football_detail from "./score/football_detail.json"
	export default {
		name: 'ListView',
		props: {
			list: {
				type: Array,
				default:[]
			},
			lang: {
				type: Number,
				default: 0
			},
			height: {
				type: Number,
				default: 300
			},
			itemHeight: {
				type: Number,
				default: 45
			},
			topShow:{
				type: Boolean,
				default: false
			},
			id: {
				type: Number,
				default: null
			
			},
			topList:{
				type: Array,
				default:[]
			}
		},
		components: {exponent},
		computed: {
			// topList() {
			// 	// console.log(JSON.parse(localStorage.getItem('topList')));
			// 	return JSON.parse(localStorage.getItem('topList')) || []
			// },
			
			contentHeight() {
				return this.list.length * this.itemHeight + 'px';
			},
			mainHeight() {
				let contentHeight = this.list.length * this.itemHeight - 60
				let screen = document.documentElement.clientHeight
				this.$emit('getHeight', (contentHeight / this.height) * screen)
				return ((contentHeight / this.height) * screen)
			},
			// 显示红黄牌
			game() {
				return this.$store.state.game
			},
			immediately() {
				return this.$store.state.immediately
			},
		},
		mounted() {
			// this.getList();
			// this.$nextTick(res=>{
			// 	this.updateVisibleData();
			// })
				setTimeout(()=>{
					let height = (1 / (this.list.length * this.itemHeight)) * this.mainHeight
					this.$emit('setHeight', height)
				},1000)
		},
		data() {
			return {
				top:0,//距离顶部的距离
				right:0,//距离右边的距离
				time:null,
				ishow:false,
				tliveLoading:false,
				footList:[],
				flag: false,
				scrollTopOld:0,
				tlive:{},//
				topList1:[],
				exponent:{},//鼠标移入获取的下标
				expIndex:{},//鼠标移入指数弹窗显示的参数
				fightMask: false, //指数弹窗
				dataMask: false, //对战弹窗
				visibleData: [],
				jinIdLeft: null, //进球提示
				jinIdRight: null, //进球提示
				comparisonID:0,//状态被修改（锁
			};
		},
		watch:{
			list(val){
				this.update()
			},
			topList(e){
				this.topList1 = e
			},
		},
		methods: {
			/* 修改赛事 */
			editItem(value){
				// 监听接收的指数-
				let _this = this
				/* 有时会为空 */
				
				let dom1 = this.$refs[value.sourceid]
				if(value.type == 'football_exponent') {
					if(value.sourceid == undefined) return
					dom1 = this.$refs[value.sourceid]
				}else if(value.type == 'football_match') {
					if(value.id == undefined) return
					dom1 = this.$refs[value.id]
				}
				/* 处理指数 */
				if (value.type == 'football_exponent' && dom1 != undefined) {
					
					if (dom1[0] == undefined) return
					let obj = dom1[0].dataset //index ,list ,id
					let item = this.visibleData[Number(obj.index)]
					if (item[value.name] != undefined && item.id == value.sourceid) {
						item[value.name][value.name1].draw = _this.setExp(Number(item.exponent[value.name][value.name1].draw),
							Number(value.exponent[value.name][value.name1].draw))
						item[value.name][value.name1].fail = _this.setExp(Number(item.exponent[value.name][value.name1].fail),
							Number(value.exponent[value.name][value.name1].fail))
						item[value.name][value.name1].win = _this.setExp(Number(item.exponent[value.name][value.name1].win),
							Number(value.exponent[value.name][value.name1].win))
						if (item[value.name][value.name1].timer == undefined || item[value.name][value.name1].timer == null) {
							item[value.name][value.name1].timer = setTimeout(res => {
								item[value.name][value.name1].draw = 0
								item[value.name][value.name1].fail = 0
								item[value.name][value.name1].win = 0
							}, 2000)
						} else {
							clearTimeout(item[value.name][value.name1].timer)
							item[value.name][value.name1].timer = null
						}
						// if(item.status != e.status) {
						// }
						item.exponent = _this.$common.assignDeep(item.exponent, value.exponent)
					}
				}
				
				/* 处理比分 */
				if(value.type == 'football_match' && dom1 != undefined) {
					if (dom1[0] == undefined) return
					let obj = dom1[0].dataset //index ,list ,id
					let item = this.visibleData[Number(obj.index)]
					if(item.id == value.id){
						value.home_team_name_zh = item.home_team_name_zh
						value.away_team_name_zh = item.away_team_name_zh
						if (item.away_score != value.away_score || item.home_score != value.home_score) {
							value.iszhu = 0
							if (item.home_score != value.home_score) {
								value.iszhu = 1
								_this.jinIdLeft = item.id
							} else {
								value.iszhu = 0
								_this.jinIdRight = item.id
							}
							_this.$store.state.goalItem.push(value)
							_this.time = setTimeout(res => { //大球
								_this.$store.state.goalItem.shift()
								if (_this.$store.state.goalItem.length == 0) {
									clearInterval(_this.time)
									_this.time = null
								}
								_this.jinIdLeft = null
								_this.jinIdRight = null
							}, 6000)
						}
						if(item.status != value.status) {
							if (_this.comparisonID == item.id) return
							_this.comparisonID = item.id
							this.$emit('getList')
						}
						Object.assign(item, value)
					}
				}
				
				
				
				
				
				
				
			},
			
			// 0相等 ， 1 大于 ，2小于
			setExp(num1, num2) {
				if (num1 < num2) {
					return 1
				} else if (num1 > num2) {
					return 2
				} else if (num1 == num2) {
					return 0
				}
			
			
			},
			// 搜索高亮
			searchText(inputValue) {
				let _this = this
				if (inputValue) {
					let lang = this.lang == 1 ? 'zht' : this.lang == 2 ? 'en' : 'zh'
					// 每次查询之前清空原数据中标签,防止再次查询时,查不到
					if (document.querySelectorAll('.highlight').length > 0) {
						this.list.forEach((item, index) => {
							if(item['away_team_name_' + lang] == undefined) return
							this.$set(_this.list[index], 'away_team_name_' + lang, item['away_team_name_' +lang].replace(/<[^<>]+>/g, ""))
							this.$set(_this.list[index], 'competition_name_' + lang, item['competition_name_' +lang].replace(/<[^<>]+>/g, ""))
							this.$set(_this.list[index], 'home_team_name_' + lang, item['home_team_name_' +lang].replace(/<[^<>]+>/g, ""))
						})
					}
					const regExp = new RegExp(inputValue, 'g');
					this.list.forEach((item, index) => {
						// 采用$set方法  防止切换数据后,视图不更新
						if(item['away_team_name_' + lang] == undefined) return
						// return
						this.$set(_this.list[index], 'away_team_name_' + lang, item['away_team_name_' + lang].replace(regExp,`<span style="color: red" class="highlight">${inputValue}</span>`))
						this.$set(_this.list[index], 'competition_name_' + lang, item['competition_name_' +lang].replace(regExp,`<span style="color: red" class="highlight">${inputValue}</span>`))
						this.$set(_this.list[index], 'home_team_name_' + lang, item['home_team_name_' + lang].replace(regExp,`<span style="color: red" class="highlight">${inputValue}</span>`))
			
					})
					setTimeout(res => {
						this.$emit('getallNum', document.querySelectorAll('.highlight').length)
						// return document.querySelectorAll('.highlight').length
					}, 2000)
					// this.searchIndex = document.querySelectorAll('.highlight').length
				}else {
					this.clearSearch()
					this.$emit('getallNum', 0)
				}
			},
			// 删除高亮
			clearSearch() {
				let _this = this
				// this.i = 0
				if (document.querySelectorAll('.highlight').length == 0) return
				this.list.forEach((item, index) => {
					let lang = this.lang == 1 ? 'zht' : this.lang == 2 ? 'en' : 'zh'
					if(item['away_team_name_' + lang] == undefined) return
					this.$set(_this.list[index], 'away_team_name_' + lang, item['away_team_name_' + lang].replace(/<[^<>]+>/g, ""))
					this.$set(_this.list[index], 'competition_name_' + lang, item['competition_name_' + lang].replace(/<[^<>]+>/g, ""))
					this.$set(_this.list[index], 'home_team_name_' + lang, item['home_team_name_' + lang].replace(/<[^<>]+>/g, ""))
				})
			},
			/* 收藏 */
			setCollect(item){
				let data = {
					id: item.id,
					type: 2
				}
				collect(data).then(res => {
					if (item.is_collect == 0) {
						this.$message.success('收藏成功')
					} else {
						this.$message.success('已取消收藏')
					}
					item.is_collect = item.is_collect == 0 ? item.is_collect = 1 : item.is_collect = 0
				
				
				}).catch(res => {})
			},
			
			// 移除列表
			mousemove() {
				this.dataMask = false
				this.fightMask = false
			},
			getList() {
				
				// }
			},
			update(){
				this.updateVisibleData(this.scrollTopOld)
			},
			changeFlag(type) {
				this.flag = type
			},
			updateVisibleData(scrollTop) {
				this.scrollTopOld = scrollTop
				scrollTop = scrollTop || 0;
				const visibleCount = Math.ceil(this.$el.clientHeight / this.itemHeight); // 取得可见区域的可见列表项数量
				const start = Math.floor(scrollTop / this.itemHeight); // 取得可见区域的起始数据索引
				const end = start + visibleCount; // 取得可见区域的结束数据索引
				this.visibleData = this.list.slice(start, end); // 计算出可见区域对应的数据，让 Vue.js 更新
				this.$refs.content.style.webkitTransform =
					`translate3d(0, ${ start * this.itemHeight }px, 0)`; // 把可见区域的 top 设置为起始元素在整个列表中的位置（使用 transform 是为了更好的性能）
			},
			handleScroll(e) {
				if (!this.flag) return
				const scrollTop = e.target.scrollTop;
				let height = (e.target.scrollTop / (this.list.length * this.itemHeight)) * this.mainHeight
				this.$emit('setHeight', height)
				this.updateVisibleData(scrollTop);
			},
			handleScroll2(e) {
				if (this.flag) return
				const scrollTop = parseInt(e);
				let height = parseInt((e / (this.mainHeight)) * (this.list.length * this.itemHeight))
				this.$refs.contens.scrollTop = height
				this.updateVisibleData(height);
			},
			/* 全选/反选 */
			setAllCheck1(type){
				if(!type) {
					this.footList = []
					this.list.forEach(item => {
						this.footList.push(item.id)
					})
				}else {
					this.footList = []
				}
				this.$emit('getFootList',this.footList)
			},
			// 点击选中
			setId(item) {
				let _this = this
				if (this.footList.indexOf(item.id) == -1) {
					this.footList.push(item.id)
				} else {
					this.footList.splice(_this.footList.indexOf(item.id), 1)
				}
				this.$emit('getFootList',this.footList)
			},
			/* 鼠标移入指数动作 */
			mouseenter(i,dex,item){
				this.$nextTick(res=>{
					// return
					this.top = this.$refs[item.id][0].offsetTop
					this.right = this.$refs[item.id][0].getBoundingClientRect().right
					this.expIndex = JSON.parse(JSON.stringify(item.exponent))
					this.exponent = item
					this.fightMask = true
				})
				// let top = this.$refs.model[i].offsetTop
				
			},
			/* 鼠标移入比分动作 */
			mouseenter1(i,dex,item){
				this.$nextTick(res=>{
					// this.expIndex = JSON.parse(JSON.stringify(item.exponent))
					if(item.status == 2 ||
						item.status == 3 ||
						item.status == 4 ||
						item.status == 5 ||
						item.status == 6 ||
						item.status == 7){//进行中的比赛需要实时请求
						this.getDetail(item, 1)
					}else {
						this.tlive = item
						this.exponent = item
						this.ishow = true
					}
					
				})
				// let top = this.$refs.model[i].offsetTop
				
			},
			/* 置顶 */
			setTop(item,index){
				/* 
				 置顶
				 1.子传父，将数据传给父级
				 2.无：添加标题+选中的数据，有：添加选中的数据
				 
				 */
				item.index = index
				// this.$emit('setTop',item,index)
				
				// return
				let id = null
				let list = JSON.parse(localStorage.getItem('topList')) || []
				this.topList1 = list
				/* 判断是取消还是添加 */
				if(list.indexOf(item.id) !== -1) {
					list.splice(list.indexOf(item.id),1)
					localStorage.setItem('topList',JSON.stringify(list))
					this.$emit('setTop',item)
					// this.visibleData
					// this.visibleData.splice(1, 0, item)
				}else {
					list.push(item.id)
					this.visibleData.splice(index,1)
					if(this.visibleData[0].typeTitle !== 4) {
						this.visibleData.splice(0, 0, {
							typeTitle:4,
							competition_id: 1000000,
							country_id: 1000000,
							competition_name_zh: '置顶',
							imgUrl: require('@/assets/images/main-beigin.png')
						})
						// this.visibleData.splice(1, 0, item)
					}
					this.visibleData.splice(1, 0, item)
					localStorage.setItem('topList',JSON.stringify(list))
					
				}
				
				// return
				
			},
			/* 请求详情 */
			getDetail(item, type) {
				this.exponent = item
				this.ishow = true
				this.tliveLoading = true
				getfootballDetail({
					id: item.id,
					list_show: 1
				}).then(res => {
					res.data.id = item.id
					res.data.home_score = item.home_score
					res.data.away_score = item.away_score
					res.data.home_team_name_zh = item.home_team_name_zh
					res.data.away_team_name_zh = item.away_team_name_zh
					res.data.tlive = res.data.tlive.reverse()
					this.tlive = res.data
					
					this.tliveLoading = false
				}).catch(res => {
			
				})
			},
			
		}
	}
</script>
<style lang="scss" scoped>
	html::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: #fff;
	}

	.contents-main {
		height: calc(100vh - 60px);
		margin-top: 60px;
		overflow-y: scroll;
	}

	.list-view {
		overflow: auto;
		position: fixed;
		// border: 1px solid #aaa;
		// width: 200px;
		margin: 0 auto;
		margin-top: 100px;
		height: 600px;
	}

	.left-btn {
		position: fixed;
		left: 100px;
		top: 100px;
		z-index: 999;

		p {
			margin-top: 10px;
		}
	}

	.btn {
		position: fixed;
		bottom: 67px;
		z-index: 999;
	}

	.list-view::-webkit-scrollbar {
	display: none; /* Chrome Safari */
	}
	.list-view-phantom {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		z-index: -1;
	}

	.list-view-content {
		left: 0;
		right: 0;
		top: 0;
		position: absolute;
	}

	.list-view-item {
		padding: 5px;
		color: #666;
		line-height: 30px;
		box-sizing: border-box;
	}

	.immediate,
	.width180 {
		display: flex;
	}
	.logo-title {
		width: 20px;
		height: 20px;
		margin-right: 6px;
	}
	.highlight {
		color: red !important;
	}
	
</style>
