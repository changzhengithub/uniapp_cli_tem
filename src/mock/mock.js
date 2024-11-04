/**
 * @author: cxx
 * @desc: 挡板数据统一拦截,只需要创建和请求接口名一样的json文件即可
 *  例如: /app/user/info.json
 */
const Mock = require('better-mock/dist/mock.mp')
// 请求上下文
const context = process.env.VUE_APP_BASE_URL

// 拦截请求地址
Mock.mock(new RegExp(context), function (options) {
  // 获取对应json
  const record = require(`.${options.url}.json`);
  console.log(`模拟[${options.url}]数据:`, record)
  return record
})
