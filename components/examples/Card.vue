<script setup lang="ts">
import type { ExampleProps } from '@/types/index'
import { formatNumber } from '@/utils'

const props = defineProps<{
  example: ExampleProps
}>()
const { example } = toRefs(props)
</script>

<template>
  <div relative border-1 b-gray-200 b-rd-3 border-solid bg-white transition-2 dark:b-gray-800 hover:b-green-400 dark:bg-dark-900>
    <div class="header flex justify-start px-6 pt-5">
      <NuxtImg
        :src="example.img"
        alt="swiper"
        class="h-12 w-auto"
        loading="lazy"
        height="48"
        width="48"
      />
    </div>
    <div class="body px-6 py-5">
      <h4 class="u-text-gray-700 truncate text-lg font-semibold">
        {{ example.title }}
      </h4>
      <p class="u-text-gray-700 line-clamp-2 mb-4 text-sm sm:min-h-[40px]">
        {{ example.description }}
      </p>
    </div>
    <NuxtLink :to="example.path">
      <span sr-only>{{ `Link to ${example.path}` }}</span>
      <span absolute inset-0 />
    </NuxtLink>
    <div class="footer px-6 py-5">
      <div class="u-text-gray-500 flex-center justify-between gap-3 -mb-2">
        <div flex items-center gap-3>
          <div flex items-center gap-1.5>
            <Icon name="material-symbols:star-outline" />
            <span text-sm>{{ formatNumber(example.star) }}</span>
          </div>
          <div flex items-center gap-1.5>
            <Icon name="fe:download" />
            <span text-sm>{{ formatNumber(example.download) }}</span>
          </div>
        </div>
        <div flex items-center gap-1.5>
          <Icon name="uil:users-alt" />
          <span text-sm>{{ formatNumber(example.fork) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
