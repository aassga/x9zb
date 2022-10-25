<template>
	<div class="three-container">
		<div class="three-table">
			<div class="sportType-three-table">
				<div class="ant-table-wrapper">
					<div class="ant-spin-nested-loading">
						<div class="ant-spin-container">
							<div class="ant-table">
								<div class="ant-table-container">
									<div class="ant-table-content">
										<table style="table-layout: fixed;">
											<colgroup>
												<col style="width: 117px;">
												<col style="width: 105px;">
												<col>
												<col>
												<col>
												<col>
												<col>
												<col>
												<col>
												<col>
												<col>
												<col style="width: 165px;">
											</colgroup>
											<thead class="ant-table-thead">
												<tr>
													<th title="公司" rowspan="2"
														class="ant-table-cell b-r ant-table-cell-ellipsis">公司</th>
													<th rowspan="2" class="ant-table-cell b-r">类型</th>
													<th colspan="3" class="ant-table-cell b-r">欧盘指数</th>
													<th colspan="3" class="ant-table-cell b-r">亚盘指数</th>
													<th colspan="3" class="ant-table-cell b-r">大小指数</th>
													<th rowspan="2" class="ant-table-cell"> </th>
												</tr>
												<tr>
													<th class="ant-table-cell">主胜</th>
													<th class="ant-table-cell">平局</th>
													<th class="ant-table-cell b-r">客胜</th>
													<th class="ant-table-cell">主队</th>
													<th class="ant-table-cell">盘口</th>
													<th class="ant-table-cell b-r">客队</th>
													<th class="ant-table-cell">大球</th>
													<th class="ant-table-cell">盘口</th>
													<th class="ant-table-cell b-r">小球</th>
												</tr>
											</thead>
											<tbody class="ant-table-tbody">
												<tr data-row-key="0.9135411155037494"
													class="ant-table-row ant-table-row-level-0">
													<td title="Bet365"
														class="ant-table-cell b-r ant-table-cell-ellipsis">Bet365</td>
													<td class="ant-table-cell b-r">
														<div class="two-row esp">
															<div class="heightSpace b-b">初盘</div>
															<div class="heightSpace">即盘</div>
														</div>
													</td>
													<td class="ant-table-cell">
														<div>
															<div class="heightSpace b-b">1.57</div>
															<div class="color-7770b6 heightSpace">1.40</div>
														</div>
													</td>
													<td class="ant-table-cell">
														<div>
															<div class="heightSpace b-b">3.75</div>
															<div class="color-e30000 heightSpace">4.50</div>
														</div>
													</td>
													<td class="ant-table-cell b-r">
														<div>
															<div class="heightSpace b-b">4.75</div>
															<div class="color-e30000 heightSpace">6.50</div>
														</div>
													</td>
													<td class="ant-table-cell">
														<div>
															<div class="heightSpace b-b">0.95</div>
															<div class="heightSpace">0.95</div>
														</div>
													</td>
													<td class="ant-table-cell">
														<div>
															<div class="heightSpace b-b">一球</div>
															<div class="heightSpace">一/球半</div>
														</div>
													</td>
													<td class="ant-table-cell b-r">
														<div>
															<div class="heightSpace b-b">0.85</div>
															<div class="color-e30000 heightSpace">0.85</div>
														</div>
													</td>
													<td class="ant-table-cell">
														<div>
															<div class="heightSpace b-b">0.78</div>
															<div class="color-e30000 heightSpace">0.98</div>
														</div>
													</td>
													<td class="ant-table-cell">
														<div>
															<div class="heightSpace b-b">2/2.5</div>
															<div class="color-e30000 heightSpace">2.5</div>
														</div>
													</td>
													<td class="ant-table-cell b-r">
														<div>
															<div class="heightSpace b-b">1.03</div>
															<div class="color-7770b6 heightSpace">0.83</div>
														</div>
													</td>
													<td class="ant-table-cell"><a class=""  @click="getDetail()">查看</a>
													</td>
												</tr>
												
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods:{
			getDetail(){
				this.$emit('getDetail',true)
			}
		}
	}
</script>

<style>
</style>
