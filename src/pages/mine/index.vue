<template>
  <view class="pages-mine-index">
    <view class="index-header" @click="gotoPage('/pagesMine/user-detail/index')">
      <view class="header-avatar">
        <u-avatar :src="userInfo.avatar" size="54"></u-avatar>
      </view>
      <view class="header-info">
        <view class="info-name">{{token ? userInfo.nickname : '登录/注册'}}</view>
        <view class="info-text">{{token ? userInfo.record_phone : '发送更多精彩~'}}</view>
      </view>
      <view class="header-arrow">
        <u-icon name="arrow-right" color="#fff" size="22"></u-icon>
      </view>
    </view>
    <view class="index-wrap">
      <view class="wrap-order">
        <view class="order-header" @click="gotoPage('/pagesProduct/order-record/index')">
          <view class="header-title">我的订单</view>
          <view class="header-more">
            <text>查看全部</text>
            <u-icon name="arrow-right" color="#999" size="18"></u-icon>
          </view>
        </view>
        <view class="order-grid">
          <view class="grid-cell" v-for="(item, index) in tabList" :key="index" @click="gotoOrderCenter(item)">
            <view class="cell-icon">
              <image :src="`/static/images/mine/order0${index + 1}.png`" mode="scaleToFill" />
            </view>
            <view class="cell-text">{{item.name}}</view>
          </view>
        </view>
      </view>
      <view class="wrap-option">
        <view class="option-cell" @click="gotoPage('/pagesMine/user-detail/index')">
          <view class="cell-icon">
            <u-icon name="map" color="#333" size="22"></u-icon>
          </view>
          <view class="cell-text">用户信息</view>
          <view class="cell-arrow">
            <u-icon name="arrow-right" color="#999" size="18"></u-icon>
          </view>
        </view>
        <view class="option-cell" @click="gotoPage('/pagesMine/about/index')">
          <view class="cell-icon">
            <u-icon name="order" color="#333" size="22"></u-icon>
          </view>
          <view class="cell-text">关于我们</view>
          <view class="cell-arrow">
            <u-icon name="arrow-right" color="#999" size="18"></u-icon>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
/**
 * @desc 我的页面
 * @author chengsong
 * */
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      tabList: [
        { name: '待付款', type: 0 },
        { name: '待发货', type: 1 },
        { name: '待收货', type: 2 },
        { name: '已完成', type: 3 },
      ],

      // 追剧列表
      chaseList: [],
      // 登录弹窗
      loginPopup: {
        show: false
      }
    }
  },
  computed: {
    ...mapState({
      token: state => state.login.token,
      userInfo: state => state.login.userInfo
    })
  },
  onLoad() {
    // 获取账户信息
    // this.getUserInfoApi()
  },
  methods: {
    ...mapActions('login', ['getUserInfoApi']),

    toLogin() {
      uni.navigateTo({
        url: '/pages/login/index'
      })
    },

    // 跳转到订单中心
    gotoOrderCenter(item) {
      if (this.token) {
        uni.navigateTo({
          url: `/pagesProduct/order-record/index?type=${item.type}`
        })
      } else {
        this.toLogin()
      }
    },

    gotoPage(url) {
      if (this.token) {
        uni.navigateTo({
          url
        })
      } else {
        this.toLogin()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pages-mine-index {
  width: 100%;
  min-height: 100vh;
  background-color: #f1f1f1;
  .index-header {
    display: flex;
    align-items: center;
    width: 100%;
    height: 240rpx;
    padding: 54rpx 30rpx 44rpx 30rpx;
    background-color: #09BB07;
    overflow: hidden;
    .header-info {
      flex: 1;
      margin-left: 20rpx;
      .info-name {
        font-weight: bold;
        font-size: 36rpx;
        color: #FFFFFF;
        line-height: 56rpx;
      }
      .info-text {
        font-weight: bold;
        font-size: 26rpx;
        color: #FFFFFF;
        line-height: 28rpx;
      }
    }
  }
  .index-wrap {
    width: 100%;
    margin-top: -44rpx;
    padding: 0 24rpx;
    .wrap-order {
      width: 100%;
      padding: 0 16rpx;
      margin-bottom: 24rpx;
      border-radius: 20rpx;
      background-color: #fff;
      .order-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 88rpx;
        border-bottom: 1rpx solid #eee;
        .header-title {
          font-weight: bold;
          font-size: 30rpx;
          color: #333333;
        }
        .header-more {
          display: flex;
          align-items: center;
          font-weight: 500;
          font-size: 24rpx;
          color: #999999;
        }
      }
      .order-grid {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        height: 164rpx;
        .grid-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .cell-icon {
            width: 44rpx;
            height: 44rpx;
            margin-bottom: 14rpx;
            image {
              width: 100%;
              height: 100%;
            }
          }
          .cell-text {
            font-weight: 500;
            font-size: 26rpx;
            color: #333333;
            line-height: 30rpx;
          }
        }
      }
    }
    .wrap-option {
      width: 100%;
      padding: 0 16rpx;
      margin-bottom: 24rpx;
      border-radius: 20rpx;
      background-color: #fff;
      .option-cell {
        display: flex;
        align-items: center;
        width: 100%;
        height: 108rpx;
        border-bottom: 1rpx solid #eee;
        .cell-text {
          flex: 1;
          margin-left: 10rpx;
          font-weight: bold;
          font-size: 30rpx;
          color: #333333;
        }

        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>