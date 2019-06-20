import Vue from 'vue';
import Vuex from 'vuex';
import alerts from '@/store/modules/alerts';
import courses from '@/store/modules/courses';
import settings from '@/store/modules/settings';
import createLogger from './logger';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    alerts,
    courses, 
    settings,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})