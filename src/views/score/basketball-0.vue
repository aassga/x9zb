<template>
	<div style="height:100%">
		<section class="container-section" ref="complete2" id="uncoming" style="
		  margin-bottom: 10px;
		  box-shadow: rgb(238, 238, 238) 0px 1px 0px 0px inset;
		">
			<!-- <div class="title" style="display: flex">
						<div class="con">
							<img alt="a"
								src="../../assets/images/main-end.png"
								class="icon" />
							<div class="container-section-field">未开始的比赛</div>
						</div>
					</div> -->
			<ul>
				<div class="basketball-score-item" v-for="(item,index) in list4" :key="index" style="display: flex">
					<ul class="header">
						<li class="width88 text-center">
							<div class="baseball-league-name-container false"
								style="background-color: rgb(118, 145, 111)">
								<div class="league-name ellipsis" :style="{background: item.primary_color}">
									{{lang == 1?item.short_name_zht:lang==2?item.short_name_en:item.short_name_zh}}
								</div>
							</div>
						</li>
						<li class="width160 time-status">
							<div class="basketball-score-item-header-timeStatus">
								<span class="color-bc8c5a">{{item.status_name}} {{item.time_left}}</span>
							</div>
						</li>
						<li class="width236 modal-session">
							<div class="width45 text-center">1</div>
							<div class="width45 text-center">2</div>
							<div class="width45 text-center">3</div>
							<div class="width45 text-center">4</div>
							<div class="width56 text-center">OT</div>
						</li>
						<li class="width347 modal-score">
							<div class="width57 text-center">全场</div>
							<div class="width57 text-center">上下</div>
							<div class="width57 text-center">分差</div>
							<div class="width57 text-center">总分</div>
							<div class="width57 text-center">直播</div>
							<div class="width62 text-center">指数</div>
						</li>
						<li class="width121 text-center">让分</li>
						<li class="width124 text-center">总分</li>
						<li class="width80 text-center">数据</li>
						<li class="operation text-center" style="flex: 1 1 0%">功能</li>
					</ul>
					<ul class="basketball-score-item-body">
						<li class="gou-time width88">
							<div class="gou" @click="setId(item)">
								<img class="checkbox-icon"
									:src="basketList.indexOf(item.id) == -1?require('@/assets/images/check.png'):require('@/assets/images/check1.png')"
									alt="" />
							</div>
							<div class="time">
								<div class="time-down">{{item.match_time}}</div>
							</div>
						</li>
						<li class="width160 team-name">
							<div class="name ellipsis search-by-team-name border-bottom-dfe6f0">
								<img class="team-logo" :src="item.home_team_data.logo" width="48" height="48" /><span
									class="name-span ellipsis">{{lang == 1?item.home_team_data.short_name_zht:lang==2?item.home_team_data.short_name_en:item.home_team_data.short_name_zh}}</span>
								<div class="rank"></div>
							</div>
							<div class="name ellipsis search-by-team-name">
								<img class="team-logo" :src="item.away_team_data.logo" width="48" height="48" /><span
									class="name-span ellipsis">{{lang == 1?item.away_team_data.short_name_zht:lang==2?item.away_team_data.short_name_en:item.away_team_data.short_name_zh}}</span>
								<div class="rank"></div>
							</div>
						</li>
						<li class="quarter-section width236">
							<div class="op width45 text-center" v-for="(item2,index2) in item.home_scores"
								:key="index2">
								<div class="border-bottom-dfe6f0 color-333" v-for="(itme1,index1) in item.home_scores"
									v-if="index2 == index1">{{itme1}}</div>
								<div class="" v-for="(itme1,index1) in item.away_scores" v-if="index2 == index1">
									{{itme1}}
								</div>
							</div>

							<!-- <div class="op width56 text-center">
		          <div class="border-bottom-dfe6f0"></div>
		          <div class=""></div>
		        </div> -->
						</li>
						<li class="score-section">
							<div class="score-item quanchang width57">
								<div class="border-bottom-dfe6f0"><span>{{item.home_scores_total}}</span></div>
								<div class=""><span>{{item.away_scores_total}}</span></div>
							</div>
							<div class="score-item shangxia width57">
								<div class="border-bottom-dfe6f0">{{item.home_top_half}}/{{item.home_lower_half}}</div>
								<div>{{item.away_top_half}}/{{item.away_lower_half}}</div>
							</div>
							<div class="score-item width57">
								<div class="color-9197ad border-bottom-dfe6f0">
									<span style="margin-right: 5px">全</span>{{item.audience_score_gap}}
								</div>
								<div class="color-333"><span class="color-9197ad">半{{item.halftime_score_gap}}</span>
								</div>
							</div>
							<div class="score-item width57">
								<div class="border-bottom-dfe6f0 border-right-dfe6f0">
									<span style="margin-right: 5px">全</span>{{item.total_score}}
								</div>
								<div class="color-333 border-right-dfe6f0">
									<span class="color-9197ad">半{{item.total_half_time}}</span>
								</div>
							</div>
							<div class="score-item live width57">
								<div class="basketball-score-item-live">
									<div class="left">
										<router-link tag="a" target="_blank"
											:to="'/score-live?type=basketball&id='+item.id+ '&vid=' + item.vid ">
											<img v-if="item.mlive == 1" class="live-icon"
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAqxJREFUWAntVk1oE0EUfm/SWLqHNhtREZSiBxGkoODJXqLFiyB4qgc9eLFNiiIK+TE5mIOB/CBUpEmkh+LFQ85evIjiQbGignch/iCCZmNsYtom83xjs4fSZtndhFx0YHZ237z3fd+8fTuzAP96QyqVPMbrpzEkukxA44NICAKWCXFRPx5Ie64d2BUHkreZ2DcI8g4Hc9Gp5tfymlArHyDxJirFLQaV9k3MnQfFLbab6GZDRMn9GXejm49TuzMBABk9Wwh4NO0QAD50SradvyMBQPBWgYwm73z35woX+PYs9y/K5rY5E9BhMcLBpdrNK4f9ueIjEGNHAGFxoAIA8US71X5XCYfi+shI3Z8tzggPTHFtfHAqxFUGFAlX8DBfU9X6t2UjFjzmSxef+LQ9Eyxinru0K8S1AJOAhRwFia+q0VAK/D/aXKTXGXSSX8tP08dq7FmAAieiISkpXv3cekHJpDaWLbzk7XbJitic64sABcZpfy7Iex6TyUY1FtJZ1kmTxGocspq0NYe4wvRRX2ahwCLIiITOcTbyXCR77cT3JgDxMeCOGX/m7sdfmtxdiQTv8euYtkNs+rgSQAAVXu0lLrgHCqgSDV1sNWCei2GnCWx3dCVA1/A0JvMrjcjVfU1Yvw+SzrAoV82ZAISNFd5aqFd/w2xTtrLMOuqKuROElXDQtnhOu4FAeUkQ4PjJXojNWEcZ4ALTWW3CDO7HKHjDWO0HkBsMxS0IYdlNcD9iFLfwCLzBG0mtH4DOMLCmuFEFNRJz+1fX5TQQjjsDcemNVB72ipKWyn9yidC/sL8Z6AbHh8pB2aYICuHt5mNl569mTQjI+dKFrj8q1p8h4RSfarMkbf9fbNVD4g0buwqwzACvAI3E3ISQ4CoDUsC6nsq/V6fkVmX/LRsZ+APOsdzYLi53OgAAAABJRU5ErkJggg=="
												alt="videoIcon" />
										</router-link>
									</div>
								</div>
							</div>
							<div class="ouzhi width62">
								<div class="border-bottom-dfe6f0 up odds-up">
									<div class="num">{{item.bs.host}}</div>
									<div class="arrow"></div>
								</div>
								<div class="down odds-up">
									<div class="num">{{item.bs.guest}}</div>
									<div class="arrow"></div>
								</div>
							</div>
						</li>
						<li class="rangfen width121">
							<div class="top-wrap border-bottom-dfe6f0">
								<div class="data-wrap"></div>
								<div class="up">
									<div class="color-9197ad">主</div>
									<div class="num">
										<div>{{item.asia.host}}</div>
										<div class="arrow"></div>
									</div>
								</div>
							</div>
							<div class="down-wrap">
								<div class="data-wrap">{{item.asia.early}}</div>
								<div class="down">
									<div class="color-9197ad">客</div>
									<div class="num">
										<div>{{item.asia.guest}}</div>
										<div class="arrow"></div>
									</div>
								</div>
							</div>
						</li>
						<li class="zongfen width124">
							<div class="top-wrap border-bottom-dfe6f0">
								<div class="data-wrap"></div>
								<div class="up">
									<!-- <div class="color-9197ad">大</div> -->
									<div class="num">
										<div class="num">{{item.bs.host}}</div>
										<div class="arrow"></div>
									</div>
								</div>
							</div>
							<div class="down-wrap">
								<div class="data-wrap">
									<div class="num">{{item.bs.early}}</div>
								</div>
								<div class="down">
									<!-- <div class="color-9197ad">小</div> -->
									<div class="num">
										<div class="num">{{item.bs.guest}}</div>
										<div class="arrow"></div>
									</div>
								</div>
							</div>
						</li>
						<li class="data width80 border-right-dfe6f0">
							<!-- <div class="data-item">
		          <a @click="$router.push('/score-detail')">分析</a>
		        </div> -->
							<div class="data-item">
								<router-link tag="a" target="_blank" :to="'/score-detail?type=basketball&id='+item.id">
									指数</router-link>
								<!-- <a @click="$router.push('/score-detail?type=basketball&id='+item.id)">指数</a> -->
							</div>
						</li>
						<li class="score-item-operation">
							<div src="" class="arrow-top arrow-solid" @click="cancelTop(item)"></div>
							<img @click="setCollect(item)"
								:src="item.is_collect == 1?require('../../assets/images/shoucang1.png'):require('../../assets/images/shoucang.png')"
								class="collect">
						</li>
					</ul>
				</div>
			</ul>
		</section>



		<section class="container-section" v-if="arrList1.length != 0" ref="complete1" id="going" style="
        margin-bottom: 10px;
        box-shadow: rgb(238, 238, 238) 0px 1px 0px 0px inset;
      ">
			<div class="title" style="display: flex">
				<div class="con">
					<img alt="b" src="../../assets/images/main-beigin.png" class="icon" />
					<div class="container-section-field">进行中的比赛</div>
				</div>
			</div>
			<ul>
				<div class="basketball-score-item" :data-index="index" :data-id="item.id" :ref="item.id"
					data-list="arrList1" v-for="(item,index) in arrList1" :key="index" style="display: flex">
					<ul class="header">
						<li class="width88 text-center">
							<div class="baseball-league-name-container false"
								style="background-color: rgb(118, 145, 111)">
								<div class="league-name ellipsis" :style="{background: item.primary_color}">
									{{lang == 1?item.short_name_zht:lang==2?item.short_name_en:item.short_name_zh}}
								</div>
							</div>
						</li>
						<li class="width160 time-status">
							<div class="basketball-score-item-header-timeStatus">
								<span class="color-bc8c5a">{{item.status_name}} {{item.time_left}}</span>
							</div>
						</li>
						<li class="width236 modal-session">
							<div class="width45 text-center">1</div>
							<div class="width45 text-center">2</div>
							<div class="width45 text-center">3</div>
							<div class="width45 text-center">4</div>
							<div class="width56 text-center">OT</div>
						</li>
						<li class="width347 modal-score">
							<div class="width57 text-center">全场</div>
							<div class="width57 text-center">上下</div>
							<div class="width57 text-center">分差</div>
							<div class="width57 text-center">总分</div>
							<div class="width57 text-center">直播</div>
							<div class="width62 text-center">欧指</div>
						</li>
						<li class="width121 text-center">亚盘</li>
						<li class="width124 text-center">大小球</li>
						<li class="width80 text-center">数据</li>
						<li class="operation text-center" style="flex: 1 1 0%">功能</li>
					</ul>
					<ul class="basketball-score-item-body">
						<li class="gou-time width88">
							<div class="gou" @click="setId(item)">
								<img class="checkbox-icon"
									:src="basketList.indexOf(item.id) == -1?require('@/assets/images/check.png'):require('@/assets/images/check1.png')"
									alt="" />
							</div>
							<div class="time">
								<div class="time-down">{{item.match_time}}</div>
							</div>
						</li>
						<li class="width160 team-name">
							<div class="name ellipsis search-by-team-name border-bottom-dfe6f0">
								<img class="team-logo" :src="item.home_team_data.logo" width="48" height="48" /><span
									class="name-span ellipsis">{{lang == 1?item.home_team_data.short_name_zht:lang==2?item.home_team_data.short_name_en:item.home_team_data.short_name_zh}}</span>
								<div class="rank"></div>
							</div>
							<div class="name ellipsis search-by-team-name">
								<img class="team-logo" :src="item.away_team_data.logo" width="48" height="48" /><span
									class="name-span ellipsis">{{lang == 1?item.away_team_data.short_name_zht:lang==2?item.away_team_data.short_name_en:item.away_team_data.short_name_zh}}</span>
								<div class="rank"></div>
							</div>
						</li>
						<li class="quarter-section width236">
							<div class="op width45 text-center" v-for="(item2,index2) in item.home_scores"
								:key="index2">
								<div class="border-bottom-dfe6f0 color-333" v-for="(itme1,index1) in item.home_scores"
									v-if="index2 == index1">{{itme1}}</div>
								<div class="" v-for="(itme1,index1) in item.away_scores" v-if="index2 == index1">
									{{itme1}}
								</div>
							</div>

							<!-- <div class="op width56 text-center">
                <div class="border-bottom-dfe6f0"></div>
                <div class=""></div>
              </div> -->
						</li>
						<li class="score-section">
							<div class="score-item quanchang width57">
								<div class="border-bottom-dfe6f0" :class="item.red_bg == 2?'red-bg':''">
									<span>{{item.home_scores_total}}</span></div>
								<div class="" :class="item.red_bg == 3?'red-bg':''">
									<span>{{item.away_scores_total}}</span></div>
							</div>
							<div class="score-item shangxia width57">
								<div class="border-bottom-dfe6f0">{{item.home_top_half}}/{{item.home_lower_half}}</div>
								<div>{{item.away_top_half}}/{{item.away_lower_half}}</div>
							</div>
							<div class="score-item width57">
								<div class="color-9197ad border-bottom-dfe6f0">
									<span style="margin-right: 5px">全</span>{{item.audience_score_gap}}
								</div>
								<div class="color-333"><span class="color-9197ad">半{{item.halftime_score_gap}}</span>
								</div>
							</div>
							<div class="score-item width57">
								<div class="border-bottom-dfe6f0 border-right-dfe6f0">
									<span style="margin-right: 5px">全</span>{{item.total_score}}
								</div>
								<div class="color-333 border-right-dfe6f0">
									<span class="color-9197ad">半{{item.total_half_time}}</span>
								</div>
							</div>
							<div class="score-item live width57">
								<div class="basketball-score-item-live">
									<div class="left">
										<router-link tag="a" target="_blank"
											:to="'/score-live?type=basketball&id='+item.id+ '&vid=' + item.vid ">
											<img class="live-icon"
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAqxJREFUWAntVk1oE0EUfm/SWLqHNhtREZSiBxGkoODJXqLFiyB4qgc9eLFNiiIK+TE5mIOB/CBUpEmkh+LFQ85evIjiQbGignch/iCCZmNsYtom83xjs4fSZtndhFx0YHZ237z3fd+8fTuzAP96QyqVPMbrpzEkukxA44NICAKWCXFRPx5Ie64d2BUHkreZ2DcI8g4Hc9Gp5tfymlArHyDxJirFLQaV9k3MnQfFLbab6GZDRMn9GXejm49TuzMBABk9Wwh4NO0QAD50SradvyMBQPBWgYwm73z35woX+PYs9y/K5rY5E9BhMcLBpdrNK4f9ueIjEGNHAGFxoAIA8US71X5XCYfi+shI3Z8tzggPTHFtfHAqxFUGFAlX8DBfU9X6t2UjFjzmSxef+LQ9Eyxinru0K8S1AJOAhRwFia+q0VAK/D/aXKTXGXSSX8tP08dq7FmAAieiISkpXv3cekHJpDaWLbzk7XbJitic64sABcZpfy7Iex6TyUY1FtJZ1kmTxGocspq0NYe4wvRRX2ahwCLIiITOcTbyXCR77cT3JgDxMeCOGX/m7sdfmtxdiQTv8euYtkNs+rgSQAAVXu0lLrgHCqgSDV1sNWCei2GnCWx3dCVA1/A0JvMrjcjVfU1Yvw+SzrAoV82ZAISNFd5aqFd/w2xTtrLMOuqKuROElXDQtnhOu4FAeUkQ4PjJXojNWEcZ4ALTWW3CDO7HKHjDWO0HkBsMxS0IYdlNcD9iFLfwCLzBG0mtH4DOMLCmuFEFNRJz+1fX5TQQjjsDcemNVB72ipKWyn9yidC/sL8Z6AbHh8pB2aYICuHt5mNl569mTQjI+dKFrj8q1p8h4RSfarMkbf9fbNVD4g0buwqwzACvAI3E3ISQ4CoDUsC6nsq/V6fkVmX/LRsZ+APOsdzYLi53OgAAAABJRU5ErkJggg=="
												alt="videoIcon" />
										</router-link>
									</div>
									<div class="right" v-if="item.anchor.id">
										<router-link tag="a" target="_blank"
											:to="'/live?router=live&type=football&id='+item.anchor.match_id + '&uid=' + item.anchor.id + '&vid=' + item.vid">
											<img class="live-anchor"
												:src="item.anchor.avatar"
												alt="" width="36" height="36" title="" />
										</router-link>
										
									</div>
								</div>
							</div>
							<div class="ouzhi width62">
								<div class="border-bottom-dfe6f0"
									:class="item.eu1.host == 2?'red':item.eu1.host == 3?'green':''">
									<div class="num">{{item.eu.host}}</div>
									<div class="arrow"></div>
								</div>
								<div class="down" :class="item.eu1.guest == 2?'red':item.eu1.guest == 3?'green':''">
									<div class="num">{{item.eu.guest}}</div>
									<div class="arrow"></div>
								</div>
							</div>
						</li>
						<li class="rangfen width121">
							<div class="top-wrap border-bottom-dfe6f0">
								<div class="data-wrap"></div>
								<div class="up">
									<div class="color-9197ad">主</div>
									<div class="num"
										:class="item.asia1.host == 2?'red':item.asia1.host == 3?'green':''">
										<div>{{item.asia.host}}</div>
										<div class="arrow"></div>
									</div>
								</div>
							</div>
							<div class="down-wrap">
								<div class="data-wrap"
									:class="item.asia1.early == 2?'red-bg red':item.asia1.early == 3?'green-bg green':''">
									{{item.asia.early}}</div>
								<div class="down">
									<div class="color-9197ad">客</div>
									<div class="num"
										:class="item.asia1.guest == 2?'red':item.asia1.guest == 3?'green':''">
										<div>{{item.asia.guest}}</div>
										<div class="arrow"></div>
									</div>
								</div>
							</div>
						</li>
						<li class="zongfen width124">
							<div class="top-wrap border-bottom-dfe6f0">
								<div class="data-wrap"></div>
								<div class="up">
									<!-- <div class="color-9197ad">大</div> -->
									<div class="num">
										<div class="num"
											:class="item.bs1.host == 2?'red':item.bs1.host == 3?'green':''">
											{{item.bs.host}}</div>
										<div class="arrow"></div>
									</div>
								</div>
							</div>
							<div class="down-wrap">
								<div class="data-wrap"
									:class="item.bs1.early == 2?'red-bg red':item.bs1.early == 3?'green-bg green':''">
									<div class="num">{{item.bs.early}}</div>
								</div>
								<div class="down">
									<!-- <div class="color-9197ad">小</div> -->
									<div class="num">
										<div class="num"
											:class="item.bs1.guest == 2?'red':item.bs1.guest == 3?'green':''">
											{{item.bs.guest}}</div>
										<div class="arrow"></div>
									</div>
								</div>
							</div>
						</li>
						<li class="data width80 border-right-dfe6f0">
							<div class="data-item">
								<router-link tag="a" target="_blank"
									:to="'/score-detail?type=basketball&tabIndex=4&id='+item.id">分析</router-link>
							</div>
							<div class="data-item">
								<router-link tag="a" target="_blank" :to="'/score-detail?type=basketball&id='+item.id">
									指数</router-link>
							</div>
						</li>
						<li class="score-item-operation">
							<img src="../../assets/images/top.png" class="arrow-top" @click="setTop(item)">
							<img @click="setCollect(item)"
								:src="item.is_collect == 1?require('../../assets/images/shoucang1.png'):require('../../assets/images/shoucang.png')"
								class="collect">
						</li>
					</ul>
				</div>
			</ul>
		</section>
		<section class="container-section" ref="complete2" id="uncoming" style="
        margin-bottom: 10px;
        box-shadow: rgb(238, 238, 238) 0px 1px 0px 0px inset;
      ">
			<div class="title" style="display: flex">
				<div class="con">
					<img alt="a" src="../../assets/images/main-end.png" class="icon" />
					<div class="container-section-field">未开始的比赛</div>
				</div>
			</div>
			<ul>
				<div class="basketball-score-item" v-for="(item,index) in arrList2" :key="index" style="display: flex">
					<ul class="header">
						<li class="width88 text-center">
							<div class="baseball-league-name-container false"
								style="background-color: rgb(118, 145, 111)">
								<div class="league-name ellipsis" :style="{background: item.primary_color}">
									{{lang == 1?item.short_name_zht:lang==2?item.short_name_en:item.short_name_zh}}
								</div>
							</div>
						</li>
						<li class="width160 time-status">
							<div class="basketball-score-item-header-timeStatus">
								<span class="color-bc8c5a">{{item.status_name}} {{item.time_left}}</span>
							</div>
						</li>
						<li class="width236 modal-session">
							<div class="width45 text-center">1</div>
							<div class="width45 text-center">2</div>
							<div class="width45 text-center">3</div>
							<div class="width45 text-center">4</div>
							<div class="width56 text-center">OT</div>
						</li>
						<li class="width347 modal-score">
							<div class="width57 text-center">全场</div>
							<div class="width57 text-center">上下</div>
							<div class="width57 text-center">分差</div>
							<div class="width57 text-center">总分</div>
							<div class="width57 text-center">直播</div>
							<div class="width62 text-center">指数</div>
						</li>
						<li class="width121 text-center">让分</li>
						<li class="width124 text-center">总分</li>
						<li class="width80 text-center">数据</li>
						<li class="operation text-center" style="flex: 1 1 0%">功能</li>
					</ul>
					<ul class="basketball-score-item-body">
						<li class="gou-time width88">
							<div class="gou" @click="setId(item)">
								<img class="checkbox-icon"
									:src="basketList.indexOf(item.id) == -1?require('@/assets/images/check.png'):require('@/assets/images/check1.png')"
									alt="" />
							</div>
							<div class="time">
								<div class="time-down">{{item.match_time}}</div>
							</div>
						</li>
						<li class="width160 team-name">
							<div class="name ellipsis search-by-team-name border-bottom-dfe6f0">
								<img class="team-logo" :src="item.home_team_data.logo" width="48" height="48" /><span
									class="name-span ellipsis">{{lang == 1?item.home_team_data.short_name_zht:lang==2?item.home_team_data.short_name_en:item.home_team_data.short_name_zh}}</span>
								<div class="rank"></div>
							</div>
							<div class="name ellipsis search-by-team-name">
								<img class="team-logo" :src="item.away_team_data.logo" width="48" height="48" /><span
									class="name-span ellipsis">{{lang == 1?item.away_team_data.short_name_zht:lang==2?item.away_team_data.short_name_en:item.away_team_data.short_name_zh}}</span>
								<div class="rank"></div>
							</div>
						</li>
						<li class="quarter-section width236">
							<div class="op width45 text-center" v-for="(item2,index2) in item.home_scores"
								:key="index2">
								<div class="border-bottom-dfe6f0 color-333" v-for="(itme1,index1) in item.home_scores"
									v-if="index2 == index1">{{itme1}}</div>
								<div class="" v-for="(itme1,index1) in item.away_scores" v-if="index2 == index1">
									{{itme1}}
								</div>
							</div>

							<!-- <div class="op width56 text-center">
                <div class="border-bottom-dfe6f0"></div>
                <div class=""></div>
              </div> -->
						</li>
						<li class="score-section">
							<div class="score-item quanchang width57">
								<div class="border-bottom-dfe6f0"><span>{{item.home_scores_total}}</span></div>
								<div class=""><span>{{item.away_scores_total}}</span></div>
							</div>
							<div class="score-item shangxia width57">
								<div class="border-bottom-dfe6f0">{{item.home_top_half}}/{{item.home_lower_half}}</div>
								<div>{{item.away_top_half}}/{{item.away_lower_half}}</div>
							</div>
							<div class="score-item width57">
								<div class="color-9197ad border-bottom-dfe6f0">
									<span style="margin-right: 5px">全</span>{{item.audience_score_gap}}
								</div>
								<div class="color-333"><span class="color-9197ad">半{{item.halftime_score_gap}}</span>
								</div>
							</div>
							<div class="score-item width57">
								<div class="border-bottom-dfe6f0 border-right-dfe6f0">
									<span style="margin-right: 5px">全</span>{{item.total_score}}
								</div>
								<div class="color-333 border-right-dfe6f0">
									<span class="color-9197ad">半{{item.total_half_time}}</span>
								</div>
							</div>
							<div class="score-item live width57">
								<div class="basketball-score-item-live">
									<div class="left">
										<router-link tag="a" target="_blank"
											:to="'/score-live?type=basketball&id='+item.id+ '&vid=' + item.vid ">
											<img v-if="item.mlive == 1" class="live-icon"
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAqxJREFUWAntVk1oE0EUfm/SWLqHNhtREZSiBxGkoODJXqLFiyB4qgc9eLFNiiIK+TE5mIOB/CBUpEmkh+LFQ85evIjiQbGignch/iCCZmNsYtom83xjs4fSZtndhFx0YHZ237z3fd+8fTuzAP96QyqVPMbrpzEkukxA44NICAKWCXFRPx5Ie64d2BUHkreZ2DcI8g4Hc9Gp5tfymlArHyDxJirFLQaV9k3MnQfFLbab6GZDRMn9GXejm49TuzMBABk9Wwh4NO0QAD50SradvyMBQPBWgYwm73z35woX+PYs9y/K5rY5E9BhMcLBpdrNK4f9ueIjEGNHAGFxoAIA8US71X5XCYfi+shI3Z8tzggPTHFtfHAqxFUGFAlX8DBfU9X6t2UjFjzmSxef+LQ9Eyxinru0K8S1AJOAhRwFia+q0VAK/D/aXKTXGXSSX8tP08dq7FmAAieiISkpXv3cekHJpDaWLbzk7XbJitic64sABcZpfy7Iex6TyUY1FtJZ1kmTxGocspq0NYe4wvRRX2ahwCLIiITOcTbyXCR77cT3JgDxMeCOGX/m7sdfmtxdiQTv8euYtkNs+rgSQAAVXu0lLrgHCqgSDV1sNWCei2GnCWx3dCVA1/A0JvMrjcjVfU1Yvw+SzrAoV82ZAISNFd5aqFd/w2xTtrLMOuqKuROElXDQtnhOu4FAeUkQ4PjJXojNWEcZ4ALTWW3CDO7HKHjDWO0HkBsMxS0IYdlNcD9iFLfwCLzBG0mtH4DOMLCmuFEFNRJz+1fX5TQQjjsDcemNVB72ipKWyn9yidC/sL8Z6AbHh8pB2aYICuHt5mNl569mTQjI+dKFrj8q1p8h4RSfarMkbf9fbNVD4g0buwqwzACvAI3E3ISQ4CoDUsC6nsq/V6fkVmX/LRsZ+APOsdzYLi53OgAAAABJRU5ErkJggg=="
												alt="videoIcon" />
										</router-link>
									</div>
									<div class="right" v-if="item.anchor.id">
										<router-link tag="a" target="_blank"
											:to="'/live?router=live&type=football&id='+item.anchor.match_id + '&uid=' + item.anchor.id + '&vid=' + item.vid">
											<img class="live-anchor"
												:src="item.anchor.avatar"
												alt="" width="36" height="36" title="" />
										</router-link>
										
									</div>
								</div>
							</div>
							<div class="ouzhi width62">
								<div class="border-bottom-dfe6f0 up">
									<div class="num">{{item.eu.host}}</div>
									<div class="arrow"></div>
								</div>
								<div class="down">
									<div class="num">{{item.eu.guest}}</div>
									<div class="arrow"></div>
								</div>
							</div>
						</li>
						<li class="rangfen width121">
							<div class="top-wrap border-bottom-dfe6f0">
								<div class="data-wrap"></div>
								<div class="up">
									<div class="color-9197ad">主</div>
									<div class="num">
										<div>{{item.asia.host}}</div>
										<div class="arrow"></div>
									</div>
								</div>
							</div>
							<div class="down-wrap">
								<div class="data-wrap">{{item.asia.early}}</div>
								<div class="down">
									<div class="color-9197ad">客</div>
									<div class="num">
										<div>{{item.asia.guest}}</div>
										<div class="arrow"></div>
									</div>
								</div>
							</div>
						</li>
						<li class="zongfen width124">
							<div class="top-wrap border-bottom-dfe6f0">
								<div class="data-wrap"></div>
								<div class="up">
									<!-- <div class="color-9197ad">大</div> -->
									<div class="num">
										<div class="num">{{item.bs.host}}</div>
										<div class="arrow"></div>
									</div>
								</div>
							</div>
							<div class="down-wrap">
								<div class="data-wrap">
									<div class="num">{{item.bs.early}}</div>
								</div>
								<div class="down">
									<!-- <div class="color-9197ad">小</div> -->
									<div class="num">
										<div class="num">{{item.bs.guest}}</div>
										<div class="arrow"></div>
									</div>
								</div>
							</div>
						</li>
						<li class="data width80 border-right-dfe6f0">
							<div class="data-item">
								<router-link tag="a" target="_blank"
									:to="'/score-detail?type=basketball&tabIndex=4&id='+item.id">分析</router-link>
							</div>
							<div class="data-item">
								<router-link tag="a" target="_blank" :to="'/score-detail?type=basketball&id='+item.id">
									指数</router-link>
								<!-- <a @click="$router.push('/score-detail?type=basketball&id='+item.id)">指数</a> -->
							</div>
						</li>
						<li class="score-item-operation">
							<img src="../../assets/images/top.png" class="arrow-top" @click="setTop(item)">
							<img @click="setCollect(item)"
								:src="item.is_collect == 1?require('../../assets/images/shoucang1.png'):require('../../assets/images/shoucang.png')"
								class="collect">
						</li>
					</ul>
				</div>
			</ul>
		</section>
		<section class="container-section" ref="complete3" id="finished" style="
        margin-bottom: 10px;
        box-shadow: rgb(238, 238, 238) 0px 1px 0px 0px inset;
      ">
			<div class="title" style="display: flex">
				<div class="con">
					<img alt="c" src="../../assets/images/main-ends.png" class="icon" />
					<div class="container-section-field">已结束的比赛</div>
				</div>
			</div>
			<ul v-if="isEndTime">
				<div class="basketball-score-item" v-for="(item,index) in arrList3" :key="index" style="display: flex">
					<ul class="header">
						<li class="width88 text-center">
							<div class="baseball-league-name-container false"
								style="background-color: rgb(118, 145, 111)">
								<div class="league-name ellipsis" :style="{background: item.primary_color}">
									{{lang == 1?item.short_name_zht:lang==2?item.short_name_en:item.short_name_zh}}
								</div>
							</div>
						</li>
						<li class="width160 time-status">
							<div class="basketball-score-item-header-timeStatus">
								<span class="color-bc8c5a">{{item.status_name}} {{item.time_left}}</span>
							</div>
						</li>
						<li class="width236 modal-session">
							<div class="width45 text-center">1</div>
							<div class="width45 text-center">2</div>
							<div class="width45 text-center">3</div>
							<div class="width45 text-center">4</div>
							<div class="width56 text-center">OT</div>
						</li>
						<li class="width347 modal-score">
							<div class="width57 text-center">全场</div>
							<div class="width57 text-center">上下</div>
							<div class="width57 text-center">分差</div>
							<div class="width57 text-center">总分</div>
							<div class="width57 text-center">直播</div>
							<div class="width62 text-center">指数</div>
						</li>
						<li class="width121 text-center">让分</li>
						<li class="width124 text-center">总分</li>
						<li class="width80 text-center">数据</li>
						<li class="operation text-center" style="flex: 1 1 0%">功能</li>
					</ul>
					<ul class="basketball-score-item-body">
						<li class="gou-time width88">
							<div class="gou" @click="setId(item)">
								<img class="checkbox-icon"
									:src="basketList.indexOf(item.id) == -1?require('@/assets/images/check.png'):require('@/assets/images/check1.png')"
									alt="" />
							</div>
							<div class="time">
								<div class="time-down">{{item.match_time}}</div>
							</div>
						</li>
						<li class="width160 team-name">
							<div class="name ellipsis search-by-team-name border-bottom-dfe6f0">
								<img class="team-logo" :src="item.home_team_data.logo" width="48" height="48" /><span
									class="name-span ellipsis">{{lang == 1?item.home_team_data.short_name_zht:lang==2?item.home_team_data.short_name_en:item.home_team_data.short_name_zh}}</span>
								<div class="rank"></div>
							</div>
							<div class="name ellipsis search-by-team-name">
								<img class="team-logo" :src="item.away_team_data.logo" width="48" height="48" /><span
									class="name-span ellipsis">{{lang == 1?item.away_team_data.short_name_zht:lang==2?item.away_team_data.short_name_en:item.away_team_data.short_name_zh}}</span>
								<div class="rank"></div>
							</div>
						</li>
						<li class="quarter-section width236">
							<div class="op width45 text-center" v-for="(item2,index2) in item.home_scores"
								:key="index2">
								<div class="border-bottom-dfe6f0 color-333" v-for="(itme1,index1) in item.home_scores"
									v-if="index2 == index1">{{itme1}}</div>
								<div class="" v-for="(itme1,index1) in item.away_scores" v-if="index2 == index1">
									{{itme1}}
								</div>
							</div>

							<!-- <div class="op width56 text-center">
                <div class="border-bottom-dfe6f0"></div>
                <div class=""></div>
              </div> -->
						</li>
						<li class="score-section">
							<div class="score-item quanchang width57">
								<div class="border-bottom-dfe6f0"><span>{{item.home_scores_total}}</span></div>
								<div class=""><span>{{item.away_scores_total}}</span></div>
							</div>
							<div class="score-item shangxia width57">
								<div class="border-bottom-dfe6f0">{{item.home_top_half}}/{{item.home_lower_half}}</div>
								<div>{{item.away_top_half}}/{{item.away_lower_half}}</div>
							</div>
							<div class="score-item width57">
								<div class="color-9197ad border-bottom-dfe6f0">
									<span style="margin-right: 5px">全</span>{{item.audience_score_gap}}
								</div>
								<div class="color-333"><span class="color-9197ad">半{{item.halftime_score_gap}}</span>
								</div>
							</div>
							<div class="score-item width57">
								<div class="border-bottom-dfe6f0 border-right-dfe6f0">
									<span style="margin-right: 5px">全</span>{{item.total_score}}
								</div>
								<div class="color-333 border-right-dfe6f0">
									<span class="color-9197ad">半{{item.total_half_time}}</span>
								</div>
							</div>
							<div class="score-item live width57">
								<div class="basketball-score-item-live">
									<div class="left">
										<router-link tag="a" target="_blank"
											:to="'/score-live?type=basketball&id='+item.id+ '&vid=' + item.vid ">
											<img v-if="item.mlive == 1" class="live-icon"
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAqxJREFUWAntVk1oE0EUfm/SWLqHNhtREZSiBxGkoODJXqLFiyB4qgc9eLFNiiIK+TE5mIOB/CBUpEmkh+LFQ85evIjiQbGignch/iCCZmNsYtom83xjs4fSZtndhFx0YHZ237z3fd+8fTuzAP96QyqVPMbrpzEkukxA44NICAKWCXFRPx5Ie64d2BUHkreZ2DcI8g4Hc9Gp5tfymlArHyDxJirFLQaV9k3MnQfFLbab6GZDRMn9GXejm49TuzMBABk9Wwh4NO0QAD50SradvyMBQPBWgYwm73z35woX+PYs9y/K5rY5E9BhMcLBpdrNK4f9ueIjEGNHAGFxoAIA8US71X5XCYfi+shI3Z8tzggPTHFtfHAqxFUGFAlX8DBfU9X6t2UjFjzmSxef+LQ9Eyxinru0K8S1AJOAhRwFia+q0VAK/D/aXKTXGXSSX8tP08dq7FmAAieiISkpXv3cekHJpDaWLbzk7XbJitic64sABcZpfy7Iex6TyUY1FtJZ1kmTxGocspq0NYe4wvRRX2ahwCLIiITOcTbyXCR77cT3JgDxMeCOGX/m7sdfmtxdiQTv8euYtkNs+rgSQAAVXu0lLrgHCqgSDV1sNWCei2GnCWx3dCVA1/A0JvMrjcjVfU1Yvw+SzrAoV82ZAISNFd5aqFd/w2xTtrLMOuqKuROElXDQtnhOu4FAeUkQ4PjJXojNWEcZ4ALTWW3CDO7HKHjDWO0HkBsMxS0IYdlNcD9iFLfwCLzBG0mtH4DOMLCmuFEFNRJz+1fX5TQQjjsDcemNVB72ipKWyn9yidC/sL8Z6AbHh8pB2aYICuHt5mNl569mTQjI+dKFrj8q1p8h4RSfarMkbf9fbNVD4g0buwqwzACvAI3E3ISQ4CoDUsC6nsq/V6fkVmX/LRsZ+APOsdzYLi53OgAAAABJRU5ErkJggg=="
												alt="videoIcon" />
										</router-link>
									</div>
								</div>
							</div>
							<div class="ouzhi width62">
								<div class="border-bottom-dfe6f0 up">
									<div class="num">{{item.eu.host}}</div>
									<div class="arrow"></div>
								</div>
								<div class="down">
									<div class="num">{{item.eu.guest}}</div>
									<div class="arrow"></div>
								</div>
							</div>
						</li>
						<li class="rangfen width121">
							<div class="top-wrap border-bottom-dfe6f0">
								<div class="data-wrap"></div>
								<div class="up">
									<div class="color-9197ad">主</div>
									<div class="num">
										<div>{{item.asia.host}}</div>
										<div class="arrow"></div>
									</div>
								</div>
							</div>
							<div class="down-wrap">
								<div class="data-wrap">{{item.asia.early}}</div>
								<div class="down">
									<div class="color-9197ad">客</div>
									<div class="num">
										<div>{{item.asia.guest}}</div>
										<div class="arrow"></div>
									</div>
								</div>
							</div>
						</li>
						<li class="zongfen width124">
							<div class="top-wrap border-bottom-dfe6f0">
								<div class="data-wrap"></div>
								<div class="up">
									<!-- <div class="color-9197ad">大</div> -->
									<div class="num">
										<div class="num">{{item.bs.host}}</div>
										<div class="arrow"></div>
									</div>
								</div>
							</div>
							<div class="down-wrap">
								<div class="data-wrap">
									<div class="num">{{item.bs.early}}</div>
								</div>
								<div class="down">
									<!-- <div class="color-9197ad">小</div> -->
									<div class="num">
										<div class="num">{{item.bs.guest}}</div>
										<div class="arrow"></div>
									</div>
								</div>
							</div>
						</li>
						<li class="data width80 border-right-dfe6f0">
							<div class="data-item">
								<router-link tag="a" target="_blank"
									:to="'/score-detail?type=basketball&tabIndex=4&id='+item.id">分析</router-link>
							</div>
							<div class="data-item">
								<router-link tag="a" target="_blank" :to="'/score-detail?type=basketball&id='+item.id">
									指数</router-link>
							</div>
						</li>
						<li class="score-item-operation">
							<img src="../../assets/images/top.png" class="arrow-top" @click="setTop(item)">
							<img @click="setCollect(item)"
								:src="item.is_collect == 1?require('../../assets/images/shoucang1.png'):require('../../assets/images/shoucang.png')"
								class="collect">
						</li>
					</ul>
				</div>
			</ul>
		</section>
		<section class="container-section" ref="complete4" id="finished" style="
		  margin-bottom: 10px;
		  box-shadow: rgb(238, 238, 238) 0px 1px 0px 0px inset;
		">
			<div class="title" style="display: flex">
				<div class="con">
					<img alt="c" src="../../assets/images/main-yi.png" class="icon" />
					<div class="container-section-field">异常的比赛</div>
				</div>
			</div>
			<ul v-if="isAbnormalTime">
				<div class="basketball-score-item" v-for="(item,index) in arrList5" :key="index" style="display: flex">
					<ul class="header">
						<li class="width88 text-center">
							<div class="baseball-league-name-container false"
								style="background-color: rgb(118, 145, 111)">
								<div class="league-name ellipsis" :style="{background: item.primary_color}">
									{{lang == 1?item.short_name_zht:lang==2?item.short_name_en:item.short_name_zh}}
								</div>
							</div>
						</li>
						<li class="width160 time-status">
							<div class="basketball-score-item-header-timeStatus">
								<span class="color-bc8c5a">{{item.status_name}} {{item.time_left}}</span>
							</div>
						</li>
						<li class="width236 modal-session">
							<div class="width45 text-center">1</div>
							<div class="width45 text-center">2</div>
							<div class="width45 text-center">3</div>
							<div class="width45 text-center">4</div>
							<div class="width56 text-center">OT</div>
						</li>
						<li class="width347 modal-score">
							<div class="width57 text-center">全场</div>
							<div class="width57 text-center">上下</div>
							<div class="width57 text-center">分差</div>
							<div class="width57 text-center">总分</div>
							<div class="width57 text-center">直播</div>
							<div class="width62 text-center">指数</div>
						</li>
						<li class="width121 text-center">让分</li>
						<li class="width124 text-center">总分</li>
						<li class="width80 text-center">数据</li>
						<li class="operation text-center" style="flex: 1 1 0%">功能</li>
					</ul>
					<ul class="basketball-score-item-body">
						<li class="gou-time width88">
							<div class="gou" @click="setId(item)">
								<img class="checkbox-icon"
									:src="basketList.indexOf(item.id) == -1?require('@/assets/images/check.png'):require('@/assets/images/check1.png')"
									alt="" />
							</div>
							<div class="time">
								<div class="time-down">{{item.match_time}}</div>
							</div>
						</li>
						<li class="width160 team-name">
							<div class="name ellipsis search-by-team-name border-bottom-dfe6f0">
								<img class="team-logo" :src="item.home_team_data.logo" width="48" height="48" /><span
									class="name-span ellipsis">{{lang == 1?item.home_team_data.short_name_zht:lang==2?item.home_team_data.short_name_en:item.home_team_data.short_name_zh}}</span>
								<div class="rank"></div>
							</div>
							<div class="name ellipsis search-by-team-name">
								<img class="team-logo" :src="item.away_team_data.logo" width="48" height="48" /><span
									class="name-span ellipsis">{{lang == 1?item.away_team_data.short_name_zht:lang==2?item.away_team_data.short_name_en:item.away_team_data.short_name_zh}}</span>
								<div class="rank"></div>
							</div>
						</li>
						<li class="quarter-section width236">
							<div class="op width45 text-center" v-for="(item2,index2) in item.home_scores"
								:key="index2">
								<div class="border-bottom-dfe6f0 color-333" v-for="(itme1,index1) in item.home_scores"
									v-if="index2 == index1">{{itme1}}</div>
								<div class="" v-for="(itme1,index1) in item.away_scores" v-if="index2 == index1">
									{{itme1}}
								</div>
							</div>

							<!-- <div class="op width56 text-center">
		          <div class="border-bottom-dfe6f0"></div>
		          <div class=""></div>
		        </div> -->
						</li>
						<li class="score-section">
							<div class="score-item quanchang width57">
								<div class="border-bottom-dfe6f0"><span>{{item.home_scores_total}}</span></div>
								<div class=""><span>{{item.away_scores_total}}</span></div>
							</div>
							<div class="score-item shangxia width57">
								<div class="border-bottom-dfe6f0">{{item.home_top_half}}/{{item.home_lower_half}}</div>
								<div>{{item.away_top_half}}/{{item.away_lower_half}}</div>
							</div>
							<div class="score-item width57">
								<div class="color-9197ad border-bottom-dfe6f0">
									<span style="margin-right: 5px">全</span>{{item.audience_score_gap}}
								</div>
								<div class="color-333"><span class="color-9197ad">半{{item.halftime_score_gap}}</span>
								</div>
							</div>
							<div class="score-item width57">
								<div class="border-bottom-dfe6f0 border-right-dfe6f0">
									<span style="margin-right: 5px">全</span>{{item.total_score}}
								</div>
								<div class="color-333 border-right-dfe6f0">
									<span class="color-9197ad">半{{item.total_half_time}}</span>
								</div>
							</div>
							<div class="score-item live width57">
								<div class="basketball-score-item-live">
									<div class="left">
										<router-link tag="a" target="_blank"
											:to="'/score-live?type=basketball&id='+item.id+ '&vid=' + item.vid ">
											<img v-if="item.mlive == 1" class="live-icon"
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAqxJREFUWAntVk1oE0EUfm/SWLqHNhtREZSiBxGkoODJXqLFiyB4qgc9eLFNiiIK+TE5mIOB/CBUpEmkh+LFQ85evIjiQbGignch/iCCZmNsYtom83xjs4fSZtndhFx0YHZ237z3fd+8fTuzAP96QyqVPMbrpzEkukxA44NICAKWCXFRPx5Ie64d2BUHkreZ2DcI8g4Hc9Gp5tfymlArHyDxJirFLQaV9k3MnQfFLbab6GZDRMn9GXejm49TuzMBABk9Wwh4NO0QAD50SradvyMBQPBWgYwm73z35woX+PYs9y/K5rY5E9BhMcLBpdrNK4f9ueIjEGNHAGFxoAIA8US71X5XCYfi+shI3Z8tzggPTHFtfHAqxFUGFAlX8DBfU9X6t2UjFjzmSxef+LQ9Eyxinru0K8S1AJOAhRwFia+q0VAK/D/aXKTXGXSSX8tP08dq7FmAAieiISkpXv3cekHJpDaWLbzk7XbJitic64sABcZpfy7Iex6TyUY1FtJZ1kmTxGocspq0NYe4wvRRX2ahwCLIiITOcTbyXCR77cT3JgDxMeCOGX/m7sdfmtxdiQTv8euYtkNs+rgSQAAVXu0lLrgHCqgSDV1sNWCei2GnCWx3dCVA1/A0JvMrjcjVfU1Yvw+SzrAoV82ZAISNFd5aqFd/w2xTtrLMOuqKuROElXDQtnhOu4FAeUkQ4PjJXojNWEcZ4ALTWW3CDO7HKHjDWO0HkBsMxS0IYdlNcD9iFLfwCLzBG0mtH4DOMLCmuFEFNRJz+1fX5TQQjjsDcemNVB72ipKWyn9yidC/sL8Z6AbHh8pB2aYICuHt5mNl569mTQjI+dKFrj8q1p8h4RSfarMkbf9fbNVD4g0buwqwzACvAI3E3ISQ4CoDUsC6nsq/V6fkVmX/LRsZ+APOsdzYLi53OgAAAABJRU5ErkJggg=="
												alt="videoIcon" />
										</router-link>
									</div>
								</div>
							</div>
							<div class="ouzhi width62">
								<div class="border-bottom-dfe6f0 up">
									<div class="num">{{item.bs.host}}</div>
									<div class="arrow"></div>
								</div>
								<div class="down">
									<div class="num">{{item.bs.guest}}</div>
									<div class="arrow"></div>
								</div>
							</div>
						</li>
						<li class="rangfen width121">
							<div class="top-wrap border-bottom-dfe6f0">
								<div class="data-wrap"></div>
								<div class="up">
									<div class="color-9197ad">主</div>
									<div class="num">
										<div>{{item.asia.host}}</div>
										<div class="arrow"></div>
									</div>
								</div>
							</div>
							<div class="down-wrap">
								<div class="data-wrap">{{item.asia.early}}</div>
								<div class="down">
									<div class="color-9197ad">客</div>
									<div class="num">
										<div>{{item.asia.guest}}</div>
										<div class="arrow"></div>
									</div>
								</div>
							</div>
						</li>
						<li class="zongfen width124">
							<div class="top-wrap border-bottom-dfe6f0">
								<div class="data-wrap"></div>
								<div class="up">
									<!-- <div class="color-9197ad">大</div> -->
									<div class="num">
										<div class="num">{{item.bs.host}}</div>
										<div class="arrow"></div>
									</div>
								</div>
							</div>
							<div class="down-wrap">
								<div class="data-wrap">
									<div class="num">{{item.bs.early}}</div>
								</div>
								<div class="down">
									<!-- <div class="color-9197ad">小</div> -->
									<div class="num">
										<div class="num">{{item.bs.guest}}</div>
										<div class="arrow"></div>
									</div>
								</div>
							</div>
						</li>
						<li class="data width80 border-right-dfe6f0">
							<div class="data-item">
								<router-link tag="a" target="_blank"
									:to="'/score-detail?type=basketball&tabIndex=4&id='+item.id">分析</router-link>
							</div>
							<div class="data-item">
								<router-link tag="a" target="_blank" :to="'/score-detail?type=basketball&id='+item.id">
									指数</router-link>
							</div>
						</li>
						<li class="score-item-operation">
							<img src="../../assets/images/top.png" class="arrow-top" @click="setTop(item)">
							<img @click="setCollect(item)"
								:src="item.is_collect == 1?require('../../assets/images/shoucang1.png'):require('../../assets/images/shoucang.png')"
								class="collect">
						</li>
					</ul>
				</div>
			</ul>
		</section>
	</div>
</template>

<script>
	import {
		getList
	} from "@/api/basketball.js";
	import {
		collect
	} from "@/api/common.js";
	export default {
		props: {
			lang: {
				type: Number,
				default: 0
			},
			typeTab: { //即时列表切换进行中/ 未开 / 完场
				type: Number,
				default: 0
			},
		},
		data() {
			return {
				i: 1,
				lock: false,
				list1: [],
				list2: [],
				list3: [],
				list4: [],
				list5: [],
				basketList: [],
				topList: [],
				screenListT: [], //筛选选中列表
				concealList: [],
				isAbnormalTime:false,
				isEndTime:false,
				notStart:false,
				screenStatus: 'competition_id',
			};
		},
		watch: {
			// 获取距离元素到顶部的距离
			typeTab(type) {
				let num = null
				if (type == 0) {
					num = this.$refs.complete1.offsetTop
				} else if (type == 1) {
					num = this.$refs.complete2.offsetTop
				} else if (type == 2) {
					num = this.$refs.complete3.offsetTop
				} else {
					num = this.$refs.complete4.offsetTop
				}
				// console.log(this.$refs.scroll.wrap)
				// this.$refs.scroll.wrap.scrollTop = this.$refs.complete.offsetTop
				// if (type == 3) {
				// 	console.log()
				// }
				// console.log(num)
				this.$emit('setTypeTab', num)
			},
			// 篮球比分数据
			'$store.state.basketball_exponent'(e) {
				// return

				let id = null
				if (e.type == 'basketball_match') {
					id = e.match_id
				} else {
					id = e.team_id
				}
				let dom1 = this.$refs[id]
				let _this = this
				if (dom1 != undefined) {
					let obj = dom1[0].dataset
					let item = this[obj.list][Number(obj.index)]
					if (item.id == id && e.type == 'basketball_match') {
						if (Number(item.home_scores_total) != Number(e.home_scores_total)) {
							item.red_bg = 2
							setTimeout(res => {
								item.red_bg = 1
							}, 3000)
						} else if (Number(item.away_scores_total) != Number(e.away_scores_total)) {
							item.red_bg = 3
							setTimeout(res => {
								item.red_bg = 1
							}, 3000)
						}

					}
					if (item.id == id && e.type == 'basketball_exponent') {
						item[e.exponent + '1'].host = _this.setExp(Number(item[e.exponent].host), Number(e[e.exponent]
							.host))
						item[e.exponent + '1'].guest = _this.setExp(Number(item[e.exponent].guest), Number(e[e.exponent]
							.guest))
						item[e.exponent + '1'].early = _this.setExp(Number(item[e.exponent].early), Number(e[e.exponent]
							.early))
						if (item[e.exponent + '1'].timer == undefined || item[e.exponent + '1'].timer == null) {
							item[e.exponent + '1'].timer = setTimeout(res => {
								item[e.exponent + '1'].host = 0
								item[e.exponent + '1'].guest = 0
								item[e.exponent + '1'].early = 0
							}, 3000)
						} else {
							clearTimeout(item[e.exponent + '1'].timer);
							item[e.exponent + '1'].timer = null
						}
						// item.exponent = this.$common.assignDeep(item.exponent, e.exponent)
						Object.assign(item, e)
					}


					if (item.id === id && item.status_id != e.status_id) { //判断转台是否一致
						if (this.lock) return
						this.lock = true //锁住
						this.getlist()
					}

					if (item.id === id) {
						Object.assign(item, e)
					}

				}
				/* 
				判断 欧指+亚盘+大小球
				1.socket > 列表  =红色
				2.socket < 列表 = 绿色
				3.socket == 列表 = 变化 
				 
				 */


				// num-wrap odds-up red-bg odds-up
				// num-wrap odds-down green-bg
				// if(item.id === id && item.status_id !== e.status_id){
				// 	if(this.lock) return
				// 	this.lock = true//锁住
				// 	this.getlist()
				// }
				return
				this.list1 = this.list1.map(item => {
					if (item.id == id) {
						return item = {
							...item,
							...e
						}
					} else {
						return item
					}

				})

			}

		},
		computed: {
			arrList1() {
				return this.list1.filter(item => {
					return this.topList.indexOf(item.id) === -1 && this.concealList.indexOf(item.id) === -1 && this
						.screenListT.indexOf(item[this.screenStatus]) != -1
				})
				// return arr
			},
			arrList2() {

				return this.list2.filter(item => {
					return this.topList.indexOf(item.id) === -1 && this.concealList.indexOf(item.id) === -1 && this
						.screenListT.indexOf(item[this.screenStatus]) != -1
				})
				// return arr
			},
			arrList3() {
				return this.list3.filter(item => {
					return this.topList.indexOf(item.id) === -1 && this.concealList.indexOf(item.id) === -1 && this
						.screenListT.indexOf(item[this.screenStatus]) != -1
				})
				// return arr
			},
			arrList5() {
				return this.list5.filter(item => {
					return this.topList.indexOf(item.id) === -1 && this.concealList.indexOf(item.id) === -1 && this
						.screenListT.indexOf(item[this.screenStatus]) != -1
				})
				// return arr
			},
		},
		mounted() {
			this.topList = JSON.parse(localStorage.getItem('topList1')) || []
			this.getlist()
			// setInterval(res=>{
			// 	this.getlist();
			// },60000)
			// this.getlist2()
			// this.getlist3()
		},
		methods: {
			// 1相等 ， 2 大于 ，3小于
			setExp(num1, num2) {
				if (num1 < num2) {
					return 3
				} else if (num1 > num2) {
					return 2
				} else if (num1 == num2) {
					return 1
				}


			},
			
			/* 监听滚动条位置 */
			handleScroll(e){
				/* 
				 1.隐藏已结束的比赛
				 实现：监听滚动条 
				 */
				/* 判断当前页面是足球即时比分 */
				// football
				// console.log(e);
				let router = this.$route
				if(router.path != '/basketball') return
				// console.log(router);
				
				/* 监听距离 已结束的距离 */
				let value =  document.documentElement.scrollTop
				/* 已结束 */
				let  endTime =  this.$refs.complete3.getBoundingClientRect().top
				/* 异常 */
				let  abnormalTime =  this.$refs.complete4.getBoundingClientRect().top
				/* 未开始 */
				let  notStart =  this.$refs.complete2.getBoundingClientRect().top
				// console.log(notStart);
				if(endTime < 1000 && !this.isEndTime) {
					this.isEndTime = true
				}
				if(abnormalTime < 1000 && !this.isAbnormalTime) {
					this.isAbnormalTime = true
				}
				if(notStart < 1000 && !this.notStart) {
					this.notStart = true
				}
				// let a = this.$refs.complete2.offsetTop
				// let b = this.$refs.complete3.offsetTop
				// let c = this.$refs.complete5.offsetTop
			},
			
			// 隐藏
			conceal() {
				if (this.basketList.length == 0) return
				this.concealList = this.basketList
				this.basketList = []
				this.$store.state.concealNum = this.concealList.length
			},
			// 保留
			retain() {
				if (this.basketList.length == 0) return
				// 获取所有的列表 push（id）
				let arr = []
				this.arrList1.forEach(item => {
					if (this.basketList.indexOf(item.id) === -1) {
						arr.push(item.id)
					}
				})
				this.arrList2.forEach(item => {
					if (this.basketList.indexOf(item.id) === -1) {
						arr.push(item.id)
					}
				})
				this.arrList3.forEach(item => {
					if (this.basketList.indexOf(item.id) === -1) {
						arr.push(item.id)
					}
				})
				this.arrList5.forEach(item => {
					if (this.basketList.indexOf(item.id) === -1) {
						arr.push(item.id)
					}
				})
				this.concealList = arr
				this.$store.state.concealNum = arr.length
			},
			// 收藏
			collect() {
				if (this.basketList.length == 0) return
				let data = {
					id: this.basketList.toString(),
					type: 2
				}
				collect(data).then(res => {
					this.getlist()

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
			// 点击置顶/取消操作 1.置顶：需添加，删除
			setTop(item) {
				// let topList = 
				let id = null
				this.topList.forEach(item1 => {
					if (item1 == item.id) {
						id = item1
					}
				})
				if (id == item.id) return
				this.topList.push(item.id)
				localStorage.setItem('topList1', JSON.stringify(this.topList))
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
				localStorage.setItem('topList1', JSON.stringify(this.topList))
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

				// list.forEach((item,index)=>{
				// 	topList.forEach(item1=>{
				// 		if(item.id == item1){
				// 			list4.push(item)
				// 		}
				// 	})
				// })
				// this.list4 = list4
				// console.log(this.topList);
			},
			// 收藏
			setCollect(item) {
				let data = {
					id: item.id,
					type: 1
				}
				collect(data).then(res => {
					item.is_collect = item.is_collect == 0 ? item.is_collect = 1 : item.is_collect = 0
				}).catch(res => {})
			},
			// 收藏 取消收藏
			setId(item) {
				let _this = this
				if (this.basketList.indexOf(item.id) == -1) {
					this.basketList.push(item.id)
				} else {
					this.basketList.splice(_this.basketList.indexOf(item.id), 1)
				}
			},

			// 比赛已开始
			getlist() {
				getList({
						type: 0,
						isWeb: 1
					})
					.then((res) => {
						// 根据分类查询id
						//         状态
						// 2第一节 3第一节完 4第二节 5第二节完 6第三节 7第三节完 8第四节 9加时
						// 比赛中
						// 1未开赛
						// 0异常11中断 12取消 13延期 14腰斩 15待定
						// 异常
						// 10完场
						// 已完赛
						let list1 = []
						let list2 = []
						let list3 = []
						let list4 = []
						let list5 = []
						res.data.data.forEach(item => {
							let obj = {
								asia1: {
									host: 1,
									early: 1,
									guest: 1,
									timer: null
								},
								eu1: {
									host: 1,
									early: 1,
									guest: 1,
									timer: null
								},
								bs1: {
									host: 1,
									early: 1,
									guest: 1,
									timer: null
								}
							}
							/* 设置自定义值修改背景色 */
							item = {
								...item,
								...obj
							}
							item.red_bg = 1
							if (item.status_id == 2 || item.status_id == 3 || item.status_id == 4 || item
								.status_id == 5 || item.status_id == 6 || item.status_id == 7 || item
								.status_id == 8 ||
								item.status_id == 9) {
								list1.push(item)
							} else if (item.status_id == 1) {
								list2.push(item)
							} else if (item.status_id == 10) {
								list3.push(item)
							} else if (item.status_id == 0) {
								list5.push(item)
							}
						})
						this.list1 = list1
						// console.log(this.list1);
						this.list2 = list2
						this.list3 = list3
						this.list5 = list5
						this.setlist4()
						this.lock = false
						//  this.list1 = res.data.data
					})
					.catch((res) => {});
			},
			// 赛程
			getlist2() {
				getList({
						type: 2
					})
					.then((res) => {
						this.list2 = res.data
					})
					.catch((res) => {});
			},
			// 赛果
			getlist3() {
				getList({
						type: 3
					})
					.then((res) => {
						this.list3 = res.data
					})
					.catch((res) => {});
			},
		}
	};
</script>

<style scoped>
	.score-item-operation {
		flex: 1;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-around;
		height: 100%;
	}

	.score-item-operation .arrow-top,
	.score-item-operation .collect,
	.score-item-operation .statics {
		width: 20px;
		height: 20px;
		background-repeat: no-repeat;
		background-size: contain;
		cursor: pointer;
	}
	.con {
		width: 100%;
		display: flex;
		padding: 10px 0;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
	.con .icon {
		width: 20px;
		height: 20px;
		margin-right: 10px;
	}

	.score-item-operation .arrow-solid {
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABCUExURUdwTPDVs+zOrevMrPzevO3PrfTWtvPZt/LWs+rKqfPYtvjgv/DSsfHVtOzNrPPYt+7SsPXcu+rLqfjfvuXDoejIp/hoeCYAAAANdFJOUwCoc8AIkBhDJeDi6F/dI+x8AAABWUlEQVRIx+2W266DIBBFlWoF6wWs8/+/ergz2oCMbydxx7dmZSFzsU3z5MmtdP3na6NM1rHvCHCL0VU/bT37xqxGdd7V8HAQ68zzQISRmAor5KXC6htZIybBgVUOnSXNjLU0M6qR9UpJhBXyzkQYnVmSzenMZPjkrYO5zYRZSy+T/aHU4cPn2JOJtdm2TeRP4FhUI39mS282Ig8r01kZr6EB8jBL3jV5lygGAFbYILZEKvQGEm9O3Jd2V6vCDEbvIuOZobyNutepOSJq2NfFHuyEY2UUh4u+ZvXyG+dUpHjNxisqlqCjQ32lvipfpKoFyseD19+V4HWfCy7NGy/usvz7Aq+eKnmoL2i4fiQNjcRAYptmkqitACbad5LhIjHqV7b36EVDl2hz5husHrGaYcgPSV1D5/5cCNHfZP9PuMC9YbIfUhwthofwl913dmVO3jO6C948eULKH7b9NLnrKefYAAAAAElFTkSuQmCC);
	}

	.basketball-score-item-body:last-child {
		border-bottom: 1px solid #dfe6f0 !important;
	}



	.green {
		color: #3eba61;
		animation: odds-change-green-font .8s ease-in 0s 6 reverse both running;
	}

	.red {
		color: #ff4343;
		animation: odds-change-red-font .8s ease-in 0s 6 reverse both running;
	}
	.data-wrap {
		color: ;
	}

	.red-bg {
		background-color: #ffefec;
		animation: odds-change-red .8s ease-in 0s 6 reverse both running;
	}

	.green-bg {
		background-color: rgba(104,185,92,.25);
		animation: odds-change-green .8s ease-in 0s 6 reverse both running;
		/* background-color: rgba(104, 185, 92, .25); */
	}
	@keyframes odds-change-red {
		0% {
			background-color: rgba(255, 67, 67, .3)
		}
	
		50% {
			background-color: rgba(255, 67, 67, .6)
		}
	
		to {
			background-color: rgba(255, 67, 67, .3)
		}
	}
	@keyframes odds-change-red-font {
		0% {
			color: #ff4343;
		}
	
		50% {
			color: rgba(255, 67, 67, .5)
		}
	
		to {
			color: #ff4343
		}
	}
	
	@keyframes odds-change-green-font {
		0% {
			color: #3eba61
		}
	
		50% {
			color: rgba(62, 186, 97, .5)
		}
	
		to {
			color: #3eba61
		}
	}
	
	
	@keyframes odds-change-green {
		0% {
			background-color: rgba(62, 186, 97, .3)
		}
	
		50% {
			background-color: rgba(62, 186, 97, .6)
		}
	
		to {
			background-color: rgba(62, 186, 97, .3)
		}
	}
	
	/*  background-color: rgba(104,185,92,.25);
	    animation: odds-change-green .8s ease-in 0s 6 reverse both running;
	} */
</style>
