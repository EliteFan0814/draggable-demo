import Vue from 'vue'

globalRegistCompCustom(require.context('@/componentsCustom', true, /index.vue$/))
globalRegistCompCustom(require.context('@/componentsConfig', true, /index.vue$/))
getCompCustom()

// 获取所有自定义组件配置信息
function getCompCustom() {
  // 获取文件夹内组件信息
  // const compFiles = require.context('@/componentsCustom', true, /index.json$/)
  const compFiles = require.context(`@/componentsCustom`, true, /index.js$/)
  let compConfigListObj = {}
  compFiles.keys().forEach((itemPath) => {
    // itemPath值结构为： ./CompSearch/index.json
    const [, compName] = itemPath.split('/')
    let compConfig = { compName, ...compFiles(itemPath).default }
    compConfigListObj[compName] = compConfig
  })
  Vue.prototype.$compConfigListObj = compConfigListObj
}
// 把自定义组件进行全局注册
function globalRegistCompCustom(context) {
  context.keys().forEach((item) => {
    const component = context(item)
    let ctrl = component.default || component
    let a = ctrl.name
    let b = ctrl
    // 全局注册组件
    Vue.component(a, b)
  })
}
