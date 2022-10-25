import request from '@/utils/request'

// 足球
export function getQiniuToken(data) {
  return request({
    url: 'api/Member/getQiniuToken',
    method: 'post',
    data
  })
}

// 赛事收藏
export function collect(data) {
  return request({
    url: 'api/Basketballuser/collect',
    method: 'post',
    data
  })
}

// 首页赛事推荐
export function recommend(params) {
  return request({
    url: 'api/hot_match/recommend',
    method: 'get',
    params
  })
}

// 等級列表
export function getLevelList(params) {
  return request({
    url: 'api/level/list',
    method: 'get',
    params
  })
}