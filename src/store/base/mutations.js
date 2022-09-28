const mutations = {
  // 打开侧边栏弹框的方法
  OPEN_MENU_MODEL (state, status) {
    state.model_type = status
  },
  // 设置修改头像图片剪切原始信息
  SETUPLOADPIC (state, data) {
    console.log('我修改了图片')
    console.log(state)
    state.uploadpic = data.img
    state.uploadpreveiw = data.preview
    state.picname = data.name
    state.pictype = data.type
    state.filesize = data.size || 0
  },
  // 设置当前的路由名
  SET_CURRENT_ROUTE_NAME (state, val) {
    state.pageName = val
  },
  SET_ISUPLOADED (state, val) {
    state.isUploaded = val
  },
  SET_IMAGE (state, val) {
    console.log(val)
    state.fileimage = val
  },
  // 设置视频ws服务器地址以及相关信息
  SET_VIDEO_INFO (state, val) {
    state.disk = val
  },
  SET_CITY_LIST (state, data) {
    state.cityList = data
  },
  // 获取用户订阅的模特列表
  SET_COMBO_LIST (state, data) {
    state.comboList = data
  },
  // 获取用户订阅的模特套餐列表
  SET_SUB_LIST (state, data) {
    state.comboSubList = data
  },
  // 获取用户购买的贴文列表
  SET_POST_LIST (state, data) {
    console.log(data)
    state.postList = data
  },
  SET_COUNTRY_LIST (state, data) {
    state.countryList = data
  },
  SET_PROGRESSBAR (state, data) {
    state.isSHowProgress = data
  }
}
export default mutations
