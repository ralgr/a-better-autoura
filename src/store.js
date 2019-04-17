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
    authDialogMutation: state => {
      if (state.authDialog == true) {
        state.authDialog = false
      } else if (state.authDialog == false) {
        state.authDialog = true
      }
    }
  },

  actions: {
    authDialogAction: ({ commit }) => {
      commit('authDialogMutation')
    }
  }
})
