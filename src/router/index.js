import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/subpage',
    name:'Subpage',
    component: () => import('../views/Subpage.vue')
  },
  {
    path:'/subpage/:mess',
    name:'Subpage',
    component: () => import('../views/Subpage.vue') // Subpage params
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
    path: '/infos/tuto',
    name: 'Tuto',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Tuto.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
