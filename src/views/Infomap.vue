<template lang="html">
  <div class="map">
    <v-layout row wrap fill-height>
      <v-flex xs12>
        <!-- Map card container -->
        <v-card>

          <!-- FAB button to open UI -->
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn color="orange"
                       dark
                       absolute
                       bottom
                       left
                       fab
                       v-on="on"
                       @click="openMapUi">
                    <v-icon>search</v-icon>
                  </v-btn>
              </template>
              <span>Show location list</span>
            </v-tooltip>

          <!-- Map UI custom component -->
          <Mapui/>

          <!-- Information card component -->
          <Moreinfo/>

          <v-responsive height="80vh">
            <Leaflet/>
          </v-responsive>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Mapui from '@/components/Mapui'
import Moreinfo from '@/components/Moreinfo'
import Leaflet from '@/components/Leaflet'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Infomap',

  components: {
    Moreinfo,
    Mapui,
    Leaflet,
  },

  data() {
    return {

    }
  },

  methods: {
    ...mapActions([
      'openDrawerAction',
      'getSavesAction'
    ]),
    openMapUi() {
      this.openDrawerAction()
    }
  },
   computed: {
     ...mapGetters([
       'savedLocationsGetter'
     ])
   },
   mounted() {
     this.getSavesAction();
   }
}
</script>

<style lang="css" scoped>
.map {
  min-height: 80vh;
}
</style>
