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
    // 商品类别
    // productType: {},
    // 订单状态
    exchangeOrderStatus: {},
    // 账号信息
    accountInfo: {},
    // 活动配置信息
    activityConfig: {},
  },
  // 同步
  mutations: {
    // 设置商品类别
    // setproductType(state, data) {
    //   state.productType = data
    // },
    // 设置订单状态
    setexchangeOrderStatus(state, data) {
      state.exchangeOrderStatus = data
    },
    setAccountObj(state, data) {
      state.accountInfo = data
    },
    setActivityConfig(state, data) {
      state.activityConfig = data
    },
  },
  // 异步
  actions: {
    // 根据类别查询字典对应数据
    async getDictDataByType({ commit, state }, type) {
      console.log('getDictData data ==== ', type)
      // 判断是否已经缓存过数据(product_type)专程驼峰productType 对应state中变量的值，这样不需要每次发接口请求
      let cameType = uni.$Ts.getCamelize(type)
      // console.log('cameType ==== ', cameType);
      // console.log('state[cameType] === ', uni.$Ts.isEmpty(state[cameType]));
      if (!uni.$Ts.isEmpty(state[cameType])) {
        return state[cameType]
      } else {
        // 发送请求接口数据
        let res = await request({
          url: `/system/dict-data/type/${type}`,
          method: 'GET'
        })
        //
        let data = res.data || []
        console.log('dictData res ======', data)
        // 提交缓存
        commit(`set${cameType}`, data)
        //
        return data
      }
    },
    // 查询充值列表
    async getRechargeListApi({ commit, state }, data) {
      // 发送请求接口数据
      let res = await request({
        url: '/app/trade/billing-plan',
        method: 'GET',
        params: data
      })
      return res.data
    },
    // 查询用户账户信息
    async getAccountApi({ commit, state }, loadMask = true) {
      // 发送请求接口数据
      let res = await request({
        url: '/app/account/query',
        method: 'GET',
        loadMask
      })
      commit('setAccountObj', res.data)
      return res.data
    },
    // 上报广告
    async reportAdApi({ commit, state }, payload) {
      // 发送请求接口数据
      let res = await request({
        url: '/app/ad/watch',
        method: 'POST',
        data: payload
      })
      return res.data
    },

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
    },

    // 追剧
    async chaseBingeWatchApi({ commit, state }, data) {
      const res = await request({
        url: `/app/binge-watch/binge`,
        method: 'POST',
        params: data,
        loadMask: false
      })
      // 返回数据
      return res.data
    },

    // 取消追剧
    async chaseUnBingeWatchApi({ commit, state }, data) {
      const res = await request({
        url: `/app/binge-watch/unbinge`,
        method: 'POST',
        params: data,
        loadMask: false
      })
      // 返回数据
      return res.data
    },

    // 喜欢
    async favoriteEpisodeApi({ commit, state }, data) {
      const res = await request({
        url: `/app/favorite-episode/like`,
        method: 'POST',
        params: data,
        loadMask: false
      })
      // 返回数据
      return res.data
    },

    // 不喜欢
    async unFavoriteEpisodeApi({ commit, state }, data) {
      const res = await request({
        url: `/app/favorite-episode/dislike`,
        method: 'POST',
        params: data,
        loadMask: false
      })
      // 返回数据
      return res.data
    }

  }
}
