<!-- 直播 -->
<template>
	<div class="live-detail-container">
		<div class="live-wrapper live-layout-mian" id="live-layout-mian">
			<div class="live-layout-player">
				<div class="matchlive" id="matchlive">
					<!-- -------------------------------------------------header -->
					<liveHeader 
						v-if="(base.status_str && base.status_str !== '完场') || (base.status_name && base.status_name !== '完场')" 
						:detail="detail" 
						:query="query" 
						:base="base" 
						:basketball="basketball"
						:exponent="exponent"
					></liveHeader>
					<div class="matchlive-down">
						<div class="matchInfo">
							<a target="_blank" :href="'/persona?id=' + query.uid">
								<div class="teamlogo-wrapper "><img style="object-fit: inherit;" :src="userData.avatar||require('../../assets/images/userLogo.png')" width="120" height="120">
								</div>
							</a>
						<!-- {{userData.avatar}} -->
							<div class="row">
								<div class="left">
									<div class="title flex-start">
										<!-- 判断是否是房主，房主可以修改标题 infos.id == query.uid-->
										<div class="editable">{{userData.title}}</div>
										<img v-if="infos.id == query.uid"  @click="open" src="../../assets/images/edit.png" >
									</div>
									<div class="des"><span class="level-img" style="width: 58px;"><img
												style="width: 58px;"
												:src="userData.votestotal_icon"></span><a
											class="type-val hand"
											style="margin-right: 2px;">{{userData.user_nickname}}</a>
											<span class="type-name" style="margin-left: 20px;">房间号:</span><span
											class="type-val">{{userData.uid}}</span><img class="type-name-img"
											src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABOUExURUdwTPR5bu92ae91afyDee92aPJ4au92ae92ae92aPB3afB3au92aPB4a+52aO52aO51aP////719PCBdfGPhPWyq/fBu/vi3/rX0/vl4gdP830AAAAQdFJOUwAWxK0K5yp30PlpSZAg8ZrK+O7sAAAAt0lEQVQoz22R6xLEEAyFUYpWu0f1tu//oksblhn5YSZfJCcXxorNrG+T7vMZ/Yxxxdjj0qAfGIBuqSlyTB0BmwLD6+iqpEkclr+OKVzjtYGcPBBfKYAPl+mTkm3C36gN0dJQ2lANPzaA5C39PL/3eVze77B1xr55sh2q1rgy9wGi7qrwuwyyPCK50hYlFprQPd0UDlcfI/UZ8RmnMLIsi79bDCG9htcHdDQMrJPtSRYtlFVCZ132AwIGEKmCPNpsAAAAAElFTkSuQmCC"><span
											class="type-val"
											style="margin-right: 0px;">{{heat}}</span>
									<span class="type-name" style="margin-left: 20px;" v-if="infos.id == query.uid">在线人数:{{$store.state.onLine}}</span>		
									</div>
								</div>
								<div class="right right2">
									<div class="concern-box">
										<div class="concern" v-if="userData.is_attention == 0" @click="setAttention()">
											<img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAJKADAAQAAAABAAAAJAAAAAAqDuP8AAABEklEQVRYCe1Y0Q6DIAyUzZf9gv+f+CG6b9rLFjwMixx0Q4MZzpSExZ60Hke1zZrmbMNa22H2fnbV9wciI+Z7DKWETEkAsLjC/xnFaI0xrwhbbV5Wr5QXShuSMNlbQEsJCSHLICWU008VUoVyCuTuaw79nUJtyNjXpi2ffvL3sVrECcPmrm1S+xDAtRBh1Yb50zHgaUvrAsP1M7VH76Q83Fs2ny+kqX1kLl3mI6MEBugaLsJmxp9/XFI/ots32HHTFi0hk5Ka3pIk28kvNbCBFAQZxNlCiGIcLoeUEJ2PYKhCgigEqUIkh2CoQoIoBJ1OIal2SBip8M0oUsjXvnvwgHFrPQx897n0rctx/rDaZ1tLlAmHottsPHEcFAAAAABJRU5ErkJggg=="><span
												style="font-size: 12px; vertical-align: top;">关注
											</span>
										</div>
										<span class="cancelConcern" v-else>已关注</span>
										<span class="num"><img class="icon_man"
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAA5ZJREFUSA2VVU1sVFUUPue9Tv+clJQSY4zGEPkJMcwknYIVKXToVGAW8rNgIeiCdEeikrBwIaY7TRrtyoULEwgbQmIgxswUmOlAIKTYmQlU0ZCaRtsYK2JoKdJ2Zt49fld7k9u+9xqd5OWce853fu+5Z5j+w+9yvrxLkddHxNtI5Hli+p7IuS0R/ji9q/2P1VzwasrM+HiDMznziRC/JyQPWHhEmKeIVAyG2yF/4jCf2LcncSHMz6oBhvKjg0r4XWb6rNFpO51Mrl8wjoYKpQ1KyRlU1EmuszOdTIwYnU1DA2SvlV+TmrqJdgymezpO2UaGv3Vrqmnm6fQdfW5y18XtBAzGMYyPeuokMv+zyWn70KdbEuzY8eK8y+77OG5akEevB+FCA4jQq0QyEpSV7ajeabiBy1ckapstN3xoACaJ4hJ/NcAwmky+8gTYGQR5NggTGgDgX1gkHmRkyzKFuy8I0Vpc5ne23PChAZD9N/gSV6+XthhwEGVVPcbMgmm7HaQPDdDSGB3ABP1Wq6qzhcK9aJDx5eFSgoT6UcEX6VT7D0GY0DHV4KFcMSksV+Bkih066bbwtd6Ojtl8vvxSVeQoHt9HwjRNz6yJpTs3Pg4KUBckNDLFNAn+Ib71ouiSzJJkc6Nzi+K1GAwy/Llxvq5izitpaIsy+eLLAF+Hg5pDfAp9/haVVNCOFiaehe4rZqcf47xzwXt4Ua+Vlc71ObAC3YKKeAXsnVqkvmFPqis2AeynIsJXxsaa98bjfxln2Vz5PrF3jidnLkB/CIkoo9PUV4F2UhF1BrpmfD1LzsFi0jEttnMt259qP08O96GSN7PDpRNaZv98l5wZLh8n5X2J8g/v70lctMGr8Zlc8SxWy+GINGxIpbb+brC+Clipt5HpT//HuXbmupEBVB+t0sJB41xTXwDsnxiAJQMaGi4duVosrjFnm2YLo91662rZG92xH/Fu5tHImI3xB2BuRQXjBoQnOlh7zJ3mbFOM7jviyVtaBhsP/Z5AkFYb4wugLxm9XDYJOPvuynZieJjCDk/P+vnHlGkOmcWzudIxjcNLbl5mYRn/y8pmC7sW+2vOhvgCINnPsQI+gOsD/wDxstAA22Y5L9ILfO8SCo/SOW8DAi2x3J6rRebrq4scxx/J12jROftejAPczyFk3Mauu1vLonXubFdX7JHRaxoYwAByN+5sqizW9J73VWow8DCK/+zAIdCYvwHtClj1ByoRhAAAAABJRU5ErkJggg=="><span
												class="num_text">{{userData.attention}}</span></span>
									</div>
									<div class="middle-box">
										<div class="share-hover-text">
											<a class="share-txt" target="_blank" :href="system.CustomerService">
												<span class="report-icon"></span><span class="share-txt">举报/投诉</span>
											</a>
										</div>
										<el-popover
										    placement="bottom"
										    trigger="hover">
											<div class="play-header-live-share">
												<div class="big-title">呼唤小伙伴们前来围观主播吧</div>
												<ul class="share-box-ul flex">
													<li class="share-box-li">
														<!-- <div class="share-icon">
															<p class="item-p">分享到：</p>
															<img class="item-icon weibo" @click="$common.sinaWeiBo()" src="../../assets/images/weib.png" alt="">
															<img class="item-icon qq" @click="$common.shareQQ()" src="../../assets/images/qq.png" alt="">
															<img class="item-icon qzone" @click="$common.shareToQq()" src="../../assets/images/qzone.png" alt="">
														</div> -->
														<div class="url-content">
															<input type="text" class="ant-input" :value="shareUrl">
															<div class="btn copy-btn btnss" :data-clipboard-text="shareUrl" @click="copy(shareUrl)">复制链接</div>
														</div>
													</li>
													<!-- <li class="share-box-li">
														<div class="qrcode-img" id="H5QRCode">
															<img style="width: 92px;height: 92px;" :src="system.android_qr_code" >
														</div>
														<p class="qrcode-txt">微 信 扫 描 分 享</p>
													</li> -->
												</ul>
											</div>
										    <!-- <el-button >hover 激活</el-button> -->
											<div slot="reference" class="share-hover-text" style="margin: 0px 12px;">
												<span class="share-icon"></span>
												<span class="share-txt">分享</span>
											</div>
										  </el-popover>
										<el-popover
										    placement="bottom"
										    trigger="hover">
											<div class="player-header-phone-share">
												<div class="big-title">手机扫码，随心所欲畅享直播</div>
												<ul class="phone-box-ul">
													<li class="phone-box-li">
														<p class="phone-title">1.点击APP左上方<span style="color: red;">“扫一扫”</span></p><img class="phone-left-img"
															src="../../assets/images/phone-home.png">
														<p class="phone-left-foot">若未安装体育APP，可微信扫码或点击 “ 下载APP ”</p>
													</li>
													<li class="phone-box-li phone-box-li-right">
														<p>2.扫描本房间二维码</p>
														<div class="qrcode-bg">
															<div id="appQRCode" >
																<img style="width: 92px;height: 92px;" :src="system.android_qr_code" >
															</div>
														</div>
														<div class="appdown-btn"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA3ZJREFUWAnVl81LFVEYh7smpZGELQxr0UgbQQgpWkSFkImtMiJqVwYt+hNcmS6CoIXLCKTMoLUohOTCXAa5qUWf3LxBRdkiqAwNvT2/uee9zsydmTtmBv3g8Zzzfp0zZ87cGXObMqpYLO4ntAeOwm7HNtqP8AFewAQ8zOVyP2nXLyatgV54A1n1g8Bb0LyuFVDgGDwD0zyd23AWDkIz7IBWOA79MAsmLWQAate8EJKuwC+Q3oF2YXOWQsS1wTiYpug0Zsn1Ywi+YZm0Q1CXOTkQSF4nfAbpFVS/JQTpyqUluBSo90ddanjwFKTHkHwxOHXPbdvXPbmtmJpNUABp1OyhFodOux24oZAzYUD8JDyHwwkhZTMx7aBDKXWUHdbBqEMm6cAlb5Ml0BL3WgnoRMCc2CVu0I/mVlQE4bDnvLfCmWAgZ60LaCDnk1tEl5XV1usXbh98gXvm+Nstv47fqDns6p6x+jV0TrvBBEHL5tigdszVPcWF59TXAo444wPXbmTzhOLzoHdJiybSAvaog/KlZuP+ssNFqr91M/jzagH2C6W32r+QzePPqwXolSotlJrwX+7VAHhha/KIWB3sa6BtjpPNU5qXwDxIrdFobJpcmgMv6Gdc8Rhi0+R3QdKP1JZgjvrYpkHq1lg7oI8JKW7FI9gLsBcekeTRxgqfat2BC7AC17nnS7RR2TyleUkcBqk/Gqkxdg/mFIDUes5e3gFswStfZnxRMVFh3wXyL8J230+nB6TZaIKN8VUsApstoJv+CEgq3mt50RbfZQWhybKPQT0syIrayo5IB190EfpCkux1mzq5yhE742fw2g+Vx6hvOGk85IgM8AcX4Se4P1kmP+liv9LuDJXGoO87e112hpyRAXHRRWSZfCt59rrvi5QsDQkYAEmfUV5skDPKD3NQdXKlEGePpnLqY2vjqIUpkHRfm2IDnRG/FnE+LUY+Yq6CpHN2IDWegEbQB6RUgPbUhBQnudp2u/IV+udSwlddBOo86ANS0rkYhIbViOo94nXg7OnQlWeb3EqTUAejYNKXjH7fD4H/HrdYa7HrR0bP+QyYdM/Tt90KxLUkd4DtBl1fOqSyjcF9mIaXoANp0qPWB/EHLm6yNBuFuuAmvIckLeLQl7L+twg/5ynFY7czKZ7Cim8BfUzopaIr1Ptd5Hn5fKf9v/Qb3at6cAh/O6kAAAAASUVORK5CYII="
																width="15">
																<router-link to="/download" tag="a" target="_blank">
																	<span class="appdown-btn-txt">下载APP</span>
																</router-link>
															</div>
													</li>
												</ul>
											</div>
											<div slot="reference" class="share-hover-phone">
												<span class="phone-icon"></span>
												<span class="share-txt">手机看</span>
											</div>
										</el-popover>
									</div>
								</div>
							</div>
						</div>
						<!-- ----------------------直播--------------------------- -->
						<div id="" style="position: relative;" class="video_count">
							<!-- <liveTv :islive="detail.islive" path="live" :reserve="reserve" :info="detail"></liveTv> -->
							<TcVideoPlayer :islive="detail.islive" path="live" :reserve="reserve" :info="detail"></TcVideoPlayer>
							<div class="liveTv-mask" v-if="isAdvertising">
								<advertising @closeAdj="closeAdj" :query="query" ref="advertising"></advertising>
							</div>
							<div class="counttDownShow" v-if="counttDown">
								<div class="center_date">
									<div class="title_date">开赛倒计时</div>
									<div class="date_out"><span class="d_date">{{counttDownDay[0]}}</span ><span class="h_date">{{counttDownDay[1]}}</span><span class="m_date">{{counttDownDay[2]}}</span><span class="s_date">{{counttDownDay[3]}}</span></div>
									<div class="date_tile"><span class="d_date_d">天</span ><span class="h_date_h">小时</span><span class="m_date_m">分钟</span><span class="s_date_s">秒</span></div>
									<!-- <div class="date_down">{{counttDownDay}}</div> -->
								</div>
								<div class="concern_box_shou">
									<div class="concern_shou" v-if="userData.is_attention == 0" @click="setAttention()">
										<span class="cancelConcern_date_n" title="关注"></span>
									</div>
									<span class="cancelConcern_date_y" v-else title="取消关注"></span>
									<div>
										<span  @click="copy(shareUrl)" class="txt_control" title="分享"></span>
									</div>
								</div>
							</div>
						</div>

						<div class="live-player-footer-wrap">
							<div class="live-player-footer-left-box">
								<div class="balance">
									<div class="left">
										<img class="diamond-icon" src="../../assets/images/daily/diamond.png"/>
										<span>{{is_login ? parseInt(infos.balances) : 0}}</span>
										<br/>
										我的钻石
									</div>
									<div class="right" @click="showDiamondDirections = true">
										如何获得钻石?
									</div>
								</div>
							</div>
							<div class="live-player-footer-right-box">
								<div class="live-player-footer-top-box">
									<div class="left">
										<ul class="activity-ul">
											<!-- <li><img src="/_next/static/images/web-icon-rukou@2x-9c41ca45cdc88917d069f6ae94889a2b.png"> -->
											<!-- <li><img style="border-radius: 50%;" :src="infos.avatar || require('../../assets/images/userLogo.png')"> -->
											<!-- </li> -->
											<!-- <li @click="setisAdvertising(1)"><img src="https://sta-prod-pic.zkreen.com/avatar/p0020200927004253037974.png" alt="分享领豪礼"></li>
											<li @click="setisAdvertising(2)"><img src="https://sta-prod-pic.zkreen.com/avatar/p0020200922171839086844.png" alt="注册送豪礼"></li> -->
										</ul>
									</div>
									<div class="right">
										<ul class="gift-box-ul" style="justify-content: flex-start;">
											<li class="arrow arrow-left-active" @click="num==0?'':num ++"></li>
											<li class="" style="overflow: hidden;width: 450px;">
												<ul class="gift-box-ul" style="float: left;"
													:style="{'transform': 'translateX('+num * 450 + 'px'+')','transition': 'all .3s ease-out .1s',}">
													<li class="gift-box-item" @mouseover="mouseover(item,index)"
														v-for="(item,index) in giftList" ref="gifli" :key="index">
														<div class="gift-icon">
															<img :src="item.gifticon" width="80" height="80">
														</div>
													</li>

												</ul>
											</li>
											<li class="arrow arrow-right-active" @click="giftList.length / (Math.abs(num)+1) < 10?'':num --" ></li>
											<div class="ant-popover git-popover-box ant-popover-placement-top ant-popover-hidden"
												:style="{left:offsetLeft-100+'px'}"
												style="left: 711px; top: -81px; transform-origin: 50% 98px; position: absolute;background-color: white;z-index: 999;padding: 10px;">
												<div class="ant-popover-content">
													<div class="ant-popover-arrow"><span
															class="ant-popover-arrow-content"></span></div>
													<div class="ant-popover-inner" role="tooltip">
														<div class="ant-popover-inner-content">
															<div>
																<div class="layout-gift-detail">
																	<!-- <div class="anim-pic" id="demoCanvas">
																	</div> -->
																	<img class="anim-pic" :src="gifItem.gifticon">
																	<div class="gift-text">
																		<div class="title">{{gifItem.giftname}}</div>
																		<div class="num-ponit">
																			{{gifItem.needcoin}}
																			<img class="diamond-icon" src="../../assets/images/daily/diamond.png"/>
																		</div>
																		<div class="gift-desc">{{gifItem.info}}</div>
																	</div><button class="give-btn"
																		@click="handselGift(gifItem,0)">赠送</button>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</ul>
										<!-- ant-popover-hidden -->

									</div>
								</div>
								<div class="live-player-footer-bottom-box">
									<div class="left">
										<div class="live-reserve-box" v-if="JSON.stringify(reserve) !== '{}'">
											<div class="live-reserve-btn">下一场</div>
											<div class="live-reserve-name"><span>{{reserve.match_time}}</span><span
													class="live-reserve-line"></span><span>{{reserve.name}}</span></div>
											<div class="live-reserve-team"><span>{{reserve.home_name}} </span><span
													class="live-reserve-vs"></span><span> {{reserve.away_name}}</span></div>
										</div>
									</div>
									<div class="right" style="position: relative;">
										<ul class="chongzhi-beibao-ul">
											<!-- <li class="text-li"><img class="a-icon"
													src="../../assets/images/icon.png"
													alt="">
													<span class="text1">我的钻石:</span><span class="number">{{infos.balance}}</span>
											</li> -->
											
											<!-- <li class="btn-li" @click="navigate()">
													<span class="btn btn1">充值</span>
											</li> -->
											<li class="btn-li beibao">
												<div class="btn btn2">背包</div>
									<div class="ant-popover lv-backpack-popover ant-popover-placement-top"
										style="left: 45px; bottom: 30px; transform-origin: 50% 351px;position: absolute;z-index: 9;">
										<div class="ant-popover-content">
											<div class="ant-popover-arrow"><span class="ant-popover-arrow-content"></span>
											</div>
											<div class="ant-popover-inner" role="tooltip">
												<div class="ant-popover-inner-content">
													
													<div class="lvBackpack_box" v-if="userGift.length == 0">
														<div class="enpty_box"><div style="text-align: center;">
														<img src="../../assets/images/icon-kong.png"><p>背包里什么都没有~</p></div></div><div class="lvBackpack_box_foot">
														<div class="page"></div></div></div>
													<div class="lvBackpack_box" v-else>
														<div>
															<div>
																<ul class="lvBackpack_box_content_ul">
																	<li v-for="(item,index) in userGift" :key="index" @click="lvBackpackIndex = index" :class="lvBackpackIndex == index?'lvBackpack_active':''">
																		<span>
																			<div class="line1">
																				<div class="img_box_flaunt">
																					<div class="img_box1"><img
																							:src="item.gifticon">
																					</div>
																					<!-- <div class="img_box1"><img
																							src="https://sta-prod-pic.hzmgrn.com/avatar/p0020200828050329053509.png">
																					</div>
																					<div class="img_box1"><img
																							src="https://sta-prod-pic.hzmgrn.com/avatar/p0020200828050335019252.png">
																					</div> -->
																				</div>
																			</div>
																			<div class="line2"><span
																					class="name">{{item.giftname}}</span></div>
																			<div class="line3"><span v-if="item.num!=0">剩余 {{item.num}}个</span></div>
																		</span>
																	</li>
																</ul>
															</div>
														</div>
														<div class="lvBackpack_box_foot">
															<div class="page"></div>
															<div v-if="userGift[lvBackpackIndex].mark == 0" @click="handselGift(userGift[lvBackpackIndex],1)"><div class="btn">赠送</div></div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<!-- <div class="pop-pox"></div> -->
							<!-- <div class="ip-logo-left">78e577bd</div> -->
							<!-- <div class="ip-logo-right">78e577bd</div> -->
						</div>
					</div>

					<img class="red-envelope-icon" src="../../assets/images/daily/red-envelope.png" @click="showRedEnvelopeDialog = true"/>

					<div id="demoCanvas"></div>
				</div>
				<chatRoom 
					v-if="qsVid" 
					:qsVid="qsVid" 
					ref="chatRoom" 
					:userData="userData" 
					:roomid="query.uid"
					:giftList="giftList"
					@onhandleSendGift="onhandleSendGift"
				></chatRoom>
			</div>
			<!-- ----------------------------------直接隐藏-------------------------- -->
			<div class="layout-live-detail-left">
				<!-- <div class="anchor-detail-live-recommend">
					<div class="header">
						<div class="subTitle"><img
								src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAwFBMVEUAAADawqm7k1HXvZ7jxqrbwqm/mVy6lFG8lFPEoGrawqnBmlTVupnawqnTppy7k1HGo27IpXS6k1C6k1Hawqrawam7klG/m1K9llbbwqq7k1HawqrMwo+7k1G7k1G6k1HbwqrZwqjZwKjdxqzFm1zBnGS7k1C7klDMq37Nr4XTtpPawKS8lVO7k1C7k1G7k1C7k1O/ml26k1DQs427klHIp3nDoGrTuJTBnGW7lFHVuZjIp3i8lVK+klG+llW6klAYlJGdAAAAP3RSTlMAu/3BEm7zf/zmpxjEkgbz4t7IvbOgZRz4s3JgBfnwtrGNNSEP7e3a1tLIvpXm0XtH6uLMwLqunYuKbWJULye83VvpAAABsElEQVRIx9WV2XKCMBSGzwGhKKKCgoiI+77U7nvz/m/Vg0mRKdJJbjrT/8LhJN9njBc/kI9t56d4Yoz9Tsd/MiYxXEykaVE2VIwRptFNZuojo3JJWDA2+OSPjX4PeaqMsRVir98oCgfaG/Kvd1Bko9HiGilO8ZB3RjnSw7SG3zFpyeSPtWnBuKfdZQyVM79mlDsURuGMj/T8qOFk/DakhWo2OoV77Gg/ecUsLs1W/Tz3fwp2QkQr269bNLp4Tq/woyIitA3m/tJwi7kYJyrwmkwilrnCUQxgt5l05voEgHgFw4CAKeUBPPocdiGLj2XR54TeQHrfHA8dLDfSmwOjgJyAKVsQfFVhrCoYqsKbGVbrKsKSZo0UWYFm0+KKtOBuXa7ICo+IulDkhCsHSWlppLR0KYFKIFPWOb5WJvCa4UqY46elAhWZEEQniSIrE3hVni5ubjjNq/IXAezdgApgJXBexqWCwPfPvO7Hou7LhdkL4YuoUHNlwiEh/HoGICfc0pxwXE44LvdXhMsKIv9M4EUmlS6hTVGVUvyQUE+1jAPFum+D2gulbau8sppeAH+RL3+JuP908eflAAAAAElFTkSuQmCC">
							<div>视频推荐</div>
							<div class="art-con">LIVE</div>
						</div>
					</div>
					<div>
						<div style="" class="anchor-live-detail">
							<div class="anchor-live-recommand-item-wrap">
								<div class="anchor-live-recommand-item"><a class="anchor-live-recommand-item-inter"
										target="_blank" href="/anchor/live?anchorId=101266">
										<div class="img-wrap"><img class="angle-icon"
												src="/_next/static/images/img_jiaobiao2-e72a914e5a14c64e7e9034a63543d094.png"
												alt="">
											<div class="lazyload-wrapper "><img
													src="http://dqiu-live.oss-accelerate.aliyuncs.com/anchor/1124219.jpg?x-image-process=image/format,webp">
											</div><span class="watch-num"><span>篮球</span></span>
										</div>
									</a></div>
								<div class="anchor-live-recommand-item-footer">
									<div class="footer-man-img-box">
										<div class="lazyload-wrapper "><img class="header-sub"
												src="https://sta-prod-pic.zkreen.com/avatar/p0020201027075427089995.jpeg?x-image-process=image/format,webp/resize,m_fill,w_80,h_80"
												width="80" height="80"></div><img class="live-icon"
											src="data:image/png;base64,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">
									</div>
									<div class="footer-title-box">
										<p class="title-content">勇迷回家！！ 开拓者-勇士</p>
										<p class="nick-name-content">李胖子</p>
									</div>
									<div class="footer-hot-box"><img
											src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAAEXElEQVRYCa1XX2xTVRj/zr3tKCCsg21hcU50hoR/D84yjSaEgTywCCaGYELiBsnUwIMaEhMfFBPjg+/qQ+l07UYIWYwBEnwgaytiNDFL8GH+CTEGqRu4sSmdlNL2ns/vdLunp/fc9t4Nb9Kc7/t9f87v/PvOKcAyvuiZdHNsKP3MMkK1EENDPIChoXQICtaFBoNnPFx9mZdEABFZAaw4ILT39++Z9NWDh9OSCJyKp96nfC8zxq565PVt9k0glhg7yBicLGdm8IfvHjwcfREYHE5vQ4S4WAKRDwH/8cjr2+xJgDZd2OL8HBFYLbMia5PyAwqeBIqMJwCxU+2HIT6i6g8i1yVwKpE6QdN+QOuAQYeGLROoSSA6kuxCjh+55aWt8ER0dLzRzaZisUTqxXLdUEGH7EpABDELT9N2Czr8F1UMstz8C+62Cso5niwY1gcVRJdcCRQY/5A23WbdvYIgWG9VNF36bDgdoQF0MYQTg4lkt+6xgGgEoqcvbyfTm7UCJI4QiSbS/VJXhNFRNEsWjwqIBmJyhM+j4+Ous6kRYMXSpxQVUPLVFpF/MhhP7lQdREd/51IxMXobp428FSayx2xdbcuFxQZiI2N7eQku2bq/lhUZYAwMNsY4PEpF6jAC7NBiGUzDtnD765FIUbVVjRQtNkDMVbsPGYMUcRw4Hq8bidBq/JzdTwm/VJPKJaBpMijBXtX4f8t0KvY5c0oC8TPfdNLaNzkdlqt3tK+HA71PVYcjPl0NAMglKPHiBqexnk43I4RCDZDPF4l3ZfIDAQO2b+mAyJOPA13bEFoRhPz9hWWnkIedOSUB4MY6AO60a7pIuKOrEx7b2FpOzjmH27PzMD2ThUDQhI0dLWXcDmxevwb+nJorqwhsjY3brSRAO2DGq//Gtatg/74uWLVyhR0PhmFAa0tj+SfBGgKdlhmnSe6BYMmYchpVXUz57p1bqzpX7bXke/mCNNFrQutDEjhyZNcNBuwv6e0QWprXgvgt5ROdz879K0OoLP8glUVBEqANw8GAC04HW1/X9JAt+m5/+bX63coCcM4ZLAkIAzNwxOlg63fu5GzRVzs/fw9+nLiu+mb45vDXKiDkKgKvvvL8FWBw0ekk9OnbWbh7N+9m0rBc7j5cvHQVSiXlVBnme84yLAKrCJQBI/g2tdpwLYtD8vJPII5dvW/y5hyc/2ocsjQD8mPw/Wt9u1xnl/a2/sWGUy/Ra+gLKjCavSm8Gp7t3gRtG5roCC6YBbnM5Cxc++0mXL+hnbRMA5jdR4/23NJ7omV3AwUWjSeP0bn9WNznbj6maYCoC4Viqbw0SjFU3TOmafYO9PVMqKAq1yQgnAbjqT0W4Fmqtc1qkB+ZjvSVkBk62Nf33HQ9/7oERKD4X1AE/g4txhtEZGW9ZIu23w3G3h3o332WjnblkqgR6EnAjhNECib2Mo7iTt9Cz4Y2enyIykQjZFNUKb+jR8n5cKjn20OHmGXHebX/ATCvePe0TxYAAAAAAElFTkSuQmCC"
											class="hot-icon"><span class="hot-num">3.5万</span></div>
								</div>
							</div>
						</div>
					</div>
				</div> -->
				<div class="anchor-news-wrap">
					<div class="tab">
						<div class="tab-item" v-for="(item,index) in tabtitle" @click="tabindex = index" :key="index"
							:class="index == tabindex?'cur':''">{{item}}</div>
					</div>
					<div
						style="border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; overflow: hidden; background: rgb(255, 255, 255);">
						<div class="tab-content">
							<div class="tab-content-item padding21px">
								<!-- 直播回放 -->
								<div class="live_play_back_wraps" v-if="tabindex == 2">
									<el-empty :image-size="300" :image="require('../../assets/images/qsy.png')"></el-empty>
									<div class="live_play_back_list" style="display: none;">
										<div class="time_title">2021-10-05</div>
										<div class="pay_back_list_wrap">
											<div><a class="live_play_back_itme_wraps" target="_blank"
													href="/anchor/live?anchorId=102919&amp;recordId=1124319&amp;playBack=true">
													<div class="img-wrap"><img class="angle-icon"
															src="/_next/static/images/img_jiaobiao2-e72a914e5a14c64e7e9034a63543d094.png"
															alt="">
														<div class="title-line">
															<div class="con ellipsis">NBA 快船-掘金</div>
														</div>
														<div class="play-total-time">02:16:24</div>
														<div class="lazyload-wrapper "><img
																src="http://live-prod.ssjnrt.com//snapshot/push.6qz15s.com/live/1124319/20211005050331.jpg?x-image-process=image/format,webp">
														</div>
														<div class="mask"><img
																src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHYAAAB4CAMAAAAQc/ZTAAAApVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+4/eNVAAAANnRSTlMA8/j8CQNFw7egjD0mEu7kmTYyGermvqZp3s6tSyIdDoN2bmZXKwbb0cmqYVIWDNiye1sukofJUFtWAAADkUlEQVRo3tXah1LiUACF4ZObRgihhN6RoiBV0PP+j7bjumNGVLgtmdnvBf6B5OaWBP+LZrydvUbPpXATlobR61svGPvI1WQbrQW/E8fhfIVcTJf1Pm9pdxdN2OWPuoL3uaWzB2tW5TZlOVEMK9Ih1YQBjMUlqhvsYKRSop51DG3eTFBbtIeeUZ8mqj0f6g5dmgonUHU50lxrBDULQSvKPuQ9dmlLuIesaYf2PI0hZz+gTe0LZIz7tMuJcV+lTdtEgHuafdrnpLhtumYeWhXc4nWYj34TNzwzL2sPv5ozPxF+kwrm6IyfTfvMk1MxuLDWL++SeXvDd4ca8yYq+KbM/HVw7eKyAEtcCVmE9gFfjFiMF4Mfa6DlAZmYRZkDmRKLUnvEpwaLs8CniMUZZJO7wwKt8M+ZRSqr31Cth8auLmik5uOvpitdXQFAs+7SRKC6lNnhQ+WZBur4a0hZ2ZhLO9TWxzu/SkkOkAkG1DUGgJRK2czyiXq2APCgm4W/qFFHV234OLjmPVSprgYAbYMskJQFle2BKQ2ymsM4BhqmWaAyVJ+FzuZZoNFRfSzPDLK6w/gEPBtkdYfxEejYysLvtSmnCmyMsxnvpUoZAjhayGaSruScUrOSzZwoIUHVcrYhNwe5lrOPcss4x3K2SQkVtC1nHyihiSe72UBQwgEDm9lJRBkuEGpmTeZeBzgZZ7NHlMLy4tU0mz2QpYVATzNrsoqsA4Fm1mTN/ABMjLONDhWNADiaWYP9UAXAwCCrt/sTPoCyfjZ5E9pngCPlbLYlMDgTm7rSWaMNUCYGoLCaEsjsjtTl+Hj3pnIHfgg21FdSPQw7+XiXlmiihw9PlNVNgFWXRkSCDy+UJgZtGhrinzGLtCvwNDlTzY57tizOKz491lgUd2L6TtH8DaPXYjHcytWiuhhdfDGtsgjuBV8tWIQ6rm2Yv1aCa6nL3G3x3SvzFuIH0xrzJVb4SewyVwuDHbGtIVvUq76nA36T1JgXccHvUof5cJcaRw/merht5zIHM9zTo3113De3X/Uh4SyK/IczgUOL5pDVaNEWsYS8SUg7+g2o8Mu0YZhA0cj8jxZzqJucaGaTGnwFbvINePHfvEd7GBhHLjWUGjA0Uf/OYpjCgma5RXkiWsGSx91QUEpne4BNSa9zr+xuXiawzwtm4a/pdXk0RW4OjfPseS2YEcdTeRsnKIK3H1/iIE7Hew//kz/wxRSXLXEZwAAAAABJRU5ErkJggg==">
														</div>
													</div>
													<div class="other_info"><span class="time">2021-10-05
															10:47:30</span><img
															src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAAA+NJREFUWAntmE1IlEEcxl3XPrQOW+FBjx4q3INFHmxDwo+kKAjCKPqyKLtIiiF06dgtslS8JGkFgVQEFVKYH5CweYnaw0YlBF70sPRxKA3D3X7/7Z1ldpxd10VC4R14/c8887zPPO9/5p131pwct7gZcDPgZsDNgJuBJWTAswRuSmowGMyfmZmpiMViOzweTyFEuaREwCJg7wsKCsYDgcDsPzj7v1kbDofDa6empuox08jwezC2ZhEbc3CD8HqKi4sf+/3+uUX41u4lG2ZA7/DwcBPxKooqk1bxNKBk/VpNTU03cT4Nb0HXkgyPjIzsikajdzBbtkApCwCzodzc3PPV1dVvM709Y8NDQ0PHEe3D7HqbOIPTFftI/Ez/V4ezBWwr2HaidSz6fsM9V1tb22/TNTGriEliCbSR2esmLm0GfMPVk5+f/5SX6puNw0u5eXZ29jCmG7l22zhotGH6hq1PxxY1TGZPccN9M0MM8ImrlXX4QhdcrM7DH0DrJtc2nYtWjPZpTD/QcbOe1vDo6GjF/Pz8a8STdgDEX3m93iNVVVU/TUFpj42NbZJYWVn5XaJZ0N2I7hN09xl9c3l5eXvRHTfwRDOlYdm2pqen3yFammBTwWx/UVFRg7ktwfOQvUtQWqiXyD1wvxA6mIUuJ4MCx4ujLzN3TGES4X1Af6eprzi5qmJGzF6xmO1l8JOmmJhl6TwndnDFzYqe1AXjQZ4Rk5IjGmidwGCvPja8Uhlbx/S61bBMGaTLOhHhMMugiRjVcak7mT1o4qqNiUMOR0HxKFqOZjipg7FDodAGA4s3rYZZXw0M4tNvQPwia0u2IFtpsYEGZuWIpmjrXBk7Eomc1TFVtxrmhqOK4MRBpi9oYPGmvGDwE8vAxhFMOOplNDmO9qCOWzzEu62GeeKk9aYLmXWmNGOueW82bathhB4aYnWswYCBxZvyseD5ZDdIW4STaptztOt0AfiP9LaqWw0XFhbe5YYfiiSRKbrNy2j9LNPdqXNT1DtsuGiKtt4nY4sHHVN1q+GysrJfENoVSSKifl7GbuKCJcAaFMMDOt+oD8DpMjDR9DiafqOv3fFgwOzTCxAHSPfh8Pl8Z8rLy//o98rgTG0zWDP1EumTZUDolAeiLp/eRHH078GVQ1WiwEv74UhpWBSYrqw+zXLYkftTHYZkn1/2T7MMKCXV4YcuOUq2clh5GSdm+Ae9/VBvkdnlP/woD0z16jleKtNkRtZaH5mx7hSyRikr4wCvTK+qn0jKNFlcPT9ClWmJExMT6yYnJ+upXuBauT/zxaxZ/uc/Usyx3babATcDbgbcDLgZSJuBvy98Gohc5JbZAAAAAElFTkSuQmCC"
															alt="" class="num_icon"><span class="num">1458</span></div>
												</a></div>
											<div><a class="live_play_back_itme_wraps" target="_blank"
													href="/anchor/live?anchorId=102919&amp;recordId=1124047&amp;playBack=true">
													<div class="img-wrap"><img class="angle-icon"
															src="/_next/static/images/img_jiaobiao2-e72a914e5a14c64e7e9034a63543d094.png"
															alt="">
														<div class="title-line">
															<div class="con ellipsis">NBA 马刺 -爵士</div>
														</div>
														<div class="play-total-time">02:24:34</div>
														<div class="lazyload-wrapper "><img
																src="http://live-prod.ssjnrt.com//snapshot/push.6qz15s.com/live/1124047/20211005024539.jpg?x-image-process=image/format,webp">
														</div>
														<div class="mask"><img
																src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHYAAAB4CAMAAAAQc/ZTAAAApVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+4/eNVAAAANnRSTlMA8/j8CQNFw7egjD0mEu7kmTYyGermvqZp3s6tSyIdDoN2bmZXKwbb0cmqYVIWDNiye1sukofJUFtWAAADkUlEQVRo3tXah1LiUACF4ZObRgihhN6RoiBV0PP+j7bjumNGVLgtmdnvBf6B5OaWBP+LZrydvUbPpXATlobR61svGPvI1WQbrQW/E8fhfIVcTJf1Pm9pdxdN2OWPuoL3uaWzB2tW5TZlOVEMK9Ih1YQBjMUlqhvsYKRSop51DG3eTFBbtIeeUZ8mqj0f6g5dmgonUHU50lxrBDULQSvKPuQ9dmlLuIesaYf2PI0hZz+gTe0LZIz7tMuJcV+lTdtEgHuafdrnpLhtumYeWhXc4nWYj34TNzwzL2sPv5ozPxF+kwrm6IyfTfvMk1MxuLDWL++SeXvDd4ca8yYq+KbM/HVw7eKyAEtcCVmE9gFfjFiMF4Mfa6DlAZmYRZkDmRKLUnvEpwaLs8CniMUZZJO7wwKt8M+ZRSqr31Cth8auLmik5uOvpitdXQFAs+7SRKC6lNnhQ+WZBur4a0hZ2ZhLO9TWxzu/SkkOkAkG1DUGgJRK2czyiXq2APCgm4W/qFFHV234OLjmPVSprgYAbYMskJQFle2BKQ2ymsM4BhqmWaAyVJ+FzuZZoNFRfSzPDLK6w/gEPBtkdYfxEejYysLvtSmnCmyMsxnvpUoZAjhayGaSruScUrOSzZwoIUHVcrYhNwe5lrOPcss4x3K2SQkVtC1nHyihiSe72UBQwgEDm9lJRBkuEGpmTeZeBzgZZ7NHlMLy4tU0mz2QpYVATzNrsoqsA4Fm1mTN/ABMjLONDhWNADiaWYP9UAXAwCCrt/sTPoCyfjZ5E9pngCPlbLYlMDgTm7rSWaMNUCYGoLCaEsjsjtTl+Hj3pnIHfgg21FdSPQw7+XiXlmiihw9PlNVNgFWXRkSCDy+UJgZtGhrinzGLtCvwNDlTzY57tizOKz491lgUd2L6TtH8DaPXYjHcytWiuhhdfDGtsgjuBV8tWIQ6rm2Yv1aCa6nL3G3x3SvzFuIH0xrzJVb4SewyVwuDHbGtIVvUq76nA36T1JgXccHvUof5cJcaRw/merht5zIHM9zTo3113De3X/Uh4SyK/IczgUOL5pDVaNEWsYS8SUg7+g2o8Mu0YZhA0cj8jxZzqJucaGaTGnwFbvINePHfvEd7GBhHLjWUGjA0Uf/OYpjCgma5RXkiWsGSx91QUEpne4BNSa9zr+xuXiawzwtm4a/pdXk0RW4OjfPseS2YEcdTeRsnKIK3H1/iIE7Hew//kz/wxRSXLXEZwAAAAABJRU5ErkJggg==">
														</div>
													</div>
													<div class="other_info"><span class="time">2021-10-05
															08:21:10</span><img
															src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAAA+NJREFUWAntmE1IlEEcxl3XPrQOW+FBjx4q3INFHmxDwo+kKAjCKPqyKLtIiiF06dgtslS8JGkFgVQEFVKYH5CweYnaw0YlBF70sPRxKA3D3X7/7Z1ldpxd10VC4R14/c8887zPPO9/5p131pwct7gZcDPgZsDNgJuBJWTAswRuSmowGMyfmZmpiMViOzweTyFEuaREwCJg7wsKCsYDgcDsPzj7v1kbDofDa6empuox08jwezC2ZhEbc3CD8HqKi4sf+/3+uUX41u4lG2ZA7/DwcBPxKooqk1bxNKBk/VpNTU03cT4Nb0HXkgyPjIzsikajdzBbtkApCwCzodzc3PPV1dVvM709Y8NDQ0PHEe3D7HqbOIPTFftI/Ez/V4ezBWwr2HaidSz6fsM9V1tb22/TNTGriEliCbSR2esmLm0GfMPVk5+f/5SX6puNw0u5eXZ29jCmG7l22zhotGH6hq1PxxY1TGZPccN9M0MM8ImrlXX4QhdcrM7DH0DrJtc2nYtWjPZpTD/QcbOe1vDo6GjF/Pz8a8STdgDEX3m93iNVVVU/TUFpj42NbZJYWVn5XaJZ0N2I7hN09xl9c3l5eXvRHTfwRDOlYdm2pqen3yFammBTwWx/UVFRg7ktwfOQvUtQWqiXyD1wvxA6mIUuJ4MCx4ujLzN3TGES4X1Af6eprzi5qmJGzF6xmO1l8JOmmJhl6TwndnDFzYqe1AXjQZ4Rk5IjGmidwGCvPja8Uhlbx/S61bBMGaTLOhHhMMugiRjVcak7mT1o4qqNiUMOR0HxKFqOZjipg7FDodAGA4s3rYZZXw0M4tNvQPwia0u2IFtpsYEGZuWIpmjrXBk7Eomc1TFVtxrmhqOK4MRBpi9oYPGmvGDwE8vAxhFMOOplNDmO9qCOWzzEu62GeeKk9aYLmXWmNGOueW82bathhB4aYnWswYCBxZvyseD5ZDdIW4STaptztOt0AfiP9LaqWw0XFhbe5YYfiiSRKbrNy2j9LNPdqXNT1DtsuGiKtt4nY4sHHVN1q+GysrJfENoVSSKifl7GbuKCJcAaFMMDOt+oD8DpMjDR9DiafqOv3fFgwOzTCxAHSPfh8Pl8Z8rLy//o98rgTG0zWDP1EumTZUDolAeiLp/eRHH078GVQ1WiwEv74UhpWBSYrqw+zXLYkftTHYZkn1/2T7MMKCXV4YcuOUq2clh5GSdm+Ae9/VBvkdnlP/woD0z16jleKtNkRtZaH5mx7hSyRikr4wCvTK+qn0jKNFlcPT9ClWmJExMT6yYnJ+upXuBauT/zxaxZ/uc/Usyx3babATcDbgbcDLgZSJuBvy98Gohc5JbZAAAAAElFTkSuQmCC"
															alt="" class="num_icon"><span class="num">7809</span></div>
												</a></div>
										</div>
									</div>
								</div>
								<!-- 直播预告 -->
								<div class="live-notice-container" v-if="tabindex == 1">
									<div class="live-notice-wrap">
										<div class="live-notice" v-for="(item,index) in reserveLiveList" :key="index">
											<div class="live-notice-title"><span class="line"></span><span
													class="title">{{item.name}}</span></div>
											<ul class="live-notice-main">
												<li class="item" v-for="(item1,index1) in item.list" :key="index1">
													<div class="info">
														<div class="time">{{item1.start}}</div>
														<div class="status">未开始</div>
														<div class="name">{{item1.name}}</div>
														<div class="match">
															<div class="host">{{item1.home_name}}</div><img
																:src="item1.home_logo || require('../../assets/images/team.png')" alt="">
															<div class="vs">VS</div><img :src="item1.away_logo  || require('../../assets/images/team.png')" alt="">
															<div class="guest">{{item1.away_name}}</div>
														</div>
													</div>
													<div v-if="item1.is_reserve != 1" class="btn reservation" @click="reserveMatch(item1)"></div>
												</li>
											</ul>
										</div>
										<el-empty :image-size="300" v-if="reserveLiveList.length == 0" :image="require('../../assets/images/qsy.png')"></el-empty>
									</div>
								</div>
								<!-- 主播动态 -->
								<div class="anchor_news_wrap" v-if="tabindex == 0" >
									<div style="min-height: 650px;">
										<div class="anchor_news_item" v-for="(item,index) in postList" :key="index">
											<div class="anchor_news__inner_wraps">
												<div class="anchor_news_title_wraps">
													<a target="_blank" href="/personal-space?headerNavIndex=2&amp;id=2164373">
														<div class="lazyload-wrapper "><img :src="item.avatar || require('../../assets/images/userLogo.png')">
														</div>
													</a>
													<div class="other_info">
														<a class="title" target="_blank" href="/personal-space?headerNavIndex=2&amp;id=2164373">
															{{item.user_nickname}}
														</a>
														<div class="time_info">{{item.addtime}}</div>
													</div>
												</div>
												<div class="anchor_news_content_wraps">
													<router-link class="content"  :to="'/comment?id='+ item.id"   tag="a" target="_blank">
														<p>{{item.title}}</p>
													</router-link>
													<div class="anchor-news-imglist">
														<!-- img-box-one-wrapper 单张 《img-box-wrapper 多张》 -->
														<!-- 图片  -->
														<div class="anchor-news-imglist" v-if="item.is_flie_type == 0">
															<div class="img-box-wrapper"
																:class="item.flie.length == 1?'img-box-one-wrapper':''"
																v-for="(item1,index1) in item.flie" :key=index1><img :src="item1">
															</div>
														</div>

														<!-- 视频 -->
														<div class="img-box-one-wrapper" style="position: relative;"
															v-else>
															<img :src="item.flie[0].img">
															<div class="mask"><img
																	src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHYAAAB4CAMAAAAQc/ZTAAAApVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+4/eNVAAAANnRSTlMA8/j8CQNFw7egjD0mEu7kmTYyGermvqZp3s6tSyIdDoN2bmZXKwbb0cmqYVIWDNiye1sukofJUFtWAAADkUlEQVRo3tXah1LiUACF4ZObRgihhN6RoiBV0PP+j7bjumNGVLgtmdnvBf6B5OaWBP+LZrydvUbPpXATlobR61svGPvI1WQbrQW/E8fhfIVcTJf1Pm9pdxdN2OWPuoL3uaWzB2tW5TZlOVEMK9Ih1YQBjMUlqhvsYKRSop51DG3eTFBbtIeeUZ8mqj0f6g5dmgonUHU50lxrBDULQSvKPuQ9dmlLuIesaYf2PI0hZz+gTe0LZIz7tMuJcV+lTdtEgHuafdrnpLhtumYeWhXc4nWYj34TNzwzL2sPv5ozPxF+kwrm6IyfTfvMk1MxuLDWL++SeXvDd4ca8yYq+KbM/HVw7eKyAEtcCVmE9gFfjFiMF4Mfa6DlAZmYRZkDmRKLUnvEpwaLs8CniMUZZJO7wwKt8M+ZRSqr31Cth8auLmik5uOvpitdXQFAs+7SRKC6lNnhQ+WZBur4a0hZ2ZhLO9TWxzu/SkkOkAkG1DUGgJRK2czyiXq2APCgm4W/qFFHV234OLjmPVSprgYAbYMskJQFle2BKQ2ymsM4BhqmWaAyVJ+FzuZZoNFRfSzPDLK6w/gEPBtkdYfxEejYysLvtSmnCmyMsxnvpUoZAjhayGaSruScUrOSzZwoIUHVcrYhNwe5lrOPcss4x3K2SQkVtC1nHyihiSe72UBQwgEDm9lJRBkuEGpmTeZeBzgZZ7NHlMLy4tU0mz2QpYVATzNrsoqsA4Fm1mTN/ABMjLONDhWNADiaWYP9UAXAwCCrt/sTPoCyfjZ5E9pngCPlbLYlMDgTm7rSWaMNUCYGoLCaEsjsjtTl+Hj3pnIHfgg21FdSPQw7+XiXlmiihw9PlNVNgFWXRkSCDy+UJgZtGhrinzGLtCvwNDlTzY57tizOKz491lgUd2L6TtH8DaPXYjHcytWiuhhdfDGtsgjuBV8tWIQ6rm2Yv1aCa6nL3G3x3SvzFuIH0xrzJVb4SewyVwuDHbGtIVvUq76nA36T1JgXccHvUof5cJcaRw/merht5zIHM9zTo3113De3X/Uh4SyK/IczgUOL5pDVaNEWsYS8SUg7+g2o8Mu0YZhA0cj8jxZzqJucaGaTGnwFbvINePHfvEd7GBhHLjWUGjA0Uf/OYpjCgma5RXkiWsGSx91QUEpne4BNSa9zr+xuXiawzwtm4a/pdXk0RW4OjfPseS2YEcdTeRsnKIK3H1/iIE7Hew//kz/wxRSXLXEZwAAAAABJRU5ErkJggg==">
															</div>
														</div>
													</div>
													<div class="oter_info_wrap">
														<div class="item pl_item" @click="item.isShow=!item.isShow">
															<span class="pl_bg icon_bg"></span><span
																class="num">{{item.comment}}</span>
														</div>
														<div class="item dz_item"><span
																class="dz_bg icon_bg "></span><span
																class="num">{{item.like}}</span>
														</div>
														<div class="item fx_item"><span
																class="fx_bg icon_bg"></span><span class="num">分享</span>
														</div>
													</div>
												</div>
												<div class="comment_wrap comment_wrap_0" v-if="item.isShow">
													<div class="anchor_news_comment_wraps">
														<div class="anchor_news_comment_input_wraps">
															<div class="anchor_news_comment_input_left ">
																<div class="tips">请先<span
																		style="cursor: pointer; color: rgb(176, 138, 91);">登录</span>后发表评论
																</div>
																<div class="emoj-wrap">
																	<div class="common-emoji">
																		<div class="eomj-icon"></div>
																	</div>
																</div>
															</div><button class="submit_btn disabled"
																disabled="">发送</button>
														</div>
													</div>
												</div>
											</div>
										</div>
										<el-empty :image-size="300" v-if="postList.length == 0" :image="require('../../assets/images/qsy.png')"></el-empty>
										<!-- <img src="../../assets/images/qsy.png" alt="no-data" class="no-data-img" v-if="postList.length == 0"> -->
									</div>
									<el-pagination style="text-align: center;" background @current-change="sizeChange" layout="prev, pager, next"
										:total="postListDetail.total">
									</el-pagination>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
		
		<!-- 如何獲得鑽石 -->
		<div class="diamondDirections" v-if="showDiamondDirections">
			<div class="content">
				<div class="contentBtns">
					<div class="BtnLeft">
						<img src="../../assets/images/daily/diamond-directions-btn-1.png" @click="diamondDirectionsBtnClick(true)" />
					</div>
					<div class="BtnCenter">
						<img src="../../assets/images/daily/diamond-directions-btn-2.png" @click="diamondDirectionsBtnClick(false)" />
					</div>
					<div class="BtnRight">
						<img src="../../assets/images/daily/diamond-directions-btn-3.png" @click="diamondDirectionsBtnClick(false)" />
					</div>
				</div>
			</div>
			<img class="closeBtn" src="../../assets/images/daily/close.png" @click="showDiamondDirections = false"/>
		</div>

		<!-- 紅包彈窗 -->
		<div class="redEnvelopeDialog" v-if="showRedEnvelopeDialog">
			<div class="redEnvelopeDialogBg1" v-if="!is_login">
				<img class="redEnvelopeDialogClose" src="../../assets/images/daily/close.png" @click="showRedEnvelopeDialog = false"/>
				<div class="redEnvelopeDialogBtns">
					<img class="redEnvelopeDialogBtnLeft" src="../../assets/images/daily/red-envelope-dialog-btn-1-1.png" @click="regiter()"/>
					<img class="redEnvelopeDialogBtnRight" src="../../assets/images/daily/red-envelope-dialog-btn-1-2.png" @click="login()"/>
				</div>
			</div>
			<div class="redEnvelopeDialogBg2" v-else>
				<img class="redEnvelopeDialogClose" src="../../assets/images/daily/close.png" @click="showRedEnvelopeDialog = false"/>
			</div>
		</div>
		<!-- 下载弹框 -->
		<downLoadModel v-if="showDownLoadModel" @close="showDownLoadModel = false" ></downLoadModel>
	</div>
</template>

<script>
	import Clipboard from "clipboard";
	import liveTv from './live-tv.vue'
	import advertising from './advertising.vue'
	import liveHeader from './live-header.vue'
	import chatRoom from './chatRoom.vue'
	import downLoadModel from '@/components/downLoadModel.vue'
	import iconSvg from '../../components/svg.vue'
	import TcVideoPlayer from '../../components/tencentPlayer.vue'
	import {
		getRoomInfo,
		userPostList,
		getLiveList,
		attention,
		getList,
		setTitle,
		handselGift,
		reserveMatch,
		getUserGiftList,
		getReserveLiveList,
		recordUsageTime
	} from '../../api/user.js'
	import {
		getInfo,
		getExponent,
		getGuardList
	} from '../../api/basketball.js'
	import {
		getfootballDetail
	} from '../../api/football.js'
	import SVGA from 'svgaplayerweb';
	import QRCode from 'qrcodejs2';
	
	const Base64 = require('js-base64').Base64
	export default {
		components: {
			liveTv,
			TcVideoPlayer,
			iconSvg,
			liveHeader,
			chatRoom,
			advertising,
			downLoadModel,
		},
		data() {
			return {
				showDownLoadModel:false,
				timerNum:0,
				timer:null,
				url:'webrtc://pull.xinzhongjituan.com/live/sd-1-3757537',
				text:'1231231',
				heat:0,//热度
				num: 0, //偏移量
				page: 1,
				base: {},
				qsVid:"",
				query: {},
				detail: {},
				isAdvertising:false,
				lvBackpackIndex:0,//选择背包礼物
				gifItem: {}, //选中的礼物
				gifMask: false, //礼物弹窗
				counttDown: 0, //开赛倒计时
				counttDownDay: 0, //开赛倒计时分秒
				reserve: {}, //主播下一场
				userData: {}, //主播用户信息
				tabindex: 0,
				liveList: [],
				exponent: {},
				offsetLeft: 0,
				beibao:false,//
				userGift:[],//背包列表
				giftList: [], //礼物列表
				basketball: {},
				showBtn:false,//确认购买弹窗
				dialogVisible: true,//贵族弹窗
				reserveLiveList: [], //主播预约列表
				postListDetail: {},
				postList: [], //主播动态列表
				tabtitle: ['主播动态', '直播预告', '直播回放'],
				timeInterval: null,
				timeIntervals: null,
				shareUrl:'',
				showDiamondDirections: false,
				showRedEnvelopeDialog: false,
				haveSvga: false,
				svgaTimeOut: null,
			}
		},
		computed:{
			infos(){
				return this.$store.state.infos
			},
			is_login() {
                let result = false;
				if (JSON.stringify(this.$store.state.infos) !== '{}') {
					result = true;
				}
                return result;
            },
			system(){
				return this.$store.state.system
			},
		},
		watch:{
			// 篮球比分数据
			'$store.state.basketball_exponent'(e) {
				if (e.type === 'basketball_match' && this.query.id == e.match_id) {
					this.base = {...this.base, ...e}
				}
			},
			"$store.state.football_exponent"(e) {
				if (e.type === 'football_match' && this.query.id == e.id) {
					this.base = {...this.base, ...e}
				}
				// if (e.type == 'football_match' && this.query.id == e.id && e.company_id == 2) {
				// 	this.base = {...this.base,...e}
				// } else if (e.type == 'football_exponent' && this.query.id == e.sourceid) {
				// 	// console.log(e.exponent);
				// 	console.log('指数');
				// 	this.base.exponent[e.name][e.name1] = e.exponent[e.name][e.name1]
				// 	// this.base.exponent = {
				// 	// 	...this.base.exponent,
				// 	// 	...e.exponent
				// 	// }
				// 	// this.base =this.$common.assignDeep(this.item.exponent,e.exponent)
				// 	// console.log(this.item.exponent);
				// }
			},
		},
		beforeDestroy(){
			if (this.timer) {
				clearInterval(this.timer)
				this.timer = null;
			}
		},
		mounted() {
			// if (!localStorage.getItem('isShowDownLoad')) {
				if (this.timer) {
				clearInterval(this.timer)
				this.timer = null;
			}
			this.timerNum = 180;
			this.timer = setInterval(() => {
				if (this.timerNum <= 0) {
					clearInterval(this.timer)
					this.timer = null;
					if (!sessionStorage.getItem('isShowDownLoad')) {
						this.showDownLoadModel = true;
						sessionStorage.setItem('isShowDownLoad',true)
					}

				}
				this.timerNum -=1
			}, 1000);
			// }
			let query = this.$route.query
			this.query = query
			for(const i in query) {
				if(i === 'channel_code'){
					localStorage.setItem('channel',query[i])
				}
			}
			this.shareUrl = window.location.origin +"/room/"+ getQueryString().uid
			// item.type==0?'football':'basketball'
			this.getRoomInfo(getRoomInfo)
			
			
			this.getGiftList()
			this.userPostList()
			this.getUserGiftList()
			this.getReserveLiveList()
			// console.log(this.infos,'********************&&&&&&&&&&&&&&&&')
			// console.log(window.location.href);
			// this.creatQrCode(window.location.href)
			setTimeout(res=>{
				this.init()
			},500)
			if (query.type == 'football') {
				this.getfootballDetail(query.id)
				setTimeout(res => {
					this.$WebSocket.send({type:"toggle","company_id":2},'','')
					this.$WebSocket.send({type:"classify",classify_type:0},'','')
				}, 2000)
			} else if(query.type == 'basketball'){
				this.getInfo(query.id)
				setTimeout(res => {
					this.$WebSocket.send({type:"toggle","company_id":2},'','')
					this.$WebSocket.send({type:"classify",classify_type:1},'','')
				}, 2000)
				// this.getExponent(query.id)
			}
			// 判断是否有登录
			// if()
			// console.log(this.infos);
			// console.log('------------------------------');
			// let userInfo = localStorage.getItem('userInfo')
			if(JSON.stringify(this.infos)=="{}") {
				this.$store.dispatch('joinGroup', {
					id: Number(query.uid)
				})
			}
			
			setTimeout(res=>{
				// 判断是否是贵族 是贵族判断过期时间
				if(this.infos.is_guard == 1){
					// 86400
					let str = String(new Date().getTime()).slice(0,10)
					let num = this.infos.guard.endtime - Number(str)
					// 贵族过期时间 - 当前时间 < 7天 ---true
					if(num  < 86400 * 7){
						let title = `<p style="text-align:center">尊敬的<span style="color:#f4c490">${this.infos.guard.name}</span>贵族会员，您在体育开通过的<span style="color:#f4c490">${this.infos.guard.name}</span>贵族即将</p><p style="text-align:center">到期，请您及时续费；如过期来办理，您将享受不到</p><p style="text-align:center">为您提供的续费折扣。</p>`
						this.$alert(title, '贵族到期提示', {
						  dangerouslyUseHTMLString: true
						})
					}
				}
			},1500)
			//setTimeout(res => {
			//	this.$store.dispatch('loginTim', '')
				
			//}, 200)
			// 用户进入直播间
			
			
			setTimeout(res => {
				// console.log(this.infos.id,query,'====获取');
				let data = {
					type: 102,
					nobel: { 
						level: 1,
						// 贵族图标guard_icon || 等级图标exp_icon || 房主图标
						exp_icon:this.infos.exp_icon,
						is_guard:this.infos.is_guard,
						guard_swf:this.infos.is_guard == 1?this.infos.guard.swf:'',
						guard_name:this.infos.is_guard == 1?this.infos.guard.swf_name:'',
						is_room:this.infos.id == query.uid?1:0,
						guard_icon:this.infos.is_guard == 1?this.infos.guard.icon:''
					},
				}
				// this.$store.state.messageList = []
				if(JSON.stringify(this.infos) !== '{}'){
					this.$refs.chatRoom.createCustomMessage(data, query.uid)
				}
				this.$store.dispatch('getGroupOnlineMemberCount',{roomId:query.uid})
				
				
			}, 1500)

			this.recordUsageTime();
			this.timeInterval = setInterval(() => {
				this.recordUsageTime();
			}, 60000)

			// this.Iime()
		},
		methods: {

			// 开启websocket
			init() {
				//发起websocket连接
				let config = {}
				this.$WebSocket.WebSocketFn((res,config) => {
					if (!res) return;
					this.retundata();
					this.onclose();
				});
			},
			retundata() {
				//监听接受到websocket的信息
				this.$WebSocket.onmessage((res) => {
					// console.log(res);
					this.$store.dispatch("WS_DATA_ACTIONS", res);
				});
			},
			onclose() {
				//监听长连接的一个断开
				this.$WebSocket.ws.onclose = () => {
					//console.log("断开连接1");
					// this.$store.dispatch("setDeviceNum", "");
					// let info = this.$store.state.Counter.websocketinfo;
					//console.log("尝试重新连接长连接");
					this.init();
				};
			},
			out(){
				let promise = this.tim.quitGroup(this.query.uid);
				promise.then(function(imResponse) {
					
				}).catch(function(imError){
				  console.warn('quitGroup error:', imError); // 退出群组失败的相关信息
				});
			},
			// 充值跳转 判断是否登录，没有登录需要弹出登录框
			navigate(){
				
				if(JSON.stringify(this.infos) == '{}'){
					return this.$store.state.user.showLoginMask = true
				}
				
				let routeData = this.$router.resolve({  path:"/member?type=1&isRecharge=true"})
				window.open(routeData.href,'_blank')
			},
			copyText () {
		        const qrUrlContent = document.getElementById("cp-input");
		        qrUrlContent.value = window.location.href;
		        qrUrlContent.select()
		        let range = document.createRange()
		        let selection = document.getSelection()
		        range.selectNode(qrUrlContent)
		        selection.addRange(range)
		        qrUrlContent.setSelectionRange(0, qrUrlContent.value.length);
		        console.log(window.location.href,"========");
		        let isSucess = document.execCommand('copy');
		        if (isSucess) {
		        	this.$alert('复制成功',"提示")
		        	this.tipsId = "";
		        } 
    		},
			// 記錄進入直播間時長
			recordUsageTime() {
				let user_id = this.$store.state.user.token ? this.$store.state.user.data.id : localStorage.getItem("userid")
				
				let data = {
					user_id: user_id,
					match_id: this.query.uid,
				}
				recordUsageTime(data).then(res => {
					
				}).catch(res => {

				})
			},
			
			// 处理svg
			qrSrc(url){
				
				// return
				
				if (url === "") return "";
				let b64 = Base64.encode(url)
				return "data:image/svg+xml;base64," + b64;
			},
			initMachineSVGA(item) {
			    var mycanvas = document.getElementById("demoCanvas");
				let _this = this;
			    let player = new SVGA.Player("#demoCanvas");
			    let parser = new SVGA.Parser("#demoCanvas");
				let time = item.swftime * 1000;
			    parser.load(item.swf, function (videoItem) {
					player.setVideoItem(videoItem);
					player.startAnimation();
					if (_this.haveSvga) {
						clearTimeout(_this.svgaTimeOut);
					} else {
						_this.haveSvga = true;
					}
					_this.svgaTimeOut = setTimeout(() => {
						player.stopAnimation();
					}, time);
			    });
			},
			// 鼠标移入
			mouseover(e, index) {
				this.gifMask = true
				if (this.offsetLeft == this.$refs.gifli[index].offsetLeft) return
				this.gifItem = e
				// console.log(this.num * 450);
				this.offsetLeft = this.$refs.gifli[index].offsetLeft+this.num * 450
				// console.log(this.$refs.gifli[index].offsetLeft);
				// console.log(e);
				console.log("============================", e);
				// this.initMachineSVGA(e.swf)
			},
			// 
			setAttention() {
				let userData = this.userData.is_attention
				let data = {
					id: this.userData.uid
				}
				attention(data).then(res => {
					if (userData == 1) { //1是
						this.userData.is_attention = 0
						this.$message.success('操作成功')
					} else {
						this.userData.is_attention = 1
					}
				}).catch(res => {})

			},
			// 获取猎物列表
			getGiftList() {
				getList().then(res => {
					this.giftList = res.data;
					if (res.data.length > 0) {
						for (let i = 0; i < res.data.length; i++) {
							let link = document.createElement("link");
							link.rel = "prefetch";
							link.as = "fetch";
							link.href = res.data[i].swf;
							document.body.appendChild(link);
						}
					}
				}).catch(res => {
					// this.$message.success('预约成功')
				})
			},
			// 赠送礼物
			handselGift(item, type) {
				let data = {
					gift_id: item.id,
					anchor_id: this.query.uid, //主播id
					type: type, //是否是背包礼物 1是 0否 默认0
					exp_icon:this.infos.exp_icon,
					is_guard:this.infos.is_guard, 
					is_room:this.infos.id == this.query.id?1:0,
					guard_icon:this.infos.is_guard == 1?this.infos.guard.icon:''
				}
				if(type == 1) {
					data.gift_id = item.gift_id
				}
				if(JSON.stringify(this.infos) == '{}'){
					return this.$message.warning('请先登录, 获得钻石。')
					// return this.$store.state.user.showLoginMask = true
				}
				if (parseFloat(this.infos.balances) < item.needcoin) {
					return this.$message.warning('钻石不足, 先做日常任务领取钻石后再来吧~')
				}
				if(this.infos.id == this.query.uid) return this.$message.warning('主播不允许给自己刷礼物')
				handselGift(data).then(res => {
					// 第二个参数为直播房间号
					// let obj = item
					item.type1= item.type//是否全屏显示
					item.type = 100//设置为100则为发送礼物
					
					this.$message.success('赠送成功');
					this.$store.dispatch('getUserInfo','');
					// this.$refs.chatRoom.createCustomMessage(item,this.query.uid);
					item.type = item.type1;
					// this.giftList = res.data.data
				}).catch(res => {

				})
			},
			// 获取背包礼物
			getUserGiftList() {

				getUserGiftList().then(res => {
					this.userGift = res.data
					// this.giftList = res.data.data
				}).catch(res => {
					// this.$message.success('预约成功')
				})
			},
			// 预约主播赛事
			reserveMatch(item) {
				reserveMatch({
					live_id: item.id
				}).then(res => {
					if(item.is_reserve == 1){
						item.is_reserve = 0
					}else{
						item.is_reserve = 1
					}
					this.$message.success('预约成功')
				}).catch(res => {
					// this.$message.success('预约成功')
				})
			},

			// 监听分页
			sizeChange(e) {
				this.page = e
				this.getLiveList()
			},
			// 获取篮球指数
			// getExponent(id){
			// 	getExponent({id:id}).then(res=>{
			// 		this.exponent = res.data
			// 		console.log(res.data);
			// 	}).catch(res=>{})
			// },
			// 获取主播动态
			userPostList() {
				userPostList({
					uid: this.query.uid
				}).then(res => {
					// this.detail = res.data.info
					res.data.data.forEach(item => {
						item.isShow = false
					})
					this.postList = res.data.data
					res.data.data = []
					this.postListDetail = res.data
				}).catch(res => {})
			},
			// 获取直播详情
			getRoomInfo() {
				getRoomInfo({
					uid: this.query.uid
				}).then(res => {
					console.log(res,"res.data==========")
					setTimeout(res1=>{
						this.$store.dispatch('joinGroup', this.query.uid)
					},500)
					this.qsVid = res.data.vid;
					this.detail = res.data.info
					this.reserve = res.data.reserve
					this.userData = res.data.userData
					this.basketball = res.data.basketball
					if ((this.detail.starttime)-(this.detail.servertime)>0&&(this.detail.starttime)>0 ) {
						this.counttDown=(this.detail.starttime)-(this.detail.servertime)
						// 先卸载定时器从新加载定时器
						clearInterval(this.timeIntervals)
						this.Iime()
					}
					this.heat = (this.userData.heat.toFixed(2) + '').replace(/\d{1,4}(?=(\d{4})+(\.\d*)?$)/g, '$&,') || 0

				}).catch(res => {})
			},
			// 获取相关直播
			getLiveList() {
				let data = {
					page: 1,
					type: -1, //-1全部 0足球 1篮球 2其他
					isweb: 1
				}
				getLiveList(data).then(res => {
					this.liveList = res.data.data
				}).catch(res => {})
			},

			// 获取足球详情
			getfootballDetail(id) {
				getfootballDetail({
					id: id
				}).then(res => {
					this.base = res.data
				}).catch(res => {})
			},
			// 获取主播预约直播列表
			getReserveLiveList() {
				// let arr2 = []
				// 如何将arr中name相等的值

				getReserveLiveList({
					uid: this.query.uid
				}).then(res => {
					let reserveLiveList = []
					// 思路：先判断key值是否一致 2.
					res.data.data.map((item, index) => {
						let obj = {
							name: item.key,
							list: [item]
						}
						// console.log(item);
						res.data.data.map((option, optionIndex) => {
							if (item.key == option.key && optionIndex > index) {
								// obj.list = [...obj.list, ...[option]]
								obj.list.push(option)
							}
						})
						let intos = reserveLiveList.filter(res => {
							return res.name == obj.name
						})
						if (intos.length) return
						reserveLiveList.push(obj)
					})
					this.reserveLiveList = reserveLiveList
				}).catch(res => {

				})
			},
			// 获取篮球详情
			getInfo(id) {

				getInfo({
					id: id
				}).then(res => {
					this.base = res.data
				}).catch(res => {})
			},
			
			/* 群主编辑标题 */
			open() {
				// inputErrorMessage: '邮箱格式不正确'
				let that = this
				// inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
				this.$prompt('', '标题', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  inputValue:that.userData.title,
				  inputPlaceholder:'请输入标题',
				}).then(({ value }) => {
					setTitle({content:value}).then(res=>{
						 this.$message({
							type: 'success',
							message: '修改成功'
						 });
						 that.userData.title = value
					}).catch(res=>{})
				 console.log(value);
				}).catch(() => {
				 //  this.$message({
					// type: 'info',
					// message: '取消输入'
				 //  });       
				});
			  },
			
			// 复制
			copy(val) {
				var _this = this;
				// createElement() 方法通过指定名称创建一个元素
			  var copyInput = document.createElement("input");
			  //val是要复制的内容
			  copyInput.setAttribute("value", val);
			  document.body.appendChild(copyInput);
			  copyInput.select();
			  try {
				var copyed = document.execCommand("copy");
				if (copyed) {
				  document.body.removeChild(copyInput);
				 _this.$message.success('复制成功')
				}
			  } catch {
				  _this.$message.success('复制失败，请检查浏览器兼容')
				// this.$Message.error("复制失败，请检查浏览器兼容");
			  }
			},
			setisAdvertising(type){
				this.isAdvertising = true
				setTimeout(res=>{
					this.$refs.advertising.status = type
				},500)
			},
			closeAdj(){
				this.isAdvertising = false
			},
			counttDownF(){
				let d=parseInt(this.counttDown/(24*60*60))
				d=d<10?"0"+d:d
				let h=parseInt(this.counttDown/(60*60)%24)
				h=h<10?"0"+h:h
				let m=parseInt(this.counttDown/60%60)
				m=m<10?"0"+m:m
				let s=parseInt(this.counttDown%60)
				s=s<10?"0"+s:s
				let date=[d,h,m,s]
				this.counttDownDay=date
			},
			Iime(){
				 this.timeIntervals = setInterval(()=>{
					if(this.counttDown>0){
						this.counttDown-=1
						this.counttDownF()
					}else if(this.counttDown===0){
						//倒计时结束隐藏倒计时并拉流直播
						this.counttDown=0
						clearInterval(this.timeIntervals)
					}

				},1000)
			},
			regiter() {
				this.showRedEnvelopeDialog = false;
				this.$store.state.user.isRegister = true;
				this.$store.state.user.showLoginMask = true;
			},
			login() {
				this.showRedEnvelopeDialog = false;
				this.$store.state.user.showLoginMask = true;
			},
			diamondDirectionsBtnClick(isRegister = false) {
				if (isRegister) {
					if (this.is_login) {
						return;
					}
					this.$store.state.user.isRegister = true;
					this.$store.state.user.showLoginMask = true;
				} else {
					this.$router.push('/dailyMission');
				}
				this.showDiamondDirections = false;
			},
			onhandleSendGift(data) {
				console.log(data);
				let gift = this.giftList.filter(it => it.id == data.gift_id)[0];
				this.initMachineSVGA(gift);
			}
		},
		// destroyed(){
		// 	clearTimeout(this.Iime)
		// 	clearInterval(this.timeInterval)
		// }
	}
</script>

<style>
	.mask {
		position: absolute;
		height: 100%;
		width: 100%;
		left: 0;
		top: 0;
		display: flex;
		border-radius: 5px;
		justify-content: center;
		align-items: center;
	}

	.mask img {
		margin: auto;
		opacity: 0;
		z-index: 9;
		height: 30px !important;
		width: 30px !important;
		
		transform: scale(1.6);
	}


	.anchor-news-imglist:hover .mask {
		-webkit-animation: pulse .5s ease;
		-moz-animation: pulse .5s ease;
		background: hsla(0, 0%, 40%, .5)
	}

	.anchor-news-imglist:hover .mask img {
		display: inline-block;
		-webkit-animation: playBtn .5s ease;
		-moz-animation: playBtn .5s ease;
		transform: scale(1);
		opacity: 1
	}
	.video_count .counttDownShow{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-image: url(../../assets/images/live_bg.png);
		background-size: 100% 100%;
		z-index: 10;
		color: #fff;
	}
	.center_date{
		text-align: center;
		margin-top: 20%;
		display: inline-block;
		margin-left: 32%;
		background: rgba(0,0,0,.7);
		padding: 6px 16px;
		border-radius: 6px;
		width: 300px


	}
	.txt_control{
		display: inline-block;
		width: 40px;
		height: 40px;
		background-image: url(../../assets/images/ic-share.png);
		background-size: 100% 100%;
		cursor: pointer;
	    margin-top: 20px;	
	}
	#cp-input{
		position:absolute;
		z-index:-1;
		opacity:0;
	}
	.concern_box_shou{
		position: absolute;
		right: 3%;
		top: 41%;
	}
	.cancelConcern_date_n{
		display: inline-block;
		width: 40px;
		height: 40px;
		background-image: url(../../assets/images/ic-love-uncheck.png);
		background-size: 100% 100%;
		cursor: pointer;
	}
	.cancelConcern_date_y{
		display: inline-block;
		width: 40px;
		height: 40px;
		background-image: url(../../assets/images/ic-love-check.png);
		background-size: 100% 100%;
		cursor: pointer;
	}
	.title_date{
		    margin: 15px 0 10px 0;
	}
	.d_date ,.h_date,.m_date,.s_date{
    display: inline-block;
    padding: 6px 0;
    background: #000;
    color: #fff;
    margin: 0 2px;
    text-align: center;
    width: 50px;
    font-size: 22px;
	font-family: 'LcdD';
	font-display: swap;
	}
	.d_date_d ,.h_date_h,.m_date_m,.s_date_s{
    display: inline-block;
    padding: 6px 0;
    color: #fff;
    margin: 0 2px;
    text-align: center;
    width: 50px;
    font-size: 22px;
	}
	.date_out,.date_tile{
		
	}
	.live-player-footer-wrap .right .ant-popover {
		display: none;
	}

	.live-player-footer-wrap .right .gift-box-ul:hover .ant-popover {
		display: block;
	}
	.live-player-footer-bottom-box .right .beibao:hover .lv-backpack-popover {
		display:block !important;
	}
	.lvBackpack_active{
		border: 1px solid rgb(216, 173, 102) !important;
	}
	.liveTv-mask {
		z-index: 999;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		/* background-color: rgba(0,0,0,0.2); */
	}
	.left .title img{
		width: 20px;
		height: 20px;
		cursor: pointer;
		margin-left: 10px;
	}
</style>
<style lang="scss" scoped>
.diamondDirections {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 100000;
	.content {
		width: 650px;
		height: 400px;
		background: url('../../assets/images/daily/diamond-directions.png') -15px top / 100% auto no-repeat;
		.contentBtns {
			display: flex;
			align-items: center;
			height: 100%;
			padding: 100px 40px 130px 55px;
			box-sizing: border-box;
			.BtnLeft,
			.BtnCenter,
			.BtnRight {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100%;
				cursor: pointer;
				img {
					height: 150px;
				}
			}
		}
	}
	.closeBtn {
		position: absolute;
		top: -20px;
		right: 0px;
		cursor: pointer;
	}
}

.redEnvelopeDialog {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 100000;
	.redEnvelopeDialogBg1,
	.redEnvelopeDialogBg2 {
		display: flex;
		width: 600px;
		height: 596px;
		background: url(../../assets/images/daily/red-envelope-bg-1.png) center top / 100% auto no-repeat;
		.redEnvelopeDialogClose {
			position: absolute;
			z-index: 1;
			width: 42px;
			height: 42px;
			top: 186px;
			right: 50px;
			cursor: pointer;
		}
		.redEnvelopeDialogBtns {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			margin-top: auto;
			margin-bottom: 100px;
			padding: 0 88px;
			box-sizing: border-box;
			.redEnvelopeDialogBtnLeft,
			.redEnvelopeDialogBtnRight {
				flex: 1;
				height: 52px;
				cursor: pointer;
			}
			.redEnvelopeDialogBtnLeft {
				margin-right: 54px;
			}
			.redEnvelopeDialogBtnRight {
				margin-left: 54px;
			}
		}
	}
	.redEnvelopeDialogBg2 {
		background: url(../../assets/images/daily/red-envelope-bg-2.png) center 64px / 100% auto no-repeat;
	}
	.closeBtn {
		position: absolute;
		top: -20px;
		right: -20px;
		cursor: pointer;
	}
}

#demoCanvas {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 250px;
	height: 250px;
}
</style>