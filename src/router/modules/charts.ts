import { Layout } from '../routes/constant'
import type { MenuRecordRaw } from '@/typings/router'

const echarts: MenuRecordRaw = {
  path: '/charts',
  name: 'Charts',
  component: Layout,
  redirect: '/charts/echarts',
  meta: {
    orderNo: 3,
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
        {
          path: 'bar',
          name: 'BarChart',
          component: () => import('@/views/charts/echarts/bar/index.vue'),
          meta: {
            icon: 'mdi:chart-bar',
            title: 'routes.charts.bar',
          },
        },
        {
          path: 'pie',
          name: 'PieChart',
          component: () => import('@/views/charts/echarts/pie/index.vue'),
          meta: {
            icon: 'mdi:chart-pie',
            title: 'routes.charts.pie',
          },
        },
        {
          path: 'map',
          name: 'ChinaMapChart',
          component: () => import('@/views/charts/echarts/map/index.vue'),
          meta: {
            icon: 'majesticons:map-marker-area-line',
            title: 'routes.charts.map',
          },
        },
      ],
    },
  ],
}

export default echarts
