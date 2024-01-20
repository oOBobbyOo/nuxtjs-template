import type { App } from 'vue'
import { createPinia } from 'pinia'
import { piniaReset } from '@/plugins'

const store = createPinia()

// 修复setup模式$reset无效的问题
store.use(piniaReset)

export function setupStore(app: App<Element>) {
  app.use(store)
}

export { store }
