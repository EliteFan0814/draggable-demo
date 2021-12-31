export default {
  install: function (Vue) {
    // 生成随机数id
    Object.defineProperty(Vue.prototype, '$createRandomId', {
      value: function () {
        return Number(Math.random().toString().slice(2) + Date.now()).toString(36)
      }
    })
    // 深拷贝简单对象
    Object.defineProperty(Vue.prototype, '$deepCopy', {
      value: function (copyObj) {
        return JSON.parse(JSON.stringify(copyObj))
      }
    })
  }
}
