<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'

const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc

const generate = computed(() => props.id && headings?.anchorLinks?.h1)
</script>

<template>
  <h1 :id="id">
    <a
      v-if="generate"
      :href="`#${id}`"
    >
      <slot />
    </a>
    <slot v-else />
  </h1>
</template>

<style scoped>
h1 {
  display: block;
  font-family: "RoobertPRO", "RoobertPRO override", sans-serif;
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -0.025rem;
  line-height: 60px;
  margin: 0 0 2rem;
}
</style>
