import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import RootView from '../views/RootView.vue';
import WelcomeView from '@/views/WelcomeView.vue';
import LogInView from '@/views/LogInView.vue';
import SignUpView from '@/views/SignUpView.vue';
import HomeView from '@/views/HomeView.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'root',
    component: RootView,
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: WelcomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LogInView,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView,
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
