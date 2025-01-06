<script setup lang="ts">

</script>

<template>
  <PageWrap class="flex-center space-y-4">
    <FlipClock :time="60 * 1000" />
    <FlipClock :time="12 * 60 * 60 * 1000" />
    <FlipClock :time="10 * 24 * 60 * 60 * 1000" />
  </PageWrap>
</template>

<style scoped lang="less"></style>
