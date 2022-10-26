<template>
	<div tabindex="-1" class="login-modal ant-modal-centered" role="dialog">

		<el-dialog width="500px" :visible.sync="loginStatus" custom-class="dialog">
			<div role="document" class="" style="">
				<div tabindex="0" aria-hidden="true" style="width: 0px; height: 0px; overflow: hidden; outline: none;">
				</div>
				<div class="ant-modal-content">
					<button type="button" aria-label="Close" class="ant-modal-close"
						@click="$store.state.user.showLoginMask=false">
						<span class="ant-modal-close-x">
							<span role="img" aria-label="close" class="anticon anticon-close ant-modal-close-icon">
								<svg viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em"
									height="1em" fill="currentColor" aria-hidden="true">
									<path
										d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z">
									</path>
								</svg>
							</span>
						</span>
					</button>
					<div
						style="position: absolute;top: 30px;left: 0;right: 0;text-align: center;color: #ba9250;font-size: 20px;font-weight: bold;">
						{{type == 'forgot'?'忘记密码':type == 'code'?'密码登录':'注册'}}</div>
					<div class="ant-modal-body">
						<div id="normal_login" class="ant-form ant-form-horizontal login-form">
							<div class="ant-row ant-form-item" style="row-gap: 0px;">
								<div class="ant-col ant-form-item-control">
									<div class="ant-form-item-control-input">
										<div class="ant-form-item-control-input-content">
											<div class="login-item" id="normal_login_phoneNo">
												<el-select style="width: 120px;" v-model="code" placeholder="请选择">
													<el-option v-for="item in options" :key="item.id"
														:value="item.code">
														+{{item.code + '-' + item.name}}
													</el-option>
												</el-select>
												<div class="login-input">
													<input type="text" v-model="base.mobile" maxlength="11"
														placeholder="请输入手机号">
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="ant-row ant-form-item" style="row-gap: 0px;" v-if="type!= 'code'">
								<div class="ant-col ant-form-item-control">
									<div class="ant-form-item-control-input">
										<div class="ant-form-item-control-input-content">
											<div id="normal_login_smsCode">
												<div class="login-item login-input-sms-verify"><label
														class="login-input-sms">
														<div class="login-passwd-icon"><img
																src="data:image/png;base64,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"
																alt="icon"></div>
														<div class="login-input login-input-sms-verify"><input
																type="text" placeholder="请输入验证码" maxlength="6"
																v-model="base.code">
														</div>
													</label>
													<!-- 获取验证码 -->
													<div class="login-get-verify-btn" @click="show?getCode():''"
														:class="!show?'sending':''">
														{{show?'获取验证码':count + 's'}}
														<!-- <div class="sending">60s</div> -->
													</div>

												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="ant-row ant-form-item" style="row-gap: 0px;">
								<div class="ant-col ant-form-item-control">
									<div class="ant-form-item-control-input">
										<div class="ant-form-item-control-input-content"><label class="login-item"
												value="123456" id="normal_login_password">
												<div class="login-passwd-icon"><img
														src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAh1BMVEUAAAC8vLy7u7u8vLy7u7u8vLy8vLy8vLy8vLy8vLy8vLy8vLy9vb2+vr7BwcG8vLy8vLy9vb3Kysq7u7u8vLy8vLy8vLzAwMDDw8PKysq8vLy8vLy9vb3///+7u7u8vLy8vLy8vLy9vb3AwMC8vLy8vLy9vb28vLy+vr67u7u8vLy7u7u7u7tP74ylAAAALHRSTlMAtvHo3ver+2PitJxWMxWAaUsL6N2wchsQB+1eOQHXoZk/LiTJxZCJRLydfET/bPkAAAFzSURBVFjD7ZXrcoIwEIUFyy2gXCpXQUGt2jbv/3xttsCM1YTF4Iwz5vzMyXxJTrKbmZISX1Fo+3Xt22EkQ8lsYtBWhhZkd2LypKAXKpL8Hs75jV7JCcdzAoveUjISU9VdNCTxytJL4i6sbTUK5FPQPIj667MdCjqO4XgUdIouwm/pNp6zN+BU3v/xUIfxHRpksvnW+dooYQUNyykpU3DLWoPVIEEaLCvY7AeyMOAF7TjxgZmiQLD9mOdu4dj4qNc8N8THzWrMyrilbLCaQ4EGZm7YOhUm64F70bBp79ushWljHnfKJpp832X+AgFaDoC+pgK5rw5KSaFDM9K5gpakF1o6UGdoESFohQe9DxQsWnMFegBoTmJnApAeVOxD0KVB4Z/RyILMvsQkQXbneJKgpnMWz7Kjz86J5UD9ljz5B3la/nZNf4qX7cA3LQ2CDrZSIDHIOhyM52psCvQg0AYPcoSgIx7kCkH5N9FQIn40U1Lq9APFggVM0PoDhgAAAABJRU5ErkJggg=="
														alt="icon"></div>
												<div class="login-input"><input :type="!isEyes ? 'password' : 'text'" v-model="base.password"
														placeholder="请输入密码">
													<div class="icon-view">
														<img @click="isEyes = !isEyes" class="img-icon"
															:src="!isEyes ? require('./../../assets/images/icon_eye_closed.png'):require('./../../assets/images/icon_eye.png')"
															alt="eye"></div>
														</div>
											</label></div>
									</div>
								</div>
							</div>
							<div class="login-item" id="normal_login_inviteCode" style="margin-top: 20px;"
								v-if="type!= 'code'">
								<div class="login-input "><input v-model="invite" placeholder="请输入邀请码（可不填写）"
										maxlength="10"></div>
							</div>
							<div id="captcha-box"></div>
							<div class="ant-row ant-form-item" style="row-gap: 0px;">
								<div class="ant-col ant-form-item-control">
									<div class="ant-form-item-control-input">
										<div class="ant-form-item-control-input-content"><label
												class="ant-checkbox-wrapper">
												<!-- <span class="ant-checkbox">
													<input id="normal_login_remember" type="checkbox"
														class="ant-checkbox-input" value="">
														<span class="ant-checkbox-inner">
														</span>
													</span> -->
												<!-- <span>一月免登录</span> -->
												<div class="login-bottom">
													<!-- type == 'regiter' || type == 'forgot'?type = 'code':type == 'regiter' type==code?type=regiter:type==forgot?type=regiter:  -->
													<p class="curs password-login"
														@click="type=='code'?type='regiter':type=='forgot'?type='code':type=='regiter'?type='code':''">
														<span>{{type == 'code'?'注册':'密码登录'}}</span>
													</p>
													<!-- <p style="color: rgb(186, 146, 80);" v-if="type!= 'code'">未注册手机验证后自动登录</p> -->
													<a class="login-form-forgot" @click="type='forgot'">忘记密码？</a>
												</div>
												<!-- <el-button class="button" type="primary" size="medium" @click="verificationCode">查询</el-button> -->
											</label>
											<span>
											</span>
										</div>
									</div>
								</div>
							</div>
							<div class="ant-row ant-form-item" style="row-gap: 0px;">
								<div class="ant-col ant-form-item-control">
									<div class="ant-form-item-control-input">
										<div class="ant-form-item-control-input-content">
											<div @click="submit(type)" class="ant-btn ant-btn-primary submit-btn">
												<span>{{type == 'code'?'登 录':type == 'forgot'?'重置密码':'注 册'}}</span>
											</div>
										</div>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>
				<div tabindex="0" aria-hidden="true" style="width: 0px; height: 0px; overflow: hidden; outline: none;">
				</div>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	import {
		getCode,
		register,
		login,
		forgotPassword
	} from '../../api/user.js'
	import {
		setToken,
		getToken
	} from '../../utils/auth.js'
	import {
		getQiniuToken
	} from '../../api/common.js'
	export default {
		name: 'loginMask',
		data() {
			return {
				// loginStatus:false,
				type: 'code',
				count: null,
				timer: null,
				show: true,
				code: '86',
				isEyes:false,
				dialogTableVisible: true,
				base: {
					code: '',
					mobile: '',
					password: '',
					device_type: 'pc',
				},
				typeS: '',
				invite: '',
				options: [],
				database: {}
			}
		},
		computed: {
			loginStatus() {
				return this.$store.state.user.showLoginMask
			},
			// options(){
			// 	return this.$store.state.user.system
			// }
		},
		watch: {
			type() {
				this.rect()
			}

		},
		mounted() {
			let system = this.$store.state.system.CountryCode
			this.options = system
			// this.logData('admin',user)
			if (this.$store.state.user.isRegister) {
				this.type = 'regiter';
				this.$store.state.user.isRegister = false;
			}
		},
		inject: ['reload'],
		methods: {
			verificationCode(data) {
				let _this = this
				if (_this.typeS == 'code') {

					login(_this.database).then(res1 => {
					    _this.$store.state.user.showLoginMask = false;
						_this.$store.state.user.islogin = true
						setToken(res1.data.token) //缓存token
						_this.$store.state.user.data = res1.data;
						_this.$store.state.user.token = res1.data.token;
						_this.$store.state.infos = res1.data;
						localStorage.removeItem("userid");
						localStorage.removeItem("vidInfo");
						localStorage.userInfo = JSON.stringify(res1.data)
						getQiniuToken().then(res1 => {
							// let QiniuToken = 
							// _this.$store.state.user.islogin=false;
							_this.$store.dispatch('getUserInfo', '')
							_this.$message.success('欢迎回来')
							_this.$store.state.user.QiniuToken = res1.data
							if (_this.$route.name == 'live' || _this.$route.name == 'score-live') {
								_this.$router.go(0)
							}
						}).catch(res1 => {})
					}).catch(res1 => {
					})
				} else {
					register(_this.database).then(res => {
						_this.type = 'code'
						_this.$message.success('注册成功')
					}).catch(res => {
					})
				}
			},

			rect() {
				this.base = {
					code: '',
					mobile: '',
					password: '',
					device_type: 'pc',
				}
			},

			submit(type) {
				// 判断是否是直播界面，直播界面进行登录的需要重载界面
				// let user = 'eJwtzUsLgkAUBeD-MuuQOzr	XCaFFA9LLTaS0lmZGruH4SKyI-nv5WJ7vwDkfliYXbzAdi5jvAVtNmbRxPVmaONcVuaV46HveNKRZxAUABhzFem7Mq6HO-B0RfQCYtadqtDCQYeAj58sKFeNdlm-PqtjJa92eFL6PWQyJPLRiL7SMa54O1qqh5E9327DvDwr*MMk_'
				// this.$store.dispatch('logData',{ userID: 'admin', userSig: user })
				let data = JSON.parse(JSON.stringify(this.base))
				if (!data.mobile) {
					return this.$message({
						message: '请输入手机号！',
						type: 'warning'
					})
				}
				this.typeS = type
				let _this = this
				let code = this.code
				let mobile = this.base.mobile
				data.mobile = code + '-' + mobile
				if (type == 'code') { //登录
					if (!data.password) {
						return this.$message({
							message: '请输入登录密码！',
							type: 'warning'
						})
					}
					this.database = data
					this.verificationCode(data)
					return
				} else { //注册 && 忘记密码
					if (!data.code) {
						return this.$message({
							message: '请输入验证码！',
							type: 'warning'
						})
					} else if (!data.password) {
						return this.$message({
							message: '请输入登录密码！',
							type: 'warning'
						})
					}
					if (type == 'forgot') { //忘记密码
						forgotPassword(data).then(res => {
							this.type = 'code'
						}).catch(res => {
						})
						// this.verificationCode(data)
					} else { //注册
						data.invite = this.invite
						data.channel_code = localStorage.getItem('channel')
						if(localStorage.getItem("userid")){
							data.guest_id = localStorage.getItem("userid")
						}else {
							const userid =
								10000000 +
								Math.random()
								.toString()
								.slice(-6);
							localStorage.setItem("userid", userid);
							data.guest_id = userid
						}
						this.database = data
						register(_this.database).then(res => {
							// _this.type = 'code';
							this.base.code="";
							this.submit("code")
							_this.$message.success('注册成功')
						}).catch(res => {

						})
					}
					





					// this.$message.error('错了哦，这是一条错误消息');
				}

				// data.mobile = ''
				// data.password = ''
				// $store.state.user.islogin=false
			},

			// 获取手机验证码
			getCode() {
				let data = {
					mobile: this.base.mobile,
					type: this.type == 'regiter' ? 1 : 2
				}

				if (!data.mobile) {
					return this.$message({
						message: '手机号不能为空！',
						type: 'warning'
					})
				}
				data.mobile = this.code + '-' + data.mobile
				getCode(data).then(res => {
					this.getCount()
				}).catch(res => {
				})
			},

			// 验证码倒计时
			getCount() {
				const TIME_COUNT = 60;
				if (!this.timer) {
					this.count = TIME_COUNT;
					this.show = false;
					this.timer = setInterval(() => {
						if (this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							this.show = true;
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000)
				}
			}
		}
	}
</script>

<style>
	.login-get-verify-btn.sending {
		background-image: none;
		background-color: #9f9f9f;
		cursor: default;
	}

	/* stylelint-disable at-rule-empty-line-before,at-rule-name-space-after,at-rule-no-unknown */
	/* stylelint-disable no-duplicate-selectors */
	/* stylelint-disable */
	/* stylelint-disable declaration-bang-space-before,no-duplicate-selectors,string-no-newline */
	.ant-modal {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		color: rgba(0, 0, 0, 0.85);
		font-size: 14px;
		font-variant: tabular-nums;
		line-height: 1.5715;
		list-style: none;
		font-feature-settings: 'tnum', "tnum";
		pointer-events: none;
		position: relative;
		top: 100px;
		width: auto;
		max-width: calc(100vw - 32px);
		margin: 0 auto;
		padding-bottom: 24px;
	}

	.ant-modal.ant-zoom-enter,
	.ant-modal.antzoom-appear {
		transform: none;
		opacity: 0;
		-webkit-animation-duration: 0.3s;
		animation-duration: 0.3s;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.ant-modal-mask {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1000;
		height: 100%;

	}

	.ant-modal-mask-hidden {
		display: none;
	}

	.ant-modal-wrap {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		overflow: auto;
		outline: 0;
		-webkit-overflow-scrolling: touch;
		background-color: rgba(0, 0, 0, 0.45) !important;
	}

	.ant-modal-wrap {
		z-index: 1000;
	}

	.ant-modal-title {
		margin: 0;
		color: rgba(0, 0, 0, 0.85);
		font-weight: 500;
		font-size: 16px;
		line-height: 22px;
		word-wrap: break-word;
	}

	.ant-modal-content {
		position: relative;
		background-color: #fff;
		background-clip: padding-box;
		border: 0;
		border-radius: 2px;
		box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
		pointer-events: auto;
	}

	.ant-modal-close {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 10;
		padding: 0;
		color: rgba(0, 0, 0, 0.45);
		font-weight: 700;
		line-height: 1;
		text-decoration: none;
		background: transparent;
		border: 0;
		outline: 0;
		cursor: pointer;
		transition: color 0.3s;
	}

	.ant-modal-close-x {
		display: block;
		width: 56px;
		height: 56px;
		font-size: 16px;
		font-style: normal;
		line-height: 56px;
		text-align: center;
		text-transform: none;
		text-rendering: auto;
	}

	.ant-modal-close:focus,
	.ant-modal-close:hover {
		color: rgba(0, 0, 0, 0.75);
		text-decoration: none;
	}

	.ant-modal-header {
		padding: 16px 24px;
		color: rgba(0, 0, 0, 0.85);
		background: #fff;
		border-bottom: 1px solid #f0f0f0;
		border-radius: 2px 2px 0 0;
	}

	.ant-modal-body {
		padding: 24px;
		font-size: 14px;
		line-height: 1.5715;
		word-wrap: break-word;
	}

	.ant-modal-footer {
		padding: 10px 16px;
		text-align: right;
		background: transparent;
		border-top: 1px solid #f0f0f0;
		border-radius: 0 0 2px 2px;
	}

	.ant-modal-footer .ant-btn+.ant-btn:not(.ant-dropdown-trigger) {
		margin-bottom: 0;
		margin-left: 8px;
	}

	.ant-modal-open {
		overflow: hidden;
	}

	.ant-modal-centered {
		z-index: 999999 ;
		text-align: center;
	}
		.ant-modal-centered .el-dialog__wrapper{
		z-index: 999999 !important;
	}

	.ant-modal-centered::before {
		display: inline-block;
		width: 0;
		height: 100%;
		vertical-align: middle;
		content: '';
	}

	.ant-modal-centered .ant-modal {
		top: 0;
		display: inline-block;
		text-align: left;
		vertical-align: middle;
	}

	@media (max-width: 767px) {
		.ant-modal {
			max-width: calc(100vw - 16px);
			margin: 8px auto;
		}

		.ant-modal-centered .ant-modal {
			flex: 1 1;
		}
	}

	.ant-modal-confirm .ant-modal-header {
		display: none;
	}

	.ant-modal-confirm .ant-modal-body {
		padding: 32px 32px 24px;
	}

	.ant-modal-confirm-body-wrapper::before {
		display: table;
		content: '';
	}

	.ant-modal-confirm-body-wrapper::after {
		display: table;
		clear: both;
		content: '';
	}

	.ant-modal-confirm-body .ant-modal-confirm-title {
		display: block;
		overflow: hidden;
		color: rgba(0, 0, 0, 0.85);
		font-weight: 500;
		font-size: 16px;
		line-height: 1.4;
	}

	.ant-modal-confirm-body .ant-modal-confirm-content {
		margin-top: 8px;
		color: rgba(0, 0, 0, 0.85);
		font-size: 14px;
	}

	.ant-modal-confirm-body>.anticon {
		float: left;
		margin-right: 16px;
		font-size: 22px;
	}

	.ant-modal-confirm-body>.anticon+.ant-modal-confirm-title+.ant-modal-confirm-content {
		margin-left: 38px;
	}

	.ant-modal-confirm .ant-modal-confirm-btns {
		float: right;
		margin-top: 24px;
	}

	.ant-modal-confirm .ant-modal-confirm-btns .ant-btn+.ant-btn {
		margin-bottom: 0;
		margin-left: 8px;
	}

	.ant-modal-confirm-error .ant-modal-confirm-body>.anticon {
		color: #ff4d4f;
	}

	.ant-modal-confirm-warning .ant-modal-confirm-body>.anticon,
	.ant-modal-confirm-confirm .ant-modal-confirm-body>.anticon {
		color: #faad14;
	}

	.ant-modal-confirm-info .ant-modal-confirm-body>.anticon {
		color: #d8ad66;
	}

	.ant-modal-confirm-success .ant-modal-confirm-body>.anticon {
		color: #52c41a;
	}

	.ant-modal-wrap-rtl {
		direction: rtl;
	}

	.ant-modal-wrap-rtl .ant-modal-close {
		right: auto;
		right: initial;
		left: 0;
	}

	.ant-modal-wrap-rtl .ant-modal-footer {
		text-align: left;
	}

	.ant-modal-wrap-rtl .ant-modal-footer .ant-btn+.ant-btn {
		margin-right: 8px;
		margin-left: 0;
	}

	.ant-modal-wrap-rtl .ant-modal-confirm-body {
		direction: rtl;
	}

	.ant-modal-wrap-rtl .ant-modal-confirm-body>.anticon {
		float: right;
		margin-right: 0;
		margin-left: 16px;
	}

	.ant-modal-wrap-rtl .ant-modal-confirm-body>.anticon+.ant-modal-confirm-title+.ant-modal-confirm-content {
		margin-right: 38px;
		margin-left: 0;
	}

	.ant-modal-wrap-rtl .ant-modal-confirm-btns {
		float: left;
	}

	.ant-modal-wrap-rtl .ant-modal-confirm-btns .ant-btn+.ant-btn {
		margin-right: 8px;
		margin-left: 0;
	}

	.ant-modal-wrap-rtl.ant-modal-centered .ant-modal {
		text-align: right;
	}

	/* 登录 */
	.login-modal .ant-modal-body {
		padding: 92px 93px 66px;
	}

	.login-item {
		position: relative;
		width: 100%;
		height: 40px;
		margin-top: 0;
		display: flex;
		align-items: center;
		border-radius: 3px;
		background-color: #fffffe;
		border: 1px solid #dbdbdb;
	}

	.login-item .icon-view {
		position: absolute;
		right: 0;
		top: 0;
		width: 40px;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}

	.login-item .icon-view .img-icon {
		width: 24px;
		height: 24px;
	}

	.login-item.login-input-sms-verify {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: inherit;
		border: none;
	}

	.login-item.login-input-sms-verify .login-input-sms {
		width: 192px;
		display: flex;
		align-items: center;
		border: 1px solid #dbdbdb;
		border-radius: 3px;
		background: #ffffff;
	}

	.login-item .err-input,
	.login-item.err-input {
		border: 1px solid #df1f30 !important;
	}

	.login-passwd-icon {
		width: 40px;
		height: 38px;
		background-color: #f7f7f7;
		display: flex;
		cursor: pointer;
		justify-content: center;
		align-items: center;
		color: #333;
	}

	.login-passwd-icon img {
		width: 24px;
		height: 24px;
	}

	.login-phone-area-choose {
		width: 75px;
		height: 100%;
		background-color: #f7f7f7;
		display: flex;
		cursor: pointer;
		justify-content: center;
		align-items: center;
		color: #333;
		font-size: 14px;
		padding: 0 6px;
	}

	.login-phone-area-choose .login-phone-area-code {
		display: inline-block;
		width: 100%;
		text-align: center;
		white-space: nowrap;
		margin: 0 6px 0 0;
	}

	.login-input {
		width: 100%;
		height: 100%;
		font-size: 14px;
		color: #333;
	}

	.login-input input {
		width: 100%;
		height: 100%;
		outline: none;
		padding-left: 15px;
		padding-right: 15px;
	}

	.login-input input::-ms-input-placeholder {
		color: #cecece;
		font-size: 14px;
		padding-left: 0;
	}

	.login-input input::placeholder {
		color: #cecece;
		font-size: 14px;
		padding-left: 0;
	}

	.submit-btn {
		width: 300px;
		height: 40px !important;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		cursor: pointer;
		font-size: 16px;
		border-radius: 3px;
		background-image: linear-gradient(114deg, #eecfb5 -2%, #d8ad66);
	}

	.login-now {
		display: inline-block;
		width: 100%;
		color: #ba9250;
		text-align: center;
		text-decoration: underline;
	}

	.curs {
		cursor: pointer;
		-ms-user-select: none;
		user-select: none;
	}

	.curs:hover {
		color: #ba9250;
	}

	.license {
		color: #ba9250;
	}

	.login-form-forgot {
		color: #333;
		float: right;
		-ms-user-select: none;
		user-select: none;
	}

	.login-bottom {
		width: 300px;
		height: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 20px;
		font-size: 14px;
	}

	.login-bottom .reg {
		color: #333;
	}

	.login-bottom .reg:hover {
		color: #ba9250;
	}

	.login-bottom .password-login {
		color: #ba9250;
		text-decoration: underline;
	}

	.select-content {
		width: 239px;
		max-height: 300px;
		overflow-y: auto;
	}

	.select-content .area-item {
		width: 100%;
		height: 45px;
		padding: 0 15px 0 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #333;
		font-size: 14px;
		cursor: pointer;
	}

	.select-content .area-item:hover {
		background-color: #fff9f5;
		color: #ba9250;
		cursor: pointer;
	}

	.select-content .area-item.action {
		color: #ba9250;
	}

	.login-get-verify-btn {
		width: 98px;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		cursor: pointer;
		font-size: 14px;
		border-radius: 3px;
		background-image: linear-gradient(114deg, #eecfb5 -2%, #d8ad66);
		-ms-user-select: none;
		user-select: none;
	}

	.login-get-verify-btn.sending {
		background-image: none;
		background-color: #9f9f9f;
		cursor: default;
	}

	.login-related {
		position: relative;
		width: 100%;
		height: 100vh;
		min-height: 850px;
		background-image: url(/assets/image/bg.8ff09b7f084fc830a2761f1f1f5741c7.png);
		background-size: cover;
		overflow: hidden;
		object-fit: fill;
	}

	.login-related .view-container {
		width: 527px;
		min-height: 576px;
		position: relative;
		top: 50%;
		transform: translateY(-50%);
		margin: 0 auto 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.login-related .view-container .invalid {
		width: 430px;
		height: 70px;
	}

	.login-related .view-container .view-content {
		width: 527px;
		display: flex;
		padding-bottom: 30px;
		flex-direction: column;
		align-items: center;
		margin-top: 15px;
		border-radius: 10px;
		/*-webkit-backdrop-filter: blur(4px);*/
		/*backdrop-filter: blur(4px);*/
		background-color: rgba(0, 0, 0, 0.4);
		-webkit-backdrop-filter: blur(5px);
		backdrop-filter: blur(5px);
		z-index: -1;
		position: absolute;
		top: 70px;
	}

	.login-related .view-container .view-content .logo-png {
		width: 150px;
		object-fit: contain;
		margin: 30px auto;
	}

	.login-related .view-container .view-content .submit-btn {
		line-height: 0 !important;
		background-image: linear-gradient(114deg, #eecfb5 -2%, #d8ad66);
	}

	.ant-form-item {
		margin-top: 20px;
		margin-bottom: 0;
	}

	.login-related .view-container .view-content .ant-form-item-control-input {
		min-height: 0;
		min-height: initial;
	}

	.login-related .view-container .view-content .ant-checkbox-wrapper,
	.login-related .view-container .view-content .reg,
	.login-related .view-container .view-content .login-form-forgot {
		color: #ffffff;
	}

	.login-related .view-container .view-content .week-choose {
		display: flex;
		cursor: pointer;
		align-items: center;
		color: #ffffff;
	}

	.login-related .view-container .view-content .week-choose p {
		margin: 0;
	}

	.login-related .view-container .view-content .week-choose .check-box {
		position: relative;
		top: 1px;
		width: 15px;
		height: 15px;
		margin-right: 8px;
	}

	.login-related .view-container .view-content .week-choose .no-choose {
		background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4gPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gPGcgZmlsbD0iI0ZGRiIgc3Ryb2tlPSIjOTk5Ij4gPGc+IDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNjEgLTIzMikgdHJhbnNsYXRlKDYzIDE4KSB0cmFuc2xhdGUoOTggMjE0KSI+IDxjaXJjbGUgY3g9IjgiIGN5PSI4IiByPSI3LjUiLz4gPC9nPiA8L2c+IDwvZz4gPC9nPiA8L3N2Zz4g);
		background-size: cover;
	}

	.login-related .view-container .view-content .week-choose .choose {
		background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNyIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE3IDE2Ij4gPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gPGc+IDxnPiA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTk5IC0yMzIpIHRyYW5zbGF0ZSg2MyAxOCkgdHJhbnNsYXRlKDEzNi4xODIgMjE0KSI+IDxjaXJjbGUgY3g9IjgiIGN5PSI4IiByPSI4IiBmaWxsPSIjRERCODkxIi8+IDxwYXRoIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTQuNDI0IDcuNzgzYy0uMjM0LS4yMzUtLjYxNC0uMjM1LS44NDggMC0uMjM1LjIzNC0uMjM1LjYxNCAwIC44NDhsMi42IDIuNmMuMjM0LjIzNS42MTQuMjM1Ljg0OCAwbDUuODA3LTUuODA3Yy4yMzUtLjIzNC4yMzUtLjYxNCAwLS44NDgtLjIzNC0uMjM1LS42MTQtLjIzNS0uODQ4IDBMNi42IDkuOTU4IDQuNDI0IDcuNzgzeiIvPiA8L2c+IDwvZz4gPC9nPiA8L2c+IDwvc3ZnPiA=);
		background-size: cover;
	}

	.sure-btn1 {
		width: 120px;
		height: 40px;
		cursor: pointer;
		text-align: center;
		line-height: 40px;
		font-size: 16px;
		color: #ffffff;
		border-radius: 3px;
		background-image: linear-gradient(114deg, #eecfb5 -2%, #d8ad66);
	}

	.license-modal .ant-modal-header {
		padding: 21.5px 24px;
	}

	.license-modal .ant-modal-close-x {
		height: 66px;
		width: 66px;
	}

	.license-modal .ant-modal-title {
		font-size: 20px;
		font-weight: bold;
		letter-spacing: 0.95px;
		text-align: center;
		color: #ba9250;
	}

	.license-modal .ant-modal-footer {
		width: 100%;
		height: 70px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.license-modal .ant-modal-body {
		height: 262px;
		padding: 13px 15px 5px 30px;
	}

	.license-panel {
		width: 100%;
		height: 100%;
		padding-right: 5px;
		overflow: auto;
	}

	.license-panel::-webkit-scrollbar {
		width: 6px;
		height: 10px;
	}

	.license-panel::-webkit-scrollbar-thumb {
		background: #bfbebe;
		border-radius: 4px;
		height: 10px;
	}

	.license-panel::-webkit-scrollbar-track-piece {
		background: #e8e8e8;
	}

	.license-panel-content {
		font-size: 14px;
		line-height: 1.79;
		letter-spacing: normal;
		text-align: justify;
		color: #333;
	}

	.license-panel-title {
		font-size: 14px;
		padding: 25px 0;
		color: #ba9250;
	}

	.tips-modal .ant-modal-header {
		padding: 14px 24px;
	}

	.tips-modal .ant-modal-title {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #333;
		font-weight: 700;
		font-size: 16px;
	}

	.tips-modal .ant-modal-body {
		padding: 0;
	}

	.tips-modal-content {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 30px;
	}

	.tips-modal-content-text {
		color: #333;
		margin-top: 20px;
		font-size: 14px;
	}

	.tips-modal-png {
		width: 38px;
		height: 38px;
		margin-top: 27px;
	}

	.tips-modal .sure-btn1 {
		width: 280px;
		height: 40px;
		color: #fff;
		font-size: 16px;
		text-align: center;
		line-height: 40px;
		margin-top: 44px;
		cursor: pointer;
		border-radius: 3px;
	}

	input,
	button {
		border: none;
	}

	.ant-checkbox+span {
		font-size: 14px;
		color: rgba(0, 0, 0, .85);
		padding-right: 8px;
		padding-left: 8px;
	}

	.dialog{
		z-index: 999999;
	}

	.dialog .el-dialog__header {
		display: none !important;
	}

	.dialog .el-dialog__body {
		padding: 0 !important;
		;
	}
</style>
