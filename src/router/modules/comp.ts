import { Layout } from '../routes/constant'
import type { MenuRecordRaw } from '@/typings/router'

const comp: MenuRecordRaw = {
  path: '/comp',
  name: 'Comp',
  component: Layout,
  redirect: '/comp/guide',
  meta: {
    orderNo: 5,
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
      path: 'screen-locker',
      name: 'ScreenLocker',
      component: () => import('@/views/comp/screen-locker/index.vue'),
      meta: {
        icon: 'icon-park-twotone:locking-computer',
        title: 'routes.comp.screenLocker',
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
      path: 'copy',
      name: 'Copy',
      component: () => import('@/views/comp/copy/index.vue'),
      meta: {
        icon: 'material-symbols:content-copy',
        title: 'routes.comp.copy',
      },
    },
    {
      path: 'music',
      name: 'Music',
      component: () => import('@/views/comp/music/index.vue'),
      meta: {
        icon: 'material-symbols:library-music',
        title: 'routes.comp.music',
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
    {
      path: 'editor',
      name: 'Editor',
      redirect: '/comp/editor/wangeditor',
      meta: {
        icon: 'mdi:text-box-edit',
        title: 'routes.comp.editor',
      },
      children: [
        {
          path: 'wangeditor',
          name: 'WangEditor',
          component: () => import('@/views/comp/editor/wangeditor/index.vue'),
          meta: {
            icon: 'mdi:content-save-edit',
            title: 'routes.comp.wangeditor',
          },
        },
        {
          path: 'mardown',
          name: 'Markdown',
          component: () => import('@/views/comp/editor/mardown/index.vue'),
          meta: {
            icon: 'ri:markdown-fill',
            title: 'routes.comp.markdown',
          },
        },
      ],
    },
  ],
}

export default comp
