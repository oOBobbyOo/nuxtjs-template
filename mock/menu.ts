import type { MockMethod } from 'vite-plugin-mock'
import { requestSuccess } from './_util'

const menus = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    redirect: '/dashboard/analysis',
    meta: {
      orderNo: 0,
      icon: 'mdi:monitor-dashboard',
      title: 'routes.dashboard.dashboard',
      isKeepAlive: true,
    },
    children: [
      {
        path: 'analysis',
        name: 'Analysis',
        meta: {
          icon: 'icon-park-outline:analysis',
          title: 'routes.dashboard.analysis',
          isKeepAlive: true,
        },
      },
      {
        path: 'workbench',
        name: 'Workbench',
        meta: {
          icon: 'icon-park-outline:workbench',
          title: 'routes.dashboard.workbench',
          isKeepAlive: true,
        },
      },
    ],
  },
  {
    path: '/from',
    name: 'From',
    redirect: '/from/basicForm',
    meta: {
      orderNo: 1,
      icon: 'material-symbols:edit-square-outline',
      title: 'routes.form.form',
      isKeepAlive: true,
    },
    children: [
      {
        path: 'basicForm',
        name: 'BasicForm',
        meta: {
          icon: 'material-symbols:edit-note',
          title: 'routes.form.basicForm',
          isKeepAlive: true,
        },
      },
    ],
  },
  {
    path: '/table',
    name: 'Table',
    redirect: '/table/basicTable',
    meta: {
      orderNo: 2,
      icon: 'mdi:table-large',
      title: 'routes.table.table',
      isKeepAlive: true,
    },
    children: [
      {
        path: 'basicTable',
        name: 'BasicTable',
        meta: {
          icon: 'mdi:table',
          title: 'routes.table.basicTable',
          isKeepAlive: true,
        },
      },
      {
        path: 'advancedTable',
        name: 'AdvancedTable',
        meta: {
          icon: 'material-symbols:table',
          title: 'routes.table.advancedTable',
          isKeepAlive: true,
        },
      },
      {
        path: 'complexTable',
        name: 'ComplexTable',
        meta: {
          icon: 'material-symbols:table-view',
          title: 'routes.table.complexTable',
          isKeepAlive: true,
        },
      },
    ],
  },
  {
    path: '/charts',
    name: 'Charts',
    redirect: '/charts/echarts',
    meta: {
      orderNo: 3,
      icon: 'carbon:chart-multitype',
      title: 'routes.charts.charts',
      isKeepAlive: true,
    },
    children: [
      {
        path: 'echarts',
        name: 'Echarts',
        redirect: '/charts/echarts/line',
        meta: {
          icon: 'simple-icons:apacheecharts',
          title: 'routes.charts.echarts',
          isKeepAlive: true,
        },
        children: [
          {
            path: 'line',
            name: 'LineChart',
            meta: {
              icon: 'mdi:chart-line',
              title: 'routes.charts.line',
              isKeepAlive: true,
            },
          },
          {
            path: 'bar',
            name: 'BarChart',
            meta: {
              icon: 'mdi:chart-bar',
              title: 'routes.charts.bar',
              isKeepAlive: true,
            },
          },
          {
            path: 'pie',
            name: 'PieChart',
            meta: {
              icon: 'mdi:chart-pie',
              title: 'routes.charts.pie',
              isKeepAlive: true,
            },
          },
          {
            path: 'map',
            name: 'ChinaMapChart',
            meta: {
              icon: 'majesticons:map-marker-area-line',
              title: 'routes.charts.map',
              isKeepAlive: true,
            },
          },
        ],
      },
      {
        path: 'antv',
        name: 'Antv',
        redirect: '/charts/antv/g2',
        meta: {
          icon: 'simple-icons:antdesign',
          title: 'routes.charts.antv',
          isKeepAlive: true,
        },
        children: [
          {
            path: 'g2',
            name: 'G2Chart',
            meta: {
              icon: 'simple-icons:g2',
              title: 'routes.charts.g2',
              isKeepAlive: true,
            },
          },
        ],
      },
    ],
  },
  {
    path: '/directives',
    name: 'Directives',
    redirect: '/directives/index',
    meta: {
      orderNo: 4,
      icon: 'carbon:stamp',
      title: 'routes.directives.directives',
      isKeepAlive: true,
    },
    children: [
      {
        path: 'index',
        name: 'CommonlyDirective',
        meta: {
          icon: 'mdi:stamper',
          title: 'routes.directives.commonly',
          isKeepAlive: true,
        },
      },
      {
        path: 'draggable',
        name: 'DraggableDirective',
        meta: {
          icon: 'mdi:stamper',
          title: 'routes.directives.draggable',
          isKeepAlive: true,
        },
      },
      {
        path: 'watermark',
        name: 'WatermarkDirective',
        meta: {
          icon: 'mdi:stamper',
          title: 'routes.directives.watermark',
          isKeepAlive: true,
        },
      },
    ],
  },
  {
    path: '/feature',
    name: 'Feature',
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
        meta: {
          icon: 'material-symbols:print',
          title: 'routes.feature.print',
          isKeepAlive: true,
        },
      },
      {
        path: 'copy',
        name: 'Copy',
        meta: {
          icon: 'material-symbols:content-copy',
          title: 'routes.feature.copy',
          isKeepAlive: true,
        },
      },
      {
        path: 'guide',
        name: 'Guide',
        meta: {
          icon: 'ep:guide',
          title: 'routes.feature.guide',
          isKeepAlive: true,
        },
      },
      {
        path: 'draggable',
        name: 'Draggable',
        meta: {
          icon: 'material-symbols:drag-pan',
          title: 'routes.feature.draggable',
          isKeepAlive: true,
        },
      },
      {
        path: 'pinyin',
        name: 'Pinyin',
        meta: {
          icon: 'material-symbols:language-chinese-pinyin',
          title: 'routes.feature.pinyin',
          isKeepAlive: true,
        },
      },
      {
        path: 'lazyload',
        name: 'Lazyload',
        meta: {
          icon: 'icon-park-outline:add-picture',
          title: 'routes.feature.lazyload',
          isKeepAlive: true,
        },
      },
      {
        path: 'colorthief',
        name: 'Colorthief',
        meta: {
          icon: 'ic:outline-color-lens',
          title: 'routes.feature.colorthief',
          isKeepAlive: true,
        },
      },
      {
        path: 'colorpicker',
        name: 'Colorpicker',
        meta: {
          icon: 'tabler:color-picker',
          title: 'routes.feature.colorpicker',
          isKeepAlive: true,
        },
      },
      {
        path: 'vue-office',
        name: 'VueOffice',
        meta: {
          icon: 'uiw:file-excel',
          title: 'routes.feature.vueoffice',
          isKeepAlive: true,
        },
      },
      {
        path: 'vue-flow',
        name: 'VueFlow',
        meta: {
          icon: 'ri:flow-chart',
          title: 'routes.feature.vueflow',
          isKeepAlive: true,
        },
      },
      {
        path: 'waterfall',
        name: 'Waterfall',
        meta: {
          icon: 'icon-park-outline:waterfalls-h',
          title: 'routes.feature.waterfall',
          isKeepAlive: true,
        },
      },
      {
        path: 'captcha',
        name: 'Captcha',
        meta: {
          icon: 'tabler:lock-code',
          title: 'routes.feature.captcha',
          isKeepAlive: true,
        },
      },
    ],
  },
  {
    path: '/comp',
    name: 'Comp',
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
        meta: {
          icon: 'carbon:progress-bar',
          title: 'routes.comp.modelLoading',
          isKeepAlive: true,
        },
      },
      {
        path: 'screen-locker',
        name: 'ScreenLocker',
        meta: {
          icon: 'icon-park-twotone:locking-computer',
          title: 'routes.comp.screenLocker',
          isKeepAlive: true,
        },
      },
      {
        path: 'typeit',
        name: 'TypeIt',
        meta: {
          icon: 'mdi:typewriter',
          title: 'routes.comp.typeit',
          isKeepAlive: true,
        },
      },
      {
        path: 'music',
        name: 'Music',
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
            meta: {
              icon: 'mdi:video-wireless',
              title: 'routes.comp.xgplayer',
              isKeepAlive: true,
            },
          },
          {
            path: 'dplayer',
            name: 'DPlayer',
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
            meta: {
              icon: 'mdi:content-save-edit',
              title: 'routes.comp.wangeditor',
              isKeepAlive: true,
            },
          },
          {
            path: 'mardown',
            name: 'Markdown',
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
            meta: {
              icon: 'material-symbols:preview',
              title: 'routes.comp.preview',
              isKeepAlive: true,
            },
          },
          {
            path: 'upload',
            name: 'Upload',
            meta: {
              icon: 'uil:image-upload',
              title: 'routes.comp.upload',
              isKeepAlive: true,
            },
          },
          {
            path: 'cropper',
            name: 'Cropper',
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
            meta: {
              icon: 'ic:sharp-view-carousel',
              title: 'routes.comp.carousel',
              isKeepAlive: true,
            },
          },
          {
            path: 'swiper',
            name: 'Swiper',
            meta: {
              icon: 'simple-icons:swiper',
              title: 'routes.comp.swiper',
              isKeepAlive: true,
            },
          },
        ],
      },
    ],
  },
  {
    path: '/system',
    name: 'System',
    meta: {
      orderNo: 7,
      icon: 'carbon:cloud-service-management',
      title: 'routes.system.management',
      isKeepAlive: true,
    },
    children: [
      {
        path: 'auth',
        name: 'AuthManagement',
        meta: {
          icon: 'ic:baseline-security',
          title: 'routes.system.auth',
          isKeepAlive: true,
        },
      },
      {
        path: 'role',
        name: 'RoleManagement',
        meta: {
          icon: 'carbon:user-role',
          title: 'routes.system.role',
          isKeepAlive: true,
        },
      },
      {
        path: 'user',
        name: 'UserManagement',
        meta: {
          icon: 'ic:round-manage-accounts',
          title: 'routes.system.user',
          isKeepAlive: true,
        },
      },
      {
        path: 'menu',
        name: 'MenuManagement',
        meta: {
          icon: 'material-symbols:route',
          title: 'routes.system.menu',
          isKeepAlive: true,
        },
      },
      {
        path: 'org',
        name: 'OrgManagement',
        meta: {
          icon: 'eos-icons:organization',
          title: 'routes.system.org',
          isKeepAlive: true,
        },
      },
    ],
  },
  {
    path: '/account',
    name: 'Account',
    redirect: '/account/center',
    meta: {
      orderNo: 8,
      icon: 'material-symbols:account-circle',
      title: 'routes.account.account',
      isKeepAlive: true,
    },
    children: [
      {
        path: 'center',
        name: 'AccountCenter',
        meta: {
          icon: 'material-symbols:user-attributes',
          title: 'routes.account.center',
          isKeepAlive: true,
        },
      },
      {
        path: 'settings',
        name: 'AccountSettings',
        meta: {
          icon: 'material-symbols:manage-accounts',
          title: 'routes.account.settings',
          isKeepAlive: true,
        },
      },
    ],
  },
  {
    path: '/exception',
    name: 'Exception',
    redirect: '/exception/403',
    meta: {
      orderNo: 9,
      icon: 'ant-design:exception-outlined',
      title: 'routes.exception.exception',
      isKeepAlive: true,
    },
    children: [
      {
        path: '403',
        name: 'Exception403',
        meta: {
          icon: 'ic:baseline-block',
          title: 'routes.exception.403',
          isKeepAlive: true,
        },
      },
      {
        path: '404',
        name: 'Exception404',
        meta: {
          icon: 'ic:baseline-web-asset-off',
          title: 'routes.exception.404',
          isKeepAlive: true,
        },
      },
      {
        path: '500',
        name: 'Exception500',
        meta: {
          icon: 'ic:baseline-wifi-off',
          title: 'routes.exception.500',
          isKeepAlive: true,
        },
      },
    ],
  },
  {
    path: '/iframe',
    name: 'Iframe',
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
            meta: {
              icon: 'logos:vue',
              title: 'routes.iframe.vue',
              isKeepAlive: false,
            },
          },
          {
            path: 'vue-router',
            name: 'IframeInlineVueRouter',
            meta: {
              icon: 'logos:vue',
              title: 'routes.iframe.vue-router',
              isKeepAlive: false,
            },
          },
          {
            path: 'vite',
            name: 'IframeInlineVite',
            meta: {
              icon: 'logos:vitejs',
              title: 'routes.iframe.vite',
              isKeepAlive: false,
            },
          },
          {
            path: 'pinia',
            name: 'IframeInlinePina',
            meta: {
              icon: 'logos:pinia',
              title: 'routes.iframe.pinia',
              isKeepAlive: false,
            },
          },
          {
            path: 'unocss',
            name: 'IframeInlineUnoCss',
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
        meta: {
          icon: 'ph:note-blank-fill',
          title: 'routes.iframe.blank',
          href: 'https://github.com/vuejs/core',
          isKeepAlive: false,
        },
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    redirect: '/about/index',
    meta: {
      orderNo: 11,
      icon: 'fluent:book-information-24-regular',
      title: 'routes.about.about',
      hideInMenu: true,
      isKeepAlive: true,
    },
  },
]

export default [
  {
    url: '/api/menu/list',
    method: 'get',
    response: () => {
      return requestSuccess({
        list: menus,
        total: menus.length,
      })
    },
  },
] as MockMethod[]
