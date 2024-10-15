import { Layout } from '../routes/constant'
import type { MenuRecordRaw } from '@/typings/router'

const iframe: MenuRecordRaw = {
  path: '/iframe',
  name: 'Iframe',
  component: Layout,
  redirect: '/iframe/inline',
  meta: {
    orderNo: 10,
    icon: 'material-symbols:iframe',
    title: 'routes.iframe.iframe',
    isKeepAlive: false,
  },
  children: [
    {
      path: 'inline',
      name: 'IframeInline',
      redirect: '/iframe/inline/vue',
      meta: {
        icon: 'material-symbols:note-stack',
        title: 'routes.iframe.inline',
        isKeepAlive: false,
      },
      children: [
        {
          path: 'vue',
          name: 'IframeInlineVue',
          component: () => import('@/views/iframe/inline/vue.vue'),
          meta: {
            icon: 'logos:vue',
            title: 'routes.iframe.vue',
            isKeepAlive: false,
          },
        },
        {
          path: 'vue-router',
          name: 'IframeInlineVueRouter',
          component: () => import('@/views/iframe/inline/vue-router.vue'),
          meta: {
            icon: 'logos:vue',
            title: 'routes.iframe.vue-router',
            isKeepAlive: false,
          },
        },
        {
          path: 'vite',
          name: 'IframeInlineVite',
          component: () => import('@/views/iframe/inline/vite.vue'),
          meta: {
            icon: 'logos:vitejs',
            title: 'routes.iframe.vite',
            isKeepAlive: false,
          },
        },
        {
          path: 'pinia',
          name: 'IframeInlinePina',
          component: () => import('@/views/iframe/inline/pinia.vue'),
          meta: {
            icon: 'logos:pinia',
            title: 'routes.iframe.pinia',
            isKeepAlive: false,
          },
        },
        {
          path: 'unocss',
          name: 'IframeInlineUnoCss',
          component: () => import('@/views/iframe/inline/unocss.vue'),
          meta: {
            icon: 'logos:unocss',
            title: 'routes.iframe.unocss',
            isKeepAlive: false,
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
        isKeepAlive: false,
      },
    },
  ],
}

export default iframe
