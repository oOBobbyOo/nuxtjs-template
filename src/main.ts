import { createApp } from 'vue'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import '@/styles/global.css'

import App from './App.vue'
import { setupStore } from '@/stores'
import { setupRouter } from '@/router'

async function bootstrap() {
  const app = createApp(App)

  // 配置 store
  setupStore(app)

  // 配置 router
  await setupRouter(app)

  app.mount('#app')
}

bootstrap()
