import { Loading } from 'element-ui'

let loadingCount = 0
let loading
let loadingText = 'Loading'
console.log(localStorage.getItem, '-localStorage.getItem')
if (localStorage.getItem('locale') == 'cn') {
  loadingText = '加载中'
}
if (localStorage.getItem('locale') == 'tc') {
  loadingText = '加載中'
}
const startLoading = () => {
  loading = Loading.service({
    lock: true,
    text: loadingText,
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

const endLoading = () => {
  loading.close()
}

export const showLoading = () => {
  if (loadingCount === 0) {
    startLoading()
  }
  loadingCount += 1
}

export const hideLoading = () => {
  if (loadingCount <= 0) {
    return
  }
  loadingCount -= 1
  if (loadingCount === 0) {
    endLoading()
  }
}
