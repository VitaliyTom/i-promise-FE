<template>
  <v-row justify="center">
    <v-dialog v-model="this.$props.visible" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Create new promise</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Addictions"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Legal middle name"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field label="Email*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="$emit('close')" color="blue darken-1" text>
            Close
          </v-btn>
          <v-btn @click="$emit('close')" color="blue darken-1" text>
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'addPromise',
  props: {
    visible: Boolean,
  },
});
</script>
