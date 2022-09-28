import request from '@/utils/request'

export default {
  /**
   * 獲取我的貼文
   * @param {pids} pids
   */
  myGuide (page, limit) {
    return request({
      url: `/v1/my/guide?page=${page}&limit=${limit}`,
      method: 'get'
    })
  }
}
