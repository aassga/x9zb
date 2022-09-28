<template>
	<div class="personal-space-content-left">
		<div>
			<div class="news">
				<ul class="news-ul">
					<li class="tab-item cur">文章<img class="cur-bottom"
							src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAASCAYAAACq26WdAAAAAXNSR0IArs4c6QAAAldJREFUOBGVVL1rFFEQf7ObRFhQCFax0EqLTesWNvYRBBsLweK2MTb+BTbX+BeIh6nuCkEwjXBgei0sLm22UEQCYSUaE5ONy739Gmf27Tvz9nK53Qd38z5m5jczv5kVouXCcNuJvn16x7KlqVhoaxBFf3qI4mGUJX/J1m9jD22Uj3a2OgKLPlZGAJa/vLo2aOqjMVi0895NMhgRmCOgMkMRLy0K7/Lqg6AJoNVECcOhI2WyWaRjp8hTUaRS/XLpyHGyye9N/DQC+7V33MtT6SIDZVKwVPuEzolL76+agM0t48/P/U5eFP25zizLX7njDy7SuxDsx8fXLjXDCJmncrE6t4cyY+qoMxWFADGg8FbuPp3J30ywcHvDwRM5QoGuAmLHSI6hlPrOkGAF9pVL3rXb67FxXx1mzll2eELzREA6GTLgTAqdSelAP6qYOTA8TJg/v/JvCKVlXAnxfesFzRP2TVf/C8iFPG9pfRvAv772fFDXmQLb/dB1ixy5fE69bEBp0j39KzO9Z6mWgqNhj20bvBv3ugZ/Blg47DpxNqaGUDwpU90O5M7oiHrctTNA4NjE3/3uhD+Ds1N53BMI1BAqUs6B90rSbk6D1GJxTxNp8DfJ7MvbZ51cFMSTKhXHOZVZLfgmR0tY/q1HLwesW4J9fbPupogjit347HB+GrBUpsNkrviirsB3Z5Z6hngRwLv5eCOAcPjEOfqdlPNUL5POUjfEGT9qqyMpQ6arOnj1TrMZLF9d8hYO9iPiqRrcKnKVL9sqbc3ZFJhOk+V5qwIjN+7Bvuz9A0PLHjHosxgCAAAAAElFTkSuQmCC"
							alt=""></li>
					<!-- <li class="tab-item">文章</li>
					<li class="tab-item">主播</li>
					<li class="tab-item">视频</li>
					<li class="tab-item">小视频</li> -->
				</ul>
				<div class="page-list">
					<div>
						<router-link tag="a" target="_blank" class="news-content" :to="'/detail?id=' + item.id"  v-for="(item,index) in dataBase.data" :key="index">
						<!-- <a class="news-content" v-for="(item,index) in dataBase.data" :key="index" target="_blank" href="/news/detail?id=11a0c2a9be90455d9e63cd282198ca8b&amp;type=0"> -->
							<div class="news-content-img">
								<div class="lazyload-wrapper "><img class="news-content-img-box"
										:src="item.img">
								</div>
							</div>
							<div class="news-content-text">
								<div class="news-content-text-title">{{item.title}}</div>
								<div class="news-content-text-detail"> </div>
								<ul class="news-content-text-ul">
									<li class="time">{{item.addtime}}</li>
									<li></li>
									<li style="margin-right: 5px;">{{item.comment_count}}</li>
									<div class="tags-container"><object>
											<div class="content-keyword">{{item.classification_name}}</div>
										</object></div>
								</ul>
							</div>
						</router-link>
						
						<div class="space-load-more" v-if="dataBase.total !== 0" @click="getmore()">{{dataBase.total > dataBase.data.length?'点击加载更多':'没有更多了'}}</div>
						<el-empty v-if="dataBase.total == 0" :image-size="300" :image="require('../../assets/images/qsy.png')"></el-empty>
						
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {userPostList} from '@/api/headline.js'
	export default {
		data() {
			return {
				page:1,
				dataBase:{
					data:[]
				}
			}
		},
		mounted() {
			this.userPostList()
		},
		methods:{
			getmore(){
				if(this.dataBase.total <= this.dataBase.data.length) return
				this.page++
				this.userPostList()
			},
			
			// 获取资讯列表
			userPostList(){
				let id = null
				if(JSON.stringify(this.$route.query) == '{}') {
					
				}else {
					id = this.$route.query.id
				}
				userPostList({uid:id,page:this.page}).then(res=>{
					if(this.page == 1){
						this.dataBase = res.data
					}else {
						this.dataBase.data = [...this.dataBase.data,...res.data.data] 
					}
					
					
				}).catch(res=>{})
			}
		},
		
	}
</script>

<style>
</style>
