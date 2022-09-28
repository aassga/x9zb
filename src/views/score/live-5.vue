<template>
	<div role="tabpanel" tabindex="0" aria-hidden="false" style="" class="ant-tabs-tabpane ant-tabs-tabpane-active"
		id="rc-tabs-0-panel-3" aria-labelledby="rc-tabs-0-tab-3">
		<div class="live-match-wrap">
			<div class="team-statistic-wrap" v-if="dataBase.away.length != 0">
				<div class="team-statistic-main">
					<div class="basketball-team-statistic">
						<div class="basketball-team-statistic-item">
							<div class="skill-list">
								<div class="skill-title">
									<div class="title-item"><img class="title-item-logo"
											:src="item.home_team_data.logo">
									</div>
									<div class="title-item width98">号码/球员</div>
									<div class="title-item">首发</div>
									<div class="title-item">时间</div>
									<div class="title-item">得分</div>
									<div class="title-item">篮板</div>
									<div class="title-item">助攻</div>
									<div class="title-item">投篮</div>
									<div class="title-item">三分</div>
									<div class="title-item">罚球</div>
									<div class="title-item">抢断</div>
									<div class="title-item">盖帽</div>
									<div class="title-item">失误</div>
									<div class="title-item">犯规</div>
								</div>
								<div class="skill-content">
									<div class="content-row" v-for="(item,index) in dataBase.home" :key="index">
										<div class="content-row-item">{{item.shirt_number}}</div>
										<div class="content-row-item width98">{{item.home}}</div>
										<div class="content-row-item">{{item.is_substitute == 0?'首发':'替补'}}</div>
										<div class="content-row-item">{{item.presence_time}}</div>
										<div class="content-row-item">{{item.score}}</div>
										<div class="content-row-item">{{item.total_rebounds}}</div>
										<div class="content-row-item">{{item.assists}}</div>
										<div class="content-row-item">{{item.hits}}/{{item.shots}}</div>
										<div class="content-row-item">{{item.three_pointer}}/{{item.three_pointer_shot}}</div>
										<div class="content-row-item">{{item.free_throw}}/{{item.free_throw_shots}}</div>
										<div class="content-row-item">{{item.steals}}</div>
										<div class="content-row-item">{{item.blocks}}</div>
										<div class="content-row-item">{{item.number_of_mistakes}}</div>
										<div class="content-row-item">{{item.individual_fouls}}</div>
									</div>
									<div class="content-row">
										<div class="content-row-item total-statistic">总计</div>
										<div class="content-row-item">-</div>
										<div class="content-row-item">-</div>
										<div class="content-row-item">{{dataBase.home_sum.score}}</div>
										<div class="content-row-item">{{dataBase.home_sum.total_rebounds}}</div>
										<div class="content-row-item">{{dataBase.home_sum.assists}}</div>
										<div class="content-row-item">{{dataBase.home_sum.hits}}/{{dataBase.home_sum.shots}}</div>
										<div class="content-row-item">{{dataBase.home_sum.three_pointer}}/{{dataBase.home_sum.three_pointer_shot}}</div>
										<div class="content-row-item">{{dataBase.home_sum.free_throw}}/{{dataBase.home_sum.free_throw_shots}}</div>
										<div class="content-row-item">{{dataBase.home_sum.steals}}</div>
										<div class="content-row-item">{{dataBase.home_sum.blocks}}</div>
										<div class="content-row-item">{{dataBase.home_sum.number_of_mistakes}}</div>
										<div class="content-row-item">{{dataBase.home_sum.individual_fouls}}</div>
									</div>
								</div>
							</div>
						</div>
						<div class="basketball-team-statistic-item">
							<div class="skill-list">
								<div class="skill-title">
									<div class="title-item"><img class="title-item-logo"
											:src="item.away_team_data.logo">
									</div>
									<div class="title-item width98">号码/球员</div>
									<div class="title-item">首发</div>
									<div class="title-item">时间</div>
									<div class="title-item">得分</div>
									<div class="title-item">篮板</div>
									<div class="title-item">助攻</div>
									<div class="title-item">投篮</div>
									<div class="title-item">三分</div>
									<div class="title-item">罚球</div>
									<div class="title-item">抢断</div>
									<div class="title-item">盖帽</div>
									<div class="title-item">失误</div>
									<div class="title-item">犯规</div>
								</div>
								<div class="skill-content">
									<div class="content-row" v-for="(item,index) in dataBase.away" :key="index">
										<div class="content-row-item">{{item.shirt_number}}</div>
										<div class="content-row-item width98">{{item.home}}</div>
										<div class="content-row-item">{{item.is_substitute == 0?'首发':'替补'}}</div>
										<div class="content-row-item">{{item.presence_time}}</div>
										<div class="content-row-item">{{item.score}}</div>
										<div class="content-row-item">{{item.total_rebounds}}</div>
										<div class="content-row-item">{{item.assists}}</div>
										<div class="content-row-item">{{item.hits}}/{{item.shots}}</div>
										<div class="content-row-item">{{item.three_pointer}}/{{item.three_pointer_shot}}</div>
										<div class="content-row-item">{{item.free_throw}}/{{item.free_throw_shots}}</div>
										<div class="content-row-item">{{item.steals}}</div>
										<div class="content-row-item">{{item.blocks}}</div>
										<div class="content-row-item">{{item.number_of_mistakes}}</div>
										<div class="content-row-item">{{item.individual_fouls}}</div>
									</div>
									<div class="content-row">
										<div class="content-row-item total-statistic">总计</div>
										<div class="content-row-item">-</div>
										<div class="content-row-item">-</div>
										<div class="content-row-item">{{dataBase.away_sum.score}}</div>
										<div class="content-row-item">{{dataBase.away_sum.total_rebounds}}</div>
										<div class="content-row-item">{{dataBase.away_sum.assists}}</div>
										<div class="content-row-item">{{dataBase.away_sum.hits}}/{{dataBase.away_sum.shots}}</div>
										<div class="content-row-item">{{dataBase.away_sum.three_pointer}}/{{dataBase.away_sum.three_pointer_shot}}</div>
										<div class="content-row-item">{{dataBase.away_sum.free_throw}}/{{dataBase.away_sum.free_throw_shots}}</div>
										<div class="content-row-item">{{dataBase.away_sum.steals}}</div>
										<div class="content-row-item">{{dataBase.away_sum.blocks}}</div>
										<div class="content-row-item">{{dataBase.away_sum.number_of_mistakes}}</div>
										<div class="content-row-item">{{dataBase.away_sum.individual_fouls}}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="basketball-content"v-else>
				<img class="no-data-img" src="../../assets/images/qsy.png" >
			</div>
		</div>
	</div>
</template>

<script>
	import {
		playerData
	} from "@/api/basketball.js";
	export default {
		props:['item'],
		data() {
			return {
				dataBase:{
					away:[],
					home:[]
				}
			}
		},
		mounted() {
			playerData({id:this.item.id}).then(res=>{
				this.dataBase = res.data
			}).catch(res=>{})
		}
	}
</script>

<style>
	.no-data-img {
		width: 276px;
		height: 221px;
		display: block;
		margin: 100px auto;
	}
</style>
