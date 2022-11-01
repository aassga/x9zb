<template>
	<div class="header-react is-transparent-bg" :class="index != 0?'header-active':''">
		<div class="header-container"><a aria-current="page" class="header-container-logo active" @click="goHome()">
		<img :src="index != 0?require('@/assets/images/logo-no-shadow.png'):require('@/assets/images/logo-a.png')" alt="体育"></a>
			<div class="header-container-navigation">
				<a aria-current="page" :class="index==0?'active':''" href="javascript:"
					@click="$router.push('/'),index=0">
					<div class="a-text-box"><span class="a-text">首页</span></div>
				</a>
				<div class="" style="position: relative;cursor: pointer;" :class="index==1?'active':''">
					<!-- basketball -->
					<el-popover
					   placement="bottom"
					   width="170"
					   trigger="hover">
						<div class="ant-popover ant-popover-placement-bottom "
							style="">
							<div class="ant-popover-content">
								<!-- <div class="ant-popover-arrow"><span class="ant-popover-arrow-content"></span>
								</div> -->
								<div class="ant-popover-inner" role="tooltip">
									<div class="ant-popover-inner-content">
										<div class="score-nav-popover-wrap">
											<div class="score-nav-popover-line">
												<a class="score-nav-popover-button" href="javascript:"
													@click="$router.push('/football'),index=1">足球</a>
												<!-- @click="$router.push('/football'),index=1">足球</a> -->
												<a class="score-nav-popover-button" href="javascript:"
													@click="$router.push('/basketball'),index=1">篮球</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<a slot="reference" href="javascript:" @click="$router.push('/football'),index=0">
							<div class="a-text-box"><span class="a-text">即时比分</span><span class="sanjiao-down"></span></div>
						</a>
					 </el-popover>
				</div>
				<div class="" style="position: relative;" :class="index==2?'active':''"
					@click="$router.push('/anchor?type=0'),index=2">
					
					 <el-popover
					    placement="bottom"
					    width="220"
					    trigger="hover">
						<div class="ant-popover ant-popover-placement-bottom "
							style="">
							<div class="ant-popover-content">
								<!-- <div class="ant-popover-arrow"><span class="ant-popover-arrow-content"></span>
								</div> -->
								<div class="ant-popover-inner" role="tooltip">
									<div class="ant-popover-inner-content">
										<div class="score-nav-popover-wrap">
											<div class="score-nav-popover-line">
												<a class="score-nav-popover-button" href="javascript:"
													@click.stop="$router.push('/anchor?type=1'),index=2">足球</a>
												<a class="score-nav-popover-button" href="javascript:"
													@click.stop="$router.push('/anchor?type=2'),index=2">篮球</a>
													<a class="score-nav-popover-button" href="javascript:"
													@click.stop="$router.push('/anchor?type=4'),index=2">电竞</a>
													<a class="score-nav-popover-button" href="javascript:"
														@click.stop="$router.push('/anchor?type=3'),index=2">其它</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<a slot="reference" href="javascript:">
							<div class="a-text-box">
								<span>直播</span><span class="sanjiao-down"></span>
							</div>
						</a>
					  </el-popover>
					
				</div>
				<a href="javascript:" @click="index=3,$router.push('/schedule?type=4')" :class="index==3?'active':''">
					<div class="a-text-box">
						<span>赛程</span>
					</div>
				</a>
					<!-- $router.push('/news'),index=4 -->
				<!-- <a class="" href="javascript:" @click="$router.push('/news'),index=4" :class="index==4?'active':''">
					<div class="a-text-box"><span class="a-text">头条</span></div>
				</a> -->
				<!-- <a href="javascript:" @click="$router.push('/circle'),index=5" :class="index==5?'active':''">
					<div class="a-text-box"><span class="a-text">社区</span></div>
				</a> -->
				<a href="javascript:" @click="$router.push('/foresight')" :class="index==9?'active':''">
					<div class="a-text-box"><span class="a-text">情报中心</span></div>
				</a>
				<div class="" style="position: relative;" :class="index==6?'active':''">
					<!-- $store.commit('kaifazhong') -->
					<a slot="reference" href="javascript:" @click="$router.push('/base-football')">
						<div class="a-text-box"><span class="a-text">资料库</span>
						<!-- <span class="sanjiao-down"></span> -->
						</div>
					</a>
				</div>
				<a href="javascript:" @click="$router.push('/downLoad'),index=7" :class="index==7?'active':''">
					<div class="a-text-box" style="cursor: pointer;"><span class="a-text">APP下载</span></div>
				</a>
				<img class="daily-icon" src="../../assets/images/daily/daily-icon.png" @click="$router.push('/dailyMission')"/>
			</div>
			<div class="nav-bar-search  search-popover-container" :style="{width:search?'190px':'160px'}">
				<el-popover placement="bottom" width="420" trigger="click">
					<div class="search-popover-container">
						<div class="nav-search-popover">
							<div class="search-history">
								<div class="list-header" v-if="historyList.length != 0">
									<div class="sub-title"><i></i>历史搜索</div>
									<div class="clear" @click="getHistory(3,'')"><i></i>清空</div>
								</div>
								<ul class="list-history clearfix">
									<li class="item-history" v-for="(item,index) in historyList" :key="index"
										@click.stop="getHistory(1,item)">
										<span class="txt">{{item}}</span>
										<i class="icon-del" @click.stop="getHistory(2,index)"></i>
									</li>
								</ul>
							</div>
							<div class="search-hot">
								<div class="sub-title"><i></i>热门搜索</div>
								<ul class="list-hot clearfix">
									<!-- <li class="item-hot"><span>{{index}}</span>英超</li> -->
									<li class="item-hot" v-if="index<10" v-for="(item,index) in hotList" :key="index"
										@click.stop="getHistory(1,item.short_name_zh)">
										<span>{{index+1}}</span>
										{{item.short_name_zh}}
									</li>
								</ul>
							</div>
						</div>
					</div>
					<input slot="reference" id="search" @focus="focus" @blur="blur" type="text" v-model="name"
						maxlength="10" placeholder="日职联" autocomplete="off" value="">
				</el-popover>
				<router-link tag="a" target="_blank" class="grid-header-right-more" :to="'/search?name='+ name">
					<i class="search-icon"></i>
				</router-link>

			</div>
			<!--  -->
			<div class="header-live-btn" @click="info.token?getRes():getLogin()"><img
					src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAKKADAAQAAAABAAAAKAAAAAB65masAAADfUlEQVRYCe1YW0hUQRieOXu8ZNbWruZqPVhRZNGDGiQFkquIPUbUa/gSSXiyG3aB2icriWjVlx7K6CnqpSISvKxFBFmQCSl0oQxddaFdM8122z3n7x/bOa6LZ1nd01ZwBob557/Nt9/MGf5ZQoxmMGAw8H8zQCPh19nzihSQG4GQ7ajPjLQlKlNKPJijg9KME86uT0yOq6kAayvyCoks92BUSlyRi3SihA5asqxbHXf7p+JJIXInqsgXkbkUSmmAALkNBNzcpseIwIowZxX2/HGfT8KcDfHkVQGGt5XFtDZ1j9XEE7xQH8luGwCAAgUUdoTUVrvbli0qotmcKw47bg76VQMKgjoBYmYyAh1UdToLPDcFOrPWsfLVG2vtOfdJAEZDP4PvfZ/9Q1JZ7sHIZVUGI5Vcrquy5UOIFvN59IgLyXJqhqu57cO3aFvsOaQhm+dDIJ9GRtK4L25/FlJ0TSqzfcVdvMP0mgAd+7Zk+rzeNwDKUp5gvpH6p56gftd8Ni0dMllCAEqYHb9uBYcbeEb7AMg5BJkNFM6gLjZA71QgSAmwLy0mQEw2jj6La5T0gSAeau50P2cJjthtaxBkPbK6mSecPYNcEx5x2wLpmSs2mKipWLOLYqG1tGZvVKjmFO+0MWbEm+I79pPW0oJtHBzTI5X8x6pXneYWs4DGB28ncXjFZM3W4dA0RRssVqs0/sX72CQK3VfaR4aIawZvtNuceUyAczx1mIQv51sLSaW5xQtJ8id9DYCJsmswaDCYKAOJxif1HqyvWGcOKNN75DRTZ3Obezge8En9SH7I0w0yQCv1hwakctthrA3Vil4LbFIBIpy1DAhWM8tAgRYsuZ4er8zbxMEh2vSwHOS6pG4xXzRi3BkMKa8le85lKgi9igLVzIZA+7nPXwGIlcxLLOWeIZMSbjMrWM+CzMrC340KpIXLSd1iviju8bTT5TlKRbIDwfZyPTIXwrnD2eW5znWzDFIygYFmdMrnRr1HlhtZI1jkTrDcznYPe+YWsfc4smZJB9p7ocvtZTbeVIAY3IPBlWioxjfBEiy99X924ouOLSxQgQFT21XXiGbNqQIEwXQKH+5l4TNxQI3WScAfPJOJPdxXWixNhIzGldnEvV58nBwrWbv8ER7e9ahbhT2V2/QY2V8f2O9RIWP/pYfveGmvR2ojh8GAwcA/zcAvm3oiOMIjBsUAAAAASUVORK5CYII="
					alt="体育">
				<!-- <router-link tag="a" target="_blank" to="/member?type=9"> -->
				<span>开播</span>
				<!-- </router-link> -->

			</div>

			<!-- <img src="/assets/images/userLogo.png" > -->
			<!-- {{info}} -->
			<div class="header-container-box" v-if="!info.token">
				<span class="header-container-login" @click="getLogin()">登录</span>
			</div>
			<div class="header-container-user" v-else>
				<img @mouseover="mouseOver" class="header-container-user-head"
					:src="infos && infos.avatar?infos.avatar:logo" alt="" width="34" height="34" title="">
				<div style="position: absolute;top: 28px; right: 0; width: 410px;" class="user-mask">
					<div>
						<div class="ant-popover ant-popover-placement-bottomRight "
							style="left: 794px; top: 0px; transform-origin: 411px -4px;">
							<div class="ant-popover-content" style="padding-top: 20px;">
								<!-- <div class="ant-popover-arrow"><span class="ant-popover-arrow-content"></span></div> -->
								<div class="ant-popover-inner" role="tooltip">
									<div class="ant-popover-inner-content">
										<div class="header-user-info-wrap">
											<div class="header-user-basic-wrap">
												<div class="header-user-logout" @click="logout()">退出</div><a
													class="header-user-basic-head-img" href=""><img
														:src="infos && infos.avatar?infos.avatar:logo"></a>
												<div class="header-user-basic-nick-name-warp">
													<div class="header-name-wrap"><span
															class="header-user-basic-nick-name ellipsis"
															v-if="info">{{infos.user_nickname}}</span>
													</div>
													<div class="header-user-basic-rank"><span
															class="name">LV{{infos.exp}}</span>
													</div>
												</div>
											</div>
											<div class="header-user-info-line"></div>
											<!-- <div class="header-user-info-wallet-wrap">
												<div class="header-user-info-wallet-info"><span
														class="header-user-info-wallet-title">我的钱包：</span>
													<div><img
															src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAC/VBMVEUAAADz25//1azRrGf33Kv/7c/33K3Trmr+7M7Ur2veuXXmvXvnxYfSrmj22qvWsm3QrGbatnLRrGf868zu0JjryIr/7crSrWneuXf758PuzZLRrGj97M3lwYDz1qH/7Mr/7tL426joyY/duHfw05z86svZtnLdunfYs3DqxYblwYH/7c766Mn96s3+7c7atXHqx4fQq2fkwH7/7M7tyonnyI3ivXvZtHH226nlw4X/7MziwYH95b7gvHvct3PatXD86s3/7M3/5r/auXX758jQrmbfv3r/1I3mslLTlyP/77b/zW/fu3n/0HjVsGzQq2b/uzj55sbRrWjQnUv/vUL+7M353qPjv3/btnPXs3DJjTP668/oxIPlwYDownXTrmr76sz+6sr/5bX23rH33an82Jruzpb20pTxzo/vy4ztyYnqxofNmUPWnS/+8tz66cn+58H44Lbz16X126P/3Jv41Zfsy5T/1ZLkx5LryZDmwoLhvXzfuXbcuHXmvWndtmnqvWfnuV3lt13ntlrSoU/VokreqUXVoETKlkDSnD7KlDz44br/4rH436723K7v1qv536j425zv0Zv+1I/wzI7pw3vjvnvZtHHpwW7humvftGDltVjXp1PVpE7Nm0nbpkbRm0Piq0LYokLUnT/JkTvXnjjTmTf+79T96Mb85b312qjx1aTy1J/+2Jb015b42ZPnx47/2I300orcvYL/1IH/0n3auXrvx3Dlv2/pvWPbrWLhslfbrlfjtFXerVH/wErkrkrdq0rapD7PmD3OljrKkTf34r755L3/67b03LX537L13Kv+36jw1KL+26H2z4z41Yv50Iry0obuzYXsyYLzyoDxyYDuynvwxnvivHnlvXLtwW3Zs23mvWzZsGjvxWTluGTswWPpumL/yF7qvVfZpkn+vT3RlTHWmi3Jiy3/8dj/5rj+5ar+46Hhwoj31of/1ITdt3T/z3PVsm/+ymbhtWDUplnrv1jmt1Xpu1P/wU7arU7fq03nr0LVmSnGtgaVAAAAR3RSTlMABwRTFcWyqpGEIxD929LIx7+6saainJOPgXt7YltQNiwj+fXy8e3r6+Xk4uDf3trQzMe8urifmoyIhnNqamZZVlFQTEE8MEjBFY0AAAO+SURBVEjH7dRlVFNhGAfwOezu7u7u7o1xuRubK1zp5tqlm+ux6QoUpBsEBLu7aOzu7u5uPb6Xb4OrZ8fP/j7///e8z3Pu+2L++3ddag2oWwMTuI5UoFbNQOPYutQww/YY3qCugeW7jqBGMYlEooHXayr279Fp41u3qDWYSo3h3joXyyFvD1MObFG3XceZf5qm9Twg7NBRAzeVBpzn7ooJq9S4AWq+5po1+l1MLgzDibQVAG3TDRh+v2u7Yb2kPfoqVethe8rl89toNMFyQCDQii9w9thhi7QVamH6WsON15s3x8ZqBYJoPp8fffy4VqvddLuQKR2JWpi49lXqmc2xh5VKHo83t5IySrP7Z06ybChqoV0U3XZm0+p5ixDzKz1XrMMX5ySz+qEWaqvNe7bxn4V+mwMQXoQCO+8rnMU5DHZDtMV2U0dDnG2KrSFvQH4rgbADFIpIJzTFOW/ppk7V8zUa87dYLqtVISEh9+cUEQiEI6Gh70ikIsUdd5qZ3b/af4WtHS2EUs4pdoLCjjkvCcDWnY9IJBLuqNttSaIPr3qosevi6LbdgmUgDxoExJEPJODR6gOlJeakpNH++c6aDaabt3evi1uI2L8EEbEYsXH1gdz8QroZmuS/ofVG9oO71y/M/RgM/ErHA1dwCNXJh7n5T67SoT5+hZYb9KYHn+9yhLxSpBGBFE4j+WWHMlyevMfX2NYeWL+d9oyTcb7uTeGcVD8BhTtIIR7kTyn3ZbryCrJZkLVtlSHihLKUL3v3cPhCUHCDfATIb5xnyXR5CnJZdEazqnepvVAvtTls15IO3wQNBx5/CYeLVxmXLqWs9CWyGUOqX4mWeqPsoDM1lb2mpHKIs2CAGCRfZmMxetdHuT/djRLn/jS7XaZeGJyOT4/HnYr6tJRCKSuXQMwpGBSjtiQ4C9PS7BnGDcH5+Ou4japbFApFHulLYPRFfQxaNUxwuL8fyMzM0CQG37sYv/YqJStL7q3IEzObYNCMM4n3lmZ7PC5XxrH9984u02fJ5d7IivBcMVwHtTCBnnApv6DA51u5ct+xxBOaLK83clV4+FOnhNsGtdDJLBNddBz8kV0ml+8TbqF4V60qz/NkO0QscgfUwmwIYknEIpHudElFeST4uO+KTqcTiVlcYhAGVVurlcFgJFukuoPhwEORxAqTyeDRHPanp6/+jMn1xjRjMtkLIh4/TV9gIpMbNa/TpkOQXx6l1gSGFgAQudEsTEBq1OEmS6VMYvMGmEDVQ45eD4sJXFDTpkGY//7Zb6+1m/++rC/6AAAAAElFTkSuQmCC"
															alt="zuan"><span>{{infos.balance}}</span></div>
													<div><img
															src="data:image/png;base64,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"
															alt="qiupiao"><span>5,530.00</span></div>
													<div class="header-user-info-wallet-pay-button-wrap">
														<router-link class="header-user-info-wallet-pay-button" tag="a"
															target="_blank" to="member?type=1&isRecharge=true">
															充值
														</router-link>
													</div>
												</div>
											</div> -->
											<div class="header-user-info-line"></div>
											<div class="header-user-info-foot-btn-wrap" style="justify-content: flex-start;">
												<router-link tag="a" target="_blank" to="/member?type=0" style="margin-right: 30px;">
													<a class="personal-center">
														<div class="foot-icon"></div>
														<p class="foot-text">个人中心</p>
													</a>
												</router-link>
												<!-- <router-link tag="a" target="_blank" to="/member?type=2">
													<a class="my-focus">
														<div class="foot-icon"></div>
														<p class="foot-text">我的关注</p>
													</a>
												</router-link> -->
												<!-- <router-link tag="a" target="_blank" to="/persona">
													<a class="my-space">
														<div class="foot-icon"></div>
														<p class="foot-text">我的空间</p>
													</a>
												</router-link> -->
												<router-link v-if="info.token && infos.is_anchor == 0" tag="a"
													target="_blank" to="/member?type=7">
													<a class="apply-for-anchor">
														<div class="foot-icon"></div>
														<p class="foot-text">申请主播</p>
													</a>
												</router-link>
												<router-link v-if="info.token && infos.is_anchor == 1" tag="a"
													target="_blank" to="/member?type=9">
													<a class="apply-for-anchor">
														<div class="foot-icon"></div>
														<p class="foot-text">开播记录</p>
													</a>
												</router-link>

											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>


			</div>


		</div>
		<!--   v-for="(item,index) in $store.state.goalItem"  iszhu-->

	</div>
</template>

<script>
	import {
		getToken,
		removeToken
	} from '../../utils/auth.js';
	// 页眉（包含头像、面包屑、全屏、导航样式切换）
	import {
		mapGetters
	} from 'vuex';
	import {
		logout
	} from '../../api/user.js';
	import {
		initialList
	} from '@/api/search.js'
	export default {
		data() {
			return {
				i: 0,
				info: {
					token: ''
				},
				name: '',
				index: 0,
				hotList: [],
				search: false,
				historyList: [],
				logo: require('../../assets/images/userLogo.png'),
				list1: ['个人中心', '我的关注', , '我的空间', '申请主播']
			}
		},
		computed: {
			...mapGetters([
				'sidebar',
				'avatar',
				'infos'
			]),
			infos() {
				return this.$store.state.infos;
			},
		},
		watch: {
			index(e) {
				this.$emit('getIndex', e)
				this.i = e
				localStorage.setItem('index', e)
			},
			$route(e) {
				this.index = e.meta.index
			},
			'$route.query'(e) {
				// let router = e.router
				// let path = this.$route.path //获取当前路由
				// if (router == 'live') {
				// 	this.index = 2
				// }
			},
			'$store.state.user.data'(e) {
				if (e == null) return
				this.info = e
				// console.log('--------------');
				// console.log(e);
			},
		},
		created() {
			if (localStorage.getItem('userInfo')) {
				if (localStorage.getItem('userInfo') !== '{}' && this.$route.path.indexOf('dailyMission') === -1) {
					this.$store.dispatch('getUserInfo', '');
				}
			}
		},
		mounted() {
			// console.log(this.$store.state.game.voice);
			// console.log('-------------');
			let info = localStorage.getItem('userInfo')
			this.info = JSON.parse(info) || {
				token: ''
			}
			// this.index = localStorage.getItem('index') || 0
			let meta = this.$route.meta
			this.index = meta.index
			// console.log();
			// let path = this.$route.path
			// console.log(this.$route);
			// if(path == '/member'){
			// 	this.index = null
			// }
			this.historyList = JSON.parse(localStorage.getItem('historyList')) || []
			this.$store.state.user.data = JSON.parse(info)
		},
		methods: {
			// 热门推荐
			initialList() {
				initialList().then(res => {
					this.hotList = res.data.hot_match
				}).catch(res => {})
			},


			// 缓存历史搜索
			getHistory(type, value) {
				if (type == 1) { //新增
					let routeData = this.$router.resolve({
						path: "/search?name=" + value
					})
					window.open(routeData.href, '_blank')
				} else if (type == 2) { //删除
					this.historyList.splice(value, 1)
				} else if (type == 3) {
					this.historyList = []
				}
				localStorage.setItem('historyList', JSON.stringify(this.historyList))
			},

			// 鼠标移入事件
			mouseOver() {
				this.$store.dispatch('getUserInfo', '')
			},

			getRes() {
				this.index = null
				if (this.infos.is_anchor == 0) { //不是主播账号
					this.$router.push('/member?type=7')
				} else {
					this.$router.push('/member?type=9')
				}

			},
			goHome() {
				this.index = 0
				this.$router.push('/main')
			},
			focus() {
				this.search = true
				this.initialList()
			},
			blur() {
				// this.search = false
			},
			getLogin() {
				// this.index = null
				// this.i = null
				this.$store.state.user.showLoginMask = true
				// this.$emit('showLogin', true);
			},
			toggleSideBar() {
				// this.$store.dispatch('app/toggleSideBar')
			},
			logout() {
				this.$store.state.user.data = {}
				this.$store.state.infos = {}
				this.$store.state.user.token = null
				localStorage.clear();
				this.$store.state.user.islogin = false
				this.$router.push('/main')

				this.index = 0
				logout().then(res => {
					var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
					if(keys){
						for(var i = keys.length; i--;){
							document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString() + ";max-age=0";
						}
					}
					localStorage.clear()
					removeToken()
				}).catch(res => {})
				localStorage.removeItem("userInfo");
				let userid = 10000000 + Math.random().toString().slice(-6);
				localStorage.setItem("userid", userid);
			},
			// async logout() {
			// await this.$store.dispatch('user/logout')
			// this.$router.push(`/login?redirect=${this.$route.fullPath}`)
			// }
		}
	}
</script>

<style lang="scss" scoped>
	@import url("~@/styles/search.css");

	.for-space {
		height: 60px;
		width: 100%;
	}

	.left .host-team .team-name,
	.left .host-team .score,
	.right .guest-team .team-name,
	.right .guest-team .score {
		color: #f0c682 !important;
	}

	.ant-popover-inner {
		background-color: #fff;
		background-clip: padding-box;
		border-radius: 2px;
		// box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
		// box-shadow: 0 0 8px rgba(0,0,0,.15)\9;
	}

	.header-react {
		width: 100%;
		height: 60px;
		position: relative;
		z-index: 999;
		// background-color: #4b1a1d;
		box-shadow: 0 2px 8px 0 rgba(153, 153, 153, 0.1);
		-ms-user-select: none;
		user-select: none;
	}

	.header-active {
		background-color: white !important;

	}

	.header-active .a-text-box {
		// color: #67728f !important;
	}

	.header-active .active .a-text-box {
		color: #6d4117 !important;
	}

	.header-react-fixed {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
	}

	.header-react .header-container-user {
		width: 34px;
		height: 34px;
		border-radius: 50%;
		position: relative;
	}

	.user-mask {
		display: none;
	}

	.header-container-user:hover .user-mask {
		display: block;
	}

	// .header-react.is-transparent-bg {
	//   position: absolute;
	//   background-color: transparent;
	//   box-shadow: none;
	//   transition: all 0.15s;
	//   will-change: auto;
	// }
	.header-react.is-transparent-bg:hover {
		background-color: rgba(255, 255, 255, 0.2);
		box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
		// background-color: rgba(255, 255, 255, 0.08);
	}

	.header-react.is-transparent-bg .header-container-user-name {
		color: #fff;
	}

	.header-react.is-transparent-bg .header-container-navigation>a .a-text-box,
	.header-react.is-transparent-bg .header-container-navigation>div .a-text-box, 
	.header-react.is-transparent-bg .header-container-navigation .header-container-nav-item .a-text-box {
		color: #fff;
	}

	.header-active.is-transparent-bg .header-container-navigation>a .a-text-box,
	.header-active.is-transparent-bg .header-container-navigation>div .a-text-box,
	.header-active.is-transparent-bg .header-container-navigation .header-container-nav-item .a-text-box {
		color: #67728f;
	}

	.header-react.is-transparent-bg .header-container-navigation>a .a-text-box .sanjiao-down,
	.header-react.is-transparent-bg .header-container-navigation>div .a-text-box .sanjiao-down,
	.header-react.is-transparent-bg .header-container-navigation .header-container-nav-item .a-text-box .sanjiao-down {
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAACqADAAQAAAABAAAACAAAAABBuOuVAAAAb0lEQVQYGXWO0Q2AIAxEG/1lDh2AOZhFN9HBTBzCHfRHg6+GGgxyyaXl7kGQGGPAF67ppAiNiKx4xzUdFMqIcGOsPUc+PFACW4LlB9asfcEEe0L9j0l3/4HsQDEbxZwsLyalw1uyK4A8AOpxl2e636VFn7Q8pArFAAAAAElFTkSuQmCC);
	}

	.header-react.is-transparent-bg .header-container-navigation>a:hover .sanjiao-down,
	.header-react.is-transparent-bg .header-container-navigation>div:hover .sanjiao-down,
	.header-react.is-transparent-bg .header-container-navigation .header-container-nav-item:hover .sanjiao-down,
	.header-react.is-transparent-bg .header-container-navigation>a.active .sanjiao-down,
	.header-react.is-transparent-bg .header-container-navigation>div.active .sanjiao-down,
	.header-react.is-transparent-bg .header-container-navigation .header-container-nav-item.active .sanjiao-down {
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAACqADAAQAAAABAAAACAAAAABBuOuVAAAAb0lEQVQYGXWO0Q2AIAxEG/1lDh2AOZhFN9HBTBzCHfRHg6+GGgxyyaXl7kGQGGPAF67ppAiNiKx4xzUdFMqIcGOsPUc+PFACW4LlB9asfcEEe0L9j0l3/4HsQDEbxZwsLyalw1uyK4A8AOpxl2e636VFn7Q8pArFAAAAAElFTkSuQmCC);
	}

	.header-container-mask {
		display: none;
		top: 0;
	}

	.header-react.is-transparent-bg .header-container-navigation>div:hover .header-container-mask {
		display: block;
	}



	.header-container {
		height: 60px;
		width: 1200px;
		margin: 0 auto;
		display: flex;
		align-items: center;
	}

	.header-container-logo {
		width: 100px;
	}

	.header-container-logo img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.header-container-navigation {
		margin-left: 45px;
		height: 60px;
		font-size: 14px;
		font-weight: normal;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-grow: 1;
	}

	.daily-icon {
		height: 58px;
		margin: 4px 10px 0 auto;
		cursor: pointer;
	}

	.header-container-navigation>a,
	.header-container-navigation>div,
	.header-container-navigation .header-container-nav-item {
		display: block;
		width: auto;
		text-decoration: none;
		font-size: 14px;
		margin: 0 6px;
	}

	.header-container-navigation>a .a-text-box,
	.header-container-navigation>div .a-text-box,
	.header-container-navigation .header-container-nav-item .a-text-box {
		height: 26px;
		line-height: 26px;
		padding: 0 10px;
		border-radius: 4px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		color: #67728f;
		font-size: 14px;
		position: relative;
	}

	.header-container-navigation>a .a-text-box .new-flag,
	.header-container-navigation>div .a-text-box .new-flag,
	.header-container-navigation .header-container-nav-item .a-text-box .new-flag {
		width: 26px;
		height: 20px;
		position: absolute;
		top: -4px;
		right: -11px;
		background-image: url(/assets/image/icon-hot.5dc326f2e049276c51c134b8a1ca2db3.gif);
		background-repeat: no-repeat;
		background-size: contain;
	}

	.header-container-navigation>a .a-text-box .sanjiao-down,
	.header-container-navigation>div .a-text-box .sanjiao-down,
	.header-container-navigation .header-container-nav-item .a-text-box .sanjiao-down {
		width: 5px;
		height: 4px;
		margin-left: 5px;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAAXNSR0IArs4c6QAAAKBJREFUGBljzCqZ5Pvv/98N//8zMDFgBYx/mZmYApmYmRjOM/xn/IZVDVCQkYHhO0gN0+SuvCeMTP9rcSn8z8hYA1IDts7RTHoyIyPjWXTFIDFnc8kpIHGwwrCwsL+MDIzpQIv+IhQzgsVAcnCFIMb03vyzjIz/wbqhiieDxKBsVJ8y8bLVMDAyPgFhZj5WnO4Ga84sm6CeXTRFDWYSjAYA6tMs+CQlWHAAAAAASUVORK5CYII=);
		background-size: cover;
	}

	.header-container-navigation>a:hover .a-text-box,
	.header-container-navigation>div:hover .a-text-box,
	.header-container-navigation .header-container-nav-item:hover .a-text-box,
	.header-container-navigation>a:focus .a-text-box,
	.header-container-navigation>div:focus .a-text-box,
	.header-container-navigation .header-container-nav-item:focus .a-text-box,
	.header-container-navigation>a.active .a-text-box,
	.header-container-navigation>div.active .a-text-box,
	.header-container-navigation .header-container-nav-item.active .a-text-box {
		color: #6d4117 !important;
		font-size: 14px;
		background-image: linear-gradient(115deg, #eecfb5 -2%, #d8ad66 100%);
	}

	.header-container-navigation>a:hover .sanjiao-down,
	.header-container-navigation>div:hover .sanjiao-down,
	.header-container-navigation .header-container-nav-item:hover .sanjiao-down,
	.header-container-navigation>a:focus .sanjiao-down,
	.header-container-navigation>div:focus .sanjiao-down,
	.header-container-navigation .header-container-nav-item:focus .sanjiao-down,
	.header-container-navigation>a.active .sanjiao-down,
	.header-container-navigation>div.active .sanjiao-down,
	.header-container-navigation .header-container-nav-item.active .sanjiao-down {
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAAXNSR0IArs4c6QAAALRJREFUGBljzHUS92VkYNjw/z8DEwM2wMjwFygcyMTAznIeqOgbNjVgsf8M30FqmE/d+fzJXInvOwPDfw9sihmZmMom73q2G2ydrbDNZEYGxrPoCkFiNkI2U0DiQOdBQJ6jpPF/xn8nGf4zMINFgG5j/M9kPmn/c7ABEEGgzMkHX55bKPIIAZkWIIVMjAyTJu1/MR/EBgEUnwoJi9QArXsCwoLCIrUQJTjIfEcp9SJnaTV0aQAA6C/x6xp03gAAAABJRU5ErkJggg==) !important;
	}

	.header-container-navigation>a:hover .sanjiao-down,
	.header-container-navigation>div:hover .sanjiao-down,
	.header-container-navigation .header-container-nav-item:hover .sanjiao-down {
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAAXNSR0IArs4c6QAAALRJREFUGBljzHUS92VkYNjw/z8DEwM2wMjwFygcyMTAznIeqOgbNjVgsf8M30FqmE/d+fzJXInvOwPDfw9sihmZmMom73q2G2ydrbDNZEYGxrPoCkFiNkI2U0DiQOdBQJ6jpPF/xn8nGf4zMINFgG5j/M9kPmn/c7ABEEGgzMkHX55bKPIIAZkWIIVMjAyTJu1/MR/EBgEUnwoJi9QArXsCwoLCIrUQJTjIfEcp9SJnaTV0aQAA6C/x6xp03gAAAABJRU5ErkJggg==);
		transform: rotate(180deg);
		-ms-transform: rotate(180deg);
		/* IE 9 */
		-webkit-transform: rotate(180deg);
		/* Safari and Chrome */
		-o-transform: rotate(180deg);
		/* Opera */
		-moz-transform: rotate(180deg);
	}

	.header-container-user-name {
		display: inline-block;
		vertical-align: middle;
		margin-left: 15px;
		width: 56px;
		font-size: 12px;
		color: #67728f;
		line-height: 22px;
		height: 22px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.header-container-user-head {
		display: inline-block;
		width: 35px;
		height: 35px;
		cursor: pointer;
		border-radius: 50%;
		overflow: hidden;
		border: solid 1px #d8ad66;
		object-fit: cover;
	}

	.header-container-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 16px;
		text-align: center;
	}

	.header-container-box a {
		display: block;
		width: 86px;
	}

	.header-container-box a:hover {
		background-color: #f0c682;
		color: #fff;
	}

	.header-container-box a:active {
		background-color: #d8ad66;
		color: #fff;
	}

	.header-container-box .login-img {
		width: 34px;
		height: 34px;
	}

	.header-container-register {
		display: block;
		box-sizing: border-box;
		width: 100%;
		height: 34px;
		line-height: 34px;
		border-radius: 4px;
		color: #ffffff;
		background-image: linear-gradient(114deg, #eecfb5 -2%, #d8ad66);
	}

	.header-container-login {
		display: block;
		box-sizing: border-box;
		width: 100%;
		border-radius: 4px;
		color: #d8ad66;
		font-size: 16px;
		cursor: pointer;
	}

	.header-container-login:hover {
		color: #f0c682;
	}

	.header-live-btn {
		width: 80px;
		height: 32px;
		color: #6d4117;
		border-radius: 18px;
		margin-right: 14px;
		font-weight: 500;
		background-image: linear-gradient(114deg, #eecfb5 -2%, #d8ad66);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	.header-live-btn img {
		width: 18px;
		margin-right: 5px;
	}

	.ant-popover-inner {
		border-radius: 5px;
	}

	.ant-popover-content {

		//  border-radius: 5px;
		//  overflow: hidden;
	}

	.anchor-nav-popover-wrap {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		width: 222px;
		overflow: hidden;
	}

	.anchor-nav-popover-wrap .anchor-nav-popover-button {
		width: 66px;
		height: 26px;
		font-size: 14px;
		color: #67728f;
		border: 1px solid #d2d7eb;
		border-radius: 5px;
		cursor: pointer;
		line-height: 26px;
		margin-bottom: 5px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: center;
		margin-right: 8px;
	}

	.anchor-nav-popover-wrap .anchor-nav-popover-button:hover {
		background-color: #f0c682;
		border: none;
		color: #ffffff;
	}

	.anchor-nav-popover-wrap .anchor-nav-popover-button:nth-child(3n) {
		margin-right: 0;
	}

	.score-nav-popover-line {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.score-nav-popover-line .score-nav-popover-button {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 64px;
		height: 26px;
		font-size: 14px;
		color: #67728f;
		border: 1px solid #d2d7eb;
		border-radius: 5px;
		cursor: pointer;
		margin: 0 4px;
	}

	.score-nav-popover-line .score-nav-popover-button:hover {
		background-color: #f0c682;
		border: none;
		color: #ffffff;
	}

	.score-nav-popover-line .score-nav-popover-button.disable {
		background-color: #ededed;
		color: #c9c9c9;
		border: 1px solid #ededed;
	}

	// .score-nav-popover-line .score-nav-popover-button:nth-child(2) {
	// 	margin: 0 8px;
	// }

	.score-nav-popover-line:first-child {
		margin-bottom: 0px;
	}

	.database-nav-popover-wrap {
		width: 216px;
		height: 67px;
		margin-top: 2px;
		margin-bottom: 2px;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		overflow: hidden;
	}

	.database-nav-popover-wrap .database-nav-popover-button {
		height: 26px;
		font-size: 14px;
		color: #67728f;
		border: 1px solid #d2d7eb;
		border-radius: 5px;
		cursor: pointer;
		line-height: 26px;
		margin-bottom: 15px;
		margin-right: 6px;
		margin-left: 6px;
		padding: 0 12px;
		-ms-user-select: none;
		user-select: none;
	}

	.database-nav-popover-wrap .database-nav-popover-button:hover {
		background-color: #f0c682;
		border-color: #f0c682;
		color: #fff;
	}

	.database-nav-popover-wrap .database-nav-popover-button.disabled {
		background-color: #ededed;
		color: #c9c9c9;
		border: 1px solid #ededed;
	}

	.appdown-popver {
		width: auto !important;
	}

	.appdown-popver .appdown-popver-ul {
		margin: 0;
		overflow: hidden;
		padding: 30px 0 15px 30px;
		display: flex;
		justify-content: flex-start;
	}

	.appdown-popver .appdown-popver-ul .appdown-popver-li {
		float: left;
		list-style: none;
		margin-right: 40px;
	}

	.appdown-popver .appdown-popver-ul .appdown-popver-li img {
		display: block;
	}

	.appdown-popver .appdown-popver-ul .appdown-popver-li .appdown-popver-phone {
		width: 224px;
		height: auto !important;
		margin-right: 15px;
	}

	.appdown-popver .appdown-popver-ul .appdown-popver-li .appdown-popver-logo {
		width: 93px;
		height: auto !important;
		margin: 20px auto 10px;
	}

	.appdown-popver .appdown-popver-ul .appdown-popver-li .appdown-popver-qrcode-bg {
		width: 88px;
		height: 88px;
		background-image: url(/assets/image/appdown-qrcode-bg.7fc4ac97258b4c2709c697cb75823277.png);
		background-size: 100% 100%;
		margin-bottom: 5px;
		padding: 5px;
	}

	.appdown-popver .appdown-popver-ul .appdown-popver-li .appdown-popver-qrcode {
		width: 78px;
		height: 78px;
	}

	.appdown-popver .appdown-popver-ul .appdown-popver-li .appdown-popver-p {
		font-weight: bold;
		text-align: center;
		font-size: 12px;
		margin: 0;
	}

	.appdown-popver .appdown-popver-ul .appdown-popver-li .appdown-popver-url {
		font-size: 10px;
		text-align: center;
	}

	.nav-bar-search {
		width: 160px;
		height: 32px;
		line-height: 32px;
		margin-right: 14px;
		border-radius: 18px;
		position: relative;
		transition: width 300ms ease;
	}

	.nav-bar-search input[type='text'] {
		caret-color: #d8ad66;
		width: 100%;
		height: 100%;
		color: #666;
		font-size: 12px;
		padding-left: 18px;
		padding-right: 15px;
		background-color: #ececec;
		border-radius: 16px;
		outline: none;
	}



	.score-nav-popover-line {
		display: flex;
		justify-content: space-between;
		align-items: center
	}

	.score-nav-popover-line .score-nav-popover-button {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 64px;
		height: 26px;
		font-size: 14px;
		color: #67728f;
		border: 1px solid #d2d7eb;
		border-radius: 5px;
		cursor: pointer
	}

	.score-nav-popover-line .score-nav-popover-button:hover {
		background-color: #f0c682;
		border: none;
		color: #fff
	}

	.score-nav-popover-line .score-nav-popover-button.disable {
		background-color: #ededed;
		color: #c9c9c9;
		border: 1px solid #ededed
	}

	.score-nav-popover-line .score-nav-popover-button:nth-child(2) {
		margin: 0 8px
	}


	.database-nav-popover-wrap {
		width: 216px;
		height: 67px;
		margin-top: 2px;
		margin-bottom: 2px;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		overflow: hidden
	}

	.database-nav-popover-wrap .database-nav-popover-button {
		height: 26px;
		font-size: 14px;
		color: #67728f;
		border: 1px solid #d2d7eb;
		border-radius: 5px;
		cursor: pointer;
		line-height: 26px;
		margin-bottom: 15px;
		margin-right: 6px;
		margin-left: 6px;
		padding: 0 12px;
		user-select: none
	}

	.database-nav-popover-wrap .database-nav-popover-button:hover {
		background-color: #f0c682;
		border-color: #f0c682;
		color: #fff
	}

	.database-nav-popover-wrap .database-nav-popover-button.disabled {
		background-color: #ededed;
		color: #c9c9c9;
		border: 1px solid #ededed
	}

	.appdown-popver {
		width: auto !important
	}

	.appdown-popver .appdown-popver-ul {
		margin: 0;
		overflow: hidden;
		padding: 30px 0 15px 30px;
		display: flex;
		justify-content: flex-start
	}

	.appdown-popver .appdown-popver-ul .appdown-popver-li {
		float: left;
		list-style: none;
		margin-right: 40px
	}

	.appdown-popver .appdown-popver-ul .appdown-popver-li img {
		display: block
	}

	.appdown-popver .appdown-popver-ul .appdown-popver-li .appdown-popver-phone {
		width: 224px;
		height: auto !important;
		margin-right: 15px
	}

	.appdown-popver .appdown-popver-ul .appdown-popver-li .appdown-popver-logo {
		width: 93px;
		height: auto !important;
		margin: 20px auto 10px
	}

	.appdown-popver .appdown-popver-ul .appdown-popver-li .appdown-popver-qrcode-bg {
		width: 88px;
		height: 88px;
		background-image: url(data:image/png;base64,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);
		background-size: 100% 100%;
		margin-bottom: 5px;
		padding: 5px
	}

	.header-user-info-wrap {
		width: 379px;
		padding: 30px 14px 8px;
		position: relative;
		overflow: hidden
	}

	.header-user-logout {
		color: #999;
		font-size: 14px;
		position: absolute;
		right: -15px;
		top: -25px;
		user-select: none;
		cursor: pointer
	}

	.header-user-info-wrap .header-user-logout:hover {
		color: #d8ad66
	}

	.header-user-info-wrap .header-user-info-foot-btn-wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 15px
	}

	.header-user-info-wrap .header-user-info-foot-btn-wrap .foot-icon {
		width: 21px;
		height: 21px;
		margin: 0 auto;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAA5FBMVEUAAADFx9jFxdf////LzN3IydrS0uTU2+jNz9/U1OXd3e7R0ejX1/TNzd7Q0uPJytvOz+DKzNzS0uTU1urk5P/Nz9/Q0eLOz9/V1ujR0uPR0uPPz+HOz+HT1OXX1+jNzd3V1unOz+HJytzHyNjV1ufV1efP0eLHx9jGx9jW1+jP0OHQ0ePV1ubR0eHQ0ePW1+jY2OrKytvQ1OPHx9fIy9vV1unV1ujQ0eHO0ODT1eXS0uPR0eLV3OrJytvGx9fS0+XLzN3HyNjIydrU1ObQ0eLR0uPMzd3P0OLIydnNzt/Oz+DV1ujixQT8AAAAPXRSTlMAkpIC3ns3EmwkDwsI+7eIe0AcFwb08OC8pJyAdmA9Mfv29vHk1tLS0cfBsaeahXRtakhAMO7t6K2LiU4kDZh9xQAAAfVJREFUSMfNk9l6qjAURqNMStVaW+ep8zz3zOcgKAIS3v99zk7SpAXclItedLk/NgnrB79AyOfQqM9m9UZZ23ocHCbA4eDRLnPzh+9+IvnxcPCRv3+V+InPSSDoX+0X+/9O32QRPK0X+faZn+PMJji3vpuSYei6t7hvugA4XFT4JhoYuFtpYb4VbA8EFhKYughTJPA7CFx4CBwUYvwHCQwDhCESaAXBOlingAngBgmMsrK8wQgJjKNoHa2hVGdAu0cCf4WgQqo/Y192j/m96fVr8K4d0YjSqId+4yMKnGta7Sfo5zPS4X+K3hGMzhEFWhacmTYh8z5lHHUIyiSmcUy792aD2M9DKmgTnIMbEHioKTocfmmkKNGKM1zvFO7oiS60MA6hWNcn+K7eGXdDBQuIYHeMPMTse17ohSlgAqpvbvNrTY8LnJCfq96s5f22V0g7d3/H8Zy8B5MMaJln7DV5gAlZYDJk83up9dHfCZmfRH+/VrtOCXaJwjouEzi2VMBYOSsnBUxAqS4wVEDnFwQ5UV1zdOnXVyk2qw0HTqBUB+pE8LTkbJYbKNallB0/yTUSF95C+S6Q62QsURbLBZQcGfI1L1KAAJUbQ8mXrV0sSnGhNuv8pIx/8o0o5pcf+5fMV2gvRrVaYVWpyC4Q46rxopGvyn+UhiPlm86acQAAAABJRU5ErkJggg==) no-repeat 50%/100%
	}

	.header-user-info-wrap .header-user-info-foot-btn-wrap .foot-text {
		padding-top: 8px;
		color: #666
	}

	.header-user-info-wrap .header-user-info-foot-btn-wrap>a {
		font-size: 12px;
		text-align: center;
		cursor: pointer
	}

	.header-user-info-wrap .header-user-info-foot-btn-wrap>a:hover .foot-text {
		color: #ba9250
	}

	.header-user-info-wrap .header-user-info-foot-btn-wrap .personal-center .foot-icon {
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAA5FBMVEUAAADFx9jFxdf////LzN3IydrS0uTU2+jNz9/U1OXd3e7R0ejX1/TNzd7Q0uPJytvOz+DKzNzS0uTU1urk5P/Nz9/Q0eLOz9/V1ujR0uPR0uPPz+HOz+HT1OXX1+jNzd3V1unOz+HJytzHyNjV1ufV1efP0eLHx9jGx9jW1+jP0OHQ0ePV1ubR0eHQ0ePW1+jY2OrKytvQ1OPHx9fIy9vV1unV1ujQ0eHO0ODT1eXS0uPR0eLV3OrJytvGx9fS0+XLzN3HyNjIydrU1ObQ0eLR0uPMzd3P0OLIydnNzt/Oz+DV1ujixQT8AAAAPXRSTlMAkpIC3ns3EmwkDwsI+7eIe0AcFwb08OC8pJyAdmA9Mfv29vHk1tLS0cfBsaeahXRtakhAMO7t6K2LiU4kDZh9xQAAAfVJREFUSMfNk9l6qjAURqNMStVaW+ep8zz3zOcgKAIS3v99zk7SpAXclItedLk/NgnrB79AyOfQqM9m9UZZ23ocHCbA4eDRLnPzh+9+IvnxcPCRv3+V+InPSSDoX+0X+/9O32QRPK0X+faZn+PMJji3vpuSYei6t7hvugA4XFT4JhoYuFtpYb4VbA8EFhKYughTJPA7CFx4CBwUYvwHCQwDhCESaAXBOlingAngBgmMsrK8wQgJjKNoHa2hVGdAu0cCf4WgQqo/Y192j/m96fVr8K4d0YjSqId+4yMKnGta7Sfo5zPS4X+K3hGMzhEFWhacmTYh8z5lHHUIyiSmcUy792aD2M9DKmgTnIMbEHioKTocfmmkKNGKM1zvFO7oiS60MA6hWNcn+K7eGXdDBQuIYHeMPMTse17ohSlgAqpvbvNrTY8LnJCfq96s5f22V0g7d3/H8Zy8B5MMaJln7DV5gAlZYDJk83up9dHfCZmfRH+/VrtOCXaJwjouEzi2VMBYOSsnBUxAqS4wVEDnFwQ5UV1zdOnXVyk2qw0HTqBUB+pE8LTkbJYbKNallB0/yTUSF95C+S6Q62QsURbLBZQcGfI1L1KAAJUbQ8mXrV0sSnGhNuv8pIx/8o0o5pcf+5fMV2gvRrVaYVWpyC4Q46rxopGvyn+UhiPlm86acQAAAABJRU5ErkJggg==) no-repeat 50%/100%
	}

	.header-user-info-wrap .header-user-info-foot-btn-wrap .personal-center:hover .foot-icon {
		background: url(data:image/png;base64,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) no-repeat 50%/100%
	}

	.header-user-info-wrap .header-user-info-foot-btn-wrap .my-focus .foot-icon {
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAABC1BMVEUAAAD////V1ujc3PrV1ufW1+nQ0eL09P/////W1ufU1efU1ObU1ufe5O/S0+bHydnIydnR0uPS0+TV1ujW1+jQ0eLNzt/Oz+DMzd3V1efMzt/U1OfMzdzX1+fY2Ovb2+nIydnHyNjV1ujV1ujX1+nV1+jV1ufR0uTJytrJydrV1+jLzd3X2OrU1ObKy9zW1ujKy9zJydzIytzKytvU1ObLy9rIytrN0N/W1ufZ2fDIydnU1ebGxtjFxtjS0+XW1ujR0+PLzd7X1+nT1ebT0+TNzeDLzd3V1+jOzt/Pz+DNzt/S0+XQ0ePU1ebP0OHR0uTMzd7Ly9zLzN3Ky9vIydrHyNnV1ujGx9jP0OKP0MokAAAASnRSTlMAA/IHXUAfBAL46E01C/v38vDj4uDUuLGRh3VTOy4aFvvs3dLHxbOoqKWdnI6CgnJrYFZMR0MyKyQQ+vXp2MzIuKygl5WLiXpZSuE3PZEAAAHmSURBVEjH7c/XeuJADAXgY6ppS+8lvfeebO8FV7Ad8v5PspphiD0Ggvd2v/yfMpbE0UXw6p/Ec4efqrHa9nEyjSklebxdy2S3vnYLC+JnsceZzYQCQE3UjEeDijaxX+GT/qYhsICxM8BgZ3pNC6aaR1AuZsiyiaohy3Thy2f47t1uuy1dyhdJzKxlDU0zYmcFALsa6zXDCHyF8gDCNzZupaBcn+y90ZY7xNQ9C1XW0P+ordAHd8L6JK7pjliaRaXJvdAGV7cs6zP9I3JQoNafK2AeWJvAdyuCB5A7Xbf0FCoW+1pUuiDm4D4PktRJuqBHkQPJsy7RYa+pm9yT+URl0iiC4je9B5Lig4TSHDUS/R5EKfNhaA6p5r7Sb+U4mD2+IPTOHwm8a4Lripx4wsSa/f0Gp9aH0dQVTP2JkraHdg4zP2ybZr6keg6Q4NzCM6Vhr9ZIwxdv2mN7zFEzQ60/N+IISu/ztDigJ6wZh0w9ou1oPOKoIcH5SxphassP0yM7ULDAz5Ezcqh4ROqPVCx06sj4AT0tLNNxZK7jklMsd+7OcTp4ycW6G3KOl12+db0A9wKrXBVF1HNdb/0Sq90UvYk3ofK84hWi6JXEQekG0dxuTJhSD1Hdvaf8xi2iSx182E/hv/UXmxRNhKpnpYEAAAAASUVORK5CYII=) no-repeat 50%/100%
	}

	.header-user-info-wrap .header-user-info-foot-btn-wrap .my-focus:hover .foot-icon {
		background: url(data:image/png;base64,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) no-repeat 50%/100%
	}

	.header-user-info-wrap .header-user-info-foot-btn-wrap .my-space .foot-icon {
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAABVlBMVEUAAADKytzP0OHOz+DIydnKy9vP0OLLzN3Nzt7T0+bV2ujPz+H////////Oz+DOzt/U1ebT1OXa2urf3//R0uPLzN7Q0eLR0+TS0uTT1OXX1+jZ3+/Y2OjQ0ePP0OHS0+TP0OHT0+XU1ObS0+TJy9zT0+TO0ODPz9/Ly9zKzdzKy9rU1efGx9jV1ebGx9fS0+TV1ufP0eLIyNjT0+TP0eHIyNjHx9jU1ObHyNjKytvT1ObJydrGx9jU1ObS0uPIydnQ0OLHyNnW1urKytvV1ujHyNfS0+PMzd/R0uPPz+DNzuDP0OLP0OLV1ufS0+TQ0OLT1ebHyNnV1ujT1ObIydnJytvIydnW1unIytvW1+nFx9nT0+bQ0ePX1+fR0eLJydrPz+DMzd7JytvLzN3Ky9zR0uTOz+DNzt/S0+TQ0eLP0OHHyNjIydrT1OXT1ObGx9fV1ufIydmiseIUAAAAYXRSTlMAQG227Oy3tm0mGxcDAshBMy4JBu/smXVmRBIPDfz4u6qbi39uUT84KyH49vLv6unj49/c19TFq6OghoFraV5eVlMi/fr59/bz8uzl29XRzczJyL69sq+jlZSSd25gWUxLh2tD8wAAAmNJREFUSMftkld32kAQRsfGcUKvoYONsQH3FrfYcUnvvXcQTXT9/5d8Wmm9KoB5yKPvmbMzzMwFAUv/h/C9hSBNjufX1mAw+HKfJmTp1YDx8JubJiDxHru9QQ8xWL2boisIzPWAuoxAsR4L0RicB1jidHtdRG8r7qERuHJdoC4hDHn33EtDSC6sNpvdJnOQWM3z2wRZSefXMTEgBFZ/KFq+62azWWvWEEbF1MuZniuqD3AAXpt7KdPP87o2ErkmIx7HSOAKkvd0F5Nhy4xMzkXpy6sSjMhzAdy3TXkosA6clMo/lad1YVqWW/K8k0I/IkMNvFsopo5mudBqwchEXfgvsqrcMuJLkCf+gvWEoJHFVXNFM6b1O0vk/f0ShUmo11t11ongqjnn5Tpgve1TD/19w2qzINjGVQvMasLzn2Eq+PgEkhCM4CHIj7Vn+TQFHfVGo95gfSQHFxqADRAofH6iRDyJh8MrPjMLVhxBInc0Wy43yloDBUIIvAm0pScu8iEjjBIXbpXt+Om2vTlCkMqSVC5A4LVkEyQdMZTwCaLHRHBTCDYKEKwIoVqVqhJC5OoU3cBp6QuBYxZscGFRtCrVCkMVUCMMMyHwRQH/BHOfC+cVOxA6lQ5Ce6nVR7rgOV7hQz0zgS/y/oOjJHHcX1fEQOkoijJFMyhYjUPlU4mMLB8qbaXNQMEFRruD3n6RrJQ+Q7gEAk7+Bnt/aBjFj+1+u48QAmPnzEsj8L/DnEkQdHlmMUxjuNjrMyCwvHacpvF4z3Y0YQPno+9uuprwyUZ/zU37/f7hMk1G6AKb7pMSXaPzD3IWxvJldS0cAAAAAElFTkSuQmCC) no-repeat 50%/100%
	}

	.header-user-info-wrap .header-user-info-foot-btn-wrap .my-space:hover .foot-icon {
		background: url(data:image/png;base64,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) no-repeat 50%/100%
	}

	.header-user-info-wrap .header-user-info-foot-btn-wrap .apply-for-anchor .foot-icon {
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAA3lBMVEUAAADX1+rS0+TGx9fOzt/FxtbV1ePIydrLy9za2uvKy9rNzt/U1ubZ2fPKy9vJytvT1OXKy93T0+XKytzJydrO0OHLzt7Ky9zW1+jHyNjMzd7V1ufS0+PKy9vJytrGx9jOzt/R0eTHydnW1ufV1ejQ0ePIydrR1OTV1+nO0OHJy9rLz93X1/LQ0ePV1ujT1ObS0+XLzN3KytzU1OXS1ObIytrIyNjW1ufMzNbOz+DQ0eLR0uPS0+TKy9zHyNjNzt/Mzd7LzN3JytvU1ebT1OXFxtfIydrV1ujNzd7Oz+Kw9OmRAAAAOXRSTlMAbUm2SbYS/UgO5sIqBe/oxsGurnAwKv767trX083GnpaQhXFnXlVQPz46JQn18/Phz7ynoJ+Yghl+WIsMAAABrUlEQVRIx+2OZ1PCYBCEz0booAL23nsvL6kkIeL//0PuHZwYg+BHZ+RhZ3bv3lsmNOUPUT6aGc3haYGyNDfeRhO9RdH1QSXz96v8oOAKYtfSC32jHv1EHMXQaplSFGIBr1A2gwNKcRbHTuxAMdCc2j0Qc1K/2TjkMOtMYom/4xEhdspcsG3HdiBxoFmdC6e3/XlWCpNYutxDU5BC+xO7LVuYZPXNTVvftfBrpGBM27Tru1fGvJt3yCi8hzgpgwJOc7SnR8OfkimAk0LJTEAL88b4xi+WfB9mMmAJqUvBZ1q07v9Iz+9BnOb7hcAPclQKGEQ9kD3U917AOynInRSUTtCBhj7cS0EecrTYSaGHCDprgcdhwe24AgKkrjspSEaBLXWsbN3pLIW864ZumKN7XkiGUr5c2bdCgCgFyRfUqFWr1ZVwBMtE5+v9mOdCwhyT0AzDhJUoiFygy13er1wgnsm+lq8QaFle4kGJMMhPxOS3a1tHHAqWJ1hrxWLR0sOvNCjNtjceq0Vpml2v60Fd9QE6P9N3jte6Y9ipUIbXxs6csjC3AImz9s9pyv/kA4LmAxrumBP8AAAAAElFTkSuQmCC) no-repeat 50%/100%
	}

	.header-user-info-wrap .header-user-info-foot-btn-wrap .apply-for-anchor:hover .foot-icon {
		background: url(data:image/png;base64,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) no-repeat 50%/100%
	}

	.header-user-info-wrap .header-user-info-wallet-wrap {
		padding: 8px 0 15px
	}

	.header-user-info-wrap .header-user-info-wallet-wrap .header-user-info-wallet-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 10px
	}

	.header-user-info-wrap .header-user-info-wallet-wrap .header-user-info-wallet-info .header-user-info-wallet-title {
		font-size: 14px;
		color: #666
	}

	.header-user-info-wrap .header-user-info-wallet-wrap .header-user-info-wallet-info>div {
		display: flex;
		flex-direction: column;
		align-items: center
	}

	.header-user-info-wrap .header-user-info-wallet-wrap .header-user-info-wallet-info>div>img {
		display: block;
		width: 24px;
		height: 24px
	}

	.header-user-info-wrap .header-user-info-wallet-wrap .header-user-info-wallet-info>div>span {
		display: inline-block;
		padding-left: 5px;
		font-size: 12px;
		color: #4b4b4b
	}

	.header-user-info-wrap .header-user-info-wallet-wrap .header-user-info-wallet-pay-button-wrap {
		justify-content: flex-end
	}

	.header-user-info-wrap .header-user-info-wallet-wrap .header-user-info-wallet-pay-button-wrap .header-user-info-wallet-pay-button {
		width: 48px;
		height: 21px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 17.5px;
		border: 1px solid #d8ad66;
		font-size: 12px;
		color: #d8ad66;
		cursor: pointer;
		user-select: none
	}

	.header-user-info-wrap .header-user-info-wallet-wrap .header-user-info-wallet-pay-button-wrap .header-user-info-wallet-pay-button:hover {
		border: none;
		color: #fff;
		background-image: linear-gradient(106deg, #eecfb5, #d8ad66)
	}

	.header-user-info-wrap .header-user-info-line {
		width: 100%;
		height: 1px;
		background: #eee
	}

	.header-user-info-wrap .header-user-basic-wrap {
		position: relative;
		display: grid;
		grid-column-gap: 5px;
		grid-template-columns: 60px 1fr
	}

	.header-user-info-wrap .header-user-basic-wrap .header-user-basic-head-img {
		width: 100%;
		height: 60px;
		border-radius: 50%;
		overflow: hidden;
		border: 1px solid #eee
	}

	.header-user-info-wrap .header-user-basic-wrap .header-user-basic-head-img img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover
	}

	.header-user-info-wrap .header-user-basic-wrap .header-user-basic-nick-name-warp {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-top: -5px
	}

	.header-user-info-wrap .header-user-basic-wrap .header-user-basic-nick-name-warp .header-name-wrap {
		display: flex;
		align-items: center
	}

	.header-user-info-wrap .header-user-basic-wrap .header-user-basic-nick-name-warp .header-name-wrap .header-user-basic-nick-name {
		max-width: 160px;
		font-size: 16px;
		color: #333;
		font-weight: 700;
		line-height: 22px;
		overflow: hidden;
		margin-right: 5px
	}

	.header-user-info-wrap .header-user-basic-wrap .header-user-basic-nick-name-warp .header-name-wrap .header-wealth-level-img {
		height: 30px;
		cursor: pointer
	}

	.header-user-info-wrap .header-user-basic-wrap .header-user-basic-nick-name-warp .header-user-basic-rank {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 15px 0;
		cursor: pointer
	}

	.header-user-info-wrap .header-user-basic-wrap .header-user-basic-nick-name-warp .header-user-basic-rank .name {
		color: #d8ad66;
		font-size: 14px;
		font-weight: 700;
		width: 36px
	}

	.header-user-info-wrap .header-user-basic-wrap .header-user-basic-nick-name-warp .header-user-basic-rank .process-wrap {
		width: 252px;
		height: 12px;
		border-radius: 6px;
		position: relative;
		background-color: #fff5e9
	}

	.header-user-info-wrap .header-user-basic-wrap .header-user-basic-nick-name-warp .header-user-basic-rank .process-wrap .process-container {
		width: 100%;
		height: 12px;
		position: absolute;
		top: 0;
		left: 0
	}

	.header-user-info-wrap .header-user-basic-wrap .header-user-basic-nick-name-warp .header-user-basic-rank .process-wrap .process-container .current-process-box {
		display: flex
	}

	.header-user-info-wrap .header-user-basic-wrap .header-user-basic-nick-name-warp .header-user-basic-rank .process-wrap .process-container .current-process-box .current-process {
		width: 0;
		height: 12px;
		position: relative;
		border-radius: 6px 0 0 6px;
		transition: width 1.5s ease-in-out;
		background-image: linear-gradient(270deg, #e3ac72, #ffd1a1 50%)
	}

	.header-user-info-wrap .header-user-basic-wrap .header-user-basic-nick-name-warp .header-user-basic-rank .process-wrap .process-container .current-process-box .current-process:before {
		content: "";
		width: 100%;
		height: 12px;
		position: absolute;
		left: 0;
		top: 0;
		opacity: .3;
		background-image: url(/_next/static/images/img-wenli@2x-9d002ac44f2aa87a1549031afa041f82.png);
		background-size: cover
	}

	.header-user-info-wrap .header-user-basic-wrap .header-user-basic-nick-name-warp .header-user-basic-rank .process-wrap .process-container .current-process-box .current-process-stop {
		height: 12px;
		position: relative;
		display: flex;
		align-items: center
	}

	.header-user-info-wrap .header-user-basic-wrap .header-user-basic-nick-name-warp .header-user-basic-rank .process-wrap .process-container .current-process-box .current-process-stop .current-process-num {
		font-size: 11px;
		text-align: center;
		color: #e3ac72;
		font-weight: 400;
		position: absolute;
		top: -24px;
		left: 10px
	}

	.header-user-info-wrap .header-user-logout {
		color: #999;
		position: absolute;
		right: -15px;
		top: -25px;
		user-select: none;
		cursor: pointer;
	}

	.header-user-info-wrap .header-user-basic-wrap .header-user-basic-nick-name-warp .header-user-basic-rank .process-wrap .process-container .current-process-box .current-process-stop .current-process-arrow {
		height: 24px
	}

	.header-user-info-wrap .header-user-basic-wrap .header-user-basic-nick-name-warp .header-user-basic-rank .process-wrap .process-container .current-process-box .current-process-stop .current-process-gif {
		height: 20px;
		position: absolute;
		left: 0;
		top: -4px
	}

	.header-user-info-wrap .header-user-basic-wrap .header-user-basic-nick-name-warp .header-user-basic-rank .process-wrap span {
		font-size: 12px;
		font-weight: 700;
		text-align: right;
		color: #555287;
		position: absolute;
		right: 4px;
		top: -3px
	}
</style>
