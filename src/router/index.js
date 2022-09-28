import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/home/Index.vue'
import MenuView from '../views/menu/Index.vue'
import UpLoadImg from '@/views/uploadImage'
import UploadPic from '@/views/uploadImage/uploadpic.vue'
import VideoAuto from '@/views/video/index.vue'
import BulkUploadImg from '@/components/bulkUploadImg/post.vue'
import PostDetail from '@/views/postDetail/index.vue'
import PostDetailX from '@/views/postDetail/x.vue'

import Fans from '@/views/personalCenter/fans.vue'
import AttentionDetail from '@/views/personalCenter/attentionDetail.vue'
import store from '../store'
Vue.use(VueRouter)

// 解决路由的push方法 页面自跳转报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'menu',
    redirect: '/menu'
  },
  {
    path: '/menu',
    name: 'menu',
    component: MenuView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
    // component: () => import(/* webpackChunkName: "ChatDetails" */ '../views/information/ChatDetails.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/register/Index.vue')
  },
  {
    path: '/discover',
    name: 'discover',
    component: () => import(/* webpackChunkName: "about" */ '../views/discover/Index.vue')
  },
  {
    path: '/release',
    name: 'release',
    meta: {
      keepAlive: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/release/Index.vue')
  },
  {
    path: '/information',
    name: 'information',
    component: () => import(/* webpackChunkName: "information" */ '../views/information/Index.vue')
  },
  {
    path: '/ChatDetails',
    name: 'ChatDetails',
    component: () => import(/* webpackChunkName: "ChatDetails" */ '../views/information/ChatDetails.vue')
  },
  {
    path: '/RoomContainer',
    name: 'RoomContainer',
    component: () => import(/* webpackChunkName: "RoomContainer" */ '../views/information/RoomContainer.vue')
  },
  {
    path: '/my',
    name: 'my',
    component: () => import(/* webpackChunkName: "about" */ '../views/my/Index.vue')
  },
  {
    path: '/userInfo/:uid',
    name: 'userInfo',
    component: () => import(/* webpackChunkName: "about" */ '../views/my/Index.vue')
  },
  {
    path: '/username/:username',
    name: 'username',
    component: () => import(/* webpackChunkName: "about" */ '../views/my/Index.vue')
  },
  {
    path: '/RegisterModel',
    name: 'RegisterModel',
    component: () => import(/* webpackChunkName: "about" */ '../views/my/RegisterModel.vue')
  },
  {
    path: '/AccountSet',
    name: 'AccountSet',
    component: () => import(/* webpackChunkName: "about" */ '../views/sidebar/AccountSet.vue')
  },
  {
    path: '/AddCard',
    name: 'AddCard',
    component: () => import(/* webpackChunkName: "about" */ '../views/sidebar/AddCard.vue')
  },
  {
    path: '/HelpCenter',
    name: 'HelpCenter',
    component: () => import(/* webpackChunkName: "about" */ '../views/sidebar/HelpCenter.vue')
  },
  {
    path: '/HelpInfo',
    name: 'HelpInfo',
    component: () => import(/* webpackChunkName: "about" */ '../views/sidebar/HelpInfo.vue')
  },
  {
    path: '/ForestPwd',
    name: 'ForestPwd',
    component: () => import(/* webpackChunkName: "about" */ '../views/sidebar/ForestPwd.vue')
  },
  {
    path: '/Book',
    name: 'Book',
    component: () => import(/* webpackChunkName: "about" */ '../views/sidebar/Book.vue')
  },
  {
    path: '/NoticeSet',
    name: 'NoticeSet',
    component: () => import(/* webpackChunkName: "about" */ '../views/sidebar/NoticeSet.vue')
  },
  {
    path: '/Pripacy',
    name: 'Pripacy',
    component: () => import(/* webpackChunkName: "about" */ '../views/sidebar/Pripacy.vue')
  },
  {
    path: '/openComment',
    name: 'openComment',
    component: () => import(/* webpackChunkName: "about" */ '../views/sidebar/OpenComment.vue')
  },
  {
    path: '/lockObject',
    name: 'lockObject',
    component: () => import(/* webpackChunkName: "about" */ '../views/sidebar/LockObject.vue')
  },
  {
    path: '/sidebarLaunch',
    name: 'sidebarLaunch',
    component: () => import(/* webpackChunkName: "about" */ '../views/sidebar/Launch.vue')
  },
  {
    path: '/Recharge',
    name: 'Recharge',
    component: () => import(/* webpackChunkName: "about" */ '../views/sidebar/Recharge.vue')
  },
  {
    path: '/Withdarw',
    name: 'Withdarw',
    component: () => import(/* webpackChunkName: "about" */ '../views/sidebar/Withdarw.vue')
  },
  {
    path: '/AddAccount',
    name: 'AddAccount',
    component: () => import(/* webpackChunkName: "about" */ '../views/sidebar/AddAccount.vue')
  },
  {
    path: '/launch',
    name: 'launch',
    component: () => import(/* webpackChunkName: "about" */ '../views/Launch.vue')
  },
  {
    path: '/upLoadImg',
    name: 'upLoadImg',
    component: UpLoadImg
  },
  {
    path: '/upLoadImg/editImg',
    name: 'editImg',
    component: UploadPic
  },
  {
    path: '/uploadVideo',
    name: 'uploadVideo',
    component: VideoAuto

  },
  {
    path: '/bulkUploadImg',
    name: 'bulkUploadImg',
    component: BulkUploadImg
  },
  // 发帖详情
  {
    path: '/p/:tshare',
    name: 'postDetail',
    component: PostDetail
  },
  // 发帖详情
  {
    path: '/x/:tshare',
    name: 'postDetailX',
    component: PostDetailX
  },
  // 粉丝列表页面
  {
    path: '/fans',
    name: 'fans',
    component: Fans
  },
  // 关注列表页面
  {
    path: '/attentionDetail',
    name: 'attentionDetail',
    component: AttentionDetail
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫
router.beforeEach((to, form, next) => {
  // console.log(localStorage.getItem('token'))
  // console.log(to.name != 'login' && to.name != 'register' && !localStorage.getItem('token'));
  // 设置路由登录权限的跳转

  if (to.name != 'login' && to.name != 'register' && !localStorage.getItem('token')) {
    // router.replace({path:'/login'})
    next()
  } else {
    if (form.name == 'register') {
      next()
      router.go(0)
    }
    next()
  }
})

export default router
