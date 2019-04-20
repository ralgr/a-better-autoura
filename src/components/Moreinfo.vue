<template lang="html">
  <div class="moreInfo">
    <v-dialog
      :value="dialog"
      width="500"
      lazy
    >

      <v-layout row>
        <v-flex xs12>
          <v-card>

            <v-img height="400px">
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

            <v-list two-line>
              <v-list-tile>
                <v-list-tile-action>

                </v-list-tile-action>

                <v-list-tile-content class="title">
                  <v-list-tile-title>{{ info.name }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-action>
                  <v-icon color="blue" large>info</v-icon>
                </v-list-tile-action>

                <v-list-tile-action>
                  <v-list-tile-action-text class="body-1 font-weight-light grey--text text--lighten-1">
                    {{ info.summary }}
                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>

            <v-list two-line>
              <v-list-tile @click="">
                <v-list-tile-action>
                  <v-icon color="red" large>location_on</v-icon>
                </v-list-tile-action>

                <v-list-tile-content class="body-1 font-weight-light grey--text text--lighten-1">
                  <v-list-tile-sub-title>{{ info.location.address }}</v-list-tile-sub-title>
                </v-list-tile-content>

              </v-list-tile>

              <v-list-tile @click="">
                <v-list-tile-action>
                  <v-icon color="green" large>accessibility</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>1400 Main Street</v-list-tile-title>
                  <v-list-tile-sub-title>Orlando, FL 79938</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>

    </v-dialog>
  </div>
</template>

<script>
import { CldImage, CldTransformation } from 'cloudinary-vue'
import { mapState } from 'vuex'

export default {
  name: 'Moreinfor',

  components: {
    CldImage,
    CldTransformation
  },

  data() {
    return {

    }
  },

  computed: {
    ...mapState([
      'info',
      'dialog'
    ])
  }
}
</script>

<style lang="css" scoped>
</style>
