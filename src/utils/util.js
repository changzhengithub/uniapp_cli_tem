/**
 * @description 公共函数
 * @author cxx
 * @import import { DeepClone } from '@/utils/util'
 * */


/**
 * @description 获取当前页面
 * @author cxx
 * */
export function GetCurPage() {
  let pages = getCurrentPages()
  let curPage = pages[pages.length - 1]
  return curPage
}

/**
 * @description 深拷贝
 * @param {Any} [target] - 拷贝数据
 * @author cxx
 * */
export function DeepClone(target) {
  // 引用类型
  if (typeof target === 'object' && target !== null) {
    const targeClone = Array.isArray(target) ? [] : {}
    for (const key in target) {
      targeClone[key] = DeepClone(target[key])
    }
    return targeClone
  } else {
    return target
  }
}

/**
 * @description 数组根据某个字段进行排序
 * @param {Array} [list] - 排序数组
 * @param {String} [field] - 排序字段
 * @param {String} [order] - asc 升序 desc 降序
 * @example SortArray(arr, 'age')
 * @author cxx
 * */
export function SortArray(list, field, order = 'desc') {
  // 比较函数
  function compare(p) {
    return function (item1, item2) {
      const a = item1[p]
      const b = item2[p]
      if (order === 'desc') {
        return b - a // 降序
      } else {
        return a - b // 升序
      }
    }
  }
  const sortArr = list.sort(compare(field))
  return sortArr
}

/**
 * @description 获取格式化时间
 * @param {String} [format] - 格式化 'YYYY-MM-DD HH:mm:ss' HH：表示24小时，hh表示12小时
 * @param {Date} date/timestamp - 日期或时间戳
 * @retrun 2021-01-01 01:01:01、2021/01/01 01:01:01
 * @example formatTime('YYYY-MM-DD HH:mm:ss WW', 1655885503100)
 * @author cxx
 * */
export function formatTime(format, timestamp) {
  const date = timestamp ? new Date(timestamp) : new Date()
  if (!format) return date
  if (format.includes('YYYY')) format = format.replace('YYYY', date.getFullYear())
  if (format.includes('MM')) format = format.replace('MM', fillZero(date.getMonth() + 1))
  if (format.includes('DD')) format = format.replace('DD', fillZero(date.getDate()))
  if (format.includes('HH')) format = format.replace('HH', fillZero(date.getHours()))
  if (format.includes('hh')) format = format.replace('hh', fillZero(date.getHours() % 12))
  if (format.includes('mm')) format = format.replace('mm', fillZero(date.getMinutes()))
  if (format.includes('ss')) format = format.replace('ss', fillZero(date.getSeconds()))
  if (format.includes('WW')) {
    const weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    format = format.replace('WW', weekday[date.getDay()])
  }
  return format
}
// 补零
function fillZero(num) {
  return num < 10 ? '0' + num : num
}

/**
 * 对字符串进行脱敏(含头含尾)
 * @param {String} str - 手机号或身份证号
 * @param {Number} start - 开始位置
 * @param {Number} end - 结束位置
 * */ 
export function MaskStr(str, start, end) {
  if (!str) return '';
  // 确保起始和结束索引在合理范围内
  start = Math.max(0, Math.min(start, str.length - 1));
  end = Math.max(0, Math.min(end, str.length - 1));
  // 替换指定范围内的字符为星号
  const masked = str.substring(0, start) + '*'.repeat(end - start + 1) + str.substring(end + 1);
  return masked
}