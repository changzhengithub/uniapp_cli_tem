<template>
  <view class="ts-cmp-base-cls">
    <view class="base-text-wrap">
      <view class="text-line-left" :style="{ background: leftLinerStyle }"></view>
      <text :style="[baseStyle]">{{ text }}</text>
      <view class="text-line-right" :style="{ background: rightLinerStyle }"></view>
    </view>
  </view>
</template>
<script>
/**
 * @desc 列表底部提示文字-公共组件
 * @param {String} text 标题名称
 * @param {String} lineStartColor 两边底线渐变开始颜色
 * @param {String} lineEndColor 两边底线渐变结束颜色
 * @param {Object} baseStyle 文字样式
 * @author cxx
 * @example <BaseText title="xxx"></BaseText>
 * */
export default {
  name: 'BaseText',
  props: {
    text: {
      type: String,
      default: '没有更多了'
    },
    baseStyle: {
      type: Object,
      default: () => {}
    },
    lineStartColor: {
      type: String,
      default: '#8B8B8B'
    },
    lineEndColor: {
      type: String,
      default: '#8B8B8B00'
    }
  },
  data() {
    return {
      // 两边底线渐变颜色
      leftLinerStyle: '',
      rightLinerStyle: ''
    }
  },
  created() {
    // 获取对应渐变色
    this.leftLinerStyle = `linear-gradient(90deg, ${this.lineEndColor} 0%, ${this.lineStartColor} 100%)`
    this.rightLinerStyle = `linear-gradient(90deg, ${this.lineStartColor} 0%, ${this.lineEndColor} 100%)`
  }
}
</script>
<style lang="scss" scoped>
.ts-cmp-base-cls {
  width: 100%;
  .base-text-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 60rpx;
    padding: 32rpx 0;
    font-size: 24rpx;
    color: #8B8B8B;
    .text-line-left {
      width: 70rpx;
      height: 1rpx;
      margin-right: 8rpx;
      // background: linear-gradient(90deg, #fff 0%, #eee 100%);
    }
    .text-line-right {
      width: 70rpx;
      height: 1rpx;
      margin-left: 8rpx;
      // background: linear-gradient(90deg, #eee 0%, #fff 100%);
    }
  }
}
</style>
