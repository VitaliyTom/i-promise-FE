<template>
  <v-container fluid>
    <v-row class="px-3">
      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar color="deep-purple lighten-2" size="48">
              <span class="white--text text-h5">{{
                user.nameAbbreviation
              }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar color="deep-purple lighten-2">
                <span class="white--text text-h5">{{
                  user.nameAbbreviation
                }}</span>
              </v-avatar>
              <h3>{{ user.nickName }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text> Edit Account </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'menuAccount',
  props: ['user'],
});
</script>
