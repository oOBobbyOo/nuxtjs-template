import { createApp } from 'vue'
import 'virtual:svg-icons-register'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import '@/styles/global.less'

import App from './App.vue'
import { setupDayjs, setupLoading, setupMavonEditor, setupViewer } from '@/plugins'
import { setupStore } from '@/stores'
import { setupI18n } from '@/locales'
import { setupRouter } from '@/router'
import { setupGlobDirectives } from '@/directives'

async function bootstrap() {
  // 加载全局 loading
  setupLoading()

  setupDayjs()

  const app = createApp(App)

  // mavonEditor
  setupMavonEditor(app)

  // 配置 viewer
  setupViewer(app)

  // 配置 store
  setupStore(app)

  // 多语言配置
  await setupI18n(app)

  // 配置 router
  await setupRouter(app)

  // 注册全局指令
  setupGlobDirectives(app)

  app.mount('#app')
}

bootstrap()
