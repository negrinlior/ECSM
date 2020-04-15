import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store.js'

Vue.use(Router)

const RTR= new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { 
        guest: true
      }
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('./views/About.vue'),
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import( './views/Login.vue')
    },
    {
      path: '/UsersGrid',
      name: 'UsersGrid',
      component: () => import('./views/ECSM/UsersGrid.vue'),
      meta: { 
        requiresAuth: false
      }
    },
    {
      path: '/HaktzaatBdikot',
      name: 'HaktzaatBdikot',
      component: () => import('./views/ECSM/HaktzaatBdikot.vue'),
      meta: { 
        requiresAuth: false
      }
    },
    {
      path: '/Bdikot',
      name: 'Bdikot',
      component: () => import('./views/ECSM/Bdikot.vue'),
      meta: { 
        requiresAuth: false
      }
    },
  ]
})

RTR.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {//if requiers authentication
    if (store.state.JWT==='') {
      next({
        path: '/login'
      })
    }
    else{
      next();
    }
  }
  else{
    next();
  }
})

export default RTR