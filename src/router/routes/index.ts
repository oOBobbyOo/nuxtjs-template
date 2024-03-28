import type { MenuRecordRaw } from '@/typings/router'
import { LoginModuleEnum, RouteEnum } from '@/enums/routeEnum'

// 根路由
export const RootRoute: MenuRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: RouteEnum.HOME_PATH,
  meta: {
    title: 'Root',
  },
}

// Login
export const LoginRoute: MenuRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  props: (route) => {
    const moduleType = (route.params.module as LoginModuleEnum) || LoginModuleEnum.PWD_LOGIN
    return {
      module: moduleType,
    }
  },
  meta: {
    title: 'routes.basic.login',
  },
  children: [
    {
      path: ':module',
      name: 'LoginModule',
      component: () => import('@/layouts/blank/index.vue'),
      meta: {
        title: 'routes.basic.login',
      },
    },
  ],
}

// NotFound
export const NotFound: MenuRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import('@/views/not-found/index.vue'),
  meta: {
    title: 'routes.basic.notfound',
  },
}
