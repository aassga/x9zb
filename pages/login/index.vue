<!-- 登录注册 -->
<template>
	<view class="index">
		<downloadHead v-if="show1"></downloadHead>
		<image @click="back()" src="../../static/images/live/grade-left.png" class="back" mode=""></image>
		<!-- 手机号登录 -->
		<view class="login"  v-if="type==1&&current==0">
			<view class="" style="width: 325rpx;margin-top: 140rpx;">
				<u-tabs :list="tabList" bg-color="" inactive-color="#B3B4B7" bar-width="120" :is-scroll="false" gutter="400" font-size="32" active-color="#E3AC72" :current="current" @change="change"></u-tabs>
			</view>
			<view class="input flex-start">
				<view class="input-left flex-center" @click="region=!region">
					<text>{{from.code1}}</text>
					<image style="width:22rpx;height: 12rpx;margin-left:16rpx" src="../../static/images/login/login2.png" mode=""></image>
				</view>
				<input type="text" value="" placeholder-style="color:white" v-model="from.mobile"  placeholder="请输入手机号码" />
			</view>
			<view class="input flex-start">
				<view class="input-left flex-center">
					<image style="width:32rpx;height: 36rpx;" src="../../static/images/login/login4.png" mode=""></image>
				</view>
				<input type="text" value="" v-model="from.code" placeholder-style="color:white" placeholder="请输入验证码" />
				<text @tap="getCode(3)">{{tips}}</text>
				
			</view>
			
			<view class="btn" :class="{'btn-active':from.code != 0 }" @click="submit(1)">
				登录
			</view>
		</view>
		<!-- 密码登录 -->
		<view class="passlogin" v-if="type==1&&current==1">
			<view class="" style="width: 325rpx;margin-top: 140rpx;">
				<u-tabs :list="tabList" bg-color="" inactive-color="#B3B4B7" bar-width="120" :is-scroll="false" gutter="400" font-size="32" active-color="#E3AC72" :current="current" @change="change"></u-tabs>
			</view>
			<view class="input flex-start">
				<view class="input-left flex-center"  @click="region=!region"> 
					<text>{{from.code1}}</text>
					<image style="width:22rpx;height: 12rpx;margin-left:16rpx" src="../../static/images/login/login2.png" mode=""></image>
				</view>
				<input v-model="from.mobile" type="text" value="" placeholder-style="color:white" placeholder="请输入手机号码" />
			</view>
			<view class="input flex-start inputCss">
				<view class="input-left flex-center">
					<image style="width:32rpx;height: 36rpx;" src="../../static/images/login/login5.png"  mode=""></image>
				</view>
				<u-input class="inp" placeholder="请输入密码" v-model="from.password"  type="password" style="padding-left: 20rpx;" :password-icon="true" placeholder-style="color: #fff" />
				<!-- <input type="text" value="" v-model="from.password" placeholder-style="color:white" placeholder="请输入密码" /> -->
				<!-- <image style="width: 36rpx;height: 24rpx;" src="../../static/images/login/login3.png" mode=""></image> -->
			</view>
			
			<view class="btn" :class="{'btn-active':from.password != 0 }" @click="submit(2)">
				登录
			</view>
			
		</view>
		<!-- w忘记密码 -->
		<view class="regit" v-if="type==2">
			<view class="" style="width: 325rpx;margin-top: 140rpx;">
				<u-tabs :list="tabList" bg-color="" inactive-color="#B3B4B7" bar-width="120" :is-scroll="false" gutter="400" font-size="32" active-color="#E3AC72" :current="current" @change="change"></u-tabs>
			</view>
			<view class="input flex-start">
				<view class="input-left flex-center">
					<text>{{from.code1}}</text>
					<image style="width:22rpx;height: 12rpx;margin-left:16rpx" src="../../static/images/login/login2.png" mode=""></image>
				</view>
				<input type="text" value="" v-model="from.mobile" placeholder-style="color:white" placeholder="请输入手机号码" />
			</view>
			<view class="input flex-start">
				<view class="input-left flex-center">
					<image style="width:32rpx;height: 36rpx;" src="../../static/images/login/login4.png" mode=""></image>
				</view>
				<input type="text" value="" placeholder-style="color:white" placeholder="请输入验证码" />
				<text @tap="getCode(2)">{{tips}}</text>
			</view>
			<view class="input flex-start inputCss">
				<u-input class="inp" v-model="from.password" placeholder="请输入密码"  type="password" style="padding-left: 20rpx;" :password-icon="true" placeholder-style="color: #fff" />
			</view>
			<!-- <view class="input flex-start inputCss">
				<u-input class="inp" v-model="from.password"  type="password" style="padding-left: 20rpx;" :password-icon="true" placeholder-style="color: #fff" />
			</view> -->
			<view class="btn" :class="{'btn-active':from.password != 0 }" @click="submit(3)">
				确认提交
			</view>
		</view>
		<!-- ''''''''''''''''''''''''注册 -->
		<view class="regit" v-if="type==3">
			<view class="" style="width: 325rpx;margin-top: 140rpx;">
				<u-tabs :list="tabList" bg-color="" inactive-color="#B3B4B7" bar-width="120" :is-scroll="false" gutter="400" font-size="32" active-color="#E3AC72" :current="current" @change="change"></u-tabs>
			</view>
			<view class="input flex-start">
				<view class="input-left flex-center" @click="region=!region">
					<text>{{from.code1}}</text>
					<image style="width:22rpx;height: 12rpx;margin-left:16rpx" src="../../static/images/login/login2.png" mode=""></image>
				</view>
				<input type="text" value="" v-model="from.mobile" placeholder-style="color:white" placeholder="请输入手机号码" />
			</view>
			<view class="input flex-start">
				<view class="input-left flex-center">
					<image style="width:32rpx;height: 36rpx;" src="../../static/images/login/login4.png" mode=""></image>
				</view>
				<input type="text" value="" v-model="from.code" placeholder-style="color:white" placeholder="请输入验证码" />
				<text @tap="getCode(1)">{{tips}}</text>
			</view>
			<view class="input flex-start inputCss">
				<u-input class="inp" placeholder="请输入密码" v-model="from.password"  type="password" style="padding-left: 20rpx;" :password-icon="true" placeholder-style="color: #fff" />
			</view>
			<!-- <view class="input flex-start">
				<input type="text" value="" placeholder-style="color:white" placeholder="请重新输入密码" />
			</view> -->
			<view class="btn" :class="{'btn-active':from.password != 0 }" @click="submit(4)">
				注册
			</view>
		</view>
		<view class="btn-tab flex" v-if="type==1">
			<text style="color: #E3AC72;" @click="type=3,tabList=[{name:'注册新账号'},{}]">注册新账号</text>
			<text @click="onHandleGoPrivacy">隐私协议</text>
			<text @click="type=2,tabList=[{name:'忘记密码'},{}]">忘记密码?</text>
		</view>
		<!-- 倒计时插件 -->
		<u-verification-code @change="codeChange" :seconds="seconds" ref="uCode" ></u-verification-code>
		<!-- <u-picker v-model="region" mode="time"></u-picker> -->
		<u-picker mode="selector" :range="countryCode" @confirm="regionConfirm" v-model="region" range-key="nameCode" :default-selector="[0]"></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:1,
				current:0,
				seconds:60,
				custom:{
					'padding':'20px'
				},
				region:false,
				tabList: [
					{
						name:'手机登录'
					},
					{
						name:'密码登录'
					}
				],
				tips:'',//验证码倒计时
				from:{
					mobile:'',
					password:'',
					code1:'+86',
					code:'',
					device_type:'web'
				},
				countryCode:[],//区号
			}
		},
		computed:{
			system(){
				return this.$store.state.system
			},
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
			type(e){
				if(e==2 || e== 3){
					this.current = 0
				}
			},
			region(e){
				if(e){
					this.countryCode = []
					this.getCountryCode()
				}
			}
		},
		mounted() {
			if (localStorage.getItem('isRegister') == '1') {
				this.type = 3;
			}
			localStorage.removeItem('isRegister');
		},
		methods:{
			onHandleGoPrivacy(){
				uni.navigateTo({
					url:'/pages/prococol/privacy'
				})
			},
			// 提交表单
			submit(type){//1注册 ，2登录 ， 3忘记密码	
				if(!this.from.mobile) return this.$u.toast('请输入手机号');
				if(type == 2 && !this.from.password) return this.$u.toast('请输入登录密码');
				
				if(type == 1 && !this.from.code) return this.$u.toast('请输入验证码');
				if(type == 3 || type == 4 && !this.from.code) return this.$u.toast('请输入验证码');
				if(type == 3 || type == 4 && !this.from.password) return this.$u.toast('请输入密码');
				
				let obj = JSON.parse(JSON.stringify(this.from))
				obj.mobile = (this.from.code1).slice(1) + '-' + this.from.mobile
				if(type == 1 || type == 2){//登录
					if(type == 2){
						obj.code = '' 
					}
					this.$u.get('/api/user/login',obj).then(res => {
						this.$store.state.info = res
						localStorage.setItem("userInfo",JSON.stringify(res))
						localStorage.removeItem("userid");
						uni.setStorage({
							key:'information',
							data:res
						})
						// this.$store.dispatch('getInfo',this.$u)
						// this.$store.dispatch('logout','')
						setTimeout(() => {
							// this.$store.dispatch('loginTim','')
							let hash = localStorage.getItem('backTo');
							localStorage.removeItem('backTo');
							if (hash) {
								return location.hash = hash;
							}
							uni.reLaunch({
								url:'/pages/competition/index'
							})
						}, 200)
					})
				}
				if(type == 3) {//忘记密码
					this.$u.get('/api/user/forgotPassword',this.from).then(res => {
						
					})
				}
				if(type == 4) {//注册
					this.from.channel_code = localStorage.getItem('channel')
					if(localStorage.getItem("userid")){
						this.from.guest_id = localStorage.getItem("userid")
					}else {
						const userid =
							10000000 +
							Math.random()
							.toString()
							.slice(-6);
						localStorage.setItem("userid", userid);
						this.from.guest_id = userid
					}
					this.$u.get('/api/user/registered',this.from).then(res => {
						if(res){
							this.type = 1;
						}
					})
				}
				
			},
			
			// 获取验证码
			getCode(code){
				if(!this.from.mobile) return this.$u.toast('请输入手机号');
				if(this.$refs.uCode.canGetCode) {
					this.$u.get('/api/user/getCode',{type:code,mobile:this.from.mobile}).then(res => {
						this.$u.toast('验证码已发送');
						this.$refs.uCode.start();
					})
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			codeChange(text) {
				this.tips = text;
			},
			
			//获取国家区号
			getCountryCode(){
				let CountryCode = []
				this.system.CountryCode.forEach(item=>{
					item.nameCode =  '+' + item.code + ' ' + item.name
					this.countryCode.push(item)
				})
				
			},
			
			change(e){
				this.current = e
			},
			// 地区选中回调
			regionConfirm(e){
				this.from.code1 = '+' + this.countryCode[e[0]].code
				// console.log();
			},
			back(){
				if(this.type == 1){
					this.$u.route({type:'back'})
				}else {
					this.type = 1
					this.tabList = [
					{
						name:'手机登录'
					},
					{
						name:'密码登录'
					}
				]
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.index {
		padding: 0 48rpx;
		min-height: 100vh;
		background: url(../../static/images/login/index-bg.png)center top / auto 100% no-repeat;
	}
	.back {
		width: 40rpx;
		height: 40rpx;
		margin-top: 16rpx;
	}
	.input {
		padding: 28rpx 0;
		margin-top: 70rpx;
		.input-left {
			color: #fff;
			width: 130rpx;
			border-right:2rpx solid #fff;
		}
		input {
			flex: 1;
			color: #fff;
			font-size: 30rpx;
			margin-left: 32rpx;
		}
		text {
			color: #E3AC72;
			font-size: 28rpx;
		}
		border-bottom: 2rpx solid #FFF;
	}
	.btn {
		color: #fff;
		text-align: center;
		font-size: 36rpx;
		padding: 28rpx 0;
		border-radius: 100rpx;
		// opacity: 0.3;
		margin-top: 96rpx;
		background-color: rgba(255,255,255,0.7);
	}
	.btn-tab {
		color: #fff;
		font-size: 30rpx;
		margin-top: 66rpx;
	}
	.btn-active {
		background: linear-gradient(90deg, #FFDFAB 0%, #E3AC72 100%);
	}
	.inputCss{
		 /deep/ .inp{
			.u-input__input{
				color: #fff !important;//颜色在这里
			} 
			// .u-input__right-icon__item {
			// 	margin-top: 16rpx;
			// }
		 }
	}
</style>
