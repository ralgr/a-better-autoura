import Vue from 'vue'
import Router from 'vue-router'
import Infomap from './views/Infomap.vue'
import Signup from './views/Infomap.vue'
import Signin from './views/Infomap.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'map',
      component: Infomap
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: Signup
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: Signin
    }
  ]
})
