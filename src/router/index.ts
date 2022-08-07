import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import RootView from '../views/RootView.vue';

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
    component: () => import('../views/WelcomeView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LogInView.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignUpView.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
