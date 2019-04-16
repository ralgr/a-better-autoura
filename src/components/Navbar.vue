<template lang="html">
  <nav>

    <Authform/>

    <!-- Main navigation body -->
    <v-toolbar app
               flat
               dark>

      <!-- Hamburger menu for xs-s devices -->
      <v-toolbar-side-icon @click.stop="drawer = !drawer"
                           class="hidden-md-and-up">
      </v-toolbar-side-icon>

      <!-- Navigation bar title -->
      <v-toolbar-title class="headline">
        <span>Information</span>
        <span class="font-weight-light">Map</span>
      </v-toolbar-title>

      <!-- Space filler -->
      <v-spacer></v-spacer>

      <!-- Buttons for md-xl devices -->
      <v-toolbar-items>
        <v-btn flat
               v-for="(page, index) in navigations"
               :key="page.title + index"
               :color="page.color"
               v-if="page.condition"
               class="hidden-sm-and-down"
               router :to="page.route">
          <span>{{ page.title }}</span>
          <v-icon right>{{ page.icon }}</v-icon>
        </v-btn>
      </v-toolbar-items>

    </v-toolbar>

    <!-- Navigation menu type: Hamburger -->
    <v-navigation-drawer
      v-model="drawer"
      absolute
      dark
      class="indigo darken-3"
      temporary
    >
      <!-- Avatar information -->
      <v-layout column wrap align-center v-if="this.user">
        <v-flex class="ma-4">

        <!-- Avatar image -->
        <v-avatar
          size="avatarSize"
          color="success">
          <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="User image.">
        </v-avatar>

        </v-flex>

        <p>User Name</p>

      </v-layout>

      <!-- Navigation tile -->
      <v-list>

        <v-list-tile
          v-for="(page, index) in navigations"
          :key="page.title + index"
          v-if="page.condition"
          router :to="page.route"
        >

          <v-list-tile-action>
            <v-icon>{{ page.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ page.title }}</v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>

      </v-list>

    </v-navigation-drawer>

  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Authform from './Authform'

export default {
  name: 'Navbar',

  components: {
    Authform
  },

  data() {
    return {
      drawer: false,
    }
  },

  methods: {
    ...mapActions([
      'openAuthDialogAction'
    ])
  },

  computed: {
    ...mapState([
      'user'
    ]),
    navigations() {
      return [
        { title: 'Map', icon: 'location_on', color: 'green darken-1', route: '/map', condition: true, onclick: '' },
        { title: 'About', icon: 'info', color: 'green darken-1', route: '/about', condition: true, onclick: '' },
        { title: 'Sign up', icon: 'person_add', color: 'amber darken-3', route: '/sign-up', condition: !this.user, onclick: ''  },
        { title: 'Sign in', icon: 'person', color: 'amber darken-3', route: '/sign-in', condition: !this.user, onclick: ''  },
        { title: 'Sign Out', icon: 'exit_to_app', color: 'amber darken-3', condition: this.user, onclick: '' }
      ]
    }
  }
}
</script>

<style lang="css" scoped>
</style>
