import { Layout } from '../routes/constant'
import type { MenuRecordRaw } from '@/typings/router'

const comp: MenuRecordRaw = {
  path: '/comp',
  name: 'Comp',
  component: Layout,
  redirect: '/comp/screen-locker',
  meta: {
    orderNo: 6,
    icon: 'icon-park-outline:components',
    title: 'routes.comp.component',
  },
  children: [
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
    {
      path: 'image',
      name: 'Image',
      redirect: '/comp/image/upload',
      meta: {
        icon: 'lets-icons:img-box-fill',
        title: 'routes.comp.image',
      },
      children: [
        {
          path: 'upload',
          name: 'Upload',
          component: () => import('@/views/comp/image/upload/index.vue'),
          meta: {
            icon: 'uil:image-upload',
            title: 'routes.comp.upload',
          },
        },
        {
          path: 'cropper',
          name: 'Cropper',
          component: () => import('@/views/comp/image/cropper/index.vue'),
          meta: {
            icon: 'material-symbols:crop',
            title: 'routes.comp.cropper',
          },
        },
      ],
    },
  ],
}

export default comp
