<template>
  <v-container
    class="d-flex flex-column justify-center align-center"
    width="30%"
  >
    <v-card
      color="white"
      elevation="5"
      rounded
      width="100%"
      min-width="320px"
      max-width="500px"
    >
      <v-form class="pa-10" ref="form" v-model="valid" @submit.prevent="submit">
        <v-text-field
          :counter="50"
          :rules="emailRules"
          :error-messages="errors.email"
          v-model="email"
          prepend-icon="mdi-email"
          label="E-mail"
          background-color="deep-purple lighten-4"
          required
          solo
          clearable
        ></v-text-field>

        <v-text-field
          :counter="50"
          :rules="passwordRules"
          :error-messages="errors.password"
          v-model="password"
          prepend-icon="mdi-lock"
          type="password"
          label="Password"
          color="deep-purple lighten-4"
          background-color="deep-purple lighten-4"
          required
          solo
          clearable
        ></v-text-field>
        <v-container class="d-flex justify-space-around">
          <v-btn
            :disabled="!valid"
            @click="validate"
            class="mr-4"
            type="submit"
            color="success"
          >
            submit
          </v-btn>
          <v-btn @click="redirectToWelcomePage" color="deep-purple lighten-5">
            back
          </v-btn>
        </v-container>
      </v-form>
    </v-card>
    <v-snackbar
      :timeout="snackbarTimeout"
      :color="snackbarColor"
      v-model="snackbar"
      vertical="vertical"
      transition="fab-transition"
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
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import router from '@/router';
import { errorMessage, emailRegExp } from '@/utilities';

export default Vue.extend({
  name: 'LogIn',
  data: () => ({
    valid: false,
    snackbar: false,
    snackbarMessage: '',
    snackbarColor: 'info',
    snackbarTimeout: 5000,
    email: '',
    password: '',
    errors: { email: '', password: '' },
    emailRules: [
      (email: string) => email?.length >= 10 || errorMessage('shortEmail'),
      (email: string) => email?.length <= 50 || errorMessage('longEmail'),
      (email: string) =>
        emailRegExp.test(email) || errorMessage('invalidEmail'),
    ],
    passwordRules: [
      (password: string) =>
        password?.length >= 5 || errorMessage('shortPassword'),
      (password: string) =>
        password?.length <= 50 || errorMessage('longPassword'),
    ],
  }),
  methods: {
    submit() {
      const newUser = {
        email: this.email,
        password: this.password,
      };

      const dataForLogIn = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      };

      const logInFetch = async () => {
        try {
          const response = await fetch(
            'http://localhost:8090/api/users/login',
            dataForLogIn
          );
          if (response.ok) {
            this.redirectToWelcomePage();
          }

          this.snackbarStatus(
            response.statusText || errorMessage('wrongLoginOrPassword'),
            'info'
          );
        } catch (e) {
          this.snackbarStatus(
            e.message || errorMessage('checkNetworkConnection'),
            'red'
          );
        }
      };

      logInFetch();
    },
    snackbarStatus(message: string, statusMessage: string) {
      this.snackbarMessage = message;
      this.snackbarColor = statusMessage;
      this.snackbar = true;
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
