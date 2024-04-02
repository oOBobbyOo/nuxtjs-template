import { Layout } from '../routes/constant'
import type { MenuRecordRaw } from '@/typings/router'

const dashboard: MenuRecordRaw = {
  path: '/dashboard',
  name: 'Dashboard',
  component: Layout,
  redirect: '/dashboard/analysis',
  meta: {
    orderNo: 0,
    icon: 'mdi:monitor-dashboard',
    title: 'routes.dashboard.dashboard',
    isKeepAlive: true,
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('@/views/dashboard/analysis/index.vue'),
      meta: {
        icon: 'icon-park-outline:analysis',
        title: 'routes.dashboard.analysis',
        isKeepAlive: true,
      },
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('@/views/dashboard/workbench/index.vue'),
      meta: {
        icon: 'icon-park-outline:workbench',
        title: 'routes.dashboard.workbench',
        isKeepAlive: true,
      },
    },
  ],
}

export default dashboard
