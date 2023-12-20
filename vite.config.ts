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
      isGzip
        && viteCompression({
          verbose: true, // 是否在控制台中输出压缩结果
          disable: false,
          threshold: 10240, // 如果体积大于阈值，将被压缩，单位为b，体积过小时请不要压缩，以免适得其反
          algorithm: 'gzip', // 压缩算法，可选['gzip'，' brotliccompress '，'deflate '，'deflateRaw']
          ext: '.gz',
          deleteOriginFile: true, // 源文件压缩后是否删除(为了看压缩后的效果，选择了true)
        }),

      // https://github.com/antfu/vite-plugin-inspect
      isServe
        && Inspect({
          outputDir: '.vite-inspect',
        }),

      // https://github.com/webfansplz/vite-plugin-vue-devtools
      isServe && VueDevTools(),
    ],
    // 默认启动的是 esbuild
    esbuild: {
      // pure: ['console.log'], // 删除 console.log
      drop: ['console', 'debugger'], // 删除 所有的console 和 debugger
    },
    build: {
      minify: 'terser', // 启用 terser 压缩， 默认为 Esbuild，它比 terser 快 20-40 倍，压缩率只差 1%-2%。
      terserOptions: {
        compress: {
          // pure_funcs: ['console.log'], // 只删除 console.log
          drop_console: true, // 删除所有 console
          drop_debugger: true, // 删除所有 debugger
        },
        format: {
          comments: false, // 删除所有注释
        },
      },
      chunkSizeWarningLimit: 1024, // 规定触发警告的 chunk 大小, 以 kB 为单位, 默认 500
      rollupOptions: {
        output: {
          // 最小化拆分包
          // manualChunks(id) {
          //   if (id.includes('node_modules')) {
          //     return id.toString().split('node_modules/')[1].split('/')[0].toString()
          //   }
          // },

          // 单独拆分
          manualChunks: {
            'vue-venders': ['vue', 'vue-router'],
            'echarts': ['echarts', 'echarts-liquidfill'],
            'lodash': ['lodash-es'],
          },
          chunkFileNames: 'assets/js/[name]-[hash].js', // 引入文件名的名称
          entryFileNames: 'assets/js/[name]-[hash].js', // 包的入口文件名称
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
          experimentalMinChunkSize: 10 * 1024, // 单位b 没有副作用，合并较小的模块
        },
      },
    },
    resolve: {
      alias: {
        '~': resolve(process.cwd()),
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 5173, // 默认端口
      proxy: {
        '/api': {
          target: 'http://localhost:5173',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
