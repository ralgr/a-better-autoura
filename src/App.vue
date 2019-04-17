<template>
  <v-app dark class="grey darken-4">

    <Navbar/>

    <v-content>
      <v-container fluid class="pa-0">
        <router-view></router-view>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import { fb } from './config/Firebase'
import { mapActions } from 'vuex'

export default {
  name: 'App',

  components: {
    Navbar
  },

  data () {
    return {
    }
  },

  methods: {
    ...mapActions([
      'setUserAction',
      'clearUserAction'
    ]),
    log() {
      console.log('Test');
    }
  },

  created() {
    // Detect sign ins and outs.
    fb.auth().onAuthStateChanged(user => {
      if (user) {

        // Set user in store.
        this.setUserAction(user)

        // Push to map
        this.$router.push('/')
        console.log(user.email + ' is currently logged in');
      } else {
        // User is signed out.
        fb.auth().signOut();

        // User is cleared on store
        this.clearUserAction
      }
    });
  }
}
</script>
