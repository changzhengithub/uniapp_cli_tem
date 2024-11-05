/**
 * author: cxx
 * @desc: 公共接口
 */
import request from '@/utils/request'

export default {
  // 命名空间
  namespaced: true,
  // 变量定义
  state: {
    // 账号信息
    accountInfo: {},
    // 活动配置信息
    activityConfig: {},
  },
  // 同步
  mutations: {
    setAccountObj(state, data) {
      state.accountInfo = data
    },
    setActivityConfig(state, data) {
      state.activityConfig = data
    },
  },
  // 异步
  actions: {
    // 查询活动的配置信息
    async getActivityConfigApi({ commit, state }, data) {
      const res = await request({
        url: `/app/theater/activity/config`,
        method: 'GET',
        params: data,
        loadMask: false
      })

      commit('setActivityConfig', res.data)
      // 返回数据
      return res.data
    }
  }
}
