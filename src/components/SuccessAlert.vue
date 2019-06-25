<template lang="html">
  <v-snackbar
    v-if="successAppAlertGetter"
    :value="successAppAlertGetter"
    top
    :timeout="0"
    auto-height
    :color="successAppAlertGetter.color"
  >
    {{ successAppAlertGetter.msg }}
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
      'clearSuccessAppAlertAction'
    ]),
    toCloseAlert() {
      //Close alert here
      this.clearSuccessAppAlertAction()
    }
  },

  computed: {
    ...mapGetters([
      'successAppAlertGetter'
    ])
  }
}
</script>

<style lang="css" scoped>
</style>
