<template>
	<article class="football-score-container" ref="scroll">
		<!--  -->
		<div v-if="fightMask" class="pop-tip-handicap" style="position:fixed;" :style="{left: left,top: top}">
			<div class="pop-header">
				<div class="left">
					<p class="team-name text-right opacity">
						{{lang==1?exponent.home_team_name_zht:lang==2?exponent.home_team_name_en:exponent.home_team_name_zh}}
					</p>
					<p class="vs">
						<span class="opacity">{{exponent.home_score}}</span><span>-</span><span
							class="">{{exponent.away_score}}</span>
					</p>
					<p class="team-name">
						{{lang==1?exponent.away_team_name_zht:lang==2?exponent.away_team_name_en:exponent.away_team_name_zh}}
					</p>
				</div>
				<a target="_blank" href="/score-detail/three?matchId=undefined&amp;sportId=1">
					<div style=" display: inline-block; max-width: 100%; overflow: hidden; position: relative; box-sizing: border-box; margin: 0px; "> <!-- <div style="box-sizing: border-box; display: block; max-width: 100%" @click="setId(item)">
							<img alt="" :src="footList.indexOf(item.id) == -1?require('@/assets/images/check.png'):require('@/assets/images/check1.png')" style="" />
						</div> -->

					</div>
				</a>
			</div>
			<div class="table">
				<div class="col_one">
					<div class="item bg-color">盘</div>
					<div class="item color-000">初盘</div>
					<div class="item color-000">即时</div>
					<div class="item color-000">滚球</div>
				</div>
				<div class="col_two">
					<div class="item title bg-color">让球指数</div>
					<div class="item chupan" v-if="expIndex.asia.initial.sealing_disk != 1">
						<div class="left"><span class="val">{{expIndex.asia.initial.win}}</span></div>
						<div class="middle"><span class="val">{{expIndex.asia.initial.draw}}</span></div>
						<div class="right"><span class="val">{{expIndex.asia.initial.fail}}</span></div>
					</div>
					<div class="item chupan" v-else>
						封
					</div>
					<div class="item jishi" v-if="expIndex.asia.immediate.sealing_disk != 1">
						<div class="left"><span class="val">{{expIndex.asia.immediate.win}}</span></div>
						<div class="middle"><span class="val">{{expIndex.asia.immediate.draw}}</span></div>
						<div class="right"><span class="val">{{expIndex.asia.immediate.fail}}</span></div>
					</div>
					<div class="item chupan" v-else>
						封
					</div>
					<div class="item gunqiu" v-if="expIndex.asia.scram.sealing_disk != 1">
						<div class="left"><span class="val">{{expIndex.asia.scram.win}}</span></div>
						<div class="middle"><span class="val">{{expIndex.asia.scram.draw}}</span></div>
						<div class="right"><span class="val">{{expIndex.asia.scram.fail}}</span></div>
					</div>
					<div class="item chupan" v-else>
						封
					</div>
				</div>
				<div class="col_thr">
					<div class="item title bg-color">大小指数</div>
					<div class="item chupan" v-if="expIndex.bs.initial.sealing_disk != 1">
						<div class="left"><span class="val">{{expIndex.bs.initial.win}}</span></div>
						<div class="middle"><span class="val">{{expIndex.bs.initial.draw}}</span></div>
						<div class="right"><span class="val">{{expIndex.bs.initial.fail}}</span></div>
					</div>
					<div class="item chupan" v-else>
						封
					</div>
					<div class="item jishi" v-if="expIndex.bs.immediate.sealing_disk != 1">
						<div class="left"><span class="val">{{expIndex.bs.immediate.win}}</span></div>
						<div class="middle"><span class="val">{{expIndex.bs.immediate.draw}}</span></div>
						<div class="right"><span class="val">{{expIndex.bs.immediate.fail}}</span></div>
					</div>
					<div class="item chupan" v-else>
						封
					</div>
					<div class="item gunqiu" v-if="expIndex.bs.scram.sealing_disk != 1">
						<div class="left"><span class="val">{{expIndex.bs.scram.win}}</span></div>
						<div class="middle"><span class="val">{{expIndex.bs.scram.draw}}</span></div>
						<div class="right"><span class="val">{{expIndex.bs.scram.fail}}</span></div>
					</div>
					<div class="item chupan" v-else>
						封
					</div>

				</div>
				<div class="col_four">
					<div class="item title bg-color">欧赔</div>
					<div class="item chupan" v-if="expIndex.eu.initial.sealing_disk != 1">
						<div class="left"><span class="val">{{expIndex.eu.initial.win}}</span></div>
						<div class="middle"><span class="val">{{expIndex.eu.initial.draw}}</span></div>
						<div class="right"><span class="val">{{expIndex.eu.initial.fail}}</span></div>
					</div>
					<div class="item chupan" v-else>
						封
					</div>
					<div class="item jishi" v-if="expIndex.eu.immediate.sealing_disk != 1">
						<div class="left"><span class="val">{{expIndex.eu.immediate.win}}</span></div>
						<div class="middle"><span class="val">{{expIndex.eu.immediate.draw}}</span></div>
						<div class="right"><span class="val">{{expIndex.eu.immediate.fail}}</span></div>
					</div>
					<div class="item chupan" v-else>
						封
					</div>
					<div class="item gunqiu" v-if="expIndex.eu.scram.sealing_disk != 1">
						<div class="left"><span class="val">{{expIndex.eu.scram.win}}</span></div>
						<div class="middle"><span class="val">{{expIndex.eu.scram.draw}}</span></div>
						<div class="right"><span class="val">{{expIndex.eu.scram.fail}}</span></div>
					</div>
					<div class="item chupan" v-else>
						封
					</div>


				</div>
			</div>
		</div>
		<!-- -------------------置顶-------------------------- -->

		<section class="container-section" ref="complete0" id="going"
			style="box-shadow: rgb(238, 238, 238) 0px 1px 0px 0px inset">
			<ul>
				<li :data-index="index" :data-id="item.id" :ref="item.id" data-list="arrList4"
					v-for="(item, index) in arrList4" :key="item.id" class="football-score-item"
					:class="immediately.value4?'football-score-height-60':''">
					<div class="gou width40">
						<div
							style=" display: inline-block; max-width: 100%; overflow: hidden; position: relative; box-sizing: border-box; margin: 0px; ">
							<div style="box-sizing: border-box; display: block; max-width: 100%" @click="setId(item)">
								<img alt=""
									:src="footList.indexOf(item.id) == -1?require('@/assets/images/check.png'):require('@/assets/images/check1.png')"
									style="" />
							</div>
						</div>
					</div>
					<div class="match-field width93">
						<div class="football-league-name-container false" style="height: 44.5px">
							<div class="football-league-color-block" :style="{ background: item.primary_color }"></div>
							<div class="football-league-logo">
								<img class="football-league-logo-img" :src="item.competition_logo" width="56"
									height="56" />
							</div>
							<div class="league-name ellipsis search-by-team-name"
								v-html="lang==1?item.competition_name_zht:lang==2?item.competition_name_en:item.competition_name_zh">
								<!-- {{}} -->
							</div>
						</div>
					</div>
					<div class="time width32 text-center">{{ $common.timeStamp(item.time) }}</div>
					<div class="match-status width40 football-all-status">
						<span class="" v-if="item.status == 1 || item.status == 8">{{getStatus(item)}}</span>
						<span class="point-animation" v-else>{{getStatus(item)}}</span>
					</div>
					<div class="teamName-and-vs football-score-item-teamRank width420">
						<div class="team-info host-container width189">
							<img class="score-item-ball-left"
								src="/_next/static/images/icon-2@3x-1deeeb26605d34ec1ce25ebf3b18106d.png" alt="goal" />
							<div class="card red-card" v-if="item.home_red_card != 0 && game.red">
								{{ item.home_red_card }}
							</div>
							<div class="card yellow-card" v-if="item.home_yellow_card != 0 && game.yellow">
								{{ item.home_yellow_card }}
							</div>
							<div class="name ellipsis search-by-team-name"
								v-html="lang==1?item.home_team_name_zht:lang==2?item.home_team_name_en:item.home_team_name_zh">
								<!-- {{}} -->
							</div>
						</div>
						<!-- ----------------------------------------------------------------------------- -->

						<!-- <el-popover popper-class="popper" :close-delay="0" placement="right-start" trigger="hover">
							<exponent v-if="ishow && current == item.id" :tlive="tlive" :tliveLoading="tliveLoading"></exponent>
							<div class="vs width42" slot="reference" @mouseenter="mouseenter(index,4,item)">
								<span style="color: rgb(255, 67, 67)">{{ item.home_score || 0 }}</span>
								<span data-a="0" data-b="2" style="color: rgb(255, 67, 67)">-</span>
								<span style="color: rgb(255, 67, 67)">{{ item.away_score || 0 }}</span>
							</div>
						</el-popover> -->

						<div class="hover-box" @mouseenter="mouseenter(index,4,item)"
							@mouseleave="ishow = false,current = null">
							<div class="vs width42 bf" slot="reference">
								<span style="color: rgb(255, 67, 67)">{{ item.home_score || 0 }}</span>
								<span data-a="0" data-b="2" style="color: rgb(255, 67, 67)">-</span>
								<span style="color: rgb(255, 67, 67)">{{ item.away_score || 0  }}</span>
							</div>
							<div class="components-box">
								<exponent v-show="ishow && current == item.id" :tlive="tlive"
									:tliveLoading="tliveLoading"></exponent>
							</div>

						</div>

						<div class="team-info guest-container width189">
							<div class="name ellipsis search-by-team-name"
								v-html="lang==1?item.away_team_name_zht:lang==2?item.away_team_name_en:item.away_team_name_zh">
								<!-- {{}} -->
							</div>
							<div class="card yellow-card" v-if="item.away_yellow_card != 0 && game.red">
								{{ item.away_yellow_card }}
							</div>
							<div class="card red-card" v-if="item.away_red_card != 0 && game.yellow">
								{{ item.away_red_card }}
							</div>
							<img class="score-item-ball-right"
								src="/_next/static/images/icon-2@3x-1deeeb26605d34ec1ce25ebf3b18106d.png" alt="goal" />
						</div>
					</div>
					<div class="variable width554">
						<div class="immediate">
							<div class="model-one width180">
								<div class="half width66 text-center">
									<span>{{ item.half_score || '-' }}</span>
								</div>
								<div class="corner width48 text-left">
									<span>{{ item.corner_kick|| '-'  }}</span>
								</div>
								<div class="live">
									<div class="football-score-item-live">
										<router-link tag="a" target="_blank"
											:to="'/score-live?type=football&id='+item.id + '&competainId='+id+ '&vid=' + item.vid ">
											<div class="left">
												<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAqxJREFUWAntVk1oE0EUfm/SWLqHNhtREZSiBxGkoODJXqLFiyB4qgc9eLFNiiIK+TE5mIOB/CBUpEmkh+LFQ85evIjiQbGignch/iCCZmNsYtom83xjs4fSZtndhFx0YHZ237z3fd+8fTuzAP96QyqVPMbrpzEkukxA44NICAKWCXFRPx5Ie64d2BUHkreZ2DcI8g4Hc9Gp5tfymlArHyDxJirFLQaV9k3MnQfFLbab6GZDRMn9GXejm49TuzMBABk9Wwh4NO0QAD50SradvyMBQPBWgYwm73z35woX+PYs9y/K5rY5E9BhMcLBpdrNK4f9ueIjEGNHAGFxoAIA8US71X5XCYfi+shI3Z8tzggPTHFtfHAqxFUGFAlX8DBfU9X6t2UjFjzmSxef+LQ9Eyxinru0K8S1AJOAhRwFia+q0VAK/D/aXKTXGXSSX8tP08dq7FmAAieiISkpXv3cekHJpDaWLbzk7XbJitic64sABcZpfy7Iex6TyUY1FtJZ1kmTxGocspq0NYe4wvRRX2ahwCLIiITOcTbyXCR77cT3JgDxMeCOGX/m7sdfmtxdiQTv8euYtkNs+rgSQAAVXu0lLrgHCqgSDV1sNWCei2GnCWx3dCVA1/A0JvMrjcjVfU1Yvw+SzrAoV82ZAISNFd5aqFd/w2xTtrLMOuqKuROElXDQtnhOu4FAeUkQ4PjJXojNWEcZ4ALTWW3CDO7HKHjDWO0HkBsMxS0IYdlNcD9iFLfwCLzBG0mtH4DOMLCmuFEFNRJz+1fX5TQQjjsDcemNVB72ipKWyn9yidC/sL8Z6AbHh8pB2aYICuHt5mNl569mTQjI+dKFrj8q1p8h4RSfarMkbf9fbNVD4g0buwqwzACvAI3E3ISQ4CoDUsC6nsq/V6fkVmX/LRsZ+APOsdzYLi53OgAAAABJRU5ErkJggg=="
													alt="videoIcon" />
											</div>
										</router-link>


										<!-- <div class="right">
											<img class="live-anchor"
												src="https://sta-prod-pic.zkreen.com/avatar/p0020211014125627037853.jpg?x-image-process=image/format,webp/resize,m_fill,w_36,h_36"
												alt="" width="36" height="36" title="" />
										</div> -->
									</div>
								</div>
							</div>
							<div class="h45-w1-border"></div>
							<div class="model-two width224" :style="{height:immediately.value4?'60px':'42px'}"
								@mouseleave="mousemove" ref="sss1" @mouseenter="mouseenter1(index,1,item)">
								<div class="football-score-item-odds"
									v-if="item.exponent && item.exponent.asia.immediate">
									<div class="odds-handicap" style="display: flex" v-if="immediately.value1">
										<div class="left" v-if="item.exponent.asia.immediate">
											{{item.exponent.asia.immediate.win}}
										</div>
										<div class="middle" v-if="item.exponent.asia.immediate">
											{{item.exponent.asia.immediate.draw}}
										</div>
										<div class="right" v-if="item.exponent.asia.immediate">
											{{item.exponent.asia.immediate.fail}}
										</div>
									</div>
									<div class="odds-dx" style="display: flex" v-if="immediately.value2">
										<div class="left  football" v-if="item.exponent.bs.immediate">
											{{item.exponent.bs.immediate.win}}
										</div>
										<div class="middle" v-if="item.exponent.bs.immediate">
											{{item.exponent.bs.immediate.draw}}
										</div>
										<div class="right  football" v-if="item.exponent.bs.immediate">
											{{item.exponent.bs.immediate.fail}}
										</div>
									</div>
									<div class="odds-dx" style="display: flex" v-if="immediately.value3">
										<div class="left  football" v-if="item.exponent.eu.immediate">
											{{item.exponent.eu.immediate.win}}
										</div>
										<div class="middle" v-if="item.exponent.eu.immediate">
											{{item.exponent.eu.immediate.draw}}
										</div>
										<div class="right  football" v-if="item.exponent.eu.immediate">
											{{item.exponent.eu.immediate.fail}}
										</div>
									</div>
								</div>
							</div>
							<div class="data width87" style="justify-content: space-around">
								<!-- <div>
		          <a
		            target="_blank"
		            href="/score-detail/analyze?matchId=5329421&amp;sportId=1"
		            >分析</a
		          >
		        </div> -->
								<div>
									<router-link tag="a" target="_blank"
										:to="'/score-detail?type=football&id='+item.id">指数</router-link>
								</div>
								<div>
									<router-link tag="a" target="_blank"
										:to="'/score-detail?type=football&tabIndex=4&id='+item.id">分析</router-link>
								</div>
							</div>
							<div class="match width74">
								<div class="football-score-item-operation">
									<img @click="setCollect(item)"
										:src="item.is_collect == 1?require('../../assets/images/shoucang1.png'):require('../../assets/images/shoucang.png')"
										class="collect">
									<div class="arrow-top arrow-solid" @click="cancelTop(item)"></div>
									<!-- <img src="../../assets/images/top.png" class="arrow-top"> -->
								</div>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</section>
		<!-- ------------------------------------- -->
		<section class="container-section" ref="complete1" style="box-shadow: rgb(238, 238, 238) 0px 1px 0px 0px inset">
			<div class="title" style="display: flex">
				<img alt="b" src="../../assets/images/main-beigin.png" class="icon" />
				<div class="container-section-field">进行中的比赛</div>
			</div>
			<ul>

				<li :data-index="index" :data-id="item.id" :ref="item.id" data-list="arrList1"
					v-for="(item, index) in arrList1" :key="index" class="football-score-item"
					:class="immediately.value4?'football-score-height-60':''" style="position: relative;"
					:style="{marginBottom: item.note?'31px':''}">
					<div class="football-score-item-add-time immediate"
						style="position: absolute;bottom: -32px;left: 0;" v-if="item.note">
						<div class="desc-wrap">
							<div class="desc">
								{{item.note}}
								<!-- {{item.status == 5?item.overtime:item.penalty_kick}} -->
							</div>
						</div>
					</div>

					<div class="gou width40">
						<div
							style="display: inline-block;max-width: 100%;overflow: hidden;position: relative;box-sizing: border-box;margin: 0px;">
							<div style="box-sizing: border-box; display: block; max-width: 100%" @click="setId(item)">
								<img alt=""
									:src="footList.indexOf(item.id) == -1?require('@/assets/images/check.png'):require('@/assets/images/check1.png')"
									style="" />
							</div>
						</div>
					</div>
					<div class="match-field width93">
						<div class="football-league-name-container false" style="height: 44.5px">
							<div class="football-league-color-block" :style="{ background: item.primary_color }"></div>
							<div class="football-league-logo">
								<img class="football-league-logo-img" :src="item.competition_logo" width="56"
									height="56" />
							</div>
							<div class="league-name ellipsis search-by-team-name"
								v-html="lang==1?item.competition_name_zht:lang==2?item.competition_name_en:item.competition_name_zh">
								<!-- {{}} -->
							</div>

						</div>
					</div>
					<div class="time width32 text-center">{{ $common.timeStamp(item.time) }}</div>
					<div class="match-status width40 football-all-status">
						<span class="point-animation"
							style="color: rgb(255, 67, 67);">{{item.status == 3?'中':item.match_str}}</span>
					</div>
					<div class="teamName-and-vs football-score-item-teamRank width420">
						<!-- :class="jinIdLeft == item.id?'score-item-goal-left':''" -->
						<div class="team-info host-container width189 "
							:class="jinIdLeft == item.id?'score-item-goal-left':''">
							<img class="score-item-ball-left" src="../../assets/images/f-0.png" alt="goal" />
							<div class="card red-card" v-if="item.home_red_card != 0  && game.red">
								{{ item.home_red_card }}
							</div>
							<div class="card yellow-card" v-if="item.home_yellow_card != 0  && game.yellow">
								{{ item.home_yellow_card }}
							</div>
							<div class="name ellipsis search-by-team-name"
								v-html="lang==1?item.home_team_name_zht:lang==2?item.home_team_name_en:item.home_team_name_zh">
								<!-- {{}} -->
							</div>
						</div>
						<!-- ----------------------------------------------------------------------------- -->

						<!-- <el-popover popper-class="popper" offset="10" :close-delay="0" placement="right-start"
							trigger="hover">
							<exponent v-if="ishow && current == item.id" :tlive="tlive" :tliveLoading="tliveLoading"></exponent>
							<div class="vs width42" slot="reference" ref="bbb" @mouseenter="mouseenter(index,1,item)">
								<span style="color: rgb(255, 67, 67)">{{ item.home_score || 0 }}</span>
								<span data-a="0" data-b="2" style="color: rgb(255, 67, 67)">-</span>
								<span style="color: rgb(255, 67, 67)">{{ item.away_score || 0  }}</span>
							</div>
						</el-popover> -->

						<!-- <el-popover popper-class="popper" offset="10" :close-delay="0" placement="right-start"
							trigger="hover"> -->
						<div class="hover-box" @mouseenter="mouseenter(index,1,item)"
							@mouseleave="ishow = false,current = null">
							<div class="vs width42 bf" slot="reference" ref="bbb">
								<span style="color: rgb(255, 67, 67)">{{ item.home_score || 0 }}</span>
								<span data-a="0" data-b="2" style="color: rgb(255, 67, 67)">-</span>
								<span style="color: rgb(255, 67, 67)">{{ item.away_score || 0  }}</span>
							</div>
							<div class="components-box">
								<exponent v-if="ishow && current == item.id" :tlive="tlive"
									:tliveLoading="tliveLoading"></exponent>
							</div>

						</div>
						<!-- </el-popover> -->

						<div class="team-info guest-container width189 "
							:class="jinIdRight == item.id?'score-item-goal-right':''">
							<div class="name ellipsis search-by-team-name"
								v-html="lang==1?item.away_team_name_zht:lang==2?item.away_team_name_en:item.away_team_name_zh">
								<!-- {{}} -->
							</div>
							<div class="card yellow-card" v-if="item.away_yellow_card != 0  && game.yellow">
								{{ item.away_yellow_card }}
							</div>
							<div class="card red-card" v-if="item.away_red_card != 0  && game.red">
								{{ item.away_red_card }}
							</div>
							<img class="score-item-ball-right" src="../../assets/images/f-0.png" alt="goal" />
						</div>
					</div>
					<div class="variable width554">
						<div class="immediate">
							<div class="model-one width180">
								<div class="half width66 text-center">
									<span>{{ item.half_score || '-' }}</span>
								</div>
								<div class="corner width48 text-left">
									<span>{{ item.corner_kick|| '-'  }}</span>
								</div>
								<div class="live">
									<div class="football-score-item-live">
										<router-link tag="a" target="_blank"
											:to="'/score-live?type=football&id='+item.id + '&competainId='+id+ '&vid=' + item.vid ">
											<div class="left">
												<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAqxJREFUWAntVk1oE0EUfm/SWLqHNhtREZSiBxGkoODJXqLFiyB4qgc9eLFNiiIK+TE5mIOB/CBUpEmkh+LFQ85evIjiQbGignch/iCCZmNsYtom83xjs4fSZtndhFx0YHZ237z3fd+8fTuzAP96QyqVPMbrpzEkukxA44NICAKWCXFRPx5Ie64d2BUHkreZ2DcI8g4Hc9Gp5tfymlArHyDxJirFLQaV9k3MnQfFLbab6GZDRMn9GXejm49TuzMBABk9Wwh4NO0QAD50SradvyMBQPBWgYwm73z35woX+PYs9y/K5rY5E9BhMcLBpdrNK4f9ueIjEGNHAGFxoAIA8US71X5XCYfi+shI3Z8tzggPTHFtfHAqxFUGFAlX8DBfU9X6t2UjFjzmSxef+LQ9Eyxinru0K8S1AJOAhRwFia+q0VAK/D/aXKTXGXSSX8tP08dq7FmAAieiISkpXv3cekHJpDaWLbzk7XbJitic64sABcZpfy7Iex6TyUY1FtJZ1kmTxGocspq0NYe4wvRRX2ahwCLIiITOcTbyXCR77cT3JgDxMeCOGX/m7sdfmtxdiQTv8euYtkNs+rgSQAAVXu0lLrgHCqgSDV1sNWCei2GnCWx3dCVA1/A0JvMrjcjVfU1Yvw+SzrAoV82ZAISNFd5aqFd/w2xTtrLMOuqKuROElXDQtnhOu4FAeUkQ4PjJXojNWEcZ4ALTWW3CDO7HKHjDWO0HkBsMxS0IYdlNcD9iFLfwCLzBG0mtH4DOMLCmuFEFNRJz+1fX5TQQjjsDcemNVB72ipKWyn9yidC/sL8Z6AbHh8pB2aYICuHt5mNl569mTQjI+dKFrj8q1p8h4RSfarMkbf9fbNVD4g0buwqwzACvAI3E3ISQ4CoDUsC6nsq/V6fkVmX/LRsZ+APOsdzYLi53OgAAAABJRU5ErkJggg=="
													alt="videoIcon" />
											</div>
										</router-link>
										<div class="right" v-if="item.anchor.id">
											<router-link tag="a" target="_blank"
												:to="'/live?router=live&type=football&id='+item.anchor.match_id + '&uid=' + item.anchor.id + '&vid=' + item.vid">
												<img class="live-anchor" :src="item.anchor.avatar" alt="" width="36"
													height="36" title="" />
											</router-link>

										</div>
									</div>
								</div>
							</div>
							<div class="h45-w1-border"></div>
							<div class="model-two width224" ref="sss" :style="{height:immediately.value4?'60px':'42px'}"
								@mouseleave="mousemove" @mouseenter="mouseenter1(index,2,item)" @click="changes(item)">
								<div class="football-score-item-odds" v-if="item.exponent && item.exponent.asia">
									<div class="odds-handicap" style="display: flex" v-if="immediately.value1">
										<!-- odds-down -->
										<div class="left football" v-if="item.exponent.asia.scram.win"
											:class="item.asia.scram.win == 1?'odds-up':item.asia.scram.win == 2?'odds-down':''">
											{{item.exponent.asia.scram.win}}
										</div>
										<div class="middle football" v-if="item.exponent.asia.scram.draw"
											:class="item.asia.scram.draw == 1?'odds-up':item.asia.scram.draw == 2?'odds-down':''">
											{{item.exponent.asia.scram.draw}}
										</div>
										<div class="right football" v-if="item.exponent.asia.scram.fail"
											:class="item.asia.scram.fail == 1?'odds-up':item.asia.scram.fail == 2?'odds-down':''">
											{{item.exponent.asia.scram.fail}}
										</div>
									</div>
									<div class="odds-dx" style="display: flex" v-if="immediately.value2">
										<div class="left football" v-if="item.exponent.bs.scram.win"
											:class="item.bs.scram.win == 1?'odds-up':item.bs.scram.win == 2?'odds-down':''">
											{{item.exponent.bs.scram.win}}
										</div>
										<div class="middle football" v-if="item.exponent.bs.scram.draw"
											:class="item.bs.scram.draw == 1?'odds-up':item.bs.scram.draw == 2?'odds-down':''">
											{{item.exponent.bs.scram.draw}}
										</div>
										<div class="right football" v-if="item.exponent.bs.scram.fail"
											:class="item.bs.scram.fail == 1?'odds-up':item.bs.scram.fail == 2?'odds-down':''">
											{{item.exponent.bs.scram.fail}}
										</div>
									</div>
									<div class="odds-dx" style="display: flex" v-if="immediately.value3">
										<div class="left football" v-if="item.exponent.eu.scram.win"
											:class="item.eu.scram.win == 1?'odds-up':item.eu.scram.win == 2?'odds-down':''">
											{{item.exponent.eu.scram.win}}
										</div>
										<div class="middle football" v-if="item.exponent.eu.scram.draw"
											:class="item.eu.scram.draw == 1?'odds-up':item.eu.scram.draw == 2?'odds-down':''">
											{{item.exponent.eu.scram.draw}}
										</div>
										<div class="right football" v-if="item.exponent.eu.scram.fail"
											:class="item.eu.scram.fail == 1?'odds-up':item.eu.scram.fail == 2?'odds-down':''">
											{{item.exponent.eu.scram.fail}}
										</div>
									</div>
								</div>
							</div>

							<div class="data width87" style="justify-content: space-around">
								<div>
									<router-link tag="a" target="_blank"
										:to="'/score-detail?type=football&id='+item.id">指数</router-link>
								</div>
								<div>
									<router-link tag="a" target="_blank"
										:to="'/score-detail?type=football&tabIndex=4&id='+item.id">分析</router-link>
								</div>
							</div>
							<div class="match width74">
								<div class="football-score-item-operation">
									<img @click="setCollect(item)"
										:src="item.is_collect == 1?require('../../assets/images/shoucang1.png'):require('../../assets/images/shoucang.png')"
										class="collect">
									<!-- <div class="arrow-top arrow-hollow"></div> -->
									<img @click="setTop(item)" src="../../assets/images/top.png" class="arrow-top">
								</div>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</section>
		<section class="container-section" ref="complete2" id="uncoming"
			style="box-shadow: rgb(238, 238, 238) 0px 1px 0px 0px inset;">
			<div class="title" style="display: flex">
				<img alt="a" src="../../assets/images/main-end.png" class="icon" />
				<div class="container-section-field">未开始的比赛</div>
			</div>
			<ul v-if="notStart">
				<li data-id="5365469" class="football-score-item" v-for="(item, index) in arrList2" :key="index"
					:class="immediately.value4?'football-score-height-60':''" style="position: relative;">
					<div class="gou width40">
						<div
							style=" display: inline-block; max-width: 100%; overflow: hidden; position: relative; box-sizing: border-box; margin: 0px; ">
							<div style="box-sizing: border-box; display: block; max-width: 100%" @click="setId(item)">
								<img alt=""
									:src="footList.indexOf(item.id) == -1?require('@/assets/images/check.png'):require('@/assets/images/check1.png')"
									style="" />
							</div>

						</div>
					</div>
					<div class="match-field width93">
						<div class="football-league-name-container false" style="height: 44.5px">
							<div class="football-league-color-block" :style="{ background: item.primary_color }"></div>
							<div class="football-league-logo">
								<img class="football-league-logo-img" :src="item.competition_logo" width="56"
									height="56" />
							</div>
							<div class="league-name ellipsis search-by-team-name"
								v-html="lang==1?item.competition_name_zht:lang==2?item.competition_name_en:item.competition_name_zh">
								<!-- {{}} -->
							</div>
						</div>
					</div>
					<div class="time width32 text-center">{{ $common.timeStamp(item.time) }}</div>
					<div class="match-status width40 football-all-status">
						<span class="">未</span>
					</div>
					<div class="teamName-and-vs football-score-item-teamRank width420">
						<div class="team-info host-container width189">
							<!-- <div class="rank">[3]</div> -->
							<div class="name ellipsis search-by-team-name"
								v-html="lang==1?item.home_team_name_zht:lang==2?item.home_team_name_en:item.home_team_name_zh">
								<!-- {{}} -->
							</div>
						</div>
						<!-- <el-popover popper-class="popper" :close-delay="0" placement="right-start" trigger="hover">
							<exponent v-if="ishow && current == item.id" :tlive="tlive" :tliveLoading="tliveLoading"></exponent>
							<div class="vs width42" slot="reference" ref="bbb1" @mouseenter="mouseenter(index,2,item)">
								<span style="color: rgb(255, 67, 67)"></span>
								<span data-a="0" data-b="0" style="color: rgb(145, 151, 173)">-</span>
								<span style="color: rgb(255, 67, 67)"></span>
							</div>
						</el-popover> -->

						<!-- <div class="hover-box" @mouseenter="mouseenter(index,2,item)">
							<div class="vs width42 bf" slot="reference" ref="bbb1">
								<span style="color: rgb(255, 67, 67)">{{ item.home_score || 0 }}</span>
								<span data-a="0" data-b="2" style="color: rgb(255, 67, 67)">-</span>
								<span style="color: rgb(255, 67, 67)">{{ item.away_score || 0  }}</span>
							</div>
							<exponent class="components-box" v-show="current == item.id" :tlive="tlive" :tliveLoading="tliveLoading"></exponent>
						</div> -->

						<div class="hover-box" @mouseenter="mouseenter(index,2,item)"
							@mouseleave="ishow = false,current = null">
							<div class="vs width42 bf" slot="reference" ref="bbb1">
								<!-- <span style="color: rgb(255, 67, 67)">{{ item.home_score || 0 }}</span> -->
								<span data-a="0" data-b="0" style="color: rgb(145, 151, 173)">-</span>
								<!-- <span style="color: rgb(255, 67, 67)">{{ item.away_score || 0  }}</span> -->
							</div>
							<div class="components-box">
								<exponent v-if="ishow && current == item.id" :tlive="tlive"
									:tliveLoading="tliveLoading"></exponent>
							</div>

						</div>


						<div class="team-info guest-container width189">
							<div class="name ellipsis search-by-team-name"
								v-html="lang==1?item.away_team_name_zht:lang==2?item.away_team_name_en:item.away_team_name_zh">
								<!-- {{}} -->
							</div>
							<!-- <div class="rank">[15]</div> -->
						</div>
					</div>
					<div class="variable width554">
						<div class="immediate">
							<div class="model-one width180">
								<div class="half width66 text-center">
									<span></span><span>-</span><span></span>
								</div>
								<div class="corner width48 text-left">
									<span></span><span>-</span><span></span>
								</div>
								<div class="live">
									<div class="football-score-item-live">
										<div class="left">
											<router-link tag="a" target="_blank"
												:to="'/score-live?type=football&id='+item.id + '&competainId='+id+ '&vid=' + item.vid ">
												<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAqxJREFUWAntV01oE1EQnnk1DZKI1rOgoKd6EYTiRU81aU8igmDak4cepAeVRqh4yEWiCYhQ9JCLp/VgEfHUpPRUbwWvCqIgqOdWbZBEu+N8m+y6u6Sap2v9fbDs7DfffDP73tvhLdH/8a/PAIsITyxeOq/GORE6YDMhPJTdmXn/gdc/baz1HcckTPRCmG87ucpNLjSKF8iVG30LhIjfVUAongxfNHjzMLaVNnIb22lPskAh2m+SFLTWEuJfW4BW/AcWwPySyVzmVOqgc6T0rnb8+lvYwEh9tstgOQM8nx0wh5zxSpmy6deT9eJRXLCBwUfE8zZF9F0AM9fvjldPN3dsl0J9Zo5Wm6uuyDIu2MDgAwfcfouIF9Biw7M6lSsRAab1QR6cQteUteZ9EpoWkiDWs4GpDxxwmakZ1eAVT5uoFcYDEYAa9NjJV6+xkbkwSVvnozv5q68mG8UzJDIa9kVs9YEDruLLYR80PW3NEcYjBWhTcj2n2737TOZOEPMxH9r07nP8GJ/Y1QxydPFIAT53K++RAnQJOs8m1h9EDntFYcN9a/gcP8bndzWDHF2cCwsz2pKDgU1Y0mk6qWs9EqC6CdOcHt6bS7151mg2Nt0HzEtOvpI7u3hlT1taT1Un80VDNyHTA3GlpFjaxyMzAIcSypHkYApl29Kulbjk8q7MKf3MbjFxZ7+oG7aHdXwCbiS5pyEjnnYoOeB4AcB6Dv28xgoLxXs4gDhj1enMNrPb6IbDRUOZIQ9THzjg9hTpAcaXoAclBqEVC9coNfDQGS0/gXdiaXaYPm6c0C4xpbO3Lxbx1Uf7AkJyP3wiUq2+lyCUN1HzNyhAT6mJvpKNmOY2OCLbxCTJRW6D83mSojZayG3wc4DzuXap59pRfv5y4McEuTSnl9um4r+S+xmamxe7t2V1lQAAAABJRU5ErkJggg=="
													alt="animateIcon" />
											</router-link>
										</div>
										<div class="right" v-if="item.anchor.id">
											<router-link tag="a" target="_blank"
												:to="'/live?router=live&type=football&id='+item.anchor.match_id + '&uid=' + item.anchor.id + '&vid=' + item.vid">
												<img class="live-anchor" :src="item.anchor.avatar" alt="" width="36"
													height="36" title="" />
											</router-link>

										</div>
									</div>
								</div>
							</div>
							<div class="h45-w1-border"></div>
							<div class="model-two width224" :style="{height:immediately.value4?'60px':'42px'}"
								@mouseleave="mousemove" ref="sss1" @mouseenter="mouseenter1(index,1,item)">
								<div class="football-score-item-odds"
									v-if="item.exponent && item.exponent.asia.immediate">
									<div class="odds-handicap" style="display: flex" v-if="immediately.value1">
										<div class="left" v-if="item.exponent.asia.immediate">
											{{item.exponent.asia.immediate.win}}
										</div>
										<div class="middle" v-if="item.exponent.asia.immediate">
											{{item.exponent.asia.immediate.draw}}
										</div>
										<div class="right" v-if="item.exponent.asia.immediate">
											{{item.exponent.asia.immediate.fail}}
										</div>
									</div>
									<div class="odds-dx" style="display: flex" v-if="immediately.value2">
										<div class="left  football" v-if="item.exponent.bs.immediate">
											{{item.exponent.bs.immediate.win}}
										</div>
										<div class="middle" v-if="item.exponent.bs.immediate">
											{{item.exponent.bs.immediate.draw}}
										</div>
										<div class="right  football" v-if="item.exponent.bs.immediate">
											{{item.exponent.bs.immediate.fail}}
										</div>
									</div>
									<div class="odds-dx" style="display: flex" v-if="immediately.value3">
										<div class="left  football" v-if="item.exponent.eu.immediate">
											{{item.exponent.eu.immediate.win}}
										</div>
										<div class="middle" v-if="item.exponent.eu.immediate">
											{{item.exponent.eu.immediate.draw}}
										</div>
										<div class="right  football" v-if="item.exponent.eu.immediate">
											{{item.exponent.eu.immediate.fail}}
										</div>
									</div>
								</div>
							</div>
							<div class="data width87" style="justify-content: space-around">
								<div>
									<router-link tag="a" target="_blank"
										:to="'/score-detail?type=football&id='+item.id">指数</router-link>
								</div>
								<div>
									<router-link tag="a" target="_blank"
										:to="'/score-detail?type=football&tabIndex=4&id='+item.id">分析</router-link>
								</div>
							</div>
							<div class="match width74">
								<div class="football-score-item-operation">
									<img @click="setCollect(item)"
										:src="item.is_collect == 1?require('../../assets/images/shoucang1.png'):require('../../assets/images/shoucang.png')"
										class="collect">
									<!-- <div class="arrow-top arrow-hollow"></div> -->
									<img @click="setTop(item)" src="../../assets/images/top.png" class="arrow-top">
								</div>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</section>
		<!-- v-if="list3.length != 0" -->
		<section class="container-section" id="finished" ref="complete3"
			style="box-shadow: rgb(238, 238, 238) 0px 1px 0px 0px inset;">
			<div class="title" style="display: flex">
				<img alt="c" src="../../assets/images/main-ends.png" class="icon" />
				<div class="container-section-field">已完场的比赛</div>
			</div>
			<ul v-if="isEndTime">
				<li data-id="3915493" class="football-score-item" v-for="(item, index) in arrList3" :key="index"
					:class="immediately.value4?'football-score-height-60':''" style="position: relative;"
					:style="{marginBottom: item.note?'31px':''}">
					<div class="football-score-item-add-time immediate"
						style="position: absolute;bottom: -32px;left: 0;" v-if="item.note">
						<div class="desc-wrap">
							<div class="desc">
								{{item.note}}
								<!-- {{item.status == 5?item.overtime:item.penalty_kick}} -->
							</div>
						</div>
					</div>
					<div class="gou width40">
						<div
							style=" display: inline-block; max-width: 100%; overflow: hidden; position: relative; box-sizing: border-box; margin: 0px; ">
							<div style="box-sizing: border-box; display: block; max-width: 100%" @click="setId(item)">
								<img alt=""
									:src="footList.indexOf(item.id) == -1?require('@/assets/images/check.png'):require('@/assets/images/check1.png')"
									style="" />
							</div>
						</div>
					</div>
					<div class="match-field width93">
						<div class="football-league-name-container false" style="height: 44.5px">
							<div class="football-league-color-block" :style="{ background: item.primary_color }"></div>
							<div class="football-league-logo">
								<img class="football-league-logo-img" :src="item.competition_logo" width="56"
									height="56" />
							</div>
							<div class="league-name ellipsis search-by-team-name"
								v-html="lang==1?item.competition_name_zht:lang==2?item.competition_name_en:item.competition_name_zh">
								<!-- {{}} -->
							</div>
						</div>
					</div>
					<div class="time width32 text-center">{{ $common.timeStamp(item.time) }}</div>
					<div class="match-status width40 football-all-status">
						<span class="">完</span>
					</div>
					<div class="teamName-and-vs football-score-item-teamRank width420">
						<div class="team-info host-container width189">
							<div class="card red-card" v-if="item.home_red_card != 0  && game.red">
								{{ item.home_red_card }}
							</div>
							<div class="card yellow-card" v-if="item.home_yellow_card != 0  && game.yellow">
								{{ item.home_yellow_card }}
							</div>
							<!-- <div class="rank">[2]</div> -->
							<div class="name ellipsis search-by-team-name"
								v-html="lang==1?item.home_team_name_zht:lang==2?item.home_team_name_en:item.home_team_name_zh">
								<!-- {{}} -->
							</div>
						</div>

						<!-- <el-popover popper-class="popper" :close-delay="0" placement="right-start" trigger="hover">
							<exponent v-if="ishow && current == item.id" :tlive="tlive" :tliveLoading="tliveLoading"></exponent>
							<div class="vs width42" slot="reference" ref="bbb2" @mouseenter="mouseenter(index,3,item)">
								<span style="color: rgb(255, 67, 67)">{{ item.home_score || 0  }}</span>
								<span data-a="2" data-b="1" style="color: rgb(255, 67, 67)">-</span><span
									style="color: rgb(255, 67, 67)">{{ item.away_score || 0 }}</span>
							</div>
						</el-popover> -->

						<!-- <div class="hover-box" @mouseenter="mouseenter(index,3,item)">
							<div class="vs width42 bf" slot="reference" ref="bbb2">
								<span style="color: rgb(255, 67, 67)">{{ item.home_score || 0 }}</span>
								<span data-a="0" data-b="2" style="color: rgb(255, 67, 67)">-</span>
								<span style="color: rgb(255, 67, 67)">{{ item.away_score || 0  }}</span>
							</div>
							<exponent class="components-box" v-show="current == item.id" :tlive="tlive" :tliveLoading="tliveLoading"></exponent>
						</div> -->

						<div class="hover-box" @mouseenter="mouseenter(index,3,item)"
							@mouseleave="ishow = false,current = null">
							<div class="vs width42 bf" slot="reference" ref="bbb2">
								<span style="color: rgb(255, 67, 67)">{{ item.home_score || 0 }}</span>
								<span data-a="0" data-b="2" style="color: rgb(255, 67, 67)">-</span>
								<span style="color: rgb(255, 67, 67)">{{ item.away_score || 0  }}</span>
							</div>
							<div class="components-box">
								<exponent v-if="ishow && current == item.id" :tlive="tlive"
									:tliveLoading="tliveLoading"></exponent>
							</div>

						</div>


						<div class="team-info guest-container width189">
							<div class="name ellipsis search-by-team-name"
								v-html="lang==1?item.away_team_name_zht:lang==2?item.away_team_name_en:item.away_team_name_zh">
								<!-- {{}} -->
							</div>
							<!-- <div class="rank">[1]</div> -->
							<div class="card yellow-card" v-if="item.away_yellow_card != 0  && game.yellow">
								{{ item.away_yellow_card }}
							</div>
							<div class="card red-card" v-if="item.away_red_card != 0  && game.red">
								{{ item.away_red_card }}
							</div>
						</div>
					</div>
					<div class="variable width554">
						<div class="immediate">
							<div class="model-one width180">
								<div class="half width66 text-center">
									<span>{{ item.half_score }}</span>
								</div>
								<div class="corner width48 text-left">
									<span>{{ item.corner_kick }}</span>
								</div>
								<div class="live">
									<div class="football-score-item-live">
										<router-link tag="a" target="_blank"
											:to="'/score-live?type=football&id='+item.id + '&competainId='+id+ '&vid=' + item.vid ">
											<div class="left">
												<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAqxJREFUWAntVk1oE0EUfm/SWLqHNhtREZSiBxGkoODJXqLFiyB4qgc9eLFNiiIK+TE5mIOB/CBUpEmkh+LFQ85evIjiQbGignch/iCCZmNsYtom83xjs4fSZtndhFx0YHZ237z3fd+8fTuzAP96QyqVPMbrpzEkukxA44NICAKWCXFRPx5Ie64d2BUHkreZ2DcI8g4Hc9Gp5tfymlArHyDxJirFLQaV9k3MnQfFLbab6GZDRMn9GXejm49TuzMBABk9Wwh4NO0QAD50SradvyMBQPBWgYwm73z35woX+PYs9y/K5rY5E9BhMcLBpdrNK4f9ueIjEGNHAGFxoAIA8US71X5XCYfi+shI3Z8tzggPTHFtfHAqxFUGFAlX8DBfU9X6t2UjFjzmSxef+LQ9Eyxinru0K8S1AJOAhRwFia+q0VAK/D/aXKTXGXSSX8tP08dq7FmAAieiISkpXv3cekHJpDaWLbzk7XbJitic64sABcZpfy7Iex6TyUY1FtJZ1kmTxGocspq0NYe4wvRRX2ahwCLIiITOcTbyXCR77cT3JgDxMeCOGX/m7sdfmtxdiQTv8euYtkNs+rgSQAAVXu0lLrgHCqgSDV1sNWCei2GnCWx3dCVA1/A0JvMrjcjVfU1Yvw+SzrAoV82ZAISNFd5aqFd/w2xTtrLMOuqKuROElXDQtnhOu4FAeUkQ4PjJXojNWEcZ4ALTWW3CDO7HKHjDWO0HkBsMxS0IYdlNcD9iFLfwCLzBG0mtH4DOMLCmuFEFNRJz+1fX5TQQjjsDcemNVB72ipKWyn9yidC/sL8Z6AbHh8pB2aYICuHt5mNl569mTQjI+dKFrj8q1p8h4RSfarMkbf9fbNVD4g0buwqwzACvAI3E3ISQ4CoDUsC6nsq/V6fkVmX/LRsZ+APOsdzYLi53OgAAAABJRU5ErkJggg=="
													alt="videoIcon" />
											</div>
										</router-link>

										<!-- <div class="right">
											<img class="live-anchor"
												src="https://sta-prod-pic.zkreen.com/avatar/p0020201107192115023818.jpeg?x-image-process=image/format,webp/resize,m_fill,w_36,h_36"
												alt="" width="36" height="36" title="" />
										</div> -->
									</div>
								</div>
							</div>
							<div class="h45-w1-border"></div>
							<div class="model-two width224" ref="sss2" @mouseleave="mousemove"
								@mouseenter="mouseenter1(index,3,item)">
								<div class="football-score-item-odds" v-if="item.exponent && item.exponent.asia">
									<div class="odds-handicap" style="display: flex" v-if="immediately.value1">
										<div class="left">{{item.exponent.asia.scram.win}}</div>
										<div class="middle">{{item.exponent.asia.scram.draw}}</div>
										<div class="right">{{item.exponent.asia.scram.fail}}</div>
									</div>
									<div class="odds-dx" style="display: flex" v-if="immediately.value2">
										<div class="left  football">{{item.exponent.bs.scram.win}}</div>
										<div class="middle">{{item.exponent.bs.scram.draw}}</div>
										<div class="right  football">{{item.exponent.bs.scram.fail}}</div>
									</div>
									<div class="odds-dx" style="display: flex" v-if="immediately.value3">
										<div class="left  football">{{item.exponent.eu.scram.win}}</div>
										<div class="middle">{{item.exponent.eu.scram.draw}}</div>
										<div class="right  football">{{item.exponent.eu.scram.fail}}</div>
									</div>
								</div>
							</div>
							<div class="data width87" style="justify-content: space-around">
								<div>
									<router-link tag="a" target="_blank"
										:to="'/score-detail?type=football&id='+item.id">指数</router-link>
									<!-- <a @click="$router.push('/score-detail?type=football&id='+item.id)">指数</a> -->
								</div>
								<div>
									<router-link tag="a" target="_blank"
										:to="'/score-detail?type=football&tabIndex=4&id='+item.id">分析</router-link>
								</div>
							</div>
							<div class="match width74">
								<div class="football-score-item-operation">
									<!-- <div  style="background:url(./assets/images/shoucang.png)"></div> -->
									<!-- <div class="arrow-top arrow-hollow"></div> -->
									<img @click="setCollect(item)"
										:src="item.is_collect == 1?require('../../assets/images/shoucang1.png'):require('../../assets/images/shoucang.png')"
										class="collect">
									<!-- <div class="arrow-top arrow-hollow"></div> -->
									<img @click="setTop(item)" src="../../assets/images/top.png" class="arrow-top">
								</div>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</section>
		<section class="container-section" id="finished" ref="complete5"
			style="box-shadow: rgb(238, 238, 238) 0px 1px 0px 0px inset;">
			<div class="title" style="display: flex">
				<img alt="c" src="../../assets/images/main-yi.png" class="icon" />
				<div class="container-section-field">异常的比赛</div>
			</div>
			<ul v-if="isAbnormalTime">
				<li data-id="3915493" class="football-score-item" v-for="(item, index) in arrList5" :key="index"
					:class="immediately.value4?'football-score-height-60':''" style="position: relative;"
					:style="{marginBottom: item.note?'31px':''}">
					<div class="football-score-item-add-time immediate"
						style="position: absolute;bottom: -32px;left: 0;" v-if="item.note">
						<div class="desc-wrap">
							<div class="desc">
								{{item.note}}
								<!-- {{item.status == 5?item.overtime:item.penalty_kick}} -->
							</div>
						</div>
					</div>
					<div class="gou width40">
						<div
							style=" display: inline-block; max-width: 100%; overflow: hidden; position: relative; box-sizing: border-box; margin: 0px; ">
							<div style="box-sizing: border-box; display: block; max-width: 100%" @click="setId(item)">
								<img alt=""
									:src="footList.indexOf(item.id) == -1?require('@/assets/images/check.png'):require('@/assets/images/check1.png')"
									style="" />
							</div>
						</div>
					</div>
					<div class="match-field width93">
						<div class="football-league-name-container false" style="height: 44.5px">
							<div class="football-league-color-block" :style="{ background: item.primary_color }"></div>
							<div class="football-league-logo">
								<img class="football-league-logo-img" :src="item.competition_logo" width="56"
									height="56" />
							</div>
							<div class="league-name ellipsis search-by-team-name"
								v-html="lang==1?item.competition_name_zht:lang==2?item.competition_name_en:item.competition_name_zh">
								<!-- {{}} -->
							</div>
						</div>
					</div>
					<div class="time width32 text-center">{{ $common.timeStamp(item.time) }}</div>
					<div class="match-status width40 football-all-status">
						<span class="">{{item.status_str}}</span>
					</div>
					<div class="teamName-and-vs football-score-item-teamRank width420">
						<div class="team-info host-container width189">
							<div class="card red-card" v-if="item.home_red_card != 0  && game.red">
								{{ item.home_red_card }}
							</div>
							<div class="card yellow-card" v-if="item.home_yellow_card != 0  && game.yellow">
								{{ item.home_yellow_card }}
							</div>
							<!-- <div class="rank">[2]</div> -->
							<div class="name ellipsis search-by-team-name"
								v-html="lang==1?item.home_team_name_zht:lang==2?item.home_team_name_en:item.home_team_name_zh">
								<!-- {{}} -->
							</div>
						</div>
						<div class="vs width42" ref="bbb4" @mouseenter="mouseenter(index,4,item)">
							<span style="color: rgb(255, 67, 67)">{{ item.home_score || 0  }}</span>
							<span data-a="2" data-b="1" style="color: rgb(255, 67, 67)">-</span><span
								style="color: rgb(255, 67, 67)">{{ item.away_score || 0 }}</span>
						</div>
						<div class="team-info guest-container width189">
							<div class="name ellipsis search-by-team-name"
								v-html="lang==1?item.away_team_name_zht:lang==2?item.away_team_name_en:item.away_team_name_zh">
								<!-- {{}} -->
							</div>
							<!-- <div class="rank">[1]</div> -->
							<div class="card yellow-card" v-if="item.away_yellow_card != 0  && game.yellow">
								{{ item.away_yellow_card }}
							</div>
							<div class="card red-card" v-if="item.away_red_card != 0  && game.red">
								{{ item.away_red_card }}
							</div>
						</div>
					</div>
					<div class="variable width554">
						<div class="immediate">
							<div class="model-one width180">
								<div class="half width66 text-center">
									<span>{{ item.half_score }}</span>
								</div>
								<div class="corner width48 text-left">
									<span>{{ item.corner_kick }}</span>
								</div>
								<div class="live">
									<div class="football-score-item-live">
										<router-link tag="a" target="_blank"
											:to="'/score-live?type=football&id='+item.id + '&competainId='+id+ '&vid=' + item.vid">
											<div class="left">
												<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAqxJREFUWAntVk1oE0EUfm/SWLqHNhtREZSiBxGkoODJXqLFiyB4qgc9eLFNiiIK+TE5mIOB/CBUpEmkh+LFQ85evIjiQbGignch/iCCZmNsYtom83xjs4fSZtndhFx0YHZ237z3fd+8fTuzAP96QyqVPMbrpzEkukxA44NICAKWCXFRPx5Ie64d2BUHkreZ2DcI8g4Hc9Gp5tfymlArHyDxJirFLQaV9k3MnQfFLbab6GZDRMn9GXejm49TuzMBABk9Wwh4NO0QAD50SradvyMBQPBWgYwm73z35woX+PYs9y/K5rY5E9BhMcLBpdrNK4f9ueIjEGNHAGFxoAIA8US71X5XCYfi+shI3Z8tzggPTHFtfHAqxFUGFAlX8DBfU9X6t2UjFjzmSxef+LQ9Eyxinru0K8S1AJOAhRwFia+q0VAK/D/aXKTXGXSSX8tP08dq7FmAAieiISkpXv3cekHJpDaWLbzk7XbJitic64sABcZpfy7Iex6TyUY1FtJZ1kmTxGocspq0NYe4wvRRX2ahwCLIiITOcTbyXCR77cT3JgDxMeCOGX/m7sdfmtxdiQTv8euYtkNs+rgSQAAVXu0lLrgHCqgSDV1sNWCei2GnCWx3dCVA1/A0JvMrjcjVfU1Yvw+SzrAoV82ZAISNFd5aqFd/w2xTtrLMOuqKuROElXDQtnhOu4FAeUkQ4PjJXojNWEcZ4ALTWW3CDO7HKHjDWO0HkBsMxS0IYdlNcD9iFLfwCLzBG0mtH4DOMLCmuFEFNRJz+1fX5TQQjjsDcemNVB72ipKWyn9yidC/sL8Z6AbHh8pB2aYICuHt5mNl569mTQjI+dKFrj8q1p8h4RSfarMkbf9fbNVD4g0buwqwzACvAI3E3ISQ4CoDUsC6nsq/V6fkVmX/LRsZ+APOsdzYLi53OgAAAABJRU5ErkJggg=="
													alt="videoIcon" />
											</div>
										</router-link>

										<!-- <div class="right">
											<img class="live-anchor"
												src="https://sta-prod-pic.zkreen.com/avatar/p0020201107192115023818.jpeg?x-image-process=image/format,webp/resize,m_fill,w_36,h_36"
												alt="" width="36" height="36" title="" />
										</div> -->
									</div>
								</div>
							</div>
							<div class="h45-w1-border"></div>
							<div class="model-two width224" ref="sss4" @mouseleave="mousemove"
								@mouseenter="mouseenter1(index,4,item)">
								<div class="football-score-item-odds" v-if="item.exponent && item.exponent.asia">
									<div class="odds-handicap" style="display: flex" v-if="immediately.value1">
										<div class="left">{{item.exponent.asia.scram.win}}</div>
										<div class="middle">{{item.exponent.asia.scram.draw}}</div>
										<div class="right">{{item.exponent.asia.scram.fail}}</div>
									</div>
									<div class="odds-dx" style="display: flex" v-if="immediately.value2">
										<div class="left  football">{{item.exponent.bs.scram.win}}</div>
										<div class="middle">{{item.exponent.bs.scram.draw}}</div>
										<div class="right  football">{{item.exponent.bs.scram.fail}}</div>
									</div>
									<div class="odds-dx" style="display: flex" v-if="immediately.value3">
										<div class="left  football">{{item.exponent.eu.scram.win}}</div>
										<div class="middle">{{item.exponent.eu.scram.draw}}</div>
										<div class="right  football">{{item.exponent.eu.scram.fail}}</div>
									</div>
								</div>
							</div>
							<div class="data width87" style="justify-content: space-around">
								<div>
									<router-link tag="a" target="_blank"
										:to="'/score-detail?type=football&id='+item.id">指数</router-link>
									<!-- <a @click="$router.push('/score-detail?type=football&id='+item.id)">指数</a> -->
								</div>
								<div>
									<router-link tag="a" target="_blank"
										:to="'/score-detail?type=football&tabIndex=4&id='+item.id">分析</router-link>
								</div>
							</div>
							<div class="match width74">
								<div class="football-score-item-operation">
									<!-- <div  style="background:url(./assets/images/shoucang.png)"></div> -->
									<!-- <div class="arrow-top arrow-hollow"></div> -->
									<img @click="setCollect(item)"
										:src="item.is_collect == 1?require('../../assets/images/shoucang1.png'):require('../../assets/images/shoucang.png')"
										class="collect">
									<!-- <div class="arrow-top arrow-hollow"></div> -->
									<img @click="setTop(item)" src="../../assets/images/top.png" class="arrow-top">
								</div>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</section>
	</article>
</template>

<script>
	import {
		match_filter,
		football_match,
		footballOddsList,
		getfootballDetail
	} from "@/api/football.js";
	import {
		collect
	} from "@/api/common.js";
	import exponent from "./exponent.vue"
	import football_detail from "./football_detail.json"
	export default {
		components: {
			exponent
		},
		props: {
			id: {
				type: Number,
				default: null

			},
			lang: {
				type: Number,
				default: 0
			},
			typeTab: { //即时列表切换进行中/ 未开 / 完场
				type: Number,
				default: 0
			},
			allCheck: {
				type: Boolean,
				default: false
			},
			checked: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				i: 1,
				time: null,
				timer: null,
				current: null,
				ishow: false,
				isAbnormalTime: false,
				isEndTime: false,
				notStart: false,
				jinIdLeft: null, //进球
				jinIdRight: null,
				dataBase: [],
				list1: [],
				list2: [],
				list3: [],
				list4: [], //置顶
				list5: [], //异常
				page1: 1,
				page2: 1,
				page3: 1,
				visible: false,
				football_detail: football_detail,
				tlive: {}, //详情
				footList: [],
				OddsList: {},
				expIndex: {}, //指数
				exponent: {}, //技术统计
				tliveLoading: false,
				top: '', //定位弹窗的位置
				left: '', //定位弹窗的位置
				fightMask: false, //对战弹窗
				dataMask: false, //数据弹窗
				allList: [], //总列表
				topList: [], //置顶列表
				screenListT: [], //筛选选中列表
				concealList: [],
				isUpdata: true,
				first: 1,
				lock: false,
				comparisonID: null,
				screenStatus: 'competition_id',
			};
		},
		computed: {
			immediately() {
				return this.$store.state.immediately
			},

			arrList1() {
				// console.log('出发离开');
				// let topList = JSON.parse(localStorage.getItem('topList')),
				// if(this.topList.length == 0 && this.screenListT) return this.list1
				return this.list1.filter(item => {
					return this.topList.indexOf(item.id) === -1 && this.screenListT.indexOf(item[this
						.screenStatus]) != -1 && this.concealList.indexOf(item.id) === -1
				})
			},

			arrList2() {
				// if(this.topList.length == 0) return this.list2
				return this.list2.filter(item => {
					return this.topList.indexOf(item.id) === -1 && this.screenListT.indexOf(item[this
						.screenStatus]) != -1 && this.concealList.indexOf(item.id) === -1
				})
			},
			arrList3() {
				// if(this.topList.length == 0) return this.list3
				let arr = this.list3.filter(item => {
					return this.topList.indexOf(item.id) === -1 && this.screenListT.indexOf(item[this
						.screenStatus]) != -1 && this.concealList.indexOf(item.id) === -1
				})
				return arr
			},
			arrList4() {
				// let arr = this.list4.filter(item=>{
				// 	return this.topList.indexOf(item.id) === -1
				// })
				return this.list4
			},
			arrList5() {
				return this.list5.filter(item => {
					return this.topList.indexOf(item.id) === -1 && this.screenListT.indexOf(item[this
						.screenStatus]) != -1 && this.concealList.indexOf(item.id) === -1
				})
			},
			// 显示红黄牌
			game() {
				return this.$store.state.game
			}

		},
		created() {},
		mounted() {
			this.topList = JSON.parse(localStorage.getItem('topList')) || []
			this.getlist();
			// window.addEventListener('scroll',this.handleScroll,true)


			setTimeout(res => {
				this.getlist()
			}, 60000)
			// this.$nextTick(function(){
			// 	document.documentElement.scrollTop = 1
			// })
			// this.timer = setInterval(this.getlist, 30000)
		},
		beforeDestroy() {
			clearInterval(this.timer);
		},
		watch: {
			"$store.state.football_exponent"(e) {
				// 判断是否为凌晨
				let datetime = localStorage.getItem('datetime')
				if (e.type == 'football_exponent' && e.datetime != datetime) {
					this.getlist()
					localStorage.setItem('datetime', e.datetime)
				} else if (e.type == 'football_exponent' && e.datetime == datetime) {
					if (e.type == 'football_match') return
					localStorage.setItem('datetime', e.datetime)
				}
				let _this = this

				let dom1 = this.$refs[e.sourceid]
				// 指数-测试
				if (e.type == 'football_exponent' && dom1 != undefined) {
					if (dom1[0] == undefined) return
					let obj = dom1[0].dataset //index ,list ,id
					let item = this[obj.list][Number(obj.index)]
					if (item[e.name] != undefined && item.id == e.sourceid) {
						item[e.name][e.name1].draw = _this.setExp(Number(item.exponent[e.name][e.name1].draw),
							Number(e.exponent[e.name][e.name1].draw))
						item[e.name][e.name1].fail = _this.setExp(Number(item.exponent[e.name][e.name1].fail),
							Number(e.exponent[e.name][e.name1].fail))
						item[e.name][e.name1].win = _this.setExp(Number(item.exponent[e.name][e.name1].win),
							Number(e.exponent[e.name][e.name1].win))
						if (item[e.name][e.name1].timer == undefined || item[e.name][e.name1].timer == null) {
							item[e.name][e.name1].timer = setTimeout(res => {
								item[e.name][e.name1].draw = 0
								item[e.name][e.name1].fail = 0
								item[e.name][e.name1].win = 0
							}, 2000)
						} else {
							clearTimeout(item[e.name][e.name1].timer)
							item[e.name][e.name1].timer = null
						}
						item.exponent = this.$common.assignDeep(item.exponent, e.exponent)
					}
					// console.log();
				}
				// end


				// 判断列表中的参数
				this.list1.forEach((item, index) => {
					if (e.type == 'football_match' && item.id == e.id) {
						e.home_team_name_zh = item.home_team_name_zh
						e.away_team_name_zh = item.away_team_name_zh
						if (item.away_score != e.away_score || item.home_score != e.home_score) {
							e.iszhu = 0
							if (item.home_score != e.home_score) {
								e.iszhu = 1
								_this.jinIdLeft = item.id
							} else {
								e.iszhu = 0
								_this.jinIdRight = item.id
							}
							_this.$store.state.goalItem.push(e)
							_this.time = setTimeout(res => { //大球
								_this.$store.state.goalItem.shift()
								if (_this.$store.state.goalItem.length == 0) {
									clearInterval(_this.time)
									_this.time = null
								}
								_this.jinIdLeft = null
								_this.jinIdRight = null
							}, 6000)
						}
						// Object.assign(item,e)
						// item = [...item,...]

						// 判断是否已经结束
						if (e.status == 8) {
							_this.getlist()
						}
					}
					if (e.type == 'football_match' && item.id == e.id) {

					}
				})

				let dom2 = this.$refs[e.id]

				if (e.type == 'football_match' && dom2 != undefined) {
					if (dom2[0] == undefined) return
					let obj = dom2[0].dataset //index ,list ,id
					let item = this[obj.list][Number(obj.index)]
					if (item.id == e.id) {
						Object.assign(item, e)
					}
				}

				this.list2.forEach(item => {
					// 未开始的比赛 开始监听
					if (e.type == 'football_exponent' && item.id == e.sourceid && item.status != e.status) {
						if (_this.comparisonID == item.id) {
							return
						}
						if (this.lock) return
						this.lock = true //锁住
						_this.getlist()

						console.log('比赛开始了1--');
					}
					if (e.type == 'football_match' && item.id == e.id && item.status != e.status) {
						// return
						if (_this.comparisonID == item.id) {
							return
						}
						_this.comparisonID = item.id
						if (this.lock) return
						this.lock = true //锁住
						_this.getlist()
						console.log('比赛开始了2--');
						// this.lock = true//锁住
					}

					if (e.type == 'football_exponent' && item.id == e.sourceid && this.id == e.company_id) {
						// 计算大小
						// this.getNumeExp(e)
						item.exponent = this.$common.assignDeep(item.exponent, e.exponent)
					}
				})

			},
			id(e) {
				this.list1 = []
				this.list2 = []
				this.list3 = []
				this.getlist()
			},
			allCheck(e) { //监听是否全选
				if (e) {
					this.footList = []
					this.list1.forEach(item => {
						this.footList.push(item.id)
					})
					this.list2.forEach(item => {
						this.footList.push(item.id)
					})
					this.list3.forEach(item => {
						this.footList.push(item.id)
					})
				} else {
					this.footList = []
				}
			},
			// 获取距离元素到顶部的距离
			typeTab(type) {
				let num = null
				if (type == 0) {
					num = this.$refs.complete1.offsetTop
				} else if (type == 1) {
					num = this.$refs.complete2.offsetTop
				} else if (type == 2) {
					num = this.$refs.complete3.offsetTop
				} else if (type == 3) {
					num = this.$refs.complete5.offsetTop
				}
				// this.$refs.scroll.wrap.scrollTop = this.$refs.complete.offsetTop
				// if (type == 3) {
				// }
				this.$emit('setTypeTab', num)
			}
		},
		methods: {
			/* 监听滚动条位置 */
			handleScroll(e) {
				/* 
				 1.隐藏已结束的比赛
				 实现：监听滚动条 
				 */
				/* 判断当前页面是足球即时比分 */
				// football
				// console.log(e);
				let router = this.$route
				if (router.path != '/football') return
				// console.log(router);

				/* 监听距离 已结束的距离 */
				let value = document.documentElement.scrollTop
				/* 已结束 */
				let endTime = this.$refs.complete3.getBoundingClientRect().top
				/* 异常 */
				let abnormalTime = this.$refs.complete5.getBoundingClientRect().top
				/* 未开始 */
				let notStart = this.$refs.complete2.getBoundingClientRect().top
				if (abnormalTime < 1000 && !this.abnormalTime && this.isEndTime == true) {
					this.isAbnormalTime = true
				}
				if (endTime < 1000 && !this.endTime) {
					this.isEndTime = true
				}
				if (notStart < 1000 && !this.notStart) {
					this.notStart = true
				}
				let a = this.$refs.complete2.offsetTop
				let b = this.$refs.complete3.offsetTop
				let c = this.$refs.complete5.offsetTop


				/* 判断滚动到的位置 */
				// if(value > a && value < b){//未开始
				// 	this.$emit('setTab',1)
				// }else if(value > b && value < c){//已结束
				// 	this.$emit('setTab',2)
				// }else if(value > c){//异常
				// 	this.$emit('setTab',3)
				// }


				// if(endTime < 0){
				// 	this.$emit('setTab',1)
				// }else if(endTime < 0){
				// 	this.$emit('setTab',1)
				// }
			},

			// 删除高亮
			clearSearch() {
				let _this = this
				this.i = 0
				if (document.querySelectorAll('.highlight').length == 0) return
				this.allList.forEach((item, index) => {
					let lang = this.lang == 1 ? 'zht' : this.lang == 2 ? 'en' : 'zh'
					this.$set(_this.allList[index], 'away_team_name_' + lang, item['away_team_name_' + lang]
						.replace(/<[^<>]+>/g, ""))
					this.$set(_this.allList[index], 'competition_name_' + lang, item['competition_name_' + lang]
						.replace(/<[^<>]+>/g, ""))
					this.$set(_this.allList[index], 'home_team_name_' + lang, item['home_team_name_' + lang]
						.replace(/<[^<>]+>/g, ""))
				})
			},
			// 滚动
			searchScroll(status) {
				let length = document.querySelectorAll('.highlight').length
				let dom = document.querySelectorAll('.highlight')
				// 获取元素距离顶部的距离
				console.log(status, dom[this.i].getBoundingClientRect().top + document.documentElement.scrollTop);
				if (length >= this.i && status == 'up') {
					this.i++
					return {
						i: this.i,
						num: dom[this.i].getBoundingClientRect().top + document.documentElement.scrollTop
					}
				} else if (status == 'down' && this.i != 0) {
					this.i--
					return {
						i: this.i,
						num: dom[this.i].getBoundingClientRect().top + document.documentElement.scrollTop
					}
				}

			},
			// 搜索高亮
			searchText(inputValue) {
				let _this = this
				if (inputValue) {
					let lang = this.lang == 1 ? 'zht' : this.lang == 2 ? 'en' : 'zh'
					// 每次查询之前清空原数据中标签,防止再次查询时,查不到
					if (document.querySelectorAll('.highlight').length > 0) {
						this.allList.forEach((item, index) => {
							this.$set(_this.allList[index], 'away_team_name_' + lang, item['away_team_name_' +
								lang].replace(/<[^<>]+>/g, ""))
							this.$set(_this.allList[index], 'competition_name_' + lang, item['competition_name_' +
								lang].replace(/<[^<>]+>/g, ""))
							this.$set(_this.allList[index], 'home_team_name_' + lang, item['home_team_name_' +
								lang].replace(/<[^<>]+>/g, ""))
						})
					}
					const regExp = new RegExp(inputValue, 'g');
					this.allList.forEach((item, index) => {
						// 采用$set方法  防止切换数据后,视图不更新
						this.$set(_this.allList[index], 'away_team_name_' + lang, item['away_team_name_' + lang]
							.replace(regExp,
								`<span class="highlight">${inputValue}</span>`))
						this.$set(_this.allList[index], 'competition_name_' + lang, item['competition_name_' +
							lang].replace(regExp,
							`<span class="highlight">${inputValue}</span>`))
						this.$set(_this.allList[index], 'home_team_name_' + lang, item['home_team_name_' + lang]
							.replace(regExp,
								`<span class="highlight">${inputValue}</span>`))

					})
					setTimeout(res => {
						this.$emit('getallNum', document.querySelectorAll('.highlight').length)
						// return document.querySelectorAll('.highlight').length
					}, 2000)
					// this.searchIndex = document.querySelectorAll('.highlight').length
				}
			},
			// 隐藏
			conceal() {
				if (this.footList.length == 0) return
				this.concealList = this.footList
				this.footList = []
				this.$store.state.concealNum = this.concealList.length
			},
			// 保留
			retain() {
				if (this.footList.length == 0) return
				// 获取所有的列表 push（id）
				let arr = []
				this.arrList1.forEach(item => {
					if (this.footList.indexOf(item.id) === -1) {
						arr.push(item.id)
					}
				})
				this.arrList2.forEach(item => {
					if (this.footList.indexOf(item.id) === -1) {
						arr.push(item.id)
					}
				})
				this.arrList3.forEach(item => {
					if (this.footList.indexOf(item.id) === -1) {
						arr.push(item.id)
					}
				})
				this.arrList5.forEach(item => {
					if (this.footList.indexOf(item.id) === -1) {
						arr.push(item.id)
					}
				})
				this.concealList = arr
				this.$store.state.concealNum = arr.length
			},
			// 收藏
			collect() {
				if (this.footList.length == 0) return
				let data = {
					id: this.footList.toString(),
					type: 2
				}
				collect(data).then(res => {
					this.getlist()
					this.$message.success('操作成功')
				}).catch(res => {})
			},
			// 取消隐藏
			cancelConceal() {
				this.concealList = []
				this.$store.state.concealNum = 0
			},

			// 筛选列表
			screenList(list, status) {
				this.screenListT = list
				this.screenStatus = status
			},


			// 对比两组数据的参数
			getNumeExp(e) {
				// console.log(e);
				let _this = this
				this.list1.forEach((item, index) => {

				})

			},
			// 0相等 ， 1 大于 ，2小于
			setExp(num1, num2) {
				if (num1 < num2) {
					return 1
				} else if (num1 > num2) {
					return 2
				} else if (num1 == num2) {
					return 0
				}


			},

			getexp(e) {
				// let list = this.list1
				// list.forEach(item=>{
				// 	if(item.id == e.id){
				// 		return item = {...item,...e}
				// 	}

				// })
				// this.list1 = list
			},

			// 对比时间：当前 - math_id
			setTime(end) {
				let newdata = Math.round(new Date() / 1000)
				let time = Math.round((newdata - Number(end)) / 60)
				if (!end) {
					return 0
				} else {
					return time
				}

			},
			// 状态
			getStatus(item) {
				let type = item.status
				// 1.未开赛 2.上半场 3.中场 4.下半场 5.加时赛 7.点球决战 8.完场
				if (type == 1) return '未'
				if (type == 2 || type == 3 || type == 4 || type == 5 || type == 7) return item.match_str
				if (type == 8) return '完'
			},

			// 收藏 取消收藏
			setId(item) {
				let _this = this
				if (this.footList.indexOf(item.id) == -1) {
					this.footList.push(item.id)
				} else {
					this.footList.splice(_this.footList.indexOf(item.id), 1)
				}
			},
			// 全选
			setAllId() {

			},

			// 指数弹窗详情
			footballOddsList(type) {
				let company_id = this.id
				footballOddsList({
					id: type.id,
				}).then(res => {
					let r = res.data
					// asia让球（亚盘） eu欧赔 bs总分（大小球）
					let data = {
						asia: {},
						eu: {},
						bs: {}
					}

					res.data.asia.forEach(item => {
						if (item.company_id === company_id) {
							data.asia = item
						}
					})
					res.data.eu.forEach(item => {
						if (item.company_id === company_id) {
							data.eu = item
						}
					})
					res.data.bs.forEach(item => {
						if (item.company_id === company_id) {
							data.bs = item
						}
					})

					this.OddsList = data
				}).catch(res => {

				})
			},
			// 点击置顶/取消操作 1.置顶：需添加，删除
			setTop(item) {
				let id = null
				this.topList.forEach(item1 => {
					if (item1 == item.id) {
						id = item1
					}
				})
				if (id == item.id) return
				this.topList.push(item.id)
				localStorage.setItem('topList', JSON.stringify(this.topList))
				this.setlist4()
			},
			// 取消置顶删除缓存
			cancelTop(item) {
				// let index = this.topList.findIndex(item1 =>{
				// 	return item1.id === item.id
				// })
				// console.log(index);
				// return
				this.list4.splice(this.list4.findIndex(item1 => item1.id === item.id), 1)
				this.topList.splice(this.topList.findIndex(item1 => item1.id === item.id), 1)
				localStorage.setItem('topList', JSON.stringify(this.topList))
				// console.log(this.topList);
			},

			// 置顶
			setlist4() {
				let list1 = this.list1;
				let list2 = this.list2;
				let list3 = this.list3;
				let list5 = this.list5;
				let list4 = [];
				let list = [];
				list = list.concat(list1).concat(list2).concat(list3).concat(list5);
				// let topList = JSON.parse(localStorage.getItem('topList'))
				this.list4 = list.filter(obj => {
					return this.topList.indexOf(obj.id) !== -1
				})
			},

			// 移除列表
			mousemove() {
				this.dataMask = false
				this.fightMask = false
			},

			// 


			// 切换即时列表的进行中 / 未开 / 完场 / 异常

			// 对战详情弹窗
			mouseenter(e, type, item) {
				this.dataMask = true
				this.fightMask = false

				// 输入移入调用详情接口
				/* 防止多次调用 */
				if (this.tlive.id == item.id) {
					this.ishow = true
					this.current = item.id
					this.tliveLoading = false
					return
				}
				if (type == 2) {
					let data = this.football_detail
					data.id = item.id
					data.home_score = item.home_score
					data.away_score = item.away_score
					data.home_team_name_zh = item.home_team_name_zh
					data.away_team_name_zh = item.away_team_name_zh
					this.tlive = data
					this.ishow = true
					this.current = item.id
					this.tliveLoading = false
				} else {
					this.getDetail(item, 1)
				}

			},
			// 调用详情
			getDetail(item, type) {
				// return
				this.current = item.id
				this.ishow = true
				this.tliveLoading = true
				getfootballDetail({
					id: item.id,
					list_show: 1
				}).then(res => {
					res.data.id = item.id
					res.data.home_score = item.home_score
					res.data.away_score = item.away_score
					res.data.home_team_name_zh = item.home_team_name_zh
					res.data.away_team_name_zh = item.away_team_name_zh
					res.data.tlive = res.data.tlive.reverse()
					this.tlive = res.data

					this.tliveLoading = false
				}).catch(res => {

				})
			},

			// 指数详情
			mouseenter1(e, type, item) {
				// this.fightMask = true
				this.dataMask = false
				let left, top
				if (type == 1) {
					top = this.$refs.sss1[e].getBoundingClientRect().top
					left = this.$refs.sss1[e].getBoundingClientRect().left
				} else if (type == 2) {
					top = this.$refs.sss[e].getBoundingClientRect().top
					left = this.$refs.sss[e].getBoundingClientRect().left
				} else if (type == 4) {
					// console.log('54444444444');
					top = this.$refs.sss4[e].getBoundingClientRect().top
					left = this.$refs.sss4[e].getBoundingClientRect().left
				} else {
					top = this.$refs.sss2[e].getBoundingClientRect().top
					left = this.$refs.sss2[e].getBoundingClientRect().left
				}
				this.expIndex = JSON.parse(JSON.stringify(item.exponent))
				this.exponent = item
				this.fightMask = true
				console.log(this.expIndex);
				// this.footballOddsList(item)
				this.top = (top - 194) + 'px'

				this.left = (left - 157) + 'px'
			},
			changes(val) {
				val.bs.scram.draw = 1
			},
			// 技术统计对比
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



			getlist() {
				if (this.first == 1) {
					this.$store.state.loading = true
				}

				if (this.id == null) return
				football_match({
						type: 0,
						is_web: 1,
						company_id: this.id
					})
					.then((res) => {
						// return
						this.allList = res.data.data
						// this.list3 = res.data.data.filter(obj => {
						// 	return obj.status === 8
						// })
						let list1 = []
						let list2 = []
						let list3 = []
						let list4 = []
						let list5 = []
						let arr = []
						res.data.data.forEach(obj => {
							if (obj.status === 8) {
								list3.push(obj)
							} else if (obj.status == 2 ||
								obj.status == 3 ||
								obj.status == 4 ||
								obj.status == 5 ||
								obj.status == 6 ||
								obj.status == 7) {
								let obj1 = {
									eu: {
										scram: {
											win: 0,
											draw: 0,
											fail: 0
										},
										initial: {
											win: 0,
											draw: 0,
											fail: 0
										},
										immediate: {
											win: 0,
											draw: 0,
											fail: 0
										},
									},
									bs: {
										scram: {
											win: 0,
											draw: 0,
											fail: 0
										},
										initial: {
											win: 0,
											draw: 0,
											fail: 0
										},
										immediate: {
											win: 0,
											draw: 0,
											fail: 0
										},
									},
									asia: {
										scram: {
											win: 0,
											draw: 0,
											fail: 0
										},
										initial: {
											win: 0,
											draw: 0,
											fail: 0
										},
										immediate: {
											win: 0,
											draw: 0,
											fail: 0
										},
									},

								}
								obj = Object.assign(obj, obj1);
								list1.push(obj)
							} else if (obj.status === 1) {
								list2.push(obj)
							} else if (obj.status == 9 ||
								obj.status == 10 ||
								obj.status == 11 ||
								obj.status == 12 ||
								obj.status == 13) {
								list5.push(obj)
							}
							arr.push(obj.competition_id)
						})
						this.list1 = list1
						this.list2 = list2
						this.list3 = list3
						this.list4 = list4
						this.list5 = list5
						if (this.list1.length < 18) {
							this.notStart = true
						}
						let obj2 = {
							a: this.list1.length,
							b: this.list2.length,
							c: this.list3.length,
							d: this.list5.length,
						}
						this.$emit('getNumber', obj2)
						if (this.first == 1) {
							this.screenList(arr, 'competition_id')
						}
						this.$store.state.loading = false
						this.setlist4()
						this.first++
						this.lock = false
						this.isUpdata = true
						//  this.list1 = res.data
					})
					.catch((res) => {});
			},

			// 收藏
			setCollect(item) {
				let data = {
					id: item.id,
					type: 2
				}
				collect(data).then(res => {
					if (item.is_collect == 0) {
						this.$message.success('收藏成功')
					} else {
						this.$message.success('已取消收藏')
					}
					item.is_collect = item.is_collect == 0 ? item.is_collect = 1 : item.is_collect = 0


				}).catch(res => {})
			},

		},
	};
</script>

<style>
	.container-section {
		overflow: visible !important;
	}

	.gou img {
		width: 20px;
		height: 20px;
	}

	.football-score-height-60 {
		height: 60px !important;
	}

	.width224 {
		min-height: 42px;
	}

	.popper {
		padding: 0 !important;
	}

	.highlight {
		color: red;
	}

	.hover-box {
		position: relative;
	}

	/* .components-box:hover, */
	.hover-box:hover .components-box {
		display: block !important;
	}

	/* .bf:hover + .components-box{
		display: block;
	} */

	.components-box {
		position: absolute;
		left: 44px;
		top: 0;
		z-index: 99;
	}

	/* @import '../../styles/style.css'; */
</style>
