<script setup lang="ts">
import type { UserList } from '@/typings/api'
import type { ColumnProps, Scope } from '@/components/Table/index.vue'
import { useOperationTable } from '@/hooks/web/useOperationTable'
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

async function handleEdit(scope: Scope<any>) {
  console.log('>>: scope', scope)
}

async function handleDelete(scope: Scope<any>) {
  console.log('>>: scope', scope)
  const id = scope.row.id
  await useOperationTable(delTableItem, { id }, '删除信息')
  await getTableData()
}
</script>

<template>
  <Table
    title="复杂表格"
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
