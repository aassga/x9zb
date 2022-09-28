// 本地跑需要在vue.config.js里设置代理的domain
import request from '@/utils/request'

export default {
  // 设置订阅套餐
  setSubCombo (data) {
    return request({
      url: '/v1/member/sub/combo',
      method: 'put',
      data
    })
  },
  // 获取自己的订阅套餐
  getSubCombo (params) {
    return request({
      url: '/v1/member/sub/combo',
      method: 'get',
      params
    })
  },
  // 购买订阅套餐
  buySubCombo (data) {
    return request({
      url: '/v1/my/buy/combo',
      method: 'put',
      data
    })
  },
  // 我已订阅的模特列表
  getBuyCombo (params) {
    return request({
      url: '/v1/my/buy/combo',
      method: 'get',
      params
    })
  },
  // // 我已订阅的模特套餐列表
  // getBuySub(params) {
  //   return request({
  //     url: "/v1/my/buy/combo",
  //     method: "get",
  //     params
  //   });
  // },
  // 购买单价帖子
  putBuyPost (data) {
    return request({
      url: '/v1/my/buy/item',
      method: 'put',
      data
    })
  },
  // 获取帖文的视频地址
  getVideo (params) {
    return request({
      url: '/v1/credit/video',
      method: 'get',
      params
    })
  },
  // 已经购买的帖子列表
  getBuyPost (params) {
    return request({
      url: '/v1/my/buy/item',
      method: 'get',
      params
    })
  },
  // 获取 模特 的订阅套餐   第三人请求获取
  getOtherSubCombo ({ uid }) {
    return request({
      url: '/v1/member/sub/combopost',
      method: 'get',
      params: {
        uid
      }
    })
  },
  getMessageList ({ id, type }) {
    return request({
      url: '/chat/getChatRoomList',
      method: 'get',
      params: {
        user_id: id,
        type
      }
    })
  },
  // 获取 模特 的订阅套餐的所有贴文   第三人请求获取
  getOtherSubPosts ({ sub_id }) {
    return request({
      url: '/v1/member/sub/combopostone',
      method: 'get',
      params: {
        sub_id
      }
    })
  },
  // 获取 模特 的套餐的所有付费贴文   第三人请求获取
  getComboPosts ({ sub_id }) {
    return request({
      url: '/v1/member/sub/combopost',
      method: 'get',
      params: {
        sub_id
      }
    })
  },
  // 获取 模特 的单价贴文
  getComboPost ({ uid }) {
    return request({
      url: '/v1/member/sub/itempost',
      method: 'get',
      params: {
        uid
      }
    })
  },
  // 获取国家ID列表
  getCountryList (params) {
    return request({
      url: '/v1/live/address/getCountries',
      method: 'get',
      params
    })
  },
  // 获取国家下一级ID列表
  getProvinceList ({ country_id }) {
    return request({
      url: '/v1/live/address/getStates',
      method: 'get',
      params: {
        country_id
      }
    })
  },
  // 获取城市ID列表
  getCityList ({ state_id }) {
    return request({
      url: '/v1/live/address/getCities',
      method: 'get',
      params: {
        state_id
      }
    })
  },
  // 获取上传图片服务器地址
  getImgSeveiceUrl () {
    return request({
      url: '/v1/post/image/upurl',
      method: 'get'
    })
  },
  // 模特角色营收报表
  getModelList (params) {
    return request({
      url: '/v1/member/revenue/model/list',
      method: 'get',
      params
    })
  },
  // 模特角色营收报表
  getMCNList (params) {
    return request({
      url: '/v1/member/revenue/mcn/list',
      method: 'get',
      params
    })
  },
  // 模特营收报表
  getMCNGroupList (params) {
    return request({
      url: '/v1/member/revenue/mcnbygroup/list',
      method: 'get',
      params
    })
  }
}
