<!-- 我的收藏 -->
<template>
	<div class="i-tabs-container">
		<div class="header-nav nav-bottom-space" style="margin-bottom: 0;">
			<a v-for="(item,index) in tabList" :key="index" @click="tabIndex=index">
				<div class="item" :class="[{'first-item':index==tabIndex},{'first-active':index!=0}]">{{item}}</div>
				<!-- <div class="item first-active" :class="index==tabIndex?'first-item left-space':''">{{item}}</div> -->
			</a>
		</div>
		<div class="tab-pane-item" name="">
			<div :class="tabIndex == 0?'collection-news-container':'collection-post-container'" style="height: 526px;overflow: auto scroll;">
				<!-- 头条 -->
				<div class="collect"  v-if="tabIndex == 0">
					<div>
						<div class="new-item" v-for="(item,index) in dataBase.data" :key="index">
							<!-- <div class="picBox"> -->
							<router-link class="picBox" tag="a" target="_blank" :to="'/detail?id='+item.id">
								<div class="icon">
									<div class="lazyload-wrapper "><img
											:src="item.img">
									</div>
								</div>
								<div class="des">
									<div class="title">{{item.title}}</div>
									<div class="btns"><span>{{item.addtime}}</span><span>评论 : {{item.comment_count}}条</span>
										<div style="display: inline-block; margin-left: 8px;">
											<div class="tags-container"></div>
										</div>
									</div>
								</div>
							</router-link>
							<div class="del" @click="cancel(1,item.circle_id)">
								<img class="active-icon"
									src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABTNJREFUaAXVWV1MHFUUPmdmFwvYAE0Q2/pTiGhM2zQxfaoaxS4k2hd+Ak01KkjtD3TxSXkwJk2ML/ZJoE2pWlFjoxAWXvQBqKRpStqkL21jjK4Wq1a6xbRU2FLYnbmes8u27N/cu7vDFm4ymdnzc7/vm3Pvztw7ACu84VLxH+6qeQsE7BbUELCnsm3g06XAWhIBQ121u8E0owkj7q9yDxy1W4TtAi589Xq+b2pmHEAUR5PFyZLCB0u3vPG1P9qe2S8ts/T47Ou3ZvbHk+c4URz2xedkYrG1AmO99bn+a4FxAVCSiBSB+fIfdpZua+ibTeRPx2ZrBfy+4L5k5Jkc+zgmHaLJcmyrwOgXjasC07cuE821ycDCdpxwri4oq2jquWMdp+a1rQLBmf/elpNnUmJtOFaNoCzKFgHeH9wPELF2Gdg9v2gP59yzpHtli4Arv19tpufVelUSHMs5qvFWcRnPgZ9663Ou+gK/0Qx91Aoozofw1/oS5xMbG/rm43wpGDKuwMQ1oyll8kyQBE9cDzSmwDVhaEYVON+9x3lzftJLQ+LxhL1LjIh4pSinuHzr3mMBSWhSd0oCeOL9Mf53mTCxnO5gOaLYRuRrk/au4CARHnrdGwMEL2rCu6H0kcvlr3TOKaSGQuIEjI4edAR+uVQKQSCSBh1EFugaxJMA+BidMx521uTQJIw/CetXivMCCjp0LzjA63xq83hFxcHg4vyQgB87arYYCO10V7dScik9MR2Lg5bLNZEl8jhO7+fnNF075Grpv4gjR+rKzKBxkUjmLxeiKjxIzLRDdz6jCcOkJ+jKIs8CaZSsDprBZo2U5KooXo4xNJTyNKHjtzSuaOKstIamQ2CvVtniOatp0IbIVVkZjbky55fcnjOhfyGmPdJVvUcIOErHXdtylMPk6djnOjB4jPlFkT3ZUdtogPicpsgS/9ene2vQ1AGbt7d5eiI9RAlg48jhmtdME74EIfRI0LI4Ixo0bN50tQ58s5hP3J1eCNhFyqKeeIuTsn29wGVXLHnmEVeBCLmRzrpqU5jf0XDKidjuzxnnNdR2utz9g4nwkwrg4OGO2h0CzH66pBXXfWlzCFpdZZvn+2TolgI46eTh6irTwEEBIqsPPNqOnNV0Ub29dXAoGXm2x82B2GDuAHXcQXZbd9RicWJ++xlTRp5zpAI4yNXqGaXp0s3X2WnYHcaUoykJCHcjeF2QpaaOpS4AYVOW2PN/ozKWkgDecabZviFbAhiLMVXwlAT8OzW9MZvvSIzFmLYJMBGVOlMBVI1RxVSqAN0R5TGpSlAWp4qpJIDAsi5AFVNJAO3/ZF2AKqZUwOkjrxZROdfJSm63nzEZW9avVMBccD6tu0+rpvOahlV88LWMSCK/CrZ0A0towU2QwpKftgp/pjeUDyrd/fwWG2nDw511dQDmh7QV+XTEKDuHsAFOW8VJK0BLfaUK8EatDlqTq8SxOYZ8CJ9t7OMYjrUiddengC2tAHWW8ItjBISemj5A7aN1JXq3bK8fG/oMyuuhbwon/vEZe0GY79NWSNL+6Xm2JoKT7CwVQAuKC7SoofJHNyI+JUA79FBh/iepfrxeENpJrwvHfVP+dxDMd0lIYTQC/RJ4Kc4WYyAe1o2+AeTdmJ8cokX+s6FIhNu02OhYped+/HzLiZvW2Wpe/re5Y8y+R4umNhqyeWEcPJOXV/Tyc83Hp616kQrgZJp4ONJV/wKgUeDILzhFn0inrDpN1zf2Wf0a/+3gi7SdfsN1oO8UzZUVs9mWrmb4HxEUs87RZuf9AAAAAElFTkSuQmCC"
									alt=""></div>
						</div>
					</div>
				</div>
				<!-- 帖子 -->
				<div class="collection-list" style="padding-bottom: 80px;" v-if="tabIndex == 1">
					<div class="collection-item"  v-for="(item,index) in dataBase.data" :key="index">
						<div class="head">
							<div class="user">
								<div class="avatar">
									<div class="lazyload-wrapper "><img class="img"
											:src="item.avatar"
											width="20" height="20"></div>
								</div><span class="name">{{item.user_nickname}}</span>
							</div>
							<div class="operation"  @click="cancel(2,item.circle_id)">
								<!-- <span class="like active">
									<i class="like-active-icon"></i>{{item.likes}}
								</span>
								<span class="comment"><i class="comment-icon"></i>{{item.comment}}
								</span> -->
								<span class="favorites active"><i class="favorites-active-icon"></i></span></div>
						</div>
						<router-link class="content" tag="a" target="_blank" :to="'/circle-detail?id='+item.id">
							<div class="text-container">{{item.title}}</div>
							<!-- <div class="images-container"></div> -->
						</router-link>
					</div>
				</div>
				<!-- <div class="collection-list" style="padding-bottom: 80px;"></div> -->
				<div class="common-empty-view" v-if="dataBase.data.length == 0">
					<img class="no-data-img  " src="../../assets/images/qsy.png"
						alt="no-data" style="margin-top: 0;">
					<p class="no-data-text">暂无数据</p>
				</div>
			</div>
			<el-pagination background class="ant-pagination" @current-change="sizeChange" layout="prev, pager, next"
				:total="dataBase.total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import { logList,favorites1 } from '@/api/headline.js'
	import { favoritesList,favorites } from '@/api/circleuser.js'
	export default {
		data() {
			return {
				page:1,
				tabIndex: 0,
				dataBase:{
					data:[]
				},
				tabList: ['头条']
			}
		},
		mounted() {
			this.logList()
		},
		watch:{
			tabIndex(e){
				if(e == 0){
					this.logList()
				}else{
					this.favoritesList()
				}
				
			}
		},
		methods:{
			// 取消收藏 1 帖子；2头条
			cancel(type,id){
				
				if(type == 2){
					favorites({id:id}).then(res=>{
						this.favoritesList()
						this.$message.success('操作成功')
					}).catch(res=>{
						this.$message.success(res.msg)
					})
				}else {
					favorites1({id:id}).then(res=>{
						
						this.logList()
						this.$message.success('操作成功')
					}).catch(res=>{})
				}
				
			},
			
			
			// 头条
			logList(){
				let data = {
					page:this.page,
					type:1
				}
				logList(data).then(res=>{
					this.dataBase = res.data
				}).catch(res=>{
					
				})
			},
			// 列表分页
			sizeChange(e) {
				this.page = e
				if(this.tabIndex == 0){
					this.logList()
				}else{
					this.favoritesList()
				}
			},
			// 帖子
			favoritesList(){
				let data = {
					page:this.page,
					type:1
				}
				favoritesList(data).then(res=>{
					this.dataBase = res.data
				}).catch(res=>{
					
				})
			}
		}
	}
</script>

<style>
</style>
