<script setup lang="ts">
const avatar1 = ref('')
const avatar2 = ref('')
const avatar3 = ref('')
const avatar4 = ref('')
const avatar5 = ref('https://i.imgtg.com/2023/01/16/QR57a.jpg')
</script>

<template>
  <div class="space-y-4">
    <Card title="单图片上传组件">
      <div class="flex flex-wrap justify-center gap-20 py-4">
        <UploadImg v-model:image-url="avatar1">
          <template #tip>
            上传图片最大为 3M
          </template>
        </UploadImg>

        <UploadImg v-model:image-url="avatar2" :drag="false" border-radius="50%">
          <template #empty>
            <Icon icon="ep:avatar" />
            <span>请上传头像</span>
          </template>
          <template #tip>
            圆形组件（禁止拖拽上传）
          </template>
        </UploadImg>

        <UploadImg v-model:image-url="avatar3" width="250px">
          <template #empty>
            <Icon icon="ep:picture" />
            <span>请上传 Banner 图</span>
          </template>
          <template #tip>
            长方形组件（可拖拽上传）
          </template>
        </UploadImg>

        <UploadImg v-model:image-url="avatar4" disabled>
          <template #tip>
            无图（禁用上传）
          </template>
        </UploadImg>
        <UploadImg v-model:image-url="avatar5" disabled>
          <template #tip>
            有图（禁用编辑、删除）
          </template>
        </UploadImg>
      </div>
      <el-descriptions title="配置项 📚" :column="1" border>
        <el-descriptions-item label="imageUrl">
          双向绑定的 imageUrl 值，使用示例： v-model:image-url="avatar"
        </el-descriptions-item>
        <el-descriptions-item label="api">
          上传图片的 api 方法，一般项目上传都是同一个 api 方法，在组件里直接引入即可（非必传）
        </el-descriptions-item>
        <el-descriptions-item label="drag">
          是否支持拖拽上传图片，默认为 true
        </el-descriptions-item>
        <el-descriptions-item label="disabled">
          是否禁用 上传、删除 功能，可查看图片
        </el-descriptions-item>
        <el-descriptions-item label="fileSize">
          单个图片文件大小限制，默认为 5M
        </el-descriptions-item>
        <el-descriptions-item label="fileType">
          图片类型限制，默认类型为 ["image/jpeg", "image/png", "image/gif"]
        </el-descriptions-item>
        <el-descriptions-item label="height">
          组件高度样式，默认为 "150px"
        </el-descriptions-item>
        <el-descriptions-item label="width">
          组件宽度样式，默认为 "150px"
        </el-descriptions-item>
        <el-descriptions-item label="borderRadius">
          组件边框圆角样式，默认为 "8px"
        </el-descriptions-item>
      </el-descriptions>
    </Card>
  </div>
</template>

<style scoped></style>
