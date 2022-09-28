<!-- 聊天 -->
<template>
	<view class="chat">
		<view class="chat-tips">
			<!-- <image src="/static/images/competition/chat1.png" mode=""></image> -->
			<!-- <text>任何群、广告均为诈骗，违规者封号处理</text> -->
			<!-- {{system.announcement1}} -->
			<u-notice-bar style="width: 100%;" mode="horizontal" :list="system.announcement1"></u-notice-bar>
		</view>
		<view class="nones"  v-if="JSON.stringify(infos) == '{}'">
			<image src="/static/images/competition/none.png" class="none" mode=""></image>
			<view>暂无数据</view>
		</view>
		<view class="detail-room" style="height: 49vh;margin-top: 56rpx;overflow: hidden;" v-else>
			<scroll-view scroll-y="true" style="height: 100%;">
				<view class="messageList" v-if="messageList.length != 0">
					<view class="msgLi" v-for="(item,index) in messageList" :key="index">
						<view 
						><text  v-html="getText(item.normal.text)"  @click="showTips(index)">{{item.nick}}：</text>
<text v-if="tipsId == index" class="txt-control" @click="copyText(item.normal.text)">复制<i/></text>
					</view>
						<input class="cp-input2" type="text" />
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="submit flex">
			<view class="submit-input flex-start" v-if="JSON.stringify(infos) == '{}'" @click="$navigateTo('../login/index')">
				<text>登录</text>
				<view>发弹幕，参与主播互动</view>
			</view>
			<view class="detail-input-i flex" v-else>
				<input type="text" v-model="content" value="" placeholder="发弹幕，参与主播互动"/>
				<!-- <image src="/static/images/live/live-6.png" mode=""></image> -->
			</view>
			<!-- <image src="/static/images/competition/chat2.png" mode=""></image> -->
			<view class="btn" v-if="content.length != 0" @click="setMessage()">
				发送
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['base'],
		data() {
			return {
				content:'',
				tipsId:-1,
				bannar: ['任何群、广告均为诈骗，违规者封号处理']
			}
		},
		computed:{
			system(){
				console.log(this.$store.state.system);
				return this.$store.state.system
			},
			infos(){
				return this.$store.state.info
			},
			messageList(){
				return this.$store.state.timMessage
			}
		},
		methods:{
				showTips(index){
				this.tipsId = index;
			},
			 copyText (str) {
		        const qrUrlContent = document.querySelector(".cp-input1 .uni-input-input");
		        qrUrlContent.value = str;
		        qrUrlContent.select()
		        let range = document.createRange()
		        let selection = document.getSelection()
		        range.selectNode(qrUrlContent)
		        selection.addRange(range)
		        qrUrlContent.setSelectionRange(0, qrUrlContent.value.length)
		        let isSucess = document.execCommand('copy');
		        this.tipsId = -1;
		        if (isSucess) {
		        	alert( '复制成功')
		        } 
    		},

			// 转换文字1.查询切换[]有的内容，替换
			getText(str) {
					var reg = /(https?:\/\/[^\s]+)/g;
		        str = str.replace(reg, "<a target='_blank' href='$1'>$1</a>")
				str = str.replace(/\r\n/g,'<br>')
				str = str.replace(/\n/g,'<br>')
				str = str.replace(/\r/g,'<br>')
				return str;
			},

			// 发送消息
			setMessage(){
 				this.tipsId = -1;
				if(JSON.stringify(this.infos) == '{}'){
					return this.$u.toast('请登录后进行操作');
				}
				let msg = {
					type: 105,
					normal: {
						isXCBarrage:0,//是否是气泡 barrageIndex
						xcBarrageUrl:'',//气泡的图片路径
						xcBarrageType:'',//图片路径
						text:this.content,
						exp_icon:this.infos.exp_icon,
						is_guard:this.infos.is_guard, 
						is_room:this.infos.id == this.base.id?1:0,
						guard_icon:this.infos.is_guard == 1?this.infos.guard.icon:''
					}
				}
				this.getMessage(this.base.id,msg)
			},
			
			// 编辑消息
			getMessage(roomId,msg){
				console.log(roomId,msg);
				let _this = this
				let message = _this.tim.createCustomMessage({
					to: JSON.stringify(roomId),
					conversationType: _this.TIM.TYPES.CONV_GROUP,
					payload: {
						data: JSON.stringify(msg), // 用于标识该消息是骰子类型消息
					}
				});
				// 3. 发送消息
				let promise = _this.tim.sendMessage(message);
				promise.then(function(imResponse) {
					// 发送成功
					_this.content = ''
				}).catch(function(imError) {
					// 发送失败
					// vm.$u.toast('请登录后进行操作');
					let res = JSON.parse(JSON.stringify(imError))
					_this.$u.toast(res.message)
				});
			}
		}
	}
</script>

<style lang="scss">
.txt-control{
				display: inline-block;
			    border-radius: 6px;
			    color: #fff!important;
			    padding: 2px 4px;
			    bottom: -30px;
			    transform: translateX(-50%);
			    font-size: 14px;
			    left: 20%;
			    width: 60px;
			    cursor:pointer;
			    text-align: center;
			    background: #000;
			    position: absolute;
			    z-index:999;
			    
			}
			.txt-control i{
			    	    width: 0;
    height: 0;
    left: 22px;
    border-style: solid;
    border-color: transparent transparent #000 transparent;
    border-width: 0 10px 10px 10px;
    position: absolute;
    top: -10px;
			    }
	.cp-input2{
		position:absolute;
		z-index:-1;
		opacity:0;
	}
	.chat {
		overflow: hidden;
		position: relative;
	}
	.chat-tips {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		color: #87390E;
		// padding: 14rpx 24rpx;
		background-color: #F4E8D3;
		// image {
		// 	width: 36rpx;
		// 	height: 32rpx;
		// 	margin-right: 20rpx;
		// }
	}
	.btn {
		color: #fff;
		height: 58rpx;
		width: 160rpx;
		line-height: 58rpx;
		text-align: center;
		margin-left: 20rpx;
		border-radius: 100rpx;
		background-image:linear-gradient(147deg,#ff6b00,#ff9d02);
	}
	.messageList {
		padding: 0 20rpx;
		.msgLi{
			color: #333;
			font-size: 28rpx;
			margin-top: 12rpx;
			line-height: 36rpx;
			text{
				color: #2C9CED;
			}
			
		}
	}
	.nones {
		padding-bottom: 100rpx;
		image {
			width: 474rpx;
			display: block;
			height: 312rpx;
			margin: 68rpx auto;
		}
	
		view {
			color: #999;
			font-size: 20rpx;
			text-align: center;
		}
	}
	
	.submit {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		font-size: 32rpx;
		padding: 18rpx 24rpx;
		background-color: white;
		.submit-input {
			flex: 1;
			
			color: #333;
			padding: 20rpx 32rpx;
			border-radius: 100rpx;
			background-color: #F5F5F5;
			text {
				color: #E3AC72;
			}
		}
		.detail-input-i {
			width: 100%;
			font-size: 28rpx;
			padding: 16rpx 32rpx;
			border-radius: 12rpx;
			background-color: #F5F5F5;
			input {
				flex: 1;
				// margin-left: 32rpx;
			}
		}
		image {
			width: 48rpx;
			height: 48rpx;
			margin: 0 32rpx;
		}
		.submit-bnt {
			color: #999;
		}
	}
	
	
</style>
