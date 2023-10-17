import type { MenuRecordRaw } from '../types'

// 根路由
export const RootRoute: MenuRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: '/dashboard',
  meta: {
    title: 'Root',
  },
}

// Login
export const LoginRoute: MenuRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: 'routes.basic.login',
  },
}

// NotFound
export const NotFound: MenuRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import('@/views/not-found/index.vue'),
  meta: {
    title: 'routers.basic.notfound',
  },
}
