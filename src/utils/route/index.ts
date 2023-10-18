import type { RouteLocationNormalizedLoaded, RouteRecordNormalized } from 'vue-router'
import type { Tab } from '@/typings/store'

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
    meta: route.meta,
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
