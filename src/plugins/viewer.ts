import type { App } from 'vue'

// @see https://github.com/mirari/v-viewer
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'

export function setupViewer(app: App<Element>) {
  app.use(VueViewer)
}
