import type { MenuRecordRaw } from '../types'
import { Layout } from '../routes/constant'

const echarts: MenuRecordRaw = {
  path: '/charts',
  name: 'Charts',
  component: Layout,
  redirect: '/charts/echarts',
  meta: {
    orderNo: 5,
    icon: 'carbon:chart-multitype',
    title: 'routes.charts.charts',
  },
  children: [
    {
      path: 'echarts',
      name: 'Echarts',
      redirect: '/charts/echarts/line',
      meta: {
        icon: 'simple-icons:apacheecharts',
        title: 'routes.charts.echarts',
      },
      children: [
        {
          path: 'line',
          name: 'LineChart',
          component: () => import('@/views/charts/echarts/line/index.vue'),
          meta: {
            icon: 'mdi:chart-line',
            title: 'routes.charts.line',
          },
        },
      ],
    },
  ],
}

export default echarts
