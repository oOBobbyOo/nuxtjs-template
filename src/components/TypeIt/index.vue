<script setup lang="ts">
import TypeIt from 'typeit'
import type { Options } from 'typeit/dist/types'

defineOptions({ name: 'TypeIt' })

// https://www.typeitjs.com/docs/vanilla/usage/#configuration-basics
const props = defineProps<Props>()

interface Props {
  strings: string[]
  options?: Options
}

const typeitRef = ref()

onMounted(() => {
  if (!typeitRef.value)
    return

  new TypeIt(typeitRef.value, {
    strings: props.strings,
    speed: 100, // 打字速度
    lifeLike: true, // 使打字速度不规则
    cursor: true, // 在字符串末尾显示闪烁的光
    cursorSpeed: 1000, // 光标的闪烁速度
    breakLines: true, // 控制是将多个字符串打印在彼此之上 ，还是删除这些字符串并相互替换
    loop: true, // 是否循环
    ...props.options,
  }).go()
})
</script>

<template>
  <span ref="typeitRef" class="typeit" />
</template>

<style scoped lang="less"></style>
