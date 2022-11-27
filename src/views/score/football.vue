<template>
	<div id="ScoreBoard" ref="ScoreBoard" style="padding-top: 60px" @mouseover="changeFlag(false)">
		<div id="bg-linear"></div>
		<div class="score-container">
			<main class="score-container-main" style="min-height:0">
				<div>
					<div class="" style="position: fixed;z-index: 1;" :style="{top:topShow?'60px':'0px'}">
						<div class="fixed-header-wrap" style="position: relative;">
							<div class="score-left-nav-filter-wrap" style="position: absolute;left: -60px;"
								v-if="tabIndex == 0">
								<div class="score-left-nav-filter-item" @click="collect()">
									<div class="score-left-nav-filter-item-icon left-nav-guanzhu"></div>
									<span>收藏</span>
								</div>
								<div class="score-left-nav-filter-item" @click="retain()">
									<div class="score-left-nav-filter-item-icon left-nav-gouxuan"></div>
									<span>保留</span>
								</div>
								<div class="score-left-nav-filter-item" @click="conceal()">
									<div class="score-left-nav-filter-item-icon left-nav-yingcang"></div>
									<span>隐藏</span>
								</div>
								<!-- <div class="score-left-nav-filter-item" @click="init()()">
									<div class="score-left-nav-filter-item-icon left-nav-yingcang"></div>
									<span>隐藏</span>
								</div> -->
							</div>

							<div style="position: absolute; top: 310px; right: -70px" v-if="tabIndex == 10">
								<div class="" style="">
									<div id="matchStatusNav">
										<div class="item" :class="[typeTab==0?'active':'',objNum.a==0?'disable':'']"
											@click="setTab(0)"><i class="going-icon"></i>进行中</div>
										<div class="item" :class="[typeTab==1?'active':'',objNum.b==0?'disable':'']"
											@click="setTab(1)">
											<i class="uncoming-icon"></i>未开<span class="line"></span>
										</div>
										<div class="item" @click="setTab(2)"
											:class="[typeTab==2?'active':'',objNum.c==0?'disable':'']">
											<i class="finished-icon"></i>完场<span class="line"></span>
										</div>
										<!-- disable -->
										<div class="item " @click="setTab(3)"
											:class="[typeTab==3?'active':'',objNum.d==0?'disable':'']"><i
												class="unknown-icon"></i>异常</div>
									</div>
								</div>
							</div>

							<div id="header-filter">

								<div class="header-filter-left">
									<div class="buttons-wrap">
										<button class="left-button" @click="tabIndex = index"
											v-for="(item, index) in tabList" :class="index == tabIndex ? 'active' : ''"
											:key="index">
											{{ item }}
										</button>
										<!-- <el-badge :hidden="shouNum != 0?false:true" :value="shouNum" class="item"> -->
										<button class="left-button" style="margin-right: 0;"
											:class="3 == tabIndex ? 'active' : ''" @click="tabIndex = 3">收藏</button>
										<!-- </el-badge> -->
										<button class="left-button active" style="margin-left: 16px;"
											v-if="$store.state.concealNum != 0" @click="cancelConceal()">全部<span
												class="weight"> （隐藏{{$store.state.concealNum}}场）</span></button>
									</div>
								</div>

								<div class="header-filter-right">
									<div class="header-second-filter-right" style="position: relative;">
										<div class="ant-dropdown-trigger filter-main-button-container"
											style="position: relative;">
											<el-popover placement="bottom" width="100" trigger="click"
												popper-class="popover"  ref="popover2">
												<ul class="" role="menu" tabindex="0" data-menu-list="true">
													<li class="ant-dropdown-menu-item ant-dropdown-menu-item-only-child"
														role="menuitem" tabindex="-1"
														data-menu-id="rc-menu-uuid-93853-1-0"
														@click="selectTab(item,1)"
														v-for="(item,index) in matchList" :key="index">
														<span class="ant-dropdown-menu-title-content">
															<div class="filter-choose-item" style="text-align: center;">
																{{item.name}}
															</div>
														</span>
													</li>
												</ul>
												<button slot="reference" class="match-filter-main-button "
													:class="maskIndex == 1?'active':''" style="margin: 0px"
													@click="getMaskShow(1)">
													<div class="i">{{selectLi}}</div>
													<i class="arrow-down"></i>
												</button>
											</el-popover>
											<!-- 类型下拉 -->
										</div>

										<el-popover placement="bottom" width="424" trigger="click"
											popper-class="popover" ref="popover1">
											<div class="filter-content">
												<div class="filter-header-tabs">
													<div class="tab-item" :class="checkIndex == 0?'active':''"
														@click="checkIndex = 0">按赛事</div>
													<div class="tab-item" :class="checkIndex == 1?'active':''"
														@click="checkIndex = 1">国家/地区</div>
												</div>
												<div class="filter-scroll-view" style="height: 348px;">
													<div class="filter-checkbox-wrap"
														v-for="(item,key,index) in screen.list" :key="index">
														<div class="filter-checkbox-word" v-if="maskIndex != 3">
															{{item.name}}
														</div>
														<ul class="filter-checkbox-list">
															<li class="filter-checkbox-item"
																:class="item1.check?'active':''"
																v-for="(item1,index1) in item.list" :key="index1">
																<label class="checkbox-wrap"
																	@click.stop="setCheckStatus($event,item1)">
																	<!-- <input type="checkbox" :value="!item1.check"> -->
																	<img width="18px" height="18px"
																		:src="item1.check?require('../../assets/images/check1.png'):require('../../assets/images/check.png')">
																	<!-- <div class="checkbox-content"></div> -->
																	<div class="checkbox-children">
																		{{item1.name}}
																		<span
																			class="filter-checkbox-item-matchnum">[{{item1.count}}]</span>
																	</div>
																</label>
															</li>
														</ul>
													</div>

												</div>
												<div class="filter-footer-wrap-for-football">
													<div class="quantity-information">选中 <span
															class="active">{{checkIndex == 0?screen.count_2:screen.count_1}}/</span>
														{{checkIndex == 0?screen.count_competition:screen.count_country}}场
													</div>
													<div class="filter-footer-button" @click="setAllCheck(true)">全选
													</div>
													<div class="filter-footer-button" @click="setAllCheck(false)">反选
													</div>
													<div class="filter-footer-button confirm-button"
														@click="setCheckList()">确定</div>
												</div>
											</div>
											<button slot="reference" :class="maskIndex == 2?'active':''"
												class="match-filter-main-button" @click="getMaskShow(2)">
												<div class="i">赛事</div>
												<i class="arrow-down"></i>
											</button>
										</el-popover>

										<!-- <button class="match-filter-main-button" @click="getMaskShow(3)">
											<div>盘口</div>
											<i class="arrow-down"></i>
										</button> -->
										<!-- <div class="ant-dropdown-trigger filter-main-button-container"
											@click="getMaskShow(4)">
											
											
										</div> -->

										<!-- <el-popover placement="bottom" width="100" trigger="click"
											popper-class="popover" ref="popover">
											<ul class="" role="menu" tabindex="0" data-menu-list="true">
												<li class="ant-dropdown-menu-item ant-dropdown-menu-item-only-child"
													role="menuitem" tabindex="-1" data-menu-id="rc-menu-uuid-93853-1-0"
													@click="selectTab(item,2)"
													v-for="(item,index) in matchList1" :key="index">
													<span class="ant-dropdown-menu-title-content">
														<div class="filter-choose-item" style="text-align: center;">
															{{item.name}}
														</div>
													</span>
												</li>
											</ul>
											<button slot="reference" :class="maskIndex == 4?'active':''"
												class="match-filter-main-button" style="margin: 0px; width: 84px">
												<div class="i">{{boxLi}}</div>
												<i class="arrow-down"></i>
											</button>
										</el-popover> -->


										<!-- 赛事下拉 -->
										<!-- <div v-if="maskIndex == 2"
											class="ant-popover match-filter-popover ant-popover-placement-bottom"
											style="position: absolute;left: -100px; top: 36px; background: white;">
											<div class="ant-popover-content">
												<div class="ant-popover-arrow"><span
														class="ant-popover-arrow-content"></span></div>
												<div class="ant-popover-inner" role="tooltip">
													<div class="ant-popover-inner-content">
														
													</div>
												</div>
											</div>
										</div> -->

									</div>
									<div class="header-filter-right-tools-wrap">
										<div class="search">
											<div class="search-main" style="margin-left: 12px;width: auto;" v-if="isSearch">
												<input placeholder="请输入要查询的赛事或球队名称" v-model="inputValue" type="text"
													class="ant-input ant-input-sm" value="">
												<div class="search-number">
													<!-- {{num0}} -->
													<span class="color-b98c53" v-if="allNum != 0">{{allNum}}</span>
												</div>
												<div class="division"></div>
												<!-- <div class="up" @click="searchScroll('down')"></div>
												<div class="down" @click="searchScroll('up')"></div> -->
												<div class="close" @click="isSearch = false,clearSearch()"></div>
											</div>
											<div class="" v-else @click="isSearch = true">
												<img class="enlarge-button"
													src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAWlBMVEUAAACJiZiBhJKDhZWFiJWlpaWAg5OBhJOBg5KAhJKAhJOBhZWBg5OBhJSVmKWAg5KChJSSkpeBhJOBhJOBhJSBhZOBhJOChpSFhZWAhJOBhJOChZSAg5KUl6RY8yGOAAAAHHRSTlMAEcA5JgP1387F2UGPUbWrfgy7olx07Ukesp5iRCjhZAAAATFJREFUSMflVdl2hCAMBQRkGce9Tlv9/9+siZ4zynJKXtv7okAuuUkgsL8IPo3Cae3EOPEC80asF4jmF/PKrgFsxfJQjzWBh8qKH1aE6bzse+k7c4wHnrF3uNzK95RsccolGQr3rwPJVY0+UqpQv+CRX4FxJPKD9irhGRlxrizoSWrloMpG9Qq2eT4D52EFwW97GW/bZdCC2sAtbCJzBAmrd7kT1IvlCAwqON0I4z7T5QndvjxGIfg8wUdBOAghS8Ag3I2g95n+yOd2w5Hdfl/WZAJVUk0N2lDT+kUt3Df1aLyIh28gH2/iBTKKeEU9sQnohtZmsP8RGhnCvopbpZg1fD6a4maMwvCvpN17dP4ZyMo9KHZhJ05ZS/mTdcqaWRHesrRi5ZhBFIEAOTEL+5f4AfcQNF+GuUUUAAAAAElFTkSuQmCC"
													alt="enlarge" />
											</div>
										</div>

										<el-popover placement="bottom-end" width="384" trigger="click"
											popper-class="popover" ref="popover3">
											<div class="setting-popover-content">
												<div class="setting-header">其他比分设置</div>
												<div class="setting-content" style="background: white;">
													<div>
														<div class="setting-item">
															<p class="label-name">语言选择</p>
															<div class="options">
																<div class="option-button" @click="setGame('lang',index)"
																	v-for="(item,index) in langList" :key="index"
																	:class="index == langIndex?'active':''">{{item}}
																</div>
															</div>
														</div>
													</div>
													<div>
														<div class="setting-item">
															<p class="label-name">比赛信息</p>
															<div class="ant-checkbox-group checkbox-group-container">
																<!--  -->
																<label class="ant-checkbox-wrapper"
																	@click="setGame('red')"
																	:class="game.red?'ant-checkbox-wrapper-checked':''">
																	<span class="ant-checkbox">
																		<img :src="game.red?require('../../assets/images/check1.png'):require('../../assets/images/check.png')"
																			width="20px" height="20px">
																		<!-- <span class="ant-checkbox-inner"></span> -->
																		红牌数
																	</span>
																</label>
																<label class="ant-checkbox-wrapper"
																	@click="setGame('yellow')"
																	:class="game.yellow?'ant-checkbox-wrapper-checked':''">
																	<span class="ant-checkbox">
																		<img :src="game.yellow?require('../../assets/images/check1.png'):require('../../assets/images/check.png')"
																			width="20px" height="20px">
																		<!-- <span class="ant-checkbox-inner"></span> -->
																		黄牌数
																	</span>
																</label>
																<!-- <el-radio @ca v-model="game.red" label="1">红牌数</el-radio>
																 <el-radio v-model="game.yellow" label="2">黄牌数</el-radio> -->
															</div>
														</div>
													</div>
													<div>
														<div class="setting-item">
															<p class="label-name">声音设置</p>
															<div class="options" style="width: 157px;">
																<div class="option-button"
																	:class="game.voice?'active':''"
																	@click="setGame('voice',1)">哨声</div>
																<div class="option-button"
																	:class="game.voice?'':'active'"
																	@click="setGame('voice',2)">静音</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<img slot="reference" class="setting-popover-button"
												@click="langMask=!langMask"
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAn1BMVEUAAACjo6Ojo6yAg5KUmKWBhJOUoqWBg5OChZOBhJOBhJOLi5yVl6WUmKSAg5OVmKaBhZSXm6aUmaeUmqaBhJOAhJOChZSIiJuBhJKAhJOBhJKChZSDhZSDhZWDh5SFhpaGh5aBhJKAg5KBhZOHh5eVmKSUl6WChJOBhJODhJSAg5KAg5OBhJOBhJOBhJODg5KBhJKBhJKBhZOAg5KUl6R0AIjxAAAAM3RSTlMABAb9kvEL2Fq4nA/z1aqaeEI3K/nQTxT0yLBVSjYuKSLn4XEa5r1zZD7utKGZf0PCpJRbH5GKAAABxUlEQVRIx91V2ZaCMAwdVgvDouigwrC57zrS//+2aYq0pUcRXs0L9Saxyc3Sr48UxZ6UlWjWdxeH35LLsIvDUHCIujhYgkOhdIhII4YZOaiz9phUhCDFGMxuFLHJaTJUCA3h7kn2HtFaxwFlZ0+R1YxGdfSKsvxR27i5PLBQe82XMmAqjevCGUONVdNhWSsmUSrAK9uoFaeG/RTwcxqjvZydukdxuoWLExE+w6VTyVYKeC4AKWS35L/Huus4rj5mwBWCQs3iDhQWhY4fojMyI2Kx4GUHMg55bb/B2A9MM/Ax3jw8ppTEnDn8lSWvjY7Xo+o0WmO9rioYKDypOwC7Kn6Mwb7ywJjmkYD61iDlxGjQsc9hv7rCZgEwyYBpE04uDjgcYBc+kEEoUb2ok3KwyVETO/AB1uUqFTAFrxxgyKUWyDUSktoWUixNw9uk54rYK6cOtLKdwwqndCocb42spTVM1hq9m69/e/cfID6idhaiqzyiZoLiZElHtOcSsF+vmS1DQ0NeM+2LLJYXmdwcxtFbCKsyp/9fWJHBpkFaxtCm6MAIudP4VKKSlvGT2DLgBy7Y9ntQoLjv5SI4eL0fxf7P7kfKP05cbJAGXu+dAAAAAElFTkSuQmCC"
												width="24" alt="setting" />
										</el-popover>


									</div>
								</div>

							</div>
							<img class="score-banner" @click="$router.push('/downLoad')" src="../../assets/images/main-banner.jpg"
								alt="score-banner" />
							<ul v-if="tabIndex == 0" class="football-score-container-header">
								<li class="width40" style="background: rgb(58, 48, 64); height: 100%"
									@click="setAllCheck1()">
									<img class="icon-check"
										:src="!allCheck?require('@/assets/images/check.png'):require('@/assets/images/check1.png')"
										alt="" />
								</li>
								<li class="width93">赛事</li>
								<li class="width32 text-center">时间</li>
								<li class="width46 football-all-status">状态</li>
								<li class="teamName-score width425">
									<div class="hostTeam">主队</div>
									<div class="vs width40">比分</div>
									<div class="guestTeam">客队</div>
								</li>
								<div class="variable width554">
									<div class="immediate">
										<div class="model-one width180">
											<div class="width66 text-center">半场</div>
											<div class="corner width48 text-left">角球</div>
											<div>直播</div>
										</div>
										<div class="model-two width224">
											<div class="gou-container" @click="immediatelyCheck(1)">
												<div class="gou" :class="immediately.value1?'checked':'no-checked'">
												</div>
												<div class="rangqiu">亚</div>
											</div>
											<div class="gou-container" @click="immediatelyCheck(2)">
												<div class="gou" :class="immediately.value2?'checked':'no-checked'">
												</div>
												<div class="daxiao">大</div>
											</div>
											<div class="gou-container" @click="immediatelyCheck(3)">
												<div class="gou" :class="immediately.value3?'checked':'no-checked'">
												</div>
												<div class="europe">欧</div>
											</div>
										</div>
										<div class="width87 text-center">数据</div>
										<div class="text-center width76">操作</div>
									</div>
								</div>
							</ul>

							<div v-if="tabIndex == 1">
								<div class="header-date-filter">
									<div class="date-button" :class="index == timeIndex?'active':''"
										@click="timeIndex = index" v-for="(item,index) in dateTime" :key="index">
										<div class="date">{{item.data}}</div>
										<div class="week">{{item.time}}</div>
									</div>
									<div class="date-button" style="color: rgb(128, 131, 146);position:relative"
										@click="getShow()">
										<i class="date-picker-icon"></i>日历<i class="arrow-down"></i>
										<el-date-picker ref="abc" type="date" v-model="time"
											:picker-options="pickerBeginDateBefore" format="yyyy-MM-dd"
											value-format="yyyy-MM-dd" class="datePicker" @change="change"
											placeholder="选择日期">
										</el-date-picker>
									</div>
								</div>

								<ul class="football-score-container-header" style="border-radius: 0px">
									<li class="width93">赛事</li>
									<li class="width32 text-center">时间</li>
									<li class="width46 football-all-status margin-right-20">
										状态
									</li>
									<li class="teamName-score width425">
										<div class="hostTeam">主队</div>
										<div class="vs width40">比分</div>
										<div class="guestTeam">客队</div>
									</li>
									<div class="variable width547">
										<div class="finished">
											<div class="model-one width417">
												<div class="width54 text-center">半场</div>
												<div class="width54 text-center">角球</div>
												<div class="width60 text-center">赛果</div>
												<div class="width60 text-center">让球</div>
												<div class="width60 text-center">总进球</div>
												<div class="width60 text-center"></div>
												<div class="width60 text-center">半全场</div>
											</div>
											<div class="match width80 text-center">数据</div>
											<div class="match width50 text-center">统计</div>
										</div>
									</div>
								</ul>
							</div>

							<div v-if="tabIndex == 2">
								<div class="header-date-filter">
									<div class="date-button" :class="index == timeIndex?'active':''"
										@click="timeIndex = index" v-for="(item,index) in dateTime" :key="index">
										<div class="date">{{item.data}}</div>
										<div class="week">{{item.time}}</div>
									</div>
									<div class="date-button" style="color: rgb(128, 131, 146);position:relative"
										@click="getShow()">
										<i class="date-picker-icon"></i>日历<i class="arrow-down"></i>
										<el-date-picker :picker-options="pickerBeginDateBefore1" ref="abc" type="date"
											v-model="time" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
											class="datePicker" @change="change" placeholder="选择日期">
										</el-date-picker>

									</div>
								</div>
								<ul class="football-score-container-header" style="border-radius: 0px">
									<li class="width93">赛事</li>
									<li class="width32 text-center">时间</li>
									<li class="width46 football-all-status margin-right-20">
										状态
									</li>
									<li class="teamName-score width425">
										<div class="hostTeam">主队</div>
										<div class="vs width40">比分</div>
										<div class="guestTeam">客队</div>
									</li>
									<div class="variable width547">
										<div class="progress">
											<div class="width115 text-center"></div>
											<div class="width65">直播</div>
											<div class="model-one width224">
												<div class="gou-container" @click="immediatelyCheck(1)">
													<div class="gou" :class="immediately.value1?'checked':'no-checked'">
													</div>
													<div class="rangqiu">亚</div>
												</div>
												<div class="gou-container" @click="immediatelyCheck(2)">
													<div class="gou" :class="immediately.value2?'checked':'no-checked'">
													</div>
													<div class="daxiao">大</div>
												</div>
												<div class="gou-container" @click="immediatelyCheck(3)">
													<div class="gou" :class="immediately.value3?'checked':'no-checked'">
													</div>
													<div class="europe">欧</div>
												</div>
											</div>
											<div class="match width87 text-center">数据</div>
											<div class="match width56 text-center">操作</div>
										</div>
									</div>
								</ul>
							</div>
							<ul v-if="tabIndex == 3" class="football-score-container-header" style="">
								<li class="width93">赛事</li>
								<li class="width32 text-center">时间</li>
								<li class="width46 football-all-status margin-right-20">
									状态
								</li>
								<li class="teamName-score width420">
									<div class="hostTeam">主队</div>
									<div class="vs width40">比分</div>
									<div class="guestTeam">客队</div>
								</li>
								<div class="variable width547">
									<div class="immediate">
										<div class="model-one width180">
											<div class="width66 text-center">半场</div>
											<div class="corner width48 text-left">角球</div>
											<div>直播</div>
										</div>
										<div class="model-two width224">
											<div class="gou-container" @click="immediatelyCheck(1)">
												<div class="gou" :class="immediately.value1?'checked':'no-checked'">
												</div>
												<div class="rangqiu">亚</div>
											</div>
											<div class="gou-container" @click="immediatelyCheck(2)">
												<div class="gou" :class="immediately.value2?'checked':'no-checked'">
												</div>
												<div class="daxiao">大</div>
											</div>
											<div class="gou-container" @click="immediatelyCheck(3)">
												<div class="gou" :class="immediately.value3?'checked':'no-checked'">
												</div>
												<div class="europe">欧</div>
											</div>
										</div>
										<div class="width87 text-center">数据</div>
										<div class="text-center width56">操作</div>
									</div>
								</div>
							</ul>
						</div>
					</div>
				</div>
				<!-- 
			即使/赛果/赛程/收藏

		 -->
				<!--  v-loading="$store.state.loading" @scroll="$refs.football0.handleScroll2($event)"  @mouseover="changeFlag(false)"-->
				<!-- {{mainHeight}} -->
				<el-scrollbar wrapClass="scrollbar-wrap" :style="{height:tabIndex == 0?mainHeight + 'px':'auto'}"
					ref="scrollbarContainer">
					<!-- <football0 @setTab="setTab1" @setTypeTab="setTypeTab" @getNumber="getNumber" @getallNum="getallNum" v-if="tabIndex == 0" :id="id" :checked="checked"
						:lang="langIndex" ref="football0" :style="{marginTop:tabIndex == 0?'166px':''}"
						:typeTab="typeTab" :allCheck="allCheck">
					</football0> -->
					<football0 :itemHeight="immediately.value4?60:45" :height="height" @getList="getList" @getFootList="getFootList"
						:lang="langIndex" :topShow="topShow" :list="list1" :id="id" @getHeight="getHeight"
						@setHeight="setHeight" @setTop="setTop" @getallNum="getallNum" :topList="topList" ref="football0" v-show="tabIndex == 0"></football0>

					<football1 style="margin-top: 226px" v-if="tabIndex == 1" ref="football1" :time="timeType" :id="id"
						:lang="langIndex"></football1>
					<football2 style="margin-top: 226px" v-if="tabIndex == 2" ref="football2" :time="timeType" :id="id"
						:checked="checked" :lang="langIndex">
					</football2>
					<football3 style="margin-top: 166px" v-if="tabIndex == 3" :time="timeType" :id="id"
						:checked="checked" :lang="langIndex">
					</football3>
				</el-scrollbar>
				<!-- :style="{buttom:tabIndex == 0?height + 'px':'auto'}" -->
					<div class="football-score-legend-container" style="position: fixed;height: auto;background: transparent;bottom: 0;padding: 10px 0;background: white;margin-bottom: 0;"  v-if="tabIndex == 0">
						<div>
							<span class="label">图例:</span>
							<div class="legend-item flex-start" v-for="(item,index) in legendList" :key="index">
								<img :src="require('../../assets/images/f-'+index+'.png')" alt="" />{{item}}
							</div>
							<div class="legend-item">
								<img src="../../assets/images/yan.png" alt="">
								隐藏
							</div>
							<div class="legend-item">
								<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAKKADAAQAAAABAAAAKAAAAAB65masAAAE4ElEQVRYCe1Xb2hbVRS/56ZdJ8JExoSJgkPqn7a2NUkRZTKTdCStKFSLFB3i/DfRMRW/6Bz6YdNOkTGn25wDBxsIzlHRjaSbScqGfrFJunR0MqdiVxW1Ci1DWdq+e/zd9/ZKlvU1L0m/KLm0Ofeee87v/u65/84TolqqEahG4L8dAVoo+v2J1JMsxEvAWypIbOkI+ncsBPaCEOxPpu5lFoeZ2cQjIsZfVyTY9nmlJGWlAJqUYt5qkiN6F+TeMXWKem3ClYxRcQSjifR9gtUXIPZNR8h/hyYTSwx+jYjeRVI+2BH09VVCsOIIEqtXNAEs6Zs2EZA166ysPltfjqwogrGBwXvYEAMgdDoS9DVB4pxYJZZIZbHEzdLjWR0JeOO2vlRZWQQVWdETcms+OZMEy14tEcWNpZLKty8rgv0nUst5ikIs1AEQ+2mx9NUHAjSTD4zoefqT6TOQN0qSj1PNonh41W1j+TZu6kUJHjs+VG9Ms49ItWLjtwL0dhZ8jQ1Okp7DnbfLbufLWDL9NCK4Z1ZHNEGCs9ixwxh4GPpMJOTPzPbPUXEkeOyrzLVGzvgYpFZd6kcKC/c9dEOI3snFcun2QGDFhUttrFb07Nk6OTrxPAtqZuIWDHYL8GoKbFN15OkOhbyjBXqzWWg8a2Pk1PsmOXPW4hBehyEh5ZC82jMcbmn5e9ZwnkpnfX0O3W/bJiMjI4t++WOqQfFMM7PEavAabAF/TqjtsOmy7fKlI0Es453aUAq5IRLyHsh3Krfe2Ng4Bd+TF//3x+JpLC9r7DYnTOdTzOJny8nwOjlXrreCQMy/OmE5EvQIgeuBlGLxAu60TU4A5eqBuRmr9Cz8DZzyl51wHAmG29u+FB56VANgn2yOJgffcAIpVR9Npt8C5iYiMSOlfDgc8iWdMBxPse0QjQ9247TiNHMtCdrW0e7XKVXZJZZIb2NWLwJzGu9jT7G3uihBzSSWzNwvlDqIJakDyV2RkG89Bph91tywxQQJODvwtKzH1pkCue7OkO9wMV9XBC2S6TBm/plgcQWylHWY+YfFwPP7+xPptYrVR1jWC1J4HgiHvLH8fqe64x4sdACho4LpU60noX4v7C/WJinGtQ0u7T635LS9a4LaGLNv1LKWPfouK6nIWtZPm8CVcmspjq4JDgxwDabfBJYTTs/SfAOvXuk/p31BsQH7EbeYu+KaYI6zN1uHRD/25RVs+FMaI34ic5NbBMenrhBAkdFq6pjmJJhKpWr/nBRP4LNJLlsi9vr9/ulCDKzAKejuVko0Q357Wf8cCtcRJEO1aH+dweTj6OXC3fbY+ASfwcfTbla8c3xSfKd1ly+ltQ8NVpqgq+KaICLTpBHxPXnOlEhHYvFMD56s07h+9uFSXAH9j5jADyB2g9bhc3QESetDaFvXmRRj2hcgDaZ08eP+Hkyk+jBQF07ycTgdQlK4zjw0GATtMaRiW5Yt4X3nz/s4pzJrkW2/hnTtOs0BpLOw+QDtR7AHV0L1SWd7W4/uK1Zc70EmeUSw0aVzRETLSmJJ/IbBe/n6q/ZczP3s8fYiWd0vRyefge1GTKwFcrfdiW16xK4Xk64jqIGiicFXEY+nBPM4XpODiNhOHIZ/5hvkaDZ7pfpregOivQYkl0sS70WC/tfn86n2VSNQjcD/KQL/Asl/9EQxrKlwAAAAAElFTkSuQmCC"
									alt="收藏" />收藏
							</div>
						</div>
					</div>
				
			</main>

		</div>
	</div>
</template>

<script>
	import football0 from "../demo.vue";
	import areadata from "../areadata.js";
	import football1 from "./football-1.vue";
	import football2 from "./football-2.vue";
	import football3 from "./football-3.vue";
	import {
		match_filter,
		football_match,
		exponent_company
	} from "@/api/football.js";
	import {
		collect
	} from "@/api/common.js";
	
	import arrData from "../areadata.js";
	
	export default {
		components: {
			football0,
			football1,
			football2,
			football3
		},
		data() {
			return {
				mainHeight: 0,
				objNum: {
					a: 0,
					b: 0,
					c: 0,
					d: 0
				},
				id: 2,
				dataList: [],
				dataList1: [],
				checked: false, //是否打开列表的欧赔指数
				selectId: 1, //选中完整热门
				selectLi: '完整', //选中的完整热门
				boxLi: '',
				time: '',
				bosList: [],
				typeTab: 0,
				timeType: {},
				langMask: false,
				loading: false,
				allCheck: false, //全选
				footballList: [],
				scrollHeight: "",
				langIndex: 0,
				checkIndex: 0,
				match_id: 0,
				topShow: true,
				isSearch: false,
				num0: 0, //搜索改变数量
				allNum: 0, //搜索总数
				inputValue: '', //搜索内容
				loadingMask: false, //加载
				langList: ['简体', '繁体', 'English'],
				tabIndex: 0, //
				status: 'competition_id', //赛事选中的状态
				countryList: [], //赛事选中列表
				maskIndex: null, //显示的弹窗
				dateTime: [], //时间列表
				timeIndex: 0, //时间下表
				footList: [], //选中列表
				matchList: [],
				topList:[],//即时比分置顶列表
				matchList1: [],
				allList: [], //总数组
				concealList: [], //选中的保留
				screen: {
					list: [],
					country: {},
					count_1: null,
					count_2: null,
					competition: {},
					count_country: null,
					count_competition: null
				}, //筛选对象competition-赛事；country-国家
				pickerBeginDateBefore: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},
				pickerBeginDateBefore1: {
					disabledDate(time) {
						return time.getTime() < Date.now();
					}
				},
				height:(document.documentElement.clientHeight - 166) - 90,
				tabList: ["即时", "赛果", "赛程"],
				legendList: ['进球', '点球', '点球射失', '乌龙球', '换人', '角球', '黄牌', '红牌', '两黄变红', '受伤离场', '动画', '视频'],
			};
		},

		mounted() {
			let _this = this
			this.$store.state.type = 1
			this.getCheckList()
			this.getList();
			setInterval(res=>{
				this.getList();
			},60000)
			this.exponent_company()
			// {"type":"classify","classify_type":1}
			this.$WebSocket.send({
				type: "classify",
				classify_type: 0
			}, '', '')
			window.addEventListener('scroll', this.handleScroll, true)

			// document.addEventListener('click',function(e){
			// 	if(e.target.className != 'i') _this.maskIndex = null
			// })
		},
		computed: {
			shouNum() {
				return this.$store.state.shouNum
			},
			infos() {
				return this.$store.state.infos
			},
			game() {
				return this.$store.state.game
			},
			immediately() {
				return this.$store.state.immediately
			},
			list1() {
				return this.dataList1.filter(item => {

					return this.concealList.indexOf(item.id) === -1 && this.countryList.indexOf(item[this
						.status]) !== -1
				})
			},

		},
		created() {
			this.$store.state.loading = true
			// setTimeout(res => {
			// this.$store.state.loading = false
			// }, 3000)
			
			// this.height = (document.documentElement.clientHeight - 166) + 60
			
			this.langIndex = Number(localStorage.getItem('langIndex')) || 0
		},
		watch: {
			// 监听赛事切换监听
			checkIndex(e) {
				if (e == 0) {
					this.screen.list = this.screen.competition
				} else {
					this.screen.list = this.screen.country
				}
			},
			/* 监听socket返回 */
			'$store.state.football_exponent'(e) {
				// 判断是否为凌晨 ，凌晨时需要更新数据
				let datetime = localStorage.getItem('datetime')
				if (e.type == 'football_exponent' && e.datetime != datetime) {
					// this.getlist()
					localStorage.setItem('datetime', e.datetime)
				} else if (e.type == 'football_exponent' && e.datetime == datetime) {
					if (e.type == 'football_match') return
					localStorage.setItem('datetime', e.datetime)
				}
				if (this.tabIndex == 0) {
					this.$refs.football0.editItem(e)
				}



			},



			langIndex(e) {
				this.langMask = false

				localStorage.setItem('langIndex', e)
			},
			langMask(e) {
				if (e) {
					this.maskIndex = null

				}
			},
			tabIndex(e) {
				if (e == 1) {
					this.get6Days(2);
					this.timeIndex = 5
					if (this.tabIndex == 0) {
						this.$refs.football0.update()
					}
				} else if (e == 2) {
					this.timeIndex = 0
					this.get6Days(1);
				} else if (e == 0) {
					this.scrollHeight = ''
				} else {
					this.scrollHeight = '600px'
				}

				// this.$store.state.loading = true
				// setTimeout(res => {
				this.getCheckList()
				// }, 1000)
			},
			timeIndex(e) {
				if (e == null) {
					return
				}
				this.timeType = this.dateTime[e]
			},
			listType1(e) {
				this.listType1 = e
			},
			inputValue(e) {
				this.$refs['football' + this.tabIndex].searchText(e)

			}
		},
		methods: {
			/* 修改子集滚动状态 */
			changeFlag() {
				if (this.tabIndex == 0) {
					this.$refs.football0.changeFlag(false)
				}

			},
			/* 子集获取高度 */
			getHeight(e) {
				let i = 0
				this.dataList1.forEach(item=>{
					if(item.note) {
						i++
					}
				})
				console.log("123131: ",e + (i * 31));
				this.mainHeight = e + (i * 31)
			},
			/* 子集获取高度 */
			setHeight(e) {
				document.documentElement.scrollTop = e
			},

			// 开启websocket
			init() {
				//发起websocket连接
				let config = {}
				this.$WebSocket.WebSocketFn((res, config) => {
					if (!res) return;
					this.retundata();
					this.onclose();
				});
			},
			retundata() {
				//监听接受到websocket的信息
				this.$WebSocket.onmessage((res) => {
					this.$store.dispatch("WS_DATA_ACTIONS", res);
				});
			},
			onclose() {
				//监听长连接的一个断开
				this.$WebSocket.ws.onclose = () => {
					// this.$store.dispatch("setDeviceNum", "");
					// let info = this.$store.state.Counter.websocketinfo;
					this.init();
				};
			},
			// match_filter(){

			// },
			// 获取搜索总数
			getallNum(allNum) {
				this.allNum = allNum
			},
			/* 全选 */
			setAllCheck1() {
				if (this.tabIndex == 0) {
					this.$refs.football0.setAllCheck1(this.allCheck)
					this.allCheck = !this.allCheck
				}

			},
			// 监听滚动条
			handleScroll(e) {
				let path = this.$route.path
				if(path != '/football') return
				let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
				// console.log(this.$refs.football0)
				if (this.tabIndex == 0) {
					if(this.$refs.football0 == undefined) return
					this.$refs.football0.handleScroll2(scrollTop)
				}
				if (scrollTop > 60) {
					this.topShow = false
					this.height = (document.documentElement.clientHeight - 166)  - 30
				} else {
					this.height = (document.documentElement.clientHeight - 166) - 90,
					this.topShow = true
				}
			},
			// 搜索
			search() {
				// this.$refs['football'+this.tabIndex].searchText(this.inputValue)
				let allNum = this.$refs['football' + this.tabIndex].searchText(this.inputValue)
				setTimeout(res => {
				}, 1000)
				// this.allNum = allNum
			},

			// 滚动到搜索下一个
			searchScroll(status) {
				let {
					num,
					i
				} = this.$refs['football0'].searchScroll(status)
				document.documentElement.scrollTop = num
				this.num0 = i
			},
			// 清除搜查
			clearSearch() {
				this.inputValue = ''
				this.allNum = 0
				this.$refs['football' + this.tabIndex].clearSearch()
			},

			// 切换显示红牌 黄牌
			setGame(type, num) {
				if (type == 'voice' && num == 1) {
					this.$store.state.game[type] = true
				} else if (type == 'voice' && num == 2) {
					this.$store.state.game[type] = false
				}else if(type == 'lang'){
					this.langIndex = num
				} else {
					this.$store.state.game[type] = !this.$store.state.game[type]
				}
				this.$refs.popover3.doClose()
				localStorage.setItem('gameSeting', JSON.stringify(this.$store.state.game))
			},

			// 申请主播
			applyFor() {
				if (JSON.stringify(this.infos) === '{}') return this.$store.state.user.showLoginMask = true
				if (this.infos.is_anchor == 1) {
					let routeData = this.$router.resolve({
						path: "/member?type=9"
					})
					window.open(routeData.href, '_blank')
				} else {
					let routeData = this.$router.resolve({
						path: "/member?type=7"
					})
					window.open(routeData.href, '_blank')
				}

			},

			// 隐藏
			conceal() {
				if (this.footList.length == 0) return
				let arr = []
				this.dataList.forEach(item => {
					if (item.id == undefined) return
					if (this.footList.indexOf(item.id) !== -1) {
						arr.push(item.id)
					}
				})
				this.concealList = arr
				this.$store.state.concealNum = arr.length
			},
			// 保留
			retain() {
				if (this.footList.length == 0) return
				let arr = []
				this.dataList.forEach(item => {
					if (item.id == undefined) return
					if (this.footList.indexOf(item.id) == -1) {
						arr.push(item.id)
					}
				})
				this.$store.state.concealNum = arr.length
				this.concealList = arr
			},
			/* 获取选中列表 */
			getFootList(e) {
				this.footList = e
			},
			// 收藏
			collect() {
				// this.$refs.football0.collect()
				if (this.footList.length == 0) return
				let data = {
					id: this.footList.toString(),
					type: 2
				}
				collect(data).then(res => {
					this.getList()
					this.$message.success('操作成功')
				}).catch(res => {})
			},
			// 取消隐藏
			cancelConceal() {

				this.concealList = []
				this.$store.state.concealNum = 0

			},

			// 获取选中的赛事
			setCheckList() {
				let list = []
				let num = 0
				list.push(1000000)
				this.$refs.popover1.doClose()
				if (this.checkIndex == 0) {
					let arr = this.screen.competition

					for (let i in arr) {
						arr[i].list.forEach(item => {
							if (item.check) {
								list.push(item.id)
							} else {
								num += item.count
							}
						})
					}
					this.status = 'competition_id'
					this.countryList = list
				} else {
					let arr = this.screen.country
					for (let i in arr) {
						arr[i].list.forEach(item => {
							if (item.check) {

								list.push(item.id)
							} else {
								num += item.count
							}
						})
					}
					this.status = 'country_id'
					this.countryList = list
					
					// this.$refs['football' + this.tabIndex].screenList(list, 'country_id')
				}

				if (this.tabIndex == 0) {
					this.$refs.football0.update()
				}
				this.$store.state.concealNum = num
				this.getMaskShow(2)
			},
			// 全选/反选
			setAllCheck(status) {
				if (this.checkIndex == 0) {
					let arr = this.screen.competition
					for (let i in arr) {
						arr[i].list.forEach(item => {
							item.check = status
						})
					}
					if (status) {
						this.screen.count_2 = this.screen.count_competition
					} else {
						this.screen.count_2 = 0
					}
					this.screen.list = arr
				} else {
					let arr = this.screen.country
					for (let i in arr) {
						arr[i].list.forEach(item => {
							item.check = status
						})
					}
					if (status) {
						this.screen.count_1 = this.screen.count_country
					} else {
						this.screen.count_1 = 0
					}
					this.screen.list = arr
				}

			},
			setCheckStatus(e, item) {
				if (e.target.tagName === 'INPUT') return
				item.check = !item.check
				if (item.check && this.checkIndex == 0) {
					this.screen.count_2++
				}
				if (!item.check && this.checkIndex == 0) {
					this.screen.count_2--
				}
				if (item.check && this.checkIndex == 1) {
					this.screen.count_1++
				}
				if (!item.check && this.checkIndex == 1) {
					this.screen.count_1--
				}
			},

			// 调用筛选
			getCheckList() {
				let data = {
					ball: 0,
					type: this.match_id,
					match_filter: this.tabIndex,
				}
				if (this.tabIndex == 1 || this.tabIndex == 2) {
					data.date = this.timeType.day
				}
				match_filter(data)
					.then((res) => {
						res.data.count_1 = res.data.count_country
						res.data.count_2 = res.data.count_competition
						res.data.list = res.data.competition
						this.screen = res.data
						let list = []
						res.data.competition.forEach(item1 => {
							item1.list.forEach(item => {
								if (item.check) {
									list.push(item.id)
								}
							})
						})
						list.push(1000000)
						this.countryList = list
						this.status = 'competition_id'
						if (this.tabIndex != 0) {
							this.$refs['football' + this.tabIndex].screenList(list, 'competition_id')
						}
					}).catch(res => {})
			},

			addEvent() {
				//监听是否有网络
				if (!navigator.onLine) {
					this.onLine = true;
					this.$message.error("当前网络不可用");
					return;
				} else {
					this.$message.success("网络连接正常!");
				}
				// this.init();
			},


			// setItem(){
			// 	if(this.tabIndex == 0)
			// },

			// 选择公司
			selectTab(item, type) {
				console.log(type);
				if (type == 2) {
					this.id = item.id
					this.boxLi = item.name
					this.$WebSocket.send({
						type: "toggle",
						"company_id": item.id
					}, '', '')
					this.getList()
					this.$refs.popover.doClose()
				} else if (type == 1) {
					this.match_id = item.id
					this.$refs.popover2.doClose()
					this.getCheckList()
					this.selectId = item.id
					this.selectLi = item.name
				} else {
					this.selectId = item.id
					this.selectLi = item.name
					
				}
				
				this.maskIndex = null
			},

			// 获取公司列表
			exponent_company() {
				let _this = this
				exponent_company().then(resData => {
					let res = resData;
					res.data = resData.data&&resData.data.filter(item=>item.name != "BET365");
					this.id = res.data[0].id
					this.matchList1 = res.data
					this.boxLi = res.data[0].name


					this.$store.state.company_id = this.id
					this.init()
				}).catch(res => {})
			},


			getScroll(event) {
				// 滚动条距离底部的距离scrollBottom
				let scrollBottom =
					event.target.scrollHeight -
					event.target.scrollTop -
					event.target.clientHeight;
				// if (this.finished && scrollBottom < 40) {
				//  操作
				// }
			},
			// 显示隐藏弹窗
			getMaskShow(type) {
				if (this.maskIndex == type) {
					return this.maskIndex = null
				}
				if (this.langMask) {
					this.langMask = false
				}
				this.maskIndex = type
				if (type == 1) { //
					this.matchList = [{
							name: '完整',
							id: 0
						}, {
							name: '热门',
							id: 1
						}
						// {
						// 	name: '竞彩',
						// 	id: 2
						// },
						// {
						// 	name: '北单',
						// 	id: 2
						// },
					]
				} else if (type == 2) {

				} else if (type == 4) {

					// this.exponent_company()
					// this.matchList = ['威廉希尔','威廉希尔']
				}
			},
			// 修改三个状态高度
			setTypeTab(num) {
				document.documentElement.scrollTop = num - 165
			},
			// 切换高度
			setTab(type) {
				this.typeTab = type
				this.$nextTick(() => {
					// this.$refs['scrollbarContainer'].wrap.scrollTop = 500
					// document.querySelector(".el-main").scrollTop = anchor.offsetTop;
					// this.$refs.scrollbarContainer.scrollTop = 0
				});
			},
			setTab1(e) {
				this.typeTab = e
			},

			// 获取足球数组
			// 选中的日期
			change(e) {
				let data = {
					day: e,
				}

				this.timeType = data
				this.timeIndex = null
			},

			/* 设置置顶 */
			setTop(item) {

				this.setArr(this.dataList1, 2)
			},

			// 获取列表
			getList() {
				let data = {
					type: 4,
					isWeb: 1
				}
				// this.allList = arrData
				// this.setArr(arrData, 1)
				// return
				let _this = this
				football_match({
						type: 0,
						is_web: 1,
						company_id: this.id
					})
					.then((res) => {
						this.allList = res.data.data
						this.setArr(res.data.data, 1)
						
					})
					.catch((res) => {});
			},

			/* 重组数组 */
			setArr(data, type) {
				// return
				this.list = []
				let list1 = []
				let list2 = []
				let list3 = []
				let list4 = []
				let list5 = []
				let arr = []
				data.forEach(obj => {
					let obj1 = {
						eu: {
							scram: {
								win: 0,
								draw: 0,
								fail: 0
							},
							initial: {
								win: 0,
								draw: 0,
								fail: 0
							},
							immediate: {
								win: 0,
								draw: 0,
								fail: 0
							},
						},
						bs: {
							scram: {
								win: 0,
								draw: 0,
								fail: 0
							},
							initial: {
								win: 0,
								draw: 0,
								fail: 0
							},
							immediate: {
								win: 0,
								draw: 0,
								fail: 0
							},
						},
						asia: {
							scram: {
								win: 0,
								draw: 0,
								fail: 0
							},
							initial: {
								win: 0,
								draw: 0,
								fail: 0
							},
							immediate: {
								win: 0,
								draw: 0,
								fail: 0
							},
						},

					}
					obj = Object.assign(obj, obj1);
					if (obj.status === 8) { //完场
						obj.type = 3
						list3.push(obj)
					} else if (obj.status == 2 ||
						obj.status == 3 ||
						obj.status == 4 ||
						obj.status == 5 ||
						obj.status == 6 ||
						obj.status == 7) { //进行中

						obj.type = 1

						list1.push(obj)
					} else if (obj.status === 1) { //未开始
						obj.type = 2
						list2.push(obj)
					} else if (obj.status == 9 ||
						obj.status == 10 ||
						obj.status == 11 ||
						obj.status == 12 ||
						obj.status == 13) { //异常
						obj.type = 4
						list5.push(obj)
					} else {
						obj.type = 5
					}
					arr.push(obj.competition_id)
				})
				let id1 = null; //未开始
				if(list1.length == 0){
					id1 = 0
				}else {
					id1 = list1[list1.length - 1].id
				}
				let id2 = null ////已结束
				if(list2.length == 0){
					id2 = 0
				}else {
					id2 = list2[list2.length - 1].id
				}
				
				let id3 = null //异常
				if(list3.length == 0){
					id3 = 0
				}else {
					id3 = list3[list3.length - 1].id
				}
				let arrList = this.list.concat(list1).concat(list2).concat(list3).concat(list5)

				// let indexArr = [id1,id2,id3,]
				// 添加标题
				arrList.forEach((item, index) => {
					let obj = {
						competition_id: 1000000,
						country_id: 1000000,
						competition_name_zh: '进行中',
						imgUrl: require('@/assets/images/main-beigin.png')
					}
					if (item.id == id1) {
						obj.typeTitle = 1
						obj.imgUrl = require('@/assets/images/main-end.png')
						obj.competition_name_zh = '未开始'
						arrList.splice(index + 1, 0, obj)
					} else if (item.id == id2) {
						obj.typeTitle = 2
						obj.imgUrl = require('@/assets/images/main-ends.png')
						obj.competition_name_zh = '已结束'
						arrList.splice(index + 1, 0, obj)
					} else if (item.id == id3) {
						obj.typeTitle = 3
						obj.imgUrl = require('@/assets/images/main-yi.png')
						obj.competition_name_zh = '异常'
						arrList.splice(index + 1, 0, obj)
					}

				})
				if(id1 == 0) {
					arrList.splice(0, 0, {
						typeTitle: 1,
						competition_id: 1000000,
						country_id: 1000000,
						competition_name_zh: '未开始',
						imgUrl: require('@/assets/images/main-end.png')
					})
				}
				
				arrList.splice(0, 0, {
					typeTitle: 0,
					competition_id: 1000000,
					country_id: 1000000,
					competition_name_zh: '进行中',
					imgUrl: require('@/assets/images/main-beigin.png')
				})

				// this.updateVisibleData()
				/* 处理置顶思路
					1.判断列表长度
					2.将列表数据筛选
					3.在原来的数组中添加
				 */
				let topList = JSON.parse(localStorage.getItem('topList')) || []

				this.topList = topList
				/* 判断是否为空 */

				/* 
				 空：增加标题和选中的数据
				 非：增加选中的数据
				 第一次进入：获取缓存，渲染列表
				 */
				if (topList.length != 0) {
					// let newTopList = []
					let a =  arrList.filter((item, index) => {
						return topList.indexOf(item.id) !== -1
					})
					let b =  arrList.filter((item, index) => {
						return topList.indexOf(item.id) == -1
					})
					arrList = [...a,...b]
					arrList.splice(0, 0, {
						typeTitle: 4,
						competition_id: 1000000,
						country_id: 1000000,
						competition_name_zh: '置顶',
						imgUrl: require('@/assets/images/main-beigin.png')
					})
				}
				
				this.dataList = arrList
				this.dataList1 = arrList
				// this.$forceUpdate()
				// this.$nextTick(() => {
				// this.$emit('getHeight', this.mainHeight)
				// this.$refs.football0.update()
				
				// })
			},


			// 切换亚/大/欧
			immediatelyCheck(type) {
				let immediately = this.$store.state.immediately
				immediately['value' + type] = !immediately['value' + type]
				// 判断有三个为true
				if (immediately.value1 && immediately.value2 && immediately.value3) {
					immediately.value4 = true
				} else {
					immediately.value4 = false
				}
				localStorage.setItem('immediately', JSON.stringify(immediately))
			},
			// 获取数量
			getNumber(e) {
				this.objNum = e
			},


			getShow() {
				this.$refs.abc.focus()
			},
			//获取六天数据
			get6Days(type) {
				//type==1前,2后
				//获取系统当前时间
				var now = new Date();
				var nowTime = now.getTime();
				var oneDayTime = 24 * 60 * 60 * 1000;
				let arr = [];
				for (var i = 0; i < 6; i++) {
					//显示周一
					if (type == 1) {
						var ShowTime = nowTime + i * oneDayTime;
					} else {
						var ShowTime = nowTime - i * oneDayTime;
					}

					//                    var ShowTime = nowTime + (i+1)*oneDayTime ;
					//初始化日期时间
					var myDate = new Date(ShowTime);
					var year = myDate.getFullYear();
					var month = myDate.getMonth() + 1;
					var date = myDate.getDate();
					var str = "周" + "日一二三四五六".charAt(myDate.getDay());
					arr.push({
						data: month + "-" + date.toString().padStart(2, "0"),
						time: str,
						day: year + "-" + month + "-" + date,
					});
				}
				if (type == 1) {
					this.dateTime = arr;
				} else {
					this.dateTime = arr.reverse();
				}
			},
		},
	};
</script>

<style>
	/* @import '../../styles/style.css'; */
	.datePicker {
		position: absolute;
		top: 0;
		left: -50px;
		z-index: -1;
		/* visibility: hidden; */

	}

	.popover {
		padding: 0 !important;
	}
</style>
