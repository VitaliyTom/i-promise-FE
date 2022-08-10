<template>
  <v-container
    class="d-flex flex-column justify-center align-center"
    fill-height
    fluid
  >
    <h1 class="text-lg-h2 deep-purple--text text--darken-1 mb-10">I promise</h1>
    <v-card
      color="white"
      elevation="5"
      height="350"
      width="100%"
      max-width="400px"
      min-width="275"
      rounded
    >
      <v-container
        class="button-wrapper d-flex justify-sm-space-around align-center"
        fill-height
      >
        <v-btn
          @click="redirectToLogInPage"
          color="deep-purple lighten-2"
          dark
          large
        >
          Log in
        </v-btn>
        <v-btn
          @click="redirectSignUpPage"
          color="deep-purple lighten-2"
          dark
          large
          outlined
        >
          Sign up
        </v-btn>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import router from '@/router';

export default Vue.extend({
  name: 'Welcome-page',

  methods: {
    redirectToLogInPage() {
      router.push('/login');
    },
    redirectSignUpPage() {
      router.push('/signup');
    },
  },
});
</script>
