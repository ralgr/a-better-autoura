<template lang="html">
  <div class="signUp">
      <v-layout row wrap>
        <v-flex xs12>

          <v-card flat color="transparent">
              <v-flex xs11 md6 lg4 xl3 offset-xs0 offset-md2 offset-lg2>
                <v-card-title primary-title>
                  <h1 class="display-1">Sign up</h1>
                </v-card-title>

                <v-card-text>

                  <Authform :signIn="false"/>

                </v-card-text>
              </v-flex>

          </v-card>

        </v-flex>
      </v-layout>
  </div>
</template>

<script>
import Authform from '@/components/Authform'

export default {
  name: 'Signup',

  components: {
    Authform
  },

  beforeRouteEnter (to, from, next) {
    // Guard for reloads
    // Redirects to InfoMap view on page reload or manual URL entry
    next(vm => {
      // Checks if "user" is not null on the store
      if (vm.$store.getters.userGetter == null) {
        // Redirect to map view if "user" is null
        next({name: 'map'})
      }
      // Continues to load the view if "user" is not null
    })
  }
}
</script>

<style lang="css" scoped>
</style>
