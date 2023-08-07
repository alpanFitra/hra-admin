import { setupLayouts } from 'virtual:generated-layouts';
import { createRouter, createWebHistory } from 'vue-router';
import routes from '~pages';
import { isUserLoggedIn } from './utils';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login.vue'),
    },
    ...setupLayouts(routes),
  ],
})

router.beforeEach((to, from, next) => {
  // this route requires auth, check if logged in
  // if not, redirect to login page.
  if (!isUserLoggedIn()) {
    if (to.name !== "login") {
      next({ name: "login" });
    } else {
      next() // don't redirect to login page if we're already there
    }
  } else {
    if (to.name === "login") {
      next({ path: "/" });
    } else {
      next();
    }
  }
});

export default router
