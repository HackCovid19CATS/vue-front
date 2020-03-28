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
    component: () => import('../views/Home.vue')
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
    path: '/Legal',
    name: 'Legal notice',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/LegalNotice')
  },
  {
    path: '/contribution/:shopId',
    component: Contribution,
    props: true,
  },
  {
    path: '/contribution/:shopId/:shopName',
    component: Contribution,
    props: true,
  },
  {
    path: '/contribution/:shopId/:shopName/:shopAddress',
    component: Contribution,
    props: true,
  },
];

const router = new VueRouter({
  routes
});

export default router
