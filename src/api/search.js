// 搜索
import request from '@/utils/request'

// 综合
export function searchIndex(data) {
  return request({
    url: 'api/Search/index',
    method: 'get',
    params: data
  })
}
// 搜索-主播
export function searchAnchor(data) {
  return request({
    url: 'api/Search/anchor',
    method: 'get',
    params: data
  })
}

// 搜索-直播
export function searchLive(data) {
  return request({
    url: 'api/Search/live',
    method: 'get',
    params: data
  })
}

// 搜索-热门推荐
export function initialList(data) {
  return request({
    url: 'api/hot_match/initial_list',
    method: 'get',
    params: data
  })
}
