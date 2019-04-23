<template lang="html">
  <div class="mapui">


    <v-layout column wrap>

      <!-- Location list drawer -->
      <v-navigation-drawer
        :value="drawer"
        hide-overlay
        stateless
        temporary
        light
        height="80vh"
        :style="{display: isOpen}"
      >

      <!-- Group content selection -->
      <v-list class="ma-3">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-list-tile >
              <v-list-tile-action v-on="on">
                <v-icon>people</v-icon>
              </v-list-tile-action>

              <v-list-tile-content v-on="on">
                <v-flex pt-2 xs12 d-flex>
                  <v-select
                    :items="groupCont"
                    label="group context"
                    v-model="pickedContext"
                  ></v-select>
                </v-flex>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <span>Select group context</span>
        </v-tooltip>
      </v-list>

      <!-- Location list  -->
      <v-flex xs12>
        <v-list three-line scrollable>
          <v-subheader>Results</v-subheader>
            <template v-for="(stop, index) in stops">

              <v-divider :key="stop.stop_id + index"></v-divider>

              <!-- Location details per result -->
                <v-list-tile
                  :key="stop.stop_id"
                  avatar
                  @click="moreInfo(index)"
                  @mouseover="biggify(index)"
                  @mouseleave="smallify(index)"
                >
                  <!-- Avatar image -->
                  <v-list-tile-avatar>
                    <cld-image :cloudName="stop.picture.cloudinary_cloud_name"
                               :publicId="stop.picture.cloudinary_public_id"
                               secure="true"
                               dpr="auto"
                               width="auto"
                               crop="scale">
                      <cld-transformation crop="thumb"/>
                    </cld-image>
                  </v-list-tile-avatar>

                  <!-- Text content -->
                  <v-list-tile-content>
                    <v-list-tile-title v-html="stop.name"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="stop.location.address"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

            </template>
          </v-list>
      </v-flex>

      </v-navigation-drawer>

    </v-layout>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { AUTORA_KEY } from '@/config/Autoura'
import axios from 'axios'
import {CldImage, CldTransformation} from 'cloudinary-vue'

export default {
  name: 'Mapui',

  components: {
    CldImage,
    CldTransformation
  },

  data() {
    return {
      groupCont: [
        'solo',
        'couple',
        'friends',
        'kids',
        'teenagers',
        'group',
        'party',
      ],
      pickedContext: '',
      items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' }
      ],
      iconSize: [[50, 50], [100, 100]],
      zIndex: [0, 9999],
    }
  },

  methods: {
    ...mapActions([
      'setStopsAction',
      'setInfoAction',
      'openInfoAction',
      'biggifyAction',
      'smallifyAction'
    ]),
    getStops() {
      const autora = axios.create({ headers: { 'Authorization': 'Bearer ' + AUTORA_KEY } })
      var url = `https://api.autoura.com/api/stops/search?group_context=${this.pickedContext}&stop_types=food`
      autora.get(url)
      .then(r => {

        // Mapping new data on each result
        let response = r.data.response.map(response => {

          // Icon size data
          response.iconSize = this.iconSize[0];
          // Z index data
          response.zIndex = this.zIndex[0];

          return response;
        })

        // Stops are sent to the store
        this.setStopsAction(response);
      }).catch(e => {

        // Log error
        console.log(e);

      });
    },
    moreInfo(index) {
      // Selects the location to display in the Moreinfo component
      this.setInfoAction(this.stops[index])
      // Opens the Moreinfo component
      this.openInfoAction()
    },
    biggify(index) {
      let payload = {
        index: index,
        iconSize: this.iconSize[1],
        zIndex: this.zIndex[1]
      }
      this.biggifyAction(payload)
    },
    smallify(index) {
      let payload = {
        index: index,
        iconSize: this.iconSize[0],
        zIndex: this.zIndex[0]
      }
      this.smallifyAction(payload)
    }
  },

  computed: {
    ...mapState([
      'stops',
      'drawer'
    ]),
    isOpen() {
      return this.drawer == false ? 'none' : 'block'
    }
  },

  watch: {
    pickedContext: {
      handler: 'getStops',
      immediate: true
    }
  }
}
</script>

<style lang="css" scoped>
  .mapui {
    position: absolute;
    z-index: 1
  }
</style>
