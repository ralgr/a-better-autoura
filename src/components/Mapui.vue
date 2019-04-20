<template lang="html">
  <div class="mapui">


    <v-layout column wrap>

      <v-navigation-drawer
        :value="drawer"
        hide-overlay
        stateless
        temporary
        light
        height="80vh"
        :style="{display: isOpen}"
      >

      <v-list class="ma-3">
        <v-list-tile

        >
          <v-list-tile-action>
            <v-icon>people</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-flex pt-2 xs12 d-flex>
              <v-select
                :items="groupCont"
                label="group context"
                v-model="pickedContext"
              ></v-select>
            </v-flex>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-flex xs12>

        <v-list three-line scrollable>
          <v-subheader>Results</v-subheader>
            <template v-for="(stop, index) in stops">

              <v-divider></v-divider>


                <v-list-tile
                  :key="stop.stop_id"
                  avatar
                  @click="moreInfo(index)"
                >
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
        ]
    }
  },

  methods: {
    ...mapActions([
      'setStopsAction',
      'setInfoAction',
      'openInfoAction'
    ]),
    getStops() {
      const autora = axios.create({ headers: { 'Authorization': 'Bearer ' + AUTORA_KEY } })
      var url = `https://api.autoura.com/api/stops/search?group_context=${this.pickedContext}&stop_types=food`
      autora.get(url)
      .then(r => {

        // Stops are sent to the store
        this.setStopsAction(r.data.response);
      }).catch(e => {

        // Log error
        console.log(e);

      });
    },
    moreInfo(index) {
      this.setInfoAction(this.stops[index])
      this.openInfoAction()
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
