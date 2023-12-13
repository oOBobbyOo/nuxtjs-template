<script setup lang="ts">
import ListView from './ListView.vue'
import ModifyBind from './ModifyBind.vue'

const Binding = [
  {
    title: '账户密码',
    description: '当前密码强度：',
    actions: [
      {
        key: 'ModifyPwd',
        component: ModifyBind,
      },
    ],
  },
  {
    title: '密保手机',
    description: '已绑定手机: 138****8293',
    actions: [
      {
        key: 'ModifyPhone',
        component: ModifyBind,
      },
    ],
  },
  {
    title: '密保问题',
    description: '未设置密保问题，密保问题可有效保护账户安全',
    actions: [
      {
        key: 'ModifyQus',
        component: ModifyBind,
      },
    ],
  },
  {
    title: '备用邮箱',
    description: '已绑定邮箱: test**gamil.com',
    actions: [
      {
        key: 'ModifyQus',
        component: ModifyBind,
      },
    ],
  },
  {
    title: 'MFA 设备',
    description: '未绑定 MFA 设备，绑定后，可以进行二次确认',
    actions: [
      {
        key: 'ModifyMfa',
        component: ModifyBind,
      },
    ],
  },
]
</script>

<template>
  <ListView :list="Binding" />
</template>

<style scoped></style>
