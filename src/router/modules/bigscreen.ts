import { Layout } from '../routes/constant'
import type { MenuRecordRaw } from '@/typings/router'

const bigscreen: MenuRecordRaw = {
  path: '/bigscreen',
  name: 'BigScreen',
  component: Layout,
  meta: {
    orderNo: 12,
    icon: 'ant-design:fund-projection-screen-outlined',
    title: 'routes.bigscreen.bigscreen',
    hide: true,
    hideInMenu: true,
    isKeepAlive: true,
  },
  children: [
    {
      path: '',
      name: 'DataScreen',
      component: () => import('@/views/bigscreen/index.vue'),
      meta: {
        icon: 'ant-design:fund-projection-screen-outlined',
        title: 'routes.bigscreen.bigscreen',
        isKeepAlive: true,
      },
    },
  ],
}

export default bigscreen
