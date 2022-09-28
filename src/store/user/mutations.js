const mutations = {
  SETUSERLOGINSTATE (state, data) {},
  // 快速注册
  SETUSERINFO (state, data) {
    state.user_info = {
      ...state.user_info,
      user_name: data.username
    }
    state.token = data.token
  },
  // 获取关注列表
  SET_ATT_LIST (state, data) {
    state.att_list = data
  },
  // 修改用户属性的方法
  SET_USER_TYPE (state, status) {
    state.user_type = status
  },
  // 修改页面路由名的方法
  SET_ROUTE_NAME (state, status) {
    state.route_name = status
  },
  // 获取账户金额
  SET_USER_AMOUNT (state, status) {
    state.amount = status
  },
  // 打开侧边栏弹框的方法
  OPEN_MENU_MODEL (state, status) {
    state.model_type = status
  },
  // 存储用户信息
  SET_USER_INFO (state, data) {
    state.user_info = data

    const _combo = data.mcn_data.combo_data
    if (_combo.length > 0) {
      const newCombo = []
      for (const item of _combo) {
        newCombo.push(item[0])
      }

      state.model_combo = newCombo
    }
  },
  // 用户登录时
  SET_LOGIN (state, data) {
    state.token = data.token
  },
  SET_STATE_NAME (state, data) {
    state.currentCity = data
    state.stateName = data.name
  },
  // 获取socket url
  SET_SOCKETURL (state, data) {
    state.WSURL = data
  },
  SET_GIFT_LIST (state, data) {
    state.gift_list = data
    localStorage.setItem('giftList', JSON.stringify(data))
  },
  SET_CHAT_LIST (state, data) {
    state.chat_list = data
  },
  SET_OTHER_ACCOUNT_INFO (state, data) {
    state.otherAccountInfo = data
  },
  HANDLE_WSRECONNECT (state) {
    state.wsReConnect = state.wsReConnect + 1
  },
  SET_UNREAD_MSG_NUM (state, data) {
    state.unReadMsgNum = data
  },
  SET_COLLECTLIST_LIST (state, data) {
    state.collectList = data
  },
  SET_BANUSER_LIST (state, data) {
    state.banUser = data
  },
  SET_NEW_MSG (state, data) {
    state.newMsg = data
  }
}
export default mutations
