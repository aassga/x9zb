// 本地跑需要在vue.config.js里设置代理的domain
import request from '@/utils/request'
import { getDomain } from '@/utils/config'
// get范例
export default {
  getInfo (token) {
    return request({
      url: '/api/account/profile',
      method: 'get',
      params: {
        token
      }
    })
  },
  login (data) {
    return request({
      url: '/api/auth/login',
      method: 'post',
      // data: JSON.stringify(data)//根据需求来
      data
    })
  },
  thirdLogin (data, type) {
    let postUrl = '/v1/live/user/facebookCallback'
    if (type === 'google') {
      postUrl = '/v1/live/user/googleCallback'
    }
    return request({
      url: postUrl,
      method: 'post',
      // data: JSON.stringify(data)//根据需求来
      data
    })
  },
  // 快速注册
  fastRegister (data) {
    return request({
      url: '/v1/member/fastregister',
      method: 'post',
      data: data
      // baseURL:getDomain('imgupload')
    })
  },
  // 获取用户信息
  getProfile (token) {
    return request({
      url: '/v1/member/profile',
      method: 'get'
    })
  },
  // 修改用户资料
  putProfile (data) {
    return request({
      url: '/v1/member/profile',
      method: 'put',
      data
    })
  },
  // 清除用户信息缓存
  delProfileCache (token) {
    return request({
      url: '/v1/member/profile',
      method: 'delete'
    })
  },
  // 修改用户账号
  putUsername (data) {
    return request({
      url: '/v1/member/username/change',
      method: 'put',
      data
    })
  },
  // 登录
  login (data) {
    return request({
      url: '/v1/member/login',
      method: 'post',
      data: data
    })
  },
  // 邮箱注册
  emailRegister (data) {
    return request({
      url: '/v1/live/user/emailRegister',
      method: 'post',
      data: data
    })
  },
  // 修改用户头像
  editProfile (data) {
    return request({
      url: '/v1/member/profile',
      method: 'put',
      data
    })
  },
  // 修改密码
  passwordChange (data) {
    return request({
      url: '/v1/password/change',
      method: 'put',
      data: data
    })
  },
  // 通过邮件重置密码
  passwordResetPassByEmail (data) {
    return request({
      url: '/v1/password/resetPassByEmail',
      method: 'post',
      data: data
    })
  },
  // 获取粉丝数量
  getFansCount (token) {
    return request({
      url: '/v1/fan/count',
      method: 'get',
      params: {
        token
      }
    })
  },
  // 获取粉丝列表
  getOtherFansList (token) {
    return request({
      url: '/v1/fan/list',
      method: 'get',
      params: {
        token
      }
    })
  },
  // 获取他人粉丝数量
  getOtherFansCount (params) {
    return request({
      url: '/v1/fan/count',
      method: 'get',
      params
    })
  },
  // 获取他人用户信息
  getOtherProfile (params = { uids: [] }) {
    // console.log(params)
    return request({
      url: '/v1/member/public_profile',
      method: 'get',
      params
    })
  },
  // 删除粉丝
  delFans (data) {
    return request({
      url: '/v1/fan/delete',
      method: 'delete',
      data
    })
  },
  // 获取关注列表
  getAttentionList (token) {
    return request({
      url: '/v1/attention/list',
      method: 'get',
      params: {
        token
      }
    })
  },
  // 获取关注数量
  getAttentionCount (token) {
    return request({
      url: '/v1/attention/count',
      method: 'get',
      params: {
        token
      }
    })
  },
  // 获取他人关注数量
  getOtherAttentionCount (params) {
    return request({
      url: '/v1/attention/count',
      method: 'get',
      params
    })
  },
  // 添加关注
  addAttention (data) {
    return request({
      url: '/v1/attention/insert',
      method: 'post',
      data
    })
  },
  // 取消关注
  delAttention (data) {
    return request({
      url: '/v1/attention/delete',
      method: 'delete',
      data
    })
  },
  // 贴文收藏情况获取
  getInsertList (params) {
    return request({
      url: '/v1/book/uid/list',
      method: 'get',
      params
    })
  },
  // 推文收藏
  favoriteInsert (data) {
    return request({
      url: '/v1/book/tid/insert',
      method: 'post',
      data
    })
  },
  // 取消贴文收藏
  delFavoriteInsert (tid) {
    return request({
      url: '/v1/book/tid/delete',
      method: 'delete',
      data: JSON.stringify({ tid: `${tid}` })
    })
  },
  // 判断贴文是否被收藏
  bookExist (tid) {
    return request({
      url: `/v1/book/tid/exist?tid=${tid}`,
      method: 'get'
    })
  },
  // 成为模特
  useModel (data) {
    return request({
      url: '/v1/live/model/modelReview',
      method: 'post',
      data
    })
  },

  /**
   * 新增兴趣
   * @param {data} data //传入兴趣名字字符串
   */
  addInterest (data) {
    return request({
      url: '/v1/live/interest/add',
      method: 'post',
      data
    })
  },
  /**
   * 获取兴趣列表
   * @param {data} data
   */
  interestList (data) {
    return request({
      url: '/v1/live/interest/list',
      method: 'post',
      data
    })
  },
  /**
   * 用户选择兴趣标签
   * @param {data} data
   */
  optionInterest (data) {
    return request({
      url: '/v1/live/interest/option',
      method: 'post',
      data
    })
  },
  // behavior
  behavior (data) {
    return request({
      url: '/promote/user/action',
      method: 'post',
      data
    })
  },
  forgotPassword (email) {
    return request({
      url: `/v1/password/forgot?email=${email}`,
      method: 'get'
    })
  },
  /**
   * 获取兴趣列表
   * @param {data} data
   */
  // 这个接口在上面已经有了，  是get请求  同名方法，我暂时覆盖了 不然影响我的逻辑了
  // getAttentionList(data) {
  //   return request({
  //     url: `/v1/attention/list`,
  //     method: 'post',
  //     data
  //   })
  // },
  /**
   * 关注别人
   * @param {data} data
   */
  attentionInset (data) {
    return request({
      url: '/v1/attention/insert',
      method: 'post',
      data
    })
  },
  /**
   * 取消关注
   * @param {data} data
   */
  attentionDelete (data) {
    return request({
      url: '/v1/attention/delete',
      method: 'post',
      data
    })
  },
  /**
   * 首页搜索
   * @param {data} data
   */
  homeSearchType (data) {
    return request({
      url: '/v1/live/home/searchType',
      method: 'post',
      data
    })
  },
  /**
   * 首頁標籤搜尋
   * @param {tagName} tagName
   */
  homeSearchTag (data) {
    return request({
      url: 'v1/live/tag/searchTag',
      method: 'post',
      data
    })
  },
  // 获取websocket地址
  getWsurl () {
    return request({
      url: '/v1/live/home/get_ws_url',
      method: 'get'
    })
  },
  // 获取其他人的用户信息 传入uid数组
  getOtherUserInfo (uid) {
    // 参数
    let params = ''
    // 判断是否是单个id时候
    if (typeof uid === 'string' || typeof uid === 'number') {
      params = `uids[]=${uid}`
    } else {
      uid.map((item, i) => {
        params += `uids[${i}]=${item}&`
      })
      // 截取最后一个&符号
      params = params.substr(0, params.length - 1)
    }
    return request({
      // url: `/v1/member/public_profile?uids[0]=2&uids[1]=55&uids[1]=77&uids[1]=77` //测试,
      url: `/v1/member/public_profile?${params}`,
      method: 'get'
    })
  },
  /**
   * 重新获取邮箱验证码
   */
  getEmailVerifyCode () {
    return request({
      url: '/v1/live/user/getEmailVerifyCode',
      method: 'get'
    })
  },
  /**
   * 邮箱验证
   * @param {data} data
   */
  verifyEmail (data) {
    return request({
      url: '/v1/live/user/verifyEmail',
      method: 'post',
      data
    })
  },
  /**
   * 封锁列表
   */
  getPrivacyBan () {
    return request({
      url: '/v1/my/privacy/ban',
      method: 'get'
    })
  },
  /**
   * 设置封锁
   * @param {data} data
   */
  putPrivacyBan (data) {
    return request({
      url: '/v1/my/privacy/ban',
      method: 'put',
      data
    })
  },
  /**
   * 取消封锁
   * @param {data} data
   */
  deleteBan (data) {
    return request({
      url: '/v1/my/privacy/ban/delete',
      method: 'delete',
      data
    })
  },
  /**
   * 获取模特贴文列表
   */
  getPostList (uid, page, limit) {
    return request({
      url: `v1/member/public?page=${page}&limit=${limit}&uid=${uid}`,
      method: 'get'
    })
  },

  /**
   * 获取礼物列表
   */
  getGiftList () {
    return request({
      url: 'v1/live/home/gift_list',
      method: 'get'
    })
  },
  /**
   * 全部对话列表
   */
  getChatList () {
    return request({
      url: 'v1/live/im/getDialogueList',
      method: 'get'
    })
  },
  /**
   * 聊天鉴权
   */
  checkPermission (data) {
    return request({
      url: 'v1/live/im/checkDialog',
      method: 'post',
      data
    })
  },
  /**
   * 聊天记录
   */
  getMsgHistoryList (data) {
    return request({
      url: 'v1/live/im/getHistoryMessageList',
      method: 'post',
      data
    })
  },
  /**
   * 第一次发起聊天通知
   */
  firstTImeChat (data) {
    return request({
      url: 'v1/live/im/newDialog',
      method: 'post',
      data
    })
  },
  /**
   * 出入聊天室
   */
  chatInOut (data) {
    return request({
      url: 'v1/live/im/readMessage',
      method: 'post',
      data
    })
  },
  /**
   * 获取未读消息数量
   */
  getUnReadMsgNum () {
    return request({
      url: 'v1/live/im/getUnreadMessageCount',
      method: 'get'
    })
  }
}
