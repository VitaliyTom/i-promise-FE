<template>
  <div class="root">
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
