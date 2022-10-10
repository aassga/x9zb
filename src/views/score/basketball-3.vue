<template>
	<section class="container-section" id="going" style=" margin-bottom: 10px">
		<div class="basketball-score-item" v-for="(item,index) in list" :key="index" style="display: flex">
			<ul class="header">
				<li class="width88 text-center">
					<div class="baseball-league-name-container false" style="background-color: rgb(118, 145, 111)">
						<div class="league-name ellipsis" :style="{background: item.primary_color}">
							{{item.short_name_zh}}
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
					<div class="gou">
						<img class="checkbox-icon"
							src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8BAMAAADI0sRBAAAALVBMVEUAAADNzc3Ozs7T09PNzc3Nzc3Nzc3Ozs7MzMz////MzMzU1NTw8PD5+fno6Oi3ZcsjAAAACXRSTlMA5VwPs8uPfDeKAlU5AAABJElEQVQ4y92UvU4CQRSFjVrYa2G2IjGxsEIbEytteQRKS1s7K3mMAZZk+Q1ngJ4JoefnBZaCHgjvQCA7k2HvJKfntF/m3Jk7956ri9DN81eUPHwXw/SthJPaTyH6DqdfSa8jYLpM4+UOSAqibhl6r05aG3Ty9SvQM5WpbvCYswY2yqkBnNu/YKI8LdD06R106uPY4N/DrxirM9Vw7+GyO+yOd/yLDVROcxQ8700eNzz3P62ETM917Ogt3Yuu9Fjimit+eywti39m+AOpxDFatqNaBWRsX39GIbztZrg0COF5O8NRGCcWD0N4ZTH6IVwFwcScXI08jLSFNJV8CflQMg5kmMgokkEma0CWiKwgWWCy/jQ8ePTw4JKxR0KTR66UDexL0AFE/SvujFRlrwAAAABJRU5ErkJggg=="
							alt="" />
					</div>
					<div class="time">
						<div class="time-down">{{item.match_time}}</div>
					</div>
				</li>
				<li class="width160 team-name">
					<div class="name ellipsis search-by-team-name border-bottom-dfe6f0">
						<img class="team-logo" :src="item.home_team_data.logo" width="48" height="48" /><span
							class="name-span ellipsis">{{item.home_team_data.short_name_zh}}</span>
						<div class="rank"></div>
					</div>
					<div class="name ellipsis search-by-team-name">
						<img class="team-logo" :src="item.away_team_data.logo" width="48" height="48" /><span
							class="name-span ellipsis">{{item.away_team_data.short_name_zh}}</span>
						<div class="rank"></div>
					</div>
				</li>
				<li class="quarter-section width236">
					<div class="op width45 text-center" v-for="(item2,index2) in item.home_scores" :key="index2">
						<div class="border-bottom-dfe6f0 color-333" v-for="(itme1,index1) in item.home_scores"
							v-if="index2 == index1">{{itme1}}</div>
						<div class="" v-for="(itme1,index1) in item.away_scores" v-if="index2 == index1">{{itme1}}</div>
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
								<img class="live-icon"
									src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAqxJREFUWAntVk1oE0EUfm/SWLqHNhtREZSiBxGkoODJXqLFiyB4qgc9eLFNiiIK+TE5mIOB/CBUpEmkh+LFQ85evIjiQbGignch/iCCZmNsYtom83xjs4fSZtndhFx0YHZ237z3fd+8fTuzAP96QyqVPMbrpzEkukxA44NICAKWCXFRPx5Ie64d2BUHkreZ2DcI8g4Hc9Gp5tfymlArHyDxJirFLQaV9k3MnQfFLbab6GZDRMn9GXejm49TuzMBABk9Wwh4NO0QAD50SradvyMBQPBWgYwm73z35woX+PYs9y/K5rY5E9BhMcLBpdrNK4f9ueIjEGNHAGFxoAIA8US71X5XCYfi+shI3Z8tzggPTHFtfHAqxFUGFAlX8DBfU9X6t2UjFjzmSxef+LQ9Eyxinru0K8S1AJOAhRwFia+q0VAK/D/aXKTXGXSSX8tP08dq7FmAAieiISkpXv3cekHJpDaWLbzk7XbJitic64sABcZpfy7Iex6TyUY1FtJZ1kmTxGocspq0NYe4wvRRX2ahwCLIiITOcTbyXCR77cT3JgDxMeCOGX/m7sdfmtxdiQTv8euYtkNs+rgSQAAVXu0lLrgHCqgSDV1sNWCei2GnCWx3dCVA1/A0JvMrjcjVfU1Yvw+SzrAoV82ZAISNFd5aqFd/w2xTtrLMOuqKuROElXDQtnhOu4FAeUkQ4PjJXojNWEcZ4ALTWW3CDO7HKHjDWO0HkBsMxS0IYdlNcD9iFLfwCLzBG0mtH4DOMLCmuFEFNRJz+1fX5TQQjjsDcemNVB72ipKWyn9yidC/sL8Z6AbHh8pB2aYICuHt5mNl569mTQjI+dKFrj8q1p8h4RSfarMkbf9fbNVD4g0buwqwzACvAI3E3ISQ4CoDUsC6nsq/V6fkVmX/LRsZ+APOsdzYLi53OgAAAABJRU5ErkJggg=="
									alt="videoIcon" />
									</router-link>
							</div>
						</div>
					</div>
					<div class="ouzhi width62">
						<div class="border-bottom-dfe6f0 up">
							<div class="num" v-if="item.bs">{{item.bs.host}}</div>
							<div class="arrow"></div>
						</div>
						<div class="down">
							<div class="num" v-if="item.bs">{{item.bs.guest}}</div>
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
								<div v-if="item.bs">{{item.asia.host}}</div>
								<div class="arrow"></div>
							</div>
						</div>
					</div>
					<div class="down-wrap">
						<div class="data-wrap"  v-if="item.asia">{{item.asia.early}}</div>
						<div class="down">
							<div class="color-9197ad">客</div>
							<div class="num">
								<div v-if="item.bs">{{item.asia.guest}}</div>
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
								<div class="num" v-if="item.bs">{{item.bs.host}}</div>
								<div class="arrow"></div>
							</div>
						</div>
					</div>
					<div class="down-wrap">
						<div class="data-wrap">
							<div class="num" v-if="item.asia">{{item.bs.early}}</div>
						</div>
						<div class="down">
							<!-- <div class="color-9197ad">小</div> -->
							<div class="num">
								<div class="num" v-if="item.bs">{{item.bs.guest}}</div>
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
						<a target="_blank" href="/score-detail/yapan?matchId=3894475&amp;sportId=2">指数</a>
					</div>
				</li>
				<li class="score-item-operation"><div class="collect collect-solid" @click="setCollect(item,index)"></div></li>
			</ul>
		</div>
		<div class="basketball-content" v-if="list.length == 0">
			<img class="no-data-img" src="../../assets/images/qsy.png" >
		</div>
	</section>
</template>

<script>
	import {
		getList
	} from "@/api/basketball.js";
	import {
		collect
	} from "@/api/common.js";
	export default {
		data() {
			return {
				list: []
			};
		},
		mounted() {
			this.getlist()
		},
		methods: {
			getlist() {
				getList({
						type: 4,
						isWeb:1,
					})
					.then((res) => {
						this.list = res.data.data
					})
					.catch((res) => {});
			},
			
			// 收藏
			setCollect(item,index) {
				let data = {
					id: item.id,
					type: 1
				}
				collect(data).then(res => {
					this.setId(index)
				}).catch(res => {})
			},
			// 收藏 取消收藏
			setId(index) {
				let _this = this
				this.list.splice(index, 1)
			},
		}
	};
</script>

</script>

<style scoped>
	.score-item-operation img{
		width: 20px;
		height: 20px;
	}
	.score-item-operation {
	    flex: 1;
	    display: flex;
	    align-items: center;
	    flex-direction: column;
	    justify-content: space-around;
	    height: 100%;
	}
	.score-item-operation .collect-solid {
		width: 20px;
		    height: 20px;
		    background-repeat: no-repeat;
		    background-size: contain;
		    cursor: pointer;
	    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAKKADAAQAAAABAAAAKAAAAAB65masAAAEsElEQVRYCe2WS2idRRTHZ+5tjCSCltLY6kJ8XG1rq1FvKwWhBVMFH2hIwFCkC/G1cuPGxoUboVvxsRB3Cl1UKWqDWiwNiosupJAu3FRqbERbSrVgaZLbfHP8/8+Z+fLdJDf59AZEuXP5HnPmnDO/+c/ju851SkeBjgL/bQX8auFPT44/70J4VcStcyJv9twx8PZq5F4VwJnJ449LkCMi4nGRS/Ab7K3t+axdyEq7CQjlghzQJ9kAGELwQYLZ2uygbcDZs988kYlso3KAAp84nZYQNl8+/dVgm3yubUAJ2X6qpgVPAkoAKAwhk/3/KuD0T+O7QxZ2ElDBEiioTEmpX/phbKAdyPYUlKAK2bZoVhG7BUrCJn60HcB/tItl8tuNM6HxcAjyEZVaqKBOcbJzsoN/rttfc6xn26NTfxd2RUCZOlFrSOMBkawfu6A/iNwHoL7ilBJIITm1fOcTG4ZsxQGgfgmGCeyiU2g/Vc3cyRvqQyc1oMWtJaCc/e6mqz4cxBrbpZ1ob9bxQjhrR1uEIyx3dBGQFRVVfXgUgZ5F5PuuanV47f1DP5uh+d5yDTZ89i7W0C7tRZOzA1NHe7Lkmk1Hyd6jDSpbWKwjUtdjiueAUgze641s7i0LXnxfs9gULcHtLCakVZVCckXBEweyOdOGi+Dpqf5puqNaummikhyB5mey4LZbosX3lgoiwS/szNYXAgmQSgJhPdrVV6vmZ/UIUfDjK2MIy1DcsdHdr2pf4tYSELGjnh8xDWIyXJrU3otgScm0BqlMGpjyMzZdMQfROM1eXAYJX1uCTU0tAa+9ZffX3vl9SIQvGYdKVMNlpNbSFLOm7WzgOz1YzK7xFmFmtmiTzIWK7N3w4N7jecOCF12rC2xN1Stnjg0D8SA06DJV5tWg47xqpEJbUggECYw7lh3Zzja7d3LV+crIjTtGDjNPq9JSwRTQc9vAJ+h4GNcsbbk4WrFaAlG4Zo/8OLFZiAm8b4ivDq0Exy5WBKRTb+2Rz+H6FPCm2VHxYjvni3D5O9eg+sVdHqc3xs1UvHt6w45njljA8vdSgExxXW3PUUB8TJhUEijrQFQoshTt9Ce8Hcxo9O5w3/aRL1OOlZ6tz8ElItHV3eycZX7tmVoJjEBcbwpJoxY+8wFsjsZSj9IKioyvwa7eqrsqqZg/2RcgUFcwbhT++Gz65CnTFpFD1VJ0cCoNePnH2btw3nXb9HFtsfMEEd8jsOqV3iN0rqqE7t9OhDtXHRB/GvqTQkyu6lA1LVSPLwkUAzBKawVkWoMcVCWbu0cbStxKKyhZdi/zmYIGQoj5KeRaVA+Fy/10mpU2h55zWWnA8ptE3Nb0SUvq5Dwk04o7oyNwcrvRmlGFgg+h6Ye1vEVtJW6lFUTiGVtH8YxTsfJOp/BRfWm9u3XT+nrfJuzjF9GCPxvg0TMxqcu6QuqhX4LPlVYQnY4h+SAh9f8eiFE/h4/9gXXX97zva48VO/1ATn/x4fmLf7wMt1Ew6T/wKB/GUhkrA0cfPTXKOv8+8enrOP9eANiFiveH1mZd7/n6k1eWiz83cbQ3/Hn+FUA+iyFt9N6/c/ND+95YLqbT1lGgo8D/SYG/AD9jz8Y+gbg0AAAAAElFTkSuQmCC);
	}
</style>
