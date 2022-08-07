<template>
  <div class="form wrapper">
    <v-sheet color="white" elevation="5" rounded>
      <v-form ref="form" v-model="valid" @submit.prevent="submit">
        <v-text-field
          v-model="nickName"
          :counter="50"
          :rules="nickNameRules"
          :error-messages="errors.nickName"
          prepend-icon="mdi-account"
          label="Nick name"
          background-color="deep-purple lighten-4"
          required
          solo
          clearable
        ></v-text-field>

        <v-text-field
          v-model="email"
          :counter="50"
          :rules="emailRules"
          :error-messages="errors.email"
          prepend-icon="mdi-email"
          label="E-mail"
          background-color="deep-purple lighten-4"
          required
          solo
          clearable
        ></v-text-field>

        <v-text-field
          v-model="password"
          :counter="50"
          :rules="passwordRules"
          :error-messages="errors.password"
          prepend-icon="mdi-lock"
          type="password"
          label="Password"
          color="deep-purple lighten-4"
          background-color="deep-purple lighten-4"
          required
          solo
          clearable
        ></v-text-field>

        <div class="button wrapper">
          <v-btn
            @click="validate"
            :disabled="!valid"
            class="mr-4"
            type="submit"
            color="success"
          >
            submit
          </v-btn>
          <v-btn @click="redirectToWelcomePage" color="deep-purple lighten-5">
            back
          </v-btn>
        </div>
      </v-form>
    </v-sheet>

    <v-snackbar
      v-model="snackbar"
      vertical="vertical"
      transition="fab-transition"
      :timeout="timeout"
      :color="snackbarColor"
      top
      right
      shaped
      max-width="500"
      min-width="350"
      max-height="150"
      min-height="75"
    >
      {{ snackbarMessage }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="brown darken-4"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import router from '@/router';

export default Vue.extend({
  name: 'SignUp',

  data: () => ({
    valid: false,
    snackbar: false,
    snackbarMessage: '',
    snackbarColor: 'info',
    snackbarTimeout: 3000,
    nickName: '',
    email: '',
    password: '',
    errors: {
      nickName: '',
      email: '',
      password: '',
    },
    nickNameRules: [
      (nickName: string) =>
        nickName?.length >= 3 ||
        'Nick name cannot be shorter than 3 characters!',
      (nickName: string) =>
        nickName?.length <= 50 ||
        'Nick name cannot be longer than 50 characters!',
    ],
    emailRules: [
      (email: string) =>
        email?.length >= 10 || 'E-mail cannot be shorter than 10 characters!',
      (email: string) =>
        email?.length <= 50 || 'E-mail cannot be longer than 50 characters!',
      (email: string) =>
        /([a-zA-Z]{3,})@[a-zA-Z]{3,}[.][a-zA-Z]{2,}/.test(email) ||
        'Invalid email address!',
    ],
    passwordRules: [
      (password: string) =>
        password?.length >= 5 ||
        'Password cannot be shorter than 5 characters!',
      (password: string) =>
        password?.length <= 50 ||
        'Password cannot be longer than 50 characters!',
    ],
  }),
  methods: {
    submit() {
      const newUser = {
        nickName: this.nickName,
        email: this.email,
        password: this.password,
      };

      const dataForRegister = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      };

      try {
        const registerFetch = async () => {
          const response = await fetch(
            'http://localhost:8090/api/users/registration',
            dataForRegister
          );
          if (response.ok) {
            this.redirectToWelcomePage();
          }
          this.snackbarMessage =
            response.statusText ||
            'User with this email address already exists';
          this.snackbarColor = 'info';
          this.snackbar = true;
        };

        registerFetch();
      } catch (e) {
        this.snackbarMessage = e.message || 'Check your network connection';
        this.snackbarColor = 'red';
        this.snackbar = true;
      }
    },
    redirectToWelcomePage() {
      router.push('/welcome');
    },
    validate() {
      this.$refs.form.validate();
    },
  },
});
</script>

<style lang="scss">
.form.wrapper {
  width: 30%;
  min-width: 320px;

  .v-sheet {
    display: flex;
    flex-shrink: 2;
    justify-content: center;
    align-items: center;
    padding-top: 25px;
    margin: 25px;

    form {
      width: 80%;
      margin: 25px;

      .button.wrapper {
        display: flex;
        justify-content: space-evenly;
      }
    }
  }
}
</style>
