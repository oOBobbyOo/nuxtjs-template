<script setup lang="ts">
import SwitchItem from './SwitchItem.vue'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

defineOptions({ name: 'PageFunc' })

const { getCollapsed, toggleCollapsed } = useMenuSetting()

const collasped = ref(!getCollapsed.value)

watch(
  () => getCollapsed.value,
  (val) => {
    collasped.value = !val
  },
)
</script>

<template>
  <div>
    <SwitchItem
      v-model:model-value="collasped"
      label="折叠菜单"
      @update:model-value="toggleCollapsed"
    />
  </div>
</template>

<style scoped></style>
