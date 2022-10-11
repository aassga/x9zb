<!-- 我的钱包 -->
<template>
	<div class="i-tabs-container">
		<!-- 充值界面 -->
		<div class="wallet-recharge-container" style="min-height: auto;" v-if="index">
			<div class="wallet-pay">
				<div class="title">充值购买</div>
				<div class="form">
					<div class="form-item">
						<div class="label" style="line-height: 80px;">购买数量：</div>
						<div class="value">
							<div class="buy-num-component" :class="index == lesIndex?'active':''"
								@click="lesIndex = index" v-for="(item,index) in lesList" :key="index">
								<div class="buy-number">{{item.coin}}<span class="unit">钻石</span></div>
								<div class="buy-amount">￥{{item.money}}</div>
							</div>

							<!-- <div class="input-box"><input type="text" placeholder="请输入购买钻石数量" value=""></div> -->
						</div>
					</div>
					<div class="form-item pay-method-box">
						<div class="label" style="line-height: 55px;">支付方式：</div>
						<div class="value">
							<div class="buy-type-component">
								<div class="buy-type-component-item" :class="payIndex == 0?'active':''"
									@click="payIndex = 0"><img class="icon" src="../../assets/images/weChat.png" alt="">
								</div>
								<p class="label">微信扫码</p>
							</div>
							<div class="buy-type-component">
								<div class="buy-type-component-item" :class="payIndex == 1?'active':''"
									@click="payIndex = 1"><img class="icon" src="../../assets/images/alipay.png" alt="">
								</div>
								<p class="label">支付宝扫码</p>
							</div>
						</div>
					</div>
					<div class="form-item">
						<div class="label">应付金额：</div>
						<div class="value" style="align-items: center;"><span class="price"
								v-if="lesList[lesIndex]">{{lesList[lesIndex].money}}</span>元</div>
					</div>
					<div class="form-item">
						<div class="label"></div>
						<div class="value">
							<button class="i-button i-primary-button " @click="payUrl()">立即支付</button>
							<!-- <button class="i-button i-primary-button " @click="getUrl()">立即支付</button> -->
						</div>
					</div>
				</div>
			</div>
		</div>

		<div v-else>
			<div class="header-nav nav-bottom-space" style="margin-bottom: 0;">
				<a v-for="(item,index) in tabList" :key="index" @click="tabIndex=index">
					<div class="item" :class="[{'first-item':index==tabIndex},{'first-active':index!=0}]">{{item}}</div>
					<!-- <div class="item first-active" :class="index==tabIndex?'first-item left-space':''">{{item}}</div> -->
				</a>
			</div>

			<el-dialog title="" :center="true" custom-class="dialog"  :visible.sync="dialogVisible" width="width: 700px;">
				<div role="document" class="ant-modal wallet-bind-bank-card-modal"
					style="width: 547px; transform-origin: 393px 443px;position: absolute; top: 50px;left: 20%;">
					<div tabindex="0" aria-hidden="true"
						style="width: 0px; height: 0px; overflow: hidden; outline: none;">
					</div>
					<div class="ant-modal-content">
						<div class="ant-modal-body">
							<div class="title">绑定{{type == 0?'银行卡账号':'支付宝'}}</div>
							<div class="text">验证码将发送到您的手机：{{infos.mobile}}</div>
							<form class="ant-form ant-form-horizontal" v-if="type == 0">
								<div class="ant-row ant-form-item gray-block-container" style="row-gap: 0px;">
									<div class="ant-col ant-form-item-label"><label for="bank"
											class="ant-form-item-required" title="银行：">银行名称</label></div>
									<div class="ant-col ant-form-item-control">
										<div class="ant-form-item-control-input">
											<div class="ant-form-item-control-input-content"><input
													v-model="bindBankFrom.bank_name" maxlength="25"
													placeholder="请输入银行名称" type="text" id="bankNum"
													class="ant-input ant-input-lg" value=""></div>
										</div>
									</div>
								</div>
								<div class="ant-row ant-form-item" style="row-gap: 0px;">
									<div class="ant-col ant-form-item-label"><label for="bankNum"
											class="ant-form-item-required" title="银行卡号：">银行卡号</label></div>
									<div class="ant-col ant-form-item-control">
										<div class="ant-form-item-control-input">
											<div class="ant-form-item-control-input-content"><input
													v-model="bindBankFrom.card_number" maxlength="25"
													placeholder="请输入银行卡号" type="text" id="bankNum"
													class="ant-input ant-input-lg" value=""></div>
										</div>
									</div>
								</div>
								<div class="ant-row ant-form-item" style="row-gap: 0px;">
									<div class="ant-col ant-form-item-label"><label for="name"
											class="ant-form-item-required" title="姓名：">姓名</label></div>
									<div class="ant-col ant-form-item-control">
										<div class="ant-form-item-control-input">
											<div class="ant-form-item-control-input-content"><input
													v-model="bindBankFrom.name" placeholder="请输入银行卡号对应的名字" type="text"
													id="name" class="ant-input ant-input-lg" value=""></div>
										</div>
									</div>
								</div>
								<div class="ant-row ant-form-item" style="row-gap: 0px;">
									<div class="ant-col ant-form-item-label"><label for="idNum"
											class="ant-form-item-required" title="身份证号码：">身份证号码</label></div>
									<div class="ant-col ant-form-item-control">
										<div class="ant-form-item-control-input">
											<div class="ant-form-item-control-input-content"><input
													v-model="bindBankFrom.id_card" maxlength="18" placeholder="请输入身份证号码"
													type="text" id="idNum" class="ant-input ant-input-lg" value="">
											</div>
										</div>
									</div>
								</div>
								<div class="ant-row ant-form-item" style="row-gap: 0px;">
									<div class="ant-col ant-form-item-label"><label for="verifyCode"
											class="ant-form-item-required" title="验证码：">验证码</label></div>
									<div class="ant-col ant-form-item-control">
										<div class="ant-form-item-control-input">
											<div class="ant-form-item-control-input-content">
												<div class="wallet-verify-input"><input v-model="bindBankFrom.code"
														maxlength="6" placeholder="请输入验证码" type="text"
														class="ant-input ant-input-lg" value="">
													<div class="btn get-verify-btn" @click="count == 0?getCode(4):''">
														{{count == 0?'获取验证码':count + 's'}}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="pay-password-btn-group">
									<div class="btn ok" data-id="handleSubmit" @click="BindBank()">确定</div>
									<div class="btn cancel" @click="dialogVisible=false">取消</div>
								</div>
							</form>
							<form class="ant-form ant-form-horizontal" v-if="type == 1">
								<div class="ant-row ant-form-item gray-block-container" style="row-gap: 0px;">
									<div class="ant-col ant-form-item-label"><label for="bank"
											class="ant-form-item-required" title="银行：">支付宝账号</label></div>
									<div class="ant-col ant-form-item-control">
										<div class="ant-form-item-control-input">
											<div class="ant-form-item-control-input-content"><input
													v-model="ali.info" maxlength="25"
													placeholder="请输入支付宝账号" type="text" id="bankNum"
													class="ant-input ant-input-lg" value=""></div>
										</div>
									</div>
								</div>
								<div class="ant-row ant-form-item gray-block-container" style="row-gap: 0px;">
									<div class="ant-col ant-form-item-label"><label for="bank"
											class="ant-form-item-required" title="银行：">真实姓名</label></div>
									<div class="ant-col ant-form-item-control">
										<div class="ant-form-item-control-input">
											<div class="ant-form-item-control-input-content"><input
													v-model="ali.name" maxlength="25"
													placeholder="请输入真实姓名" type="text" id="bankNum"
													class="ant-input ant-input-lg" value=""></div>
										</div>
									</div>
								</div>
								<div class="ant-row ant-form-item" style="row-gap: 0px;">
									<div class="ant-col ant-form-item-label"><label for="verifyCode"
											class="ant-form-item-required" title="验证码：">验证码</label></div>
									<div class="ant-col ant-form-item-control">
										<div class="ant-form-item-control-input">
											<div class="ant-form-item-control-input-content">
												<div class="wallet-verify-input"><input v-model="ali.code"
														maxlength="6" placeholder="请输入验证码" type="text"
														class="ant-input ant-input-lg" value="">
													<div class="btn get-verify-btn" @click="count == 0?getCode(7):''">
														{{count == 0?'获取验证码':count + 's'}}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="pay-password-btn-group">
									<div class="btn ok" data-id="handleSubmit" @click="Bindalipay()">确定</div>
									<div class="btn cancel" @click="dialogVisible=false">取消</div>
								</div>
							</form>
						</div>
					</div>
					<div tabindex="0" aria-hidden="true"
						style="width: 0px; height: 0px; overflow: hidden; outline: none;">
					</div>
				</div>
			</el-dialog>


			<div class="tab-pane-item" v-if="tabIndex ==0" name="消费明细">
				<div class="wallet-consume-detail" style="padding-bottom: 10px;padding-top: 0;">
					<div class="tickets-history flex-start" style="padding-top: 20px;">
						
						<div class="btn-container " style="margin-bottom: 0px;">
							时间：
							<el-date-picker
							      v-model="selectTime"
							      type="daterange"
							      range-separator="至"
								  @change="getSelectTime"
								  value-format="yyyy-MM-dd"
							      start-placeholder="开始日期"
							      end-placeholder="结束日期">
							    </el-date-picker>
								
							<div id="" style="margin: 0 20px;">
								类型：
								<el-select style="width: 200px;" v-model="selectList" placeholder="请选择">
								    <el-option
									
								      v-for="item in typeList"
								      :key="item.id"
								      :label="item.name"
								      :value="item.id">
								    </el-option>
								  </el-select>
							</div>
							<div class="btn" @click="getOrderList(tabIndex)">查询</div>
						</div>
					</div>
					<div class="recode" style="min-height: 500px;">
						<div class="table-container">
							<div class="ant-table-wrapper">
								<div class="ant-spin-nested-loading">
									<div class="ant-spin-container">
										<div class="ant-table">
											<div class="ant-table-container">
												<div class="ant-table-content">
													<table style="table-layout: auto;width: 100%;" cellpadding="0"
														cellspacing="0">
														<colgroup>
															<col style="width: 176px;">
														</colgroup>
														<thead class="ant-table-thead">
															<tr>
																<th class="ant-table-cell" style="text-align: center;">
																	时间
																</th>
																<th class="ant-table-cell" style="text-align: center;">
																	类型
																</th>
																<th class="ant-table-cell" style="text-align: center;">
																	钻石数量
																</th>
																<th class="ant-table-cell" style="text-align: center;">
																	状态
																</th>
																<th class="ant-table-cell" style="text-align: center;">
																	明细
																</th>
															</tr>
														</thead>
														<tbody class="ant-table-tbody">
															<tr data-row-key="0" class="ant-table-row ant-table-row-level-0" v-for="(item,index) in orderList.data" :key="index">
																<td class="ant-table-cell" style="text-align: center;">
																	{{item.addtime}}</td>
																<td class="ant-table-cell" style="text-align: center;">
																	{{item.type}}
																</td>
																<td class="ant-table-cell" style="text-align: center;">
																	<div class="ant-table-cell-ellipsis"
																		style="color: rgb(241, 85, 70);">{{item.type2==0?'-':'+'}}{{item.change}}</div>
																</td>
																<td class="ant-table-cell" style="text-align: center;">
																	<div style="color: rgb(0, 211, 109);">交易成功</div>
																</td>
																<td class="ant-table-cell" style="text-align: center;">
																	<el-popover
																	  placement="left-end"
																	  width="160"
																	  :offset="40"
																	 >
																	  <p>任务名称：{{item.type}}</p>
																	  <p>任务类型：</p>
																	  <span slot="reference" style="color: rgb(176, 138, 91); cursor: pointer;">查看</span>
																	</el-popover>
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
					<el-pagination background @current-change="sizeChange" style="text-align: center;" layout="prev, pager, next"
						:total="orderList.total">
					</el-pagination>
				</div>
			</div>
			<div class="tab-pane-item" v-if="tabIndex == 1 || tabIndex == 2" name="收入明细">
				<div class="wallet-income-container">
					<div class="form-container ">
						<div class="btn-group flex-start">
							时间：
							<el-date-picker
								  v-model="selectTime"
								  type="daterange"
								  range-separator="至"
								  @change="getSelectTime"
								  value-format="yyyy-MM-dd"
								  start-placeholder="开始日期"
								  end-placeholder="结束日期">
								</el-date-picker>
								
							
							<div class="btn" style="margin-left: 20px;" @click="getOrderList(tabIndex)">查询</div>
							<div class="btn" @click="selectTime = []">重置</div>
							<div class="btn" @click="exportExcel()" v-if="tabIndex == 1">下载</div>
						</div>
					</div>
					<div class="recode" style="min-height: 500px;" v-if="orderList.total != 0">
						<div class="table-container" style="padding-bottom: 10px;">
							<div class="ant-table-wrapper">
								<div class="ant-spin-nested-loading">
									<div class="ant-spin-container">
										<div class="ant-table">
											<div class="ant-table-container">
												<div class="ant-table-content">
													<table style="table-layout: auto;width: 100%;" cellpadding="0"
														cellspacing="0">
														<colgroup>
															<col style="width: 176px;">
														</colgroup>
														<thead class="ant-table-thead">
															<tr>
																<th class="ant-table-cell" style="text-align: center;">
																	时间
																</th>
																<th class="ant-table-cell" style="text-align: center;">
																	类型
																</th>
																<th class="ant-table-cell" style="text-align: center;">
																	钻石数量
																</th>
																<th class="ant-table-cell" style="text-align: center;">
																	状态
																</th>
																<th class="ant-table-cell" style="text-align: center;">
																	明细
																</th>
															</tr>
														</thead>
														<tbody class="ant-table-tbody">
															<tr data-row-key="0" class="ant-table-row ant-table-row-level-0" v-for="(item,index) in orderList.data" :key="index">
																<td class="ant-table-cell" style="text-align: center;">
																	{{item.addtime}}</td>
																<td class="ant-table-cell" style="text-align: center;">
																	{{tabIndex == 1?item.type:'提现'}}
																</td>
																<td class="ant-table-cell" style="text-align: center;">
																	<div class="ant-table-cell-ellipsis" style="color: rgb(241, 85, 70);" v-if="tabIndex == 1">{{item.type2==0?'-':'+'}}{{item.change}}</div>
																	<div class="ant-table-cell-ellipsis" style="color: rgb(241, 85, 70);" v-if="tabIndex == 2">{{item.amount}}</div>
																</td>
																<td class="ant-table-cell" style="text-align: center;">
																	<div style="color: rgb(0, 211, 109);" v-if="tabIndex == 1">交易成功</div>
																	<div v-if="tabIndex == 2">{{item.status == 0?'申请中':item.status == 1?'打款完成':'驳回申请'}}</div>
																</td>
																<td class="ant-table-cell" style="text-align: center;">
																	<el-popover
																	  placement="left-end"
																	  width="160"
																	  :offset="40"
																	 >
																	  <p>任务名称：{{tabIndex == 1?item.type:'提现'}}</p>
																	  <p>任务类型：</p>
																	  <span slot="reference" style="color: rgb(176, 138, 91); cursor: pointer;">查看</span>
																	</el-popover>
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
							<el-pagination background @current-change="sizeChange" style="text-align: center;" layout="prev, pager, next"
								:total="orderList.total">
							</el-pagination>
						</div>
					</div>
					<div class="common-empty-view" v-if="orderList.total == 0"><img class="no-data-img  " src="../../assets/images/qsy.png"
							alt="no-data" style="margin-top: 50px;">
						<p class="no-data-text">暂无数据</p>
					</div>
				</div>
			</div>
			<div class="tab-pane-item" v-if="tabIndex == 3" name="我的银行卡">
				<div class="wallet-bank-card-container">
					<!-- <div class="up">
						<div class="card-num">卡片数量 0/10</div>
					</div> -->
					
					<div class="item-container">
						<div class="item-wrap"  v-if="JSON.stringify(BankList) !== '{}'">
							<div class="item" style="background: linear-gradient(to Right,#FFDFAB,#E3AC72);">
								<div class="left-info">
									<img class="img" src="../../assets/images/yl.png" alt=""><div class="info"><div class="info-up">
									<div class="account">银行卡号：</div><div class="account-phone">{{BankList.card_number_hide}}</div></div><div class="info-num">姓名：{{BankList.name_hide}}</div></div></div>
									<div class="right-btn"  @click="edit(0)">修改</div>
									</div></div></div>
					<div class="no-card" v-if="JSON.stringify(BankList) == '{}'">
						<!-- <div class="text">暂未绑定银行卡</div> -->
						<div class="no-card-btn" @click="dialogVisible = true;type=0">添加银行卡</div>
					</div>
				</div>
			</div>
			<div class="tab-pane-item" v-if="tabIndex == 4" name="我的支付宝">
				<div class="wallet-bank-card-container">
					<!-- <div class="up"><div class="up-btn"><span class="icon">+</span>添加支付宝</div><div class="card-num">卡片数量 1/10</div></div> -->
					<div class="item-container">
						
						<div class="item-wrap"  v-if="JSON.stringify(aliList) !== '{}'">
							<div class="item" style="background: linear-gradient(to Right,#FFDFAB,#E3AC72);">
								<div class="left-info">
									<img class="img" src="../../assets/images/alipay.png" alt=""><div class="info"><div class="info-up">
									<div class="account">支付宝账号：</div><div class="account-phone text-clamp" style="width: 120px;">{{aliList.info}}</div></div><div class="info-num">姓名：{{aliList.name}}</div></div></div>
									<div class="right-btn" @click="edit(1)">修改</div>
									</div></div></div>
					<div class="no-card" v-if="JSON.stringify(aliList) == '{}'">
						<!-- <div class="text">暂未支付宝</div> -->
						<div class="no-card-btn" @click="dialogVisible = true;type=1">添加支付宝</div>
					</div>
				</div>
			</div>
			<!-- 密码管理 -->
			<div class="wallet-password-container" v-if="tabIndex == 5">
				<div class="info">
					<div class="password">支付密码：<span style="position: relative; top: 4px;">{{infos.is_defray_pass == 1?'********':'未设置'}}</span></div>
				<a class="color-d8ad66">
					<div class="btn modify-btn" @click="chagedialog()">{{infos.is_defray_pass == 1?'修改':'设置'}}</div>
				</a>
				</div>
			</div>
		</div>
		
		<!-- 提现 -->
		<el-dialog :center="true" custom-class="dialog" :visible.sync="dialogVisible1"  width="547px"
			top="30vh">
			<div role="document" class="ant-modal wallet-withdraw-modal wallet-bind-bank-card-modal" style="width: 100%;">
				<div class="ant-modal-content" style="transform: translateY(-100px);"><button type="button"
						aria-label="Close" class="ant-modal-close"><span class="ant-modal-close-x"><span role="img"
								aria-label="close" class="anticon anticon-close ant-modal-close-icon"><svg
									@click="dialogVisible1 =false" viewBox="64 64 896 896" focusable="false"
									data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true">
									<path
										d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z">
									</path>
								</svg></span></span>

					</button>
					<div class="ant-modal-body">
						<div class="title">提现</div>
						<div class="header-text" v-if="isTrue">验证码将发送到您的手机：{{infos.mobile}}</div>
						<form class="ant-form ant-form-horizontal c-user-form">
							<div class="ant-row ant-form-item gray-block-container ant-form-item-has-success"
								style="row-gap: 0px;">
								<div class="ant-col ant-form-item-label"><label for="withdraw"
										class="ant-form-item-required" title="提现：">提现</label></div>
								<div class="ant-col ant-form-item-control">
									<div class="ant-form-item-control-input">
										<div class="ant-form-item-control-input-content">
											<el-select v-model="valueWay" placeholder="请选择提现方式" style="width: 100%;">
											    <el-option
											      v-for="item in options1"
											      :key="item.value"
											      :label="item.label"
											      :value="item.value">
											    </el-option>
											  </el-select>
										</div>
									</div>
								</div>
							</div>
							<!-- <div class="tip">提现到支付宝，平台代缴20%个税</div> -->
							<!-- <div class="ant-row ant-form-item gray-block-container" v-if="isTrue" style="row-gap: 0px;">
								<div class="ant-col ant-form-item-label"><label for="alipayAccount"
										class="ant-form-item-required" title="选择账号：">选择账号</label></div>
								<div class="ant-col ant-form-item-control">
									<div class="ant-form-item-control-input">
										<div class="ant-form-item-control-input-content">
											<el-select v-model="lesValue" placeholder="请选择" style="width: 100%;">
											    <el-option
											      v-for="item in withdrawList"
											      :key="item.value"
											      :label="item.id_card_hide"
											      :value="item.id">
											    </el-option>
											  </el-select>
										</div>
									</div>
								</div>
							</div> -->
							<div class="ant-row ant-form-item withdraw-qz ant-form-item-has-success"
								style="row-gap: 0px;">
								<div class="ant-col ant-form-item-label"><label for="withdrawQzNum"
										class="ant-form-item-required" title="提现钻石：">提现钻石</label></div>
								<div class="ant-col ant-form-item-control">
									<div class="ant-form-item-control-input">
										<div class="ant-form-item-control-input-content">
											<div value="" id="withdrawQzNum"><input maxlength="7"
													placeholder="请填写提现钻石" v-model="withdrawal.amount" type="text" class="ant-input ant-input-lg"
													value="">
												<div class="all-withdraw" @click="withdrawal.amount = infos.withdrawal_balance">全部提现</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="withdraw-text" style="color: rgb(81, 90, 110);">可提现钻石：<span
									class="color-d8ad66">{{infos.withdrawal_balance}}</span>钻石</div>
							<div class="ant-row ant-form-item pay-password ant-form-item-has-success" v-if="isTrue" style="row-gap: 0px;">
								<div class="ant-col ant-form-item-label"><label for="payPassword"
										class="ant-form-item-required" title="支付密码：">支付密码</label></div>
								<div class="ant-col ant-form-item-control">
									<div class="ant-form-item-control-input">
										<div class="ant-form-item-control-input-content"><span
												class="ant-input-affix-wrapper ant-input-affix-wrapper-lg ant-input-password ant-input-password-large"><input
													placeholder="请输入密码" action="click" id="payPassword" type="password"
													class="ant-input ant-input-lg" value="" v-model="withdrawal.pass"><span
													class="ant-input-suffix"><span role="img" aria-label="eye-invisible"
														tabindex="-1"
														class="anticon anticon-eye-invisible ant-input-password-icon"></span></span></span></div>
									</div>
								</div>
							</div>
							<!-- <div class="forget-secret" v-if="isTrue">
								<a class="color-d8ad66"
									href="/wallet-forget-password?type=forget">忘记密码?</a>
									</div> -->
							<div class="ant-row ant-form-item" style="row-gap: 0px;" v-if="isTrue">
								<div class="ant-col ant-form-item-label"><label for="verifyCode"
										class="ant-form-item-required" title="验证码：">验证码</label></div>
								<div class="ant-col ant-form-item-control">
									<div class="ant-form-item-control-input">
										<div class="ant-form-item-control-input-content">
											<div class="wallet-verify-input"><input v-model="withdrawal.code" maxlength="8" placeholder="请输入验证码"
													type="text" class="ant-input ant-input-lg" value="">
												<div class="btn get-verify-btn" @click="count == 0?getCode(8):''">
													{{count == 0?'获取验证码':count + 's'}}
												</div>
												
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="btn-group">
								<div class="btn ok" data-id="handleSubmit" @click="getWithdrawal()">确定</div>
								<div class="btn cancel" @click="dialogVisible1=false">取消</div>
							</div>
						</form>
					</div>
				</div>
				<div tabindex="0" aria-hidden="true" style="width: 0px; height: 0px; overflow: hidden; outline: none;">
				</div>
			</div>
		</el-dialog>
		<a :href="url1.url" target="_blank" ref="alink" rel="noopener noreferrer"></a>
	</div>
</template>

<script>
	import {
		payUrl,
		getCode,
		bindBank,
		getExport,
		bindAliPay,
		getInfoBank,
		getTypeList,
		getOrderList,
		getAliPayInfo,
		withdrawalList,
		chargerulesList,
		applyForWithdrawal,
	} from '../../api/user.js'
	import axios from 'axios'
	import {
		getToken,
		removeToken
	} from '../../utils/auth.js'
	import apiUrl from "../../utils/devApi.js";
	export default {

		data() {
			return {
				type:0,
				page:1,
				selectTime:'',
				withdrawal:{
					amount:'',
					code:'',
					type:'',
					pass:''
				},
				typeList:[],//类型
				isTrue:false,//是否有提现方式
				payIndex: 0,
				code: '', //获取验证码
				count: 0, //获取验证码
				timer: null, //获取验证码
				show: true, //获取验证码
				lesIndex: 0, //选中的充值金额
				index: false, //0充值 1.我的钱包
				count: 0,
				timer: null,
				show: false,
				tabIndex: 0,
				ali:{
					name:'',
					info:'',
					code:''
				},
				dialogVisible1: false,
				dialogVisible: false,
				bindBankFrom: {
					bank_name: '',
					card_number: '',
					name: '',
					id_card: '',
					code: ''
				},
				options: [{ //添加银行卡选择的银行
						value: '中国银行',
						label: '中国银行'
					},
					{ //添加银行卡选择的银行
						value: '广大银行',
						label: '广大银行'
					}
				],
				options1:[{ //添加银行卡选择的银行
						value: 0,
						label: '银行卡'
					},
					{ //添加银行卡选择的银行
						value: 1,
						label: '支付宝'
					}
				],
				url1:{
						url:''
				},
				orderList:{},
				lesValue:'',//提现
				valueWay:'',
				selectList:'',//消费明细
				aliList:{},//支付宝
				BankList:{},//银行卡列表
				lesList: [], //充值选项
				withdrawList:[],
				bingBank: false,
				tabList: ['消费明细', '收入明细', '提现记录', '我的银行卡', '我的支付宝', '密码管理']
			}
		},
		mounted() {
			// 判断是否是打开充值
			// if(query.isRecharge){
				
			// }
			this.chargerulesList()
			this.getInfoBank()
			this.getOrderList()
			this.getAliPayInfo()
			this.getTypeList()
		},
		watch:{
			valueWay(e){
				if(e == 0 && JSON.stringify(this.BankList) == '{}'){
					this.valueWay = ''
					this.dialogVisible1 =false
					return this.$message.warning('请绑定银行卡')
				}else if(e == 0 && JSON.stringify(this.BankList) !== '{}'){
					let arr = [this.BankList]
					this.withdrawList = arr
					this.isTrue = true
				}else if(e == 1 && JSON.stringify(this.aliList) == '{}'){
					this.valueWay = ''
					this.dialogVisible1 =false
					return this.$message.warning('请绑定支付宝')
				}else if(e == 1 && JSON.stringify(this.aliList) !== '{}'){
					let arr = [this.lesList]
					this.withdrawList = arr
					this.isTrue = true
				}
			},
			url1(e){
				window.open(this.url1.url,"_blank")
			},
			tabIndex(e){
				if(e == 0 || e == 1){
					this.page = 1
					this.orderList = {}
					this.getOrderList()
				}else if(e == 2){
					this.page = 1
					this.orderList = {}
					this.withdrawalList()
				}
				this.selectTime = []
			}
			
		},
		computed: {
			infos() {
				return this.$store.state.infos
			}
		},
		methods: {
			
			// 获取分类
			getTypeList(){
				
				getTypeList({type:1}).then(res=>{
					this.typeList = res.data
				}).then(res=>{
					
				})
			},
			// 获取时间
			getSelectTime(e){
				// this.selectTime
			},
			
			// 筛选
			getSearch(){
			},
			exportExcel() {
				let data = {
					start_time:this.selectTime.length == 2?this.selectTime[0]:'',
					end_time:this.selectTime.length == 2?this.selectTime[1]:''
				}
				let url = apiUrl.VUE_APP_API_WS + 'api/order/export'
				
				axios({
					method: 'get',
					url: url,
					data: {},
					headers:{
						token:getToken()
					},
					responseType: 'blob'
				}).then(response => {
					// getExport(data).then(res=>{
						let blob = new Blob([response.data], {type: "application/vnd.ms-excel"});  // 返回的文件流了
						let objectUrl = URL.createObjectURL(blob);
						window.location.href = objectUrl;
				})
				
			},
			// 编辑银行卡 || 支付宝
			edit(type){
				if(type == 0){
					this.bindBankFrom = this.BankList
				}else{
					this.ali = this.aliList
				}
				
				this.type = type
				this.dialogVisible = true
			},
			
			// 获取支付宝详情
			getAliPayInfo(){
				getAliPayInfo().then(res=>{
					this.aliList = res.data || {}
				}).catch(res=>{})
			},
			// 获取提现记录
			withdrawalList(){
				let data = {
					page:this.page
				}
				withdrawalList(data).then(res=>{
					this.orderList = res.data
				}).catch(res=>{})
			},
			sizeChange(e){
				this.page = e
				this.getOrderList()
			},
			// chagedialog
			chagedialog(){
				this.$emit('chagedialog','')
			},
			// 余额变动
			getOrderList(){
				let data = {
					page:this.page,
					type1:this.tabIndex == 0?this.selectList:'',
					type:this.tabIndex + 1,
					start_time:this.selectTime.length == 2?this.selectTime[0]:'',
					end_time:this.selectTime.length == 2?this.selectTime[1]:''
				}
				getOrderList(data).then(res=>{
					this.orderList = res.data
				}).catch(res=>{})
			},
			
			// 绑定支付宝
			Bindalipay(){
				if (!this.ali.info) {
					return this.showtoast('请输入支付宝账号', 1)
				} else if (!this.ali.name) {
					return this.showtoast('请输入姓名', 1)
				}
				bindAliPay(this.ali).then(res=>{
					this.getAliPayInfo()
					this.dialogVisible =false
					this.$message.success('操作成功')
				}).catch(res=>{})
			},
			// 获取银行卡信息
			getInfoBank(){
				getInfoBank().then(res=>{
					this.BankList = res.data
				}).catch(res=>{})
			},
			// 申请提现
			getWithdrawal(){
				let data = this.withdrawal
				data.type = this.valueWay
				if(!data.amount){
					return this.$message.warning('请输入提现金额')
				}else if(!data.pass){
					return this.$message.warning('请输入支付密码')
				}else if(!data.code){
					return this.$message.warning('请输入验证码')
				}
				applyForWithdrawal(data).then(res=>{
					// this.getAliPayInfo()
					this.$store.dispatch('getUserInfo','')
					this.dialogVisible1 =false
					this.getOrderList()
					this.$message.success('操作成功')
				}).catch(res=>{})
			},
			
			setIndex(type) {
				this.index = type
			},

			//获取充值列表
			chargerulesList() {
				chargerulesList().then(res => {
					this.lesList = res.data
				}).catch(rs => {})
			},

			// 充值接口
			payUrl() {
				let data = {
					id: this.lesList[this.lesIndex].id,
					type: this.payIndex
				}
				let newLink = window.open("loading page")
				payUrl(data).then(res => {
					// this.$router.push('')
					// location.href = res.data.url
					// this.url1 = res.data
					newLink.location.href = res.data.url
					// console.log("this.url1: ",this.url1);
					// let that = this
					// setTimeout(()=>{
					// 	this.$refs.alink.click()
					// },500)
					// let aLink = document.createElement('a')
					// aLink.href = res.data.url
					// this.getUrl()
					// window.open(res.data.url,'_blank')
					// window.open(res.data.url)
				}).catch(res => {})
			},
			
			getUrl(){
				// window.open(this.url1.url,'_blank')
				
			},

			// 关闭弹窗
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			// 弹窗
			showtoast(title, type) {
				let msg = ['success', 'warning', 'error']
				this.$message({
					message: title,
					type: msg[type]
				});
			},
			// BindBank绑定银行卡
			BindBank() {
				let data = this.bindBankFrom
				if (!data.bank_name) {
					return this.showtoast('请选择银行', 1)
				} else if (!data.card_number) {
					return this.showtoast('请输入银行卡号', 1)
				} else if (!data.name) {
					return this.showtoast('请输入姓名', 1)
				} else if (!data.id_card) {
					return this.showtoast('请输入身份证号', 1)
				} else if (!data.code) {
					return this.showtoast('请输入验证码', 1)
				}
				bindBank(data).then(res => {
					this.getInfoBank()
					this.dialogVisible =false
					this.$message.success('操作成功')
				}).catch(res => {})

			},
			// 获取手机验证码
			getCode(type) {
				let data = {
					mobile: this.infos.mobile,
					type: type //银行卡
				}
				getCode(data).then(res => {
					this.getCount()
				}).catch(res => {
				})
			},

			// 验证码倒计时
			getCount() {
				const TIME_COUNT = 60;
				if (!this.timer) {
					this.count = TIME_COUNT;
					this.show = true;
					this.timer = setInterval(() => {
						if (this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							this.show = true;
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000)
				}
			}
		}
	}
</script>

<style>
	.common-empty-view {
		width: 100%;
		height: 100%;
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		user-select: none;
	}

	.common-empty-view .no-data-img {
		max-width: 300px;
		max-height: 240px;
		width: 100%;
	}

	.common-empty-view .no-data-text {
		position: relative;
		top: -60px;
		font-size: 16px;
		color: #999;
	}
	.ant-input {
		min-height: 41px;
	}
	.el-dialog .el-dialog__header {
		display: none !important;
	}
	.el-dialog--center .el-dialog__body {
		padding: 0 !important;
	}
</style>
