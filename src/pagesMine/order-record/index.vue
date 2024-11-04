<template>
  <view class="pages-order-record-index">
    <view class="index-wrap">
      <view class="wrap-tab">
        <view class="tab-item" :class="{'item-active': queryParams.type == item.type}" v-for="(item, index) in tabList" :key="index" @click="switchTab(index)">{{item.name}}</view>
      </view>
      <!-- 列表 -->
      <view class="wrap-list">
        <view class="list-item" v-for="(item, index) in productList" :key="index" @click="gotoOrderDetail(item)">
          <view class="item-header">
            <view class="header-no">订单：{{ item.order_id }}</view>
            <view class="header-status" v-if="item._status">
              <view class="status-item" v-if="item._status._type == 9">等待买家付款</view>
              <view class="status-item" v-if="item._status._type == 0">待付款</view>
              <view class="status-item" v-if="item._status._type == 1">
                待发货
                <text v-if="item.refund.length">，退款中</text>
              </view>
              <view class="status-item" v-if="item._status._type == 2">
                待收货
                <text v-if="item.refund.length">，退款中</text>
              </view>
              <view class="status-item" v-if="item._status._type == 3">
                已完成
                <text v-if="item.refund.length">，退款中</text>
              </view>
            </view>
          </view>
          <view class="item-detail" v-for="(cart, i) in item.cartInfo" :key="i">
            <view class="detail-picture">
              <image :src="cart.productInfo.image" mode="scaleToFill" />
            </view>
            <view class="detail-info">
              <view class="info-title">
                <view class="title-text u-line-1">{{cart.productInfo.store_name}}</view>
                <view class="title-price">￥{{ cart.productInfo.price }}</view>
              </view>
              <view class="info-size">
                <!-- <view class="size-text">共1000盒，还剩389盒 拷贝 2</view> -->
                <view class="size-num">×{{ item.total_num }}</view>
              </view>
            </view>
          </view>
          <view class="item-payment">
            <!-- <view class="payment-time">{{item._add_time}}</view> -->
            <text class="payment-text">实付款</text>
            <text class="payment-price">￥{{ item.pay_price }}</text>
          </view>
          <view class="item-more">
            <view class="more-btn" v-if="item._status._type == 2" @click.stop="gotoExpress(item)">查看物流</view>
            <view class="more-btn" v-if="item._status._type == 0" @click.stop="cancelOrder(item, index)">取消订单</view>
            <view class="more-btn btn-success" v-if="item._status._type == 0" @click.stop="payAgain(item)">立即付款</view>
            <view class="more-btn btn-success" v-if="item._status._type == 2" @click.stop="sureTake(item)">确认收货</view>
            <view class="more-btn" v-if="(item._status._type == 2 || item._status._type == 1) && !item.refund.length" @click.stop="gotoRefund(item)">申请退款</view>
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view class="wrap-empty" v-if="!productList.length">
        <u-empty mode="list"></u-empty>
      </view>

      <!-- 底部文字 -->
      <view class="wrap-base" v-if="productList.length && pagination.status == 'nomore'">
        <ts-base-text title="没有更多了"></ts-base-text>
      </view>
    </view>

    <!-- 底部上拉加载 -->
    <u-loadmore v-if="productList.length && pagination.status == 'loadmore'" height="80rpx" fontSize="14" :status="pagination.status"
      icon-type="flower" color="#ccc" />
  </view>
</template>

<script>
/**
 * @desc 我的订单
 * @author cxx
 * */

import { mapMutations, mapActions, mapState } from 'vuex'

import TsBaseText from '@/components/ts-base-text'
export default {
  name: 'HelpCate',
  components: {
    'ts-base-text': TsBaseText,
  },
  data() {
    return {
      topLoad: false,
      loading: false,

      // 查询参数
      queryParams: {
        page: 1,
        limit: 20,
        type: 9
      },
      tabActiveIndex: 0,
      tabList: [
        { name: '全部', type: 9 },
        { name: '待付款', type: 0 },
        { name: '待发货', type: 1 },
        { name: '待收货', type: 2 },
        { name: '已完成', type: 3 },
      ],
      productList: [],

      // 是否下拉刷新
      isFefresher: false,
      // 是否开启下拉刷新
      enabledRefresh: true,
      // 分页
      pagination: {
        count: 0,
        status: 'loadmore'
      }
    }
  },
  computed: {
    ...mapState({
      // 活动配置信息
      activityConfig: state => state.login.activityConfig,
      // 当前追剧操作
      chaseStore: state => state.common.chaseStore
    })
  },
  onLoad(options) {
    const { type } = options
    if (type) {
      this.queryParams.type = type
    }
    this.getProductList(true)
  },
  onShow() {
    // const pages = getCurrentPages()
    // const currentPage = pages[pages.length - 1]
    // const options = currentPage.options
    // const { type } = options
    // if (type) {
    //   this.queryParams.type = type
    // }
    this.getProductList(true)
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.pullRefresh()
  },
  // 滚动到底部
  onReachBottom() {
    // 触发加载
    this.pullUpLoadMore()
  },

  methods: {
    ...mapActions('product', ['getOrderListApi', 'cancelOrderApi', 'payOrderAPi', 'takeOrderApi', 'refundOrderApi']),

    // 切换tab
    switchTab(index) {
      if (this.queryParams.type == this.tabList[index].type) return
      this.queryParams.type = this.tabList[index].type
      this.getProductList(true)
    },

    // 获取猜你喜欢列表
    getProductList(flag) {
      // 重置数据，重新请求
      this.queryParams.page = 1
      this.pagination.count = 0
      this.pagination.status = 'loadmore'
      this._getList(flag)
    },

    /**
     * 获取视频列表
     * @param {Boolean} flag 是否重置列表，默认false不重置
     * */
    _getList(flag) {
      this.loading = true
      const params = {
        ...this.queryParams
      }
      // 请求接口
      this.getOrderListApi(params).then(data => {
        const list = data
        // 如果是刷新直接赋值，否则添加到列表中
        this.productList = this.isFefresher || flag ? list : [...this.productList, ...list]
        if (data.length < this.queryParams.limit) {
          this.pagination.status = 'nomore'
        } else {
          this.queryParams.page += 1
          this.pagination.status = 'loadmore'
        }
      }).finally(() => {
        this.loading = false
        // 结束下拉加载
        this.isFefresher = false
        // uni.stopPullDownRefresh()
      })
    },
    // 上拉加载更多
    pullUpLoadMore() {
      if (this.pagination.status == 'loadmore') {
        this._getList()
      }
    },

    // 下拉刷新
    pullRefresh() {
      // 开启下拉加载
      this.isFefresher = true
      this.getProductList(true)
    },
    // 是否禁用下拉刷新
    toggleRefresh(refresh) {
      this.enabledRefresh = refresh
    },

    // 支付
    payAgain(item) {
      const that = this
      const params = {
        uni: item.order_id,
        paytype: 'weixin',
        type: 0
      }
      this.payOrderAPi(params).then(data => {
        const { jsConfig } = data.result
        console.log(jsConfig)
        uni.requestPayment({
          provider: 'wxpay',
          timeStamp: jsConfig.timestamp,
          nonceStr: jsConfig.nonceStr,
          package: jsConfig.package,
          signType: jsConfig.signType,
          paySign: jsConfig.paySign,
          success(res) {
            console.log('支付成功', res)
            uni.showToast({
              title: '支付成功',
              icon: 'none',
              duration: 2000,
            })
            uni.navigateTo({
              url: `/pagesProduct/pay-result/index?orderId=${item.order_id}&type=success`
            })
          },
          fail(err) {
            console.log('取消支付', err)
            uni.showToast({
              title: '取消支付',
              icon: 'none',
              duration: 2000
            })
            uni.navigateTo({
              url: `/pagesProduct/pay-result/index?orderId=${item.order_id}&type=fail`
            })
          }
        })
      }).catch(err => {
        console.log('支付失败', err)
        uni.showToast({
          title: '支付失败',
          icon: 'none',
          duration: 2000
        })
      })
    },

    // 确认收货
    sureTake(item) {
      const that = this
      uni.showModal({
        title: '提示',
        content: '确认收货？',
        success: function (res) {
          if (res.confirm) {
            const params ={
              uni: item.order_id
            }
            that.takeOrderApi(params).then(data => {
              that.getProductList(true)
              uni.showToast({
                title: '操作成功',
                icon: 'none',
                duration: 2000
              })
            })
          }
        }
      })
    },

    // 取消订单
    cancelOrder(item, index) {
      const that = this
      uni.showModal({
        title: '提示',
        content: '确认取消该订单？',
        success: function (res) {
          if (res.confirm) {
            const params ={
              id: item.order_id
            }
            that.cancelOrderApi(params).then(data => {
              that.productList.splice(index, 1)
              uni.showToast({
                title: '取消成功',
                icon: 'none',
                duration: 2000
              })
            })
          }
        }
      })
    },

    // 申请退款
    gotoRefund(item) {
      uni.navigateTo({
        url: `/pagesProduct/refund/index?orderId=${item.order_id}`
      })
    },

    // 查看物流
    gotoExpress(item) {
      uni.navigateTo({
        url: `/pagesProduct/express/index?orderId=${item.order_id}`
      })
    },
    // 跳转到帮助详情
    gotoOrderDetail(item) {
      uni.navigateTo({
        url: `/pagesProduct/order-detail/index?orderId=${item.order_id}`
      })
    },

    // 页面跳转
    gotoPage(url) {
      uni.navigateTo({
        url
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pages-order-record-index {
  width: 100%;
  min-height: 100vh;
  background-color: #F3F3F3;

  .index-wrap {
    width: 100%;
    .wrap-tab {
      position: sticky;
      top: 0;
      z-index: 99;
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      height: 80rpx;
      padding: 0 30rpx;
      border-bottom: 1rpx solid #F3F3F3;
      background-color: #fff;

      .tab-item {
        position: relative;
        font-weight: 500;
        font-size: 28rpx;
        color: #999999;
        line-height: 72rpx;

        &.item-active {
          font-weight: bold;
          color: #333;

          &::after {
            position: absolute;
            left: 50%;
            bottom: 8rpx;
            z-index: 9;
            display: block;
            content: "";
            width: 36rpx;
            height: 4rpx;
            background-color: #09BB07;
            border-radius: 2rpx;
            transform: translateX(-50%);
          }
        }
      }
    }

    .wrap-list {
      width: 100%;
      padding: 24rpx;

      .list-item {
        width: 100%;
        padding: 0 28rpx 30rpx 28rpx;
        margin-bottom: 24rpx;
        background-color: #fff;
        border-radius: 20rpx;
        
        .item-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: 74rpx;
          font-weight: 500;
          font-size: 24rpx;
          color: #333;
        }
        .item-detail {
          display: flex;
          width: 100%;
          margin-bottom: 10rpx;
          .detail-picture {
            width: 154rpx;
            height: 154rpx;
            image {
              display: block;
              width: 100%;
              height: 100%;
              border-radius: 14rpx;
            }
          }
          .detail-info {
            flex: 1;
            margin-left: 24rpx;
            overflow: hidden;
            .info-title {
              display: flex;
              align-items: center;
              width: 100%;
              overflow: hidden;
              .title-text {
                flex: 1;
                font-weight: bold;
                font-size: 30rpx;
                color: #333333;
                line-height: 58rpx;
              }
              .title-price {
                font-weight: bold;
                font-size: 30rpx;
                color: #FF592C;
                line-height: 40rpx;
              }
            }
            .info-size {
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 100%;
              .size-text {
                font-weight: 500;
                font-size: 24rpx;
                color: #333333;
                line-height: 48rpx;
              }
              .size-num {
                font-weight: 500;
                font-size: 24rpx;
                color: #999999;
              }
            }
          }
        }
        .item-payment {
          // display: flex;
          // align-items: center;
          width: 100%;
          margin-bottom: 10rpx;
          text-align: right;
          font-weight: 500;
          font-size: 24rpx;
          line-height: 28rpx;
          .payment-time {
            flex: 1;
            color: #999;
            text-align: left;
          }
          .payment-text {
            color: #999;
          }
          .payment-price {
            color: #333;
          }
        }
     
        .item-more {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          width: 100%;
          .more-btn {
            height: 56rpx;
            padding: 0 24rpx;
            margin-left: 12rpx;
            font-weight: 500;
            font-size: 24rpx;
            color: #000;
            line-height: 56rpx;
            border-radius: 28rpx;
            border: 1rpx solid #999;

            &.btn-success {
              color: #fff;
              background-color: #09BB07;
              border: 1rpx solid #09BB07;
            }
          }
        }

      }
    }

    .wrap-empty {
      width: 100%;
      padding-top: 200rpx;
    }

    .wrap-base {
      margin-top: 120rpx;
    }
  }
}
</style>