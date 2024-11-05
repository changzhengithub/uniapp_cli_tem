<template>
  <view class="pages-product-index">
    <view class="charts-box">
      <qiun-data-charts type="column" :chartData="chartData" />
    </view>
  </view>
</template>

<script>
/**
 * @desc 产品中心
 * @author cxx
 * */

import { mapMutations, mapActions, mapState } from 'vuex'
import { detailApi } from '@/api/home'
export default {
  data() {
    return {
      loading: false,
      detailData: {},
      chartData: {},
    }
  },
  onLoad() {
    this.getArticleDetail()
  },

  onReady() {
    this.getServerData();
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

    // 初始化图表
    getServerData() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        let res = {
            categories: ["2016","2017","2018","2019","2020","2021"],
            series: [
              {
                name: "目标值",
                data: [35,36,31,33,13,34]
              },
              {
                name: "完成量",
                data: [18,27,21,24,6,28]
              }
            ]
          };
        this.chartData = JSON.parse(JSON.stringify(res));
      }, 500);
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
.pages-product-index {
  width: 100%;
  min-height: 100vh;
  background-color: #F3F3F3;

  .charts-box {
    width: 100%;
    height: 300px;
  }
}
</style>