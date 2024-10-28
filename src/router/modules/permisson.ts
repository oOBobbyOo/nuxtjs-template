import { Layout } from '../routes/constant'
import type { MenuRecordRaw } from '@/typings/router'

const permission: MenuRecordRaw = {
  path: '/permission',
  name: 'Permission',
  component: Layout,
  redirect: '/permission/index',
  meta: {
    orderNo: 7,
    icon: 'icon-park-outline:permissions',
    title: 'routes.permission.permissions',
    hideInMenu: true,
    isKeepAlive: true,
  },
  children: [
    {
      path: 'index',
      name: 'PermissionIndex',
      component: () => import('@/views/permission/index.vue'),
      meta: {
        icon: 'icon-park-solid:permissions',
        title: 'routes.permission.permission',
        isKeepAlive: true,
      },
    },
    {
      path: 'super-admin',
      name: 'SuperAdmin',
      component: () => import('@/views/permission/super-admin.vue'),
      meta: {
        icon: 'material-symbols:supervised-user-circle',
        title: 'routes.permission.superVisible',
        isKeepAlive: true,
      },
    },
  ],
}

export default permission
