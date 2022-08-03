<template>
  <div class="root">
    <!--    <img alt="Vue logo" src="../assets/logo.png" />-->
    <HelloWorld msg="sign in or sign up" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default Vue.extend({
  name: "RootView",
  components: {
    HelloWorld,
  },
});
</script>
