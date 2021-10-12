import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index')
  },
  {
    path: '/404/noPage',
    name: '404',
    component: () => import('@/pages/errorPage/404')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/pages/login/signup')
  },
  {
    path: '/',
    name: 'dashboard',
    meta: {
      layout: 'sidebar-active',
      icon: 'home',
      title: 'label.home'
    },
    component: () => import('@/pages/dashboard/index.vue')
  },
  {
    path: '/sales',
    name: 'sales',
    meta: {
      layout: 'sidebar-active',
      icon: 'sales',
      title: 'label.sales'
    },
    component: () => import('@/pages/sales/index.vue')
  },
  {
    path: '/sales/create',
    name: 'sales-add',
    component: () => import('@/pages/sales/edit.vue')
  },
  {
    path: '/sales/:id',
    name: 'sales-detail',
    component: () => import('@/pages/sales/edit.vue')
  },
  {
    path: '/inventory',
    name: 'inventory',
    meta: {
      layout: 'sidebar-active',
      icon: 'inventory',
      title: 'label.inventory'
    },
    component: () => import('@/pages/inventory/index.vue')
  },
  {
    path: '/users',
    name: 'users',
    meta: {
      layout: 'sidebar-active',
      icon: 'users',
      title: 'label.users'
    },
    component: () => import('@/pages/users/index.vue')
  },
  {
    path: '/profile/:username',
    name: 'profile',
    meta: {
      layout: 'sidebar-active-profile',
      icon: 'users',
      title: 'label.profile'
    },
    component: () => import('@/pages/profile/index.vue')
  }
]

export const asyncRouterMap = [
  {
    path: '/',
    name: 'dashboard',
    meta: {
      layout: 'sidebar-active',
      icon: 'home',
      title: 'label.home'
    },
    component: () => import('@/pages/dashboard/index.vue')
  },
  {
    path: '/sales',
    name: 'sales',
    meta: {
      layout: 'sidebar-active',
      icon: 'sales',
      title: 'label.sales'
    },
    component: () => import('@/pages/sales/index.vue')
  },
  {
    path: '/inventory',
    name: 'inventory',
    meta: {
      layout: 'sidebar-active',
      icon: 'inventory',
      title: 'label.inventory'
    },
    component: () => import('@/pages/inventory/index.vue')
  },
  {
    path: '/users',
    name: 'users',
    meta: {
      layout: 'sidebar-active',
      icon: 'users',
      title: 'label.users'
    },
    component: () => import('@/pages/users/index.vue')
  }
]

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})
