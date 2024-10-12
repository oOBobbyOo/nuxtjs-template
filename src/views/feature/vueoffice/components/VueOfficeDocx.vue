<script setup lang="ts">
import VueOfficeDocx from '@vue-office/docx'
import '@vue-office/docx/lib/index.css'

import docxFile from '@/assets/office/test.docx?url'

const loading = ref(true)
const src = ref(docxFile)

function renderedHandler() {
  loading.value = false
  console.log('渲染完成')
}

function errorHandler() {
  loading.value = false
  console.log('渲染失败')
}
</script>

<template>
  <VueOfficeDocx v-loading="loading" class="h-full" :src="src" @rendered="renderedHandler" @error="errorHandler" />
</template>

<style scoped lang="less"></style>
