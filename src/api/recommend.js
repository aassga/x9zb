import request from '@/utils/request'

export default {
  // 獲取動態版本，如有更新要重新獲取
  recommendVersion () {
    return request({
      url: '/v1/recommend/version',
      method: 'get'
    })
  },
  // 獲取首頁圖片動態
  recommendImg () {
    return request({
      url: '/v1/recommend/img',
      method: 'get'
    })
  },
  // 獲取首頁影片動態
  recommendVideo () {
    return request({
      url: '/v1/recommend/video',
      method: 'get'
    })
  },
  // 獲取首頁广告動態
  recommendAd (cid) {
    return request({
      url: `/v1/recommend/ad?cid=${cid}`,
      method: 'get'
    })
  },
  // 獲取首頁限时動態
  recommendLimitdyn (cid) {
    return request({
      url: `/v1/recommend/limitdyn?cid=${cid}`,
      method: 'get'
    })
  }

}
