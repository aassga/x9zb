import request from '@/utils/request'

// 足球
export function football_match(data) {
  return request({
    url: 'api/Football/football_match',
    method: 'post',
    data
  })
}
// 足球详情
export function getfootballDetail(data) {
  return request({
    url: 'api/Football/football_match_detail',
    method: 'get',
    params: data
  })
}
// 足球阵容
export function getSquad(data) {
  return request({
    url: 'api/Football/football_match_lineup',
    method: 'get',
    params: data
  })
}
// 足球指数列表
export function footballOddsList(data) {
  return request({
    url: 'api/Football/football_odds_history',
    method: 'get',
    params: data
  })
}
// 足球指数详情
export function footballOddsDetail(data) {
  return request({
    url: 'api/Football/football_odds_history_detail',
    method: 'get',
    params: data
  })
}

// 足球公司列表
export function exponent_company(data) {
  return request({
    url: 'api/Football/exponent_company',
    method: 'get',
    params: data
  })
}

// 足球筛选
export function match_filter(data) {
  return request({
    url: 'api/Football/match_filter',
    method: 'get',
    params: data
  })
}

// 分析
export function getAnalyze(data) {
  return request({
    url: 'api/Football_Analyze/info',
    method: 'get',
    params: data
  })
}

// 分析-历史交锋
export function match_vs_list(data) {
  return request({
    url: 'api/Football_Analyze/match_vs_list',
    method: 'get',
    params: data
  })
}

// 分析-主/客队近况
export function getmatch_list(data) {
  return request({
    url: 'api/Football_Analyze/match_list',
    method: 'get',
    params: data
  })
}