import Vue from 'vue'
import Vuex from 'vuex'
import GlobalTools from '@/utils/globaltools'
Vue.use(Vuex)
Vue.use(GlobalTools)

export default new Vuex.Store({
  state: {
    // 是否正在拖动某元素
    isDragging: false,
    // 正在拖动的组件类型
    draggingCompType: null,
    draggingCompText: null,
    // 当前添加的元素在compShowList的角标
    currentaddCompIndex: 0,
    compShowList: [],
    tempCurrentaddCompList: null
  },
  getters: {
    isDragging: (state) => state.isDragging,
    draggingCompType: (state) => state.draggingCompType,
    draggingCompText: (state) => state.draggingCompText,
    currentaddCompIndex: (state) => state.currentaddCompIndex,
    compShowList: (state) => state.compShowList,
    tempCurrentaddCompList: (state) => state.tempCurrentaddCompList
  },
  mutations: {
    updateCompShowList(state, value) {
      state.compShowList = value
    },
    // 拖动开始，设置拖动的组件类型
    changeCompType(state, value) {
      state.draggingCompType = value
    },
    // 设置拖拽状态
    setDragStatus(state, value) {
      state.isDragging = value
    },
    // 设置当前添加的组件的角标
    setCurrentaddCompIndex(state, value) {
      state.currentaddCompIndex = value
    },
    //
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
    handleDragEnd(state) {
      state.compShowList[state.currentaddCompIndex].isMoving = false
      // state.compShowList[state.currentaddCompIndex].id = Vue.prototype.$createRandomId()
      state.compShowList[state.currentaddCompIndex].id = Number(
        Math.random().toString().slice(2) + Date.now()
      ).toString(36)
      state.isDragging = false
      state.draggingCompType = null
    }
  },
  actions: {},
  modules: {}
})
