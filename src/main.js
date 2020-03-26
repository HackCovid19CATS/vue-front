import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

import VueGtag from "vue-gtag";

import { Plugin as VBreakpoint } from 'vue-breakpoint-component';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.use(VueGtag, {
  config: {
    id: "UA-161833177-1",
    debug: true,
    app_name: '#restezchezvous',
    anonymize_ip: true,
  },
});

Vue.use(VBreakpoint);

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
