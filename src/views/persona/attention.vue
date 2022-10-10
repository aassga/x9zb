<!-- 关注 / 粉丝 -->
<template>
	<ul class="attention">
		<div class="page-list">
			<!-- v-for="(item,index) in zhuList.data" :key="index" -->
			<li v-for="(item,index) in zhuList.data" :key="index">
				<router-link tag="a" class="attention-img" target="_blank" :to="'/persona?id='+item.uid">
					<div class="lazyload-wrapper "><img class="attention-imgBox" :src="item.avatar">
					</div>
				</router-link>
				<div class="attention-content">
					<router-link tag="a" class="attention-content-title" target="_blank" :to="'/persona?id='+item.uid">
						<!-- <a class="" target="_blank" href="/personal-space?id=3392112"> -->
						{{item.user_nickname}}
					</router-link>
					<div class="attention-content-detail">
						<div style="width: 85px;">帖子 {{item.post_num}}</div>&nbsp;&nbsp;<div>粉丝 {{item.attention}}</div>
					</div>
				</div>
				<div class="attention-true">{{item.is_attention == 1?'已关注':'关注'}}</div>
			</li>
			
		</div>
		<el-empty v-if="zhuList.total == 0" :image-size="300" :image="require('../../assets/images/qsy.png')"></el-empty>
	</ul>
	
</template>

<script>
	import {
		watchlistList
	} from '../../api/user.js'	
	export default {
		props:['titleIndex','info'],
		data() {
			return {
				page1:1,
				zhuList:{},
			}
		},
		watch:{
			titleIndex:{
				handler(newName, oldName) {
					let  _this = this
					this.page1 = 1
				 	this.zhuList = {}
				 	if(newName == 1){
				 		_this.watchlistList(1)
				 	}else if(newName == 2){
				 		_this.watchlistList(0)
				 	}
				 	
				},
				// 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
				immediate: true
			}
			
				
				
			// },
		},
		methods:{
			// 用户关注列表
			watchlistList(type){
				let data = {
					page1:this.page1,
					uid:this.info.id,
					type:type
				}
				watchlistList(data).then(res=>{
					this.zhuList = res.data
				}).catch(res=>{
					
				})
			},
		}
	}
</script>

<style>
</style>
