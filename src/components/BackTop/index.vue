<script setup lang="ts">
defineOptions({ name: 'BackTop' })

withDefaults(defineProps<Props>(), {
  right: 40,
  bottom: 100,
  icon: 'bx:arrow-to-top',
})

interface Props {
  right?: number
  bottom?: number
  icon?: string
}

const target = ref('.layout-content')
</script>

<template>
  <el-backtop :right="right" :bottom="bottom" :target="target">
    <Icon size="24" :icon="icon" />
  </el-backtop>
</template>
