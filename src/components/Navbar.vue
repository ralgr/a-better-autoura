<template lang="html">
  <nav>

    <!-- Main navigation body -->
    <v-toolbar app
               flat
               >

      <!-- Hamburger menu for xs-s devices -->
      <v-toolbar-side-icon v-show="!mobileNavDialogGetter" @click.stop="toOpenMobileNav"
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
        <!-- Manually created buttons -->
        <!-- Map -->
        <v-btn flat
               color="amber darken-3"
               class="hidden-sm-and-down"
               router to="/">
          <span>Map</span>
          <v-icon right>map</v-icon>
        </v-btn>
        <!-- Sign up -->
        <v-btn flat
               color="amber darken-3"
               class="hidden-sm-and-down"
               v-if="!userGetter"
               router to="/sign-up">
          <span>Sign up</span>
          <v-icon right>person_add</v-icon>
        </v-btn>
        <!-- Sign in -->
        <v-btn flat
               color="amber darken-3"
               class="hidden-sm-and-down"
               v-if="!userGetter"
               router to="/sign-in">
          <span>Sign in</span>
          <v-icon right>person</v-icon>
        </v-btn>
      </v-toolbar-items>

      <!-- [[ User icon menu popover ]] -->
      <div class="text-xs-center">
        <!-- Menu body -->
        <v-menu
          :close-on-content-click="true"
          offset-y
          v-if="userGetter"
        >

          <!-- Avatar icon on toolbar -->
          <template v-slot:activator="{ on }">
            <v-avatar color="indigo lighten-1"
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
                  <v-list-tile-title>{{ userGetter }}</v-list-tile-title>
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
                       v-if="userGetter"
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
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { db } from '@/config/Firebase'

export default {
  name: 'Navbar',

  data() {
    return {
      locations: []
    }
  },

  methods: {
    ...mapActions([
      'clearUserAction',
      'findStopAction',
      'openMobileNavAction'
    ]),
    signOut() {
      // Sign out user
      this.clearUserAction()
    },
    find(lat, lng) {
      let payload = {
        lat: lat,
        lng: lng
      }
      this.findStopAction(payload)
    },
    deleteSaves(id) {
      db.collection("saved-stops").doc(id).delete();
    },
    toOpenMobileNav() {
      this.openMobileNavAction();
    }
  },

  computed: {
    ...mapGetters([
      'userGetter',
      'mobileNavDialogGetter'
    ])
  }
}
</script>

<style lang="css" scoped>
  .avatar-micon {
    cursor: pointer;
  }
</style>
