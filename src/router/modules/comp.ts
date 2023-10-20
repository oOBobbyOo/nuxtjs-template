import type { MenuRecordRaw } from '../types'
import { Layout } from '../routes/constant'

const comp: MenuRecordRaw = {
  path: '/comp',
  name: 'Comp',
  component: Layout,
  redirect: '/comp/typeit',
  meta: {
    orderNo: 6,
    icon: 'icon-park-outline:components',
    title: 'routes.comp.component',
  },
  children: [
    {
      path: 'typeit',
      name: 'TypeIt',
      component: () => import('@/views/comp/typeit/index.vue'),
      meta: {
        icon: 'mdi:typewriter',
        title: 'routes.comp.typeit',
      },
    },
  ],
}

export default comp
