import type { RouteLocationNormalizedLoaded, RouteRecordNormalized } from 'vue-router'
import type { Tab } from '@/typings/store'
import type { MenuRecordRaw } from '@/router/types'
import { dynamicRoutes } from '@/router/routes/dynamic'
import { isValidArray } from '@/utils/is'

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
    meta: route.meta as {
      title: string
      icon: string
    },
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

export function transformRouteToMenu(
  routes: MenuRecordRaw[],
  parentPath?: string,
): MenuRecordRaw[] {
  const menus: MenuRecordRaw[] = []
  routes.forEach((route) => {
    const path = parentPath ? `${parentPath}/${route.path}` : `${route.path}`
    if (isValidArray(route.children)) {
      menus.push({
        ...route,
        path,
        children: transformRouteToMenu(route.children, path),
      })
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
  const menus = transformRouteToMenu(dynamicRoutes)
  return sortMenus(menus)
}

export function flattenMenus(arr: MenuRecordRaw[]): MenuRecordRaw[] {
  return arr.reduce((prev, cur) => {
    prev.push(cur)
    return prev.concat(Array.isArray(cur.children) ? flattenMenus(cur.children) : [])
  }, [] as MenuRecordRaw[])
}

export function generateBreadcrumbs(route: RouteLocationNormalizedLoaded): MenuRecordRaw[] {
  const matched = route.matched
  const breadcrumbs = matched.map((item) => {
    const breadcrumb = {
      name: item.name,
      path: item.path,
      meta: item.meta,
      children: item.children,
    } as MenuRecordRaw
    return breadcrumb
  })
  return breadcrumbs
}
