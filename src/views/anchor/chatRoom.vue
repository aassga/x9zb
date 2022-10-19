<template>
	<div class="chat-panel" id="chat-panel">
		<div class="anchor-live-chatroom">
			<div>
				<div class="top-message">
					<img src="./../../assets/images/broadcast.png" alt="gg" class="img-icon">
					<div id="headScroll" class="top-text">
						<span class="top-text-scroll">{{system.announcement}}</span>
						<!-- <div ref="box" class="box">
						      <div ref="marquee" class="marquee">{{system.announcement}}</div>
						</div>
						<div ref="node" class="node">{{system.announcement}}</div> -->

					</div>
				</div>
			</div>
			<div class="layout-contribution-list">
				<div class="chatroom-contribution-list-comp" style="height: 218px;">
					<div class="contribution-header">
						<div class="title">
							<span class="text" :class="paiIndex == 0?'active':''" @click="paiIndex = 0">贡献日榜</span>
							<i class="el-icon-caret-top jiantou" v-if="paiIndex === 0"></i>
						</div>
						<div class="title">
							<span class=" text" :class="paiIndex == 1?'active':''" @click="paiIndex = 1">贡献周榜</span>
							<i class="el-icon-caret-top jiantou" v-if="paiIndex === 1"></i>
						</div>
					</div>
					<div class="contribution-main">
						<div>
							<div class="front-rank front-rank-show-level-icon">
								<!-- 第二名 -->
								<div class="second-rank">
									<div class="layout-user" v-if="paiList[1]">
										<div class="second-b Crown">
											<div class="rank-mark-s rank-mark-s2 Crown"
												style="color: rgb(255, 255, 255);">
											</div>
											<div class="lazyload-wrapper "><img class="avatar" :src="paiList[1].avatar"
													width="136" height="136"></div>
											<div class="contribute-value1">{{paiList[1].amount}}</div>
										</div>
										<div class="name third-t">{{paiList[1].user_nickname}}</div>
										<div class="level-wrap">
											<img class="level-left" v-if="paiList[1].is_guard == 1"
												:src="paiList[1].guard.icon">
											<img class="level-right" v-if="paiList[1].exp" :src="paiList[1].exp.thumb">
										</div>
									</div>
								</div>
								<!-- 第一名 -->
								<div class="first-rank">
									<div class="layout-user" v-if="paiList[0]">
										<div class="Crown first-b">
											<div class="rank-mark-s rank-mark-s1 Crown"
												style="color: rgb(255, 255, 255);">
											</div>
											<div class="lazyload-wrapper"><img class="avatar" :src="paiList[0].avatar"
													width="136" height="136"></div>
											<div class="contribute-value1">{{paiList[0].amount}}</div>
										</div>
										<div class="name first-t">{{paiList[0].user_nickname}}</div>
										<div class="level-wrap">
											<img class="level-left" v-if="paiList[0].is_guard == 1"
												:src="paiList[0].guard.icon">
											<img class="level-right" v-if="paiList[0].exp" :src="paiList[0].exp.thumb">
										</div>
									</div>
								</div>
								<!-- 第三名 -->
								<div class="third-rank">
									<div class="layout-user" v-if="paiList[2]">
										<div class="Crown third-b">
											<div class="rank-mark-s rank-mark-s3 Crown"
												style="color: rgb(255, 255, 255);">
											</div>
											<div class="lazyload-wrapper "><img class="avatar" :src="paiList[2].avatar"
													width="136" height="136"></div>
											<div class="contribute-value1">{{paiList[2].amount}}</div>
										</div>
										<div class="name third-t">{{paiList[2].user_nickname}}</div>
										<div class="level-wrap">
											<img class="level-left" v-if="paiList[2].is_guard == 1"
												:src="paiList[2].guard.icon">
											<img class="level-right" v-if="paiList[2].exp" :src="paiList[2].exp.thumb">
										</div>
									</div>
								</div>
							</div>
							<div class="contribution-other">
								<ul class="other-rank">
									<li class="other-rank-item" v-for="(item,index) in paiList" :key="index"
										v-if="index>2">
										<div class="left-wrap"><span class="num-rank">{{index+1}}</span>
											<span class="name-rank color-7770b6">{{item.user_nickname}}</span>
										</div>
										<span class="val-rank">
											<img src="../../assets/images/icon.png" class="val-icon">壕气
											<span class="val">{{item.amount}}</span>
											<img v-if="item.order == 2"
												src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgdmlld0JveD0iMCAwIDExIDExIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgZmlsbD0iIzc3QzA2QyIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICA8Zz4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNC4wMTMgOS41NTljLS4xNC0uMTc1LS4yMDktLjQ1NC0uMjA5LS44MzcgMC0uMTc1LS4wNTUtLjgzNC0uMDU1LTEuMDY5IDAtLjM0LS4wMzUtLjYwNi0uMTA0LS43OTctLjA3LS4xOTItLjIyOS0uMjg0LS40NzktLjI3NS0uMTg1IDAtLjQwNC0uMDA0LS42NTgtLjAxMy0uMjU1LS4wMDktLjQ3OS0uMDA5LS42NzMgMC0uMzI0IDAtLjUzLS4wODMtLjYxOC0uMjQ5LS4wODgtLjE2NS0uMDI1LS4zNzkuMTg3LS42NC4yMjItLjI2Mi40ODEtLjU3Mi43NzctLjkzLjI5Ni0uMzU3LjYwMi0uNzIzLjkxNi0xLjA5OC4zMTUtLjM3NS42MjItLjc0NS45MjMtMS4xMTEuMy0uMzY2LjU2Ni0uNjkuNzk3LS45NjguMjEzLS4yNTMuNDE5LS4zODQuNjE4LS4zOTMuMTk5LS4wMDkuNDEuMTA1LjYzMS4zNC4yMjIuMjUzLjQ3OS41NS43Ny44OS4yOTEuMzQuNTk0LjY5LjkwOSAxLjA1M2wuOTMgMS4wNzJjLjMwNC4zNTQuNTc3LjY2NS44MTguOTM1LjI2OC4zMDYuMzcyLjU1Ni4zMTIuNzUyLS4wNi4xOTctLjI1Ny4yOTUtLjU5LjI5NS0uMTAxIDAtLjIxNS4wMDItLjM0LjAwNi0uMTI1LjAwNS0uMjU2LjAxLS4zOTUuMDEzbC0uNDEuMDEzYy0uMTM0LjAwNS0uMjU2LjAwNy0uMzY3LjAwNy0uMjMxLjAwOS0uMzc3LjA3OC0uNDM3LjIxLS4wNi4xMy0uMDg1LjMwOS0uMDc2LjUzNSAwIC4yNTMtLjA2NCAxLjE4Ny0uMDY0IDEuNDQ5IDAgLjExMy0uMDEuMjMtLjAyOC4zNTMtLjAxOS4xMjItLjA2My4yMzMtLjEzMi4zMzQtLjA3LjEtLjE2Ni4xODUtLjI5MS4yNTQtLjEyNS4wNy0uMjkuMTA1LS40OTMuMTA1LS4yNSAwLS40Ni4wMDItLjY4Ni4wMDctLjIyNy4wMDQtLjM5MS4wMS0uNjc4LjAyLS4zOTgtLjAwMi0uNjY3LS4wODktLjgwNS0uMjYzeiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEyNCAtMzEpIHRyYW5zbGF0ZSgxMiAyNykgdHJhbnNsYXRlKDExMiA0KSBtYXRyaXgoMSAwIDAgLTEgMCAxMSkiLz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg=="
												class="icon">
											<!-- <img src="../../assets/images/icon.png" class="icon"> -->
										</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
						

			<div id="chat-notification">
				<div>
					<div class="ant-notification ant-notification-topRight" style="right: 0px; top: 0px; bottom: auto;">
						<div></div>
					</div>
				</div>
			</div>

    <div class="pc-chat-room-container" style="height: 100%">
      	<ChatDetails 
	  		:qsVid="qsVid"
			:giftList="giftList"
			@onhandleSendGift="onhandleSendGift"
		/>
    </div>


<!-- 	<div class="message-text">
					<span v-html="getText('http://10.83.106.84:9578/live?router=live&type=basketball&id=undefined&uid=undefined')"   @click="showTips(1)"></span>
								<span v-if="tipsId == 1" @click="copyText('tipsId')" class="txt-control">复制<i/></span>
				</div> -->
			<div class="chat-content ">
			
			
				<!-- 小礼物显示区 -->
				<div class="gitf-list">
					<!-- 背景判断 判断是否贵族 是贵族就显示贵族，反之0 -->
					<!-- infos.is_guard == 1?colorList[infos.guard.list_order].rgb:colorList[0].rgb -->
					<div class="gitf-mask" v-for="(item1,index) in gitfList" :key="index"
						:style="{background:'linear-gradient(to right,'+(colorList[0].rgb)+')'}">
						<div class="flex-start" style="position: relative;">
							<img class="avatar"
								:src="!item1.avatar?require('../../assets/images/userLogo.png'):item1.avatar">
							<div>
								<p style="color: #FFDFAB;">{{item1.nick}}</p>
								<p style="color: white !important">{{item1.giftname}}</p>
							</div>
							<!-- <div class="gitf" id="gitf"> -->
							<!-- <div class="gitf" id="gitf"> -->
							<img class="gitf" :src="item1.gifticon">
							<!-- </div> -->
							<p style="position: absolute;right: 10px;bottom: 0;color: #fe9100">x{{item1.num}}</p>
						</div>
					</div>
				</div>
				<!-- 全屏礼物显示区域 v-show="gitfBigMask"-->
				<div class="gitf-big-mask" v-show="gitfBigMask && checkList.indexOf('2') == -1" id="gitfBigMask">

				</div>

				<!-- 进入直播间 是贵族 item.type == 'TIMCustomElem' && item.data.type == 102 && item.data.nobel.is_guard == 1-->
				<!--  v-if="swf_show && checkList.indexOf('1') == -1" -->
				<!-- id="svgaAnimation" -->
				<div class="gitf-big-mask" style="width: 100%;top: 0px;">
					<!-- 暂时隐藏 -->
					<!-- <div class="svgaAnimation-c" v-if="gitfItem.data && gitfItem.data.nobel && gitfItemName" :style="{bottom:getposition(gitfItem.data.nobel.guard_name)}">
						<span class="svgaAnimation-text">
							{{gitfItem.nick}}
						</span>骑着{{gitfItem.data.nobel.guard_name}}驾临
					</div> -->
					<div class="" style="width: 100%;height: 175.91px;" v-for="(item,index) in gitfListSvg"
						:key="index">
						<div class="" style="height: 175.91px;position: relative;" :id="'svgaAnimation'+item.gitfNum">
							<p class="svgaAnimation-li"><span
									class="svgaAnimation-text">{{item.nick}}</span>骑着{{item.guard_name}}驾临</p>
						</div>
						<!-- :style="{top:getposition(item.guard_name)}" -->
					</div>

				</div>

				<div class="message-list" ref="messageContent">
					<div class="chatroom-message-item-box">
						<div class="message-content message-content-noble-undefined message-content--1">
							<span>
							</span>
							<span class="message-text message-text-type--1 message-text-noble-0" style="color: rgb(245, 78, 17);">
								<span>{{system.live_notice}}</span>
							</span>
						</div>
					</div>
					<!-- 判断自己是否房主  -->
					<div class="chatroom-message-item-box" v-for="(item,index) in list" :key="index"  @click="infos.id == roomid?setHuoserMask(item):''">
						<!-- {{colorList[0]}} -->
						<!-- 送礼物 -->
						<div class="message-content message-content-noble-0 message-content-8 xx"
							v-if="item.type == 'TIMCustomElem' && item.data.type == 100">
							<span style="display: inline-flex;transform: translateY(5px);">
								<img src="../../assets/images/zhubo.png"
									v-if="item.data.gift && item.data.gift.is_room == 1"
									style="height: 14px;width: 32px;">
								<img class="noble_icon"
									v-if="item.data.gift && item.data.gift.is_guard == 1 && item.data.gift.is_room == 0"
									:src="item.data.gift.guard_icon" alt="">
								<div class="vip" style="line-height: 20px;color: white;text-indent: 29px;"
									v-if="item.data.gift"
									:style="{background: 'url('+item.data.gift.exp_icon+')center top / auto 100% no-repeat'}">
								</div>
							</span>
							<span class="message-name">{{item.nick}}:</span><span
								class="message-text message-text-type-8 message-text-noble-0"><span><span
										style="color: #111">送给主播</span><span
										style="color: #fe9100 !important;margin-left:4px">{{item.data.gift.giftname}}x1</span>
								</span></span>
						</div>


						<!-- 发消息 -->
						<div class="message-content message-content-noble- message-content-0 xx"
							v-if="item.type == 'TIMCustomElem' && item.data.type == 105">
							<span style="display: inline-flex;transform: translateY(5px);">
								<!-- 1.判断等级是否有，有显示等级 2.判断是否有贵族，有显示 -->
								<img src="../../assets/images/zhubo.png"
									v-if="item.data.normal && item.data.normal.is_room == 1"
									style="height: 14px;width: 32px;">
								<img class="noble_icon"
									v-if="item.data.normal && item.data.normal.is_guard == 1 && item.data.normal.is_room == 0"
									:src="item.data.normal.guard_icon" alt="">
								<div class="vip" style="line-height: 20px;color: white;text-indent: 29px;"
									v-if="item.data.normal"
									:style="{background: 'url('+item.data.normal.exp_icon+')center top / auto 100% no-repeat'}">
								</div>
							</span>
							<span class="message-name">{{item.nick}}:</span>
							<span @click="infos.id == roomid?setHuoserMask(item):''" class="message-text message-text-type-0 message-text-noble-"
								style="color: rgb(50, 52, 58);">
								<span v-html="getText(item.data.normal.text)" style="cursor: pointer;"  @click="showTips(index)">
								</span>
								<span v-if="tipsId == index" @click="copyText(item.data.normal.text)" class="txt-control">复制<i/></span>
							</span>
						</div>

						<!-- 自定义颜色消息 -->
						<div class="message-content message-content-noble- message-content-0 xx"
							v-if="item.type == 'TIMCustomElem'&& item.data.type == 101">
							<span class="" style="height: 100%;display: inline-flex;transform: translateY(2px);">
								<!-- 1.判断等级是否有，有显示等级 2.判断是否有贵族，有显示 -->
								<img src="../../assets/images/zhubo.png"
									v-if="item.data.color && item.data.color.is_room == 1"
									style="height: 14px;width: 32px;">
								<img class="noble_icon"
									v-if="item.data.color && item.data.color.is_guard == 1 && item.data.color.is_room == 0"
									:src="item.data.color.guard_icon" alt="">
								<div class="vip" style="line-height: 20px;color: white;text-indent: 29px;"
									v-if="item.data.color"
									:style="{background: 'url('+item.data.color.exp_icon+')center top / auto 100% no-repeat'}">
								</div>
							</span>
							<span class="message-name">{{item.nick}}:</span>
							<span class="message-text message-text-type-0 message-text-noble-"
								:style="{color: item.data.color.color}" v-if="item.data.color">
								<span v-html="getText(item.data.color.text)"   @click="showTips(index)"></span>
								<span v-if="tipsId == index" @click="copyText(item.data.color.text)" class="txt-control">复制<i/></span>
							</span>
						</div>
						<!-- 普通用户进入直播间 -->
						<div class="message-content message-content-noble-undefined message-content-1 message-content-wealth flex-start"
							v-if="item.type == 'TIMCustomElem' && item.data.type == 102">
							<span style="display: inline-flex;transform: translateY(3px);">
								<!-- 1.判断等级是否有，有显示等级 2.判断是否有贵族，有显示 -->
								<img src="../../assets/images/zhubo.png"
									v-if="item.data.nobel && item.data.nobel.is_room == 1"
									style="height: 14px;width: 32px;">
								<img class="noble_icon"
									v-if="item.data.nobel && item.data.nobel.is_guard == 1 && item.data.nobel.is_room == 0"
									:src="item.data.nobel.guard_icon" alt="">
								<div class="vip" style="line-height: 20px;color: white;text-indent: 29px;"
									v-if="item.data.nobel"
									:style="{background: 'url('+item.data.nobel.exp_icon+')center top / auto 100% no-repeat'}">
								</div>
							</span>

							<span class="message-name">{{item.nick}}:</span>
							<span
								class="message-text message-text-type-1 message-text-noble-undefined message-text-wealth"
								style="color: rgb(245, 78, 17);">
								<span>进入直播间</span>
							</span>
						</div>


						<!-- 大佬进入直播间 -->
						<!-- <div class="message-content message-content-noble-1 message-content-10 xx"
							v-if="item.type == 'TIMCustomElem' && item.data.type == 102">
							<span><img class="noble_icon"
									src="data:image/png;base64,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"
									alt=""></span><span class="message-name">{{item.nick}}:</span><span
								class="message-text message-text-type-10 message-text-noble-1"
								style="color: rgb(60, 188, 204);"><span>骑着冰雪战马驾临</span></span>
						</div> -->
					</div>
				</div>
				<!-- <div class="chat-room-new-message-wrap ">
					<div class="content pointer"><span class="text">有新消息</span><img class="icon"
							src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAbBJREFUSA3tk8srxFEYhmdGGaTkslAWJJRs7FCalT/ApUTNzposLCbWdhTKxspCuaxsZidyKaVsJJdsZKFEFIUU43mHM50585uZmilZzFdPv+987/udc+bMOT5fIf7NCcRisSNYg9JcN0WvH6YhmjIHxQVQHEJNiiFLgZ5i0AYVK552hCn4gito8jR5FPFWwA4oFiHgYfspIQ7DO9xDZ1rjr4CnDk5AG4tk88d1jN3wAK/Qm64JrQ1u4APC6XyedRqaQUf1CaOuiVoInuAZelw9ZYwpAgO2wLgaDkAxC37pfAdBx3gL7U5PB7URuxbPKW6BYtIWGQdhVQKxAROg8z6DesdrFr6062aBMho2QbEERcZEbu63NMU+VBpdX8bjoIXPocHWEjlCAOZBEYXyhEjCOAxzUGLq5Fp8BhR7kLSw8SV9MWk3+nOPoTZJtAZoelzm+NbJg5acOcXcB7qm19DquqnpcW2DInEBXF/GMY26EXfwCCFjJjePS79yzNRz+jJBI1yAruUQmMf1Rt6f06RuExNVwS7olryAXnmX68trzIR6D8twCi15TVZo/tMT+AZ1wART+CfpNAAAAABJRU5ErkJggg==">
					</div>
				</div> -->
			</div>
			<div class="footer">
				<div v-if="iconIndex == 1">
					<div class="layout-chat-color-box">
						<ul>
							<!-- iconIndex=5 -->
							<li :style="{backgroundColor:item.color}" class="active" v-for="(item,index) in colorList"
								@click="getColor(index)" :key="index">
								<span class="color-text">
									<span>{{item.name}}</span>
								</span>
							</li>
						</ul>
					</div>
				</div>
				<div class="layout-chat-tool">
					<div class="left">
						<el-tooltip :enterable='false' class="item" effect="dark" content="文字" placement="top">
							<div class="tool-icon textStyleIcon" :class="iconIndex == 5?'reset-default':''"
								@click="setIcon(5)"></div>
						</el-tooltip>
						<!-- 思路：1。如果等于1 赋值null，2.等于null 赋值1，3等于其它赋值1 -->
						<div class="tool-icon clearMessage" @click="$store.state.messageList = []"></div>
					</div>
					<div class="right">
						
					</div>
				</div>
				<!-- {{JSON.stringify(infos)}} -->
				<!-- jfklsajflkjsdaklfjl -->
				<div class="layout-chat-input-wrap">
					<div class="layout-chat-input">
						<div class="message-input">

							<!-- 未登录的情况 -->
							<label style="position: relative;" v-if="JSON.stringify(infos) == '{}'">
								<div class="unlogin-box" @click="$store.state.user.showLoginMask = true">
									<span class="login-btn">登录<span class="login-tab"> </span></span>
									<span class="unlogin-box-text" style="color: rgb(201, 202, 218);">发弹幕,参与互动</span>
								</div>
							</label>
							<!-- 已登录 -->
							<label style="position: relative;" v-else>
								<div class="message-input-content message-input-content-with-flaunt"
									style="height: 94%;line-height: 46px;" v-if="barrageIndex != null">
									<span class="flaunt-input-text" style="line-height: 50px;">炫彩气泡：</span>
									<input placeholder="我也来说几句…" type="text" v-model="message"
										class="input-content input_focus" value=""
										style="padding-left: 65px; color: rgb(50, 52, 58);">
								</div>
								<div class="message-input-content message-input-content-with-flaunt"
									style="height: 100%;" v-else>
									<input placeholder="我也来说几句…" @keyup.enter="sendMessage()"
										:style="{color: iconIndex == 5?'':colorList[colorIndex].color}"
										v-model="message" type="text" class="input-content" value=""
										style="padding-left: 3px;">
								</div>
							</label>
						</div>
						<!-- sendMessage -->
						<div class="send-btn  " :class="message.length == 0?'send-disabled':'active'"
							@click="sendMessage()">发送</div>
						<div class="input-emoji">
							<div class="common-emoji">
								<el-popover placement="top" width="300" trigger="click">
									<ul class="emoji-mart-category-list">
										<li v-for="(item,index) in emotion" @click="setEmotion(item.emojiName)">
											<img class="emoji-mart-emoji emoji-mart-emoji-native" style="width: 30px;height: 30px;" :src="item.url">
										</li>
									</ul>
									<div slot="reference" class="eomj-icon"></div>
								</el-popover>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 设置为管理 -->
			<div class="user-operation-modal-wrap" v-if="houseMask">
				<div class="user-operation-box" style="height: 200px;"><img
						src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAmJJREFUWAntmMtOAjEYhZmBhGfQREncswES8JlEwCcRNT6MJq414bJhqwt14TOQEPAcnD+UmbYzbSeupgm20/6Xr6edZmqtVpVKgUoBPwV2u119sVgMlstlyy9Cvtd8Pj/Hr89cJutYNwCHGGBPqF+32+072tc6u5A+TP4K/h/4vSH+swky0iXhrOiojkVRdNPtdqdqn28b8UfwvVP9Ef8S8Y9yclyrIPp/8NvQQApmeItZT+TZt9bBIdYGgMyZKVrAXq/3BYcMTCgk4MYgOFKORFydTqfzmaHjmK5T+rj3sAfv5VmpJ5hEJpEynmkalKOdNZZWQYmOWT2gzVmnyzRRI92vfTYpB2MrHINZFZRsvrOnfwKne7ly4ehfCDBJlHnz2I9iTBQKx+CFAWnsomQZcM6ARSHLgvMCzIPkOIr3nvtzP/x1WuKDm3W5VTNpG/epGJhq6zFjcmI/zkGej5nDXOPjDcdY3goKiGW/0SQIjgG8FaTzf5QgBXPUE/4gFb0BC8IFQ3oBWuDkpSntmHHeg8k3oREg+coRUFGQtdMHhjg6KUg4fhOKs1Jn9plF5XFyRCnu5mZhQAucMWEZkIUAfeBEk1DIXMAQuDIgrYBlwIVCGgEt9xHjnhMYU21ablyahrhyPur8tICAa/HCDodGyskbTuIYVmXTbDYv2u32t9hJrT0HcZScwOAILo7jkcvxIAnSNS//vGam+hvr9fo01bd/1ALiNjdDkJfEgZfqYXLD08Vw7iMkJwzH/T8HmAt9M6dAULGOPdNfrVZnTo4OxtxKWPIBczm4VaaVApUCqgK/Ntc/QjrEvxYAAAAASUVORK5CYII="
						class="close-icon pointer" alt="" @click="houseMask= false">
					<div class="header">
						<div class="lazyload-wrapper "><img
								:src="houseMask.avatar || require('../../assets/images/userLogo.png')"></div>
					</div>
					<div class="content">
						<aside class="nickName">{{HuoserItem.nick}}</aside>
						<!-- <a class="out-a" @click="kickOut(HuoserItem)">踢出</a> -->
					</div>
					<div class="operation-footer">
						<div class="operation-footer-anthor">
							<button class="i-button i-danger-image-button button-danger"
								@click="forbid(HuoserItem,1)">禁发言</button>
							<button class="i-button i-default-button button-fangguan" @click="forbid(HuoserItem,2)">解除禁言</button>
						</div>
					</div>
				</div>
			</div>


			<!-- 全局喇叭 -->
			<div class="horn-modal" v-if="iconIndex == 4">
				<div class="horn-modal-title"><span>全局喇叭</span><img
						src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAT5JREFUSA21llsOgjAQRSm4OR9xB/JhXIGJqzC6AuMHS/ARVwe1tzCk0E47EO2HrfTOuTNNaVFaa/W6lsvMtM2x+iilNMZzm8d7Xnarum7eAKosv29P1WGuCeCPc3nTWbMHryjydY4BNUxYgRHSM2k/hlNcbpfFZE4P5piE4FiNlm3InECyXKnYfilSQqrQ7SUxvQECJQFkINUODKQmUjh4nkHKBPPuVsT/2PYOGiCIy9LOdfsc4xi8nccv00ImrjQFh5atgECciQQOxuBNJugv+2gFXPaUgKQK1iAEBxBwOswwTpksIBo3Do6jA1qzTXuT7uzCrguewl4FMTgd4xINJT0wmBIo1fYG0gDKDL0kxhpIhC7YHadiVUrgwrhxlOHeyQCktt0UE+9Ongu3iZmvEXsDOtevfY7y/vnZ8gVyMpTkq8fH+wAAAABJRU5ErkJggg=="
						@click="iconIndex = null" width="12px" alt=""></div>
				<div class="horn-modal-body">
					<div class="horn-modal-text"><span>全局喇叭剩余: <span class="horn-num">0</span> 个,<span
								class="horn-owner">皇帝</span>可获得喇叭</span><a class="horn-view"
							@click="setIcon(2)">查看喇叭</a></div>
					<div class="horn-modal-info"><img class="horn-info-icon"
							src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABgdJREFUWAntl2tsVEUUx2futpS+wvtRE0MRiZUmQjQxJCQmxACJyAeMKZqCoCR8APSDoSKCoWpAwKC2KAYJ+sEPGghoSYQEDSYW8IGYkJiIvNyWBvARtmzZ1nbvzPF/zt25IaXc3W6pGsPd7p258zjnN/9zZu5WqdvX/1wBPdjrox92lHR0pefEPN1WOmPF8f768/o7ob/jr3WlXycy+3zjf9/+dcMeABf2x8agAqaaGx4gsiuISFlrlTXm8fZrnS//JwCJdsd8ovct2ZgCIEMqxaVZkzi8dWqukIOiIGB0svnSLpT3i3JkBU7qlgos0cp/FTDZ3NhA1i62llWDbhLiTB1tUHUBnXyjNBfIglwG5TqGd2wy1fUelHoKuSfTGI6jy89c54sslf95Wc1D9RNpiLjdshB3HHmnuj3V+a0RuACKQwqYAI7VFFg8o+4r+1AEV9g1YAWpefuIpE2vN36adyvsBQDsIVRMlOPQMmygorZqRkgRUcn7oE4e21ZFvl0Oh08jfGXOcZB3AQi3wcFpgO1ChOuUsqMZD/nJSHZoYcHIkbNevBrBp/qlYOeR7dPTZB6F7bk2baaFIYNq/BcolMk9Di03au+jcbNXb/n90MaffEOfy5wA0uvq9qtRPRYFmHMO0q8fDvUpfZSsWWuNnSZJDwDsSAlbUAKOWR0cFMThvILONBaNmbXmIPpaZRGcmxxurSZFwXFfVsCOo9ue7WhuXKcql3TDdbcLJaeSbAJ2dMOXQV27Hf/b2WtztNZoscekHaT8Mb6fFTAyxB3fvHsv+X4jA1w90nhQGduCehVsSzhFLqwy3Klcx1i+OM/Cuqb70LQfbeeuPxuRoFkBIxUsJJVmJ2LU0F3QJc7+efVylz6A8EeauMTXhZDrPMZIL3Mn3DwpLQ0MsGiMucA+2Bhe9ZVIGiiIGnKMv6IQel2ouWRSgZSJGMc5qnDs4UJvSTCPbaDd0kRuj7oiFdSTn+tGUl/OOJ4AKeLsjSFwy4AEoRQotDrYzLp4GL62DXdWssLN43bMGUtUH8kQ2clGFZk488BYJZ5aWBFRhRWECrwr0Yk/VgQa4RJYUVnUTpeV4XiRy0x36gd2jHf+y6HlQV/f96yA8CthNcZOgOO4OGcg+QCGQ+WeBZRhM8AosXm/GjGzvr21qf4OMoSfWSJpWHiJv4r7RgtaI3cxD4GrFrapFU3A6nkXCwBuQYkx4QEdKB3MCuvqBNvxrb8Ucz1Wmu1htswvKQ7yk8f0dWUHNDYOjdhieXHMdqd81QPLQxwoetAn/aFT7hMEFFjU0vN715ZjQyzpDcfjvCGlXX2BubasIdaed9adc52msAIwrWw42J1QgfNQwsw56FQNSgFSNBZjV6JexuuUeZjP8xCV9vFz6lIOpq8yK+Coh1cdRh7thO1940zRGZg+zk5E1BCIRXRQmVL60I6SLy6DeQEctyKvz0lnxC1riPGK4q25zNkAyMKLhzaslmeDo9yk8Xr2h3kxr9L3ZSNVY0EzgTFFFJWVMFwAyukQ7nylDju7NyuzAvaemAG+0Lb/lbU+9czTpI3SlCDrLZs4/9UDbnx870sVvtYLtaVlWOHd3C4qI7RSx82zXpM8RNzy/j3Y0rQ+gdwbLs74DFTepkmPvbamty/avTt2mk48A5k3QsPRTkE4PjCl9s25vcf3fs6ag70nuGfszpNc543AymhlF//RtPmGQ1fX1Jh7FmzeCb2mYtx3mfD+jINrubMVVeYNqLXaE4SMNwW/xmxFoiex42avrqont1z0SmOzNKl1asiwB6fUbm2JAnN9eYf4yhebhiWSHXEoOFz2AW58dODV8WmxGld7Z83zkeebA8hW5q2g/C9B9i2Wj48POQvhDb+g56fspc+gbt6Lvx46b0A2Mryk6G3k1BWGlHC70trZpz5e9cT1jvKtDwhw1CP1SRwzdayeQKLk046f8cU/VwO/BgTI7icv2PQBioOhggIJTKLIfydzRR8wIDsqKypcBA0vhO9ZUj8WFOkNuUJEjbslicwOTjW9UG6TPZM9RamqRQ2/RDm93fdPKvA3OjLqpwwcZ4cAAAAASUVORK5CYII="
							alt=""><textarea v-model="text" maxlength="20" placeholder="请输入,弹幕内容全局可见" rows="2"
							class="horn-modal-input"></textarea><span
							class="horn-input-num">{{text.length || 0}}</span><span
							class="horn-input-num-total">/20</span><button class="horn-modal-sendBtn"
							@click="sneHorn()">发送</button></div>
				</div>
			</div>
		</div>
		<!-- 贵族弹窗 -->
		<el-dialog title="" :center="true" :visible.sync="dialogVisible" custom-class="cloudBody" :show-close="false"
			width="750px">
			<div class="chatroom-grades" style="border-radius: 20px;">
				<div class="grades" style="overflow: hidden;" v-if="goard[nobilityIndex]">
					<div class="textTitle">
						<div class="textCent">成为贵族 万众瞩目</div>
					</div>
					<div class="flex imgNavBox">
						<div class="imgNav flex-center" :class="index == nobilityIndex?'nobilityActive':'nobility'"
							@click="nobilityIndex = index" v-for="(item,index) in goard" :key="index">
							<img :src="item.icon" v-if="index < 6">
							{{item.name}}
						</div>
					</div>
					<!-- <img class="imgNav" src="/_next/static/images/tx-6@2x-cc29036e0aeed432689ed7cf9adf9e02.png">
					<img class="imgNav" src="/_next/static/images/tx-2@2x-53be614d9b8f96788dff8f83595cf0e8.png">
					<img class="imgNav" src="/_next/static/images/tx-3@2x-aaa77ba61f47098416129109f2f5811a.png">
					<img class="imgNav" src="/_next/static/images/tx-4@2x-84526ab5309ccf3cbedc73318347f246.png">
					<img class="imgNav" src="/_next/static/images/tx-5@2x-03f5e0578bc99c1552fe4c98b5a4c540.png"> -->
					<div id="gradesCont">
						<!-- 头部切换 -->
						<div class="gradesContLeft">
							<img class="img1" :src="goard[nobilityIndex].icon">
							<div class="gradesCont-name">{{goard[nobilityIndex].name}}</div>
						</div>
						<!-- 内容 -->
						<div class="gradesContRight">
							<div><img class="img2" :src="goard[nobilityIndex].icon">
								<div class="gcrt">专属坐骑</div>
								<div class="gcrc1">{{goard[nobilityIndex].swf_name}}</div>
								<div class="gcrc2">高级入场特效</div>
								<div class="gcrcl"></div>
							</div>
							<div><img class="img2"
									src="data:image/png;base64,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">
								<div class="gcrt">超值优惠</div>
								<div class="gcrc1">惊喜礼遇</div>
								<!-- <div class="gcrc2">续费5.4折</div> -->
								<div class="gcrcl"></div>
							</div>
							<div><img class="img2"
									src="data:image/png;base64,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">
								<div class="gcrt">贵族标识</div>
								<div class="gcrc1">专属身份</div>
								<div class="gcrc2">皇帝勋章</div>
								<div class="gcrcl"></div>
							</div>
							<div><img class="img2"
									src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAYKADAAQAAAABAAAAYAAAAACpM19OAAAYgElEQVR4Ae1cC3hV1ZW+95ybdyCQgIBEwOCrVMUBaX0UBbX4qrW+6mfVkfGBTsc6gArT8VGV1nb4fNWhqOMDHG3HEaUVEQRf1Aq2n4AoII+CIPIKIeERQpL7nPXvc/+TlZMTkntzE+I3WXz7rrX3Xmvttf+19z6Pe0Mg0EVdCHQh0IVAFwJdCHQh0IVAFwJdCHQh0IVAFwJdCHQh0IVAFwJdCHQh0IXA/wcEgt/ASbYUc+KbNKfQNyRYDbqWWwq/0ycjlcm0NNn26meMXt7ceATdy5vTP6ztnNRhDeIQgzM+zbWsTTXgWoYO61q/U8jfhCMIgGvQTX35/z5wVre8vBeAYnVt7Y3Drn7gQxH9gPZrg1mnIKtTROEfhAYeGoiVxS7Iy31Y0nIUipEDAVv163l5/cBXp6HDtQO4og8FBHXAASi5SUI8nqi0bEcFsvQjAWiIJwv0IGMHOIoitEAdvls6OgEaCC0DF9YJAusGcOnX3H7nL6vuHHXGtwB8YNGSNQ8Lw1xiUmCHAplJENEl+uU47NCJ8vZRJ+McAXYUceIESHPEwTqBRp0yOVZ5qE+fPtmnnVR2dSgWHJgVC5YO//agH6A9WXgUcUfQN33ocShrLm7cxQC5XQkDdxRxkhiP45q2Cy+80Jp685kXxeKJmlOuum+RCgj9BM6AX1hYGFr87N1PdsvLvVrpBSr3HZg24oYpD0kbVn40yXkcuSt6xawpo2wrWDDpucXz5s+fzyOK/ZpT1sNkXMbkOpqYCAJrPX7b2b/Lzc6aXZCbvWDV67+cJAEBbF2wurOkhP74m3FXFOZmXx1PxAMJKeAoxd0Lbn/l4VtHQkcV7cOGb4yBsTCm6LkxiMy4ROw46sgEYIIkTtYAICvyfHZkhewxIhNEgM4SOvLInrlH9S25i0vz07VfT1z/9S6c/3KlTQROHNx/otKnHXko6RvqATsYxDhMAOMxffKhY2Vbu/COSgAnxImCc/J2fX3kT5zd3praN0UGaNlJTgCzn5t8w49DdrAMcB+sC3925c+nv3vzlBmvRWKxbWjLyQ6d+ey913/XY0f7rKRv6Q4E6sORN4RhhzAOHRtUGDPkdiOstI4mPVEz+ROvvPf+N54c/3ZNTV3tii827Fj+8v0P5+VkDY/FYvs27ah65ZIJT75T1r9XztH9S8ZjpYPeW7pmurDQ9oq9gdUbt84cetxR98DxiCFHjxc2tqioKPHG1HHX9CnufrVtBXrUhWPL3l+65tdH9Op5bkFBbt6ldzyxRPQwPghOGRc3mOlo748OybKaHMbjiuP5jEVg5KsuOLXHlFt+uNC2rAF64tUH6ubtrj649uh+xROBzoGD9Z8Mu3bKP4to4u/fpzj0zrTxf8oKWX1gt2z9lglDBva9Li8nezjqpHgiUPnErA/Oeep/3iuXNlysWfwu2hiq3ZPBFcAYO4pztelkhG6/fPR1VjA4IJHAOpd/SV5YmHPRoL49BXzBQ9re+ujzpyRQ2lrbyqtiqzdtf9H0S8fw4wY8LhdaA77xkfQTDCRKrjl32LWiwqTDB2MxyZR6h9LhSgAmyYkTSFvO9z6BoIAsZeXG7fctW7fl3+Qp94BBBO1Ce2sOLr7vqTdWiagBC975xOw50UhsN++K4CMcje5466OVNy1d89VdxljaLCtQJDJ3n06AUenoj8OZAMy1URK+rtizkiu2X3G3M675+bMLfzNj3k8O1NZ9jnYs/9feW/5MEiTTgEaULdt3hb/YvPOloHhEKa/aP3/sQzOvmfDYqyvKSksuTshbCfj4clvFMtHXwOtEJl13HOuIBPhNULdBRrHuf2behwJTNWrFRfnnnHJMadHMuX8tP+/WJ2/buK1iRkVV9ftTZy5YI7p8wOIZbh6oJk17fXZtff3mPy9df8/Imx558JOVm+vOPvXYkh7d80cC/Fg8XjXp8Tm8+DIJQJsxQO5QyvRdECYCIndqDRNEOycOrmV7/aZt0V1V+xf2Ke52RcAK5oy/bvSYsQ+8NLequjpx0c+m/Vdxt270q1c/xjB+v9xSUT/6lsd+UlVdi34cM4Fxl4+8IJCIm3nuqNz79s6qKjSjD8nT8VBGPxIK0uM5Lc6Oo9xmDgAyQQjUr8A/JkuwWddncCN50fK/z3cuwPHACYP7Xqjsg5IIAgOAuQvI0RYQ8FHnePbxA464CO2gBUvWzBOm49EybXSMkJkY7/zgss2EAdpC3qAYrJ4EJokV6C1sB3flX0x/c1V9JCoPVoFAj8K8oT8aPbSfiAQCzSTvLjAJkE43pusv+e6ggvzsE5DQmrr6L6e+uHCD9LtjKdkvNsYFjvEZg+tf2iC3idrigLbegFBnsNYrU346oLRv0bds2+oWTySCclcTjMZiVjQWt8LRmB0OR0PyJGuHI9FQfTiaJX32kLJe55b0zBsdlKvprsoD76/esPvPlmXF5ZVFPGTbMfkeQGQrLresBnT4lfPdikbjdly4vNSzwE86tvd5vYoLRgKh8ooDC9d9VfVhdigUzcqyo9lZwsVXdnYomh0SnhWKhWxLzio7Ho5Fq5as3LJi8n/+HucVxsCu0pzJBqcsYupEEFO3VCtNjJkErhTrDw/dMmjYkKOnhazgKHNbklRCtM0NigslQMetZCRwMBlTUPTFAndBuL0BB1EGB9FxstsxEdyS3dnBAtERT8pFEyN2ggcD0fq6yEu/n/vRPQ+/vGC/jMCjTieDI3NU1FOiZHgp2UAZdt4C8M22/eCZSef279XzZXnwKfDMGLYuNcFMJs4kRAO1gmnM1I2BBgcNHuNDdVsSViiQK0YImYYQRaahVF0ZbUkSlS0frtxw8c0PPL9ZmnDh9iYCmnCKkjIBtLYSonXBv+v6Mb2O7NX9aYmzwEQlq5nRAVynTbhZyQ0c8SfizuICt+LyLi6RPH4FEANJkkMGRi4XQWPpuIZvCUx8wJccfVLk1bXLEZfTBq5lR0/6RV9eeQ84/YSB0+XdEl7q4Vrh7nKEIaVNlI4DM28ZldyseqmDh5a9eP+v5cJ3K6PaX1M3d9Gn62eu3rS1Ame1AB80XK4FOKvlhZtteDxux2I4wxO29FvQgw855+NyLCWCcv7LNSAmZ38MdVwPwKEDXXPui13yGmAnxHdyLLPI6MeCD9syfuDDluuA8WXBJ64BocCZJx8zaMS3B92Zk2WfBP+gr8urbvr+7Y/NFpHvjbgbEAOPJaimRMhougSA9GowCZBXwhdgNYNq68Kffm/c1MnhcJjJMqBKl67TBxOJOvvhhhPUW5+yM5CjTz9ezjGhi0LgyAke+xMz3vzL7kvOPHncf9xx5QLZad1xXSopKsAt8ZykD1c3WddjSFPrCcG2hTAwfBjwhYeCdqC/s80TgZ1V1R8J+OwDJzgMWJoMKJgQgAAoWGF+BX0sTUCTPiaFOn4+0EY9jAlCLHoeJt43F39eU32w7jMcY5iP7KBS0cOCRT/nQltpSo/S3QEcmNxNgpybIc6stq6+TsJCsNADoYuFdXCAAh/0R330Ub85Dh3awQ9lzaED0j6gq4ljIg5QUG6Pa3FHhh0gyviCiOBzHOjCJ2zBU6Z0EsBAwREACleELeeuiQaRyMKBDvURIALXnEFTj1zUGhH0dEEnbanIceiDnP3ahr7QRj1wF3y0y7MFbstkHnI/FouhnwnALoOuN4nSlBqlkwCM4A3aTQISQGScuxoTEJoQNAJGoSyiUYc/EP06tYZP12WyifUGDUfSftDCutaDrbaHDuJn4WIKIn6ADxIZeuyjLto4Brj2K9WWKd0EwDMHJzdBIQEMScKHHoLiuaw5OtGHQh8i0hqikdGvyVvXfZDhqzmiLTn0oE9gNR6YD+6wjEbSgMCDM2Zy7ROmrSI9YKsMPEocnAHh1s8JukGRK54XRZ0EBk0/4CAvRxt1IadDtAdn4biICViw3fh35yKt+AmMEPQ5V9oa3XQ/0k0AB/fy5JbFPBC02b8acCQBdd6NOIpNJwW/IHKnlt4nxwBn4e6DR4yBHcA+d054IDNJkC65HlDX7U/atinGdBOAYEg6AHNumsdU6U0+KCFyFA0+E2B8PH/PjYOGHn/UpTLPXPkqUV7YmeRpv0bP+yFfL8otomQPa1KIsoOV0w7Ztp0HNnkXJCsivueFOR+/8tTr7+5xrEwCmCSMCW8oYinTMStfrsXy4JjUB4Os66orNTGdBPgN7AZkLsFm4UsgErV8ykTcawCTgF2A9sBVF43IP3No2XyZTi/UNeF1A1yB+xH7OJyfjl/bT68aeZ4k4DLpI/DYASQmwIpL2M4mRhCurl80fm30d0ieTgLoEIM2GdjZslQxHEDrQvDN5E89dlBRNB414MMW99zOpBv58K1QFxzktff2u04SicFJmQlAfHACjviQEDl/8ObEuauL+WfZFwOxbTW1JQG+g2jwTPTOKsNE/Upw8m9nlZ8+ZMDUwrycf5JNnmu0mFZYQCZMnhFb6HZNG9wZi307Kvbep1yh0beY357iDDNbEbnJPGU8Ac59M+aDJeQG7TQ48etVY7b7Wbc++qh0/VYK4sHqQ0EfdYmhNLWaCCqCQMHKRsExiAL/Oi6pein5TIM3uv47wGuQcj3zCZAVwyOhAf8mcRFQcJ65BJ5JYLvWbeJIGvxAJPjgsKcP1P0Sy37pbiBcwQi8cxfa0JcpKeMJ0Bdhd/37R0tgwAk2OXeABsvfS+MEAGAQOApC4DgiuonwBRwKmhLxmNxZYUHBWQuz0YYpyJlPAC5a7nb1DdoLCOvgTIBXRt2PADL7NPjQ1XUEwoSAsw96zRLmYf7JVohLMtqDMp8AXrQkWrzG9RDB0s1oa03RNpDhHHYEVHMAzsKzH5xtmktzEzKBQ8m8z8KdWROVzDRkPgGIy90BrQoy8d/3/3hi98LcfxQ4c4iozBhiI2Kf22HOBoEGXEhWbKymLvLx5GlvT9q6a09EmjT4lPksYvCFmRTsPPDGOMsC4m5ObUriqZWU8QTgzCQl35+wCt54gtIw9tLhfQrysybEsMXRS5Sh7SEcB/h2GBxEOfmNsWnLzbLOv+2yEXPufWbh29LAVU/wvZzxkMOHK0PAXZ0TktsMnYxRxhNgVoy7RJvE2aRn5YY9+8YMj+yWRdyL2FOpJcABCW0wkiMH49sq92+SKsDmatfAY4WgzpVCF00QxrmPGPBAn4jBJPPUPglITkXvhuZCX7b6y/r3lhb/6MSykh8KhHly3bBk1Tlfysvik6kzH01cyMrH8kzIbW/CfOkugG8t37/4qdf++oUo837fCz6AZ4FP+OcYjZKAivM2BTsBqpmn9kkAp9M0Xr9pJJ6fs3SzqOKPLvjTDz4TNHcbarARfXCuaADtBzp3AfVow1gwBoh1p2Ya8IWM81yDndAelPkEJLcsgsWMfQgz4Wwok3NlAhSa6xVKd9QHpw05V7xfMqgPTqIv1l0ejwns0otrmc/1zNVri5DxBOhjR8vNBMnJEzxygMg+7idyuGIfOHRh5wc42pkQyNAHB0GmT/ozHfzAqjcrX7LAo4h9meKZT0DyrsEEqO6IPAFzwlzpBEoDoo8fttMN7cFhS3uCzaSQUx96lOELflFvhuQISj4Jw7A9KOMJ0HdBKmgNoAYAMtRQABaI/bBhEkyH54N62p4JYBt1yOlCAw+ZRfcHzMMvVr9Yqx8YUCcjvF0SgIBBiZj5JQEn5+UEBRyAsd+YqjravaRtaU/QydEOol8kk3amQ/VpHSYdd2DOP7GC1B7UlgR4J8P4orILjF87FMyXRkxIF9zhwBZAgQiwboNMUIySfKANpDlkFviDTC6i64Pgo4327EefvutyY5UACpzrmPwwK5bAk7WXOLa3vdV1DJYq6QnQ1g0kHIns4F1Dz255Z2VnZ3Ny4EiMrkNGDBps+gKQPFJ4K8kLLcBAYR0c+hp8AslxMbZf4a0v+0x8Z50yuDg3xz7ZHD9yF1QXDu8Ue1Bz83d6U/zEoG0lHVCicv/BRUf0KLgeTrOz7KEv3HvFo8vXbn9ha8W+7fJr46j8hxmx3JxQVH6JnJBfKhvbSDRmFoI8hJndIA9i8mNopw867368rmL91sqwuCTATBKG0eObRF51ztDCYwb2wt8DNyH3C3rpicUSwbpwxJa/zJG/0InZtfWRrHgkFjp+YJ/jTjym70Rx1t15FyR/JFC+5wPlTI+vmlMXzYRTNOPKQvKwelBypOC3kznfOWlgyeRrz35D/ui6N5wjUg5CGTxFqv5q556xdzw6Z5HY6SRoNxgm+Icp1/xLYV72gzKw3YbxtF/5j0Gif7thyqyb5IfG9dKBhUDOnYidyh3YyLalCrZbqmQmKkZMBLk5Trbt2hc9+sieG0t7dx8tAGTjFgJAEHRyM6h7tZZWLScjUgnMKSrIGVPau2j2klVb8OdCjdxIHarW7+689Dz5Gfl0WbUGfLjxKqKt1SQxRWLx7S8vWDZ+zZfle8UOQPM45PGoF0TKw7UlAWbSEhASYMBPytbizzZvPxCOLDy2tNdgOYZKsY2drQycm4/RSZXztpN3HeTiO69f7+6nfrJx56y9ew/CiR7fuu2yM/qfclzf16QdfwwmjGM63Bm3oa0hNQ3xMDZwKbHK/bV//NWMDyYs+fwr/N90BJ/XHZ0AJAHU4Mypt/iJSaRKABx2AJ0XLhw/+ihiu3X+6cf3HVrWtyw/Nys/Lr/yCAXlPZtwvDwTG3x/bIKWCQctySW+yLeDzgLG39KU9Su+Xq7jI4yuDFtdG55+w4OvPiR1d7KlJSVZj0z4/mvy146nIb/4emB/Tf2rO3fXfBRP4FfNFgCVAR3f4MafvMYzsgyN/kg8JmEFE9UH6qsXrdi87tO1W/eJHoHHcYPjh0XfBMAhihuTyK2idBIAG33s8FqAJDARvDZQDzYMDhzFQaGh3S+WxJgzji255QcjZguoJWIDcBMbtlbeNHnagneTfoLP//vldxd1y/0Zvx+oD8eW3/7E3LF79tRgDK9fxmHcJfuhowv6GCMSwLNeg4827y7QvuGjRUr3CIJjBswdwbrmLQWgdSHTl5u4jV9X1ZUdWbxW/vDvYsEEvy0MFhXmjgoErflfbCqvve/Gc0YN7Fv0K7TLwSFPrIG9M+ctH7dqw078nSv90K93PNYRJ2QQgUfyCDCPHXK0sx/6KQMvNobSTQADJ6c/1vVk0KeDZLDk2hay9mHkxZ9/tf17Jw+wC/Ozh8tRgWMrd3Bp8TB5R/nJ6OFlz8n5kgfwsTuWrd1+94vzlq9TfugfXMfBdsbBPgCLArABNEHXnAmAHu1FTJ0IVCqWXoCQRBae/Zpj9aFf23E8Bs84wH1Xa35+vj1t4vlPy/96aJKQdFAtvJskxFR3Vh548V8ffws/8AIRUHKCxTHJOTbr4EzCoRLAJFCf9mbw1n6kswNa45vBMDhOiBzBcwJsI4cN7TEWAApGIpFA5d66vw07vt/FcrXOczqCOVj5oNr66GeTnn7nF/X1UfjR4+qxKOux2QY7ynq1U2YfbRmnjhWhpETpJsCAIiNx9XgH1cERWO8EdJ2Toi5B5OQwjrWlfG9t396Ffx9wRA/8KSx+OWvGld/u75sxd8Xt6zZXYEfQB/0DQMh+QFJH91OPXOtApn/GKE3pU7oJONSIfuDroCFzUl5Z69EPxzJJ+OSLbTu+M6R/Vrf8nH9Ipj/x8ept98x6byW+B6Y/gsdbRXKOqzl0dR2yX1tzsXnjZLyt4m1JwKFWPwZnYDpwypwwAUNd99GWk+BY4MHFq7asOG3IUUWhkJW3YVvVs4+8vHhB0p7gEXAAqWUmhuO3hjNGxqdj0zJjTYlzYikZKWXaa25AEh0/DlPqemXWeeuIxcGLOZ8ryNHHizVAIJAAWxcCTvDAoa9J1ymDH6rAXutqfynJmGBbiEFoH2gjyEwC+tlGXW+dOkwAQCVwehzIiBt6INShR7DxsMQkoI3JIfjal3Qb0m2UW8vpIy3e1gRwUAbLOjnb/cCmDjj7wQEUOFY57OlDRBdsgKp3ABPA48abAPQzAfAD0n6dlsafur85ubFFGrVMJYBDM1BytANMXaeul+sk0EbbQQaIAN97BDEB3AWaa/Dpj9wbg7feWj2vXavrmU6A38CtnQT0mAT4AXCoA0wQ+gkmjynTkWznUeM9dmADW11od9h5RyQglUkCJE0ADwRQvQnwJovJQSIgk2vgvf5F7fBSZ0sA0SBQTABBxMpHG8BnYR/aIYOzsI9cujoX6VXUmSIjuIiJMjgvvGxDP8AFEXyCrTn7jWJn+sBEOitpkBkn21hn7DoJzcnU7VS8sx5BAIlAegHT7UiErvvJus3r67DXvSvpsAfkE4COUcs+qo2Sgf5ODT4CbGlC0Ols1FzMnR7szgZkVzyCwP8B88ZYVytbdZkAAAAASUVORK5CYII=">
								<div class="gcrt">发言特权</div>
								<div class="gcrc1">尊享{{nobilityIndex + 1}}级气泡{{goard[nobilityIndex].gorgeous_num}}个
								</div>
								<div class="gcrc2">解锁1～5级粉丝弹幕</div>
								<div class="gcrcl">
									<div v-for="(item,index) in colorL" :key="index" v-if="index < (nobilityIndex+1)"
										:style="{background: item}"></div>
									<!-- <div style="background: rgb(168, 229, 94);"></div>
									<div style="background: rgb(255, 202, 1);"></div>
									<div style="background: rgb(185, 129, 238);"></div>
									<div style="background: rgb(250, 105, 162);"></div> -->
								</div>
							</div>
							<div><img class="img2"
									src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAYKADAAQAAAABAAAAYAAAAACpM19OAAAZKUlEQVR4Ae1cCZhU1ZWutRsaaBpkUSESQWBgQly+wbig6RgRXMaRoDHi6BdcoiMQNAE1ShxGcVcGJYyZjBFNRAERNLgjimEZRyIuqAHZFGSVpmnotdb5//veX3X7Ud1d3VX4Zear43fr3OXcc//zn/vue/W60OcrSIGBAgMFBgoMFBgoMFBgoMBAgYECAwUGCgwUGCgwUGCgwECBgQIDBQYKDBQYKDBQYKDAQIGBAgMFBgoMFBgoMFBg4P8jA/5vKCjvOt52JhjZ2GSa11xfsrlBjHnHve0Wprd++HAEaaOQf2mOqS5t99lzv6m6SJbmuqpL2315xWWTkE/H8mtrb51tu89eX/12X77qmUhln/pVl+a69li+cBg/obx6c5yJPBHs1QGYefvsOYcBUkaXNqmsJ1BEul2XnZx42+pvk853AmwiRbIIpw78+40/6X7W0L+7tn1x0chgIPBtpKJr08jpgvHKreqZOfCOemd710ligt/vq4snkjsj0diK7V9XPTViwkPvwY4JsAunyr3q1DmLIsvZkeuA/uxiSEcfdXDl724d3bN72QxfMtmZ9oqIOpN4CfTae8cz+bD7Wprv9/uTtfWR2WPueXzS2rVbI5hrJ8G+Kui2Kdj2ki3WGUO+xCaedZEfRD247Lc3j+7VvexxoGa/kRYJ9Bp4GPQ0TebVl2kBd8cj/+762P5JNEC80+Ea1NdH5w8Zc8fP0Bl3i50IzlZx5uXw6a6cg4f0VPpiEfFm16Mdum/c6N6jyk9ahThLbYIQVSwaiW2IJZLVaTfpGp3Z9qpTU8ibSGVbdepM4vUHtIF24VB/f8BfSnt7fNueyqt+eMNDi9AdQ7ETQe92QbPtkq97ALF7C3c+/YfOGjrwX3z+ZGkCsEka9fa9lU/e8OAzs9Zv3slLnXMlDO5wS2q9cDjsm3XzZacP+27/ewNuIgigZ5fSX0K9ZAERLiYjb0KS8iEiX7s/RT6cF00cM3wmDDrQiFHs3XdwYfn1Dz1YUWk2Pm05j8PS8pdvLXzUZt1EIuFfvPyjbf37HLn+uN7dz9dVhGT06Nu75+LX3/1kH2wJ2y5omjZ1TkIg+RKRlQoOjkN3Xn9hv0DS1yOJbZ9AgY7PXPDW7zmGYpPP+d+ECCe1sIZufPjZ96rrGtbynpBwy6A+PU+BjXDaWIkzL3jzlQCBUXCpwL7VvWufZDKB8xkF/9VHIl/NX/KXvW7wmsfdpRudztvDqe0nmhTm3RUHPmQCzM0EOhwO9gYuEm+Tz9iEWxpdbZN83QO4eioQ1JWAYLuiUBeyawRB1dRHtqMu4CJeZIsY6sMhXJfYVEgsxZC6d3/19j5HdcVV6nSGgoEy1OwE0C6v2PKRAJGZMQF4wgmZXeXE5IvG4vVulYGIeGo9bbBfOZN2p7RZ2Rht8ulfSQjWR2MNNlYcRWGMkyPiox214qTOGV8+EgAcKVB2cGbnRGLRoB0UjyJXlAASH0WxE5AyQn+uQYp8Lss6MRKbHbvpx/cwfyOsiYSJwbVnXfHJJ3VO+GwQ8NUqsUGwziKAAh6KxxKBhEu6Hya8GUP4wUKiSbw3CRrHUN5EGImN63IN9RE3uG+cADw0kB8W4lNMvAqMPbSuCFTbloi2JkDAubBNPIEJqAGPG29I0BAe7SVKAINQEqjZFkGyzYcWZvlmm2sRrwssGeAVwP8o2DiKxdbaZPTDOrWkUYDqbE4TRGtFgXAe6yKdhPPMLL7+ojOOueDM46/oVlYyvDgc7g8r2piHi3gyUfXV7v0vLP9g48vTn1nyCbob3MIvZEqEgmoqoFxwk0xiLXJL8a1XnnPCyUOOHXF0t7IRRaHg0Xo1gRMpUReJrK+oqn17wdtrnnxy8aqvMId4eWSyeDcL8TaFGUOHSmsDscknqXYCwicO/FaH+8aPuqlb5w4TMYZkcJh4nGW8rw7qGmIfLV7x8Y33Pfna5zBiAnQv0C5FVyogxwl7HPG21S8tImRHbW+WoslXDB9w0fdPmNG+KHyCmUSLNNx03fEU2bP/4MyJDz47ff22vbWw9GK1N43WNm6b+xC45mw0RlvZe8kPjTnvtC4TLh72dDgYHEaiKbycuZuoKaprh7n9NV/s3HvLxbc+Ph8mugqUgEyBCIO08Z3hw55LWxYlIPz8A9dd1qdn1/uAsiSNhxiJW95Y4TSng/ew+kh01Yx5b1/23Jvv78eA98hsdRLoPVuhrQoDUTDB4448st0fpl2xKBwKnC6SATm+c++BhSs/3rRsxQebtx+or4t/b9CxPc486biTB/bpeVkQ710UWgA5Wr919+Vjpsx+DX4ZFANRElD1+TYuvLdOvCBx2weMvm0gulP4rx91TsmNl5fPg99y2lNi8fijgy6Z8itUbdyhZ+686mxgeBZnfEB48TeBqg3b9sxd/tGmv6z59Is9nTp1CJ9+fN/eJw/uU96rW9mFuC8wXiORaHzllVP+OGrjrl18pOYxpKNImAlVcM2cpj5SATRl4PYrAOpG5KMdemPmz28t69juZm2fhmh83YK31tz1yNy3N3PcnaO14meeMKD09qtGTOzSqf05IgCk7l245OPy+599fQfsFVAqiLXPTH0Cby0HguDjsUN3DL70jr+HnfF55QWnltx8+ci5oVBgGPpM5LFYfOGZNzxyVWVlpXwY3JOuHNn7kvIhS7FuN61debDujXtmvz7jnQ8+P4jptEthRT32y8t/OHBU+fFTisLh4xzvft/+mroHzhn3KK6gRvcte+NklYRUVuEoGyEwllQSxl9W3hPkj+dkHin4orV9wsPPXQPyea5TBETa9+cPP68c8fOZU/YfrFuKl2HGiISce+age9BgwuxibppDxky9bn9N7Xzsal8UBWJuoucPG9Jl4iVnLcAbnGHRaNTHUlffsPKGh+aNB/m64cpf+ILTBk1DBN3Msw7wVh6sfQNYbgf5lfApjNTazf6H5yz97OZHF10djcZ28zE6Ccyd2xePZ+yw4xosSpySh66WJdsEiPhG5MN9aMQ/DB6Db4wlfIEF/PEl/7P+tg/Xb+VNiqJAdJlKs9935xOvTovGE3v4PYGlXXH4vOtGDTsaQyKsEYG1dfWhWCzmi8WixFF89inf6XrH1efPDQR8p8Ti6EdiGiLRdfc/+cZVy9//K9eSH/ON9tqLTjsKr0bOJVSWSDy2a8pjL98NO/rLhFU72rdq7ZbqZWs2TjG3NMe4ZMTQQZe7aygBdhLos0XJJgFyRK3CeSbzpR2KztbLtqrq+hVTH3/pI3dVBkQS9GjJpwYW9pndteLDjQe37Ng7R4SAg9CwE/ufgXERZ+twfX0kGI1Fffh27S8/of8Rd1w9Yg6+vQ4l+VEkpiEa2fX7P/332HlL3+MG4FyD0dXhYScOOANXqXk1wqt101d7/7j6r1v4Ttwmn3j1hMO68Ppuf+zF1Qdq6t7lXJbS9kVnub6VAPFjcwaTpiWbBNiz6ThFPup4X+XvJ4Pd+6r4B22KTT6D4dMNi5LAwGiTfH/dttVKIF9XdywOHYt+m3jVw9FYJBBPxH3xWLx46nXnPRXy+07kFUHyI9HowUVvfXDNYwuXfe3OJymaa5JR2q6or7OWQ+C7H21eDRsKNwSJtrEKL7GaDQPt311R/Z7whkLB49BnfEPbSUAzO+HkbESZJfkqZkHcGLuQOMqB2gb+8YKiHSXgjkHj+wf9+Dd9uaeCV4AjCV/cef9CXCSENhSuH8T3BlwBMTa64NjpEsfOp2B65O3VGybe//SbW2jndHHE4KA2mGOJmPmma7yh87OtO/lanKuzEKsK2xSua3C62newtn6vBtHXBYXrsQgv7emHcy1TtDJItgngVDpUMQGhHcTTxgFcBUfQoH04zNe3djAExSIgCki7JtC9e6cOvCEacS5t2jAgiuZxvWA0Hg1wx9vCM/m9T7dN/dfHX/kA/SJLOGmqOq6eBF62wan7burIss4dMM5NQ8LomFhZt9c1a6OPEsB9qkwPDrghH2CfVbQWdVbCyS2J15m9SACX/laiZelxRMeT3CqbDIZB6djJdAwligPBEANiMZPiCfpX0NJml0UiSIC52fKG65RPNu149JZZf3oTc7w40ZUS4xPnNhJAfh1pX1LMjSDyhTUTzlRi8HrlJHMHRybxuL0V84nR5sRx7nw2h8lYcHI2Yi/QqL63qma5bkqd2heVj//xDwbAIYNiIXAlggGqKKAEHj/JuxGTBJCEhoKyNcn364ZLvWXnvnkTHl40151OP97iDrnJASI+rQmvHy0Y2FiFz9bCmpx46fcHlpa0O4M+WCr2V6/A/EZ8eNpav0mdbQIyOeDCvkXLP3kBAUUZFOIPX3jGoHuP7VXGZ3SRYSfCDpaBJbHfMdX5kyXaPrysU0Ai36zDsRjs+KhJ8vdUVi8d9+CiR9EtEunPLlqL4xS/c41hgpsEN/lefF4fJo7+vboXnTds8L14XA7xyMR/0ReXf/yC47rZq881yaxySYAJbP7r7+/cVVE1z9m9eAMXDPSfNenSx8b+46m9PEuKKAZsgoJOhHC48CZuCgjm9wGISJdmny8WwRMPvmgdrKlfM3nmK1NxP7B3ql0XifZa+P7k+Dcadd4/4FaFtrY9lzRyLWJ5ZPLox4pDoX6mAzPwNDTv2TfW7HRN2qyyvQkLJBdSPaUn/+blGf95y+ihxUUhvp/BF6rQqf888sRXRpzSf9b7n+98cdZzKzfX1tbSXoSm5tpHkPFMB2mhHYUaOYonaxsaNj4wZ+VNX+MrrNtPskm+7jWsmyxCcz1uMvkxNe5fSgD3ZHcsPe5iLCkpCUy4+LS+Jwzo9U89u3Qah2S1d65yvI+OxNZP/s3iGdZc+aFbirft9Gb4zCYBdHYIce4iZsfgaa5u+px3rrtpzJm/a1cUHuAGWNKjrNPkkSd3nHzeyQNjsUT8y3Vf7Jk04eHn+exNf04BfdyRRtCjR1qnIxUIbZMHaup3LFuz5WdrN+y0H3eVAN48ST7bdMg5JN9ghGYc5grjW00KjV1hh7F/ZNKPThncp+eDoUCwD64XfNXgZcIjEhYoDdHY59Pn/Pl6xMwXcfStQguthaoRs6YamXQ2CdA8F4IJRItSM+DgktXrKnZVHvzplLFn/+KIziUXc5J2Gr46hbCD+vXt3W0SusfQHsUEjZsHtqGDE38AQXdG4Tq+u55Y9jKUyGIXJyoB5FO7n/22HZq8B5BIDLnLoM6a7jXmOB4AjLgq++FehCEhc/BVVNUsmDZ76fS1G7fzpZ3Ngeo0VEG1Zck2AXKqhagZuCHf1X4Aq7709qem4Z3L3OFDB4wp7Vhcjp+g4+fnTgDYS+1hyzUZrElCMhlP/SGc4cbRxphdnMlpsjUmTEoAtfChmiI2RTKuNLOWjhLkQr7SePB1xn5UxZyKquq6d5as3vjMf72waqO1huKX1trUwkYczUq2CZATObYTwF3HAFSSBIpyJ/qmzr/7yn8r69R+FB3Ena+uXFOk8BcT6edQ83SSGuMaIshOgup0qaDtPs0RqcKFHwfwewBMcTlS4omoxnRFJvGUFQ/hDxSU/dX1C35821OMg3YUrsOi+Bm7nQCNozs7ySYBdEpEcq7F2UcA1ARI7S14dnfeHWOMrxk4V2ua4HHmB/h6V5JImCuAYyTFFhkRB0XaaaVxsE0cnM/C9ViCCXzJMwlgEiBMPvtNw5mTjOPswes604VX69pctGMnCwlnv8iXZj8xyg7VQzCyr5GIjEadGRoOIschFyEgLijiDZlWm+MsAXKrmyx+pMU+O+BAMtb4CjiqW9mPFt0/dhgMk3jPZA5hfyAdCG6KwuKg4ZjbQ3vQ59xjneOFg+jEJJAdDPp7GlMlwMFocLp4ofRtwWwYjXEai3a7ksAnL/WRFzsBLir0NiPZJkAuBERJYPYpSgQBNyqGAJchPE0oIM4xdokACLKuADx29AgVBXvQwFhwRVpSVFdoPEqsI8XUQ4CSJhhTnYd9Tqc5N4N7AuHvCqmbsLz7EnEmjOHRjRnXmIhmzCReO5/aSz7nZCXZJkAh06mDLu2e9BAEtZ0IU+f2dPnAn2uMG/ZL/Hv21dTQxhG6YJ0aYiaiLgemz4w4H+qX5jxDnjufaxtfjn+HT+JxxvfsO1DjetMEXF54VnLf7vKvXxB+MGbtesZqFyXGmwRnURg3J9kmwOtDoNTPAFhIrl383HHaUa4x7QQu+fLKT3eOPG3Ab4/u2uncQDAQ5hmNx0DuUsSf9OGv5ua9CyYl/TyLQDC1I4w5gLaTAX5yd4NArsG6nxy691RnCj4BKbp9z/7Fy9Zs4utoCecAr7LP+cavyBfRNvmss582ignV7KU1Cci0ABcmcIIgKwRkJ4C/OjBEop/veahsP6wnJjy46Ano2Shilj7NmKU5mcWej+YhbUMk+nmvoT+2pVE19vThLRyD8AoxOPHQYDr4mYl8ES9MTfgzPpr8aE0C6MQbPPsEUMQLLAnAqx33yw8t09Od0ExfaoDz6V8EpkfTfbLRmOzVptZ8aoq0TZBIk3Ys8WnQulFaV4BiVGxqa77t252dctlspbUJkDMtIs0gCY6k2zvDed3snBDYWWa6FzTbIk07lVrCWd6isea0sNE/xfbhxcBxYghgy5jXFabDuTnRVkWxSauf5lqP9aylLQnwLuQNTKCocd/FBe0yj2OdthrXPIH1JoFtW2x71psS+WlqvsGFybYPzTEIeR+i8NUFhA1hlmafXWRH3SppSwK0AAEQuA1EdQHFFZ0+gtzA0mNOYJwjERG6EtRPbdvZ/U3VMyWAawuj5mlN8/3EfGvQSOMNY8+VD2GSTs3MtpJLArgGF24qCS5I3tQcfEiF5jAYXsa6lB0DjqaPIxHj9KY/bdt0b7rmJZ4jnOMt8s9kK+F8YjDfFTiJICHeeXZb48awLR+5JqDFNflAoQQ4/JtPxqbSUhJaXCMLAy9pnMIEkHiOsU48+Aed6StWGUD/YZN8J0CBpgDjMQhfv9iNSJ2fnGhMtkoEtWPY+CqQfS5aa9n+ST5FSTANbBjzJ0c23HdXph8fXh/qz0kLRE5O3MkKjk2Bxe9oIlt4BbAUFQX79zm6rB3GdfnTlnWJ5lHbiclH3fat9bS2wUNswHic8FbX1m9xDTnXFm/bHmtVPZ8JyLRw8otdleYfPzMoRNn51z/9wV2D+3Tn73G4NosJ3tKopkSkpTpaWck037uewUFMvx571jQ8qZUqARu3VazFenkjOxN2gslVRCSfInik8Yew5pfL0MVsPzFl1GMd2hWVo+5IMlkbiSc2ocE/I+IVQ/oNJwAd1oDhPBUzbrh8V4d3Hb4i/NuGfnibWsLnBb7OqK6LvHX13YvGuRj1WyFq+0Uc71854c3HPYAAmirmXH9+2ad3/2T4d48NBwJ93PBL8OuJIZjXSOiE7Cgi1cUY7yXkS/cU1amzkUP881+GcE3zAIp1yT4kEktsmbfkM/5qmh3NFZrnJO7SOflg9Cw6TnRFUNN/cMPWitrNO/a/+p2+3Y8sDoe+DQKDIlEadocKvRqG3CHVqSF20+0yfc4oPluYn2E8UlVT/9r0uat+8e4nWyvggTucRS/g1OZyKqi2XQgxVxH5IpxXFY8gHkU8gnQcsT940sBeXSZe+r3ZuAKOYQTVNQ2vVtVEPsP/nST1Kzl3Y2K0BeGKvMaoKapTG2ncgT++ASsfM/1465kMlHYsGlJaUnwOcWDXfzlj/qqxH63fxX/7JdJ19PBfRnqPHzpn4fQ2Sz6OIC6u3SDNALj7tWOoSVNgzfrtVfj/s1UEA6FjeHTsq67f8Kv/WPK0a8v5dlA5BQdfEm00bRbq4H3jhl/TqaToHJ48+I3X1yCfP7YVBhu7TTbHVeS/zVp7p80OPBMFnoDtAFQ3gXy2+eunsAMr6yOxjYtXruNPTYiDCZNW3STN7c+1bo5Da43AS8s3vNQQiW+OJRL71m7e8weMiWjhtbXGGGPeRDsjV4ckR7tLgfIIUtGRxLY5ilx7ztFuUvLstoKVhnmrRPFR20V41ac1STjPe/3KTscOtf74Qhsmg3Ooc5J8HkEEIlAMjEAVoB2w7Nhnix2UCKHOhwgHNdel30zrKwG66Upr9wuj8OWMLV8JEBABI1A7AQycwnGO6YhRvz0mH7bmeFvFJl91bQj5FC47Ad7nfZt8zctZ5ysBDEBCoBQGy4AkCrK1CdD8XLSIl84mAdr9jIGYVfK1MUw8+UqATY4AKhEas/tJQCYSZGNrzc9Fi3ivlk+uJ4J1FVCrcEyYNCcvOp8JIEAKg1RApsNtKwAGJfJpK9F82UlrPBediXjv2lzPTgJxqq0EEEM+cZknEjrNpxCghMApAs22yKf2iuzkQ9pr19q2EsB5dt32I5Kp7WJjyhee1Lr2Lkh15qGiILPRXM4OTAELhj2mvtZoxejV9KE+rZmNbs3aLdoKQIuGbTCgb/lvqu51a5Nt1712bWkLC+fadduXEsC+puq2fc71poDk7Nh1IP9e3Zz/fBPvXUtYvP12Wxi82rbJSz0bMLkuZK9h1zP5VcAcs+uZbFvbZ69t1zP5sde265lsc+rjF6K/JTmswbYi0L8VHK2AXDAtMFBgoMBAgYH/awz8L5MiZflPSnT9AAAAAElFTkSuQmCC">
								<div class="gcrt">贵宾席</div>
								<div class="gcrc1">上座直播间贵宾席</div>
								<div class="gcrc2">彰显高贵</div>
								<div class="gcrcl"></div>
							</div>
							<div><img class="img2"
									src="data:image/png;base64,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">
								<div class="gcrt">开通通知</div>
								<div class="gcrc1">开通续费时</div>
								<div class="gcrc2">全平台广播</div>
								<div class="gcrcl"></div>
							</div>
							<div v-if="nobilityIndex == 4"><img class="img2"
									src="data:image/png;base64,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">
								<div class="gcrt">喇叭</div>
								<div class="gcrc1">30个免费广告弹幕</div>
								<div class="gcrc2">范围：所有直播间</div>
								<div class="gcrcl"></div>
							</div>
						</div>
					</div>
					<div id="gradesBot">
						<div class="gradesBotLeft">
							<div class="line1-box"><span>开通{{goard[nobilityIndex].name}}：<span
										class="gradesBotText">{{goard[nobilityIndex].coin}}</span>龙钻/月</span><span
									style="margin-left: 12px;">续费{{goard[nobilityIndex].name}}：<span
										class="gradesBotText">{{goard[nobilityIndex].renew_coin}}</span>龙钻/月</span>
							</div>
							<div class="line2-box">
								<img class="img3"
									src="data:image/png;base64,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"><span
									class="smallFo1">龙钻余额：{{infos.balance}}</span>
								<span class="smallFo2">由主播“{{userData.user_nickname}}”为您开通</span>
							</div>

						</div>
						
						<div class="line3-box" style="color: #aaa;" v-if="infos.is_guard == 1">
							<p>您已开通<span class="gradesBotText"> {{infos.guard.name}} </span></p>
							<p>到期时间：<span class="gradesBotText">{{$common.timeStamp1(infos.guard.endtime)}} </span></p>

						</div>
						<div class="gradesBotRight" @click="showBtn= true">
							{{infos.is_guard == 1 && goard[nobilityIndex].name == infos.guard.name?'立即续费':'立即开通'}}</div>
					</div>
					<div id="showBtn" v-if="showBtn">
						<div class="showBtn"><img @click="showBtn=false" class="closeIn"
								src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAKKADAAQAAAABAAAAKAAAAAB65masAAABg0lEQVRYCe2WMU7EMBBFZ8wtuAA9BR232EvQULBICAkqRAXb0HAFzrFGQpsVfbLUcAsyMCtGmKyTjJ0sUIwbW/bMn5cf2wmANXPAHDAHzAFz4FccmC9fJvOifH4sVqe5BX2xuvBF+eoX5ZlWw2kDgd7PgWC/pvrGF9WtOu8r0C+rGVF9RQS7gHCszVcDOnQPIkpE0xTINVxNJ5IP4O6/x90j7F7+ucpQDCeziDg7PNjrfOU5OaLPfRIgJ6QUTIll7VhLBmQRTWFNTAyoOZcF2Ac5FhzXyQZsg+T51H3KOW1tECCLNt0KC2kOURgfGw8GZNEY5BhwrK2+Bzn4L9pgB2PuyYOM4eIgwCYcAzHcvzgkMTj5qnStibvaPstBDYAmRgOZDJhSOCW2DTYJMKdgTk4Iq75m+GczZ/PzvpTDw4VZwy+q4NcrxNkcqwEB6iNJT70+NiCRJqLV1+sBCe4Q4Q3RXcpp7RMP19eQgNPPr//TjnPX4ZqNzQFzwBwwB8yB7TnwAXUBAMepKGOdAAAAAElFTkSuQmCC">
							<!-- 需要判断是开通贵族还是续费 -->
							<div>确定开通{{goard[nobilityIndex].name}}贵族</div>
							<div class="name"></div>
							<div class="btnContent">
								<div class="btnHide" @click="showBtn=false">取消</div>
								<div class="btnSure" @click="guardUserBuy(goard[nobilityIndex])">确定</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</el-dialog>
		{{item}}
	</div>
</template>

<script>
	let player, parser
	import {
		sneHorn,
		guardUserBuy,
		getGuardList,
		roomRanking,
		barrageList,
		sendBarrage
	} from '../../api/user.js'
	import SVGA from 'svgaplayerweb';
	import { emojiName, emojiUrl, emojiMap } from './emojiMap';
	import emotion from '../persona/emotion.json'
  	import ChatDetails  from "@/views/anchor/chatRoomDetails"
	export default {
		props: ['roomid', 'userData',"qsVid", "giftList"],
    components: {
      ChatDetails,
    },
		data() {
			return {
				colorL: ['rgb(26, 143, 250)', 'rgb(168, 229, 94)', 'rgb(255, 202, 1)', 'rgb(185, 129, 238)',
					'rgb(250, 105, 162)'
				],
				paiIndex: 0,
				nobilityIndex: 0,
				goard: [], //贵族信息
				gitfList: [],

				// emotion: emotion,
				emotion: [],
				colorIndex: 0,
				colorList: [],
				gitfListSvg: [],
				gitfNum: 1,
				checkList: [], //屏蔽消息的选中
				gitfBigMask: false, //全屏显示
				gitfMask: false, //显示隐藏礼物弹窗
				gitfItem: {},
				message: '',
				time: null,
				text: '',
				nick: '',
				gitfItemName: false,
				HuoserItem: {}, //房主选中的人
				houseMask: false, //房主设置群人员弹窗
				barrageIndex: null,
				paiList: [],
				barragelist: [],
				showBtn: false, //确认购买弹窗
				dialogVisible: false, //贵族弹窗
				iconIndex: 5,
				swf_show: false,
				tipsId:""
			}
		},
		watch: {
			'$store.state.item'(e) {
				this.$nextTick(() => {
					this.$refs.messageContent.scrollTop = this.$refs.messageContent.scrollHeight
				})
				let gitfItem = e
				this.gitfItem = gitfItem
				if (!gitfItem.data && JSON.stringify(this.infos) == '{}') return
				console.log(gitfItem.data);
				if(gitfItem.data == undefined) return
				if (gitfItem.type == 'TIMCustomElem' && gitfItem.data.type == 102) { //普通用户进入直播间获取在线人数 ，登录情况下可见
					this.$store.dispatch('getGroupOnlineMemberCount', {
						roomId: this.roomid
					})
				}
				if (gitfItem.type == 'TIMCustomElem' && gitfItem.data.type == 102 && gitfItem.data.nobel.is_guard ==
					1) { //贵族进入直播间

					// this.swf_show = true
					this.gitfNum++
					gitfItem.data.nobel.nick = gitfItem.nick
					gitfItem.data.nobel.gitfNum = this.gitfNum
					if (this.nick == gitfItem.nick) return
					this.gitfListSvg.push(gitfItem.data.nobel)
					this.nick = gitfItem.nick
					// console.log(this.gitfListSvg);
					// console.log('出现的次数'+this.gitfNum);
					setTimeout(res => {
						this.gitfListSvg.shift()
					}, 1500)
					this.showSvga()
				}
				if (gitfItem.data.type == 100 && gitfItem.data.gift != null) {
					this.gitfMask = true
					this.getGitfList(e)
					// //是否是全屏 0否，1是
					if (gitfItem.data.gift.type == 0) return

					this.gitfBigMask = true
					this.initMachineSVGA(gitfItem.data, 2)
				}
			},
			paiIndex(e) {
				this.roomRanking()
			},
			checkList(e) { //监听数组是否的数据
				localStorage.setItem('checkList', JSON.stringify(e))
			}
		},
		beforeMount() {
			// for (let i = 0; i < emojiName.length; i++) {
			// 	this.emotion.push({
			// 		emojiName: emojiName[i],
			// 		url: emojiUrl + emojiMap[emojiName[i]]
			// 	});
			// }
			// console.log(this.emotion);
			// this.emotion =  this.emojiList
		},
		computed: {

			info() {
				return this.$store.state.user
			},
			infos() {
				return this.$store.state.infos
			},
			list() {
				return this.$store.state.messageList
			},

			system() {
				return this.$store.state.system
			},
			item() {
				// 让滚动条始终在最底部



				// return 
			}
		},
		filters:{
			 // filterUrl:function(txt) => {
		  //       var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&\-)+)/g;
		  //       return txt.replace(reg, "<a href='$1$2'>$1$2</a>")
		  //   }
		},
		mounted() {
			
			this.getGuardList()
			this.move();
			setTimeout(res => {
				this.roomRanking()
				if (JSON.stringify(this.infos) == '{}') return
				this.barrageList()
				// this.showSvga()
			}, 400)
			this.checkList = JSON.parse(localStorage.getItem('checkList')) || []

		},
		methods: {
			showTips(index){
				this.tipsId = index;
			},
			// 全选/ 取消全选
			allCheck() {
				if (this.checkList.length != 0) {
					this.checkList = []
				} else {
					this.checkList = ['1', '2', '3']
				}
			},
			getposition(name) {
				// let name = '飞豹'
				// https://app.longya.tv/admin/20211216/b7ecfbd11ff33a54d0e34ace26283ba9.svga

				if (name == '麒麟') {
					return '118px'
					// https://app.longya.tv/admin/20211216/d69b33dde2d89d2494212fd2ccf36e33.svga
				} else if (name == '白虎') {
					return '96px'
					// https://app.longya.tv/admin/20211216/8898a9f04ee82eaaee70ccaeca2d9f9a.svga
				} else if (name == '飞豹') {
					return '102px'
				} else if (name == '霸气应龙') {
					return '99px'
					// https://app.longya.tv/admin/20211217/dcf1f5484cac2dc8830b2ca26e464151.svga
				} else if (name == '雄狮') {
					return '104px'
				}

			},
			// 发送消息
			sendMessage() {
				let _this = this;
				_this.tipsId ="";
				if (!this.message) {
					return this.$message.warning('请输入评论内容')
				}
				if (this.colorIndex !== 0) {
					return this.createCustomMessage({
						type: 101
					}, _this.roomid)
				}
				// console.log(_this.roomid)
				this.createCustomMessage({ //发送普通消息
					type: 105
				}, _this.roomid)
			},
			// 进入房间显示svga
			showSvga() {
				let _this = this

				this.$nextTick(() => {
					this.gitfListSvg.map((v, i) => {
						//这里动态给ID，列表
						var player = new SVGA.Player('#svgaAnimation' + v.gitfNum);
						var parser = new SVGA.Parser('#svgaAnimation' + v.gitfNum);
						player.loops = 1;
						//这里使用动态加载的方式，加载tableData返回的svga源（例如：http://a.svga)
						parser.load(v.guard_swf, function(videoItem) {
							player.setVideoItem(videoItem);
							player.startAnimation();
						})
					})
				})
				return
				player = new SVGA.Player('#svgaAnimation');
				parser = new SVGA.Parser();
				// https://app.longya.tv/admin/20211216/8898a9f04ee82eaaee70ccaeca2d9f9a.svga 395 麒麟 53
				// https://app.longya.tv/admin/20211216/d69b33dde2d89d2494212fd2ccf36e33.svga 387 侯爵 63
				// https://app.longya.tv/admin/20211216/b7ecfbd11ff33a54d0e34ace26283ba9.svga 395 子爵 40
				// https://app.longya.tv/admin/20211216/9e07acf6216aebfc0c2b49062e09221d.svga 395 皇帝 59
				// https://app.longya.tv/admin/20211217/dcf1f5484cac2dc8830b2ca26e464151.svga 395 伯爵 53
				parser.load(url, function(videoItem) {
					player.loops = 1;
					player.setVideoItem(videoItem);
					player.startAnimation();
					let i = videoItem.frames
					player.onFrame(function(i) {
						// console.log(i);
						_this.gitfItemName = true
						if ((i + 1) == videoItem.frames) {
							player.stopAnimation(true);
							player.clear();
							// console.log('关闭了坐骑特效');
							_this.swf_show = false
							_this.gitfItemName = false
						}
					});
				});
			},


			// 禁止发言
			forbid(item,type) {
				/* 
				 * 
				 * type == 1 禁言
				 * type == 2 解决禁言
				 * 
				 */

				let _this = this;
				let time = type == 1?86400:0;
				let promise = this.tim.setGroupMemberMuteTime({
					groupID: item.groupProfile.groupID,
					userID: item.fromAccount,
					muteTime: time // 禁言10分钟；设为0，则表示取消禁言 （单位秒）
				});
				let errmsg;
				if(type == 1) {
					errmsg  = '已禁言' + (time / 60 / 60) + '小时！'
				}else {
					errmsg  = '已解除禁言！'
				}
				promise.then(function(imResponse) {
					_this.$message.success(errmsg)
				}).catch(function(imError) {
					console.warn('setGroupMemberMuteTime error:', imError); // 禁言失败的相关信息
				});
			},
			//设置/取消管理
			setAdmin(item) {
				console.log(item.groupProfile.groupID, item.fromAccount);
				let promise = this.tim.setGroupMemberRole({
					groupID: item.groupProfile.groupID,
					userID: item.fromAccount,
					role: this.TIM.TYPES.GRP_MBR_ROLE_ADMIN, // 将群 ID: group1 中的用户：user1 设为管理员
					// TIM.TYPES.GRP_MBR_ROLE_MEMBER 普通成员
				});
				promise.then(function(imResponse) {

				}).catch(function(imError) {
					console.warn('setGroupMemberRole error:', imError); // 错误信息
				});
			},
			// 踢出
			kickOut(item) {
				let promise = this.tim.deleteGroupMember({
					groupID: item.groupProfile.groupID,
					userIDList: [item.fromAccount],
					reason: '你违规了，我要踢你！'
				});
				promise.then(function(imResponse) {

				}).catch(function(imError) {
					console.warn('deleteGroupMember error:', imError); // 错误信息
				});
			},

			// 打开弹窗
			setHuoserMask(item) {
				console.log(item);
				this.houseMask = true
				this.HuoserItem = item
			},


			// 获取直播排行版
			roomRanking() {
				let data = {
					uid: this.roomid,
					type: this.paiIndex
				}

				let arr = []
				// res = [1,3,4,5]

				for (var i = 0; i < 10; i++) {
					let obj = {
						amount: 0,
						user_nickname: '虚位已待',
						avatar: require('../../assets/images/userLogo.png'),
						is_guard: 0
					}
					arr.push(obj)
				}

				roomRanking(data).then(res => {
					res.data.forEach((item, index) => {
						arr[index] = item
					})
					this.paiList = arr
				}).catch(res => {})
			},

			// 获取弹幕
			barrageList() {
				barrageList().then(res => {
					this.barragelist = res.data
				}).catch(res => {})
			},

			// 发送喇叭
			sneHorn() {
				if (!this.text) {
					return this.$message.warning('请输入内容')
				}
				sneHorn({
					content: this.text
				}).then(res => {
					this.text = ''
					this.$message.success('已提交审核！')
				}).catch(res => {})
			},

			// 购买贵族
			guardUserBuy(item) {
				let data = {
					id: item.id, //购买的贵族id
					anchor_id: this.roomid //主播id || 房间号
				}
				guardUserBuy(data).then(res => {
					this.dialogVisible = false
					this.showBtn = false
					this.$message.success('购买成功')
					// 开通需要刷新用户信息 和 贵族列表 （贵族列表购买之后什么样式？）
					this.$store.dispatch('getUserInfo', '')
				}).catch(res => {})
			},

			// // 获取贵族列表
			getGuardList() {
				let _this = this
				getGuardList().then(res => {
					let data = res.data.goard

					let obj = JSON.parse(JSON.stringify(res.data.goard))
					_this.goard = obj.reverse()
					// this.
					_this.colorList = res.data.goard.reverse()
					_this.colorList.unshift({
						name: '免费',
						color: '#1A8FFA'
					})
					_this.colorList.forEach(item => {
						item.rgb = item.color + 'FF,' + item.color + 'ED,' + item.color + '00'
					})


				}).catch(res => {})
			},


			getGitfList(gitfItem) {
				// console.log('---------------------------------------'+gitfItem.data.gift.type);
				let obj = {
					show: true,
					num: 1,
					timeOut: false,
					gifticon: gitfItem.data.gift.gifticon,
					value: gitfItem.data.gift.giftname,
					nick: gitfItem.nick,
					avatar: gitfItem.avatar,
					level: gitfItem.data.gift.level,
				}
				let endObj = this.gitfList[this.gitfList.length - 1]
				if (endObj && endObj.value === gitfItem.data.gift.giftname && !endObj.timeOut) {
					this.gitfList.pop()

					obj = {
						...obj,
						...{
							num: endObj.num + 1,
							show: true
						}
					}
					clearTimeout(this.time)
					this.time = null
				}
				this.gitfList.push(obj)
				console.log(this.gitfList);
				this.time = setTimeout(res => {
					this.gitfList.shift()
				}, 1000)
			},

			// 读取svg type=1无需全屏 
			initMachineSVGA(gitfItem, type) {
				if (gitfItem.gift.swf == null && !gitfItem.gift.swf) return
				// let player,
				if (type == 1) {
					player = new SVGA.Player("#gitf");
					parser = new SVGA.Parser();
				} else {
					player = new SVGA.Player("#gitfBigMask");
					parser = new SVGA.Parser();
				}

				let _this = this
				// imageUrl 定义一个参数接收url
				parser.load(gitfItem.gift.swf, function(videoItem) {
					player.loops = 1;
					player.setVideoItem(videoItem);
					player.startAnimation();
					console.log(videoItem.frames);
					let i = videoItem.frames
					player.onFrame(function(i) {
						// console.log(i);
						if ((i + 1) === videoItem.frames) {
							player.stopAnimation(true);
							player.clear();
							_this.gitfBigMask = false
						}
					});
				});
				// console.log(player);
			},

			getColor(index) {

				/* 切换弹幕颜色 */
				let info = this.infos
				if (info.is_guard == 0) return
				let i = null
				this.goard.forEach((item, s) => {
					if (item.id == info.guard.id) {
						i = s
					}
				})

				if (index > i) return

				this.colorIndex = index
				this.iconIndex = 1
				this.barrageIndex = null
			},
			// 编辑自定义消息
			createCustomMessage(data, roomId) {
				// console.log(data);
				let _this = this
				// return
				// 2. 创建消息实例，接口返回的实例可以上屏
				let msg = {}
				if (data.type == 100) {
					msg = {
						type: 100,
						gift: {
							level: 4,
							swf: data.swf,
							type: data.type1, //是否是全屏 0否，1是
							giftname: data.giftname,
							gifticon: data.gifticon,
							exp_icon: this.infos.exp_icon,
							is_guard: this.infos.is_guard,
							is_room: this.infos.id == this.roomid ? 1 : 0,
							guard_icon: this.infos.is_guard == 1 ? this.infos.guard.icon : ''
						}
					}
				} else if (data.type == 101) {
					msg = {
						type: 101,
						color: {
							color: this.colorList[this.colorIndex].color,
							text: this.message,
							exp_icon: this.infos.exp_icon,
							is_guard: this.infos.is_guard,
							is_room: this.infos.id == this.roomid ? 1 : 0,
							guard_icon: this.infos.is_guard == 1 ? this.infos.guard.icon : ''
						}
					}
				} else if (data.type == 102) {
					msg = data
				} else if (data.type == 105) {
					msg = {
						type: 105,
						normal: {
							isXCBarrage: this.barrageIndex != null ? 1 : 0, //是否是气泡 barrageIndex
							xcBarrageUrl: this.barrageIndex != null ? this.barragelist[this.barrageIndex].gifticon :
								'', //气泡的图片路径
							xcBarrageType: this.barrageIndex != null ? this.barragelist[this.barrageIndex].list_order :
								'', //图片路径
							text: this.message,
							exp_icon: this.infos.exp_icon,
							is_guard: this.infos.is_guard,
							is_room: this.infos.id == this.roomid ? 1 : 0,
							guard_icon: this.infos.is_guard == 1 ? this.infos.guard.icon : ''
						}
					}
					if (this.barrageIndex != null) {

						this.getSendBarrage()
					}
					// this.showSvga()
					// setTimeout(res=>{
					// 	player.stopAnimation(true);
					// 	player.clear();
					// },3000)
				}
				// console.log(data, roomId);
				// return
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
				let promise = this.tim.sendMessage(message);
				promise.then(function(imResponse) {
					// 发送成功
					_this.message = ''
				}).catch(function(imError) {
					// 发送失败
					_this.$message.error(imError)
					console.warn('sendMessage error:', imError);
				});

			},
			getSendBarrage() {
				// 发送弹幕
				let data = {
					uid: this.roomid,
					info: this.message,
					gift_id: this.barragelist[this.barrageIndex].gift_id
				}
				sendBarrage(data).then(res => {

				}).catch(res => {})
			},

			// 选择聊天表情
			setEmotion(item) {
				this.iconIndex = null
				this.message = this.message + item
				// console.log(item);
			},
			 copyText (str) {
		        const qrUrlContent = document.getElementById("cp-input");
		        qrUrlContent.value = str;
		        qrUrlContent.select()
		        let range = document.createRange()
		        let selection = document.getSelection()
		        range.selectNode(qrUrlContent)
		        selection.addRange(range)
		        qrUrlContent.setSelectionRange(0, qrUrlContent.value.length);
		        console.log(str,"========");
		        let isSucess = document.execCommand('copy');
		        if (isSucess) {
		        	this.$alert('复制成功',"提示")
		        	this.tipsId = "";
		        } 
    		},
			// 转换文字1.查询切换[]有的内容，替换
			getText(str) {
				// let str = 'jfkdsj[咒骂]dsjfkljsa[憨笑]哈哈哈，[惊恐]'
				let exp = /\[(.*?)\]/g; //匹配[*] 大括号里面任意内容的正则
				let arr = str.match(exp); //字符串匹配出来的数组
				// console.log(arr);
				var reg = /(https?:\/\/[^\s]+)/g;
		        str = str.replace(reg, "<a target='_blank' href='$1'>$1</a>")
				if (!arr) return str;

				this.emotion.forEach((item1, index) => {
					arr.map(item => {
						// console.log(item1);
						if (item1.emojiName === item) {
							str = str.replace(item,
								`<img src='${item1.url}' style="width:20px;height:20px">`
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



			// 直播间公告 (无用)
			move() {
				// 获取文字text 的计算后宽度  （由于overflow的存在，直接获取不到，需要独立的node计算）
				return
				let width = this.$refs.node.getBoundingClientRect().width
				// this.$refs.copy.innerText = this.text // 文字副本填充
				let distance = 0 // 位移距离
				// 设置位移

				setInterval(() => {
					distance = distance - 1
					// 如果位移超过文字宽度，则回到起点
					if (-distance >= width) {
						distance = 16
					}
					this.$refs.box.style.transform = 'translateX(' + distance + 'px)'
				}, 40)
			},

			setIcon(num) {
				// console.log(num);
				// this.iconIndex = null
				if (this.iconIndex == null) {
					this.iconIndex = num
				} else if (this.iconIndex == num) {
					this.iconIndex = null
					// console.log('取反');
				} else {
					this.iconIndex = num
				}
				if (num == 5) { //取消选中的气泡
					this.barrageIndex = null

				}

				if (num == 2) {
					this.dialogVisible = true
				}
			},
			onhandleSendGift(data) {
        		this.$emit("onhandleSendGift", data);
				this.roomRanking();
			}
		}
	}
</script>

<style>
.chat-content,.footer{
  display:none;
}
	.message-text{
		position:relative;
			
	}
	.message-text a{
		text-decoration: underline;
		color:blue;
	}
	.txt-control{
				display: inline-block;
			    border-radius: 6px;
			    color: #fff;
			    padding: 2px 4px;
			    bottom: -40px;
			    transform: translateX(-50%);
			    font-size: 14px;
			    left: 50%;
			    width: 60px;
			    cursor:pointer;
			    text-align: center;
			    background: #000;
			    position: absolute;
			    z-index:999;
			    
			}
			.txt-control>i{
			    	    width: 0;
    height: 0;
    left: 22px;
    border-style: solid;
    border-color: transparent transparent #000 transparent;
    border-width: 0 10px 10px 10px;
    position: absolute;
    top: -10px;
			    }
	#cp-input{
		position:absolute;
		z-index:-1;
		opacity:0;
	}
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

	.gitf-list {
		width: 234px;
		position: absolute;
		top: 40px;
		left: 10px;
		z-index: 99;
	}

	.gitf-mask {

		width: 100%;
		font-size: 14px;
		margin-top: 10px;
		/* height: 40px; */
		border-radius: 100px 0 0 100px;
	}

	.gitf-big-mask {
		position: absolute;
		left: 0;
		right: 0;
		top: -60px;
		z-index: 99;
		max-height: 350px;
		overflow: hidden;
		/* background-color: rgba(0,0,0,0.1); */
	}


	.gitf-mask .avatar {
		width: 32px;
		height: 32px;
		margin: 4px;
		margin-right: 11px;
		border-radius: 50%;
	}

	.gitf-mask .gitf {
		position: absolute;
		right: 39px;
		/* top: -8px; */
		width: 61px;
		height: 61px;
		z-index: 999;
		/* background-color: white; */
	}

	.chatroom-grades {
		margin: 0;
	}

	.chatroom-grades .grades {
		background: url(../../assets/images/gui-bg.png)center top / 100% 100% no-repeat;
	}

	.imgNav {
		color: #f4c490;
		font-weight: bold;
	}

	.imgNav img {
		width: 35px;
		height: 35px;

		margin-right: 10px;
	}

	.dialog {
		border-radius: 10px;
	}

	.el-dialog--center {
		border-radius: 14px;
	}

	.nobility {
		background: url(../../assets/images/gui-down.png)center top / 100% 100% no-repeat;
	}

	.nobilityActive {
		/* background: url(../../assets/images/gui-down.png)center top / 100% 100% no-repeat; */
		background: url(../../assets/images/gui-up.png)center top / 100% 100% no-repeat;
	}

	.imgNavBox::after {
		content: '';
		flex: 1;
	}

	.message-img {
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	/* .gitf-big-mask canvas { */
	/* width: 981px !important;
		position: absolute;
		left: -150px;
		top: -359px; */

	/* } */
	.box {
		width: 80000%;
	}

	.box div {
		float: left;
	}

	.marquee {
		margin: 0 16px 0 0;
	}

	.node {
		position: absolute;
		z-index: -999;
		top: -999999px;
	}

	.rank-mark-s1 {
		background-image: url(../../assets/images/jin.png);
	}

	.rank-mark-s2 {
		background-image: url(../../assets/images/yin.png);
	}

	.rank-mark-s3 {
		background-image: url(../../assets/images/tong.png);
	}

	.message-content-wealth span {
		font-size: 12px !important;
	}

	.svgaAnimation-c {
		width: 100%;
		display: flex;
		max-width: 13vw;
		color: white;
		font-size: 12px;
		position: absolute;
		/* top: 98px; */
		left: 42px;
		z-index: 99;
	}

	.svgaAnimation-text {
		width: 20%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: rgb(254, 145, 0) !important;
	}

	.svgaAnimation-li {
		position: absolute;
		top: 99px;
		left: 45px;
		max-width: 13vw;
		color: white;
		z-index: 99;
		font-size: 12px;
	}

	.item {
		color: rgb(254, 145, 0);
		background-color: white;
	}

	.el-tooltip__popper.is-dark {
		background: #fff;
		color: #d8ad66;
		box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
	}

	.ping {
		font-size: 13px;
	}

	.ping .title {
		color: rgb(254, 145, 0);
		padding: 5px 0;
		text-align: center;
		/* background-color: ; */
	}

	.ping .li {
		font-size: 11px;
		padding-bottom: 5px;
	}

	/* .el-tooltip__popper[x-placement^="top"] .popper__arrow {
	    bottom: -6px;
	    border-top-color: #303133;
	    border-bottom-width: 0;
	} */
	.el-tooltip__popper[x-placement^="top"] .popper__arrow {
		border-top-color: #fff;
	}

	.el-tooltip__popper[x-placement^="top"] .popper__arrow:after {
		border-top-color: #fff;
	}

	.cloudBody .el-dialog__header {
		display: none !important;
	}

	.cloudBody .el-dialog__body {
		padding: 0 !important;
		;
	}

	.ChatFontStyleIcon {
		border-radius: 50%;
	}
</style>
