import { defineStore } from 'pinia'
import type { RouteLocationNormalizedLoaded, RouteRecordNormalized } from 'vue-router'
import type { Tab } from '@/typings/store'
import { RouteEnum } from '@/enums/routeEnum'

import {
  filterTabRoutes,
  getIndexInTabRoutes,
  getTabRoute,
  isInActiveTab,
  isInTabRoutes,
} from '@/utils/route'

interface TabState {
  activeTab: string
  tabs: Tab[]
  cacheTabs: string[]
}

const initialTabState: TabState = {
  activeTab: '/dashboard/analysis',
  tabs: [
    {
      name: 'Analysis',
      fullPath: '/dashboard/analysis',
      meta: {
        icon: 'mdi:monitor-dashboard',
        title: 'routes.dashboard.analysis',
        isKeepAlive: true,
      },
    },
  ],
  cacheTabs: [],
}

export const useTabStore = defineStore('tab', {
  state: (): TabState => initialTabState,
  getters: {
    activeTabIndex(state) {
      const { tabs, activeTab } = state
      return getIndexInTabRoutes(tabs, activeTab)
    },
    getCacheTabs(state): string[] {
      return state.cacheTabs
    },
  },
  actions: {
    iniTabStore(currentRoute: RouteLocationNormalizedLoaded) {
      const tab = getTabRoute(currentRoute)
      if (RouteEnum.HOME_PATH === currentRoute.fullPath)
        this.updateCacheTab(tab)

      if (isInActiveTab(this.activeTab, currentRoute.fullPath))
        return
      this.tabs.push(tab)
      this.setActiveTab(currentRoute.fullPath)
      this.updateCacheTab(tab)
    },
    addTab(route: RouteRecordNormalized | RouteLocationNormalizedLoaded) {
      const tab = getTabRoute(route)
      if (isInTabRoutes(this.tabs, tab.fullPath))
        return
      this.tabs.push(tab)
      this.updateCacheTab(tab)
    },
    setActiveTab(fullPath: string) {
      this.activeTab = fullPath
    },
    handleClickTab(fullPath: string) {
      if (isInActiveTab(this.activeTab, fullPath))
        return
      const { routerPush } = useRouterPush(false)
      routerPush(fullPath, false)
    },
    async removeTab(fullPath: string) {
      const isActive = isInActiveTab(this.activeTab, fullPath)
      const updateTabs = filterTabRoutes(this.tabs, fullPath)
      const idx = getIndexInTabRoutes(this.tabs, fullPath)
      if (!isActive)
        this.tabs = updateTabs
      if (isActive && updateTabs.length && idx > 0) {
        const activePath = updateTabs[idx - 1].fullPath
        const { routerPush } = useRouterPush(false)
        const navigationFailure = await routerPush(activePath)
        if (!navigationFailure) {
          this.tabs = updateTabs
          this.setActiveTab(activePath)
        }
      }
    },
    async clearTab(excludes: string[] = []) {
      const homePath = initialTabState.tabs[0].fullPath
      const remain = [homePath, ...excludes]
      const hasActive = remain.includes(this.activeTab)
      const updateTabs = this.tabs.filter(tab => remain.includes(tab.fullPath))
      if (hasActive)
        this.tabs = updateTabs
      if (!hasActive && updateTabs.length) {
        const activePath = updateTabs[updateTabs.length - 1].fullPath
        const { routerPush } = useRouterPush(false)
        const navigationFailure = await routerPush(activePath)
        if (!navigationFailure) {
          this.tabs = updateTabs
          this.setActiveTab(activePath)
        }
      }
    },
    clearCurrentTab(currentPath: string) {
      this.removeTab(currentPath)
    },
    clearLeftTab(currentPath: string) {
      const idx = getIndexInTabRoutes(this.tabs, currentPath)
      if (idx > -1) {
        const excludes = this.tabs.slice(idx).map(item => item.fullPath)
        this.clearTab(excludes)
      }
    },
    clearRightTab(currentPath: string) {
      const idx = getIndexInTabRoutes(this.tabs, currentPath)
      if (idx > -1) {
        const excludes = this.tabs.slice(0, idx + 1).map(item => item.fullPath)
        this.clearTab(excludes)
      }
    },
    clearOtherTab(currentPath: string) {
      this.clearTab([currentPath])
    },
    clearAllTab() {
      this.clearTab()
    },
    updateCacheTab(tab: Tab) {
      const isKeepAlive = tab.meta?.isKeepAlive
      if (this.cacheTabs.includes(tab.name))
        this.cacheTabs.splice(this.cacheTabs.indexOf(tab.name), 1)
      isKeepAlive && this.cacheTabs.unshift(tab.name)
    },
    async resetStore() {
      this.$reset()
    },
  },
})
