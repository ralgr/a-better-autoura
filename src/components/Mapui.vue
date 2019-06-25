<template lang="html">
  <div class="mapui">
    <!-- Location list drawer -->
    <v-navigation-drawer
        :value="drawerGetter"
        hide-overlay
        stateless
        temporary
        class="pt-2"
        height="80vh"
        :style="{display: isOpen}">

      <!-- Tab Changer -->
      <v-layout column wrap align-center>
        <v-layout row wrap v-if="userGetter">
          <v-btn
            flat @click="tab = 'stops'"
            color="orange"
            :class="{'orange lighten-4': tab == 'stops'}">
            Stops
            <v-icon right>map</v-icon>
          </v-btn>
          <v-btn
            flat @click="tab = 'saves'"
            color="orange"
            v-if="userGetter"
            :class="{'orange lighten-4': tab == 'saves'}">
            Saves
            <v-icon right>bookmark</v-icon>
          </v-btn>
        </v-layout>

        <!-- Group content selection -->
        <v-list v-if="tab == 'stops'" class="ma-3">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-list-tile >
                <v-list-tile-action v-on="on">
                  <v-icon color="orange">people</v-icon>
                </v-list-tile-action>

                <v-list-tile-content v-on="on">
                  <v-flex pt-2 xs12 d-flex>
                    <v-select
                      :items="groupCont"
                      label="group context"
                      v-model="pickedContext"
                      color="orange"></v-select>
                  </v-flex>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <span>Select group context</span>
          </v-tooltip>
        </v-list>

        <!-- Location list  -->
        <v-flex v-if="tab == 'stops'" xs12>
          <v-list three-line scrollable>
            <v-subheader>Locations</v-subheader>
              <template v-for="(stop, index) in stopsGetter">

                <v-divider :key="stop.stop_id + index"></v-divider>

                <!-- Location details per result -->
                  <v-list-tile
                    :key="stop.stop_id"
                    avatar
                    @click="moreInfo(index, 'locations')"
                    @mouseover="biggify(index)"
                    @mouseleave="smallify(index)"
                    :class="{'orange lighten-5': stop.isHighlighted}"
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
                      <v-list-tile-title class="orange--text" v-html="stop.name"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="stop.location.address"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>

              </template>
            </v-list>
        </v-flex>

        <!-- Saves tab -->
        <v-flex v-if="tab == 'saves'" xs12>
          <v-list three-line scrollable>
            <v-subheader>Saves for {{ userGetter }}</v-subheader>
              <template v-for="(stop, index) in savedLocationsGetter">

                <v-divider :key="index"></v-divider>

                <!-- Location details per result -->
                  <v-list-tile
                    :key="stop.title"
                    avatar
                    @click="moreInfo(index, 'saves')"
                    :class="{'orange lighten-5': stop.isHighlighted}"
                  >
                    <!-- Avatar image -->
                    <v-list-tile-avatar>
                      <v-img
                        :src="stop.picture.url">
                      </v-img>
                    </v-list-tile-avatar>

                    <!-- Text content -->
                    <v-list-tile-content>
                      <v-list-tile-title class="orange--text" v-html="stop.name"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="stop.location.address"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>

              </template>
            </v-list>
        </v-flex>
      </v-layout>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { AUTORA_KEY } from '@/config/Autoura'
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
      iconSize: [[30, 30], [100, 100]],
      zIndex: [0, 9999],
      tab: 'stops'
    }
  },

  methods: {
    ...mapActions([
      'setStopsAction',
      'setInfoAction',
      'openInfoAction',
      'biggifyAction',
      'smallifyAction',
      'getStopsAction',
      'getSavesAction'
    ]),
    getStops() {
      const payload = {
        key: AUTORA_KEY,
        context: this.pickedContext,
        iconSize: this.iconSize,
        zIndex: this.zIndex
      }

      this.getStopsAction(payload)
    },
    moreInfo(index, context) {
      if (context == 'saves') {
        let payload = {
          loc: this.savedLocationsGetter[index],
          context: context
        }

        // Selects the location to display in the Moreinfo component
        this.setInfoAction(payload)
      }

      if (context == 'locations') {
        let payload = {
          loc: this.stopsGetter[index],
          context: context
        }

        // Selects the location to display in the Moreinfo component
        this.setInfoAction(payload)
      }

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
    },
    toResetTabs() {
      this.tab = "stops"
    }
  },

  computed: {
    ...mapGetters([
      'stopsGetter',
      'drawerGetter',
      'savedLocationsGetter',
      'userGetter'
    ]),
    isOpen() {
      return this.drawerGetter == false ? 'none' : 'block'
    }
  },

  watch: {
    pickedContext: {
      handler: 'getStops',
      immediate: true
    },

    userGetter: {
      handler: 'toResetTabs',
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
