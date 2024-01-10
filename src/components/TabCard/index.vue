<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus'

defineOptions({ name: 'TabCard' })

const props = withDefaults(defineProps<Props>(), {})

const emits = defineEmits(['tabClick'])

export interface Tab {
  name: string
  label: string
  props?: any
  content: Comment
}

interface Props {
  activeTab?: string | number
  tabList: Tab[]
}

const modelValue = computed(() => {
  return props.activeTab ?? props.tabList[0]?.name
})

function handleTabClick(tab: TabsPaneContext, event: Event) {
  emits('tabClick', tab, event)
}
</script>

<template>
  <div class="el-card is-always-shadow tab-card">
    <el-tabs :model-value="modelValue" @tab-click="handleTabClick">
      <el-tab-pane v-for="item in tabList" :key="item.name" :label="item.label" :name="item.name">
        <component :is="item.content" v-bind="item.props" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="less">
.tab-card {
  ::v-deep(.el-tabs__header) {
    padding: 0 var(--el-card-padding);
    border-bottom: 1px solid var(--el-card-border-color);
    box-sizing: border-box;
    margin: 0;
  }

  ::v-deep(.el-tabs__nav) {
    padding: 10px 0;
  }

  ::v-deep(.el-tabs__item) {
    font-size: var(--el-font-size-medium);
    font-weight: 400;
  }

  ::v-deep(.el-tabs__nav-wrap::after) {
    height: 1px;
  }

  ::v-deep(.el-tabs__content) {
    padding: var(--el-card-padding);
    height: 100%;
    overflow-y: auto;
  }
}
</style>
