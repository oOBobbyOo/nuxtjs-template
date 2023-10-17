import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import UnoCSS from 'unocss/vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'
import Inspect from 'vite-plugin-inspect'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log('>>: command', command)
  console.log('>>: mode', mode)

  const viteEnv = loadEnv(mode, process.cwd())
  const isServe = command === 'serve'
  const isDev = mode === 'development'
  const lifecycle = process.env.npm_lifecycle_event
  const isReport = lifecycle === 'build:report'
  const isGzip = lifecycle === 'build:gzip'

  console.log('>>: viteEnv', viteEnv)
  console.log('>>: isServe', isServe)
  console.log('>>: isDev', isDev)

  return {
    base: viteEnv.VITE_BASE_URL,
    plugins: [
      // https://github.com/antfu/unocss
      UnoCSS(),

      vue(),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/head', '@vueuse/core'],
        dts: 'src/auto-imports.d.ts',
        dirs: ['src/composables', 'src/stores'],
        vueTemplate: true,
        resolvers: [ElementPlusResolver()],
      }),

      // https://github.com/antfu/unplugin-vue-components
      Components({
        // allow auto load markdown components under `./src/components/`
        extensions: ['vue', 'md'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: 'src/components.d.ts',
        resolvers: [ElementPlusResolver()],
      }),

      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),

      // https://github.com/vbenjs/vite-plugin-mock/blob/main/README.zh_CN.md
      viteMockServe({
        mockPath: 'mock', // mock目录地址
        watchFiles: false,
      }),

      // https://github.com/btd/rollup-plugin-visualizer
      isReport
        && visualizer({
          open: true,
          gzipSize: true,
          brotliSize: true,
          filename: resolve(__dirname, '.visualizer/stats.html'),
        }),

      // https://github.com/vbenjs/vite-plugin-compression
      isGzip && viteCompression(),

      // https://github.com/antfu/vite-plugin-inspect
      isServe
        && Inspect({
          outputDir: '.vite-inspect',
        }),

      // https://github.com/webfansplz/vite-plugin-vue-devtools
      isServe && VueDevTools(),
    ],
    resolve: {
      alias: {
        '~': resolve(process.cwd()),
        '@': resolve(__dirname, 'src'),
      },
    },
  }
})
