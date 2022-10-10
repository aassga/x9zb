<template>
	<article class="football-score-container">
		<div v-if="fightMask" class="pop-tip-handicap" style="position:fixed;" :style="{left: left,top: top}">
			<div class="pop-header">
				<div class="left">
					<p class="team-name text-right opacity">{{lang==1?exponent.home_team_name_zht:lang==2?exponent.home_team_name_en:exponent.home_team_name_zh}}</p>
					<p class="vs">
						<span class="opacity">{{exponent.home_score}}</span><span>-</span><span class="">{{exponent.away_score}}</span>
					</p>
					<p class="team-name">{{lang==1?exponent.away_team_name_zht:lang==2?exponent.away_team_name_en:exponent.away_team_name_zh}}</p>
				</div>
				<a target="_blank" href="/score-detail/three?matchId=undefined&amp;sportId=1">
					<div style="
		      display: inline-block;
		      max-width: 100%;
		      overflow: hidden;
		      position: relative;
		      box-sizing: border-box;
		      margin: 0px;
		    ">
						<!-- <div style="box-sizing: border-box; display: block; max-width: 100%" @click="setId(item)">
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
					<div class="item chupan" v-if="expIndex.asia  && expIndex.asia .initial && expIndex.asia .initial.sealing_disk == 0">
						<div class="left"><span class="val">{{expIndex.asia .initial.win}}</span></div>
						<div class="middle"><span class="val">{{expIndex.asia .initial.draw}}</span></div>
						<div class="right"><span class="val">{{expIndex.asia .initial.fail}}</span></div>
					</div>
					<div class="item chupan" v-if="expIndex.asia  && expIndex.asia .initial && expIndex.asia .initial.sealing_disk == 1">
						封
					</div>
					<div class="item jishi" v-if="expIndex.asia  && expIndex.asia .immediate && expIndex.asia .immediate.sealing_disk == 0">
						<div class="left"><span class="val">{{expIndex.asia .immediate.win}}</span></div>
						<div class="middle"><span class="val">{{expIndex.asia .immediate.draw}}</span></div>
						<div class="right"><span class="val">{{expIndex.asia .immediate.fail}}</span></div>
					</div>
					<div class="item chupan" v-if="expIndex.asia  && expIndex.asia .immediate && expIndex.asia .immediate.sealing_disk == 1">
						封
					</div>
					<div class="item gunqiu" v-if="expIndex.asia  && expIndex.asia .scram && expIndex.asia .scram.sealing_disk == 0">
						<div class="left"><span class="val">{{expIndex.asia .scram.win}}</span></div>
						<div class="middle"><span class="val">{{expIndex.asia .scram.draw}}</span></div>
						<div class="right"><span class="val">{{expIndex.asia .scram.fail}}</span></div>
					</div>
					<div class="item chupan" v-if="expIndex.asia  && expIndex.asia .scram && expIndex.asia .scram.sealing_disk == 1">
						封
					</div>
				</div>
				<div class="col_thr">
					<div class="item title bg-color">大小指数</div>
					<div class="item chupan" v-if="expIndex.bs  && expIndex.bs .initial && expIndex.bs .initial.sealing_disk == 0">
						<div class="left"><span class="val">{{expIndex.bs .initial.win}}</span></div>
						<div class="middle"><span class="val">{{expIndex.bs .initial.draw}}</span></div>
						<div class="right"><span class="val">{{expIndex.bs .initial.fail}}</span></div>
					</div>
					<div class="item chupan" v-if="expIndex.bs  && expIndex.bs .initial && expIndex.bs .initial.sealing_disk == 1">
						封
					</div>
					<div class="item jishi" v-if="expIndex.bs  && expIndex.bs .immediate && expIndex.bs .immediate.sealing_disk == 0">
						<div class="left"><span class="val">{{expIndex.bs .immediate.win}}</span></div>
						<div class="middle"><span class="val">{{expIndex.bs .immediate.draw}}</span></div>
						<div class="right"><span class="val">{{expIndex.bs .immediate.fail}}</span></div>
					</div>
					<div class="item chupan" v-if="expIndex.bs  && expIndex.bs .immediate && expIndex.bs .immediate.sealing_disk == 1">
						封
					</div>
					<div class="item gunqiu" v-if="expIndex.bs  && expIndex.bs .scram && expIndex.bs .scram.sealing_disk == 0">
						<div class="left"><span class="val">{{expIndex.bs .scram.win}}</span></div>
						<div class="middle"><span class="val">{{expIndex.bs .scram.draw}}</span></div>
						<div class="right"><span class="val">{{expIndex.bs .scram.fail}}</span></div>
					</div>
					<div class="item chupan" v-if="expIndex.bs  && expIndex.bs .scram && expIndex.bs .scram.sealing_disk == 1">
						封
					</div>
					
				</div>
				<div class="col_four">
					<div class="item title bg-color">欧赔</div>
					<div class="item chupan" v-if="expIndex.eu && expIndex.eu.initial && expIndex.eu.initial.sealing_disk == 0">
						<div class="left"><span class="val">{{expIndex.eu.initial.win}}</span></div>
						<div class="middle"><span class="val">{{expIndex.eu.initial.draw}}</span></div>
						<div class="right"><span class="val">{{expIndex.eu.initial.fail}}</span></div>
					</div>
					<div class="item chupan" v-if="expIndex.eu && expIndex.eu.initial && expIndex.eu.initial.sealing_disk == 1">
						封
					</div>
					<div class="item jishi" v-if="expIndex.eu && expIndex.eu.immediate && expIndex.eu.immediate.sealing_disk == 0">
						<div class="left"><span class="val">{{expIndex.eu.immediate.win}}</span></div>
						<div class="middle"><span class="val">{{expIndex.eu.immediate.draw}}</span></div>
						<div class="right"><span class="val">{{expIndex.eu.immediate.fail}}</span></div>
					</div>
					<div class="item chupan" v-if="expIndex.eu && expIndex.eu.immediate && expIndex.eu.immediate.sealing_disk == 1">
						封
					</div>
					<div class="item gunqiu" v-if="expIndex.eu && expIndex.eu.scram && expIndex.eu.scram.sealing_disk == 0">
						<div class="left"><span class="val">{{expIndex.eu.scram.win}}</span></div>
						<div class="middle"><span class="val">{{expIndex.eu.scram.draw}}</span></div>
						<div class="right"><span class="val">{{expIndex.eu.scram.fail}}</span></div>
					</div>
					<div class="item chupan" v-if="expIndex.eu && expIndex.eu.scram && expIndex.eu.scram.sealing_disk == 1">
						封
					</div>
					
					
				</div>
			</div>
		</div>
		<div class="football-popup-score" style="position:fixed;" @mouseleave="mousemove" v-if="dataMask" v-loading="tliveLoading"
			:style="{left: left,top: top}">
			<div class="pop-header" v-if="tlive.home_team_name_zh">
				<div class="team-name left-name opacity">{{tlive.home_team_name_zh}}</div>
				<div class="score"><span class="opacity">{{tlive.home_data[0]}}</span><span>-</span><span
						class="">{{tlive.away_data[0]}}</span></div>
				<div class="team-name ">{{tlive.away_team_name_zh}}</div>
				<router-link tag="a" target="_blank" :to="'/score-live?type=football&id='+tlive.id+ '&vid=' + tlive.vid ">
					<img class="tv pointer"
							src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAPKADAAQAAAABAAAAPAAAAACL3+lcAAAF3UlEQVRoBe1aX2xTVRg/57RrQSZzbkpcNJHBfJAYErPwYFhi102z+KY4k7Ybgg+Y6Vi2EafxZQ/+CWbdiJszapgT2mGI/4K+qOs6BB8kGpUgD06BxDAEQSSDsLW75/h9t73jrr33tuW2XTvufTl/vu+c8/ud77vnfOeeS4j1WDNgzYA1A9YMWDNQMDNAUyE5Muwpj8yxtYTyUiYYS6W/FHJOOSeCXXU4+em6trHLRhh0Cf+6r2XVpX/4bkFEmxBEV8+o83zLKCWCEjpccRfr2di6/5rW+JpEkOzFC/wYkH1Qq1Gh1wHpk5V3s01apO1a4OOWXSALM/ctGPlH6Ciipb/UdWAYBxi3FjyxEbGgoZADZF9MxJZkYfmdvU4uKW5sI8zn2hUIJjYsxHK4z+eVCA8gNnRvx0pSkfhOJy1CuEApZNGyxUIWSSJWxIx55CAvtlhQPUmEcTVW5OjGSr5Y0kWYVVwU/EmE1VtPob6zCnitVI1ZzUXRTSKsCJZrqrlKmyEbHnj2Dm4TFfXta09T2svN9CUOHrT9dHnciX3MPFAVcbl65830h22zRjjs9z4D7F6TpMh6IhES8k9dC/V5vyMOe7t750d/Zgo01N+6KfTXFwdgj6nGtvTnP9ohGcq0n0T9rLh0qN+zRxLiYyHE+hsDiFWwHzaJ6Pzx0IC36Ua9cQ76oON93peIkI4qZI1bZCY1TTg84GkQnHQow8K2cJhS+gHY5Be5TojbCBcf/jDUWqHoGKWTe7aVwaayG4iXQB+mXgmtcUy7tCTRVzG2wYdS1ubuDryLebTUhN83DFZ+HvbENTOzfAdUv4GytB5KvoaJ+0pwMZiWfppKpiwsRC+jVNTiWGDZ3xSysTIVK9kKmIz4Q/nDStYoLVnNYAWgPe6uYBMR/LyR7s3ITBGeHD3joIxsZTbyFKH27YkAHuna+y/si7NyvSBViXKt8ubnRmYadgXfAuvG3EZLyUSdKZd2bRtFMp/pjT/e76sTnK+Q5ZRM6enls96UhY2A4hGTCi6/z6jHCPvUSD9fMlMWNgIJ5+lR8MkNqAPuGa7vDhwy0s+XLCcWhoDjZVidt8hkCf3b6XD68kUo1ThZt/BEX8vjnPDXZbKURmFR27K5fWRaDQTCz/slKRqLmij9sqE78J5anst8VgmH3t66TkSiBwBw3HNoR31n4PtEAhLlq2GnfgLr4QvEqUR5LstZc2lcpCCM/Bze23IEzCjbq96Xc0kik76zZmFYpEbAag/h4BCEHLuvpPwFPSDujuoTk8MXbkf5vZItqqeXi/qsEA75PT0QSjYjQCB7HoKQJ2t2Ds7pAY4fG6/qyXNZb9qlQ/3exyBslmNk2H6igrKn3V37zuYStJm+TVkYD/sSjywsUmDlM/CxsBksLltbDQxCzOn67uCbWHd0cHvVXGT2FcwLRg83dAY/wXw+HlOEmV0ql+bInSqgNXAyqlGV1dkTUJAJz0rzlXDAkr8ZwwEQY+a8ETbt0mpGxZA3ZeHKNevOnps+tTEdog6JxE5NoGwrY79LV+xyO6fNflGvfVlp6Tf/XZ+V9UrtJCvrginCG5p78erluB5gvfr4KStlu9od71+5mf71xsX6W86lLcLy5XLcJ+DE4zByj0KUqTGruShYky0MN+mKEK8glXyxpIswq7go+JMI428DEB7K35NgT23EK0hFudBTxIqYESdyQC6JmJPuh1Fhwu8d4kIsBP/QuKguxJEDfE59ByI7ObjBsvJobkv4jwScflzwPsh/AcRmTTRCWWlXcKkaGYSxJ5GDFsgkl0Yl/DcC/5HAWVLcW6txodUhVsSs938H4tV0aTWRIwOe6jlBXKB4D3Sn6RFq/SXJUz4PFj7npCRc1zmW1y8oS8LXGtRgBlK6tEFbWYSXZpP+Fg+nusfCVF2kJWeCTD3avX/M7BWM6XcSycq/CqmXybQoZKYEN2wExsJGwcxaLtbWXKUXqyyv0i3n0svLfBYbawasGbBmwJqBIp+B/wE4bQC2o5g0TwAAAABJRU5ErkJggg=="
						alt="">
				</router-link>
				<!-- <a @click="$router.push('/score-live?type=football&id='+tlive.id+ '&vid=' + tlive.vid )">
					<img class="tv pointer"
							src="data:image/png;base64,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"
						alt="">
						</a> -->
			</div>
			<div class="popup-time-line-data-container" v-if="tlive.home_team_name_zh">
				<div class="popup-time-line-data">
					<div v-for="(item,index) in tlive.tlive">
						<div class="line-item" v-if="item.position == 1">
							<p class="name host-name">{{item.data}}</p>
							<div class="icon"><img class="icon-img"
									:src="require('../../assets/images/'+getImage(item.type)+'.png')"
									alt="yellow-card"></div>
							<p class="time host-time">{{item.time}}</p>
						</div>
						<div class="line-item" v-if="item.position == 2">
							<p class="time guest-time">{{item.time}}</p>
							<div class="icon"><img class="icon-img"
									:src="require('../../assets/images/'+getImage(item.type)+'.png')"
									alt="jiaoqiu"></div>
							<p class="name guest-name">{{item.data}}</p>
						</div>
					</div>
					<div>
		
					</div>
					<div>
						<div class="line-item">
							<p class="time guest-time">0'</p>
							<div class="icon"></div>
							<p class="name guest-name">本场比赛即将开始,比赛场地天气晴天,【{{tlive.home_team_name_zh}}】主场对战【{{tlive.away_team_name_zh}}】</p>
						</div>
					</div>
				</div>
			</div>
			<div class="title" v-if="tlive.home_data">技术统计</div>
			<div class="popup-technical-statistics" v-if="tlive.home_data">
				<div class="score-progress">
					<div class="parse-item">
						<p class="text-number left-text" style="opacity: 1;">{{tlive.home_data[6]}}</p>
						<div class="progress left-progress">
							<div class="replay-pro left-pro" style="width: 66.6667%; opacity: 1;" :style="{width:num(tlive.home_data[6],tlive.away_data[6]) + '%'}"></div>
						</div>
						<p class="static-name">射正</p>
						<div class="progress">
							<div class="replay-pro right-pro" style="width: 33.3333%; opacity: 0.3;" :style="{width:num(tlive.away_data[6],tlive.home_data[6]) + '%'}"></div>
						</div>
						<p class="text-number right-text" style="opacity: 0.3;">{{tlive.away_data[6]}}</p>
					</div>
				</div>
				<div class="score-progress">
					<div class="parse-item">
						<p class="text-number left-text" style="opacity: 0.3;">{{tlive.home_data[3]}}</p>
						<div class="progress left-progress">
							<div class="replay-pro left-pro" style="width: 49.0741%; opacity: 0.3;" :style="{width:num(tlive.home_data[3],tlive.away_data[3]) + '%'}"></div>
						</div>
						<p class="static-name">进攻</p>
						<div class="progress">
							<div class="replay-pro right-pro" style="width: 50.9259%; opacity: 1;" :style="{width:num(tlive.away_data[3],tlive.home_data[3]) + '%'}"></div>
						</div>
						<p class="text-number right-text" style="opacity: 1;">{{tlive.away_data[3]}}</p>
					</div>
				</div>
				<div class="score-progress">
					<div class="parse-item">
						<p class="text-number left-text" style="opacity: 0.3;">{{tlive.home_data[5]}}</p>
						<div class="progress left-progress">
							<div class="replay-pro left-pro" style="width: 49.0741%; opacity: 0.3;" :style="{width:num(tlive.home_data[5],tlive.away_data[5]) + '%'}"></div>
						</div>
						<p class="static-name">控球率</p>
						<div class="progress">
							<div class="replay-pro right-pro" style="width: 50.9259%; opacity: 1;" :style="{width:num(tlive.away_data[5],tlive.home_data[5]) + '%'}"></div>
						</div>
						<p class="text-number right-text" style="opacity: 1;">{{tlive.away_data[5]}}</p>
					</div>
				</div>
				<div class="score-progress">
					<div class="parse-item">
						<p class="text-number left-text" style="opacity: 0.3;">{{tlive.home_data[8]}}</p>
						<div class="progress left-progress">
							<div class="replay-pro left-pro" style="width: 27.2727%; opacity: 0.3;" :style="{width:num(tlive.home_data[8],tlive.away_data[8]) + '%'}"></div>
						</div>
						<p class="static-name">角球</p>
						<div class="progress">
							<div class="replay-pro right-pro" style="width: 72.7273%; opacity: 1;" :style="{width:num(tlive.away_data[8],tlive.home_data[8]) + '%'}"></div>
						</div>
						<p class="text-number right-text" style="opacity: 1;">{{tlive.away_data[8]}}</p>
					</div>
				</div>
				<div class="score-progress">
					<div class="parse-item">
						<p class="text-number left-text" style="opacity: 1;">{{tlive.home_data[1]}}</p>
						<div class="progress left-progress">
							<div class="replay-pro left-pro" style="width: 50%; opacity: 1;" :style="{width:num(tlive.home_data[1],tlive.away_data[1]) + '%'}"></div>
						</div>
						<p class="static-name">黄牌</p>
						<div class="progress">
							<div class="replay-pro right-pro" style="width: 50%; opacity: 1;" :style="{width:num(tlive.away_data[1],tlive.away_data[1]) + '%'}"></div>
						</div>
						<p class="text-number right-text" style="opacity: 1;">{{tlive.away_data[1]}} </p>
					</div>
				</div>
				<div class="score-progress">
					<div class="parse-item">
						<p class="text-number left-text" style="opacity: 1;">{{tlive.home_data[7]}}</p>
						<div class="progress left-progress">
							<div class="replay-pro left-pro" style="width: 50%; opacity: 1;" :style="{width:num(tlive.home_data[7],tlive.away_data[7]) + '%'}"></div>
						</div>
						<p class="static-name">射偏</p>
						<div class="progress">
							<div class="replay-pro right-pro" style="width: 50%; opacity: 1;" :style="{width:num(tlive.away_data[7],tlive.away_data[7]) + '%'}"></div>
						</div>
						<p class="text-number right-text" style="opacity: 1;">{{tlive.away_data[7]}} </p>
					</div>
				</div>
				<div class="score-progress">
					<div class="parse-item">
						<p class="text-number left-text" style="opacity: 1;">{{tlive.home_data[4]}}</p>
						<div class="progress left-progress">
							<div class="replay-pro left-pro" style="width: 50%; opacity: 1;" :style="{width:num(tlive.home_data[4],tlive.away_data[4]) + '%'}"></div>
						</div>
						<p class="static-name">危险进攻</p>
						<div class="progress">
							<div class="replay-pro right-pro" style="width: 50%; opacity: 1;" :style="{width:num(tlive.away_data[4],tlive.away_data[4]) + '%'}"></div>
						</div>
						<p class="text-number right-text" style="opacity: 1;">{{tlive.away_data[4]}} </p>
					</div>
				</div>
			</div>
		</div>
		<section class="container-section" id="going" style="box-shadow: rgb(238, 238, 238) 0px 1px 0px 0px inset" v-if="list1.length != 0">
			<div class="title" style="display: flex">
				<img alt="b"
					src="../../assets/images/main-beigin.png"
					class="icon" />
				<div class="container-section-field">进行中的比赛</div>
			</div>
			<ul>
				<li :data-id="item.id" v-for="(item, index) in list1" :key="index" @mouseleave="mousemove"
					class="football-score-item">
					
					<div class="match-field width93">
						<div class="football-league-name-container false" style="height: 44.5px">
							<div class="football-league-color-block" :style="{ background: item.primary_color }"></div>
							<div class="football-league-logo">
								<img class="football-league-logo-img" :src="item.competition_logo" width="56"
									height="56" />
							</div>
							<div class="league-name ellipsis search-by-team-name">
								{{lang==1?item.competition_name_zht:lang==2?item.competition_name_en:item.competition_name_zh}}
							</div>
						</div>
					</div>
					<div class="time width32 text-center">{{ $common.timeStamp(item.time) }}</div>
					<div class="match-status width40 football-all-status">
						<span class="point-animation">{{item.status == 3?'中':item.match_str}}</span>
					</div>
					<div class="teamName-and-vs football-score-item-teamRank width420">
						<div class="team-info host-container width189">
							<img class="score-item-ball-left"
								src="/_next/static/images/icon-2@3x-1deeeb26605d34ec1ce25ebf3b18106d.png" alt="goal" />
							<div class="card red-card" v-if="item.home_red_card != 0">
								{{ item.home_red_card }}
							</div>
							<div class="card yellow-card" v-if="item.home_yellow_card != 0">
								{{ item.home_yellow_card }}
							</div>
							<div class="name ellipsis search-by-team-name">
								{{lang==1?item.home_team_name_zht:lang==2?item.home_team_name_en:item.home_team_name_zh}}
							</div>
						</div>
						<!-- ----------------------------------------------------------------------------- -->
						<div class="vs width42" ref="bbb" @mouseenter="mouseenter(index,1,item)">
							<span style="color: rgb(255, 67, 67)">{{ item.home_score }}</span><span data-a="0"
								data-b="2" style="color: rgb(255, 67, 67)">-</span><span
								style="color: rgb(255, 67, 67)">{{
                item.away_score
              }}</span>
						</div>
						<div class="team-info guest-container width189">
							<div class="name ellipsis search-by-team-name">
								{{lang==1?item.away_team_name_zht:lang==2?item.away_team_name_en:item.away_team_name_zh}}
							</div>
							<div class="card yellow-card" v-if="item.away_yellow_card != 0">
								{{ item.away_yellow_card }}
							</div>
							<div class="card red-card" v-if="item.away_red_card != 0">
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
										<router-link tag="a" target="_blank" :to="'/score-live?type=football&id='+item.id+ '&vid=' + item.vid ">
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
							<div class="model-two width224" ref="sss" :style="{height:checked?'60px':'42px'}" @mouseleave="mousemove" @mouseenter="mouseenter1(index,2,item)">
								<div class="football-score-item-odds" v-if="item.exponent && item.exponent.asia">
									<div class="odds-handicap" style="display: flex">
										<div class="left">{{item.exponent.asia.scram.win}}</div>
										<div class="middle">{{item.exponent.asia.scram.draw}}</div>
										<div class="right">{{item.exponent.asia.scram.fail}}</div>
									</div>
									<div class="odds-dx" style="display: flex">
										<div class="left  football">{{item.exponent.bs.scram.win}}</div>
										<div class="middle">{{item.exponent.bs.scram.draw}}</div>
										<div class="right  football">{{item.exponent.bs.scram.fail}}</div>
									</div>
									<div class="odds-dx" style="display: flex" v-if="checked">
										<div class="left  football">{{item.exponent.eu.scram.win}}</div>
										<div class="middle">{{item.exponent.eu.scram.draw}}</div>
										<div class="right  football">{{item.exponent.eu.scram.fail}}</div>
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
									<a @click="$router.push('/detail?type=football&id='+item.id)">指数</a>
								</div>
								<div>
									<router-link tag="a" target="_blank" :to="'/score-detail?type=football&tabIndex=4&id='+item.id">分析</router-link>
								</div>
							</div>
							<div class="match width74">
								<div class="football-score-item-operation" @click="setCollect(item)">
									<img :src="item.is_collect == 1?require('../../assets/images/shoucang1.png'):require('../../assets/images/shoucang.png')"
										class="collect">
									<!-- <div class="arrow-top arrow-hollow"></div> -->
									<!-- <img src="../../assets/images/top.png" class="arrow-top"> -->
								</div>
							</div>
						</div>
					</div>
				</li>
				<!-- <li data-id="3915493" class="football-score-item flex-center" v-if="list1.length != 0">
          <el-pagination
            background
            :page-size="10"
            @current-change="currentChange2"
            :page-sizes="[10,20,30]"
            layout="prev, pager, next"
            :total="100">
          </el-pagination>
        </li> -->
			</ul>
		</section>
		<section class="container-section" id="uncoming" v-if="list2.length != 0" style="box-shadow: rgb(238, 238, 238) 0px 1px 0px 0px inset">
			<div class="title" style="display: flex">
				<img alt="a"
					src="../../assets/images/main-end.png"
					class="icon" />
				<div class="container-section-field">未开始的比赛</div>
			</div>
			<ul>
				<li data-id="5365469" class="football-score-item" v-for="(item, index) in list2" :key="index"
					@mouseleave="mousemove">
					
					<div class="match-field width93">
						<div class="football-league-name-container false" style="height: 44.5px">
							<div class="football-league-color-block" :style="{ background: item.primary_color }"></div>
							<div class="football-league-logo">
								<img class="football-league-logo-img" :src="item.competition_logo" width="56"
									height="56" />
							</div>
							<div class="league-name ellipsis search-by-team-name">
								{{lang==1?item.competition_name_zht:lang==2?item.competition_name_en:item.competition_name_zh}}
							</div>
						</div>
					</div>
					<div class="time width32 text-center">{{ $common.timeStamp(item.time) }}</div>
					<div class="match-status width40 football-all-status">
						<span class="">未</span>
					</div>
					<div class="teamName-and-vs football-score-item-teamRank width420">
						<div class="team-info host-container width189">
							<img class="score-item-ball-left"
								src="/_next/static/images/icon-2@3x-1deeeb26605d34ec1ce25ebf3b18106d.png" alt="goal" />
							<!-- <div class="rank">[3]</div> -->
							<div class="name ellipsis search-by-team-name">
								{{lang==1?item.home_team_name_zht:lang==2?item.home_team_name_en:item.home_team_name_zh}}
							</div>
						</div>
						<div class="vs width42" ref="bbb1" @mouseenter="mouseenter(index,2,item)">
							<span style="color: rgb(255, 67, 67)"></span><span data-a="0" data-b="0"
								style="color: rgb(145, 151, 173)">-</span><span style="color: rgb(255, 67, 67)"></span>
						</div>
						<div class="team-info guest-container width189">
							<div class="name ellipsis search-by-team-name">
								{{lang==1?item.away_team_name_zht:lang==2?item.away_team_name_en:item.away_team_name_zh}}
							</div>
							<!-- <div class="rank">[15]</div> -->
							<img class="score-item-ball-right"
								src="/_next/static/images/icon-2@3x-1deeeb26605d34ec1ce25ebf3b18106d.png" alt="goal" />
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
										<router-link tag="a" target="_blank" :to="'/score-live?type=football&id='+item.id+ '&vid=' + item.vid ">
											<div class="left">
												<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAqxJREFUWAntV01oE1EQnnk1DZKI1rOgoKd6EYTiRU81aU8igmDak4cepAeVRqh4yEWiCYhQ9JCLp/VgEfHUpPRUbwWvCqIgqOdWbZBEu+N8m+y6u6Sap2v9fbDs7DfffDP73tvhLdH/8a/PAIsITyxeOq/GORE6YDMhPJTdmXn/gdc/baz1HcckTPRCmG87ucpNLjSKF8iVG30LhIjfVUAongxfNHjzMLaVNnIb22lPskAh2m+SFLTWEuJfW4BW/AcWwPySyVzmVOqgc6T0rnb8+lvYwEh9tstgOQM8nx0wh5zxSpmy6deT9eJRXLCBwUfE8zZF9F0AM9fvjldPN3dsl0J9Zo5Wm6uuyDIu2MDgAwfcfouIF9Biw7M6lSsRAab1QR6cQteUteZ9EpoWkiDWs4GpDxxwmakZ1eAVT5uoFcYDEYAa9NjJV6+xkbkwSVvnozv5q68mG8UzJDIa9kVs9YEDruLLYR80PW3NEcYjBWhTcj2n2737TOZOEPMxH9r07nP8GJ/Y1QxydPFIAT53K++RAnQJOs8m1h9EDntFYcN9a/gcP8bndzWDHF2cCwsz2pKDgU1Y0mk6qWs9EqC6CdOcHt6bS7151mg2Nt0HzEtOvpI7u3hlT1taT1Un80VDNyHTA3GlpFjaxyMzAIcSypHkYApl29Kulbjk8q7MKf3MbjFxZ7+oG7aHdXwCbiS5pyEjnnYoOeB4AcB6Dv28xgoLxXs4gDhj1enMNrPb6IbDRUOZIQ9THzjg9hTpAcaXoAclBqEVC9coNfDQGS0/gXdiaXaYPm6c0C4xpbO3Lxbx1Uf7AkJyP3wiUq2+lyCUN1HzNyhAT6mJvpKNmOY2OCLbxCTJRW6D83mSojZayG3wc4DzuXap59pRfv5y4McEuTSnl9um4r+S+xmamxe7t2V1lQAAAABJRU5ErkJggg=="
													alt="animateIcon" />
											</div>
										</router-link>
									</div>
								</div>
							</div>
							<div class="h45-w1-border"></div>
							<div class="model-two width224" :style="{height:checked?'60px':'42px'}" ref="sss1" @mouseenter="mouseenter1(index,1,item)">
								<div class="football-score-item-odds" v-if="item.exponent && item.exponent.asia">
									<div class="odds-handicap" style="display: flex">
										<div class="left">{{item.exponent.asia.scram.win}}</div>
										<div class="middle">{{item.exponent.asia.scram.draw}}</div>
										<div class="right">{{item.exponent.asia.scram.fail}}</div>
									</div>
									<div class="odds-dx" style="display: flex">
										<div class="left  football">{{item.exponent.bs.scram.win}}</div>
										<div class="middle">{{item.exponent.bs.scram.draw}}</div>
										<div class="right  football">{{item.exponent.bs.scram.fail}}</div>
									</div>
									<div class="odds-dx" style="display: flex" v-if="checked">
										<div class="left  football">{{item.exponent.eu.scram.win}}</div>
										<div class="middle">{{item.exponent.eu.scram.draw}}</div>
										<div class="right  football">{{item.exponent.eu.scram.fail}}</div>
									</div>
								</div>
							</div>
							<div class="data width87" style="justify-content: space-around">
								<!-- <div>
                  <a
                    target="_blank"
                    href="/score-detail/analyze?matchId=5365469&amp;sportId=1"
                    >分析</a
                  >
                </div> -->
								<div>
									<a target="_blank" href="/score-detail/ouzhi?matchId=5365469&amp;sportId=1">指数</a>
								</div>
							</div>
							<div class="match width74">
								<div class="football-score-item-operation"  @click="setCollect(item)">
									<img :src="item.is_collect == 1?require('../../assets/images/shoucang1.png'):require('../../assets/images/shoucang.png')"
										class="collect">
									<!-- <div class="arrow-top arrow-hollow"></div> -->
									<!-- <img src="../../assets/images/top.png" class="arrow-top"> -->
								</div>
							</div>
						</div>
					</div>
				</li>
				<!-- <li data-id="3915493" class="football-score-item flex-center">
          <el-pagination
            background
            @current-change="currentChange"
            :page-size="10"
            :page-sizes="[10,20,30]"
            layout="prev, pager, next"
            :total="100">
          </el-pagination>
         </li> -->
			</ul>
		</section>
		<section class="container-section" id="finished" v-if="list3.length != 0" style="box-shadow: rgb(238, 238, 238) 0px 1px 0px 0px inset">
			<div class="title" style="display: flex">
				<img alt="c"
					src="../../assets/images/main-ends.png"
					class="icon" />
				<div class="container-section-field">已完场的比赛</div>
			</div>
			<ul>
				<li data-id="3915493" class="football-score-item" v-for="(item, index) in list3" :key="index"
					@mouseleave="mousemove">
					
					<div class="match-field width93">
						<div class="football-league-name-container false" style="height: 44.5px">
							<div class="football-league-color-block" :style="{ background: item.primary_color }"></div>
							<div class="football-league-logo">
								<img class="football-league-logo-img" :src="item.competition_logo" width="56"
									height="56" />
							</div>
							<div class="league-name ellipsis search-by-team-name">
								{{lang==1?item.competition_name_zht:lang==2?item.competition_name_en:item.competition_name_zh}}
							</div>
						</div>
					</div>
					<div class="time width32 text-center" ref="bbb">{{ $common.timeStamp(item.time) }}</div>
					<div class="match-status width40 football-all-status">
						<span class="">完</span>
					</div>
					<div class="teamName-and-vs football-score-item-teamRank width420">
						<div class="team-info host-container width189">
							<img class="score-item-ball-left"
								src="/_next/static/images/icon-2@3x-1deeeb26605d34ec1ce25ebf3b18106d.png" alt="goal" />
							<div class="card red-card" v-if="item.home_red_card != 0">
								{{ item.home_red_card }}
							</div>
							<div class="card yellow-card" v-if="item.home_yellow_card != 0">
								{{ item.home_yellow_card }}
							</div>
							<!-- <div class="rank">[2]</div> -->
							<div class="name ellipsis search-by-team-name">
								{{lang==1?item.home_team_name_zht:lang==2?item.home_team_name_en:item.home_team_name_zh}}
							</div>
						</div>
						<div class="vs width42" ref="bbb2" @mouseenter="mouseenter(index,3,item)">
							<span style="color: rgb(255, 67, 67)">{{ item.home_score }}</span><span data-a="2"
								data-b="1" style="color: rgb(255, 67, 67)">-</span><span
								style="color: rgb(255, 67, 67)">{{
                item.away_score
              }}</span>
						</div>
						<div class="team-info guest-container width189">
							<div class="name ellipsis search-by-team-name">
								{{lang==1?item.away_team_name_zht:lang==2?item.away_team_name_en:item.away_team_name_zh}}
							</div>
							<!-- <div class="rank">[1]</div> -->
							<div class="card yellow-card" v-if="item.away_yellow_card != 0">
								{{ item.away_yellow_card }}
							</div>
							<div class="card red-card" v-if="item.away_red_card != 0">
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
									<span>{{ item.half_score }}</span>
								</div>
								<div class="corner width48 text-left">
									<span>{{ item.corner_kick }}</span>
								</div>
								<div class="live">
									<div class="football-score-item-live">
										<router-link tag="a" target="_blank" :to="'/score-live?type=football&id='+item.id+ '&vid=' + item.vid ">
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
							<div class="model-two width224" ref="sss2" @mouseleave="mousemove" :style="{height:checked?'60px':'42px'}" @mouseenter="mouseenter1(index,3,item)">
								<div class="football-score-item-odds" v-if="item.exponent && item.exponent.asia">
									<div class="odds-handicap" style="display: flex">
										<div class="left">{{item.exponent.asia.scram.win}}</div>
										<div class="middle">{{item.exponent.asia.scram.draw}}</div>
										<div class="right">{{item.exponent.asia.scram.fail}}</div>
									</div>
									<div class="odds-dx" style="display: flex">
										<div class="left  football">{{item.exponent.bs.scram.win}}</div>
										<div class="middle">{{item.exponent.bs.scram.draw}}</div>
										<div class="right  football">{{item.exponent.bs.scram.fail}}</div>
									</div>
									<div class="odds-dx" style="display: flex" v-if="checked">
										<div class="left  football">{{item.exponent.eu.scram.win}}</div>
										<div class="middle">{{item.exponent.eu.scram.draw}}</div>
										<div class="right  football">{{item.exponent.eu.scram.fail}}</div>
									</div>
								</div>
							</div>
							<div class="data width87" style="justify-content: space-around">
								<!-- <div>
                  <a
                    target="_blank"
                    href="/score-detail/analyze?matchId=3915493&amp;sportId=1"
                    >分析</a
                  >
                </div> -->
								<div>
									<a @click="$router.push('/detail?type=football&id='+item.id)">指数</a>
								</div>
							</div>
							<div class="match width74">
								<div class="football-score-item-operation"  @click="setCollect(item)">
									<!-- <div  style="background:url(./assets/images/shoucang.png)"></div> -->
									<!-- <div class="arrow-top arrow-hollow"></div> -->
									<img :src="item.is_collect == 1?require('../../assets/images/shoucang1.png'):require('../../assets/images/shoucang.png')"
										class="collect">
									<!-- <div class="arrow-top arrow-hollow"></div> -->
									<!-- <img src="../../assets/images/top.png" class="arrow-top"> -->
								</div>
							</div>
						</div>
					</div>
				</li>
				<!-- <li data-id="3915493" class="football-score-item flex-center">
          <el-pagination
            background
            :page-size="10"
            @current-change="currentChange1"
            :page-sizes="[10,20,30]"
            layout="prev, pager, next"
            :total="100">
          </el-pagination>
        </li> -->
			</ul>
			<!-- {{list}} -->
		</section>
		<div class="basketball-content" v-if="list1.length == 0 && list2.length == 0 && list3.length == 0 ">
			<img class="no-data-img" src="../../assets/images/qsy.png" >
		</div>
	</article>
</template>

<script>
	import {
		football_match,
		getfootballDetail
	} from "@/api/football.js";
	import {
		collect
	} from "@/api/common.js";
	export default {
		props: {
			id:{
				type: Number,
				default: null
			},
			lang: {
				type: Number,
				default: 0
			},
			checked:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				dataBase: [],
				list1: [],
				list2: [],
				list3: [],
				page1: 1,
				page2: 1,
				tlive:{},
				page3: 1,
				tliveLoading:false,
				expIndex:{},//指数
				exponent:{},//技术统计
				top: '', //定位弹窗的位置
				left: '', //定位弹窗的位置
				fightMask: false, //对战弹窗
				dataMask: false, //数据弹窗
			};
		},
		watch:{
			id(e) {
				this.list1 = []
				this.list2 = []
				this.list3 = []
				this.getlist()
			},
		},
		computed: {},
		created() {},
		mounted() {
			this.getlist();
			// this.info = JSON.parse(localStorage.getItem('userInfo'))
		},
		methods: {
			// 移除列表
			mousemove() {
				this.dataMask = false
				this.fightMask = false
			},

			// 对战详情弹窗
			mouseenter(e, type,item) {
				this.dataMask = true
				let left, top
				if (type == 1) {
					top = this.$refs.bbb[e].getBoundingClientRect().top
					left = this.$refs.bbb[e].getBoundingClientRect().left
				} else if (type == 2) {
					top = this.$refs.bbb1[e].getBoundingClientRect().top
					left = this.$refs.bbb1[e].getBoundingClientRect().left
				} else {
					top = this.$refs.bbb2[e].getBoundingClientRect().top
					left = this.$refs.bbb2[e].getBoundingClientRect().left
				}
				if (this.top == (top + 'px')) { //判断重复问题
					return
				}
				this.top = top + 'px'
				this.left = (left + 35) + 'px'
				this.getDetail(item.id,1)
			},
			mouseenter1(e, type,item) {
				this.fightMask = true
				let left, top
				if (type == 1) {
					top = this.$refs.sss1[e].getBoundingClientRect().top
					left = this.$refs.sss1[e].getBoundingClientRect().left
				} else if (type == 2) {
					top = this.$refs.sss[e].getBoundingClientRect().top
					left = this.$refs.sss[e].getBoundingClientRect().left
				} else {
					top = this.$refs.sss2[e].getBoundingClientRect().top
					left = this.$refs.sss2[e].getBoundingClientRect().left
				}
				this.exponent = item
				this.expIndex = item.exponent
				this.top = (top - 194) + 'px'
				this.left = (left - 157) + 'px'
			},
			// 技术统计对比
			num(num1, num2) {
				if (num1 == 0 && num2 == 0) {
					return 0
				}else if (num1 == num2 && num1 != 0 && num2 != 0) {
					return 50
				} else {
					return num1 / (num1 + num2) * 100
				}
			},
			getlist() {
				football_match({
						type: 4,
						is_web:1,
					    company_id: this.id,
					})
					.then((res) => {
						this.list2 = res.data.data.filter(obj=>{
							return obj.status == 1
						})
						this.list1 = res.data.data.filter(obj=>{
							return obj.status == 2 ||
								obj.status == 3 ||
								obj.status == 4 ||
								obj.status == 5 ||
								obj.status == 6 ||
								obj.status == 7
						})
						this.list3 = res.data.data.filter(obj=>{
							return obj.status == 8
						})
					})
					.catch((res) => {});
			},
			// 调用详情
			getDetail(id,type) {
				// return
				this.tliveLoading = true
				getfootballDetail({
					id: id
				}).then(res => {
					res.data.tlive = res.data.tlive.reverse()
					this.tlive = res.data
					
					setTimeout(res1 => {
						this.tliveLoading = false
					}, 500)
				}).catch(res => {
			
				})
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
			},
			// 收藏
			setCollect(item) {
				let data = {
					id: item.id,
					type: 2
				}
				collect(data).then(res => {
					this.getlist()
				}).catch(res => {})
			},
		},
	};
</script>

<style>
	/* @import '../../styles/style.css'; */
</style>
