<template>
  <view class="pages-article-index">
    <view class="index-wrap">
      <!-- 列表 -->
      <view class="wrap-list" v-if="productList.length">
        <view class="list-item" v-for="(item, index) in productList" :key="index" @click="gotoDetail(item)">
          <view class="item-title text-line-1">{{item.title}}</view>
          <view class="item-text text-line-1">{{item.title}}</view>
        </view>
      </view>
      <!-- 空状态 -->
      <view class="wrap-empty" v-if="!productList.length">
        <u-empty mode="list"></u-empty>
      </view>
      <!-- 底部文字 -->
      <view class="wrap-base" v-if="productList.length && productList.length >= pagination.total">
        <base-text title="没有更多了"></base-text>
      </view>
      <!-- 底部上拉加载 -->
      <u-loadmore v-if="productList.length < pagination.total" height="80rpx" fontSize="14" :status="pagination.status" icon-type="flower" color="#ccc" />
    </view>
  </view>
</template>

<script>
/**
 * @desc 文章列表
 * @author cxx
 * */
import { mapMutations, mapActions, mapState } from 'vuex'
import BaseText from '@/components/BaseText'
import { homeListApi } from '@/api/home'
export default {
  components: {
    BaseText
  },
  data() {
    return {
      loading: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
      },
      productList: [],

      // 是否下拉刷新
      isFefresher: false,
      // 是否开启下拉刷新
      enabledRefresh: true,
      // 分页
      pagination: {
        total: 0,
        status: 'loadmore'
      }
    }
  },
  computed: {
    ...mapState({
      token: state => state.login.token
    })
  },

  onLoad() {
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

    // 获取猜你喜欢列表
    getProductList(flag) {
      // 重置数据，重新请求
      this.queryParams.page = 1
      this.pagination.total = 0
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
        ... this.queryParams
      }
      // 请求接口
      homeListApi(params).then(res => {
        const { list, total } = res.data
        list.forEach(item => {
          item.donate_percent = Math.ceil((item.already_donate / item.total_donate) * 100)
        })
        // 如果是刷新直接赋值，否则添加到列表中
        this.productList = this.isFefresher || flag ? list : [...this.productList, ...list]
        this.pagination.total = total
        // 判断是否底部上拉加载更多
        this.pagination.status = this.productList.length < total ? 'loadmore' : 'nomore'
      }).finally(() => {
        this.loading = false
        // 结束下拉加载
        this.isFefresher = false
        uni.stopPullDownRefresh()
      })
    },
    // 上拉加载更多
    pullUpLoadMore() {
      // 如果列表长度小于total继续上拉加载更多
      if (this.productList.length < this.pagination.total) {
        this.queryParams.page += 1
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


    // 跳转到详情
    gotoDetail(item) {
      uni.navigateTo({
        url: `/pagesHome/article-detail/index?id=${item.id}`
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
.pages-article-index {
  width: 100%;
  min-height: 100vh;
  background-color: #fff;


  .index-wrap {
    width: 100%;
    
    .wrap-list {
      width: 100%;
      
      .list-item {
        width: 100%;
        padding: 32rpx 24rpx;
        border-bottom: 1rpx solid #f3f3f3;

        .item-title {
          width: 100%;
          margin-bottom: 15rpx;
          font-weight: 500;
          font-size: 32rpx;
          color: #333333;
          line-height: 52rpx;
        }
        .item-text {
          width: 100%;
          font-weight: 500;
          font-size: 24rpx;
          color: #333333;
        }
      }
    }
    .wrap-empty {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 300rpx;
    }
    .wrap-base {
      margin-top: 120rpx;
    }
  }
}
</style>