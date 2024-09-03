<script setup lang="tsx">
import type { ColumnProps, Scope } from '@/typings/table'
import type { RoleList } from '@/typings/api'

import { useTable } from '@/hooks/web/useTable'
import { useTableOperation } from '@/hooks/web/useTableOperation'
import { type DownloadColumn, useDownload } from '@/hooks/web/useDownload'

import { deleteRole, getRoleList } from '@/api/role'

const { loading, tableData, pagination, getTableData, handleSizeChange, handleCurrentChange }
  = useTable(getRoleList, {
    pageSize: 15,
  })

const columns = reactive<ColumnProps<RoleList>[]>([
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
    render: (scope: Scope<RoleList>) => {
      const type = scope.row.status ? 'success' : 'danger'
      const text = scope.row.status ? '启用' : '禁用'
      return <el-tag type={type}> {text} </el-tag>
    },
  },
  {
    prop: 'operation',
    label: '操作',
    fixed: 'right',
    width: 140,
    isSlot: true,
  },
])

async function handleEdit(row: RoleList) {
  console.log('>>: row', row)
  await getTableData()
}

async function handleDelete(row: RoleList) {
  await useTableOperation(deleteRole, { id: row.id }, '删除信息')
  await getTableData()
}

async function handleDownload(columns: DownloadColumn[]) {
  useDownload({ api: getRoleList, params: {}, columns })
}
</script>

<template>
  <Table
    title="角色列表"
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
