<script setup lang="ts">
import ListView from './ListView.vue'

const Notification = [
  {
    title: '账户密码',
    description: '其他用户的消息将以站内信的形式通知',
    actions: [],
  },
  {
    title: '系统消息',
    description: '系统消息将以站内信的形式通知',
    actions: [],
  },
  {
    title: '待办任务',
    description: '待办任务将以站内信的形式通知',
    actions: [],
  },
]
</script>

<template>
  <ListView :list="Notification" />
</template>

<style scoped></style>
