import Vue from 'vue';
import '@/plugins/fragment';
import i18n from '@/plugins/i18n';
import '@/plugins/vuetify';
import App from '@/App';
import router from '@/router';
import store from '@/store/index';
import '@/registerServiceWorker';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.config.productionTip = false;


new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app');

store.dispatch('settings/loadSettings').then(() => {
  i18n.locale = store.getters['settings/all'].language;
});
