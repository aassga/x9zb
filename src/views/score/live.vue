<!-- 即使比分直播 -->
<template>
	<div class="live-container">
		<div class="live-main">
			<div class="live-main-up-wrap">
				<div class="live-main-up-wrap-player">
					<div class="score-detail-header-container">
						<div class="score-detail-header"
							:style="{ width: '100%', background: `url(${require('../../assets/images/live-top-bg.jpg')})center top / 100% 100%`, }">
							<!-- 篮球 -->
							<div class="team" v-if="query.type == 'basketball' && item.away_team_data">
								<div class="guest-name name">
									<span class="num" style="color: #fff"
										v-if="item.away_scores_total">{{ item.away_scores_total }}</span>
									<img
										:src="item.away_team_data?item.away_team_data.logo:require('../../assets/images/team.png')" />
									<span class="ellipsis match-name"
										style="color: #fff">{{ item.away_team_data.short_name_zh }}</span>
								</div>
								<div class="score">
									<p class="league-name">
										<span>{{ item.match_time }}</span> {{ item.short_name_zh }}
									</p>
									<div>
										<div class="on-time flex-center custom-score-wrap" style="color: #fff">
											<div>
												<p class="time-text ">{{ item.status_name }}</p>
											</div>
										</div>
										<p class="color-999 score-text" v-if="query.type == 'football'">
											<span>半:
												<!-- -->1-0
											</span><span>&nbsp;&nbsp;角:
												<!-- -->8-10
											</span>
										</p>
									</div>
								</div>
								<div class="host-name name" v-if="item.home_team_data">
									<span class="ellipsis match-name"
										style="color: #fff">{{ item.home_team_data.short_name_zh }}</span>
									<img
										:src="item.home_team_data.logo?item.home_team_data.logo:require('../../assets/images/team.png')" />
									<span class="num" style="color: #fff">{{ item.home_scores_total }}</span>
								</div>
								<div class="custom-matchData-info"></div>
							</div>
							<!-- 足球 -->
							<div class="team" v-if="query.type == 'football' && item">
								<div class="guest-name name">
									<span class="num" v-if="item.away_data"
										style="color: #fff">{{ item.away_data[0] }}</span>
									<img style="object-fit: contain;" v-if="item.away_team_log"
										:src="item.away_team_log?item.away_team_log:require('../../assets/images/team.png')" />
									<span class="ellipsis match-name"
										style="color: #fff">{{ item.away_team_name_zh }}</span>
								</div>
								<div class="score">
									<p class="league-name">
										<span>{{ item.time }}</span> {{ item.competition_name_zh }}
									</p>
									<div>
										<div class="on-time flex-center custom-score-wrap" style="color: #fff">
											<div>
												<p class="time-text"
													:class="{'point-animation':item.status != 1 || item.status != 8}">
													{{ getStatus1(item.status,item) }}
												</p>
											</div>
										</div>
										<p class="color-999 score-text" v-if="query.type == 'football'">
											<span>半:
												<!-- -->{{item.half_score || '0-0'}}
											</span><span v-if="item.away_data">&nbsp;&nbsp;角:
												<!-- -->{{item.home_data[8]}}-{{item.away_data[8]}}
											</span>
										</p>
									</div>
								</div>
								<div class="host-name name">
									<span class="ellipsis match-name"
										style="color: #fff">{{ item.home_team_name_zh }}</span>
									<img style="object-fit: contain;" v-if="item.home_team_log"
										:src="item.home_team_log?item.home_team_log:require('../../assets/images/team.png')" />
									<span class="num" style="color: #fff"
										v-if="item.home_data">{{ item.home_data[0] }}</span>
								</div>
								<!-- <img src="../../assets/images/team.png" > -->
								<div class="custom-matchData-info"></div>
							</div>
						</div>
					</div>
					<!-- 足球 -->
					<div v-if="query.type == 'football'" class="score-detail-odd-table">
						<ul class="odd">
							<li class="odd-item football-wrap odd-item-header color-666">
								<div class="cell cell0"></div>
								<div class="cell cell1 color-7c7c81">欧指</div>
								<div class="cell cell1 color-7c7c81">让球</div>
								<div class="cell cell1 color-7c7c81">大小球</div>
								<div class="cell cell1 color-7c7c81">角球</div>
							</li>
							<li class="odd-item borderT-new football-wrap">
								<div class="cell cell0 borderR-new color-666">即时盘</div>
								<div class="cell cell1 borderR-new" v-if="item.exponent">
									<div class="odd-number">
										<div :class="item.obj.eu.immediate.win == 1?'blue-t':''">
											{{item.exponent.eu&&item.exponent.eu.immediate&&item.exponent.eu.immediate.win || '-'}}
										</div>
									</div>
									<div class="odd-number" :class="item.obj.eu.immediate.draw == 1?'blue-t':''">
										{{item.exponent.eu&&item.exponent.eu.immediate&&item.exponent.eu.immediate.draw || '-'}}
									</div>
									<div class="odd-number">
										<div :class="item.obj.eu.immediate.fail == 1?'blue-t':''">
											{{item.exponent.eu&&item.exponent.eu.immediate&&item.exponent.eu.immediate.fail || '-'}}
										</div>
									</div>
								</div>
								<div class="cell cell1 borderR-new" v-if="item.exponent">
									<div class="odd-number">
										<div :class="item.obj.asia.immediate.win == 1?'blue-t':''">
											{{item.exponent.asia&&item.exponent.asia.immediate&&item.exponent.asia.immediate.win || '-'}}
										</div>
									</div>
									<div class="odd-number" :class="item.obj.asia.immediate.draw == 1?'blue-t':''">
										{{item.exponent.asia&&item.exponent.asia.immediate&&item.exponent.asia.immediate.draw || '-'}}
									</div>
									<div class="odd-number">
										<div :class="item.obj.asia.immediate.fail == 1?'blue-t':''">
											{{item.exponent.asia&&item.exponent.asia.immediate&&item.exponent.asia.immediate.fail || '-'}}
										</div>
									</div>
								</div>
								<div class="cell cell1 borderR-new" v-if="item.exponent">
									<div class="odd-number">
										<div :class="item.obj.bs.immediate.win == 1?'blue-t':''">
											{{item.exponent.bs&&item.exponent.bs.immediate&&item.exponent.bs.immediate.win || '-'}}
										</div>
									</div>
									<div class="odd-number" :class="item.obj.bs.immediate.draw == 1?'blue-t':''">
										{{item.exponent.bs&&item.exponent.bs.immediate&&item.exponent.bs.immediate.draw || '-'}}
									</div>
									<div class="odd-number">
										<div :class="item.obj.bs.immediate.fail == 1?'blue-t':''">
											{{item.exponent.bs&&item.exponent.bs.immediate&&item.exponent.bs.immediate.fail || '-'}}
										</div>
									</div>
								</div>
								<div class="cell cell1" v-if="item.exponent">
									<div class="odd-number" :class="item.obj.cr.immediate.win == 1?'blue-t':''">
										{{item.exponent.cr&&item.exponent.cr.immediate&&item.exponent.cr.immediate.win || '-'}}
									</div>
									<div class="odd-number" :class="item.obj.cr.immediate.draw == 1?'blue-t':''">
										{{item.exponent.cr&&item.exponent.cr.immediate&&item.exponent.cr.immediate.draw || '-'}}
									</div>
									<div class="odd-number" :class="item.obj.cr.immediate.fail == 1?'blue-t':''">
										{{item.exponent.cr&&item.exponent.cr.immediate&&item.exponent.cr.immediate.fail || '-'}}
									</div>
								</div>
							</li>
							<li class="odd-item borderT-new football-wrap">
								<div class="cell cell0 borderR-new color-666">滚球盘</div>
								<div class="cell cell1 borderR-new" v-if="item.exponent">
									<div class="odd-number">
										<div :class="item.obj.eu.scram.win == 1?'blue-t':''">
											{{item.exponent.eu&&item.exponent.eu.scram&&item.exponent.eu.scram.win || '-'}}
										</div>
									</div>
									<div class="odd-number" :class="item.obj.eu.scram.draw == 1?'blue-t':''">
										{{item.exponent.eu&&item.exponent.eu.scram&&item.exponent.eu.scram.draw || '-'}}
									</div>
									<div class="odd-number">
										<div :class="item.obj.eu.scram.fail == 1?'blue-t':''">
											{{item.exponent.eu&&item.exponent.eu.scram&&item.exponent.eu.scram.fail || '-'}}
										</div>
									</div>
								</div>
								<div class="cell cell1 borderR-new" v-if="item.exponent">
									<div class="odd-number">
										<div :class="item.obj.asia.scram.win == 1?'blue-t':''">
											{{item.exponent.asia&&item.exponent.asia.scram&&item.exponent.asia.scram.win || '-'}}
										</div>
									</div>
									<div class="odd-number" :class="item.obj.asia.scram.draw == 1?'blue-t':''">
										{{item.exponent.asia&&item.exponent.asia.scram&&item.exponent.asia.scram.draw || '-'}}
									</div>
									<div class="odd-number">
										<div :class="item.obj.asia.scram.fail == 1?'blue-t':''">
											{{item.exponent.asia&&item.exponent.asia.scram&&item.exponent.asia.scram.fail || '-'}}
										</div>
									</div>
								</div>
								<div class="cell cell1 borderR-new" v-if="item.exponent">
									<div class="odd-number">
										<div :class="item.obj.bs.scram.win == 1?'blue-t':''">
											{{item.exponent.bs&&item.exponent.bs.scram&&item.exponent.bs.scram.win || '-'}}
										</div>
									</div>
									<div class="odd-number" :class="item.obj.bs.scram.draw == 1?'blue-t':''">
										{{item.exponent.bs&&item.exponent.bs.scram&&item.exponent.bs.scram.draw || '-'}}
									</div>
									<div class="odd-number">
										<div :class="item.obj.bs.scram.fail == 1?'blue-t':''">
											{{item.exponent.bs&&item.exponent.bs.scram&&item.exponent.bs.scram.fail || '-'}}
										</div>
									</div>
								</div>
								<div class="cell cell1" v-if="item.exponent">
									<div class="odd-number" :class="item.obj.cr.scram.win == 1?'blue-t':''">
										{{item.exponent.cr&&item.exponent.cr.scram&&item.exponent.cr.scram.win || '-'}}
									</div>
									<div class="odd-number" :class="item.obj.cr.scram.draw == 1?'blue-t':''">
										{{item.exponent.cr&&item.exponent.cr.scram&&item.exponent.cr.scram.draw || '-'}}
									</div>
									<div class="odd-number" :class="item.obj.cr.scram.fail == 1?'blue-t':''">
										{{item.exponent.cr&&item.exponent.cr.scram&&item.exponent.cr.scram.fail || '-'}}
									</div>
								</div>
							</li>
						</ul>
					</div>

					<!-- 足球 -->

					<div class="video-detail-content"
						style=" border-radius: 0; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; ">
						<div>
							<div class="video-box" style="height: 531px;">
								<div id="dplayer contaner" style="width: 100%; height: 100%;">
									<div style=" position: relative; width: 100%; height: 100%; z-index: 19;overflow: hidden;">
										<!-- <iframe allowfullscreen="true" v-if="query.type == 'football' && item.id && liveIndex == 0" :src="item.live_animation_url"
											style="position: absolute; width: 100%; height: 100%"></iframe> -->
											<!-- v-if="liveIndex == 1 && item.pushurl1" -->
										<liveTv  v-if="item&&item.pushurl1" path="tv" reserve="{}" :islive="1" :info="item"></liveTv>
										<div class="counttDownShow" v-if="counttDown">
											<div class="center_date">
												<!-- <div class="title_date">{{title_name}}</div> -->
												<div class="title_date">开赛倒计时</div>
												<div class="date_out"><span class="d_date">{{counttDownDay[0]}}</span ><span class="h_date">{{counttDownDay[1]}}</span><span class="m_date">{{counttDownDay[2]}}</span><span class="s_date">{{counttDownDay[3]}}</span></div>
												<div class="date_tile"><span class="d_date_d">天</span ><span class="h_date_h">小时</span><span class="m_date_m">分钟</span><span class="s_date_s">秒</span></div>
												<!-- <div class="date_down">{{counttDownDay}}</div> -->
											</div>
											<div class="concern_box_shou">
												<!-- <div class="concern_shou" v-if="userData.is_attention == 0" @click="setAttention()">
													<span class="cancelConcern_date_n" title="关注"></span>
												</div>
												<span class="cancelConcern_date_y" v-else title="取消关注"></span> -->
												<!-- <div>
													<span  @click="copyText()" class="txt_control" title="分享"></span>
												</div> -->
											</div>
										</div>
										<div class="flex-center flex-wrap" style="margin-top: 150px;" v-else>
											<img src="../../assets/images/live-none.png" alt="">
											<p style="width: 100%;color: #fff;text-align: center;">暂无直播</p>
										</div>
										<div class="recommd-list"  v-if="!item.pushurl1">
											<div class="recommd-list-item" v-for="(item,index) in liveList" :key="index" >
												<div>
													<div :style="{backgroundImage:'url('+item.thumb+')'}">
														<div class="footer">
															<div class="title">{{item.title}}</div>
															<div class="status">直播</div>
														</div>
														
														<a class="mark" @click="setUrl(item)">
														<!-- <router-link class="mark" tag="a" target="_blank"
															:to="'/live?router=live&type='+(item.type==0?'football':'basketball')+'&id='+item.match_id+'&uid=' + item.uid"> -->
															<img
																src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAhFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8g2+bRAAAAK3RSTlMA+g400D/HfWTgWusi9gvx7dSn3alXSy+OGBSQhsG3npZwUAewgUY6bOZHJ9ipHQAAA1lJREFUaN6s1+lysjAUBuCXQNmhQNncl1bbb3L/9/dNTqCZMhoT4PnR6ox6krMkCjPMjW+170WJ4ySR59e32GVYC2t7jz/g9e0KQVh4cPhTziFcFqOtM/5CVreYKy6nCy6isoyK6ZbKGHOEH1yJqqDpcgzyrgmqiCsfIWx9q7q+V2GKB9KwelcV/4aN7ek3K8cmx1N5c/zN12kLY9diXPx+gxc2+3EbxRVmPnsuJQGDARYkXOo/YSD1h+TsGAyx3ZAoP8VLbjK8toOFzh827eKFeyaXf4Gli9xEdodW7Mi+dmHN/ZBLi7Wfz8kXwwzsixNNhLtc/xkzneUe7k83KfMfYLZA1sF90p+yf36wwI/spfThfPlq/Uv34D+auJ0m/9Z16B+cP7J/sJjspSsmtgX1/xqXLM1DMT1bT9RgLlbgUrOfJvcLFy5YxYULf28gj2qPlVA/eoASUoI6rKSjJIVQqC47rGZHHTM54xKG1bDk76lXakZ4wUCXGLR0vzOsiNE3gRZSLZ7ssaq9+Mx6iJaJFtpAJ93CzkY0UsZUjx61r/Y49++wclSdehAPG2h4nNbgwkIj3nKgDDmixLkuP3xQpzCWizI7bOyhChpvfOScNzBVjX3UU7L0AZRsz2CGStuPCU6NApDiksNEOpx4TPyPYBiA/Athgn6hMLhUAvMApLyaFsGVB11gE4D4b2bnUYwbTYFtABoLk0m4yYOosw1AqhQ6HY2OvN5yqwCGY5FTKqlLHdgGUGOhWZtDfRqJ1rYOoHhbPFPQACT0d34AXmkHIaF9lLMDaFdXUvYXBzjoAyxOUfa/WWtJQRiGgiNRKhKr4qa2StEoWu9/QBHBbea9MDQ3KE0y/1XmFxUe8uGJzCEXXdNpnZC5piUPbd+0yD40P1Rszz0IqPCC3WI8gQI7J1zfI0i4dhHOJYAmHAdlLt8wUKaZ9I8bwED6VtkyvRJMsoUSXuGfPzYtjMKLko7Y/S5+18MsHTnxe/t+wxhhF7+kfEd4XCM88p02IIDPgMgtlN4E6m2s3ojrowR9GKKPc/SBlD5S04eC+lgT6ATBrDBaVofj6nhfXVCoKxZ1SaSuudRF3fxVI5AGb1k6pDrqXndhXVPlbh8N1Dh74IcbNU9P9OOZ8vnPBxkKMfzzjMchAAAAAElFTkSuQmCC">
														</a>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div v-if="query.type == 'football'" class="match-progress">
								<div class="left" v-if="item.home_data">
									<div class="item">
										<span class="item-left-info">{{item.home_data[5]}}</span>
										<div class="barBox">
											<div
												class=" ant-progress ant-progress-line ant-progress-status-normal ant-progress-default bar-1 ">
												<div class="ant-progress-outer">
													<div class="ant-progress-inner">
														<div class="ant-progress-bg"
															:style="{width:num(item.home_data[5],item.away_data[5]) + '%'}"
															style=" height: 6px; background: rgb(255, 195, 195); ">
														</div>
													</div>
												</div>
											</div>
											<span class="tit">控球</span>
											<div
												class=" ant-progress ant-progress-line ant-progress-status-normal ant-progress-default bar-2 ">
												<div class="ant-progress-outer">
													<div class="ant-progress-inner">
														<div class="ant-progress-bg"
															:style="{width:num(item.away_data[5],item.home_data[5]) + '%'}"
															style=" height: 6px; background: rgb(65, 133, 255); "></div>
													</div>
												</div>
											</div>
										</div>
										<span class="item-right-info">{{item.away_data[5]}}</span>
									</div>
									<div class="item">
										<span class="item-left-info">{{item.home_data[6]}}</span>
										<div class="barBox">
											<div
												class=" ant-progress ant-progress-line ant-progress-status-normal ant-progress-default bar-1 ">
												<div class="ant-progress-outer">
													<div class="ant-progress-inner">
														<div class="ant-progress-bg"
															:style="{width:num(item.home_data[6],item.away_data[6]) + '%'}"
															style=" width: 43.75%; height: 6px; background: rgb(255, 195, 195); ">
														</div>
													</div>
												</div>
											</div>
											<span class="tit">射正</span>
											<div
												class=" ant-progress ant-progress-line ant-progress-status-normal ant-progress-default bar-2 ">
												<div class="ant-progress-outer">
													<div class="ant-progress-inner">
														<div class="ant-progress-bg"
															:style="{width:num(item.away_data[6],item.home_data[6]) + '%'}"
															style=" width: 56.25%; height: 6px; background: rgb(65, 133, 255); ">
														</div>
													</div>
												</div>
											</div>
										</div>
										<span class="item-right-info">{{item.away_data[6]}}</span>
									</div>
									<div class="item">
										<span class="item-left-info">{{item.home_data[2]}}</span>
										<div class="barBox">
											<div
												class=" ant-progress ant-progress-line ant-progress-status-normal ant-progress-default bar-1 ">
												<div class="ant-progress-outer">
													<div class="ant-progress-inner">
														<div class="ant-progress-bg"
															:style="{width:num(item.home_data[2],item.away_data[2]) + '%'}"
															style=" width: 50%; height: 6px; background: rgb(255, 93, 93); ">
														</div>
													</div>
												</div>
											</div>
											<span class="tit">红牌</span>
											<div
												class=" ant-progress ant-progress-line ant-progress-status-normal ant-progress-default bar-2 ">
												<div class="ant-progress-outer">
													<div class="ant-progress-inner">
														<div class="ant-progress-bg"
															:style="{width:num(item.away_data[2],item.home_data[2]) + '%'}"
															style=" width: 50%; height: 6px; background: rgb(65, 133, 255); ">
														</div>
													</div>
												</div>
											</div>
										</div>
										<span class="item-right-info">{{item.away_data[2]}}</span>
									</div>
								</div>
								<div class="divide"></div>
								<div class="right" v-if="item.home_data">
									<div class="item">
										<span class="item-left-info">{{item.home_data[3]}}</span>
										<div class="barBox">
											<div
												class=" ant-progress ant-progress-line ant-progress-status-normal ant-progress-default bar-1 ">
												<div class="ant-progress-outer">
													<div class="ant-progress-inner">
														<div class="ant-progress-bg"
															:style="{width:num(item.home_data[3],item.away_data[3]) + '%'}"
															style=" width: 46.1538%; height: 6px; background: rgb(255, 195, 195); ">
														</div>
													</div>
												</div>
											</div>
											<span class="tit">进攻</span>
											<div
												class=" ant-progress ant-progress-line ant-progress-status-normal ant-progress-default bar-2 ">
												<div class="ant-progress-outer">
													<div class="ant-progress-inner">
														<div class="ant-progress-bg"
															:style="{width:num(item.away_data[3],item.home_data[3]) + '%'}"
															style=" width: 53.8462%; height: 6px; background: rgb(65, 133, 255); ">
														</div>
													</div>
												</div>
											</div>
										</div>
										<span class="item-right-info">{{item.away_data[3]}}</span>
									</div>
									<div class="item">
										<span class="item-left-info">{{item.home_data[8]}}</span>
										<div class="barBox">
											<div
												class=" ant-progress ant-progress-line ant-progress-status-normal ant-progress-default bar-1 ">
												<div class="ant-progress-outer">
													<div class="ant-progress-inner">
														<div class="ant-progress-bg"
															:style="{width:num(item.home_data[8],item.away_data[8]) + '%'}"
															style=" width: 44.4444%; height: 6px; background: rgb(255, 195, 195); ">
														</div>
													</div>
												</div>
											</div>
											<span class="tit">角球</span>
											<div
												class=" ant-progress ant-progress-line ant-progress-status-normal ant-progress-default bar-2 ">
												<div class="ant-progress-outer">
													<div class="ant-progress-inner">
														<div class="ant-progress-bg"
															:style="{width:num(item.away_data[8],item.home_data[8]) + '%'}"
															style=" width: 55.5556%; height: 6px; background: rgb(65, 133, 255); ">
														</div>
													</div>
												</div>
											</div>
										</div>
										<span class="item-right-info">{{item.away_data[8]}}</span>
									</div>
									<div class="item">
										<span class="item-left-info">{{item.home_data[1]}}</span>
										<div class="barBox">
											<div
												class=" ant-progress ant-progress-line ant-progress-status-normal ant-progress-default bar-1 ">
												<div class="ant-progress-outer">
													<div class="ant-progress-inner">
														<div class="ant-progress-bg"
															:style="{width:num(item.home_data[1],item.away_data[1]) + '%'}"
															style=" width: 50%; height: 6px; background: rgb(255, 93, 93); ">
														</div>
													</div>
												</div>
											</div>
											<span class="tit">黄牌</span>
											<div
												class=" ant-progress ant-progress-line ant-progress-status-normal ant-progress-default bar-2 ">
												<div class="ant-progress-outer">
													<div class="ant-progress-inner">
														<div class="ant-progress-bg"
															:style="{width:num(item.away_data[1],item.home_data[1]) + '%'}"
															style=" width: 50%; height: 6px; background: rgb(65, 133, 255); ">
														</div>
													</div>
												</div>
											</div>
										</div>
										<span class="item-right-info">{{item.away_data[1]}}</span>
									</div>
								</div>
							</div>
							<liveBar v-else :item="item"></liveBar>
							
						</div>
						<!-- <div class="btn-group" style="z-index: 20;">
							<div class="item " :class="{'active-btn':liveIndex == 0}" @click="liveIndex = 0">
								<span class="dh"></span><span>动画直播</span>
							</div>
							<div class="item" :class="{'active-btn':liveIndex == 1}"  @click="liveIndex = 1">
								<span class="sp"></span><span>视频直播</span>
							</div>
						</div> -->
					</div>
				</div>
				<chatRoom :roomid="roomid" :qsVid="query.vid"></chatRoom>

			</div>
			<div class="live-main-down-wrap">
				<div class="group-match-info">
					<div class="statistic-match-container">
						<div class="ant-tabs ant-tabs-top">
							<div role="tablist" class="ant-tabs-nav">
								<div class="ant-tabs-nav-wrap">
									<div class="ant-tabs-nav-list" style="transform: translate(0px, 0px)">
										<div class="ant-tabs-tab" v-for="(li,index) in tabList" :key="index"
											:class="tabindex == index ? 'ant-tabs-tab-active' : ''">
											<div class="ant-tabs-tab-btn" @click="tabindex = index">
												{{li}}
											</div>
										</div>
										<div class="ant-tabs-ink-bar ant-tabs-ink-bar-animated"
											style="left: 641px; width: 213px"></div>
									</div>
								</div>
								<div class="ant-tabs-nav-operations ant-tabs-nav-operations-hidden">
									<button type="button" class="ant-tabs-nav-more" style="visibility: hidden; order: 1"
										tabindex="-1" aria-hidden="true" aria-haspopup="listbox"
										aria-controls="rc-tabs-0-more-popup" id="rc-tabs-0-more" aria-expanded="false">
										<span role="img" aria-label="ellipsis" class="anticon anticon-ellipsis"></span>
									</button>
								</div>
							</div>
							<div class="ant-tabs-content-holder">
								<div class="ant-tabs-content ant-tabs-content-top" v-loading="loading">
									<live4 v-show="tabindex == 0 && query.type == 'basketball'" :item="listArr"></live4>
									<live0 v-show="tabindex == 0 && query.type == 'football'" :item="item"></live0>
									<live1 v-show="tabindex == 1 && query.type == 'football'" :item="item"></live1>
									<live5 v-if="tabindex == 1 && query.type == 'basketball'" :item="item"></live5>
									<live2 v-show="tabindex == 2" :item="list" :list="item" :statistical="statistical">
									</live2>
									<live3 v-if="tabindex == 3" :item="item" :list="list"></live3>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="group-integral-info" style="overflow-y: scroll;">
					<div class="integral-group-container">
						<ul class="nav">
							<li class="" :class="navIndex == 0?'active':''" @click="navIndex = 0">积分</li>
							<li class="" :class="navIndex == 1?'active':''" @click="navIndex = 1">头条</li>
						</ul>
						<div class="article-list-box" v-if="navIndex == 1">
							<div class="list-box" style="margin-top: 0px; padding-bottom: 15px;">
								<router-link tag="a" v-if="index<6" target="_blank" class="grid-header-right-more"
									:to="'/detail?id=' + item.id" v-for="(item,index) in headList.data" :key="index">
									<div class="list-item">
										<div class="left">
											<div class="lazyload-wrapper ">
												<img :src="item.img" :alt="item.title" width="180" height="120"
													:title="item.title">
											</div>
										</div>
										<div class="right">
											<div class="box1">{{item.title}}</div>
											<div class="box2">{{item.addtime}}</div>
										</div>
									</div>
								</router-link>
							</div>
							<el-empty v-if="headList.total == 0" :image-size="300"
								:image="require('../../assets/images/qsy.png')"></el-empty>
						</div>
						<div class="integral-football-table" v-if="navIndex != 1 && query.type == 'football'">
							<div class="title">
								<div class="title-one width130">排名/球队</div>
								<div class="title-two">胜/平/负</div>
								<div class="title-three width60">进/失</div>
								<div class="title-four width40">积分</div>
							</div>
							<ul class="content" v-if="rankingList.group == 0">
								<li class="item" v-for="(item1,index) in rankingList.list" :key="index">
									<div class="con-one width130">
										<div class="rank color-f55b5b">{{item1.position}}</div>
										<img :src="item1.logo" alt="" />
										<div class="name ellipsis">{{item1.name}}</div>
									</div>
									<div class="con-two">{{item1.won}}/{{item1.draw}}/{{item1.loss}}</div>
									<div class="con-three width60">{{item1.goals}}/{{item1.goals_against}}</div>
									<div class="con-four width40">{{item1.points}}</div>
								</li>
								<el-empty v-if="rankingList.list.length == 0" :image-size="300"
									:image="require('../../assets/images/qsy.png')"></el-empty>
							</ul>
							<div id="" v-else>
								<ul class="content" style="height: auto;" v-for="(item,i,index) in rankingList.list"
									:key="index">
									<li style="text-align: center;">{{i}}</li>
									<li class="item" v-for="(item1,index) in item" :key="index">
										<div class="con-one width130">
											<div class="rank color-f55b5b">{{item1.position}}</div>
											<img :src="item1.logo" alt="" />
											<div class="name ellipsis">{{item1.name}}</div>
										</div>
										<div class="con-two">{{item1.won}}/{{item1.draw}}/{{item1.loss}}</div>
										<div class="con-three width60">{{item1.goals}}/{{item1.goals_against}}</div>
										<div class="con-four width40">{{item1.points}}</div>
									</li>
									<el-empty v-if="rankingList.list.length == 0" :image-size="300"
										:image="require('../../assets/images/qsy.png')"></el-empty>
								</ul>
							</div>

						</div>
						<div class="integral-basketball-table" v-if="navIndex != 1 && query.type == 'basketball'">
							<div class="title">
								<div class="title-index">#</div>
								<div class="title-one width120">球队</div>
								<div class="title-two">胜/负</div>
								<div class="title-three width60">胜率</div>
								<div class="title-four width40">胜差</div>
							</div>
							<ul class="content" v-if="rankingList.group == 0">
								<el-empty v-if="rankingList.list.length == 0" :image-size="300"
									:image="require('../../assets/images/qsy.png')"></el-empty>
								<div>
									<!-- <li class="item item-title">全美国家大学体育联赛</li> -->
									<li class="item" v-for="(item1,index) in rankingList" :key="index">
										<div class="con-one width120">
											<div class="rank color-f55b5b">{{item1.position}}</div><img
												:src="item1.logo" alt="">
											<div class="name ellipsis">{{item1.name}}</div>
										</div>
										<div class="con-two">{{item1.won}}/{{item1.loss}}</div>
										<div class="con-three width60">{{item1.won_rate}}</div>
										<div class="con-four width40">{{item1.game_back || '-'}}</div>
									</li>

								</div>
							</ul>
							<ul class="content" v-else>
								<el-empty v-if="rankingList.list.length == 0" :image-size="300"
									:image="require('../../assets/images/qsy.png')"></el-empty>
								<div v-for="(item,i,index) in rankingList.list" :key="index">
									<li class="item item-title">i</li>
									<li class="item" v-for="(item1,index) in item" :key="index">
										<div class="con-one width120">
											<div class="rank color-f55b5b">{{item1.position}}</div><img
												:src="item1.logo" alt="">
											<div class="name ellipsis">{{item1.name}}</div>
										</div>
										<div class="con-two">{{item1.won}}/{{item1.loss}}</div>
										<div class="con-three width60">{{item1.won_rate}}</div>
										<div class="con-four width40">{{item1.game_back || '-'}}</div>
									</li>

								</div>
							</ul>
						</div>

					</div>
				</div>
			</div>
		</div>
		<!-- 下载弹框 -->
		<downLoadModel v-if="showDownLoadModel" @close="showDownLoadModel = false" ></downLoadModel>
	</div>
</template>

<script>
	import {
		getInfo
	} from "@/api/basketball.js";
	import {
		getfootballDetail,
		getSquad
	} from "@/api/football.js";
	import {
		getList,
		ranking
	} from "@/api/headline.js";
	import {
		recordUsageTime,
		getLiveList,
	} from '../../api/user.js'
	import live0 from "./live-0.vue";
	import live1 from "./live-1.vue";
	import live2 from "./live-2.vue";
	import live3 from "./live-3.vue";
	import live4 from "./live-4.vue";
	import live5 from "./live-5.vue";
	import liveTv from '../anchor/live-tv.vue';
	import chatRoom from "./chatRoom.vue";
	import liveBar from "./live-bar.vue";
	import downLoadModel from '@/components/downLoadModel.vue'
	export default {
		components: {
			live0,
			live1,
			live2,
			live3,
			live4,
			live5,
			liveTv,
			liveBar,
			chatRoom
		},
		// props:["qsVid"],
		data() {
			return {
				showDownLoadModel:false,
				timerNum:0,
				timer:null,
				list: {},
				tech2: {},
				tech1: {},
				liveIndex:0,
				servertime:null,//服务器时间
				details:"",//赛事详情
				starttime:null,//比赛开时间
				counttDown: 0, //开赛倒计时
				counttDownDay:[], //开赛倒计时分秒
				liveList:[],
				item: {
					obj: {
						eu: {
							scram: {
								win: 0,
								draw: 0,
								fail: 0,
								timer: null
							},
							initial: {
								win: 0,
								draw: 0,
								fail: 0,
								timer: null
							},
							immediate: {
								win: 0,
								draw: 0,
								fail: 0,
								timer: null
							},
						},
						cr: {
							scram: {
								win: 0,
								draw: 0,
								fail: 0,
								timer: null
							},
							initial: {
								win: 0,
								draw: 0,
								fail: 0,
								timer: null
							},
							immediate: {
								win: 0,
								draw: 0,
								fail: 0,
								timer: null
							},
						},
						bs: {
							scram: {
								win: 0,
								draw: 0,
								fail: 0,
								timer: null
							},
							initial: {
								win: 0,
								draw: 0,
								fail: 0,
								timer: null
							},
							immediate: {
								win: 0,
								draw: 0,
								fail: 0,
								timer: null
							},
						},
						asia: {
							scram: {
								win: 0,
								draw: 0,
								fail: 0,
								timer: null
							},
							initial: {
								win: 0,
								draw: 0,
								fail: 0,
								timer: null
							},
							immediate: {
								win: 0,
								draw: 0,
								fail: 0,
								timer: null
							},
						}




					},
					exponent: {}
				},
				// qsVid:'',
				roomid: '',
				navIndex: 0,
				query: {
					vid:'',
					competainId: 2
				},
				listArr: [],
				tabindex: 0,
				loading: false,
				statistical: [],
				tabList: [],
				headList: {}, //头条
				isloading: true,
				rankingList: {
					list: []
				}, //积分
				img: require("../../assets/images/live-top-bg.jpg"),
				timeInterval: null,
			};
		},
		watch: {
			"$store.state.football_exponent"(e) {
				let _this = this
				let obj = this.item.obj
				
				let exponent = this.item.exponent
				if (e.type == 'football_match' && this.query.id == e.id) {
					/* 阻止改变数据比分时改变指数-防止指数变动不改变样式 */
					e.exponent = this.item.exponent
					this.item = this.$common.assignDeep(this.item, e)
				} else if (e.type == 'football_exponent' && this.item.id == e.sourceid && e.company_id == this.query
					.competainId) {
					// console.log(e.exponent);
					/* 判断指数不同 */
					// console.log(obj[e.name][e.name1]);
					if (obj[e.name] != undefined) {
						obj[e.name][e.name1].draw = _this.setExp(Number(exponent[e.name][e.name1].draw), Number(e.exponent[e
							.name][e.name1].draw))
						obj[e.name][e.name1].fail = _this.setExp(Number(exponent[e.name][e.name1].fail), Number(e.exponent[e
							.name][e.name1].fail))
						obj[e.name][e.name1].win = _this.setExp(Number(exponent[e.name][e.name1].win), Number(e.exponent[e.name]
							[e.name1].win))
						obj[e.name][e.name1].cr = _this.setExp(Number(exponent[e.name][e.name1].cr), Number(e.exponent[e.name][e
							.name1
						].cr))
						// if (obj[e.name][e.name1].timer == null) {
							 setTimeout(res => {
								obj[e.name][e.name1].draw = 0
								obj[e.name][e.name1].fail = 0
								obj[e.name][e.name1].win = 0
								obj[e.name][e.name1].timer = null
							}, 3000)
						// } else {
						// 	clearTimeout(obj[e.name][e.name1].timer);
						// 	obj[e.name][e.name1].timer = null
						// }
					}

					// console.log(JSON.parse(JSON.stringify(obj)));

					this.item.exponent = _this.$common.assignDeep(this.item.exponent, e.exponent)
					// this.item.exponent = {
					// 	...this.item.exponent,
					// 	...e.exponent
					// }
					// this.item =this.$common.assignDeep(this.item.exponent,e.exponent)
					// console.log(this.item.exponent);
				}
			},
			tabindex(e) {
				if (e == 3) {
					this.getSquadDetail(this.query.id)
				}
			}
		},
				beforeDestroy(){
				if (this.timer) {
				clearInterval(this.timer)
				this.timer = null;
			}
		},
		created() {
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
			this.loading = true
			let query = this.$route.query;
			this.query = {
				...this.query,
				...query
			};
			let id = ''
			if (query.type == 'basketball') {
				id = 'b' + query.id
				this.tabList = [' 事件直播 ', ' 球队统计 ']
			} else {
				id = 'f' + query.id
				this.tabList = [' 事件直播 ', ' 赛况统计 ', ' 球队统计 ', ' 出场阵容 ']
			}

			this.roomid = id
			// this.$store.state.loading = true
			// console.log(this.$store.state)
			// this.ranking()
			this.getDetail(query.type, query.id);
			// setInterval(res => {
			// 	this.getDetail(query.type, query.id);
			// }, 60000)
			setTimeout(res => {
				this.loading = false
				this.$WebSocket.send({
					type: "toggle",
					"company_id": query.competainId
				}, '', '')
				this.$WebSocket.send({
					type: "classify",
					classify_type: query.type == 'basketball' ? 1 : 0
				}, '', '')
			}, 2000)

			//setTimeout(res => {
				//this.$store.dispatch('loginTim', '')

			//}, 500)
			setTimeout(res => {
				this.$store.dispatch('joinGroup', {
					id: id
				})
			}, 1000)
		},
		mounted() {
			this.getLiveList()
			setTimeout(res => {
				this.init()
			}, 1000)
			// console.log('')
			// if(JSON.stringify(this.infos) == '{}') {
			// 	return this.$message.success('登录后可进行球')
			// }
			this.recordUsageTime();
			this.timeInterval = setInterval(() => {
				this.recordUsageTime();
			}, 60000)
		},
		computed: {
			infos() {
				return this.$store.state.infos
			}
		},
		methods: {
			// 开启websocket
			init() {
				//发起websocket连接
				let config = {}
				this.$WebSocket.WebSocketFn((res, config) => {
					if (!res) return;
					this.retundata();
					this.onclose();
				});
			},
						// 获取相关直播
			getLiveList() {
				let data = {
					page: 1,
					type: -1, //-1全部 0足球 1篮球 2其他
					limit:5
				}
				getLiveList(data).then(res => {
					this.liveList = res.data.data
				}).catch(res => {})
			},
			// 设置首页播放的按钮
			setUrl(item){
				// localStorage.setItem('index',2)
				let url = '/live?router=live&type='+(item.type==0?'football':'basketball')+'&id='+item.match_id+'&uid=' + item.uid+'&vid=' + item.vid
				// return url
				// localStorage.setItem('index', type)
				// this.$router.push('/schedule')
				// console.log(url,type);
				// return
				let routeData = this.$router.resolve({ path:url})
				window.open(routeData.href,'_blank')
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
			// 积分榜
			ranking() {
				let data = {
					id: this.query.id
				}
				if (this.query.type == 'football') {
					data.type = 0
				} else {
					data.type = 1
				}
				ranking(data).then(res => {
					this.rankingList = res.data
					console.log(res.data);
				}).catch(res => {})
			},
			// 获取头条
			getHeadList(id) {
				getList({
					id: id
				}).then(res => {
					this.headList = res.data.list
				}).catch(res => {})
			},

			// 获取出场阵容
			getSquadDetail(id) {
				getSquad({
					id: id
				}).then(res => {
					this.list = res.data
				}).catch(res => {})
			},
			getStatus(type) {
				if (type == 'goals') {
					return '进球'
				} else if (type == 'penalty') {
					return '点球'
				} else if (type == 'dribble') {
					return '过人'
				} else if (type == 'dribble_succ') {
					return '过人成功'
				} else if (type == 'clearances') {
					return '解围'
				} else if (type == 'blocked_shots') {
					return '有效阻挡'
				} else if (type == 'interceptions') {
					return '拦截'
				} else if (type == 'tackles') {
					return '抢断'
				} else if (type == 'tackles') {
					return '传球'
				} else if (type == 'passes') {
					return '传球成功'
				} else if (type == 'key_passes') {
					return '关键传球'
				} else if (type == 'crosses') {
					return '传中球'
				} else if (type == 'crosses_accuracy') {
					return '传中球成功'
				} else if (type == 'long_balls') {
					return '长传'
				} else if (type == 'long_balls_accuracy') {
					return '成功长传'
				} else if (type == 'duels') {
					return '拼抢'
				} else if (type == 'duels_won') {
					return '1对1拼抢成功'
				} else if (type == 'dispossessed') {
					return '丢球'
				} else if (type == 'fouls') {
					return '犯规'
				} else if (type == 'was_fouled') {
					return '被侵犯'
				} else if (type == 'offsides') {
					return '越位'
				} else if (type == 'yellow2red_cards') {
					return '两黄变红'
				} else if (type == 'saves') {
					return '扑救'
				} else if (type == 'punches') {
					return '拳击球'
				} else if (type == 'runs_out') {
					return '守门员出击'
				} else if (type == 'runs_out_succ') {
					return '守门员出击成功'
				} else {
					return '高空出击'
				}
			},
			num(num1, num2) {
				if (num1 == 0 && num2 == 0) {
					return 0
				} else if (num1 == num2 && num1 != 0 && num2 != 0) {
					return 50
				} else {
					// console.log(num2 / (num1 + num2))
					return num1 / (num1 + num2) * 100
				}
			},
			// 修改状态
			getStatus1(type, item) {
				if (type == 1) {
					return '未'
				} else if (type == 2) {
					return '上-' + item.match_str
				} else if (type == 3) {
					return '中'
				} else if (type == 4) {
					return '下-' + item.match_str
				} else if (type == 5) {
					return '加' + item.match_str
				} else if (type == 7) {
					return '点球决战-' + item.match_str
				} else if (type == 8) {
					return '完'
				}
				// 1.未开赛 2.上半场 3.中场 4.下半场 5.加时赛 7.点球决战 8.完场
			},
			// 1相等 ， 2 大于 ，3小于
			setExp(num1, num2) {
				if (num1 == num2) {
					console.log("true: ",true);
					return 0
				} else {
					return 1
				}

				// if (num1 < num2) {
				// 	return 3
				// } else if (num1 > num2) {
				// 	return 2
				// } else if (num1 == num2) {
				// 	return 1
				// }


			},
			//   获取详情
			getDetail(type, id) {
				let data = {
					id: id,
				};

				let _this = this

				if (type == "basketball") {
					//篮球
					getInfo(data)
						.then((res) => {
							console.log('获取的详情')
							console.log(res.data)
							// res.data.tlive = res.data.tlive.reverse()
							
							this.details=res.data
							this.servertime=res.data.servertime
							this.starttime=res.data.starttime
							// console.log(this.starttime-this.servertime+"倒计时")
							// if ((this.starttime)-(this.servertime)>0&&(this.starttime)>0 &&this.details.pushurl1) {
							if ((this.starttime)-(this.servertime)>0&&(this.starttime)>0 ) {
								this.counttDown=(this.starttime)-(this.servertime)
								// this.counttDown=10
								//切换赛事先卸载定时器从新加载定时器
								clearInterval(this.timeInterval)
								this.Iime()
							}else{
								this.counttDown=false
								this.item = this.details;
							}
							let arr = res.data.tlive
							let listArr = []
							arr.forEach(item1 => {
								item1.forEach(item2 => {
									listArr.push(item2)
								})
							})


							// _this.$store.state.loading = false
							this.listArr = listArr
							this.getHeadList(res.data.competition_id)
							// console.log(this.item);
						})
						.catch((res) => {});
				} else {
					//足球
					getfootballDetail(data)
						.then((res) => {
							console.log('获取的详情')
							console.log(res.data)
							res.data.tlive = res.data.tlive.reverse()
							let obj = {
								eu: {
									scram: {
										win: 0,
										draw: 0,
										fail: 0,
										timer: null
									},
									initial: {
										win: 0,
										draw: 0,
										fail: 0,
										timer: null
									},
									immediate: {
										win: 0,
										draw: 0,
										fail: 0,
										timer: null
									},
								},
								cr: {
									scram: {
										win: 0,
										draw: 0,
										fail: 0,
										timer: null
									},
									initial: {
										win: 0,
										draw: 0,
										fail: 0,
										timer: null
									},
									immediate: {
										win: 0,
										draw: 0,
										fail: 0,
										timer: null
									},
								},
								bs: {
									scram: {
										win: 0,
										draw: 0,
										fail: 0,
										timer: null
									},
									initial: {
										win: 0,
										draw: 0,
										fail: 0,
										timer: null
									},
									immediate: {
										win: 0,
										draw: 0,
										fail: 0,
										timer: null
									},
								},
								asia: {
									scram: {
										win: 0,
										draw: 0,
										fail: 0,
										timer: null
									},
									initial: {
										win: 0,
										draw: 0,
										fail: 0,
										timer: null
									},
									immediate: {
										win: 0,
										draw: 0,
										fail: 0,
										timer: null
									},
								}



							}
							res.data.pull = res.data.pushurl1
							this.item.obj = obj
							this.details=res.data
							this.servertime=res.data.servertime
							this.starttime=res.data.starttime
							// console.log(this.starttime-this.servertime+"倒计时123")
							// if ((this.starttime)-(this.servertime)>0&&(this.starttime)>0 &&this.details.pushurl1) {
							if ((this.starttime)-(this.servertime)>0&&(this.starttime)>0 ) {
								this.counttDown=(this.starttime)-(this.servertime)
								// this.counttDown=10
								//切换赛事先卸载定时器从新加载定时器
								clearInterval(this.timeInterval)
								this.Iime()
							}else{
								this.counttDown=false
								this.item = {
									...this.item,
									...this.details
								}
							}
							let technology = res.data.technology
							this.tech1 = technology[0]
							this.tech2 = technology[1]
							let arr = []
							this.ranking()
							// console.log(technology[0])
							for (let i in technology[0]) {
								for (let b in technology[1]) {
									if (i == b) {
										let obj = {
											name: '',
											num1: '',
											num2: '',
											name1: '',
											progress1: '',
											progress2: ''
										}
										obj.name = _this.getStatus(i)
										if (technology[0][i] > technology[1][b]) {
											obj.progress1 = technology[0][i] / (technology[0][i] + technology[1][b]) *
												100
											obj.progress2 = technology[1][b] / (technology[0][i] + technology[1][b]) *
												100
										} else if (technology[0][i] == 0 && technology[1][b] == 0) {
											obj.progress1 = 0
											obj.progress2 = 0
										} else {
											obj.progress1 = technology[1][b] / (technology[0][i] + technology[1][b]) *
												100
											obj.progress2 = technology[0][i] / (technology[0][i] + technology[1][b]) *
												100
										}
										// console.log(technology[0][i] + '----' + technology[1][b])
										obj.num1 = technology[0][i]
										obj.num2 = technology[1][b]
										arr.push(obj)
									}
								}

							}

							this.getHeadList(res.data.competition_id)
							// _this.$store.state.loading = false
							this.statistical = arr

						})
						.catch((res) => {});
				}
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
								// console.log(date)
				this.counttDownDay=date
			},
			Iime(){
				this.timeInterval =setInterval(()=>{
					if(this.counttDown>0){
						this.counttDown-=1
						this.counttDownF()
					}else if(this.counttDown===0){
						//倒计时结束隐藏倒计时并拉流直播，结束定时器
						this.counttDown=0
						this.item = this.details
						clearInterval(this.timeInterval)
					}
					
				},1000)
			},
			// // 服务器时间倒计时
			// servertimeDate(times){
			// 	this.timeIntervals =setInterval(()=>{
			// 		if(times>0){
			// 		this.servertime=times+=1
			// 		}
			// 	},1000)
			// },
		}, 
		destroyed(){
			clearInterval(this.timeInterval)
		}
	};
</script>

<style scoped="scoped">
	@import url("../../styles/style.css");

	.ellipsis {
		object-fit: contain;
	}

	.blue-t {
		color: #1296db;
	}

	.point-animation:after {
		color: #FF4100;
	}
	.counttDownShow{
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
	.recommd-list {
		margin-top: 20px;
		display: flex;
		justify-content: center;
		width: 100%
	}

	.recommd-list>div {
		width: 25%;
		padding: 0 10px
	}

	.recommd-list>div>div {
		position: relative
	}

	.recommd-list>div>div:before {
		content: "";
		display: block;
		padding-top: 58%
	}

	.recommd-list>div>div>div {
		position: absolute;
		left: 0;
		top: 0;
		border-radius: 5px;
		background-size: cover;
		background-position: 50%;
		background-repeat: no-repeat;
		cursor: pointer;
		width: 100%;
		height: 100%;
		overflow: hidden
	}

	.recommd-list .recommd-list-item .type {
		width: 50px;
		height: 25px;
		line-height: 25px;
		text-align: center;
		font-size: 12px;
		color: #fff;
		background-size: cover;
		background-position: 50%;
		background-repeat: no-repeat
	}

	.recommd-list .recommd-list-item .footer {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		position: absolute;
		padding: 0 10px;
		left: 0;
		right: 0;
		bottom: 0;
		height: 55px;
		background-image: linear-gradient(180deg, transparent -29%, #000)
	}

	.recommd-list .recommd-list-item .footer .title {
		display: inline-block;
		width: 180px;
		height: 36px;
		line-height: 36px;
		font-size: 14px;
		color: #fff;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap
	}

	.recommd-list .recommd-list-item .footer .status {
		display: inline-block;
		margin-left: 5px;
		margin-bottom: 10px;
		width: 50px;
		height: 18px;
		font-size: 12px;
		border-radius: 10px;
		border: 1px solid #ff5d5d;
		background-color: rgba(0, 0, 0, .5);
		color: #ff5d5d;
		line-height: 16px;
		text-align: center
	}

	.recommd-list .recommd-list-item .mark {
		display: none;
		position: absolute;
		background-color: rgba(0, 0, 0, .4);
		cursor: pointer;
		width: 100%;
		height: 100%
	}

	.recommd-list .recommd-list-item .mark img {
		display: block;
		width: 55px;
		height: 55px;
		top: 20px
	}

	.recommd-list .recommd-list-item:hover .mark {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column
	}

	.recommd-list .recommd-list-item:hover .mark img {
		width: 40px;
		height: 40px;
		margin-bottom: 25px
	}
</style>
