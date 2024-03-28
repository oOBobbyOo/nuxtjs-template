import type { App } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import { constantRoutes } from './routes/constant'
import { createRouterGuard } from './guard'

const { VITE_HASH_ROUTE = 'N', VITE_BASE_URL } = import.meta.env

export const router = createRouter({
  history:
    VITE_HASH_ROUTE === 'Y' ? createWebHashHistory(VITE_BASE_URL) : createWebHistory(VITE_BASE_URL),
  routes: [...constantRoutes],
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: string[] = ['Root', 'Login', 'LoginModule', 'NotFound']

// 重置路由
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !WHITE_NAME_LIST.includes(name as string))
      router.hasRoute(name) && router.removeRoute(name)
  })
}

export async function setupRouter(app: App<Element>) {
  app.use(router)

  createRouterGuard(router)

  await router.isReady()
}
