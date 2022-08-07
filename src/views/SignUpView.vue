<template>
  <div class="container">
    <p class="title_registration">Registration</p>
    <sign-up></sign-up>
  </div>
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

<style lang="scss">
.title_registration {
  font-size: 32px;
  font-weight: bold;
  color: #673ab7;
}
</style>
