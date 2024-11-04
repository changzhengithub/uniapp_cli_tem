<template>
  <u-popup :show="show" mode="center" :round="24" :closeOnClickOverlay="false" bgColor="transparent" :zIndex="zIndex" :overlay="false">
    <view class="ts-toast-pannel-cls">
      <text>{{content}}</text>
    </view>
  </u-popup>
</template>
<script>

/**
 * @desc 自定义提示吐司组件-公共组件
 * @param {String} content 提示内容
 * @param {Number, String} zIndex 层级
 * @param {Number} duration 多少秒关闭吐司，默认2000
 * @author cxx
 * @example <ts-toast :show="tipToast.show" content="文本提示内容" @close="tipToast.show = false"></ts-toast>
 * */
export default {
  name: 'TsToast',
  props: {
    show: {
      type: Boolean
    },
    content: {
      type: String
    },
    zIndex: {
      type: [Number, String],
      default: 10075
    },
    duration: {
      type: Number,
      default: 2000
    }
  },
  data() {
    return {
      // 倒计时
      timer: null
    }
  },
  watch: {
    show(val) {
      if (val) this.openTipToast()
    }
  },
  methods: {
    // 点击显示吐司
    openTipToast() {
      if (this.timer) return
      this.timer = setTimeout(() => {
        this.$emit('close')
        clearTimeout(this.timer)
        this.timer = null
      }, this.duration)
    }
  },
  beforeDestroy() {
    if (this.timer) clearTimeout(this.timer)
  }
}
</script>
<style lang="scss" scoped>
  // 吐司提示
  .ts-toast-pannel-cls {
    max-width: 544rpx;
    padding: 24rpx 48rpx;
    color: #fff;
    font-size: 28rpx;
    font-style: normal;
    font-weight: 400;
    line-height: 44rpx;
    background-color: rgba(0, 0, 0, .8);
    border-radius: 12rpx;
    word-break: break-all;
    box-sizing: border-box;
  }
</style>
