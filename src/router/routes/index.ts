import type { RouteRecordRaw } from 'vue-router'

const Dashboard = () => import('@/views/Dashboard/index.vue')

// 固定路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'dashborad',
    component: Dashboard,
  },
]
