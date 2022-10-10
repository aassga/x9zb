<!-- 喇叭消息 -->
<template>
	<div class="i-tabs-container">
		<div class="header-nav nav-bottom-space">
			<a v-for="(item,index) in tabList" :key="index" @click="tabIndex=index">
				<div class="item " :class="index==tabIndex?'first-item left-space':''">{{item}}</div>
			</a>
		</div>
		<div class="tab-pane-item" name="喇叭消息">
			<div class="information-list-container" style="padding-bottom: 80px;">
				<div class="recode">
					<div class="table-container">
						<div class="ant-table-wrapper">
							<div class="ant-spin-nested-loading">
								<div class="ant-spin-container">
									<div class="ant-table">
										<div class="ant-table-container">
											<div class="ant-table-content">
												<table style="table-layout: fixed;">
													<colgroup>
														<col style="width: 150px;">
													</colgroup>
													<thead class="ant-table-thead">
														<tr>
															<th class="ant-table-cell align-center">序号</th>
															<th title="喇叭消息记录"
																class="ant-table-cell align-center ant-table-cell-ellipsis">
																喇叭消息记录</th>
															<th class="ant-table-cell align-center">发送时间</th>
															<th class="ant-table-cell align-center">审核状态</th>
														</tr>
													</thead>
													<tbody class="ant-table-tbody">
														<tr data-row-key="17106"
														v-for="(item,index) in obj.data"
														:key="index"
															class="ant-table-row ant-table-row-level-0">
															<td class="ant-table-cell align-center">
																<div style="color: rgb(153, 153, 153);">{{item.id}}</div>
															</td>
															<td title="666"
																class="ant-table-cell align-center ant-table-cell-ellipsis">
																<div class="ant-table-cell-ellipsis"
																	style="color: rgb(153, 153, 153);">{{item.content}}</div>
															</td>
															<td class="ant-table-cell align-center">
																<div style="color: rgb(153, 153, 153);">{{item.addtime.string}}</div>
															</td>
															<td class="ant-table-cell align-center">
																<div style="color: rgb(153, 153, 153);">{{item.status.string}}</div>
															</td>
														</tr>
													</tbody>
													
												</table>
												<img class="no-data-img" v-if="obj.total == 0" src="../../assets/images/qsy.png"
													alt="no-data" style="margin: 0 auto;">
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div style="position: absolute;bottom: 20px;left: 50%;transform: translateX(-50%);" v-if="obj.total !== 0">
					
					<el-pagination background @current-change="sizeChange" style="text-align: center;" layout="prev, pager, next"
						:total="obj.total">
					</el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {hornList} from '../../api/user.js'
	export default {
		data() {
			return {
				obj:{},
				page:1,
				tabIndex: 0,
				tabList: ['喇叭消息']
			}
		},
		mounted() {
			this.hornList()
		},
		methods:{
			hornList(){
				hornList({page:this.page}).then(res=>{
					this.obj = res.data
				}).catch(res=>{})
			},
			sizeChange(e){
				this.page = e
				this.hornList()
			}
		}
	}
</script>

<style>
</style>
