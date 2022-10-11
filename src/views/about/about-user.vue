<template>
	<div class="help-home-page" style="padding-top: 80px;">
		<div class="help-home-page-left">
			<ul>
				<li v-for="(item,index) in tabList" :key="index"><a class="tab-item" @click="tabIndex = index" :class="index == tabIndex?'tab-item-active':''">{{item.t}}</a></li>
				<!-- <li><a class="tab-item" target="_blank" :href="system.CustomerService">在线客服</a></li> -->
			</ul>
		</div>
		<div class="help-home-page-right">
			<div class="about-user-box">
				<div class="tabs-box">
					<ul>
						<li v-for="(item,index) in queryList" :key="index" @click="queryIndex = index">
							<a class="tabs-item" :class="queryIndex == index?'tabs-active':''">
								<p class="tabs-text">{{item.post_title}}</p>
							</a>
						</li>
					</ul>
				</div>
				<div>
					<div class="content-box" style="padding-top: 20px;" v-if="queryList[queryIndex]" v-html="queryList[queryIndex].post_content">
						
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { portalPpost } from '@/api/user.js'
	export default {
		data() {
			return {
				tabIndex:0,
				queryIndex:0,
				queryList:[],
				tabList:[{
						t:'用户相关',
						id:26
					},
					{
						t:'主播相关',
						id:27
					}
					// {
					// 	t:'联系我们',
					// 	id:22
					// }
				],
				
				
			}
		},
		watch:{
			tabIndex(e){
				// if(e == 0){
				// 	this.queryList = this.t1
				// }else if(e == 1){
				// 	this.queryList = this.t2
				// }else {
				// 	this.queryList = this.t3
				// }
				this.portalPpost()
			}
			
		},
		computed:{
			system() {
				return this.$store.state.system
			}
		},
		mounted() {
			// if (this.isPC()) {
							this.portalPpost()
			setTimeout(res=>{
				if(this.$route.query.type){
					this.tabIndex = this.$route.query.type
				}
			},500)
			// }else{
			// 	console.log(window.location.origin+"/m/#/pages/prococol/privacy")
			// 	// window.location.href = window.location.origin+"/m/#/pages/prococol/privacy"
			// }

		},
		methods:{
			isPC(){
     var userAgentInfo = navigator.userAgent;
     var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
     var flag = true;  
     for (var v = 0; v < Agents.length; v++) {  
         if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
     }  
     return flag;  
			},
			portalPpost(){
				portalPpost({id:this.tabList[this.tabIndex].id}).then(res=>{
					this.queryList = res.data
					
				}).catch(res=>{})
			}
		}
		
	}
</script>

<style>
	.help-home-page {
		background-color: #efefef;
		display: flex;
		flex-direction: row;
		justify-content: center;
		min-height: 100vh;
		padding-top: 20px
	}

	.help-home-page-left {
		width: 240px;
		border-radius: 4px;
		border: 1px solid #efefef;
		background-color: #fff
	}

	.help-home-page-left ul {
		display: flex;
		flex-direction: column;
		justify-content: flex-start
	}

	.help-home-page-left ul li {
		list-style: none;
		margin: 0;
		overflow: hidden;
		width: 100%
	}

	.help-home-page-left ul li .tab-item {
		width: 100%;
		margin: 0;
		height: 50px;
		line-height: 50px;
		font-size: 16px;
		background-color: #fff;
		cursor: pointer;
		color: #666;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center
	}

	.help-home-page-left ul li .tab-item-active {
		height: 50px;
		line-height: 50px;
		font-size: 16px;
		border-bottom: 1px solid #eee;
		cursor: pointer;
		color: orange;
		background-color: #efefef;
		border-left: 4px solid orange
	}

	.help-home-page-right {
		width: 1000px;
		border: 1px solid #efefef;
		background-color: #fff;
		padding: 30px
	}

	.personal-home-page {
		width: 1200px;
		margin: 20px auto;
		display: flex;
		text-align: center
	}

	.personal-home-page .usr {
		margin-top: 36px;
		width: 80px;
		height: 80px;
		border-radius: 50%;
		object-fit: cover;
		border: 1px solid #f0c682
	}

	.personal-home-page a .vip {
		width: 80px;
		margin-top: -20px
	}

	.personal-home-page .name1 {
		font-size: 18px;
		font-weight: 700;
		color: #67728f;
		line-height: 18px;
		height: 18px;
		width: 140px;
		margin: 5px auto 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis
	}

	.personal-home-page .nav {
		width: 225px;
		height: 751px;
		background: #fff;
		border-radius: 4px;
		box-shadow: 0 0 8px 0 rgba(0, 0, 0, .15)
	}
</style>
