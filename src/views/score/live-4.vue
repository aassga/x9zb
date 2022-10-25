<template>
	<div id="" style="width: 100%;">
		<div role="tabpanel" tabindex="0" aria-hidden="false" class="ant-tabs-tabpane ant-tabs-tabpane-active"
			id="rc-tabs-0-panel-1" aria-labelledby="rc-tabs-0-tab-1">
			<div class="statistic-match-wrap">
				<div class="text-live-view">
					<div class="basketball-content" v-if="item.length != 0">
						<div class="basketball-item" v-for="(item1,index) in item" :key="index">
							<div class="lable"></div>
							<div class="line"></div>
							<div class="time">{{item1.conducttime}}</div>
							<div class="content">{{item1.info}}</div>
						</div>
					</div>
					<div class="basketball-content"v-else>
						<img class="no-data-img" src="../../assets/images/qsy.png" >
					</div>
				</div>
			</div>
		</div>
		<div role="tabpanel" tabindex="-1" aria-hidden="true" style="display:none" class="ant-tabs-tabpane"
			id="rc-tabs-0-panel-3" aria-labelledby="rc-tabs-0-tab-3"></div>
	</div>
</template>

<script>
	export default {
		props: ['item'],
		watch:{
			item(e){
			}
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
