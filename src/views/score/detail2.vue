<template>
	<div class="ouzhi-container">
		<div class="football-ouzhi-container ouzhi-table">
			<div class="football-ouzhi-table">
				<div class="ant-table-wrapper">
					<div class="ant-spin-nested-loading">
						<div class="ant-spin-container">
							<div class="ant-table">
								<div class="ant-table-container">
									<div class="ant-table-content">
										<table style="table-layout: fixed;">
											<colgroup>
												<col style="width: 180px;">
												<col style="width: 80px;">
												<col style="width: 120px;">
												<col style="width: 100px;">
												<col style="width: 120px;">
												<col style="width: 120px;">
												<col style="width: 100px;">
												<col style="width: 120px;">
											</colgroup>
											<thead class="ant-table-thead">
												<tr>
													<th title="公司" class="ant-table-cell ant-table-cell-ellipsis">公司
													</th>
													<th class="ant-table-cell" v-if="query.type != 'basketball'">类型</th>
													<th class="ant-table-cell">主胜</th>
													<th class="ant-table-cell" v-if="query.type != 'basketball'">平局</th>
													<th class="ant-table-cell">客胜</th>
													<th class="ant-table-cell">主胜率</th>
													<th class="ant-table-cell" v-if="query.type != 'basketball'">和率</th>
													<th class="ant-table-cell">客胜率</th>
													<th class="ant-table-cell">返还率</th>
													<th class="ant-table-cell"> </th>
												</tr>
											</thead>
											<tbody class="ant-table-tbody">
												<tr data-row-key="0.9872718180622415"
													v-for="(item,index) in list.eu"
													:key="index"
													class="ant-table-row ant-table-row-level-0">
													<td class="ant-table-cell ant-table-cell-ellipsis">
														<div>{{item.company_name}}</div>
													</td>
													<td class="ant-table-cell" v-if="query.type != 'basketball'">
														<div class="b-r b-l">
															<div class="b-b">初盘</div>
															<div class="lineHeight">即时</div>
														</div>
													</td>
													<td class="ant-table-cell">
														<div class="b-b">{{item.early_host}}</div>
														<div :class="item.scilicet_host > item.early_host?'color-e30000':item.scilicet_host < item.early_host?'color-7770b6':''">{{item.scilicet_host}}</div>
													</td>
													<td class="ant-table-cell" v-if="query.type != 'basketball'">
														<div class="b-b">{{item.early_early}}</div>
														<div :class="item.early_early > item.scilicet_early?'color-e30000':item.early_early < item.scilicet_early?'color-7770b6':''">{{item.scilicet_early}}</div>
													</td>
													<td class="ant-table-cell">
														<div class="b-b b-r">{{item.early_guest}}</div>
														<div class="b-r" :class="item.scilicet_guest > item.early_guest?'color-e30000':item.scilicet_guest < item.early_guest?'color-7770b6':''">{{item.scilicet_guest}}</div>
													</td>
													<td class="ant-table-cell">
														<div class="b-b">15.59%</div>
														<div>11.29%</div>
													</td>
													<td class="ant-table-cell" v-if="query.type != 'basketball'">
														<div class="b-b">37.24%</div>
														<div>36.29%</div>
													</td>
													<td class="ant-table-cell">
														<div class="b-b b-r">47.17%</div>
														<div class="b-r">52.42%</div>
													</td>
													<td class="ant-table-cell">
														<div class="b-b b-r">89.76%</div>
														<div class="b-r">91.71%</div>
													</td>
													<td class="ant-table-cell"><a class="" @click="getDetail(item)">查看</a>
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
			<div class="football-ouzhi-table">
				<div class="ant-table-wrapper">
					<div class="ant-spin-nested-loading">
						<div class="ant-spin-container">
							<div class="ant-table">
								<div class="ant-table-container">
									<div class="ant-table-content">
										<table style="table-layout: fixed;">
											<colgroup>
												<col style="width: 180px;">
												<col style="width: 80px;">
												<col style="width: 120px;">
												<col style="width: 100px;">
												<col style="width: 120px;">
												<col style="width: 120px;">
												<col style="width: 100px;">
												<col style="width: 120px;">
											</colgroup>
											<thead class="ant-table-thead">
												<tr>
													<th title=" " class="ant-table-cell ant-table-cell-ellipsis"> </th>
													<th class="ant-table-cell" v-if="query.type != 'basketball'">类型</th>
													<th class="ant-table-cell">主胜</th>
													<th class="ant-table-cell" v-if="query.type != 'basketball'">平局</th>
													<th class="ant-table-cell">客胜</th>
													<th class="ant-table-cell">主胜率</th>
													<th class="ant-table-cell" v-if="query.type != 'basketball'">和率</th>
													<th class="ant-table-cell">客胜率</th>
													<th class="ant-table-cell">返还率</th>
													<th class="ant-table-cell"> </th>
												</tr>
											</thead>
											<tbody class="ant-table-tbody">
												<tr data-row-key="0.804214261432656"
												v-if="list.eu_additional.average"
													class="ant-table-row ant-table-row-level-0">
													<td title="最高值" class="ant-table-cell ant-table-cell-ellipsis">
														<div>最高值</div>
													</td>
													<td class="ant-table-cell" v-if="query.type != 'basketball'">
														<div class="b-r b-l">
															<div class="b-b">初盘</div>
															<div class="lineHeight">即时</div>
														</div>
													</td>
													<td class="ant-table-cell">
														<div class="b-b">{{list.eu_additional.highest.host}}</div>
														<div :class="list.eu_additional.highest.hosts > list.eu_additional.highest.host?'color-e30000':list.eu_additional.highest.hosts < list.eu_additional.highest.host?'color-7770b6':''">{{list.eu_additional.highest.hosts}}</div>
													</td>
													<td class="ant-table-cell" v-if="query.type != 'basketball'">
														<div class="b-b">{{list.eu_additional.highest.early}}</div>
														<div :class="list.eu_additional.highest.earlys > list.eu_additional.highest.early?'color-e30000':list.eu_additional.highest.earlys < list.eu_additional.highest.early?'color-7770b6':''">{{list.eu_additional.highest.earlys}}</div>
													</td>
													<td class="ant-table-cell">
														<div class="b-b b-r">{{list.eu_additional.highest.guest}}</div>
														<div class="b-r" :class="list.eu_additional.highest.guests > list.eu_additional.highest.guest?'color-e30000':list.eu_additional.highest.guests < list.eu_additional.highest.guest?'color-7770b6':''">{{list.eu_additional.highest.guests}}</div>
													</td>
													<td class="ant-table-cell" v-if="query.type != 'basketball'">
														<div class="b-b">0012.62%</div>
														<div>11.47%</div>
													</td>
													<td class="ant-table-cell">
														<div class="b-b">34.48%</div>
														<div>33.75%</div>
													</td>
													<td class="ant-table-cell">
														<div class="b-b b-r">52.90%</div>
														<div class="b-r">54.78%</div>
													</td>
													<td class="ant-table-cell">
														<div class="b-b b-r">100.35%</div>
														<div class="b-r">101.35%</div>
													</td>
													<td class="ant-table-cell"><a class=""
															href="/score-detail/zhishu?matchId=5404031&amp;type=oupei&amp;bookId=undefined&amp;typeId=undefined&amp;bookName=%E6%9C%80%E5%A4%A7%E5%80%BC&amp;sportId=1"></a>
													</td>
												</tr>
												<tr data-row-key="0.6651533177798599"
													class="ant-table-row ant-table-row-level-0">
													<td title="最低值" class="ant-table-cell ant-table-cell-ellipsis">
														<div>最低值</div>
													</td>
													<td class="ant-table-cell" v-if="query.type != 'basketball'">
														<div class="b-r b-l">
															<div class="b-b">初盘</div>
															<div class="lineHeight">即时</div>
														</div>
													</td>
													<td class="ant-table-cell">
														<div class="b-b">{{list.eu_additional.lowest.host}}</div>
														<div :class="list.eu_additional.lowest.hosts > list.eu_additional.lowest.host?'color-e30000':list.eu_additional.lowest.hosts < list.eu_additional.lowest.host?'color-7770b6':''">{{list.eu_additional.lowest.hosts}}</div>
													</td>
													<td class="ant-table-cell" v-if="query.type != 'basketball'">
														<div class="b-b">{{list.eu_additional.lowest.early}}</div>
														<div :class="list.eu_additional.lowest.earlys > list.eu_additional.lowest.early?'color-e30000':list.eu_additional.lowest.earlys < list.eu_additional.lowest.early?'color-7770b6':''">{{list.eu_additional.lowest.earlys}}</div>
													</td>
													<td class="ant-table-cell">
														<div class="b-b b-r">{{list.eu_additional.lowest.guest}}</div>
														<div class="b-r" :class="list.eu_additional.lowest.guests > list.eu_additional.lowest.guest?'color-e30000':list.eu_additional.lowest.guests < list.eu_additional.lowest.guest?'color-7770b6':''">{{list.eu_additional.lowest.guests}}</div>
													</td>
													<td class="ant-table-cell" v-if="query.type != 'basketball'">
														<div class="b-b">14.03%</div>
														<div>13.53%</div>
													</td>
													<td class="ant-table-cell">
														<div class="b-b">35.86%</div>
														<div>38.15%</div>
													</td>
													<td class="ant-table-cell">
														<div class="b-b b-r">50.11%</div>
														<div class="b-r">48.32%</div>
													</td>
													<td class="ant-table-cell">
														<div class="b-b b-r">79.58%</div>
														<div class="b-r">81.36%</div>
													</td>
													<td class="ant-table-cell"><a class=""
															href="/score-detail/zhishu?matchId=5404031&amp;type=oupei&amp;bookId=undefined&amp;typeId=undefined&amp;bookName=%E6%9C%80%E5%B0%8F%E5%80%BC&amp;sportId=1"></a>
													</td>
												</tr>
												<tr data-row-key="0.4603602972304044"
													class="ant-table-row ant-table-row-level-0">
													<td title="平均值" class="ant-table-cell ant-table-cell-ellipsis">
														<div>平均值</div>
													</td>
													<td class="ant-table-cell" v-if="query.type != 'basketball'">
														<div class="b-r b-l">
															<div class="b-b">初盘</div>
															<div class="lineHeight">即时</div>
														</div>
													</td>
													<td class="ant-table-cell">
														<div class="b-b">{{list.eu_additional.average.host}}</div>
														<div :class="list.eu_additional.average.hosts > list.eu_additional.average.host?'color-e30000':list.eu_additional.average.hosts < list.eu_additional.average.host?'color-7770b6':''">{{list.eu_additional.average.hosts}}</div>
													</td>
													<td class="ant-table-cell" v-if="query.type != 'basketball'">
														<div class="b-b">{{list.eu_additional.average.early}}</div>
														<div :class="list.eu_additional.average.earlys > list.eu_additional.average.early?'color-e30000':list.eu_additional.average.earlys < list.eu_additional.average.early?'color-7770b6':''">{{list.eu_additional.average.earlys}}</div>
													</td>
													<td class="ant-table-cell">
														<div class="b-b b-r">{{list.eu_additional.average.guest}}</div>
														<div class="b-r" :class="list.eu_additional.average.guests > list.eu_additional.average.guest?'color-e30000':list.eu_additional.average.guests < list.eu_additional.average.guest?'color-7770b6':''">{{list.eu_additional.average.guests}}</div>
													</td>
													<td class="ant-table-cell" v-if="query.type != 'basketball'">
														<div class="b-b">13.22%</div>
														<div>12.44%</div>
													</td>
													<td class="ant-table-cell">
														<div class="b-b">35.07%</div>
														<div>34.99%</div>
													</td>
													<td class="ant-table-cell">
														<div class="b-b b-r">51.71%</div>
														<div class="b-r">52.57%</div>
													</td>
													<td class="ant-table-cell">
														<div class="b-b b-r">90.04%</div>
														<div class="b-r">91.08%</div>
													</td>
													<td class="ant-table-cell"><a class=""
															href="/score-detail/zhishu?matchId=5404031&amp;type=oupei&amp;bookId=undefined&amp;typeId=undefined&amp;bookName=undefined&amp;sportId=1"></a>
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
		props:{
			list:{
				type:Object,
				default:{}
			},
			query:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {
				
			}
		},
		methods:{
			getDetail(item){
				let data = {
					id:item.company_id,
					type:'eu'
				}
				this.$emit('getDetail',data)
			}
		}
	}
</script>

<style>
</style>
