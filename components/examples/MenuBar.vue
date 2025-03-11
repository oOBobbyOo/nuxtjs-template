<script setup lang="ts">
const { data } = await useFetch('/api/examples')

const menus = computed(() => {
  const navs = data.value?.examples || []
  return [
    {
      key: 'all',
      title: 'All',
      path: '/examples',
    },
    ...navs,
  ]
})

const { isRouteActive } = useRouteActive()
</script>

<template>
  <div class="sticky top-0 z-20 hidden border-t border-transparent bg-white/75 px-6 shadow shadow-gray-200 backdrop-blur-md lg:block dark:bg-background/75 dark:shadow-gray-900">
    <nav relative grid grid-cols-2 h-16 items-center justify-between gap3 sm:grid-cols-6>
      <div flex items-center justify-start>
        <Icon name="logos:nuxt-icon" mr-3 h-6 w-auto cursor-pointer transition-all />
        <p text-gray-900 font-medium opacity-100 dark:text-gray-100>
          Examples
        </p>
      </div>
      <ul col-span-4 flex justify-center gap-x-8>
        <li v-for="menu in menus" :key="menu.key">
          <NuxtLink
            :to="menu.path" class="u-text-gray-500 hover:u-text-gray-900 focus:u-text-gray-900 font-medium" :class="{
              'u-text-gray-900': isRouteActive(menu.path),
            }"
          >
            {{ menu.title }}
          </NuxtLink>
        </li>
      </ul>
      <div flex justify-end gap-3 />
    </nav>
  </div>
</template>
