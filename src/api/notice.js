import request from '@/utils/request'

export default {
  /**
   * 获取通知
   * @param {data} data
   */
  getNotifi (data) {
    return request({
      url: '/v1/live/notifi/getNotifi',
      method: 'post',
      data
    })
  }
}
