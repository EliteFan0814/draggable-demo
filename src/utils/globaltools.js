export default {
  install: function (Vue) {
    // 生成随机数id
    Object.defineProperty(Vue.prototype, '$createRandomId', {
      value: function () {
        return Number(Math.random().toString().slice(2) + Date.now()).toString(36)
      }
    })
  }
}
