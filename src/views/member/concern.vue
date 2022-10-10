<!-- 我的关注 -->
<template>
	<div class="i-tabs-container">
		<div class="header-nav nav-bottom-space" style="margin-bottom: 0;">
			<a v-for="(item,index) in tabList" :key="index" @click="tabIndex=index">
				<div class="item" :class="[{'first-item':index==tabIndex},{'first-active':index!=0}]">{{item}}</div>
				<!-- <div class="item first-active" :class="index==tabIndex?'first-item left-space':''">{{item}}</div> -->
			</a>
		</div>
		<div class="tab-pane-item" name="我关注的主播">
			<div class="concern-anchor concern-common">
				<div class="anchor-list">
					<div class="item-wrap">
						<div class="item" v-for="(item,index) in list" :key="index">
							<div class="left">
								<a class="iconBox " >
									<!-- <img src="../../assets/images/userLogo.png" > -->
									<div class="lazyload-wrapper "><img class="icon"
											:src="item.avatar?item.avatar:require('../../assets/images/userLogo.png')"
											alt="" title=""></div>
								</a><a class="des" >
									<div class="title ellipsis">
										<div class="title-text ellipsis">{{item.user_nickname}}</div>
										<div class="anchor-level" style="width: auto;height: auto;"><img style="height: 22px;" :src="item.votestotal_icon"></div>
									</div>
									<div class="txt ellipsis">{{item.title}}</div>
								</a></div>
							<div class="right">
								<div class="btn" @click="attention(item)">取消关注</div>
							</div>
						</div>
					</div>
				</div>
				<div class="common-empty-view" v-if="list.length == 0"><img class="no-data-img  "
						src="../../assets/images/qsy.png" alt="no-data"
						style="margin-top: 0;">
				</div>
				<!-- <ul  unselectable="unselectable">
					
				</ul> -->
				<el-pagination background class="ant-pagination" @current-change="sizeChange" layout="prev, pager, next"
					:total="detail.total">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import { attentionList,attention } from '../../api/user.js'
	export default {
		data() {
			return {
				page1:1,
				detail:{},
				list:[],
				tabIndex: 0,
				tabList: ['我关注的主播', '我关注的作者', '我关注的用户']
			}
		},
		watch:{
			tabIndex(e){
				this.attentionList()
			}
		},
		mounted(){
			this.attentionList()
		},
		methods:{
			// 列表分耶2
			sizeChange(e) {
				this.page1 = e
				this.attentionList()
			},
			// 获取列表
			attentionList(){
				let data = {
					page:this.page1,
					type:this.tabIndex,
				}
				attentionList(data).then(res=>{
					res.data.data.forEach(item => {
						if (item.is_live == 1 && JSON.stringify(item.live) !== "{}") { //正在直播
							item.title = item.live.name + ':' + item.live.home_name + '-' + item.live.away_name || ''
						} else if (item.is_live == 0 && JSON.stringify(item.reserve) !== "{}") {
							item.title = item.reserve.name + ' ' + item.reserve.match_time + ' ' + item.reserve.home_name + '-' + item.reserve.away_name || ''
						} else {
							item.title = ''
						}
					})
					this.list = res.data.data
					this.detail = res.data
				}).catch(res=>{})
			},
			// 取消关注
			attention(item){
				console.log(item);
				attention({id:item.followed_id}).then(res=>{
					this.attentionList()
				}).catch(res=>{})
			}
		}
	}
</script>

<style>
</style>
