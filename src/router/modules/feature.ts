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
  ],
}

export default feature
