<script setup lang="ts">
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useDialog } from '@/hooks/web/useDialog'

const { t } = useI18n()

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 模式，默认为 default（"default" | "simple"）
const mode = ref('default')

// 内容 HTML
const valueHtml = ref('<p>hello wangEditor editor!</p>')

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

const { visible: dialogVisible, openDialog: handleOpenDialog } = useDialog()

function handleCloseDialog() {
  console.log('>>: clolse callback')
}
</script>

<template>
  <Card title="wangEditor">
    <template #operation>
      <el-button type="primary" @click="handleOpenDialog">
        {{ t('common.preview') }}
      </el-button>
    </template>

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

    <Dialog v-model:visible="dialogVisible" title="预览内容" @close="handleCloseDialog">
      <div break-words>
        {{ valueHtml }}
      </div>
    </Dialog>
  </Card>
</template>

<style lang="less">
@import url('@wangeditor/editor/dist/css/style.css');
@import url('./index.less');
</style>
