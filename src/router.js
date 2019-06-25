import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'map',
      component: () => import(/* webpackChunkName: "about" */ './views/Infomap.vue')
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import(/* webpackChunkName: "about" */ './views/Signup.vue')
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import(/* webpackChunkName: "about" */ './views/Signin.vue')
    }
  ]
})
