<script setup lang="ts">
const copyText = ref('')

const { copy } = useClipboard({ source: copyText })

function handleCopy() {
  copy(copyText.value)

  ElMessage({
    message: '已成功复制到剪贴板!',
    type: 'success',
  })
}
</script>

<template>
  <Card title="剪贴板复制">
    <div flex-center space-x-4>
      <el-input v-model="copyText" placeholder="请输入复制内容" clearable />
      <el-button type="primary" @click="handleCopy">
        复制到剪贴板
      </el-button>
    </div>
  </Card>
</template>

<style scoped></style>
