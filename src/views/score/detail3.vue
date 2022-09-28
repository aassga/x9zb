<template>
	<div class="football-yapan-container yapan-table">
		<div class="football-yapan-table">
			<div class="ant-table-wrapper">
				<div class="ant-spin-nested-loading">
					<div class="ant-spin-container">
						<div class="ant-table">
							<div class="ant-table-container">
								<div class="ant-table-content">
									<table style="table-layout: fixed;">
										<colgroup>
											<col>
											<col>
											<col style="width: 128px;">
											<col style="width: 128px;">
											<col style="width: 128px;">
											<col style="width: 128px;">
											<col style="width: 128px;">
											<col style="width: 128px;">
											<col style="width: 165px;">
										</colgroup>
										<thead class="ant-table-thead">
											<tr>
												<th title="公司" class="ant-table-cell ant-table-cell-ellipsis">公司</th>
												<th class="ant-table-cell">主队</th>
												<th class="ant-table-cell">即时盘</th>
												<th class="ant-table-cell">客队</th>
												<th class="ant-table-cell">主队</th>
												<th class="ant-table-cell">初始盘</th>
												<th class="ant-table-cell">客队</th>
												<th class="ant-table-cell">变化时间</th>
												<th class="ant-table-cell"> </th>
											</tr>
										</thead>
										<tbody class="ant-table-tbody">
											<tr data-row-key="0.7087969008548385"
												v-for="(item,index) in list.asia"
												:key="index"
												class="ant-table-row ant-table-row-level-0">
												<td title="Bet365" class="ant-table-cell ant-table-cell-ellipsis">
													<div class="b-r color-333">{{item.company_name}}</div>
												</td>
												<td class="ant-table-cell"><span :class="item.scilicet_host > item.early_host?'color-e30000':item.scilicet_host < item.early_host?'color-7770b6':''">{{item.scilicet_host}}</span></td>
												<td class="ant-table-cell"><span >{{item.scilicet_early}}</span></td>
												<td class="ant-table-cell">
													<div :class="item.scilicet_guest > item.early_guest?'color-e30000':item.scilicet_guest < item.early_guest?'color-7770b6':''">{{item.scilicet_guest}}</div>
												</td>
												<td class="ant-table-cell"><span>{{item.early_host}}</span></td>
												<td class="ant-table-cell"><span>{{item.early_early}}</span></td>
												<td class="ant-table-cell">
													<div class="b-r">{{item.early_guest}}</div>
												</td>
												<td class="ant-table-cell">
													<!-- v-if="query.type != 'basketball'" -->
													<div class="b-r" v-if="item.date && item.change_time && query.type != 'basketball'">{{item.date}} {{item.change_time}}</div>
													<div class="b-r" v-else>{{item.sourcetime}}</div>
												</td>
												<td class="ant-table-cell"><a class=""@click="getDetail(item)">查看</a>
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
		<div class="football-yapan-table statistics-table" v-if="query.type != 'basketball'">
			<div class="ant-table-wrapper">
				<div class="ant-spin-nested-loading">
					<div class="ant-spin-container">
						<div class="ant-table">
							<div class="ant-table-container">
								<div class="ant-table-content">
									<table style="table-layout: fixed;">
										<colgroup>
											<col>
											<col>
											<col style="width: 128px;">
											<col style="width: 128px;">
											<col style="width: 128px;">
											<col style="width: 128px;">
											<col style="width: 128px;">
											<col style="width: 128px;">
											<col style="width: 165px;">
										</colgroup>
										<thead class="ant-table-thead">
											<tr>
												<th title="公司" class="ant-table-cell ant-table-cell-ellipsis">公司</th>
												<th class="ant-table-cell">主队</th>
												<th class="ant-table-cell">即时盘</th>
												<th class="ant-table-cell">客队</th>
												<th class="ant-table-cell">主队</th>
												<th class="ant-table-cell">初始盘</th>
												<th class="ant-table-cell">客队</th>
												<th class="ant-table-cell">变化时间</th>
												<th class="ant-table-cell"> </th>
											</tr>
										</thead>
										<tbody class="ant-table-tbody" v-if="list.asia_additional">
											<tr data-row-key="0.39157883066520616"
												class="ant-table-row ant-table-row-level-0">
												<td title="最大值" class="ant-table-cell ant-table-cell-ellipsis">
													<div class="b-r color-333">最大值</div>
												</td>
												<td class="ant-table-cell"><span :class="list.asia_additional.highest.host > list.asia_additional.highest.hosts?'color-e30000':list.asia_additional.highest.host < list.asia_additional.highest.hosts?'color-7770b6':''">{{list.asia_additional.highest.host}}</span></td>
												<td class="ant-table-cell"><span :class="list.asia_additional.highest.early > list.asia_additional.highest.earlys?'color-e30000':list.asia_additional.highest.early < list.asia_additional.highest.earlys?'color-7770b6':''">{{list.asia_additional.highest.early}}</span></td>
												<td class="ant-table-cell">
													<div :class="list.asia_additional.highest.guest > list.asia_additional.highest.guests?'color-e30000':list.asia_additional.highest.guest < list.asia_additional.highest.guests?'color-7770b6':''">{{list.asia_additional.highest.guest}}</div>
												</td>
												<td class="ant-table-cell"><span>{{list.asia_additional.highest.hosts}}</span></td>
												<td class="ant-table-cell" ><span>{{list.asia_additional.highest.earlys}}</span></td>
												<td class="ant-table-cell">
													<div class="b-r">{{list.asia_additional.highest.guests}}</div>
												</td>
												<td class="ant-table-cell">
													<div class="b-r">-</div>
												</td>
												<td class="ant-table-cell"><a class=""
														href="/score-detail/zhishu?matchId=5404031&amp;type=yapan&amp;bookId=undefined&amp;typeId=undefined&amp;bookName=%E6%9C%80%E5%A4%A7%E5%80%BC&amp;sportId=1"></a>
												</td>
											</tr>
											<tr data-row-key="0.43708969347006077"
											
												class="ant-table-row ant-table-row-level-0">
												<td title="最小值" class="ant-table-cell ant-table-cell-ellipsis">
													<div class="b-r color-333">最小值</div>
												</td>
												<td class="ant-table-cell"><span class="color-7770b6">{{list.asia_additional.lowest.host}}</span></td>
												<td class="ant-table-cell"><span>{{list.asia_additional.lowest.early}}</span></td>
												<td class="ant-table-cell">
													<div class="color-e30000 b-r">{{list.asia_additional.lowest.guest}}</div>
												</td>
												<td class="ant-table-cell"><span>{{list.asia_additional.lowest.hosts}}</span></td>
												<td class="ant-table-cell"><span>{{list.asia_additional.lowest.earlys}}</span></td>
												<td class="ant-table-cell">
													<div class="b-r">{{list.asia_additional.lowest.guests}}</div>
												</td>
												<td class="ant-table-cell">
													<div class="b-r">-</div>
												</td>
												<td class="ant-table-cell"><a class=""
														href="/score-detail/zhishu?matchId=5404031&amp;type=yapan&amp;bookId=undefined&amp;typeId=undefined&amp;bookName=%E6%9C%80%E5%B0%8F%E5%80%BC&amp;sportId=1"></a>
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
					type:'asia'
				}
				this.$emit('getDetail',data)
			}
		}
	}
</script>

<style>
</style>
