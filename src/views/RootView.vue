<template>
  <div class="root">
    <img alt="Vue logo" src="../assets/logo.svg" />
    <welcome />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Welcome from '@/components/Welcome.vue';

export default Vue.extend({
  name: 'RootView',
  components: {
    Welcome,
  },
});
</script>

<style lang="scss">
img {
  position: absolute;
  top: 25px;
  left: 50%;
  width: 45px;
  height: 45px;
}
</style>
