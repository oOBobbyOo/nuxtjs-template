import { Layout } from '../routes/constant'
import type { MenuRecordRaw } from '@/typings/router'

const system: MenuRecordRaw = {
  path: '/system',
  name: 'System',
  component: Layout,
  redirect: '/system/auth',
  meta: {
    orderNo: 8,
    icon: 'carbon:cloud-service-management',
    title: 'routes.system.management',
    isKeepAlive: true,
  },
  children: [
    {
      path: 'auth',
      name: 'AuthManagement',
      component: () => import('@/views/system/auth/index.vue'),
      meta: {
        icon: 'ic:baseline-security',
        title: 'routes.system.auth',
        isKeepAlive: true,
      },
    },
    {
      path: 'role',
      name: 'RoleManagement',
      component: () => import('@/views/system/role/index.vue'),
      meta: {
        icon: 'carbon:user-role',
        title: 'routes.system.role',
        isKeepAlive: true,
      },
    },
    {
      path: 'user',
      name: 'UserManagement',
      component: () => import('@/views/system/user/index.vue'),
      meta: {
        icon: 'ic:round-manage-accounts',
        title: 'routes.system.user',
        isKeepAlive: true,
      },
    },
    {
      path: 'menu',
      name: 'MenuManagement',
      component: () => import('@/views/system/menu/index.vue'),
      meta: {
        icon: 'material-symbols:route',
        title: 'routes.system.menu',
        isKeepAlive: true,
      },
    },
    {
      path: 'org',
      name: 'OrgManagement',
      component: () => import('@/views/system/org/index.vue'),
      meta: {
        icon: 'eos-icons:organization',
        title: 'routes.system.org',
        isKeepAlive: true,
      },
    },
  ],
}

export default system
