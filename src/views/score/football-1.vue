<template>
	<div>
		<section class="container-section" id="finished" style="box-shadow: rgb(238, 238, 238) 0px 1px 0px 0px inset"
			v-infinite-scroll="load">
			<ul>

				<!-- <div class="football-score-item-add-time finished">
          <div class="desc-wrap"><div class="desc">120分钟加时1-0</div></div>
        </div> -->
				
				<li :data-id="item.id" class="football-score-item" v-for="(item,index) in list" :key="index" :style="{marginBottom:item.note?'31px':''}">
					<div class="football-score-item-add-time immediate" style="position: absolute;bottom: -32px;left: 0;" v-if="item.note">
						<div class="desc-wrap">
							<div class="desc">
								{{item.note}}
							</div>
						</div>
					</div>
					<div class="match-field width93">
						<div class="football-league-name-container false" style="height: 44.5px">
							<div class="football-league-color-block" :style="{background: item.primary_color}"></div>
							<div class="football-league-logo">
								<img class="football-league-logo-img" :src="item.competition_logo" width="56"
									height="56" />
							</div>
							<div class="league-name ellipsis search-by-team-name">
								{{lang==1?item.competition_name_zht:lang==2?item.competition_name_en:item.competition_name_zh}}
							</div>
						</div>
					</div>
					<div class="time width32 text-center margin-left-20">{{timeStamp(item.time)}}</div>
					<div class="match-status width40 football-all-status margin-right-20">
						<span class="">完</span>
					</div>
					<div class="teamName-and-vs football-score-item-teamRank width420">
						<div class="team-info host-container width189">
							<img class="score-item-ball-left"
								src="/_next/static/images/icon-2@3x-1deeeb26605d34ec1ce25ebf3b18106d.png" alt="goal" />
							<div class="card red-card" v-if="item.home_red_card != 0&& game.red">{{item.home_red_card}}</div>
							<div class="card yellow-card" v-if="item.home_yellow_card != 0&& game.yellow">{{item.home_yellow_card}}
							</div>
							<div class="name ellipsis search-by-team-name">{{lang==1?item.home_team_name_zht:lang==2?item.home_team_name_en:item.home_team_name_zh}}</div>
						</div>
						
						<el-popover popper-class="popper" :close-delay="0" placement="right-start" trigger="hover">
							<exponent :tlive="tlive" :tliveLoading="tliveLoading"></exponent>
							
							<div class="vs width42" slot="reference" ref="bbb2" @mouseenter="mouseenter(index,0,item)">
								<span :style="{color: item.home_score >item.away_score?'rgb(255, 67, 67)':'rgb(145, 151, 173)'}">{{item.home_score}}</span><span data-a="6" data-b="0"
									style="color: rgb(145, 151, 173)">-</span><span
									:style="{color: item.home_score < item.away_score?'rgb(255, 67, 67)':'rgb(145, 151, 173)'}">{{item.away_score}}</span>
							</div>
						</el-popover>
						<div class="team-info guest-container width189">
							<div class="name ellipsis search-by-team-name">{{lang==1?item.away_team_name_zht:lang==2?item.away_team_name_en:item.away_team_name_zh}}</div>
							<div class="card yellow-card" v-if="item.away_yellow_card != 0&& game.yellow">{{item.away_yellow_card}}
							</div>
							<div class="card red-card" v-if="item.away_red_card != 0 && game.red">{{item.away_red_card}}</div>
							<img class="score-item-ball-right"
								src="/_next/static/images/icon-2@3x-1deeeb26605d34ec1ce25ebf3b18106d.png" alt="goal" />
						</div>
					</div>
					<div class="variable width547">
						<div class="finished">
							<div class="model-one width417">
								<div class="half width54 text-center">
									<span>{{item.half_score}}</span>
								</div>
								<div class="corner width54 text-center">
									<span>{{item.corner_kick}}</span>
								</div>
								<div class="h45-w1-border"></div>
								<div class="width60 text-center color-ff4343" v-if="item.home_score > item.away_score">胜
								</div>
								<div class="width60 text-center color-3eba61"
									v-else-if="item.home_score < item.away_score">负</div>
								<div class="width60 text-center color-9197ad"
									v-else-if="item.home_score == item.away_score">平</div>
								<div class="width60 text-center white-space-nowrap color-3eba61">
									{{item.exponent && item.exponent.asia && item.exponent.asia.immediate?item.exponent.asia.immediate.draw:''}}
								</div>
								<!-- color-ff4343 红色 color-3eba61 小 -->
								<div class="width60 text-center" v-if="item.exponent && item.exponent.bs && item.exponent.bs.immediate" :class="getAll(item.home_score,item.away_score,item.exponent.bs.immediate.draw) == '大'?'color-ff4343':getAll(item.home_score,item.away_score,item.exponent.bs.immediate.draw) == '小'?'color-3eba61':''">{{item.exponent && item.exponent.bs && item.exponent.bs.immediate?getAll(item.home_score,item.away_score,item.exponent.bs.immediate.draw):''}}</div>
								<div class="width60 text-center" v-else></div>
								<div class="width60 text-center color-3eba61"></div>
								<div class="width60 text-center color-9197ad">{{ Number((item.half_score).slice(0)) > Number((item.half_score).slice(2))?'胜':Number((item.half_score).slice(0)) < Number((item.half_score).slice(2))?'负':'平'  }}-{{item.home_score > item.away_score?'胜':item.home_score < item.away_score?'负':'平'}}</div>
							</div>
							<div class="data width80" style="justify-content: space-around">
								<!-- <div>
									<a target="_blank" href="/score-detail/analyze?matchId=5400604&amp;sportId=1">分析</a>
								</div> -->
								<div>
									<router-link tag="a" target="_blank" :to="'/score-detail?type=football&id='+item.id">指数</router-link>
								</div>
								<div>
									<router-link tag="a" target="_blank" :to="'/score-detail?type=football&tabIndex=4&id='+item.id">分析</router-link>
								</div>
							</div>
							<div class="match width50" @click="$router.push('/score-live?type=football&id='+item.id+ '&vid=' + item.vid)">
								<div class="match width56">
									<div class="football-score-item-operation">
										<div class="statics statics-icon"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</li>
				<!-- <li style="text-align: center;font-size: 14px;color: #666;">
					{{loadStatus == 'more'?'加载中...':'没有更多了'}}
				</li> -->

				<!-- <li data-id="3915493" class="football-score-item flex-center" v-if="list.length != 0">
          <el-pagination
            background
            @current-change="currentChange"
            :page-size="10"
            :page-sizes="[10,20,30]"
            layout="prev, pager, next"
            :total="100">
          </el-pagination>
         </li> -->
			</ul>
		</section>
		<div class="football-popup-score" style="position:fixed;" @mouseleave="mousemove" v-if="dataMask" v-loading="tliveLoading" :style="{left: left,top: top}">
			<div class="pop-header" v-if="tlive.home_team_name_zh">
				<div class="team-name left-name opacity">{{tlive.home_team_name_zh}}</div>
				<div class="score"><span class="opacity">{{tlive.home_score}}</span><span>-</span><span
						class="">{{tlive.away_score}}</span></div>
				<div class="team-name ">{{tlive.away_team_name_zh}}</div>
				<router-link tag="a" target="_blank" :to="'/score-live?type=football&id='+tlive.id+ '&vid=' + tlive.vid ">
					<img class="tv pointer"
							src="data:image/png;base64,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"
						alt="">
				</router-link>
			</div>
			<div class="popup-time-line-data-container" v-if="tlive.home_team_name_zh">
				<div class="popup-time-line-data">
					<div v-for="(item,index) in tlive.tlive">
						<div class="line-item" v-if="item.position == 1">
							<p class="name host-name">{{item.data}}</p>
							<div class="icon"><img class="icon-img"
									:src="require('../../assets/images/'+getImage(item.type)+'.png')"
									alt="yellow-card"></div>
							<p class="time host-time">{{item.time}}</p>
						</div>
						<div class="line-item" v-if="item.position == 2">
							<p class="time guest-time">{{item.time}}</p>
							<div class="icon"><img class="icon-img"
									src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA0lJREFUWAntVl1IFFEUPnfXn/1BTSNFKNO1zIeSxDKowHJRQnMxw+ihhyAxsqhQLOilfYiCxLRHsRLyxbBYJDe21pIK86ciFSMWXTNLK/9Ydd3Z3dmd29V0G2fccbTpKS8sc+75+c4359x7dgDWFqcCWK8PwPn5QRz1P9vKuMiO7u4NDpdrwJ6Tc5kQCePapd4jLuBMXl40punhOT1C0+RZLUOoUtXQ8JXrK8WeV4FFoBiHAMbFmGH67TpdrUunS1pkl2AjTGA+AQYIIERO0Bh3zeh0Jio3VytB7jkI4RYIZEEIfUAYlylTUuqRXu8RcBU0rZrAAioB+ELIVCjDwu6g2tqZBb3YJ68FAZmZ4WKD5/wQCiItSnLabHtWFDfvHMANQmp1IFfH3pO3Zch5aAeEnhC9kdyOTqIjHFa3eASWhEFonCR9KidJFXK5CRkM4z4/xOuizyRG8EsAxcUBiopqgY6OS8rk5DZy0BgxgH/tg63WGMfQEKYoavZ3/a8BlwHgV0CjoZHTuUyYdGbeLZAOWhzSGoG1CvBvgYizU/iuKnDINn2eDKcM4u7BCCwIyR41phe3rnQq8sYYxjja6XT+/iABuKFUKq+wOeU2V8TSXvrBznWbU8dddhh0/BmKZDxbAeFr6vTY2np0zMuO8yev6AzkmG8eRQzuLNAcSM3buAumPZx5gXE8MFDjaBr4lG0uy/aXlK0XVYGTzTWKUe9YeYxqfdHFbZnQOtYHDwffklzC/0GkHXVBSrhg2Fc6wk7KlpetwJGm8gSSvC0rOqmoJPEQeDEDuyM0sD8ygY2zpEzaedxNQVf28/K9SzoQpWAFeiaHH1daTOlnt2rVUzQF1daXQHndEBkcCgXxafDTOQl3+1/5w/bpSRI3gPyMMaPknk85LwgSeDPaC5qQSKgbbIfXIxZuLFzdnguGb++h2ybig5l8M8gQnGrUltawgXgEbveYDhbGp72YdfJgL9z/3ELedIod45MTQ6NhkyoCzD8++nRCgmX6O2OnXTpjRqlxwW8RgaymstMKeWDluS1aRXiQGmy0AybIVZNqzRIddEyMBKtgx8LB9A2ifHNVGCWz97mx9/Ct3mdS5eThyOQyYDwQzDP8t4pf2tZEVoYnFDgAAAAASUVORK5CYII="
									alt="jiaoqiu"></div>
							<p class="name guest-name">{{item.data}}</p>
						</div>
					</div>
					<div>
		
					</div>
					<div>
						<div class="line-item">
							<p class="time guest-time">0'</p>
							<div class="icon"></div>
							<p class="name guest-name">本场比赛即将开始,比赛场地天气晴天,【{{tlive.home_team_name_zh}}】主场对战【{{tlive.away_team_name_zh}}】</p>
						</div>
					</div>
				</div>
			</div>
			<div class="title" >技术统计</div>
			<div class="popup-technical-statistics"  v-if="tlive.home_data">
				<div class="score-progress">
					<div class="parse-item">
						<p class="text-number left-text" style="opacity: 1;">{{tlive.home_data[6]}}</p>
						<div class="progress left-progress">
							<div class="replay-pro left-pro" style="width: 66.6667%; opacity: 1;" :style="{width:num(tlive.home_data[6],tlive.away_data[6]) + '%'}"></div>
						</div>
						<p class="static-name">射正</p>
						<div class="progress">
							<div class="replay-pro right-pro" style="width: 33.3333%; opacity: 0.3;" :style="{width:num(tlive.away_data[6],tlive.home_data[6]) + '%'}"></div>
						</div>
						<p class="text-number right-text" style="opacity: 0.3;">{{tlive.away_data[6]}}</p>
					</div>
				</div>
				<div class="score-progress">
					<div class="parse-item">
						<p class="text-number left-text" style="opacity: 0.3;">{{tlive.home_data[3]}}</p>
						<div class="progress left-progress">
							<div class="replay-pro left-pro" style="width: 49.0741%; opacity: 0.3;" :style="{width:num(tlive.home_data[3],tlive.away_data[3]) + '%'}"></div>
						</div>
						<p class="static-name">进攻</p>
						<div class="progress">
							<div class="replay-pro right-pro" style="width: 50.9259%; opacity: 1;" :style="{width:num(tlive.away_data[3],tlive.home_data[3]) + '%'}"></div>
						</div>
						<p class="text-number right-text" style="opacity: 1;">{{tlive.away_data[3]}}</p>
					</div>
				</div>
				<div class="score-progress">
					<div class="parse-item">
						<p class="text-number left-text" style="opacity: 0.3;">{{tlive.home_data[5]}}</p>
						<div class="progress left-progress">
							<div class="replay-pro left-pro" style="width: 49.0741%; opacity: 0.3;" :style="{width:num(tlive.home_data[5],tlive.away_data[5]) + '%'}"></div>
						</div>
						<p class="static-name">控球率</p>
						<div class="progress">
							<div class="replay-pro right-pro" style="width: 50.9259%; opacity: 1;" :style="{width:num(tlive.away_data[5],tlive.home_data[5]) + '%'}"></div>
						</div>
						<p class="text-number right-text" style="opacity: 1;">{{tlive.away_data[5]}}</p>
					</div>
				</div>
				<div class="score-progress">
					<div class="parse-item">
						<p class="text-number left-text" style="opacity: 0.3;">{{tlive.home_data[8]}}</p>
						<div class="progress left-progress">
							<div class="replay-pro left-pro" style="width: 27.2727%; opacity: 0.3;" :style="{width:num(tlive.home_data[8],tlive.away_data[8]) + '%'}"></div>
						</div>
						<p class="static-name">角球</p>
						<div class="progress">
							<div class="replay-pro right-pro" style="width: 72.7273%; opacity: 1;" :style="{width:num(tlive.away_data[8],tlive.home_data[8]) + '%'}"></div>
						</div>
						<p class="text-number right-text" style="opacity: 1;">{{tlive.away_data[8]}}</p>
					</div>
				</div>
				<div class="score-progress">
					<div class="parse-item">
						<p class="text-number left-text" style="opacity: 1;">{{tlive.home_data[1]}}</p>
						<div class="progress left-progress">
							<div class="replay-pro left-pro" style="width: 50%; opacity: 1;" :style="{width:num(tlive.home_data[1],tlive.away_data[1]) + '%'}"></div>
						</div>
						<p class="static-name">黄牌</p>
						<div class="progress">
							<div class="replay-pro right-pro" style="width: 50%; opacity: 1;" :style="{width:num(tlive.away_data[1],tlive.away_data[1]) + '%'}"></div>
						</div>
						<p class="text-number right-text" style="opacity: 1;">{{tlive.away_data[1]}} </p>
					</div>
				</div>
				<div class="score-progress">
					<div class="parse-item">
						<p class="text-number left-text" style="opacity: 1;">{{tlive.home_data[7]}}</p>
						<div class="progress left-progress">
							<div class="replay-pro left-pro" style="width: 50%; opacity: 1;" :style="{width:num(tlive.home_data[7],tlive.away_data[7]) + '%'}"></div>
						</div>
						<p class="static-name">射偏</p>
						<div class="progress">
							<div class="replay-pro right-pro" style="width: 50%; opacity: 1;" :style="{width:num(tlive.away_data[7],tlive.away_data[7]) + '%'}"></div>
						</div>
						<p class="text-number right-text" style="opacity: 1;">{{tlive.away_data[7]}} </p>
					</div>
				</div>
				<div class="score-progress">
					<div class="parse-item">
						<p class="text-number left-text" style="opacity: 1;">{{tlive.home_data[4]}}</p>
						<div class="progress left-progress">
							<div class="replay-pro left-pro" style="width: 50%; opacity: 1;" :style="{width:num(tlive.home_data[4],tlive.away_data[4]) + '%'}"></div>
						</div>
						<p class="static-name">危险进攻</p>
						<div class="progress">
							<div class="replay-pro right-pro" style="width: 50%; opacity: 1;" :style="{width:num(tlive.away_data[4],tlive.away_data[4]) + '%'}"></div>
						</div>
						<p class="text-number right-text" style="opacity: 1;">{{tlive.away_data[4]}} </p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import exponent from "./exponent.vue"
	import {
		football_match,
		getfootballDetail
	} from "@/api/football.js";
	export default {
		components:{exponent},
		props: {
			time: {
				type: Object,
				default: {}
			},
			lang:{
				type: Number,
				default: 0
			},
			id:{
				type: Number,
				default: null
			}
		},
		data() {
			return {
				top:'',
				left:'',
				page: 1,
				list1:[],
				tlive: {}, //详情
				loading:false,
				dataMask:false,
				loadStatus:'more',
				tliveLoading: false,
				screenListT:[],
				screenStatus:'competition_id',
				imglist: ['f-0', 'f-1', 'f-3', 'f-7', 'f-6', 'f-14', 'f-12', 'f-5', 'f-9', 'f-15', 'f-4', 'f-13'],
				// list: ['进球', '点球', '乌龙球', '红牌', '黄牌', '红黄换下', '任意球', '角球', '受伤', '开哨', '换人', '助攻']
			};
		},
		watch: {
			time(e) {
				this.page = 1;
				this.list1 = [];
				this.$store.state.loading = true;
				// console.log(this.$store.state.loading)
				this.getlist();
				setTimeout(() => {
					this.$store.state.loading = false;
				}, 1000);
			}
		},
		computed:{
			list(){
				return this.list1.filter(item=>{
					return this.screenListT.indexOf(item[this.screenStatus]) != -1
				})
			},
			// 显示红黄牌
			game (){
				return this.$store.state.game
			}
		},
		created() {},
		mounted() {
			this.getlist()
		},
		methods: {
			// 筛选列表
			screenList(list,status){
				this.screenListT = list
				this.screenStatus = status
			},
			// 技术统计对比
			num(num1, num2) {
				if (num1 == 0 && num2 == 0) {
					return 0
				}else if (num1 == num2 && num1 != 0 && num2 != 0) {
					return 50
				} else {
					// console.log(num2 / (num1 + num2))
					return num1 / (num1 + num2) * 100
				}
			},
			// 获取图片
			getImage(t) {
				let i = this.imglist
				if (t == 1) {
					return i[0]
				} else if (t == 2) {
					return i[7]
				} else if (t == 3) {
					return i[4]
				} else if (t == 4) {
					return i[3]
				} else if (t == 6) {
					return i[6]
				} else if (t == 8) {
					return i[1]
				} else if (t == 9) {
					return i[10]
				} else if (t == 15) {
					return i[8]
				}else{
					return i[8]
				}
			},
			
			mouseenter(e,type,item){
			  this.getDetail(item)
			},
			currentChange(e) {
				this.getlist(e)
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
				var result = hour + ":" + minute //+ ":" + second;
				// 返回
				return result;
			},
			// 移除列表
			mousemove() {
				this.dataMask = false
			},
			// 获取总进球数
			getAll(num1,num2,num3){
				// console.log('--------------------------------');
				
				// console.log(num1,num2,num3);
				if((num1+num2) > Number(num3)){
					return '大'
				}else if((num1+num2) < Number(num3)){
					return '小'
				}else {
					return '走'
				}
			},
			// 调用详情
			getDetail(item) {
				// return
				this.tliveLoading = true
				getfootballDetail({
					id: item.id,
					list_show:1,
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
			load(e) {
				// if(this.loadStatus == 'more' && this.loading){
				// 	this.loading = false
				// 	this.getlist()
				// }
			},
			getlist(page) {
				let data = {
					type: 3,
					is_web:1,
					time: this.time.day,
					company_id: this.id,
				}
				football_match(data)
					.then((res) => {
						
						this.list1 = res.data.data
						return
						this.list1 = [...this.list1, ... res.data.data]
						if (res.data.total > this.list1.length) {
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
		},
	};
</script>

<style>
	/* @import '../../styles/style.css'; */
</style>
