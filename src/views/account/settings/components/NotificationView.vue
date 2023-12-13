<script setup lang="ts">
import ListView from './ListView.vue'
import NotifySwitch from './NotifySwitch.vue'

const Notification = [
  {
    title: '账户密码',
    description: '其他用户的消息将以站内信的形式通知',
    actions: [
      {
        key: 'NotifyAccount',
        component: NotifySwitch,
      },
    ],
  },
  {
    title: '系统消息',
    description: '系统消息将以站内信的形式通知',
    actions: [
      {
        key: 'NotifySys',
        component: NotifySwitch,
      },
    ],
  },
  {
    title: '待办任务',
    description: '待办任务将以站内信的形式通知',
    actions: [
      {
        key: 'NotifyTask',
        component: NotifySwitch,
      },
    ],
  },
]
</script>

<template>
  <ListView :list="Notification" />
</template>

<style scoped></style>
