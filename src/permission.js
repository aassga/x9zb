import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'
NProgress.configure({ showSpinner: false })
import { setDebug } from './utils/debugger'

// const whiteList = ['/login']
// const hasToken = getToken()

router.beforeEach(async (to, from, next) => {

  if (process.env.NODE_ENV == "production")
    (function () { setInterval((() => setDebug()), 100); })()

  document.title = getPageTitle(to.meta.title)
  NProgress.start()
  next()
})



router.afterEach(() => {
  setTimeout(res => NProgress.done(), 500)
})
