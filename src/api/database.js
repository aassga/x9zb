// 资料库

import request from '@/utils/request'

// -------------------------------------获取篮球

// 获取球队列表
export function TeamData(data) {
  return request({
    url: 'api/Basketball_database/TeamData',
    method: 'get',
    params:data
  })
}

// 获取篮球积分排名
export function pointsRanking(data) {
  return request({
    url: 'api/Basketball_database/pointsRanking',
    method: 'get',
    params:data
  })
}


// 获取赛事详情
export function competitionInfo(data) {
  return request({
    url: 'api/Basketball_database/competitionInfo',
    method: 'get',
    params:data
  })
}

// 获取赛事列表 三级
export function tournamentList(data) {
  return request({
    url: 'api/Basketball_database/tournamentList',
    method: 'get',
    params:data
  })
}


// 获取国家 二级
export function getCountry(data) {
  return request({
    url: 'api/Basketball_database/getCountry',
    method: 'get',
    params:data
  })
}



// 获取赛事分类 一级
export function getCategory(data) {
  return request({
    url: 'api/Basketball_database/getCategory',
    method: 'get',
    params:data
  })
}


// 获取球员列表
export function teamMember(data) {
  return request({
    url: 'api/Basketball_database/teamMember',
    method: 'get',
    params:data
  })
}

// -----------------------------获取足球
// 获取球队列表
export function TeamData1(data) {
  return request({
    url: 'api/Football_database/TeamData',
    method: 'get',
    params:data
  })
}
// 获取球员列表
export function teamMember1(data) {
  return request({
    url: 'api/Football_database/teamMember',
    method: 'get',
    params:data
  })
}
// 获取足球三级列表
export function tournamentList1(data) {
  return request({
    url: 'api/Football_database/tournamentList',
    method: 'get',
    params:data
  })
}
// 获取足球详情
export function competitionInfo1(data) {
  return request({
    url: 'api/football_database/competitionInfo',
    method: 'get',
    params:data
  })
}

// 资料库热门/关注接口
export function popular(data) {
  return request({
    url: 'api/football_database/popular',
    method: 'get',
    params:data
  })
}

// 获取阶段列表
export function stage(data) {
  return request({
    url: 'api/Football_database/stage',
    method: 'get',
    params:data
  })
}

// 赛季积分
export function integral(data) {
  return request({
    url: 'api/Football_database/integral',
    method: 'get',
    params:data
  })
}
