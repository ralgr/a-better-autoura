<template lang="html">
  <!-- Navigation menu type: Hamburger -->
  <v-navigation-drawer
    :value="mobileNavDialogGetter"
    absolute
    stateless
    app
  >
    <v-toolbar flat color="transparent">
      <v-spacer></v-spacer>
      <v-btn
        flat icon color="primary"
        @click="toCloseMobileNav">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- Avatar information -->
    <v-layout column wrap align-center v-if="userGetter">
      <v-flex class="ma-4">

      <!-- Avatar image -->
      <v-avatar
        size="avatarSize"
        color="success">
        <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="User image.">
      </v-avatar>

      </v-flex>

      <p>{{ userGetter }}</p>

    </v-layout>

    <!-- Navigation tile -->
    <v-list class="pt-4">
      <!-- Manually created tiles -->
      <!-- Map tile -->
      <v-list-tile router to="/">

        <v-list-tile-action>
          <v-icon>map</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>Map</v-list-tile-title>
        </v-list-tile-content>

      </v-list-tile>

      <!-- Sign up tile -->
      <v-list-tile v-if="!userGetter" router to="/sign-up">

        <v-list-tile-action>
          <v-icon>person_add</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>Sign up</v-list-tile-title>
        </v-list-tile-content>

      </v-list-tile>

      <!-- Sign in tile -->
      <v-list-tile v-if="!userGetter" router to="/sign-in">

        <v-list-tile-action>
          <v-icon>person</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>Sign in</v-list-tile-title>
        </v-list-tile-content>

      </v-list-tile>

      <!-- Sign out tile -->
      <v-list-tile v-if="userGetter" @click="toSignOut">

        <v-list-tile-action>
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>Sign out</v-list-tile-title>
        </v-list-tile-content>

      </v-list-tile>

    </v-list>

  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'MobileNav',

  methods: {
    ...mapActions([
      'clearUserAction',
      'closeMobileNavAction'
    ]),
    toSignOut() {
      this.clearUserAction();
    },
    toCloseMobileNav() {
      this.closeMobileNavAction();
    }
  },

  computed: {
    ...mapGetters([
      'mobileNavDialogGetter',
      'userGetter'
    ])
  }
}
</script>

<style lang="css" scoped>
</style>
