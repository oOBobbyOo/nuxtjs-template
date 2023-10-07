import type { App } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import { constantRoutes } from './routes/constant'
import { dynamicRoutes } from './routes/dynamic'
import { createRouterGuard } from './guard'

const { VITE_HASH_ROUTE = 'N', VITE_BASE_URL } = import.meta.env

export const router = createRouter({
  history:
    VITE_HASH_ROUTE === 'Y' ? createWebHashHistory(VITE_BASE_URL) : createWebHistory(VITE_BASE_URL),
  routes: [...constantRoutes, ...dynamicRoutes],
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export async function setupRouter(app: App<Element>) {
  app.use(router)

  createRouterGuard(router)

  await router.isReady()
}
