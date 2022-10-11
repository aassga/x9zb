<template>
	<div class="i-tabs-container">
		<div class="header-nav nav-bottom-space">
			<a v-for="(item,index) in tabList" :key="index" @click="tabIndex=index">
				<div class="item" :class="[{'first-item':index==tabIndex},{'first-active':index!=0}]">{{item}}</div>
			</a>
		</div>
		<div class="tab-pane-item" name="基本资料" style="padding-left: 35px;" v-if="tabIndex == 0">
			<div class="basic-info">
				<div class="basic-icon">
					<div class="basic-data-user-avatar-choose">
						<div class="user-avatar">
							
							<div class="user-avatar__img" v-if="message.is_anchor == 1">
								<el-upload class="avatar-uploader"
									:action="'/qiniu/'" :data="QiniuToken" :show-file-list="false"
									:on-success="handleAvatarSuccess1" :before-upload="beforeAvatarUpload">
								
								<div class="lazyload-wrapper">
									<img :src="info.avatar" style="object-fit: cover;">
								</div>
								</el-upload>
								
								<span class="tips">点击图片修改头像</span>
							</div>
							<div class="user-avatar__img" v-else>
								<div class="lazyload-wrapper" @click="centerDialogVisible = true">
									<img :src="info.avatar" style="object-fit: cover;">
								</div>
								<span class="tips">点击图片修改头像</span>
							</div>
						</div>
					</div>
				</div>
				<div class="basic-main">
					<div class="row"><span>昵称：</span><input v-model="info.user_nickname" class="ant-input usrName" type="text" maxlength="10"></div>

					<div class="row"><span>个人简介：</span><input v-model="info.signature" class="ant-input usrDesc" type="text" maxlength="200"></div><span class="i-button i-primary-button submit" style="margin-left: 83px;background-image: linear-gradient(106deg,#eecfb5,#d8ad66);" @click="setInfo()">确认保存</span>
				</div>
			</div>
		</div>
		{{infoDeil}}
		<div class="tab-pane-item" name="修改手机" style="padding-left: 35px;" v-if="tabIndex == 1">
			<div class="basic-data-update-phone">
				<form class="ant-form ant-form-horizontal c-user-form">
					<div class="ant-row ant-form-item item-small" style="row-gap: 0px;">
						<div class="ant-col ant-form-item-label"><label class="" title="当前手机号：">当前手机号</label></div>
						<div class="ant-col ant-form-item-control">
							<div class="ant-form-item-control-input">
								<div class="ant-form-item-control-input-content">
									<p>{{infos.mobile}}</p>
								</div>
							</div>
						</div>
					</div>
					<div class="ant-row ant-form-item" style="row-gap: 0px;">
						<div class="ant-col ant-form-item-label"><label for="phoneNumber" class="ant-form-item-required"
								title="新手机号：">新手机号</label></div>
						<div class="ant-col ant-form-item-control">
							<div class="ant-form-item-control-input">
								<div class="ant-form-item-control-input-content">
									<div class="choose-country" id="phoneNumber">
										<div class="phone-item"><span class="abc">
										<el-select  style="width: 120px;" v-model="codes" placeholder="请选择">
										    <el-option
										      v-for="item in options"
										      :key="item.id"
										      :label="item.code"
										      :value="item.code">
										    </el-option>
										  </el-select>
										
										</span>
										<input autocomplete="off"
												class="ant-input input-phone" v-model="mobile" type="text" placeholder="请输入手机号"
												maxlength="11" value=""></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div style="width: 425px; position: relative;">
						<div class="ant-row ant-form-item" style="row-gap: 0px;">
							<div class="ant-col ant-form-item-label"><label for="phoneCode"
									class="ant-form-item-required" title="验证码：">验证码</label></div>
							<div class="ant-col ant-form-item-control">
								<div class="ant-form-item-control-input">
									<div class="ant-form-item-control-input-content" ><input v-model="code" type="text" maxlength="6"
											placeholder="请输入验证码" id="phoneCode" class="ant-input ant-input-lg"  value="">
									</div>
								</div>
							</div>
						</div>
						<span class="phone-code" @click="count == 0?getCode(9):''" style="line-height: 40px !important;">
							{{count == 0?'获取验证码':count + 's'}}
						</span>
					</div><span class="i-button i-primary-button submit"  @click="setPhone()">确认修改</span>
				</form>
			</div>
		</div>
		<div class="tab-pane-item" name="修改密码" style="padding-left: 35px;" v-if="tabIndex == 2">
			<div class="basic-data-update-password">
				<form class="ant-form ant-form-horizontal c-user-form">
					<div class="ant-row ant-form-item" style="row-gap: 0px;">
						<div class="ant-col ant-form-item-label"><label class="" title="手机号：">手机号</label></div>
						<div class="ant-col ant-form-item-control">
							<div class="ant-form-item-control-input">
								<div class="ant-form-item-control-input-content">
									<p style="color: rgb(153, 153, 153);">{{infos.mobile}}</p>
								</div>
							</div>
						</div>
					</div>
					<div class="captcha" style="display: flex;">
						<div class="ant-row ant-form-item vc-code ant-form-item-has-success" style="row-gap: 0px;">
							<div class="ant-col ant-form-item-label"><label for="VCode" class="ant-form-item-required"
									title="验证码：">验证码</label></div>
							<div class="ant-col ant-form-item-control">
								<div class="ant-form-item-control-input">
									<div class="ant-form-item-control-input-content"><span
											class="ant-input-affix-wrapper ant-input-affix-wrapper-lg"
											style="justify-content: center;width: 192px; margin-right: 10px;padding: 0 9px;"><span
												class="ant-input-prefix"><span role="img" aria-label="safety"
													class="anticon anticon-safety"><svg viewBox="0 0 1024 1024"
														focusable="false" data-icon="safety" width="1em" height="1em"
														fill="currentColor" aria-hidden="true">
														<path
															d="M512 64L128 192v384c0 212.1 171.9 384 384 384s384-171.9 384-384V192L512 64zm312 512c0 172.3-139.7 312-312 312S200 748.3 200 576V246l312-110 312 110v330z">
														</path>
														<path
															d="M378.4 475.1a35.91 35.91 0 00-50.9 0 35.91 35.91 0 000 50.9l129.4 129.4 2.1 2.1a33.98 33.98 0 0048.1 0L730.6 434a33.98 33.98 0 000-48.1l-2.8-2.8a33.98 33.98 0 00-48.1 0L483 579.7 378.4 475.1z">
														</path>
													</svg></span></span><input v-model="code" autocomplete="off" placeholder="请输入验证码"
												maxlength="6" type="text" id="VCode" class="ant-input ant-input-lg"
												value="180026"></span></div>
								</div>
							</div>
						</div><span class="i-button i-default-button button-style"
							style="margin-left: 10px; width: 100px; height: 42px; padding: 4px;font-size: 14px;line-height: 34px;"  @click="count == 0?getCode(2):''">{{count == 0?'获取验证码':count + 's'}}</span>
					</div>
					<div class="ant-row ant-form-item password ant-form-item-has-success" style="row-gap: 0px;">
						<div class="ant-col ant-form-item-label"><label for="password" class="ant-form-item-required"
								title="登录密码：">登录密码</label></div>
						<div class="ant-col ant-form-item-control">
							<div class="ant-form-item-control-input">
								<div class="ant-form-item-control-input-content"><span
										class="ant-input-affix-wrapper ant-input-affix-wrapper-lg ant-input-password ant-input-password-large"><span
											class="ant-input-prefix" style="padding: 9px 0;"><span role="img" aria-label="lock"
												class="anticon anticon-lock"><svg viewBox="64 64 896 896"
													focusable="false" data-icon="lock" width="1em" height="1em"
													fill="currentColor" aria-hidden="true">
													<path
														d="M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM332 240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v224H332V240zm460 600H232V536h560v304zM484 701v53c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-53a48.01 48.01 0 10-56 0z">
													</path>
												</svg></span></span><input autocomplete="off" type="password"
											placeholder="请设置登录密码(6-12位字母/数字)" v-model="password" maxlength="12" action="click"
											id="password" class="ant-input ant-input-lg"><span
											class="ant-input-suffix"><span role="img" aria-label="eye-invisible"
												tabindex="-1"
												class="anticon anticon-eye-invisible ant-input-password-icon"><svg
													viewBox="64 64 896 896" focusable="false" data-icon="eye-invisible"
													width="1em" height="1em" fill="currentColor" aria-hidden="true">
													<path
														d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z">
													</path>
													<path
														d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z">
													</path>
												</svg></span></span></span></div>
							</div>
						</div>
					</div><button class="i-button i-primary-button submit button-style"
						style="width: 192px;" @click="paymentPassword()">确定</button>
				</form>
			</div>
		</div>
		<div class="tab-pane-item" name="我的等级" style="padding-left: 35px;" v-if="tabIndex == 3">
			<div class="basic-level">
				<div class="basic-level-top">
					<div class="basic-level-num">L{{info.exp}}</div>
					<div class="basic-level-exp-container">
						<div class="basic-level-exp" :style="`width:${info.current_exp / needExp * 100}%`"></div>
					</div>
					<div class="basic-level-exp-num">{{info.current_exp}}/{{needExp}}</div>
				</div>
				<div class="basic-level-bottom">
					<div class="basic-level-bottom-info">
						<div class="basic-level-info">Lv.{{info.exp}}</div>
						<div class="basic-level-info">等级</div>
					</div>
					<div class="basic-level-bottom-info">
						<div class="basic-level-info">{{info.current_exp}}</div>
						<div class="basic-level-info">经验值</div>
					</div>
					<div class="basic-level-bottom-info">
						<div class="basic-level-info">{{info.balances}}</div>
						<div class="basic-level-info">钻石<i class="el-icon-warning-outline"></i></div>
					</div>
				</div>
			</div>
		</div>
		
		<el-dialog
		  title="选择头像"
		  :visible.sync="centerDialogVisible"
		  width="40%"
		  center>
		  <ul class="avatarUl flex-wrap">
		  	<li v-for="(item,index) in avatarAllList" :key="index" @click="avatarIndex == index?avatarIndex = null:avatarIndex = index" :class="{'active':avatarIndex == index}">
				<div>
					<img :src="item.url" >
				</div>
			</li>
		  </ul>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="centerDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="setAvatar(avatarIndex,avatarAllList)">确 定</el-button>
		  </span>
		</el-dialog>
		
	</div>
</template>

<script>
	import { updateInfo,getCode,forgotPassword,avatarList  } from '../../api/user.js'
	import { getLevelList } from '../../api/common.js'
	export default {
		props:['infos'],
		data() {
			return {
				info:{
					user_nickname:'',
					signature:'',
					avatar:'',
					// mobile:'',
				},
				codes:'86',
				mobile:'',
				options:[],
				code:'',
				count: 0,
				timer: null,
				show: false,
				tabIndex: 0,
				password:'',
				avatarIndex:null,
				QiniuToken:{},
				avatarAllList:[],
				centerDialogVisible:false,
				// tabList: ['基本资料', '修改手机', '修改密码'],
				tabList: ['基本资料', '修改手机', '修改密码', '我的等级'],
				levelList: [],
			}
		},
		computed:{
			infoDeil(){
				let infos = this.$store.state.infos
				let info = JSON.parse(JSON.stringify(infos))
				this.info = info
				// return infos
			},
			message(){
				return this.$store.state.infos
			},
			needExp() {
				let result = 0;
				if (this.info) {
					let level = this.info.exp ? this.info.exp : 0;
					let level_up = this.levelList[level - 1] ? this.levelList[level - 1].level_up : 0;
					result = level_up;
				}
				return result;
			}
		},
		created() {
			this.getLevelList();	
		},
		mounted() {
			this.getQiniu()
			this.avatarList()
			let system = this.$store.state.system.CountryCode
			// console.log(system);
			this.options = system
		},
		methods:{
			// 修改头像（非主播账号）
			setAvatar(i,list){
				if(i == null) return this.$message.success('请选择头像')
				this.info.avatar = list[i].url
				let data = {
					avatar:this.info.avatar
				}
				this.avatarIndex = null
				this.centerDialogVisible = false
				this.updateInfo(data)
			},
			
			// 获取默认头像
			avatarList(){
				avatarList().then(res=>{
					this.avatarAllList = res.data
				}).catch(res=>{
					
				})
			},
			
			// 修改基本资料
			setInfo(){
				let data = {
					signature:this.info.signature,
					user_nickname:this.info.user_nickname
				}
				this.updateInfo(data)
			},
			// 修改手机号
			setPhone(){
				let data = {
					mobile:this.codes + '-'+ this.mobile,
					code:this.code
				}
				if(!data.mobile){
					return this.$message.warning('请输入手机号')
				}else if(!data.code){
					return this.$message.warning('请输入验证码')
				}
				this.updateInfo(data)
			},
			// 修改密码
			paymentPassword(){
				let data = {
					password:this.password,
					code:this.code,
					mobile:this.infos.mobile
				}
				if(!data.mobile){
					return this.$message.warning('请输入手机号')
				}else if(!data.code){
					return this.$message.warning('请输入验证码')
				}else if(!data.password){
					return this.$message.warning('请输入密码')
				}
				forgotPassword(data).then(res=>{
					this.code = ''
					this.password = ''
					this.$message.success('修改成功')
				}).catch(res=>{})
			},
			
			// 修改用户信息
			updateInfo(data){
				updateInfo(data).then(res=>{
					this.mobile = ''
					this.code = ''
					this.password = ''
					this.$message.success('修改成功')
					this.$store.dispatch('getUserInfo','')
					this.$store.dispatch('updateMyProfile',this.message)
				}).catch(res=>{})
			},
			// 图片上传返回地址
			handleAvatarSuccess1(res, file){
				this.info.avatar = `${this.QiniuToken.domain}/${res.key}`
				let data = {
					avatar:this.info.avatar
				}
				this.updateInfo(data)
			},
			
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
			beforeAvatarUpload(file){
				const fileName =
				new Date().valueOf().toString() +
				this.$common.rand() +
				file.name.slice(file.name.lastIndexOf("."));
				  this.QiniuToken.data = file;
				  this.QiniuToken.key = `${fileName}`; 
			},
			// 获取手机验证码
			getCode(type) {
				let data = {
					mobile: this.infos.mobile,
					type: type //银行卡
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
					console.log(1);
					this.count = TIME_COUNT;
					this.show = true;
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
			},
			// 取得等級表
			getLevelList() {
				getLevelList().then(res => {
					this.levelList = res.data;
				})
			}
		}
	}
</script>

<style>
.avatarUl li {
	width: calc(100% / 6);
	height: 77px;
	margin-bottom: 25px;
	cursor: pointer;
	position: relative;
}
.avatarUl::after{
	content: '';
	flex: 1;
	height: 1px;
	width: calc(100% / 6);
}
/* .avatarUl li::after{
	content: '';
	flex: 1;
	height: 1px;
	width: calc(100% / 6);
} */
.avatarUl li div {
	width: 77px;
	height: 77px;
	overflow: hidden;
	margin: 0 auto;
	border: 2px solid #fff;
	border-radius: 50%;
}
.avatarUl .active div{
	border: 2px solid #d8ad66;
}
.avatarUl li img{
	width: 100%;
	height: 77px;
	transition: all .5s;
	object-fit: cover;
}
.avatarUl li:hover img{
	
	transform: scale(1.2);
}

.avatarUl .active::after{
    content: "";
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
    right: 20px;
    bottom: 0;
    z-index: 3;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAY1BMVEUAAADctIrcs4netIzbtIrhuYzbs4nbs4nctIrbtIrft4z/4MDcs4rbs4vftorcs4rctIrctYrctYviuZDlupDowYvcs4vbtIvdtYvcs4rctIrbs4rctYvdtIrctozdt4nbs4ldXGT4AAAAIHRSTlMA2cdV+iDz7L6BMQPWQD/MrpBiFxALpIhP0b+5bmlJQ2xN8SsAAADDSURBVCjPhdPZEoMgDAXQC1ZZ3FqttXvz/1/ZEVFAKb0vPJyZoEnAGq0kKwomlcY2GaM1LAso5xSE584aQZuIZrH6QLscrOaCIhFzZU7RcPOd9CMZABa5cGynPwJ0xN7oplND7e2K3JRTkBHr56sk2NYy9JVtIwpzVo8FnVFh8YORTDqcb7SgLXsscbLWuulAkqcv30hCkdMnBr+XyjXhUiI00gBzOtx9Y0HjeRU2PjWy5LDTa2J1v2B1ajX/L3XyOXwBN4ZCE93s5u8AAAAASUVORK5CYII=);
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.basic-level {
	width: 100%;
	padding: 40px;
	box-sizing: border-box;
}
.basic-level-top {
	display: flex;
	align-items: center;
	margin-bottom: 40px;
}
.basic-level-top .basic-level-num {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 60px;
	height: 28px;
	border-radius: 10px;
	color: #fff;
	background: #aaa;
}
.basic-level-exp-container {
	width: 350px;
	height: 10px;
	margin: 0 30px;
	border-radius: 20px;
	background: #ebebeb;
}
.basic-level-exp-container .basic-level-exp {
	height: 100%;
	background: #fec815;
	border-radius: 20px;
}
.basic-level-exp-container .basic-level-exp-num {
	font-weight: bold;
}
.basic-level-bottom {
	display: flex;
	align-items: center;
	margin-bottom: 40px;
}
.basic-level-bottom-info {
	padding: 10px 0;
    min-width: 150px;
}
.basic-level-bottom-info .basic-level-info {
	width: 100%;
	margin-bottom: 10px;
	text-align: center;
	font-weight: bold;
}
.basic-level-bottom-info .basic-level-info i {
	position: relative;
	top: -5px;
	right: -5px;
	color: #c8c8c8;
}
.basic-level-bottom-info:not(:last-child) {
	border-right: 1px solid #e8e8e8;
}
</style>
