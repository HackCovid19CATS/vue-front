import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from "../views/Welcome";
import Contribution from "../views/Contribution";
//import VueGtag from "vue-gtag";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/NewHome.vue')
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import('../views/Map.vue')
  },
  {
    path: '/thankyou',
    name: 'Thank you',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Validation.vue')
  },
  {
    path: '/infos',
    name: 'Infos',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Infos.vue')
  },
  {
    path: '/tuto',
    name: 'Tuto',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Tuto.vue')
  },
  {
    path: '/contribution/:shopName/:shopId/:shopAdress',
    component: Contribution,
    props: true,
  },
];

const router = new VueRouter({
  routes
});

/*
Vue.use(VueGtag, {
  config: {
    id: "G-T6PBX9P3PC",
    debug: true,
    'anonymize_ip': true
  },
    router,
      onReady () {
    // ready
  }
});
*/

export default router
