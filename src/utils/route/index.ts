import type {
  RouteLocationNormalizedLoaded,
  RouteRecordNormalized,
  RouteRecordRaw,
} from 'vue-router'
import type { Tab } from '@/typings/store'
import type { MenuMeta, MenuRecordRaw } from '@/typings/router'
import { isValidArray } from '@/utils/is'
import { usePermission } from '@/hooks/web/usePermission'
import { usePermissionStore } from '@/stores/modules/permission'

export function hasFullPath(route: RouteRecordNormalized | RouteLocationNormalizedLoaded) {
  return Boolean((route as RouteLocationNormalizedLoaded).fullPath)
}

export function getTabRoute(route: RouteRecordNormalized | RouteLocationNormalizedLoaded): Tab {
  const fullPath = hasFullPath(route)
    ? (route as RouteLocationNormalizedLoaded).fullPath
    : route.path

  return {
    name: route.name as string,
    fullPath,
    meta: route.meta as MenuMeta,
  }
}

export function getIndexInTabName(tabs: Tab[], routeName: string) {
  return tabs.findIndex(tab => tab.name === routeName)
}

export function getIndexInTabRoutes(tabs: Tab[], fullPath: string) {
  return tabs.findIndex(tab => tab.fullPath === fullPath)
}

export function isInTabRoutes(tabs: Tab[], fullPath: string) {
  return getIndexInTabRoutes(tabs, fullPath) > -1
}

export function isInActiveTab(activeTab: string, fullPath: string) {
  return activeTab === fullPath
}

export function filterTabRoutes(tabs: Tab[], fullPath: string) {
  return tabs.filter(tab => tab.fullPath !== fullPath)
}

export function generatePermissionRoutes(routes: MenuRecordRaw[]) {
  const accessRoutes: MenuRecordRaw[] = []
  const { hasPermission } = usePermission()
  routes.forEach((route) => {
    if (isValidArray(route.children)) {
      accessRoutes.push({
        ...route,
        children: route.children.filter((item: MenuRecordRaw) => hasPermission(item.meta?.roles)),
      })
    }
    else {
      hasPermission(route.meta?.roles) && accessRoutes.push(route)
    }
  })
  return accessRoutes
}

export function transformRouteToMenu(
  routes: MenuRecordRaw[],
  parentPath?: string,
): MenuRecordRaw[] {
  const menus: MenuRecordRaw[] = []
  routes.forEach((route) => {
    if (route.meta?.hide)
      return
    const path = parentPath ? `${parentPath}/${route.path}` : `${route.path}`
    if (isValidArray(route.children)) {
      if (route.children.length === 1 && route.meta?.hideInMenu) {
        // 只有一个子路由且隐藏时，不显示子菜单
        const child = transformRouteToMenu(route.children, path)[0]
        menus.push({
          ...child,
          meta: {
            orderNo: route.meta?.orderNo,
            ...child.meta,
          },
        })
      }
      else {
        menus.push({
          ...route,
          path,
          children: transformRouteToMenu(route.children, path),
        })
      }
    }
    else {
      menus.push({
        ...route,
        path,
      })
    }
  })
  return menus
}

export function sortMenus(menus: MenuRecordRaw[]) {
  return menus.sort(
    (a: MenuRecordRaw, b: MenuRecordRaw) => (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0),
  )
}

export function generateMenus() {
  const permissionStore = usePermissionStore()
  const menus = transformRouteToMenu(permissionStore.getAccessRoutes)
  return sortMenus(menus)
}

export function flattenMenus(arr: MenuRecordRaw[]): MenuRecordRaw[] {
  return arr.reduce((prev, cur) => {
    prev.push(cur)
    return prev.concat(Array.isArray(cur.children) ? flattenMenus(cur.children) : [])
  }, [] as MenuRecordRaw[])
}

export function transformRouteToBreadcrumbs(
  matched: RouteRecordRaw[],
  parentPath?: string,
): MenuRecordRaw[] {
  const breadcrumbs: MenuRecordRaw[] = []
  matched.forEach((route) => {
    const path = parentPath ? `${parentPath}/${route.path}` : `${route.path}`
    const breadcrumb = {
      name: route.name,
      path,
      meta: route.meta,
    } as MenuRecordRaw
    if (isValidArray(route.children)) {
      if (route.children.length === 1 && route.meta?.hideInMenu)
        return
      breadcrumbs.push({
        ...breadcrumb,
        children: transformRouteToBreadcrumbs(route.children, route.path),
      })
    }
    else {
      breadcrumbs.push({
        ...breadcrumb,
      })
    }
  })
  return breadcrumbs
}

export function generateBreadcrumbs(route: RouteLocationNormalizedLoaded): MenuRecordRaw[] {
  const matched = route.matched
  return transformRouteToBreadcrumbs(matched)
}
