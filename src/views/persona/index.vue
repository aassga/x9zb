<!-- 我的空间 -->
<template>
	<div class="personal-space-container" style="padding-top: 60px;">
		<div class="page-bg"></div>
		<div class="personal-space">
			<div class="personal-space-title">
				<div class="personal-space-title-info">
					<div class="iconBox">
						<div class="lazyload-wrapper "><img class="icon"
								:src="info.avatar">
						</div>
					</div>
					<div class="info-right">
						<div class="info-right-name"><span>{{info.user_nickname}}</span><img style="width: 54px;height: 24px;" class="info-right-levelImg"
								:src="info.exp_icon" alt="">
							<div class="info-right-live">
								<img class="info-right-live-img"
									src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAzJJREFUaAXtmb9rFFEQx++CJuKPGBS10eI68UchWCiCIagQBbGJtkLIvxBsrxNsrC0UWzUQEAS7kC6RgBgVBTEg/sCAQjAphfMzy5t1ePf2zt3cZvdkB4aZNzPvve/M7N7b263VKqoqsDUVaLVaTThEzawIWGzTaw5k3bws8/o+gbZC0tYG/BD+DP+GiybBIFgEU6MNsDUQMAmvw2UlwTZpMdd1gGMUfQ6ObeormWyBZ6xer8/HuAA/BK/ASgsoZ+HBOKggBQwDDssiUkmwDsWQGIyrB/kVHomdJVHANAx/g5XGBZr+Ch03OGdpz5oZl0IF0y+APDVgIsyawB7j+GH0sqnfDaAIsyZg7P2lVgkU3a+qA1UHNlmB//sS4si7B2843h8qFr6dJuY++gs3XkPa8yWaju2u88u6E0bXfULyRmhvsXXrwA5idjlOesgTu8ZI/DM33ou8CPt0DYPEr8LLTtf5SXIbcUFKdASj/834mLCmC72MnHV6jWofRW+48SOkPFkqPUGZ0YEnF7xxPOx5AjyzvAPoa3Y4CUsClq6YgSRg6S1zJflU1O0SSrWYCVZwh0nmhLFrQu8B+8rYM6t5JWArGVWdRHaD8rxDqgla4NPErAb4uQ3y9VwSoLof2Oil20yrfoGx/kEKJSA38MEA73PrBEXP7wGzi3ThFHyOqsrPadQJ5LLcJ0if5AYO3cQ//UA7zjuB22y2Hb4EaydC1RdMb0gsySf+IOVyCclOgFlBLLldp5FHnJ4apJsXFGk6cJVLYT2wyqeATU1yGZ2GzzjDEol9VKcnj7H+hGfT4RfmBc+CNAk80NU8eccb26EkYP2dqi+PC0mPDHJvXLcLq57bJSQbUDXpzqLbTE5dSain1LEDALjJbsLd6FZSAGvo5dMWgk9+buVZKjPl2oHMqFJMrBJIUaxcQqsO5FLWFItqB+wBdSjF/K0OPWA2/IuZE9C+nZY3wMMmsBQqmEbgtrfTETgc/vcBeRcv3we0Q4UlAYZBh0W+WSjF3wfiQwTPKCjn4NhWGOrOG7dwj3EIzktYXGFnmMK2IY6SkmCbUvBBjHSif79SBjOqjFUFOlbgD0K/m8D9Yo2lAAAAAElFTkSuQmCC"
									alt="">
								<div class="info-right-live-text" v-if="info.is_live == 1">
									<a target="_blank" :href="'live?router=live&type='+info.type+'&id='+info.match_id+'&uid='+info.id">ta 的直播间</a>
								</div>
								<div class="info-right-live-text" v-else>暂未开播</div>
							</div>
						</div>
						<div class="info-right-content">{{info.signature}}</div>
					</div>
				</div>
				<div class="personal-space-title-nav">
					<div class="tab-item" :class="titleIndex == index?'cur':''" v-for="(item,index) in titleTab" :key="index" @click="titleIndex = index" v-if="info.is_anchor == 1?index < 4:index != 3">{{item}}<div v-if="titleIndex == index" class="cur-bottom"></div>
					</div>
				</div>
			</div>
			<div class="personal-space-content">
				<div class="personal-space-content-left">
					<!-- 内容 -->
					<anchor :infos="info" :type="type" ref="anchor" v-if="titleIndex == 3"></anchor>
					<information  v-if="titleIndex == 0"></information>
					<attention :info="info" :titleIndex="titleIndex" v-if="titleIndex == 1 || titleIndex == 2"></attention>
				</div>
				<div class="personal-space-content-right">
					<div>
						<div class="number">
							<div class="afclick-item" @click="setIndex(1)">
								<div>{{info.attention_num}}</div>
								<div>关注</div>
							</div>
							<div class="afclick-item"  @click="setIndex(2)">
								<div>{{info.attention}}</div>
								<div>粉丝</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import anchor from './anchorDynamic.vue'
	import information from './information.vue'
	import attention from './attention.vue'
	import {getUserInfo} from '@/api/user.js'
	
	export default {
		components:{anchor,information,attention},
		data() {
			return {
				info:{},
				type:0,
				titleIndex:0,
				titleTab:['头条','关注','粉丝','主播'],
				// titleTab:['主播'],
			}
		},
		computed:{
			infos(){
				return this.$store.state.infos
			}
		},
		mounted() {
			if(JSON.stringify(this.$route.query) == '{}'){
				setTimeout(res=>{
					this.info = this.infos
				},1000)
			}else {
				this.type = 1
				this.getUserInfo(this.$route.query)
			}
			
			// this.info = this.$store.state.infos
		},
		methods:{
			getUserInfo(query){
				getUserInfo({id:query.id}).then(res=>{
					this.info = res.data
				}).catch(res=>{})
			},
			setIndex(type){
				this.titleIndex = type
				// if(this.$refs.anchor == undefined){
				// 	this.titleIndex = 1
				// 	setTimeout(res=>{
				// 		this.$refs.anchor.setIndex(type)
				// 		// console.log(this.$refs.anchor.titleIndex);
				// 	},500)
				// }else{
				// 	this.$refs.anchor.setIndex(type)
				// }
			}
		}
	}
</script>

<style>
	.mask {
	    position: absolute;
	    height: 100%;
	    width: 100%;
	    left: 0;
	    top: 0;
	    display: flex;
	    border-radius: 5px;
	    justify-content: center;
	    align-items: center;
	}
	.mask img {
		margin: auto;
		opacity: 0;
		z-index: 9;
		height: 30px !important;
		width: 30px !important;;
		transform: scale(1.6);
	}
	
	
	.anchor-news-imglist:hover .mask {
		-webkit-animation: pulse .5s ease;
		-moz-animation: pulse .5s ease;
		background: hsla(0, 0%, 40%, .5)
	}
	
	.anchor-news-imglist:hover .mask img {
		display: inline-block;
		-webkit-animation: playBtn .5s ease;
		-moz-animation: playBtn .5s ease;
		transform: scale(1);
		opacity: 1
	}
</style>
