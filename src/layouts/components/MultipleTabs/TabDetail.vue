<script setup lang="ts">
import TabView from './TabView.vue'
import { useTabStore } from '@/stores/modules/tab'
import { useI18n } from '@/hooks/web/useI18n'
import { RouteEnum } from '@/enums/routeEnum'

defineOptions({
  name: 'TabDetail',
})

const tab = useTabStore()

const { t } = useI18n()
</script>

<template>
  <div class="h-full flex items-end pr-18px text-sm">
    <TabView
      v-for="item in tab.tabs"
      :key="item.fullPath"
      :active="tab.activeTab === item.fullPath"
      :closable="RouteEnum.HOME_PATH !== item.fullPath"
      @click="tab.handleClickTab(item.fullPath)"
      @close="tab.removeTab(item.fullPath)"
    >
      <template #prefix>
        <Icon size="16" :icon="item.meta.icon" />
      </template>
      {{ t(item.meta.title) }}
    </TabView>
  </div>
</template>

<style scoped></style>
