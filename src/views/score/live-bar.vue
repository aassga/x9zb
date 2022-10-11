<template>
	<div id="">
		<!-- <div data-v-6b3f10c8="" class="box" style="background: rgb(250, 250, 250);">
			12313212
		</div> -->
		<div class="match-progress basketball-progress">
			<div class="basketball-cloumn cloumn1" v-if="item.players&&item.players.home">
				<div>失误
					<!-- -->{{item.players.home.number_of_mistakes}}
				</div>
				<div>犯规
					<!-- -->{{item.players.home.individual_fouls}}
				</div>
			</div>
			<div class="basketball-cloumn cloumn2" v-if="item.players&&item.players.home">
				<div class="basketball-bar">
					<div class="basketball-left-score">{{item.players.home.hits}}/{{item.players.home.shots}}</div>
					<div class="ant-progress ant-progress-line ant-progress-status-normal ant-progress-default bar-1">
						<div class="ant-progress-outer">
							<div class="ant-progress-inner">
								<div class="ant-progress-bg"
								:style="{width:num(item.players.home.hits,item.players.home.shots) +'%'}"
									style="height: 6px; background: rgb(178, 205, 255);"></div>
							</div>
						</div>
					</div>
					<div class="basketball-bar-name">投篮</div>
					<div class="ant-progress ant-progress-line ant-progress-status-normal ant-progress-default bar-2">
						<div class="ant-progress-outer">
							<div class="ant-progress-inner">
								<div class="ant-progress-bg"
									:style="{width:num(item.players.away.hits,item.players.away.shots) +'%'}"
									style="height: 6px; background: rgb(255, 93, 93);"></div>
							</div>
						</div>
					</div>
					<div class="basketball-right-score">{{item.players.away.hits}}/{{item.players.away.shots}}</div>
				</div>
				<div class="basketball-bar">
					<div class="basketball-left-score">{{item.players.home.three_pointer}}/{{item.players.home.three_pointer_shot}}</div>
					<div class="ant-progress ant-progress-line ant-progress-status-normal ant-progress-default bar-1">
						<div class="ant-progress-outer">
							<div class="ant-progress-inner">
								<div class="ant-progress-bg"
								:style="{width:num(item.players.home.three_pointer,item.players.home.three_pointer_shot) +'%'}"
									style="width: 27%; height: 6px; background: rgb(65, 133, 255);"></div>
							</div>
						</div>
					</div>
					<div class="basketball-bar-name">三分</div>
					<div class="ant-progress ant-progress-line ant-progress-status-normal ant-progress-default bar-2">
						<div class="ant-progress-outer">
							<div class="ant-progress-inner">
								<div class="ant-progress-bg"
								:style="{width:num(item.players.away.three_pointer,item.players.away.three_pointer_shot) +'%'}"
									style="width: 23%; height: 6px; background: rgb(255, 195, 195);"></div>
							</div>
						</div>
					</div>
					<div class="basketball-right-score">{{item.players.away.three_pointer}}/{{item.players.away.three_pointer_shot}}</div>
				</div>
				<div class="basketball-bar">
					<div class="basketball-left-score">{{item.players.home.free_throw}}/{{item.players.home.free_throw_shots}}</div>
					<div class="ant-progress ant-progress-line ant-progress-status-normal ant-progress-default bar-1">
						<div class="ant-progress-outer">
							<div class="ant-progress-inner">
								<div class="ant-progress-bg"
								:style="{width:num(item.players.home.free_throw,item.players.home.free_throw_shots) +'%'}"
									style="width: 69%; height: 6px; background: rgb(178, 205, 255);"></div>
							</div>
						</div>
					</div>
					<div class="basketball-bar-name">{{num(item.players.home.free_throw,item.players.home.free_throw_shots).toFixed(0)}}
						<!-- -->% 罚球
						<!-- -->{{num(item.players.away.free_throw,item.players.away.free_throw_shots).toFixed(0)}}
						<!-- -->%
					</div>
					<div class="ant-progress ant-progress-line ant-progress-status-normal ant-progress-default bar-2">
						<div class="ant-progress-outer">
							<div class="ant-progress-inner">
								<div class="ant-progress-bg"
									:style="{width:num(item.players.away.free_throw,item.players.away.free_throw_shots) +'%'}"
									style="width: 75%; height: 6px; background: rgb(255, 93, 93);"></div>
							</div>
						</div>
					</div>
					<div class="basketball-right-score">{{item.players.away.free_throw}}/{{item.players.away.free_throw_shots}}</div>
				</div>
			</div>
			<div class="basketball-cloumn cloumn3" v-if="item.players&&item.players.away">
				<div>失误
					<!-- -->{{item.players.away.number_of_mistakes}}
				</div>
				<div>犯规
					<!-- -->{{item.players.away.individual_fouls}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props:['item'],
		data() {
			return {
			}
		},
		methods:{
			num(num1,num2){
				return Number(num1) / (Number(num2)+Number(num1)) * 100
			}
		}
	}
</script>

<style>
</style>
