/**
 * @desc: 全局状态管理
 */
export default {
  namespaced: true,
  state: {
    systemInfo: {}, // 系统信息
    appId: '', // 小程序APPID
    // 导航栏信息
    navbarInfo: {
      statusBarHeight: 54, // 状态栏高度
      navHeight: 51, // 标题栏高度
      safeTop: 105 // 导航栏整体高度
    },
    adInstance: null // 全局广告实例
  },

  mutations: {
    // 设置userId
    setAppId(state, data) {
      state.appId = data
    },
    // 设置导航栏信息
    setNavBarInfo(state, data) {
      state.navbarInfo = data
    },
    // 设置系统信息
    setSystemInfo(state, data) {
      state.systemInfo = data
    },
    // 全局广告实例
    setAdInstance(state, data) {
      state.adInstance = data
    }
  },
  actions: {
    // 获取导航栏信息
    getNavbarInfo({ commit, state }) {
      const navbarInfo = uni.$Ts.getTop()
      commit('setNavBarInfo', navbarInfo)
    },

    // 获取appId
    getAppId({ commit, state }) {
      const appInfo = uni.$Ts.getEnvInfoSync()
      console.log('小程序信息：', appInfo)
      commit('setAppId', appInfo.microapp.appId)
    },

    // 获取系统设备信息
    getSystemInfo({ commit, state }) {
      const systemInfo = uni.$Ts.getSystemInfoSync()
      commit('setSystemInfo', systemInfo)
    },

    initVideoAd({ commit, state }) {
      const adInstance = uni.createRewardedVideoAd({
        adUnitId: process.env.VUE_APP_UNIT_ID
      })
      commit('setAdInstance', adInstance)
    }
  }
}
