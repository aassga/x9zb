<template>
	<div id="" style="padding: 100px;">



		<!-- <span class="list_count" style="height:400px;" @click="getImte()">
			点击触发
		</span> -->
	</div>
</template>

<script>
	import {
		football_match
	} from "@/api/football.js";
	import {
		getRobot
	} from "@/api/user.js";
	import SVGA from 'svgaplayerweb';
	import SearchHighlight from 'vue-search-highlight'

	export default {
		components: {
			SearchHighlight
		},
		data() {
			return {
				length: null,
				index: 0,
				ishow: false,
				current: 0, //当前操作按钮
				tableData: [
					[],
					[]
				]
			}

		},
		computed: {
			system() {
				return this.$store.state.system
			}
		},
		mounted() {
			//页面添加滚动事件
			// this.content = JSON.stringify(this.$refs.abc)
			// console.log(JSON.stringify(this.$refs.abc));
			// this.football_match()
			// this.sysTem = JSON.parse(localStorage.getItem('userInfo'))
			setTimeout(res => {
				this.getImte()
			}, 1500)
		},
		methods: {
			/* 获取机器人列表 */
			getImte() {
				this.logout()
				getRobot().then(res => {
					if (res.data.length == 0) return this.$message.warning('列表为空，请检查')
					this.length = res.data.length
					res.data.forEach((item, index) => {
						/* 延迟进行 */
						setTimeout(res => {
							this.getLogin(item.uid, item.userSign)
							this.index++
						}, index * 1500)
					})

				}).catch(res => {})
			},

			/* 触发登录TIM */
			getLogin(id, userSig) {
				let obj = {
					userID: id.toString(),
					userSig: userSig
				}
				let that = this
				let promise = this.tim.login(obj)
				promise.then(function(imResponse) {
						console.log('------------------------------------1');
						that.joinGroup()
					})
					.catch(function(imError) {

					});
			},
			// 进入房间
			joinGroup() {
				let that = this
				console.log(this.system.tencent_im_room_number);
				let promise = this.tim.joinGroup({
					groupID: this.system.tencent_im_room_number,
					type: this.TIM.TYPES.GRP_AVCHATROOM
				});
				promise.then(function(imResponse) {
					console.log('------------------------------------2');
					that.logout()

				}).catch(function(imError) {
					//console.warn('joinGroup error:', imError); // 申请加群失败的相关信息
				});
			},
			/* 退出登录 */
			logout() {
				let that = this
				let promise = this.tim.logout();
				promise.then(function(imResponse) {
					console.log('------------------------------------3');
					if (that.index == that.length) {
						that.$message.success('创建成功')
					}

				}).catch(function(imError) {

				});
			},


			//显示操作项
			showDialog(index, item) {
				this.ishow = true;
				this.current = index;
			},
			//隐藏蒙层
			hideDialog(index, item) {
				this.ishow = false;
				this.current = null;
			},
			football_match() {
				football_match({
					company_id: 2,
					is_web: 1,
					type: 0
				}).then(res => {
					this.tableData = res.data.data
					console.log(this.tableData);
				}).catch(res => {

				})
			}

		},
	}
</script>

<style lang='scss' scoped>
	.list_count {
		margin-top: 200px;
		padding: 10px 30px;
		border-radius: 4px;
		overflow: hidden;
		background-image: linear-gradient(114deg, #eecfb5 -2%, #d8ad66);
	}
</style>
