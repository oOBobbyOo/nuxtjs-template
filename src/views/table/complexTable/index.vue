<script setup lang="ts">
import type { TableInstance } from 'element-plus/es/components/table'
import type { UserList } from '@/typings/api'
import type { ColumnProps, Scope } from '@/components/Table/index.vue'

import { useTableOperation } from '@/hooks/web/useTableOperation'
import { useTable } from '@/hooks/web/useTable'
import { delTableItem, getComplexTable } from '@/api/table'

// 默认查询参数
const defaultParams = {
  name: 'test',
  gender: 2,
}

const {
  loading,
  tableData,
  pagination,
  getTableData,
  searchParams,
  handleSearch,
  handleReset,
  handleSizeChange,
  handleCurrentChange,
} = useTable(getComplexTable, {
  defaultParams,
  pageSize: 15,
})

const columns = reactive<ColumnProps<UserList>[]>([
  {
    type: 'selection',
    label: '',
    fixed: true,
  },
  {
    prop: 'name',
    label: '用户名',
    search: {
      el: 'input',
      tooltip: '用户名',
      props: { placeholder: '请输入用户名' },
      defaultValue: defaultParams.name,
    },
  },
  {
    prop: 'gender',
    label: '性别',
    render: scope => (scope.row.gender ? '男' : '女'),
    search: {
      el: 'select',
      props: { placeholder: '请选择性别' },
      defaultValue: defaultParams.gender,
    },
    fieldNames: {
      label: 'genderLabel',
      value: 'genderValue',
    },
    enum: [
      { genderLabel: '男', genderValue: 1 },
      { genderLabel: '女', genderValue: 2 },
    ],
  },
  {
    prop: 'age',
    label: '年龄',
  },
  {
    prop: 'email',
    label: '邮箱',
  },
  {
    prop: 'address',
    label: '地址',
  },
  {
    prop: 'status',
    label: '用户状态',
  },
  {
    prop: 'ctime',
    label: '创建时间',
  },
  {
    prop: 'operation',
    label: '操作',
    fixed: 'right',
    width: 140,
    isSlot: true,
  },
])

// 编辑
async function handleEdit(scope: Scope<any>) {
  console.log('>>: scope', scope)
}

// 删除
async function handleDelete(scope: Scope<any>) {
  console.log('>>: scope', scope)
  const id = scope.row.id
  await useTableOperation(delTableItem, { id }, '删除信息')
  await getTableData()
}

// 批量删除
async function handleBatchDelete(ids: string[]) {
  console.log('>>: ids', ids)
  await useTableOperation(delTableItem, { ids }, '批量删除信息')
  await getTableData()
}

// Table 实例
const tableInstance = ref<TableInstance>()
</script>

<template>
  <Table
    ref="tableInstance"
    :loading="loading"
    :data="tableData"
    :columns="columns"
    :is-show-search="true"
    :pagination="pagination"
    :size-change="handleSizeChange"
    :current-change="handleCurrentChange"
    :search-params="searchParams"
    @search="handleSearch"
    @reset="handleReset"
  >
    <!-- 表格 header 按钮 -->
    <template #header="scope">
      <el-button type="primary" @click="tableInstance?.toggleAllSelection">
        全选 / 全不选
      </el-button>
      <el-button
        type="danger"
        plain
        :disabled="!scope.isSelected"
        @click="handleBatchDelete(scope.selectedListIds)"
      >
        批量删除用户
      </el-button>
    </template>

    <!-- 自定义 slot -->
    <template #progress="scope">
      <el-progress :percentage="scope.row.progress" />
    </template>

    <!-- 表格操作 -->
    <template #operation="scope">
      <el-button type="primary" size="small" @click="handleEdit(scope)">
        编辑
      </el-button>
      <el-button type="danger" size="small" @click="handleDelete(scope)">
        删除
      </el-button>
    </template>
  </Table>
</template>

<style scoped></style>
