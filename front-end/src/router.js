import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/views/Main.vue';
import Courses from '@/views/Courses.vue';
import Settings from '@/views/Settings.vue';
import Session from '@/views/Session.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/main/courses',
    },
    {
      path: '/main',
      component: Main,
      redirect: '/main/courses',
      children: [
        {
          path: 'courses',
          component: Courses,
        },
        {
          path: 'settings',
          component: Settings,
        },
      ],
    },
    {
      path: '/session/:uuid',
      component: Session,
    },
  ],
});
