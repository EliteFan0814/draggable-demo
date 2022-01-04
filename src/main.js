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
import '@/utils/globalRegistComp'
Vue.use(GlobalTools)
// 引入vant组件
import { Search, Field, Cell, CellGroup, Swipe, SwipeItem,Button  } from 'vant'
Vue.use(Search).use(Field).use(Cell).use(CellGroup).use(Swipe).use(SwipeItem).use(Button)
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
