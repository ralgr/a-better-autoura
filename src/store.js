import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    stops: [],
    drawer: false
  },

  getters: {

  },

  mutations: {
    setUser: (state, payload) => {
      state.user = payload.email
    },
    clearUser: state => {
      state.user = null
    },
    setStops: (state, payload) => {
      state.stops = payload
    },
    openDrawer: state => {
      if (state.drawer == true) {
        state.drawer = false
      } else if (state.drawer == false) {
        state.drawer = true
      }
    }
  },

  actions: {
    setUserAction: ({ commit }, payload) => {
      commit('setUser', payload)
    },
    clearUserAction: ({ commit }) => {
      commit('clearUser')
    },
    setStopsAction: ({ commit }, payload) => {
      commit('setStops', payload)
    },
    openDrawerAction: ({ commit }) => {
      commit('openDrawer')
    }
  }
})
