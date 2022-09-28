<!-- 申请主播 -->
<template>
	<div class="apply-anchor-info" style="height: auto;" v-if="isApply">
		<img @click="isApply = false" style="width: 100%;height: auto;" src="../../assets/images/apply-bg.png">
	</div>
	<div class="apply-anchor-info" v-else>
		<div class="title">认证信息页</div>
		<div class="content">
			<form class="ant-form ant-form-horizontal">
				<div class="ant-row" style="row-gap: 0px;">
					<div class="ant-row ant-form-item liveType right160 flex-start" style="row-gap: 0px;">
						<div class="ant-col ant-form-item-label"><label for="liveTypeArr" class="ant-form-item-required"
								title="直播赛事 :">直播赛事 </label></div>
						<div class="ant-col ant-form-item-control ">
							<el-checkbox-group fill="#000" v-model="checkList">
								<el-checkbox label="足球"></el-checkbox>
								<el-checkbox label="篮球"></el-checkbox>
								<el-checkbox label="其它"></el-checkbox>
							</el-checkbox-group>

						</div>
					</div>
					<div class="ant-row ant-form-item liveExperience flex-start" style="row-gap: 0px;">
						<div class="ant-col ant-form-item-label flex">
							<label for="liveExperience" class="ant-form-item-required" title="直播经验 :">直播经验</label>
						</div>
						<el-select v-model="value" style="width: auto;" placeholder="请选择">
							<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="ant-row" style="row-gap: 0px;">
					<div class="ant-row ant-form-item right84 line-height-40" style="row-gap: 0px;">
						<div class="ant-col ant-form-item-label"><label for="name" class="ant-form-item-required"
								title="姓名 :">姓名 </label></div>
						<div class="ant-col ant-form-item-control">
							<div class="ant-form-item-control-input">
								<div class="ant-form-item-control-input-content"><input v-model="name" placeholder="请输入您的真实姓名(必填)"
										type="text" id="name" class="ant-input" value=""></div>
							</div>
						</div>
					</div>
					<div class="ant-row ant-form-item relation" style="row-gap: 0px;">
						<div class="ant-col ant-form-item-label"><label for="contactType" class="" title="联系方式 :">联系方式
							</label></div>
						<div class="ant-col ant-form-item-control">
							<div class="ant-form-item-control-input">
								<div class="ant-form-item-control-input-content">
									<div class="ant-radio-group ant-radio-group-outline" id="contactType">
										<el-radio-group v-model="radio">
											<el-radio :label="1">QQ</el-radio>
											<el-radio :label="2">微信</el-radio>
											<el-radio :label="3">电话号码</el-radio>
										</el-radio-group>


									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="ant-row" style="row-gap: 0px;">
					<div class="ant-row ant-form-item right84" style="row-gap: 0px;">
						<div class="ant-col ant-form-item-label"><label for="idCardNo" class="ant-form-item-required"
								title="身份证 :">身份证 </label></div>
						<div class="ant-col ant-form-item-control">
							<div class="ant-form-item-control-input">
								<div class="ant-form-item-control-input-content"><input v-model="id_card" placeholder="请输入身份证号码(必填)"
										type="text" id="idCardNo" class="ant-input" value=""></div>
							</div>
						</div>
					</div>
					<div class="ant-row ant-form-item" style="row-gap: 0px;">
						<div class="ant-col ant-form-item-control">
							<div class="ant-form-item-control-input">
								<div class="ant-form-item-control-input-content"><input
										placeholder="请输入QQ号/微信号/电话号码(非必填)" v-model="connect" type="text"
										id="contactNo" class="ant-input" value=""></div>
							</div>
						</div>
					</div>
				</div>
				<div class="ant-row ID_img" style="row-gap: 0px;">
					<div class="ant-row ant-form-item right10" style="row-gap: 0px;">
						<div class="ant-col ant-form-item-label"><label for="cardFrontImg"
								class="ant-form-item-required" title="身份照片 :">身份照片 </label></div>
						<div class="ant-col ant-form-item-control">
							<div class="ant-form-item-control-input">
								<div class="ant-form-item-control-input-content">
									<el-upload class="avatar-uploader"
										:action="'https://'+QiniuToken.uploadHost"  :data="QiniuToken" :show-file-list="false"
										:on-success="handleAvatarSuccess1" :before-upload="beforeAvatarUpload">
										<div class="upload-container front" :style="{backgroundImage: 'url('+(front?front:require('../../assets/images/id_card-up.png'))+')'}" value="" id="cardFrontImg"></div>
									</el-upload>
								</div>
							</div>
						</div>
					</div>
					<div class="ant-row ant-form-item" style="row-gap: 0px;">
						<div class="ant-col ant-form-item-control">
							<div class="ant-form-item-control-input">
								<div class="ant-form-item-control-input-content">
									
									<el-upload class="avatar-uploader"
										:action="'https://'+QiniuToken.uploadHost"  :data="QiniuToken" :show-file-list="false"
										:on-success="handleAvatarSuccess2" :before-upload="beforeAvatarUpload">
										<div class="upload-container back" :style="{backgroundImage: 'url('+(negative?negative:require('../../assets/images/id_card-down.png'))+')'}" value="" id="carBackImg">
											
										</div>
									</el-upload>
								</div>
							</div>
						</div>
					</div>
					<div class="ant-row ant-form-item" style="row-gap: 0px;">
						<div class="ant-col ant-form-item-control">
							<div class="ant-form-item-control-input">
								<div class="ant-form-item-control-input-content">
									<el-upload class="avatar-uploader"
										:action="'https://'+QiniuToken.uploadHost"  :data="QiniuToken" :show-file-list="false"
										:on-success="handleAvatarSuccess3" :before-upload="beforeAvatarUpload">
										<div class="upload-container hand" :style="{backgroundImage: 'url('+(hand_held?hand_held:require('../../assets/images/id_card-hanld.png'))+')'}" value="" id="imageFront">
											
										</div>
									</el-upload>
									
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="ant-row" style="row-gap: 0px;">
					<div class="ant-row ant-form-item anchorDesc" style="row-gap: 0px;">
						<div class="ant-col ant-form-item-label"><label for="anchorDesc" class="ant-form-item-required"
								title="个人简介 :">个人简介 </label></div>
						<div class="ant-col ant-form-item-control">
							<div class="ant-form-item-control-input">
								<div class="ant-form-item-control-input-content">
									<div class="textarea-container" value="" id="anchorDesc">
										<div class="ant-input-textarea ant-input-textarea-show-count"
											:data-count="introduction.length+'/ 5000'"><textarea maxlength="5000" v-model="introduction" placeholder="1.主播经验几年
	2.在哪些平台上担任过主播
	3.曾经获得过哪些荣誉
	4.擅长直播哪类赛事（足球、篮球、电竞、娱乐、其他）5.不少于15字" class="ant-input"></textarea></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="ant-row" style="row-gap: 0px;">
					<div class="ant-row ant-form-item right84" style="row-gap: 0px;">
						<div class="ant-col ant-form-item-label"><label for="invitor" class="" title="邀请人 :">邀请人
							</label></div>
						<div class="ant-col ant-form-item-control">
							<div class="ant-form-item-control-input">
								<div class="ant-form-item-control-input-content"><input placeholder="请输入邀请人(选填)"
										maxlength="10" v-model="invite" type="text" id="invitor" class="ant-input" value=""></div>
							</div>
						</div>
					</div>
				</div>
				<div class="ant-row" style="row-gap: 0px;"><span class="right84"
						style="padding-left: 95px; margin-bottom: 10px; width: 395px;">
						<div class="ant-row ant-form-item" style="row-gap: 0px;">
							<div class="ant-col ant-form-item-control">
								<div class="ant-form-item-control-input">
									<div class="ant-form-item-control-input-content">
										<div class="login-item" id="phoneNo">
											<div class="login-phone-area-choose"><span
													class="login-phone-area-code">{{info.code}}</span></div>
											<div class="login-input"><input :value="info.phone" disabled type="text" placeholder="请输入手机号"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</span></div>
				<div class="ant-row" style="row-gap: 0px;"><span class="right84"
						style="padding-left: 95px; margin-bottom: 10px;">
						<div class="ant-row ant-form-item" style="row-gap: 0px;">
							<div class="ant-col ant-form-item-control">
								<div class="ant-form-item-control-input">
									<div class="ant-form-item-control-input-content">
										<div id="smsCode">
											<div class="login-item login-input-sms-verify"><label
													class="login-input-sms">
													<div class="login-passwd-icon"><img
															src="data:image/png;base64,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"
															alt="icon"></div>
													<div class="login-input login-input-sms-verify"><input v-model="code"  type="text"
															placeholder="请输入验证码"></div>
												</label>
												<div class="login-get-verify-btn" @click="!show?getCode():''">{{count==0?'获取验证码':count + 's'}}</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</span></div>
				<div class="ant-row ant-form-item" style="padding-left: 95px; margin-bottom: 10px; row-gap: 0px;">
					<div class="ant-col ant-form-item-control" style="text-align: left;">
						<div class="ant-form-item-control-input">
							<div class="ant-form-item-control-input-content">
								<label class="ant-checkbox-wrapper">
									<el-checkbox v-model="checked"></el-checkbox>
									<router-link tag="a" class="protocol-text" target="_blank" to="/about-user?type=1">
										小九直播协议
									</router-link>
									<!-- <span class="protocol-text">小九直播协议</span> -->
								</label>
							</div>
						</div>
					</div>
				</div>
				<div class="ant-row ant-form-item btn-item" style="row-gap: 0px;">
					<div class="ant-col ant-form-item-control">
						<div class="ant-form-item-control-input">
							<div class="ant-form-item-control-input-content"><span @click="submit()" 
									class="ant-btn ant-btn-primary btn"><span>提 交</span></span></div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import {
		getCode,
		verified,
		getVerifiedInfo,
		getExperienceList
	} from '../../api/user.js'
	
	import {
			getQiniuToken
		} from '@/api/common'
	export default {
		data() {
			return {
				info:{},
				count: 0,
				show:false,
				timer: null,
				radio: null,
				isApply:true,
				checkList: [],
				options: [],
				invite:'',//邀请人
				code:'',//验证码
				name:'',//姓名
				id_card:'',//身份证号
				front: '', //身份证反面
				negative: '', //身份证正面
				hand_held: '', //手持图片
				introduction: '', //个人简介
				connect: '', //联系方式
				value: '', //选中的直播经验
				QiniuToken:{},
				checked:false,
				ImgIndex:null,
			}
		},
		watch:{
			ImgIndex(e){
				console.log(e)
			}
		},
		computed:{
			system(){
				return this.$store.state.system
			}
		},
		mounted() {
			// 获取七牛token
			this.getQiniu()
			this.info = JSON.parse(localStorage.getItem('userInfo'))
			this.info.code = this.info.mobile.slice(0,2)
			this.info.phone = this.info.mobile.slice(3)
			console.log(this.info)
			// 获取主播认证信息
			this.getVerifiedInfo1()
			// 获取主播经验列表选中
			this.getExperienceList()
		},
		methods: {
			async getQiniu(){
				let QiniuToken = this.$store.state.user.QiniuToken
				if(JSON.stringify(QiniuToken) === '{}'){
					const { code, data } = await this.$store.dispatch('user/SET_QINIU_TOKEN')
					if(code === 0){
						this.QiniuToken = data
					}
				}else{
					this.QiniuToken = QiniuToken;
				}
			},
			// 图片上传返回地址
			handleAvatarSuccess1(res, file){
				console.log(res, file);
				this.front = `${this.QiniuToken.domain}/${res.key}`
			},
			handleAvatarSuccess2(res, file){
				this.negative = `${this.QiniuToken.domain}/${res.key}`
			},
			handleAvatarSuccess3(res, file){
				this.hand_held = `${this.QiniuToken.domain}/${res.key}`
			},
			beforeAvatarUpload(file){
				const fileName =
				new Date().valueOf().toString() +
				this.$common.rand() +
				file.name.slice(file.name.lastIndexOf("."));
				  this.QiniuToken.data = file;
				  this.QiniuToken.key = `${fileName}`; 
			},
			// 获取主播认证信息
			getVerifiedInfo1() {
				getVerifiedInfo({}).then(res => {
					if(res.code == 0){///实名认证信息待审核或已退回
						this.value =res.data.exp 
						this.invite=res.data.invite
						this.code=res.data.code//验证码
						this.name=res.data.name//姓名
						this.id_card=res.data.id_card//身份证号
						this.front=res.data.front //身份证反面
						this.negative=res.data.negative  //身份证正面
						this.hand_held=res.data.hand_held  //手持图片
						this.introduction=res.data.introduction  //个人简介
						this.connect=res.data.connect  //联系方式
						this.radio=res.data.connect_type  
						
						res.data.type.forEach(item=>{
							if(item == 1){
								this.checkList.push('篮球')
							}else if(item == 0){
								this.checkList.push('足球')
							}else {
								this.checkList.push('其它')
							}
						})
					}else if(res.code == 3){//实名认证已通过
						
					}else {//没有实名认证信息
						
					}
				}).catch(res => {
					
				})
			},
			// 获取主播经验列表选中
			getExperienceList() {
				getExperienceList({}).then(res => {
					this.options = res.data
				}).catch(res => {})
			},
			// 获取手机验证码
			getCode() {
				let data = {
					mobile: this.info.mobile,
					type: 6 //银行卡
				}
				if (!data.mobile) {
					return this.$message({
						message: '手机号不能为空！',
						type: 'warning'
					})
				}
				getCode(data).then(res => {
					this.getCount()
				}).catch(res => {
					console.log('失败' + res);
				})
			},
			
			// 验证码倒计时
			getCount() {
				console.log(this.timer)
				const TIME_COUNT = 60;
				if (!this.timer) {
					this.count = TIME_COUNT;
					this.show = true;
					this.timer = setInterval(() => {
						if (this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							this.show = false;
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000)
				}
			},
			submit() {
				let data = {
					type:[]
				}
				if (this.checkList.length == 0) {
					return this.$message.warning('请选择直播赛事类型')
				}
				if (!this.value) {
					return this.$message.warning('请选择直播经验')
				}
				if (!this.radio) {
					return this.$message.warning('请选择联系方式')
				}
				if (!this.connect) {
					return this.$message.warning('请输入联系方式')
				}
				if (!this.code) {
					return this.$message.warning('请输入验证码')
				}
				if (!this.name) {
					return this.$message.warning('请输入申请人姓名')
				}
				if (!this.id_card) {
					return this.$message.warning('请输入申请人身份证')
				}
				if (!this.introduction) {
					return this.$message.warning('请输入个人简介')
				}
				if (!this.checked) {
					return this.$message.warning('请输入勾选直播协议')
				}
				this.checkList.forEach(item=>{
					if(item == '篮球'){
						data.type.push(1)
					}else if(item == '足球'){
						data.type.push(0)
					}else {
						data.type.push(2)
					}
				})
				data.exp = this.value
				data.invite=this.invite
				data.code= this.code//验证码
				data.name=this.name//姓名
				data.id_card=this.id_card//身份证号
				data.front=this.front //身份证反面
				data.negative= this.negative //身份证正面
				data.hand_held= this.hand_held //手持图片
				data.introduction= this.introduction //个人简介
				data.connect=this.connect  //联系方式
				data.connect_type = this.radio
				verified(data).then(res=>{
					this.getVerifiedInfo1()
					let obj = {
						id:this.system.tencent_im_room_number
					}
					// this.$store.dispatch('loginTim',obj)
					setTimeout(res=>{
						this.$store.dispatch('joinGroup',obj)
					},1500)
					this.$message.success('已提交审核')
				}).catch(res=>{})
				
			},

		}
	}
</script>

<style>
	.flex-start {
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
</style>
