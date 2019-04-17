<template lang="html">
  <nav>

    <Popup :signIn="false"/>

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
        <!-- Auto created buttons -->
        <v-btn flat
               v-for="page in navigations"
               :key="page.title"
               :color="page.color"
               class="hidden-sm-and-down"
               router :to="page.route">
          <span>{{ page.title }}</span>
          <v-icon right>{{ page.icon }}</v-icon>
        </v-btn>

        <!-- Manually created buttons -->
        <!-- Sign up -->
        <v-btn flat
               color="amber darken-3"
               class="hidden-sm-and-down"
               v-if="!user"
               @click="authDialogAction">
          <span>Sign up</span>
          <v-icon right>person_add</v-icon>
        </v-btn>
        <!-- Sign in -->
        <v-btn flat
               color="amber darken-3"
               class="hidden-sm-and-down"
               v-if="!user"
               @click="authDialogAction">
          <span>Sign in</span>
          <v-icon right>person</v-icon>
        </v-btn>
        <!-- Sign out -->
        <v-btn flat
               color="amber darken-3"
               class="hidden-sm-and-down"
               v-if="user">
          <span>Sign out</span>
          <v-icon right>exit_to_app</v-icon>
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
      <v-layout column wrap align-center>
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
      <v-list class="pt-4">

        <!-- Auto created tiles -->
        <v-list-tile
          v-for="page in navigations"
          :key="page.title"
          router :to="page.route"
        >

          <v-list-tile-action>
            <v-icon>{{ page.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ page.title }}</v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>

        <!-- Manually created tiles -->
        <v-list-tile v-if="!user" @click="authDialogAction">

          <v-list-tile-action>
            <v-icon>person_add</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Sign up</v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>

        <v-list-tile v-if="!user" @click="authDialogAction">

          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Sign in</v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>

        <v-list-tile v-if="user">

          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Sign out</v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>

      </v-list>

    </v-navigation-drawer>

  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Popup from './Popup'

export default {
  name: 'Navbar',

  components: {
    Popup
  },

  data() {
    return {
      drawer: false,
      navigations: [
        { title: 'Map', icon: 'location_on', color: 'green darken-1', route: '/map' },
        { title: 'About', icon: 'info', color: 'green darken-1', route: '/about' }
      ],
    }
  },

  methods: {
    log() {
      console.log('Clicked nav');
    },
    ...mapActions([
      'authDialogAction'
    ])
  },

  computed: {
    ...mapState([
      'user',
      'authDialog'
    ])
  }
}
</script>

<style lang="css" scoped>
</style>
