/**
 * 格式化字符串数据
 * @author: linyajing
 * @created: 2018.05.22
 * @updated: 2018.05.23
 */
module.exports = {
    stringify: (data, space) => {
      const seen = []
      return JSON.stringify(data, (key, val) => {
        if (!val || typeof val !== 'object') {
          return val
        }
        if (seen.indexOf(val) !== -1) {
          return '[Circular]'
        }
        seen.push(val)
        return val
      }, space)
    }
}