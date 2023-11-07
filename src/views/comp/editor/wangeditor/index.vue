<script setup lang="ts">
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 模式，默认为 default（"default" | "simple"）
const mode = ref('default')

// 内容 HTML
const valueHtml = ref('<p>hello</p>')

// 工具栏配置 https://www.wangeditor.com/v5/toolbar-config.html
const toolbarConfig: Partial<IToolbarConfig> = {}

// 编辑器配置 https://www.wangeditor.com/v5/editor-config.html
const editorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入内容...',
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null)
    return
  editor.destroy()
})

function handleCreated(editor: IDomEditor) {
  editorRef.value = editor // 记录 editor 实例，重要！
}
</script>

<template>
  <Card title="wangEditor">
    <div class="wang-editor">
      <Toolbar
        class="wg-toolbar"
        :editor="editorRef"
        :default-config="toolbarConfig"
        :mode="mode"
      />
      <Editor
        v-model="valueHtml"
        class="wg-container"
        :default-config="editorConfig"
        :mode="mode"
        @on-created="handleCreated"
      />
    </div>
    <div mt-5 break-words>
      <h1>预览输入内容：</h1>
      <div>{{ valueHtml }}</div>
    </div>
  </Card>
</template>

<style lang="less">
@import url('@wangeditor/editor/dist/css/style.css');
@import url('./index.less');
</style>
