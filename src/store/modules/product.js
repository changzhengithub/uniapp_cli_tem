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
    // 获取商品分类列表
    async getProductCateApi({ commit, state }, data) {
      const res = await request({
        url: `/category`,
        method: 'GET',
        params: data
      })
      // 返回数据
      return res.data
    },
    // 获取商品列表
    async getProductListApi({ commit, state }, data) {
      const res = await request({
        url: `/seckill/list`,
        method: 'GET',
        params: data
      })
      // 返回数据
      return res.data
    },

    // 获取商品详情
    async getProductDetailApi({ commit, state }, { pid, data }) {
      const res = await request({
        url: `/seckill/detail/${pid}`,
        method: 'GET',
        params: data
      })
      // 返回数据
      return res.data
    },

    // 加入购物车
    async addCardApi({ commit, state }, data) {
      let res = await request({
        url: `/cart/add`,
        method: 'POST',
        data
      })
      // 返回数据
      return res.data
    },

    // 订单确认获取订单详细信息
    async orderConfirmApi({ commit, state }, data) {
      let res = await request({
        url: `/order/confirm`,
        method: 'POST',
        data
      })
      // 返回数据
      return res.data
    },

    // 创建订单
    async createOrderApi({ commit, state }, { key, data}) {
      let res = await request({
        url: `/order/create/${key}`,
        method: 'POST',
        data
      })
      // 返回数据
      return res.data
    },

    // 创建收银台
    async cashierOrderApi({ commit, state }, { orderId, type }) {
      let res = await request({
        url: `/order/cashier/${orderId}/${type}`,
        method: 'GET'
      })
      // 返回数据
      return res.data
    },
    
    // 订单支付
    async payOrderAPi({ commit, state }, data) {
      let res = await request({
        url: `/order/pay`,
        method: 'POST',
        data
      })
      // 返回数据
      return res.data
    },

    // 获取订单列表
    async getOrderListApi({ commit, state }, data) {
      let res = await request({
        url: `/order/list`,
        method: 'GET',
        params: data
      })
      // 返回数据
      return res.data
    },

    // 取消订单
    async cancelOrderApi({ commit, state }, data) {
      let res = await request({
        url: `/order/cancel`,
        method: 'POST',
        data
      })
      // 返回数据
      return res.data
    },

    // 订单收货
    async takeOrderApi({ commit, state }, data) {
      let res = await request({
        url: `/order/take`,
        method: 'POST',
        data
      })
      // 返回数据
      return res.data
    },

    // 订单详情
    async getOrderDetailApi({ commit, state }, id) {
      let res = await request({
        url: `/order/detail/${id}`,
        method: 'GET'
      })
      // 返回数据
      return res.data
    },

    // 申请退款
    async refundOrderApi({ commit, state }, {id, data}) {
      let res = await request({
        url: `/order/refund/apply/${id}`,
        method: 'POST',
        data
      })
      // 返回数据
      return res.data
    },

    // 退款原因
    async refundReasonApi({ commit, state }) {
      let res = await request({
        url: `/order/refund/reason`,
        method: 'GET'
      })
      // 返回数据
      return res.data
    },

    // 退款列表
    async getRefundListApi({ commit, state }, data) {
      let res = await request({
        url: `/order/refund/list`,
        method: 'GET',
        params: data
      })
      // 返回数据
      return res.data
    },

    // 获取物流信息
    async getExpressApi({ commit, state }, id) {
      let res = await request({
        url: `/order/express/${id}`,
        method: 'GET'
      })
      // 返回数据
      return res.data
    },
  }
}
