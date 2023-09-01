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
  font-family: "RoobertPRO", "RoobertPRO override", sans-serif;
  font-size: 36px;
  font-weight: 700;
  letter-spacing: -0.025rem;
  line-height: 1.25;
  margin: 3rem 0 2rem;
}
</style>
