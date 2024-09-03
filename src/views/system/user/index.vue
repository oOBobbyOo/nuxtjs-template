<script setup lang="tsx">
import type { ColumnProps, Scope } from '@/typings/table'
import type { UserList } from '@/typings/api'

import { useTable } from '@/hooks/web/useTable'
import { useTableOperation } from '@/hooks/web/useTableOperation'
import { type DownloadColumn, useDownload } from '@/hooks/web/useDownload'

import { deleteUser, getUserList } from '@/api/user'

const { loading, tableData, pagination, getTableData, handleSizeChange, handleCurrentChange }
  = useTable(getUserList, {
    pageSize: 15,
  })

// 自定义渲染状态（使用tsx语法）
function statusRender(scope: Scope<UserList>) {
  const type = scope.row.status ? 'success' : 'danger'
  const text = scope.row.status ? '启用' : '禁用'
  return <el-tag type={type}>{text}</el-tag>
}

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
    excel: true,
  },
  {
    prop: 'gender',
    label: '性别',
    render: scope => (scope.row.gender === 1 ? '男' : '女'),
    excel: true,
  },
  {
    prop: 'phone',
    label: '手机号',
    excel: true,
  },
  {
    prop: 'email',
    label: '邮箱',
    excel: true,
  },
  {
    prop: 'status',
    label: '用户状态',
    render: statusRender,
    excel: true,
  },
  {
    prop: 'operation',
    label: '操作',
    fixed: 'right',
    width: 140,
    isSlot: true,
  },
])

async function handleEdit(row: UserList) {
  console.log('>>: row', row)
  await getTableData()
}

async function handleDelete(row: UserList) {
  await useTableOperation(deleteUser, { id: row.id }, '删除信息')
  await getTableData()
}

async function handleDownload(columns: DownloadColumn[]) {
  useDownload({ api: getUserList, params: {}, columns })
}
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
    @download="handleDownload"
  >
    <!-- 表格操作 -->
    <template #operation="{ row }">
      <el-button type="primary" size="small" @click="handleEdit(row)">
        编辑
      </el-button>
      <el-button type="danger" size="small" @click="handleDelete(row)">
        删除
      </el-button>
    </template>
  </Table>
</template>

<style scoped></style>
