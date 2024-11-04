/**
 * @desc: 首页接口
 * @author: cxx
 */

import request from '@/utils/request'

// 获取列表
export function homeListApi(data) {
  return request({
    url: '/home/page',
    method: 'GET',
    data
  })
}

// 获取详情
export function detailApi(data) {
  return request({
    url: '/home/detail',
    method: 'GET',
    data
  })
}