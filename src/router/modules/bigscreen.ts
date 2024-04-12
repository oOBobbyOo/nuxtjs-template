import type { MenuRecordRaw } from '@/typings/router'

const bigscreen: MenuRecordRaw = {
  path: '/bigscreen',
  name: 'BigScreen',
  component: () => import('@/views/bigscreen/index.vue'),
  meta: {
    orderNo: 12,
    icon: 'ant-design:fund-projection-screen-outlined',
    title: 'routes.bigscreen.bigscreen',
    hide: true,
    hideInMenu: true,
    isKeepAlive: true,
  },
}

export default bigscreen
