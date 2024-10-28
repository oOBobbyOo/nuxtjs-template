import type { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
import { dynamicRoutes } from '@/router/routes/dynamic'
import type { RoleEnum } from '@/enums/roleEnum'
import { getAuthCache, setAuthCache } from '@/utils/auth'
import { ROLES_KEY } from '@/enums/cacheEnum'

interface PermissionState {
  // 角色权限列表
  roleList: RoleEnum[]
  // 路由是否动态添加
  isDynamicAddedRoute: boolean
}

export const usePermissionStore = defineStore('permission', {
  state: (): PermissionState => ({
    roleList: [],
    isDynamicAddedRoute: false,
  }),
  getters: {
    getRoleList(state): RoleEnum[] {
      return state.roleList.length > 0 ? state.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY)
    },
    getIsDynamicAddedRoute(state): boolean {
      return state.isDynamicAddedRoute
    },
  },
  actions: {
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList
      setAuthCache(ROLES_KEY, roleList)
    },
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added
    },
    async initDynamicAuthRoute(): Promise<RouteRecordRaw[]> {
      const routes = [...dynamicRoutes]
      return routes
    },
    async resetStore() {
      this.$reset()
    },
  },
})

export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}
