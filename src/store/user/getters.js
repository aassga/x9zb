
export default {
  nickName: state => state.userInfo.nickName,
  user_type: (state) => {
    return state.user_type
  },
  model_type: (state) => {
    return state.model_type
  },
  amount: (state) => {
    return state.amount
  },
  att_list: (state) => {
    return state.att_list
  },
  collectList: (state) => {
    return state.collectList
  },
  stateName: (state) => {
    return state.stateName
  },
  route_name: (state) => {
    return state.route_name
  },
  newMsg: (state) => {
    return state.newMsg
  }
}
