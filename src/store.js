import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    authDialog: false
  },

  getters: {

  },

  mutations: {
    openAuthDialog: (state) => {
      state.authDialog = true
    }
  },

  actions: {
    openAuthDialogAction: ({ commit }) => {
      commit('openAuthDialog')
    }
  }
})
