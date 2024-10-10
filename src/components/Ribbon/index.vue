<script setup lang="ts">
defineOptions({ name: 'Ribbon' })

withDefaults(defineProps<Props>(), {
  color: '#1677ff',
})

defineSlots()

interface Props {
  color: string
}
</script>

<template>
  <div class="ribbon">
    <div class="ribbon-text">
      <slot />
    </div>
    <div class="ribbon-corner" />
  </div>
</template>

<style scoped lang="less">
.ribbon {
  padding: 4px 8px;
  color: v-bind(color);
  font-size: 14px;
  line-height: 22px;
  position: absolute;
  top: 8px;
  white-space: nowrap;
  background-color: v-bind(color);
  box-sizing: border-box;
  border-radius: 4px;
  inset-inline-end: -8px;
  border-end-end-radius: 0;

  &-text {
    color: #fff;
  }

  &-corner {
    position: absolute;
    top: 100%;
    width: 8px;
    height: 8px;
    color: currentcolor;
    border: 4px solid;
    transform: scaleY(0.75);
    transform-origin: top;
    filter: brightness(75%);
    inset-inline-end: 0;
    border-inline-end-color: transparent;
    border-block-end-color: transparent;
  }
}
</style>
