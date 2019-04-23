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
        <!-- Saved locations -->
        <v-menu
          :close-on-content-click="false"
          :nudge-width="200"
          offset-y
          v-if="user"
        >

        <!-- Button activator to open Saves -->
        <template v-slot:activator="{ on }">
          <v-btn flat
                 color="blue"
                 class="hidden-sm-and-down"
                 v-on="on">
            <span>Saves</span>
            <v-icon right>bookmark</v-icon>
          </v-btn>
          <!-- Saves icon for smaller devices -->
          <v-btn icon flat outline color="blue" class="hidden-md-and-up" v-on="on">
            <v-icon>bookmark</v-icon>
          </v-btn>
        </template>

        <!-- Cord to contain cards for each location -->
          <v-card light depressed class="pa-2">
            <v-layout row wrap>

              <v-flex xs12>
                <v-card v-if="!locations.length">
                  <v-card-text>
                    <p>No saved locations</p>
                  </v-card-text>
                </v-card>
              </v-flex>

              <!-- Location card skeleton -->
              <v-flex xs12 v-for="stop in locations" :key="stop.stop_id">
                <v-card class="ma-2">
                  <!-- Location title -->
                  <v-card-title primary-title>
                    <div>
                      <h3 class="headline mb-0">{{ stop.name }}</h3>
                      <div> {{ stop.summary }} </div>
                    </div>
                  </v-card-title>

                  <!-- Important location information -->
                  <v-card-text>
                    <div>
                      <v-icon left>accessible</v-icon>{{ stop.accessibility.wheelchair ? 'Wheelchair access available.' : 'No wheelchair access / Undefined.' }}
                    </div>
                    <div>
                      <v-icon left>location_on</v-icon>{{ stop.location.address }}
                    </div>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <!-- Find function with tooltip -->
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-btn flat fab color="green" v-on="on" @click="find(stop.location.geocode.lat, stop.location.geocode.lng)">
                          <v-icon>my_location</v-icon>
                        </v-btn>
                      </template>
                      <span>Find on map</span>
                    </v-tooltip>
                    <!-- Save location with tooltip -->
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-btn flat fab color="red" v-on="on" @click="deleteSaves(stop.id)">
                          <v-icon>delete</v-icon>
                        </v-btn>
                      </template>
                      <span>Delete save</span>
                    </v-tooltip>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card>
        </v-menu>

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
        <!-- Saves tile -->
        <v-list-tile v-if="user">

          <v-list-tile-action>
            <v-icon>bookmark</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Saves</v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>
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
import { fb, db } from '@/config/Firebase'

export default {
  name: 'Navbar',

  data() {
    return {
      drawer: false,
      navigations: [
        { title: 'Map', icon: 'location_on', color: 'green darken-1', route: '/' },
        { title: 'About', icon: 'info', color: 'green darken-1', route: '/about' }
      ],
      loading: false,
      locations: []
    }
  },

  methods: {
    ...mapActions([
      'clearUserAction',
      'findStopAction'
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
    },
    find(lat, lng) {
      let payload = {
        lat: lat,
        lng: lng
      }
      this.findStopAction(payload)
    },
    deleteSaves(id) {
      db.collection("saved-stops").doc(id).delete()
      .then(() => {
          console.log("Document successfully deleted!");
      }).catch(error => {
          console.error("Error removing document: ", error);
      });
    }
  },

  computed: {
    ...mapState([
      'user',

    ])
  },

  mounted() {
    console.log(this.user + 'from mounted');
    db.collection('saved-stops').onSnapshot(result => {
      // Clear old data
      this.locations = [];

      // Populate with new data
      result.forEach(loc => {
        if (loc.data().user == this.user) {
          this.locations.push({
            id: loc.id,
            // Spread the data inside object
            ...loc.data().obj
          })
        }
      })
    });
    console.log(this.locations);
  }
}
</script>

<style lang="css" scoped>
  .avatar-micon {
    cursor: pointer;
  }
</style>
