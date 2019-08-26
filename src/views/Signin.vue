<template lang="html">
  <div class="signIn">
      <v-layout row wrap>
        <v-flex xs12 v-if="user">
          <h1 class="title">{{ user }} is currently logged in.</h1>
          <p class="grey--text text--darken-2">Returning to the map...</p>  
        </v-flex>
        <v-flex xs12>
          <v-card flat color="transparent" v-if="!user">
              <v-flex xs11 md6 lg4 xl3 offset-xs0 offset-md2 offset-lg2>
                <v-card-title primary-title>
                  <h1 class="display-1">Sign in</h1>
                </v-card-title>

                <v-card-text>
                  <Authform :signIn="true"/>
                </v-card-text>
              </v-flex>

          </v-card>

        </v-flex>
      </v-layout>
  </div>
</template>

<script>
import Authform from '@/components/Authform'
import { log } from 'util';

export default {
  name: 'Signin',

  components: {
    Authform
  },

  computed: {
    user() {     
      return this.$store.getters.userGetter
    }
  },
  
  updated() {
    if (this.$store.getters.userGetter) {
      setTimeout(() => {
        this.$router.push('/');    
      }, 3000); 
    }
  }
}
</script>

<style lang="css" scoped>
</style>
