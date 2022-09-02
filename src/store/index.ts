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
type TReason = {
  reasonId: number;
  promiseId: number;
  reason: string;
};
type TPromise = {
  promiseId: number;
  userId: number;
  addictionId: number;
  amountDays: number;
  startDateStamp: number;
  nameAddiction: string;
  reason: TReason[];
};

interface IState {
  user: TUser;
  dataSnackbar: TDataSnackbar;
  promises: TPromise[];
  isLogged: boolean;
}

const userDefault: TUser = {
  userId: null,
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
    promises: [],
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
    SAVE_PROMISES(state: IState, promises: TPromise[]) {
      state.promises = promises;
    },
  },
  getters: {
    user: (state: IState) => ({
      userId: state.user.userId,
      nickName: state.user.nickName,
      email: state.user.email,
      nameAbbreviation: state.user.nickName.slice(0, 2).toUpperCase(),
    }),
    promises: (state: IState) => state.promises,
  },
  actions: {},
  modules: {},
});
