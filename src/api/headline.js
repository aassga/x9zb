// 头条
import request from '@/utils/request'

// 分类
export function classification(data) {
  return request({
    url: 'api/Headlines/classification',
    method: 'get',
    params:data
  })
}


// 列表
export function getList(data) {
  return request({
    url: 'api/Headlines/getList',
    method: 'get',
    params:data
  })
}
// 详情
export function getInfo(data) {
  return request({
    url: 'api/Headlines/getInfo',
    method: 'get',
    params:data
  })
}
// 点赞
export function likes(data) {
  return request({
    url: 'api/Headlines_user/likes',
    method: 'get',
    params:data
  })
}

// 收藏
export function favorites1(data) {
  return request({
    url: 'api/Headlines_user/favorites',
    method: 'get',
    params:data
  })
}

// 头条评论
export function comment(data) {
  return request({
    url: 'api/Headlines_user/comment',
    method: 'get',
    params:data
  })
}

// 评论点赞
export function commentLikes(data) {
  return request({
    url: 'api/Headlines_user/commentLikes',
    method: 'get',
    params:data
  })
}

// 头条评论二级列表
export function commentList(data) {
  return request({
    url: 'api/Headlines/commentList',
    method: 'get',
    params:data
  })
}

// 头条收藏、回帖列表
export function logList(data) {
  return request({
    url: 'api/Headlines_user/logList',
    method: 'get',
    params:data
  })
}


// 用户发头条记录
export function userPostList(data) {
  return request({
    url: 'api/Headlines/userPostList',
    method: 'get',
    params:data
  })
}
// 用户发视频记录
export function userPostVideoList(data) {
  return request({
    url: 'api/Video/userPostList',
    method: 'get',
    params:data
  })
}
// 删除用户头条记录
export function HeadlinesDelete(data) {
  return request({
    url: 'api/Headlines_user/delete',
    method: 'post',
    data
  })
}
// 删除用户发视频
export function videoDelete(data) {
  return request({
    url: 'api/Video_user/delete',
    method: 'post',
    data
  })
}
// 用户发视频
export function addinsertVidoe(data) {
  return request({
    url: 'api/Video_user/insert',
    method: 'post',
    data
  })
}
// 获取详情推荐主播
export function getRecommend(data) {
  return request({
    url: 'api/Live_streaming/recommend',
    method: 'get',
    params:data
  })
}

// 赛事详情积分榜
export function ranking(data) {
  return request({
    url: 'api/hot_match/ranking',
    method: 'get',
    params:data
  })
}







