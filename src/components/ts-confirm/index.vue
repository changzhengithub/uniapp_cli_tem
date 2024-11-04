<template>
  <!-- 二次确认弹出框 -->
  <u-popup :show="show" mode="center" :round="24" :zIndex="zIndex" bgColor="transparent" :safeAreaInsetBottom="false" :overlay="overlay">
    <view class="ts-pupup-pannel-cls" :style="{ background: bgColor }">
      <view class="scope-close">
        <u-icon v-if="closeable" name="close" color="#C9CDD2" size="22" @click="closeDialog"></u-icon>
      </view>
      <view class="scope-container">
        <view class="container-icon" v-if="icon">
          <image :src="icon" mode="widthFix" />
        </view>
        <slot name="content">
          <view class="container-title" v-if="title">
            <text>{{ title }}</text>
          </view>
          <view class="container-text" v-if="content">
            <text>{{ content }}</text>
          </view>
        </slot>
        <view class="container-footer">
          <view class="footer-btn btn-cancle" v-if="showCancelButton" @click="closeDialog">{{cancelText ? cancelText : '取消'}}</view>
          <view class="footer-btn" v-if="showConfirmButton" @click="confirmDialog"> {{confirmText ? confirmText : '确认'}} </view>
        </view>
      </view>
    </view>
  </u-popup>
</template>
<script>
/**
 * @desc 自定义二次确认弹窗-公共组件
 * @param {String} title 提示标题
 * @param {String} content 提示文本
 * @param {Number|String} zIndex 层级
 * @param {String} bgColor 背景色
 * @param {String} icon 顶部小图标，通过require引入require('@/..')
 * @param {String} cancelText 取消按钮
 * @param {String} confirmText 确认按钮
 * @param {Boolean} showCancelButton 是否显示取消按钮
 * @param {Boolean} showConfirmButton 是否显示确认按钮
 * @param {Boolean} closeable 是否显示关闭图标
 * @param {Boolean} overlay 是否显示遮罩层
 * @callback close 取消
 * @callback confirm 确认
 * @author
 * @example <ts-confirm :show="confirmPopup.show" title="提示" content="内容文本" @close="closePopup" @confirm="confirmPopup"></ts-confirm>
 * */

export default {
  name: 'TsConfirm',
  props: {
    show: {
      type: Boolean
    },
    // 提示标题
    title: {
      type: String
    },
    // 提示文本
    content: {
      type: String
    },
    zIndex: {
      type: [Number, String],
      default: 10075
    },
    bgColor: {
      type: String,
      default: '#FFF'
    },
    icon: {
      type: String
    },
    // 取消按钮
    cancelText: {
      type: String
    },
    // 确认按钮
    confirmText: {
      type: String
    },
    // 是否显示取消按钮
    showCancelButton: {
      type: Boolean,
      default: true
    },
    // 是否显示确认按钮
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    // 是否显示关闭图标
    closeable: {
      type: Boolean
    },
    // 是否显示遮罩
    overlay: {
      type: Boolean
    }
  },
  data() {
    return {}
  },

  methods: {
    // 关闭回调
    closeDialog() {
      this.$emit('close')
    },
    // 确认回调
    confirmDialog() {
      this.$emit('confirm')
    }
  }
}
</script>
<style scoped lang="scss">
// 弹窗样式
.ts-pupup-pannel-cls {
  position: relative;
  width: 620rpx;
  padding: 48rpx 48rpx;
  border-radius: 24rpx;
  // background-color: #fff;
  box-sizing: border-box;
  // 确认授权弹窗样式
  .scope-container {
    width: 100%;
    .container-icon {
      width: 180rpx;
      margin: -124rpx auto 10rpx auto;
      image {
        width: 100%;
      }
    }
    .container-title {
      width: 100%;
      font-style: normal;
      font-weight: 600;
      font-size: 36rpx;
      color: #040207;
      line-height: 52rpx;
      text-align: center;
    }
    .container-text {
      width: 100%;
      margin-top: 20rpx;
      font-style: normal;
      font-weight: 400;
      font-size: 28rpx;
      color: #676767;
      line-height: 44rpx;
      text-align: center;
    }
    .container-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      // width: 100%;
      margin: 48rpx -10rpx 0 -10rpx;
      .footer-btn {
        width: 100%;
        height: 92rpx;
        margin: 0 10rpx;
        text-align: center;
        font-style: normal;
        font-weight: 500;
        font-size: 32rpx;
        color: #FFF;
        line-height: 92rpx;
        background: #FC4664;
        border-radius: 48rpx;

        &.btn-cancle {
          color: #332F3B;
          background: #F2F0F5;
        }
      }
    }
  }
  .scope-close {
    position: absolute;
    top: 24rpx;
    right: 30rpx;
    z-index: 9;
  }
}
</style>
