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
  font-family: var(--typography-font-display);
  font-size: var(--prose-h1-fontSize);
  font-weight: var(--prose-h1-fontWeight);
  letter-spacing: var(--prose-h1-letterSpacing);
  line-height: var(--prose-h1-lineHeight);
  margin: var(--prose-h1-margin);
}
</style>
