<template>
	<div class="live-main-up-wrap-roomchat">
		<div class="anchor-live-chatroom">
			<div>
				<div class="top-message">
					<img class="img-icon"
						src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABUhJREFUWAnlV39I3VUUv/f73nM6zYVTCUOGpAUt2BqBMJj90WhSMYet1z+FtYoRBUX/VBix1pZB2NaPPwq2RW3hcM0VbbKC/tnoJ47SstpcRg0n6Hhu8+We73vvPZ1z7r3P51fTNPprV67nfM+99/z4nHPPVSGu9iH/CwCZ375er6RpCaTsXlqztmMxuhblQObsV7WhCNvBwEYpUQWIsKQosUxWr72yUCfiCzkAA9+Ujuv0C5Nq4ikQooC8NziRJtIZWYLs/+MAAATjpz9/+LK69Aryld5pZ5ydCGIFXrwgGsy3O9V/fN2l/u4eHYZ7tAorQSth3PQ8USHSc6pCx+XFX4/dBtCTyN/IKYCB7tKLV8LVxsSK4ihRpE9qidhugTBzH3I88iDnb8A8cAkgxYyw7J9+jfV+8izqa0v1DXWhM5uxdvhUfKzvcEMqPXEElZUJiaWVRRVkiZZpeqvuEwmLidJgLcSMz+2AMea8rRjRnOrteglPvEjHgjAbvq21KjNGCYbUUQtvaGU6RNiRxzVPic+fs6UAej8rJiM0ytc0f4DK9jkdraneg7eQPBBGrRSUQ5y06CnzoK0MKR7m3Htq64Acs06Rsvwx8t2BrtHs6MjIqY51Xr68UD4OoAeNCgOVUa+SPKAPip4nReqipEhxjSNmijx77yg7aJyDSKMDHbveKLXUZDOHL3/7/nJalyuTWal1q0P37pFT+2sDUpSb2ioEosznUTLGaXCUHCTUHI2mIBboJ4QOFRhd8ZdSz3sHy+sLDyEKF3AKyGSb0AGC1kbKEbIR65TP99S63Utn/DlP05FbWFH/SA8aaWcdOmwB6IwxCjKpMc1HCQW81hsYfvpYaNHlUHMI+gjzacyIvRgdpbV8+OTYKr8GEP7AjoFaEQDn1EZklRLv0+L5mRHbyNytwACiKSBjFQ1bz+K+LNtQmWrvgFH6vLNVFaei4wcFV7FBME+Uhm8HRHlEBb5P8HZG2O/MUUqRHSbXMrDfSLpYOCDOntgduZ7jDeb3etpCrRHwhygNzxMVYgnL8n8NffF6HSLAHQrdO+fXdNZUAb4ggZDDccqRVUAI4BbU7QCY4p1Hc65HqxBV6TDzKAAbulC1obVXCHsZjAlXkxEt5R+BzyUXIuWeCtLXgOddkbLcy/L3oiw6fj+2vR77xzOuwN/DNBOgaLczhrJ7OPWgjsfpLtODwsMhwIjSZpy0RNSO6RKqHV83IjY9BRBOvgNSxATIkVhhnLse6Rg8+uP9eC1sY5KJj+MCFKHkXXCGpswR5x3wzvjN02okMT7trMFmg+/dBASyubpxR4r1dL+5ZHByaIehXEr56YqmnYMBwvETpcFOe61sf7ep4G7nUsLpQt7vp5R4WaQPiRs2td1ZGpjrapvavvSeDUz8+S4+fDVCY5uV6jmSx0GqJ8HIIxhnGVff1AOPy5GY6dOHTafpZtF+pDI9/Tl2730OljOdTz8EhjoiiFgQvFy3affPpCK48d43TgQlugbhuh2fxkaEpJEoVuJdGOEh32o56hmPE3Y518hma0RkwA/Arkd7EbKPajfv2u7lPp3+ewY98+HWBqzx3YjOrVFEPFhE44mCyrrkW6MzFDgBwLbg9MHhNTfF7vheJvE9cGNeB2gfHf7lwLkt2C92YlXjH6WuLImQBqQFRcVzOkB6Zhvz/lFKh6TcZm5+cO+eAllcJyB8DWHM8nNNTyo929xXo2U4m7mZsn+FQPRY//4HatGFduwCGy0IMrz2mspl1cldC/6/YFEOeIf69iXXCy1asK67Vz3Wsah/zbyuq5f+DS7iU2NBe5NrAAAAAElFTkSuQmCC"
						alt="gg" />
					<div id="headScroll" class="top-text">
						<span class="top-text-scroll">{{system.announcement}}</span>

					</div>
				</div>
				<div class="header">
					<div class="header-text active">聊球</div>
					<router-link class="header-text" tag="a" target="_blank" to="/anchor?type=0">主播
					</router-link>
				</div>
			</div>
			<div id="chat-notification"></div>
			  <div class="pc-chat-room-container">
     		 <ChatDetails hideChat="true" :qsVid="qsVid"/>
    		</div>
			<div class="chat-content">
				<div class="message-list" ref="messageContent">
					<div class="chatroom-message-item-box" id="AAB3-52B6-C207-E769" v-for="(item,index) in list" :key="index" v-if="item.type == 'TIMCustomElem'">
						<div class="message-content message-content-noble-0 message-content-0">
							<span></span>
							<span class="message-name">
								{{item.nick}}:
							</span>
							<span class="message-text message-text-type-0 message-text-noble-0">
								<span v-if="item.data && item.data.normal" v-html="getText(item.data.normal.text)"></span>
							</span>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import emotion from '../persona/emotion.json'
	import ChatDetails  from "@/views/anchor/chatRoomDetails"
	export default {
		components: {
      		ChatDetails,
    	},
		props:{
			roomid:{
				type:String,
				default:''
			},
			qsVid:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				message: '',
				emotion: emotion
			}
		},
		computed: {
			system() {
				return this.$store.state.system
			},
			list() {
				this.$nextTick(() => {
					this.$refs.messageContent.scrollTop = this.$refs.messageContent.scrollHeight
				})
				return this.$store.state.messageList
			},
			infos(){
				return this.$store.state.infos
			}
		},
		methods: {
			// 发送消息
			sendMessage() {
				let _this = this
				if (!this.message) {
					return this.$message.warning('请输入聊天内容')
				}
				// console.log(_this.roomid)
				this.createCustomMessage({ //发送普通消息
					type: 105
				}, _this.roomid)
			},
			// 选择聊天表情
			setEmotion(item) {
				this.message = this.message + item
				// console.log(item);
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
						// console.log(item);
						// let key = `p${item.substr(1, item.length - 2)}`;  //记录大括号里的值 用作id 方便取值
						// if (!this.salaryVars.hasOwnProperty(key)) this.$set(this.salaryVars, key, '');
			
			
			
					}); //循环遍历
				})
				// let arrNum = 取出所有正则匹配值并转换为input
			
				// console.log(str);
				return str;
			},
			// 编辑自定义消息
			createCustomMessage(data, roomId) {
				// console.log(data);
				let _this = this
				// return
				// 2. 创建消息实例，接口返回的实例可以上屏
				let msg = {
					type: 105,
					normal: {
						text: this.message
					}
				}
				
				let message = this.tim.createCustomMessage({
					to: roomId,
					conversationType: this.TIM.TYPES.CONV_GROUP,
					payload: {
						data: JSON.stringify(msg), // 用于标识该消息是骰子类型消息
						description: '', // 获取骰子点数
						extension: ''
					}
				});
				// 3. 发送消息
				if(!this.message) return
				let promise = this.tim.sendMessage(message);
				promise.then(function(imResponse) {
					// 发送成功
					_this.message = ''
				}).catch(function(imError) {
					// 发送失败
					_this.$message.error(imError)
					console.warn('sendMessage error:', imError);
				});

			}
		}
	}
</script>

<style scoped="scoped">
	.top-text-scroll {
		display: inline-block;
		/*inline样式不能使用动画*/
		animation: scroll 5s linear infinite;
	}

	.top-text-scroll:after {
		position: absolute;
		left: 100%;
		content: attr(data-text);
		margin-left: 4em;
	}

	@keyframes scroll {
		from {
			transform: translateX(0);
		}

		to {
			transform: translateX(calc(-100% - 4em));
			/*总长再加上margin-left*/
		}
	}
</style>
