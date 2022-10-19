<template>
	<div id="ScoreBoard">
		<div class="score-conrainer" style="margin-top: 60px">
			
			<div class="score-container-main fff" style="margin: 0 auto;">
				<div  style="position: fixed;top: 60px;z-index: 99999;" :style="{top:topShow?'60px':'0px'}">
					<div class="" style="position: relative;">
						<div class="score-left-nav-filter-wrap" style="position: absolute;left: -60px;" v-if="tabIndex == 0">
							<div class="score-left-nav-filter-item" @click="collect()">
								<div class="score-left-nav-filter-item-icon left-nav-guanzhu"></div>
								<span>收藏</span>
							</div>
							<div class="score-left-nav-filter-item" @click="retain()">
								<div class="score-left-nav-filter-item-icon left-nav-gouxuan"></div>
								<span>保留</span>
							</div>
							<div class="score-left-nav-filter-item" @click="conceal()">
								<div class="score-left-nav-filter-item-icon left-nav-yingcang"></div>
								<span>隐藏</span>
							</div>
						</div>
						<div style="position: absolute; top: 310px; right: -70px" v-if="tabIndex == 0">
							<div class="" style="">
								<div id="matchStatusNav">
									<div class="item" :class="typeTab==0?'active':''" @click="setTab(0)"><i
											class="going-icon"></i>进行中</div>
									<div class="item" :class="typeTab==1?'active':''" @click="setTab(1)">
										<i class="uncoming-icon"></i>未开<span class="line"></span>
									</div>
									<div class="item" @click="setTab(2)" :class="typeTab==2?'active':''">
										<i class="finished-icon"></i>完场<span class="line"></span>
									</div>
									<!-- disable -->
									<div class="item "  @click="setTab(3)" :class="typeTab==3?'active':''"><i class="unknown-icon"></i>异常</div>
								</div>
							</div>
						</div>
						<div class="fixed-header-wrap">
							<div id="header-filter" >
								<div class="header-filter-left">
									<div class="buttons-wrap">
										<button v-for="(item, index) in tabList" :class="index == tabIndex ? 'active' : ''" @click="tabIndex = index" :key="index" class="left-button">
											{{ item }}
										</button>
										<!-- <el-badge :hidden="shouNum != 0?false:true" :value="shouNum" class="item"> -->
											<button class="left-button" style="margin-right: 0;" :class="3 == tabIndex ? 'active' : ''" @click="tabIndex = 3">收藏</button>
										<!-- </el-badge> -->
										<button class="left-button active" style="margin-left: 16px;" v-if="$store.state.concealNum != 0" @click="cancelConceal()">全部<span class="weight"> （隐藏{{$store.state.concealNum}}场）</span></button>
									</div>
								</div>
								<div class="header-filter-right" style="position: relative;">
									<div class="header-second-filter-right">
										<div class="ant-dropdown-trigger filter-main-button-container"
											style="position: relative;">
											<el-popover placement="bottom" width="100" trigger="click" popper-class="popover1">
												<ul class="" role="menu" tabindex="0" data-menu-list="true">
													<li class="ant-dropdown-menu-item ant-dropdown-menu-item-only-child" role="menuitem" tabindex="-1" data-menu-id="rc-menu-uuid-93853-1-0" @click="selectTab(item,maskIndex)" v-for="(item,index) in matchList" :key="index">
														<span class="ant-dropdown-menu-title-content">
															<div class="filter-choose-item" style="text-align: center;">
																{{item.name}}
															</div>
														</span>
													</li>
												</ul>
												<button slot="reference" class="match-filter-main-button " :class="maskIndex == 1?'active':''" style="margin: 0px" @click="getMaskShow(1)">
													<div class="i">{{selectLi}}</div>
													<i class="arrow-down"></i>
												</button>
											</el-popover>
											<!-- 类型下拉 -->
										</div>
										
										<el-popover placement="bottom" width="424" trigger="click" popper-class="popover1">
											<div class="filter-content">
												<div class="filter-header-tabs">
													<div class="tab-item"
														:class="checkIndex == 0?'active':''"
														@click="checkIndex = 0">按赛事</div>
													<div class="tab-item"
														:class="checkIndex == 1?'active':''"
														@click="checkIndex = 1">国家/地区</div>
												</div>
												<div class="filter-scroll-view" style="height: 348px;">
													<div class="filter-checkbox-wrap"
														v-for="(item,key,index) in screen.list"
														:key="index">
														<div class="filter-checkbox-word"
															v-if="maskIndex != 3">{{item.name}}</div>
														<ul class="filter-checkbox-list">
															<li class="filter-checkbox-item"
																:class="item1.check?'active':''"
																v-for="(item1,index1) in item.list"
																:key="index1">
																<label class="checkbox-wrap"
																	@click.stop="setCheckStatus($event,item1)">
																	<!-- <input type="checkbox" :value="!item1.check"> -->
																	<img width="18px" height="18px"
																		:src="item1.check?require('../../assets/images/check1.png'):require('../../assets/images/check.png')">
																	<!-- <div class="checkbox-content"></div> -->
																	<div class="checkbox-children">
																		{{item1.name}}
																		<span
																			class="filter-checkbox-item-matchnum">[{{item1.count}}]</span>
																	</div>
																</label>
															</li>
														</ul>
													</div>
											
												</div>
												<div class="filter-footer-wrap-for-football">
													<div class="quantity-information">选中 <span
															class="active">{{checkIndex == 0?screen.count_2:screen.count_1}}/</span>
														{{checkIndex == 0?screen.count_competition:screen.count_country}}场
													</div>
													<div class="filter-footer-button"
														@click="setAllCheck(true)">全选</div>
													<div class="filter-footer-button"
														@click="setAllCheck(false)">反选</div>
													<div class="filter-footer-button confirm-button"
														@click="setCheckList()">确定</div>
												</div>
											</div>
											<button slot="reference" :class="maskIndex == 2?'active':''" class="match-filter-main-button"
												@click="getMaskShow(2)">
												<div class="i">赛事</div>
												<i class="arrow-down"></i>
											</button>
										</el-popover>
										
									</div>
									<div class="header-filter-right-tools-wrap">
										<!-- <div class="search">
											<div class="">
												<img class="enlarge-button"
													src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAWlBMVEUAAACJiZiBhJKDhZWFiJWlpaWAg5OBhJOBg5KAhJKAhJOBhZWBg5OBhJSVmKWAg5KChJSSkpeBhJOBhJOBhJSBhZOBhJOChpSFhZWAhJOBhJOChZSAg5KUl6RY8yGOAAAAHHRSTlMAEcA5JgP1387F2UGPUbWrfgy7olx07Ukesp5iRCjhZAAAATFJREFUSMflVdl2hCAMBQRkGce9Tlv9/9+siZ4zynJKXtv7okAuuUkgsL8IPo3Cae3EOPEC80asF4jmF/PKrgFsxfJQjzWBh8qKH1aE6bzse+k7c4wHnrF3uNzK95RsccolGQr3rwPJVY0+UqpQv+CRX4FxJPKD9irhGRlxrizoSWrloMpG9Qq2eT4D52EFwW97GW/bZdCC2sAtbCJzBAmrd7kT1IvlCAwqON0I4z7T5QndvjxGIfg8wUdBOAghS8Ag3I2g95n+yOd2w5Hdfl/WZAJVUk0N2lDT+kUt3Df1aLyIh28gH2/iBTKKeEU9sQnohtZmsP8RGhnCvopbpZg1fD6a4maMwvCvpN17dP4ZyMo9KHZhJ05ZS/mTdcqaWRHesrRi5ZhBFIEAOTEL+5f4AfcQNF+GuUUUAAAAAElFTkSuQmCC"
													alt="enlarge" />
											</div>
										</div> -->
										<el-popover placement="bottom-end" width="384" trigger="click" popper-class="popover1">
											<div class="setting-popover-content">
												<div class="setting-header">其他比分设置</div>
												<div class="setting-content" style="background: white;">
													<div>
														<div class="setting-item">
															<p class="label-name">语言选择</p>
															<div class="options">
																<div class="option-button"
																	@click="langIndex = index"
																	v-for="(item,index) in langList" :key="index"
																	:class="index == langIndex?'active':''">{{item}}
																</div>
															</div>
														</div>
													</div>
													<div>
														<div class="setting-item">
															<p class="label-name">比赛信息</p>
															<div
																class="ant-checkbox-group checkbox-group-container">
																<!--  -->
																<label class="ant-checkbox-wrapper"
																	@click="setGame('red')"
																	:class="game.red?'ant-checkbox-wrapper-checked':''">
																	<span class="ant-checkbox">
																		<img :src="game.red?require('../../assets/images/check1.png'):require('../../assets/images/check.png')"
																			width="20px" height="20px">
																		<!-- <span class="ant-checkbox-inner"></span> -->
																		红牌数
																	</span>
																</label>
																<label class="ant-checkbox-wrapper"
																	@click="setGame('yellow')"
																	:class="game.yellow?'ant-checkbox-wrapper-checked':''">
																	<span class="ant-checkbox">
																		<img :src="game.yellow?require('../../assets/images/check1.png'):require('../../assets/images/check.png')"
																			width="20px" height="20px">
																		<!-- <span class="ant-checkbox-inner"></span> -->
																		黄牌数
																	</span>
																</label>
																<!-- <el-radio @ca v-model="game.red" label="1">红牌数</el-radio>
																 <el-radio v-model="game.yellow" label="2">黄牌数</el-radio> -->
															</div>
														</div>
													</div>
													<div>
														<div class="setting-item">
															<p class="label-name">声音设置</p>
															<div class="options" style="width: 157px;">
																<div class="option-button"
																	:class="game.voice?'active':''"
																	@click="setGame('voice',1)">哨声</div>
																<div class="option-button"
																	:class="!game.voice?'active':''"
																	@click="setGame('voice',2)">静音</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<img slot="reference" class="setting-popover-button" @click="langMask=!langMask"
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAn1BMVEUAAACjo6Ojo6yAg5KUmKWBhJOUoqWBg5OChZOBhJOBhJOLi5yVl6WUmKSAg5OVmKaBhZSXm6aUmaeUmqaBhJOAhJOChZSIiJuBhJKAhJOBhJKChZSDhZSDhZWDh5SFhpaGh5aBhJKAg5KBhZOHh5eVmKSUl6WChJOBhJODhJSAg5KAg5OBhJOBhJOBhJODg5KBhJKBhJKBhZOAg5KUl6R0AIjxAAAAM3RSTlMABAb9kvEL2Fq4nA/z1aqaeEI3K/nQTxT0yLBVSjYuKSLn4XEa5r1zZD7utKGZf0PCpJRbH5GKAAABxUlEQVRIx91V2ZaCMAwdVgvDouigwrC57zrS//+2aYq0pUcRXs0L9Saxyc3Sr48UxZ6UlWjWdxeH35LLsIvDUHCIujhYgkOhdIhII4YZOaiz9phUhCDFGMxuFLHJaTJUCA3h7kn2HtFaxwFlZ0+R1YxGdfSKsvxR27i5PLBQe82XMmAqjevCGUONVdNhWSsmUSrAK9uoFaeG/RTwcxqjvZydukdxuoWLExE+w6VTyVYKeC4AKWS35L/Huus4rj5mwBWCQs3iDhQWhY4fojMyI2Kx4GUHMg55bb/B2A9MM/Ax3jw8ppTEnDn8lSWvjY7Xo+o0WmO9rioYKDypOwC7Kn6Mwb7ywJjmkYD61iDlxGjQsc9hv7rCZgEwyYBpE04uDjgcYBc+kEEoUb2ok3KwyVETO/AB1uUqFTAFrxxgyKUWyDUSktoWUixNw9uk54rYK6cOtLKdwwqndCocb42spTVM1hq9m69/e/cfID6idhaiqzyiZoLiZElHtOcSsF+vmS1DQ0NeM+2LLJYXmdwcxtFbCKsyp/9fWJHBpkFaxtCm6MAIudP4VKKSlvGT2DLgBy7Y9ntQoLjv5SI4eL0fxf7P7kfKP05cbJAGXu+dAAAAAElFTkSuQmCC"
												width="24" alt="setting" />
										</el-popover>
									</div>
									
								</div>
								
							</div>
							<img class="score-banner"
								src="../../assets/images/main-banner.jpg"
								alt="score-banner"  @click="$router.push('/downLoad')" />
							<div class="header-date-filter" v-if="tabIndex == 2 || tabIndex == 1">
								<div class="date-button" :class="index == timeIndex?'active':''"
									@click="timeIndex = index" v-for="(item,index) in dateTime" :key="index">
									<div class="date">{{item.data}}</div>
									<div class="week">{{item.time}}</div>
								</div>
								<div class="date-button" style="color: rgb(128, 131, 146);position:relative"
									@click="getShow()">
									<i class="date-picker-icon"></i>日历<i class="arrow-down"></i>
									<el-date-picker ref="abc" type="date" v-model="time" format="yyyy-MM-dd"
										value-format="yyyy-MM-dd" class="datePicker" @change="change"
										placeholder="选择日期">
									</el-date-picker>
								</div>
							</div>
							<!-- <div class="header-date-filter"><div class="date-button "><div class="date">10-21</div><div class="week">周四</div></div><div class="date-button "><div class="date">10-22</div><div class="week">周五</div></div><div class="date-button "><div class="date">10-23</div><div class="week">周六</div></div><div class="date-button "><div class="date">10-24</div><div class="week">周日</div></div><div class="date-button "><div class="date">10-25</div><div class="week">周一</div></div><div class="date-button "><div class="date">10-26</div><div class="week">周二</div></div><div class="date-button active"><div class="date">10-27</div><div class="week">周三</div></div><div class="date-button" style="color: rgb(128, 131, 146);"><i class="date-picker-icon"></i>日历<i class="arrow-down"></i><div class="ant-picker date-picker"><div class="ant-picker-input"><input readonly="" placeholder="请选择日期" title="2021-10-27" size="12" autocomplete="off" value="2021-10-27"><span class="ant-picker-suffix"><span role="img" aria-label="calendar" class="anticon anticon-calendar"><svg viewBox="64 64 896 896" focusable="false" data-icon="calendar" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"></path></svg></span></span><span class="ant-picker-clear" role="button"><span role="img" aria-label="close-circle" class="anticon anticon-close-circle"><svg viewBox="64 64 896 896" focusable="false" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg></span></span></div></div></div></div> -->
						</div>
					</div>
				</div>

				<div class="basketball-score-container" style="background: white;" v-loading="$store.state.loading">
					<el-scrollbar wrapClass="scrollbar-wrap" :style="{ height: scrollHeight }" ref="scrollbarContainer">
						<basketball0 ref="basketball0" v-if="tabIndex == 0"  @setTypeTab="setTypeTab"  :typeTab="typeTab" :lang="langIndex" :style="{marginTop:tabIndex == 0?'136px':''}"></basketball0>
						<basketball1 ref="basketball1" v-if="tabIndex == 1" :lang="langIndex" :time="timeType"></basketball1>
						<basketball2 ref="basketball2" v-if="tabIndex == 2" :lang="langIndex" :time="timeType"></basketball2>
						<basketball3 ref="basketball3"v-if="tabIndex == 3" :lang="langIndex"></basketball3>

					</el-scrollbar>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import basketball0 from "./basketball-0.vue";
	import basketball1 from "./basketball-1.vue";
	import basketball2 from "./basketball-2.vue";
	import basketball3 from "./basketball-3.vue";
	import {
		match_filter,
	} from "@/api/football.js";
	import {
		getList
	} from "@/api/basketball.js";
	export default {
		components: {
			basketball0,
			basketball1,
			basketball3,
			basketball2
		},
		data() {
			return {
				time: '',
				typeTab:0,
				timeType: {},
				loading: false,
				tabIndex: 0,
				langIndex:0,
				checkIndex:0,
				topShow:true,
				selectLi: '完整', //选中的完整热门
				screen:{
					list:[],
					country:{},
					count_1:null,
					count_2:null,
					competition:{},
					count_country:null,
					count_competition:null
				},//筛选对象competition-赛事；country-国家-赛事筛选
				langList:['简体','繁体','English'],
				langMask:false,//切换语言
				dateTime: [], //时间列表
				timeIndex: 0, //时间下表
				scrollHeight: "",
				maskIndex:null,//显示的弹窗
				matchList:[{
						name: '完整',
						id: 0
					}, {
						name: '热门',
						id: 1
					}],
				tabList: ["即时", "赛果", "赛程"],
			};
		},
		watch: {
			// 切换语言
			langIndex(e){
				this.langMask = false
				localStorage.setItem('langIndex',e)
			},
			langMask(e){
				if(e){
					this.maskIndex = null
				}
			},
			// 监听赛事切换监听
			checkIndex(e){
				if(e == 0){
					this.screen.list = this.screen.competition
				}else {
					this.screen.list = this.screen.country
				}
			},
			
			tabIndex(e) {
				if (e == 1) {
					this.get6Days(2);
					this.timeIndex = 5
				} else if (e == 2) {
					this.timeIndex = 0
					this.get6Days(1);
				}
				if(e == 0){
					this.scrollHeight = ''
				}else{
					this.scrollHeight = '600px'
				}
				// this.$store.state.loading = true
				// setTimeout(res => {
				// 	this.$store.state.loading = false
				// }, 1000)
				this.getCheckList()
			},
			timeIndex(e) {
				if (e == null) {
					return
				}
				// console.log(this.dateTime[e])
				this.timeType = this.dateTime[e]
			},
			listType1(e) {
				console.log(e)
				this.listType1 = e
			}
		},
		computed:{
			infos(){
				return this.$store.state.infos
			},
			shouNum(){
				return this.$store.state.shouNum
			},
			game() {
				return this.$store.state.game
			},
		},
		created() {
			// console.log()
			this.$store.state.loading = true
			setTimeout(res => {
				this.$store.state.loading = false
			}, 1000)
			this.langIndex = Number(localStorage.getItem('langIndex')) || 0
		},
		mounted() {
			this.getCheckList()
			// 获取收藏的条数
			this.getList()
			this.$store.state.type = 2
			console.log('切换篮球');
			this.$WebSocket.send({type:"classify",classify_type:1},'','')
			window.addEventListener('scroll',this.handleScroll,true)
		},
		methods: {
			// 开启websocket
			init() {
				//发起websocket连接
				let config = {}
				this.$WebSocket.WebSocketFn((res,config) => {
					if (!res) return;
					this.retundata();
					this.onclose();
				});
			},
			retundata() {
				//监听接受到websocket的信息
				this.$WebSocket.onmessage((res) => {
					// console.log(res);
					this.$store.dispatch("WS_DATA_ACTIONS", res);
				});
			},
			onclose() {
				//监听长连接的一个断开
				this.$WebSocket.ws.onclose = () => {
					//console.log("断开连接1");
					// this.$store.dispatch("setDeviceNum", "");
					// let info = this.$store.state.Counter.websocketinfo;
					//console.log("尝试重新连接长连接");
					this.init();
				};
			},
			// 监听滚动条
			handleScroll(e){
				let path = this.$route.path
				if(path != '/basketball') return
				if(this.tabIndex == 0){
					this.$refs.basketball0.handleScroll()
				}
				let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
				if(scrollTop > 60 ){
					this.topShow =false
				}else{
					this.topShow = true
				}
			},
			// 获取收藏的条数
			getList(){
				
				getList({type:4}).then(res=>{
					this.init();
					this.$store.state.shouNum = res.data.data.length;
				}).catch(res=>{})
			},
			
			// 选择公司
			selectTab(item, type) {
				// if (type != 1) {
				// 	this.id = item.id
				// 	this.boxLi = item.name
				// }else 
				console.log();
				if(type == 1){
					this.match_id = item.id
					this.selectId = item.id
					this.selectLi = item.name
					this.getCheckList()
				} else {
					this.selectId = item.id
					this.selectLi = item.name
				}
				this.maskIndex = null
			},
			// 调用筛选
			getCheckList(){
				let data = {
					ball:1,
					type:this.match_id,
					match_filter:this.tabIndex,
				}
				// console.log();
				if(this.tabIndex == 1 || this.tabIndex == 2){
					data.date = this.timeType.day
				}
				match_filter(data)
					.then((res) => {
						res.data.count_1 = res.data.count_country
						res.data.count_2 = res.data.count_competition
						res.data.list = res.data.competition
						this.screen = res.data
						let list = []
						res.data.competition.forEach(item1=>{
							item1.list.forEach(item=>{
								if(item.check){
									list.push(item.id)
								}
							})
						})
						setTimeout(res=>{
							this.$refs['basketball'+this.tabIndex].screenList(list,'competition_id')
						},500)
					}).catch(res=>{})
			},
			
			// 申请主播
			applyFor(){
				if(JSON.stringify(this.infos) === '{}') return this.$store.state.user.showLoginMask = true
				if(this.infos.is_anchor == 1){
					let routeData = this.$router.resolve({
						path: "/member?type=9"
					})
					window.open(routeData.href, '_blank')
				}else{
					let routeData = this.$router.resolve({
						path: "/member?type=7"
					})
					window.open(routeData.href, '_blank')
				}
				
			},
			// 获取选中的赛事
			setCheckList(){
				let list = []
				let num = 0
				if(this.checkIndex == 0){
					let arr = this.screen.competition
					
					for (let i in arr) {
						arr[i].list.forEach(item=>{
							if(item.check){
								list.push(item.id)
							} else {
								num += item.count
							}
						})
					}
					
					this.$refs['basketball'+this.tabIndex].screenList(list,'competition_id')
					// this.screen.list = arr
				}else{
					let arr = this.screen.country
					for (let i in arr) {
						arr[i].list.forEach(item=>{
							if(item.check){
								list.push(item.id)
							} else {
								num += item.count
							}
						})
					}
					this.$refs['basketball'+this.tabIndex].screenList(list,'competition_id')
				}
				this.getMaskShow(2)
				this.$store.state.concealNum = num
			},
			// 隐藏
			conceal(){
				this.$refs.basketball0.conceal()
			},
			// 保留
			retain (){
				this.$refs.basketball0.retain()
			},
			// 收藏
			collect (){
				this.$refs.basketball0.collect()
			},
			// 取消隐藏
			cancelConceal(){
				let list = []
				let arr = []
				this.$refs.basketball0.cancelConceal()
				// 显示赛事
				if (this.checkIndex == 0) {
					arr = this.screen.competition
				} else {
					arr = this.screen.country
				}
				for (let i in arr) {
					arr[i].list.forEach(item => {
						item.check = true
						list.push(item.id)
					})
				}
				if (this.checkIndex == 0) {
					this.$refs['basketball' + this.tabIndex].screenList(list, 'competition_id')
				} else {
					this.$refs['basketball' + this.tabIndex].screenList(list, 'country_id')
				}
			},
			
			
			getShow() {
				console.log('9ij')
				// console.log(this.$refs.tiemPick)
				this.$refs.abc.focus()
			},
			// 显示隐藏弹窗
			getMaskShow(type){
				if(this.maskIndex == type){
					return this.maskIndex = null
				}
				if(this.langMask){
					this.langMask = false
				}
				this.maskIndex = type
			},
			// 选中的日期
			change(e) {
				console.log(e)
				let data = {
					day: e,
				}

				this.timeType = data
				this.timeIndex = null
				console.log(data)
			},
			
			// 修改三个状态高度
			setTypeTab(num){
				document.documentElement.scrollTop  = num - 145
			},
			// 切换高度
			setTab(type) {
				this.typeTab = type
				this.$nextTick(() => {
					// this.$refs['scrollbarContainer'].wrap.scrollTop = 500
					// document.querySelector(".el-main").scrollTop = anchor.offsetTop;
					// console.log(this.$refs.scrollbarContainer.)
					// this.$refs.scrollbarContainer.scrollTop = 0
				});
			},
			// 全选/反选
			setAllCheck(status){
				if(this.checkIndex == 0){
					let arr = this.screen.competition
					for (let i in arr) {
						arr[i].list.forEach(item=>{
							item.check = status
						})
					}
					if(status){
						this.screen.count_2 = this.screen.count_competition
					}else {
						this.screen.count_2 = 0
					}
					this.screen.list = arr
				}else{
					let arr = this.screen.country
					for (let i in arr) {
						arr[i].list.forEach(item=>{
							item.check = status
						})
					}
					if(status){
						this.screen.count_1 = this.screen.count_country
					}else {
						this.screen.count_1 = 0
					}
					this.screen.list = arr
				}
				
			},
			setCheckStatus (e,item){
				if (e.target.tagName === 'INPUT') return
				item.check = !item.check
				if(item.check && this.checkIndex == 0){
					this.screen.count_2++
				}
				if(!item.check && this.checkIndex == 0){
					this.screen.count_2--
				}
				if(item.check && this.checkIndex == 1){
					this.screen.count_1++
				}
				if(!item.check && this.checkIndex == 1){
					this.screen.count_1--
				}
				
				console.log(item.check);
			},
			
			// 调用筛选
			getCheckList(){
				let data = {
					ball:1,
					type:this.match_id,
					match_filter:this.tabIndex,
				}
				// console.log();
				if(this.tabIndex == 1 || this.tabIndex == 2){
					data.date = this.timeType.day
				}
				match_filter(data)
					.then((res) => {
						res.data.count_1 = res.data.count_country
						res.data.count_2 = res.data.count_competition
						res.data.list = res.data.competition
						this.screen = res.data
						let list = []
						res.data.competition.forEach(item1=>{
							item1.list.forEach(item=>{
								if(item.check){
									list.push(item.id)
								}
							})
						})
						setTimeout(res=>{
							this.$refs['basketball'+this.tabIndex].screenList(list,'competition_id')
						},500)
					}).catch(res=>{})
			},
			//获取六天数据
			get6Days(type) {
				//type==1前,2后
				//获取系统当前时间
				var now = new Date();
				var nowTime = now.getTime();
				var oneDayTime = 24 * 60 * 60 * 1000;
				let arr = [];
				for (var i = 0; i < 6; i++) {
					//显示周一
					if (type == 1) {
						var ShowTime = nowTime + i * oneDayTime;
					} else {
						var ShowTime = nowTime - i * oneDayTime;
					}

					//                    var ShowTime = nowTime + (i+1)*oneDayTime ;
					//初始化日期时间
					var myDate = new Date(ShowTime);
					var year = myDate.getFullYear();
					var month = myDate.getMonth() + 1;
					var date = myDate.getDate();
					var str = "周" + "日一二三四五六".charAt(myDate.getDay());
					arr.push({
						data: month + "-" + date.toString().padStart(2, "0"),
						time: str,
						day: year + "-" + month + "-" + date,
					});
				}
				if (type == 1) {
					this.dateTime = arr;
				} else {
					this.dateTime = arr.reverse();
				}
			},
		}
	};
</script>

<style>
	#ScoreBoard .score-conrainer {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		position: relative;
		width: 1304px;
		margin-left: auto;
		margin-right: auto;
		/* left: -50px; */
		/* overflow: hidden; */
	}

	.datePicker {
		position: absolute;
		top: 0;
		left: -50px;
		z-index: -1;
		/* visibility: hidden; */

	}

	.container-section .title {
		width: 100%;
		height: 60px;
		background-color: #fff;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-left: 542px;
	}

	.container-section .title .con {
		display: flex;
		font-size: 14px;
		color: #9197ad;

	}

	.container-section .title .con img {
		margin-right: 8px;
	}

	.score-banner {
		width: 1200px;
		height: 80px;
		object-fit: cover;
		cursor: pointer;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
	}

	.score-container-main {
		width: 1200px;
		min-height: calc(100vh - 60px);
	}
	.popover1 {
		padding: 0 !important;
	}
	.fff .popover { 
		padding: 0 !important;
	}
	.fff .el-popper[x-placement^="bottom"] {
		padding: 0 !important;
	}
	/* @import url("~@/styles/basketball.css"); */
</style>
