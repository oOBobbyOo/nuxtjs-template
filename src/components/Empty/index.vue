<script setup lang="ts">
defineOptions({ name: 'Empty' })

withDefaults(defineProps<Props>(), {
  imageSize: 100,
  description: '暂无数据',
})

interface Props {
  image?: string
  imageSize?: number
  description?: string
}
</script>

<template>
  <el-empty :image="image" :image-size="imageSize" :description="description">
    <slot />
  </el-empty>
</template>

<style scoped></style>
