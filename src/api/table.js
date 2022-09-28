import request from '@/utils/request'

export function lfetchList(query) {
  return request({
    url: '/table/list',
    method: 'get',
    params: query
  })
}

export function createCourse(query) {
  return request({
    url: '/table/create',
    method: 'post',
    data
  })
}

export function updateCourse(query) {
  return request({
    url: '/table/update',
    method: 'post',
    data
  })
}