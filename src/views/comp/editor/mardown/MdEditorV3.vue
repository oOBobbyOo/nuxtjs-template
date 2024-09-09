<script setup lang="ts">
// https://github.com/imzbf/md-editor-v3
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { Emoji, ExportPDF, Mark } from '@vavt/v3-extension'
import '@vavt/v3-extension/lib/asset/style.css'
import { toolbars } from './staticConfig'

import { useAppSetting } from '@/hooks/setting/useAppSetting'

const { getDarkMode } = useAppSetting()

const text = ref('Hello Markdown Editor!')

function onChange(val: string) {
  console.log('>>: val', val)
}

function onUploadImg(files: File[]) {
  console.log('>>: files', Array.from(files))
}
</script>

<template>
  <MdEditor
    v-model="text"
    :theme="getDarkMode"
    :toolbars="toolbars"
    show-code-row-number
    auto-detect-code
    @on-change="onChange"
    @on-upload-img="onUploadImg"
  >
    <template #defToolbars>
      <Mark />
      <Emoji />
      <ExportPDF :model-value="text" height="700px" />
    </template>
  </MdEditor>
</template>

<style scoped></style>
