/**
 * author: 
 * @desc: 首页接口
 */
import request from '@/utils/request'

export default {
  // 命名空间
  namespaced: true,
  // 变量定义
  state: {},
  // 同步
  mutations: {},
  // 异步
  actions: {
    // 获取捐赠列表
    async donateListApi({ commit, state }, data) {
      const res = await request({
        url: `/donate/getList`,
        method: 'GEt',
        params: data
      })
      // 返回数据
      return res.data
    },

    // 捐赠详情列表
    async getDetailListApi({ commit, state }, data) {
      const res = await request({
        url: `/donate/getDetailList`,
        method: 'GET',
        params: data
      })
      // 返回数据
      return res.data
    },

    // 捐赠详情的详情
    async donateDetailRecordApi({ commit, state }, data) {
      const res = await request({
        url: `/donate/donateDetailRecord`,
        method: 'GET',
        params: data
      })
      // 返回数据
      return res.data
    },

    // 捐钱操作
    async doDonateApi({ commit, state }, data) {
      let res = await request({
        url: `/donate/doDonate`,
        method: 'POST',
        header: {
          'pay-type': 'goods'
        },
        data
      })
      // 返回数据
      return res.data
    },

    // 捐赠记录详情
    async getDonateRecordDetailApi({ commit, state }, data) {
      let res = await request({
        url: `/donate/getDonateRecordDetail`,
        method: 'GET',
        params: data
      })
      // 返回数据
      return res.data
    },

    // 捐赠记录列表
    async donateRecordListApi({ commit, state }, data) {
      const res = await request({
        url: `/donate/donateRecordList`,
        method: 'GET',
        params: data
      })
      // 返回数据
      return res.data
    },


    // 困难求助列表
    async difficultyHelpListApi({ commit, state }, data) {
      const res = await request({
        url: `/donate/difficultyHelpList`,
        method: 'GET',
        params: data
      })
      // 返回数据
      return res.data
    },

    // 发起困难求助
    async createDifficultyHelpApi({ commit, state }, data) {
      let res = await request({
        url: `/donate/operateDifficultyHelp`,
        method: 'POST',
        data
      })
      // 返回数据
      return res.data
    },

    // 删除困难求助
    async deleteDifficultyHelpApi({ commit, state }, data) {
      let res = await request({
        url: `/donate/delDifficultyHelp`,
        method: 'POST',
        data
      })
      // 返回数据
      return res.data
    },

    // 获取文章分类列表
    async getArticleCateListApi({ commit, state }, data) {
      const res = await request({
        url: `/article/category/list`,
        method: 'GET',
        params: data
      })
      // 返回数据
      return res.data
    },

    // 获取文章列表
    async getArticleListApi({ commit, state }, {cid, data}) {
      const res = await request({
        url: `/article/list/${cid}`,
        method: 'GET',
        params: data
      })
      // 返回数据
      return res.data
    },

    // 获取文章详情
    async getArticleDetailApi({ commit, state }, id) {
      const res = await request({
        url: `/article/details/${id}`,
        method: 'GET'
      })
      // 返回数据
      return res.data
    }
  }
}
