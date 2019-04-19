<template lang="html">
  <div class="footer">
    <v-footer
    dark
    height="auto" app>

      <v-layout row wrap justify-center>

        <strong class="caption font-weight-light grey--text">&copy;2019 — InformationMap</strong>

      </v-layout>

    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',

  data() {
    return {
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram'
      ]
    }
  }
}
</script>

<style lang="css" scoped>

</style>
