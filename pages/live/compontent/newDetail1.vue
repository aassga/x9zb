<template>
	<scroll-view scroll-y  class="HuyaXWebhMessagelist" :class="{'app-version':hidevideo,'only-chat-item':onlyChat}">
		<!-- ,'add-margin':current==1,'is-ios':iosDevice -->
		<div @click.stop="onHandleClickItem(item,index)"
			:class="['HuyaXWebhMessagelist_i',activeIndex == index ? 'active' : '']" v-for="(item,index) in list"
			:key="index">
			<div class="HuyaXWebhMessagelist_i_avater_box">
				<image class="HuyaXWebhMessagelist_i_avater"
					:src="item.avater || '/static/images/home/userLogo.png'" alt srcset />
				<div class="HuyaXWebhMessagelist_i_avater_tips" v-if="item.unread_count && item.unread_count > 0">
					{{item.unread_count > 99 ? '99+' : item.unread_count}}</div>
			</div>
			<div class="HuyaXWebhMessagelist_i_context">
				<div class="HuyaXWebhMessagelist_i_context_t">
					<div class="HuyaXWebhMessagelist_i_context_t_name">{{item.name || '未知'}}</div>
					<div class="HuyaXWebhMessagelist_i_context_t_date">
						{{item.last_msg ? item.last_msg.creation_time : '未知'}}</div>
				</div>
				<div class="HuyaXWebhMessagelist_i_context_b">{{item.last_msg ? item.last_msg.text : '未知'}}</div>
			</div>
		</div>
		<!-- <div class="HuyaXWebhMessagelist_i_context_live" >
			<ChatDetail @onHandleUnRead="onHandleUnRead" :roomDetailData="roomInfo" :current="current"/>
		</div> -->
	</scroll-view>
</template>

<script>
	// import ChatDetail from "./detail-1.vue"
	import {
		getQueryString
	} from '@/common/Qs'
	export default {
		// components:{
		// 	ChatDetail
		// },
		name: "HuyaXWebhMessagelist",
		props: ["list","activeIndex","roomInfo","current","headShow"],
		data() {
			return {
				hidevideo: getQueryString().hidevideo,
				onlyChat: getQueryString().tabType==1?true:false,
				// activeIndex: 0,
				// list: [{
				// 	avater: "/static/images/home/userLogo.png",
				// 	name: "阿里里",
				// 	last_msg: {
				// 		text: "dsfsfsasdfsafsffdasgadga",
				// 		creation_time: "10:00"
				// 	},
				// 	tips: 34
				// }]
			};
		},

		mounted() {},

		methods: {
			// 已读未读数据刷新事件
			// onHandleUnRead(msgList,type){
			// 	this.$emit('onHandleUnRead',msgList, 0);
			// },
			// 点击tab事件
			onHandleClickItem(item, index) {
				// this.activeIndex = index;
				this.$emit("onHandleClickItem", item, index);
			}
		}
	};
</script>

<style lang="scss" scoped>

	.HuyaXWebhMessagelist {
		width: 100%;
		// min-height: 840rpx;
		// height: 100%;
		background:#fff;
		&::-webkit-scrollbar {
			display: none;
		}
		
		&.app-version {
			height: calc(100vh - 82rpx) !important;		
		}

		.HuyaXWebhMessagelist_i {
			padding-left: 40rpx;
			box-sizing: border-box;
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			cursor: pointer;
			justify-content: space-between;

			&.active {
				background-color: #f5f7fa;
			}

			&:hover {
				background-color: #f5f7fa;
			}

			.HuyaXWebhMessagelist_i_avater_box {
				width: 15%;
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;

				.HuyaXWebhMessagelist_i_avater {
					width: 60rpx;
					height: 60rpx;
					border-radius: 5rpx;
				}

				.HuyaXWebhMessagelist_i_avater_tips {
					position: absolute;
					width: 35rpx;
					height: 35rpx;
					border-radius: 50%;
					right: 3rpx;
					top: 13rpx;
					background-color: red;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}

			.HuyaXWebhMessagelist_i_context {
				border-bottom: 2rpx solid #dcd8d8;
				width: 85%;
				height: 100rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;

				.HuyaXWebhMessagelist_i_context_t {
					width: 100%;
					height: 40rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.HuyaXWebhMessagelist_i_context_t_name {
						width: 70%;
						height: 40rpx;
						color: #222;
						font-size: 28rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						line-height: 40rpx;
					}

					.HuyaXWebhMessagelist_i_context_t_date {
						width: 30%;
						height: 20rpx;
						font-size: 24rpx;
						color: #a5a5a5;
					}
				}

				.HuyaXWebhMessagelist_i_context_b {
					line-height: 40rpx;
					width: 70%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					height: 40rpx;
					font-size: 28rpx;
					color: #a5a5a5;
				}
			}
		}
	}
.only-chat-item .HuyaXWebhMessagelist_i,.only-chat-item .HuyaXWebhMessagelist_i_context{
	height:80px!important;
}
.only-chat-item .HuyaXWebhMessagelist_i_avater{
	width:44px!important;
	height:44px!important;
}
</style>
