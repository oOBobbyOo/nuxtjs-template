<script setup lang="ts">
import TabView from './TabView.vue'
import { useTabStore } from '@/stores/modules/tab'
import { useI18n } from '@/hooks/web/useI18n'
import { RouteEnum } from '@/enums/routeEnum'

defineOptions({ name: 'TabDetail' })

const emits = defineEmits<Emits>()
const { t } = useI18n()
const tab = useTabStore()

interface Emits {
  (e: 'scroll', clientX: number): void
}

const tabRef = ref<HTMLElement>()

async function getActiveTabClientX() {
  await nextTick()
  const tabElement = unref(tabRef)
  if (tabElement && tabElement.children.length && tabElement.children[tab.activeTabIndex]) {
    const activeTabElement = tabElement.children[tab.activeTabIndex]
    const { x, width } = activeTabElement.getBoundingClientRect()
    const clientX = x + width / 2
    setTimeout(() => {
      emits('scroll', clientX)
    }, 50)
  }
}

watch(
  () => tab.activeTabIndex,
  () => {
    getActiveTabClientX()
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div ref="tabRef" class="h-full flex items-end pr-18px text-sm">
    <TabView
      v-for="item in tab.tabs"
      :key="item.fullPath"
      :active="tab.activeTab === item.fullPath"
      :closable="RouteEnum.HOME_PATH !== item.fullPath"
      :full-path="item.fullPath"
      @click-tab="tab.handleClickTab(item.fullPath)"
      @close-tab="tab.removeTab(item.fullPath)"
    >
      <template #prefix>
        <Icon size="16" :icon="item.meta.icon" />
      </template>
      {{ t(item.meta.title) }}
    </TabView>
  </div>
</template>

<style scoped></style>
