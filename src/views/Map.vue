<template lang="html">
  <div class="map">

    <v-layout row wrap>
      <v-flex xs12>

        <v-card >
          <v-btn
                color="pink"
                dark
                absolute
                bottom
                right
                fab
                @click="openMapUi"
              >
                <v-icon>search</v-icon>
              </v-btn>
          <Mapui/>

          <v-responsive height="80vh">
            <l-map :zoom="zoom"
                   :center="center"
                   style="z-index: 0"
                   >
               <l-tile-layer :url="url"
                             :attribution="attribution"></l-tile-layer>
               <!-- <l-marker  v-for="(stop, index) in locations"
                          :key="stop.stop_id"
                          :lat-lng="createMarker(stop.location.geocode.lat, stop.location.geocode.lng)"
                          :z-index-offset="stop.zIndex">
                  <l-popup>
                    <span class="stop-visuals">
                      <strong>{{ stop.name }}<br/></strong>
                    </span>
                    {{ stop.location.address }}<br/>
                    <button type="button"
                            class="btn btn-primary"
                            @click="openDescription(index)">Description</button>
                  </l-popup>
                  <l-icon :icon-size="stop.iconSize"
                          :icon-url="icon">
                  </l-icon>
               </l-marker> -->
            </l-map>
          </v-responsive>

        </v-card>

      </v-flex>
    </v-layout>

  </div>
</template>

<script>
import {LMap, LTileLayer, LMarker, LPopup, LIcon} from 'vue2-leaflet'
import Mapui from '@/components/Mapui'
import { mapActions } from 'vuex'

export default {
  name: 'Map',

  components: {
    Mapui,
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LIcon,
  },

  data() {
    return {
      center: L.latLng(-8.173828125000002, 21.453068633086783),
      zoom: 3,
      url:'https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=7322db1e4e254654a10f61d4a4b906c3',
      attribution:'&copy; <a href="https://www.thunderforest.com/privacy/">Thunderforest</a>',
    }
  },

  methods: {
    ...mapActions([
      'openDrawerAction'
    ]),
    openMapUi() {
      this.openDrawerAction()
    }
  }
}
</script>

<style lang="css" scoped>
</style>
