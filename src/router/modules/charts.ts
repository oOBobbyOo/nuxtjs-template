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
          component: () => import('@/views/charts/echarts/line/index.vue'),
          meta: {
            icon: 'mdi:chart-line',
            title: 'routes.charts.line',
            isKeepAlive: true,
          },
        },
        {
          path: 'bar',
          name: 'BarChart',
          component: () => import('@/views/charts/echarts/bar/index.vue'),
          meta: {
            icon: 'mdi:chart-bar',
            title: 'routes.charts.bar',
            isKeepAlive: true,
          },
        },
        {
          path: 'pie',
          name: 'PieChart',
          component: () => import('@/views/charts/echarts/pie/index.vue'),
          meta: {
            icon: 'mdi:chart-pie',
            title: 'routes.charts.pie',
            isKeepAlive: true,
          },
        },
        {
          path: 'map',
          name: 'ChinaMapChart',
          component: () => import('@/views/charts/echarts/map/index.vue'),
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
          component: () => import('@/views/charts/antv/g2/index.vue'),
          meta: {
            icon: 'simple-icons:g2',
            title: 'routes.charts.g2',
            isKeepAlive: true,
          },
        },
      ],
    },
  ],
}

export default echarts
