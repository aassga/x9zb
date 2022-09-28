import request from '@/utils/request';

export default {
   /**
   *getToken
   */
  getImToken(data) {
    return request({
      url: `api/chat/getChatToken?user_id=${data.user_id}&type=${data.type||0}&username=${data.username}`,
      method: 'get',
      // data: JSON.stringify(params),
    });
  },
     /**
   *getMsgList
   */
  getMessageList({ id,type }) {
    return request({
      url: `api/chat/getChatRoomList`,
      method: "get",
      params: {
        user_id:id,
        type
      }
    });
  },
    /**
   *sendMessage
   */
  sendMessage(params) {
    return request({
      url: `api/chat/sendMessage`,
      method: 'post',
      data: params,
    });
  },
  /**
   *inRoom
   */
  inRoom(params) {
    return request({
      url: `api/chat/inRoom`,
      method: 'post',
      data: params,
    });
  },
  /**
   *leaveRoom
   */
   leaveRoom(params) {
    return request({
      url: `api/chat/leaveRoom`,
      method: 'post',
      data: params,
    });
  },
 /**
   *getChatHistory
   */
  getChatHistory(params) {
    return request({
      url: `api/chat/getChatHistory?type=${params.type}&user_id=${params.user_id}&vid=${params.vid}&limit=${params.limit}&page=${params.page}`,
      method: 'get',
    });
  },
   /**
   *deleteMessage
   */
  deleteMessage(params) {
    return request({
      url: `api/chat/deleteMessage`,
      method: 'post',
      data: params,
    });
  },
    /**
   *mute
   */
  mute(params) {
    return request({
      url: `api/chat/mute`,
      method: 'post',
      data: params,
    });
  },
    /**
   *freeze
   */
  freeze(params) {
    return request({
      url: `api/chat/freeze`,
      method: 'post',
      data: params,
    });
  },
    /**
   *pin
   */
  pin(params) {
    return request({
      url: `api/chat/pin`,
      method: 'post',
      data: params,
    });
  },
  /**
   *inviteRoom
   */
  inviteRoom(params) {
    return request({
      url: `api/chat/inviteRoom`,
      method: 'post',
      data: params,
    });
  },
  getQuickReplyList({user_id}) {
    return request({
      url: `api/chat/getQuickReplyList?user_id=${user_id}`,
      method: 'get',
    });
  },
  /**
 *addQuickReply
 */
addQuickReply(params) {
  return request({
    url: `api/chat/addQuickReply`,
    method: 'post',
    data: params,
  });
},
  /**
 *delQuickReply
 */
delQuickReply(params) {
  return request({
    url: `api/chat/delQuickReply`,
    method: 'post',
    data: params,
  });
},
}
