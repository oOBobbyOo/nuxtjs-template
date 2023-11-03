// 引入 echarts 核心模块
import * as echarts from 'echarts/core'
import 'echarts-liquidfill'
import type { ComposeOption } from 'echarts/core'
import { registerMap } from 'echarts'

// 系列类型的定义后缀都为 SeriesOption
import type {
  BarSeriesOption,
  EffectScatterSeriesOption,
  LineSeriesOption,
  LinesSeriesOption,
  MapSeriesOption,
  PieSeriesOption,
  ScatterSeriesOption,
} from 'echarts/charts'

// 引入柱状图、折线图，图表后缀都为 Chart
import {
  BarChart,
  EffectScatterChart,
  LineChart,
  LinesChart,
  MapChart,
  PieChart,
  ScatterChart,
} from 'echarts/charts'

// 组件类型的定义后缀都为 ComponentOption
import type {
  DatasetComponentOption,
  GeoComponentOption,
  GridComponentOption,
  LegendComponentOption,
  PolarComponentOption,
  TitleComponentOption,
  TooltipComponentOption,
} from 'echarts/components'

// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  DatasetComponent,
  GeoComponent,
  GridComponent,
  LegendComponent,
  PolarComponent,
  TitleComponent,
  TooltipComponent,
  TransformComponent,
} from 'echarts/components'

// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'

// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
import geoJson from '@/assets/map/china.json'

export type { EChartsOption } from 'echarts'

export type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | LinesSeriesOption
  | PieSeriesOption
  | MapSeriesOption
  | ScatterSeriesOption
  | EffectScatterSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | PolarComponentOption
  | LegendComponentOption
  | GeoComponentOption
>

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  PolarComponent,
  LegendComponent,
  GeoComponent,
  BarChart,
  LineChart,
  LinesChart,
  PieChart,
  MapChart,
  ScatterChart,
  EffectScatterChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
])

type GeoJsonType = Parameters<typeof registerMap>[1]

// 注册地图
registerMap('china', geoJson as GeoJsonType)

export default echarts
