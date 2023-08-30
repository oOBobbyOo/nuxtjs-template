// https://nuxt.com/docs/api/configuration/nuxt-config

const siteTitle = 'Nuxt3 starter template'
const siteDescription = 'a starter template for Nuxt 3'
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const shareImg = `${siteUrl}/share.png`
const twitterUser = '@bobby'

export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: siteTitle,
      htmlAttrs: { lang: 'en' },
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      meta: [
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:url', property: 'og:url', content: siteUrl },
        { hid: 'og:title', property: 'og:title', content: siteTitle },
        {
          hid: 'og:description',
          property: 'og:description',
          content: siteDescription,
        },
        { hid: 'og:image', property: 'og:image', content: shareImg },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        // twitter
        { name: 'twitter:site', content: twitterUser },
        { name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:url', name: 'twitter:url', content: siteUrl },
        { hid: 'twitter:title', name: 'twitter:title', content: siteTitle },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: siteDescription,
        },
        { hid: 'twitter:image', name: 'twitter:image', content: shareImg },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
  runtimeConfig: {
    public: {
      baseAPI: process.env.NUXT_PUBLIC_BASE_API,
    },
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
    'nuxt-swiper',
    '@nuxt/image',
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
