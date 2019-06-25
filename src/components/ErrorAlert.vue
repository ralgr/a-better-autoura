<template lang="html">
  <v-snackbar
    v-if="errorAppAlertGetter"
    :value="errorAppAlertGetter"
    top
    :timeout="0"
    auto-height
    :color="errorAppAlertGetter.color"
  >
    {{ errorAppAlertGetter.msg }}
    <v-btn flat color="error darken-2" @click.native="toCloseAlert">
      <v-icon>close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Alert',

  methods: {
    ...mapActions([
      'clearErrorAppAlertAction'
    ]),
    toCloseAlert() {
      //Close alert here
      this.clearErrorAppAlertAction()
    }
  },

  computed: {
    ...mapGetters([
      'errorAppAlertGetter'
    ])
  }
}
</script>

<style lang="css" scoped>
</style>
