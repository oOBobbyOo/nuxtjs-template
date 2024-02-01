<script setup lang="ts">
import type { ColumnProps } from './index.vue'
import TableSearchItem from './TableSearchItem.vue'

defineOptions({ name: 'TableSearch' })

withDefaults(defineProps<TableSearchProps>(), {
  searchColumns: () => [],
  searchParams: () => ({}),
})

export type SearchType =
  | 'input'
  | 'input-number'
  | 'select'
  | 'select-v2'
  | 'tree-select'
  | 'cascader'
  | 'date-picker'
  | 'time-picker'
  | 'time-select'
  | 'switch'
  | 'slider'

export interface EnumProps {
  label?: string // 选项框显示的文字
  value?: string | number | boolean | any[] // 选项框值
  disabled?: boolean // 是否禁用此选项
  tagType?: string // 当 tag 为 true 时，此选择会指定 tag 显示类型
  children?: EnumProps[] // 为树形选择时，可以通过 children 属性指定子选项
  [key: string]: any
}

export interface SearchRenderScope {
  searchParam: { [key: string]: any }
  placeholder: string
  clearable: boolean
  options: EnumProps[]
  data: EnumProps[]
}

export interface SearchProps {
  el?: SearchType //  当前项搜索框的类型
  label?: string // 当前项搜索框的 label
  key?: string // 当搜索项 key 不为 prop 属性时，可通过 key 指定
  props?: any // 搜索项参数，根据 element plus 官方文档来传递，该属性所有值会透传到组件
  tooltip?: string // 搜索提示
  order?: number // 搜索项排序（从大到小）
  defaultValue?: string | number | boolean | any[] | Ref<any> // 搜索项默认值
  render?: (scope: SearchRenderScope) => VNode // 自定义搜索内容渲染（tsx语法）
}

interface TableSearchProps {
  searchColumns?: ColumnProps[]
  searchParams?: { [key: string]: any } // 搜索参数
  search: (params: any) => void // 搜索方法
  reset: (params: any) => void // 重置方法
}
</script>

<template>
  <el-form :model="searchParams">
    <el-form-item v-for="item in searchColumns" :key="item.prop">
      <template #label>
        <el-space :size="4">
          <span>{{ `${item.search?.label ?? item.label}` }}</span>
          <el-tooltip v-if="item.search?.tooltip" :content="item.search?.tooltip" placement="top">
            <Icon icon="material-symbols:help-outline" size="18" />
          </el-tooltip>
          <span>:</span>
        </el-space>
      </template>
      <TableSearchItem :column="item" :search-params="searchParams" />
    </el-form-item>

    <div>
      <el-button type="primary" @click="search">
        搜索
      </el-button>
      <el-button @click="reset">
        重置
      </el-button>
    </div>
  </el-form>
</template>

<style scoped></style>
