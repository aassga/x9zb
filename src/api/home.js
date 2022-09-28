import request from '@/utils/request'

export default {
  /**
   *获取当前地理位置信息
   * @param {*} latitude
   * @param {*} longitude
   * @param {*} distance
   * @param {*} city_name
   */
  getUserAddress (data) {
    return request({
      url: '/v1/live/home/userAddress',
      method: 'post'
      // data: JSON.stringify(params),
    })
  },
  /**
   *getToken
   */
  getImToken (data) {
    return request({
      url: `/chat/getChatToken?user_id=${data.user_id}&type=${data.type}&username=${data.username}`,
      method: 'get'
      // data: JSON.stringify(params),
    })
  },
  /**
   *sendMessage
   */
  sendMessage (params) {
    return request({
      url: '/chat/sendMessage',
      method: 'post',
      data: JSON.stringify(params)
    })
  },
  /**
   *inRoom
   */
  inRoom (params) {
    return request({
      url: '/chat/inRoom',
      method: 'post',
      data: JSON.stringify(params)
    })
  },
  /**
   *getChatHistory
   */
  getChatHistory (params) {
    return request({
      url: `/chat/getChatHistory?type=${params.type}&user_id=${params.user_id}&vid=${params.vid}&limit=${params.limit}&page=${params.page}`,
      method: 'get'
    })
  },
  /**
   *deleteMessage
   */
  deleteMessage (params) {
    return request({
      url: '/chat/deleteMessage',
      method: 'post',
      data: JSON.stringify(params)
    })
  },
  /**
   *mute
   */
  mute (params) {
    return request({
      url: '/chat/mute',
      method: 'post',
      data: JSON.stringify(params)
    })
  },
  /**
   *freeze
   */
  freeze (params) {
    return request({
      url: '/chat/freeze',
      method: 'post',
      data: JSON.stringify(params)
    })
  },
  addGroup (params) {
    return request({
      url: '/chat/inviteRoom',
      method: 'post',
      data: JSON.stringify(params)
    })
  },
  delGroup (params) {
    return request({
      url: '/chat/deleteRoom',
      method: 'post',
      data: JSON.stringify(params)
    })
  },
  editGroupName (params) {
    return request({
      url: '/chat/updateGroupName',
      method: 'post',
      data: JSON.stringify(params)
    })
  },
  uploadGroupPic (form_data) {
    return request({
      url: 'chat/uploadGroupPic',
      method: 'post',
      data: form_data,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  // 获取群组内的成员列表
  getChatRoomUserList ({ type, vid }) {
    return request({
      url: `/chat/getChatRoomUserList?type=${type}&vid=${vid}`,
      method: 'get'
    })
  },
  // 获取全部成员列表
  getUserList ({ name }) {
    return request({
      url: `/member/list?name=${name}`,
      method: 'get'
    })
  },
  getChatRoomUserInfo ({ user_id, vid }) {
    return request({
      url: `/chat/getChatRoomUserInfo?user_id=${user_id}&vid=${vid}`,
      method: 'get'
    })
  },
  leaveGroup (params) {
    return request({
      url: '/chat/leaveGroup',
      method: 'post',
      data: JSON.stringify(params)
    })
  },
  getUserTag ({ user_id }) {
    return request({
      url: `/member_tag/index?user_id=${user_id}`,
      method: 'get'
    })
  },
  addTag (params) {
    return request({
      url: '/member_tag/add',
      method: 'post',
      data: JSON.stringify(params)
    })
  },
  deleteTag (params) {
    return request({
      url: '/member_tag/delete',
      method: 'post',
      data: JSON.stringify(params)
    })
  },
  /**
   *pin
   */
  pin (params) {
    return request({
      url: '/chat/pin',
      method: 'post',
      data: JSON.stringify(params)
    })
  },
  getQuickReplyList ({ user_id }) {
    return request({
      url: `/chat/getQuickReplyList?user_id=${user_id}`,
      method: 'get'
    })
  },
  /**
   *addQuickReply
   */
  addQuickReply (params) {
    return request({
      url: '/chat/addQuickReply',
      method: 'post',
      data: JSON.stringify(params)
    })
  },
  /**
   *delQuickReply
   */
  delQuickReply (params) {
    console.log(params, 'params========')
    return request({
      url: '/chat/delQuickReply',
      method: 'post',
      data: JSON.stringify(params)
    })
  },
  /**
   *clearHistory
   */
  clearHistory (params) {
    console.log(params, 'params========')
    return request({
      url: '/chat/clearHistory',
      method: 'post',
      data: JSON.stringify(params)
    })
  },

  updateUser (params) {
    return request({
      url: '/member/update',
      method: 'post',
      data: JSON.stringify(params)
    })
  },

  getAllChannel (params) {
    return request({
      url: '/Channeluser/getAllChannel',
      method: 'get'
    })
  },

  getAllMessageList (params) {
    return request({
      url: '/Channeluser/index',
      method: 'get'
    })
  },

  deleteMessageList (params) {
    return request({
      url: `/Channeluser/delete?id=${params.id}`,
      method: 'get'
    })
  },

  editMessageList (params) {
    return request({
      url: `/Channeluser/editpost?channel_id=${params.channel_id}&content=${params.content}&id=${params.id}`,
      method: 'get'
    })
  },

  addMessageList (params) {
    return request({
      url: `/Channeluser/addpost?channel_id=${params.channel_id}&content=${params.content}`,
      method: 'get'
    })
  },

  getEnterHallList (params) {
    return request({
      url: `/chat/getLiveInroomlog?vid=${params.vid}`,
      method: 'get'
    })
  }

}
