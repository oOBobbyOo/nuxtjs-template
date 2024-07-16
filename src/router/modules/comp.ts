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
    isKeepAlive: true,
  },
  children: [
    {
      path: 'model-loading',
      name: 'ModelLoading',
      component: () => import('@/views/comp/loading/index.vue'),
      meta: {
        icon: 'carbon:progress-bar',
        title: 'routes.comp.modelLoading',
        isKeepAlive: true,
      },
    },
    {
      path: 'screen-locker',
      name: 'ScreenLocker',
      component: () => import('@/views/comp/screen-locker/index.vue'),
      meta: {
        icon: 'icon-park-twotone:locking-computer',
        title: 'routes.comp.screenLocker',
        isKeepAlive: true,
      },
    },
    {
      path: 'typeit',
      name: 'TypeIt',
      component: () => import('@/views/comp/typeit/index.vue'),
      meta: {
        icon: 'mdi:typewriter',
        title: 'routes.comp.typeit',
        isKeepAlive: true,
      },
    },
    {
      path: 'music',
      name: 'Music',
      component: () => import('@/views/comp/music/index.vue'),
      meta: {
        icon: 'material-symbols:library-music',
        title: 'routes.comp.music',
        isKeepAlive: true,
      },
    },
    {
      path: 'video',
      name: 'Video',
      redirect: '/comp/video/xgplayer',
      meta: {
        icon: 'mdi:video',
        title: 'routes.comp.video',
        isKeepAlive: true,
      },
      children: [
        {
          path: 'xgplayer',
          name: 'XgPlayer',
          component: () => import('@/views/comp/video/xgplayer.vue'),
          meta: {
            icon: 'mdi:video-wireless',
            title: 'routes.comp.xgplayer',
            isKeepAlive: true,
          },
        },
        {
          path: 'dplayer',
          name: 'DPlayer',
          component: () => import('@/views/comp/video/dplayer.vue'),
          meta: {
            icon: 'mdi:video-vintage',
            title: 'routes.comp.dplayer',
            isKeepAlive: true,
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
        isKeepAlive: true,
      },
      children: [
        {
          path: 'wangeditor',
          name: 'WangEditor',
          component: () => import('@/views/comp/editor/wangeditor/index.vue'),
          meta: {
            icon: 'mdi:content-save-edit',
            title: 'routes.comp.wangeditor',
            isKeepAlive: true,
          },
        },
        {
          path: 'mardown',
          name: 'Markdown',
          component: () => import('@/views/comp/editor/mardown/index.vue'),
          meta: {
            icon: 'ri:markdown-fill',
            title: 'routes.comp.markdown',
            isKeepAlive: true,
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
        isKeepAlive: true,
      },
      children: [
        {
          path: 'preview',
          name: 'Preview',
          component: () => import('@/views/comp/image/preview/index.vue'),
          meta: {
            icon: 'material-symbols:preview',
            title: 'routes.comp.preview',
            isKeepAlive: true,
          },
        },
        {
          path: 'upload',
          name: 'Upload',
          component: () => import('@/views/comp/image/upload/index.vue'),
          meta: {
            icon: 'uil:image-upload',
            title: 'routes.comp.upload',
            isKeepAlive: true,
          },
        },
        {
          path: 'cropper',
          name: 'Cropper',
          component: () => import('@/views/comp/image/cropper/index.vue'),
          meta: {
            icon: 'material-symbols:crop',
            title: 'routes.comp.cropper',
            isKeepAlive: true,
          },
        },
      ],
    },
    {
      path: 'banner',
      name: 'Banner',
      redirect: '/comp/banner/carousel',
      meta: {
        icon: 'material-symbols:view-carousel',
        title: 'routes.comp.banner',
        isKeepAlive: true,
      },
      children: [
        {
          path: 'carousel',
          name: 'Carousel',
          component: () => import('@/views/comp/banner/carousel/index.vue'),
          meta: {
            icon: 'ic:sharp-view-carousel',
            title: 'routes.comp.carousel',
            isKeepAlive: true,
          },
        },
        {
          path: 'swiper',
          name: 'Swiper',
          component: () => import('@/views/comp/banner/swiper/index.vue'),
          meta: {
            icon: 'simple-icons:swiper',
            title: 'routes.comp.swiper',
            isKeepAlive: true,
          },
        },
      ],
    },
  ],
}

export default comp
