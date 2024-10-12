<script setup lang="ts">
import VueOfficePdf from '@vue-office/pdf'

import excelFile from '@/assets/office/test.pdf?url'

const loading = ref(true)
const src = ref(excelFile)

const options = reactive({
  width: 900,
})

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
  <VueOfficePdf
    v-loading="loading" class="h-full" :src="src" :options="options"
    @rendered="renderedHandler" @error="errorHandler"
  />
</template>

<style scoped lang="less"></style>
