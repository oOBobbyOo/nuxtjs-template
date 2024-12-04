import type { App } from 'vue'

// @see https://vxetable.cn/#/start/install
// 按需加载 vite-plugin-lazy-import
import VxeTable from 'vxe-table'
import 'vxe-table/lib/style.css'

import { VxeLoading } from 'vxe-pc-ui'

export function setupVxeTable(app: App<Element>) {
  app.use(VxeLoading)
  app.use(VxeTable)
}
