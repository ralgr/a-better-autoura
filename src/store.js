import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    stops: [],
    drawer: false,
    info: null,
    dialog: false
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
    },
    setInfo: (state, payload) => {
      state.info = payload
      console.log(state.info);
    },
    openInfo: state => {
      if (state.dialog == true) {
        state.dialog = false
      } else if (state.dialog == false) {
        state.dialog = true
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
    },
    setInfoAction: ({ commit }, payload) => {
      commit('setInfo', payload)
    },
    openInfoAction: ({ commit }) => {
      commit('openInfo')
    }
  }
})
