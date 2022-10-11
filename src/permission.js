import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth' // 从 cookie 中获取 token
import getPageTitle from '@/utils/get-page-title'
// // console.log(router);
NProgress.configure({ showSpinner: false }) // NProgress Configuration



const whiteList = ['/login'] // 重定向

router.beforeEach(async(to, from, next) => {

//   // 开始进度条
	 
	 // 设置页面标题
	 document.title = getPageTitle(to.meta.title)
	 NProgress.start()
	 next()
})



 

  // 判断用户是否已登录
  const hasToken = getToken()

 

router.afterEach(() => {
  // 完成进度条
  setTimeout(res=>{
	  NProgress.done()
  },500)
})
