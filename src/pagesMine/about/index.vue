<template>
  <view class="pages-article-detail-index">
    关于我们
  </view>
</template>

<script>
/**
 * @desc 关于我们
 * @author cxx
 * */
import { mapMutations, mapActions, mapState } from 'vuex'
import { detailApi } from '@/api/home'
export default {
  data() {
    return {
      loading: false,
      detailData: {}
    }
  },
  onLoad() {
    this.getArticleDetail()
  },

  methods: {
    // 获取详情
    getArticleDetail() {
      // 请求接口
      detailApi().then(res => {
        const data = res.data
        console.log(data)
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
.pages-article-detail-index {
  width: 100%;
  min-height: 100vh;
  background-color: #F3F3F3;
}
</style>