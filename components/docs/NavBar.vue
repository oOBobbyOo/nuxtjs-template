<script setup lang="ts">
const docsQuery = queryContent('docs')
</script>

<template>
  <div class="sticky top-0 z-20 hidden border-t border-transparent bg-white/75 px-6 shadow shadow-gray-200 backdrop-blur-md lg:block dark:bg-black/75 dark:shadow-gray-900">
    <nav relative grid grid-cols-2 h-16 items-center justify-between gap3 sm:grid-cols-6>
      <ContentNavigation v-slot="{ navigation }" :query="docsQuery">
        <div flex items-center justify-start>
          <Icon name="logos:nuxt-icon" mr-3 h-6 w-auto cursor-pointer transition-all />
          <p font-medium text-gray-900 opacity-100 dark:text-gray-100>
            Docs
          </p>
        </div>
        <ul col-span-4 flex justify-center gap-x-8>
          <template v-for="nav in navigation" :key="nav._path">
            <li v-for="link in nav?.children" :key="link._path">
              <NuxtLink :to="link._path" font-medium text-gray-500>
                {{ link.title }}
              </NuxtLink>
            </li>
          </template>
        </ul>
        <div flex justify-end gap-3 />
      </ContentNavigation>
    </nav>
  </div>
</template>

<style scoped></style>
