import  Vue  from "vue"
const selectLoadMore = Vue.directive('selectLoadMore',{
  bind (el, binding) {
    // 获取element-ui定义好的scroll盒子
    const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
    SELECTWRAP_DOM.addEventListener('scroll', function () {
      if (this.scrollHeight - this.scrollTop < this.clientHeight + 1) {
        binding.value()
      }
    })
  }
})
export { selectLoadMore }

