<script setup lang="ts">
import CornerBg from './corner-bg.vue'
import LiziBg from './lizi-bg.vue'

const themeColor = '#ececec'
</script>

<template>
  <div class="absolute-lt z--1 wh-full">
    <CornerBg />
    <LiziBg :color="themeColor" />
  </div>
</template>

<style scoped></style>
