import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router ({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login',
      component: function () {
        return import('@/components/layout')
      },
      children: [{
        path: '/login',
        component: () => import('@/views/auth/login')
      }]
    }
  ]
})

export default router