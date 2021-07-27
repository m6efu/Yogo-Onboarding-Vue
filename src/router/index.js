import Vue from 'vue';
import Router from 'vue-router';

import store from '@/store';

import Init from '@/components/Init.vue';

import Signup from '@/components/Signup.vue';


// import Login from '@/components/Login.vue';
// import ProfileEdit from '@/components/ProfileEdit.vue';
// import PasswordReset from '@/components/PasswordReset.vue';
// import PasswordNew from '@/components/PasswordNew.vue';
import VTooltip from 'v-tooltip';
// import ClassCheckinSignup from '@/components/ClassCheckinSignup.vue';
// import SendClassEmail from '@/components/SendClassEmail.vue';
// import LivestreamClassPreloader from '../components/LivestreamClassPreloader.vue';
// import MySchedule from '@/components/MySchedule.vue';
// import ReportSalary from '@/components/ReportSalary'

// const LivestreamClass = () => import('../components/LivestreamClass.vue');

Vue.use(VTooltip);

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Init',
      component: Init,
      meta: {
        requireAuth: false,
        fullBleedPage: true,
      },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
      meta: {
        requireAuth: false,
        fullBleedPage: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  // If state not ready and page is closed, redirect to Init
  if (!store.state.ready && to.meta.requireAuth !== false) {
    store.commit('setRequestedRoute', to);
    return next({ name: 'Init' });
  }

  // Logged in?
  if (store.getters.userIsLoggedIn) {
    return next();
  }

  // Not logged in

  // Some routes are open
  if (to.meta.requireAuth === false) return next();

  // Closed route and not logged in
  // Redirect to Login
  store.commit('setRequestedRoute', to);
  return next({ name: 'Signup' });
});

export default router;
