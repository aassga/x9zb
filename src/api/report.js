import request from '@/utils/request'

export default {
  /**
   * 舉報貼文
   * @param {*} tid
   * @param {*} pid
   * @param {*} txtmsg
   */
  reportPost (tid, pid, typeId, txtmsg) {
    return request({
      url: '/v1/report/post',
      method: 'post',
      data: JSON.stringify({ tid, pid, typeId, txtmsg })
    })
  },
  /**
   * 舉報用戶
   * @param {*} tid // tid先寫死0
   * @param {*} touid
   * @param {*} typeId
   * @param {*} txtmsg
   */
  reportAcc (params) {
    return request({
      url: '/v1/report/post/acc',
      method: 'post',
      data: JSON.stringify({ ...params })
    })
  }
}
