<template lang="html">
  <div class="moreInfo" v-if="infoGetter">
    <v-dialog
      :value="dialogGetter"
      width="500"
      persistent
      light
    >

      <v-layout row>
        <v-flex xs12>
          <v-card>

            <!-- Image from cloudinary -->
            <v-img aspect-ratio="1"
                   max-height="300"
                   class="hidden-sm-and-down"
                   :src="infoGetter.picture.url">

              <!-- MD and UP UI -->
              <v-layout column fill-height>
                <v-card-title>
                <!-- Close card button -->
                 <v-btn
                  icon dark flat
                  @click="openInfoAction">
                   <v-icon large>close</v-icon>
                 </v-btn>

                 <v-spacer></v-spacer>

                 <!-- Find function without tooltip -->
                 <v-btn
                  icon
                  color="orange"
                  @click="find(infoGetter.location.geocode.lat, infoGetter.location.geocode.lng)">
                   <v-icon color="white">my_location</v-icon>
                 </v-btn>
                 <!-- Save location without tooltip -->
                 <v-btn
                  v-if="userGetter && contextGetter == 'locations'"
                  icon
                  color="primary"
                  @click="save">
                   <v-icon>bookmark</v-icon>
                 </v-btn>
                 <v-btn
                  v-if="userGetter && contextGetter == 'saves'"
                  icon
                  color="error"
                  @click="toDeleteSave">
                   <v-icon>delete</v-icon>
                 </v-btn>
                </v-card-title>

                 <v-spacer></v-spacer>

                 <v-card-title primary-title class="white--text pl-5 pt-5">
                   <h3 class="display-1">{{ infoGetter.name }}</h3>
                 </v-card-title>
              </v-layout>
            </v-img>

            <v-card :class="{'pa-2': $vuetify.breakpoint.xsOnly, 'pa-4': $vuetify.breakpoint.smAndUp}">
              <v-card-title primary-title class="hidden-md-and-up">
                <h3 class="headline pb-0">{{ infoGetter.name }}</h3>
              </v-card-title>
              <v-divider class="hidden-md-and-up"></v-divider>

              <!-- List for Description -->
              <v-card-text>
                <p class="subheading mb-2">Information</p>
                <div class="body-1">{{ infoGetter.summary }}</div>
              </v-card-text>

              <v-card-text>
                <p class="subheading mb-2">Accessibility</p>
                {{ wheelchair }}
              </v-card-text>

              <v-card-text>
                <p class="subheading mb-2">Address</p>
                {{ infoGetter.location.address }}
              </v-card-text>

              <v-card-text v-if="infoGetter.website_url">
                <p class="subheading mb-2">Website</p>
                <a :href="infoGetter.website_url"
                   target="_blank"
                   rel="noopener noreferrer">
                   {{ infoGetter.website_url }}
                 </a>
              </v-card-text>

              <!-- Card actions -->
              <v-card-actions class="hidden-md-and-up">
                <!-- Find function with tooltip -->
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn flat color="orange" icon large v-on="on" @click="find(infoGetter.location.geocode.lat, infoGetter.location.geocode.lng)">
                      <v-icon large>my_location</v-icon>
                    </v-btn>
                  </template>
                  <span>Find on map</span>
                </v-tooltip>
                <!-- Save location with tooltip -->
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn v-if="userGetter && contextGetter == 'locations'" flat color="primary" icon large v-on="on" @click="save">
                      <v-icon large>bookmark</v-icon>
                    </v-btn>
                  </template>
                  <span>Save location</span>
                </v-tooltip>
                <!-- Save location with tooltip -->
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn v-if="userGetter && contextGetter == 'saves'" flat color="error" icon large v-on="on" @click="toDeleteSave">
                      <v-icon large>delete</v-icon>
                    </v-btn>
                  </template>
                  <span>Delete save</span>
                </v-tooltip>
                <v-spacer></v-spacer>
                <v-btn  round flat color="green" @click="openInfoAction">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-card>
        </v-flex>
      </v-layout>

    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Moreinfo',

  methods: {
    ...mapActions([
      'openInfoAction',
      'findStopAction',
      'saveStopsAction',
      'deleteSaveAction'
    ]),
    find(lat, lng) {
      let payload = {
        lat: lat,
        lng: lng
      }
      this.findStopAction(payload)
    },
    save() {
      // Save Stops
      this.saveStopsAction()
    },
    toDeleteSave() {
      this.deleteSaveAction(this.infoGetter.id)
    }
  },

  computed: {
    ...mapGetters([
      'userGetter',
      'dialogGetter',
      'infoGetter',
      'contextGetter'
    ]),
    wheelchair() {
      return this.infoGetter.accessibility.wheelchair ? 'Wheelchair access available.' : 'No wheelchair access / Undefined.'
    }
  }
}
</script>

<style lang="css" scoped>
</style>
