<script setup lang="ts">
// @see https://element-plus.org/zh-CN/component/carousel.html
defineOptions({ name: 'Carousel' })

withDefaults(defineProps<CarouselProps>(), {
  trigger: 'hover',
  autoplay: true,
  interval: 3000,
  arrow: 'hover',
  loop: true,
  direction: 'horizontal',
})

const emit = defineEmits(['change'])

interface CarouselProps {
  list?: any[]
  height?: string
  trigger?: 'click' | 'hover'
  autoplay?: boolean
  interval?: number
  arrow?: 'always' | 'hover' | 'never'
  type?: '' | 'card'
  loop?: boolean
  direction?: 'horizontal' | 'vertical'
}

const attrs = useAttrs()

function handleChange(index: number) {
  emit('change', index)
}
</script>

<template>
  <el-carousel
    :height="height"
    :trigger="trigger"
    :autoplay="autoplay"
    :interval="interval"
    :arrow="arrow"
    :type="type"
    :loop="loop"
    :direction="direction"
    v-bind="attrs"
    @change="handleChange"
  >
    <el-carousel-item v-for="item in list" :key="item.id">
      <slot name="carousel" v-bind="item" />
    </el-carousel-item>
  </el-carousel>
</template>

<style scoped></style>
