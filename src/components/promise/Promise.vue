<template>
  <v-card>
    <v-card-title class="d-flex justify-lg-space-between deep-purple lighten-2">
      <v-card-subtitle class="text-h5 deep-purple--text text--lighten-5 pa-1">{{
        promise.nameAddiction
      }}</v-card-subtitle>
      <v-sheet class="d-flex flex-nowrap" color="deep-purple lighten-2">
        <v-sheet class="pa-2" color="deep-purple lighten-2">
          <v-btn color="pink accent-1 pa-2" fab small dark>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-sheet>
        <v-sheet class="pa-2" color="deep-purple lighten-2">
          <v-btn color="red pa-2" fab small dark>
            <v-icon>mdi-delete-circle</v-icon>
          </v-btn>
        </v-sheet>
      </v-sheet>
    </v-card-title>
    <v-card class="pa-4">
      <v-sheet class="text-h7 deep-purple--text text--darken-3"
        >START DATE: {{ convertDate(promise.startDateStamp) }}</v-sheet
      >
      <v-sheet class="text-h7 deep-purple--text text--darken-3"
        >AMOUNT DAYS: {{ promise.amountDays }}</v-sheet
      >
      REASONS:
      <v-sheet
        v-for="item in promise.reason"
        :key="item.reasonId"
        class="text-h7 deep-purple--text text--darken-3"
      >
        {{ item.reason }}</v-sheet
      >
    </v-card>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

import { format, fromUnixTime } from 'date-fns';

export default Vue.extend({
  name: 'Home-page',
  props: ['promise'],
  methods: {
    convertDate(time: number) {
      return format(fromUnixTime(time), 'MM-dd-yyyy');
    },
  },
});
</script>
