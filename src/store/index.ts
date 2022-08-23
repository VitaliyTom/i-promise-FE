import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

type TUser = { userId: number; nickName: string; email: string };
type TDataSnackbar = {
  visible: boolean;
  message: string;
  color: string;
  timeout: number;
};

interface IState {
  user: TUser;
  dataSnackbar: TDataSnackbar;
  isLogged: boolean;
}

const userDefault: TUser = {
  userId: 0,
  nickName: '',
  email: '',
};

export default new Vuex.Store({
  state: {
    user: {
      userId: 0,
      nickName: '',
      email: '',
    },
    dataSnackbar: {
      visible: false,
      message: '',
      color: 'info',
      timeout: 5000,
    },
    isLogged: false,
  } as IState,

  mutations: {
    saveUser(state: IState, user: TUser = userDefault) {
      state.user = user;
    },
    isLogged(state: IState, bool: boolean) {
      state.isLogged = bool;
    },
    snackbar(state: IState, snackbar: TDataSnackbar) {
      state.dataSnackbar = snackbar;
    },
  },
  getters: {},
  actions: {},
  modules: {},
});
