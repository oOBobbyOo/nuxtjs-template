<script setup lang="ts">
// https://github.com/hinesboy/mavonEditor
const value = ref('')

function onChange(val: string) {
  console.log('>>: val', val)
}

function onImgAdd(pos: number, file: File) {
  console.log('>>: pos', pos)
  console.log('>>: file', file)
}
</script>

<template>
  <mavon-editor v-model="value" style="height: 450px" @change="onChange" @imgAdd="onImgAdd" />
</template>

<style scoped></style>
