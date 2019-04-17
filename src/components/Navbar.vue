<template lang="html">
  <nav>

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
               router to="/sign-up">
          <span>Sign up</span>
          <v-icon right>person_add</v-icon>
        </v-btn>
        <!-- Sign in -->
        <v-btn flat
               color="amber darken-3"
               class="hidden-sm-and-down"
               v-if="!user"
               router to="/sign-in">
          <span>Sign in</span>
          <v-icon right>person</v-icon>
        </v-btn>
      </v-toolbar-items>

      <!-- User icon menu popover -->
      <div class="text-xs-center">
        <!-- Menu body -->
        <v-menu
          :close-on-content-click="true"
          offset-y
          v-if="user"
        >

          <!-- Avatar icon on toolbar -->
          <template v-slot:activator="{ on }">
            <v-avatar color="indigo"
                      v-on="on"
                      class="avatar-micon ml-4 hidden-sm-and-down">
              <v-icon dark>account_circle</v-icon>
            </v-avatar>
          </template>

          <v-card>

            <!-- User on card -->
            <v-list>
              <v-list-tile>
                <!-- User on menu popover -->
                <v-list-tile-content>
                  <v-list-tile-title>{{ user }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>

            <v-divider></v-divider>

            <!-- Menu popover buttons -->
            <v-list>
              <v-list-tile>

                <v-btn flat round left
                       color="amber darken-3"
                       class="hidden-sm-and-down"
                       v-if="user"
                       :loading="loading"
                       @click="signOut">
                  <span>Sign out</span>
                  <v-icon right>exit_to_app</v-icon>
                </v-btn>

              </v-list-tile>
            </v-list>
          </v-card>

        </v-menu>
      </div>

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
      <v-layout column wrap align-center v-if="user">
        <v-flex class="ma-4">

        <!-- Avatar image -->
        <v-avatar
          size="avatarSize"
          color="success">
          <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="User image.">
        </v-avatar>

        </v-flex>

        <p>{{ user }}</p>

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
        <!-- Sign up tile -->
        <v-list-tile v-if="!user" router to="/sign-up">

          <v-list-tile-action>
            <v-icon>person_add</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Sign up</v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>

        <!-- Sign in tile -->
        <v-list-tile v-if="!user" router to="/sign-in">

          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Sign in</v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>

        <!-- Sign out tile -->
        <v-list-tile v-if="user" @click="signOut">

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
import { fb } from '@/config/Firebase'

export default {
  name: 'Navbar',

  components: {

  },

  data() {
    return {
      drawer: false,
      navigations: [
        { title: 'Map', icon: 'location_on', color: 'green darken-1', route: '/' },
        { title: 'About', icon: 'info', color: 'green darken-1', route: '/about' }
      ],
      loading: false
    }
  },

  methods: {
    ...mapActions([
      'clearUserAction'
    ]),
    signOut() {
      // Show loading animation
      this.loading = true

      // Sign out user
      fb.auth().signOut()
      .then(() => {
        console.log('Log out success');

        // Clear user in the store
        this.clearUserAction()

        // Stop loading animation
        this.loading = false

        // Push to sign in
        this.$router.push('/sign-in');
      })
    }
  },

  computed: {
    ...mapState([
      'user'
    ])
  }
}
</script>

<style lang="css" scoped>
  .avatar-micon {
    cursor: pointer;
  }
</style>
