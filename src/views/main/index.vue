<template>
	<div class="app-main">
		<input id="cp-input" />
		<!-- <div class="bell-2"><span class="bell"></span></div> -->
		<div class="help-nav-box-wrap">
			
			 
			  
			<div class="nav-item-box">
				<a href="/about-user">
					<div class="icon"></div>
					<div class="content">问题帮助</div>
				</a>
			</div>
			
		</div>
		<div class="home-page">
			<div class="home-page-banner">
				<div class="anchor-home-page-top-wrap">
					<!-- <a href="https://www.dqty.com/score/football" class="anchor-home-page-top-left-img"
						target="_blank"></a> -->
					<div class="anchor-home-page-top-container">
						<liveTv path="main" :liveList="liveList" reserve="{}" :islive="islive" :info="detail"></liveTv>
						<div class="counttDownShow" v-if="counttDown">
							<div class="center_date">
								<div class="title_date">{{title_name}}</div>
								<div class="title_date">开赛倒计时</div>
								<div class="date_out"><span class="d_date">{{counttDownDay[0]}}</span ><span class="h_date">{{counttDownDay[1]}}</span><span class="m_date">{{counttDownDay[2]}}</span><span class="s_date">{{counttDownDay[3]}}</span></div>
								<div class="date_tile"><span class="d_date_d">天</span ><span class="h_date_h">小时</span><span class="m_date_m">分钟</span><span class="s_date_s">秒</span></div>
								<!-- <div class="date_down">{{counttDownDay}}</div> -->
							</div>
							<div class="concern_box_shou">
								<!-- <div class="concern_shou" v-if="userData.is_attention == 0" @click="setAttention()">
									<span class="cancelConcern_date_n" title="关注"></span>
								</div>
								<span class="cancelConcern_date_y" v-else title="取消关注"></span> -->
								<div>
									<span  @click="copyText()" class="txt_control" title="分享"></span>
								</div>
							</div>
						</div>
						<div class="anchor-home-page-top-choose-area" style="margin-left: 10px;">
							<div class="anchor-home-page-top-choose-item" :class="mainTabIndex==index?'choose':''"
								@click="mainTabIndex=index" v-for="(item,index) in mainList" :key="index">
								<div class="mask" :class="mainTabIndex==index?'choose':''"></div>
								<div class="lazyload-wrapper" style="height: 100%;"><img :src="item.thumb" width="320"
										height="172"></div>
							</div>
						</div>
					</div><a href="" class="anchor-home-page-top-right-img"
						target="_blank"></a>
				</div>
			</div>

			<div class="home-page-main">
				<div class="live-match-grid" style="width: auto;">
					<div class="swiper swiper-container" style="">
						<swiper ref="mySwiper" :options="swiperOptions" style="width: 100%;height: 100%;">
							<swiper-slide v-for="(item,index) in list" :key="index" style="position: relative;">
								<div class="live-match-grid-item">
									<img src="../../assets/images/main-mask.png" alt="">
									<div class="match-card">
										<div>
											<div class="match-card-header" style="padding-top: 24px;">
												<div style="width: 150px;">{{item.competition}}</div>
												<div class="match-card-header-icons">
													<!-- 是否已预约 -->
													<div class="match-card-reservation" v-if="item.status_id == 1 && item.reserve == 0"
														@click="getReserveMatch(item)"></div>
													<div class="match-card-reservation-already"
														 v-if="item.reserve != 0"></div>
														 
													<div class="match-card-header-img flex-start" v-if="item.anchor.length != 0">
														<router-link v-for="(item1,index1) in item"  tag="a" target="_blank" class="grid-header-right-more" :to="'/score-live?type='+(item.type == 1?'basketball':'football')+'&id='+item1.id+ '&vid=' + item.vid ">
															<img :src="item1.avatar">
														</router-link>
														
													</div>
												</div>
											</div>
											<div class="match-card-header-text">
												<div class="text1">{{item.status_type == 1?'进行中':item.status_type == 2?'已结束':item.match_time}}</div>
											</div>
										</div>
										<div class="match-card-content">
											<!-- 鼠标移入显示 先隐藏 -->
											<div class="match-card-mask" v-if="item.status_type == 1">
												<router-link tag="a" target="_blank" class="grid-header-right-more" :to="JSON.stringify(item.anchorList) === '{}'?'/score-live?type='+(item.type == 1?'basketball':'football')+'&id='+item.sourceid+ '&vid=' + item.vid :'/live?router=live&type='+item.type+'&id='+item.sourceid + '&uid=' + item.anchorList.uid+'&vid=' + item.vid">
													进入直播间
												</router-link>
											</div>
											<div class="match-card-content-row">
												<div class="team-logo-1"><img
														:src="item.home_team_logo?item.home_team_logo:require('../../assets/images/team.png')"
														alt="" width="64" height="64" title=""></div>
												<div class="team-name-1 ellipsis">{{item.home_team_name}}
												</div>
												<div class="team-score-1">{{item.home_scores}}</div>
											</div>
											<div class="match-card-content-row">
												<div class="team-logo-1"><img
														:src="item.away_team_logo?item.away_team_logo:require('../../assets/images/team.png')"
														alt="" width="64" height="64" title=""></div>
												<div class="team-name-1 ellipsis">{{item.away_team_name}}
												</div>
												<div class="team-score-1">{{item.away_scores}}</div>
											</div>
										</div>
									</div>
								</div>

							</swiper-slide>
							<!-- <div class="swiper-pagination" slot="pagination"></div> -->
						</swiper>
					</div>
					<aside class="live-match-grid-prev live-match-grid-aside" @click="prev()"></aside>
					<aside class="live-match-grid-next live-match-grid-aside" @click="next()"></aside>
					<div class="live-match-grid-saicheng" style="width: 90px;" @click="navigate('schedule',3)">
						<div class="live-match-grid-saicheng-img"></div>
						<div>全部赛程</div>
					</div>
				</div>
				<!-- <div class="home-anchor-ad" @click="applyFor()"> -->
				<div class="home-anchor-ad" @click="$router.push('/downLoad')">
					<img src="../../assets/images/main-banner.jpg" alt="anchor-ad">
				</div>
				<div class="anchor-grid" v-if="mainList.length != 0">
					<div class="grid-header">
						<div class="grid-header-left">
							<img class="grid-header-left-icon" src="../../assets/images/main-hot-titme.png" alt="">
							<div class="grid-header-left-text">热门主播</div>
						</div>
						<div class="grid-header-right">
							<!-- anchor?type=0 -->
							<router-link tag="a" target="_blank" class="grid-header-right-more" to="/anchor?type=0">
								更多<i></i>
							</router-link>
						</div>
					</div>
					<div class="anchor-grid-body">
						<!-- live?router=live&type=football&id=3637322&uid=9 -->
						<router-link tag="a" target="_blank" class="anchor-card" :to="'/live?type='+(item.type == 1?'basketball':'football')+'&id='+item.match_id + '&uid=' + item.uid+ '&vid=' + item.vid"
							v-for="(item,index) in mainList" :key="index" v-if="index<4">
							<div class="anchor-content"
								:style="{background:' url('+item.thumb+')center top / cover no-repeat'}">
								<!-- <div class="anchor-content-title-wrap">
									篮球
								</div> -->
								<div class="lazyload-wrapper ">
									<div class="lazyload-placeholder"></div>
								</div>
							</div>
							<div class="anchor-name">
								<img :src="item.avatar?item.avatar:require('../../assets/images/userLogo.png')" width="30" height="30">
								<span>{{item.user_nickname}}</span>
							</div>
							<div class="anchor-info">
								<div class="anchor-info-desc-wrap">
									<div class="anchor-info-up">
										<div class="anchor-info-title ellipsis" title="">
											{{item.title.split(' ').length === 2 ? item.title.split(' ').slice(1, item.title.split(' ').length).join() : item.title}}
										</div>
									</div>
									<div class="anchor-info-desc">
										<div class="anchor-info-desc-nickname ellipsis">
											{{item.title.split(' ').length === 2 ? item.title.split(' ')[0] : ''}}
										</div>
										<div class="anchor-info-heat"><img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAAEXElEQVRYCa1XX2xTVRj/zr3tKCCsg21hcU50hoR/D84yjSaEgTywCCaGYELiBsnUwIMaEhMfFBPjg+/qQ+l07UYIWYwBEnwgaytiNDFL8GH+CTEGqRu4sSmdlNL2ns/vdLunp/fc9t4Nb9Kc7/t9f87v/PvOKcAyvuiZdHNsKP3MMkK1EENDPIChoXQICtaFBoNnPFx9mZdEABFZAaw4ILT39++Z9NWDh9OSCJyKp96nfC8zxq565PVt9k0glhg7yBicLGdm8IfvHjwcfREYHE5vQ4S4WAKRDwH/8cjr2+xJgDZd2OL8HBFYLbMia5PyAwqeBIqMJwCxU+2HIT6i6g8i1yVwKpE6QdN+QOuAQYeGLROoSSA6kuxCjh+55aWt8ER0dLzRzaZisUTqxXLdUEGH7EpABDELT9N2Czr8F1UMstz8C+62Cso5niwY1gcVRJdcCRQY/5A23WbdvYIgWG9VNF36bDgdoQF0MYQTg4lkt+6xgGgEoqcvbyfTm7UCJI4QiSbS/VJXhNFRNEsWjwqIBmJyhM+j4+Ous6kRYMXSpxQVUPLVFpF/MhhP7lQdREd/51IxMXobp428FSayx2xdbcuFxQZiI2N7eQku2bq/lhUZYAwMNsY4PEpF6jAC7NBiGUzDtnD765FIUbVVjRQtNkDMVbsPGYMUcRw4Hq8bidBq/JzdTwm/VJPKJaBpMijBXtX4f8t0KvY5c0oC8TPfdNLaNzkdlqt3tK+HA71PVYcjPl0NAMglKPHiBqexnk43I4RCDZDPF4l3ZfIDAQO2b+mAyJOPA13bEFoRhPz9hWWnkIedOSUB4MY6AO60a7pIuKOrEx7b2FpOzjmH27PzMD2ThUDQhI0dLWXcDmxevwb+nJorqwhsjY3brSRAO2DGq//Gtatg/74uWLVyhR0PhmFAa0tj+SfBGgKdlhmnSe6BYMmYchpVXUz57p1bqzpX7bXke/mCNNFrQutDEjhyZNcNBuwv6e0QWprXgvgt5ROdz879K0OoLP8glUVBEqANw8GAC04HW1/X9JAt+m5/+bX63coCcM4ZLAkIAzNwxOlg63fu5GzRVzs/fw9+nLiu+mb45vDXKiDkKgKvvvL8FWBw0ekk9OnbWbh7N+9m0rBc7j5cvHQVSiXlVBnme84yLAKrCJQBI/g2tdpwLYtD8vJPII5dvW/y5hyc/2ocsjQD8mPw/Wt9u1xnl/a2/sWGUy/Ra+gLKjCavSm8Gp7t3gRtG5roCC6YBbnM5Cxc++0mXL+hnbRMA5jdR4/23NJ7omV3AwUWjSeP0bn9WNznbj6maYCoC4Viqbw0SjFU3TOmafYO9PVMqKAq1yQgnAbjqT0W4Fmqtc1qkB+ZjvSVkBk62Nf33HQ9/7oERKD4X1AE/g4txhtEZGW9ZIu23w3G3h3o332WjnblkqgR6EnAjhNECib2Mo7iTt9Cz4Y2enyIykQjZFNUKb+jR8n5cKjn20OHmGXHebX/ATCvePe0TxYAAAAAAElFTkSuQmCC"
												alt="" width="10px" height="12px">{{item.heat}}</div>
									</div>
								</div>
							</div>
						</router-link>
					</div>
				</div>
				<div class="home-page-row" style="display: none;">
					<div>
						<div class="grid-header">
							<div class="grid-header-left"><img class="grid-header-left-icon"
									src="../../assets/images/main-sport-title.png" alt="">
								<div class="grid-header-left-text">体育头条</div>
								<div class="grid-header-left-nav">
									<div :class="classificationIndex == index?'active2':''" @click="classificationIndex = index" v-for="(item,index) in classificationList" :key="index">{{item.name}}</div>
								</div>
							</div>
							<div class="grid-header-right">
								<a class="grid-header-right-more" href="/news?activeId=9999">更多 <i></i></a>
							</div>
						</div>
						<div class="home-news-body">
							<div class="news-carousel">
								<el-carousel :interval="5000" trigger="click" width="494px" height="324px">
								      <el-carousel-item v-for="(item,index) in Headlinesbanner" :key="index">
										   <router-link style="height: 324px;width: 100%;" class="headlines-item" tag="a" target="_blank" :to="'/detail?id=' + item.id">
											   <el-image
													style="height: 324px;width: 100%;"
													:src="item.img"
													fit="cover">
												</el-image>
											</router-link>
								        <!-- <img style="height: auto;" src="" > -->
								      </el-carousel-item>
								</el-carousel>
							</div>
							<div class="headlines-group">
								<!-- <div class="headlines" v-if="classificationIndex == 0">
									<a v-for="(item,index) in HeadlinesList" :key="index" class="headlines-item headlines-hot" target="_blank" href="/news/detail?id=cda36458156046a6ab115c11f3c6b13d&amp;type=0">
										<div class="headlines-img">
											<img src="data:image/png;base64,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"
												alt="">
										</div>
										<div class="headlines-title">{{item.title}}</div>
									</a>
									
								</div> -->
								<div class="headlines">
									<router-link v-if="index < 11" :class="classificationIndex == 0?'headlines-hot':''" v-for="(item,index) in HeadlinesList.data" :key="index" class="headlines-item" tag="a" target="_blank" :to="'/detail?id=' + item.id">
										<div class="headlines-img"><img
												src="data:image/png;base64,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"
												alt="">
										</div>
										<div class="headlines-title">{{item.title}}</div>
									</router-link>
								</div>
							</div>
						</div>

					</div>
					<!-- --------------------------------------------------------来 -->
					<div style="height: 100%;overflow: hidden;">
						<div class="grid-header">
							<div class="grid-header-left"><img class="grid-header-left-icon"
									src="../../assets/images/main-star.png" alt="">
								<div class="grid-header-left-text">人气主播榜</div>
							</div>
							<div class="grid-header-right">
								<router-link class="grid-header-right-more" tag="a" target="_blank" to="anchor?type=0">更多 <i></i>
								</router-link>
								</div>
						</div>
						<div class="rank-content">

							<div class="rank-content-info" style="padding: 0 18px;height: 330px;">
								<div class="anchor-rank-content-list" style="overflow-y: auto;">
									<div class="list-item" v-for="(item,index) in LeaderboardList" :key="index">
										<div class="left">
											<div class="img"  style="position: relative;">
												<div class="lazyload-wrapper">
													<!-- 判断是否进行中 -->
													
													<router-link tag="a" target="_blank" :to="item.is_live == 1?'/live?router=live&type='+item.live_type+'&id='+item.match_id+'&uid='+item.uid:'/persona?id=' + item.uid">
														<img :src="item.avatar" alt="head-img" width="80" height="80" title="head-img">
													</router-link>
												</div>
												<img class="live" v-if="item.is_live == 1" src="../../assets/images/main-hot-live.png" >
											</div>
											<div class="level-logo" style="margin: 0 10px;"><img :src="item.votestotal_icon" alt=""></div>
											<div class="name">{{item.user_nickname}}</div>
										</div>
										<div class="middle">人气
											<!-- -->{{item.amount}}
										</div>
										<div class="right">
											<div class="blank"></div>
											<div class="status-btn add-btn" @click="attention(item)" v-if="item.is_watchlist == 0"><span class="img"></span>关注</div>
											<div class="status-btn no-add-btn"v-if="item.is_watchlist == 1">已关注</div>
										</div>
									</div>
								</div>

							</div>
						</div>
					</div>
				</div>


				<div class="home-page-row">
					<div>
						<div class="grid-header">
							<div class="grid-header-left"><img class="grid-header-left-icon"
									src="../../assets/images/main-recommend-title.png" alt="">
								<div class="grid-header-left-text">赛事推荐</div>
								<div class="grid-header-left-nav">
									<div :class="{active2:type===0}" @click="type = 0">全部</div>
									<div :class="{active2:type===1}" @click="type = 1">足球</div>
									<div :class="{active2:type===2}" @click="type = 2">篮球</div>
									<div :class="{active2:type===3}" @click="type = 3">电竞</div>
								</div>
							</div>
							<div class="grid-header-right">
								<div class="grid-header-right-text"><span>今日({{count || 0}})</span></div>
							</div>
						</div>
						<!-- 进行中的比赛 -->
						
						<div class="rmt" v-for="(item,key) in recommendList" :key="key">
							<div class="rmt-header" v-if="key=='type1'">
								<div class="rmt-title flex-start"><img src="../../assets/images/main-beigin.png" alt=""
										height="20px" width="20px">
									<div>进行中的比赛</div>
								</div>
								<a class="rmt-more" @click="navigate('football',1)">查看全部</a>
							</div>
							<div class="rmt-header" v-if="key=='type2'">
								<div class="rmt-title flex-start"><img src="../../assets/images/main-end.png" alt=""
										height="20px" width="20px">
									<div>未开始的比赛</div>
								</div><a class="rmt-more" @click="navigate('football',1)">查看全部</a>
							</div>
							<div class="rmt-header" v-if="key=='type3'">
								<div class="rmt-title flex-start"><img src="../../assets/images/main-ends.png" alt=""
										height="20px" width="20px">
									<div>已结束的比赛</div>
								</div><a class="rmt-more" @click="navigate('football',1)">查看全部</a>
							</div>
							<!-- <el-collapse accordion @change="change($event,key)"> @mouseover="movein(JSON.stringify(obj))" @mouseleave="moveout(JSON.stringify(obj))" -->
							<div class="el-collapse-item" v-for="(obj,index1) in item"  :key="index1" v-if="isNaN(item)" @mouseover="movein(JSON.stringify(obj),key)" @mouseleave="moveout(JSON.stringify(obj))"  >
							  <!-- <el-collapse-item :ref="JSON.stringify(obj)" :name="JSON.stringify(obj)"> -->
									<div class="el-collapse-item__header">
									  <div class="rmt-row" style="box-shadow:none;width: 100%">
										<div class="rmt-row-left">
											<div class="rmt-row-left-time">
												<div class="exact-time" v-if="obj.match_time">{{obj.match_time.slice(6,11)}}
												</div>
												<div class="exact-date" v-if="obj.match_time">{{obj.match_time.slice(0,5)}}
												</div>
											</div>
											<div class="rmt-row-left-text">{{obj.competition}}</div>
											<div class="rmt-row-left-duration">{{setType(obj,key)}}</div>
										</div>
										<div class="rmt-row-middle">
											<div class="team-1">
												<div class="team-logo-wrapper ">
													<!-- <img src="../../assets/images/team.png" > -->
													<!-- <div class="team-logo-placeholder"></div> -->
													<img :src="obj.home_team_logo||require('../../assets/images/team.png')">
												</div>
												<div class="rmt-row-middle-name ellipsis">{{obj.home_team_name}}</div>
											</div>
											<div class="team-score" style="width: 100px; ">
												<div style="width: auto;">{{key!=='type2'?obj.home_scores:''}}</div>
												<div>-</div>
												<div style="width: auto;">{{key!=='type2'?obj.away_scores:''}}</div>
											</div>
											<div class="team-2">
												<div class="team-logo-wrapper ">
													<!-- <div class="team-logo-placeholder"></div> -->
													<img :src="obj.away_team_logo||require('../../assets/images/team.png')">
												</div>
												<div class="rmt-row-middle-name ellipsis">{{obj.away_team_name}}</div>
											</div>
										</div>
										<div class="rmt-row-right">
											<div class="icon-avatar"><a href="/anchor/live?anchorId=100429">
													<div class="lazyload-wrapper ">
														<div class="lazyload-placeholder"></div>
													</div>
												</a><a href="/anchor/live?anchorId=100453">
													<div class="lazyload-wrapper ">
														<div class="lazyload-placeholder"></div>
													</div>
												</a><a href="/anchor/live?anchorId=100058">
													<div class="lazyload-wrapper ">
														<div class="lazyload-placeholder"></div>
													</div>
												</a></div>
											<div style="display: flex; align-items: center;">
												
												<el-popover
													v-if="obj.anchor_total != 0"
													placement="bottom"
													width="200"
													trigger="hover">
													<div class="anchor">
														<div class="anchor-title">
															{{obj.anchor_total}}位主播在播
														</div>
														<div class="anchor-list">
															<router-link tag="a" v-for="(item5,index5) in obj.anchor_list" target="_blank" class="anchor-li flex" :to="'/live?router=live&type='+obj.type+'&id='+obj.sourceid + '&uid=' + item5.id+ '&vid=' + obj.vid">
																<img :src="item5.avatar || require('../../assets/images/userLogo.png')" >
																<span style="width: 50px;" class="text-clamp">{{item5.user_nickname}}</span>
																
																<div class="status-btn live-btn flex-start">
																	<div class="living_box">
																		<div class="strip"></div>
																		<div class="strip"></div>
																		<div class="strip"></div>
																	</div>直播中
																</div>
															</router-link>
															<!-- <div class=""  >
															</div> -->
														</div>
													</div>
													<div slot="reference" class="icon-avatar-name flex-start">
														<img :src="obj.anchor_list[0].avatar || require('../../assets/images/userLogo.png')" >
														<span>主播 {{obj.anchor_total}}</span>
													</div>
													<!-- <el-button>hover 激活</el-button> -->
												  </el-popover>
												<!-- <router-link tag="a" target="_blank"
													:to="'/score-live?type='+(obj.type == 1?'basketball':'football')+'&id='+obj.sourceid+ '&vid=' + obj.vid "> -->
												<div class="icon-voa"
													@click="navigate('score-live?type='+(obj.type == 1?'basketball':'football')+'&id='+obj.sourceid+'&vid='+obj.vid,null)">
													<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAbFBMVEUAAADvdWnvd2rweGnwdWnvdmnvdmn/uLjvdmnvdWnvdWnudmrxd2v0eWzxfG7/g3bvdmnudmjwdmnwd2rxd2rudWjvdmnvdmjvdmnvdWjuemnudmnudmjudmjvdWjudWnvdmnud2nweGjudWjGukM4AAAAI3RSTlMAkp0zVfDZAsPg+HskHRIJz5iFZjblj3NpTi64tamiel9cQu0bnQoAAACkSURBVDjLrdFJDsIwEETRgmBsx1MmkhBm+v53RFkayQUSvPXfdDV+p52VIus0nFAOlgcW8kEWGMWDDvFKgx2A44EGW4/YsmBf3zSelgQiTYU0skDqLmFQxWDVJIwsMB6xKQdq1uutxeAUEC/lK8wdeCiyQ0I4kyVn6F6xX6jOFL7JoBaqhuGBWWcn1ACEaVM0BXzNt9tM65Hr5U2PnF6qzKLxLy/o81yLYbzXUQAAAABJRU5ErkJggg=="
														alt="视频图标" v-if="obj.mlive == 1">
												</div>
												<!-- </router-link> -->
												<!-- <div class="icon-arrow">
													<div><img
															src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAqBAMAAABb64ZtAAAAKlBMVEUAAACampqZmZmZmZmampqZmZmcnJyfn5+ZmZmampqampqZmZmZmZmZmZnx66X3AAAADXRSTlMAR/HhrmcsGAqMystQGmyG0wAAAE5JREFUKM9jYLx7lQEBfO8KIDhdd9UQHHbbywUIXtLdHXA20IgrSEbE3p2A4HAOStNX4Db9ACYHoQxhAHajuxGWIpyDcCjCC4PdXOREAQCV1kT8JfwXfAAAAABJRU5ErkJggg=="
															alt=""></div>
												</div> -->
											</div>
										</div>
									  </div>
										<div class="showMask el-collapse-item__wrap">
											<div class="contens-shoMask">
												<div class="schedule flex">
													<!-- (battle.vs_recent.win / (battle.vs_recent.win + battle.vs_recent.drawn + battle.vs_recent.lost)) * 100 + '%' -->
													<span style="background-color: #7ac23c;" :style="{width:getColor(battle.vs_recent.win + battle.vs_recent.drawn + battle.vs_recent.lost,battle.vs_recent.win)}"></span>
													<span style="background-color: #a1a1ab;" :style="{width:getColor(battle.vs_recent.win + battle.vs_recent.drawn + battle.vs_recent.lost,battle.vs_recent.drawn)}"></span>
													<span style="background-color: #f5222d;" :style="{width:getColor(battle.vs_recent.win + battle.vs_recent.drawn + battle.vs_recent.lost,battle.vs_recent.lost)}"></span>
												</div>
												<div class="ranking">
													<div class="left">
														<p>{{battle.home_ranking || '--'}}</p>
														<p>排行</p>
													</div>
													<div class="center">
														<p v-if="battle.vs_recent.total == 0">暂无交锋</p>
														<p v-else>
															两队交锋{{battle.vs_recent.total}}次，主队<span style="color:#7ac23c">{{battle.vs_recent.win}}</span>胜<span style="color:#a1a1ab">{{battle.vs_recent.drawn}}</span>平<span style="color:#f5222d">{{battle.vs_recent.lost}}</span>负
														</p>
														<div class="center-main flex">
															<div class="center-main-left">
																<img v-for="(item4,index4) in battle.home_recent" :src="item4 == '胜'?require('../../assets/images/succe.png'):item4 == '平'?require('../../assets/images/ping.png'):item4 == '负'?require('../../assets/images/wrong.png'):''" >
																<!-- <span v-for="(item4,index4) in battle.home_recent" :style="{backgroundColor:getColor(item4)}"></span> -->
															</div>
															<p>近6场走势</p>
															<div class="center-main-left">
																<img v-for="(item4,index4) in battle.away_recent" :src="item4 == '胜'?require('../../assets/images/succe.png'):item4 == '平'?require('../../assets/images/ping.png'):item4 == '负'?require('../../assets/images/wrong.png'):''" >
																<!-- <img v-for="(item4,index4) in battle.away_recent" :src="getColor(item4)" > -->
																<!-- <span v-for="(item4,index4) in battle.away_recent" :style="{backgroundColor:getColor(item4)}"></span> -->
															</div>
														</div>
													</div>
													<div class="left">
														<p>{{battle.away_ranking || '--'}}</p>
														<p>排行</p>
													</div>
												</div>
											</div>
											
										</div>
									</div>
								<!-- </el-collapse-item> -->
							  </div>
							<!-- </el-collapse> -->
							
						</div>
					</div>
					<div class="countdown-container" v-if="showCountDown">
						<img class="countdown-bg" :src="require('../../assets/images/countdown.jpg')" />
						<div class="countdown-content">
							<div class="countdown-time">
								<div class="countdown-box">{{countDownD.split('')[0]}}</div>
								<div class="countdown-box">{{countDownD.split('')[1]}}</div>
								<div class="countdown-colon">:</div>
								<div class="countdown-box">{{countDownH.split('')[0]}}</div>
								<div class="countdown-box">{{countDownH.split('')[1]}}</div>
								<div class="countdown-colon">:</div>
								<div class="countdown-box">{{countDownM.split('')[0]}}</div>
								<div class="countdown-box">{{countDownM.split('')[1]}}</div>
								<div class="countdown-colon">:</div>
								<div class="countdown-box">{{countDownS.split('')[0]}}</div>
								<div class="countdown-box">{{countDownS.split('')[1]}}</div>
							</div>
							<div class="countdown-footer">
								<div class="countdown-text">天</div>
								<div class="countdown-text">时</div>
								<div class="countdown-text">分</div>
								<div class="countdown-text">秒</div>
							</div>
						</div>
					</div>
				</div>
				<div class="official-activity">
					<div class="title">
						<div class="title-left"><img class="icon" src="../../assets/images/main-hot-title.png"
								alt=""><span>官方活动</span></div>
						<div class="title-right">更多<i></i></div>
					</div>
					<div class="act-main">
						<a :href="item.url" target="_blank" v-for="(item,index) in activityList" :key="index" v-if="index < 4">
							<img class="act-item"  :src="item.img"
								 alt="img">
						</a>
					</div>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		getAllMatch,
	} from "../../api/user.js";
	import {
		recommend
	} from '../../api/common.js'
	import {
		season_table,
		getLiveList,
		reserveMatch2,
		getActivityUrl
	} from '../../api/user.js'
	import liveTv from '../anchor/live-tv.vue'
	import 'swiper/dist/css/swiper.css'
	import {
		swiper,
		swiperSlide
	} from 'vue-awesome-swiper'
	import {
		getList,
		classification
	} from '@/api/headline.js'
	import {attention} from '@/api/user.js'
	import {LeaderboardAnchor,match_battle} from '@/api/competition.js'
	export default {
		components: {
			liveTv,
			swiper,
			swiperSlide
		},

		computed: {
			...mapGetters([
				'name'
			])
		},
		data() {
			return {
				mySwiper: null,
				nameActive:[],
				nameActiveIndex:[],
				num: 0,
				list: [],
				detail: {},
				islive: 1, //默认在播放
				liveList: [], //无用
				servertime:null,//服务器时间
				title_name:"",//赛事名称
				starttime:null,//比赛开时间
				counttDown: 0, //开赛倒计时
				counttDownDay:[], //开赛倒计时分秒
				urlPlayer:null,
				titleTab: [{
						name: '英超',
						id: 82
					},
					{
						name: '意甲',
						id: 108
					},
					{
						name: '西甲',
						id: 120
					},
					{
						name: '德甲',
						id: 129
					},
					{
						name: '法甲',
						id: 142
					},
					// {
					// 	name: '中超',
					// 	id: 542
					// },
				],
				type: 0,
				group: 0,
				Headlines:[],
				mainList: [],
				titleIndex: 0,
				activityList:[],
				rangingList: [],
				rangingList1: [],
				rangingList2: [],
				mainTabIndex: 0,
				recommendList: {},
				HeadlinesList:[],//头条列表
				Headlinesbanner:[],//头条轮播列表
				classificationList:0,
				classificationIndex:0,
				LeaderboardList:[],
				count: null, //推荐总数
				battle:{
					vs_recent:{},
					home_ranking:0,
					away_ranking:0,
					home_recent:[],
					away_recent:[]
				},//赛事展开推荐
				battle1:{
					vs_recent:{},
					home_ranking:0,
					away_ranking:0,
					home_recent:[],
					away_recent:[]
				},
				swiperOptions: {

					width: 1100,
					autoplay: {
						delay: 5000,
						disableOnInteraction: false
					},
					// loop: true,
					slidesPerView: 5,
					spaceBetween: 10,
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					},
					navigation: {
						nextEl: '.live-match-grid-next',
					 prevEl: '.live-match-grid-prev'
					},
				},
				showCountDown: true,
				countDownIntervals: null,
				countDownD: "",
				countDownH: "",
				countDownM: "",
				countDownS: "",
			}
		},
		watch: {
			type(e) {
				this.recommend()
			},
			mainTabIndex(e) {
				
				this.title_name=this.mainList[e].title
				// console.log(this.mainList[e])
				// console.log(this.mainList[e].starttime+"比赛",this.servertime+"服务")
				// console.log(this.mainList[e].starttime-this.servertime+"倒计时"+e)
				if ((this.mainList[e].starttime)-(this.servertime)>0&&(this.mainList[e].starttime)>0 ) {
					this.counttDown=(this.mainList[e].starttime)-(this.servertime)
					// 先卸载定时器从新加载定时器
					// console.log(this.counttDown)
					clearInterval(this.timeInterval)
					this.Iime()
					// this.counttDown=10
					this.urlPlayer=this.mainList[e]
				}else{
					this.counttDown=false
					this.detail = this.mainList[e]
				}
			},
			classificationIndex(e){
				this.headList(this.classificationList[e].id)
			}
		},
		created() {
			this.countDownIntervals = setInterval(() => {
				this.initCountDown();
			}, 500);
		},
		mounted() {
			this.getList()
			let data = {
				id: this.titleTab[0].id
			}
			this.getRanking(data)
			this.getLiveList()
			this.recommend()
			this.classification()
			this.LeaderboardAnchor()
			this.getActivityUrl()
			
			let query = this.$route.query
			for(const i in query) {
				if(i === 'channel_code'){
					localStorage.setItem('channel',query[i])
				}
			}
			this.servertimeDate()
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper;
			},
			infos(){
				return this.$store.state.infos
			},
			system() {
				return this.$store.state.system
			}
		},
		methods: {
			/* 开启折叠面板 */
			change(e,type){
				
				if(!e) return
				let obj = JSON.parse(e)
				/* obj.type == 1?'basketball':'football' */
				let data = {
					type:obj.type,
					id:obj.sourceid
				}
				match_battle(data).then(res=>{
					// this.battle = {...this.battle,...res.data}
					setTimeout(res1=>{
						this.battle = res.data
					},200)
				}).catch(res=>{})
			},
			movein(key){
				// this.nameActive = [key]
				if(this.nameActiveIndex == key)return;
				this.nameActiveIndex = key
				// this.$refs[key][0].handleHeaderClick()
				// if(!this.nameActiveIndex) return
				let obj = JSON.parse(this.nameActiveIndex)
				/* obj.type == 1?'basketball':'football' */
				let data = {
					type:obj.type,
					id:obj.sourceid
				}
				this.battle = this.battle1
				match_battle(data).then(res=>{
					// this.battle = {...this.battle,...res.data}
					setTimeout(res1=>{
						this.battle = res.data
					},100)
				}).catch(res=>{})
			},
			moveout(key){
				// this.nameActive = []
				// this.$refs[key].handleHeaderClick()
				if(this.nameActiveIndex = '')return;
				this.nameActiveIndex = ''
				// this.$refs[key][0].handleHeaderClick()
			},
			/* 修改颜色 */
			getColor(all,i){
				if(all == 0) return 0
				return (i / all)  * 100 + '%'
				
				return
				 // (battle.vs_recent.win / (battle.vs_recent.win + battle.vs_recent.drawn + battle.vs_recent.lost)) * 100 + '%' -->
				if(type == '胜'){
					return '../../assets/images/succe.png' 
				}else if(type == '平'){
					return '../../assets/images/ping.png'
				}else if(type == '负'){
					return '../../assets/images/wrong.png'
				}
			},
			
			// 获取活动
			getActivityUrl(){
				getActivityUrl().then(res=>{
					this.activityList = res.data.data
				}).catch(res=>{})
			},
			
			// 申请主播
			applyFor(){
				if(JSON.stringify(this.infos) === '{}') return this.$store.state.user.showLoginMask = true
				if(this.infos.is_anchor == 1){
					let routeData = this.$router.resolve({
						path: "/member?type=9"
					})
					window.open(routeData.href, '_blank')
				}else{
					let routeData = this.$router.resolve({
						path: "/member?type=7"
					})
					window.open(routeData.href, '_blank')
				}
				
			},
			// 关注
			attention(item){
				attention({id:item.uid}).then(res=>{
					item.is_watchlist == 0?item.is_watchlist = 1:item.is_watchlist = 0
					this.$message.success(res.msg)
				}).catch(res=>{})
			},
			// 头条列表
			headList(id){
				getList({cid:id}).then(res=>{
					this.HeadlinesList = res.data.list
					if(this.classificationIndex == 0){
						this.Headlinesbanner = res.data.banner
					}
				}).catch(res=>{})
			},
			// 头条分类
			classification(){
				classification().then(res=>{
					res.data.unshift({id:0,name:'热门'})
					this.classificationList = res.data
					this.headList(0)
				}).catch(res=>{})
			},
			// 获取人气主播榜
			LeaderboardAnchor(){
				LeaderboardAnchor({type:2}).then(res=>{
					this.LeaderboardList = res.data
				}).catch(res=>{})
			},

			// 预约赛事
			getReserveMatch(item) {
				if(JSON.stringify(this.infos) === '{}'){
					return this.$store.state.user.showLoginMask = true
				}
				reserveMatch2({
					type:item.type,
					match_id: item.sourceid
				}).then(res => {
					if (item.reserve == 0) {
						item.reserve = 1
					} else {
						item.reserve = 0
					}
					this.$message.success('预约成功！')
				}).catch(res => {

				})
			},

			navigate(url, type) {
				// localStorage.setItem('index', type)
				// this.$router.push('/schedule')
				// return
				let routeData = this.$router.resolve({
					path: "/" + url
				})
				window.open(routeData.href, '_blank')
			},

			setType(row, key) {
				// if(row.type === 0){
				// 	switch(key){

				// 	}
				// }else{
				switch (key) {
					case 'type1':
						return '进行中'
						break;
					case 'type2':
						return '未开始'
						break;
					case 'type3':
						return '完场'
						break;
				}
				// }
			},
			// 获取首页赛事推荐
			recommend() {
				recommend({
					type: this.type
				}).then(res => {
					if (res.code === 0) {
						this.count = res.data.count
						this.recommendList = {
							...res.data
						}
					}
				})
			},
			// 获取直播
			getLiveList() {
				let data = {
					page: 1,
					type: -1,
					limit:6
					// isweb: 1
				}
				getLiveList(data).then(res => {
					// this.mainList = (res.data.data).slice(0,6)
					this.mainList = res.data.data

					this.servertime=res.data.servertime
					this.starttime=res.data.data[0].starttime
					this.servertimeDate(this.servertime)
					// console.log(this.starttime-this.servertime+"倒计时")
					if ((this.starttime)-(this.servertime)>0&&(this.starttime)>0 ) {
						this.counttDown=(this.starttime)-(this.servertime)
						// this.counttDown=10
						//切换赛事先卸载定时器从新加载定时器
						clearInterval(this.timeInterval)
						this.Iime()
						this.urlPlayer=res.data.data[0]
						this.title_name=res.data.data[0].title
					}else{
						this.counttDown=false
					}
					if (res.data.data.length == 0) return
					this.detail = res.data.data[0]
				}).catch(res => {})
			},
			counttDownF(){
				let d=parseInt(this.counttDown/(24*60*60))
				d=d<10?"0"+d:d
				let h=parseInt(this.counttDown/(60*60)%24)
				h=h<10?"0"+h:h
				let m=parseInt(this.counttDown/60%60)
				m=m<10?"0"+m:m
				let s=parseInt(this.counttDown%60)
				s=s<10?"0"+s:s
				let date=[d,h,m,s]
								// console.log(date)
				this.counttDownDay=date
			},
			Iime(){
				this.timeInterval =setInterval(()=>{
					if(this.counttDown>0){
						this.counttDown-=1
						this.counttDownF()
					}else if(this.counttDown===0){
						//倒计时结束隐藏倒计时并拉流直播，结束定时器
						this.counttDown=0
						this.detail=this.urlPlayer
						clearInterval(this.timeInterval)
					}
					
				},1000)
			},
			// 服务器时间倒计时
			servertimeDate(times){
				this.timeIntervals =setInterval(()=>{
					if(times>0){
					this.servertime=times+=1
					}
				},1000)
			},
			copyText () {
		        const qrUrlContent = document.getElementById("cp-input");
		        qrUrlContent.value = window.location.href;
		        qrUrlContent.select()
		        let range = document.createRange()
		        let selection = document.getSelection()
		        range.selectNode(qrUrlContent)
		        selection.addRange(range)
		        qrUrlContent.setSelectionRange(0, qrUrlContent.value.length);
		        console.log(window.location.href,"========");
		        let isSucess = document.execCommand('copy');
		        if (isSucess) {
		        	this.$alert('复制成功',"提示")
		        	this.tipsId = "";
		        } 
    		},
			// 
			prev() {
				if (this.num < 0) {
					this.num += 1;
				}
			},
			next() {
				if (this.num > -(this.list.length + this.num)) {
					this.num -= 1;
				} else if (this.num < -(this.list.length + this.num) && -(this.list.length + this.num) != -0) {
					this.num -= 1;
				}
			},
			// 获取积分榜
			getRanking(item, index) {
				this.rangingList = []
				this.titleIndex = index || 0
				season_table({
					id: item.id
				}).then(res => {
					this.group = res.data.group
					if (res.data.group == 0) { //没有分组
						this.rangingList = res.data.list
					} else {
						for (let var1 in res.data.list) {
							if (var1 == 'A') {
								this.rangingList1 = res.data.list[var1]
							} else {
								this.rangingList2 = res.data.list[var1]
							}
							// this.rangingList.push(res.data.list[var1])
						}


					}
				}).catch(res => {})
			},
			s(){
				let obj = {
					id:'0001'
				}
				
				
			},
			// 首页全部赛程
			getList() {
				getAllMatch().then(res => {
					res.data.data.forEach(item=>{
						item.anchorList = {}
						if(item.anchor.length != 0) {
							item.anchorList = item.anchor[0]
						}
					})
					
					this.list = res.data.data
				}).catch(res => {})
			},

			// 活動倒計時
			initCountDown() {
				let activityTimestamp = Date.parse(new Date('2022-11-20 23:59:59'));
				let nowTimestamp = Date.parse(new Date());
				let interval = activityTimestamp - nowTimestamp;

				if (interval < 0) {
					this.showCountDown = false;
					clearInterval(this.countDownIntervals);
					return
				}
				
				let d = Math.floor(interval / (1000*60*60*24));
				let h = parseInt(interval % (1000*60*60*24) / (1000*60*60));
				let m = parseInt(interval % (1000*60*60) / (1000*60));
				let s = parseInt(interval % (1000*60) / 1000);
				this.countDownD = d < 10 ? ('0' + d) : d + '';
				this.countDownH = h < 10 ? ('0' + h) : h + '';
				this.countDownM = m < 10 ? ('0' + m) : m + '';
				this.countDownS = s < 10 ? (s >= 1 ? ('0' + s) : '00') : s + '';
			}
		},
		destroyed(){
			clearTimeout(this.servertimeDate)
			clearTimeout(this.servertimes)
			clearInterval(this.countDownIntervals)
		}
	}
</script>


<style lang="scss" >
	// @import "~@/styles/index.css";
	// @import "~@/styles/main/main-home.css";
	.act-main a {
		    display: inline-block;
		    width: 288px;
		    height: 168px;
		    border-radius: 8px;
		    cursor: pointer;
		    margin-left: 16px;
	}
	.act-main a:first-child {
		    margin-left: 0;
	}
	/* 推荐赛事主播列表 */
	.anchor {
		.anchor-title {
			color: #ccc;
			font-size: 12px;
			text-align: center;
			padding-bottom: 10px;
			border-bottom: 1px solid #C9CADA;
		}
		.anchor-li {
			cursor: pointer;
			display: flex;
			margin-top: 10px;
			align-items: center;
			border-radius: 10px;
			img {
				width: 30px;
				height: 30px;
				border-radius: 50%;
				margin-right: 5px;
			}
			span {
				flex: 1;
			}
			&:hover {
				color: #fff;
				background: linear-gradient(127deg, #f8d8bd -4%, #f3c272);
			}
		}
	}
	.anchor-home-page-top-container{
    width: 1200px;
    height: 574px;
    position: relative;
	}
	#cp-input{
		position:absolute;
		z-index:-1;
		opacity:0;
	}
	.icon-avatar-name {
			img {
				width: 20px;
				height: 20px;
				display: flex;
				border-radius: 50%;
				align-items: center;
				justify-content: space-between;
			}
		    span {
				font-size: 12px;
				color: #da9852;
				margin: 0 6px;
				white-space: nowrap;
			}
	}
	.counttDownShow{
		position: absolute;
		left: 0;
		top: 0;
		width: 86%;
		height: 574px;
		background-image: url(../../assets/images/live_bg.png);
		background-size: 100% 100%;
		z-index: 10;
		color: #fff;
		.center_date{
			text-align: center;
			margin-top: 20%;
			display: inline-block;
			margin-left: 32%;
			background: rgba(0,0,0,.7);
			padding: 6px 16px;
			border-radius: 6px;
			width: 350px
		}
		.txt_control{
			display: inline-block;
			width: 40px;
			height: 40px;
			background-image: url(../../assets/images/ic-share.png);
			background-size: 100% 100%;
			cursor: pointer;
			margin-top: 20px;	
		}
	}
		.concern_box_shou{
		position: absolute;
		right: 3%;
		top: 41%;
	}
	.cancelConcern_date_n{
		display: inline-block;
		width: 40px;
		height: 40px;
		background-image: url(../../assets/images/ic-love-uncheck.png);
		background-size: 100% 100%;
		cursor: pointer;
	}
	.cancelConcern_date_y{
		display: inline-block;
		width: 40px;
		height: 40px;
		background-image: url(../../assets/images/ic-love-check.png);
		background-size: 100% 100%;
		cursor: pointer;
	}
	.title_date{
		margin: 15px 0 10px 0;
		margin: 10px 0 3px 0;
		display: inline-block;
		width: 330px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		vertical-align: middle;

	}
	.d_date ,.h_date,.m_date,.s_date{
    display: inline-block;
    padding: 6px 0;
    background: #000;
    color: #fff;
    margin: 0 2px;
    text-align: center;
    width: 50px;
    font-size: 22px;
	font-family: 'LcdD';
	font-display: swap;
	}
	.d_date_d ,.h_date_h,.m_date_m,.s_date_s{
    display: inline-block;
    padding: 6px 0;
    color: #fff;
    margin: 0 2px;
    text-align: center;
    width: 50px;
    font-size: 22px;
	}
	
	/* 推荐赛事 */
	.showMask {
		width: 100%;
		transition: all 0.2s;
		.contens-shoMask{
			width: 376px;
			height: 0px;
			margin: 0 auto;
			text-align: center;
		}
		.schedule {
			height: 8px;
			margin-top: 12px;
			overflow: hidden;
			background-color: rgb(233,226,233);
			span {
				height: 8px;
			}
		}
		.ranking {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.left {
				font-size: 14px;
				color: #333;
				text-align: center;
				margin-top: 5px;
			}
			.center {
				flex: 1;
				text-align: center;
				margin: 0 21px;
				font-size: 12px;
				color: #333;
			}
			.center-main {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 6px;
				height: 24px;
				padding: 0 10px;
				line-height: 24px;
				border-radius: 12px;
				background-color: #fff;
				p {
					padding: 0 10px;
					color: #959db0;
					font-size: 12px;
					
				}
			}
			.center-main-left {
				flex: 1;
				display: flex;
				justify-content: space-between;
				span {
					width: 8px;
					height: 8px;
					border-radius: 50%;
					background-color: rgb(217,217,217);
				}
				img {
					width: 12px;
					height: 12px;
				}
			}
		}
	}
	
	.anchor-rank-content-list {
		width: 100%;
		background: #fff;
		margin-top: 10px;
		border-top: none;
		font-size: 12px;
	}

	.anchor-rank-content-list .list-item {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		height: 60px;
		border-bottom: 1px solid #eeecec;
		// border-top: none;
		cursor: pointer;
	}

	.anchor-rank-content-list .list-item .left {
		width: 167px;
	}

	.anchor-rank-content-list .list-item .left .img {
		width: 40px;
		height: 40px;
		margin-right: 5px;
		border-radius: 50%;
	}

	.anchor-rank-content-list .list-item .left .img img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		object-fit: cover;
	}

	.anchor-rank-content-list .list-item .left .level-logo {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 41px;
		height: 25px;
		margin-right: 4px;
	}

	.anchor-rank-content-list .list-item .left .level-logo img {
		width: 41px;
	}

	.anchor-rank-content-list .list-item .left .name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #333;
	}

	.anchor-rank-content-list .list-item .middle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 105px;
		height: 100%;
		color: #d6a44f;
	}

	.anchor-rank-content-list .list-item .right {
		flex: 1;
		display: flex;
		justify-content: flex-end;
	}

	.anchor-rank-content-list .list-item .right .blank {
		flex: 1;
		height: 100%;
	}

	.anchor-rank-content-list .list-item .right .no-add-btn {
		border: 1px solid #b4b4c3;
		color: #b4b4c3;
	}

	.anchor-rank-content-list .list-item .right .status-btn {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 74px;
		height: 26px;
		border-radius: 4px;
		cursor: pointer;
	}

	.anchor-rank-content-list .list-item .left,
	.anchor-rank-content-list .list-item .right {
		display: flex;
		align-items: center;
		height: 100%;
	}

	.anchor-rank-content-list .list-item .right .live-btn {
		background-color: #f0c682;
		color: #5f2a02;
	}

	.anchor-rank-content-list .list-item .right .status-btn {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 74px;
		height: 26px;
		border-radius: 4px;
		cursor: pointer;
	}

	.anchor-rank-content-list .list-item .right .live-btn .living_box {
		display: flex;
		transform: rotate(180deg);
		width: 12px;
		height: 12px;
		margin-right: 4px;
	}

	.anchor-rank-content-list .list-item .right .live-btn .living_box .strip:first-child {
		animation: surfa .7s linear .3s infinite;
	}

	.anchor-rank-content-list .list-item .right .live-btn .living_box .strip {
		width: 2px;
		height: 40%;
		margin-right: 2px;
		background-color: #5f2a02;
	}

	// --

	.app-container {}

	.app-container .swiper {
		width: 100%;

	}

	//    .app-container>>>.swiper-container {
	//       width: 100%;


	//     }
	.swiper-slide {
		width: 100px;
		// height: 0;
		padding-bottom: 28.1%;
		background-size: cover;
		background-position: center center;
		background-repeat: no-repeat;

		/* Center slide text vertically */
		display: -webkit-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		-webkit-align-items: center;
		align-items: center;
	}

	.swiper-pagination {}

	.swiper-pagination-bullet-active {
		background-color: #F29B76;
	}
	.list-item .name{
		width:67px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.anchor-rank-content-list .list-item .right .status-btn {
		width: 48px;
	}
	.img .live {
		width: 100% !important;
		height: 12px !important;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: 0 !important;
	}
	.popover {
		min-width: 10px !important;
	}
	// .team-1,.team-2{
	// 	flex: 1;
	// 	width: auto;
	// }
	.match-card-header-img img {
		width: 30px;
		height: 30px;
		margin-right: 10px;
		border-radius: 50%;
	}
	.el-collapse-item__header {
		line-height: revert !important ;
		transition: all 0.2s;
		flex-wrap: wrap;
	}
	.el-collapse-item__header:hover .showMask{
		height: 87px;
	}
	.el-collapse-item__header:hover{
		height: 135px;
	}
	.el-collapse-item__wrap {
		background-color: rgb(245,246,249);
	}
	.living_box {
		display: flex;
		transform: rotate(180deg);
		width: 12px;
		height: 12px;
		margin-right: 4px;
	}
	
	.living_box .strip:first-child {
		animation: surfa .7s linear .3s infinite;
	}
	
	.living_box .strip {
		width: 2px;
		height: 40%;
		margin-right: 2px;
		background-color: #5f2a02;
	}
	.live-btn {
		padding: 0 4px;
		border-radius: 4px;
		background-color: #f0c682;
		color: #5f2a02;
	}
	
	.activesHeight{
		height: 87px;
	}
	.icon1 {
		width: 26px;
		height: 26px;
	}
	.help-nav-box-wrap .nav-item-box:nth-child(1) .icon1 {
	  background-image: url(../../assets/images/microblog_choosable.png);
	  background-repeat: no-repeat;
	  background-size: 24px 24px;
	  background-position: center center;
	}
	.help-nav-box-wrap .nav-item-box:nth-child(1):hover .icon1 {
	  background-image: url(../../assets/images/microblog_selected.png);
	  background-repeat: no-repeat;
	  background-size: 24px 24px;
	  background-position: center center;
	}
	.countdown-container {
		position: relative;
		padding-top: 50px;
		.countdown-bg {
			width: 100%;
		}
		.countdown-content {
			position: absolute;
			top: 360px;
			width: 100%;
			.countdown-time {
				display: flex;
				align-items: center;
				justify-content: center;
				.countdown-box {
					margin: 0 1.5px;
					padding: 1px 8px;
					border-radius: 4px;
					font-weight: bold;
					font-size: 22px;
					background: #fff;
					color: #af0f22;
				}
				.countdown-colon {
					margin: 0 4px;
					font-weight: bold;
					font-size: 28px;
					color: #fff;
				}
			}
			.countdown-footer {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 9px;
				.countdown-text {
					flex: 1;
					font-size: 14px;
					text-align: center;
					color: #f9e9d6;
				}
			}
		}
	}
</style>
