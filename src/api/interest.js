import request from '@/utils/request'

export default {
  /**
   * 获取兴趣标签
   * @param {data} data
   */
  getInterestList (data) {
    return request({
      url: '/v1/live/interest/list',
      method: 'post',
      data
    })
  }
}
