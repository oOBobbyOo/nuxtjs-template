import { Layout } from '../routes/constant'
import type { MenuRecordRaw } from '@/typings/router'

const feature: MenuRecordRaw = {
  path: '/feature',
  name: 'Feature',
  component: Layout,
  redirect: '/feature/print',
  meta: {
    orderNo: 4,
    icon: 'cil:featured-playlist',
    title: 'routes.feature.feature',
  },
  children: [
    {
      path: 'print',
      name: 'Print',
      component: () => import('@/views/feature/print/index.vue'),
      meta: {
        icon: 'material-symbols:print',
        title: 'routes.feature.print',
      },
    },
    {
      path: 'copy',
      name: 'Copy',
      component: () => import('@/views/feature/copy/index.vue'),
      meta: {
        icon: 'material-symbols:content-copy',
        title: 'routes.feature.copy',
      },
    },
    {
      path: 'guide',
      name: 'Guide',
      component: () => import('@/views/feature/guide/index.vue'),
      meta: {
        icon: 'ep:guide',
        title: 'routes.feature.guide',
      },
    },
  ],
}

export default feature
