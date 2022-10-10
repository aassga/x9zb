import request from '@/utils/request'

// 篮球
export function getList(data) {
  return request({
    url: 'api/Basketball/getList',
    method: 'get',
    params: data
  })
}
// 篮球详情
export function getInfo(data) {
  return request({
    url: 'api/Basketball/getInfo',
    method: 'get',
    params: data
  })
}
// 篮球指数
export function getExponent(data) {
  return request({
    url: 'api/Basketball/exponent',
    method: 'get',
    params: data
  })
}
// 篮球指数详情
export function getExponentList(data) {
  return request({
    url: 'api/Basketball/getExponentList',
    method: 'get',
    params: data
  })
}

// 篮球球队统计
export function playerData(data) {
  return request({
    url: 'api/Basketball/playerData',
    method: 'get',
    params: data
  })
}

// 篮球分析
export function basketballAnalyze(data) {
  return request({
    url: 'api/Basketball_Analyze/info',
    method: 'get',
    params: data
  })
}