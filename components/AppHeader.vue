<script setup lang="ts">
import type { Link } from '#ui-pro/types'

const open = ref(false)
const isMobile = ref(false)

function openLogoContext() {
  if (isMobile.value) return navigateTo('/')
  open.value = true
}

defineProps<{
  links?: Link[]
}>()
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/" class="flex gap-2 items-end">
        <NuxtLogo ref="logo" class="block w-auto h-6" @click.right.prevent="openLogoContext"
          @click.left.prevent="navigateTo('/')" />
      </NuxtLink>
    </template>

    <template #center>
      <UHeaderLinks :links="links" :ui="{
        default: {
          popover: {
            popper: { strategy: 'absolute' },
            ui: { width: 'w-[256px]' }
          }
        }
      }" class="hidden lg:flex" />
    </template>

    <template #right>
      <UTooltip text="GitHub Stars">
        <UButton icon="i-simple-icons-github" to="" target="_blank" v-bind="($ui.button.secondary as any)" />
      </UTooltip>
    </template>
  </UHeader>
</template>