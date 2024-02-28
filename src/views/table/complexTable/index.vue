<script setup lang="ts">
import type { TableInstance } from 'element-plus/es/components/table'
import UserDrawer from '../components/UserDrawer/index.vue'
import type { UserList } from '@/typings/api'
import type { ColumnProps, Scope } from '@/components/Table/index.vue'

import { useTableOperation } from '@/hooks/web/useTableOperation'
import { useTable } from '@/hooks/web/useTable'
import { type Column, useDownload } from '@/hooks/web/useDownload'
import { delTableItem, getComplexTable } from '@/api/table'

// 默认查询参数
const defaultParams = {
  username: 'test',
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
    prop: 'username',
    label: '用户名',
    search: {
      el: 'input',
      tooltip: '用户名',
      props: { placeholder: '请输入用户名' },
      defaultValue: defaultParams.username,
    },
  },
  {
    prop: 'gender',
    label: '性别',
    render: scope => (scope.row.gender === 1 ? '男' : '女'),
    excel: (record: UserList) => (record.gender === 1 ? '男' : '女'),
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
    width: 200,
    isSlot: true,
  },
])

// Table 实例
const tableInstance = ref<TableInstance>()

// Drawer 实例 (新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof UserDrawer> | null>(null)

// 新增
async function handleAdd() {
  const params = {
    title: '新增',
    isView: false,
    row: {},
  }
  drawerRef.value?.acceptParams(params)
}

// 查看
async function handleView(scope: Scope<any>) {
  console.log('>>: scope', scope)
  const params = {
    title: '查看',
    isView: true,
    row: { ...scope.row },
  }
  drawerRef.value?.acceptParams(params)
}

// 编辑
async function handleEdit(scope: Scope<any>) {
  console.log('>>: scope', scope)
  const params = {
    title: '编辑',
    isView: false,
    row: { ...scope.row },
  }
  drawerRef.value?.acceptParams(params)
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

async function handleDownload(columns: Column[]) {
  useDownload({ api: getComplexTable, params: searchParams, columns })
}
</script>

<template>
  <div>
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
      @refresh="getTableData"
      @download="handleDownload"
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
          <Icon icon="material-symbols:delete" size="18" mr-1 />
          批量删除用户
        </el-button>

        <el-button type="success" @click="handleAdd">
          <Icon icon="material-symbols:add-circle" size="18" mr-1 />
          新增用户
        </el-button>
      </template>

      <!-- 自定义 slot -->
      <template #progress="scope">
        <el-progress :percentage="scope.row.progress" />
      </template>

      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="success" size="small" @click="handleView(scope)">
          查看
        </el-button>
        <el-button type="primary" size="small" @click="handleEdit(scope)">
          编辑
        </el-button>
        <el-button type="danger" size="small" @click="handleDelete(scope)">
          删除
        </el-button>
      </template>
    </Table>

    <UserDrawer ref="drawerRef" />
  </div>
</template>

<style scoped></style>
