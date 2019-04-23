<template lang="html">
  <l-map :zoom="zoom"
         :center="center"
         @update:center="updateCenter"
         @update:zoom="updateZoom"
         style="z-index: 0"
         >
     <l-tile-layer :url="url"
                   :attribution="attribution"></l-tile-layer>
     <l-marker  v-for="stop in stops"
                :key="stop.stop_id"
                :lat-lng="createMarker(stop.location.geocode.lat, stop.location.geocode.lng)"
                :z-index-offset="stop.zIndex">
        <l-popup>
          <span class="stop-visuals">
            <strong>{{ stop.name }}<br/></strong>
          </span>
          {{ stop.location.address }}<br/>
          <button type="button"
                  >More info</button>
        </l-popup>
        <l-icon :icon-size="stop.iconSize"
                :icon-url="icon">
        </l-icon>
     </l-marker>
  </l-map>
</template>

<script>
import {LMap, LTileLayer, LMarker, LPopup, LIcon} from 'vue2-leaflet'
import iconUrl from '@/assets/pin.svg'
import { mapState } from 'vuex'

export default {
  name: 'Leaflet',

  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LIcon
  },

   data() {
     return {
       center: L.latLng(51.54718906424884, -0.14007568359375003),
       zoom: 10,
       url:'https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=7322db1e4e254654a10f61d4a4b906c3',
       attribution:'&copy; <a href="https://www.thunderforest.com/privacy/">Thunderforest</a>',
       icon: iconUrl
     }
   },

   methods: {
     createMarker(lat, lng) {
       return L.latLng(lat, lng)
     },
     updateZoom(zoom) {
       // Update zoom on zoom
       this.zoom = zoom;
     },
     updateCenter(center) {
       // Update center on re-center
       this.center = center;
     },
     findStop() {
       // Re centers the map on the selected location
        this.center = L.latLng(this.latlng.lat, this.latlng.lng)
        this.zoom = 18
     }
   },

   computed: {
     ...mapState([
       'stops',
       'latlng'
     ])
   },

   watch: {
     latlng: {
       handler: 'findStop'
     }
   }
}
</script>

<style lang="css" scoped>
</style>
