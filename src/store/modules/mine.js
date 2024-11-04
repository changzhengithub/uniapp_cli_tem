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
    // 获取地址列表
    async getAddressListApi({ commit, state }, data) {
      let res = await request({
        url: `/address/list`,
        method: 'GET',
        params: data
      })
      // 返回数据
      return res.data
    },

    // 添加编辑地址
    async editAddressAPi({ commit, state }, data) {
      let res = await request({
        url: `/address/edit`,
        method: 'POST',
        data
      })
      // 返回数据
      return res.data
    },

    // 获取单个地址
    async getAddressDetailApi({ commit, state }, id) {
      const res = await request({
        url: `/address/detail/${id}`,
        method: 'GET'
      })
      // 返回数据
      return res.data
    },

    // 获取默认地址
    async getDefaultAddressApi({ commit, state }, id) {
      const res = await request({
        url: `/address/default`,
        method: 'GET'
      })
      // 返回数据
      return res.data
    },

    // 删除地址
    async delAddressAPi({ commit, state }, data) {
      let res = await request({
        url: `/address/del`,
        method: 'POST',
        data
      })
      // 返回数据
      return res.data
    },

    // 获取城市列表
    async getCityListApi({ commit, state }, data) {
      const res = await request({
        url: `/city_list`,
        method: 'GET',
        params: data
      })
      // 返回数据
      return res.data
    },

    // 获取商品列表
    async getProductListApi({ commit, state }, data) {
      const res = await request({
        url: `/products`,
        method: 'GET',
        params: data
      })
      // 返回数据
      return res.data
    },

    // 获取订单列表
    async getOrderListApi({ commit, state }, data) {
      let res = await request({
        url: `/app/product/page`,
        method: 'GET',
        params: data
      })
      // 返回数据
      return res.data
    }
  }
}
