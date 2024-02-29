<script setup lang="ts">
import type { ColumnProps, Scope } from '@/typings/table'
import type { DownloadColumn } from '@/hooks/web/useDownload'

import { useTable } from '@/hooks/web/useTable'
import { useTableOperation } from '@/hooks/web/useTableOperation'
import { useDownload } from '@/hooks/web/useDownload'

import { delTableItem, getAdvancedTable } from '@/api/table'

const {
  loading,
  tableData,
  pagination,
  getTableData,
  searchParams,
  handleSizeChange,
  handleCurrentChange,
} = useTable(getAdvancedTable, {
  pageSize: 5,
})

const columns: ColumnProps[] = [
  {
    type: 'selection',
    label: '',
  },
  {
    type: 'index',
    label: '#',
  },
  {
    prop: 'title',
    label: '标题',
    excel: true,
  },
  {
    type: 'image',
    prop: 'image',
    label: '图片',
    minWidth: 140,
    excel: true,
  },
  {
    prop: 'state',
    label: '状态',
    formatter: (row): string => {
      const stateMap = {
        close: '关闭',
        running: '进行中',
        online: '已上线',
        error: '异常',
      }
      const key = row.state as keyof typeof stateMap
      return stateMap[key]
    },
    excel: (record: any): string => {
      const stateMap = {
        close: '关闭',
        running: '进行中',
        online: '已上线',
        error: '异常',
      }
      const key = record.state as keyof typeof stateMap
      return stateMap[key]
    },
  },
  {
    prop: 'progress',
    label: '执行进度',
    isSlot: true,
    minWidth: 160,
    excel: true,
  },
  {
    type: 'tag',
    prop: 'labels',
    label: '标签',
    minWidth: 100,
    excel: true,
  },
  {
    prop: 'created_at',
    label: '创建时间',
    minWidth: 120,
    excel: true,
  },
  {
    prop: 'updated_at',
    label: '更新时间',
    minWidth: 120,
    excel: true,
  },
  {
    prop: 'closed_at',
    label: '关闭时间',
    minWidth: 120,
    isHidden: true,
  },
  {
    prop: 'operation',
    label: '操作',
    fixed: 'right',
    width: 140,
    isSlot: true,
  },
]

async function handleEdit(scope: Scope<any>) {
  console.log('>>: scope', scope)
}

async function handleDelete(scope: Scope<any>) {
  console.log('>>: scope', scope)
  const id = scope.row.id
  await useTableOperation(delTableItem, { id }, '删除信息')
  await getTableData()
}

async function handleDownload(columns: DownloadColumn[]) {
  useDownload({ api: getAdvancedTable, params: searchParams, columns })
}
</script>

<template>
  <Table
    title="高级表格"
    :loading="loading"
    :data="tableData"
    :columns="columns"
    :pagination="pagination"
    :size-change="handleSizeChange"
    :current-change="handleCurrentChange"
    @refresh="getTableData"
    @download="handleDownload"
  >
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
