<!-- 个人 -->
<template>
	<div class="personal-home-page" style="padding-top: 60px;margin-top: 20px;margin-bottom: 0;">
		<!-- <img class="personal-home-page-bg"
			src="/_next/static/images/bf@2x-419c1a19238c610a991db46342b65218.png" alt="bg"> -->
		<nav class="nav"><img class="usr" :src="infos.avatar || require('../../assets/images/userLogo.png')" alt="" title="">
			<div class="name1" :title="infos.user_nickname">{{infos.user_nickname}}</div>
			<ul>
				<!-- v-if="Number(infos.is_anchor) == 0?index < 8:index < 11 && index !=  7" -->
				<li :class="[navBarIndex==item.id?'cur':'',item.icon]" v-for="(item,index) in navBar" v-if="Number(infos.is_anchor) == 0?item.id < 8:item.id < 11 && item.id !=  7"  :key="item.id" @click="navBarIndex = item.id">
					<a :class="navBarIndex==item.id?'cur':''">
						<span class="name"><i class="iconfont"></i>{{item.name}}</span>
					</a>
				</li>
				<li class="creation" v-if="infos.is_writer == 1" :class="{'cur':navBarIndex == 11}" @click="navBarIndex = 11">
					<a :class="{'cur':navBarIndex == 11}" target="_self">
						<span class="name"> <i class="iconfont"></i>我的创作</span>
					</a>
				</li>
			</ul>
		</nav>

		<!-- 设置二级密码 -->
		<el-dialog title="" :center="true" :visible.sync="dialogVisible" :close-on-click-modal="false" width="547px" top="30vh">
			<div role="document" class="ant-modal wallet-bind-bank-card-modal" style="width: 100%;">
				<div class="ant-modal-content" style="transform: translateY(-100px);"><button type="button" aria-label="Close" class="ant-modal-close"><span class="ant-modal-close-x"><span role="img" aria-label="close"
								class="anticon anticon-close ant-modal-close-icon"><svg  @click="dialogVisible =false" viewBox="64 64 896 896"
									focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor"
									aria-hidden="true">
									<path
										d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z">
									</path>
								</svg></span></span>
								
							</button>
					<div class="ant-modal-body">
						<div class="title">设置支付密码</div>
						<div class="text">验证码将发送到您的手机：{{infos.mobile}}</div>
						<form class="ant-form ant-form-horizontal">
							<div class="ant-row ant-form-item" style="row-gap: 0px;">
								<div class="ant-col ant-form-item-label"><label for="password"
										class="ant-form-item-required" title="设置密码：">设置密码</label></div>
								<div class="ant-col ant-form-item-control">
									<div class="ant-form-item-control-input">
										<div class="ant-form-item-control-input-content"><span
												class="ant-input-affix-wrapper ant-input-affix-wrapper-lg ant-input-password ant-input-password-large"><input
													placeholder="请输入密码,不少于6位数" v-model="password" action="click" id="password"
													type="password" class="ant-input ant-input-lg">
													</span>
													</div>
									</div>
								</div>
							</div>
							<div class="ant-row ant-form-item" style="row-gap: 0px;">
								<div class="ant-col ant-form-item-label"><label for="confirmPassword"
										class="ant-form-item-required" title="确认密码：">确认密码</label></div>
								<div class="ant-col ant-form-item-control">
									<div class="ant-form-item-control-input">
										<div class="ant-form-item-control-input-content"><span
												class="ant-input-affix-wrapper ant-input-affix-wrapper-lg ant-input-password ant-input-password-large"><input
													placeholder="请输入相同的密码" v-model="password1" action="click" id="confirmPassword"
													type="password" class="ant-input ant-input-lg"></span></div>
									</div>
								</div>
							</div>
							<div class="ant-row ant-form-item" style="row-gap: 0px;">
								<div class="ant-col ant-form-item-label"><label for="verifyCode"
										class="ant-form-item-required" title="验证码：">验证码</label></div>
								<div class="ant-col ant-form-item-control">
									<div class="ant-form-item-control-input">
										<div class="ant-form-item-control-input-content">
											<div class="wallet-verify-input"><input maxlength="8" v-model="code" placeholder="请输入验证码"
													type="text" class="ant-input ant-input-lg" value="">
												<div class="btn get-verify-btn" @click="getCode()">{{show?'获取验证码':count + 's'}}</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="pay-password-btn-group">
								<div class="btn ok" data-id="handleSubmit" @click="paymentPassword()">确定</div>
								<div class="btn cancel" @click="dialogVisible =false">取消</div>
							</div>
						</form>
					</div>
				</div>
				<div tabindex="0" aria-hidden="true" style="width: 0px; height: 0px; overflow: hidden; outline: none;">
				</div>
			</div>
		</el-dialog>

		<section>
			<div class="personDes" v-if="navBarIndex != 1">
				<div class="des" v-if="infos.signature"><span>个人简介 ：</span><i>{{infos.signature}}</i></div>
				<div class="num">我的粉丝数 ：<i>{{infos.attention}}</i></div>
			</div>
			<div class="wallet-header-container" v-else>
				<div class="wallet-header">
					<div class="info">
						<div class="consume">
							<div class="up">
								<div class="icon"></div>
								<div class="name">消费钱包</div>
							</div>
							<div class="bottom">钻石数量：<div class="num">{{infos.balance}}</div>
							</div>
						</div>
						<div class="income">
							<div class="up flex">
								<div class="flex-start">
									<div class="icon"></div>
									<div class="name">收入钱包</div>
								</div>
								
								<!-- <el-popconfirm
								  @confirm="confirm"
								  title="转化后不可提现，只能消费、请确认"
								>
								</el-popconfirm> -->
								<div class="btn" @click="isbalance = true">转消费钱包</div>
							</div>
							
							<div class="bottom">
								<div class="space">可提现钻石：<div class="num">{{infos.withdrawal_balance}}</div>
								</div>
								<div class="space">待结算钻石：<div class="num">0</div>
								</div>
								<div>累计到账：<div class="num">0</div> 元</div>
							</div>
						</div>
					</div>
					<div class="right-btn-group"><a>
							<div class="btn btn-up" @click="$refs.wallet.setIndex(true)"></div>
						</a>
						<div class="btn btn-bottom" @click="getwithed()"></div>
					</div>
				</div>
			</div>
			<userinfo v-if="navBarIndex ==0" :infos="infos"></userinfo>
			<wallet v-if="navBarIndex==1" ref="wallet" @chagedialog="chagedialog"></wallet>
			<concern v-if="navBarIndex==2"></concern>
			<collection v-if="navBarIndex==3"></collection>
			<reserve v-if="navBarIndex==4"></reserve>
			<grade v-if="navBarIndex==5"></grade>
			<information v-if="navBarIndex==6"></information>
			<apply v-if="navBarIndex==7"></apply>
			<reserved v-if="navBarIndex==8"></reserved>
			<broadcast v-if="navBarIndex==9"></broadcast>
			<div class="i-tabs-container" style="padding: 20px 30px;" v-if="navBarIndex==10">
				<div class="row notice flex-start"><span style="align-self: flex-start;">主播公告：</span>
					<div class="ant-input-textarea ant-input-textarea-show-count room-desc"
						style="display: inline-block; width: 528px;"><textarea maxlength="50" v-model="content"
							placeholder="不能超过50个字" class="ant-input"
							style="margin-top: 0px; margin-bottom: 0px; height: 102px;">解说更多精彩赛事直播，欢迎关注哦！</textarea>
					</div>
				</div>
				<button class="i-button i-primary-image-button "
					style="margin-left: 83px; background-image: linear-gradient(106deg, rgb(238, 207, 181), rgb(216, 173, 102));margin-top: 40px;"
					@click="setPlacard()">确认保存</button>
			</div>
			<write  v-if="navBarIndex==11 && infos.is_writer == 1"></write>
		</section>
		
		<!-- 转入消费金额弹窗 -->
		<el-dialog
		  title="提示"
		  :visible.sync="isbalance"
		  width="30%"
		  >
		  <div style="padding: 20px;">
			  <div class="flex" style="margin-bottom: 10px;">
				   <p style="text-align: left;">转化后不可提现，只能消费、请确认!</p>
				  <img style="width: 108px;height: 12px;" src="../../assets/images/comparison.png" >
			  </div>
			 
			    
			   <el-input v-model="balanceiInput" placeholder="请输入转入金额"></el-input>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="isbalance = false">取 消</el-button>
		    <el-button type="primary" @click="confirm">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	import userinfo from './userinfo'
	import wallet from './wallet.vue'
	import concern from './concern.vue'
	import collection from './collection.vue'
	import reserve from './reserve.vue'
	import grade from './grade.vue'
	import information from './information.vue'
	import apply from './apply.vue'
	import reserved from './reserved.vue'
	import broadcast from './broadcast.vue'
	import write from './write.vue'
	import {
		getCode,
		getPlacard,
		setPlacard,
		paymentPassword,
		conversionBalance,
	} from '../../api/user.js'
	export default {
		components: {
			write,
			apply,
			grade,
			wallet,
			concern,
			reserve,
			reserved,
			userinfo,
			broadcast,
			collection,
			information,
		},
		data() {
			return {
				is: false,
				info: {},
				balanceiInput:'',//转入金额
				password:'',//获取验证码
				password1:'',//获取验证码
				code:'',//获取验证码
				count: 0,//获取验证码
				timer: null,//获取验证码
				show: true,//获取验证码
				dialogVisible: false,
				isbalance:false,
				content: '', //主播公告
				placard: {}, //主播公告
				navBarIndex: 0,
				navBar: [{
					id:0,
						name: '个人资料',
						icon: 'basic-data'
					},
					// {
					// 	id:1,
					// 	name: '我的钱包',
					// 	icon: 'wallet'
					// },
					// {
					// 	id:2,
					// 	name: '我的关注',
					// 	icon: 'concern'
					// },
					{
						id:3,
						name: '我的收藏',
						icon: 'collection'
					},
					{
						id:4,
						name: '预约观看',
						icon: 'reserve'
					},
					{
						id:5,
						name: '我的等级',
						icon: 'grade'
					},
					// {
					// 	id:6,
					// 	name: '喇叭消息',
					// 	icon: 'information'
					// },
					{
						id:7,
						name: '申请主播',
						icon: 'apply'
					},
					{
						id:8,
						name: '预约开播',
						icon: 'live-reverse'
					},
					{
						id:9,
						name: '我要直播',
						icon: 'start_live'
					},
					{
						id:10,
						name: '主播公告',
						icon: 'announcement'
					}
				]
			}
		},
		watch: {
			navBarIndex(e) {
				localStorage.setItem('tabIndex', e)
			}
		},
		computed: {
			infos() {
				return this.$store.state.infos
			}
		},
		mounted() {
			// 获取缓存信息
			let info = localStorage.getItem('userInfo')
			this.info = JSON.parse(info)
			let query = this.$route.query
			// 判断是否是打开充值
			
			// console.log();
			
			if (query && query.type) {
				this.navBarIndex = query.type
				localStorage.setItem('tabIndex', query.type)
			}
			if(query.type == 1 && query.isRecharge){
				this.$nextTick(res=>{
					this.$refs.wallet.setIndex(true)
				})
			}
			let tabIndex = localStorage.getItem('tabIndex')
			this.navBarIndex = Number(tabIndex)
			this.getPlacard()
			// console.log(this.$store);
			// 登录im
			if(JSON.stringify(this.infos) == '{}') return
			//this.$store.dispatch('loginTim','')
			// 修改信息im
			
			// 需判断是否登录
			// setTimeout(res => {
			// 	this.$store.dispatch('updateMyProfile', this.info)
			// })
		},
		methods: {
			// 
			getwithed(){
				if(this.infos.is_defray_pass == 0){//1是 0否
					return this.dialogVisible = true
				}
				this.$refs.wallet.dialogVisible1 = true
			},
			// 转化金额
			confirm(){
				conversionBalance({amount:this.balanceiInput}).then(res=>{
					this.$store.dispatch('getUserInfo','')
					this.$message.success('转入成功')
					this.isbalance = false
				}).catch(res=>{
					
				})
			},
			// 子传父打开弹窗
			chagedialog(){
				this.dialogVisible = true
			},
			// 获取手机验证码
			getCode() {
				let data = {
					mobile: this.infos.mobile,
					type: 5
				}
				getCode(data).then(res => {
					this.getCount()
				}).catch(res => {
					console.log('失败' + res);
				})
			},
			paymentPassword(){
				let data = {
					password:this.password,
					code:this.code
				}
				if(!this.password1 && !this.password && !this.code) {
					return this.$message.warning('请输入有误，请检查！')
				}
				if(this.password1 != data.password) {
					return this.$message.warning('两次密码不同，请检查！')
				}
				
				paymentPassword(data).then(res=>{
					this.$store.dispatch('getUserInfo','')
					this.$message.success('设置成功！')
					this.dialogVisible =false
				}).catch(res=>{})
			},
			// 验证码倒计时
			getCount() {
				const TIME_COUNT = 60;
				if (!this.timer) {
					console.log(1);
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
			},


			// 获取主播公告
			getPlacard() {
				// 根据后台给出的的详情判断是否为主播 是则触发方法
				getPlacard().then(res => {
					this.placard = res.data
					this.content = res.data.data
				}).catch(res => {})
			},
			// 添加修改主播公告
			setPlacard() {
				if (!this.content) {
					return this.$message.warning('请输入主播公告内容')
				}
				setPlacard({
					content: this.content
				}).then(res => {
					if (this.placard.data) {
						this.$message.success('修改成功')
					} else {
						this.$message.success('添加成功')
					}
					this.getPlacard()
				}).catch(res => {})
			}

		}
	}
</script>

<style scoped="scoped">
	@import url("~@/styles/member.css");

	.wallet-header-container {
		height: 100px;
		color: #999;
		display: flex;
		margin-bottom: 15px;
		align-items: center;
		box-sizing: border-box;
		padding: 0 42px;
		background: url(../../assets/images/img-gerenjianjie-beijing.jpg) no-repeat 50%;
		background-size: cover;
		border-radius: 4px;
		box-shadow: 0 6px 12px 0 rgb(69 74 99 / 8%);
	}

	/* .ant-modal {
		top: 0 !important;
	} */
	.wallet-header-container .wallet-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 100%;
	}

	.wallet-header-container .wallet-header .info {
		width: 790px;
		display: flex;
		align-items: center;
		height: 100%;
		color: #67728f;
	}

	.wallet-header-container .wallet-header .right-btn-group {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 90px;
		height: 100%;
	}

	.wallet-header-container .wallet-header .info .consume {
		margin-right: 95px;
	}

	.wallet-header-container .wallet-header .info .up {
		display: flex;
		margin-bottom: 5px;
	}

	.wallet-header-container .wallet-header .info .up .icon {
		width: 28px;
		height: 33px;
		margin-right: 6px;
		background-repeat: no-repeat;
		background-size: contain;
	}
	.up .btn{
		background-image: linear-gradient(106deg, rgb(238, 207, 181), rgb(216, 173, 102));padding: 4px 11px;border-radius: 4px;color: #fff;
	}
</style>
