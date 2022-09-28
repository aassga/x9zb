export default {
  nickName: state => state.userInfo.nickName,
  user_type: state => {
    return state.user_type
  },
  model_type: state => {
    return state.model_type
  },
  comboList: state => {
    return state.comboList
  },
  postList: state => {
    return state.postList
  }
}
