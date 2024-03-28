import type { RouteRecordRaw, Router } from 'vue-router'
import { resetRouter } from '..'
import { useUserStoreWithOut } from '@/stores/modules/user'
import { RouteEnum } from '@/enums/routeEnum'
import { usePermissionStoreWithOut } from '@/stores/modules/permission'

const LOGIN_PATH = RouteEnum.LOGIN_PATH

// 路由白名单
const ROUTER_WHITE_LIST: string[] = [LOGIN_PATH]

export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut()
  const permissionStore = usePermissionStoreWithOut()

  router.beforeEach(async (to, from, next) => {
    // 判断是访问登录页，有 Token 就在当前页面，没有 Token 重置路由到登录页
    if (to.path === LOGIN_PATH) {
      if (userStore.token)
        return next(from.fullPath)
      resetRouter()
      return next()
    }

    // 判断访问页面是否在路由白名单地址中，如果存在直接放行
    if (ROUTER_WHITE_LIST.includes(to.path))
      return next()

    // 判断是否有 Token，没有重定向到登录页
    if (!userStore.getToken)
      return next({ path: LOGIN_PATH, query: { redirect: to.fullPath }, replace: true })

    // 动态路由加载（首次）
    if (!permissionStore.getIsDynamicAddedRoute) {
      const routes = await permissionStore.initDynamicAuthRoute()

      routes.forEach((route) => {
        router.addRoute(route as unknown as RouteRecordRaw)
      })

      // 记录动态路由加载完成
      permissionStore.setDynamicAddedRoute(true)

      // 此处应当重定向到 fullPath，否则会加载 NotFound 页面
      return next({ path: to.fullPath, query: to.query, replace: true })
    }

    // 正常访问
    next()
  })
}
