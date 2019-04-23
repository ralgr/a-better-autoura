<template lang="html">
  <div class="moreInfo" v-if="info">
    <v-dialog
      :value="dialog"
      width="500"
      persistent
      light
    >

      <v-layout row>
        <v-flex xs12>
          <v-card>

            <v-img height="300" class="hidden-sm-and-down">
              <!-- Image from cloudinary -->
              <cld-image :cloudName="info.picture.cloudinary_cloud_name"
                         :publicId="info.picture.cloudinary_public_id"
                         secure="true"
                         dpr="auto"
                         width="auto"
                         crop="scale">
                <cld-transformation crop="thumb"
                                    height="400"/>
              </cld-image>
            </v-img>

            <v-card-text>
              <p class="display-1 text-xs-center">{{ info.name }}</p>
            </v-card-text>

            <!-- List for Description -->
            <v-list three-line class="px-3">

              <!-- Description tile -->
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon color="blue" >info</v-icon>
                </v-list-tile-action>

                <v-list-tile-action>
                  <v-list-tile-action-text class="body-2 font-weight-light grey--text text--darken-4">
                    {{ info.summary }}
                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>

              <!-- Accessibility tile -->
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon color="green" >accessible</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-action-text class="body-2 font-weight-light grey--text text--darken-4">
                    {{ wheelchair }}
                  </v-list-tile-action-text>
                </v-list-tile-content>
              </v-list-tile>

              <!-- Location tile -->
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon color="red" >location_on</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-action-text class="body-2 font-weight-light grey--text text--darken-4">
                    {{ info.location.address }}
                  </v-list-tile-action-text>
                </v-list-tile-content>
              </v-list-tile>

            </v-list>

            <!-- Card actions -->
            <v-card-actions>
              <!-- Find function with tooltip -->
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on" @click="find(info.location.geocode.lat, info.location.geocode.lng)">
                    <v-icon>my_location</v-icon>
                  </v-btn>
                </template>
                <span>Find on map</span>
              </v-tooltip>
              <!-- Save location with tooltip -->
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on" @click="save">
                    <v-icon>bookmark</v-icon>
                  </v-btn>
                </template>
                <span>Save location</span>
              </v-tooltip>
              <v-spacer></v-spacer>
              <v-btn  round flat small color="green" @click="openInfoAction">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>

    </v-dialog>
  </div>
</template>

<script>
import { CldImage, CldTransformation } from 'cloudinary-vue'
import { mapState, mapActions } from 'vuex'
import { db } from '@/config/Firebase'

export default {
  name: 'Moreinfo',

  components: {
    CldImage,
    CldTransformation
  },

  data() {
    return {
      loading: false
    }
  },

  methods: {
    ...mapActions([
      'openInfoAction',
      'findStopAction'
    ]),
    find(lat, lng) {
      let payload = {
        lat: lat,
        lng: lng
      }
      this.findStopAction(payload)
    },
    save() {
      // Turn on loading animation
      this.loading = true

      // Add the user to save data for filtering
      let location = {
        obj: this.info,
        user: this.user,
      }

      // Save location
      db.collection('saved-stops').add(location)
      .then(() => {
        this.loading = false;
        this.openInfoAction();
      })
    }
  },

  computed: {
    ...mapState([
      'info',
      'dialog',
      'user'
    ]),
    wheelchair() {
      return this.info.accessibility.wheelchair ? 'Wheelchair access available.' : 'No wheelchair access / Undefined.'
    }
  }
}
</script>

<style lang="css" scoped>
</style>
