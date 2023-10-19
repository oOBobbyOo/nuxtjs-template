import type { MenuRecordRaw } from '../types'
import { Layout } from '../routes/constant'

const iframe: MenuRecordRaw = {
  path: '/iframe',
  name: 'Iframe',
  component: Layout,
  redirect: '/iframe/inline',
  meta: {
    orderNo: 7,
    icon: 'material-symbols:iframe',
    title: 'routes.iframe.iframe',
  },
  children: [
    {
      path: 'inline',
      name: 'IframeInline',
      redirect: '/iframe/inline/vue',
      meta: {
        icon: 'material-symbols:note-stack',
        title: 'routes.iframe.inline',
      },
      children: [
        {
          path: 'vue',
          name: 'IframeInlineVue',
          component: () => import('@/views/iframe/inline/vue.vue'),
          meta: {
            icon: 'logos:vue',
            title: 'routes.iframe.vue',
          },
        },
        {
          path: 'vite',
          name: 'IframeInlineVite',
          component: () => import('@/views/iframe/inline/vite.vue'),
          meta: {
            icon: 'logos:vitejs',
            title: 'routes.iframe.vite',
          },
        },
        {
          path: 'pinia',
          name: 'IframeInlinePina',
          component: () => import('@/views/iframe/inline/pinia.vue'),
          meta: {
            icon: 'logos:pinia',
            title: 'routes.iframe.pinia',
          },
        },
      ],
    },
    {
      path: 'blank',
      name: 'IfameBlank',
      component: () => import('@/views/iframe/blank/index.vue'),
      meta: {
        icon: 'ph:note-blank-fill',
        title: 'routes.iframe.blank',
        href: 'https://github.com/vuejs/core',
      },
    },
  ],
}

export default iframe
