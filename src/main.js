import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'reset-css'
// 引入elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入工具函数
import GlobalTools from '@/utils/globaltools'
// 引入vant组件
import { Search, Field, Cell, CellGroup } from 'vant'
Vue.use(Search).use(Field).use(Cell).use(CellGroup)
Vue.use(ElementUI)
Vue.use(GlobalTools)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
