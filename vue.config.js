/**
 * @author: cxx
 * @desc: vue 配置文件
 */
module.exports = {
  // uview
  transpileDependencies: ['uview-ui'],

  // webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        common: '@/common',
        static: '@/static',
        components: '@/components'
      }
    },
    // dev启动模式配置
    // devServer: {
    //   proxy: {
    //     '/api': {
    //       target: 'http://192.168.1.1/api',
    //       'changeOrigin': true,
    //       'pathRewrite': {
    //         '^/api': ''
    //       }
    //     }
    //   }
    // }
  }
}
