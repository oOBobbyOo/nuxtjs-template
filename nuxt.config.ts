// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
  modules: [
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    'nuxt-icon',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
  ],
  experimental: {
    reactivityTransform: true,
    inlineSSRStyles: false,
  },
  css: ['@unocss/reset/tailwind.css', '@/assets/styles/global.scss'],
  colorMode: {
    classSuffix: '',
  },
  imports: {
    dirs: ['./stores', '~/stores'],
  },
  pinia: {
    autoImports: [
      'defineStore',
      'storeToRefs',
      ['defineStore', 'definePiniaStore'],
    ],
  },
  content: {
    markdown: {
      mdc: true,
    },
    highlight: {
      theme: 'github-dark',
    },
  },
  i18n: {
    langDir: 'i18n',
    lazy: true,
    defaultLocale: 'en',
    // 检测浏览器语言
    // detectBrowserLanguage: false,
    experimental: {
      jsTsFormatResource: true,
    },
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en-US.ts',
        name: 'English',
      },
      {
        code: 'zh',
        iso: 'zh-CN',
        file: 'zh-CN.ts',
        name: 'Chinese',
      },
    ],
  },
})
