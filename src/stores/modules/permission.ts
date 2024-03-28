import type { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
import { dynamicRoutes } from '@/router/routes/dynamic'

interface PermissionState {
  // 路由是否动态添加
  isDynamicAddedRoute: boolean
}

export const usePermissionStore = defineStore('permission', {
  state: (): PermissionState => ({
    isDynamicAddedRoute: false,
  }),
  getters: {
    getIsDynamicAddedRoute(state): boolean {
      return state.isDynamicAddedRoute
    },
  },
  actions: {
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added
    },
    async initDynamicAuthRoute(): Promise<RouteRecordRaw[]> {
      const routes = [...dynamicRoutes]
      return routes
    },
  },
})

export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}
