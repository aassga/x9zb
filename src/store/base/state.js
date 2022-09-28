const state = {
  pageName: '', // 当前页面的路由名
  uploadpic: null,
  uploadpreveiw: null,
  picname: null,
  pictype: null,
  filesize: 0,
  isUploaded: false,
  fileimage: '', // 上传之后的图片
  disk: {

  },
  profile: {
    name: 'rou'
  },
  cityList: [], // 当前用户所在国家的城市列表list
  countryList: [], // 所有国家的list
  comboList: [], // 已订阅的模特列表
  comboSubList: [], // 已订阅的模特套餐列表
  postList: [], // 购买的贴文列表
  isSHowProgress: false
}
export default state
