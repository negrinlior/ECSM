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
        guest: true,
        nm:'בית'
      }
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('./views/About.vue'),
      meta: { 
        requiresAuth: true,
        nm:'אודות'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import( './views/Login.vue'),
      meta: { 
        nm:'התחברות'
      }
    },
    {
      path: '/UsersGrid',
      name: 'UsersGrid',
      component: () => import('./views/ECSM/UsersGrid.vue'),
      meta: { 
        requiresAuth: false,
        nm:'משתמשים'
      }
    },
    {
      path: '/HaktzaatBdikot',
      name: 'HaktzaatBdikot',
      component: () => import('./views/ECSM/HaktzaatBdikot.vue'),
      meta: { 
        requiresAuth: false,
        nm:'הקצאת בדיקות'
      }
    },{
      path: '/NetuniEzer',
      name: 'NetuniEzer',
      component: () => import('./views/ECSM/NetuniEzer.vue'),
      meta: { 
        requiresAuth: false,
        nm:'נתוני עזר'
      }
    },
    {
      path: '/Bdikot',
      name: 'Bdikot',
      component: () => import('./views/ECSM/Bdikot.vue'),
      meta: { 
        requiresAuth: false,
        nm:'ניהול בדיקות'
      }
    },
    {
      path: '/Nikud',
      name: 'Nikud',
      component: () => import('./views/ECSM/Nikud.vue'),
      meta: { 
        requiresAuth: false,
        nm:'ניקוד'
      }
    },
    {
      path: '/TarichiBdika',
      name: 'TarichiBdika',
      component: () => import('./views/ECSM/TarichiBdika.vue'),
      meta: { 
        requiresAuth: false,
        nm:'ניהול תאריכי בדיקות'
      }
    },
    {
      path: '/NihulShlavimToClient',
      name: 'NihulShlavimToClient',
      component: () => import('./views/ECSM/NihulShlavimToClient.vue'),
      meta: { 
        requiresAuth: false,
        nm:'ניהול שלבי בדיקה ללקוח'
      }
    },
    {
      path: '/TarichiChariga',
      name: 'TarichiChariga',
      component: () => import('./views/ECSM/TarichiChariga.vue'),
      meta: { 
        requiresAuth: false,
        nm:'ניהול תאריכי חריגה'
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

  store.commit('SetCurrPage', to.meta.nm); //שינוי שם העמוד הנוכחי

})

export default RTR