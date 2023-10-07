import { createApp } from 'vue'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import '@/styles/global.css'

import App from './App.vue'
import { setupStore } from '@/stores'
import { setupRouter } from '@/router'
import { setupGlobDirectives } from '@/directives'

async function bootstrap() {
  const app = createApp(App)

  // 配置 store
  setupStore(app)

  // 配置 router
  await setupRouter(app)

  // 注册全局指令
  setupGlobDirectives(app)

  app.mount('#app')
}

bootstrap()
