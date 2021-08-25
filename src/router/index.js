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
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/board',
    name: 'Board',
    component: () => import('../views/board/')
  },
  {
    path: '/storage',
    name: 'Storage',
    component: () => import('../views/storage')
  },
  {
    path: '/editor',
    name: 'Editor',
    component: () => import('../views/editor')
  },
  {
    path: '/:collection/:document',
    name: 'collection-document',
    component: () => import('../views/renderer')
  },
  {
    path: '*',
    name: 'error',
    component: () => import('../views/error')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
