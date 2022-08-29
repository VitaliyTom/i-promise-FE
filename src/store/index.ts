import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

type TUser = { userId: number | null; nickName: string; email: string };
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
      userId: null,
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
    SAVE_USER(state: IState, user: TUser = userDefault) {
      state.user = user;
    },
    IS_LOGGED(state: IState, bool: boolean) {
      state.isLogged = bool;
    },
    SNACKBAR(state: IState, snackbar: TDataSnackbar) {
      state.dataSnackbar = snackbar;
    },
  },
  getters: {
    user: (state: IState) => ({
      userId: state.user.userId,
      nickName: state.user.nickName,
      email: state.user.email,
      nameAbbreviation: state.user.nickName.slice(0, 2).toUpperCase(),
    }),
  },
  actions: {},
  modules: {},
});
