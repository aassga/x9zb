<!-- 开播 -->
<template>
	<div class="star-lLive-page" style="position: relative;">
		<div class="start-live-btn" style="z-index: 3;" @click="dialogVisible = true,reSet(),status=''"><img
				class="start-live-img"
				src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAdVJREFUWAntV71KA0EQzolapfEHfIBgIwiKD+B1PkBKn8LayicQyxBS2doIFumtBSsFEUHQQjD+oYhRc36DGRkGk53JrXLFLQw7MzvfN3NzOxetVAwry7IqpAm5g3gXYQhbNaSyhYCs4a3il/iGJVtiCQL5LeJmIBuQYwtGxCxB34Z0kiSZFf7RVfG0qZcF2JTxFuyYJeg/Y8qCQt0uXIfGQxWr8zlc0HPlW8T0vLIP5y3oq2xjPxR6UPUW9AzGHcX6rux92PLTEP8t8NhiT1XyoEkYxgeDERC/ekvWITGFK8h7h6bR/j31gOu41G/sw/km9GW2sV8IPah6C+qB8VGxZsp+UTFddZ7f5EuJPfWyEYbxFmzh7lBZUOi1eS81TdmBIq2rKdvC+YqIORN6UPUW9AnGS8Wqp+xGxTyp+PwmTwlNjJeNMIy3YMtLHepS2aFYHfr5izBEOOQ8Bsc3PaakzZOSY28PKdZ3hCJqkNMcxRC2Zslq+leaiEBIH9EFyBTZYjWhz0M6kLrws3oP5QRf8w92/OmOQo/6nbuOkahwY+9+KHTjAdIV0ut3iDbpJ33Nm8D740r8k5CJAYm03/0G3IABhURzj9KhXWSnLlnWlSVIxnwBY+bsFQp1eDgAAAAASUVORK5CYII="
				alt="">我要开播</div>
		<div></div>
		<div class="i-tabs-container">
			<div class="header-nav"><a>
					<div class="item first-item ">开播记录</div>
				</a></div>
			<div class="tab-pane-item" name="开播记录">
				<div class="star-live-page-recode" style="padding-bottom: 80px;">
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
															<col style="width: 88px;">
															<col style="width: 88px;">
															<col style="width: 88px;">
															<col style="width: 88px;">
															<col style="width: 88px;">
															<col style="width: 88px;">
															<col style="width: 88px;">
															<col style="width: 88px;">
															<col style="width: 88px;">
															<col style="width: 88px;">
															<col style="width: 88px;">
															<col style="width: 88px;">
															<col style="width: 88px;">
														</colgroup>
														<thead class="ant-table-thead">
															<tr>
																<!-- <th class="ant-table-cell align-center">直播分类</th> -->
																<th class="ant-table-cell align-center">赛事分类</th>
																<th title="赛事名称"
																	class="ant-table-cell align-center ant-table-cell-ellipsis">
																	赛事名称</th>
																<th title="主场"
																	class="ant-table-cell align-center ant-table-cell-ellipsis">
																	主场</th>
																<th title="客场"
																	class="ant-table-cell align-center ant-table-cell-ellipsis">
																	客场</th>
																<th title="开赛时间"
																	class="ant-table-cell align-center ant-table-cell-ellipsis">
																	开赛时间</th>
																<th class="ant-table-cell align-center">直播状态</th>
																<th title="直播标题"
																	class="ant-table-cell align-center ant-table-cell-ellipsis">
																	直播标题</th>
																<th class="ant-table-cell align-center">直播时长</th>
																<th class="ant-table-cell align-center">观看人数</th>
																<th class="ant-table-cell align-center">获得钻石</th>
																<!-- <th class="ant-table-cell align-center">获得球票</th> -->
																<th title="操作"
																	class="ant-table-cell align-center ant-table-cell-ellipsis">
																	操作</th>
															</tr>
														</thead>
														<tbody class="ant-table-tbody">
															<tr data-row-key="1313711" v-for="(item,index) in list.data"
																:key="index"
																class="ant-table-row ant-table-row-level-0">
																<td class="ant-table-cell align-center">
																	{{item.typeName}}
																</td>
																<!-- <td class="ant-table-cell align-center">
																	<div style="color: rgb(153, 153, 153);">足球</div>
																</td> -->
																<td
																	class="ant-table-cell align-center ant-table-cell-ellipsis">
																	<a class=""
																		style="color: rgb(153, 153, 153);">{{item.name}}</a>
																</td>
																<td
																	class="ant-table-cell align-center ant-table-cell-ellipsis">
																	<a
																		style="color: rgb(153, 153, 153);">{{item.home_name}}</a>
																</td>
																<td
																	class="ant-table-cell align-center ant-table-cell-ellipsis">
																	<a
																		style="color: rgb(153, 153, 153);">{{item.away_name}}</a>
																</td>
																<td
																	class="ant-table-cell align-center ant-table-cell-ellipsis">
																	<a class=""
																		style="color: rgb(153, 153, 153);">{{item.match_time}}</a>
																</td>
																<td class="ant-table-cell align-center">
																	<div style="color: rg	b(153, 153, 153);">
																		{{item.isliveName}}
																	</div>
																</td>
																<td
																	class="ant-table-cell align-center ant-table-cell-ellipsis">
																	<a class=""
																		style="color: rgb(153, 153, 153);">{{item.title}}</a>
																</td>
																<td class="ant-table-cell align-center">
																	{{item.live_duration}}
																</td>
																<td class="ant-table-cell align-center">{{item.viewers}}</td>
																<td class="ant-table-cell align-center">
																	<div class="" style="color: rgb(255, 108, 0);">
																		{{item.hotvotes}}
																	</div>
																</td>
																<!-- <td class="ant-table-cell align-center">
																	<div class="" style="color: rgb(0, 214, 120);">0
																	</div>
																</td> -->
																
																<td title="开播设置"
																v-if="item.islive != 2"
																	class="ant-table-cell align-center ant-table-cell-ellipsis"
																	style="cursor: pointer;">
																	<span @click="setItem(item)">设置</span>
																	<span
																		style="margin-left: 10px;"
																		@click="setRoom(item)"
																		:style="{color: item.islive == 0?'rgb(0, 214, 120)':'rgb(255, 108, 0)'}">{{item.islive == 0?'开播':'关播'}}</span>
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
					<ul class="ant-pagination" unselectable="unselectable">
						<el-pagination background @current-change="sizeChange" layout="prev, pager, next"
							:total="list.total">
						</el-pagination>
					</ul>
					<div></div>
				</div>
			</div>
		</div>

		<el-dialog title="开播设置" :center="true" custom-class="dialog" :visible.sync="dialogVisible" width="width: 1058px;">
			<div role="document" class="ant-modal star-live-setting" style="width:860px;top: 0;">
				<div tabindex="0" aria-hidden="true" style="width: 0px; height: 0px; overflow: hidden; outline: none;">
				</div>
				<div class="ant-modal-content">
					<div class="ant-modal-header">
						<div class="ant-modal-title" id="rcDialogTitle2">开播设置</div>
					</div>
					<div class="ant-modal-body">
						<div class="dialog-content setting">
							<form class="ant-form ant-form-horizontal">
								<div class="ant-row ant-form-item" style="row-gap: 0px;">
									<div class="ant-col ant-form-item-label"><label for="form_liveGroupId"
											class="ant-form-item-required" title="直播分类:">直播分类</label></div>
									<el-select v-model="type" placeholder="请选择" style="width: auto;">
										<el-option v-for="(item,index) in options" :key="index" :label="item.label"
											:value="item.value">
										</el-option>
									</el-select>
								</div>
								<div class="ant-row ant-form-item " v-if="type != 2">
									<div class="ant-col ant-form-item-label"><label for="form_matchInfo"
											class="ant-form-item-required" title="选择赛事:">选择赛事</label></div>
									<div class="ant-col ant-form-item-control">
										<div class="ant-form-item-control-input">
											<div class="ant-form-item-control-input-content">
												<div class="container" id="form_matchInfo">
													<div class="like-ant-input">{{selectTitle?selectTitle:'选择赛事'}}</div>
													<div class="op" @click="dialogVisible1 = true">查询</div>
													<div class="op btnss" :data-clipboard-text="selectTitle" @click="copy">复制名称</div>
												</div>
											</div>
										</div>
									</div>
									<!-- <div class="ant-col ant-form-item-control">
										<div class="ant-form-item-control-input">
											<div class="ant-form-item-control-input-content">
												<el-select v-model="match_id" placeholder="请选择" style="width: auto;" v-selectLoadMore="loadMore">
													<el-option v-for="item in selectList" :key="item.id" :label="item.home_team_name_zh + ' ' + '-' + ' ' + item.away_team_name_zh"
														:value="item.id"> 
													</el-option>
												</el-select>
												
											</div>
										</div>
									</div> -->
								</div>
								<div class="ant-row ant-form-item" style="row-gap: 0px;">
									<div class="ant-col ant-form-item-label"><label for="form_title"
											class="ant-form-item-required" title="开播时间:">开播时间</label></div>
									<div class="ant-col ant-form-item-control">
										<div class="ant-form-item-control-input">
											<div class="ant-form-item-control-input-content">
												<el-date-picker
													v-model="starttime"
													type="datetime"
													:picker-options="{
														disabledDate: time => {
															return time.getTime() < Date.now() - 3600 * 1000 * 24
														}
													}"
													placeholder="开播时间"
													@change="selectStartTime"
												></el-date-picker>
											</div>
										</div>
									</div>
								</div>
								<div class="ant-row ant-form-item" style="row-gap: 0px;">
									<div class="ant-col ant-form-item-label"><label for="form_title"
											class="ant-form-item-required" title="直播标题:">直播标题</label></div>
									<div class="ant-col ant-form-item-control">
										<div class="ant-form-item-control-input">
											<div class="ant-form-item-control-input-content"><input v-model="title"
													maxlength="30" placeholder="直播标题" type="text" id="form_title"
													class="ant-input" value=""></div>
										</div>
									</div>
								</div>
								<div class="ant-row ant-form-item img-form-item" style="row-gap: 0px;">
									<div class="ant-col ant-form-item-label"><label class="ant-form-item-required"
											title="直播间封面:">直播间封面</label>
									</div>
									<div class="ant-col ant-form-item-control">
										<div class="ant-form-item-control-input">
											<div class="ant-form-item-control-input-content">
												<span class="">
													<el-upload class="avatar-uploader"
														:action="'/qiniu/'" :data="QiniuToken"
														:show-file-list="false" :on-success="handleAvatarSuccess"
														:before-upload="beforeAvatarUpload">
														<img style="width: 166px;height: 94px;" :src="thumb"
															v-if="thumb">
														<div v-else
															class="ant-upload ant-upload-select ant-upload-select-text">
															<span tabindex="0" class="ant-upload" role="button"><input
																	type="file" accept=".png,.jpg,.jpeg"
																	style="display: none;">
																<div class="add-pic">
																	<span role="img" aria-label="plus"
																		class="anticon anticon-plus"
																		style="font-size: 40px;">

																		<svg viewBox="64 64 896 896" focusable="false"
																			data-icon="plus" width="1em" height="1em"
																			fill="currentColor" aria-hidden="true">
																			<defs>
																			</defs>
																			<path
																				d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z">
																			</path>
																			<path
																				d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z">
																			</path>
																		</svg>
																	</span>
																</div>
															</span>
														</div>


													</el-upload>

												</span>
												<div class="upload-tips">支持png、jpg格式图片大小不超过5M</div>
											</div>
										</div>
									</div>
								</div>
								<div class="ant-row ant-form-item" style="row-gap: 0px;">
									<div class="ant-col ant-form-item-label"><label class="" title="推流服务器地址:">推流服务器地址</label>
									</div>
									<div class="ant-col ant-form-item-control">
										<div class="ant-form-item-control-input">
											<div class="ant-form-item-control-input-content">
												<input disabled :value="urlDomain" type="text" class="ant-input ant-input-disabled">
												<div class="op btnss" :data-clipboard-text="urlDomain" @click="copy">复制
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="ant-row ant-form-item" style="row-gap: 0px;">
									<div class="ant-col ant-form-item-label"><label class="" title="串流密钥:">串流密钥</label>
									</div>
									<div class="ant-col ant-form-item-control">
										<div class="ant-form-item-control-input">
											<div class="ant-form-item-control-input-content">
												<input disabled :value="urlKeys" type="text" class="ant-input ant-input-disabled">
												
												<div class="op btnss" :data-clipboard-text="urlKeys" @click="copy">复制
												</div>
												<br/>
												<div class="op" @click="getLiveUrl()">获取推流地址</div>
												<!-- <button class="btnss" data-clipboard-text="我是可以复制的内容，请点击复制" @click="copy">立即阅读</button> -->
												<!-- <div class="op" @click="getLiveUrl()">获取推流地址</div> -->
											</div>
										</div>
									</div>
								</div>
								<div class="live-status-item-wrap">
									<div class="ant-row ant-form-item" style="row-gap: 0px;">
										<div class="ant-col ant-form-item-label"><label class=""
												title="直播状态：">直播状态</label>
										</div>
										<div class="ant-col ant-form-item-control">
											<div class="ant-form-item-control-input">
												<div class="ant-form-item-control-input-content">
													<div style="display: flex; margin-top: 9px;"><span
															class="live-status">
															<div class="live-status-img"></div>
														</span><span class="live-status-word isLiveText">未直播</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div  class="ant-row ------------rowData---------------anchorInfo?.status=0"
									style="row-gap: 0px;">
									<div class="btns">
										<div class="btn" @click="dialogVisible=false">取消</div>
										<div @click="submit()" class="ant-btn btn" style="padding: 0 15px;"><span>{{status == 'edit' ?'完成':'确 定'}}</span></div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div tabindex="0" aria-hidden="true" style="width: 0px; height: 0px; overflow: hidden; outline: none;">
				</div>
			</div>

		</el-dialog>


		<el-dialog title="选择赛事" :center="true" width="800px" custom-class="dialog" :visible.sync="dialogVisible1">
			<div class="ant-modal-body star-live-setting">
				<div class="dialog-content setting" style="padding-top: 0px; padding-bottom: 10px;">
					<div class="container">
						<div class="list">
							<div>
								<div class="titleBox">
									<ul class="spaceTab-base">
										<li class="spaceTab-active">{{type == 1?'篮球':'足球'}}<div class="active-bottom"></div>
										</li>
									</ul>
								</div>
								<div style="padding-right: 5px;">
									<div class="item title-box">
										<div class="title-countryName">赛事名称</div>
										<div class="title-time">比赛时间</div>
										<div class="title-host">主队名称</div>
										<div class="vs"></div>
										<div class="title-guest">客队名称</div>
									</div>
									<div class="items">
										<div class="item " :class="GameIndex == item.id?'active':''" v-for="(item,index) in selectList" :key="index" @click="getActive(item)">
											<div class="radio"></div>
											<div class="img">
												<div class="lazyload-wrapper "><img
														v-if="item.isShow"
														src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA2CAYAAACbZ/oUAAAAAXNSR0IArs4c6QAABNtJREFUaAXtml9oHEUcx2fmbntH26CkUlAqacUzl0uKNk/VvqkVfLi9a0vRh75INYVqi5Qi4h+MQtEn/1AQDE19qVI5ku7uiQ8W9EEfipJEEC8XU2qCsSktkVJtTHJ3O37n7G0nZ+Guezu3m2sGwv72N7vz+31mfjPzm70QslpWe6CleoBWaDjnNJ9KPc8J2Q9dN+F8faVuRV4p/Rt+/wLAwbhpnqCUAo2QMnBu9+57abF4CtCPr0i4Gk4D9hseDu9LDA/PMjGyrQwr+kIM5A1GSsd1/QUoBmp0UktUY6T72I052xJAtSAEK8ND3bUebKH6brbiV+PbGQ3sPGKE76iiEngei8Q58t9+GJhOVQIM0N8i0WhXl2U9qnV03MMofRPgS0GgprlkspyBeOkMgA8AdtlWN5lKJYqcD2IL3O6lrdttS80Ic36+2pGYaebivb07CGNHUDdfXd+seyXACN9bRg3t77cTpvlBeM2arYiCb5sFKdtRAyxZyOn6zolU6hlJRR4aGrqAhP4JEfpI5q/Jdapl5cAA2FCy7dNIYc28rt9XAQIsF/OcRaMJyF9W9KqvzQAuM2Cx0hHnuXwyKY6fTunMZP4AeBIr+T6AzzkVioSmAQv/AX2XTcgJhPlZgG+RmeKW9Vk4EumC7gtZ77XcVGDHec6fBPjP+OBwmPf3Oz7EMpkriWz2WSjSGO1Z53kPBceYh23W29Q627Y/yo+OfjexZ09cfimezZpRxhJY7U/Kei9kP4HL/iPMH7OXln4aTyZfw2iHK1BbDONqwrL2A/opjPbFir7Rq+/AAgCLWQR/x8ZHR3/4NZ1+RIYC9FmmaWILK8l6t3IggB3nOd9WLJV+xNx+3dFB6BwayiMSRmSdWzlYwKBAIvJ9iNLT1UAY4Y3VOjf3zpxx87KX75QzLsZeiRvGAOAQ4TdLeX5zvvmmxr0UFOCvwpp2IDY8PINFyqERn49JofAx6NOOskHBV2CM5BzwXkbScaqaA/P4ObtYfB/6u6vrGrn3DRiwGS0UeunBM2cuywDj6fRmYtsD2KN3ynqv5KYDA3SWMXaw0zAMGUJkXPmRkRd5qfQu9OvkOi/lpgIjfD9FBnVEJBUyBE5Rnci4BjFXd8h6FXKzgKdpKNTXZRhfyxAis8qPjR3ltv0WYKNynSpZOTBl7NwGTevZmMmIX/OcMrFr18MI4ZMA7XWUTRCUA2NUp2SOyUOHIoXp6TdKxeKr0Cu3L9sWsiqDbdWGxD2+kG4vTE2JE5A49/pSlADjrPs0aKwK0cW+vrXXLl06hvA9jJzY13RWzXdpcQCi9J0QYwb20x5Avg3YByod4OdVCbCfQLVs+xpetZxTUX/nASP7WVDRk0FsU7Ay/EvLhSA6p8InwcpAnVHReBDbFKws2t7+Hk4wE0F00EufBGOZVTQ6qevbCoSY+Gngfi+NBKYtSn/XCEnFLGusvEoLQWtr68GQfwInrwfG0cYduS6YBJtgFM3hfnkRyX1xZqYDo33LfHj50wG+o/Sv8KZN07HjxxcD7OWqa573wP9Cul4Ll/fuXf/n4mIah4K19b7jxXNweL49EjGqPyjU27br4+HcwsLngE3Wa8ir52CTwHYWF91Nm65zaWQtvh3iG7HtGhjn3Q+xmf/jppcbeadsE7bdtvEvUTWIm7J2kyAAAAAASUVORK5CYII=">
												</div>
											</div>
											<div class="countryName ellipsis ">{{item.competition_name_zh}}</div>
											<div class="time">{{item.match_time}} </div>
											<div class="host ellipsis">{{item.home_team_name_zh}}</div>
											<div class="vs">-</div>
											<div class="guest ellipsis">{{item.away_team_name_zh}}</div>
										</div>
										
									</div>
								</div>
							</div>
							<div class="_btns">
								<div class="cancel" @click="dialogVisible1=false">取消</div>
								<div class="ok" @click="dialogVisible1=false">确定</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		getLiveUrl,
		createRoom,
		getRoomList,
		startRoom,
		endRoom,
		endRoomInfo,
		updateLive
	} from '../../api/user.js'
	import {
		football_match,
	} from '../../api/football.js'
	import {
		getList
	} from '../../api/basketball.js'
	import Clipboard from "clipboard";

	export default {
		directives: {
			'el-select-loadmore': {
				inserted(el, binding) {
					const SELECTWRAP_DOM = el.querySelector(
						'.el-select-dropdown .el-select-dropdown__wrap'
					);
					SELECTWRAP_DOM.addEventListener('scroll', function() {
						const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
						if (condition) {
							binding.value();
						}
					});
				}
			}
		},
		data() {
			return {
				id: '',
				url: '',
				urlDomain: '',
				urlKeys: '',
				list: [],
				status: '',
				starttime: null, //開播時間
				title: '', //赛题
				thumb: '', //直播封面
				options: [{
						value: 0,
						label: '足球'
					},
					{
						value: 1,
						label: '篮球'
					},
					{
						value: 2,
						label: '其它'
					}
				],
				GameIndex: '',
				selectGameStartTime: null,
				match_id: null,
				selectList: [],
				type: null, //赛事分类
				QiniuToken: {},
				page: 1,
				selectTitle:'',//选中的赛事标题
				pages: 1, //开播下拉分页
				loadStatus: 'more',
				dialogVisible: false,
				dialogVisible1:false,
			}
		},
		watch: {
			type(e) {
				this.pages = 1
				this.selectList = []
				if (e == 0) { //足球
					this.football_match()
				} else if (e == 1) {
					this.getList()
				}
			}
		},
		mounted() {
			// 获取七牛token
			this.getQiniu()
			this.getRoomList()
		},
		methods: {
			async getQiniu(){
				let QiniuToken = this.$store.state.user.QiniuToken
				if(JSON.stringify(QiniuToken) === '{}'){
					const { code, data } = await this.$store.dispatch('user/SET_QINIU_TOKEN')
					if(code === 0){
						this.QiniuToken = data
					}
				}else{
					this.QiniuToken = QiniuToken;
				}
			},
			// 选择赛事
			// <div class="countryName ellipsis ">{{item.competition_name_zh}}</div>
			// <div class="time">{{item.match_time}} </div>
			// <div class="host ellipsis">{{item.home_team_name_zh}}</div>
			// <div class="vs">-</div>
			// <div class="guest ellipsis">{{item.away_team_name_zh}}</div>
			getActive(item){
				this.selectTitle = item.competition_name_zh + ' ' + ' ' + item.match_time + ' ' + item.home_team_name_zh + ' - ' + item.away_team_name_zh
				this.GameIndex = item.id
				this.starttime = new Date(item.time * 1000)
				this.selectGameStartTime = new Date(item.time * 1000)
			},
			selectStartTime(val) {
				//允许主播调整调整开赛时间，赛事开始前进行直播
				this.starttime = val
				// let now = new Date();

				// if (this.selectGameStartTime == null) {
				// 	// 沒選擇賽事時, 選擇過去時間帶入當前時間
				// 	if (val < now) {
				// 		this.starttime = now
				// 	}
				// } else {
				// 	// 有選擇賽事時, 選擇過去時間帶入比賽時間
				// 	if (val < this.selectGameStartTime) {
				// 		this.starttime = this.selectGameStartTime
				// 	}
				// }
			},
			
			// 开/关播
			setRoom(item) {
				let data = {
					name:item.title,
					id:item.id
				}
				
				if (item.islive == 0) { //item.islive == 0需要开播
					// item.islive = 1
					startRoom({
						id: item.id
					}).then(res => {
						// this.$store.dispatch('createGroup',data)
						this.$message.success('已开启直播')
					}).catch(res => {

					})
				} else { //关播
					// item.islive = 0
					endRoom({
						id: item.id
					}).then(res => {
						this.$message.success('已关闭直播')
					}).catch(res => {

					})
				}
				setTimeout(res => {
					this.getRoomList()
				}, 500)
			},

			sizeChange(e) {
				this.page = e
				this.getRoomList()
			},
			setItem(item) {
				this.status = 'edit'
				// endRoomInfo({id:item.id}).then(res=>{ }).catch(res=>{})
				this.id = item.id
				this.url = item.push
				this.type = item.type
				this.thumb = item.thumb
				this.title = item.title
				this.match_id = item.match_id
				this.GameIndex = item.match_id
				this.starttime = new Date(item.starttime * 1000)
				this.selectGameStartTime = new Date(item.starttime * 1000)
				this.dialogVisible = true
				this.setUrl()
				// console.log(item);
				// data.id = this.id
				// data.type = this.type
				// data.thumb = this.thumb
				// data.title = this.title
				// data.match_id = this.GameIndex
			},
			reSet() {
				this.id = ''
				this.url = ''
				this.urlDomain = ''
				this.urlKeys = ''
				this.type = ''
				this.thumb = ''
				this.title = ''
				this.match_id = ''
				this.GameIndex = ''
				this.selectGameStartTime = null
				this.starttime = new Date()
				this.selectTitle = ''
			},
			// 赛事触底加载
			loadMore(e) {
				if (this.loadStatus == 'more') {
					if (this.type == 0) { //足球
						this.football_match()
					} else if (this.type == 1) {
						this.getList()
					}
				}
			},
			// 获取开播记录
			getRoomList() {
				let data = {
					page: this.page,
				}
				getRoomList(data).then(res => {

					this.list = res.data
					// this.obj = res.data
				}).catch(res => {})
			},

			// 获取足球
			football_match() {
				let data = {
					type: 0,
					is_web:1
				}
				football_match(data).then(res => {
					// console.log(this.pages);
					// this.selectList = res.data.data
					let selectList = []
					let list1 = []
					let list2 = []
					res.data.data.forEach(item=>{
						let status = item.status
						item.isShow = false
						item.match_time = this.$common.timeStamp(item.time)
						if(status == 2 || status == 3 || status == 4 || status == 5 || status == 6 || status == 7){
							item.isShow = true //当天的显示
							list1.push(item)
						}else if(status == 1){
							list2.push(item)
						}
					})
					// list1.reverse()
					// list2.reverse()
					selectList = selectList.concat(list1).concat(list2)
					this.selectList = selectList
				}).catch(res => {

				})
			},
			// 获取篮球
			getList() {
				let data = {
					type: 0,
					isWeb:1
				}
				getList(data).then(res => {
					let selectList = []
					let list1 = []
					let list2 = []
					res.data.data.forEach(item=>{
						item.isShow = false
						item.home_team_name_zh = item.home_team_data.short_name_zh
						item.away_team_name_zh = item.away_team_data.short_name_zh
						item.competition_name_zh = item.short_name_zh
						let id = item.status_id
						if (id == 2 || id == 3 || id == 4 || id == 5 || id == 6 || id == 7 || id == 8 || id == 9){
							list1.push(item)
							item.isShow = true //当天的显示
						}
						if(id == 1){
							list2.push(item)
						}
					})
					// list1.reverse()
					// list2.reverse()
					selectList = selectList.concat(list1).concat(list2)
					this.selectList = selectList
				}).catch(res => {

				})
			},
			// 上传图片回调
			beforeAvatarUpload(file) {
				const fileName =
					new Date().valueOf().toString() +
					this.$common.rand() +
					file.name.slice(file.name.lastIndexOf("."));
				this.QiniuToken.data = file;
				this.QiniuToken.key = `${fileName}`;
			},
			// 上传图片回调
			handleAvatarSuccess(res, file) {
				this.thumb = `${this.QiniuToken.domain}/${res.key}`
			},
			// 获取推流地址
			getLiveUrl() {
				getLiveUrl().then(res => {
					this.url = res.data.url
					this.id = res.data.id
					this.setUrl();
				}).catch(res => {

				})
			},
			setUrl() {
				if (this.url.indexOf('live/') != -1) {
					let urlSplit = this.url.split('live/');
					this.urlDomain = `${urlSplit[0]}live/`;
					this.urlKeys = urlSplit[1];
				} else {
					this.urlDomain = '';
					this.urlKeys = '';
				}
			},
			// 提交
			submit() {
				let data = {}
				if (this.GameIndex == null) {
					return this.$message.warning('请选中直播分类')
				}
				if (!this.title) {
					return this.$message.warning('请输入直播标题')
				}
				if (!this.thumb) {
					return this.$message.warning('请上传直播封面')
				}
				if (this.starttime == null) {
					return this.$message.warning('请选择开播时间')
				}
				data.id = this.id
				data.type = this.type
				data.thumb = this.thumb
				data.title = this.title
				data.match_id = this.GameIndex
				data.starttime = parseInt(this.starttime.valueOf() / 1000);
				/* 编辑 */
				if(this.status == 'edit') {
					updateLive(data).then(res => {
						this.dialogVisible = false
						this.$message.success('编辑成功')
						setTimeout(res => {
							this.getRoomList()
						}, 2000)
					}).catch(res => {})
				}else {
					createRoom(data).then(res => {
						this.dialogVisible = false
						this.$message.success('创建成功')
						setTimeout(res => {
							this.getRoomList()
						}, 2000)
					}).catch(res => {})
				}
				// console.log();
				
			},

			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			// 复制
			copy() {
				
				var _this = this;
				var clipboard = new Clipboard(".btnss"); //单页面引用
				console.log(clipboard);
				// 　　　var clipboard = new this.Clipboard(".btn"); //在main.js中引用
				clipboard.on("success", e => {
					// 释放内存
					_this.$message.success('复制成功')
					clipboard.destroy();
				});
				clipboard.on("error", e => {
					// 不支持复制
					Message({
						message: "该浏览器不支持自动复制",
						type: "warning"
					});
					// 释放内存
					clipboard.destroy();
				});
			},
		}
	}
</script>

<style>
	.ant-modal {
		padding-bottom: 0 !important;
	}
	.dialog .el-dialog__header {
		display: none !important;
	}
	.dialog .el-dialog__body {
		padding: 0 !important;;
	}

	/* .el-select-dropdown {
	    top: auto !important;
	} */
</style>
