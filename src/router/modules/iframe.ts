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
      name: 'IfameInline',
      component: () => import('@/views/iframe/inline/index.vue'),
      meta: {
        icon: 'material-symbols:note-stack',
        title: 'routes.iframe.inline',
      },
    },
    {
      path: 'blank',
      name: 'IfameBlank',
      component: () => import('@/views/iframe/blank/index.vue'),
      meta: {
        icon: 'ph:note-blank-fill',
        title: 'routes.iframe.blank',
      },
    },
  ],
}

export default iframe
