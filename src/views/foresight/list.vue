<!-- 前瞻列表 -->
<template>
	<div id="">
		<div class="title flex-end">
			<!-- <p @click="activeNames = 3688865">234</p> -->
			<!-- <el-select style="width: 130px;" :popper-append-to-body="false" v-model="value" placeholder="请选择">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select> -->
		</div>
		<div class="foresight-list">
			<el-collapse @change="handleChange" v-model="activeNames" accordion>
				<el-collapse-item v-for="(item,index) in list.data" :name="JSON.stringify(item)" :key="index">
					<template slot="title" style="height: 88px;">
						<div class="f-t flex">
							<div class="f-t-name flex-start">
								<img :src="item.competition_logo || require('../../assets/images/team.png')">
								<span>{{item.competition_name}}</span>
							</div>
							<span class="f-t-time">{{item.match_time_str}}</span>
							<div class="f-t-team flex-center">
								<div class="flex-end">
									<p class="text-clamp" style="text-align: right;">{{item.home_team_name}}</p>
									<img :src="item.home_logo || require('../../assets/images/team.png')">
								</div>
								<span>VS</span>
								<div class="flex-start">
									<img :src="item.away_logo || require('../../assets/images/team.png')">
									<p class="text-clamp">{{item.away_team_name}}</p>
								</div>
							</div>
							<div class="f-t-btn" @click.stop="">
								<!-- style="border-right: 1px solid #999;" -->
								<span >
									<a :href="'/score-detail?type=football&tabIndex=4&id='+item.sourceid" target="_blank">分析</a>
									
								</span>
								<!-- <span>详情</span> -->
							</div>
						</div>
					</template>
					<!-- 内容 -->
					<div class="t-c flex">
						<div class="t-c-left">
							<div class="t-c-left-title">
								{{propArr.home_team_name}}VS{{propArr.away_team_name}}
							</div>
							<div class="t-c-left-nav">
								<div class="t-c-left-nav-li">
									<p>历史交锋胜率</p>
									<div class="t-c-left-nav-li-p flex-center">
										<span>{{base.home_vs_won_rate}}</span>
										<div class="t-c-left-nav-li-p-j flex">
											<span class="left" :style="{width:getCount(base.home_vs_won_rate,base.away_vs_won_rate,1)}"></span>
											<span class="right" :style="{width:getCount(base.away_vs_won_rate,base.home_vs_won_rate,1)}"></span>
										</div>
										<span>{{base.away_vs_won_rate}}</span>
									</div>
								</div>
								<div class="t-c-left-nav-li">
									<p>近期对战胜率</p>
									<div class="t-c-left-nav-li-p flex-center">
										<span>{{base.home_recent_won_rate}}</span>
										<div class="t-c-left-nav-li-p-j flex">
											<span class="left" :style="{width:getCount(base.home_recent_won_rate,base.away_recent_won_rate,1)}"></span>
											<span class="right" :style="{width:getCount(base.away_recent_won_rate,base.home_recent_won_rate,1)}"></span>
										</div>
										<span>{{base.away_recent_won_rate}}</span>
									</div>
								</div>
								<div class="t-c-left-nav-li">
									<p>本赛季胜率</p>
									<div class="t-c-left-nav-li-p flex-center">
										<span>{{base.home_season_won_rate}}</span>
										<div class="t-c-left-nav-li-p-j flex">
											<span class="left" :style="{width:getCount(base.home_season_won_rate,base.away_season_won_rate,1)}"></span>
											<span class="right" :style="{width:getCount(base.away_season_won_rate,base.home_season_won_rate,1)}"></span>
										</div>
										<span>{{base.away_season_won_rate}}</span>
									</div>
								</div>
								<div class="t-c-left-nav-li">
									<p>进球数</p>
									<div class="t-c-left-nav-li-p flex-center">
										<span>{{base.home_recent_goal}}</span>
										<div class="t-c-left-nav-li-p-j flex">
											<span class="left" :style="{width:getCount(base.home_recent_goal,base.away_recent_goal,2)}"></span>
											<span class="right" :style="{width:getCount(base.away_recent_goal,base.home_recent_goal,2)}"></span>
										</div>
										<span>{{base.away_recent_goal}}</span>
									</div>
								</div>
								<div class="t-c-left-nav-li">
									<p>失球数</p>
									<div class="t-c-left-nav-li-p flex-center">
										<span>{{base.home_recent_last}}</span>
										<div class="t-c-left-nav-li-p-j flex">
											<span class="left" :style="{width:getCount(base.home_recent_last,base.away_recent_last,2)}"></span>
											<span class="right" :style="{width:getCount(base.away_recent_last,base.home_recent_last,2)}"></span>
										</div>
										<span>{{base.away_recent_last}}</span>
									</div>
								</div>
							</div>
							<div class="t-c-left-tips">
								最近6场比赛战绩
							</div>
							<div class="t-c-left-arr flex">
								<div class="t-c-left-arr-left">
									<span v-for="(item,index) in base.home_recent_arr" :style="{color:item == '胜'?'#FF3A31':item == '负'?'#56B414':'#6697E6'}">{{item}}</span>
								</div>
								<div class="t-c-left-arr-left">
									<span v-for="(item,index) in base.away_recent_arr" :style="{color:item == '胜'?'#FF3A31':item == '负'?'#56B414':'#6697E6'}">{{item}}</span>
								</div>
							</div>
						</div>
						<div class="t-c-right">
							<div class="t-c-right-title flex">
								<span v-for="(item,index) in titleNav" :key="index"
									:class="{'actvie':titleIndex == index}" @click="titleIndex = index">{{item}}</span>
							</div>
							<!-- 内容1 -->
							<div class="t-c-right-nav" style="position: relative;" v-if="titleIndex == 0">
								<div class="flex">
									<div class="t-c-right-nav-li">
										<p>{{propArr.home_team_name}}</p>
										<div class="flex-start t-c-right-nav-li-t ">
											<img src="../../assets/images/foresight-down.png">
											<span>有利消息</span>
										</div>
										<div class="t-c-right-nav-li-c" v-for="(item,index) in match.good.home">
											{{item}}
										</div>

										<div class="flex-start t-c-right-nav-li-t">
											<img src="../../assets/images/foresight-up.png">
											<span style="color: #4280DC;">不利消息</span>
										</div>
										<div class="t-c-right-nav-li-c" v-for="(item,index) in match.bad.home">
											{{item}}
										</div>
									</div>
									<div class="t-c-right-nav-li">
										<p>{{propArr.away_team_name}}</p>
										<div class="flex-start t-c-right-nav-li-t ">
											<img src="../../assets/images/foresight-down.png">
											<span>有利消息</span>
										</div>
										<div class="t-c-right-nav-li-c" v-for="(item,index) in match.good.away">
											{{item}}
										</div>

										<div class="flex-start t-c-right-nav-li-t">
											<img src="../../assets/images/foresight-up.png">
											<span style="color: #4280DC;">不利消息</span>
										</div>
										<div class="t-c-right-nav-li-c" v-for="(item,index) in match.bad.away">
											{{item}}
										</div>
									</div>
								</div>
								<!-- <div class="t-c-right-nav-li-btn">
									查看详情
								</div> -->
							</div>
							<!-- 内容2-3-4 -->
							<div class="t-c-right-nav" style="padding: 20px;" v-else>
								<div  class="flex t-c-right-nav-table">
									<span style="width: 104px;text-align: center;">公司</span>
									<div  class="flex li">
										<p>{{title[titleIndex-1].a}}</p>
										<span>即时</span>
										<p>{{title[titleIndex-1].b}}</p>
									</div>
									<div  class="flex li">
										<p>{{title[titleIndex-1].a}}</p>
										<span>初始</span>
										<p>{{title[titleIndex-1].b}}</p>
									</div>
								</div>
								<el-table 
								:data="match.list"
								 border 
								 :stripe="true"
								 :show-header="false"
								 :row-class-name="tableRowClassName"
								 :span-method="arraySpanMethod" 
								 style="width: 100%">
									<el-table-column prop="company_name" label="公司" align="center">
									</el-table-column>
									<el-table-column>
										<!-- <template >
										     <span>{{scope.row}}</span>
										</template> -->
										<div class="flex li" style="padding: 0 19px;" slot-scope="scope">
											<span>{{scope.row.scilicet_host}}</span>
											<span>{{scope.row.scilicet_early}}</span>
											<span>{{scope.row.scilicet_guest}}</span>
										</div>
									</el-table-column>
									<el-table-column prop="name" label="姓名">
									</el-table-column>
									<el-table-column prop="name" label="姓名">
										
									</el-table-column>
									<el-table-column prop="name" label="姓名">
										<div class="flex li" style="padding: 0 19px;" slot-scope="scope">
											<span>{{scope.row.early_host}}</span>
											<span>{{scope.row.early_early}}</span>
											<span>{{scope.row.early_guest}}</span>
										</div>
									</el-table-column>
									<el-table-column prop="address" label="地址">
									</el-table-column>
									<el-table-column prop="address" label="地址">
									</el-table-column>
								</el-table>
							</div>
						</div>
					</div>
				</el-collapse-item>

			</el-collapse>
		</div>
		<div class="flex-center" style="background-color: white;padding-top: 40px;">
			<el-pagination background @current-change="sizeChange" layout="prev, pager, next"
				:total="list.total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	
	import { footballOddsList } from '@/api/football.js'
	import { getList,match_foresight,match_analyze_data } from '@/api/foresight.js'
	export default {
		data() {
			return {
				page:1,
				options: [{
					value: '选项5',
					label: '测试'
				}],
				value: '',
				titleIndex: 0,
				activeNames: '',
				titleNav: ['优劣势分析', '胜负', '让球', '进球数'],
				tableData: [{
					date: '05-02',
					name: '王小虎',
					address: ' 1518 弄'
				}, {
					date: '05-04',
					name: '王小虎',
					address: ' 1517 弄'
				}, {
					date: '05-01',
					name: '王小虎',
					address: ' 1519 弄'
				}, {
					date: '05-03',
					name: '王小虎',
					address: ' 1516 弄'
				}],
				list:{
					data:[]
					
				},
				propArr:{},//选中的参数
				title:[
					{
						a:'主胜',
						b:'客胜',
					},
					{
						a:'主胜',
						b:'客胜',
					},
					{
						a:'大球',
						b:'小球',
					}
				],
				match:{
					asia:[],
					bs:[],
					eu:[],
					bad:{},
					good:{},
					list:[],
					
				},//优劣势分析
				base:{}//获取比赛数据
			}
		},
		mounted() {
			this.getList()
		},
		watch:{
			titleIndex(e){
				let match = this.match
				if(e == 1){
					this.match.list = match.eu
				}else if(e == 2){
					this.match.list = match.bs
				}else if(e == 3){
					this.match.list = match.asia
				}
			}
		},
		methods: {
			// 获取前瞻列表
			getList(){
				getList({page:this.page}).then(res=>{
					this.list = res.data
					this.activeNames = JSON.stringify(res.data.data[0])
					this.handleChange(this.activeNames)
				})
			},
			
			// 分页
			sizeChange(e){
				this.page = e
				this.getList()
			},
			// 触发获取优劣势
			handleChange(val) {
				if(!val) return //关闭
				let prop = JSON.parse(val)
				// if(this.propArr.sourceid == prop.sourceid) return //去重
				this.titleIndex = 0
				this.propArr = prop
				match_foresight({id:prop.sourceid}).then(res=>{//获取优劣势
					this.match = {...this.match,...res.data}
				})
				footballOddsList({id:prop.sourceid}).then(res=>{//获取指数
					this.match = {...this.match,...res.data}
				})
				match_analyze_data({id:prop.sourceid}).then(res=>{//获取前瞻比赛数据
					this.base = res.data
				})
			},
			tableRowClassName({
				row,
				rowIndex
			}) { //添加类名
				// if (rowIndex % 2 == 0) {
				// 	return 'warning-row';
				// } else  {
				// 	return 'success-row';
				// }
				return '';
			},
			// 计算（
			getCount(n1,n2,type){
				if(type == 1){//计算百分比
					let n11 = parseFloat(n1)
					let n22 = parseFloat(n2)
					if(n11 !== NaN || n22 !== NaN) {
						return ((n11 / (n11 + n22)) * 100) + '%'
					}
				}else {
					
					return ((n1 / (n2 + n1)) * 100) + '%'
				}
			},
			
			arraySpanMethod({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				if (columnIndex === 1) {
					return [1, 3];
				} else if (columnIndex === 4) {
					return [1, 6];
				}
				if (columnIndex === 6 || columnIndex === 2 || columnIndex === 3 || columnIndex === 5) {
					return [0, 0];
				}
			},
		},
	}
</script>

<style lang="scss">
	.el-collapse-item__header {
		height: 88px;
		margin: 0 20px;
	}

	.el-collapse-item__content {
		color: #B9B9C0;
		padding-bottom: 0;
		background-color: #14162C;
	}

	.foresight-list {
		background-color: white;
		border-radius: 0 0 10px 10px;

		.f-t {
			width: 100%;
			// padding: 0 20px;
			font-size: 14px;
		}

		.f-t-name {
			width: 150px;
			height: 88px;

			img {
				width: 22px;
				height: 22px;
				margin-right: 10px;
			}
		}

		.f-t-time {
			color: #999;
			width: 100px;
		}

		.f-t-team {
			width: 500px;
			color: #333;
			font-size: 16px;
			div{
				flex: 1;
			}
			span {
				padding: 0 36px;
				font-weight: bolder;
			}
			p {
				width: 130px;
			}
			img {
				width: 40px;
				height: 40px;
				margin: 0 10px;
			}
		}

		.f-t-btn {
			color: #666;

			span {
				padding: 0 8px;
			}
		}
	}

	.t-c {
		font-weight: bold;

		.t-c-left {
			width: 467px;
			min-height: 478px;
			padding-bottom: 25px;
			align-self: flex-start;
			border-right: 2px solid #333851;

			.t-c-left-title,
			.t-c-left-tips {
				height: 52px;
				font-size: 16px;
				line-height: 52px;
				text-align: center;
			}
			.t-c-left-nav-li {
				padding: 0 16px;
				p {
					font-size: 12px;
					text-align: center;
				}
				.t-c-left-nav-li-p > span {
					width: 40px;
					font-size: 16px;
					text-align: center;
				}
				.t-c-left-nav-li-p-j {
					height: 9px;
					width: 316px;
					margin:  0 10px;
					overflow: hidden;
					border-radius: 8px;
					position: relative;
					background-color: white;
				}
				// .t-c-left-nav-li-p-j > span {
				// 	flex: 1;
				// }
				.left {
					position: absolute;
					left: 0;
					top: 0;
					height: 100%;
					width: 100px;
					border-radius: 8px;
					background-color: #FF5338;
				}
				.right {
					width: 100px;
					position: absolute;
					right: 0;
					top: 0;
					height: 100%;
					border-radius: 8px;
					background-color: #6697E6;
				}
			}

			.t-c-left-arr {
				padding: 0 16px;
				font-size: 12px;

				span {
					margin-right: 16px;
				}
			}
		}

		.t-c-right {
			flex: 1;
			align-self: flex-start;

			.t-c-right-nav-li {
				flex: 1;
				padding: 0 16px;
				align-self: flex-start;
				img {
					width: 18px;
					height: 19px;
					margin-right: 4px;
				}

				p {
					font-size: 16px;
					text-align: center;
					padding: 29px 0 15px 0;
				}
			}

			.t-c-right-nav-li-t {
				color: #FF5338;
				font-size: 14px;
				margin-bottom: 9px;
			}

			.t-c-right-title {
				height: 52px;
				font-size: 16px;
				line-height: 52px;
				padding: 0 125px;
				background-color: #333851;

				span {
					cursor: pointer;
				}

				.actvie {
					color: #fff;
					font-weight: bolder;
				}
			}

			.t-c-right-nav-li-c {
				margin-bottom: 18px;
			}

			.t-c-right-nav-li-btn {
				position: absolute;
				bottom: -135px;
				left: 0;
				right: 0;
				width: 100%;
				color: #fff;
				font-size: 14px;
				text-align: center;
			}
			.t-c-right-nav {
				
				.t-c-right-nav-table {
					padding: 13px 0 ;
					background-color: #262A43;
					.li {
						padding: 0 29px;
						flex: 1;
						span {
							color: #fff;
						}
					}
				}
			}
		}

	}

	.el-table .warning-row {
		background: #32364E !important;
	}

	.el-table .success-row {
		background: #262A43 !important;
	}
	.el-table {
		border-radius: 0;
		background: #262A43;
	}
	.el-table--border:after,
	.el-table--group:after,
	.el-table:before {
	    background-color: #C0C4CC;
	}
	.el-table--border,
	.el-table--group {
	    border-color: #C0C4CC;
	}
	.el-table td,
	.el-table th.is-leaf {
	    border-bottom: 1px solid #C0C4CC;
	}
	
	.el-table--border th,
	.el-table--border th.gutter:last-of-type {
	    border-bottom: 1px solid #C0C4CC;
	}
	
	.el-table--border td,
	.el-table--border th {
	    border-right: 1px solid #C0C4CC;
	}
</style>
