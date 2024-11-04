<template>
  <view class="pages-seek-help-index">
    <view class="index-cell">
      <view class="cell-item">
        <view class="item-label">头像</view>
        <view class="item-value">
          <u-avatar :src="userInfo.avatar"></u-avatar>
        </view>
      </view>
      <view class="cell-item">
        <view class="item-label">昵称</view>
        <view class="item-value">{{ userInfo.nickname }}</view>
      </view>
      <view class="cell-item">
        <view class="item-label">手机号</view>
        <view class="item-value">{{ userInfo.cellPhone }}</view>
      </view>
    </view>

    <view class="index-submit">
      <view class="submit-btn" @click="submitLogout">退出登录</view>
    </view>

  </view>
</template>

<script>
/**
 * @desc 用户详情
 * @author cxx
 * */

import { mapActions, mapState } from 'vuex'
export default {
  name: 'UserDetail',
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.login.userInfo
    })
  },
  methods: {
    ...mapActions('login', ['submitLogoutApi']),

    // 退出登录
    submitLogout() {
      const that = this
      uni.showModal({
        title: '提示',
        content: '确认退出登录吗？',
        success: function (res) {
          if (res.confirm) {
            that.submitLogoutApi().then(data => {
              uni.showToast({
                title: '退出成功',
                icon: 'none',
                duration: 2000,
                complete: function() {
                  uni.navigateBack()
                }
              })
            })
          }
        }
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
.pages-seek-help-index {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 30rpx 24rpx 130rpx 24rpx;
  height: 100vh;
  background-color: #F6F6F6;
  .index-cell {
    width: 100%;
    padding: 0 24rpx;
    margin-bottom: 120rpx;
    background-color: #fff;
    border-radius: 10rpx;
    .cell-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 127rpx;
      font-weight: 500;
      font-size: 30rpx;
      color: #333333;
      border-bottom: 1rpx solid #eee;
      &:last-of-type {
        border-bottom: none;
      }
    }
  }
  .index-submit {
    width: 100%;
    padding: 0 200rpx;
    
    .submit-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 84rpx;
      font-weight: bold;
      font-size: 32rpx;
      color: #FFFFFF;
      background-color: #09BB07;
      border-radius: 42rpx;
    }
  }
}
</style>