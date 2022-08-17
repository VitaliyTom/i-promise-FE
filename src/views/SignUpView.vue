<template>
  <v-container
    class="d-flex flex-column justify-center align-center fill-height"
  >
    <p class="text-lg-h2 deep-purple--text text--darken-1 mb-10">
      Registration
    </p>
    <sign-up></sign-up>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import SignUp from '@/components/signup/SignUp.vue';

export default Vue.extend({
  name: 'SignUpView',
  components: {
    SignUp,
  },
});
</script>
