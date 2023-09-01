<script setup lang="ts">
import type { ExampleProps } from '@/types/index'

const props = defineProps<{
  navigation: ExampleProps[]
}>()
const { navigation } = toRefs(props)

const { isRouteActive } = useRouteActive()
</script>

<template>
  <aside col-span-2 hidden overflow-x-hidden overflow-y-auto pb-8 lg:sticky lg:top-16 lg:block lg:self-start lg:pt-8 lg:-mt-8 sm:-mb-24>
    <ul px-1>
      <template v-for="nav in navigation" :key="nav.path">
        <li>
          <NuxtLink
            :to="nav.path" #="{ isActive }" class="w-full flex py-1.5" :class="{
              'font-semibold !pt-0': isRouteActive(nav.path),
              'hover:font-semibold': !isRouteActive(nav.path),
            }"
          >
            <div inline-flex items-center>
              <Icon :name="nav.icon" mr-1 h-5 w-5 />
              <div flex flex-col>
                <span>{{ nav.title }}</span>
                <span
                  class="inset-x-0 h-0.5 -bottom-1" :class="{
                    'bg-gradient-to-r from-green-400 to-teal-400': isActive,
                  }"
                />
              </div>
            </div>
          </NuxtLink>
        </li>
      </template>
    </ul>
  </aside>
</template>
