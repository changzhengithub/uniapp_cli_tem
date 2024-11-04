<template>
  <text>
    {{ cutStrByFullLength(tooltip, length) }}{{ getStrFullLength(tooltip) > length ? '...' : '' }}
  </text>
</template>
<script>
/**
 * @desc 文本自动省略号
 * @param {String} tooltip 文本内容
 * @param {Number} length 显示的长度，超过自动显示省略号...
 * @author cxx
 * @example <ellipsis tooltip="文本自动省略号" :length="20"></ellipsis>
 * */
export default {
  name: 'Ellipsis',
  props: {
    tooltip: {
      type: String
    },
    length: {
      type: Number
    }
  },
  methods: {
    /**
     * @description 获取字符串长度，英文字符 长度1，中文字符长度2
     * @param {String} str 字符串
     * */
    getStrFullLength(str = '') {
      const strLen = str.split('').reduce((pre, cur) => {
        const charCode = cur.charCodeAt(0)
        if (charCode >= 0 && charCode <= 128) {
          return pre + 1
        }
        return pre + 2
      }, 0)
      return strLen
    },

    /**
     * 截取字符串，根据字符串Unicode 编码截取对应的长度
     * @param {String} str 字符串
     * @param {Number} maxLength 截取的长度
     * */
    cutStrByFullLength(str = '', maxLength) {
      let showLength = 0
      return str.split('').reduce((pre, cur) => {
        const charCode = cur.charCodeAt(0)
        if (charCode >= 0 && charCode <= 128) {
          showLength += 1
        } else {
          showLength += 2
        }
        if (showLength <= maxLength) {
          return pre + cur
        }
        return pre
      }, '')
    }
  }
}
</script>
