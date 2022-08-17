<template>
  <v-container
    class="d-flex flex-column justify-center align-center"
    fill-height
  >
    <p class="text-lg-h2 deep-purple--text text--darken-1 mb-10">Log in</p>
    <log-in></log-in>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import LogIn from '@/components/logIn/LogIn.vue';

export default Vue.extend({
  name: 'LogInView',
  components: {
    LogIn,
  },
});
</script>
