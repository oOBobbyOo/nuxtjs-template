<script setup lang="ts">
const { headerLinks } = useNavigation()

const { data: navigation } = await useLazyAsyncData('navigation', () => queryCollectionNavigation('docs'), {
  transform: data => data.find(item => item.path === '/docs')?.children || []
})

// Provide
provide('navigation', navigation)

useSeoMeta({
  ogSiteName: 'Nuxt',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterSite: 'nuxt_js'
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator />

    <AppHeader :links="headerLinks" />

    <UMain class="relative">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <AppFooter />
  </div>
</template>
