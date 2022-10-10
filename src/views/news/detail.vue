<template>
	<div class="news-page-wrap" style="margin-top: 20px;padding-top: 60px;">
		<div class="news-page--brand-wrap">
			<div class="news-page--brand">
				<div class="breadcrumb"><span class="adress">当前位置： </span><span class="breadcrumb-link"><span
							class="no-link">首页</span><span class="breadcrumb-arrow">&gt;</span></span><span
						class="breadcrumb-link"><a @click="$router.push('./news')">新闻资讯</a><span
							class="breadcrumb-arrow">&gt;</span></span><span
						class="breadcrumb-title">{{info.title}}</span></div>
			</div>
		</div>
		<div class="news-page-main">
			<div class="news-page-main-left-wrap">
				<div class="news-page-main-left">
					<div class="content-box">
						<div class="title">
							<h1>{{info.title}}</h1>
						</div>
						<div class="article-msg"><span>作者:</span><span
								class="article-msg-text author">{{info.user_nickname}}</span><span
								class="article-msg-title">发布时间:</span><span
								class="article-msg-text">{{info.addtime}}</span><span
								class="article-msg-title">阅读次数:</span><span
								class="article-msg-text">{{info.click}}</span></div>
						<main class="news-page-main-left-content">
							<div class="content-text" v-html="info.content">

							</div>
						</main>
						<div class="bottom-box">
							<div class="cell1"></div>
							<div class="cell2">
								<!-- shoucang-active-box -->
								<div class="box" @click="favorites()"
									:class="info.is_favorites == 1?'shoucang-active-box':'shoucang-box'">
									<div class="icon"></div>
									<div class="text">收藏</div>
								</div>
								<div class="share-box box">
									<div class="icon"></div>
									<div class="text"> 分享</div>
								</div>
							</div>
						</div>
						<!-- ------------上下篇 -->
						<div class="next-news-box">
							<div class="pre-box">
								<div class="pre-box-inner">
									<p>
									<div class="next-title">&lt;&nbsp;
										上一篇
									</div>
									</p>
									<p v-if="JSON.stringify(last.last) !== '{}'">
										<router-link tag="a" target="_blank" :to="'/detail?id=' +last.id">
											{{last.title}}
										</router-link>
									</p>
									<!-- <p v-else>无</p> -->
								</div>
							</div>
							<div class="next-box-inner">
								<div>
									<p style="text-align:right">
									<div class="next-title">
										下一篇
										&nbsp;&gt;
									</div>


									</p>
									<p v-if="JSON.stringify(next) !== '{}'">
										<router-link tag="a" target="_blank" :to="'/detail?id=' +next.id">
											{{next.title}}
										</router-link>
									</p>
									<!-- <p v-else>无</p> -->
								</div>
							</div>
						</div>
					</div>
					<div class="news-detail-comment">
						<!-- <div class="input-container">
							<div class="head-bar">发表评论</div>
							<div class="content">
								<textarea @click="$message.error('请下载小九直播app')" placeholder="我有话想说…（想尬聊，点这里哦～）"
									class="ant-input ant-input-borderless"></textarea>
							</div>
							<div class="operation-bar" @click="$common.gotDown()">
								<div class="media"><i class="emoji-icon" title="表情"></i><i class="picture-icon"
										title="图片"></i><i class="video-icon" title="视频"></i></div>
								<div class="send">发布</div>
							</div>
						</div> -->
						<div class="comment-container">
							<div class="head-bar" style="margin-bottom:4px">热门评论</div>
							<div class="comment-list">
								<div class="comment-item" v-for="(item,index) in commentList.data" :key="index">
									<div class="user-pic">
										<div class="lazyload-wrapper ">
											<img :src="item.avatar" width="40" height="40">
										</div>
									</div>
									<div class="comment-info">
										<div class="user"><span class="name">{{item.user_nickname}}</span><span
												class="location"></span></div>
										<div class="content">{{item.title}}</div>
										<div class="operation" @click="$common.gotDown()"><span
												class="date">{{item.addtime}}</span><span class="like">赞<i class="icon"
													title="点赞"></i></span><span class="reply">回复
												<!-- -->{{item.comment}}<i class="icon" title="回复"></i>
											</span></div>
									</div>
								</div>
								<el-empty v-if="commentList.data.length == 0" :image-size="200"
									:image="require('../../assets/images/qsy.png')"></el-empty>
							</div>
							<!-- <a class="more">查看更多评论4条 <span style="font-size:18px">&gt;&gt;</span></a> -->
						</div>
					</div>
					<div class="recommend-news-box-wrap">
						<div class="recommend-news-box">
							<div class="recommend-news-title-box">
								<div class="title-icon"><img
										src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAwFBMVEUAAADawqm7k1HXvZ7jxqrbwqm/mVy6lFG8lFPEoGrawqnBmlTVupnawqnTppy7k1HGo27IpXS6k1C6k1Hawqrawam7klG/m1K9llbbwqq7k1HawqrMwo+7k1G7k1G6k1HbwqrZwqjZwKjdxqzFm1zBnGS7k1C7klDMq37Nr4XTtpPawKS8lVO7k1C7k1G7k1C7k1O/ml26k1DQs427klHIp3nDoGrTuJTBnGW7lFHVuZjIp3i8lVK+klG+llW6klAYlJGdAAAAP3RSTlMAu/3BEm7zf/zmpxjEkgbz4t7IvbOgZRz4s3JgBfnwtrGNNSEP7e3a1tLIvpXm0XtH6uLMwLqunYuKbWJULye83VvpAAABsElEQVRIx9WV2XKCMBSGzwGhKKKCgoiI+77U7nvz/m/Vg0mRKdJJbjrT/8LhJN9njBc/kI9t56d4Yoz9Tsd/MiYxXEykaVE2VIwRptFNZuojo3JJWDA2+OSPjX4PeaqMsRVir98oCgfaG/Kvd1Bko9HiGilO8ZB3RjnSw7SG3zFpyeSPtWnBuKfdZQyVM79mlDsURuGMj/T8qOFk/DakhWo2OoV77Gg/ecUsLs1W/Tz3fwp2QkQr269bNLp4Tq/woyIitA3m/tJwi7kYJyrwmkwilrnCUQxgt5l05voEgHgFw4CAKeUBPPocdiGLj2XR54TeQHrfHA8dLDfSmwOjgJyAKVsQfFVhrCoYqsKbGVbrKsKSZo0UWYFm0+KKtOBuXa7ICo+IulDkhCsHSWlppLR0KYFKIFPWOb5WJvCa4UqY46elAhWZEEQniSIrE3hVni5ubjjNq/IXAezdgApgJXBexqWCwPfPvO7Hou7LhdkL4YuoUHNlwiEh/HoGICfc0pxwXE44LvdXhMsKIv9M4EUmlS6hTVGVUvyQUE+1jAPFum+D2gulbau8sppeAH+RL3+JuP908eflAAAAAElFTkSuQmCC">
								</div>
								<div class="title-text">推荐头条</div>
							</div>
							<div class="recommend-news-content-box">
								<router-link tag="a" target="_blank" :to="'/detail?id=' +item.id"
									v-for="(item,index) in recommend" :key="index">
									<div class="recommend-news-content-item">
										<div class="img-box">
											<div class="lazyload-wrapper ">
												<img v-if="item.img" :src="item.img" width="360" height="112">
											</div>
										</div>
										<div class="item-content-box">
											<div class="title">{{item.title}}</div>
											<div class="preview">
												{{item.summary}}
											</div>
											<div class="footer-box">
												<div class="left">
													<div class="tags-container">
														<div class="content-keyword" href="/news/tag-search?keywords=%E6%84%8F%E7%94%B2">意甲</div>
													
													</div>
												</div>
												<div class="right">
													<div class="date">{{item.addtime}}</div>
													<div class="msg-icon"></div>
													<div class="msg">{{item.comment_count}}</div>
												</div>
											</div>
										</div>
									</div>
								</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="news-page-main-right-wrap">
				<div class="circle-detail-right">
					<div class="anchor">
						<div class="author-box">
							<div class="author-box-content-box1">
								<router-link class="author-box-content-box1-left" tag="a" target="_blank" :to="'/persona?id=' +info.uid">
								<!-- <a class="author-box-content-box1-left" target="_blank" href="/personal-space?id=2170689&amp;headerNavIndex=0"> -->
									<div class="lazyload-wrapper ">
									<img :src="info.avatar" width="128" height="128"></div>
								</router-link>
								<div class="author-box-content-box1-right">
									<div class="line1">
										<div class="name" :title="info.user_nickname">{{info.user_nickname}}</div>
										<div class="focus-box" @click="getAttention()" v-if="info.is_attention == 0">
											<div class="icon"><img
													src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAJKADAAQAAAABAAAAJAAAAAAqDuP8AAABEklEQVRYCe1Y0Q6DIAyUzZf9gv+f+CG6b9rLFjwMixx0Q4MZzpSExZ60Hke1zZrmbMNa22H2fnbV9wciI+Z7DKWETEkAsLjC/xnFaI0xrwhbbV5Wr5QXShuSMNlbQEsJCSHLICWU008VUoVyCuTuaw79nUJtyNjXpi2ffvL3sVrECcPmrm1S+xDAtRBh1Yb50zHgaUvrAsP1M7VH76Q83Fs2ny+kqX1kLl3mI6MEBugaLsJmxp9/XFI/ots32HHTFi0hk5Ka3pIk28kvNbCBFAQZxNlCiGIcLoeUEJ2PYKhCgigEqUIkh2CoQoIoBJ1OIal2SBip8M0oUsjXvnvwgHFrPQx897n0rctx/rDaZ1tLlAmHottsPHEcFAAAAABJRU5ErkJggg==">
											</div>
											<div class="text">关注</div>
										</div>
										<span class="cancelConcern" v-else>已关注</span>
									</div>
									<!-- 个人描述/签名 -->
									<div class="line2">
										<!-- -->
									</div>
								</div>
							</div>
							<div class="author-box-content-box2">
								<div class="left">
									<p class="num">{{info.article_num}}</p>
									<p class="text">文章数</p>
								</div>
								<div class="right">
									<p class="num">{{info.attention}}</p>
									<p class="text">关注</p>
								</div>
							</div>
						</div>
					</div>
					<!-- 发帖人文章 -->
					<div class="article-list">
						<div class="article-list-box">
							<div class="title-box">
								<div class="left">
									<div class="icon"><img :src="require('../../assets/images/main-sport-title.png')">
									</div>
									<div class="title-text">TA的文章
										<!-- -->
									</div>
								</div>
								<div class="right" @click="$common.gotDown()">
									<div  class="title-box-more"
										target="_blank">更多 <i></i>
									</div>
								</div>
							</div>
							<div class="list-box" style="margin-top:16px;padding-bottom:18px;">
								<!--  v-for="(item,index) in userPostList.data" :key="index" -->
								<a v-for="(item,index) in userPostList.data" :key="index" v-if="index<5">
									<div class="list-item">
										<div class="left">
											<div class="lazyload-wrapper "><img
													:src="item.img"
													alt="" width="180" height="120" title=""></div>
										</div>
										<div class="right">
											<div class="box1">{{item.title}}</div>
											<div class="box2">{{item.addtime}}</div>
										</div>
									</div>
								</a>
								<el-empty v-if="userPostList.total == 0" :image-size="300" :image="require('../../assets/images/qsy.png')"></el-empty>
							</div>	
							<!--    -->
						</div>
						
					</div>
					<!-- 主播推荐 -->
					<div class="recommend-anchor-box">
						<div style="width:100%">
							<div class="news-page-recommend-anchor">
								<div class="news-page-recommend-anchor-title">主播推荐</div>
								<div class="news-page-recommend-anchor-content">
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
									<!-- <div class="news-page-recommend-anchor-search-btn"><span>换一批</span></div> -->
								</div>
								<!-- <div class="news-page-recommend-anchor-content">
									<el-empty :image-size="300" :image="require('../../assets/images/qsy.png')">
									</el-empty>
								</div> -->
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
		getInfo,
		favorites1,
		getRecommend,
		userPostList,
	} from '@/api/headline.js'
	import {
		attention
	} from '@/api/user.js'

	// import commont from '@/components/comment/comment.vue'
	export default {
		data() {
			return {
				last: {},
				next: {},
				info: {}, //文章信息
				recommend: [], //推荐文章
				commentList: {
					data: []
				}, //评论列表
				recommendList:[],
				userPostList: {}
			}
		},
		mounted() {
			this.getInfo()
			this.getRecommend()
		},
		methods: {
			// 收藏
			favorites() {
				favorites1({
					id: this.info.id
				}).then(res => {
					if (this.info.is_favorites == 0) {
						this.info.is_favorites = 1
					} else {
						this.info.is_favorites = 0
					}

				}).catch(res => {})
			},
			// ta的文章
			getuserPostList() {
				userPostList({
					uid: this.info.uid
				}).then(res => {
					this.userPostList = res.data

				}).catch(res => {})
			},
			getAttention() {
				attention({
					id: this.info.uid
				}).then(res => {
					if (this.info.is_attention == 0) {
						this.info.is_attention = 1
					} else {
						this.info.is_attention = 0
					}
				}).catch(res => {})
			},
			
			// 获取推荐主播
			getRecommend(){
				getRecommend().then(res => {
					this.recommendList = res.data
				}).catch(res => {})
			},
			// 获取详情
			getInfo() {
				getInfo({
					id: this.$route.query.id
				}).then(res => {
					this.info = res.data.info
					this.next = res.data.next
					this.last = res.data.last
					this.recommend = res.data.recommend
					this.commentList = res.data.commentList
					this.getuserPostList()
				}).catch(res => {})
			}
		}
	}
</script>

<style scoped="scoped">
	.cancelConcern {
		cursor: pointer;
		display: inline-block;
		height: 26px;
		width: 80px;
		line-height: 26px;
		background-image: linear-gradient(90deg, #dfe0f2, #bebfd0);
		color: #fff;
		border-top-left-radius: 3px;
		border-bottom-left-radius: 3px;
		text-align: center;
		font-size: 14px;
		vertical-align: middle;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
</style>
