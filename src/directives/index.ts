import type { App, Directive } from 'vue'
import { setupPermissionDirective } from './permission'

import copy from './modules/copy'
import debounce from './modules/debounce'
import throttle from './modules/throttle'

const modules: { [key: string]: Directive } = {
  copy,
  debounce,
  throttle,
}

export function setupGlobDirectives(app: App) {
  setupPermissionDirective(app)

  Object.keys(modules).forEach((key) => {
    const defaultModule = modules[key]
    const name = key.replace(/\.\/(.+)\.ts$/, '$1')
    app.directive(name, defaultModule as Directive)
  })
}
