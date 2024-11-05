import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'

// 导入vuex
import store from './store'

// uview-ui
import uView from 'uview-ui'
Vue.use(uView)

// mock数据
if (process.env.NODE_ENV === 'development' && process.env.VUE_APP_MOCK === 'true') {
  require('./mock/mock')
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
