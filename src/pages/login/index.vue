<template>
  <view class="pages-login-index">
    <view class="index-header">
      <view class="header-title">欢迎登录</view>
      <view class="header-text">未注册手机号验证后即完成注册</view>
    </view>

    <view class="index-form">
      <view class="form-item">
        <u--input v-model="phoneNumber" type="number" placeholder="请输入手机号" border="none"></u--input>
      </view>
      <view class="form-item">
        <u--input v-model="smsCode" type="number" placeholder="请输入验证码" border="none"></u--input>
        <view class="item-code">
          <u-code :seconds="60" ref="uCode" startText="获取验证码" @change="codeChange"></u-code>
          <u--text type="success" :text="tips" @click="getSmsCode"></u--text>
        </view>
      </view>
    </view>
    
    <view class="index-btn">
      <u-button type="success" text="立即登录" color="#09BB07" @click="submitLogin"></u-button>
    </view>

    <!-- <view class="index-protocol">
      <u-checkbox-group>
        <u-checkbox v-model="approveFlag" activeColor="#09BB07" @change="checkboxChange" />
      </u-checkbox-group>
      <text>我已阅读并同意《用户协议》和《隐私政策》</text>
    </view> -->
  
  </view>
</template>

<script>
/**
 * @desc 登录
 * @author cxx
 * */ 
import { mapActions } from 'vuex'
import { sendCodeApi } from '@/api/empower'
export default {
  data() {
    return {
      phoneNumber: '17765365213',
      smsCode: '1234',
      approveFlag: false,
      tips: '',
      wxCode: '',
    };
  },
  onLoad() {
    // this.getWxCode()
  },
  methods: {
    ...mapActions('login', ['loginHandle']),

    // 微信登录
    getWxCode() {
      const that = this
      uni.login({
        success(res){
          const { code } = res;
          that.wxCode = code
        }
      })
    },

    // 发送验证码
    getSmsCode() {
      if (uni.$u.test.mobile(this.phoneNumber)) {
        this.getCodeApi()
      } else {
        uni.showToast({
          title: '请输入正确的手机号',
          icon: 'none',
          duration: 2000,
        })
      }
    },

    // 验证码发送
    getCodeApi() {
      const params = {
        phone: this.phoneNumber
      }
      this.sendCodeApi(params).then(res => {
        this.$refs.uCode.start()
        const data = res.data
        console.log(data)
        uni.showToast({
          title: '短信发送成功',
          icon: 'none'
        })
      })
    },

    codeChange(text) {
      this.tips = text;
    },
    checkboxChange() {
      this.approveFlag = !this.approveFlag;
    },

    // 手机号验证码登录
    async submitLogin() {
      if (!this.phoneNumber) {
        uni.showToast({
          title: '请输入正确的手机号',
          icon: 'none',
          duration: 2000,
        })
        return
      }
      if (!this.smsCode) {
        uni.showToast({
          title: '请输入验证码',
          icon: 'none',
          duration: 2000,
        })
        return
      }
      // if (!this.approveFlag) {
      //   uni.showToast({
      //     title: '请先阅读并同意协议',
      //     icon: 'none',
      //     duration: 2000,
      //   })
      //   return
      // }
      const params = {
        phone: this.phoneNumber,
        captcha: this.smsCode
      }
      this.loginHandle(params).then(res => {
        uni.showToast({
          title: '登录成功',
          icon: 'none',
          duration: 2000,
          complete: function() {
            uni.navigateBack()
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pages-login-index {
  width: 100%;
  height: 100vh;
  padding: 60rpx 60rpx 0 60rpx;
  background-color: #fff;
  .index-header {
    width: 100%;
    margin-bottom: 60rpx;
    .header-title {
      width: 100%;
      font-weight: bold;
      font-size: 56rpx;
      color: #333333;
      line-height: 80rpx;
    }
    .header-text {
      width: 100%;
      font-weight: 500;
      font-size: 28rpx;
      color: #999999;
      line-height: 40rpx;
    }
  }
  .index-form {
    width: 100%;
    margin-bottom: 90rpx;
    .form-item {
      display: flex;
      align-items: center;
      width: 100%;
      height: 86rpx;
      padding: 0 20rpx;
      margin-bottom: 24rpx;
      border: 1rpx solid #DBDBDB;
      border-radius: 10rpx;
      input {
        flex: 1;
        height: 100%;
        outline: none;
        border: none;
      }
    }
  }

  .index-btn {
    width: 100%;
    margin-bottom: 180rpx;
  }
  .index-weixin {
    width: 100%;
    .weixin-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100rpx;
      margin: 0 auto;
      font-weight: 500;
      font-size: 24rpx;
      color: #999999;
      line-height: 28rpx;
      image {
        width: 93rpx;
        height: 93rpx;
        margin-bottom: 24rpx;
      }
    }
  }
  .index-info {
    width: 100%;
    .info-item {
      margin-bottom: 40rpx;
      font-size: 28rpx;
      color: #333;
      line-height: 48rpx;
    }
  }
  .index-protocol {
    position: fixed;
    bottom: 100rpx;
    left: 0;
    z-index: 9;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-weight: 500;
    font-size: 24rpx;
    color: #999999;
    line-height: 28rpx;
  }
}
</style>
