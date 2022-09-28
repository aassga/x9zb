<!-- 社区 -->
<template>
	<div class="circle-page" style="padding-top: 60px;margin-top: 20px;">
		<div class="page-bg"></div>
		<div style="width: 100%;">
			<div class="" style="">
				<div class="circle-page-nav">
					<div class="circle-page-nav-container">
						<div class="circle-page-nav-mark" style="transform: translateX(0px); width: 106px;"></div>
						<div class="circle-page-nav-item" v-for="(item,index) in tabList" @click="tabIndex=index"
							:class="tabIndex == index?'active':''"><a>
								<div class="lazyload-wrapper ">
									<!-- require('../../assets/images/s'+index+'.png') -->
									<img class="circle-page-nav-icon" :src="item.icon" width="64" height="64">
								</div>
								<div class="circle-page-nav-text">{{item.name}}</div>
							</a></div>
					</div>
				</div>
			</div>
		</div>
		<div class="circle-page-content">
			<div class="circle-page-left-container">
				<div class="circle-page-hot-post">
					<div class="circle-page-hot-post-title">热门帖子</div>
					<div class="circle-page-hot-post-content"></div>
				</div>
				<div class="circle-page-comment-box">
					<!-- <span>210268</span> 位发帖小能手 -->
					<div class="circle-page-comment-box-title">大家都在体育发帖哦～</div><textarea
						placeholder="我也要成为发帖小能手（想尬聊，点这里哦～）" v-model="title"
						class="ant-input circle-page-comment-box-textarea"
						style="caret-color: rgb(222, 173, 91);"></textarea>
					<div class="circle-page-comment-box-operation-panel">
						<div class="circle-page-comment-box-btns">
							<el-popover style="margin-top: 45px;" placement="bottom" width="500" offset="10"
								v-model="visible3" trigger="click">
								<section class="emoji-mart-category" aria-label="Smileys &amp; People">
									<!-- <div data-name="Smileys &amp; People" class="emoji-mart-category-label">
										<span aria-hidden="true">Smileys &amp; People</span>
									</div> -->
									<ul class="emoji-mart-category-list">
										<li v-for="(item,index) in emotion" @click="setEmotion(item)">
											<img class="emoji-mart-emoji emoji-mart-emoji-native"
												:src="`https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif`">
										</li>
										<!-- <li>
											<button aria-label="😀, grinning" title="grinning" class="emoji-mart-emoji emoji-mart-emoji-native" type="button">
												<span style="font-size: 24px; display: inline-block; width: 24px; height: 24px; word-break: keep-all;">😀</span>
											</button>
										</li> -->
									</ul>
								</section>
							</el-popover>
							<div class="circle-page-comment-box-emoji-btn" @click="visible3 = !visible3"></div>
							<!-- 上传图片 -->
							<el-popover style="margin-top: 45px;" placement="bottom" width="500" offset="10"
								v-model="visible" trigger="click">
								<div>
									<div class="ant-popover-title">
										<div class="circle-page-comment-box-pop-title">
											<div>共{{flie.length}}张，还能上传{{flie.length}}张</div>
											<span role="img" aria-label="close" tabindex="-1"
												class="anticon anticon-close" @click="visible = false">
												<i class="el-icon-close"></i>
											</span>
										</div>
									</div>

									<div class="ant-popover-inner-content">
										<div class="circle-page-comment-box-image-pop flex-start">
											<div class="circle-page-comment-box-image-pop-upload-preview"
												v-for="(item,index) in flie" :key="index">
												<div class="circle-page-comment-box-image-pop-upload-player"></div>
												<span @click="del(index)" role="img" aria-label="close" tabindex="-1"
													class="anticon anticon-close circle-page-comment-box-pop-upload-img-del">
													<i class="el-icon-close"></i>
												</span>
												<img :src="item" alt="">
											</div>
											<div class="circle-page-comment-box-image-pop-upload-btn">
												<el-upload class="avatar-uploader"
													:action="'https://'+QiniuToken.uploadHost" :data="QiniuToken"
													:show-file-list="false" :on-success="handleAvatarSuccess1"
													:before-upload="beforeAvatarUpload">
													<span role="img" aria-label="plus" class="anticon anticon-plus"
														style="font-size: 46px; color: rgb(226, 226, 226);">

														<svg viewBox="64 64 896 896" focusable="false" data-icon="plus"
															width="1em" height="1em" fill="currentColor"
															aria-hidden="true">
															<path
																d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z">
															</path>
															<path
																d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z">
															</path>
														</svg>
													</span>
												</el-upload>
											</div>
										</div>
									</div>
								</div>
							</el-popover>
							<div class="circle-page-comment-box-image-btn" @click="uploadType('visible')"></div>
							<el-popover style="margin-top: 45px" placement="bottom" width="500" offset="10"
								v-model="visible1" trigger="click">
								<div>
									<div class="ant-popover-title">
										<div class="circle-page-comment-box-pop-title">
											<div>上传视频，视频文件小于50M</div>
											<span role="img" aria-label="close" tabindex="-1"
												class="anticon anticon-close" @click="visible1 = false">
												<i class="el-icon-close"></i>
											</span>
										</div>
									</div>
									<div class="ant-popover-inner-content" style="padding-top: 10px;">
										<div class="circle-page-comment-box-video-pop"><span class="">
												<div class="ant-upload ant-upload-select ant-upload-select-text">
													<span tabindex="0" class="ant-upload flex-start" role="button">
														<!-- <input type="file" accept="video/*" style="display: none;"> -->
														<el-upload class="avatar-uploader"
															:action="'https://'+QiniuToken.uploadHost"
															:data="QiniuToken" :show-file-list="false"
															:on-success="handleAvatarSuccess2"
															:before-upload="beforeAvatarUpload2">
															<span style="display: block;text-align: left;">上传视频</span>
															<div class="circle-page-comment-box-video-pop-upload-btn"
																v-if="!flieT[0].video"><span role="img"
																	aria-label="plus" class="anticon anticon-plus"
																	style="font-size: 46px; color: rgb(226, 226, 226);"><svg
																		viewBox="64 64 896 896" focusable="false"
																		data-icon="plus" width="1em" height="1em"
																		fill="currentColor" aria-hidden="true">
																		<path
																			d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z">
																		</path>
																		<path
																			d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z">
																		</path>
																	</svg>
																</span>
															</div>
															<div id=""
																class="circle-page-comment-box-video-pop-upload-btn"
																v-else>
																<img width="180" height="120"
																	:src="'url='+flieT[0].video +'+?vframe/jpg/offset/0'">
															</div>
														</el-upload>

														<!-- 上传封面 -->
														<el-upload class="avatar-uploader"
															:action="'https://'+QiniuToken.uploadHost"
															:data="QiniuToken" :show-file-list="false"
															:on-success="handleAvatarSuccess3"
															:before-upload="beforeAvatarUpload3">
															<span style="display: block;text-align: left;">上传封面</span>
															<div class="circle-page-comment-box-video-pop-upload-btn"
																v-if="!flieT[0].img"><span role="img" aria-label="plus"
																	class="anticon anticon-plus"
																	style="font-size: 46px; color: rgb(226, 226, 226);"><svg
																		viewBox="64 64 896 896" focusable="false"
																		data-icon="plus" width="1em" height="1em"
																		fill="currentColor" aria-hidden="true">
																		<path
																			d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z">
																		</path>
																		<path
																			d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z">
																		</path>
																	</svg>
																</span>
															</div>
															<div id=""
																class="circle-page-comment-box-video-pop-upload-btn"
																v-else>
																<img width="180" height="120" :src="flieT[0].img">
															</div>
														</el-upload>
													</span>
												</div>
											</span>
										</div>
									</div>

								</div>
							</el-popover>
							<div class="circle-page-comment-box-video-btn" @click="uploadType('visible1')"></div>

							<el-popover style="margin-top: 45px" placement="bottom" width="500" offset="10"
								v-model="visible2" trigger="click">
								<div class="ant-popover-title">请选择圈子</div>
								<div class="ant-popover-inner-content" style="padding-top: 10px;">
									<div class="circle-page-comment-box-circle-pop">
										<div class="circle-page-comment-box-circle-pop-content">
											<div class="circle-page-comment-box-circle-pop-item"
												@click="classification_id = index,visible2=false"
												v-for="(item,index) in tabList" :key="index">
												<img :src="item.icon" alt="">
												<div>{{item.name}}</div>
											</div>
										</div>
									</div>
								</div>
							</el-popover>
							<div class="circle-page-comment-box-circle-btn" v-if="classification_id == null"
								@click="uploadType('visible2')"></div>
							<div class="circle-page-comment-box-selected-circle" @click="visible2 = !visible2"
								v-if="classification_id != null">
								<div class="circle-page-comment-box-circle-pop-item">
									<img src="https://sta-prod-pic.hzmgrn.com/avatar/7d24648f4bba6a321a980e08f19cdd08.png"
										alt="">
									<div>{{tabList[classification_id].name}}</div>
								</div>
								<span role="img" @click.stop="classification_id = null,visible2=false"
									aria-label="close" tabindex="-1" class="anticon anticon-close"
									style="color: rgb(216, 173, 102);">
									<svg viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em"
										height="1em" fill="currentColor" aria-hidden="true">
										<path
											d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z">
										</path>
									</svg>
								</span>
							</div>

						</div>
						<div>
							<div class="circle-page-comment-box-submit-btn " :class="title.length != 0?'':'disabled'"
								@click="submit()">发帖</div>
						</div>
					</div>
				</div>
				<div class="circle-page-list">
					<div>

						<div class="circle-page-list-item" v-for="(item,index) in allcircleList.data">
							<div class="circle-page-list-item-profile">
								<router-link class="circle-page-list-item-profile-left" tag="a" target="_blank"
									:to="'/circle-detail?id='+item.id">
									<div class="lazyload-wrapper "><img class="circle-page-list-item-author-icon"
											:src="item.avatar" width="48" height="48"></div>
									<div class="circle-page-list-item-author-name">{{item.user_nickname}}</div>
								</router-link>
								<div class="circle-page-list-item-profile-right">
									<div class="circle-page-list-item-post-date">{{item.addtime}}</div>
									<div class="circle-page-list-item-dianzan-count" @click="likes(item)"
										:class="item.is_likes == 1?'active':''">{{item.likes}}</div>
									<div class="circle-page-list-item-comment-count" @click="$common.gotDown()">
										{{item.comment}}</div>
								</div>
							</div>
							<div class="circle-page-list-item-content">
								<div class="circle-page-list-item-content-info">
									<router-link class="circle-page-list-item-content-text" tag="a" target="_blank"
										:to="'/circle-detail?id='+item.id" v-html="getText(item.title)">
										<!-- {{item.title}} -->
									</router-link>
									<div class="circle-page-list-item-content-sub-info">
										<span class="circle-page-list-item-circle-name" target="_blank"
											href="/community/circle-list?circleId=1">{{item.classification_name}}</span>
									</div>
								</div>
								<div class="circle-page-list-item-content-imgs"
									v-if="item.is_flie_type == 0 && JSON.stringify(item.flie) != '[]'">
									<div class="lazyload-wrapper ">
										<img class="circle-page-list-item-content-img item-index-0" preview="1"
											v-if="item.flie" :src="item.flie[0]" width="220" height="152">
									</div>
								</div>
							</div>
						</div>

					</div>
					<div class="circle-page-list-box">
						<!-- <div class="circle-page-list-load-more"
							@click="allcircleList.data.length <= allcircleList.total?'':getmore()">
							{{allcircleList.data.length <= allcircleList.total?'没有更多了':'点击加载更多'}}</div> -->
						<div class="circle-page-list-load-more" @click="allcircleList.data.length >= allcircleList.total?'':getmore()">{{allcircleList.data.length >= allcircleList.total?'没有更多了':'点击加载更多'}}</div>
					</div>
				</div>
			</div>
			<div class="circle-page-right-container">
				<div style="width: 100%;">
					<div class="" style="">
						<div class="circle-page-post-rank">
							<div class="circle-page-post-rank-title">
								<div class="circle-page-post-rank-title-text">热贴排行</div>
								<div class="circle-page-post-rank-range-list">
									<div class="circle-page-post-rank-range-item" :class="index == hotIndex?'active':''"
										@click="hotIndex = index" v-for="(item,index) in hotList" :key="index">{{item}}
									</div>
								</div>
							</div>
							<div class="circle-page-post-rank-content">
								<div class="li" style="border-bottom: 1px solid #f2f2f2;padding: 16px 16px 16px 0;" v-for="(item,index) in hotPostList" :key="index">
									<router-link style="height: 40px; line-height: 20px;" class="circle-page-post-rank-content-text text-clamp2" tag="a" target="_blank" :to="'/circle-detail?id='+item.id" v-html="getText(item.title)">
									</router-link>
									<div class="flex" style="color: #9497a4; font-size: 12px;padding-right: 16px;">
										<span>{{$common.timeStamp1(item.addtime)}}</span>
										<span>热度：{{item.click}}</span>
									</div>
								</div>
								
								<div class="circle-page-post-rank-is-empty" v-if="hotPostList.length == 0">
									<div class="circle-page-post-rank-is-empty-text">暂无数据</div>
								</div>
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
		add,
		likes,
		hotPost,
		circleHot,
		classification,
		designatedCategory,
	} from '@/api/circleuser.js'
	import emotion from '../persona/emotion.json'
	export default {
		data() {
			return {
				page: 1,
				title: '',
				tabIndex: 0,
				emotion: emotion,
				hotList: ['日', '周', '月'],
				hotIndex: 0,
				flie: [], //上传的图片
				// uploadType:'',
				flieT: [{
					img: '',
					video: ''
				}], //上传的视频
				visible: false,
				visible1: false,
				visible2: false,
				visible3: false,
				allcircleList: {
					data: []
				},
				hotPostList:[],
				tabList: [],
				imgsrc: '', //图片问题
				classification_id: null,
			}
		},
		mounted() {
			this.hotPost()
			this.circleHot()
			this.classification()
		},
		
		computed: {
			infos() {
				return this.$store.state.infos
			},
			QiniuToken() {
				return this.$store.state.user.QiniuToken
			}
		},
		watch: {
			hotIndex(){
				this.hotPost()
			},
			tabIndex(e) {
				this.page = 1
				if (e == 0) {
					this.circleHot()
				} else {
					this.designatedCategory()
				}
				
			}
		},
		methods: {
			// 热帖排行
			hotPost(){
				hotPost({type:this.hotIndex}).then(res=>{
					this.hotPostList = res.data
				}).catch(res=>{})
			},
			
			// 选择聊天表情
			setEmotion(item) {
				this.title = this.title + item
				// console.log(item);
			},
			
			// 其他分类列表
			designatedCategory() {
				let data = {
					page: this.page,
					id: this.tabList[this.tabIndex].id
				}
				designatedCategory(data).then(res => {
					if (this.page == 1) {
						this.allcircleList = res.data.list
						console.log(this.allcircleList);
					} else {

						this.allcircleList.data = [...this.allcircleList.data, ...res.data.list.data]
					}
				}).catch(res => {})
			},

			getmore() {
				this.page++
				this.circleHot()
			},

			// 点赞
			likes(item) {
				likes({
					id: item.id
				}).then(res => {
					this.$message.success('操作成功')
					if (item.is_likes == 1) {
						item.likes--
						return item.is_likes = 0
					} else {
						item.likes++
						return item.is_likes = 1
					}

				}).catch(res => {})
			},

			uploadType(e) {
				let _this = this
				if (e == 'visible' && (this.flieT[0].img || this.flieT[0].video)) {
					this.rel('确定放弃上传视频吗？', e)
				} else if (e == 'visible1' && this.flie.length != 0) {
					// title = 
					this.rel('确定放弃上传图片吗？', e)
				} else {
					_this[e] = !_this[e]
				}


			},

			rel(title, e) {
				let _this = this
				this.$confirm(title, '确认信息', {
						distinguishCancelAndClose: true,
						confirmButtonText: '取消',
						cancelButtonText: '确定'
					})
					.then(() => {

					})
					.catch(action => {
						if (e == 'visible') {

							_this.visible = true
							_this.visible1 = false
							_this.flie = []
						} else {
							_this.visible = false
							_this.visible1 = true
							_this.flieT = [{
								img: '',
								video: ''
							}]
						}

					});
			},


			// 删除已上传的图片
			del(index) {
				this.flie.splice(index, 1)
				console.log(this.flie);

			},
			// 圈子分类
			classification() {
				classification().then(res => {
					this.tabList = res.data

				}).catch(res => {

				})
			},

			// 定义上传图片名称
			beforeAvatarUpload(file) {

				let QiniuToken = this.$store.state.user.QiniuToken
				console.log(QiniuToken);
				const fileName =
					new Date().valueOf().toString() +
					this.$common.rand() +
					file.name.slice(file.name.lastIndexOf("."));
				QiniuToken.data = file;
				QiniuToken.key = `${fileName}`;
			},
			handleAvatarSuccess1(res) {
				this.$message.success('图片上传成功')
				this.flie.push(`${this.QiniuToken.domain}/${res.key}`)
			},
			// 视频
			handleAvatarSuccess2(res, file, fileList) {
				this.flieT[0].video = `${this.QiniuToken.domain}/${res.key}`
				this.$message.success('图片上传成功')
				// console.log(this.flieT[0]);

			},

			// 定义上传图片名称（封面
			beforeAvatarUpload3(file) {

				let QiniuToken = this.$store.state.user.QiniuToken
				const fileName =
					new Date().valueOf().toString() +
					this.$common.rand() +
					file.name.slice(file.name.lastIndexOf("."));
				QiniuToken.data = file;
				QiniuToken.key = `${fileName}`;
			},
			// 封面
			handleAvatarSuccess3(res) {
				this.$message.success('封面上传成功')
				this.flieT[0].img = `${this.QiniuToken.domain}/${res.key}`
			},
			// 转换文字1.查询切换[]有的内容，替换
			getText(str) {
				// let str = 'jfkdsj[咒骂]dsjfkljsa[憨笑]哈哈哈，[惊恐]'
				let exp = /\[(.*?)\]/g; //匹配[*] 大括号里面任意内容的正则
				let arr = str.match(exp); //字符串匹配出来的数组
				// console.log(arr);
				if (!arr) return str;
			
				this.emotion.forEach((item1, index) => {
					arr.map(item => {
						// console.log(item1);
						if (item1 === item) {
							str = str.replace(item,
								`<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif'>`
							);
						}
					}); //循环遍历
				})
				// let arrNum = 取出所有正则匹配值并转换为input
			
				// console.log(str);
				return str;
			},
			// 视频
			beforeAvatarUpload2(file) {
				let QiniuToken = this.$store.state.user.QiniuToken
				const isLt10M = file.size / 1024 / 1024 < 50;
				if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'].indexOf(file.type) == -
					1) {
					this.$message.error('请上传正确的视频格式');
					return false;
				}
				if (!isLt10M) {
					this.$message.error('上传视频大小不能超过50MB哦!');
					return false;
				}
				const fileName =
					new Date().valueOf().toString() +
					this.$common.rand() +
					file.name.slice(file.name.lastIndexOf("."));
				QiniuToken.data = file;
				QiniuToken.key = `${fileName}`;
			},
			// 热门圈子列表 
			circleHot() {
				circleHot({
					page: this.page
				}).then(res => {
					// res.data.classification ---- 头部的切换列表
					// res.data.refining ----- 热门帖子
					// res.data.list ---------普通列表
					if (this.page == 1) {
						this.allcircleList = res.data.list

					} else {

						this.allcircleList.data = [...this.allcircleList.data, ...res.data.list.data]
					}

				}).catch(res => {

				})
			},

			// 用户发帖
			submit() {
				if (JSON.stringify(this.infos) == '{}') {
					return this.$store.state.user.showLoginMask = true
				}

				if (this.classification_id == null) return this.$message.warning('请选择圈子')
				let data = {
					title: this.title,
					classification_id: this.tabList[this.classification_id].id,
				}
				if (!data.title) return this.$message.warning('请输入内容')
				if (this.flieT[0].video && !this.flieT[0].img) return this.$message.warning('请上传视频封面')
				if (this.flieT[0].img && !this.flieT[0].video) return this.$message.warning('请上传视频')
				if (this.flie.length != 0) {
					data.flie = this.flie
				} else if (this.flieT[0].video) {
					data.flie = this.flieT
				}
				add(data).then(res => {
					this.circleHot()
					this.flie = []
					this.visible = false
					this.visible1 = false
					this.visible2 = false
					this.title = ''
					this.flieT = [{
						img: '',
						video: ''
					}]
					this.$message.success('审核中')
				}).catch(res => {})
			}
		}
	}
</script>

<style scoped>
	/* @import url("~@/styles/circle.css"); */
	.ant-popover-title {
		min-width: 177px;
		min-height: 32px;
		margin: 0;
		padding: 5px 16px 4px;
		color: rgba(0, 0, 0, .85);
		font-weight: 500;
		border-bottom: 1px solid #f0f0f0;
	}

	.ant-popover-content {
		box-shadow: 0 0 15px 0 rgb(0 0 0 / 12%);
		border-radius: 5px;
		overflow: hidden;
	}
</style>
