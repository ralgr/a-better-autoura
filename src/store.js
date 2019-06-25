import Vue from 'vue'
import Vuex from 'vuex'
import { fb, db } from './config/Firebase'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,

  state: {
    // [[ AUTH RELATED ]]
    user: null,
    authenticating: false,

    // [[ NAV RELATED ]]
    mobileNavDialog: false,

    // [[ MAPUI RELATED ]]
    // Mapui.vue
    drawer: false,
    dialog: false,
    context: null,

    // [[ LOCATION RELATED ]]
    stops: [],
    info: null,
    savedLocations: null,

    // [[ LEAFLET RELATED ]]
    latlng: null,

    // [[ ALERT RELATED ]]
    errorAppAlert: null,
    successAppAlert: null
  },

  getters: {
    // [[ AUTH GETTERS ]]
    authenticatingGetter: state => {
      return state.authenticating
    },
    userGetter: state => {
      return state.user
    },

    // [[ LOCATION RELATED GETTERS ]]
    savedLocationsGetter: state => {
      return state.savedLocations
    },
    infoGetter: state => {
      return state.info
    },

    // [[ MAPUI GETTERS ]]
    //More info dialog
    dialogGetter: state => {
      return state.dialog
    },
    drawerGetter: state => {
      return state.drawer
    },
    stopsGetter: state => {
      return state.stops
    },
    contextGetter: state => {
      return state.context
    },


    // [[ ALERT GETTERS ]]
    // Error app alert getter
    errorAppAlertGetter: state => {
      return state.errorAppAlert
    },
    // Success app alert getter
    successAppAlertGetter: state => {
      return state.successAppAlert
    },

    // [[ MOBILE NAV GETTERS ]]
    mobileNavDialogGetter: state => {
      return state.mobileNavDialog
    },

    // [[ LEAFLET RELATED ]]
    latlngGetter: state => {
      return state.latlng
    },
  },

  mutations: {
    // [[ AUTH RELATED MUTATIONS ]]
    setUser: (state, payload) => {
      state.user = payload.email
    },
    clearUser: state => {
      state.user = null
    },
    setAuthenticatingTrue: state => {
      state.authenticating = true
    },
    setAuthenticatingFalse: state => {
      state.authenticating = false
    },

    // [[ ALERT MUTATIONS ]]
    showErrorAppAlert: (state, payload) => {
      state.errorAppAlert = payload
    },
    clearErrorAppAlert: state => {
      state.errorAppAlert = null
    },
    showSuccessAppAlert: (state, payload) => {
      state.successAppAlert = payload
    },
    clearSuccessAppAlert: state => {
      state.successAppAlert = null
    },

    // [[ STOP/LOCATION RELATED MUTATIONS ]]
    // Used for stop lists
    setStops: (state, payload) => {
      state.stops = payload
    },
    setInfo: (state, payload) => {
      state.info = payload.loc
      state.context = payload.context
    },
    openInfo: state => {
      if (state.dialog == true) {
        state.dialog = false
      } else if (state.dialog == false) {
        state.dialog = true
      }
    },
    // Icon enlarge for locations
    biggify: (state, payload) => {
      state.stops[payload.index].iconSize = payload.iconSize;
      state.stops[payload.index].zIndex = payload.zIndex;
    },
    smallify: (state, payload) => {
      state.stops[payload.index].iconSize = payload.iconSize;
      state.stops[payload.index].zIndex = payload.zIndex;
    },
    // List highlight for locations
    highlight: (state, payload) => {
      state.stops[payload].isHighlighted = true;
    },
    // List highlight for saves
    unhighlight: (state, payload) => {
      state.stops[payload].isHighlighted = false;
    },
    findStop: (state, payload) => {
      state.latlng = payload
    },
    getSaves: (state, payload) => {
      state.savedLocations = payload
    },

    // [[ NAV RELATED MUTATIONS ]]
    openDrawer: state => {
      if (state.drawer == true) {
        state.drawer = false
      } else if (state.drawer == false) {
        state.drawer = true
      }
    },

    // [[ MOBILENAV MUTAIONS ]]
    openMobileNav: state => {
      state.mobileNavDialog = true
    },
    closeMobileNav: state => {
      state.mobileNavDialog = false
    },
  },

  actions: {
    // [[ FIRESTORE ACTIONS ]]
    saveStopsAction: ({ getters, commit }) => {
      // Add user to the stop data for filtering on backend
      let stopToSave = getters.infoGetter
      stopToSave['user'] = getters.userGetter

      // Check for duplicates
      db.collection('saved-stops')
      .where("user", "==", `${getters.userGetter}`)
      .where("name", "==", `${getters.infoGetter.name}`)
      .get()
      .then(data => {
        // Add data if no duplicates
        if (data.empty == true) {
          db.collection('saved-stops')
          .add(stopToSave)
          .then(() => {
            // Clear previous alerts
            commit('clearSuccessAppAlert')

            // Stop loading animation
            commit('setAuthenticatingFalse')

            // Set alert message.
            const successMsg = {
              msg: 'Location saved',
              color: 'primary'
            }

            // Show alert Message
            commit('showSuccessAppAlert', successMsg)
          })
        }

        // Show alert if there are duplicates
        if (data.empty == false) {
          // Clear previous alerts
          commit('clearErrorAppAlert')

          // Stop loading animation
          commit('setAuthenticatingFalse')

          // Set alert message.
          const errorMsg = {
            msg: 'The selected location is already saved',
            color: 'error'
          }

          // Show alert Message
          commit('showErrorAppAlert', errorMsg)
        }
      })
    },
    getSavesAction: ({commit, getters}) => {
      // Get saved locations from firebase
      db.collection('saved-stops')
      .where("user", "==", `${getters.userGetter}`)
      .onSnapshot(data => {
        let stopsFromFirebase = [];

        data.forEach(stop => {
          stopsFromFirebase.push({
            id: stop.id,
            ...stop.data()
          })
        })

        commit('getSaves', stopsFromFirebase)
      })
    },
    deleteSaveAction: ({commit}, payload) => {
      // Get saved locations from firebase
      db.collection("saved-stops").doc(payload).delete()
      .then(() => {
        // Set alert message.
        const successMsg = {
          msg: 'Location deleted',
          color: 'primary'
        }

        // Show alert Message
        commit('showSuccessAppAlert', successMsg)
        commit('openInfo')
      }).catch(error => {
        // Set alert message.
        const successMsg = {
          msg: error,
          color: 'error'
        }

        // Show alert Message
        commit('showSuccessAppAlert', successMsg)
      });
    },


    // [[ AXIOS ACTIONS ]]
    getStopsAction: ({ dispatch }, payload) => {
      // Get locations using Axios
      const autora = axios.create({ headers: { 'Authorization': 'Bearer ' + payload.key } })
      var url = `https://api.autoura.com/api/stops/search?group_context=${payload.context}&stop_types=food`
      autora.get(url)
      .then(r => {
        // Mapping new data on each result
        let response = r.data.response.map(response => {

          // Icon size data
          response.iconSize = payload.iconSize[0];
          // Z index data
          response.zIndex = payload.zIndex[0];
          // Highlight data
          response.isHighlighted = false;

          return response;
        })

        // Stops are sent to the store
        dispatch('setStopsAction', response)
      })
    },

    // [[ ALERT ACTIONS ]]
    clearErrorAppAlertAction: ({ commit }) => {
      commit('clearErrorAppAlert')
    },
    clearSuccessAppAlertAction: ({ commit }) => {
      commit('clearSuccessAppAlert')
    },

    // [[ MOBILENAV ACTIONS ]]
    openMobileNavAction: ({ commit }) => {
      commit('openMobileNav')
    },
    closeMobileNavAction: ({ commit }) => {
      commit('closeMobileNav')
    },

    // [[ MORE INFO RELATED ACTIONS ]]
    setStopsAction: ({ commit }, payload) => {
      commit('setStops', payload)
    },
    setInfoAction: ({ commit }, payload) => {
      commit('setInfo', payload)
    },
    openInfoAction: ({ commit }) => {
      commit('openInfo')
    },
    openDrawerAction: ({ commit }) => {
      commit('openDrawer')
    },

    // [[ LEAFLET RELATED ACTIONS ]]
    // For locations
    biggifyAction: ({ commit }, payload) => {
      commit('biggify', payload)
    },
    smallifyAction: ({ commit }, payload) => {
      commit('smallify', payload)
    },
    highlightAction: ({ commit }, payload) => {
      commit('highlight', payload)
    },
    unhighlightAction: ({ commit }, payload) => {
      commit('unhighlight', payload)
    },
    findStopAction: ({ commit }, payload) => {
      commit('findStop', payload)
      commit('openInfo')
    },

    // [[ AUTH ACTIONS ]]
    detectUserAction: ({ commit, dispatch }) => {
      // Detect sign ins and outs.
      fb.auth().onAuthStateChanged(user => {
        if (user) {
          // Set user in store.
          commit('setUser', user)
          // Get the saves from firebase
          dispatch('getSavesAction')
        } else {
          // User is signed out.
          fb.auth().signOut();
          // User is cleared on store
          commit('clearUser')
        }
      })
    },
    clearUserAction: ({ commit }) => {
      // Sign out user
      fb.auth().signOut()
      .then(() => {
        // User is cleared on store
        commit('clearUser')
      })
    },
    signInUserAction: ({ commit }, payload) => {
      // Start loading animation
      commit('setAuthenticatingTrue')

      return fb.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        // Stop loading animation
        commit('setAuthenticatingFalse')

        // For use in transferring the user to map
        return true
      })
      .catch(error => {
        // Clear previous alerts
        commit('clearErrorAppAlert')

        // Stop loading animation
        commit('setAuthenticatingFalse')

        // Set alert message.
        const alertMsg = {
          msg: error.message,
          color: 'error'
        }

        // Show alert Message
        commit('showErrorAppAlert', alertMsg)
      })
    },
    createUserAction: ({ commit }, payload) => {
      // Start loading animation
      commit('setAuthenticatingTrue')

      return fb.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        // Stop loading animation
        commit('setAuthenticatingFalse')

        // For use in transferring the user to map
        return true
      })
      .catch(error => {
        // Clear previous alerts
        commit('clearErrorAppAlert')

        // Stop loading animation
        commit('setAuthenticatingFalse')

        // Set alert message.
        const alertMsg = {
          msg: error.message,
          color: 'error'
        }

        // Show alert Message
        commit('showErrorAppAlert', alertMsg)
      })
    }
  }
})
