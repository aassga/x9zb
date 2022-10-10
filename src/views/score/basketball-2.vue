<template>
	<div>
		<section class="container-section border-top-radius-none" id="finished" v-infinite-scroll="load"
			style="margin-bottom: 10px; box-shadow: rgb(238, 238, 238) 0px 1px 0px 0px inset;">
			<ul>
				<div class="basketball-score-item" v-for="(item,index) in list" :key="index" style="display: flex">
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
									{{itme1}}</div>
							</div>

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
								<div class="color-333"><span class="color-9197ad">半{{item.halftime_score_gap}}</span></div>
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
										<router-link tag="a" target="_blank" :to="'/score-live?type=basketball&id='+item.id+ '&vid=' + item.vid ">
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
								<router-link tag="a" target="_blank" :to="'/score-detail?type=basketball&tabIndex=4&id='+item.id">分析</router-link>
							</div>
							<div class="data-item">
								<a @click="$router.push('/score-detail?type=basketball&id='+item.id)">指数</a>
							</div>
						</li>
						<li class="score-item-operation">
							<div class="arrow-top arrow-hollow"></div>
							<div class="collect collect-hollow"></div>
						</li>
					</ul>
				</div>
			</ul>
			<li style="text-align: center;font-size: 14px;color: #666;">
				{{loadStatus == 'more'?'加载中...':'没有更多了'}}
			</li>
		</section>
	</div>

</template>

<script>
	import {
		getList
	} from "@/api/basketball.js";
	export default {
		props: {
			time: {
				type: Object,
				default: {}
			},
			lang: {
				type: Number,
				default: 0
			}
		},
		watch: {
			time(e) {
				console.log(e)
				this.$store.state.loading = true
				this.page = 1
				this.list = []
				this.getlist()
				setTimeout(() => {
					this.$store.state.loading = false
				}, 1000);
			}
		},
		data() {
			return {
				page:1,
				list: [],
				loading:false,
				loadStatus:'more'
			};
		},
		mounted() {
			this.getlist()
		},
		methods: {
			// 加载更多
			load(e) {
				if (this.loadStatus == 'more' && this.loading) {
					this.loading = false
					this.getlist()
				}
			},
			getlist() {
				let data = {
					type: 2,
					isWeb:1,
					page:this.page,
					time: this.time.day
				}
				getList(data)
					.then((res) => {
						this.list = [...this.list, ...res.data.data]
						if (res.data.total > this.list.length) {
							this.page++
							this.loading = true
							this.loadStatus = 'more'
						} else {
							this.loadStatus = 'noMore'
						}
					})
					.catch((res) => {});
			},
		}
	};
</script>

<style scoped>

</style>
