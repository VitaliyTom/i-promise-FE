<template>
  <welcome />
</template>

<script lang="ts">
import Vue from 'vue';
import Welcome from '@/components/Welcome.vue';

export default Vue.extend({
  name: 'WelcomeView',
  components: {
    Welcome,
  },
});
</script>
