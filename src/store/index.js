import Vue from 'vue'
import Vuex from 'vuex'
// import GlobalTools from '@/utils/globaltools'
Vue.use(Vuex)
// Vue.use(GlobalTools)

export default new Vuex.Store({
  state: {
    // 是否正在拖动某元素
    isDragging: false,
    // 正在拖动的组件类型
    draggingCompType: null,
    // 要拖拽插入的组件实例
    draggingComp: null,
    // 当前添加的元素在compShowList的角标
    currentaddCompIndex: 0,
    // 生成之后的页面组件列表
    compShowList: [],
    // 未放置完成的组件
    tempCurrentaddCompList: null,
    // 当前选中组件的配置信息
    selectedCompConfig: null
  },
  getters: {
    isDragging: (state) => state.isDragging,
    draggingCompType: (state) => state.draggingCompType,
    draggingComp: (state) => state.draggingComp,
    currentaddCompIndex: (state) => state.currentaddCompIndex,
    compShowList: (state) => state.compShowList,
    tempCurrentaddCompList: (state) => state.tempCurrentaddCompList,
    selectedCompConfig: (state) => state.selectedCompConfig
  },
  mutations: {
    updateCompShowList(state, value) {
      state.compShowList = value
    },
    // 拖动开始，设置拖动的组件类型
    changeCompType(state, value) {
      state.draggingCompType = value
    },
    // 设置拖动的组件实例对象
    setDraggingComp(state, value) {
      state.draggingComp = value
    },
    // 设置拖拽状态
    setDragStatus(state, value) {
      state.isDragging = value
    },
    // 设置当前添加的组件的角标
    setCurrentaddCompIndex(state, value) {
      state.currentaddCompIndex = value
    },
    // 取出未放置完成的元素
    getUnSetComp(state) {
      state.tempCurrentaddCompList = state.compShowList.splice(state.currentaddCompIndex, 1)
    },
    // 添加组件到展示列表末尾
    addToCompShowList(state, value) {
      state.compShowList.push(value)
    },
    // 添加组件到展示列表指定位置
    addToCompShowListIndex(state, { overCompIndex, index, addingComp }) {
      state.compShowList.splice(overCompIndex, index, addingComp)
    },
    // 拖动结束
    dragEnd(state) {
      // 判断是否成功拖入
      if (state.compShowList.length) {
        // 当前组件插入位置
        const nowInsertIndex = state.currentaddCompIndex
        state.compShowList[nowInsertIndex].isMoving = false
        state.compShowList[nowInsertIndex].id = Vue.prototype.$createRandomId()
        state.isDragging = false
        state.draggingCompType = null
        state.draggingComp = null
      }
    },
    // 删除某一个元素
    deleteComp(state, value) {
      state.compShowList.splice(value, 1)
    }
  },
  actions: {},
  modules: {}
})
