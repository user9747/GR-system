import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import UserDash from './views/UserDash'
import ErrorComponent from './views/Error'
import store from './store'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: UserDash
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/404',
      name: '404',
      component: ErrorComponent
    }
  ]
})

const privateRoutes = [
  "/dashboard"
]

router.beforeEach((to,from, next) => {
  if(!to.matched.length){
    next('/404')
  }
  else{
    next()
  }
})

router.beforeEach((to,from, next) => {
  if(privateRoutes.indexOf(to.path) != -1){
    if(store.getters.isLoggedIn){
      next()
    }
    else{
      console.log("Unauthorized user")
      next('/')
    }
  }else{
    next()
  }
})

router.beforeEach((to,from,next) => {
  if(store.getters.isLoggedIn){
    if(to.path === '/login' || to.path === '/signup'){
      next('/dashboard')
    }
    else{
      next()
    }
  }
  else{
    next()
  }
})

export default router
