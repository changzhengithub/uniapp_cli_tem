/**
 * @desc: 购物接口
 * @author: cxx
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
    // 获取商品列表
    async getProductListApi({ commit, state }, data) {
      const res = await request({
        url: `/product/list`,
        method: 'GET',
        params: data
      })
      // 返回数据
      return res.data
    }
  }
}
