import request from '@/utils/request'
import { isArray } from 'util'

export default {
  /**
   * 獲取貼文版本
   * @param {pids} pids
   */
  postVersion (tid) {
    return request({
      url: `/v1/post/version?tid=${tid}`,
      method: 'get'
    })
  },
  /**
   * 獲取貼文版本
   * @param {pids} pids
   */
  postVersionByTshare (tshare) {
    return request({
      url: '/v1/post/version',
      method: 'get',
      params: isNaN(tshare) ? { tshare } : { tid: tshare }
    })
  },
  /**
   * 獲取貼文
   * @param {pids} pids
   */
  postData (pids) {
    return request({
      url: '/v1/post/data',
      method: 'get',
      params: {
        pids: isArray(pids) ? pids : [pids]
      }
    })
  },
  /**
   * 創建貼文
   * @param {pids} tid
   * @param {message} message
   */
  postCreate (tid, message) {
    console.log(tid, message)
    return request({
      url: `/v1/post/create?tid=${tid}&message=${message}`,
      method: 'post'
    })
  },
  /**
   * 上傳圖片
   * @param {data} data
   */
  postImage (data) {
    return request({
      url: '/v1/post/image',
      method: 'post',
      data
      // data: JSON.stringify(data)
    })
  },
  /**
   * 发帖后首页视频、图片清除缓存
   * @param {name}
   */
  clearCatch (param) {
    return request({
      url: `/tool/cache/recommend?name=${param.name}`,
      method: 'get'
    })
  },
  /**
   * 查看帖子下评论详情
   * @param {tid,pid}
   */
  getCommemtDetails ({ tid, pid }) {
    return request({
      url: `/v1/floor/data?tid=${tid}&pid=${pid}`,
      method: 'get'
    })
  },
  /**
   * 檢查是否能評論
   * @param {auid}
   */
  checkCanReply ({ auid }) {
    return request({
      url: `/v1/floor/exist?auid=${auid}`,
      method: 'get'
    })
  },
  /**
   * 创建帖子
   */
  creatComment (data) {
    return request({
      url: '/v1/floor/create',
      method: 'post',
      data
    })
  },
  /**
   * 获取最新帖子评论数
   */
  getNewCommentNum ({ tid }) {
    return request({
      url: `/v1/floor/count?tid=${tid}`
    })
  },
  /**
   * 获取点赞的tid list
  */
  getLikeList () {
    return request({
      url: '/v1/like/uid/list'
    })
  },
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
  },
  /**
  * 获取影片上传服务器地址等信息
  */
  getVideoService () {
    return request({
      url: '/v1/post/video/transcode',
      method: 'get'
    })
  },
  /**
  * 上传影片标题内容封面图片等信息
  */
  upLoadVideoInfo (data) {
    return request({
      url: '/v1/post/video',
      method: 'post',
      data
    })
  },
  /**
  * 上传视频贴文
  */
  upLoadVideoPost (data) {
    return request({
      url: '/v1/post/video/ckplayer',
      method: 'post',
      data
    })
  },
  /**
  * 首页视频list
  */
  getHomeVideoList () {
    return request({
      url: '/v1/recommend/video',
      method: 'get'
    })
  },
  /**
  * 个人贴文
 */
  getPersonalPost ({ page, limit }) {
    return request({
      url: `v1/my/guide?page=${page}&limit=${limit}`,
      method: 'get'
    })
  },
  setHotTag (params) {
    return request({
      url: 'v1/live/tag/add',
      method: 'post',
      data: params
    })
  }
}
