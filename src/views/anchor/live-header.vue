<template>
	<div class="matchlive-up">
		<div class="anchor-score-content">
			<!-- 篮球 -->
			<div class="score-live-detail-header-container" v-if="query.type == 'basketball'">
				<div class="score-live-detail-header-wrap">
					<div class="score-live-detail-header">
						<div class="team">
							<div class="host-name1 name tip-basketball">
								<span class="ellipsis" v-if="base.home_team_data">{{base.home_team_data.short_name_zh}}</span>
								<img :src="base.home_team_data.logo">
								<span class="num">{{base.home_scores_total}}</span>
							</div>
							<div class="score">
								<p class="league-name">
									<span>{{base.match_time}}</span> 
									<span v-if="query.type == 'basketball'">{{base.short_name_zh}}</span>
								</p>
								<p class="time">VS</p>
							</div>
							<div class="guest-name1 name tip-basketball">
								<span class="num">{{base.away_scores_total}}</span>
								<img :src="base.away_team_data.logo">
								<span class="ellipsis" v-if="base.away_team_data">{{base.away_team_data.short_name_zh}}</span>
							</div>
						</div>
					</div>
					<div class="right-btn"><a class="btn" @click="navigate('basketball',base.id)">赛事实况</a></div>
				</div>
				<div class="score-detail-odd-table " style="top: 58px;">
					<ul class="odd" v-if="isShow">
						<li class="odd-item odd-item-header">
							<div class="cell cell2 borderR">对阵</div>
							<div class="cell cell3 borderR">
								<div class="odd-number">1</div>
								<div class="odd-number">2</div>
								<div class="odd-number">3</div>
								<div class="odd-number">4</div>
							</div>
							<div class="cell cell4 borderR">
								<div class="cell odd-number">全场</div>
								<div class="cell odd-number">欧指</div>
							</div>
							<div class="cell cell4 borderR">
								<div class="odd-number"></div>
								<div class="odd-number">让球</div>
								<div class="odd-number"></div>
							</div>
							<div class="cell cell4">
								<div class="odd-number"></div>
								<div class="odd-number">大小</div>
								<div class="odd-number"></div>
							</div>
						</li>
						<li class="odd-item borderT">
							<div class="cell cell2 borderR ellipsis">{{base.home_team_data.short_name_zh}}</div>
							<div class="cell cell3 borderR">
								<div class="odd-number">{{base.home_scores[0]}}</div>
								<div class="odd-number">{{base.home_scores[1]}}</div>
								<div class="odd-number">{{base.home_scores[2]}}</div>
								<div class="odd-number">{{base.home_scores[3]}}</div>
							</div>
							<div class="cell cell4 borderR">
								<div class="cell odd-number borderR">{{base.home_scores_total}}</div>
								<div class="cell odd-number" id="animate1">{{basketball.eu?basketball.eu.host : '-'}}</div>
							</div>
							<div class="cell cell4 borderR">
								<div class="odd-number" ></div>
								<div class="odd-number">客</div>
								<div class="odd-number" id="animate5">{{basketball.eu?basketball.asia.guest : '-'}}</div>
							</div>
							<div class="cell cell4">
								<div class="odd-number" id="animate7" >{{basketball.eu?basketball.bs.early : '-'}}</div>
								<div class="odd-number">大</div>
								<div class="odd-number" id="animate9">{{basketball.eu?basketball.bs.host : '-'}}</div>
							</div>
						</li>
						<li class="odd-item borderT">
							<div class="cell cell2 borderR ellipsis" >{{base.away_team_data.short_name_zh || '-'}}</div>
							<div class="cell cell3 borderR">
								<div class="odd-number">{{base.away_scores[0]}}</div>
								<div class="odd-number">{{base.away_scores[1]}}</div>
								<div class="odd-number">{{base.away_scores[2]}}</div>
								<div class="odd-number">{{base.away_scores[3]}}</div>
							</div>
							<div class="cell cell4 borderR">
								<div class="cell odd-number borderR">{{basketball.eu?base.away_scores_total : '-'}}</div>
								<div class="cell odd-number" id="animate2">{{basketball.eu?basketball.eu.guest : '-'}}</div>
							</div>
							<div class="cell cell4 borderR">
								<div class="odd-number">{{basketball.eu?basketball.asia.early: '-'}}</div>
								<div class="odd-number">主</div>
								<div class="odd-number" id="animate6" >{{basketball.eu?basketball.asia.host: '-'}}</div>
							</div>
							<div class="cell cell4">
								<div class="odd-number" id="animate8"></div>
								<div class="odd-number">小</div>
								<div class="odd-number" id="animate10" >{{basketball.eu?basketball.bs.guest : '-'}}</div>
							</div>
						</li>
					</ul>
					<p class="color-999 more-data" @click="isShow=!isShow">{{isShow?'关闭':'更多'}}数据 <span :class="!isShow?'xiala-icon':'shangla-icon'"></span></p>
				</div>
			</div>

			<!-- 足球 -->
			<div class="score-live-detail-header-container" v-else-if="query.type == 'football'">
				<div class="score-live-detail-header-wrap">
					<div class="score-live-detail-header">
						<div class="team" v-if="base">
							<div class="host-name name">
								<span class="ellipsis">{{base.home_team_name_zh}}</span>
								<img :src="base.home_team_log">
								<span class="num" v-if="base.home_data">{{base.home_score ? base.home_score : base.home_data[0]}}</span>
							</div>
							<div class="score">
								<p class="league-name"><span>{{base.time}}</span></p>
								<div>
									<div class="on-time flex-center custom-score-wrap">
										<div>
											<p class="time-text color-999">{{getStatus(base.status)}}</p>
										</div>
									</div>
								</div>
							</div>
							<div class="guest-name name">
								<span class="num" v-if="base.away_data">{{base.away_score ? base.away_score : base.away_data[0]}}</span>
								<img :src="base.away_team_log">
								<span class="ellipsis">{{base.away_team_name_zh}}</span>
							</div>
							<div class="custom-matchData-info"></div>
						</div>
					</div>
					<div class="right-btn"><a class="btn" @click="navigate('football',base.id)">赛事实况</a></div>
				</div>
				<!-- 指數隱藏 -->
				<!-- <div class="score-detail-odd-table " style="top: 55.5556px;">
					<ul class="odd" v-if="isShow">
						<li class="odd-item odd-item-header">
							<div class="cell cell0 borderR"></div>
							<div class="cell cell1 borderR">
								<p class="odd-number"></p>
								<p class="odd-number">欧指</p>
								<p class="odd-number"></p>
							</div>
							<div class="cell cell1 borderR">
								<p class="odd-number"></p>
								<p class="odd-number">让球</p>
								<p class="odd-number"></p>
							</div>
							<div class="cell cell1 borderR">
								<p class="odd-number"></p>
								<p class="odd-number">大小球</p>
								<p class="odd-number"></p>
							</div>
							<div class="cell cell1">
								<p class="odd-number"></p>
								<p class="odd-number">角球</p>
								<p class="odd-number"></p>
							</div>
						</li>
						<li class="odd-item borderT">
							<div class="cell cell0 borderR">即时盘</div>
							<div class="cell cell1 borderR" v-if="base.exponent && base.exponent.eu">
								<p class="odd-number">{{base.exponent.eu.immediate.win || '-'}}</p>
								<p class="odd-number">{{base.exponent.eu.immediate.draw || '-'}}</p>
								<p class="odd-number">{{base.exponent.eu.immediate.fail || '-'}}</p>
							</div>
							<div class="cell cell1 borderR" v-if="base.exponent && base.exponent.asia">
								<p class="odd-number">{{base.exponent.asia.immediate.win || '-'}}</p>
								<p class="odd-number">{{base.exponent.asia.immediate.draw || '-'}}</p>
								<p class="odd-number">{{base.exponent.asia.immediate.fail || '-'}}</p>
							</div>
							<div class="cell cell1 borderR" v-if="base.exponent && base.exponent.bs">
								<p class="odd-number">{{base.exponent.bs.immediate.win || '-'}}</p>
								<p class="odd-number">{{base.exponent.bs.immediate.draw || '-'}}</p>
								<p class="odd-number">{{base.exponent.bs.immediate.fail || '-'}}</p>
							</div>
							<div class="cell cell1" v-if="base.exponent && base.exponent.cr">
								<p class="odd-number">{{base.exponent.cr.immediate.win || '-'}}</p>
								<p class="odd-number">{{base.exponent.cr.immediate.draw || '-'}}</p>
								<p class="odd-number">{{base.exponent.cr.immediate.fail || '-'}}</p>
							</div>
						</li>
						<li class="odd-item borderT">
							<div class="cell cell0 borderR">滚球盘</div>
							<div class="cell cell1 borderR" v-if="base.exponent && base.exponent.eu">
								<p class="odd-number">{{base.exponent.eu.scram.win || '-'}}</p>
								<p class="odd-number">{{base.exponent.eu.scram.draw || '-'}}</p>
								<p class="odd-number">{{base.exponent.eu.scram.fail || '-'}}</p>
							</div>
							<div class="cell cell1 borderR" v-if="base.exponent && base.exponent.asia">
								<p class="odd-number">{{base.exponent.asia.scram.win || '-'}}</p>
								<p class="odd-number">{{base.exponent.asia.scram.draw || '-'}}</p>
								<p class="odd-number">{{base.exponent.asia.scram.fail || '-'}}</p>
							</div>
							<div class="cell cell1 borderR" v-if="base.exponent && base.exponent.bs">
								<p class="odd-number">{{base.exponent.bs.scram.win || '-'}}</p>
								<p class="odd-number">{{base.exponent.bs.scram.draw || '-'}}</p>
								<p class="odd-number">{{base.exponent.bs.scram.fail || '-'}}</p>
							</div>
							<div class="cell cell1" v-if="base.exponent && base.exponent.cr">
								<p class="odd-number">{{base.exponent.cr.scram.win || '-'}}</p>
								<p class="odd-number">{{base.exponent.cr.scram.draw || '-'}}</p>
								<p class="odd-number">{{base.exponent.cr.scram.fail || '-'}}</p>
							</div>
						</li>
					</ul>
					<p class="color-999 more-data" @click="isShow=!isShow">{{isShow?'关闭':'更多'}}数据 <span :class="!isShow?'xiala-icon':'shangla-icon'"></span></p>
				</div> -->
			</div>
		</div>
	</div>
</template>

<script>
import { getQueryString } from "@/utils/Qs";

	export default {
		name: 'liveHeader',
		props: ['query','detail','base','exponent','basketball'],
		data() {
			return {
				isShow:false,
			}
		},
		methods:{
			// 赛事实况关联
			navigate(url,id){
    			let vid = getQueryString().vid || "";

				// localStorage.setItem('index', null)
				// return
				let urls = '/score-live?type='+url+'&id='+id + '&vid=' + vid
				let routeData = this.$router.resolve({  path:urls})
				
				window.open(routeData.href,'_blank')
			},
			
			getStatus(type){
				if(type == 1){
					return '未开赛'
				}else if(type == 2){
					return '上半场'
				}else if(type == 3){
					return '中场'
				}else if(type == 4){
					return '下半场'
				}else if(type == 5){
					return '加时赛'
				}else if(type == 7){
					return '点球决战'
				}else if(type == 8){
					return '完场'
				}
				// 1.未开赛 2.上半场 3.中场 4.下半场 5.加时赛 7.点球决战 8.完场
			}
		}
	}
	
</script>

<style>
</style>
