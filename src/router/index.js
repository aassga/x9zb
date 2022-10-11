import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Layout from '@/layout'
import Nested from './modules/nested';

const routes = [
	// 首页
	// {
	//   path: '/',
	//   component: () => import('@/views/main/index'),
	//   hidden: true
	// },
	{
		path: '/',
		component: Layout,
		redirect: '/main',
		children: [{
				path: 'main',
				name: 'main',
				component: () => import('@/views/main/index'),
				meta: {
					index:0,
					title: '首页',
					icon: 'el-icon-s-home'
				}
			},
			{
				path: '/login',
				name: 'login',
				component: () => import('@/views/login/index'),
				// meta: { title: '首页', icon: 'el-icon-s-home' }
			},
			{
				path: '/dome',
				name: 'dome',
				component: () => import('@/views/dome'),
				// meta: { title: '首页', icon: 'el-icon-s-home' }
			},
			{
				path: '/basketball',
				name: 'basketball',
				component: () => import('@/views/score/basketball'),
				meta: { title: '篮球', icon: 'el-icon-s-home',index:1 }
			},
			{
				path: '/football',
				name: 'football',
				component: () => import('@/views/score/football'),
				meta: { title: '足球', icon: 'el-icon-s-home',index:1 }
			},
			{
				path: '/anchor',
				name: 'anchor',
				component: () => import('@/views/anchor/index'),
				meta: { title: '直播', icon: 'el-icon-s-home',index:2 }
			},
			{
				path: '/schedule',
				name: 'schedule',
				component: () => import('@/views/anchor/schedule'),
				meta: { title: '赛程', icon: 'el-icon-s-home',index:3 }
			},
			{
				path: '/rank',
				name: 'rank',
				component: () => import('@/views/anchor/anchor-rank'),
				meta: { title: '榜单', icon: 'el-icon-s-home',index:2 }
			},
			{
				path: '/attention',
				name: 'attention',
				component: () => import('@/views/anchor/attention'),
				meta: { title: '关注', icon: 'el-icon-s-home',index:2 }
			},
			{
				path: '/reserve',
				name: 'reserve',
				component: () => import('@/views/anchor/reserve'),
				meta: { title: '预约', icon: 'el-icon-s-home',index:2 }
			},
			{
				path: '/foresight',
				name: 'foresight',
				component: () => import('@/views/foresight/index'),
				meta: { title: '情报中心', icon: 'el-icon-s-home',index:9 }
			},
			{
				path: '/news',
				name: 'news',
				component: () => import('@/views/news/news'),
				meta: { title: '头条', icon: 'el-icon-s-home',index:4 }
			},
			{
				path: '/base-football',
				name: 'base-football',
				component: () => import('@/views/database/football'),
				meta: { title: '足球资料库', icon: 'el-icon-s-home',index:6 }
			},
			{
				path: '/base-basketball',
				name: 'base-basketball',
				component: () => import('@/views/database/basketball'),
				meta: { title: '篮球资料库', icon: 'el-icon-s-home',index:6 }
			},
			{
				path: '/circle',
				name: 'circle',
				component: () => import('@/views/circle/circle'),
				meta: { title: '社区', icon: 'el-icon-s-home',index:5 }
			},
			{
				path: '/circle-detail',
				name: 'circle-detail',
				component: () => import('@/views/circle/detail'),
				meta: { title: '帖子详情', icon: 'el-icon-s-home',index:null }
			},
			{
				path: '/downLoad',
				name: 'downLoad',
				component: () => import('@/views/downLoad/downLoad'),
				meta: { title: '下载', icon: 'el-icon-s-home',index:null }
			},
			{
				path: '/dailyMission',
				name: 'dailyMission',
				component: () => import('@/views/dailyMission/dailyMission'),
				meta: { title: '每日任务', icon: 'el-icon-s-home',index:7 }
			},
			{
				path: '/live',
				name: 'live',
				component: () => import('@/views/anchor/live'),
				meta: { title: '直播间', icon: 'el-icon-s-home',index:2 }
			},
			{
				path: '/score-live',
				name: 'score-live',
				component: () => import('@/views/score/live'),
				meta: { title: '直播间', icon: 'el-icon-s-home',index:1 }
			},
			{
				path: '/score-detail',
				name: '/score-detail',
				component: () => import('@/views/score/detail'),
				meta: { title: '比分', icon: 'el-icon-s-home',index:1 }
			},
			
			{
				path: '/search',
				name: 'search',
				component: () => import('@/views/search/search'),
				meta: { title: '搜索', icon: 'el-icon-s-home',index:null }
			},
			{
				path: '/member',
				name: 'member',
				component: () => import('@/views/member/index'),
				meta: { title: '个人资料', icon: 'el-icon-s-home',index:null }
			},
			{
				path: '/detail',
				name: 'detail',
				component: () => import('@/views/news/detail'),
				meta: { title: '详情', icon: 'el-icon-s-home',index:null }
			},
			{
				path: '/persona',
				name: 'persona',
				component: () => import('@/views/persona/index'),
				meta: { title: '个人空间', icon: 'el-icon-s-home',index:null }
			},
			{
				path: '/comment',
				name: 'comment',
				component: () => import('@/views/comment/index'),
				meta: { title: '评论', icon: 'el-icon-s-home',index:null }
			},
			{
				path: '/about-user',
				name: 'about-user',
				component: () => import('@/views/about/about-user'),
				meta: { title: '关于我们', icon: 'el-icon-s-home',index:null }
			},
			{
				path: '/demo',
				name: 'demo',
				component: () => import('@/views/demo'),
				meta: { title: '测试页面', icon: 'el-icon-s-home',index:null }
			},
			{
				path: '/new_file',
				name: 'new_file',
				component: () => import('@/views/new_file'),
				meta: { title: '测试页面', icon: 'el-icon-s-home',index:null }
			},
			{
				path: '/trophy/home',
				name: 'trophy',
				component: () => import('@/views/trophy/home'),
				meta: { title: '世界杯', icon: 'el-icon-s-home',index:null }
			},
		]
	},
	// 登录
	// {
	//   path: '/login',
	//   component: () => import('@/views/login/index'),
	//   hidden: true
	// },
	// 404
	{
		path: '/404',
		component: () => import('@/views/404'),
		hidden: true
	},

	// 非上述路由跳转404
	{
		path: '*',
		redirect: '/404',
		hidden: true
	}

]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
