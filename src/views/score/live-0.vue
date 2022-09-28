<template>
	<div role="tabpanel" tabindex="-1" aria-hidden="true" class="ant-tabs-tabpane" id="rc-tabs-0-panel-1"
		aria-labelledby="rc-tabs-0-tab-1">
		<div class="statistic-match-wrap">
			<div class="text-live-view" v-if="item.tlive && item.tlive.length != 0">
				<div class="event-item" v-for="(i,index) in item.tlive" :key="index">
					<div class="event-icon">
						<div class="icon-view">
							<img v-if="i && i.position != 0" class="icon-lazy icon-img"
								:src="require('../../assets/images/'+getImage(i.type)+'.png')" />
						</div>
						<div class="line"></div>
					</div>
					<div class="event-wrap-view">
						<div class="time">{{ i.time }}</div>
						<div class="content">
							<div class="content-text">
								{{ i.data }}
							</div>
						</div>
					</div>
				</div>
				<!-- <div class="basketball-content">
					<img class="no-data-img" src="../../assets/images/qsy.png" >
				</div> -->
			</div>
			<div class="text-live-view" v-else>
				<div class="event-item">
					<div class="event-icon">
						<div class="icon-view"><img class="icon-lazy icon-img" src="../../assets/images/f-15.png" alt="">
						</div>
						<div class="line"></div>
					</div>
					<div class="event-wrap-view">
						<div class="time">0'</div>
						<div class="content">
							<div class="content-text">本场比赛即将开始,【{{item.home_team_name_zh}}】主场对战【{{item.away_team_name_zh}}】</div>
						</div>
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
				detail:{},
				imglist: ['f-0', 'f-1', 'f-3', 'f-7', 'f-6', 'f-14', 'f-12', 'f-5', 'f-9', 'f-15', 'f-4', 'f-13'],
				list: ['进球', '点球', '乌龙球', '红牌', '黄牌', '红黄换下', '任意球', '角球', '受伤', '开哨', '换人', '助攻']
			}
		},
		watch:{
			// item(e){
			// 	e.tlive = e.tlive.reverse()
			// 	this.detail = e
			// }
		},
		methods: {
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
				}else{
					return i[0]
				}
			}
		}
	};
</script>

<style>
</style>
