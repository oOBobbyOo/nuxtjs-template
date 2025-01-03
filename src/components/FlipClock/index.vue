<script setup lang="ts">
import Flipper from './Flipper.vue'

defineOptions({ name: 'FlipClock' })
</script>

<template>
  <div class="flipclock flex-center">
    <Flipper />
    <Flipper />
    <em>:</em>
    <Flipper />
    <Flipper />
    <em>:</em>
    <Flipper />
    <Flipper />
  </div>
</template>

<style scoped lang="less">
.flipclock {
  .flipper {
    margin: 0 5px;
  }

  em {
    display: inline-block;
    font-size: 66px;
    font-style: normal;
    vertical-align: top;
  }
}
</style>
