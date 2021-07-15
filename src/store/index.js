import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    nickName: '',
  },
  mutations: {
    setToken(state,token) {
      state.token = token
    },
    setNickName(state, nickName) {
      state.nickName = nickName
    }
  },
  actions: {
  },
  modules: {
  }
})
