<template>
  <div class="container">
    <p class="title_login">Log in</p>
    <log-in></log-in>
  </div>
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

<style lang="scss">
.title_login {
  font-size: 32px;
  font-weight: bold;
  color: #673ab7;
}
</style>
