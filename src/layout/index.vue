<template>
	<div :class="classObj" class="app-wrapper">
		<div class="main-container">
			<div class="fixed-header" v-show="topShow">
				<navbar  @getIndex="getIndex" />
			</div>
			<Menu v-if="tabIndex == 2 || tabIndex == 3"/>
			<app-main />
			<Sidebar v-if="tabIndex != 2 && tabIndex != 3 && tabIndex != 1"/>
		</div>
		<login-mask v-if="showLoginMask"></login-mask>
		
		<div id="TeamMessageContainer" style="z-index: 99;">
			<!--  v-for="(item,index) in goalItem" :key="index" -->
			<div  v-for="(item,index) in goalItem" :key="index" >
				<!-- team-message-item guest-message fade-in-left fade-out -->
				<div class="team-message-item host-message fade-in-left" style="background: url(../../assets/images/img-jinqiushijian.png);">
					<!-- <div class="message-content" >
						<div class="team-info host-team">
							<div class="time">45'</div>
							<div class="icon"><i class="football-icon rotate"></i></div>
							<div class="team-name ellipsis">MG克鲁塞罗</div>
							<div class="score">1</div>
						</div>
						<span class="vs">-</span>
						<div class="team-info guest-team">
							<div class="score">0</div>
							<div class="team-name ellipsis">SC布吕斯克</div>
							<div class="icon"><i class="football-icon rotate"></i></div>
							<div class="time">45'</div>
						</div>
					</div> -->
					
					<div class="message-content" :class="item.iszhu == 1?'left':'right'">
						<div class="team-info host-team">
							<div class="time" v-if="item.iszhu == 1" >{{item.match_str}}'</div>
							
							<div class="icon" v-if="item.iszhu == 1">
								<i class="football-icon rotate"></i>
							</div>
							<div class="team-name ellipsis">{{item.home_team_name_zh}}</div>
							
							<div class="score">{{item.home_score}}</div>
						</div><span class="vs">-</span>
						<div class="team-info guest-team">
							<div class="score">{{item.away_score}}</div>
							<div class="team-name ellipsis">{{item.away_team_name_zh}}</div>
							
							<div class="icon"  v-if="item.iszhu != 1">
								<i class="football-icon rotate"></i>
							</div>
							<div class="time"  v-if="item.iszhu != 1">{{item.match_str}}'</div>
						
						</div>
					</div>
					
					<div class="bottom-wrap" @click="del(index)">
						<button class="close-button">
							<i class="close-icon"></i>关闭
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// 整体布局（包含页眉，主体，导航）
	import {
		Menu,
		Navbar,
		Sidebar,
		AppMain,
		loginMask,
	} from './components'
	// import menu from './components/menu.vue'
	import ResizeMixin from './mixin/ResizeHandler'
	export default {
		name: 'Layout',
		components: {
			Menu,
			Navbar,
			Sidebar,
			AppMain,
			loginMask,
		},
		data() {
			return {
				audio:null,
				topShow:true,//首页根据滚动距离显示隐藏
				showLoginMask: false,
				tabIndex:0,
			}
		},
		mixins: [ResizeMixin],
		computed: {
			sidebar() {
				return this.$store.state.app.sidebar
			},
			device() {
				return this.$store.state.app.device
			},
			classObj() {
				return {
					hideSidebar: !this.sidebar.opened,
					openSidebar: this.sidebar.opened,
					withoutAnimation: this.sidebar.withoutAnimation,
					mobile: this.device === 'mobile'
				}
			},
			goalItem(){
				if(this.$store.state.goalItem.length == 0) return
				this.playVideo()
				return this.$store.state.goalItem
			}
		},
		watch:{
			'$store.state.user.showLoginMask'(e){
				this.showLoginMask = e
			},
			'$route.query.type'(e){
				this.tabIndex == null
			},
		},
		mounted() {
		    window.addEventListener('scroll',this.handleScroll,true)
		},
		methods: {
			/* 删除弹窗 */
			del(id){
				this.goalItem.splice(id, 1)
			},	
			showLogin(status){
				this.showLoginMask = status
			},
			// 进球播放声音
			playVideo(){
				console.log('触发了哨声',this.$store.state.game.voice);
				if(!this.$store.state.game.voice) return
				let that = this
			    this.audio = new Audio();
			    this.audio.src = require('../assets/MP4/xiaohao.mp3');
			    let playPromise; 
			    playPromise = this.audio.play();
			    setTimeout(res=>{
					 that.audio.pause()
					 that.audio = null
				},6000)
			},
			// 导航栏切换
			getIndex(e){
				this.tabIndex = e
			},
			handleScroll(e){
				let path = this.$route.path
				let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
				if(scrollTop > 60 && (path == '/main' || path == '/football' || path == '/basketball')){
					this.topShow =false
				}else{
					this.topShow = true
				}
			},
			handleClickOutside() {
				// this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
			}
		}
	}
</script>


<style lang="scss" scoped>
	@import "~@/styles/mixin.scss";
	@import "~@/styles/variables.scss";

	.app-wrapper {
		@include clearfix;
		position: relative;
		height: 100%;
		width: 100%;

		&.mobile.openSidebar {
			position: fixed;
			top: 0;
		}
	}

	.drawer-bg {
		background: #000;
		opacity: 0.3;
		width: 100%;
		top: 0;
		height: 100%;
		position: absolute;
		z-index: 999;
	}

	.fixed-header {
		position: fixed;
		top: 0;
		right: 0;
		z-index: 101;
		width: 100%;
		// transition: width 0.28s;
	}

	.hideSidebar .fixed-header {
		// width: calc(100% - 54px)
	}

	.mobile .fixed-header {
		width: 100%;
	}
</style>
