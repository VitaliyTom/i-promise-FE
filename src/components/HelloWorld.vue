<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{ message }}</p>
    <p>{{ count }}</p>
    <button @click="redirectPage">{{ login }}</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import router from "@/router";

export default Vue.extend({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data: () => ({
    message: "Hi data",
    login: "Log in",
    count: 1,
  }),
  methods: {
    redirectPage() {
      this.count++;
      console.log("-> count = ", this.count);
      // this.$router.push("home");
      router.push("/home");
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
