<template lang="html">
  <div class="signIn">
      <v-layout row wrap>
        <v-flex xs12>

          <v-card flat color="transparent">
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

export default {
  name: 'Signin',

  components: {
    Authform
  }
}
</script>

<style lang="css" scoped>
</style>
