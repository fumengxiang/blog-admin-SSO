import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router ({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: function () {
        return import('@/components/layout')
      },
      children: [{
        path: '',
        component: () => import('@/views/auth/login')
      }]
    },
    {
      path: '/refresh',
      component: function () {
        return import('@/components/layout')
      },
      children: [{
        path: '',
        component: () => import('@/views/auth/refresh')
      }]
    }
  ]
})
import store from '@/store'

// 通过路由拦截器退出登录
router.beforeEach((to, from, next) => {
  if (to.path === '/logout') {
    store.dispatch('UserLogout', to.query.redirectURL)
  } else {
    next()
  }
})

export default router