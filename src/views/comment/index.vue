<!-- 评论 -->
<template>
	<div class="anchor-dynamic-detail-home-page" style="margin: 0 auto;">
		<div class="breadcrumb" style="padding-top: 60px;"><span class="adress">当前位置： </span><span class="breadcrumb-link"><a href="/">首页</a><span
					class="breadcrumb-arrow">&gt;</span></span><span class="breadcrumb-link"><a
					href="/personal-space?headerNavIndex=2&amp;id=2163615">主播动态</a><span
					class="breadcrumb-arrow">&gt;</span></span><span class="breadcrumb-title">详情</span></div>
		<div class="anchor-dynamic-detail-home-page-main">
			<div class="left-content">
				<div class="anchor-dynamic-header-wraps">
					<div class="header-img">
						<div class="lazyload-wrapper "><img class="anchorHeader"
								v-if='dateil.info' :src="dateil.info.avatar">
						</div>
					</div>
					<div class="other-info"v-if="dateil.info">
						<div class="title">{{dateil.info.user_nickname}}</div>
						<div class="time-info" ><span>{{dateil.info.addtime}}</span><a target="_blank"
								href="anchor/live?anchorId=101555">进入直播间</a></div>
					</div>
					<div class="btn">＋ 关注</div>
				</div>
				<div class="anchor_news_content_wraps">
					<a class="content" target="_blank"
						href="/anchor-dynamic?postId=100273">
						<p v-if="dateil.info">{{dateil.info.content}}</p>
					</a>
					<div class="anchor-news-imglist">
						<!-- img-box-one-wrapper 单张 《img-box-wrapper 多张》 -->
						<!-- 图片  -->
						<div class="anchor-news-imglist" v-if="dateil.info && dateil.info.is_flie_type == 0">
							<div class="img-box-wrapper"
								:class="dateil.info.flie.length == 1?'img-box-one-wrapper':''"
								v-for="(item1,index1) in dateil.info.flie"><img :src="item1">
							</div>
						</div>
					
						<!-- 视频 -->
						<div class="img-box-one-wrapper" style="position: relative;" v-else>
							<img :src="dateil.info.flie[0].img">
							<div class="mask"><img
									src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHYAAAB4CAMAAAAQc/ZTAAAApVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+4/eNVAAAANnRSTlMA8/j8CQNFw7egjD0mEu7kmTYyGermvqZp3s6tSyIdDoN2bmZXKwbb0cmqYVIWDNiye1sukofJUFtWAAADkUlEQVRo3tXah1LiUACF4ZObRgihhN6RoiBV0PP+j7bjumNGVLgtmdnvBf6B5OaWBP+LZrydvUbPpXATlobR61svGPvI1WQbrQW/E8fhfIVcTJf1Pm9pdxdN2OWPuoL3uaWzB2tW5TZlOVEMK9Ih1YQBjMUlqhvsYKRSop51DG3eTFBbtIeeUZ8mqj0f6g5dmgonUHU50lxrBDULQSvKPuQ9dmlLuIesaYf2PI0hZz+gTe0LZIz7tMuJcV+lTdtEgHuafdrnpLhtumYeWhXc4nWYj34TNzwzL2sPv5ozPxF+kwrm6IyfTfvMk1MxuLDWL++SeXvDd4ca8yYq+KbM/HVw7eKyAEtcCVmE9gFfjFiMF4Mfa6DlAZmYRZkDmRKLUnvEpwaLs8CniMUZZJO7wwKt8M+ZRSqr31Cth8auLmik5uOvpitdXQFAs+7SRKC6lNnhQ+WZBur4a0hZ2ZhLO9TWxzu/SkkOkAkG1DUGgJRK2czyiXq2APCgm4W/qFFHV234OLjmPVSprgYAbYMskJQFle2BKQ2ymsM4BhqmWaAyVJ+FzuZZoNFRfSzPDLK6w/gEPBtkdYfxEejYysLvtSmnCmyMsxnvpUoZAjhayGaSruScUrOSzZwoIUHVcrYhNwe5lrOPcss4x3K2SQkVtC1nHyihiSe72UBQwgEDm9lJRBkuEGpmTeZeBzgZZ7NHlMLy4tU0mz2QpYVATzNrsoqsA4Fm1mTN/ABMjLONDhWNADiaWYP9UAXAwCCrt/sTPoCyfjZ5E9pngCPlbLYlMDgTm7rSWaMNUCYGoLCaEsjsjtTl+Hj3pnIHfgg21FdSPQw7+XiXlmiihw9PlNVNgFWXRkSCDy+UJgZtGhrinzGLtCvwNDlTzY57tizOKz491lgUd2L6TtH8DaPXYjHcytWiuhhdfDGtsgjuBV8tWIQ6rm2Yv1aCa6nL3G3x3SvzFuIH0xrzJVb4SewyVwuDHbGtIVvUq76nA36T1JgXccHvUof5cJcaRw/merht5zIHM9zTo3113De3X/Uh4SyK/IczgUOL5pDVaNEWsYS8SUg7+g2o8Mu0YZhA0cj8jxZzqJucaGaTGnwFbvINePHfvEd7GBhHLjWUGjA0Uf/OYpjCgma5RXkiWsGSx91QUEpne4BNSa9zr+xuXiawzwtm4a/pdXk0RW4OjfPseS2YEcdTeRsnKIK3H1/iIE7Hew//kz/wxRSXLXEZwAAAAABJRU5ErkJggg==">
							</div>
						</div>
					</div>
					<div class="oter_info_wrap anchor_personal_page">
						<div class="item pl_item"><span class="pl_bg icon_bg"></span><span class="num">{{dateil.info.comment}}</span></div>
						<div class="item dz_item" @click="anchorDynamicsCommentLikes(dateil.info)"><span class="dz_bg icon_bg " :class="dateil.info.is_likes == 1?'dz_click':''"></span><span class="num">{{dateil.info.like}}</span></div>
						<div class="item fx_item"><span class="fx_bg icon_bg"></span><span class="num">分享</span></div>
						<div>
							<div class="item jb_item "><span class="jb_bg icon_bg"></span><span class="num">举报</span>
							</div>
						</div>
					</div>
				</div>
				<div class="comment_wrap">
					<div class="all_coment">全部评论</div>
					<div class="anchor_news_comment_input_wraps">
						<div class="anchor_news_comment_input_left "><input type="text" class="input_"
								placeholder="说点什么吧" value="" v-model="content">
							<div class="emoj-wrap">
								<div class="common-emoji">
									<div class="eomj-icon"></div>
								</div>
							</div>
						</div><button class="submit_btn" @click="setDynamicsComment(dateil.info,1)">发送</button>
					</div>

					<div class="comment_item_ " v-for="(item,index) in list.data" :key="index">
						<div class="anchor_news_comment_item_wraps">
							<div class="lazyload-wrapper "><img class="touxiang"
									:src="item.avatar">
							</div>
							<div class="comment_other_info">
								<div class="name_title_wrap">
									<div class="name_title"><span class="name" v-if="item.user_nickname">{{item.user_nickname}}</span>{{item.content}}</div>
								</div>
								<div class="time_zan"><span class="time">{{item.addtime}}</span><span class="replay" @click="setComment(item)">
										<!-- -->&nbsp;回复&nbsp;
									</span>
									<div class="item dz_item" @click="anchorDynamicsCommentLikes(item)"><span class="dz_bg icon_bg" :class="item.is_likes == 1?'dz_click':''"></span><span
											class="num">{{item.likes}}</span></div>
								</div>
							</div>
						</div>
						<!-- ------------------------是否有二级评论------------------ -->
						<div class="check_more_sub_reply_tip" v-if="item.comment != 0" @click="commentList(item)">
							<span class="line">
						
							</span>
							<span>查看回复</span>
							<span class="reply_count">{{item.comment}}</span>
						</div>
						<div class="reply_input_ reply_input_1"></div>
						<!-- 二级评论 -->	
						<div v-if="item.isShow">
							<div class="reply_list_layer2" v-for="(children,cIndex) in item.children.data">
								<div class="reply_list_layer2_item">
									<div class="anchor_news_comment_item_wraps layer2_">
										<div class="lazyload-wrapper "><img class="touxiang"
												:src="children.avatar">
										</div>
										<div class="comment_other_info">
											<div class="name_title_wrap" >
												<div class="name_title"><span
														class="name layer2_name"><span v-if="item.user_nickname">{{children.user_nickname}}</span><span class="txt">
															&nbsp;回复&nbsp; </span><span v-if="item.user_nickname">{{item.user_nickname}}</span></span>{{children.content}}</div>
											</div>
											<div class="time_zan"><span class="time">{{children.addtime}}</span>
												<div class="item dz_item" @click="anchorDynamicsCommentLikes(children)"><span class="dz_bg icon_bg " :class="children.is_likes == 1?'dz_click':''"></span><span
														class="num">{{children.likes}}</span></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						
						<!-- -------------------点击回复触发------------------------- -->
						<div class="reply_input_ reply_input_2" v-if="isComment == item.id">
							<div class="anchor_news_comment_input_wraps">
								<div class="anchor_news_comment_input_left "><input type="text" class="input_"
										:placeholder="'回复： '+isrep.user_nickname" v-model="content2" value="">
									<div class="emoj-wrap">
										<div class="common-emoji">
											<div class="eomj-icon"></div>
										</div>
									</div>
								</div><button class="submit_btn" @click="setDynamicsComment(dateil.info,2)">发送</button>
							</div>
						</div>
					</div>
					<div class="page-box"></div>
				</div>
			</div>
			<div class="right-recommend">
				<div class="anchor-dynamic-other">
					<div class="header"><span class="title">其他动态</span></div>
					<div class="empty-box">
						<div class="common-empty-view">
							<el-empty :image-size="140" :image="require('../../assets/images/qsy.png')"></el-empty>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { anchorDynamicsList,commentList,setDynamicsComment,anchorDynamicsCommentLikes,setDynamiclikes } from '../../api/user.js'
	export default {
		data() {
			return {
				page:1,
				page1:1,//二级评论分页
				list:{},
				router:{},
				dateil:{},
				content2:'',//二级输入框
				isrep:{},//选中的二级回复内容
				content:'',//输入框
				childrenlist:{},
				children:false,
				isComment:null,//点击对应的评论显示输入框
			}
		},
		// computed:{
		// 	infos(){
		// 		return this.$s
		// 	}
		// },
		mounted(){
			this.router = this.$route.query
			this.anchorDynamicsList()
		},
		methods:{
			// 动态评论点赞
			anchorDynamicsCommentLikes(item){
				anchorDynamicsCommentLikes({id:item.id}).then(res=>{
					if(item.is_likes == 1) {
						item.likes --
						item.is_likes = 0
					}else {
						item.likes ++
						
						item.is_likes = 1
					}
					console.log(item.is_likes);
				}).catch(res=>{})
			},
			// 动态点赞
			commentLikes(item){
				setDynamiclikes({id:item.id}).then(res => {
					console.log(item.is_likes);
					if(item.is_likes == 1) {
						item.is_likes = 0
						item.like ++
					}else {
						item.like --
						item.is_likes = 1
					}
					
				}).catch(res => {})
			},
			
			
			// 动态评论
			setDynamicsComment(item,type){
				let data = {
					id:item.id,
					content:type == 1?this.content:this.content2
				}
				console.log(this.isrep);
				if(type == 2){
					data.cid = this.isrep.id
				}
				setDynamicsComment(data).then(res=>{
					this.anchorDynamicsList()
				}).catch(res=>{})
			},
			
			// 获取二级列表
			commentList(item){
				let data = {
					id:item.id,
					page:this.page
				}
				if(item.isShow) return item.isShow = !item.isShow
				commentList(data).then(res=>{
					item.children = res.data
					item.isShow = !item.isShow 
				}).catch(res=>{})
			},
			// 显示隐藏输入框（二级）
			setComment(item){
				if(this.isComment == item.id) return this.isComment = null
				this.isComment = item.id
				this.isrep = item
			},
			// 获取详情
			anchorDynamicsList(){
				let data = {
					id:this.router.id,
					page:this.page
				}
				anchorDynamicsList(data).then(res=>{
					
					res.data.list.data.forEach(item=>{
						item.isShow = false
					})
					this.dateil = res.data
					this.list = res.data.list
					console.log(this.dateil);
				}).catch(res=>{
					
				})
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
	.dz_click {
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAk5JREFUWAnlVr9PFFEQntk9QTqstDwx0cpYERMSCtBQYzgSYyCh0gjBwr/AVkv8QWkokApoIJCLeibGwmgwMUYqE3uJGkIQ4+6O34u8x97e3Lq5vduGV9x78828mW/nzXtzRMd9cDsS8PLR2OUwihaJJBD2J0Zml99n9etlNUyzCyWaEpJzQnSBJVx7/eTGqTT7uK4tBESozzoFidO/g1+TVv7f3BYCzFSOBxKWobicts5NoDZ/vSwi5+NBhPhsXE5b5yYQ/DmYUAJ0K5gK5SJQezrVK0x3Fc+7CqZCuQgEez/vk1BDxTPJDzWaArZMoPrw2jiq/6bik1CUnzRcw1oi8OJxZYCFFjSH/zDu3EP0fK4yGIbBBh6enmYEfC5lJsDNnDTDq3OjB9ClVjkTv8NbEGk+WHiffXpwdWZ10+hL1giO32A9YGU74zxxzXl55M7q+CGWGtzYIDv9+FEHdARqZSj7jIGrAaTiogGSA4UGlVSSeB4ZWThj9zsCuM87Fuz4zPTVxnAEiPibBQuYt20MRwBHXVwGRD40EEAGCiPA/tE74TKAYiuEgLlV3dzztiEDUBRTA0Lbg9PPXK84ygAXdARMr+zXm9kR8KQYAnhWdALiRR2vAXP+J7pO1tQMoIF0vAZQ6FtDt5bqPtQdQRQFdYo4y7at2asmfTkCV2YuoTJZ7WDJTa3K6Hzryb2OAPO9CEf0PWmQlNGZPiexLDJa9Mfh2RXTceuGI3CIbphCqbOAgM1fLFZifwxIlZnN/4JMA7Z7nu/fzmR87Iz+Ankhn27LoKxuAAAAAElFTkSuQmCC) no-repeat 50% !important;
		background-size: contain
	}
</style>
