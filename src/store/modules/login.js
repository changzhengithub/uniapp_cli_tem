/**
 * @desc: 登录接口
 * @author: chengsong
 */
import request from '@/utils/request'
import { loginApi, userInfoApi, logoutApi } from '@/api/empower'

export default {
  // 命名空间
  namespaced: true,
  // 变量定义
  state: {
    userInfo: {}, // 用户信息
    appConfig: {}, // 小程序配置信息
    token: ''
  },
  mutations: {
    // 设置用户信息
    setUserInfo(state, data) {
      state.userInfo = data
    },
    // 设置token
    setToken(state, data) {
      state.token = data
    },
    // 设置小程序配置信息
    setAppConfig(state, data) {
      state.appConfig = data
    }
  },
  actions: {
    /**
     * 手机号登录
     * 在用户首次进入的页面来调用
     * */
    loginHandle({ dispatch, commit, state }, data) {
      return new Promise((resolve, reject) => {
        const token = uni.getStorageSync('token')
        if (token) {
          commit('setToken', token)
          // 获取用户信息
          dispatch('getUserInfoApi')
          resolve(token)
        } else {
          uni.login({
            success(res) {
              console.log('微信login成功', res)
              // 获取设备信息
              const params = {
                code: res.code,
								...data
              }
              // 调用登录接口
              loginApi(params)
                .then(res => {
                  console.log('登录成功', res)
                  const { token } = res.data
                  // 缓存token
                  uni.setStorageSync('token', token)
                  commit('setToken', token)

                  // 获取用户信息
                  dispatch('getUserInfoApi')
                  resolve(res)
                })
                .catch(err => {
                  console.log('登录失败', err)
                  reject(err)
                })
            },
            fail(err) {
              console.log('抖音login失败', err.errMsg)
              reject(err)
            }
          })
        }
      })
    },

    // 获取用户信息
    async getUserInfoApi({ commit, state }) {
      const res = await userInfoApi()
      const data = res.data
      console.log('用户信息：', data)
      uni.setStorageSync('userInfo', data)
      commit('setUserInfo', data)
      // 返回数据
      return res.data
    },

    // 退出登录
    async submitLogoutApi({ commit, state }) {
      const res = logoutApi()
      uni.clearStorageSync()
      commit('setUserInfo', {})
      commit('setToken', '')
      // 返回数据
      return res.data
    },

    // 获取token
    async getConfigToken({ dispatch, commit, state }) {
      const token = uni.getStorageSync('token')
      commit('setToken', token)
      if (token) {
        // 获取用户信息
        dispatch('getUserInfoApi')
      }
    }
  }
}
