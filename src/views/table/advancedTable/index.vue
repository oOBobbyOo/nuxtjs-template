<script setup lang="ts">
import { getTableList } from '@/api/table'
import type { ColumnProps, Scope } from '@/components/Table/index.vue'
import { useTable } from '@/hooks/web/useTable'

const { loading, tableData, pagination, handleSizeChange, handleCurrentChange } = useTable(
  getTableList,
  {
    pageSize: 5,
  },
)

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
  },
  {
    type: 'image',
    prop: 'image',
    label: '图片',
  },
  {
    prop: 'state',
    label: '状态',
  },
  {
    prop: 'progress',
    label: '执行进度',
    isSlot: true,
  },
  {
    type: 'tag',
    prop: 'labels',
    label: '标签',
  },
  {
    prop: 'created_at',
    label: '创建时间',
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
}
</script>

<template>
  <PageWrap>
    <Table
      :loading="loading"
      :data="tableData"
      :columns="columns"
      :pagination="pagination"
      :size-change="handleSizeChange"
      :current-change="handleCurrentChange"
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
  </PageWrap>
</template>

<style scoped></style>
