<!-- 预约 -->
<template>
	<div class="personal-live-reserve-page">
		<div class="i-tabs-container">
			<div class="header-nav"><a href="/personal/live-reverse?choose=0">
					<div class="item first-item ">预约开播</div>
				</a></div>
			<div class="tab-pane-item" name="预约开播" style="padding: 0px 20px;">
				<section class="home-search-box"><span class="title">直播类型：</span>
					<el-select v-model="typeS" placeholder="请选择" style="width: 140px;">
						<el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<span class="title title2">比赛日期：</span>
					<el-date-picker style="width: 140px;" v-model="dateS" type="date" value-format="yyyy-MM-dd"
						@change="getTime1" placeholder="比赛日期">
					</el-date-picker>
				</section>
				<section class="home-table-box">
					<div class="ant-table-wrapper">
						<div class="ant-spin-nested-loading">
							<div class="ant-spin-container">
								<div class="ant-table ant-table-middle ant-table-empty ant-table-fixed-header ant-table-scroll-horizontal"
									style="height: 100% !important;">
									<div class="ant-table-container">
										<div class="ant-table-header" style="overflow: hidden;">
											<table style="table-layout: fixed;">
												<colgroup>
													<col style="width: 204px;">
													<col style="width: 164px;">
													<col style="width: 199px;">
													<col style="width: 30px;">
													<col style="width: 199px;">
													<col style="width: 120px;">
													<col style="width: 4px;">
												</colgroup>
												<thead class="ant-table-thead">
													<tr>
														<th title="赛事名称" class="ant-table-cell ant-table-cell-ellipsis">
															赛事名称</th>
														<th class="ant-table-cell">比赛时间</th>
														<th title="主队名称" class="ant-table-cell ant-table-cell-ellipsis">
															主队名称</th>
														<th class="ant-table-cell"></th>
														<th title="客队名称" class="ant-table-cell ant-table-cell-ellipsis">
															客队名称</th>
														<th class="ant-table-cell">操作</th>
														<th class="ant-table-cell ant-table-cell-scrollbar"></th>
													</tr>
												</thead>
											</table>
										</div>
										<div class="ant-table-body" style="overflow: auto scroll; max-height: 330px;">
											<table style="width: 870px; min-width: 100%; table-layout: fixed;">
												<colgroup>
													<col style="width: 204px;">
													<col style="width: 164px;">
													<col>
													<col style="width: 30px;">
													<col>
													<col style="width: 120px;">
												</colgroup>
												<tbody class="ant-table-tbody" >
													<tr aria-hidden="true" class="ant-table-measure-row"
														style="height: 0px; font-size: 0px;">
														<td style="padding: 0px; border: 0px; height: 0px;">
															<div style="height: 0px; overflow: hidden;">&nbsp;</div>
														</td>
														<td style="padding: 0px; border: 0px; height: 0px;">
															<div style="height: 0px; overflow: hidden;">&nbsp;</div>
														</td>
														<td style="padding: 0px; border: 0px; height: 0px;">
															<div style="height: 0px; overflow: hidden;">&nbsp;</div>
														</td>
														<td style="padding: 0px; border: 0px; height: 0px;">
															<div style="height: 0px; overflow: hidden;">&nbsp;</div>
														</td>
														<td style="padding: 0px; border: 0px; height: 0px;">
															<div style="height: 0px; overflow: hidden;">&nbsp;</div>
														</td>
														<td style="padding: 0px; border: 0px; height: 0px;">
															<div style="height: 0px; overflow: hidden;">&nbsp;</div>
														</td>
													</tr>
													<!-- v-if="list.length != 0" -->
													<tr data-row-key="0.3428576777645791"
													v-for="(item,index) in list" :key="index"
														class="ant-table-row ant-table-row-level-0">
														<td class="ant-table-cell ant-table-cell-ellipsis">
															<div class="leagueName-box"><img
																	src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA2CAYAAACbZ/oUAAAAAXNSR0IArs4c6QAABSZJREFUaAXtWl1oHFUUPufOJI0/EcUg2jeVbbroY1ErTbJWW4xIU32zCBaaJ/FJKAXFZFpRKH2ygohNoKLogw+6RVBMbbcJGpG+yibdqm+tDxVEra3Jzr2eM5szO7sbZme3M8PY7MDuuffc8/fd/3tnAHpPrwZuqhpAQWOMweHpwiSAPgCID1H+dimLkyrb3rE8dfY7trnFKeww2l2I077YQsS/wZifANTs8uHSDOUNlyn+y781ct+wM3bagP6AuI8mBZZ9pfUwBg8LYWJsjJF9K25ZdwU/JrozrWDS9sPY1jCizd3YwM0LViqXQTNW6tI0ZjfMow8onqA2DF7CymM4kdk4i5XIWL1ZOovBJRVTD3BSNZsVu70WzkpLJBVH6i2stHEFjAVQlXRaNHHAvIlHBSfQUs9YA/1DZaf0g4DjNPO4zJPhDX/CD+amRrxTRNx+EGGFwB6DW+48unzo1F9R7A8f3TMI1/44ROvlQWOgP4pOpzIJAcYK9MFE5Y35cqcBsXzuzdE8rEIRwOS60Q/TiR0wtep5tanv6aXXvv1dHDuOoz7BsxNg9HN0ONtOJ1PvqGYQLtMxdRFQfb7PPFEkOS06W99+8m797+rX1NrbhBcHjRUwdeNLVj9sK7++cFmC2+qMPq41zNCJLC+89SgClpWCySVn/nsp5zOsuwLnqXtvFt6N0lgnLUup/UGwOWdkvzZwrh1YBsEyLLtlavQlAcW22Kbk46ChgKnWi3wloyzYy60X7hDnytPn5kQmf3hsF2icoS5pC68dZVmaQWc93TXhmk307a5ng2PjGDlWjnk9GeGFAh5Q6hW+f1qeXiiiweOitB61LHxX+AWnMOBq/T61Gy21nT7GYt3x4+ObRDNoW3hBiqje4Rg5Vo45WNacDgXcN2AHlhP8s1nZzyP8c6+pt8IlrSdo3D3gl3eYYN2fr1zdK2p3Dd5zGsiH5FuoBj/OxphbJGuXeK3szjg065ZLTum6r4XmWT/dbSJgY/HVz66xj25NBfVCWzgoGJY2gI3j28D9YfKRyppstPiIZKRVKBbArWazy4kFMIJpXCcRfr1hyE02Wnx06SAWwLRjyvPM7Mdg8Es/3W0iYINts49uTQX1QgGvXq8O1oXNHfV0U8rArb+h2SXczUoVaW38RfKdUtZ9cOi2L0TPs00+JN9CFfhxNsbcIgmhW0texNG2joGpDhkN74Vv8XCucmR+t7jgzUPVNV91vhaja1s4HtzE5KZGvyE7foWKD6G88aDj5cuA9hVTdQ/Srm1CypppKOBm4XZ521K7GwKlrSVtWE5E3W3RwaNKe8zJC0fmPxRftYrTBDieJ7RLd+qCdkgn5aUV61achZMKYYwPBu1ssQzLNoDlwwPZbKfbSXmsgLnL00urU3y0kyD49LNP7XyYbjWep273Eb3puEjgrvLPSxOPy1gmeFJiG2wrfBiJl+g01i5dd4sVVGrPBae0VOdFT/2vLgAEFk0kG+mKR2AD9Vq6mEPzKd9qqD77x+BNCEt5Nxur1Uf4NgQMvkATXKLvuhLq0nXAzSlbWdvl5jLvFB6ranexWSbJfKyTVpRAtUL/jEwX1JEvB6LYjiKTOuAoQSUp0wOcZO1mwXavhbPQCknGoLx1MkkPGbLNWFXt87wMRZVkKPQpIo1hNZukj2zZVrNq7cPLM9kKLP5oqDufYaw8ho3Vb15kRvxusmGRsa1hrL334ZdWtGl/Ko3Ph9OqAgJZ/3zYqX8+nJb/np9eDaRUA/8B2jj4vnX5dqwAAAAASUVORK5CYII="
																	alt=""><span>{{item.name}}</span></div>
														</td>
														<td class="ant-table-cell">{{item.match_time}}</td>
														<td title="" class="ant-table-cell ant-table-cell-ellipsis">
															{{item.home_name}}</td>
														<td class="ant-table-cell">-</td>
														<td title="" class="ant-table-cell ant-table-cell-ellipsis">{{item.away_name}}
														</td>
														<td class="ant-table-cell" style="cursor: pointer;" @click="deleteReserveLive(item)">删除</td>
													</tr>
													<!-- v-else -->
													<tr class="ant-table-placeholder" v-if="list.length == 0">
														<td colspan="6" class="ant-table-cell">
															<div class="ant-table-expanded-row-fixed"
																style="width: 916px; position: sticky; left: 0px; overflow: hidden;">
																<div class="common-empty-view"><img class="no-data-img  "
																		src="../../assets/images/qsy.png" alt="no-data"
																		style="margin-top: 0;">
																</div>
															</div>
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
				</section>
				<el-pagination background @current-change="sizeChange" layout="prev, pager, next"
					:total="detail.total">
				</el-pagination>
				<section class="home-btn-box"><button class="i-button i-primary-image-button"
						style="background-image: linear-gradient(106deg, rgb(238, 207, 181), rgb(216, 173, 102))"
						@click="dialogVisible = true">添加预约</button></section>
			</div>
		</div>
		<el-dialog :center="true" :show-close="false" style="padding: 0;" width="60%" custom-class="dialog" :visible.sync="dialogVisible">
			<div class="ant-modal-content">
				<div class="ant-modal-body">
					<div class="personal-live-reserve-add-modal">
						<section class="search-box">
							<form class="ant-form ant-form-inline">
								<div class="ant-row ant-form-item ant-form-item-has-success" style="row-gap: 0px;">
									<div class="ant-col ant-form-item-label"><label for="sportTypes"
											class="ant-form-item-required" title="直播类型">直播类型</label></div>
									<el-select v-model="type" placeholder="请选择" style="width: 140px;">
										<el-option v-for="item in options" :key="item.value" :label="item.label"
											:value="item.value">
										</el-option>
									</el-select>
								</div>
								<div class="ant-row ant-form-item ant-form-item-has-success" style="row-gap: 0px;">
									<div class="ant-col ant-form-item-label"><label for="matchTime"
											class="ant-form-item-required" title="比赛日期">比赛日期</label></div>
									<!-- <div id="" > -->
									<el-date-picker style="width: 140px;" v-model="value1" type="date"
										value-format="yyyy-MM-dd" @change="getTime" placeholder="比赛日期">
									</el-date-picker>
									<!-- </div> -->
								</div>
								<div class="ant-row ant-form-item ant-form-item-has-success" style="row-gap: 0px;">
									<div class="ant-col ant-form-item-control">
										<div class="ant-form-item-control-input">
											<div class="ant-form-item-control-input-content"><input placeholder="输入赛事名称"
													type="text" id="leagueName" class="ant-input ant-input-lg" value=""
													style="width: 140px; border-radius: 4px; height: 40px; font-size: 14px;">
											</div>
										</div>
									</div>
								</div>
								<div class="ant-row ant-form-item" style="row-gap: 0px;">
									<div class="ant-col ant-form-item-control">
										<div class="ant-form-item-control-input">
											<div class="ant-form-item-control-input-content"><input placeholder="输入球队名称"
													type="text" id="teamName" class="ant-input ant-input-lg" value=""
													style="width: 140px; border-radius: 4px; height: 40px; font-size: 14px;">
											</div>
										</div>
									</div>
								</div>
								<div class="ant-row ant-form-item" style="row-gap: 0px;">
									<div class="ant-col ant-form-item-control">
										<div class="ant-form-item-control-input">
											<div class="ant-form-item-control-input-content"><div
													class="ant-btn ant-btn-lg submit" style="float: right;padding: 0 14px;line-height: 40px;"
													@click="setSchedule()"><span>查 询</span></div></div>
										</div>
									</div>
								</div>
							</form>
						</section>
						<section class="table-box">
							<div class="ant-table-wrapper">
								<div class="ant-spin-nested-loading">
									<div class="ant-spin-container">
										<div
											class="ant-table ant-table-middle ant-table-fixed-header ant-table-scroll-horizontal">
											<div class="ant-table-container">
												<div class="ant-table-header" style="overflow: hidden;">
													<table style="table-layout: fixed;width: 100%">
														<colgroup>
															<col style="width: 200px;">
															<col style="width: 143.993px;">
															<col style="width: 143px;">
															<col style="width: 30px;">
															<col style="width: 143.993px;">
															<col style="width: 143px;">
															<col style="width: 144.028px;">
															<col style="width: 4px;">
														</colgroup>
														<thead class="ant-table-thead">
															<tr>
																<th title="赛事名称"
																	class="ant-table-cell ant-table-cell-ellipsis">赛事名称
																</th>
																<th class="ant-table-cell">比赛时间</th>
																<th title="主队名称"
																	class="ant-table-cell ant-table-cell-ellipsis">主队名称
																</th>
																<th class="ant-table-cell"></th>
																<th title="客队名称"
																	class="ant-table-cell ant-table-cell-ellipsis">客队名称
																</th>
																<th title=""
																	class="ant-table-cell ant-table-cell-ellipsis">
																	预约比赛</th>
																<th title="" class="ant-table-cell ant-table-cell-ellipsis"> </th>
																<th title="" class="ant-table-cell ant-table-cell-ellipsis"></th>
															</tr>
														</thead>
													</table>
												</div>
												<div class="ant-table-body"
													style="overflow: auto scroll; max-height: 500px;">
													<table style="width: 800px; min-width: 100%; table-layout: fixed;">
														<colgroup>
															<col style="width: 200px;">
															<col>
															<col>
															<col style="width: 30px;">
														</colgroup>
														<tbody class="ant-table-tbody" v-infinite-scroll="load">
															<tr aria-hidden="true" class="ant-table-measure-row"
																style="height: 0px; font-size: 0px;">
																<td style="padding: 0px; border: 0px; height: 0px;">
																	<div style="height: 0px; overflow: hidden;">&nbsp;
																	</div>
																</td>
																<td style="padding: 0px; border: 0px; height: 0px;">
																	<div style="height: 0px; overflow: hidden;">&nbsp;
																	</div>
																</td>
																<td style="padding: 0px; border: 0px; height: 0px;">
																	<div style="height: 0px; overflow: hidden;">&nbsp;
																	</div>
																</td>
																<td style="padding: 0px; border: 0px; height: 0px;">
																	<div style="height: 0px; overflow: hidden;">&nbsp;
																	</div>
																</td>
																<td style="padding: 0px; border: 0px; height: 0px;">
																	<div style="height: 0px; overflow: hidden;">&nbsp;
																	</div>
																</td>
																<td style="padding: 0px; border: 0px; height: 0px;">
																	<div style="height: 0px; overflow: hidden;">&nbsp;
																	</div>
																</td>
																<td style="padding: 0px; border: 0px; height: 0px;">
																	<div style="height: 0px; overflow: hidden;">&nbsp;
																	</div>
																</td>
															</tr>


															<tr v-for="(item,index) in baseList" :key="index"
																class="ant-table-row ant-table-row-level-0">
																<td class="ant-table-cell ant-table-cell-ellipsis">
																	<div class="leagueName-box">
																		<img
																			src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA2CAYAAACbZ/oUAAAAAXNSR0IArs4c6QAABNtJREFUaAXtml9oHEUcx2fmbntH26CkUlAqacUzl0uKNk/VvqkVfLi9a0vRh75INYVqi5Qi4h+MQtEn/1AQDE19qVI5ku7uiQ8W9EEfipJEEC8XU2qCsSktkVJtTHJ3O37n7G0nZ+Guezu3m2sGwv72N7vz+31mfjPzm70QslpWe6CleoBWaDjnNJ9KPc8J2Q9dN+F8faVuRV4p/Rt+/wLAwbhpnqCUAo2QMnBu9+57abF4CtCPr0i4Gk4D9hseDu9LDA/PMjGyrQwr+kIM5A1GSsd1/QUoBmp0UktUY6T72I052xJAtSAEK8ND3bUebKH6brbiV+PbGQ3sPGKE76iiEngei8Q58t9+GJhOVQIM0N8i0WhXl2U9qnV03MMofRPgS0GgprlkspyBeOkMgA8AdtlWN5lKJYqcD2IL3O6lrdttS80Ic36+2pGYaebivb07CGNHUDdfXd+seyXACN9bRg3t77cTpvlBeM2arYiCb5sFKdtRAyxZyOn6zolU6hlJRR4aGrqAhP4JEfpI5q/Jdapl5cAA2FCy7dNIYc28rt9XAQIsF/OcRaMJyF9W9KqvzQAuM2Cx0hHnuXwyKY6fTunMZP4AeBIr+T6AzzkVioSmAQv/AX2XTcgJhPlZgG+RmeKW9Vk4EumC7gtZ77XcVGDHec6fBPjP+OBwmPf3Oz7EMpkriWz2WSjSGO1Z53kPBceYh23W29Q627Y/yo+OfjexZ09cfimezZpRxhJY7U/Kei9kP4HL/iPMH7OXln4aTyZfw2iHK1BbDONqwrL2A/opjPbFir7Rq+/AAgCLWQR/x8ZHR3/4NZ1+RIYC9FmmaWILK8l6t3IggB3nOd9WLJV+xNx+3dFB6BwayiMSRmSdWzlYwKBAIvJ9iNLT1UAY4Y3VOjf3zpxx87KX75QzLsZeiRvGAOAQ4TdLeX5zvvmmxr0UFOCvwpp2IDY8PINFyqERn49JofAx6NOOskHBV2CM5BzwXkbScaqaA/P4ObtYfB/6u6vrGrn3DRiwGS0UeunBM2cuywDj6fRmYtsD2KN3ynqv5KYDA3SWMXaw0zAMGUJkXPmRkRd5qfQu9OvkOi/lpgIjfD9FBnVEJBUyBE5Rnci4BjFXd8h6FXKzgKdpKNTXZRhfyxAis8qPjR3ltv0WYKNynSpZOTBl7NwGTevZmMmIX/OcMrFr18MI4ZMA7XWUTRCUA2NUp2SOyUOHIoXp6TdKxeKr0Cu3L9sWsiqDbdWGxD2+kG4vTE2JE5A49/pSlADjrPs0aKwK0cW+vrXXLl06hvA9jJzY13RWzXdpcQCi9J0QYwb20x5Avg3YByod4OdVCbCfQLVs+xpetZxTUX/nASP7WVDRk0FsU7Ay/EvLhSA6p8InwcpAnVHReBDbFKws2t7+Hk4wE0F00EufBGOZVTQ6qevbCoSY+Gngfi+NBKYtSn/XCEnFLGusvEoLQWtr68GQfwInrwfG0cYduS6YBJtgFM3hfnkRyX1xZqYDo33LfHj50wG+o/Sv8KZN07HjxxcD7OWqa573wP9Cul4Ll/fuXf/n4mIah4K19b7jxXNweL49EjGqPyjU27br4+HcwsLngE3Wa8ir52CTwHYWF91Nm65zaWQtvh3iG7HtGhjn3Q+xmf/jppcbeadsE7bdtvEvUTWIm7J2kyAAAAAASUVORK5CYII=" alt=""
																		>
																		<span v-if="item">
																			{{showType == 1?item.competition_name_zh:item.short_name_zh}}
																		</span>
																	</div>
																</td>
																<td class="ant-table-cell">
																	{{showType == 1?$common.timeStamp1(item.time):item.match_time}}
																</td>
																<td title=""
																	class="ant-table-cell ant-table-cell-ellipsis">
																	{{showType == 1?item.home_team_name_zh:item.home_team_data.short_name_zh}}
																</td>
																<td class="ant-table-cell">-</td>
																<td title=""
																	class="ant-table-cell ant-table-cell-ellipsis">
																	{{showType == 1?item.away_team_name_zh:item.away_team_data.short_name_zh}}
																</td>
																<td title=""
																	class="ant-table-cell ant-table-cell-ellipsis">
																	<span @click="reserveMatch(item)"
																		class="yuyue ">预约</span>
																</td>
																<td title="预约"
																	class="ant-table-cell ant-table-cell-ellipsis"></td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		deleteReserveLive,
		getReserveLiveList,
		setReserveLive
	} from '../../api/user.js'
	import {
		getList
	} from '../../api/basketball.js'
	import {
		football_match
	} from '../../api/football.js'
	export default {
		data() {
			return {
				list: [],//预约列表
				detail: {},
				type: 1, // 直播類型 1足球 2籃球
				value1: '', //时间选择器
				options: [
					{
						value: 1,
						label: '足球'
					},
					{
						value: 2,
						label: '篮球'
					}
				],
				options1: [
					{
						value: -1,
						label: '全部'
					},
					{
						value: 0,
						label: '足球'
					},
					{
						value: 1,
						label: '篮球'
					}
				],
				typeS: '',
				dateS: '',
				showType: '',
				dialogVisible: false,
				page: 1,
				page1:1,
				baseList: [],
				loadStatus:'more',
				loading:false
			}
		},
		mounted() {
			this.getUserReserveLiveList()
		},
		watch:{
			typeS(e){
				this.getUserReserveLiveList()
			}
		},
		methods: {
			// 删除预约直播
			deleteReserveLive(item){
				deleteReserveLive({id:item.id}).then(res=>{
					this.getUserReserveLiveList()
					this.$message.success('删除成功')
				}).catch(res=>{})
			},
			// 切换搜索赛程列表
			setSchedule() {
				this.page = 1
				this.baseList = []
				this.showType = this.type
				if (this.type == 1) {
					this.football_match()
				} else {
					this.getList()
				}
			},
			// 获取时间
			getTime(e) {
				console.log(e);
			},
			// 列表时间
			getTime1(e) {
				console.log(e);
			},
			// 触底加载
			load(e) {
				if(this.loadStatus == 'more' && this.loading){
					this.loading = false
					if (this.showType == 1) {
						this.football_match()
					} else {
						this.getList()
					}
				}
			},
			// 预约比赛
			reserveMatch(item) {
				setReserveLive({
					type:this.showType == 1?0:1,
					match_id: item.id
				}).then(res => {
					this.getUserReserveLiveList()
					this.$message.success('预约成功')
				}).catch(res => {})
			},

			// 获取篮球赛程列表
			getList() {
				let data = {
					type: 2,
					page: this.page,
					time: this.value1
				}
				getList(data).then(res => {
					this.baseList = [...this.baseList, ... res.data.data]
					if (res.data.total > this.baseList.length) {
						this.page++
						this.loading = true
						this.loadStatus = 'more'
					} else {
						this.loadStatus = 'noMore'
					}
				}).catch(res => {})
			},
			// 列表分耶2
			sizeChange(e) {
				this.page1 = e
				this.getUserReserveLiveList()
			},
			// 选择日期
			getTime1(){
				this.getUserReserveLiveList()
			},
			// 获取足球赛程列表
			football_match() {
				let data = {
					type: 2,
					page: this.page,
					time: this.value1
				}
				football_match(data).then(res => {
					this.baseList = [...this.baseList, ... res.data.data]
					if (res.data.total > this.baseList.length) {
						this.page++
						this.loading = true
						this.loadStatus = 'more'
					} else {
						this.loadStatus = 'noMore'
					}
				}).catch(res => {})
			},
			// 获取预约直播列表
			getUserReserveLiveList() {
				let data = {
					page:this.page1,
					time:this.dateS,
					type:this.typeS
				}
				getReserveLiveList(data).then(res => {
					this.list = res.data.data
					res.data.data = []
					this.detail = res.data
				}).catch(res => {})
			}
		}
	}
</script>

<style>
	.personal-live-reserve-add-modal .ant-table {
		height: 345px !important;
	}
	.dialog .el-dialog__header {
		display: none !important;
	}
	.dialog .el-dialog__body {
		padding: 0 !important;;
	}
</style>
