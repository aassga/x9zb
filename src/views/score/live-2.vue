<template>
	<div role="tabpanel" tabindex="-1" aria-hidden="true" class="ant-tabs-tabpane" id="rc-tabs-0-panel-3"
		aria-labelledby="rc-tabs-0-tab-3">
		<div class="live-match-wrap">
			<div class="team-statistic-wrap">
				<div class="team-statistic-main">
					<div class="football-team-statistic">
						<div class="header">{{list.competition_name_zh}}</div>
						<div class="content">
							<div class="title">
								<div class="left">
									<img
										:src="list.home_team_log" /><span>{{list.home_team_name_zh}}</span>
								</div>
								<div class="mid">VS</div>
								<div class="right">
									<span>{{list.away_team_name_zh}}</span><img
										:src="list.away_team_log" />
								</div>
							</div>

							<div class="item" v-for="(item1,index) in statistical" :key="index">
								<span class="team-info">{{item1.num1}}</span>
								<div class="barBox">
									<div class="
									  ant-progress
									  ant-progress-line
									  ant-progress-status-normal
									  ant-progress-default
									  bar-1
									">
										<div class="ant-progress-outer">
											<div class="ant-progress-inner">
												<div class="ant-progress-bg" :style="{width:item1.progress1+'%'}" style="
													height: 6px;
													background: rgb(255, 93, 93);
												  "></div>
											</div>
										</div>
									</div>
									<span class="tit">{{item1.name}}</span>
									<div class="
									  ant-progress
									  ant-progress-line
									  ant-progress-status-normal
									  ant-progress-default
									  bar-2
									">
										<div class="ant-progress-outer">
											<div class="ant-progress-inner">
												<div class="ant-progress-bg" :style="{width:item1.progress2 + '%'}" style="
													height: 6px;
													background: rgb(65, 133, 255);
												  "></div>
											</div>
										</div>
									</div>
								</div>
								<span class="team-info">{{item1.num2}}</span>
							</div>
							<!-- ------------------2 -->
						</div>
					</div>
				</div>
			</div>
		</div>
		{{item.technology}}
	</div>
</template>

<script>
	export default {
		props: ['list','statistical','item'],
		data() {
			return {
				arr:['fouls']
			}
		},

		methods: {
			num(num1,num2){
				if(num1 == 0 && num2 == 0){
					return 0
				}else if(num1>num2){
					return num1 / (num1+num2) * 100
					
				}else if(num1<num2){
					return num2 / (num1+num2) * 100
				}
			},
			
			getStatus(type){
				if(type == 'goals'){
					return '进球'
				}else if(type == 'penalty'){
					return '点球'
				}else if(type == 'dribble'){
					return '过人'
				}else if(type == 'dribble_succ'){
					return '过人成功'
				}else if(type == 'clearances'){
					return '解围'
				}else if(type == 'blocked_shots'){
					return '有效阻挡'
				}else if(type == 'interceptions'){
					return '拦截'
				}else if(type == 'tackles'){
					return '抢断'
				}else if(type == 'tackles'){
					return '传球'
				}else if(type == 'passes'){
					return '传球成功'
				}else if(type == 'key_passes'){
					return '关键传球'
				}else if(type == 'crosses'){
					return '传中球'
				} else if(type == 'crosses_accuracy'){
					return '传中球成功'
				} else if(type == 'long_balls'){
					return '长传'
				} else if(type == 'long_balls_accuracy'){
					return '成功长传'
				} else if(type == 'duels'){
					return '拼抢'
				} else if(type == 'duels_won'){
					return '1对1拼抢成功'
				} else if(type == 'dispossessed'){
					return '丢球'
				} else if(type == 'fouls'){
					return '犯规'
				} else if(type == 'was_fouled'){
					return '被侵犯'
				} else if(type == 'offsides'){
					return '越位'
				} else if(type == 'yellow2red_cards'){
					return '两黄变红'
				} else if(type == 'saves'){
					return '扑救'
				} else if(type == 'punches'){
					return '拳击球'
				} else if(type == 'runs_out'){
					return '守门员出击'
				} else if(type == 'runs_out_succ'){
					return '守门员出击成功'
				}  else {
					return '高空出击'
				}
			},
		}
	}
</script>

<style>
</style>
