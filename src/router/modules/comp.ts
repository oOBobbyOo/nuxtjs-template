import type { MenuRecordRaw } from '../types'
import { Layout } from '../routes/constant'

const comp: MenuRecordRaw = {
  path: '/comp',
  name: 'Comp',
  component: Layout,
  redirect: '/comp/guide',
  meta: {
    orderNo: 6,
    icon: 'icon-park-outline:components',
    title: 'routes.comp.component',
  },
  children: [
    {
      path: 'guide',
      name: 'Guide',
      component: () => import('@/views/comp/guide/index.vue'),
      meta: {
        icon: 'ep:guide',
        title: 'routes.comp.guide',
      },
    },
    {
      path: 'typeit',
      name: 'TypeIt',
      component: () => import('@/views/comp/typeit/index.vue'),
      meta: {
        icon: 'mdi:typewriter',
        title: 'routes.comp.typeit',
      },
    },
    {
      path: 'video',
      name: 'Video',
      redirect: '/comp/video/xgplayer',
      meta: {
        icon: 'mdi:video',
        title: 'routes.comp.video',
      },
      children: [
        {
          path: 'xgplayer',
          name: 'XgPlayer',
          component: () => import('@/views/comp/video/xgplayer.vue'),
          meta: {
            icon: 'mdi:video-wireless',
            title: 'routes.comp.xgplayer',
          },
        },
        {
          path: 'dplayer',
          name: 'DPlayer',
          component: () => import('@/views/comp/video/dplayer.vue'),
          meta: {
            icon: 'mdi:video-vintage',
            title: 'routes.comp.dplayer',
          },
        },
      ],
    },
  ],
}

export default comp
