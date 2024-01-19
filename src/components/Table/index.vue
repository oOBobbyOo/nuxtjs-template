<script setup lang="ts">
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'

defineOptions({ name: 'ETable' })

withDefaults(defineProps<TableProps>(), {
  loading: false,
  rowKey: 'id',
  border: true,
})

interface ColumnProps<T = any> extends Partial<TableColumnCtx<T>> {}

interface TableProps {
  loading?: boolean
  rowKey?: string // 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
  data?: any[] // 表格数据
  columns: ColumnProps[] // 列配置项  ==> 必传
  border?: boolean // 是否带有纵向边框 ==> 非必传（默认为true）
}
</script>

<template>
  <el-table v-loading="loading" :data="data" :border="border" :row-key="rowKey" v-bind="$attrs">
    <!-- 默认插槽 -->
    <slot />

    <template v-for="column in columns" :key="column.prop">
      <el-table-column v-bind="column" />
    </template>

    <!-- 插入至表格最后一行之后的内容 -->
    <template #append>
      <slot name="append" />
    </template>

    <!-- 无数据 -->
    <template #empty>
      <slot name="empty">
        <Empty description="暂无数据" />
      </slot>
    </template>
  </el-table>
</template>

<style scoped></style>
