<!-- 搜索 -->
<template>
	<div class="search-page-container">
		<div class="search-header">
			<div class="search-input search-popover-container">
				<el-popover style="margin-top: 65px" placement="bottom" width="410" 
					trigger="click">
					
					<div class="search-popover-container">
						<div class="ant-popover-inner-content">
							<div class="nav-search-popover" style="width: 100%;">
								<div class="search-history">
									<div class="list-header" v-if="historyList.length != 0">
										<div class="sub-title"><i></i>历史搜索</div>
										<div class="clear" @click="getHistory(3,'')"><i></i>清空</div>
									</div>
									<ul class="list-history clearfix" style="width: auto;">
										<li class="item-history" v-for="(item,index) in historyList" :key="index" @click="searchIndex(item,1),name = item">
											<span class="txt">{{item}}</span>
											<i class="icon-del" @click.stop="getHistory(2,index)"></i>
										</li>
									</ul>
								</div>
								<div class="search-hot">
									<div class="sub-title"><i></i>热门搜索</div>
									<ul class="list-hot clearfix">
										<li  v-if="index<10"  class="item-hot" v-for="(item,index) in hotList" :key="index" @click="searchIndex(item.short_name_zh,1),name = item.short_name_zh"><span>{{index+1}}</span>{{item.short_name_zh}}</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<input slot="reference" id="search_input" @click="visible2= !visible2" type="text" maxlength="10" placeholder="请输入搜索内容"
						autocomplete="off" value="" v-model="name">
				</el-popover>
				<button class="search-button" @click="searchIndex(name)">搜索</button>
			</div>
		</div>
		<div style="width: 100%;">
			<div class="">
				<div class="search-nav-container ">
					<div class="nav-item" v-for="(item,index) in tabList" :key="index"
						:class="{'active': tabIndex == index }" @click="tabIndex = index">{{item}}</div>
				</div>
			</div>
		</div>
		<div class="search-main">
			<div class="search-result-all clearfix">
				<div class="find-result-info"  v-if="(tabIndex == 1 || tabIndex == 2) && num == 0">抱歉，暂时没有 <span>“{{name}}”</span> 的相关内容</div>
				<div class="find-result-info" v-if="num == 0 && tabIndex == 0">为您推荐以下直播</div>
				<div class="find-result-info" v-if="num != 0 && tabIndex == 0 ">共找到相关结果 <span>{{num}}</span> 个</div>
				
				
				<div class="search-empty-container" v-if="(tabIndex == 1 || tabIndex == 2) && num == 0">
					<el-empty  :image-size="300" :image="require('../../assets/images/qsy.png')"></el-empty>
				</div>
				
				<div class="flex-box">
					<div class="result-container">
						<!-- 相关主播 -->
						<div class="sub-title" v-if="tabIndex != 2 && anchorList.length != 0">
							<img class="title-icon" src="../../assets/images/yuding.png" alt="">
								相关主播
							<div class="sub-title-right">
								<span class="sub-title-right-more">更多<i></i></span>
							</div>
						</div>

						<!-- 相关主播 -->
						<div class="anchor-result-list clearfix" v-if="tabIndex != 2">
							<div class="live-result-item-wrap" v-for="(item,index) in anchorList" :key="index">
								<!-- :to="'/live?router=live&type='+ +football'&id='+  +'&uid='+item.id" -->
								<router-link tag="a" target="_blank" :to="'/live?router=live&type='+ (item.type == 0?'football':item.type == 1?'basketball':item.type) +'&id='+ item.match_id +'&uid='+item.uid+'&vid='+item.vid">
									<div class="anchor-result-item">
										<div class="anchor-avatar">
											<img :src="item.avatar" alt="" width="66" height="66" title="">
											<img v-if="item.is_live == 1" class="live-status online" style="width: 40px;height: 20px;"
												src="../../assets/images/main-hot-live.png" alt="live-status">
										</div>
										<!-- <span class="keyword">s</span> -->
										<div class="anchor-name">{{item.user_nickname}}</div>
										<div class="subscriptions">{{item.attention}}人关注</div>
									</div>
								</router-link>
							</div>

						</div>

						<div class="sub-title" v-if="tabIndex != 1  && anchorList.length != 0">
							<img class="title-icon" src="../../assets/images/2.png" alt="">推荐直播</div>
						<!-- 推荐直播 -->
						<div class="live-result-list clearfix" v-if="tabIndex != 1">
							<div class="live-result-item-wrap" v-for="(item,index) in liveList" :key="index">
										<router-link tag="a" target="_blank" :to="'/live?router=live&type='+ (item.type == 0?'football':item.type == 1?'basketball':item.type) +'&id='+ item.match_id +'&uid='+item.uid+'&vid='+item.vid">
									<div class="live-result-item">
										<div class="cover-img-wrap">
											<img class="cover-img"
												:src="item.thumb"
												:alt="item.title" width="216" height="122" :title="item.title"></div>
										<div class="live-info">
											<div class="anchor-avatar">
												<img :src="item.avatar" alt="纯二" width="36" height="36" title="纯二">
												<img class="live-status online" src="../../assets/images/main-hot-live.png" alt="live-status">
											</div>
											<div class="room-info">
												<div class="room-title">{{item.title}}</div>
												<div class="info-b">
													<div class="anchor-name">{{item.user_nickname}}</div>
													<div class="hot-value"><i class="hot-icon"></i>{{item.heat}}</div>
												</div>
											</div>
										</div>
									</div>
								</router-link>
							</div>
						</div>
						<!-- 相关推荐 -->
						<div class="live-result-list clearfix" v-if="num == 0 && tabIndex == 0">
							<div class="live-result-item-wrap" v-for="(item,index) in arr" :key="index">
										<router-link tag="a" target="_blank" :to="'/live?router=live&type='+ (item.type == 0?'football':item.type == 1?'basketball':item.type) +'&id='+ item.match_id +'&uid='+item.uid+'&vid='+item.vid">
									<div class="live-result-item">
										<div class="cover-img-wrap">
											<img class="cover-img"
												:src="item.thumb"
												:alt="item.title" width="216" height="122" :title="item.title"></div>
										<div class="live-info">
											<div class="anchor-avatar">
												<img :src="item.avatar" alt="纯二" width="36" height="36" title="纯二">
												<img class="live-status online" src="../../assets/images/main-hot-live.png" alt="live-status">
											</div>
											<div class="room-info">
												<div class="room-title">{{item.title}}</div>
												<div class="info-b">
													<div class="anchor-name">{{item.user_nickname}}</div>
													<div class="hot-value"><i class="hot-icon"></i>{{item.heat}}</div>
												</div>
											</div>
										</div>
									</div>
								</router-link>
							</div>
						</div>
					</div>
					
					<div class="hot-container">
						<div class="sub-title"><img class="title-icon"
								src="data:image/png;base64,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"
								alt="">热搜榜单</div>
						<div class="hot-data-panel">
							<ul>
								<li v-if="index<10" v-for="(item,index) in hotList" :key="index"  @click="searchIndex(item.short_name_zh,1),name = item.short_name_zh" ><span>{{index+1}}</span>{{item.short_name_zh}}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		searchIndex,
		searchAnchor,
		searchLive,
		initialList
	} from '@/api/search.js'
	import {
		getLiveList,
	} from '@/api/user.js'
	export default {
		data() {
			return {
				name: '',
				num:0,
				visible2: false,
				tabIndex: 0,
				arr:[],//推荐
				hotList:[],//热门推荐
				liveList:[],//直播列表
				historyList:[],//历史记录
				anchorList:[],//主播列表
				tabList: ['综合', '主播', '直播']
			}
		},
		mounted() {
			let query = this.$route.query
			this.initialList()
			this.historyList = JSON.parse(localStorage.getItem('historyList')) || []
			if(JSON.stringify(query) == '{}') return
			this.searchIndex(query.name)
			this.name = query.name
		},
		watch: {
			tabIndex(e){
				
			}
		},
		methods: {
			// 热门推荐
			initialList(){
				initialList().then(res => {
					this.hotList = res.data.hot_match
				}).catch(res => {})
			},
			
			
			// 缓存历史搜索
			getHistory(type,value){
				if(type == 1){//新增
				
					this.historyList.push(value)
				}else if(type == 2){//删除
					this.historyList.splice(value,1)
				}else if(type == 3){
					this.historyList = []
				}
				localStorage.setItem('historyList',JSON.stringify(this.historyList))
			},
			// 
			
			
			// 综合 
			searchIndex(name,type) {
				// 缓存
				let data = {
					isWeb: 1,
					name: name
				}
				searchIndex(data).then(res => {
					// liveList 直播列表
					// anchorList 主播列表
					this.visible2 = false
					this.liveList = res.data.liveList
					this.anchorList = res.data.anchorList
					this.num = res.data.liveList.length + res.data.anchorList.length
					if(type !== 1){//如果是点击历史搜索则不添加
						this.getHistory(1,name)
					}
					if(res.data.liveList.length == 0 && res.data.anchorList.length == 0){
						
						getLiveList().then(res => {
							this.arr = res.data.data
						}).catch(res => {})
					}
					
				}).catch(res => {})
			},
			// 主播
			searchAnchor() {
				let data = {
					name:this.mame
				}
				searchAnchor(data).then(res => {
					this.anchorList = res.data.data
				}).catch(res => {})
			},
			// 直播
			searchLive() {
				let data = {
					name:this.mame
				}
				searchLive(data).then(res => {
					this.liveList = res.data.data
				}).catch(res => {})
			}
		}
	}
</script>

<style scoped="scoped">
	@import url("~@/styles/search.css");

	.search-page-container {
		min-height: 100vh;
		padding-top: 60px;
		background: #f7f7f8
	}

	.search-page-container .search-header {
		height: 60px;
		padding-top: 22px;
		padding-bottom: 4px
	}

	.search-page-container .search-header .search-input {
		width: 410px;
		height: 34px;
		border-radius: 17px;
		margin-right: auto;
		margin-left: auto;
		background: #fff;
		border: 1px solid #efeeec;
		position: relative
	}

	.search-page-container .search-header .search-input input[type=text] {
		caret-color: #d8ad66;
		width: 100%;
		height: 100%;
		color: #666;
		font-size: 12px;
		padding-left: 18px;
		padding-right: 60px;
		border-radius: 17px;
		background-color: transparent;
		outline: none
	}

	.search-page-container .search-header .search-input input[type=text]::-webkit-input-placeholder {
		color: #999
	}

	.search-page-container .search-header .search-input input[type=text]:-moz-placeholder {
		color: #999
	}

	.search-page-container .search-header .search-input input[type=text]:-ms-input-placeholder {
		color: #999
	}

	.search-page-container .search-header .search-input .search-button {
		width: 60px;
		height: 34px;
		font-size: 12px;
		color: #fff;
		position: absolute;
		top: -1px;
		right: 0;
		border-top-right-radius: 17px;
		border-bottom-right-radius: 17px;
		background-image: linear-gradient(120deg, #eecfb5, #d8ad66 100%);
		outline: none;
		cursor: pointer
	}

	.search-page-container .search-main {
		width: 1200px;
		margin-right: auto;
		margin-left: auto;
		padding-top: 22px
	}

	.search-page-container .search-main .find-result-info {
		font-size: 13px;
		color: #333;
		margin-bottom: 35px
	}

	.search-page-container .search-main .find-result-info>span {
		color: #d8ad66
	}

	.search-page-container .search-main .sub-title {
		font-size: 22px;
		color: #333;
		display: flex;
		align-items: center;
		margin-bottom: 16px;
		position: relative
	}

	.search-page-container .search-main .sub-title .title-icon {
		width: 24px;
		height: 24px;
		margin-right: 10px
	}

	.search-page-container .search-main .sub-title .title-tab {
		margin-left: 20px;
		display: flex;
		align-items: flex-end
	}

	.search-page-container .search-main .sub-title .title-tab>div.active,
	.search-page-container .search-main .sub-title .title-tab>div.active:hover {
		color: #fff;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAAAoCAMAAABNac3HAAAA7VBMVEUAAADqxpboxJbcs3LcsnHtzKv/5aLbsW/tzKzbsW7sy6rcsnHsy6ncs2/szKzsyqfuzq3dsnHftXTetnnrzKvszKvcsm/qyqXcsm/tzK3tzKvctHDdtXbty6nnv4zds3LqyKTpx6LoxqDft3rcsnHsy6nbsnLrx6TdsnXszqviunbetnrdtHXft33nxJvguYHivIjfuH/jvYrdtXfkv4/jvozmwpfhu4bmwpXqyKTpxp/huoTkwJHoxZ3lwZTlwZPpx6Lpx6Dnw5ncs3LryqnbsXDjv47qyaXguoLryafbsW7oxZ7hu4Xsy6vtzKzegIV7AAAAK3RSTlMADSyXYlEE9O/pysqVfXtwYU876ejY17+ro4V2bTgg/Pvp6cC9sYhlU0Ma9LkeQAAAA8hJREFUSMellulyEkEUhQU1qxpjoonZ3PcAAQcCDDCEbQYCvP/jeLcz3bZjmTK3+vdXp06fuzzIq3SyszWhmqcdquHw5qbbve1TVUejFlW7PUiSHlU0mzWbjUbjiur6ermMa1T1Wr1eqVR+HHw4KykP9fxwtWIsc9MOY4VbrVZHVIwdDJJe0ouIGxn3mrhxnNUyohKWuFwH+z732Xo9maxYb0pY0gvBTGa9LJjBjG1CMYOzTPXWFfyT6pHjPl6vTfAcYAgmxcIVwREJjiLhiuA4FrDjKvlF7u8WcSFYHe7m4Ba4CfvLBjuHfS4EX15e7uYGm+BJShanTrBaTGQVTGBWLGQ4HNeUrFyQywZ+bdwJ6SXFyr3tV/u+EayYuTCCwcKFYHCpTg38EoLTufigYBXsOzEjcBPgKxXMXIDBHT9U7saKyrLGFovDgRGDwAhWXGiEDy5T1pjLepE10ytODNrtxCLhvk4jUYNigIU7fmphg2D5uY42RyCYyFEvEMwh1p6DwwB/te4grHK5hgVcTzC4EBxwFVy2UHCG51RElUiQE+iNUYu4bY6EgZHhGM1B3Hog+M2GgncmohhRu1Fu37hUSY/LBCPD1s1coeBXlratlXABDp0IM4zxo+ACh6fHyr3gZhYjwO2CO4LDgRFwGFw/EgT+rOBvaDrium5G1jhqSgYYgoVLL/y66dTG254ITt1YE4v98YMx7BSzD3E4fiB4atPtCbLGmWDsb81h0wdf5zIse8OwAdiWyJFynWDv55zFnuDiOey42xaKQ/45bwwjaxDMYAiG3qVw/yL4o015ccITrD/HDrcGtkERNTiBqFWKBE9tBJ2LE77iKhcybE0HI7gswrAYXM0w1ZmtjzzDQ21mZJgEk2LWG0QNGUYzB4IXFooTaWYda8jwSAW7VWeKkeEMXxc6PGXwdwV/mqekuGg1D4jLWKpgDsuRUuzwYrGJvSTNMZTxg8XhBOvP2de5n8uC+Y6mGxN41/aS/pzNd6xQN9+TqMdYvzeyuHgOqxEL7CXW661QONGm4hsFTjSwQuOYwKFgGMHgU9tLcvtwoTk8wcztBdxl4WoWsnAX+7aXJGo4LzHV8HUMngVTIsMK/WMOjwV8YSOoyAhEzXqDvw6CcV76guGEcDc3DBzcwxg/d7uHnWBwF9hLe/e9h3PBFDWuYwOX73gPX4X3cNHPceXX8c6/7uFm8T0cCjbudgng87f3vIelIJjDhvrSud89jKgJ164265F3d7uHl8X3sJe1bTMYVdo7et+9rf7nPQzu5u7TUo78BU2nv9FjCXeEAAAAAElFTkSuQmCC) no-repeat;
		background-size: 100% 100%
	}

	.search-page-container .search-main .sub-title .title-tab>div {
		cursor: pointer;
		font-size: 12px;
		letter-spacing: .3px;
		line-height: 20px;
		color: #67728f;
		text-align: center;
		margin: 5px 8px 3px 0;
		width: 56px;
		height: 20px;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAAAoCAMAAABNac3HAAAAhFBMVEUAAADBwcHPz8/AwMDBwcHCwsLBwcHBwcHBwcHCwsLCwsLCwsLCwsLFxcXIyMjS0tLAwMDBwcHBwcHBwcHBwcHBwcHBwcHBwcHCwsLBwcHCwsLCwsLCwsLDw8PFxcXi4uLBwcHBwcHBwcHBwcHAwMDAwMDBwcHCwsLCwsLCwsLBwcHAwMBhTHEzAAAAK3RSTlMA6g38lWtP28p8dmFUIRcHz/juwrixpaGJgnFlODArBPHk1b2ajldIQjzO82B7bwAAAUBJREFUSMe1lcm2gjAUBBMQRBAcQBTEeX71///3FhLAtW2telU5J7npazq8KlryNTavPfNBYhFhw6F3AkWYmq/JpnPYmo4Q/240HCr8prvfJYGRsSZyMWFudHiWXRtLYiNk1OnO7JTigFF73wtmPxGnjI2SDRM3bIVUvGL6DjE3qXjM3g3eVumd+X77ZBEvpXjfPdmRTCmesmqLA2uUTNi8w5NcKi5J3DxfpeI5jfvatVS8oF0iFx5Kb8qpTSdSpfjBpa1PFkZJ7Sqo4U8qvhK49VFKxTnPvuSUWLK+5IRkHAclJ+RFNCg5IVvWfckpuRH3JaekIOxLTsmY1FVQoPTOWBx+It5xblPMSCmOKbsjrCdt+cTFiLXOG7D0XG58qoPIe/cJh3+F+TQTrI6w4LPQQosIm5gPvDoXuJdR1Y/BP/kvRr94Ain2AAAAAElFTkSuQmCC) no-repeat;
		background-size: 100% 100%
	}

	.search-page-container .search-main .sub-title .title-tab>div:hover {
		color: #ba9250;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAAAoCAMAAABNac3HAAAAhFBMVEUAAADCm1q7klC6k1G8k1HVqmG7klG7k1G7k1G7klC6k1C7k1C7k1G8klC8k1G8lFK9lVa8lFG7k1G+lFK6k1G7k1G6klG7k1G7k1C7k1G7lFK8lFK7l1O+mln///+7k1G6k1C6klC7k1C7k1C7k1C7k1G8k1K8lFK+lFO8klG/llS6klC0oGMOAAAAK3RSTlMADe7pZwWVdW77z8rAfGFUHVBMKfzauLGloYI6MRUBmYn05uDVjldCN4guTRvUhQAAAUVJREFUSMe1lzeWg0AQRHsGEFY4SQiBkHe7df/7bYAaE1P7oyL5E0x3zUMGTBNbLMZJAiMzUgcknGLqXQNVmctSTl0WAa4MFAhfwsFrELb6YSxcoXFArDFFJDyMg+M31vCFyHnQPXBkigOs+uCFMEyxq+IN7sLkgrUOW0UV75H1wceTKt5ho4PnMr3eduv1KUbLFP9i900WHVOcYd+HHFaYrPHThzcSqrhGqotypoojfPqwQsD0nq66xwlKpjjH7ZtuyJniUq/M4Hpiin2toA8iYXLWK0tRU8UJ3mPJMbHIx5Ij0sFOSo5Ii3hSckRcHPRd2gmTJ/yx5JhUKLXkLlTxXa9sxX2XDELvX7rtiMe42tymqIcjHEMUR0g1xjgwp9gazW2IhrUirxDF9BREWbe8k/OywrzQCt6PTSozTJAQ3DZujCh/uMtG5D0NfXgAAAAASUVORK5CYII=) no-repeat;
		background-size: 100% 100%
	}

	.search-page-container .search-main .sub-title-right {
		position: absolute;
		right: 20px
	}

	.search-page-container .search-main .sub-title-right-text {
		font-size: 12px;
		color: #9497a4;
		margin-right: 17px
	}

	.search-page-container .search-main .sub-title-right-text>span {
		color: #ba9250
	}

	.search-page-container .search-main .sub-title-right-more {
		display: flex;
		cursor: pointer;
		font-size: 12px;
		color: #8e8e93;
		justify-content: center;
		align-items: center
	}

	.search-page-container .search-main .sub-title-right-more i {
		display: inline-block;
		width: 14px;
		height: 14px;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAdtJREFUSA3tlstOwkAUhmfamrgzXt7CRIEChTVP4NILF/XBRPCy9AGUfbmz9BHcqIkrk17G/4Bjmmo6Uy5xoU3KtDnT/zv/4fQAY//Hb1RACGENBoONZbANlQhg3HWHY89jT93u6FC1XxVXAiHAOWfkbj0Mw3a3OzhSiSbFlUDQQjAPcL5CyAxD1ur1hsdJokkxnhSMxvAd5jyPPzAmNmdJsHqpZF9F9+hcKx1KkXw+P7Iss4L7F3yv9Nyl646qMq67ajuUgv3+JOv7Ppyyrc9yN0qlXFvGVau2QylUKGTGpmlW0EjPM6eiie6tybhqTQ0kwWIxO+Hc+IICfIHuratgFE9d0qgonO0LEXaEYNtUXqzn5bLdjO6JXy8EJDEMhT10LkF3CGpZYhcN9hgHyfu5SiofphUQSlo78YWAvd44Ey0p5+Isyd00QfqY5yBYEAQdPDt9PWD01HFyLZXWXA7pXYzCUNGGDoySsVQZxePfX3wacTntEZfKIc1T35+VEYkEOFPPU+3uQvvbaP17Gt4EM01eLxbt63gFVPdaJY3DDIPVALtRif8UV5YUY8uEqzvpzDCMquPk54JRAkog9uAHmL3hfMf8PEE33uJ6tQeaZW1Zf6JWm+mfVP8AWSK7bFQEAooAAAAASUVORK5CYII=);
		background-size: 100% 100%
	}

	.search-page-container .search-main .sub-title-right-more:hover {
		color: #ba9250
	}

	.search-page-container .search-main .sub-title-right-more:hover i {
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAfxJREFUSA3tVs0ua1EUXmufXjET3FegEgmu+wjGQisGfkoZVHkK9y20A/FzkUj0MKbxAkLM+sOYCRIjg+697jplqZB271PEwD2TdXa/fb5vfXudtU4B/l9fcQJ0vBy5PEy1fYS2spEQERbvrs4q93Bd8hcmbPttuFUQ4A8iQBsBtJKhzdJ+atJG2gi3CiIuGw9VDBDvWNQjDRvlXHqqEWkjjJN3u8p7qUGNeARE7QhoSMFsTyzz1+3p2i6rQ9naNZY99Twc4vUtASk0sF700wnBXaOzQyEsH6R/6Yo54nVH4BQUJqOxlU3BbdHZoRB1jaycKRUZ4preBE7B0FoxtzAjuC2GdiiELNLPL1Gea9pZdYo0H41n1wWvF0M7FKJoPHPO2dacEq6W/HRS8HqxaYdCWDhY7EOt80Tws+q0hXqjw9mC4K9j0w6FCLVB4oLK2hbfJVjylwbe1LGBuyCZiC2jenggZkwlz/hjeyDM8UuzUW+//O7JTZgY9KLhuvEztV6MZ5x60fnsJaHXjR92xIVyWJ2nxL1XdQaaB1wy7Dx1FrzwF39rgKfhDVqhmuVe3BLnrtHpSAOxCpnDxy8FaPRgpns0u+0q8nKftS2Idj1Nxn8WU5hoViwQtgoCjBsWu+ejeABU092xzM7LjD/lnk5SPz7qT9SnJPi9Sf8BhkzBoYRH93UAAAAASUVORK5CYII=)
	}

	.search-page-container .ant-popover {
		z-index: 9
	}

	.search-nav-container {
		height: 48px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid #ededed
	}

	.search-nav-container.white-bg {
		border: none;
		box-shadow: inset 0 1px 0 0 #ededed, inset 0 -1px 0 0 #ededed;
		background: #fff
	}

	.search-nav-container .nav-item {
		font-size: 16px;
		color: #666;
		margin: 0 40px;
		cursor: pointer;
		position: relative;
		user-select: none
	}

	.search-nav-container .nav-item.active,
	.search-nav-container .nav-item:hover {
		color: #d8ad66
	}

	.search-nav-container .nav-item.active:after {
		content: "";
		position: absolute;
		bottom: -8px;
		left: 50%;
		transform: translateX(-50%);
		width: 10px;
		height: 10px;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAYBJREFUOBHtUj1PAkEQnT2gucREaAzU0mztVSZWthQ21ncxURt7f4K98aImRmobC1orEiusaaAkfARDRPT8uI91Zrnl7hSQxMSKSSY7uzv79u17C7CMf1HgpVk1KRe5jP3WNGrcce/TrTHGIJVJGyvF7fq8M3MBRbuiD3peTYDgBMKA1XNraYMVSs4sUG3WBq33WyPbdx0euG9ASXW/9Xw278xMhp37KxNEcE28AATmuBXZAmOald/cK08DngrYqZ5z33PpqTpKBwLxaFSBejqaljHyW4c/9Iy1jdvbDxe6OxjWEEXqFrEjlrFgUM/kskZh4yChZzrWIsuPbscWE7Dvu4k5D7rvpKcVX00wbN4eS90ixabwU5shYaZp1vrOSVmBTgAbN0fcF0BP1SMjVFs04tdBW9CY0CTU1sE0irunUk8J2K7s609DIXXD56IBeIicWDRQz+xqyiiULh2p4aD/agdB+Hnxirirqlb45LZao/vCmj/2mI1Tk9aW8TcFvgA/PZe5U8Bq6gAAAABJRU5ErkJggg==) no-repeat;
		background-size: 100% 100%
	}

	.live-result-list {
		width: 1230px
	}

	.live-result-list .live-result-item-wrap {
		float: left;
		margin-right: 30px;
		margin-bottom: 22px;
		background: #fff;
		border-radius: 4px;
		box-shadow: 0 8px 16px 0 rgba(69, 74, 99, .08);
		overflow: hidden;
		transition: transform .5s
	}

	.live-result-list .live-result-item-wrap:hover {
		transform: translateY(-4px)
	}

	.live-result-list .live-result-item-wrap .live-result-item {
		width: 216px;
		height: 174px
	}

	.live-result-list .live-result-item-wrap .live-result-item .cover-img-wrap {
		height: 122px
	}

	.live-result-list .live-result-item-wrap .live-result-item .cover-img-wrap .cover-img {
		width: 100%;
		height: 100%;
		object-fit: cover
	}

	.live-result-list .live-result-item-wrap .live-result-item .live-info {
		display: flex;
		padding-left: 10px;
		padding-top: 7px
	}

	.live-result-list .live-result-item-wrap .live-result-item .live-info .anchor-avatar {
		width: 36px;
		height: 36px;
		position: relative;
		margin-right: 8px
	}

	.live-result-list .live-result-item-wrap .live-result-item .live-info .anchor-avatar>img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		object-fit: cover
	}

	.live-result-list .live-result-item-wrap .live-result-item .live-info .anchor-avatar .live-status {
		width: 48px;
		height: 30px;
		position: absolute;
		bottom: -10px;
		left: 50%;
		transform: translate(-50%);
		z-index: 2;
		object-fit: contain
	}

	.live-result-list .live-result-item-wrap .live-result-item .live-info .room-info {
		width: 155px
	}

	.live-result-list .live-result-item-wrap .live-result-item .live-info .room-info .room-title {
		font-size: 14px;
		color: #333;
		white-space: nowrap;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis
	}

	.live-result-list .live-result-item-wrap .live-result-item .live-info .room-info .room-title .keyword {
		color: #d8ad66
	}

	.live-result-list .live-result-item-wrap .live-result-item .live-info .room-info .info-b {
		display: flex;
		justify-content: space-between;
		font-size: 12px;
		color: #999
	}

	.live-result-list .live-result-item-wrap .live-result-item .live-info .room-info .info-b .anchor-name {
		width: 72px;
		white-space: nowrap;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis
	}

	.live-result-list .live-result-item-wrap .live-result-item .live-info .room-info .info-b .hot-icon {
		display: inline-block;
		width: 12px;
		height: 12px;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAAEXElEQVRYCa1XX2xTVRj/zr3tKCCsg21hcU50hoR/D84yjSaEgTywCCaGYELiBsnUwIMaEhMfFBPjg+/qQ+l07UYIWYwBEnwgaytiNDFL8GH+CTEGqRu4sSmdlNL2ns/vdLunp/fc9t4Nb9Kc7/t9f87v/PvOKcAyvuiZdHNsKP3MMkK1EENDPIChoXQICtaFBoNnPFx9mZdEABFZAaw4ILT39++Z9NWDh9OSCJyKp96nfC8zxq565PVt9k0glhg7yBicLGdm8IfvHjwcfREYHE5vQ4S4WAKRDwH/8cjr2+xJgDZd2OL8HBFYLbMia5PyAwqeBIqMJwCxU+2HIT6i6g8i1yVwKpE6QdN+QOuAQYeGLROoSSA6kuxCjh+55aWt8ER0dLzRzaZisUTqxXLdUEGH7EpABDELT9N2Czr8F1UMstz8C+62Cso5niwY1gcVRJdcCRQY/5A23WbdvYIgWG9VNF36bDgdoQF0MYQTg4lkt+6xgGgEoqcvbyfTm7UCJI4QiSbS/VJXhNFRNEsWjwqIBmJyhM+j4+Ous6kRYMXSpxQVUPLVFpF/MhhP7lQdREd/51IxMXobp428FSayx2xdbcuFxQZiI2N7eQku2bq/lhUZYAwMNsY4PEpF6jAC7NBiGUzDtnD765FIUbVVjRQtNkDMVbsPGYMUcRw4Hq8bidBq/JzdTwm/VJPKJaBpMijBXtX4f8t0KvY5c0oC8TPfdNLaNzkdlqt3tK+HA71PVYcjPl0NAMglKPHiBqexnk43I4RCDZDPF4l3ZfIDAQO2b+mAyJOPA13bEFoRhPz9hWWnkIedOSUB4MY6AO60a7pIuKOrEx7b2FpOzjmH27PzMD2ThUDQhI0dLWXcDmxevwb+nJorqwhsjY3brSRAO2DGq//Gtatg/74uWLVyhR0PhmFAa0tj+SfBGgKdlhmnSe6BYMmYchpVXUz57p1bqzpX7bXke/mCNNFrQutDEjhyZNcNBuwv6e0QWprXgvgt5ROdz879K0OoLP8glUVBEqANw8GAC04HW1/X9JAt+m5/+bX63coCcM4ZLAkIAzNwxOlg63fu5GzRVzs/fw9+nLiu+mb45vDXKiDkKgKvvvL8FWBw0ekk9OnbWbh7N+9m0rBc7j5cvHQVSiXlVBnme84yLAKrCJQBI/g2tdpwLYtD8vJPII5dvW/y5hyc/2ocsjQD8mPw/Wt9u1xnl/a2/sWGUy/Ra+gLKjCavSm8Gp7t3gRtG5roCC6YBbnM5Cxc++0mXL+hnbRMA5jdR4/23NJ7omV3AwUWjSeP0bn9WNznbj6maYCoC4Viqbw0SjFU3TOmafYO9PVMqKAq1yQgnAbjqT0W4Fmqtc1qkB+ZjvSVkBk62Nf33HQ9/7oERKD4X1AE/g4txhtEZGW9ZIu23w3G3h3o332WjnblkqgR6EnAjhNECib2Mo7iTt9Cz4Y2enyIykQjZFNUKb+jR8n5cKjn20OHmGXHebX/ATCvePe0TxYAAAAAAElFTkSuQmCC) no-repeat;
		background-size: 100% 100%
	}

	.search-empty-container {
		width: 388px;
		margin-right: auto;
		margin-left: auto;
		padding-top: 160px;
		padding-bottom: 160px;
		position: relative;
		user-select: none
	}

	.search-empty-container img {
		width: 100%
	}

	.search-empty-container .txt {
		font-size: 18px;
		color: #999;
		text-align: center;
		width: 100%;
		position: absolute;
		bottom: 252px
	}

	.search-result-all .flex-box {
		display: flex
	}

	.search-result-all .flex-box .result-container {
		width: 928px
	}

	.search-result-all .flex-box .result-container .anchor-result-list {
		width: 100%
	}

	.search-result-all .flex-box .result-container .anchor-result-list .live-result-item-wrap {
		margin-right: 16px
	}

	.search-result-all .flex-box .result-container .live-result-list {
		width: 100%
	}

	.search-result-all .flex-box .result-container .live-result-list .live-result-item-wrap {
		margin-right: 14px
	}

	.search-result-all .flex-box .hot-container {
		width: 272px
	}

	.search-result-all .flex-box .hot-container .hot-data-panel {
		width: 100%;
		height: 394px;
		border-radius: 4px;
		box-shadow: 0 6px 12px 0 rgba(69, 74, 99, .08);
		background: #fff
	}

	.search-result-all .flex-box .hot-container .hot-data-panel ul {
		list-style: none;
		padding: 20px 15px
	}

	.search-result-all .flex-box .hot-container .hot-data-panel ul li {
		font-size: 12px;
		color: #333;
		padding: 4px 8px;
		margin-bottom: 11px;
		cursor: pointer
	}

	.search-result-all .flex-box .hot-container .hot-data-panel ul li:hover {
		border-radius: 4px;
		color: #d8ad66;
		background-color: #f8f8f8
	}

	.search-result-all .flex-box .hot-container .hot-data-panel ul li>span {
		color: #666;
		margin-right: 8px
	}

	.search-result-all .flex-box .hot-container .hot-data-panel ul li:first-child>span {
		color: #ff2d2d
	}

	.search-result-all .flex-box .hot-container .hot-data-panel ul li:nth-child(2)>span {
		color: #ff5d5d
	}

	.search-result-all .flex-box .hot-container .hot-data-panel ul li:nth-child(3)>span {
		color: #f0c682
	}

	.ant-popover-inner-content {
		padding: 12px 16px !important
	}

	/* .ant-popover {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		color: rgba(0, 0, 0, .85);
		font-size: 14px;
		font-variant: tabular-nums;
		line-height: 1.5715;
		list-style: none;
		font-feature-settings: "tnum";
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1030;
		font-weight: 400;
		white-space: normal;
		text-align: left;
		cursor: auto;
		user-select: text
	} */

	/* .ant-popover:after {
		position: absolute;
		background: hsla(0, 0%, 100%, .01);
		content: ""
	} */

	.ant-popover-hidden {
		/* display: none */
	}

	.ant-popover-placement-top,
	.ant-popover-placement-topLeft,
	.ant-popover-placement-topRight {
		padding-bottom: 10px
	}

	.ant-popover-placement-right,
	.ant-popover-placement-rightBottom,
	.ant-popover-placement-rightTop {
		padding-left: 10px
	}

	.ant-popover-placement-bottom,
	.ant-popover-placement-bottomLeft,
	.ant-popover-placement-bottomRight {
		padding-top: 10px
	}

	.ant-popover-placement-left,
	.ant-popover-placement-leftBottom,
	.ant-popover-placement-leftTop {
		padding-right: 10px
	}

	.ant-popover-inner {
		/* background-color: #fff; */
		/* background-clip: padding-box; */
		/* border-radius: 2px; */
		/* box-shadow: 0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05); */
		/* box-shadow: 0 0 8px rgba(0, 0, 0, .15)\9 */
	}

	@media (-ms-high-contrast:none),
	screen and (-ms-high-contrast:active) {
		.ant-popover-inner {
			/* box-shadow: 0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05) */
		}
	}

	.ant-popover-title {
		min-width: 177px;
		min-height: 32px;
		margin: 0;
		padding: 5px 16px 4px;
		color: rgba(0, 0, 0, .85);
		font-weight: 500;
		border-bottom: 1px solid #f0f0f0
	}

	.ant-popover-inner-content {
		padding: 12px 16px;
		color: rgba(0, 0, 0, .85)
	}

	.ant-popover-message {
		position: relative;
		padding: 4px 0 12px;
		color: rgba(0, 0, 0, .85);
		font-size: 14px
	}

	.ant-popover-message>.anticon {
		position: absolute;
		top: 8.0005px;
		color: #faad14;
		font-size: 14px
	}

	.ant-popover-message-title {
		padding-left: 22px
	}

	.ant-popover-buttons {
		margin-bottom: 4px;
		text-align: right
	}

	.ant-popover-buttons button {
		margin-left: 8px
	}

	.ant-popover-arrow {
		position: absolute;
		display: block;
		width: 8.48528137px;
		height: 8.48528137px;
		overflow: hidden;
		background: transparent;
		pointer-events: none
	}

	.ant-popover-arrow-content {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		display: block;
		width: 6px;
		height: 6px;
		margin: auto;
		background-color: #fff;
		content: "";
		pointer-events: auto
	}

	.ant-popover-placement-top .ant-popover-arrow,
	.ant-popover-placement-topLeft .ant-popover-arrow,
	.ant-popover-placement-topRight .ant-popover-arrow {
		bottom: 1.51471863px
	}

	.ant-popover-placement-top .ant-popover-arrow-content,
	.ant-popover-placement-topLeft .ant-popover-arrow-content,
	.ant-popover-placement-topRight .ant-popover-arrow-content {
		box-shadow: 3px 3px 7px rgba(0, 0, 0, .07);
		transform: translateY(-4.24264069px) rotate(45deg)
	}

	.ant-popover-placement-top .ant-popover-arrow {
		left: 50%;
		transform: translateX(-50%)
	}

	.ant-popover-placement-topLeft .ant-popover-arrow {
		left: 16px
	}

	.ant-popover-placement-topRight .ant-popover-arrow {
		right: 16px
	}

	.ant-popover-placement-right .ant-popover-arrow,
	.ant-popover-placement-rightBottom .ant-popover-arrow,
	.ant-popover-placement-rightTop .ant-popover-arrow {
		left: 1.51471863px
	}

	.ant-popover-placement-right .ant-popover-arrow-content,
	.ant-popover-placement-rightBottom .ant-popover-arrow-content,
	.ant-popover-placement-rightTop .ant-popover-arrow-content {
		box-shadow: -3px 3px 7px rgba(0, 0, 0, .07);
		transform: translateX(4.24264069px) rotate(45deg)
	}

	.ant-popover-placement-right .ant-popover-arrow {
		top: 50%;
		transform: translateY(-50%)
	}

	.ant-popover-placement-rightTop .ant-popover-arrow {
		top: 12px
	}

	.ant-popover-placement-rightBottom .ant-popover-arrow {
		bottom: 12px
	}

	.ant-popover-placement-bottom .ant-popover-arrow,
	.ant-popover-placement-bottomLeft .ant-popover-arrow,
	.ant-popover-placement-bottomRight .ant-popover-arrow {
		top: 1.51471863px
	}

	.ant-popover-placement-bottom .ant-popover-arrow-content,
	.ant-popover-placement-bottomLeft .ant-popover-arrow-content,
	.ant-popover-placement-bottomRight .ant-popover-arrow-content {
		box-shadow: -2px -2px 5px rgba(0, 0, 0, .06);
		transform: translateY(4.24264069px) rotate(45deg)
	}

	.ant-popover-placement-bottom .ant-popover-arrow {
		left: 50%;
		transform: translateX(-50%)
	}

	.ant-popover-placement-bottomLeft .ant-popover-arrow {
		left: 16px
	}

	.ant-popover-placement-bottomRight .ant-popover-arrow {
		right: 16px
	}

	.ant-popover-placement-left .ant-popover-arrow,
	.ant-popover-placement-leftBottom .ant-popover-arrow,
	.ant-popover-placement-leftTop .ant-popover-arrow {
		right: 1.51471863px
	}

	.ant-popover-placement-left .ant-popover-arrow-content,
	.ant-popover-placement-leftBottom .ant-popover-arrow-content,
	.ant-popover-placement-leftTop .ant-popover-arrow-content {
		box-shadow: 3px -3px 7px rgba(0, 0, 0, .07);
		transform: translateX(-4.24264069px) rotate(45deg)
	}

	.ant-popover-placement-left .ant-popover-arrow {
		top: 50%;
		transform: translateY(-50%)
	}

	.ant-popover-placement-leftTop .ant-popover-arrow {
		top: 12px
	}

	.ant-popover-placement-leftBottom .ant-popover-arrow {
		bottom: 12px
	}

	.ant-popover-magenta .ant-popover-arrow-content,
	.ant-popover-magenta .ant-popover-inner,
	.ant-popover-pink .ant-popover-arrow-content,
	.ant-popover-pink .ant-popover-inner {
		background-color: #eb2f96
	}

	.ant-popover-red .ant-popover-arrow-content,
	.ant-popover-red .ant-popover-inner {
		background-color: #f5222d
	}

	.ant-popover-volcano .ant-popover-arrow-content,
	.ant-popover-volcano .ant-popover-inner {
		background-color: #fa541c
	}

	.ant-popover-orange .ant-popover-arrow-content,
	.ant-popover-orange .ant-popover-inner {
		background-color: #fa8c16
	}

	.ant-popover-yellow .ant-popover-arrow-content,
	.ant-popover-yellow .ant-popover-inner {
		background-color: #fadb14
	}

	.ant-popover-gold .ant-popover-arrow-content,
	.ant-popover-gold .ant-popover-inner {
		background-color: #faad14
	}

	.ant-popover-cyan .ant-popover-arrow-content,
	.ant-popover-cyan .ant-popover-inner {
		background-color: #13c2c2
	}

	.ant-popover-lime .ant-popover-arrow-content,
	.ant-popover-lime .ant-popover-inner {
		background-color: #a0d911
	}

	.ant-popover-green .ant-popover-arrow-content,
	.ant-popover-green .ant-popover-inner {
		background-color: #52c41a
	}

	.ant-popover-blue .ant-popover-arrow-content,
	.ant-popover-blue .ant-popover-inner {
		background-color: #1890ff
	}

	.ant-popover-geekblue .ant-popover-arrow-content,
	.ant-popover-geekblue .ant-popover-inner {
		background-color: #2f54eb
	}

	.ant-popover-purple .ant-popover-arrow-content,
	.ant-popover-purple .ant-popover-inner {
		background-color: #722ed1
	}

	.ant-popover-rtl {
		direction: rtl;
		text-align: right
	}

	.ant-popover-rtl .ant-popover-message-title {
		padding-right: 22px;
		padding-left: 16px
	}

	.ant-popover-rtl .ant-popover-buttons {
		text-align: left
	}

	.ant-popover-rtl .ant-popover-buttons button {
		margin-right: 8px;
		margin-left: 0
	}

	.ant-progress {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		color: rgba(0, 0, 0, .85);
		font-size: 14px;
		font-variant: tabular-nums;
		line-height: 1.5715;
		list-style: none;
		font-feature-settings: "tnum";
		display: inline-block
	}

	.ant-progress-line {
		position: relative;
		width: 100%;
		font-size: 14px
	}

	.ant-progress-steps {
		display: inline-block
	}

	.ant-progress-steps-outer {
		display: flex;
		flex-direction: row;
		align-items: center
	}

	.ant-progress-steps-item {
		flex-shrink: 0;
		min-width: 2px;
		margin-right: 2px;
		background: #f3f3f3;
		transition: all .3s
	}

	.ant-progress-steps-item-active {
		background: #1890ff
	}
</style>
