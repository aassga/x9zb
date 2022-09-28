<!-- 底部-直播 -->
<template>
	<view class="live">
		<downloadHead v-if="show"></downloadHead>
		<view class="navBar" :style="{top:show?'100rpx':'0'}">
			<u-tabs :list="tabList"  font-size="32" active-color="#E3AC72" :is-scroll="false" :current="current" @change="change"></u-tabs>
		</view>
		<list1 v-show="current==0" ref="list0" :style="{marginTop:show?'100rpx':'20rpx'}"></list1>
		<list2 :list="list" v-show="current==1" ref="list1" :style="{marginTop:show?'100rpx':'20rpx'}"></list2>
		<list3 v-show="current==2 || current==3 || current==4" ref="list2" :style="{paddingTop:show?'6vh':'0'}"></list3>
	</view>
</template>

<script>
	import list1 from './compontent/list-1.vue'
	import list2 from './compontent/list-2.vue'
	import list3 from './compontent/list-3.vue'
	export default {
		components:{list1,list2,list3},
		data() {
			return {
				tabList :[{
					name: '分类'
				}, {
					name: '推荐'
				}, {
					name: '足球'
				},
				{
					name: '篮球'
				},
				{
					name: '其他'
				}],
				list:[],
				current: 1
			}
		},
		computed:{
			show:{
				get() {
					return this.$store.state.show
				},
				set() {
					// this.$store.state.info.midMask = !this.$store.state.info.midMask
				}
			}
		},
		onReachBottom() {
			if(this.current == 0){
				this.$refs['list'+this.current].getList(this.current)
			}
			
			return
			if(this.current <= 1){
				this.$refs['list'+this.current].getList(this.current)
			}else {
				this.$refs['list2'].getList(this.current)
			}
		},
		mounted() {
			this.$nextTick(function(){
				this.$refs['list'+this.current].getList(this.current)
			})
			this.getBanner()
			let query = this.$route.query
			for(const i in query) {
				if(i === 'channel_code'){
					localStorage.setItem('channel',query[i])
				}
			}
		},
		methods:{
			getBanner(){
				this.$u.get('/api/banner/getBannerList',{banner_type:1,type:1}).then(res=>{
					res.forEach(item=>{
						item.image = item.img
					})
					console.log(res);
					this.list = res
				}).catch(res=>{})
			},
			
			change(e){
				this.current = e
				if(e <= 1){
					this.$refs['list'+e].getList(e)
				}else {
					this.$refs['list2'].getList(e)
				}
				
			}
		}
	}
</script>

<style>
	.navBar {
		position: fixed;
		top: 100rpx;
		left: 0;
		right: 0;
		z-index: 10;
	}
	.live {
		padding-top: 90rpx;
	}
</style>
