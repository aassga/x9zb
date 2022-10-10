<template>
	<div>
		<div class="w-1200px-content">
			<div class="world-match-box">
				<div id="worldComp" class="world-comp">
					<div class="word-comp-tool">
						<div class="gulp-point-list acive-point-list">A组</div>
						<div class="gulp-point-list">B组</div>
					</div>
					<div class="comp-group-table-box">
						<div class="comp-group-table">
							<table class="match-integral sroll-table-th">
								<tr>
									<th class="w-46">排名</th>
									<th class="w-132">国家</th>
									<th class="w-68">胜平负</th>
									<th>净胜</th>
									<th>积分</th>
								</tr>
							</table>
						</div>
						<div class="match-integral-box">
							<table class="match-integral">
								<!-- 国家排名列表 -->
								<tr>
									<td class="size-16 w-46">
										<!----><canvas width="46" height="22"
											style="width: 46px; height: 22px;"></canvas>
									</td>
									<td class="w-132">
										<div class="team-box"><a target="_blank"
												href="https://www.leisu.com/data/zuqiu/team-11082"><i class="team-logo"
													style="background-image: url(&quot;https://cdn.leisu.com/nationflag/4bcd83a98bc4ee323ec93c0f0e704d04.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
												<p>厄瓜多尔</p>
											</a></div>
									</td>
									<td class="size-14 w-68"><canvas width="68" height="20"
											style="width: 68px; height: 20px;"></canvas></td>
									<td class="size-14"><canvas width="42" height="20"
											style="width: 42px; height: 20px;"></canvas></td>
									<td class="size-16"><canvas width="48" height="20"
											style="width: 48px; height: 20px;"></canvas></td>
								</tr>


							</table>
							<ul class="notes-home"></ul>
						</div>
					</div>
				</div>
				<div class="world-match">
					<!-- for循环两周 -->
					<div class="match-tool">
						<div class="match-tool-left my-button-disabled" tabindex="-1" role="button"
							aria-label="Previous slide" aria-disabled="true"><i
								class="iconfont icon-xiangzuojiantou"></i></div>
						<div
							class="match-time-box swiper-container swiper-container-initialized swiper-container-horizontal">

							<ul class="time-nva swiper-wrapper">
								<li class="swiper-slide li-acive swiper-slide-active" style="width: 106.857px;">
									<p>11/21</p>
									<p>周一</p>
								</li>
							</ul><span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
						</div>
						<div class="match-tool-right" tabindex="0" role="button" aria-label="Next slide"
							aria-disabled="false"><i class="iconfont icon-xiangyoujiantou"></i></div>
					</div>
					<!-- 列表有滚动条 -->
					<ul class="match-list-world">
						<li class="v-63">
							<a target="_blank" href="https://live.leisu.com/detail-3718447">
								<div class="world-home-a">
									<div class="time"><span>12-18</span>
										<p>23:00</p>
									</div>
									<div class="team-home-away">
										<div class="home">
											<p>第1场半决赛胜者</p> <i
												style="background-image: url(&quot;https://cdn.leisu.com/teamflag_s/2020/07/29/FhKSfuCxZZcDUw3e2fblwtCQfzwN?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
										</div>
										<div class="team-score"><canvas width="86" height="28"
												style="width: 86px; height: 28px;"></canvas></div>
										<div class="away"><i
												style="background-image: url(&quot;https://cdn.leisu.com/teamflag_s/2020/07/29/FhKSfuCxZZcDUw3e2fblwtCQfzwN?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
											<p>第2场半决赛胜者</p>
										</div>
									</div>
									<div class="odds">
										<p><canvas width="54" height="19" style="width: 54px; height: 19px;"></canvas>
										</p>
										<p><canvas width="54" height="19" style="width: 54px; height: 19px;"></canvas>
										</p>
									</div>
									<div class="odds">
										<p><canvas width="54" height="19" style="width: 54px; height: 19px;"></canvas>
										</p>
										<p><canvas width="54" height="19" style="width: 54px; height: 19px;"></canvas>
										</p>
									</div>
									<div class="odds m-r-10">
										<p><canvas width="54" height="19" style="width: 54px; height: 19px;"></canvas>
										</p>
										<p><canvas width="54" height="19" style="width: 54px; height: 19px;"></canvas>
										</p>
									</div>
									<div class="but-list">
										<!---->
									</div>
									<div class="but-list">
										<div class="nothing-but">暂无方案</div>
									</div> <object><a target="_blank" href="https://live.leisu.com/shujufenxi-3718447"
											class="arrow"><i class="iconfont icon-next"></i></a></object>
								</div>
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div class="world-news-box">
				<div id="worldMatchNews" class="news-match-box">
					<div class="match-news-box">
						<div class="match-news-list" v-for="(item,index) in 4">
							<div class="match-news-title-name">
								<ul class="title">
									<li class=" title-acive">G组</li>
									<li class="">H组</li>
								</ul>
								<ul class="team-name">
									<li>瑞士</li>
									<li>喀麦隆</li>
									<li>巴西</li>
									<li>塞尔维亚</li>
								</ul>
							</div>
							<div class="match-list">
								<div class="list"><a target="_blank" href="https://live.leisu.com/detail-3718461">
										<p class="time">11月24日 18:00</p>
										<p class="state">
											未开始
										</p>
										<div class="match-home-away">
											<div class="home">
												<p>瑞士</p> <i
													style="background-image: url(&quot;https://cdn.leisu.com/nationflag/4402fbc939277321386d11fd427eb2b6.png?imageView2/1/w/420/h/240&quot;);"></i>
											</div>
											<div class="score">VS</div>
											<div class="away"><i
													style="background-image: url(&quot;https://cdn.leisu.com/nationflag/e2ce14e81dba66dbff9cbc35ecfdb704.png?imageView2/1/w/420/h/240&quot;);"></i>
												<p>喀麦隆</p>
											</div>
										</div>
									</a></div>
								<div class="list"><a target="_blank" href="https://live.leisu.com/detail-3718460">
										<p class="time">11月25日 03:00</p>
										<p class="state">
											未开始
										</p>
										<div class="match-home-away">
											<div class="home">
												<p>巴西</p> <i
													style="background-image: url(&quot;https://cdn.leisu.com/nationflag/99bf3d153d4bf67d640051a1af322505.png?imageView2/1/w/420/h/240&quot;);"></i>
											</div>
											<div class="score">VS</div>
											<div class="away"><i
													style="background-image: url(&quot;https://cdn.leisu.com/nationflag/059bbd8df7767d3bc7829e3735c221e2.png?imageView2/1/w/420/h/240&quot;);"></i>
												<p>塞尔维亚</p>
											</div>
										</div>
									</a></div>
							</div>
							<div class="news-list-box"><a target="_blank" href="https://world.leisu.com/news/view-66823"
									class="news-list">2022卡塔尔世界杯分组及赛程出炉 揭幕战于11月21日正式打响</a><a target="_blank"
									href="https://world.leisu.com/news/view-66363" class="news-list">埃托奥：喀麦隆在世界杯的目标就是夺冠
									梦想不该被泯灭</a><a target="_blank" href="https://world.leisu.com/news/view-65667"
									class="news-list">姆巴佩：欧洲足球比南美先进
									所以最近的世界杯都是欧洲赢</a><a target="_blank" href="https://world.leisu.com/news/view-65465"
									class="news-list">曼奇尼：如果有球队被开除出世界杯 应该按世界排名递补</a>
							</div>
						</div>
					</div>
				</div>
				<div class="player-list">
					<ul class="list-ul">
						<li data-index="0"><span>射手榜</span></li>
						<li data-index="1"><span>助攻榜</span></li>
						<li data-index="2" class="li-acive"><span>大神榜</span></li>
					</ul>
					<ul class="player-ul">
						<li>
							<p class="ranking">1</p>
							<div class="player-info">
								<div class="player-img one "><i
										style="background: url(https://cdn.leisu.com/user/avatar/00673e66534a91d2?imageMogr2/auto-orient/thumbnail/200x200>);"></i>
								</div>
								<p class="player-name">闲人李大爷</p>
							</div>
							<p class="value-rate">90.00%</p>
						</li>
						<li>
							<p class="ranking">2</p>
							<div class="player-info">
								<div class="player-img two "><i
										style="background: url(https://cdn.leisu.com/user/avatar/af47af8458847bec?imageMogr2/auto-orient/thumbnail/200x200>);"></i>
								</div>
								<p class="player-name">兜兜里有糖</p>
							</div>
							<p class="value-rate">80.00%</p>
						</li>
						<li>
							<p class="ranking">3</p>
							<div class="player-info">
								<div class="player-img three"><i
										style="background: url(https://cdn.leisu.com/user/avatar/812285c4de02177c6c46b28a21cf7a99.png?imageMogr2/auto-orient/thumbnail/200x200>);"></i>
								</div>
								<p class="player-name">处座</p>
							</div>
							<p class="value-rate">78.57%</p>
						</li>
						<li>
							<p class="ranking">4</p>
							<div class="player-info">
								<div class="player-img"><i
										style="background: url(https://cdn.leisu.com/user/avatar/a40e66261c14beb4.png?imageMogr2/auto-orient/thumbnail/200x200>);"></i>
								</div>
								<p class="player-name">一帆风顺</p>
							</div>
							<p class="value-rate">75.00%</p>
						</li>
						<li>
							<p class="ranking">5</p>
							<div class="player-info">
								<div class="player-img"><i
										style="background: url(https://cdn.leisu.com/user/avatar/d79ad149e1f77b16673dea155fc4c810.png?imageMogr2/auto-orient/thumbnail/200x200>);"></i>
								</div>
								<p class="player-name">意中人</p>
							</div>
							<p class="value-rate">72.73%</p>
						</li>
						<li>
							<p class="ranking">6</p>
							<div class="player-info">
								<div class="player-img"><i
										style="background: url(https://cdn.leisu.com/user/avatar/dd44f5279732e9e0?imageMogr2/auto-orient/thumbnail/200x200>);"></i>
								</div>
								<p class="player-name">神算子推球</p>
							</div>
							<p class="value-rate">72.22%</p>
						</li>
						<li>
							<p class="ranking">7</p>
							<div class="player-info">
								<div class="player-img"><i
										style="background: url(https://cdn.leisu.com/user/avatar/80368caf3b513bc7?imageMogr2/auto-orient/thumbnail/200x200>);"></i>
								</div>
								<p class="player-name">高冷美女杀手</p>
							</div>
							<p class="value-rate">71.43%</p>
						</li>
						<li>
							<p class="ranking">8</p>
							<div class="player-info">
								<div class="player-img"><i
										style="background: url(https://cdn.leisu.com/media/2021/02/27/FoJn0ss6HJYoGLENfkXECO11kTVF?imageMogr2/auto-orient/thumbnail/200x200>);"></i>
								</div>
								<p class="player-name">小辣椒看球</p>
							</div>
							<p class="value-rate">70.83%</p>
						</li>
					</ul>
					<div class="nothing" style="display: none;">
						<p>暂无数据...</p>
					</div>
				</div>
			</div>
			<!---->
			<div id="teamData">
				<ul class="comp-ul">
					<li class="li-acive">A组</li>
					<li class="">B组</li>
				</ul>
				<div class="country-swp">
					<div class="left my-button-disabled" tabindex="-1" role="button" aria-label="Previous slide"
						aria-disabled="true"><i class="iconfont icon-xiangzuojiantou"></i></div>
					<div class="country-cent swiper-container swiper-container-initialized swiper-container-horizontal">
						<ul class="country-info swiper-wrapper">
							<li class="swiper-slide li-acive swiper-slide-active"
								style="width: 104.444px; margin-right: 23px;"><i class="country-img"
									style="background-image: url(&quot;https://cdn.leisu.com/nationflag/fb9d433088a21464e7d634c4e190b31a.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
								<p class="country-name">荷兰</p>
							</li>
							<li class="swiper-slide swiper-slide-next" style="width: 104.444px; margin-right: 23px;"><i
									class="country-img"
									style="background-image: url(&quot;https://cdn.leisu.com/nationflag/81a0c4689fb7ce553a0d5c2fd19b6efd.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
								<p class="country-name">塞内加尔</p>
							</li>
						</ul><span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span><span
							class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
					</div>
					<div class="right my-button-disabled" tabindex="-1" role="button" aria-label="Next slide"
						aria-disabled="true"><i class="iconfont icon-xiangyoujiantou"></i></div>
				</div>
				<div class="country-data">
					<div class="data-top">
						<div class="w-100"><b><canvas width="78" height="44"
									style="width: 78px; height: 44px;"></canvas></b>
							<p>排名</p>
						</div>
						<div class="w-275">
							<p class="value"><canvas width="247" height="28"
									style="width: 247px; height: 28px;"></canvas></p>
							<ul class="record">
								<li class="won">
									胜
								</li>
								<li class="won">
									胜
								</li>
								<li class="">
									平
								</li>
								<li class="won">
									胜
								</li>
								<li class="won">
									胜
								</li>
								<li class="">
									平
								</li>
								<li class="won">
									胜
								</li>
								<li class="won">
									胜
								</li>
								<li class="">
									平
								</li>
								<li class="won">
									胜
								</li>
							</ul>
							<p class="tps">近10场战绩（胜/平/负）</p>
						</div>
						<div class="top-1"><b><canvas width="78" height="44"
									style="width: 78px; height: 44px;"></canvas></b>
							<p>进球</p>
						</div>
						<div class="top-1"><b><canvas width="78" height="44"
									style="width: 78px; height: 44px;"></canvas></b>
							<p>失球</p>
						</div>
						<div class="top-1 sign-cav"><b><canvas width="52" height="44"
									style="width: 52px; height: 44px;"></canvas></b>
							<p>胜率</p>
						</div>
						<div class="top-1 sign-cav"><b><canvas width="52" height="44"
									style="width: 52px; height: 44px;"></canvas></b>
							<p>赢率</p>
						</div>
						<div class="top-1 sign-cav"><b><canvas width="52" height="44"
									style="width: 52px; height: 44px;"></canvas></b>
							<p>大率</p>
						</div>
					</div>
					<div class="team-box">
						<div class="team-title">前锋</div>
						<div class="team-player-box">
							<div class="team-list"><a target="_blank"
									href="https://www.leisu.com/data/zuqiu/player-34146"><i
										style="background-image: url(&quot;https://cdn.leisu.com/avatar/3f339642b22e61f9282a48428aa5b9a9.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
									<p class="player-name">10 德佩</p>
								</a>
								<div class="team-tool">
									<div class="tool-box">
										<div class="img"><i class="country-img"
												style="background-image: url(&quot;https://cdn.leisu.com/avatar/3f339642b22e61f9282a48428aa5b9a9.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
										</div>
										<p>德佩</p> <span>M. Depay</span>
										<div class="tool-list">
											<div>
												<p class="grey-t">身价:</p>
												<p class="grey-t">位置:</p>
											</div>
											<div>
												<p>3500万欧</p>
												<p>前锋</p>
											</div>
											<div>
												<p class="grey-t">出生日期:</p>
												<p class="grey-t">身高:</p>
											</div>
											<div>
												<p>1994-02-13</p>
												<p>176cm</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="team-list"><a target="_blank"
									href="https://www.leisu.com/data/zuqiu/player-88610"><i
										style="background-image: url(&quot;https://cdn.leisu.com/avatar/631adc6ff5abd981066344fd8471800d.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
									<p class="player-name">26 加科普</p>
								</a>
								<div class="team-tool">
									<div class="tool-box">
										<div class="img"><i class="country-img"
												style="background-image: url(&quot;https://cdn.leisu.com/avatar/631adc6ff5abd981066344fd8471800d.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
										</div>
										<p>加科普</p> <span>C.Gakpo</span>
										<div class="tool-list">
											<div>
												<p class="grey-t">身价:</p>
												<p class="grey-t">位置:</p>
											</div>
											<div>
												<p>3000万欧</p>
												<p>前锋</p>
											</div>
											<div>
												<p class="grey-t">出生日期:</p>
												<p class="grey-t">身高:</p>
											</div>
											<div>
												<p>1999-05-07</p>
												<p>189cm</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="team-list"><a target="_blank"
									href="https://www.leisu.com/data/zuqiu/player-92625"><i
										style="background-image: url(&quot;https://cdn.leisu.com/avatar/483464c0e5d82a51eab616e6d85da674.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
									<p class="player-name">7 朗</p>
								</a>
								<div class="team-tool">
									<div class="tool-box">
										<div class="img"><i class="country-img"
												style="background-image: url(&quot;https://cdn.leisu.com/avatar/483464c0e5d82a51eab616e6d85da674.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
										</div>
										<p>朗</p> <span>N. Lang</span>
										<div class="tool-list">
											<div>
												<p class="grey-t">身价:</p>
												<p class="grey-t">位置:</p>
											</div>
											<div>
												<p>2200万欧</p>
												<p>前锋</p>
											</div>
											<div>
												<p class="grey-t">出生日期:</p>
												<p class="grey-t">身高:</p>
											</div>
											<div>
												<p>1999-06-17</p>
												<p>179cm</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="team-list"><a target="_blank"
									href="https://www.leisu.com/data/zuqiu/player-52727"><i
										style="background-image: url(&quot;https://cdn.leisu.com/avatar/1ca70525d28eb1561dbb024f8e74277a.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
									<p class="player-name">0 贝尔温</p>
								</a>
								<div class="team-tool">
									<div class="tool-box">
										<div class="img"><i class="country-img"
												style="background-image: url(&quot;https://cdn.leisu.com/avatar/1ca70525d28eb1561dbb024f8e74277a.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
										</div>
										<p>贝尔温</p> <span>S. Bergwijn</span>
										<div class="tool-list">
											<div>
												<p class="grey-t">身价:</p>
												<p class="grey-t">位置:</p>
											</div>
											<div>
												<p>1800万欧</p>
												<p>前锋</p>
											</div>
											<div>
												<p class="grey-t">出生日期:</p>
												<p class="grey-t">身高:</p>
											</div>
											<div>
												<p>1997-10-08</p>
												<p>178cm</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="team-list"><a target="_blank"
									href="https://www.leisu.com/data/zuqiu/player-44622"><i
										style="background-image: url(&quot;https://cdn.leisu.com/avatar/67d1acb5dd158492f07a6bde3735aad5.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
									<p class="player-name">19 韦格霍斯特</p>
								</a>
								<div class="team-tool">
									<div class="tool-box">
										<div class="img"><i class="country-img"
												style="background-image: url(&quot;https://cdn.leisu.com/avatar/67d1acb5dd158492f07a6bde3735aad5.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
										</div>
										<p>韦格霍斯特</p> <span>W. Weghorst</span>
										<div class="tool-list">
											<div>
												<p class="grey-t">身价:</p>
												<p class="grey-t">位置:</p>
											</div>
											<div>
												<p>1700万欧</p>
												<p>前锋</p>
											</div>
											<div>
												<p class="grey-t">出生日期:</p>
												<p class="grey-t">身高:</p>
											</div>
											<div>
												<p>1992-08-07</p>
												<p>197cm</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="team-list"><a target="_blank"
									href="https://www.leisu.com/data/zuqiu/player-28792"><i
										style="background-image: url(&quot;https://cdn.leisu.com/avatar/1fb53732c129dad8bcb972efc61aa3db.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
									<p class="player-name">11 博古伊斯</p>
								</a>
								<div class="team-tool">
									<div class="tool-box">
										<div class="img"><i class="country-img"
												style="background-image: url(&quot;https://cdn.leisu.com/avatar/1fb53732c129dad8bcb972efc61aa3db.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
										</div>
										<p>博古伊斯</p> <span>S.Berghuis</span>
										<div class="tool-list">
											<div>
												<p class="grey-t">身价:</p>
												<p class="grey-t">位置:</p>
											</div>
											<div>
												<p>1400万欧</p>
												<p>前锋</p>
											</div>
											<div>
												<p class="grey-t">出生日期:</p>
												<p class="grey-t">身高:</p>
											</div>
											<div>
												<p>1991-12-19</p>
												<p>182cm</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="team-list"><a target="_blank"
									href="https://www.leisu.com/data/zuqiu/player-50468"><i
										style="background-image: url(&quot;https://cdn.leisu.com/avatar/1966f1d4cc9bf0bec4b9de8208017e20.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
									<p class="player-name">0 扬森</p>
								</a>
								<div class="team-tool">
									<div class="tool-box">
										<div class="img"><i class="country-img"
												style="background-image: url(&quot;https://cdn.leisu.com/avatar/1966f1d4cc9bf0bec4b9de8208017e20.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
										</div>
										<p>扬森</p> <span>V. Janssen</span>
										<div class="tool-list">
											<div>
												<p class="grey-t">身价:</p>
												<p class="grey-t">位置:</p>
											</div>
											<div>
												<p>200万欧</p>
												<p>前锋</p>
											</div>
											<div>
												<p class="grey-t">出生日期:</p>
												<p class="grey-t">身高:</p>
											</div>
											<div>
												<p>1994-06-15</p>
												<p>184cm</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="team-box">
						<div class="team-title">中场</div>
						<div class="team-player-box">
							<div class="team-list"><a target="_blank"
									href="https://www.leisu.com/data/zuqiu/player-61606"><i
										style="background-image: url(&quot;https://cdn.leisu.com/avatar/854d87274312afcd0e5ddbb1e638c5ac.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
									<p class="player-name">21 德容</p>
								</a>
								<div class="team-tool">
									<div class="tool-box">
										<div class="img"><i class="country-img"
												style="background-image: url(&quot;https://cdn.leisu.com/avatar/854d87274312afcd0e5ddbb1e638c5ac.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
										</div>
										<p>德容</p> <span>F. de Jong</span>
										<div class="tool-list">
											<div>
												<p class="grey-t">身价:</p>
												<p class="grey-t">位置:</p>
											</div>
											<div>
												<p>6000万欧</p>
												<p>中场</p>
											</div>
											<div>
												<p class="grey-t">出生日期:</p>
												<p class="grey-t">身高:</p>
											</div>
											<div>
												<p>1997-05-12</p>
												<p>180cm</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="team-list"><a target="_blank"
									href="https://www.leisu.com/data/zuqiu/player-64962"><i
										style="background-image: url(&quot;https://cdn.leisu.com/avatar/5b40859b35fc6c2c8e3d5724a58de683.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
									<p class="player-name">20 库普梅纳斯</p>
								</a>
								<div class="team-tool">
									<div class="tool-box">
										<div class="img"><i class="country-img"
												style="background-image: url(&quot;https://cdn.leisu.com/avatar/5b40859b35fc6c2c8e3d5724a58de683.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
										</div>
										<p>库普梅纳斯</p> <span>T. Koopmeiners</span>
										<div class="tool-list">
											<div>
												<p class="grey-t">身价:</p>
												<p class="grey-t">位置:</p>
											</div>
											<div>
												<p>2500万欧</p>
												<p>中场</p>
											</div>
											<div>
												<p class="grey-t">出生日期:</p>
												<p class="grey-t">身高:</p>
											</div>
											<div>
												<p>1998-02-28</p>
												<p>183cm</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="team-list"><a target="_blank"
									href="https://www.leisu.com/data/zuqiu/player-28429"><i
										style="background-image: url(&quot;https://cdn.leisu.com/avatar/167851c17c58ef30cc7e81658edcaa92.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
									<p class="player-name">14 克拉森</p>
								</a>
								<div class="team-tool">
									<div class="tool-box">
										<div class="img"><i class="country-img"
												style="background-image: url(&quot;https://cdn.leisu.com/avatar/167851c17c58ef30cc7e81658edcaa92.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
										</div>
										<p>克拉森</p> <span>D. Klaassen</span>
										<div class="tool-list">
											<div>
												<p class="grey-t">身价:</p>
												<p class="grey-t">位置:</p>
											</div>
											<div>
												<p>1400万欧</p>
												<p>中场</p>
											</div>
											<div>
												<p class="grey-t">出生日期:</p>
												<p class="grey-t">身高:</p>
											</div>
											<div>
												<p>1993-02-21</p>
												<p>179cm</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="team-list"><a target="_blank"
									href="https://www.leisu.com/data/zuqiu/player-81495"><i
										style="background-image: url(&quot;https://cdn.leisu.com/avatar/1da4d467b65570b54184078106ba461d.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
									<p class="player-name">0 斯考滕</p>
								</a>
								<div class="team-tool">
									<div class="tool-box">
										<div class="img"><i class="country-img"
												style="background-image: url(&quot;https://cdn.leisu.com/avatar/1da4d467b65570b54184078106ba461d.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
										</div>
										<p>斯考滕</p> <span>J. Schouten</span>
										<div class="tool-list">
											<div>
												<p class="grey-t">身价:</p>
												<p class="grey-t">位置:</p>
											</div>
											<div>
												<p>900万欧</p>
												<p>中场</p>
											</div>
											<div>
												<p class="grey-t">出生日期:</p>
												<p class="grey-t">身高:</p>
											</div>
											<div>
												<p>1997-01-12</p>
												<p>185cm</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="team-list"><a target="_blank"
									href="https://www.leisu.com/data/zuqiu/player-82363"><i
										style="background-image: url(&quot;https://cdn.leisu.com/avatar/75f4b9e915d62a6131a3115158e90e53.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
									<p class="player-name">12 蒂尔</p>
								</a>
								<div class="team-tool">
									<div class="tool-box">
										<div class="img"><i class="country-img"
												style="background-image: url(&quot;https://cdn.leisu.com/avatar/75f4b9e915d62a6131a3115158e90e53.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
										</div>
										<p>蒂尔</p> <span>G.Til</span>
										<div class="tool-list">
											<div>
												<p class="grey-t">身价:</p>
												<p class="grey-t">位置:</p>
											</div>
											<div>
												<p>700万欧</p>
												<p>中场</p>
											</div>
											<div>
												<p class="grey-t">出生日期:</p>
												<p class="grey-t">身高:</p>
											</div>
											<div>
												<p>1997-12-22</p>
												<p>183cm</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="team-box">
						<div class="team-title">后卫</div>
						<div class="team-player-box">
							<div class="team-list"><a target="_blank"
									href="https://www.leisu.com/data/zuqiu/player-64961"><i
										style="background-image: url(&quot;https://cdn.leisu.com/avatar/3b90d09279c001ff1d68611d3a48d23f.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
									<p class="player-name">3 德里赫特</p>
								</a>
								<div class="team-tool">
									<div class="tool-box">
										<div class="img"><i class="country-img"
												style="background-image: url(&quot;https://cdn.leisu.com/avatar/3b90d09279c001ff1d68611d3a48d23f.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
										</div>
										<p>德里赫特</p> <span>M. de Ligt</span>
										<div class="tool-list">
											<div>
												<p class="grey-t">身价:</p>
												<p class="grey-t">位置:</p>
											</div>
											<div>
												<p>7000万欧</p>
												<p>后卫</p>
											</div>
											<div>
												<p class="grey-t">出生日期:</p>
												<p class="grey-t">身高:</p>
											</div>
											<div>
												<p>1999-08-12</p>
												<p>188cm</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="team-list"><a target="_blank"
									href="https://www.leisu.com/data/zuqiu/player-36778"><i
										style="background-image: url(&quot;https://cdn.leisu.com/avatar/759ebaf5de87ba9c8be42e1524ec6296.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
									<p class="player-name">4 范迪克</p>
								</a>
								<div class="team-tool">
									<div class="tool-box">
										<div class="img"><i class="country-img"
												style="background-image: url(&quot;https://cdn.leisu.com/avatar/759ebaf5de87ba9c8be42e1524ec6296.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
										</div>
										<p>范迪克</p> <span>V. van Dijk</span>
										<div class="tool-list">
											<div>
												<p class="grey-t">身价:</p>
												<p class="grey-t">位置:</p>
											</div>
											<div>
												<p>5500万欧</p>
												<p>后卫</p>
											</div>
											<div>
												<p class="grey-t">出生日期:</p>
												<p class="grey-t">身高:</p>
											</div>
											<div>
												<p>1991-07-08</p>
												<p>193cm</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="team-list"><a target="_blank"
									href="https://www.leisu.com/data/zuqiu/player-109940"><i
										style="background-image: url(&quot;https://cdn.leisu.com/avatar/42e24c30327a6189a3d454b69a93541c.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
									<p class="player-name">25 提姆博</p>
								</a>
								<div class="team-tool">
									<div class="tool-box">
										<div class="img"><i class="country-img"
												style="background-image: url(&quot;https://cdn.leisu.com/avatar/42e24c30327a6189a3d454b69a93541c.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
										</div>
										<p>提姆博</p> <span>J.Timber</span>
										<div class="tool-list">
											<div>
												<p class="grey-t">身价:</p>
												<p class="grey-t">位置:</p>
											</div>
											<div>
												<p>3500万欧</p>
												<p>后卫</p>
											</div>
											<div>
												<p class="grey-t">出生日期:</p>
												<p class="grey-t">身高:</p>
											</div>
											<div>
												<p>2001-06-17</p>
												<p>179cm</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="team-list"><a target="_blank"
									href="https://www.leisu.com/data/zuqiu/player-27570"><i
										style="background-image: url(&quot;https://cdn.leisu.com/avatar/0292f209be1008eb051f2c19588c0d3b.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
									<p class="player-name">6 德弗里</p>
								</a>
								<div class="team-tool">
									<div class="tool-box">
										<div class="img"><i class="country-img"
												style="background-image: url(&quot;https://cdn.leisu.com/avatar/0292f209be1008eb051f2c19588c0d3b.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
										</div>
										<p>德弗里</p> <span>S.de Vrij</span>
										<div class="tool-list">
											<div>
												<p class="grey-t">身价:</p>
												<p class="grey-t">位置:</p>
											</div>
											<div>
												<p>2800万欧</p>
												<p>后卫</p>
											</div>
											<div>
												<p class="grey-t">出生日期:</p>
												<p class="grey-t">身高:</p>
											</div>
											<div>
												<p>1992-02-05</p>
												<p>189cm</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="team-list"><a target="_blank"
									href="https://www.leisu.com/data/zuqiu/player-36404"><i
										style="background-image: url(&quot;https://cdn.leisu.com/avatar/3cece7cac0c97c02bb59167e5153ea21.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
									<p class="player-name">4 阿克</p>
								</a>
								<div class="team-tool">
									<div class="tool-box">
										<div class="img"><i class="country-img"
												style="background-image: url(&quot;https://cdn.leisu.com/avatar/3cece7cac0c97c02bb59167e5153ea21.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
										</div>
										<p>阿克</p> <span>N. Aké</span>
										<div class="tool-list">
											<div>
												<p class="grey-t">身价:</p>
												<p class="grey-t">位置:</p>
											</div>
											<div>
												<p>2500万欧</p>
												<p>后卫</p>
											</div>
											<div>
												<p class="grey-t">出生日期:</p>
												<p class="grey-t">身高:</p>
											</div>
											<div>
												<p>1995-02-18</p>
												<p>180cm</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="team-list"><a target="_blank"
									href="https://www.leisu.com/data/zuqiu/player-57858"><i
										style="background-image: url(&quot;https://cdn.leisu.com/avatar/fb58f6a3a2705418d7782dda92b2eb34.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
									<p class="player-name">22 邓弗里斯</p>
								</a>
								<div class="team-tool">
									<div class="tool-box">
										<div class="img"><i class="country-img"
												style="background-image: url(&quot;https://cdn.leisu.com/avatar/fb58f6a3a2705418d7782dda92b2eb34.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
										</div>
										<p>邓弗里斯</p> <span>D. Dumfries</span>
										<div class="tool-list">
											<div>
												<p class="grey-t">身价:</p>
												<p class="grey-t">位置:</p>
											</div>
											<div>
												<p>2500万欧</p>
												<p>后卫</p>
											</div>
											<div>
												<p class="grey-t">出生日期:</p>
												<p class="grey-t">身高:</p>
											</div>
											<div>
												<p>1996-04-18</p>
												<p>189cm</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="team-list"><a target="_blank"
									href="https://www.leisu.com/data/zuqiu/player-74421"><i
										style="background-image: url(&quot;https://cdn.leisu.com/avatar/b8195383de05dbb7f687802555bfd7ec.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
									<p class="player-name">5 马雷西亚</p>
								</a>
								<div class="team-tool">
									<div class="tool-box">
										<div class="img"><i class="country-img"
												style="background-image: url(&quot;https://cdn.leisu.com/avatar/b8195383de05dbb7f687802555bfd7ec.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
										</div>
										<p>马雷西亚</p> <span>T. Malacia</span>
										<div class="tool-list">
											<div>
												<p class="grey-t">身价:</p>
												<p class="grey-t">位置:</p>
											</div>
											<div>
												<p>1700万欧</p>
												<p>后卫</p>
											</div>
											<div>
												<p class="grey-t">出生日期:</p>
												<p class="grey-t">身高:</p>
											</div>
											<div>
												<p>1999-08-17</p>
												<p>173cm</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="team-list"><a target="_blank"
									href="https://www.leisu.com/data/zuqiu/player-52168"><i
										style="background-image: url(&quot;https://cdn.leisu.com/avatar/cb98ba14f25f9fb4dfb92e024eeb411e.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
									<p class="player-name">0 哈特波尔</p>
								</a>
								<div class="team-tool">
									<div class="tool-box">
										<div class="img"><i class="country-img"
												style="background-image: url(&quot;https://cdn.leisu.com/avatar/cb98ba14f25f9fb4dfb92e024eeb411e.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
										</div>
										<p>哈特波尔</p> <span>H. Hateboer</span>
										<div class="tool-list">
											<div>
												<p class="grey-t">身价:</p>
												<p class="grey-t">位置:</p>
											</div>
											<div>
												<p>1300万欧</p>
												<p>后卫</p>
											</div>
											<div>
												<p class="grey-t">出生日期:</p>
												<p class="grey-t">身高:</p>
											</div>
											<div>
												<p>1994-01-09</p>
												<p>185cm</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="team-list"><a target="_blank"
									href="https://www.leisu.com/data/zuqiu/player-19966"><i
										style="background-image: url(&quot;https://cdn.leisu.com/avatar/8163a347312c4d6caf847f349fa79e22.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
									<p class="player-name">17 布林德</p>
								</a>
								<div class="team-tool">
									<div class="tool-box">
										<div class="img"><i class="country-img"
												style="background-image: url(&quot;https://cdn.leisu.com/avatar/8163a347312c4d6caf847f349fa79e22.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
										</div>
										<p>布林德</p> <span>D. Blind</span>
										<div class="tool-list">
											<div>
												<p class="grey-t">身价:</p>
												<p class="grey-t">位置:</p>
											</div>
											<div>
												<p>900万欧</p>
												<p>后卫</p>
											</div>
											<div>
												<p class="grey-t">出生日期:</p>
												<p class="grey-t">身高:</p>
											</div>
											<div>
												<p>1990-03-09</p>
												<p>180cm</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="team-list"><a target="_blank"
									href="https://www.leisu.com/data/zuqiu/player-30756"><i
										style="background-image: url(&quot;https://cdn.leisu.com/avatar/36a8e3bb63d4da314e370a518e29cf0f.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
									<p class="player-name">0 因迪</p>
								</a>
								<div class="team-tool">
									<div class="tool-box">
										<div class="img"><i class="country-img"
												style="background-image: url(&quot;https://cdn.leisu.com/avatar/36a8e3bb63d4da314e370a518e29cf0f.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
										</div>
										<p>因迪</p> <span>B. M. Indi</span>
										<div class="tool-list">
											<div>
												<p class="grey-t">身价:</p>
												<p class="grey-t">位置:</p>
											</div>
											<div>
												<p>200万欧</p>
												<p>后卫</p>
											</div>
											<div>
												<p class="grey-t">出生日期:</p>
												<p class="grey-t">身高:</p>
											</div>
											<div>
												<p>1992-02-08</p>
												<p>181cm</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="team-list"><a target="_blank"
									href="https://www.leisu.com/data/zuqiu/player-1259314"><i
										style="background-image: url(&quot;https://cdn.leisu.com/avatar/ab8ae7fb2840f832d22b58121aa8de35.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
									<p class="player-name">0 特兹</p>
								</a>
								<div class="team-tool">
									<div class="tool-box">
										<div class="img"><i class="country-img"
												style="background-image: url(&quot;https://cdn.leisu.com/avatar/ab8ae7fb2840f832d22b58121aa8de35.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
										</div>
										<p>特兹</p> <span>j.teze</span>
										<div class="tool-list">
											<div>
												<p class="grey-t">身价:</p>
												<p class="grey-t">位置:</p>
											</div>
											<div>
												<p>-</p>
												<p>后卫</p>
											</div>
											<div>
												<p class="grey-t">出生日期:</p>
												<p class="grey-t">身高:</p>
											</div>
											<div>
												<p>1999-09-30</p>
												<p>0cm</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="team-box">
						<div class="team-title">门将</div>
						<div class="team-player-box">
							<div class="team-list"><a target="_blank"
									href="https://www.leisu.com/data/zuqiu/player-39141"><i
										style="background-image: url(&quot;https://cdn.leisu.com/avatar/7f8524f7b1c28187419b4eabe17c988b.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
									<p class="player-name">23 弗莱肯</p>
								</a>
								<div class="team-tool">
									<div class="tool-box">
										<div class="img"><i class="country-img"
												style="background-image: url(&quot;https://cdn.leisu.com/avatar/7f8524f7b1c28187419b4eabe17c988b.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
										</div>
										<p>弗莱肯</p> <span>M. Flekken</span>
										<div class="tool-list">
											<div>
												<p class="grey-t">身价:</p>
												<p class="grey-t">位置:</p>
											</div>
											<div>
												<p>700万欧</p>
												<p>守门员</p>
											</div>
											<div>
												<p class="grey-t">出生日期:</p>
												<p class="grey-t">身高:</p>
											</div>
											<div>
												<p>1993-06-13</p>
												<p>194cm</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="team-list"><a target="_blank"
									href="https://www.leisu.com/data/zuqiu/player-31590"><i
										style="background-image: url(&quot;https://cdn.leisu.com/avatar/bb124c14bfa9b0748e5de66ac87d553f.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
									<p class="player-name">0 西莱森</p>
								</a>
								<div class="team-tool">
									<div class="tool-box">
										<div class="img"><i class="country-img"
												style="background-image: url(&quot;https://cdn.leisu.com/avatar/bb124c14bfa9b0748e5de66ac87d553f.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
										</div>
										<p>西莱森</p> <span>J. Cillessen</span>
										<div class="tool-list">
											<div>
												<p class="grey-t">身价:</p>
												<p class="grey-t">位置:</p>
											</div>
											<div>
												<p>300万欧</p>
												<p>守门员</p>
											</div>
											<div>
												<p class="grey-t">出生日期:</p>
												<p class="grey-t">身高:</p>
											</div>
											<div>
												<p>1989-04-22</p>
												<p>185cm</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="team-list"><a target="_blank"
									href="https://www.leisu.com/data/zuqiu/player-13712"><i
										style="background-image: url(&quot;https://cdn.leisu.com/avatar/00faa5993893e283b15a5ae77a7567c6.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
									<p class="player-name">13 克鲁尔</p>
								</a>
								<div class="team-tool">
									<div class="tool-box">
										<div class="img"><i class="country-img"
												style="background-image: url(&quot;https://cdn.leisu.com/avatar/00faa5993893e283b15a5ae77a7567c6.png?imageMogr2/auto-orient/thumbnail/200x200>&quot;);"></i>
										</div>
										<p>克鲁尔</p> <span>T. Krul</span>
										<div class="tool-list">
											<div>
												<p class="grey-t">身价:</p>
												<p class="grey-t">位置:</p>
											</div>
											<div>
												<p>200万欧</p>
												<p>守门员</p>
											</div>
											<div>
												<p class="grey-t">出生日期:</p>
												<p class="grey-t">身高:</p>
											</div>
											<div>
												<p>1988-04-03</p>
												<p>193cm</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="w-1200px-content margin-top-30">
			<div class="info-title">参赛国家</div>
			<div class="compete-country">
				<div class="region-left">
					<div class="region-li " style="left:354px;top:176px" data-index="0" data-length="5">
						<p>亚洲(5)</p>
					</div>
					<div class="region-li " style="left:141px;top:210px" data-index="1" data-length="4">
						<p>南美洲(4)</p>
					</div>
					<div class="region-li region-acive " style="left:60px;top:125px" data-index="2" data-length="12">
						<p>欧洲(12)</p>
					</div>
					<div class="region-li " style="left:273px;top:241px" data-index="3" data-length="5">
						<p>非洲(5)</p>
					</div>
					<div class="region-li " style="left:446px;top:111px" data-index="4" data-length="4">
						<p>中美洲(4)</p>
					</div>
					<div class="region-li " style="left:432px;top:284px" data-index="5" data-length="1">
						<p>大洋洲(1)</p>
					</div>
				</div>
				<div class="ranks-right">
					<div class="ranks-right-list ">
						<div class="ranks-box">
							<div class="ranks-li  ranks-li-acive " data-index="0">
								<div class="te-logo"
									style="background-image: url(https://cdn.leisu.com/nationflag/7303a103c93fea0445384d6ff3f3d1b9.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<p>卡塔尔</p>
							</div>
							<div class="ranks-li " data-index="1">
								<div class="te-logo"
									style="background-image: url(https://cdn.leisu.com/nationflag/0437356503a22e50b9e8aa76145c7f71.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<p>日本</p>
							</div>
							<div class="ranks-li " data-index="2">
								<div class="te-logo"
									style="background-image: url(https://cdn.leisu.com/nationflag/8b77b4b5156dc11dec152c6c71481565.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<p>韩国</p>
							</div>
							<div class="ranks-li " data-index="3">
								<div class="te-logo"
									style="background-image: url(https://cdn.leisu.com/nationflag/56de534cf589f6d0ca09630db803ba00.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<p>伊朗</p>
							</div>
							<div class="ranks-li " data-index="4">
								<div class="te-logo"
									style="background-image: url(https://cdn.leisu.com/nationflag/cf372cbe6eae54c6a6dfb3ebbcdc3404.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<p>沙特</p>
							</div>
						</div>
						<div class="brief-text ">
							<div class="team-name">
								<div class="img"
									style="background-image: url(https://cdn.leisu.com/nationflag/7303a103c93fea0445384d6ff3f3d1b9.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<div class="name-frequency">
									<p class="name">卡塔尔</p>
								</div>
								<div class="champion"> </div>
							</div>
							<p class="introduce">
								卡塔尔国家男子足球队从1970年开始参加国际、洲际足球比赛。从1976年才开始参加亚洲杯，直到1992年都没有从小组赛中杀出。2011年亚洲杯，作为东道主，打入八强。2019年2月1日，阿联酋亚洲杯决赛，卡塔尔3-1击败日本首次夺得亚洲杯冠军。
							</p>
							<p class="introduce">卡塔尔队参加了1978年后的历届世界杯预选赛，但从未获得出线权，2022年卡塔尔作为东道主，历史上将首次参加世界杯决赛圈阶段的比赛。
							</p>
						</div>
						<div class="brief-text ">
							<div class="team-name">
								<div class="img"
									style="background-image: url(https://cdn.leisu.com/nationflag/0437356503a22e50b9e8aa76145c7f71.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<div class="name-frequency">
									<p class="name">日本</p>
								</div>
								<div class="champion"> </div>
							</div>
							<p class="introduce">
								日本足协始建于1921年，1929年加入国际足联。20世纪90年代以来，日本足球水平突飞猛进；日本队先后在1992年日本亚洲杯、2000年黎巴嫩亚洲杯、2004年中国亚洲杯和2011年卡塔尔亚洲杯4次获得冠军，成为是亚洲杯历史上夺冠次数最多的代表队。日本队曾六次征战世界杯决赛圈，最佳战绩是十六强，他们曾先后在2002年韩日世界杯、2010年南非世界杯和2018年俄罗斯世界杯达到这一成绩。
							</p>
						</div>
						<div class="brief-text ">
							<div class="team-name">
								<div class="img"
									style="background-image: url(https://cdn.leisu.com/nationflag/8b77b4b5156dc11dec152c6c71481565.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<div class="name-frequency">
									<p class="name">韩国</p>
								</div>
								<div class="champion"> </div>
							</div>
							<p class="introduce">
								韩国足协于1928年成立，并于1948年加入国际足球联合会。截至2018年俄罗斯世界杯，韩国共10次进入世界杯决赛圈的比赛，自1986年世界杯后从未缺席。其最好成绩来自于2002年日韩世界杯，当时韩国先后战胜意大利和西班牙晋级四强，创造了亚洲球队在世界杯上的最好成绩。
							</p>
						</div>
						<div class="brief-text ">
							<div class="team-name">
								<div class="img"
									style="background-image: url(https://cdn.leisu.com/nationflag/56de534cf589f6d0ca09630db803ba00.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<div class="name-frequency">
									<p class="name">伊朗</p>
								</div>
								<div class="champion"> </div>
							</div>
							<p class="introduce">
								伊朗国家男子足球队成立于1920年，1948年加入国际足联，由伊朗足球协会管理。伊朗是亚洲传统强队之一，号称“波斯铁骑”，历史上在1968、1972、1976年亚洲杯上获得三连冠。他们的主场是于1970年代兴建的阿萨迪体育场，观众容量超过10万个。伊朗历史上6次参加世界杯，上一次缺席还是在2010年世界杯，他们的最好排名是1978年世界杯的第14位。
							</p>
						</div>
						<div class="brief-text ">
							<div class="team-name">
								<div class="img"
									style="background-image: url(https://cdn.leisu.com/nationflag/cf372cbe6eae54c6a6dfb3ebbcdc3404.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<div class="name-frequency">
									<p class="name">沙特</p>
								</div>
								<div class="champion"> </div>
							</div>
							<p class="introduce">
								沙特阿拉伯国家男子足球队，号称“西亚绿鹰”。1959年加入国际足联。20世纪80年代沙特阿拉伯足球有突飞猛进的发展，国家队在1984、1988、1996年三次获亚洲杯赛冠军，1996年成为继伊朗之后，第二支三捧亚洲杯的球队。沙特队在1994年世界杯赛上大放光芒，首次闯入世界杯决赛圈的沙特队就小组出线跻身16强，特别是在对阵比利时的小组赛中，沙特队球员奥维兰连过四名比利时队后卫打入一球的精彩表现让世人记住了这支西亚新军。2018年俄罗斯世界杯，沙特队以1胜2负的战绩位列A组第三被淘汰，不过时隔24年再度在世界杯上赢球。
							</p>
						</div>
					</div>
					<div class="ranks-right-list ">
						<div class="ranks-box">
							<div class="ranks-li  ranks-li-acive " data-index="0">
								<div class="te-logo"
									style="background-image: url(https://cdn.leisu.com/nationflag/7d44a77ef7bf7d809287828b992f3007.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<p>阿根廷</p>
							</div>
							<div class="ranks-li " data-index="1">
								<div class="te-logo"
									style="background-image: url(https://cdn.leisu.com/nationflag/99bf3d153d4bf67d640051a1af322505.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<p>巴西</p>
							</div>
							<div class="ranks-li " data-index="2">
								<div class="te-logo"
									style="background-image: url(https://cdn.leisu.com/nationflag/4bcd83a98bc4ee323ec93c0f0e704d04.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<p>厄瓜多尔</p>
							</div>
							<div class="ranks-li " data-index="3">
								<div class="te-logo"
									style="background-image: url(https://cdn.leisu.com/nationflag/3068cfc254b9a77c7eac84c9565eeeab.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<p>乌拉圭</p>
							</div>
						</div>
						<div class="brief-text ">
							<div class="team-name">
								<div class="img"
									style="background-image: url(https://cdn.leisu.com/nationflag/7d44a77ef7bf7d809287828b992f3007.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<div class="name-frequency">
									<p class="name">阿根廷</p>
									<p>2次夺冠</p>
								</div>
								<div class="champion">
									<div class="champion-li"><i></i>
										<p>1978</p>
									</div>
									<div class="champion-li"><i></i>
										<p>1986</p>
									</div>
								</div>
							</div>
							<p class="introduce">
								阿根廷国家男子足球队的管理机构是阿根廷足球协会，该队是世界上最成功的国家队之一，曾20次夺取过国家队重大赛事的冠军（和乌拉圭同享纪录），包括两次称雄世界杯（1978、1986年）、15次夺得美洲杯、两次获得奥运男足金牌（2004、2008年）以及一次联合会杯。
							</p>
							<p class="introduce">2021年，阿根廷国家队夺得美洲杯冠军。</p>
						</div>
						<div class="brief-text ">
							<div class="team-name">
								<div class="img"
									style="background-image: url(https://cdn.leisu.com/nationflag/99bf3d153d4bf67d640051a1af322505.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<div class="name-frequency">
									<p class="name">巴西</p>
									<p>5次夺冠</p>
								</div>
								<div class="champion">
									<div class="champion-li"><i></i>
										<p>1958</p>
									</div>
									<div class="champion-li"><i></i>
										<p>1962</p>
									</div>
									<div class="champion-li"><i></i>
										<p>1970</p>
									</div>
									<div class="champion-li"><i></i>
										<p>1994</p>
									</div>
									<div class="champion-li"><i></i>
										<p>2002</p>
									</div>
								</div>
							</div>
							<p class="introduce">
								巴西队战绩辉煌无比所向披靡，几乎是各大杯赛冠军数量领跑者，巴西队被誉为世界上最有名及最成功的国家足球队，他们是夺得世界杯足球赛冠军最多的球队，巴西队11次进入4强7次杀入决赛5次获得冠军，曾经于1958年、1962年、1970年、1994年、2002年5次夺得世界杯冠军。
							</p>
							<p class="introduce">
								1958年瑞典世界杯决赛中，巴西队以5：2大胜东道主瑞典队，获得冠军，成为史上第一支在欧洲获得世界杯冠军的美洲球队。巴西队曾经1994-2002连续3届杀进世界杯决赛，并获得2冠1亚的成绩创造了足坛历史。
								1970年的巴西队更被国际足联评选为世界历史最佳球队。除世界杯外巴西联合会杯获得过4次冠军。是世界上获联合杯冠军最多的队伍，美洲杯获得过9次冠军，五星巴西队也是拥有球迷最多的队伍，在欧洲也拥有大批球迷追随。
							</p>
						</div>
						<div class="brief-text ">
							<div class="team-name">
								<div class="img"
									style="background-image: url(https://cdn.leisu.com/nationflag/4bcd83a98bc4ee323ec93c0f0e704d04.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<div class="name-frequency">
									<p class="name">厄瓜多尔</p>
								</div>
								<div class="champion"> </div>
							</div>
							<p class="introduce">
								厄瓜多尔国家男子足球队是厄瓜多尔的足球代表队，由厄瓜多尔足球总会负责管辖。1996年之前，厄瓜多尔在漫长的世界杯预选赛历史上总共只赢过5场比赛。这之后，他们进步神速：2002年和中国队一样，历史上首次晋级世界杯正赛；4年后的德国，他们成功杀入世界杯淘汰赛；如今他们已第四次参加世界杯。
							</p>
						</div>
						<div class="brief-text ">
							<div class="team-name">
								<div class="img"
									style="background-image: url(https://cdn.leisu.com/nationflag/3068cfc254b9a77c7eac84c9565eeeab.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<div class="name-frequency">
									<p class="name">乌拉圭</p>
									<p>2次夺冠</p>
								</div>
								<div class="champion">
									<div class="champion-li"><i></i>
										<p>1930</p>
									</div>
									<div class="champion-li"><i></i>
										<p>1950</p>
									</div>
								</div>
							</div>
							<p class="introduce">
								乌拉圭国家男子足球队是第一届世界杯足球赛的冠军队伍，1930年以主场身份4比2击败阿根廷夺得首届世界杯冠军，1950年乌拉圭再次捧得世界杯冠军。2011年美洲杯乌拉圭3:0战胜巴拉圭，第15次捧得美洲杯，超越阿根廷成为获得美洲杯最多的国家。2022年3月，乌拉圭提前1轮锁定世界杯门票。
							</p>
						</div>
					</div>
					<div class="ranks-right-list  ranks-acive ">
						<div class="ranks-box">
							<div class="ranks-li  ranks-li-acive " data-index="0">
								<div class="te-logo"
									style="background-image: url(https://cdn.leisu.com/nationflag/0aa284046c7a249fac4fe3ec84772287.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<p>西班牙</p>
							</div>
							<div class="ranks-li " data-index="1">
								<div class="te-logo"
									style="background-image: url(https://cdn.leisu.com/nationflag/4402fbc939277321386d11fd427eb2b6.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<p>瑞士</p>
							</div>
							<div class="ranks-li " data-index="2">
								<div class="te-logo"
									style="background-image: url(https://cdn.leisu.com/nationflag/8eb4b4c01bf3375828c5494c2f6e7685.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<p>法国</p>
							</div>
							<div class="ranks-li " data-index="3">
								<div class="te-logo"
									style="background-image: url(https://cdn.leisu.com/nationflag/f40723ed94042ea9ea36bfb5ad4157b2.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<p>比利时</p>
							</div>
							<div class="ranks-li " data-index="4">
								<div class="te-logo"
									style="background-image: url(https://cdn.leisu.com/nationflag/21f2a5c3244b531186b4e7f91d555861.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<p>英格兰</p>
							</div>
							<div class="ranks-li " data-index="5">
								<div class="te-logo"
									style="background-image: url(https://cdn.leisu.com/nationflag/fb9d433088a21464e7d634c4e190b31a.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<p>荷兰</p>
							</div>
							<div class="ranks-li " data-index="6">
								<div class="te-logo"
									style="background-image: url(https://cdn.leisu.com/nationflag/685d3703a0b1410dc3bf2280eb5a15ec.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<p>丹麦</p>
							</div>
							<div class="ranks-li " data-index="7">
								<div class="te-logo"
									style="background-image: url(https://cdn.leisu.com/nationflag/5856c2f4a854359864b18f9aed3f8874.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<p>德国</p>
							</div>
							<div class="ranks-li " data-index="8">
								<div class="te-logo"
									style="background-image: url(https://cdn.leisu.com/nationflag/0c383e8deecbd58d5cbdfd324132b91f.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<p>克罗地亚</p>
							</div>
							<div class="ranks-li " data-index="9">
								<div class="te-logo"
									style="background-image: url(https://cdn.leisu.com/nationflag/059bbd8df7767d3bc7829e3735c221e2.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<p>塞尔维亚</p>
							</div>
							<div class="ranks-li " data-index="10">
								<div class="te-logo"
									style="background-image: url(https://cdn.leisu.com/nationflag/d92d7ec47187a662aacda2d4b4c7628e.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<p>葡萄牙</p>
							</div>
							<div class="ranks-li " data-index="11">
								<div class="te-logo"
									style="background-image: url(https://cdn.leisu.com/nationflag/1f47cef5e38c952f94c5d61726027439.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<p>波兰</p>
							</div>
						</div>
						<div class="brief-text  brief-acive ">
							<div class="team-name">
								<div class="img"
									style="background-image: url(https://cdn.leisu.com/nationflag/0aa284046c7a249fac4fe3ec84772287.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<div class="name-frequency">
									<p class="name">西班牙</p>
									<p>1次夺冠</p>
								</div>
								<div class="champion">
									<div class="champion-li"><i></i>
										<p>2010</p>
									</div>
								</div>
							</div>
							<p class="introduce">
								西班牙曾在1964年、2008年、2012年三度夺得欧锦赛冠军。2010年获得世界杯冠军。并获得过1992年巴塞罗那奥运会足球赛冠军。2007年到2009年间的35场国际比赛不败，与1993-1996年间的巴西队并列为二战后世界足坛最长的不败记录。
							</p>
							<p class="introduce">
								2008-2012，西班牙国家队在四年之内夺得欧锦赛两连冠和一次世界杯冠军，创造纪录。2018年7月16日，西班牙队获得2018年俄罗斯世界杯公平竞赛奖。2021年10月11日，西班牙队获得2020-21赛季欧洲国家联赛亚军。
							</p>
						</div>
						<div class="brief-text ">
							<div class="team-name">
								<div class="img"
									style="background-image: url(https://cdn.leisu.com/nationflag/4402fbc939277321386d11fd427eb2b6.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<div class="name-frequency">
									<p class="name">瑞士</p>
								</div>
								<div class="champion"> </div>
							</div>
							<p class="introduce">
								1905年，瑞士国家男子足球队开始了第一场正式国际比赛。2004年以后瑞士国家男子足球队获得了长足的进步，作为东道主参加了欧锦赛，而且进入了2010年南非世界杯决赛圈的比赛。
							</p>
							<p class="introduce">
								2006年世界杯，瑞士打入十六强，并创造单届世界杯0失球的纪录。2014年世界杯，打入十六强。2016年欧锦赛，打进八分之一决赛。2018世界杯瑞士队获得了十六强的成绩。2020年欧洲杯打入八强。
							</p>
						</div>
						<div class="brief-text ">
							<div class="team-name">
								<div class="img"
									style="background-image: url(https://cdn.leisu.com/nationflag/8eb4b4c01bf3375828c5494c2f6e7685.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<div class="name-frequency">
									<p class="name">法国</p>
									<p>2次夺冠</p>
								</div>
								<div class="champion">
									<div class="champion-li"><i></i>
										<p>1998</p>
									</div>
									<div class="champion-li"><i></i>
										<p>2018</p>
									</div>
								</div>
							</div>
							<p class="introduce">
								法国是欧洲大陆较早开展足球运动的国家，参与创办世界杯、欧洲国家杯等赛事，同时在1950年代开始崛起。1958年获得世界杯季军，方丹创造6场13球的世界杯单届进球记录，至今无人能打破。1984年，获得欧锦赛冠军，此后更是连夺1998年世界杯、2000年欧锦赛、2001、2003年联合会杯的冠军。
							</p>
							<p class="introduce">
								2016年欧锦赛，法国队2-0击败德国队进入决赛，0-1不敌葡萄牙，屈居亚军，格列兹曼获得欧锦赛最佳球员和最佳射手。2018年7月16日，法国队获得世界杯冠军，2021年10月11日，法国队2-1战胜西班牙队获得2020-21赛季欧洲国家联赛冠军。
							</p>
						</div>
						<div class="brief-text ">
							<div class="team-name">
								<div class="img"
									style="background-image: url(https://cdn.leisu.com/nationflag/f40723ed94042ea9ea36bfb5ad4157b2.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<div class="name-frequency">
									<p class="name">比利时</p>
								</div>
								<div class="champion"> </div>
							</div>
							<p class="introduce">
								比利时国家男子足球队是西欧国家比利时的国家级别足球队，由比利时足球协会管理，参加国际足联A级比赛。比利时队号称“欧洲红魔”，在国际足坛A级大赛历史中有不俗战绩，是首届世界杯参赛队之一，主场馆位于博杜安国王球场。
							</p>
							<p class="introduce">该足球队曾获1920年奥运会足球项目金牌、1980年欧洲杯亚军、2018年俄罗斯世界杯季军等多个奖项。</p>
						</div>
						<div class="brief-text ">
							<div class="team-name">
								<div class="img"
									style="background-image: url(https://cdn.leisu.com/nationflag/21f2a5c3244b531186b4e7f91d555861.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<div class="name-frequency">
									<p class="name">英格兰</p>
									<p>1次夺冠</p>
								</div>
								<div class="champion">
									<div class="champion-li"><i></i>
										<p>1966</p>
									</div>
								</div>
							</div>
							<p class="introduce">
								英格兰国家男子足球队号称“三狮军团”，在欧洲足球史上处于旗舰地位，已获1次世界杯冠军、3次奥运冠军、1次欧洲杯亚军。历史交锋对德国、荷兰、法国、瑞典、匈牙利、西班牙等队的净胜球均为世界之最。
							</p>
							<p class="introduce">1966年英格兰本土举行的世界杯上，他们夺得了英格兰至今唯一的一次的世界杯冠军。</p>
						</div>
						<div class="brief-text ">
							<div class="team-name">
								<div class="img"
									style="background-image: url(https://cdn.leisu.com/nationflag/fb9d433088a21464e7d634c4e190b31a.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<div class="name-frequency">
									<p class="name">荷兰</p>
								</div>
								<div class="champion"> </div>
							</div>
							<p class="introduce">
								荷兰国家队在上世纪七十年代开始异军突起，主要原因是当时荷兰球队发明了全体球员共同负责进攻及防守的全能足球战术，之后荷兰国家队采用全能足球战术在国际赛取得突破性佳绩，在名将告鲁夫带领下，荷兰分别在1974年和1978年连续两届皆能闯进世界杯决赛，但分别败给两个东道主西德及阿根廷而屈居亚军。
							</p>
							<p class="introduce">荷兰国家男子足球队曾获得欧锦赛冠军、欧洲国家联赛亚军等，曾三次打入世界杯决赛，但都惜败屈居亚军，因此被誉为世界杯上的无冕之王。</p>
						</div>
						<div class="brief-text ">
							<div class="team-name">
								<div class="img"
									style="background-image: url(https://cdn.leisu.com/nationflag/685d3703a0b1410dc3bf2280eb5a15ec.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<div class="name-frequency">
									<p class="name">丹麦</p>
								</div>
								<div class="champion"> </div>
							</div>
							<p class="introduce">
								丹麦队是一支在1980年代快速崛起的球队。他们在1984年欧洲足球锦标赛打进最后四强，虽在半决赛仅以点球大战被西班牙淘汰，但表现令人刮目相看。</p>
							<p class="introduce">
								丹麦的第一个重要杯赛冠军是1992年的瑞典欧洲杯，当时由于南斯拉夫发生了南斯拉夫内战，因此丹麦取代了南斯拉夫往瑞典参赛。在决赛，丹麦以2:0击败德国，夺得了丹麦历史上唯一的欧洲杯冠军。世界杯方面，丹麦有六次晋级世界杯决赛圈，分别是1986年、1998年、2002年、2010年、2018年、2022年世界杯。
							</p>
						</div>
						<div class="brief-text ">
							<div class="team-name">
								<div class="img"
									style="background-image: url(https://cdn.leisu.com/nationflag/5856c2f4a854359864b18f9aed3f8874.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<div class="name-frequency">
									<p class="name">德国</p>
									<p>4次夺冠</p>
								</div>
								<div class="champion">
									<div class="champion-li"><i></i>
										<p>1954</p>
									</div>
									<div class="champion-li"><i></i>
										<p>1974</p>
									</div>
									<div class="champion-li"><i></i>
										<p>1990</p>
									</div>
									<div class="champion-li"><i></i>
										<p>2014</p>
									</div>
								</div>
							</div>
							<p class="introduce">德国国家男子足球队是世界上历史最悠久、战绩最辉煌的豪门球队之一。</p>
							<p class="introduce">
								德国队历史上共8次杀入世界杯决赛，4次夺得冠军，13次晋级四强，战绩积分仅微弱次于巴西，排名世界第二。德国6次杀入欧洲足球锦标赛决赛，3次夺得冠军，8次晋级四强，排名欧洲第一。并且德国队在世界杯和欧洲杯国际大赛总进球数都为历史第一，展现出冠绝世界足坛的强大实力。
							</p>
						</div>
						<div class="brief-text ">
							<div class="team-name">
								<div class="img"
									style="background-image: url(https://cdn.leisu.com/nationflag/0c383e8deecbd58d5cbdfd324132b91f.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<div class="name-frequency">
									<p class="name">克罗地亚</p>
								</div>
								<div class="champion"> </div>
							</div>
							<p class="introduce">克罗地亚在1998年首次获得世界杯参赛资格，就令人震惊地获得了第三名的好成绩，当时克罗地亚的头号球星苏克拿到了世界杯金靴奖。</p>
							<p class="introduce">
								2018年7月8日，克罗地亚队在世界杯八强赛点球大战中6:5战胜俄罗斯，自1998年以来第二次晋级世界杯半决赛。7月12日，世界杯半决赛第2场，克罗地亚加时2比1逆转英格兰，首度打进世界杯决赛。北京时间2018年7月16日凌晨，2018俄罗斯世界杯落幕，克罗地亚队2-4不敌法国队，获得亚军。
							</p>
						</div>
						<div class="brief-text ">
							<div class="team-name">
								<div class="img"
									style="background-image: url(https://cdn.leisu.com/nationflag/059bbd8df7767d3bc7829e3735c221e2.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<div class="name-frequency">
									<p class="name">塞尔维亚</p>
								</div>
								<div class="champion"> </div>
							</div>
							<p class="introduce">
								由于黑山于2006年6月已经宣布独立，塞黑国家足球队在2006年世界杯之后改名为塞尔维亚国家足球队，2010世界杯预选赛中，塞尔维亚展示了强悍的战斗力，他们力压传统强队法国队夺取了小组第一，5比0击败罗马尼亚的比赛更令人震撼。2010年是塞尔维亚独立后首次参加世界杯。
							</p>
							<p class="introduce">本次进军卡塔尔世界杯，是他们第12次参加世界杯正赛。（含前南斯拉夫、前塞黑）。</p>
						</div>
						<div class="brief-text ">
							<div class="team-name">
								<div class="img"
									style="background-image: url(https://cdn.leisu.com/nationflag/d92d7ec47187a662aacda2d4b4c7628e.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<div class="name-frequency">
									<p class="name">葡萄牙</p>
								</div>
								<div class="champion"> </div>
							</div>
							<p class="introduce">
								葡萄牙足协成立于1914年，主场为葡萄牙国家体育场，由葡萄牙足球协会领导，代表葡萄牙参加国际比赛。葡萄牙队曾经在1966年英格兰世界杯上获得季军，自进入21世纪以来均能够杀入世界杯和欧洲杯的决赛圈，并在本土举行的2004年欧洲杯上获得亚军。
								2016年，葡萄牙国家队首次夺得欧洲杯冠军。2019年，葡萄牙国家队夺得首届欧洲国家联赛冠军。</p>
						</div>
						<div class="brief-text ">
							<div class="team-name">
								<div class="img"
									style="background-image: url(https://cdn.leisu.com/nationflag/1f47cef5e38c952f94c5d61726027439.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<div class="name-frequency">
									<p class="name">波兰</p>
								</div>
								<div class="champion"> </div>
							</div>
							<p class="introduce">
								波兰足球协会成立于1919年12月，波兰国家队第一场国际比赛是1921年12月18日于布达佩斯0:1不敌匈牙利队。1924年它参加了巴黎奥运会足球比赛，0:5惨败于匈牙利队脚下。1936年在柏林奥运会上，波兰队有了明显的进步。不过波兰在世界杯上的表现一直不够理想，2018年俄罗斯世界杯上他们又遭遇小组出局。波兰最优秀的足球运动员有德伊纳、加多恰、托马舍夫斯基、卢班斯基、拉托、博涅克、莱万多夫斯基等。
							</p>
						</div>
					</div>
					<div class="ranks-right-list ">
						<div class="ranks-box">
							<div class="ranks-li  ranks-li-acive " data-index="0">
								<div class="te-logo"
									style="background-image: url(https://cdn.leisu.com/nationflag/81a0c4689fb7ce553a0d5c2fd19b6efd.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<p>塞内加尔</p>
							</div>
							<div class="ranks-li " data-index="1">
								<div class="te-logo"
									style="background-image: url(https://cdn.leisu.com/nationflag/75800f73fa80f935216b8cfbedf77bfa.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<p>加纳</p>
							</div>
							<div class="ranks-li " data-index="2">
								<div class="te-logo"
									style="background-image: url(https://cdn.leisu.com/nationflag/d63036cfba56a5c3cb75ab14b33fe677.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<p>摩洛哥</p>
							</div>
							<div class="ranks-li " data-index="3">
								<div class="te-logo"
									style="background-image: url(https://cdn.leisu.com/nationflag/e2ce14e81dba66dbff9cbc35ecfdb704.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<p>喀麦隆</p>
							</div>
							<div class="ranks-li " data-index="4">
								<div class="te-logo"
									style="background-image: url(https://cdn.leisu.com/nationflag/7da9599ceaa0dd2498d02cc7985f5bde.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<p>突尼斯</p>
							</div>
						</div>
						<div class="brief-text ">
							<div class="team-name">
								<div class="img"
									style="background-image: url(https://cdn.leisu.com/nationflag/81a0c4689fb7ce553a0d5c2fd19b6efd.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<div class="name-frequency">
									<p class="name">塞内加尔</p>
								</div>
								<div class="champion"> </div>
							</div>
							<p class="introduce">塞内加尔国家队创立于1960年，并于1962年成为国际足联(FIFA)的成员之一。</p>
							<p class="introduce">
								塞内加尔男足在2002年第一次参加世界杯，并在首轮就爆冷1-0击败了卫冕冠军法国队，并且一路杀至八强，最终饮恨被土耳其在加时赛绝杀。在连续缺席3届世界杯后，他们杀进了2018年世界杯，这是其第二次参赛
								，该届赛事，塞内加尔最终因公平竞赛分数劣势屈居小组第三无缘16强。</p>
							<p class="introduce">
								北京时间2022年2月7日凌晨，2021非洲杯迎来决赛。在点球大战中，塞内加尔4-2获胜，并以4-2的总比分夺冠。在塞内加尔球队史上，这是该队第一次赢得非洲杯。</p>
						</div>
						<div class="brief-text ">
							<div class="team-name">
								<div class="img"
									style="background-image: url(https://cdn.leisu.com/nationflag/75800f73fa80f935216b8cfbedf77bfa.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<div class="name-frequency">
									<p class="name">加纳</p>
								</div>
								<div class="champion"> </div>
							</div>
							<p class="introduce">
								加纳国家足球队由加纳足球协会负责管辖。加纳曾夺得过4届非洲国家杯，但直到2006年世界杯才能够首次出席世界杯决赛周。加纳青年队的成绩表现比较出色，曾2次夺得世少杯冠军，世青杯曾3次杀入赛事决赛，但前两次都分别不敌两支南美劲旅--巴西及阿根廷，只能屈居亚军，2009年首次夺冠。加纳素来以盛产优良的天才球员著称，但球员纪律之差亦享负盛名，而场上组织亦一直不获好评。
							</p>
						</div>
						<div class="brief-text ">
							<div class="team-name">
								<div class="img"
									style="background-image: url(https://cdn.leisu.com/nationflag/d63036cfba56a5c3cb75ab14b33fe677.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<div class="name-frequency">
									<p class="name">摩洛哥</p>
								</div>
								<div class="champion"> </div>
							</div>
							<p class="introduce">摩洛哥男子足球国家代表队由摩洛哥皇家足球协会负责管辖。</p>
							<p class="introduce">
								摩洛哥分别于1970、1986、1994、1998、2018五次参加世界杯比赛，是首支直接晋级世界杯决赛周（1970年墨西哥世界杯）的非洲球队，亦是首支获世界杯决赛周（1986年墨西哥世界杯）分组首名的非洲球队，压倒葡萄牙、波兰及英格兰，在次轮淘汰赛仅以0-1负于当届最后获得亚军的西德。
							</p>
							<p class="introduce">
								而在1998年法国世界杯只差两分钟便可晋级次轮比赛，但最后一场分组赛挪威在完场前凭费奥的入球及一球十二码反胜巴西，压过摩洛哥获分组次名出线。世界杯最好成绩是1986年进入十六强。摩洛哥在1976年赢得非洲国家杯及在2004年负于主办国突尼斯获得亚军。
							</p>
						</div>
						<div class="brief-text ">
							<div class="team-name">
								<div class="img"
									style="background-image: url(https://cdn.leisu.com/nationflag/e2ce14e81dba66dbff9cbc35ecfdb704.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<div class="name-frequency">
									<p class="name">喀麦隆</p>
								</div>
								<div class="champion"> </div>
							</div>
							<p class="introduce">
								喀麦隆是非洲大陆20世纪80年代以来足球运动比较突出的国家。1959年，喀麦隆足协成立，1962年加入国际足联，喀麦隆国家男子足球队参加过1996-2010历届非洲杯决赛圈阶段的比赛，截止2014年，喀麦隆在历史上曾7次征战世界杯决赛圈，被誉为“非洲雄狮”。
							</p>
						</div>
						<div class="brief-text ">
							<div class="team-name">
								<div class="img"
									style="background-image: url(https://cdn.leisu.com/nationflag/7da9599ceaa0dd2498d02cc7985f5bde.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<div class="name-frequency">
									<p class="name">突尼斯</p>
								</div>
								<div class="champion"> </div>
							</div>
							<p class="introduce">
								突尼斯队是非洲足球传统劲旅。在国际足联2017年10月排名，突尼斯队以834分排名28位，是非洲排名最高球队。2004年夺得非洲杯冠军。突尼斯曾于1978年、1998年、2002年和2006年进入世界杯决赛周阶段。2018年俄罗斯世界杯小组赛G组，突尼斯首战被英格兰2-1绝杀，次战2-5惨败比利时，末轮2-1逆转巴拿马，终结40年来13场世界杯不胜。
							</p>
						</div>
					</div>
					<div class="ranks-right-list ">
						<div class="ranks-box">
							<div class="ranks-li  ranks-li-acive " data-index="0">
								<div class="te-logo"
									style="background-image: url(https://cdn.leisu.com/nationflag/7e19999864bb17b5cf10e68e3c7e6276.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<p>加拿大</p>
							</div>
							<div class="ranks-li " data-index="1">
								<div class="te-logo"
									style="background-image: url(https://cdn.leisu.com/nationflag/556950cd2810a798637000e9e438aac5.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<p>美国</p>
							</div>
							<div class="ranks-li " data-index="2">
								<div class="te-logo"
									style="background-image: url(https://cdn.leisu.com/nationflag/3653cce234494bfbd33e077f4a028f66.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<p>墨西哥</p>
							</div>
							<div class="ranks-li " data-index="3">
								<div class="te-logo"
									style="background-image: url(https://cdn.leisu.com/nationflag/2d7f3f6e23f7cb31f2209ab8cc8f47a4.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<p>哥斯达黎加</p>
							</div>
						</div>
						<div class="brief-text ">
							<div class="team-name">
								<div class="img"
									style="background-image: url(https://cdn.leisu.com/nationflag/7e19999864bb17b5cf10e68e3c7e6276.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<div class="name-frequency">
									<p class="name">加拿大</p>
								</div>
								<div class="champion"> </div>
							</div>
							<p class="introduce">
								历史上加拿大人普遍对足球没有兴趣，加拿大足球队在国际赛一向欠缺成绩，此前只曾晋级过1986年世界杯。不过由于加拿大身处的邻国大多是人丁单薄的小国，加拿大常有机会参加中北美洲各国之间的美洲金杯，其中2000年曾赢得一个冠军。
							</p>
							<p class="introduce">但近些年加拿大足球飞速发展，出产了阿方索-戴维斯、乔纳森-戴维等一众球星，终于在今年3月，加拿大时隔36年之后再次获得世界杯门票。
							</p>
						</div>
						<div class="brief-text ">
							<div class="team-name">
								<div class="img"
									style="background-image: url(https://cdn.leisu.com/nationflag/556950cd2810a798637000e9e438aac5.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<div class="name-frequency">
									<p class="name">美国</p>
								</div>
								<div class="champion"> </div>
							</div>
							<p class="introduce">
								美国国家男子足球队成立于1913年，1914年加入FIFA，是最早加入FIFA的国家之一。美国参加1930年第一届世界杯，在首届世界杯获得季军，这是美国队世界杯历史最佳战绩。
							</p>
							<p class="introduce">
								美国队前后6次获得金杯赛冠军，2009年联合会杯半决赛中爆冷2比0完胜西班牙，最终获得亚军。而贝克汉姆和亨利等巨星来到美国足球大联盟，更是把美国足球推到了一个新的高度。
							</p>
							<p class="introduce">2022年3月，美国获得直接晋级2022年卡塔尔世界杯的资格。</p>
						</div>
						<div class="brief-text ">
							<div class="team-name">
								<div class="img"
									style="background-image: url(https://cdn.leisu.com/nationflag/3653cce234494bfbd33e077f4a028f66.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<div class="name-frequency">
									<p class="name">墨西哥</p>
								</div>
								<div class="champion"> </div>
							</div>
							<p class="introduce">
								墨西哥国家足球队于1927年成立，自1930年世界杯至2018年世界杯共16次晋级，当中于1986年由墨西哥主办的世界杯最成功，该届墨西哥闯入八强，另一次最佳是1970年世界杯八强。1994年至2018年连续七届世界杯止步16强
								。截止2019年，墨西哥夺得8次中北美及加勒比海金杯赛冠军，数量为中北美所有球队中第一。</p>
							<p class="introduce">2018年6月17日世界杯小组赛，在第34分钟由墨西哥的洛萨诺的进球1比0爆冷战胜卫冕冠军德国队。世界杯史上首次战胜德国队。</p>
						</div>
						<div class="brief-text ">
							<div class="team-name">
								<div class="img"
									style="background-image: url(https://cdn.leisu.com/nationflag/2d7f3f6e23f7cb31f2209ab8cc8f47a4.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<div class="name-frequency">
									<p class="name">哥斯达黎加</p>
								</div>
								<div class="champion"> </div>
							</div>
							<p class="introduce">
								哥斯达黎加是中美洲地区历史上最成功的国家足球队，赢得三届中北美联赛冠军（1963年、1969年、1989年）。哥斯达黎加是中北美洲唯一一支参加过五届世界杯的国家队。他们在世界杯上的最好成绩就是在2014年巴西世界杯上获得，当时哥斯达黎加爆冷击败乌拉圭、意大利，战平英格兰，打进四分之一决赛。
							</p>
							<p class="introduce">
								近些年，哥斯达黎加也产出了前皇马球星纳瓦斯，前阿森纳球星坎贝尔等出色的球员，而他们二人也正是球队再次挺进世界杯的关键人物。在与新西兰的附加赛生死战中，坎贝尔为哥斯达黎加打进一球，而纳瓦斯屡次扑救力保城门不失。
							</p>
						</div>
					</div>
					<div class="ranks-right-list ">
						<div class="ranks-box">
							<div class="ranks-li  ranks-li-acive " data-index="0">
								<div class="te-logo"
									style="background-image: url(https://cdn.leisu.com/nationflag/2d8fe42de2f833581faa077f788329fa.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<p>澳大利亚</p>
							</div>
						</div>
						<div class="brief-text ">
							<div class="team-name">
								<div class="img"
									style="background-image: url(https://cdn.leisu.com/nationflag/2d8fe42de2f833581faa077f788329fa.png?imageMogr2/auto-orient/thumbnail/200x200>);">
								</div>
								<div class="name-frequency">
									<p class="name">澳大利亚</p>
								</div>
								<div class="champion"> </div>
							</div>
							<p class="introduce">
								澳大利亚绰号“袋鼠军团”，队史拿过4次大洋洲国家杯冠军，以及2015本土亚洲杯冠军。1997联合会杯和2011亚洲杯屈居亚军，2001联合会杯击败巴西获得季军。</p>
							<p class="introduce">澳大利亚先后参与了1974，2006，2010，2014和2018共五届世界杯决赛圈。球队在世界杯的最佳成绩为2006年的16强。
							</p>
							<p class="introduce">虽然在卡希尔等黄金一代退役后，澳大利亚的实力近年下滑不少，但他们仍然凭借强硬的踢法拿到了卡塔尔世界杯的入场券。</p>
						</div>
					</div>
				</div>
				<div class="nothing-text">参赛国家待定</div>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style>
</style>
