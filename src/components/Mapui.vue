<template lang="html">
  <div class="mapui">

    <v-layout row wrap>
      <v-flex xs8>

        <v-card>

          <v-layout row wrap justify-center>

            <v-flex xs8>

              <v-responsive>
                <v-card-actions>
                  <v-flex xs3 d-flex>
                    <v-select
                      :items="groupCont"
                      label="Group Context"
                    ></v-select>
                  </v-flex>
                </v-card-actions>
                <v-card-actions>
                  <v-flex xs3 d-flex>
                    <v-select
                      :items="stopTypes"
                      label="Location Type"
                    ></v-select>
                  </v-flex>
                </v-card-actions>

                <v-list two-line>
                  <template v-for="(item, index) in items">
                    <v-subheader
                      v-if="item.header"
                      :key="item.header"
                    >
                      {{ item.header }}
                    </v-subheader>

                    <v-divider
                      v-else-if="item.divider"
                      :key="index"
                      :inset="item.inset"
                    ></v-divider>

                    <v-list-tile
                      v-else
                      :key="item.title"
                      avatar
                      @click=""
                    >
                      <v-list-tile-avatar>
                        <img :src="item.avatar">
                      </v-list-tile-avatar>

                      <v-list-tile-content>
                        <v-list-tile-title v-html="item.title"></v-list-tile-title>
                        <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </template>
                </v-list>

              </v-responsive>

            </v-flex>

          </v-layout>

        </v-card>

      </v-flex>
    </v-layout>

  </div>
</template>

<script>
export default {
  name: 'Mapui',

  data() {
    return {
      groupCont: [
        'Solo',
        'Couple',
        'Friends',
        'Kids',
        'Teenagers',
        'Group',
        'Party',
      ],
      stopTypes: [
        'Accommodation',
        'Food',
        'Event',
        'Points of interest',
        'Attraction',
        'Tour',
      ],
      items: [
          { header: 'Today' },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            title: 'Brunch this weekend?',
            subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
          },
          { divider: true, inset: true },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
            subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
          },
          { divider: true, inset: true },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            title: 'Oui oui',
            subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
          }
        ]
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
