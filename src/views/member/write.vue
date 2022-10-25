<!-- 创作 -->
<template>
	<div class="creation-page-container">
		<div class="publish-button">
			<el-popover placement="bottom" trigger="hover">
				<div class="creation-page-publish-select">
					<div class="option" @click="imgMask= true,imgVideo=false">发图文</div>
					<div class="option" @click="imgMask= true,imgVideo=true">发视频</div>
				</div>
				<button slot="reference" class="i-button i-primary-image-button  i-block-button">发布</button>
			</el-popover>
		</div>

		<div class="i-tabs-container">
			<div class="header-nav">
				<a>
					<div class="item" :class="{'first-item':tabIndex == 0}" @click="tabIndex = 0">资讯</div>
				</a>
				<a>
					<!--   -->
					<div class="item first-active" :class="{'first-item':tabIndex == 1}" @click="tabIndex = 1">视频</div>
				</a>
			</div>
			<div class="tab-pane-item" name="资讯">
				<div class="creation-news-container">
					<ul class="news-list">
						<li class="news-item" v-for="(item,index) in list.data" :key="index">
							<div class="left-wrap">
								<div class="new-cover" :class="{'is-video':tabIndex == 1}">
									<img :src="item.img" v-if="tabIndex == 0">
									<img v-if="item.flie && tabIndex == 1" :src="item.flie[0].img" >
								</div>
								<div class="new-info">
									<p class="title">{{item.title}}</p>
									<div class="news-data">
										<span class="date">{{item.addtime}}</span>
										<span class="read-num">阅读 {{item.click}}</span>
										<span class="">点赞 {{item.likes}}</span>
										<span class="">评论 {{item.comment_count}}</span>
									</div>
								</div>
							</div>
							<div class="right-wrap">
								<!-- news-status checking 审核中 -->
								<div class="news-status success" v-if="item.status == 1">已发布</div>
								<div class="news-status checking" v-if="item.status == 0">审核中</div>
								<div class="operations">
									<!-- <span class="update" @click="edit(tabIndex,item)">修改</span>
									<span class="vertical-line">|</span> -->
									<span class="delete" @click="del(tabIndex,item)">删除</span>
								</div>
							</div>
						</li>
					</ul>
					<ul class="ant-pagination" v-if="list.total != 0" unselectable="unselectable"
						style="width: 100%; text-align: center;">
						<el-pagination background class="ant-pagination" @current-change="sizeChange"
							layout="prev, pager, next" :total="list.total">
						</el-pagination>
					</ul>
					<el-empty :image-size="300" v-if="list.total == 0" :image="require('../../assets/images/qsy.png')">
					</el-empty>
				</div>
			</div>
		</div>

		<!-- 发布图文弹窗 -->
		<el-dialog :visible.sync="imgMask" custom-class="dialog" :destroy-on-close="false" :close-on-click-modal="false">
			<div class="creation-news-picture-modal">
				<div class="picture-modal-containe">
					<div class="ant-modal-content">
						<div class="ant-modal-body">
							<div class="picture-dialog-content">
								<div class="form">
									<div class="news-title">
										<input type="text" v-model="title" placeholder="输入5-30字的标题" maxlength="30"
											value="">
										<span class="text-total">{{title.length}}/30</span><i class="icon-clear"></i>
									</div>
									<div class="news-content-wrap"  v-if="!imgVideo">
										<div id="editor" data-we-id="wangEditor-1">
											<div style="background-color:#FFF; border:1px solid #c9d8db; border-bottom:1px solid #EEE; z-index:10001;"
												class="w-e-toolbar" id="toolbar-elem13589806312929653">
												<div class="w-e-menu" data-title="图片"><i class="w-e-icon-image"></i>
												</div>
												<div class="w-e-menu-tooltip w-e-menu-tooltip-up"
													style="visibility:hidden; z-index:10001;">
													<div class="w-e-menu-tooltip-item-wrapper">
														<div></div>
													</div>
												</div>
											</div>
											<div style="border:1px solid #c9d8db; border-top:none; z-index:10000;"
												class="w-e-text-container">
												<textarea v-model="content"
													style="width: 98%;min-height: 300px;margin: 10px;" rows=""
													placeholder="输入正文 5000字以内" cols=""></textarea>
											</div>
										</div>
										<div class="video-select-tags select-tags clearfix"
											v-if="JSON.stringify(match_id) != '{}'">
											<div class="tag-item">
												<img :src="match_id.logo" alt="" title="">
												<span class="tag-name" title="">{{match_id.short_name_zh}}</span>
												<i class="icon-remove" @click="match_id = {}"></i>
											</div>
											<div class="bottom-white-bar"></div>
										</div>
									</div>
									<div class="media-cell flex-start">
										<div style="margin-right: 20px;">
											<div class="cell-title">上传封面</div>
											<span class="">
												<el-upload class="avatar-uploader" action="https://up-z2.qiniup.com"
													:data="QiniuToken" :show-file-list="false"
													:on-success="handleAvatarSuccess1"
													:before-upload="beforeAvatarUpload">
													<div v-if="!img" class="video-box"></div>
													<img v-else :src="img" style="176px" height="118px">
												</el-upload>
											</span>
										</div>
										<div v-if="imgVideo">
											<div class="cell-title">上传视频 </div>
											<span class="">
												<el-upload class="avatar-uploader" action="https://up-z2.qiniup.com"
													:data="QiniuToken" :show-file-list="false"
													:on-success="handleAvatarSuccess2"
													:before-upload="beforeAvatarUpload2">
													<div v-if="!flie[0].video" class="video-box"></div>
													<img v-else :src="!flie[0].video" style="176px" height="118px">
												</el-upload>
											</span>
										</div>
									</div>
									<div class="news-bottom-operation">
										<div class="add-info-btn">
											<!-- <div class="add-picture-button"></div> -->
											<div class="i-select-container " v-if="!imgVideo"
												style="width: 122px; margin-right: 16px;">
												<el-select v-model="cid" placeholder="请选择类型">
													<el-option v-for="item in classList" :key="item.id"
														:label="item.name" :value="item.id"></el-option>
												</el-select>
											</div>
											<div v-if="!imgVideo" class="add-tags-button" @click="label = true">添加标签
											</div>
										</div>
										<div class="operation">
											<div class="cancel-button" style="margin-right: 10px;">
												<button class="i-button i-default-button  i-block-button"
													style="font-size: 16px;" @click="imgMask= false">取消</button>
											</div>
											<!-- <div class="save-button">存为草稿</div> -->
											<div class="confirm-button">
												<button class="i-button i-primary-image-button  i-block-button"
													style="font-size: 16px;" @click="addInsert(imgVideo)">发布</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</el-dialog>
		<!-- 选择标签 -->
		<el-dialog title="选择标签" :visible.sync="label">
			<div style="padding: 20px;">
				<div>
					<!-- <div class="group-name">标题</div> -->
					<div class="flex-wrap">
						<div class="tag-item" v-for="(item,index) in hot_match" @click="match_id = item,label=false"
							:key="index"
							style="background-color: hsla(240,3%,85%,.25);padding: 4px 8px;margin-top: 10px;">
							<img :src="item.logo" alt="" title="">
							<span class="tag-name" title="item.short_name_zh">{{item.short_name_zh}}</span>
						</div>
					</div>
				</div>
				<div class="tags-dialog-footer">
					<div class="confirm-button">
						<button class="i-button i-primary-image-button  i-block-button" style="font-size: 16px;">
							确定
						</button>
					</div>
				</div>

			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		classifyList,
		addInsert
	} from '@/api/user.js' //分类/添加/
	import {
		initialList
	} from '@/api/search.js' //赛事标签
	import {
		videoDelete,
		userPostList,
		addinsertVidoe,
		HeadlinesDelete,
		userPostVideoList,
	} from '@/api/headline.js' //头条/视频

	export default {
		data() {
			return {
				page: 1,
				list: {},
				tabIndex: 0,
				cid: null, //分类id
				title: '',
				content: '',
				img: '', //封面
				label: false,
				imgVideo: false,
				imgMask: false,
				match_id: {},
				hot_match: [],
				classList: [],
				flie: [{
					img: '',
					video: ''
				}]
			}
		},
		computed: {
			QiniuToken() {
				return this.$store.state.user.QiniuToken
			}
		},
		watch: {
			tabIndex(e) {
				if (e == 1) {
					this.userPostVideoList()
				} else {
					this.userPostList()
				}
			}

		},
		mounted() {
			this.userPostList()
			this.initialList()
			this.getcClassify()
		},
		methods: {
			// 
			
			// 删除
			del(index,item){
				let data = {
					id:item.id
				}
				if(index== 0 ){
					HeadlinesDelete(data).then(res=>{
						this.$message.success('操作成功')
						this.userPostList()
					}).catch(res=>{})
				}else {
					videoDelete(data).then(res=>{
						this.$message.success('操作成功')
						this.userPostVideoList()
					}).catch(res=>{})
				}
			},
			// 修改
			edit(index,item){
				if(index== 0 ){
					// cid: this.cid,
					// title: this.title,
					// img: this.img,
					// content: this.content,
					// match_id: this.match_id.sourceid,
					// type: this.match_id.type,
					
				}else {
					
				}
			},
			// 分类
			getcClassify() {
				classifyList().then(res => {
					this.classList = res.data
				}).catch(res => {})
			},
			// 头条列表
			userPostList() {
				let data = {
					type:2,
					page: this.page
				}
				userPostList(data).then(res => {
					this.list = res.data
				}).catch(res => {})
			},
			// 赛事标签
			initialList() {
				initialList().then(res => {
					this.hot_match = res.data.hot_match
				}).catch(res => {})
			},
			// 视频列表
			userPostVideoList() {
				let data = {
					type:2,
					page: this.page
				}
				userPostVideoList(data).then(res => {
					this.list = res.data
				}).catch(res => {})
			},
			// 分页
			sizeChange(e) {
				this.page = e
				if (this.tabIndex == 0) {
					this.userPostList()
				} else {
					this.userPostVideoList()
				}
			},
			// 添加
			addInsert(type) {
				if (type) { //视频
					
					if (!this.title) return this.$message.error('请输入标题')
					if (!this.flie[0].img) return this.$message.error('请上传封面')
					if (!this.flie[0].video) return this.$message.error('请上传视频')
					let data = {
						title: this.title,
						flie: this.flie
					}
					addinsertVidoe(data).then(res => {
						this.imgMask = false
						this.$message.success('操作成功')
						this.userPostVideoList()
					}).catch(res => {})
				} else { //图片

					if (!this.title) return this.$message.error('请输入标题')
					if (!this.content) return this.$message.error('请输入内容')
					if (!this.img) return this.$message.error('请上传封面')
					if (this.match_id == {}) return this.$message.error('请添加标签')
					if (!this.cid) return this.$message.error('请选择分类')

					let data = {
						cid: this.cid,
						title: this.title,
						img: this.img,
						content: this.content,
						match_id: this.match_id.sourceid,
						type: this.match_id.type,

					}
					addInsert(data).then(res => {
						this.imgMask = false
						this.$message.success('操作成功')
						this.userPostList()
					}).catch(res => {})
				}

			},
			// 图片上传返回地址
			handleAvatarSuccess1(res, file) {
				this.img = `${this.QiniuToken.domain}/${res.key}`
				if (this.tabIndex == 0) {

				} else {
					this.flie[0].img = `${this.QiniuToken.domain}/${res.key}`
				}
			},
			beforeAvatarUpload(file) {
				let QiniuToken = this.$store.state.user.QiniuToken
				const fileName =
					new Date().valueOf().toString() +
					this.$common.rand() +
					file.name.slice(file.name.lastIndexOf("."));
				QiniuToken.data = file;
				QiniuToken.key = `${fileName}`;
			},

			// 视频上传返回地址
			handleAvatarSuccess2(res, file) {
				this.flie[0].video = `${this.QiniuToken.domain}/${res.key}`
				this.$message.success('上传成功')
			},
			beforeAvatarUpload2(file) {
				let QiniuToken = this.$store.state.user.QiniuToken
				const fileName =
					new Date().valueOf().toString() +
					this.$common.rand() +
					file.name.slice(file.name.lastIndexOf("."));
				QiniuToken.data = file;
				QiniuToken.key = `${fileName}`;
			},
		}
	}
</script>

<style scoped="scoped">
	.creation-page-publish-select div {
		width: 100% !important;
	}

	.news-content-wrap {
		/* width: 852px; */
		min-height: 300px;
		border-radius: 8px;
		border: 1px solid #d6dfea;
		margin-bottom: 30px;
		overflow: hidden;
		position: relative;
		padding-top: 10px;
	}

	.news-title {
		height: 42px;
		border-radius: 8px;
		border: 1px solid #d6dfea;
		position: relative;
		overflow: hidden;
		margin-bottom: 20px;
	}

	.news-title>input[type=text] {
		width: 94%;
		height: 42px;
		line-height: 42px;
		color: #666;
		font-size: 14px;
		padding: 11px 10px;
		outline: none;
	}

	.cell-title {
		color: #666;
		font-size: 14px;
		text-align: left;
		margin-bottom: 15px;
	}

	.media-cell {
		margin-bottom: 30px;
	}

	.media-cell .video-box {
		width: 176px;
		height: 118px;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWAAAADsCAYAAABKZHxbAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAABYKADAAQAAAABAAAA7AAAAAAyd7Q8AAASVElEQVR4Ae3dwY4bR34H4JqQkkiPTQJjiIINKQ+wRvwQORjYc14ht93DPsoeYiCHPEUuBnLIQyzgPe4hskxA4JigbQKkJc6k/70ixWqTvSOTTUrTXwMzZFcVq7o/Uj+3e9hdF6myjMfjL169evXvRfFXFxcX/3x7e/txpcne1U6nkz7//PO99VHx/fffp9VqVdtmX6X+98n8vZwPH/++3q/8KTL05yJD/6/4ZP7PgwcP/uuzzz77dvtT+k/rlaLRw+fPn//H69ev/1KU/an4+d27hG/00+v14qF2uUubfR3c5bV3aaP/fQL15XexvUubfaPc5bV3aaP/fQL15XexvUubfaPc5bV3afMh9f8mQ39XbPOfIlsjYyNr1/tQBnAUfPfdd98Uj38ofjahvG50l8c4+hoOh/+wabSJtu+66L9ejA+fEPDvq/5zcE6fyNbI2DdZW4bwRWzum1T+Q3XTi8PnVLygWpytxz/8+K/Wu+xYnIKYzWZpsVj8w9MR+q8/XcOHT/YPsljx76sqkq+/Dz5Ftn797NmzP17EOd84NN4+8i3OVZSBGsEaIWwhQIAAgXcXiAPYONCcTqfZwWaRqzfdbvfL7ps/uG1OO8QR1ePHj3/TaYJ33zyvIECAwP0ViAPYfr+fHj58mF6+fJmKg91yZ+OAN7I3gver9e5H408//VT4rkE8EiBA4AgCcWA7Go1ScdS73dtX3SJ046tmZeEnn3ySHj16tN3AcwIECBA4gkCE8JMnT9J8Pk+//PJLnN4dXRSHxbdR8dFHH93pa2RH2A5dECBAgEAhcFEc/dZ/zQETAQIECDQisPnjWyO965QAAQIE9goI4L00KggQINCsgABu1lfvBAgQ2CsggPfSqCBAgECzAgK4WV+9EyBAYK+AAN5Lo4IAAQLNCcRVcd3yV351RnMj6pkAAQItF1jfG6LM3uJmPOWlx1dXVy7EaPkHw+4TINCsQFwBN5lMNneZLE9BxO3ZojAqLQQIECDQjEDchnf72rfNOeAojEoLAQIECDQjUD3I3QRwDFetbGYT9EqAAIF2Ctzc3GQ7ngVwtTJraYUAAQIEjiqQBfBRe9YZAQIECNQKCOBaHpUECBBoTkAAN2erZwIECNQKCOBaHpUECBBoTkAAN2erZwIECNQKCOBaHpUECBA4nkBMfLy9ZAFcrdxu6DkBAgQIHCZQmRU5ZQFcrTxsKK8mQIAAgW2Bfr+/vZoHcLUya2mFAAECBA4SGAwG6dGjR5s+uutnUTgcDterHgkQIEDgyAJxmnc0GqX5fJ6Wy2W6uL6+vo3wvby8PPJQuiNAgACBOoGL4i5ot3UN1BEgQIBAMwLZH+GaGUKvBAgQILBLQADvUlFGgACBEwgI4BMgG4IAAQK7BATwLhVlBAgQOIGAAD4BsiEIECCwS0AA71JRRoAAgYYFymnpy1/dzfUYDQ+pewIECLRbYLFYpOl0msrsHY/HqdPppKurq9Tr9dotY+8JECDQoEBMfDyZTDZT05enIFarVVloVuQG5XVNgEDrBWaz2SZ8A2NzDjguiItKCwECBAg0I1A9yN0EcAxXrWxmE/RKgACBdgrc3NxkO54FcLUya2mFAAECBI4qkAXwUXvWGQECBAjUCgjgWh6VBAgQaE5AADdnq2cCBAjUCgjgWh6VBAgQaE5AADdnq2cCBAjUCgjgWh6VBAgQOJ5AzAm3vWQBXK3cbug5AQIECBwm0K3cdycL4GrlYUN5NQECBAhsC/T7/e3Vt5ciR2m1MmtphQABAgQOEhgMBilmoV8vm/tQRuFwOFyXeyRAgACBIwvEad7RaJTm83laLpfp4vr6+jbC9/Ly8shD6Y4AAQIE6gQuirug3dY1UEeAAAECzQhkf4RrZgi9EiBAgMAuAQG8S0UZAQIETiAggE+AbAgCBAjsEhDAu1SUESBA4AQCAvgEyIYgQIDALgEBvEtFGQECBBoWKKelL39Vrk9ueFzdEyBAoLUCi8UiTafTVGbveDxOnU4nXV1dpV6v11oUO06AAIGmBWLi48lkspmavjwFsVqtykKzIjfNr38CBNosMJvNNuEbDptzwHFBXFRaCBAgQKAZgepB7iaAY7hqZTOboFcCBAi0U+Dm5ibb8SyAq5VZSysECBAgcFSBLICP2rPOCBAgQKBWQADX8qgkQIBAcwICuDlbPRMgQKBWQADX8qgkQIBAcwICuDlbPRMgQKBWQADX8qgkQIDA8QRiTrjtJQvgauV2Q88JECBA4DCBbuW+O1kAVysPG8qrCRAgQGBboN/vb6++vRQ5SquVWUsrBAgQIHCQwGAwSDEL/Xrprp9E4XA4XK96JECAAIEjC8Rp3tFolObzeVoul+ni+vr6NsL38vLyyEPpjgABAgTqBC6Ku6Dd1jVQR4AAAQLNCGR/hGtmCL0SIECAwC4BAbxLRRkBAgROICCAT4BsCAIECOwSEMC7VJQRIEDgBAKbr6GdYCxDEPhNAi9evEj7JguIr/U8ffr0N/XrRQTOLeAI+NzvgPEJEGilQDktffmrcn1yKzXsNAECBE4gsFgs0nQ6TWX2jsfj1Ol00tXVVer1eicY3hAECBBop0BMfDyZTDZT05enIFarVVloVuR2fijsNQECpxGYzWab8I0RN+eA44K4qLQQIECAQDMC1YPcTQDHcNXKZjZBrwQIEGinQPXbPFkAVyvbSWSvCRAgcBqBLIBPM6RRCBAgQCAEBLDPAQECBM4kIIDPBG9YAgQICGCfAQIECJxJQACfCd6wBAgQEMA+AwQIEDiRQNw8anvJArhaud3QcwIECBA4TKBbue9OFsDVysOG8moCBAgQ2Bbo9/vbq/nX0KqVWUsrBAgQIHCQwGAwSDEL/XrZ3JA9CofD4brcIwECBAgcWSBO845GozSfz9NyuUzdy8vLMpHj0UKAAAECzQtE3sZPN+4DbCFAgACB0wtkf4Q7/fBGJECAQHsFBHB733t7ToDAmQUE8JnfAMMTINBeAQHc3vfenhMgcGYBAXzmN8DwBAi0V0AAt/e9t+cECJxRoJyWvvxVuT75jNtkaAIECNxrgcVikabTaSqzdzwep06nk+L7wL1e717vuJ0jQIDAOQVi4uPJZLKZmr48BbFarcpCsyKf860xNgEC911gNpttwjf2dXMO+Pb2NkWlhQABAgSaEage5G4COIarVjazCXolQIBAOwVubm6yHc8CuFqZtbRCgAABAkcV2NyO8qi96uxeCbx8+bK8dd77uFNx6uz58+dn27SHDx+mJ0+enG18A3/YAtkR8Ie9K7aeAAECH5aAAP6w3i9bS4DAPRIQwPfozbQrBAh8WAIC+MN6v2wtAQL3SEAA36M3064QIPB+C8SccNtLFsDVyu2GnhMgQIDAYQLdyn13sgCuVh42lFcTIECAwLZAv9/fXk3Z94CrlVlLK60ViGm0z7m8ePEi7btIKP6v7enTp+fcPGMTuLPAYDAov1MfU9LHsgngR48epeFweOeONCRAgACBdxOIA4Y4oJnP52UQd2Nu+gjfeLQQIECAQPMCkbfx0437AFsIECBA4PQC2R/hTj+8EQkQINBeAQHc3vfenhMgcGYBAXzmN8DwBAi0V0AAt/e9t+cECJxZQACf+Q0wPAEC7RUQwO197+05AQJnFCinpS9/Va5PPuM2GZoAAQL3WmCxWKTpdJrK7B2Px6nT6aT4PnCv17vXO27nCBAgcE6BmPh4MplspqYvT0GsVquy0KzI53xrjE2AwH0XmM1mm/CNfd2cA47JDaPSQoAAAQLNCFQPcjcBHMNVK5vZBL0SIECgnQLVu/plAVytbCeRvSZAgMBpBLIAPs2QRiFAgACBEBDAPgcECBA4k4AAPhO8YQkQICCAfQYIECBwJgEBfCZ4wxIgQEAA+wwQIEDgRAIxJ9z2kgVwtXK7oecECBAgcJhAt3LfnSyAq5WHDeXVBAgQILAt0O/3t1fzr6FVK7OWVggQIEDgIIHBYFDOQr/upLt+ElPTD4fD9apHAgQIEDiyQJzmHY1GaT6fp+VymboxN32EbzxaCBAgQKB5gcjb+OnGfYAtBAgQIHB6geyPcKcf3ogECBBor4AAbu97b88JEDizgAA+8xtgeAIE2isggNv73ttzAgTOLHBRTEV0e+ZtMDwBAgRaKeAIuJVvu50mQODcAuW09OWvyvXJ594w4xMgQOC+CiwWizSdTlOZvePxOHU6nRTfB+71evd1n+0XAQIEzi4QEx9PJpPN1PTlKYjValUWmhX57O+PDSBA4B4LzGazTfjGbm7OAcff4qLSQoAAAQLNCFQPcjcBHMNVK5vZBL0SIECgnQI3NzfZjmcBXK3MWlohQIAAgaMKZAF81J51RoAAAQK1AgK4lkclAQIEmhMQwM3Z6pkAAQK1AgK4lkclAQIEmhMQwM3Z6pkAAQK1AgK4lkclAQIEjicQc8JtL1kAVyu3G3pOgAABAocJdCv33ckCuFp52FBeTYAAAQLbAv1+f3v17aXIUVqtzFpaIUCAAIGDBAaDQTkL/bqT7vpJTE0/HA7Xqx4JECBA4MgCcZp3NBql+Xyelstluri+vr6N8I056i0ECBAgcDoBUxKdztpIBAgQyASyP8JlNVYIECBAoFEBAdwor84JECCwX0AA77dRQ4AAgUYFBHCjvDonQIDAfgEBvN9GDQECBBoVEMCN8uqcAAECuwXKaenLX5Xrk3c3V0qAAAEChwosFos0nU5Tmb3j8Th1Op10dXWVer3eoX17PQECBAjsEYiJjyeTyWZq+vIUxGq1KgvNirxHTTEBAgSOIDCbzTbhG91tzgHf3t6mqLQQIECAQDMC1YPcTQDHcNXKZjZBrwQIEGinwM3NTbbjWQBXK7OWVggQIEDgqAJZAB+1Z50RIECAQK2AAK7lUUmAAIHmBARwc7Z6JkCAQK2AAK7lUUmAAIHmBARwc7Z6JkCAQK2AAK7lUUmAAIHjCcSccNtLFsDVyu2GnhMgQIDAYQLdyn13sgCuVh42lFcTIECAwLZAv9/fXn17KXKUViuzllYIECBA4CCBwWCQYhb69dJdP4nC4XC4XvVIgAABAkcWiNO8o9EozefztFwu08X19fVthO/l5eWRh9IdAQIECNQJXBR3Qbuta6COAAECBJoRyP4I18wQeiVAgACBXQICeJeKMgIECJxAQACfANkQBAgQ2CUggHepKCNAgMAJBATwCZANQYAAgV0CAniXijICBAg0LFBOS1/+qlyf3PC4uidAgEBrBRaLRZpOp6nM3vF4nDqdTrq6ukq9Xq+1KHacAAECTQvExMeTyWQzNX15CmK1WpWFZkVuml//BAi0WWA2m23CNxw254DjgriotBAgQIBAMwLVg9xNAMdw1cpmNkGvBAgQaKfAzc1NtuNZAFcrs5ZWCBAgQOCoAlkAH7VnnREgQIBArYAAruVRSYAAgeYEBHBztnomQIBArYAAruVRSYAAgeYEBHBztnomQIBArYAAruVRSYAAgeMJxJxw20sWwNXK7YaeEyBAgMBhAt3KfXeyAK5WHjaUVxMgQIDAtkC/399efXspcpRWK7OWVggQIEDgIIHBYJBiFvr10l0/icLhcLhe9UiAAAECRxaI07yj0SjN5/O0XC7TxfX19W2E7+Xl5ZGH0h0BAgQI1AlcFHdBu61roI4AAQIEmhHI/gjXzBB6JUCAAIFdAgJ4l4oyAgQInEAgAvhvJxjHEAQIECCQC/wtAvibvMwaAQIECJxA4Jv4I9y/FAP95QSDGYIAAQKtFXj16lWK+Tfjgrc3F719GQEcR8GLouLBTz/99PepkosG8dW0hw8fljMmt1bMjhMgQOAAgfiSWUxDH9ka3/tdL8UM9KvHjx/3usUXg29++OGHfyu+GPzf299IixfsWuKLxA8ePEgff/zxO313OL54/PPPP6f4r8D2ONUx9M+n+pmIdZ+fXSpvy/i8tdj17H3xWW9bEcb/WWTd6/LWPN9+++3D4hK5b4pg/Nd1g7s8xmV1d7l6LmZb/vHHH+/SZdZG/xnHr1b4/IokK+CTcfxqhc+vSLKCpnyK4P3fp0+f/r54/CVOP6QvvvjilzcFXxeF+bSd2SblK+tTFnlpvvb69evy8Dsvvdua/uud+PDx7+t17YfgffKJbC1+vl6Hb2x4GcDxJNL42bNnfyxODn9ZrP65+PlrUfZz1O1b4lTC9nmNXe2ivu6Uw67XrMv0v5bY/chnt8u6lM9aYvcjn90u69Jj+LzJ0L8Wff45sjUyNrJ2Pcb/A6pLxuUx8G1kAAAAAElFTkSuQmCC);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		position: relative;
	}

	.select-tags {
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 99999;
		padding-left: 10px;
		padding-bottom: 8px;
		padding-top: 5px;
		right: 0;
		height: 53px;
		overflow: hidden;
	}

	.select-tags .tag-item {
		display: flex;
		align-items: center;
		padding: 4px 8px;
		border-radius: 4px;
		background-color: #f5f5f5;
		float: left;
		cursor: pointer;
		margin-right: 8px;
		margin-bottom: 8px;
		position: relative;
	}

	.tag-item>img {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		margin-right: 8px;
	}

	.tag-item .tag-name {
		color: #636366;
		font-size: 12px;
		max-width: 108px;
		white-space: nowrap;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tag-item .icon-remove {
		width: 16px;
		height: 16px;
		position: absolute;
		right: -8px;
		top: -5px;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAKKADAAQAAAABAAAAKAAAAAB65masAAAEqElEQVRYCc2ZSWscRxTHa0b7vm8jUEYj6WBsHYJCPoQIcXQJxsYhH0DGIZcQ9AEUEnAgti8Gn4S3nOwo5JJbSG4RviSEoF3g0b4vyJJmxv9/4Veq6eme6WlphB40Vf2q3nu/frVMdU9IBZTp6en+VCp1Heb9uCKoR0KhUAfqh7jiuI/j/g2uPyoqKsYjkcga9HlLKB+LmZmZD5LJ5B0EH4JdzK8tIBOw+TMcDv8ci8Ue4/6tb1s/Hefn5xuOj49HEGQY/cv82Hj1AdwcrhGAPkOZ8uon+pwZnJqa+hKd7wGuQYzOowTcBDJ6C6D/Z/PnCQigMIb0Bwzp19kcnKUNkFuA/ByQv3v5cQVcXV2t2d7efg7IQS/D89IDkvPzbl9f30M3n2Gnkpm7KDjGRrwiFA8mJydvO1l4nwGI7WP0IjLnhEEmH2FKfZyhtxWAu4k598TWFaJeWlqqEomEvhz+48XFxQPd3d1LojcZXF9frwXcT9Jgl62trSoajaq6ujpbHaje0tKiurq6tL+SkhKnjwjAv7OVBnBzc/MbNDTZjawXFRWp2tpahSdTdN7QEHy34YPKQ2JIFTPpIrextV0TvQacm5vjT9RXorRLDsXe3p5RNTU1qcbGRnPvt0I4PqjIwcGB2t/fl1tTcpHiGhWFBgQEf74qReksl5eXFR2KEDAfyLa2tgy4xcVFcedWfoJVfZUNGhBz7zO3XqIDvKJD+4kJyGzmEsLV1NSYbvRBX/SZTTAFNFMYK7cPHa9k68w2N0jOx+bmZk/T9vb2QHDvHfKkpDjen3pGcGng09tzsr6+3hWScNXV1caDZM4oclc+WlhYiHCIB3L3Te+xtLSUAckVLuKE4wPlmHNiakokLoQT1IfFqESMNo8KIW0Q2T64HVVVVRlPhGPfIEK2MCYjt5hAwsC7u7vGlpA2HNuCwtEp2TgHA2VQqLgF2ZCip45tZxGdwbM4oC1/EfhrUyjhEMeDOidcR0eHqqzM3OO593EPPIuQjUOcdUv3CkA4vKmlwe3s7CicJY0JIbmQggrZAmVQ4PA6aWITbGVlReE0ngbJvTAopM4gIkyYKD4qXnAEE2F9a2tLbvWGnS8k4qRwHHvNDP5iPOWo4AVHdXZ2KjtzBLHhxMXa2loGJOdrHvI3zo3xcE9PzySM/stlSDjOufLyctOVcATxErbhnGmauUcSkqPgQ16xjz7NIPjLbAaSORuOgbPBiT+c1ANBYoFoJg2Ifew+nur0wCfeUfJpOaxlZacfFAjHwH6FfTc2Nkx3bks5tqBf8Rr6Lw00YDQa5Vbzo/FgVbhV2HAMlA+cuHLacbjdhhq6JK5vxU4D8gZnu+9RZKQFJwp9FkTKNZidCXHit2TmuaCOjo70AqJPFxnr7e39R/Rps9XrtZNvX3R2cnIidoUqvV87GREr+inSy0ymCbNYaDjEPcRaGLLfiQmRlkEqkCm+BoyjHOT9BcoXWBhjznhmDkoDJynOdTdQ/ia6QpaIk4D/YTc4xs3IoMAwk5f285tAsry0HzBtyEv9CdgGnZ2djeIrxDCGfwj6mN2Wrc55Bpu/8JP5oiAf0d2CY6VfyN8Q7wD7FEIkSfONUAAAAABJRU5ErkJggg==);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.tag-item.active {
		background: #fdf3ec;
	}

	.group-name {
		color: #666;
		font-size: 14px;
		text-align: left;
		margin-bottom: 10px;
	}

	.tags-dialog-footer {
		width: 100%;
		height: 90px;
		border-radius: 4px;
		display: flex;
		justify-content: center;
		padding-top: 20px;
	}

	.tags-dialog-footer .confirm-button {
		width: 130px;
		height: 40px;
	}
	.dialog .el-dialog__header {
		display: none !important;
	}
	.dialog .el-dialog__body {
		padding: 0 !important;;
	}
</style>
