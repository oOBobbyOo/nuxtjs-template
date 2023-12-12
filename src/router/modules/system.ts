import { Layout } from '../routes/constant'
import type { MenuRecordRaw } from '@/typings/router'

const system: MenuRecordRaw = {
  path: '/system',
  name: 'System',
  component: Layout,
  redirect: '/system/auth',
  meta: {
    orderNo: 7,
    icon: 'carbon:cloud-service-management',
    title: 'routes.system.management',
  },
  children: [
    {
      path: 'auth',
      name: 'AuthManagement',
      component: () => import('@/views/system/auth/index.vue'),
      meta: {
        icon: 'ic:baseline-security',
        title: 'routes.system.auth',
      },
    },
    {
      path: 'role',
      name: 'RoleManagement',
      component: () => import('@/views/system/role/index.vue'),
      meta: {
        icon: 'carbon:user-role',
        title: 'routes.system.role',
      },
    },
    {
      path: 'user',
      name: 'UserManagement',
      component: () => import('@/views/system/user/index.vue'),
      meta: {
        icon: 'ic:round-manage-accounts',
        title: 'routes.system.user',
      },
    },
    {
      path: 'menu',
      name: 'MenuManagement',
      component: () => import('@/views/system/menu/index.vue'),
      meta: {
        icon: 'material-symbols:route',
        title: 'routes.system.menu',
      },
    },
  ],
}

export default system
