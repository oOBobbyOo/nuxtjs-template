import { createApp } from 'vue'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import '@/styles/global.css'

import App from './App.vue'
import { setupStore } from '@/stores'

async function bootstrap() {
  const app = createApp(App)

  // 配置 store
  setupStore(app)

  app.mount('#app')
}

bootstrap()
