<template>
	<div class="football-popup-score" v-loading="tliveLoading" style="position: absolute;left: 32px;top:-30px ;z-index: 999;">
		<div class="pop-header" v-if="tlive.home_team_name_zh">
			<div class="team-name left-name opacity">{{tlive.home_team_name_zh}}</div>
			<div class="score"><span class="opacity">{{tlive.home_score}}</span><span>-</span><span
					class="">{{tlive.away_score}}</span></div>
			<div class="team-name ">{{tlive.away_team_name_zh}}</div>
			<router-link tag="a" target="_blank" :to="'/score-live?type=football&id='+tlive.id+ '&vid=' + tlive.vid ">
				<img class="tv pointer"
					src="data:image/png;base64,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"
					alt="">
			</router-link>
		</div>
		<div class="popup-time-line-data-container" >
			<div class="popup-time-line-data">
				<div v-for="(item,index) in tlive.tlive">
					<div class="line-item" v-if="item.position == 1">
						<p class="name host-name">{{item.data}}-{{item.type}}</p>
						<div class="icon"><img class="icon-img"
								:src="require('../../assets/images/'+getImage(item.type)+'.png')" alt="">
						</div>
						<p class="time host-time">{{item.time}}</p>
					</div>
					<div class="line-item" v-if="item.position == 2">
						<p class="time guest-time">{{item.time}}</p>
						<div class="icon"><img class="icon-img"
								:src="require('../../assets/images/'+getImage(item.type)+'.png')" alt="">
						</div>
						<p class="name guest-name">{{item.data}}-{{item.type}}</p>
					</div>
				</div>
				<div>
	
				</div>
				<div>
					<div class="line-item">
						<p class="time guest-time">0'</p>
						<div class="icon"></div>
						<p class="name guest-name">
							本场比赛即将开始,比赛场地天气晴天,【{{tlive.home_team_name_zh}}】主场对战【{{tlive.away_team_name_zh}}】</p>
					</div>
				</div>
			</div>
		</div>
		<div class="title" style="padding-left: 0;" v-if="tlive.home_data">技术统计</div>
		<div class="popup-technical-statistics" v-if="tlive.home_data">
			<div class="score-progress">
				<div class="parse-item">
					<p class="text-number left-text" style="opacity: 1;">{{tlive.home_data[6]}}</p>
					<div class="progress left-progress">
						<div class="replay-pro left-pro" style="width: 66.6667%; opacity: 1;"
							:style="{width:num(tlive.home_data[6],tlive.away_data[6]) + '%'}"></div>
					</div>
					<p class="static-name">射正</p>
					<div class="progress">
						<div class="replay-pro right-pro" style="width: 33.3333%; opacity: 0.3;"
							:style="{width:num(tlive.away_data[6],tlive.home_data[6]) + '%'}"></div>
					</div>
					<p class="text-number right-text" style="opacity: 0.3;">{{tlive.away_data[6]}}</p>
				</div>
			</div>
			<div class="score-progress">
				<div class="parse-item">
					<p class="text-number left-text" style="opacity: 0.3;">{{tlive.home_data[3]}}</p>
					<div class="progress left-progress">
						<div class="replay-pro left-pro" style="width: 49.0741%; opacity: 0.3;"
							:style="{width:num(tlive.home_data[3],tlive.away_data[3]) + '%'}"></div>
					</div>
					<p class="static-name">进攻</p>
					<div class="progress">
						<div class="replay-pro right-pro" style="width: 50.9259%; opacity: 1;"
							:style="{width:num(tlive.away_data[3],tlive.home_data[3]) + '%'}"></div>
					</div>
					<p class="text-number right-text" style="opacity: 1;">{{tlive.away_data[3]}}</p>
				</div>
			</div>
			<div class="score-progress">
				<div class="parse-item">
					<p class="text-number left-text" style="opacity: 0.3;">{{tlive.home_data[5]}}</p>
					<div class="progress left-progress">
						<div class="replay-pro left-pro" style="width: 49.0741%; opacity: 0.3;"
							:style="{width:num(tlive.home_data[5],tlive.away_data[5]) + '%'}"></div>
					</div>
					<p class="static-name">控球率</p>
					<div class="progress">
						<div class="replay-pro right-pro" style="width: 50.9259%; opacity: 1;"
							:style="{width:num(tlive.away_data[5],tlive.home_data[5]) + '%'}"></div>
					</div>
					<p class="text-number right-text" style="opacity: 1;">{{tlive.away_data[5]}}</p>
				</div>
			</div>
			<div class="score-progress">
				<div class="parse-item">
					<p class="text-number left-text" style="opacity: 0.3;">{{tlive.home_data[8]}}</p>
					<div class="progress left-progress">
						<div class="replay-pro left-pro" style="width: 27.2727%; opacity: 0.3;"
							:style="{width:num(tlive.home_data[8],tlive.away_data[8]) + '%'}"></div>
					</div>
					<p class="static-name">角球</p>
					<div class="progress">
						<div class="replay-pro right-pro" style="width: 72.7273%; opacity: 1;"
							:style="{width:num(tlive.away_data[8],tlive.home_data[8]) + '%'}"></div>
					</div>
					<p class="text-number right-text" style="opacity: 1;">{{tlive.away_data[8]}}</p>
				</div>
			</div>
			<!-- <div class="score-progress">
				<div class="parse-item">
					<p class="text-number left-text" style="opacity: 1;">{{tlive.home_data[1]}}</p>
					<div class="progress left-progress">
						<div class="replay-pro left-pro" style="width: 50%; opacity: 1;"
							:style="{width:num(tlive.home_data[1],tlive.away_data[1]) + '%'}"></div>
					</div>
					<p class="static-name">黄牌</p>
					<div class="progress">
						<div class="replay-pro right-pro" style="width: 50%; opacity: 1;"
							:style="{width:num(tlive.away_data[1],tlive.away_data[1]) + '%'}"></div>
					</div>
					<p class="text-number right-text" style="opacity: 1;">{{tlive.away_data[1]}} </p>
				</div>
			</div> -->
			<div class="score-progress">
				<div class="parse-item">
					<p class="text-number left-text" style="opacity: 1;">{{tlive.home_data[7]}}</p>
					<div class="progress left-progress">
						<div class="replay-pro left-pro" style="width: 50%; opacity: 1;"
							:style="{width:num(tlive.home_data[7],tlive.away_data[7]) + '%'}"></div>
					</div>
					<p class="static-name">射偏</p>
					<div class="progress">
						<div class="replay-pro right-pro" style="width: 50%; opacity: 1;"
							:style="{width:num(tlive.away_data[7],tlive.away_data[7]) + '%'}"></div>
					</div>
					<p class="text-number right-text" style="opacity: 1;">{{tlive.away_data[7]}} </p>
				</div>
			</div>
			<div class="score-progress">
				<div class="parse-item">
					<p class="text-number left-text" style="opacity: 1;">{{tlive.home_data[4]}}</p>
					<div class="progress left-progress">
						<div class="replay-pro left-pro" style="width: 50%; opacity: 1;"
							:style="{width:num(tlive.home_data[4],tlive.away_data[4]) + '%'}"></div>
					</div>
					<p class="static-name">危险进攻</p>
					<div class="progress">
						<div class="replay-pro right-pro" style="width: 50%; opacity: 1;"
							:style="{width:num(tlive.away_data[4],tlive.away_data[4]) + '%'}"></div>
					</div>
					<p class="text-number right-text" style="opacity: 1;">{{tlive.away_data[4]}} </p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props:['tlive','tliveLoading'],
		data() {
			return {
				imglist: ['f-0', 'f-1', 'f-3', 'f-7', 'f-6', 'f-14', 'f-12', 'f-5', 'f-9', 'f-15', 'f-4', 'f-13'],
			}
		},
		methods:{
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
			// 根据类型显示图片
			getImage(t) {
				let i = this.imglist
				if (t == 1) {
					return i[0]
				} else if (t == 2) {
					return i[7]
				} else if (t == 3) {
					return i[4]
				} else if (t == 4) {
					return i[3]
				} else if (t == 6) {
					return i[6]
				} else if (t == 8) {
					return i[1]
				} else if (t == 9) {
					return i[10]
				} else if (t == 15) {
					return i[8]
				}else {
					return i[8]
				}
			}
		}
	}
</script>

<style>
</style>
