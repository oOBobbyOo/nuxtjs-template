<script setup lang="ts"></script>

<template>
  <Card title="拖拽指令" class="h-full">
    <div class="draggable-box relative h-full">
      <div v-draggable class="draggable">
        我可以拖拽哦~
      </div>
    </div>
  </Card>
</template>

<style scoped lang="less">
.draggable {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  font-size: 20px;
  font-weight: bold;
  color: var(--el-color-primary-light-3);
  background: var(--el-color-primary-light-9);
  border-radius: 50%;
  user-select: none;
}
</style>
