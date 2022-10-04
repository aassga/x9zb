<!-- 底部-话题 -->
<template>
	<view class="topic" >
		<downloadHead v-if="show1"></downloadHead>
		<view class="topic-head" :style="{top:show1?'104rpx':'0'}">
			<u-tabs :list="tabList"  font-size="34" active-color="#E3AC72" :is-scroll="false" :current="current" @change="change"></u-tabs>
		</view>
		<view class="topic-swiper" :style="{marginTop:show1?'208rpx':'104rpx'}">
			<u-swiper :list="bannerList" @click="detail" @change="change1" name="img" mode="rect" indicator-pos="bottomRight"></u-swiper>
			
		</view>
		<!--  :style="{marginTop:show1?'204rpx':'100rpx'}" -->
		<view class="topic-list">
			<view class="list-li flex" v-for="(item,index) in Headlist.data" :key="index" @click="$navigateTo('./detail?id=' + item.id)">
				<view class="list-li-left flex-wrap">
					<view class="list-li-left-nav text-clamp2">{{item.title}}</view>
					<view class="list-li-left-bot flex-start">
						<text>置顶</text>
						<view class="flex">
							<image src="../../static/images/topic/topic-common.png" mode="aspectFill"></image>
							<text>评论</text>
						</view>
					</view>
				</view>
				<image class="list-li-logo" :src="item.img" mode="aspectFill"></image>
			</view>
		</view>
		<image src="/static/images/topic/topic-top.png" class="topic-top" mode="aspectFill" @click="top()"></image>
		<u-popup v-model="show" mode="center" border-radius="20" :closeable="true">
			<view class="todownload-box">
				<view class="close-btn">
					
				</view>
				<view class="todownload-title">赶紧去下载小九直播APP</view>
				<view class="todownload-subtitle">
					收获完整内容体验～
				</view>
				<view class="todownload-btn" @click="$navigateTo('../download')">立即下载</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				tabList :[{
					name: '头条'
				}, 
				// {
				// 	name: '社区'
				// }, {
				// 	name: '数据'
				// },
				],
				bannerList:[
					{
						img:'/static/images/topic/banner.jpg'
					}
				],
				page:1,
				swCurrent:0,
				Headlist:{
					data:[]
				},
				HeadlinesList:{},
				current: 0,
				list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
			}
		},
		computed:{
			show1:{
				get() {
					return this.$store.state.show
				},
				set() {
					// this.$store.state.info.midMask = !this.$store.state.info.midMask
				}
			}
		},
		watch:{
			current(e){
				if(e != 0){
					this.show =true
				}
			}
		},
		mounted() {
			this.getHeadlines()
			this.userPostList()
		},
		onReachBottom(){//触底加载
			console.log('0000');
			if(JSON.stringify(this.HeadlinesList) == '{}') return
			// console.log(this.HeadlinesList.list.total,this.Headlist.data.length);
			if(this.HeadlinesList.list.total > this.Headlist.data.length){
				this.page++
				this.getHeadlines()
			}
		},
		methods:{
			// 置顶
			top(){
				uni.pageScrollTo({
					duration:0,
					scrollTop:0
				})
			},
			
			// 用户发帖列表
			
			userPostList(){
				this.$u.get('/api/Circleuser/userPostList', {page:this.page}).then(res => {
					// this.$db.set('system'.res.data)
					// this.HeadlinesList = res
					// this.Headlist.data = [...this.Headlist.data,...res.list.data]
				})
			},
			
			change(e){
				this.current = e
			},
			// 轮播切换
			change1(e){
				// console.log(e);
				this.swCurrent = e
			},
			// 点击轮播 
			detail(e){
				uni.navigateTo({
					url:'./detail?id=' + this.HeadlinesList.banner[e].id
				})
				console.log(e);
			},
			//获取头条列表
			 getHeadlines(){
				 this.$u.get('/api/Headlines/getList', {page:this.page}).then(res => {
				 	// this.$db.set('system'.res.data)
				 	this.HeadlinesList = res
					this.Headlist.data = [...this.Headlist.data,...res.list.data]
				 })
			 }
		}
	}
</script>

<style lang="scss" scoped>
	.topic {
		padding-bottom: 120rpx;
	}
	.topic-head {
		position: fixed;
		top: 100rpx;
		left: 0;
		right: 0;
		z-index: 9;
		padding: 0 200rpx;
		background-color: white;
	}
	.topic-swiper {
		
		position: relative;
		margin: 20rpx 24rpx;
		margin-top: 200rpx;
		.topic-swiper-title {
			width: 90%;
			color: #fff;
			position: absolute;
			left: 24rpx;
			bottom: 20rpx;
			font-size: 28rpx;
		}
	}
	.topic-list {
		margin: 0 24rpx;
		padding: 0 24rpx;
		border-radius: 12rpx;
		background-color: white;
		.list-li {
			
			padding: 32rpx 0;
			border-bottom: 2rpx solid #F0F0F0;
		}
		.list-li-logo {
			
			width: 242rpx;
			height: 136rpx;
			margin-left: 32rpx;
			border-radius: 12rpx;
		}
		.list-li-left {
			flex: 1;
			height:136rpx;
			image {
				width: 28rpx;
				height: 24rpx;
				margin-right: 8rpx;
			}
			.list-li-left-nav {
				color: #333;
				font-size: 32rpx;
				align-self: flex-start;
			}
		}
		.list-li-left-bot {
			width: 100%;
			font-size: 24rpx;
			align-self: flex-end;
			text {
				color: #CC374A;
				margin-right: 32rpx;
			}
			view {
				text{
					color: #999;
				}
			}
		}
	}
	.topic-top {
		position: fixed;
		bottom: 192rpx;
		right: 32rpx;
		width: 96rpx;
		height: 96rpx;
	}
	
</style>
