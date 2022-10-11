<template>
	<div>
		
		<section class="container-section" id="uncoming" v-infinite-scroll="load"
			style="box-shadow: rgb(238, 238, 238) 0px 1px 0px 0px inset">
			<ul>
				<li data-id="5423719" class="football-score-item" v-for="(item,index) in list" :key="index" :class="immediately.value4?'football-score-height-60':''">
					<div class="match-field width93">
						<div class="football-league-name-container false" style="height: 44.5px">
							<div class="football-league-color-block" :style="{background: item.primary_color}"></div>
							<div class="football-league-logo">
								<img class="football-league-logo-img" :src="item.competition_logo" width="56"
									height="56" />
							</div>
							<div class="league-name ellipsis search-by-team-name">{{lang==1?item.competition_name_zht:lang==2?item.competition_name_en:item.competition_name_zh}}</div>
						</div>
					</div>
					<div class="time width32 text-center margin-left-20">{{timeStamp(item.time)}}</div>
					<div class="match-status width40 football-all-status margin-right-20">
						<span class="">未</span>
					</div>
					<div class="teamName-and-vs football-score-item-teamRank width420">
						<div class="team-info host-container width189">
							<img class="score-item-ball-left"
								src="/_next/static/images/icon-2@3x-1deeeb26605d34ec1ce25ebf3b18106d.png" alt="goal" />
							<div class="name ellipsis search-by-team-name">{{lang==1?item.home_team_name_zht:lang==2?item.home_team_name_en:item.home_team_name_zh}}</div>
						</div>
						<div class="vs width42" ref="bbb" @mouseenter="mouseenter(index,0,item)">
							<span style="color: rgb(255, 67, 67)"></span><span data-a="0" data-b="0"
								style="color: rgb(145, 151, 173)">-</span><span style="color: rgb(255, 67, 67)"></span>
						</div>
						<div class="team-info guest-container width189">
							<div class="name ellipsis search-by-team-name">{{lang==1?item.away_team_name_zht:lang==2?item.away_team_name_en:item.away_team_name_zh}}</div>
							<img class="score-item-ball-right"
								src="/_next/static/images/icon-2@3x-1deeeb26605d34ec1ce25ebf3b18106d.png" alt="goal" />
						</div>
					</div>
					<div class="variable width547">
						<div class="progress">
							<div class="progress-youliao width115 text-center"></div>
							<div class="live width65" style="justify-content: flex-start">
								<div class="live">
									<div class="football-score-item-live">
										<div class="left" v-if="item.mlive == 1">
											<router-link tag="a" target="_blank" :to="'/score-live?type=football&id='+item.id+ '&vid=' + item.vid ">
												<img v-if="item.mlive == 1" class="live-icon"
													src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAqxJREFUWAntVk1oE0EUfm/SWLqHNhtREZSiBxGkoODJXqLFiyB4qgc9eLFNiiIK+TE5mIOB/CBUpEmkh+LFQ85evIjiQbGignch/iCCZmNsYtom83xjs4fSZtndhFx0YHZ237z3fd+8fTuzAP96QyqVPMbrpzEkukxA44NICAKWCXFRPx5Ie64d2BUHkreZ2DcI8g4Hc9Gp5tfymlArHyDxJirFLQaV9k3MnQfFLbab6GZDRMn9GXejm49TuzMBABk9Wwh4NO0QAD50SradvyMBQPBWgYwm73z35woX+PYs9y/K5rY5E9BhMcLBpdrNK4f9ueIjEGNHAGFxoAIA8US71X5XCYfi+shI3Z8tzggPTHFtfHAqxFUGFAlX8DBfU9X6t2UjFjzmSxef+LQ9Eyxinru0K8S1AJOAhRwFia+q0VAK/D/aXKTXGXSSX8tP08dq7FmAAieiISkpXv3cekHJpDaWLbzk7XbJitic64sABcZpfy7Iex6TyUY1FtJZ1kmTxGocspq0NYe4wvRRX2ahwCLIiITOcTbyXCR77cT3JgDxMeCOGX/m7sdfmtxdiQTv8euYtkNs+rgSQAAVXu0lLrgHCqgSDV1sNWCei2GnCWx3dCVA1/A0JvMrjcjVfU1Yvw+SzrAoV82ZAISNFd5aqFd/w2xTtrLMOuqKuROElXDQtnhOu4FAeUkQ4PjJXojNWEcZ4ALTWW3CDO7HKHjDWO0HkBsMxS0IYdlNcD9iFLfwCLzBG0mtH4DOMLCmuFEFNRJz+1fX5TQQjjsDcemNVB72ipKWyn9yidC/sL8Z6AbHh8pB2aYICuHt5mNl569mTQjI+dKFrj8q1p8h4RSfarMkbf9fbNVD4g0buwqwzACvAI3E3ISQ4CoDUsC6nsq/V6fkVmX/LRsZ+APOsdzYLi53OgAAAABJRU5ErkJggg=="
													alt="videoIcon" />
													</router-link>
										</div>
									</div>
								</div>
							</div>
							<div class="h45-w1-border"></div>
							<div class="model-one width224" ref="sss1" :style="{height:immediately.value4?'60px':'42px'}" @mouseleave="mousemove" @mouseenter="mouseenter(index,1,item)">
								<div class="football-score-item-odds" v-if="item.exponent && item.exponent.asia">
									<div class="odds-handicap" style="display: flex" v-if="immediately.value1">
										<div class="left">{{item.exponent.asia.immediate.win}}</div>
										<div class="middle">{{item.exponent.asia.immediate.draw}}</div>
										<div class="right">{{item.exponent.asia.immediate.fail}}</div>
									</div>
									<div class="odds-dx" style="display: flex" v-if="immediately.value2">
										<div class="left  football">{{item.exponent.bs.immediate.win}}</div>
										<div class="middle">{{item.exponent.bs.immediate.draw}}</div>
										<div class="right  football">{{item.exponent.bs.immediate.fail}}</div>
									</div>
									<div class="odds-dx" style="display: flex" v-if="immediately.value3">
										<div class="left  football">{{item.exponent.eu.immediate.win}}</div>
										<div class="middle">{{item.exponent.eu.immediate.draw}}</div>
										<div class="right  football">{{item.exponent.eu.immediate.fail}}</div>
									</div>
								</div>
							</div>
							<div class="data width87" style="justify-content: space-around">
								<!-- <div>
                  <a
                    target="_blank"
                    href="/score-detail/analyze?matchId=5423719&amp;sportId=1"
                    >分析</a
                  >
                </div> -->
								<div>
									<router-link tag="a" target="_blank" :to="'/score-detail?type=football&id='+item.id">指数</router-link>
								</div>
								<div>
									<router-link tag="a" target="_blank" :to="'/score-detail?type=football&tabIndex=4&id='+item.id">分析</router-link>
								</div>
							</div>
							<div class="match width52" >
								<div class="match width56">
									<div class="football-score-item-operation">
										<img @click="setCollect(item)" :src="item.is_collect == 1?require('../../assets/images/shoucang1.png'):require('../../assets/images/shoucang.png')"
											class="collect">
									</div>
								</div>
							</div>
						</div>
					</div>
				</li>

				<!-- <li style="text-align: center;font-size: 14px;color: #666;">
					{{loadStatus == 'more'?'加载中...':'没有更多了'}}
				</li> -->
			</ul>
		</section>
		<div v-if="dataMask" style="position:fixed;" @mouseleave="mousemove" class="football-popup-score" :style="{left: left,top: top}">
			<div class="pop-header">
				<div class="team-name left-name">{{tlive.home_team_name_zh}}</div>
				<div class="score">
					<span class="">0</span><span>-</span><span class="">0</span>
				</div>
				<div class="team-name">{{tlive.away_team_name_zh}}</div>
				<router-link tag="a" target="_blank" :to="'/score-live?type=football&id='+tlive.id+ '&vid=' + tlive.vid ">
					<img class="tv pointer"
							src="data:image/png;base64,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"
						alt="">
				</router-link>
			</div>
			<div class="popup-time-line-data-container">
				<div class="popup-time-line-data">
					<div>
						<div class="line-item">
							<p class="time guest-time">0'</p>
							<div class="icon"></div>
							<p class="name guest-name">
								本场比赛即将开始,【{{tlive.home_team_name_zh}}】主场对战【{{tlive.away_team_name_zh}}】
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="fightMask" class="pop-tip-handicap" style="position:fixed;" :style="{left: left,top: top}">
			<div class="pop-header">
				<div class="left">
					<p class="team-name text-right opacity">{{lang==1?exponent.home_team_name_zht:lang==2?exponent.home_team_name_en:exponent.home_team_name_zh}}</p>
					<p class="vs">
						<span class="opacity">{{exponent.home_score}}</span><span>-</span><span class="">{{exponent.away_score}}</span>
					</p>
					<p class="team-name">{{lang==1?exponent.away_team_name_zht:lang==2?exponent.away_team_name_en:exponent.away_team_name_zh}}</p>
				</div>
				
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
					<div class="item chupan" v-if="expIndex.asia  && expIndex.asia .initial && expIndex.asia .initial.sealing_disk == 0">
						<div class="left"><span class="val">{{expIndex.asia .initial.win}}</span></div>
						<div class="middle"><span class="val">{{expIndex.asia .initial.draw}}</span></div>
						<div class="right"><span class="val">{{expIndex.asia .initial.fail}}</span></div>
					</div>
					<div class="item chupan" v-if="expIndex.asia  && expIndex.asia .initial && expIndex.asia .initial.sealing_disk == 1">
						封
					</div>
					<div class="item jishi" v-if="expIndex.asia  && expIndex.asia .immediate && expIndex.asia .immediate.sealing_disk == 0">
						<div class="left"><span class="val">{{expIndex.asia .immediate.win}}</span></div>
						<div class="middle"><span class="val">{{expIndex.asia .immediate.draw}}</span></div>
						<div class="right"><span class="val">{{expIndex.asia .immediate.fail}}</span></div>
					</div>
					<div class="item chupan" v-if="expIndex.asia  && expIndex.asia .immediate && expIndex.asia .immediate.sealing_disk == 1">
						封
					</div>
					<div class="item gunqiu" v-if="expIndex.asia  && expIndex.asia .scram && expIndex.asia .scram.sealing_disk == 0">
						<div class="left"><span class="val">{{expIndex.asia .scram.win}}</span></div>
						<div class="middle"><span class="val">{{expIndex.asia .scram.draw}}</span></div>
						<div class="right"><span class="val">{{expIndex.asia .scram.fail}}</span></div>
					</div>
					<div class="item chupan" v-if="expIndex.asia  && expIndex.asia .scram && expIndex.asia .scram.sealing_disk == 1">
						封
					</div>
				</div>
				<div class="col_thr">
					<div class="item title bg-color">大小指数</div>
					<div class="item chupan" v-if="expIndex.bs  && expIndex.bs .initial && expIndex.bs .initial.sealing_disk == 0">
						<div class="left"><span class="val">{{expIndex.bs .initial.win}}</span></div>
						<div class="middle"><span class="val">{{expIndex.bs .initial.draw}}</span></div>
						<div class="right"><span class="val">{{expIndex.bs .initial.fail}}</span></div>
					</div>
					<div class="item chupan" v-if="expIndex.bs  && expIndex.bs .initial && expIndex.bs .initial.sealing_disk == 1">
						封
					</div>
					<div class="item jishi" v-if="expIndex.bs  && expIndex.bs .immediate && expIndex.bs .immediate.sealing_disk == 0">
						<div class="left"><span class="val">{{expIndex.bs .immediate.win}}</span></div>
						<div class="middle"><span class="val">{{expIndex.bs .immediate.draw}}</span></div>
						<div class="right"><span class="val">{{expIndex.bs .immediate.fail}}</span></div>
					</div>
					<div class="item chupan" v-if="expIndex.bs  && expIndex.bs .immediate && expIndex.bs .immediate.sealing_disk == 1">
						封
					</div>
					<div class="item gunqiu" v-if="expIndex.bs  && expIndex.bs .scram && expIndex.bs .scram.sealing_disk == 0">
						<div class="left"><span class="val">{{expIndex.bs .scram.win}}</span></div>
						<div class="middle"><span class="val">{{expIndex.bs .scram.draw}}</span></div>
						<div class="right"><span class="val">{{expIndex.bs .scram.fail}}</span></div>
					</div>
					<div class="item chupan" v-if="expIndex.bs  && expIndex.bs .scram && expIndex.bs .scram.sealing_disk == 1">
						封
					</div>
					
				</div>
				<div class="col_four">
					<div class="item title bg-color">欧赔</div>
					<div class="item chupan" v-if="expIndex.eu && expIndex.eu.initial && expIndex.eu.initial.sealing_disk == 0">
						<div class="left"><span class="val">{{expIndex.eu.initial.win}}</span></div>
						<div class="middle"><span class="val">{{expIndex.eu.initial.draw}}</span></div>
						<div class="right"><span class="val">{{expIndex.eu.initial.fail}}</span></div>
					</div>
					<div class="item chupan" v-if="expIndex.eu && expIndex.eu.initial && expIndex.eu.initial.sealing_disk == 1">
						封
					</div>
					<div class="item jishi" v-if="expIndex.eu && expIndex.eu.immediate && expIndex.eu.immediate.sealing_disk == 0">
						<div class="left"><span class="val">{{expIndex.eu.immediate.win}}</span></div>
						<div class="middle"><span class="val">{{expIndex.eu.immediate.draw}}</span></div>
						<div class="right"><span class="val">{{expIndex.eu.immediate.fail}}</span></div>
					</div>
					<div class="item chupan" v-if="expIndex.eu && expIndex.eu.immediate && expIndex.eu.immediate.sealing_disk == 1">
						封
					</div>
					<div class="item gunqiu" v-if="expIndex.eu && expIndex.eu.scram && expIndex.eu.scram.sealing_disk == 0">
						<div class="left"><span class="val">{{expIndex.eu.scram.win}}</span></div>
						<div class="middle"><span class="val">{{expIndex.eu.scram.draw}}</span></div>
						<div class="right"><span class="val">{{expIndex.eu.scram.fail}}</span></div>
					</div>
					<div class="item chupan" v-if="expIndex.eu && expIndex.eu.scram && expIndex.eu.scram.sealing_disk == 1">
						封
					</div>
					
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		football_match,
		footballOddsList
	} from "@/api/football.js";
	import {
		collect
	} from "../../api/common.js";
	export default {
		props: {
			time: {
				type: Object,
				default: {},
			},
			lang:{
				type: Number,
				default: 0
			},
			id:{
				type:Number,
				default:null
				
			},
			checked:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				page:1,
				tlive:{},
				list1:[],
				exponent:{},
				OddsList:{},
				expIndex:{},
				dataMask:false,
				loading: false,
				fightMask:false,
				loadStatus:'more',
				screenListT:[],
				screenStatus:'competition_id',
			};
		},
		watch: {
			time(e) {
				this.page = 1;
				this.list = [];
				// this.$store.state.loading = true;
				// console.log(this.$store.state.loading)
				this.getlist();
				// setTimeout(() => {
				// 	this.$store.state.loading = false;
				// }, 1000);
			},
			id(e){
				this.getlist()
			},
		},
		computed:{
			list(){
				return this.list1.filter(item=>{
					return this.screenListT.indexOf(item[this.screenStatus]) != -1
				})
			},
			immediately(){
				return this.$store.state.immediately
			}
		},
		created() {},
		mounted() {
			this.getlist();
		},
		methods: {
			
			// 筛选列表
			screenList(list,status){
				this.screenListT = list
				this.screenStatus = status
			},
			mouseenter(e,type,item){
				
			  let left,top
			  if(type == 1){
				  this.fightMask = true
				  // this.dataMask = false
				  this.exponent = item
				  this.expIndex = item.exponent
				  top = this.$refs.sss1[e].getBoundingClientRect().top - 194 + 'px'
				  left = this.$refs.sss1[e].getBoundingClientRect().left - 157 + 'px'
			  }else{
				    this.fightMask = false
				    this.dataMask = true
				   // if(this.top == (this.$refs.bbb[e].getBoundingClientRect().top + 'px')){
					  //  return
				   // }
				   console.log(this.fightMask)
				  this.tlive = item
				  top = this.$refs.bbb[e].getBoundingClientRect().top + 'px'
				  left = this.$refs.bbb[e].getBoundingClientRect().left + 50 + 'px'
			  }
			  if (this.top == (this.$refs.bbb[e].getBoundingClientRect().top + 'px')) { //判断重复问题
			  	return
			  }
			  this.top = top
			  this.left = left
			 //  if(type == 1){
				// this.footballOddsList(item)
			 //  }
			},
			// 触底加载
			load(e) {
				// if(this.loadStatus == 'more' && this.loading){
				// 	this.loading = false
				// 	this.getlist()
				// }
			},
			// 收藏
			setCollect(item) {
				let data = {
					id: item.id,
					type: 2
				}
				console.log(data);
				collect(data).then(res => {
					if(item.is_collect == 0){
						this.$message.success('收藏成功')
					}else {
						this.$message.success('已取消收藏')
					}
					item.is_collect = item.is_collect == 0 ? item.is_collect = 1 : item.is_collect = 0
					
					
				}).catch(res => {})
			},
			getlist(page) {
				let data = {
					type: 2,
					is_web:1,
					// page: this.page,
					time: this.time.day,
					company_id:this.id
				};
				this.$store.state.loading = true;
				football_match(data)
					.then((res) => {
						this.list1 = res.data.data
						this.$store.state.loading = false;
					})
					.catch((res) => {});
			},
			// 指数弹窗详情
			footballOddsList(type){
				let company_id = this.id
				footballOddsList({
					id: type.id
				}).then(res => {
					let r = res.data
					// asia让球（亚盘） eu欧赔 bs总分（大小球）
					let data = {
						asia:{},
						eu:{},
						bs:{}
					}
					let arr = ['asia','eu','bs']
					arr.forEach((item,index)=>{
						console.log(r.arr[index])
						r.arr[index].forEach(item1=>{
							console.log(item1)
							if(item1.company_id === company_id){
								data[index] = item1
							}
						})
					})
					 this.dataMask = true
					// res.data.asia.forEach(item=>{
					// 	console.log(item.company_id)
					// 	if(item.company_id === company_id){
					// 		data.asia = item
					// 	}
					// })
					// res.data.eu.forEach(item=>{
					// 	if(item.company_id === company_id){
					// 		data.eu = item
					// 	}
					// })
					// res.data.bs.forEach(item=>{
					// 	if(item.company_id === company_id){
					// 		data.bs = item
					// 	}
					// })
					console.log(data)
					this.OddsList = data
				}).catch(res => {
				
				})
			},
			// 移除列表
			mousemove() {
				this.dataMask = false
				this.fightMask = false
			},
			// 时间戳转时间
			timeStamp: function(value) {
				var date = new Date(value * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var year = date.getFullYear();
				var month = ("0" + (date.getMonth() + 1)).slice(-2);
				var sdate = ("0" + date.getDate()).slice(-2);
				var hour = ("0" + date.getHours()).slice(-2);
				var minute = ("0" + date.getMinutes()).slice(-2);
				var second = ("0" + date.getSeconds()).slice(-2);
				// 拼接
				var result = hour + ":" + minute; //+ ":" + second;
				// 返回
				return result;
			},
		},
	};
</script>

<style>
	.football-score-height-60 {
	    height: 60px !important;
	}
	/* @import '../../styles/style.css'; */
</style>
