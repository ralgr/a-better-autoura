import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },

  getters: {

  },

  mutations: {
    setUser: (state, payload) => {
      state.user = payload.email
    },
    clearUser: state => {
      state.user = null
    }
  },

  actions: {
    setUserAction: ({ commit }, payload) => {
      commit('setUser', payload)
    },
    clearUserAction: ({ commit }) => {
      commit('clearUser')
    }
  }
})
