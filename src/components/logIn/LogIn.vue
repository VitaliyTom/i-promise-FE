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
      :timeout="dataSnackbar.timeout"
      :color="dataSnackbar.color"
      v-model="dataSnackbar.visible"
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
      {{ dataSnackbar.message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="brown darken-4"
          text
          v-bind="attrs"
          @click="handleChangeSnackbar"
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
import { mapState } from 'vuex';

type TValidationRules = (ValidationFieldForm: string) => string;
type TErrors = { email: string; password: string };
type VForm = Vue & { validate: () => boolean };

interface IData {
  valid: boolean;
  email: string;
  password: string;
  errors: TErrors;
  emailRules: TValidationRules[];
  passwordRules: TValidationRules[];
}

export default Vue.extend({
  name: 'LogIn',
  data: () =>
    ({
      valid: false,
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
    } as IData),

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
        const processEnv = process.env;
        const URL = `${processEnv.VUE_APP_SERVER_API_URL}${processEnv.VUE_APP_PORT}${processEnv.VUE_APP_API_PATH}/users/login`;
        try {
          const response = await fetch(URL, dataForLogIn);
          if (response.ok) {
            const user = await response.json();
            this.$store.commit('SAVE_USER', user);
            this.$store.commit('IS_LOGGED', true);
            this.redirectToHomePage();
            return;
          }

          const snackbar = {
            visible: true,
            message:
              response.statusText || errorMessage('wrongLoginOrPassword'),
            color: 'info',
            timeout: 5000,
          };
          this.$store.commit('SNACKBAR', snackbar);
        } catch (e) {
          const snackbar = {
            visible: true,
            message: e.message || errorMessage('checkNetworkConnection'),
            color: 'error',
            timeout: 5000,
          };
          this.$store.commit('SNACKBAR', snackbar);
        }
      };

      logInFetch();
    },

    handleChangeSnackbar() {
      this.$store.commit('SNACKBAR', {
        visible: false,
        message: '',
        color: 'info',
        timeout: 5000,
      });
    },

    redirectToHomePage() {
      router.push('/home');
    },
    redirectToWelcomePage() {
      router.push('/welcome');
    },
    validate() {
      (this.$refs.form as VForm).validate();
    },
  },
  computed: {
    ...mapState(['dataSnackbar']),
  },
});
</script>
