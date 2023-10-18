import { defineStore } from 'pinia'
import type { RouteLocationNormalizedLoaded, RouteRecordNormalized } from 'vue-router'
import type { Tab } from '@/typings/store'

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
      },
    },
  ],
}

export const useTabStore = defineStore('tab', {
  state: (): TabState => initialTabState,
  getters: {},
  actions: {
    iniTabStore(currentRoute: RouteLocationNormalizedLoaded) {
      if (isInActiveTab(this.activeTab, currentRoute.fullPath))
        return
      const tab = getTabRoute(currentRoute)
      this.tabs.push(tab)
      this.setActiveTab(currentRoute.fullPath)
    },
    addTab(route: RouteRecordNormalized | RouteLocationNormalizedLoaded) {
      const tab = getTabRoute(route)
      if (isInTabRoutes(this.tabs, tab.fullPath))
        return
      this.tabs.push(tab)
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
        // const activePath = updateTabs[updateTabs.length - 1].fullPath
        const activePath = updateTabs[idx - 1].fullPath
        const { routerPush } = useRouterPush(false)
        const navigationFailure = await routerPush(activePath)
        if (!navigationFailure) {
          this.tabs = updateTabs
          this.setActiveTab(activePath)
        }
      }
    },
    resetTabStore() {
      this.$reset()
    },
  },
})
