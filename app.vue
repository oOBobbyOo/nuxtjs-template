<script setup lang="ts">
const { headerLinks } = useNavigation()

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
