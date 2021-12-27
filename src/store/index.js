import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    myList: [
      { id: 1, name: 'fpdddc' },
      { id: 2, name: 'syq' },
      { id: 3, name: 'fmg' },
      { id: 4, name: 'eee' }
    ]
  },
  getters: {
    myList: (state) => state.myList
  },
  mutations: {
    updateList(state, value) {
      state.myList = value
    }
  },
  actions: {},
  modules: {}
})
