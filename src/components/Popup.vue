<template lang="html">
  <div class="Authform">
    <v-layout row justify-center>
    <v-dialog v-model="authDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card color="amber darken-1">

        <!-- Toolbar -->
        <v-toolbar dark flat color="amber darken-1">
          <v-spacer></v-spacer>
          <v-btn icon fab class="mt-4" @click="authDialogAction">
            <v-icon color="red lighten-1">close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-flex xs11 md6 lg4 xl3 offset-xs0 offset-md2 offset-lg2>
          <v-card-title primary-title>
            <h1 class="display-4">Sign up</h1>
          </v-card-title>

          <v-card-text>

            <Authform :signIn="false"/>

          </v-card-text>
        </v-flex>

      </v-card>
    </v-dialog>
  </v-layout>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Authform from './Authform'

export default {
  name: 'Popup',

  components: {
    Authform
  },

  data() {
    return {

    }
  },

  methods: {
    ...mapActions([
      'authDialogAction'
    ]),
  },

  computed: {
    ...mapState([
      'authDialog'
    ]),
  }
}
</script>

<style lang="css" scoped>
</style>
