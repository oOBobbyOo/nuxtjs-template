<script setup lang="ts">
import type { ColumnProps } from '@/typings/table'
import type { UserList } from '@/typings/api'

import { useTable } from '@/hooks/web/useTable'
import { getUserList } from '@/api/user'

const { loading, tableData, pagination, getTableData, handleSizeChange, handleCurrentChange }
  = useTable(getUserList, {
    pageSize: 15,
  })

const columns = reactive<ColumnProps<UserList>[]>([
  {
    type: 'selection',
    label: '',
    fixed: true,
  },
  {
    type: 'index',
    label: '序号',
    width: 60,
    fixed: true,
  },
  {
    prop: 'username',
    label: '用户名',
  },
  {
    prop: 'gender',
    label: '性别',
    render: scope => (scope.row.gender === 1 ? '男' : '女'),
  },
  {
    prop: 'phone',
    label: '手机号',
  },
  {
    prop: 'email',
    label: '邮箱',
  },
  {
    prop: 'status',
    label: '用户状态',
    formatter: (row: UserList) => {
      return row.status ? '启用' : '禁用'
    },
  },
])
</script>

<template>
  <Table
    title="用户列表"
    :loading="loading"
    :data="tableData"
    :columns="columns"
    :pagination="pagination"
    :size-change="handleSizeChange"
    :current-change="handleCurrentChange"
    @refresh="getTableData"
  />
</template>

<style scoped></style>
