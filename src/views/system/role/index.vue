<script setup lang="ts">
import type { ColumnProps } from '@/typings/table'
import type { UserList } from '@/typings/api'

import { useTable } from '@/hooks/web/useTable'
import { getRoleList } from '@/api/role'

const { loading, tableData, pagination, getTableData, handleSizeChange, handleCurrentChange }
  = useTable(getRoleList, {
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
    prop: 'name',
    label: '角色名',
  },
  {
    prop: 'code',
    label: '编码',
  },
  {
    prop: 'desc',
    label: '描述',
  },
  {
    prop: 'status',
    label: '角色状态',
  },
])
</script>

<template>
  <Table
    title="角色列表" :loading="loading" :data="tableData" :columns="columns" :pagination="pagination"
    :size-change="handleSizeChange" :current-change="handleCurrentChange" @refresh="getTableData"
  />
</template>

<style scoped></style>
