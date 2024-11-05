/**
 * @desc: 订单接口
 * @author: cxx
 */

import request from '@/utils/request'

// 获取列表
export function orderListApi(data) {
  return request({
    url: '/order/page',
    method: 'GET',
    data
  })
}