<script setup lang="ts">
import ListView from './ListView.vue'

const Binding = [
  {
    title: '绑定微信',
    description: '当前未绑定微信账号',
    avatar: 'ant-design:wechat-filled',
  },
  {
    title: '绑定淘宝',
    description: '当前未绑定淘宝账号',
    avatar: 'ant-design:taobao-circle-filled',
  },
  {
    title: '绑定支付宝',
    description: '当前未绑定支付宝账号',
    avatar: 'ant-design:alipay-circle-filled',
  },
  {
    title: '绑定钉钉',
    description: '当前未绑定钉钉账号',
    avatar: 'ant-design:dingding-outlined',
  },
  {
    title: '绑定微博',
    description: '当前未绑定微博账号',
    avatar: 'ant-design:weibo-circle-filled',
  },
]
</script>

<template>
  <ListView :list="Binding" />
</template>

<style scoped></style>
