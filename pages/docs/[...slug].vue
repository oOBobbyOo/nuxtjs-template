<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const route = useRoute()

definePageMeta({
  layout: 'docs',
})

const { data } = await useAsyncData(route.path, () => Promise.all([
  queryCollection('docs').path(route.path).first(),
  queryCollectionItemSurroundings('docs', route.path, {
    fields: ['title', 'description'],
  }),
]), {
  transform: ([page, surround]) => ({ page, surround }),
})
if (!data.value || !data.value.page) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const page = computed(() => data.value?.page)
const surround = computed(() => data.value?.surround)
const title = computed(() => (page.value?.navigation as { title: string })?.title || page.value?.title)

const headline = computed(() => findPageHeadline(navigation!.value))
const titleName = computed(() => route.path.includes('studio') ? 'Nuxt Studio' : 'Nuxt Content')

const breadcrumb = computed(() => {
  const links = mapContentNavigation(findPageBreadcrumb(navigation?.value, page.value)).map(link => ({
    label: link.label,
    to: link.to
  }))

  if (route.path.startsWith('/docs/bridge') || route.path.startsWith('/docs/migration')) {
    links.splice(1, 0, {
      label: 'Upgrade Guide',
      to: '/docs/getting-started/upgrade'
    })
  }

  return links
})
</script>

<template>
  <UPage :ui="{
    right: 'sticky top-[--header-height] bg-background/75 backdrop-blur group -mx-4 sm:-mx-6 px-4 sm:px-6 lg:px-4 lg:-mx-4 overflow-y-auto max-h-[calc(100vh-var(--header-height))] z-10'
  }">
    <UPageHeader v-bind="page">
      <template #headline>
        <UBreadcrumb :links="breadcrumb" />
      </template>
    </UPageHeader>

    <UPageBody prose class="dark:text-gray-300 dark:prose-pre:!bg-gray-800/60">
      <ContentRenderer v-if="page && page.body" :value="page" />

      <hr v-if="surround?.length" />

      <UContentSurround :surround="surround" />
    </UPageBody>


    <template v-if="page?.toc !== false" #right>
      <UContentToc :links="page?.body?.toc?.links" :ui="{ wrapper: '' }">
        <template #bottom>
          <div class="hidden lg:block space-y-6" :class="{ '!mt-6': page?.body?.toc?.links?.length }">
            <UDivider v-if="page?.body?.toc?.links?.length" type="dashed" />
          </div>
        </template>
      </UContentToc>
    </template>
  </UPage>
</template>
