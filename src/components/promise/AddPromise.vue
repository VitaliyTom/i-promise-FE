<template>
  <v-row justify="center">
    <v-dialog v-model="$props.visible" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Create new promise</span>
        </v-card-title>
        <v-form
          class="pa-10"
          ref="form"
          v-model="valid"
          @submit.prevent="submit"
        >
          <v-row>
            <v-col cols="12">
              <v-autocomplete
                :items="addictions"
                :item-text="'addiction'"
                :rules="addictionRules"
                v-model="addiction"
                label="Addictions"
                return-object
                placeholder="Select addiction..."
                required
              ></v-autocomplete>
            </v-col>

            <v-col cols="12">
              <v-menu
                :close-on-content-click="false"
                :nudge-right="40"
                v-model="addictionMenu"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Start date"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  @input="addictionMenu = false"
                  :min="currentDate"
                  v-model="date"
                  color="green lighten-1"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col class="d-flex align-center ps-3" cols="12">
              <v-slider
                v-model="amountDays"
                color="green"
                label="Amount days"
                min="1"
                max="365"
                thumb-label
              ></v-slider>
              <v-col class="pa-0" cols="12" sm="3">
                <v-text-field
                  :value="amountDays"
                  filled
                  rounded
                  dense
                  disabled
                ></v-text-field>
              </v-col>
            </v-col>

            <v-col cols="12">
              <v-container class="pa-0">
                <v-textarea
                  counter
                  label="Text"
                  :rules="reasonRules"
                  v-model="reason"
                  rows="1"
                  placeholder="Describe the reason"
                ></v-textarea>
              </v-container>
            </v-col>
          </v-row>

          <v-card-actions
            class="d-flex align-center justify-lg-space-between py-8"
          >
            <v-btn @click="$emit('close')" color="deep-purple lighten-5">
              Close
            </v-btn>
            <v-btn
              @click="validate"
              :disabled="!valid"
              type="submit"
              color="success"
              class="mr-4"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
import Vue from 'vue';
import { errorMessage } from '@/utilities';
import { getUnixTime, format } from 'date-fns';

type TValidationRules = (ValidationFieldForm: string) => string;
type VForm = Vue & { validate: () => boolean };
type TAddiction = { addiction: string; addictionId: number } | null;

interface IData {
  valid: boolean;
  addictions: [];
  addictionMenu: boolean;
  addiction: TAddiction;
  amountDays: number | null;
  reason: string;
  currentDate: string;
  date: string;
  reasonRules: TValidationRules[];
  addictionRules: TValidationRules[];
}

export default Vue.extend({
  name: 'addPromise',
  props: {
    visible: Boolean,
  },
  data: () =>
    ({
      valid: false,
      addictions: [],
      addictionMenu: false,
      addiction: null,
      amountDays: null,
      reason: '',
      currentDate: format(new Date(), 'yyyy-MM-dd'),
      date: format(new Date(), 'yyyy-MM-dd'),
      reasonRules: [
        (reason: string) => reason.length > 5 || 'Min 5 characters',
        (reason: string) => reason.length <= 50 || 'Max 50 characters',
      ],
      addictionRules: [
        (addiction: string) => !!addiction || 'This field is required',
      ],
    } as IData),

  created() {
    this.getAddictions();
  },

  methods: {
    getAddictions() {
      const getAllAddictions = async () => {
        const processEnv = process.env;
        const URL = `${processEnv.VUE_APP_SERVER_API_URL}${processEnv.VUE_APP_PORT}${processEnv.VUE_APP_API_PATH}/addiction`;
        try {
          const response = await fetch(URL);
          if (response.ok) {
            this.addictions = await response.json();
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
      getAllAddictions();
    },

    submit() {
      const newPromise = {
        userId: this.$store.state.user.userId,
        addictionId: this.addiction?.addictionId,
        startDateStamp: getUnixTime(new Date(this.currentDate)),
        amountDays: this.amountDays,
        reason: this.reason,
      };

      const dataForAddPromise = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPromise),
      };

      const addPromise = async () => {
        const processEnv = process.env;
        const URL = `${processEnv.VUE_APP_SERVER_API_URL}${processEnv.VUE_APP_PORT}${processEnv.VUE_APP_API_PATH}/promise/`;

        try {
          const response = await fetch(URL, dataForAddPromise);
          const promiseList = await response.json();
          if (response.ok) {
            this.$emit('close');
            this.$store.commit('SAVE_PROMISES', promiseList);
            return;
          }

          const snackbar = {
            visible: true,
            message:
              promiseList.message || errorMessage('checkNetworkConnection'),
            color: 'error',
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

      addPromise();
    },

    validate() {
      (this.$refs.form as VForm).validate();
    },
  },
});
</script>
