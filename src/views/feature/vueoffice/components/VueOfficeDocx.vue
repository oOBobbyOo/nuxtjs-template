<script setup lang="ts">
import VueOfficeDocx from '@vue-office/docx'
import '@vue-office/docx/lib/index.css'

import type { UploadRawFile, UploadUserFile } from 'element-plus'
import docxFile from '@/assets/office/test.docx?url'

const loading = ref(true)
const src = ref<string | ArrayBuffer>(docxFile)

const options = reactive({
  inWrapper: true, // enables rendering of wrapper around document content
  ignoreWidth: false, // disables rendering width of page
  ignoreHeight: false, // disables rendering height of page
  ignoreFonts: false, // disables fonts rendering
  breakPages: true, // enables page breaking on page breaks
  ignoreLastRenderedPageBreak: true, // disables page breaking on lastRenderedPageBreak elements
  experimental: false, // enables experimental features (tab stops calculation)
  trimXmlDeclaration: true, // if true, xml declaration will be removed from xml documents before parsing
  useBase64URL: false, // if true, images, fonts, etc. will be converted to base 64 URL, otherwise URL.createObjectURL is used
  useMathMLPolyfill: false, // includes MathML polyfills for chrome, edge, etc.
  showChanges: false, // enables experimental rendering of document changes (inserions/deletions)
  debug: false, // enables additional logging
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
    <el-upload :limit="1" :file-list="fileList" accept=".docx" :before-upload="beforeUpload" action="">
      <el-button plain>
        上传本地文件
      </el-button>
    </el-upload>

    <VueOfficeDocx class="h-full" :src="src" :options="options" @rendered="renderedHandler" @error="errorHandler" />
  </div>
</template>

<style scoped lang="less"></style>
