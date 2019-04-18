<template lang="html">
  <div class="mapui">

    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
            aspect-ratio="2.75"
          ></v-img>

          <v-card-actions>
            <v-flex xs12 d-flex>
              <v-select
                :items="groupCont"
                label="Group Context"
              ></v-select>
            </v-flex>
          </v-card-actions>
          <v-card-actions>
            <v-flex xs12 d-flex>
              <v-select
                :items="stopTypes"
                label="Location Typ"
              ></v-select>
            </v-flex>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

      <v-layout row wrap>


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
