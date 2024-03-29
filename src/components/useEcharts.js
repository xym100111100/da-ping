// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'

// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, FunnelChart, PieChart, MapChart, LineChart } from 'echarts/charts'

// 引入提示框，标题，直角坐标系组件
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  VisualMapComponent
} from 'echarts/components'

// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  VisualMapComponent,
  LineChart,
  BarChart,
  PieChart,
  MapChart,
  FunnelChart,
  CanvasRenderer
])

export default echarts
