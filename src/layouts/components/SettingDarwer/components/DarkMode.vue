<script setup lang="ts">
import SwitchItem from './SwitchItem.vue'
import DarkIcon from './DarkIcon.vue'
import LightIcon from './LightIcon.vue'

defineOptions({ name: 'DarkMode' })

const darkMode = ref(isDark.value)

function changeDarkMode(val: boolean | string | number) {
  isDark.value = val as boolean
  updateDarkMode()
}

watch(
  () => isDark.value,
  (val) => {
    darkMode.value = val
  },
)
</script>

<template>
  <SwitchItem
    v-model:model-value="darkMode"
    label="深色主题"
    :active-action-icon="DarkIcon"
    :inactive-action-icon="LightIcon"
    @update:model-value="changeDarkMode"
  >
    <!-- <template #active-action>
      <DarkIcon />
    </template>
    <template #inactive-action>
      <LightIcon />
    </template> -->
  </SwitchItem>
</template>

<style scoped></style>
