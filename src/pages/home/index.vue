<template>
  <view class="pages-home-index">
    <view class="index-banner">
      <image src="@/static/images/home/banner.png" mode="scaleToFill" />
    </view>
    <view class="index-nav">
      <view class="nav-list">
        <view class="nav-item" v-for="(item, index) in tabNavList" :key="index" @click="gotoPage(item.url)">
          <view class="item-icon">
            <image :src="`/static/images/home/nav-icon0${index + 1}.png`" mode="scaleToFill" />
          </view>
          <view class="item-text">{{item.name}}</view>
        </view>
      </view>
    </view>

    <view class="index-wrap">
      <!-- 列表 -->
      <view class="wrap-list" v-if="productList.length">
        <view class="list-item" v-for="(item, index) in productList" :key="index" @click="gotoCateDetail(item)">
          <view class="item-img">
            <image src="../../static/images/home/item.png" mode="scaleToFill" />
          </view>
          <view class="item-detail">
            <view class="detail-title text-line-1">{{item.title}}</view>
            <view class="detail-text">共{{item.gold}}个</view>
          </view>
        </view>
      </view>
      <!-- 空状态 -->
      <view class="wrap-empty" v-if="!productList.length">
        <u-empty mode="list"></u-empty>
      </view>
      <!-- 底部文字 -->
      <view class="wrap-base" v-if="productList.length && productList.length >= pagination.total">
        <ts-base-text title="没有更多了"></ts-base-text>
      </view>
      <!-- 底部上拉加载 -->
      <u-loadmore v-if="productList.length < pagination.total" height="80rpx" fontSize="14" :status="pagination.status" icon-type="flower" color="#ccc" />
    </view>
  </view>
</template>

<script>
/**
 * @desc 首页
 * @author cxx
 * */
import { mapMutations, mapActions, mapState } from 'vuex'
import { homeListApi } from '@/api/home'
export default {
  data() {
    return {
      loading: false,
      tabNavList: [
        { name: '产品', url: '/pagesHome/product/index' },
        { name: '文章', url: '/pagesHome/article/index' },
        { name: '新闻', url: '/pagesHome/news/index' },
        { name: '帮助', url: '/pagesHome/help-detail/index' }
      ],
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


    // 页面跳转
    gotoPage(url) {
      if (this.token) {
        uni.navigateTo({
          url
        })
      } else {
        uni.navigateTo({
          url: '/pages/login/index'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pages-home-index {
  width: 100%;
  min-height: 100vh;
  background-color: #F3F3F3;

  .index-banner {
    width: 100%;
    height: 300rpx;
    padding: 24rpx 24rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }

  .index-nav {
    width: 100%;
    padding: 0 24rpx;
    margin-bottom: 24rpx;
    .nav-list {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 30rpx 0;
      background-color: #fff;
      border-radius: 20rpx;
      .nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 25%;
  
        .item-icon {
          width: 93rpx;
          height: 93rpx;
          margin-bottom: 19rpx;
  
          image {
            width: 100%;
            height: 100%;
          }
        }
  
        .item-text {
          font-weight: 500;
          font-size: 28rpx;
          color: #333333;
        }
      }
    }

  }

  .index-wrap {
    width: 100%;
    padding: 0 24rpx;

    .wrap-list {
      display: flex;
      flex-wrap: wrap;
      // width: 100%;
      margin: 0 -12rpx;

      .list-item {
        width: calc(50% - 24rpx);
        // height: 220rpx;
        margin: 0 12rpx;
        margin-bottom: 20rpx;
        border-radius: 20rpx;
        background-color: #fff;
        
        .item-img {
          width: 100%;
          height: 300rpx;
          border-radius: 20rpx;
          overflow: hidden;

          image {
            width: 100%;
            height: 100%;
          }
        }

        .item-detail {
          width: 100%;
          padding: 20rpx 18rpx;
          .detail-title {
            width: 100%;
            margin-bottom: 15rpx;
            font-weight: 500;
            font-size: 28rpx;
            color: #333333;
            line-height: 30rpx;
          }

          .detail-text {
            width: 100%;
            font-weight: 500;
            font-size: 24rpx;
            color: #333333;
          }
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