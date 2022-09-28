import request from '@/utils/request'

export default {
  /**
   * 主題串是否已經點讚
   * @param {tid} tid
   */
  likeExist (tid) {
    return request({
      url: `/v1/like/tid/exist?tid=${tid}`,
      method: 'get'
    })
  },
  /**
   * 主題串增加讚數
   * @param {tid} tid
   */
  likeInsert (tid) {
    return request({
      url: '/v1/like/tid/insert',
      method: 'post',
      data: JSON.stringify({ tid: `${tid}` })
    })
  },
  /**
   * 主題串點讚統計
   * @param {tid} tid
   */
  likeCount (tid) {
    return request({
      url: `/v1/like/tid/insert?tid=${tid}`,
      method: 'get'
    })
  }
}
