<script setup lang="ts">
import { useAppStore } from '@/stores/modules/app'
import { useTabStore } from '@/stores/modules/tab'
import { useAppSetting } from '@/hooks/setting/useAppSetting'

defineOptions({ name: 'LayoutPage' })

const app = useAppStore()
const tab = useTabStore()

const { getOpenKeepAlive } = useAppSetting()

const getCaches = computed((): string[] => {
  if (!unref(getOpenKeepAlive))
    return []
  return tab.getCacheTabs
})
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade-slide" mode="out-in" :appear="true">
      <keep-alive v-if="getOpenKeepAlive" :include="getCaches">
        <component
          :is="Component"
          v-if="app.reloadFlag"
          :key="route.path"
          class="transition duration-300 ease-in-out"
        />
      </keep-alive>
      <template v-else>
        <component
          :is="Component"
          v-if="app.reloadFlag"
          :key="route.path"
          class="transition duration-300 ease-in-out"
        />
      </template>
    </transition>
  </router-view>
</template>

<style scoped lang="less"></style>
