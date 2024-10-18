import { Layout } from '../routes/constant'
import type { MenuRecordRaw } from '@/typings/router'

const feature: MenuRecordRaw = {
  path: '/feature',
  name: 'Feature',
  component: Layout,
  redirect: '/feature/print',
  meta: {
    orderNo: 5,
    icon: 'cil:featured-playlist',
    title: 'routes.feature.feature',
    isKeepAlive: true,
  },
  children: [
    {
      path: 'print',
      name: 'Print',
      component: () => import('@/views/feature/print/index.vue'),
      meta: {
        icon: 'material-symbols:print',
        title: 'routes.feature.print',
        isKeepAlive: true,
      },
    },
    {
      path: 'copy',
      name: 'Copy',
      component: () => import('@/views/feature/copy/index.vue'),
      meta: {
        icon: 'material-symbols:content-copy',
        title: 'routes.feature.copy',
        isKeepAlive: true,
      },
    },
    {
      path: 'guide',
      name: 'Guide',
      component: () => import('@/views/feature/guide/index.vue'),
      meta: {
        icon: 'ep:guide',
        title: 'routes.feature.guide',
        isKeepAlive: true,
      },
    },
    {
      path: 'draggable',
      name: 'Draggable',
      component: () => import('@/views/feature/draggable/index.vue'),
      meta: {
        icon: 'material-symbols:drag-pan',
        title: 'routes.feature.draggable',
        isKeepAlive: true,
      },
    },
    {
      path: 'pinyin',
      name: 'Pinyin',
      component: () => import('@/views/feature/pinyin/index.vue'),
      meta: {
        icon: 'material-symbols:language-chinese-pinyin',
        title: 'routes.feature.pinyin',
        isKeepAlive: true,
      },
    },
    {
      path: 'lazyload',
      name: 'Lazyload',
      component: () => import('@/views/feature/lazyload/index.vue'),
      meta: {
        icon: 'icon-park-outline:add-picture',
        title: 'routes.feature.lazyload',
        isKeepAlive: true,
      },
    },
    {
      path: 'colorthief',
      name: 'Colorthief',
      component: () => import('@/views/feature/colorthief/index.vue'),
      meta: {
        icon: 'ic:outline-color-lens',
        title: 'routes.feature.colorthief',
        isKeepAlive: true,
      },
    },
    {
      path: 'colorpicker',
      name: 'Colorpicker',
      component: () => import('@/views/feature/colorpicker/index.vue'),
      meta: {
        icon: 'tabler:color-picker',
        title: 'routes.feature.colorpicker',
        isKeepAlive: true,
      },
    },
    {
      path: 'vue-office',
      name: 'VueOffice',
      component: () => import('@/views/feature/vueoffice/index.vue'),
      meta: {
        icon: 'uiw:file-excel',
        title: 'routes.feature.vueoffice',
        isKeepAlive: true,
      },
    },
    {
      path: 'waterfall',
      name: 'Waterfall',
      component: () => import('@/views/feature/waterfall/index.vue'),
      meta: {
        icon: 'icon-park-outline:waterfalls-h',
        title: 'routes.feature.waterfall',
        isKeepAlive: true,
      },
    },
  ],
}

export default feature
