<script setup lang="ts">
import { RoleEnum } from '@/enums/roleEnum'
import { useLogin } from '@/hooks/web/useLogin'

const { toogleAccount } = useLogin()
</script>

<template>
  <div class="mt-8">
    <el-divider>其他账号登录</el-divider>
    <div class="w-full flex-center">
      <el-button type="primary" size="default" @click="toogleAccount(RoleEnum.SUPER)">
        超级管理员
      </el-button>
      <el-button type="primary" size="default" @click="toogleAccount(RoleEnum.ADMIN)">
        管理员
      </el-button>
      <el-button type="primary" size="default" @click="toogleAccount(RoleEnum.USER)">
        普通用户
      </el-button>
    </div>
  </div>
</template>

<style scoped></style>
