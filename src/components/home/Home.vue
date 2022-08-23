<template>
  <v-card class="d-flex" min-height="100%">
    <v-card class="d-flex">
      <v-card>
        <v-navigation-drawer permanent expand-on-hover>
          <v-list>
            <v-list-item class="px-2">
              <v-list-item-avatar>
                <v-avatar color="deep-purple lighten-2" size="40">{{
                  $store.state.user.nickName.slice(0, 2).toUpperCase()
                }}</v-avatar>
              </v-list-item-avatar>
            </v-list-item>

            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title
                  class="text-h6 deep-purple--text text--darken-1"
                >
                  {{ $store.state.user.nickName }}
                </v-list-item-title>
                <v-list-item-subtitle
                  class="deep-purple--text text--darken-1"
                  >{{ $store.state.user.email }}</v-list-item-subtitle
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

    <v-card width="100%"> PROMISES </v-card>
    <v-snackbar
      :timeout="$store.state.dataSnackbar.timeout"
      :color="$store.state.dataSnackbar.color"
      v-model="$store.state.dataSnackbar.visible"
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
      {{ $store.state.dataSnackbar.message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          @click="$store.state.dataSnackbar.visible = false"
          color="brown darken-4"
          text
          v-bind="attrs"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <add-promise
      @close="handleCloseAddPromise"
      :visible="visibleAddPromise"
    ></add-promise>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import router from '@/router';
import { errorMessage } from '@/utilities';
import AddPromise from '@/components/promise/AddPromise.vue';

interface IData {
  visibleAddPromise: boolean;
}

export default Vue.extend({
  name: 'Home-page',
  components: { AddPromise },
  data: () =>
    ({
      visibleAddPromise: false,
    } as IData),
  created() {
    if (!this.$store.state.isLogged) {
      this.redirectToWelcomePage();
    }
  },
  methods: {
    signOut() {
      const signOutFetch = async () => {
        const processEnv = process.env;
        try {
          const response = await fetch(
            `${processEnv.VUE_APP_SERVER_API_URL}${processEnv.VUE_APP_PORT}${processEnv.VUE_APP_API_PATH}/users/logout`
          );
          if (response.ok) {
            this.$store.commit('isLogged', false);
            this.$store.commit('saveUser');
            this.redirectToWelcomePage();
          }
        } catch (e) {
          const snackbar = {
            visible: true,
            message: e.message || errorMessage('checkNetworkConnection'),
            color: 'error',
            timeout: 5000,
          };
          this.$store.commit('snackbar', snackbar);
        }
      };

      signOutFetch();
    },

    handleCloseAddPromise() {
      this.visibleAddPromise = false;
    },

    handleAddPromise() {
      this.visibleAddPromise = true;
    },

    redirectToWelcomePage() {
      router.push('/welcome');
    },
  },
});
</script>
