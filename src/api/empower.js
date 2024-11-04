/**
 * @desc: 授权接口
 * @author: cxx
 */

import request from '@/utils/request'

// 登录
export function loginApi(data) {
  return request({
    url: '/auth/login',
    method: 'POST',
    data
  })
}

// 获取用户信息
export function userInfoApi(data) {
  return request({
    url: '/user/info',
    method: 'GET',
    data
  })
}

// 发送验证码
export function sendCodeApi(data) {
  return request({
    url: '/user/sendCode',
    method: 'POST',
    data
  })
}

// 登出
export function logoutApi(data) {
  return request({
    url: '/auth/logout',
    method: 'POST',
    data
  })
}