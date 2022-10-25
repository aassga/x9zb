<!-- 篮球资料库 -->
<template>
	<div class="database-page" style="padding-top: 60px;margin-top: 20px;">
		<div class="database-bg"></div>
		<div class="database-content clearfix">
			<div class="breadcrumb" style="margin: 2px 0px 22px;"><span class="adress">当前位置： </span>
				<span class="breadcrumb-link"><span class="no-link">首页</span>
					<span class="breadcrumb-arrow">&gt;</span></span><span class="breadcrumb-link">
					<a href="/database/basketball/580/1/234147">篮球资料库</a>
					<span class="breadcrumb-arrow">&gt;</span></span>
				<span class="breadcrumb-title">{{details.info.name}}</span>
			</div>
			<div class="database-left">
				<div>
					<div class="" style="">
						<div class="database-left-box">
							<div class="database-left-content-all">
								<!-- 热门赛事-->
								<div class="" v-for="(item,index) in hotList" :key="item.id + '-only'">
									<div class="database-left-item" @click="getAouth(item)">
										<div class="database-left-desc">
											<div class="menu-title">
												<img class="menu-title-img" alt="">
												{{item.name}}
											</div>
											<img :src="!item.check?require('../../assets/images/database-down.png'):require('../../assets/images/database-up.png')">
										</div>
									</div>
									<div class="sub-menu-title" v-if="item.check">
										<li class="sub-menu-title-item" :class="{'active':item1.id == selectId && item1.type == 1}" v-for="(item1,index1) in item.list" :key="index1">
											<div class="sub-title-img-box" @click="setCompetition(item1)">
												<img class="sub-title-img" :src="item1.logo || require('../../assets/images/team.png')" alt="" title="">
											</div>
											<span class="sub-menu-title-name text-clamp" @click="setCompetition(item1)">{{item1.name}}</span>
											<!-- yes-attention 已关注 -->
											<i class="" @click.stop="getAttention(item1)" :class="hotList[0].list.indexOf(item1) == -1 ?'no-attention':'yes-attention'"></i>
										</li>
										
									</div>
								</div>
								<!-- 一级 -->
								<div v-for="(item,index) in title" @click="setCheck(item,index)" :key="index">
									<div class="database-left-item">
										<div class="database-left-desc">
											<div class="menu-title">
												<img class="menu-title-img" alt="">
												{{item.name_zh}}
											</div>
											<img
												:src="!item.check?require('../../assets/images/database-down.png'):require('../../assets/images/database-up.png')">
										</div>
									</div>
									<!-- 二级 -->
									<div class="sub-menu-title" v-if="item.check">
										<ul>
											<!-- 国际赛程（没有三级） -->
											<!-- <li class="sub-menu-title-item" v-for="(item1,index1) in item.children"
												@click.stop="setChildrenCheck(item,item1,index1)">
												<div class="sub-title-img-box">
													<img class="sub-title-img"
														src="https://sta-prod-score.zkreen.com/league/20160525/20160525164844588_280x280.png?x-image-process=image/format,webp"
														alt="" title="">
												</div>

												<span class="sub-menu-title-name">{{item.name}}</span><i
													class="yes-attention"></i>
											</li> -->
											<!-- 三级 -->
											<li class="country-group" v-for="(item1,index1) in item.children"
												:key="index1" @click.stop="setChildrenCheck(item,item1,index1,index)">
												<div class="country-group-wrap">
													<span :class="!item1.check?'plus-icon':'less-icon'"></span>
													<img class="country-logo" :src="item1.logo"><span
														class="name ellipsis">{{item1.name_zh}}
													</span>
												</div>
												<!-- 四级 -->
												<ul v-if="item1.check" class="ellipsis" style="width: 100px;">
													<li class="country-group group "
														:class="{'active':item2.id == selectId}"
														v-for="(item2,index2) in item1.children">
														<span @click.stop="setCompetition(item2)" class="name ellipsis" style="width: 80px;display: block;">{{item2.name_zh}}</span>
														<i @click.stop="getAttention(item2)" :class="hotList[0].list.indexOf(item2) == -1 ?'no-attention':'yes-attention'"></i>
													</li>
												</ul>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="database-right">
				<div class="database-right-top">
					<div class="info" v-if="details.info">
						<img :src="details.info.logo || require('../../assets/images/team.png')">
						<div class="basketball-info">
							<div id="name"><span class="name">{{details.info.name}}</span></div>
							<div class="sub-name">{{details.info.name_en}}</div>
							<div class="team-info"></div>
						</div>
					</div>
					<div class="ant-select seasons-select ant-select-focused ant-select-single">
						<el-select v-model="selectValue" placeholder="请选择"  @change="setSelect">
							<el-option v-for="item in details.season" :key="item.id"  :label="item.year + '赛季'" :value="item.id">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="database-right-main" style="background: rgb(255, 255, 255);">
					<div class="ant-tabs ant-tabs-top"> 
						<div role="tablist" class="ant-tabs-nav">
							<div class="ant-tabs-nav-wrap">
								<div class="ant-tabs-nav-list" style="transform: translate(0px, 0px);">
									<div class="ant-tabs-tab" :class="tabindex == index?'ant-tabs-tab-active':''"
										@click="tabindex=index" v-for="(item,index) in tabList" :key="index">
										<div role="tab" aria-selected="true" class="ant-tabs-tab-btn" tabindex="0"
											id="rc-tabs-0-tab-1" aria-controls="rc-tabs-0-panel-1">{{item}}</div>
									</div>

									<div class="ant-tabs-ink-bar ant-tabs-ink-bar-animated"
										style="left: 0px; width: 64px;"></div>
								</div>
							</div>
							<div class="ant-tabs-nav-operations ant-tabs-nav-operations-hidden">
								<button type="button" class="ant-tabs-nav-more" tabindex="-1" aria-hidden="true"
									aria-haspopup="listbox" aria-controls="rc-tabs-0-more-popup" id="rc-tabs-0-more"
									aria-expanded="false" style="visibility: hidden; order: 1;"><span role="img"
										aria-label="ellipsis" class="anticon anticon-ellipsis"><svg
											viewBox="64 64 896 896" focusable="false" data-icon="ellipsis" width="1em"
											height="1em" fill="currentColor" aria-hidden="true">
											<path
												d="M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z">
											</path>
										</svg></span></button>
							</div>
						</div>
						<div class="ant-tabs-content-holder">
							<div class="ant-tabs-content ant-tabs-content-top">
								<!-- 联赛概况 -->
								<div role="tabpanel" v-if="tabindex == 0"
									class="ant-tabs-tabpane ant-tabs-tabpane-active" id="rc-tabs-0-panel-1"
									aria-labelledby="rc-tabs-0-tab-1" style="">
									<div class="basketball-league-overview">
										<div class="overview-top-part">
											<div class="category-container" style="min-height: auto;">
												<div class="database-category">
													<span class="name" @click="typeListIndex = index"
														:class="{'active':typeListIndex == index}"
														v-for="(item,index) in details.matchTypeList">{{item.name}}</span>
													<!-- <span class="name">常规赛</span> -->
												</div>
												<!-- <div class="database-sub-category">
													<span class="name active"
														style="margin-bottom: 0px;">2021年10月</span>
												</div> -->
											</div>
											<div class="ant-table-wrapper" v-if="details.list&&details.list.total !== 0">
												<div class="ant-spin-nested-loading">
													<div class="ant-spin-container">
														<div class="ant-table">
															<div class="ant-table-container">
																<div class="ant-table-content">
																	<table style="table-layout: auto;" border="0"
																		cellspacing="0" cellpadding="0">
																		<colgroup>
																			<col style="width: 140px;">
																			<col style="width: 134px;">
																			<col style="width: 84px;">
																			<col style="width: 134px;">
																			<col style="width: 95px;">
																			<!-- <col style="width: 95px;">
																			<col style="width: 95px;">
																			<col style="width: 95px;">
																			<col style="width: 95px;"> -->
																			<col style="width: 95px;">
																		</colgroup>
																		<thead class="ant-table-thead">
																			<tr>
																				<th class="ant-table-cell"
																					style="text-align: center;">时间</th>
																				<th class="ant-table-cell"
																					style="text-align: center;">主队</th>
																				<th class="ant-table-cell"
																					style="text-align: center;">比分</th>
																				<th class="ant-table-cell"
																					style="text-align: center;">客队</th>
																				<th class="ant-table-cell"
																					style="text-align: center;">赛果</th>
																				<!-- <th class="ant-table-cell"
																					style="text-align: center;">让分盘</th>
																				<th class="ant-table-cell"
																					style="text-align: center;">盘路</th>
																				<th class="ant-table-cell"
																					style="text-align: center;">总分盘</th>
																				<th class="ant-table-cell"
																					style="text-align: center;">大小</th> -->
																				<th class="ant-table-cell"
																					style="text-align: center;">数据</th>
																			</tr>
																		</thead>
																		<tbody class="ant-table-tbody"
																			v-if="details.list">
																			<tr class="ant-table-row ant-table-row-level-0"
																				v-for="(item,index) in details.list.data">
																				<td class="ant-table-cell"
																					style="text-align: center;">
																					<div class="match-time">{{item.day}}
																						{{item.hour}}
																					</div>
																				</td>
																				<td class="ant-table-cell"
																					style="text-align: center;">
																					<div class="host-team "
																						style="width: 100%;text-align: center;">
																						<i></i><span
																							:title="item.home_name"
																							class="team-name">{{item.home_name}}</span>
																					</div>
																				</td>
																				<td class="ant-table-cell"
																					style="text-align: center;">
																					<div class="score-top"
																						v-if="item.away_scores_total > item.home_scores_total">
																						{{item.home_scores_total}}-<span>{{item.away_scores_total}}</span>
																					</div>
																					<div class="score-top"
																						v-if="item.away_scores_total < item.home_scores_total">
																						<span>{{item.home_scores_total}}</span>-{{item.away_scores_total}}
																					</div>
																					<div class="score-top"
																						v-if="item.away_scores_total == item.home_scores_total">
																						{{item.home_scores_total}}-{{item.away_scores_total}}
																					</div>
																					<div class="score-bottom">
																						{{item.home_scores_halftime}}-{{item.away_scores_halftime}}
																					</div>
																				</td>
																				<td class="ant-table-cell"
																					style="text-align: center;">
																					<div class="guest-team" style="width: 100%;text-align: center;">
																						<i></i><span
																							:title="item.away_name"
																							class="team-name">{{item.away_name}}</span>
																					</div>
																				</td>
																				<td class="ant-table-cell"
																					style="text-align: center;">
																					<div class="result-match">
																						{{item.is_win == 1?'胜':item.is_win == 2?'负':'平'}}
																					</div>
																				</td>
																				<!-- <td class="ant-table-cell"
																					style="text-align: center;">
																					<div class="action-a">-4</div>
																				</td> -->
																				<!-- <td class="ant-table-cell"
																					style="text-align: center;">
																					<div class="plate-roads lose">输
																					</div>
																				</td> -->
																				<!-- <td class="ant-table-cell"
																					style="text-align: center;">
																					<div class="total-score">222.5</div>
																				</td> -->
																				<!-- <td class="ant-table-cell"
																					style="text-align: center;">
																					<div class="size small">小</div>
																				</td> -->
																				
																				
																				
																				<td class="ant-table-cell" style="text-align: center;" v-if="item.is_normal == 1">
																					<a class="data" target="_blank" :href="'./score-detail?type=basketball&tabIndex=4&id='+item.id">析</a>
																				</td>
																				<td class="ant-table-cell" style="text-align: center;" v-else>
																					<span class="data">暂无数据</span>
																				</td>
																			</tr>

																		</tbody>
																	</table>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<!-- 分页 -->
											<ul class="ant-pagination overview-pagination" unselectable="unselectable"
												v-if="details.list&&details.list.total !== 0">
												<el-pagination background @current-change="sizeChange"
													layout="prev, pager, next" :total="details.list.total">
												</el-pagination>
											</ul>
										</div>
										<div class="overview-center-part">
											<div class="top-info">
												<div class="category">
													<div class="database-sub-category">
														<!-- <span class="name" style="margin-bottom: 2px;">盘路统计</span> -->
														<span class="name" style="margin-bottom: 2px;"
															:class="{'active':tabIndex1 == 0}"
															@click="tabIndex1 = 0">单节得分</span>
														<span class="name" style="margin-bottom: 2px;"
															:class="{'active':tabIndex1 == 1}"
															@click="tabIndex1 = 1">分差场次</span>
														<!-- <span class="name" style="margin-bottom: 2px;">指数胜率</span> -->
													</div>
												</div>
												<div class="data" v-if="details.list">
													<span>已赛{{details.list.total}}场</span>
													<span>场均总分{{details.totalPointsPerGame}}分</span>
													<span>{{details.rebounds}}篮板</span>
													<span>{{details.assists}}助攻</span>
													<span>15.6抢断</span>
													<span>{{details.blocks}}盖帽</span>
												</div>
											</div>
											<div class="data-view">
												<div class="pre-btn " @click="tabIndex1 = 0"></div>
												<div class="view-container">
													<div class="view-list" style="width: 400%;"
														:style="{marginLeft: tabIndex1==0?'-100%':'-200%'}">
														<div class="roads-statistics">
															<div class="score">
																<div class="title">让分统计</div>
																<div class="echarts">
																	<div class="echarts-for-react "
																		_echarts_instance_="ec_1644213496908"
																		size-sensor-id="31"
																		style="height: 300px; width: 200px; -webkit-tap-highlight-color: transparent; user-select: none; position: relative;">
																		<div
																			style="position: relative; width: 200px; height: 300px; padding: 0px; margin: 0px; border-width: 0px; cursor: default;">
																			<canvas data-zr-dom-id="zr_0" width="200"
																				height="300"
																				style="position: absolute; left: 0px; top: 0px; width: 200px; height: 300px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas>
																		</div>
																	</div>
																</div>

															</div>

														</div>
														<div class="single-score">
															<div class="candle-data-bar-container"
																v-for="(item,index) in details.singleQuarterScore"
																v-if="index < 4">
																<div class="candle-data-bar"><span
																		class="value">{{item}}</span>
																	<div class="shadow-box"
																		style="height: 96.272px; box-shadow: rgba(236, 104, 104, 0.15) 0px 8px 7px 0px;">
																	</div>
																	<div class="container">
																		<div class="current-value" :style="{top:getCount(details.singleQuarterScore,item)}" style="background-image: linear-gradient(to top, rgb(236, 104, 104), rgb(255, 125, 125));">
																		</div>
																	</div>
																	<span class="name">第{{index+1}}节</span>
																</div>
															</div>
															<div class="candle-data-bar-container"
																v-for="(item,index) in details.singleQuarterScore"
																v-if="index == 4">
																<div class="candle-data-bar"><span
																		class="value">{{item}}</span>
																	<div class="shadow-box"
																		style="height: 40.48px; box-shadow: rgba(85, 163, 255, 0.15) 0px 8px 7px 0px;">
																	</div>
																	<div class="container">
																		<div class="current-value" :style="{top:getCount(details.singleQuarterScore,item)}" style="background-image: linear-gradient(to top, rgb(109, 161, 255), rgb(144, 189, 255));">
																		</div>
																	</div>
																	<span class="name">加时</span>
																</div>
															</div>
														</div>
														<div class="points-difference">
															<div class="candle-data-bar-container" v-for="(item,index) in details.numberOfPointsDifference">
																<div class="candle-data-bar">
																	<span class="value">{{item}}场</span>
																	<div class="shadow-box" style="height: 176px; box-shadow: rgba(251, 182, 109, 0.3) 0px 8px 7px 0px;"></div>
																	<div class="container">
																		<div class="current-value" :style="{top:getCount(details.numberOfPointsDifference,item)}" style="background-image: linear-gradient(to top, rgb(250, 174, 94), rgb(255, 205, 153));">
																		</div>
																	</div>
																	<span class="name">{{index == 0?'≤5':index == 1?'6-10':index ==2?'11~15':index == 3?'16~20':index == 4?'21~25':'≥26'}}</span>
																</div>
															</div>
														</div>

													</div>
												</div>
												<div class="next-btn " @click="tabIndex1 = 1"></div>
											</div>
										</div>

										<!-- 联赛之最 -->
										<div class="database-league-best" v-if="details.winRate && details.winRate.length != 0">
											<div class="database-category" style="margin-bottom: 8px;">
												<span class="name active">联赛之最</span>
											</div>
											<div class="best-league clearfix" v-if="details.winRate">
												<div class="league-item">
													<span class="flag">胜率PK</span>
													<div class="team" >
														<img :src="details.winRate[0].logo"
															:alt="details.winRate[0].name" :title="details.winRate[0].name">
														<div class="name">{{details.winRate[0].name}}</div>
														<div class="best-value win">
															<span class="left">最佳</span>
															<span class="right">{{details.winRate[0].won_rate}}胜</span>
														</div>
													</div>
													<div class="vs"></div>
													<div class="team">
														<img :src="details.winRate[1].logo" :alt="details.winRate[1].name" :title="details.winRate[1].name">
														<div class="name">{{details.winRate[1].name}}</div>
														<div class="best-value lose"><span class="left">最差</span>
														<span class="right">{{details.winRate[1].won_rate}}胜</span></div>
													</div>
												</div>
												<div class="league-item">
													<span class="flag">进攻PK</span>
													<div class="team" >
														<img :src="details.attack[0].logo"
															:alt="details.attack[0].name" :title="details.attack[0].name">
														<div class="name">{{details.attack[0].name}}</div>
														<div class="best-value win">
															<span class="left">最佳</span>
															<span class="right">{{details.attack[0].defensive_rebounds}}分/场</span>
														</div>
													</div>
													<div class="vs"></div>
													<div class="team">
														<img :src="details.attack[1].logo" :alt="details.attack[1].name" :title="details.attack[1].name">
														<div class="name">{{details.attack[1].name}}</div>
														<div class="best-value lose"><span class="left">最差</span>
														<span class="right">{{details.attack[1].defensive_rebounds}}分/场</span></div>
													</div>
												</div>
												<div class="league-item">
													<span class="flag">防守PK</span>
													<div class="team" >
														<img :src="details.defense[0].logo"
															:alt="details.defense[0].name" :title="details.defense[0].name">
														<div class="name">{{details.defense[0].name}}</div>
														<div class="best-value win">
															<span class="left">最佳</span>
															<span class="right">{{details.defense[0].defensive_rebounds}}分/场</span>
														</div>
													</div>
													<div class="vs"></div>
													<div class="team">
														<img :src="details.defense[1].logo" :alt="details.defense[1].name" :title="details.defense[1].name">
														<div class="name">{{details.defense[1].name}}</div>
														<div class="best-value lose"><span class="left">最差</span>
														<span class="right">{{details.defense[1].defensive_rebounds}}分/场</span></div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<!-- 联赛排名 -->
								<div role="tabpanel" v-if="tabindex == 1" tabindex="0" aria-hidden="false" style=""
									class="ant-tabs-tabpane ant-tabs-tabpane-active" id="rc-tabs-0-panel-2"
									aria-labelledby="rc-tabs-0-tab-2">
									<div class=" basketball-league-ranking">
										<div id="" style="padding: 20px;text-align: center;" v-if="rangking.lenth == 0">
											暂无数据
										</div>
										<div v-for="(item,index) in rangking" :key="index">
											<div class=" title-bar">{{item.name}}</div>
											<div class="ant-table-wrapper">
												<div class="ant-spin-nested-loading">
													<div class="ant-spin-container">
														<div class="ant-table">
															<div class="ant-table-container">
																<div class="ant-table-content">
																	<table style="table-layout: auto;">
																		<colgroup>
																			<col style="width: 108px;">
																			<col style="width: 213px;">
																			<col style="width: 124px;">
																			<col style="width: 124px;">
																			<col style="width: 124px;">
																			<col style="width: 124px;">
																			<col style="width: 124px;">
																			<col style="width: 124px;">
																		</colgroup>
																		<thead class="ant-table-thead">
																			<tr>
																				<th class="ant-table-cell"
																					style="text-align: center;">排名</th>
																				<th class="ant-table-cell"
																					style="text-align: center;">球队</th>
																				<th class="ant-table-cell"
																					style="text-align: center;">赛</th>
																				<th class="ant-table-cell"
																					style="text-align: center;">胜-负</th>
																				<th class="ant-table-cell"
																					style="text-align: center;">胜率</th>
																				<th class="ant-table-cell"
																					style="text-align: center;">胜 差</th>
																				<th class="ant-table-cell"
																					style="text-align: center;">均场得分
																				</th>
																				<th class="ant-table-cell"
																					style="text-align: center;">均场失分
																				</th>
																			</tr>
																		</thead>
																		<tbody class="ant-table-tbody">
																			<tr data-row-key="0.45234216444506226"
																				class="ant-table-row ant-table-row-level-0"
																				v-for="(item1,index1) in item.list"
																				:key="index1">
																				<td class="ant-table-cell"
																					style="text-align: center;">
																					<div class="match-rank"><span
																							:style="[{background: index1 < 7 ?'rgb(253, 82, 82)':index1 > 6 &&  index1<11?'rgb(153, 153, 153)':''},{color:index1>10?'#666':''}]">{{item1.position}}</span>
																					</div>
																				</td>
																				<td class="ant-table-cell"
																					style="text-align: center;">
																					<div><span
																							class="team-name">{{item1.name}}</span>
																					</div>
																				</td>
																				<td class="ant-table-cell"
																					style="text-align: center;">
																					<div class="match">
																						{{Number(item1.won)+Number(item1.lost)}}
																					</div>
																				</td>
																				<td class="ant-table-cell"
																					style="text-align: center;"><span
																						class="result">{{item1.won}}-{{item1.lost}}</span>
																				</td>
																				<td class="ant-table-cell"
																					style="text-align: center;">
																					<div class="win-rate">
																						{{item1.won_rate}}
																					</div>
																				</td>
																				<td class="ant-table-cell"
																					style="text-align: center;">
																					<div class="action-a">
																						{{item1.game_back}}
																					</div>
																				</td>
																				<td class="ant-table-cell"
																					style="text-align: center;">
																					<div class="last-ten">
																						{{item1.points_avg}}
																					</div>
																				</td>
																				<td class="ant-table-cell"
																					style="text-align: center;">
																					<div class="recent-situation lose">
																						{{item1.points_against_avg}}
																					</div>
																				</td>
																			</tr>


																		</tbody>
																	</table>
																	
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

									</div>
								</div>
								<!-- 联赛数据 -->
								<div role="tabpanel" v-if="tabindex == 2" aria-hidden="false" style=""
									class="ant-tabs-tabpane ant-tabs-tabpane-active" id="rc-tabs-0-panel-3"
									aria-labelledby="rc-tabs-0-tab-3">
									<div class="basketball-league-data league-data-common">
										<div class="top">
											<div class="database-category">
												<span class="name" :class="{'active':teamId == 0}"
													@click="teamId = 0,teamTitle = player">球员</span>
												<span class="name" :class="{'active':teamId == 1}"
													@click="teamId = 1,teamTitle = team">球队</span>
											</div>
										</div>
										<div class="data-main">
											<div class="left-nav" style="border-right: none;">
												<div class="nav-item " :class="{'active':selectTeam == index}"
													@click="selectTeam = index" v-for="(item,index) in teamTitle">
													{{item}}
												</div>

											</div>
											<div class="table-container">
												<div class="ant-table-wrapper" style="margin-bottom: 0px;">
													<div class="ant-spin-nested-loading">
														<div class="ant-spin-container">
															<div class="ant-table ant-table-empty">
																<div class="ant-table-container">
																	<div class="ant-table-content">
																		<table style="table-layout: auto;">

																			<thead class="ant-table-thead">
																				<tr>
																					<th class="ant-table-cell"
																						style="text-align: center;">排名
																					</th>
																					<th class="ant-table-cell"
																						v-if="teamId == 0">球员</th>
																					<th class="ant-table-cell" v-if="teamId == 1">球队</th>
																					<th class="ant-table-cell"
																						style="text-align: center;padding: 0;">总数
																					</th>
																				</tr>
																			</thead>
																			<tbody class="ant-table-tbody">
																				<tr data-row-key="0.46670301267142533"
																					class="ant-table-row ant-table-row-level-0"
																					v-for="(item,index) in teamList"
																					:key="index">
																					<td class="ant-table-cell"
																						style="text-align: center;">
																						<div class="match-rank">
																							{{index+1}}
																						</div>
																					</td>
																					<!-- <td class="ant-table-cell" v-if="teamId == 0">
																						<div class="team">
																							<img :src="item.logo || require('../../assets/images/team.png')" alt=""
																								title="">
																							{{item.name}}
																						</div>
																					</td> -->
																					<td class="ant-table-cell"
																						>
																						<div class="team">
																							<img :src="item.logo || require('../../assets/images/userLogo.png')"
																								alt="" title="">
																							{{item.name}}
																						</div>
																					</td>
																					<td class="ant-table-cell"
																						style="text-align: center;">
																						<span
																							class="score">{{item.points}}</span>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																		<div id="" style="width: 100%;text-align: center;padding: 20px 0;" v-if="teamList.length == 0">
																			暂无数据
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		popular,
		TeamData,
		teamMember,
		pointsRanking,
		competitionInfo,
		tournamentList,
		getCountry,
		getCategory
	} from '@/api/database.js'
	import Vue from 'vue'
	export default {
		data() {
			return {
				page:1,
				selectId: null,//选中的赛事（左侧三级
				options: [{ //赛选赛季
					value: '选项1',
					label: '2022-10-10'
				}],
				selectTeam: 0,
				teamId: 0,
				firstIndex: null, //选中一级分类下表
				selectValue: '', //下拉框
				title: [],
				tabIndex1: 0, //联赛赛况-切换2
				details: {
					info:{},
					matchTypeList:[]
				}, //详情
				typeListIndex: 0, //季前赛，常规赛
				tabindex: 0,
				rangking: [],
				teamTitle: [],
				team: ['得分', '失分', '两分球命中数', '三分球命中数', '投篮命中数', '犯规', '篮板数', '防守篮板数', '进攻篮板数', '助攻', '失误', '抢断', '盖帽',
					'罚球命中数'
				],
				hotList:[
					{
						id:1,
						name:'关注赛事',
						check:false,
						list:[]
					},
					{
						id:2,
						name:'热门赛事',
						check:true,
						list:[]
					},
					{
						id:3,
						name:'国际赛事',
						check:false,
						list:[],
						category_id:1
					}
				],
				player: ['得分', '上场时间', '罚球命中数', '两分球命中数', '三分球命中数', '投篮命中数', '篮板数', '防守篮板数', '进攻篮板数', '助攻', '失误', '抢断',
					'盖帽', '个人犯规'
				],
				teamList: [], //联赛数据
				tabList: ['联赛概况', '联赛排名', '联赛数据'],
			}
		},
		mounted() {
			this.getCategory()
			this.teamTitle = this.player
			this.popular()
		},
		watch: {
			tabindex(e) {
				if (e == 1) {
					this.pointsRanking()
				}else if( e== 2){
					this.TeamData(0)
				}else if(e ==0){
					this.competitionInfo({id:this.selectId},false)
				}
			},
			teamId(e) {
				this.selectTeam = 0
				this.TeamData(e)
				// console.log(e);
			},
			selectTeam(e) {
				// console.log(e);
				this.TeamData(this.teamId)
			},
			// selectValue(e) { //改变年份，需重新获取详情
			// 	console.log('改变年份--');
			// 	this.competitionInfo()
			// },
			typeListIndex(e) { //改变季前，需重新获取详情
				console.log('改变季前--');
				this.competitionInfo({id:this.selectId},false)
			}
		},
		methods: {
			// popular 资料库热门/关注接口
			popular(){
				popular().then(res => {
					let data = {
						id:res.data.basketball_id
					}
					this.hotList[1].list = res.data.popular
					
					let query = this.$route.query
					
					if(JSON.stringify(query) == '{}'){
						this.selectId = res.data.basketball_id
					}else {
						this.selectId = query.id
					}
					// this.TeamData(0)
					this.competitionInfo({id:this.selectId})
				}).catch(res => {
				
				})
			},
			// 修改选中（
			setSelect(e){
				console.log('出发了',this.tabindex);
				if(this.tabindex == 0){
					this.competitionInfo({id:this.selectId},false)
				}else if(this.tabindex == 1){
					this.pointsRanking()
				}else {
					this.TeamData(0)
				}
					
			},
			// 联赛概况分页
			sizeChange(e) {
				this.page = e
				this.competitionInfo({id:this.selectId})
			},

			// 获取球队列表
			TeamData(type) {
				if (type == 0) {
					teamMember({
						id: this.selectValue,
						type: this.selectTeam
					}).then(res => {
						this.teamList = res.data
					}).catch(res => {

					})
				} else {
					TeamData({
						id: this.selectValue,
						type: this.selectTeam
					}).then(res => {
						this.teamList = res.data
					}).catch(res => {

					})
				}



			},


			// 获取一级分类
			getCategory() {
				getCategory().then(res => {
					let arr = res.data.filter(item =>{
						return item.id != 1
					})
					arr.forEach(item => {
						item.check = false
					})
					this.title = arr
				}).catch(res => {

				})
			},

			// 获取排行
			pointsRanking() {
				pointsRanking({
					id: this.selectValue
				}).then(res => {
					this.rangking = res.data
				}).catch(res => {

				})
			},
			// 关注 热门 国际
			getAouth(item){
				if(item.id == 3){
					this.setChildrenCheck({id:''},{category_id:1},1,1)
					item.check = !item.check
				}else {
					item.check = !item.check
				}
			},

			// 一级分类选中
			setCheck(item, i) {
				this.firstIndex = i
				
				// 获取二级分类
				getCountry({
					id: item.id
				}).then(res => {
					res.data.forEach(data => {
						data.check = false
						data.children = []
					})
					this.title[i].children = res.data
					item.check = !item.check
					console.log(res.data);
				}).catch(res => {

				})
			},
			// 收藏 添加入收藏列表
			getAttention(item){
				let index = 0
				let list = this.hotList[0].list
				if (list.indexOf(item) == -1) {
					list.push(item)
				} else {
					list.splice(list.indexOf(item), 1)
				}
				
				localStorage.setItem('hotList',JSON.stringify(this.hotList[0].list))
				// list.push(item)
			},
			// 计算百分比
			getCount(list,i){
				let all = 0
				list.forEach(item=>{
					all += item
				})
				if(all == 0) return '100%'
				return  (1- (i / all)) * 100 + '%'
			
			},
			
			// 二级分类选中 item1 = 父级；item = 选中
			setChildrenCheck(item1, item, i, i1) {
				// 判断国际赛事是没有三级
				// 获取三级分类
				tournamentList({
					country_id: item.id,
					category_id: item.category_id
				}).then(res => {
					res.data.forEach(data => {
						data.check = false
						data.type = 1
					})
					if(item.category_id == 1){//国际赛事
						this.hotList[2].list = res.data
						return
					}
					this.title[this.firstIndex].children[i].children = res.data
					item.check = !item.check
					this.$forceUpdate()
					
				}).catch(res => {

				})
			},
			// 选中三级/四级
			setCompetition(item){
				console.log(item);
				console.log(item.type == 0);
				if(item.type == 0){//type == 0 足球，1篮球
					// 当前页面为足球，当type = 1跳转页面
					let routeData = this.$router.resolve({
						path: "/base-football?id="+item.id
					})
					
					window.open(routeData.href, '_blank')
				}else {
					this.selectId = item.id
					this.selectValue = ''
					this.competitionInfo(item)
					this.tabindex = 0
				}
				
				
				
				
			},
			// 获取详情
			competitionInfo(item,type) {
				let matchTypeList = this.details.matchTypeList
				let data = {
					id: item.id,
					page: this.page,
					season_id: this.selectValue,
					// type: matchTypeList.length != 0 ? matchTypeList[this.typeListIndex].id : ''
				}
				console.log(matchTypeList);
				if(this.typeListIndex != 0){
					data.type = this.details.matchTypeList[this.typeListIndex].id
				}else {
					data.type = ''
				}
				
				
				competitionInfo(data).then(res => {
					this.details = res.data
					if(res.data.season.length == 0) {
						this.tabList = ['联赛概况']
					}else {
						this.tabList = ['联赛概况', '联赛排名', '联赛数据']
					}
					if(res.data.season.length != 0){
						if(type == undefined){
							this.selectValue = res.data.season[0].id
						}
						
					}
				}).catch(res => {

				})
			}
		}
	}
</script>

<style scoped="scoped">
	/* @import url("~@/styles/database.css"); */
	.database-right-main .ant-tabs-nav-wrap .ant-tabs-tab-active:after {
		bottom: -3px;
	}
	.database-league-best .best-league .league-item .vs {
	    width: 46px;
	    height: 46px;
	    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAYAAADj79JYAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAXKADAAQAAAABAAAAXAAAAABhCMkfAAAOEUlEQVR4Ae2deZAVxR3H90Yh3LAi2V3lXIhEEg2iobQiKTUmIChQKIkhJohHFSmMAYMgR1UIBlGI/hE1mhI24TCckVRKCy+OgogYopzLshewRtaAhLALuyzk8zNvXs2bN/Nmunve27dmp2qqe7p/V3+7p/vXx7yXkdF6tSLQikArAqEhkGlJOnjw4J6LFy9eZT1rhI3Z2dnd+vXr928NXiUW7MwpLS39kHCgEqMLMTbfhs1vuGQlJSnLkorx6624Zpjb1NT0HU1eJTbAnhwG2Cj9cyrBlkJGAc/JyVmnVGoX4szMzO+5JIeadOjQoQ4InBuC0Mbc3NxpIchREhEFvE+fPh8A2FEl7nji22l5UZnx2eYpFy5cmIGO7qaSKOuzlLnUVI4qfxQcDLgIs1ErFyDKysqGqhoRlP7w4cNF0E4NSu9FR1k/zcvL+6VXfjLTo4CLEgAz7cczaIEjkmVwY2PjAmy8xFQ+gM/q1avXZ6ZydPhjAC8uLt6MkJM6gmw8SenH8aKGANQ9Nj260T0MlC/pMpvyxQBOgc5zv2YilBY4mIGtwESGB+/TyI66sR40vslZWVmPUMYmX8IkEcQAHtFh1I+LDIAJtVuhdd+JzBtNMQDoDf37999kKseEPw7w9u3bv4Fh9SZCwwQcWbncvzaxJ8LbiOubcjfQaXcc4D179qyD6HUnoeLz8CNHjlyqyONKTvf0MBn9XDPVEn+DG3hIjSV86jjAIyqMvBVa5KX19fXDTc2tqKjohNcz21QOb2wtk5xmcQOdtrsC3q5du42mA0sY7mFDQ8MsDO7iNFr1mbLMonWfUuVLBr0r4AUFBf+ilW42UUghjdxD1kt6Y8MUExsivB/hBr4cgpxQRLgCLpJxn4y8FcAqPHDgwNW6VvKGPAlvni6/xUfFN6sbaNlhhZ6As2y5wSLSDSmslnvIQHkDOsfp6rX40L+Oydyb1nM6hJ6A0+dVY+AuEyNp5VqA07qfMdEb4W2g0UwPQU6oIjwBFy10K0beCi1sKJOWbioWQz+eirpehceNFtuX9O3bt8wtrznTEgIur6SJcQAn8m8PKoOupA20C4LSe9Fh93Hu+V75zZmeEHBG970YftjQwMDdChU0hbuXoT5hn4ntSd/q07EzIeAiEADW6gi28dyGjBzbs2v06NGjXaGb6ZqpkEgD+QfrJb9XYEkpqS/grD8Y9eOA2JGNA9+FpzNnzsyBtpNp6RkoxQ28YConWfy+gOOt7KAAn5gYwOZywkkQFdIfsB800SG82LmWgfJtUznJ5PcFPNJajHxywEzYj58/f15WA3MNC9qAZ5J2bqCzTL6ACwOAGXkriChmr7OvU7k8M4W/Cfmj3fJU0gB7MQOl6QCvolKL1ncwE6nM1t7CPz5NtL2WFphoxdLKl9j5AToTuU/b03TivIXiBv7Kixc9WVT4YCZUg6DJhzaftHzinbmlvz/F86eEtVRcLfmfx3neF7a3E3jLCmBWYNTdGKF1UYhNVNwtdmbWWn7Ac4k9TTM+acCAAS/beVmP78JAfD96byJ9GLZ3tOcHicMrlfER9zbi2xiQt0Zm4EHYXWlUAJcZ4EpXKcESG7p27dqte/fu8qZksNZ9CcuvpcgsDMbuTgUQu3EDr42AEyWiMp/n4YFoQniRanRtwHtbBvjvq4oN1IeLUF61vxI0qCqw0eedPHnyVusZsB8xBVtkYddUF7CvJm2SpSvksAi7p3BkYydv/R7uR5khy2mwQFdgwKUvoxBvBpLqQYShIySL/lT60BkeZCrJq7HrXScDdi5GfrYzPexndFzFvQi3txLgZ8sOlZ+OwIBHBJl6K3IULpMBdB7ytAdgsQVQzxHEuYEUXHb4hwtNCq/O6Jx37ty5w+ifJGX00u2Z4cZQXl5+Ga9SDQJVKyoqji7gPvhf4jZqgQC+gEH48ahgIsjMw83cR9jHnp7qOLbJIHs/Y8t+p24l4Hr37i0zzu1OISrPuGYvhAD2J126dIlbVaR1TW1usAULbBhGOXdGvLAYeJQAF05qbn2MBPWHMLbNZljejqVe3j5sM178suSFELZDRglvnGwVRi9lwOkSTAGPKteJAOrfGSiXOnnp6ubTsgJ7C07+JD03glfMGR9lwCO7KHuSZKCvWACPcwNxy74O432+zKkneMi5mKYMuNhMrZl6K7pF/xMD0WYnM/3lElq3VlmcskJ8XuSc/YpsLSND6MeVy4XOs23atIlzA2ndYwFbpu9pc2HrBjyox9wM0gKcPvQDhFW7CUxi2jMcoq+0y5flASYdT9nTmjsO2Ls7duz4fUJZh4m7Aq0WxnH9L0EGz5965IWd/M/OnTvHuYEsD/wMRVcGUQYATdC9Sne4grCc+ziV9SXSC+SmWyok/ArpMjmTlUSd62Pkj+zRo8cZL2ZtwFk5W4fBKQGcQszIz8//j70QlZWVl589ezbw8gBg3kv/L2Dbr1oeKuwJMhbQTQ2hAkbAM4bngfb8BPE6DozewYLW0QQ0GUozTbsgDMlmoiEToa729CTEd9Efyucm8tFX9EL3K9gwMZqQIAJvGTKUjzwjPxPw7wL8OYj/qpcKsY17HBW6xovGStfqw4UZBU3cr1mCkhWiQ9zAGLDZA/0G+n6ooPOEAm2UVPQKiFTWYN7ocTwfiGbGRmYGAVtYtAEXZlpAUidBFHAVhd0quuwXi1/iBgZ+O6G9hgG2h12GSlyAx1FY3bZt22uIx2x08LwUG+PGFy/5RoBzjly+Ua/zEm6STkHO0ifGuVZ0JXcD4DBF2Tms5D2rUklu8gsLC+sBdxK2ydt1hnALLXuyG61XmhHgYgBKY6auXopU0wFnEYtlVXY++YyFdNnh17nGsa6xQgZbHWY7D6CXMJAPocHdSfmVNmWMAI8YkYxZZ02nTp1iFn1EV11dnXwUVRTRqxxQWeNp6RW8JcsZDG/lWbv8tOz98uGCqhGB+0EvwVVVVZ35nuc4+douplM2rWYirWiZPR2QvgxApaS1taebxNFzjPsPyFgqAJrICsprDLgoAoxNgPHtoEp96N4H7OsAIsYzQUcJOmSXPykX+t5DcAn3SvTLMYmkXNqvlMOaML2VODdQdAF2UndxkH8d93PcNVTuevr7u4gbr907cDJzCy1hDCChAE4rW8kK2zZLrj1Ex3P25yTG5UPcUUx21gB8DcBPC+ubU7E5lBaOjyrTWeUzGnbQALuesx5xbqBFg45XicuiWSqvrgC/kMH6EODL5nC2qfJQABcjAMzIW4F/UaJTTeQ34Zc/gKpG00Kr8gO0DNi/A/S9tPgxqvx2+tAAN+lWAPNYhw4dfP3ryEmnh+wFSHG8mBa/ms3ht3ArC3R0hwY4r/w+DBC3TeeakWhJ0y4wsovyGJUU48XYaVIQvxngd9DiB6vqCg1wUazTygHuPXxg8YUDX4C+EOJ7uD3XnQML0ySMdDNbaO3DVUSECjjgKffjVJKrG+hXCHzlVfDKGcK1frRJzG+P/lUqywWhAs4O9d8o3McKBVxOV7RdgT6GlDejHODHUOgbuWXikvKLlt6N5YKlhIEmkaECTqGlXw30eQq04gb+IgyEAH0r4F+PTOlmKsOQqSIDsG9hEBXdvldo6x+WJhbqX8SAs9ZzgnAnb8SRBPlKWZHKXknB16F/IveD3HJeJSUXusR7Wu6nLNBr4CckXfPxIoYAhKy/jOK+Itl20tgG0UXuTaTnCw24veBMWL6GKzeWN0E2MJKyLoPsx+neFtj1OuP/N4DbCw74QwFddm0mEHay55nEAVy2236USEaLAhxwcijU+UQFUsmrqalpe/r06R/D8wSydc+i2FVuZ47wTXuCM95iAAeQLFrmGkI5//Ew0/xTzsLoPldXV/dkgept+PvryhA+GsMRWnjCHalQ3UITY/14GQCfBOzR0E3gaPJuZniqG8meKoqKimpwUScAmOlygS+evgSeVqYwA1dPXnvZz7SuKwHnXSphHnltrESTEBd1F/xbTGTQIHx7jLQHHEC/xZG6551AULhs7tnkldPap0p/7KTReBbQtS8awWd+zGkNOCes+gGoHB9L9MMHPclfzOBXAfDTa2tr2/sV2iufCjSdKFV7ybbSfV8BizDVYeQ0wA70Kg1ktDKZ5b7DvZHBdaPzbAvprhdv0lj89JXy5rgSBEt8Ci9leiLStAScQufSP7+O4TcnMj5g3h4qQX7zpRJAqyRkRljFIHmeRSf5QFcqdDzpow3BzkDuHcw0E563TEvAAVu+4/xJQEDThayOTxkvcx6rdhqXdn04vvbPWyDY4oOv9QNbwE8rwBn0RgG2796ms9U09zNgN2F3oE9f0gZwBi3xEP6I4Wljk0JFvsBg+WEQ+rQonIDMgFaCwfL1bku7TnBu/ImgRqcF4LySFwB9JGGzbJMFBcuDbjrHtgN/YZFWXgqgizs4H+AfbQldC3bOY7FqrkdFuCanFeCWhfyAzbXMMH8L6EOstHQLOTGwkH1Uz6N5XvamJeBirLRwBtLJ9O1zeOzhVYDmSKdlL6ZlyzeiylfaAm6VRE6ucuBfgJfWdLmV3hwhQO/nnkbL/ouu/rQH3CqYfObNOrjsR8op1tDWwi35iUJAPo7OubTqF4nLF83aV4sB3F5CZqMDAeBe7pGkD7LnhRkHXDmr/gqfna8MMosMortFAm4vGL8EdAXf3H8XcG4gXT6YLaYidN1d+RRQ/lf0HQbFZWxKlNl1hRFv8YA7QZD18BMnTgwEtEKAl/1FOdstP2IgO0Of3zzLV9SyJyo/6i4/g3qMcCddxl7SjboM5LRerQi0ItCKQCsCX1AE/gsKm17B+tu4IgAAAABJRU5ErkJggg==) no-repeat;
	    background-size: 100% 100%;
	}
	.database-league-best .best-league .league-item .team .best-value.lose {
	    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAR4AAAA0CAYAAABciVcyAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAABHqADAAQAAAABAAAANAAAAACuYrZBAAAFNElEQVR4Ae3dPW8cRRjA8Xl2fSYGBYQcG0OBQEgIQXjLBQpXNJQUFKGAFiwUSgpEEx0N4gtgGX8EqJCQ0qSgghByx6sihHiTAOEQ20IBLBL7dvLsnfdudm/2dm6XLv9rdm7mmbHyU/Rod3ZmTswMn/ba1ovG2tetMY8Ya26ZoSuhCCBwkwqIMTtG5NO5qPXGZ+8tXkoZtC7s035l601r7dth0UQhgAACBQEx10TmVrubS72o0OT9uvrq1rI2vOVtpBIBBBAIEUifkmx/PQ0NSjzXE3le73ZaIWMTgwACCJQKWHOyvWZvDUo8NrEnSweiAQEEEAgUsMbGcevvhaDEY8SeCByXMAQQQKBUQIxcvvDu7TuViedUx85ba46XjkQDAgggECxgu2loZeL58bftRzVuPnhcAhFAAIFygbDEY6TPY1Y5Ii0IIDCDgD5qBSYeY9ozjEsoAgggUCog861e2lj5qGUME8ulijQggECwgIjZ/nx98de0w9TE80zHzok16RwPHwQQQKCRgL6kupgNMDXx/Pv7leO6L+tIFswVAQQQqCsQRTJ4zEr7T0081iRMLNdVph8CCOQERIYTy2llReKxTCzn6PiCAAJ1BWJJwu54dPM6iaeuMv0QQGAkoMdg7J7fuPuXrKL0jufU+zbWN1qPZYFcEUAAgfoC48esdIzSxPPTucsP6yz0Qv0/RE8EEEDgUEDGE8tpTWni0SYmlvlfgwAC/4+AJIMVy9lg5YnHJszvZEpcEUCgkUAUR2GJR9fvkHgaUdMZAQSGAvLXhfXln10N7x1Pp2MjPcz9cTeQMgIIIFBHQLdK9HQNj97LjD/exHP2j92H9I3WbeMwSggggEBdATtav5ON4E08/eSAx6xMiCsCCDQSyI7CcAfxJh6OOnWJKCOAQBOBOMpPLKdjeROP/qIEdzxNpOmLAAIDAZ3buXp+Y+mHIsdE4tGkI8bKE8VAviOAAAKzCuivSnxRnFhOx5hIPE+d3n5Qg4/O+geIRwABBIoCukcrt34na59IPLbf5zEr0+GKAAKNBKyJJt5opQNOJB6TcNRpI2k6I4DASEAkDrvj4SiMkRkFBBBoIiDyz3P3LH7vGyJ3xzOYWBbzpC+QOgQQQGAWAX1L9WWnI4mvTy7xrL525QFNPnf4AqlDAAEEZhPIn8Hj9s0lnoM+O9JdHMoIIFBfQGz+DB53pFzi6SfCGTyuDmUEEKgtIIUzeNyBconHsGLZtaGMAAI1BXRH+t59z658V9Y9n3iEV+llUNQjgEC4gG6A+OqDF6Rf1mOUeJ5+eet+PYPnzrJA6hFAAIFgAfGvWM76jxJPYiJWLGcqXBFAoJFAHE2eweMOOEo8+quhJB5XhjICCNQWiDxHYbiDjRKPEcMbLVeGMgII1BLQjaH/Ldy1fGla53HiMUwsT4OiDQEEQgXk6487cjAtepB42mu79+qP9x2bFkgbAgggECZgvRtD3b6DxGPtPvM7rgplBBCoLeA7Y7k42PBRi4WDRRe+I4BAXYE5/xk87nDDxMPCQdeEMgII1Be4bpOlb6u6DxOPER61qqRoRwCBEIFvupuyXxUYtdeuHtM9WstVgbQjgAAC1QLlR2G4ffWO5+ieTgaV7qlwgykjgAACUwXEXJzaftgY6W3Rni4eDAoOGZAYBBC4OQX0Z2z2j8Tmw5B//eHkcnxak8+1kA7EIIAAAl4BMWc+2Vj509tWqBwknu7mUq8VzZ/QjPWRLnfeKcTwFQEEEPAL6A2Lnr3Tk0he6m6uvOMPmqy9AQx28cX56jsQAAAAAElFTkSuQmCC) no-repeat;
	    background-size: 100% 100%;
	}
	.best-value {
		text-align: center;
	}
	.sub-menu-title-name {
		max-width: 70px;
	}
</style>
