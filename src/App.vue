<template>
  <v-app>

    <Navbar/>
    <MobileNav/>
    <ErrorAlert/>
    <SuccessAlert/>

    <v-content>
      <v-container fluid class="pa-0">
        <router-view></router-view>
      </v-container>
    </v-content>

    <Footer/>

  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import MobileNav from './components/MobileNav'
import Footer from './components/Footer'
import ErrorAlert from './components/ErrorAlert'
import SuccessAlert from './components/SuccessAlert'
import { mapActions } from 'vuex'

export default {
  name: 'App',

  components: {
    Navbar,
    Footer,
    ErrorAlert,
    SuccessAlert,
    MobileNav
  },

  data () {
    return {
    }
  },

  methods: {
    ...mapActions([
      'detectUserAction'
    ])
  },

  created() {
    this.detectUserAction()   
  }
}
</script>
