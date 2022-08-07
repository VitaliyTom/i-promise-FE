<template>
  <div class="container">
    <h1 class="title_i_promise">I promise</h1>
    <div class="sheet-wrapper">
      <v-sheet color="white" elevation="5" height="350" rounded>
        <div class="button-wrapper">
          <v-btn
            @click="redirectToLogInPage"
            color="deep-purple lighten-2"
            dark
            large
          >
            {{ titleButtonLogIn }}
          </v-btn>
          <v-btn
            @click="redirectSignUpPage"
            color="deep-purple lighten-2"
            dark
            large
            outlined
          >
            {{ titleButtonSignUp }}
          </v-btn>
        </div>
      </v-sheet>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import router from '@/router';

export default Vue.extend({
  name: 'Welcome-page',

  data: function () {
    return {
      titleButtonLogIn: 'Log in',
      titleButtonSignUp: 'Sign up',
    };
  },
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

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: 0 25px;

  .title_i_promise {
    font-size: 32px;
    font-weight: bold;
    color: #673ab7;
  }

  .sheet-wrapper {
    max-width: 400px;
    min-width: 275px;
    width: 100%;

    .button-wrapper {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;
      height: 100%;
      margin: 25px 0;

      button {
        width: 100px;
      }
    }
  }
}
</style>
