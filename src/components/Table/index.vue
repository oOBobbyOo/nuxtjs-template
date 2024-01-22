<script setup lang="ts">
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'

defineOptions({ name: 'ETable' })

const props = withDefaults(defineProps<TableProps>(), {
  loading: false,
  rowKey: 'id',
  border: true,
})

interface RenderScope<T> {
  row: T
  $index: number
  column: TableColumnCtx<T>
  [key: string]: any
}

interface ColumnProps<T = any> extends Partial<TableColumnCtx<T>> {
  type?: 'selection' | 'index' | 'expand' | 'tag' | 'operation'
  tagType?: 'success' | 'info' | 'warning' | 'danger'
  hidden?: boolean // 是否隐藏列
  render?: (scope: RenderScope<T>) => VNode | string // 自定义单元格内容渲染（tsx语法）
}

interface TableProps {
  loading?: boolean
  rowKey?: string // 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
  data?: any[] // 表格数据
  columns: ColumnProps[] // 列配置项  ==> 必传
  border?: boolean // 是否带有纵向边框 ==> 非必传（默认为true）
}

const tableColumns = computed(() => props.columns.filter(col => !col.hidden))
</script>

<template>
  <el-table v-loading="loading" :data="data" :border="border" :row-key="rowKey" v-bind="$attrs">
    <!-- 默认插槽 -->
    <!-- <slot /> -->

    <template v-for="column in tableColumns" :key="column.prop">
      <el-table-column
        v-if="column.type"
        v-bind="column"
        :align="column.align || 'center'"
        :reserve-selection="column.type === 'selection'"
      >
        <template #default="scope">
          <!-- tag -->
          <template v-if="column.type === 'tag'">
            <slot :name="column.type" v-bind="scope">
              <el-tag
                v-for="tag in scope.row[column.prop!]"
                :key="tag.name"
                :type="tag.type || column.tagType"
                :color="tag.color"
              >
                {{ tag.name }}
              </el-tag>
            </slot>
          </template>

          <!-- expand -->
          <template v-if="column.type === 'expand'">
            <component :is="column.render" v-if="column.render" v-bind="scope" />
            <slot v-else :name="column.type" v-bind="scope" />
          </template>
        </template>
      </el-table-column>

      <el-table-column
        v-if="!column.type && column.prop && !column.hidden"
        v-bind="column"
        :align="column.align || 'center'"
      >
        <template #default="scope">
          <slot :name="column.prop" v-bind="scope" />
        </template>
      </el-table-column>
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
