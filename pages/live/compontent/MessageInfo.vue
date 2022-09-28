<template>
	<view class="HuyaXWebhMessageinfo">
		<!-- 头部固定栏 -->
		<div class="HuyaXWebhMessageinfo_title">
			<u-icon @click="onHandleBack" class="HuyaXWebhMessageinfo_title_icon" name="arrow-left" size="28"></u-icon>
			{{roomInfo.name || '未知'}}
		</div>
		<!-- <ChatDetail :roomDetailData="roomInfo" :current="current"/> -->
	</view>
</template>
<script>
// import ChatDetail from "./detail-1.vue"
	export default {
		name: "HuyaXWebhMessageinfo",
		// components:{
		// 	ChatDetail
		// },
		props: ["roomInfo", "modalMsgList", 'isShowEmoji', 'dialogVisible','current'],
		data() {
			return {
				//   isShowEmoji: false,
				//   dialogVisible: false
			};
		},

		mounted() {
			console.log(this.roomInfo,"=========roomInfo")
		},

		methods: {
			// 已读未读数据刷新事件
			// onHandleUnRead(msgList,type){
			// 	console.log(msgList,"=====")
			// 	this.$emit('onHandleUnRead',msgList, 0);
			// },
			// 返回上一页
			onHandleBack() {
				this.$emit('close');
			},
			quickReplyList() {},
			selectEmoji() {},
			sendMsg() {},
			delQuickReply() {},
			setMsg() {}
		}
	};
</script>

<style lang="scss" scoped>
	.HuyaXWebhMessageinfo {
		position: absolute;
		z-index: 99;
		top: 0;
		left: 0;
		width: 100%;
		height: 41px!important;
		background-color: #e9e9f5;
		overflow: hidden;
		// overflow-y: scroll;
		// overflow-x: hidden;

		// &::-webkit-scrollbar {
		// 	display: none;
		// }

		.HuyaXWebhMessageinfo_title {
			position: relative;
			width: 100%;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 30rpx;
			font-size: 28rpx;
			box-sizing: border-box;
			border-bottom: 2rpx solid #dcd8d8;

			.HuyaXWebhMessageinfo_title_icon {
				position: absolute;
				left: 5rpx;
				top: 0;
				width: 80rpx;
				height: 100%;
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		.HuyaXWebhMessageinfo_context {
			position: absolute;
			top: 80rpx;
			left: 0;
			width: 100%;
			height: 500rpx;
			overflow-x: hidden;
			overflow-y: scroll;

			&::-webkit-scrollbar {
				display: none;
			}
		}

		.HuyaXWebhMessageinfo_send {
			width: 750rpx;
			min-height: 160rpx;
			position: absolute;
			bottom: 0;
			left: 0;

			.send-container {
				min-height: 160rpx;
				position: fixed;
				bottom: 0;
				left: 0;
				width: 750rpx;
				background: #fff;
				padding: 20rpx;
				box-sizing: border-box;
				border-top: 2rpx solid #f1f1f1;
				text-align: left;

				.send-container-svg {
					width: 40rpx;
					height: 40rpx;
					cursor: pointer;
				}

				.inputcover {
					position: absolute;
					height: 33rpx;
					width: calc(100% - 185rpx);
					margin: 5rpx 10rpx 0 0;
					z-index: 1000;
					border-radius: 17rpx;
					background: rgba(255, 255, 255, 0.5);
					padding-left: 10rpx;
					position: absolute;
					border-color: #f1f1f1;
					border: 1rpx solid #ccc;
					font-size: 14rpx;
					outline: none;
					-webkit-appearance: none;
					width: calc(100% - 185rpx);
					line-height: 33rpx;
				}

				input {
					height: 33rpx;
					border-radius: 6rpx;
					background: rgba(255, 255, 255, 0.5);
					padding: 0 10rpx;
					position: absolute;
					top: 4rpx;
					height: 66rpx;
					border-color: #f1f1f1;
					border: 1rpx solid #ccc;
					font-size: 14rpx;
					outline: none;
					-webkit-appearance: none;
					width: 85%;
				}

				span {
					display: inline-block;
					width: 44rpx;
					height: 44rpx;
					position: absolute;
					top: 4rpx;
				}

				.msg-context {
					position: relative;
					top: 0rpx;
					left: 0rpx;
					width: 100%;
					height: 140rpx;
					overflow-y: scroll;
					overflow-x: hidden;
					&::-webkit-scrollbar {
						display: none;
					}
				}

				.control-footer {
					width: 100%;
					height: 50rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.quick-container {
						display: flex;
						border-radius: 20px;
						color: #fff;
						background: linear-gradient(114deg, #eecfb5 -2%, #d8ad66);
						height: 40rpx;
						width: 240rpx;
						overflow: hidden;
						.quick-container_l {
							display: flex;
							align-items: center;
							justify-content: center;
							color: #fff;
							font-size: 22rpx;
							border-right: 2px solid #fff;
							flex: 1;
						}

						.quick-container_r {
							flex: 1;
							display: flex;
							align-items: center;
							justify-content: center;
							color: #fff;
							font-size: 22rpx;
						}
					}

					.send {
						display: inline-block;
						padding: 0 20rpx;
						border-radius: 6rpx;
						color: #fff;
						background: linear-gradient(114deg, #eecfb5 -2%, #d8ad66);
						height: 40rpx;
						line-height: 40rpx;
					}
				}
			}
		}
	}
</style>
