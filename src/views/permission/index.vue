<script setup lang="ts">
import { usePermissionStore } from '@/stores/modules/permission'
import { usePermission } from '@/hooks/web/usePermission'
import { RoleEnum } from '@/enums/roleEnum'

const permissionStore = usePermissionStore()

const roleList = computed(() => permissionStore.getRoleList)

const { hasPermission } = usePermission()

function toogleAccount(role: string) {
  console.log('[ role ] >>:', role)
}
</script>

<template>
  <PageWrap class="space-y-4">
    <h1>当前角色权限： {{ roleList }}</h1>
    <el-space>
      <el-button @click="toogleAccount(RoleEnum.SUPER)">
        超级管理员
      </el-button>
      <el-button @click="toogleAccount(RoleEnum.ADMIN)">
        管理员
      </el-button>
      <el-button @click="toogleAccount(RoleEnum.USER)">
        普通用户
      </el-button>
    </el-space>

    <h1> v-permission 指令用法</h1>
    <el-space>
      <el-button v-permission="'super'">
        super 可见
      </el-button>
      <el-button v-permission="['admin']">
        admin 可见
      </el-button>
    </el-space>

    <h1>usePermission 函数用法</h1>
    <el-space>
      <el-button v-if="hasPermission('super')">
        super 可见
      </el-button>
      <el-button v-if="hasPermission('admin')">
        admin 可见
      </el-button>
      <el-button v-if="hasPermission(['admin', 'user'])">
        admin 和 user 可见
      </el-button>
    </el-space>
  </PageWrap>
</template>

<style scoped></style>
