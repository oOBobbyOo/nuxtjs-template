<script setup lang="ts">
import { usePermissionStore } from '@/stores/modules/permission'
import { usePermission } from '@/hooks/web/usePermission'
import { RoleEnum } from '@/enums/roleEnum'
import { useLogin } from '@/hooks/web/useLogin'

const permissionStore = usePermissionStore()

const roleList = computed(() => permissionStore.getRoleList)

const { hasPermission } = usePermission()

const { toogleAccount } = useLogin()
</script>

<template>
  <PageWrap class="space-y-4">
    <h1>当前角色权限： {{ roleList }}</h1>
    <div>
      <el-button @click="toogleAccount(RoleEnum.SUPER)">
        超级管理员
      </el-button>
      <el-button @click="toogleAccount(RoleEnum.ADMIN)">
        管理员
      </el-button>
      <el-button @click="toogleAccount(RoleEnum.USER)">
        普通用户
      </el-button>
    </div>

    <h1> v-permission 指令用法</h1>
    <div>
      <el-button v-permission="'super'">
        super 可见
      </el-button>
      <el-button v-permission="['admin']">
        admin 可见
      </el-button>
      <el-button v-permission="['user']">
        user 可见
      </el-button>
    </div>

    <h1>usePermission 函数用法</h1>
    <div>
      <el-button v-if="hasPermission('super')">
        super 可见
      </el-button>
      <el-button v-if="hasPermission('admin')">
        admin 可见
      </el-button>
      <el-button v-if="hasPermission(['admin', 'user'])">
        admin 和 user 可见
      </el-button>
      <el-button v-if="hasPermission(['user'])">
        user 可见
      </el-button>
    </div>
  </PageWrap>
</template>

<style scoped></style>
