import request from '@/utils/request'

// 赛事分类（赛程）
export function scheduleMatch(data) {
  return request({
    url: 'api/hot_match/schedule_match',
    method: 'get',
    params:data
  })
}


// 比赛分析（首页）
export function match_battle(data) {
  return request({
    url: 'api/hot_match/match_battle',
    method: 'get',
    params:data
  })
}




// 赛事列表（赛程）
export function scheduleList(data) {
  return request({
    url: 'api/hot_match/schedule',
    method: 'get',
    params:data
  })
}

// 平台主播排行榜
export function LeaderboardAnchor(data) {
  return request({
    url: 'api/Leaderboard/anchor',
    method: 'get',
    params:data
  })
}
// 平台豪气排行榜	
export function LeaderboardUser(data) {
  return request({
    url: 'api/Leaderboard/user',
    method: 'get',
    params:data
  })
}


