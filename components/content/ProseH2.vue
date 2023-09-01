<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'

const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && headings?.anchorLinks?.h2)
</script>

<template>
  <h2 :id="id">
    <a
      v-if="id && generate"
      :href="`#${id}`"
    >
      <slot />
    </a>
    <slot v-else />
  </h2>
</template>

<style scoped>
h2 {
  display: block;
  font-family: var(--typography-font-display);
  font-size: var(--prose-h2-fontSize);
  font-weight: var(--prose-h2-fontWeight);
  letter-spacing: var(--prose-h2-letterSpacing);
  line-height: var(--prose-h2-lineHeight);
  margin: var(--prose-h2-margin);
}
</style>
