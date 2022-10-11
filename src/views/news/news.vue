<!-- 新闻 -->
<template>
	<div class="app-main" style="padding-top: 60px; background-color: rgb(245, 244, 244);margin-top: 22px;">
		<div class="bell-2"><span class="bell"></span></div>
		<div class="help-nav-box-wrap">
			
			 
			  
			<div class="nav-item-box">
				<a href="/about-user">
					<div class="icon"></div>
					<div class="content">问题帮助</div>
				</a>
			</div>
			
		</div>
		<div class="news-page-container">
			<div class="page-bg"></div>
			<div style="width:100%">
				<div class="" style="">
					<div class="news-page-nav">
						<div class="news-page-nav-container">
							<div class="news-page-nav-mark use-transition"
								style="transform: translateX(0px); width: 90px;"></div>
							<div class="news-page-nav-item" :class="classificationIndex == index?'active':''" @click="classificationIndex = index" v-for="(item,index) in classificationList" :key="index">
								<a >
									<div class="news-page-nav-text">{{item.name}}</div>
									<div class="news-page-nav-sub-mark"></div>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="news-page-content">
				<div class="left-container">
					<div class="news-page-recommend-news">
						<div class="news-page-recommend-news-title">推荐头条</div>
						<div class="news-page-recommend-news-content" :style="{visibility:  HeadlinesList.data == 0?'hidden':''}">
							<div class="news-page-recommend-news-img-box" >
								<router-link tag="a" target="_blank" v-if="Headlinesbanner&&Headlinesbanner.length != 0"  class="news-carousel-slide" :to="'/detail?id=' + Headlinesbanner[realIndex].id">
									<div class="lazyload-wrapper " style="width: 842px;height: 348px;">
										<img class="news-page-recommend-news-img"  style="object-fit: cover;width: 100%;height: 100%;object-position:left top" :src="Headlinesbanner[realIndex].img"
											width="1684" height="696">
										</div>
									<div class="news-page-recommend-news-profile-box">{{Headlinesbanner[realIndex].title}}</div>
								</router-link>
							</div>
							<div class="news-page-recommend-news-preview-box">
								<div class="news-page-recommend-news-left-btn">
									<div class="news-page-recommend-news-btn-trigger"></div>
								</div>
								<swiper ref="mySwiper" :options="swiperOptions" style="width: 100%;height: 100%;">
									<swiper-slide v-for="(item,index) in Headlinesbanner" :key="index" style="padding-bottom: 0;">
										<div :class="realIndex == index?'activeImg':''">
											<img class="news-page-recommend-news-preview-img" :src="item.img" width="212" height="150" :id="item.id">
										</div>
									</swiper-slide>
								</swiper>
								<div class="news-page-recommend-news-right-btn">
									<div class="news-page-recommend-news-btn-trigger"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="news-page-list">
						<div>
							<div class="news-page-item" v-for="(item,index) in HeadlinesList.data" :key="index">
								<router-link tag="a" target="_blank" class="grid-header-right-more" :to="'/detail?id=' + item.id">
									<div class="news-page-item-img">
										<div class="lazyload-wrapper ">
											<div class="lazyload-placeholder">
												<img style="width: 100%;height: 100%;" object-fit="contain" :src="item.img"  v-if="item.img">
											</div>
										</div>
									</div>
									<div class="news-page-item-content">
										<div class="news-page-item-content-top">
											<h1 class="news-page-item-title ellipsis">{{item.title}}</h1>
											<div class="news-page-item-text">
												{{item.summary}}
											</div>
										</div>
										<div class="news-page-item-content-bottom">
											<div class="news-page-item-content-bottom-left">
												<div class="news-page-item-user-info">
													<div class="lazyload-wrapper ">
														<div class="lazyload-placeholder"></div>
													</div>
													<div class="news-page-item-user-info-name">{{item.user_nickname}}</div>
												</div>
												<div class="tags-container"><object>
												<div class="content-keyword" v-if="item.classification_name">{{item.classification_name}}</div></object></div>
											</div>
											<div class="news-page-item-content-bottom-right">
												<div class="news-page-item-content-time">{{item.addtime}}</div>
												<div class="news-page-item-content-comment">{{item.comment_count}}</div>
											</div>
										</div>
									</div>
								</router-link>
							</div>
						</div>
						<div class="news-page-list-box">
							<div class="news-page-list-load-more" @click="HeadlinesList.data.length >= HeadlinesList.total?'':getmore()">{{HeadlinesList.data.length >= HeadlinesList.total?'没有更多了':'点击加载更多'}}</div>
						</div>
					</div>
				</div>
				<div class="right-container">
					<div style="width:100%">
						<div class="" style="">
							<div class="news-page-recommend-anchor">
								<div class="news-page-recommend-anchor-title">主播推荐</div>
								<div class="news-page-recommend-anchor-content" >
									<div class="news-page-recommend-anchor-item" v-for="(item,index) in recommendList" :key="index">
										<router-link tag="a" target="_blank" :to="'/persona?id=' + item.id">
											<div class="news-page-recommend-anchor-item-icon">
												<div class="news-page-recommend-anchor-item-live" :class="item.is_live == 1?'active':''"></div>
												<div class="lazyload-wrapper "><img
														class="news-page-recommend-anchor-item-icon-img"
														:src="item.avatar"
														alt="" width="128" height="128" title=""></div>
											</div>
											<div class="news-page-recommend-anchor-item-desc">
												<div class="news-page-recommend-anchor-item-name">
													<div class="name-text">{{item.user_nickname}}</div>
													<div class="right-content">
														<div class="hot-icon active"></div>
														<div class="fans-count">{{item.heat}}</div>
													</div>
												</div>
												<div class="news-page-recommend-anchor-item-profile">{{item.signature}}</div>
											</div>
										</router-link>
									</div>
									<el-empty v-if="recommendList.length == 0" :image-size="300" :image="require('../../assets/images/qsy.png')"></el-empty>
									<div class="news-page-recommend-anchor-search-btn" @click="getRecommend()"><span>换一批</span></div>
								</div>
								
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>;
	</div>
</template>

<script>
	import {
		getList,
		getRecommend,
		classification,
	} from '@/api/headline.js'
	import {
		swiper,
		swiperSlide
	} from 'vue-awesome-swiper'
	
	export default {
		data() {
			return {
				page:1,
				// realIndex:0,
				HeadlinesList:[],//头条列表
				Headlinesbanner:[],//头条轮播列表
				classificationIndex:0,
				recommendList:[],//主播推荐
				classificationList:[],//分类
				swiperOptions: {
					loop:true,
					width: 540,
					autoplay: {
						delay: 5000,
						disableOnInteraction: true
					},
					// loop: true,
					slidesPerView: 5,
					spaceBetween: 10,
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					},
					navigation: {
						nextEl: '.news-page-recommend-news-right-btn',
						prevEl: '.news-page-recommend-news-left-btn'
					},
					on: {
						//  2. 在滚动事件中通过上面保存的swiper元素获取当前页索引,可以打印一下c_swiper看一下内部属性
						slideChange:(e) => {
							// console.log(this.$refs.mySwiper.swiper.realIndex)
						},
						click: (e) => {
							const index = this.Headlinesbanner.findIndex((i) => i.id == e.target.attributes.id.nodeValue);
							console.log(index)
							this.$refs.mySwiper.swiper.realIndex = index
						}
					}
				}
			}
		},
		computed:{
			realIndex(){
				if(this.$refs.mySwiper == undefined ) return 0
				// this.headList(this.classificationList[e].id)
				return this.$refs.mySwiper.swiper.realIndex 
			},
			system() {
				return this.$store.state.system
			}
		},
		components:{
			swiper,
			swiperSlide
		},
		mounted() {
			this.getRecommend()
			this.classification()
		},
		watch:{
			// realIndex(e){
			// 	this.$refs.mySwiper.swiper.realIndex = e
			// },
			classificationIndex(e){
				// this.HeadlinesList.data = []
				if(this.$refs.mySwiper !== undefined ) {
					
					this.$refs.mySwiper.swiper.realIndex = 0
				}
				// console.log(this.clas	sificationList[e].id);
				this.headList(this.classificationList[e].id)
			}
		},
		methods:{
			// 加载更多
			getmore(){
				this.page++
				this.headList(this.classificationList[this.classificationIndex].id)
			},
			
			// 切换
			setActive(){
			},
			// 获取推荐主播
			getRecommend(){
				getRecommend().then(res => {
					this.recommendList = res.data
				}).catch(res => {})
			},
			
			// 头条列表
			headList(id){
				getList({cid:id,page:this.page}).then(res=>{
					
					console.log(this.page);
					if(this.page == 1){
						this.HeadlinesList = res.data.list
					}else {
						console.log(this.HeadlinesList.data);
						console.log(res.data.list.data);
						
						this.HeadlinesList.data = this.HeadlinesList.data.concat(res.data.list.data)
					}
					if(this.classificationIndex == 0){
						this.Headlinesbanner = res.data.banner
					}
				}).catch(res=>{})
			},
			// 头条分类
			classification(){
				classification().then(res=>{
					res.data.unshift({id:0,name:'热门'})
					this.classificationList = res.data
					this.headList(0)
				}).catch(res=>{})
			},
		}
	}
</script>

<style scoped>
	.activeImg::before {
		content: "";
		display: inline-block;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .6);
		position: absolute;
		z-index: 3
	}
	.activeImg img{
		height: 68px
	}
	.grid-header-right-more {
		justify-content: flex-start;
	}
	.news-page-item-content {
		flex: 1;
	}
	
	/* @import url("../../styles/news.css"); */
</style>
