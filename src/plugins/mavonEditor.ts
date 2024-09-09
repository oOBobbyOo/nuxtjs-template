import type { App } from 'vue'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export function setupMavonEditor(app: App<Element>) {
  app.use(mavonEditor)
}
