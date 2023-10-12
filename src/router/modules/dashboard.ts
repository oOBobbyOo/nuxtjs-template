import type { MenuRecordRaw } from '../types'
import { Layout } from '../routes/constant'

const dashboard: MenuRecordRaw = {
  path: '/dashboard',
  name: 'Dashboard',
  component: Layout,
  redirect: '/dashboard/analysis',
  meta: {
    orderNo: 1,
    icon: 'i-mdi-monitor-dashboard',
    title: 'routes.dashboard.dashboard',
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('@/views/dashboard/analysis/index.vue'),
      meta: {
        icon: 'i-icon-park-outline-analysis',
        title: 'routes.dashboard.analysis',
      },
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('@/views/dashboard/workbench/index.vue'),
      meta: {
        icon: 'i-icon-park-outline:workbench',
        title: 'routes.dashboard.workbench',
      },
    },
  ],
}

export default dashboard
