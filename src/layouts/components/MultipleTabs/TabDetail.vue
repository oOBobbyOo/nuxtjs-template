<script setup lang="ts">
import TabView from './TabView.vue'
import { useTabStore } from '@/stores/modules/tab'
import { useI18n } from '@/hooks/web/useI18n'

defineOptions({
  name: 'TabDetail',
})

const tab = useTabStore()

const { t } = useI18n()
</script>

<template>
  <div class="h-full flex items-end pr-18px text-sm">
    <TabView v-for="item in tab.tabs" :key="item.name" :active="tab.activeTab === item.name">
      <template #prefix>
        <Icon size="16" :icon="item.meta.icon" />
      </template>
      {{ t(item.meta.title) }}
    </TabView>
  </div>
</template>

<style scoped></style>
