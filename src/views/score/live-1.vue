<template>
	<div role="tabpanel" tabindex="-1" aria-hidden="true" class="ant-tabs-tabpane" id="rc-tabs-0-panel-2"
		aria-labelledby="rc-tabs-0-tab-2">
		<div class="live-match-wrap">
			<div class="event-statistic-view">
				<div class="event-main-wrap">
					<div class="event-main">
						<div class="event-top">
							<div class="header">比赛事件</div>
							<div class="team-info-wrap">
								<div class="host-team-info team-info">
									<img :src="item.home_team_log" /><span class="team-name">{{
                    item.home_team_name_zh
                  }}</span>
								</div>
								<div class="vs">
									<div class="vs-title"><span>VS</span></div>
									<div class="end-dot"></div>
								</div>
								<div class="guest-team-info team-info">
									<span class="team-name">{{ item.away_team_name_zh }}</span><img
										:src="item.away_team_log" />
								</div>
							</div>
						</div>
						<div class="event-list-wrap">
							<div class="event-item" v-for="(li, index) in item.tlive" :key="index"
								v-if="li.position != 0">
								<div class="host-event-list event-list">
									<div class="event-statistic-host-item" v-if="li.position == 1">
										<div class="host-wrap">
											<div class="player-name player1-name">
												<div class="player1">{{ item.home_team_name_zh }}</div>
												<div class="player2">{{ li.data }}</div>
											</div>
										</div>
									</div>
									<div class="mg20" v-if="li.position == 2">{{ li.time }}</div>
								</div>
								<div class="event-time-list">
									<div class="icon-wrap">
										<img
											:src="require('../../assets/images/'+getImage(li.type)+'.png')" />
									</div>
								</div>
								<div class="guest-event-list event-list">
									<div class="mg20" v-if="li.position == 1">{{ li.time }}</div>
									<div class="event-statistic-guest-item" v-if="li.position == 2">
										<div class="guest-wrap">
											<div class="player-name">
												<div class="player1">
													{{ item.away_team_name_zh }}
												</div>
												<div class="player2">
													{{ li.data }}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div class="event-item">
								<div class="host-event-list event-list"></div>
								<div class="event-time-list">
									<div class="icon-wrap">
										<img
											src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAsCAYAAAAjFjtnAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMKADAAQAAAABAAAALAAAAAB+JxaPAAADTElEQVRoBe1Zy4oTQRStvElCnuaNWweZhbOdlf7AwMzOvSAu/AcXfoELcSn4BX7ALFyPuAkiSFAQF3lC3u+k057bWk3nQarH7pruQAqKqu66VfecW7fejB148OzCr6pqsNlsPlytVqFd5Xf9z+/3K8BUyeVyw03dawQajUYeoN9B+AKCwU1hJ789Hs8K+m+QvigUCl85Fp1AvV7PAXgZsQAhFayR6MVc3pEUmJiiKCqMS4BmXq/3CUjcEBg/R4TCN8gXQqEQS6VSrgHP8SH19Ho9Nh6PQyD0HvERQCpeEsCHD8kVfqjJZJK5xfKEzRgSiQSDZxDeU7j7KZVpBGq12gnyYXIbdI+xjuvyweDfoQmPOSNwHG3EdUjFgDTMnIBY3KUSRwJOd8zB94C+DuyzJOZetlgs9onYXubz+Vg0GhVO6UICBJ4WECcCVl9Gc/++IHSh5XK5r77UMjO6hQTC4TBzYnGj3UAkIl6ehC4UCAQYtrHMjDXs7A4aA2YMJyRAoMgaRMSNQehCbgRtxHQkYLSGE/mD7wFTg5gsi0OEJQPLOiQJCdBq2G63LU+jNCWm02nbZzOhC41GI8vgqetwgmKDwcBSL+6qLCRAC4pdwc62OCahC9GOkKxHu1Er44AO47FYjOu1LRUSIE0yFNvFQOhCdimS1c6RgCzLmm332ANmLSVLTusBrJIzWQpktYutiYZZI5DP5ytQNMepC1O9tT2PLMC8XX47gnVFeyPQCIDNHPEa4LUrbC7stnQ4HPLrnd+ZTEYjoC9kAP8SJB5PJpPYfD4XbrpoWxCPx7c4zmYzusPf+m/1B53JKQKjCpd/jlS7qFp7gmm1WicQ+gAy5yKFdEaGFdbEyEKIqK6utbsmZOEDoH+h+rNisfiJN7NTEYgU4WtnYLr1yAdw9xHfGgngm3W7XTadTslCChp/jbTMldiQKsDyHbcjPzbb2klgU8j4jdfLB+ilCm3OstksvV2xTqfDfbMD13qKSeHaWEdmXh8DZpVgZ6pf1dFYAXjt8Q0W/wYrXQL8T7Nt2SF365UYICek+N9Jjb8cfoTlz+8a/H8bAG9qn6vVqop0hfhK1qA1A/DWY4Aa7ff79zBVXsGdyqVS6YsZRbJk/gAAdkFZv9H6tAAAAABJRU5ErkJggg==" />
									</div>
								</div>
								<div class="guest-event-list event-list"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="football-icon-list-info">
					<div class="icon-list" v-for="(item,index) in list" :key="index">
						<img
							:src="require('../../assets/images/'+imglist[index]+'.png')" /><span>{{item}}</span>
					</div>
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ["item"],
		data() {
			return {
				imglist:['f-0','f-1','f-3','f-7','f-6','f-14','f-12','f-5','f-9','f-15','f-4','f-13'],
				list: ['进球','点球','乌龙球','红牌','黄牌','两黄罚下','任意球','角球','受伤','开哨','换人','助攻']
			}
		},
		methods:{
			// 根据类型显示图片
			getImage(t){
				let i = this.imglist
				// return i[0]
				if(t==1){
					return i[0]
				}else if(t==2){
					return i[7]
				}else if(t==3){
					return i[4]
				}else if(t==4){
					return i[3]
				}else if(t==6){
					return i[6]
				}else if(t == 8){
					return i[1]
				}else if(t == 9){
					return i[10]
				}else if(t == 15){
					return i[8]
				}else{
					return i[8]
				}
			}
		}
	};
</script>

<style>
</style>
