<template>
	<div class="circle-detail-page-main-wrap" style="padding-top: 60px;margin-top: 20px;">
		<div class="page-bg"></div>
		<div class="circle-detail-page-brand-wrap">
			<div class="circle-detail-page--brand">
				<div class="breadcrumb"><span class="adress">当前位置： </span><span class="breadcrumb-link"><span
							class="no-link">首页</span><span class="breadcrumb-arrow">&gt;</span></span><span
						class="breadcrumb-link">
						<router-link class="" tag="a" target="_blank" to="/circle">
							社区
						</router-link>
						<!-- <a href="/community/circle-list?circleId=9999"></a> -->
						
						<span class="breadcrumb-arrow">&gt;</span></span><span class="breadcrumb-title">文章</span></div>
			</div>
		</div>
		<div class="circle-detail-page-main">
			<div class="circle-detail-page-main-left">
				<div class="circle-page-main-left">
					<div class="detail">
						<div class="title" v-html="getText(detail.title)">
							<!-- {{detail.title}} -->
						</div>
						<div class="content" v-if="detail.flie&&detail.is_flie_type == 0">
							<div class="img">
								<div class="lazyload-wrapper" v-for="(item,index) in detail.flie">
									<img :src="item.img">
								</div>
							</div>
							<!-- <div class="img" v-else>
									<div class="lazyload-wrapper anchor-news-imglist"
										style="overflow: hidden;margin: 0 auto;margin-top: 20px;margin-left: 25px;width: 94%;">
										<div class="img-box-one-wrapper " style="position: relative;">
											<img :src="detail.flie[0].img" style="margin: 0;width: 100%;">
											<div class="mask">
												<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHYAAAB4CAMAAAAQc/ZTAAAApVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+4/eNVAAAANnRSTlMA8/j8CQNFw7egjD0mEu7kmTYyGermvqZp3s6tSyIdDoN2bmZXKwbb0cmqYVIWDNiye1sukofJUFtWAAADkUlEQVRo3tXah1LiUACF4ZObRgihhN6RoiBV0PP+j7bjumNGVLgtmdnvBf6B5OaWBP+LZrydvUbPpXATlobR61svGPvI1WQbrQW/E8fhfIVcTJf1Pm9pdxdN2OWPuoL3uaWzB2tW5TZlOVEMK9Ih1YQBjMUlqhvsYKRSop51DG3eTFBbtIeeUZ8mqj0f6g5dmgonUHU50lxrBDULQSvKPuQ9dmlLuIesaYf2PI0hZz+gTe0LZIz7tMuJcV+lTdtEgHuafdrnpLhtumYeWhXc4nWYj34TNzwzL2sPv5ozPxF+kwrm6IyfTfvMk1MxuLDWL++SeXvDd4ca8yYq+KbM/HVw7eKyAEtcCVmE9gFfjFiMF4Mfa6DlAZmYRZkDmRKLUnvEpwaLs8CniMUZZJO7wwKt8M+ZRSqr31Cth8auLmik5uOvpitdXQFAs+7SRKC6lNnhQ+WZBur4a0hZ2ZhLO9TWxzu/SkkOkAkG1DUGgJRK2czyiXq2APCgm4W/qFFHV234OLjmPVSprgYAbYMskJQFle2BKQ2ymsM4BhqmWaAyVJ+FzuZZoNFRfSzPDLK6w/gEPBtkdYfxEejYysLvtSmnCmyMsxnvpUoZAjhayGaSruScUrOSzZwoIUHVcrYhNwe5lrOPcss4x3K2SQkVtC1nHyihiSe72UBQwgEDm9lJRBkuEGpmTeZeBzgZZ7NHlMLy4tU0mz2QpYVATzNrsoqsA4Fm1mTN/ABMjLONDhWNADiaWYP9UAXAwCCrt/sTPoCyfjZ5E9pngCPlbLYlMDgTm7rSWaMNUCYGoLCaEsjsjtTl+Hj3pnIHfgg21FdSPQw7+XiXlmiihw9PlNVNgFWXRkSCDy+UJgZtGhrinzGLtCvwNDlTzY57tizOKz491lgUd2L6TtH8DaPXYjHcytWiuhhdfDGtsgjuBV8tWIQ6rm2Yv1aCa6nL3G3x3SvzFuIH0xrzJVb4SewyVwuDHbGtIVvUq76nA36T1JgXccHvUof5cJcaRw/merht5zIHM9zTo3113De3X/Uh4SyK/IczgUOL5pDVaNEWsYS8SUg7+g2o8Mu0YZhA0cj8jxZzqJucaGaTGnwFbvINePHfvEd7GBhHLjWUGjA0Uf/OYpjCgma5RXkiWsGSx91QUEpne4BNSa9zr+xuXiawzwtm4a/pdXk0RW4OjfPseS2YEcdTeRsnKIK3H1/iIE7Hew//kz/wxRSXLXEZwAAAAABJRU5ErkJggg==">
											</div>
										</div>
									</div>

							</div> -->
						</div>
						<div class="bottom-box">
							<div class="bottom-box-left">
								<span>发布时间：</span>
								<span>{{detail.addtimeString}}</span>
								<span>浏览量：</span>
								<span>{{detail.click}}</span>
							</div>
							<div class="bottom-box-right">
								<div class="dianzan-box box" @click="commentLikes()" :class="detail.is_likes == 1?'dianzan-box-active':''">
									<div class="icon dianzan "></div>
									<div>{{detail.likes}}</div>
								</div>
								<div class="shouchang-box box" @click="favorites()" :class="detail.is_favorites == 1?'shouchang-box-active':''">
									<div class="icon shouchang"></div>
									<div>{{detail.favorites}}</div>
								</div>
								<div class="huifu-box box" @click="$common.gotDown()">
									<div class="icon huifu"></div>
									<div>{{detail.comment}}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="circle--detail-page-main-right">
				<div class="circle-detail-right">
					<div class="anchor">
						<div class="author-box">
							<div class="author-box-content-box1">
								<router-link class="author-box-content-box1-left" tag="a" target="_blank" :to="'/persona?id=' +detail.uid">
								<!-- <div class="author-box-content-box1-left" target="_blank" href="/personal-space?id=2292724&amp;headerNavIndex=0"> -->
									<div class="lazyload-wrapper ">
										<img :src="detail.avatar" width="128" height="128">
									</div>
								</router-link>
								<div class="author-box-content-box1-right">
									<div class="line1">
										<div class="name">{{detail.user_nickname}}</div>
										<!-- <div class="focus-box">
											
											<div class="text">关注</div>
										</div> -->
									</div>
									<div class="line2">{{detail.signature}}</div>
								</div>
							</div>
							<div class="author-box-content-box2">
								<div class="left">
									<p class="num">{{detail.article_num}}</p>
									<p class="text">文章数</p>
								</div>
								<div class="right">
									<p class="num">{{detail.attention}}</p>
									<p class="text">关注</p>
								</div>
							</div>
						</div>
					</div>
					<div class="article-list">
						<div class="article-list-box">
							<div class="title-box">
								<div class="left">
									<div class="icon"><img
											src="data:image/png;base64,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">
									</div>
									<div class="title-text">ta的帖子
										<!-- -->
									</div>
								</div>
								<!-- <div class="right">
									<a href="https://h5down.qiutx.com/" class="title-box-more"
										target="_blank">更多 <i></i></a>
								</div> -->
							</div>
							<div class="list-box" style="margin-top: 16px; padding-bottom: 18px;">

								<el-empty v-if="postList.total == 0" :image-size="200" :image="require('../../assets/images/qsy.png')"></el-empty>
								<!-- 暂无数据 -->
								<router-link tag="a" v-if="index < 5" target="_blank" v-for="(item,index) in postList.data"  :to="'/circle-detail?id='+item.id">
									<div class="list-item">
										<div class="left">
											<div class="lazyload-wrapper ">
												<img v-if="item.is_flie_type == 0" :src="item.flie[0]" width="180" height="120">
												<img v-else :src="item.flie[0].img" width="180" height="120">
											</div>
										</div>
										<div class="right">
											<div class="box1 text-clamp2">{{item.title}}</div>
											<div class="box2">{{item.addtime}}</div>
										</div>
									</div>
								</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		info,
		favorites,
		likes,
		userPostList
	} from '@/api/circleuser.js'
	import emotion from '../persona/emotion.json'
	export default {
		data() {
			return {
				detail: {},
				list: {},
				postList:{},
				emotion:emotion
			}
		},
		mounted() {
			this.info()
		},
		methods: {
			// 获取详情
			info() {
				info({
					id: this.$route.query.id
				}).then(res => {
					// console.log(res)
					this.detail = res.data.info
					this.list = res.data.list
					this.userPostList(this.detail.uid)
				}).catch(res => {})
			},
			// 转换文字1.查询切换[]有的内容，替换
			getText(str) {
				// let str = 'jfkdsj[咒骂]dsjfkljsa[憨笑]哈哈哈，[惊恐]'
				let exp = /\[(.*?)\]/g; //匹配[*] 大括号里面任意内容的正则
				let arr = str.match(exp); //字符串匹配出来的数组
				// // console.log(arr);
				if (!arr) return str;
			
				this.emotion.forEach((item1, index) => {
					arr.map(item => {
						// // console.log(item1);
						if (item1 === item) {
							str = str.replace(item,
								`<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif'>`
							);
						}
					}); //循环遍历
				})
				// let arrNum = 取出所有正则匹配值并转换为input
			
				// // console.log(str);
				return str;
			},
			// ta的帖子
			userPostList(id){
				userPostList({uid:id}).then(res => {
					this.postList = res.data
				}).catch(res => {})
			},
			// 点赞
			commentLikes(){
				likes({id:this.detail.id}).then(res=>{
					if(this.detail.is_likes == 1){
						this.detail.likes --
						this.detail.is_likes = 0
					}else {
						this.detail.likes ++
						this.detail.is_likes = 1
					}
					this.$message.success('操作成功')
				}).catch(res=>{})
			},
			// 收藏
			favorites(){
				favorites({id:this.detail.id}).then(res=>{
					if(this.detail.is_favorites == 1){
						this.detail.favorites --
						this.detail.is_favorites = 0
					}else {
						this.detail.favorites ++
						this.detail.is_favorites = 1
					}
					this.$message.success('操作成功')
				}).catch(res=>{})
			}
		}
	}
</script>

<style scoped="scoped">
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
		margin: 0 auto !important;
		opacity: 0;
		z-index: 9;
		height: 30px !important;
		width: 30px !important;
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
