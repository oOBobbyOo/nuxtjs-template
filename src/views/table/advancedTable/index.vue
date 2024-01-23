<script setup lang="ts">
import { getTableList } from '@/api/table'
import { useTable } from '@/hooks/web/useTable'

const { loading, tableData, pagination, handleSizeChange, handleCurrentChange }
  = useTable(getTableList, {
    pageSize: 15,
  })

// watchEffect(() => {
//   console.log(loading.value)
//   console.log(tableData.value)
//   console.log(pagination)
// })

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

async function handleEdit(scope: any) {
  console.log('>>: scope', scope)
}

async function handleDelete(scope: any) {
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
