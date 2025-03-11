import { createSharedComposable } from '@vueuse/core'

const _useNavigation = () => {
  const nuxtApp = useNuxtApp()

  const headerLinks = computed(() => {
    const route = useRoute()

    return [{
      label: 'Docs',
      icon: 'i-ph-book-bookmark',
      to: '/docs',
      search: false,
      children: [{
        label: 'Installation',
        description: 'Get started with Nuxt quickly with our online starters or start locally with your terminal.',
        icon: 'i-ph-rocket-launch',
        to: '/docs/getting-started/installation',
        active: route.path.startsWith('/docs/getting-started/installation')
      }, {
        label: 'Configuration',
        description: 'Nuxt is configured with sensible defaults to make you productive.',
        icon: 'i-ph-book-open',
        to: '/docs/getting-started/configuration',
        active: route.path.startsWith('/docs/getting-started/configuration')
      }]
    }, {
      label: 'Examples',
      icon: 'i-ph-sparkle',
      to: '/examples',
      search: false,
      children: [{
        label: 'Nuxt-Swiper',
        description: 'Nuxt module for Swiper.js - Most modern mobile touch slider with hardware accelerated transitions.',
        icon: 'i-ph-rocket-launch',
        to: '/examples/swiper',
      }, {
         label: 'Confetti',
        description: 'JS Confetti library that supports emojis.',
        icon: 'i-ph-rocket-launch',
        to: '/examples/confetti',
      }]
    }, {
      label: 'About',
      icon: 'i-ph-newspaper',
      to: '/about'
    }]
  })

  return {
    headerLinks,
  }
}

export const useNavigation = createSharedComposable(_useNavigation)