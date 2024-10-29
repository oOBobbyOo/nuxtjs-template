import { defineStore } from 'pinia'
import type { MenuRecordRaw } from '@/typings/router'
import { dynamicRoutes } from '@/router/routes/dynamic'
import type { RoleEnum } from '@/enums/roleEnum'
import { getAuthCache, setAuthCache } from '@/utils/auth'
import { ROLES_KEY } from '@/enums/cacheEnum'
import { generatePermissionRoutes } from '@/utils/route'

interface PermissionState {
  // 角色权限列表
  roleList: RoleEnum[]
  // 动态权限路由
  accessRoutes: MenuRecordRaw[]
  // 路由是否动态添加
  isDynamicAddedRoute: boolean
}

export const usePermissionStore = defineStore('permission', {
  state: (): PermissionState => ({
    roleList: [],
    accessRoutes: [],
    isDynamicAddedRoute: false,
  }),
  getters: {
    getRoleList(state): RoleEnum[] {
      return state.roleList.length > 0 ? state.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY)
    },
    getAccessRoutes(state): MenuRecordRaw[] {
      return state.accessRoutes
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
    setAccessRoutes(routes: MenuRecordRaw[]) {
      this.accessRoutes = routes
    },
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added
    },
    async initDynamicAuthRoute(): Promise<MenuRecordRaw[]> {
      // const routes = [...dynamicRoutes]
      const routes = generatePermissionRoutes(dynamicRoutes)
      this.setAccessRoutes(routes)
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
