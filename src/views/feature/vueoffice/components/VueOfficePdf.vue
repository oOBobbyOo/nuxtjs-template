<script setup lang="ts">
import VueOfficePdf from '@vue-office/pdf'

import type { UploadRawFile, UploadUserFile } from 'element-plus'
import pdfFile from '@/assets/office/test.pdf?url'

const loading = ref(true)
const src = ref<string | ArrayBuffer>(pdfFile)

const options = reactive({
  width: 800,
})

const fileList = ref<UploadUserFile[]>([])

function beforeUpload(file: UploadRawFile) {
  const reader = new FileReader()
  reader.readAsArrayBuffer(file)
  reader.onload = (loadEvent) => {
    const arrayBuffer = loadEvent.target?.result
    if (arrayBuffer)
      src.value = arrayBuffer
  }
  return false
}

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
  <div v-loading="loading" class="h-full space-y-4">
    <el-upload :limit="1" :file-list="fileList" accept=".pdf" :before-upload="beforeUpload" action="">
      <el-button plain>
        上传本地文件
      </el-button>
    </el-upload>

    <VueOfficePdf class="h-full" :src="src" :options="options" @rendered="renderedHandler" @error="errorHandler" />
  </div>
</template>

<style scoped lang="less"></style>
