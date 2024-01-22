<script setup lang="ts">
import { getTableData } from '@/api/table'
import { useRequest } from '@/hooks/web/useRequest'

const { loading, data } = useRequest(getTableData)

const columns = [
  {
    type: 'selection',
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
    prop: 'state',
    label: '状态',
  },
  {
    prop: 'progress',
    label: '执行进度',
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
  },
]

const anvancedTable = computed(() => {
  return unref(data)?.anvancedTable
})

async function handleEdit(scope) {
  console.log('>>: scope', scope)
}

async function handleDelete(scope) {
  console.log('>>: scope', scope)
}
</script>

<template>
  <Card title="高级表格">
    <Table :loading="loading" :data="anvancedTable" :columns="columns">
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
  </Card>
</template>

<style scoped></style>
