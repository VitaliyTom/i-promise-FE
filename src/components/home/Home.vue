<template>
  <v-card class="d-flex" min-height="100%">
    <v-card class="d-flex">
      <v-card>
        <v-navigation-drawer permanent>
          <v-list>
            <menu-account :user="user" />
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title
                  class="text-h6 deep-purple--text text--darken-1"
                >
                  {{ user.nickName }}
                </v-list-item-title>
                <v-list-item-subtitle
                  class="deep-purple--text text--darken-1"
                  >{{ user.email }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list nav dense>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon color="deep-purple lighten-1">mdi-cog</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="deep-purple--text text--darken-1"
                >Setting</v-list-item-title
              >
            </v-list-item>
            <v-list-item @click="handleAddPromise" link>
              <v-list-item-icon>
                <v-icon color="deep-purple lighten-1"
                  >mdi-plus-circle-outline</v-icon
                >
              </v-list-item-icon>
              <v-list-item-title class="deep-purple--text text--darken-1"
                >Add promise</v-list-item-title
              >
            </v-list-item>
            <v-list-item @click="signOut" link>
              <v-list-item-icon>
                <v-icon color="deep-purple lighten-1">mdi-exit-to-app</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="deep-purple--text text--darken-1"
                >Sign out</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-card>
    </v-card>

    <v-card class="d-flex flex-column justify-center align-center" width="100%">
      <p class="text-lg-h2 deep-purple--text text--darken-1 mb-10">PROMISES</p>

      <v-tooltip v-if="!promises.length" bottom color="success">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            @click="handleAddPromise"
            elevation="24"
            fab
            icon
            large
            rounded
            text
            color="success"
            dark
            v-bind="attrs"
            v-on="on"
          >
            <v-icon large>mdi-plus-circle-outline</v-icon>
          </v-btn>
        </template>
        <span>Add new promise</span>
      </v-tooltip>

      <v-card
        v-for="promise in promises"
        :key="promise.promiseId"
        class="ma-4"
        width="70%"
        elevation="7"
        outlined
      >
        <promise-component :promise="promise" :user="user" />
      </v-card>
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
          @click="handleChangeSnackbar"
          color="deep-purple lighten-2"
          text
          v-bind="attrs"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <add-promise
      @close="handleCloseAddPromise"
      :visible="isAddPromiseVisible"
    ></add-promise>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import router from '@/router';
import { errorMessage } from '@/utilities';
import AddPromise from '@/components/promise/AddPromise.vue';
import { mapGetters, mapState } from 'vuex';
import MenuAccount from '@/components/menuAccaunt/menuAccaunt.vue';
import PromiseComponent from '@/components/promise/Promise.vue';

interface IData {
  isAddPromiseVisible: boolean;
}

export default Vue.extend({
  name: 'Home-page',
  components: { PromiseComponent, MenuAccount, AddPromise },
  data: () =>
    ({
      isAddPromiseVisible: false,
    } as IData),
  created() {
    if (!this.$store.state.isLogged) {
      this.redirectToWelcomePage();
    }
    this.getAllPromises();
  },
  methods: {
    signOut() {
      const signOutFetch = async () => {
        const processEnv = process.env;
        const URL = `${processEnv.VUE_APP_SERVER_API_URL}${processEnv.VUE_APP_PORT}${processEnv.VUE_APP_API_PATH}/users/logout`;
        try {
          const response = await fetch(URL);
          if (response.ok) {
            this.$store.commit('SAVE_USER');
            this.$store.commit('IS_LOGGED', false);
            this.redirectToWelcomePage();
          }
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

      signOutFetch();
    },

    getAllPromises() {
      const getPromises = async () => {
        const processEnv = process.env;
        const URL = `${processEnv.VUE_APP_SERVER_API_URL}${processEnv.VUE_APP_PORT}${processEnv.VUE_APP_API_PATH}/promise?userId=${this.user.userId}`;
        try {
          const response = await fetch(URL);
          const promiseList = await response.json();
          if (response.ok) {
            this.$store.commit('SAVE_PROMISES', promiseList);
            return;
          }
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

      getPromises();
    },

    handleChangeSnackbar() {
      this.$store.commit('SNACKBAR', {
        visible: false,
        message: '',
        color: 'info',
        timeout: 5000,
      });
    },

    handleCloseAddPromise() {
      this.isAddPromiseVisible = false;
    },

    handleAddPromise() {
      this.isAddPromiseVisible = true;
    },

    redirectToWelcomePage() {
      router.push('/welcome');
    },
  },
  computed: {
    ...mapGetters(['user']),
    ...mapGetters(['promises']),
    ...mapState(['dataSnackbar']),
  },
});
</script>
