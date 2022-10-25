// 前瞻
import request from '@/utils/request'

// 前瞻列表
export function getList(data) {
  return request({
    url: 'api/Foresight/index',
    method: 'get',
    params: data
  })
}

// 前瞻 情报（优劣势分析）
export function match_foresight(data) {
  return request({
    url: 'api/foresight/match_foresight',
    method: 'get',
    params: data
  })
}

// 前瞻比赛数据
export function match_analyze_data(data) {
  return request({
    url: 'api/foresight/match_analyze_data',
    method: 'get',
    params: data
  })
}