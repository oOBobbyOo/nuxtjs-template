import { defineStore } from 'pinia'

interface TabState {
  tabs: any[]
  activeTab: string
}

export const useTabStore = defineStore('tab', {
  state: (): TabState => ({
    tabs: [
      {
        name: 'Analysis',
        path: '/dashboard/analysis',
        meta: {
          icon: 'mdi:monitor-dashboard',
          title: 'routes.dashboard.dashboard',
        },
      },
      {
        name: 'Workbench',
        path: '/dashboard/Workbench',
        meta: {
          icon: 'icon-park-outline:workbench',
          title: 'routes.dashboard.workbench',
        },
      },
      {
        name: '403',
        path: '/exception/403',
        meta: {
          icon: 'ic:baseline-block',
          title: 'routes.exception.403',
        },
      },
    ],
    activeTab: 'Workbench',
  }),
  getters: {},
  actions: {
    addTab() {},
    setActiveTab() {},
    resetTabStore() {},
  },
})
