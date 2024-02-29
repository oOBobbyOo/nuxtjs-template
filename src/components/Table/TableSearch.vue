<script setup lang="ts">
import TableSearchItem from './TableSearchItem.vue'
import type { ColumnProps } from '@/typings/table'
import type { BreakPoint } from '@/typings/grid'

defineOptions({ name: 'TableSearch' })

// 默认值
const props = withDefaults(defineProps<TableSearchProps>(), {
  searchColumns: () => [],
  searchParams: () => ({}),
})

interface TableSearchProps {
  searchColumns?: ColumnProps[] // 搜索配置列
  searchParams?: { [key: string]: any } // 搜索参数
  searchCol: number | Record<BreakPoint, number>
  search: (params: any) => void // 搜索方法
  reset: (params: any) => void // 重置方法
}

// 获取响应式设置
function getResponsive(item: ColumnProps) {
  return {
    span: item.search?.span,
    offset: item.search?.offset ?? 0,
    xs: item.search?.xs,
    sm: item.search?.sm,
    md: item.search?.md,
    lg: item.search?.lg,
    xl: item.search?.xl,
  }
}

// 是否默认折叠搜索项
const collapsed = ref(true)

// 获取响应式断点
const gridRef = ref()
const breakPoint = computed<BreakPoint>(() => gridRef.value?.breakPoint)

// 表单域标签的位置
const labelPosition = computed(() => breakPoint.value === 'xs' ? 'top' : 'right')

// 判断是否显示 展开/合并 按钮
const showCollapse = computed(() => {
  let show = false
  props.searchColumns.reduce((prev, current) => {
    prev
      += (current.search![breakPoint.value]?.span ?? current.search?.span ?? 1)
      + (current.search![breakPoint.value]?.offset ?? current.search?.offset ?? 0)
    if (typeof props.searchCol !== 'number') {
      if (prev >= props.searchCol[breakPoint.value])
        show = true
    }
    else {
      if (prev >= props.searchCol)
        show = true
    }
    return prev
  }, 0)
  return show
})
</script>

<template>
  <el-form :model="searchParams" :label-position="labelPosition">
    <Grid ref="gridRef" :collapsed="collapsed" :gap="[20, 0]" :cols="searchCol">
      <GridItem
        v-for="(item, index) in searchColumns"
        :key="item.prop"
        v-bind="getResponsive(item)"
        :index="index"
      >
        <el-form-item>
          <template #label>
            <el-space :size="4">
              <span>{{ `${item.search?.label ?? item.label}` }}</span>
              <el-tooltip
                v-if="item.search?.tooltip"
                :content="item.search?.tooltip"
                placement="top"
              >
                <Icon icon="material-symbols:help-outline" size="18" />
              </el-tooltip>
              <span>:</span>
            </el-space>
          </template>
          <TableSearchItem :column="item" :search-params="searchParams" />
        </el-form-item>
      </GridItem>

      <GridItem suffix>
        <div class="operation flex items-center justify-end">
          <el-button type="primary" @click="search">
            <Icon icon="mingcute:search-3-line" size="18" mr-1 />
            搜索
          </el-button>
          <el-button @click="reset">
            <Icon icon="material-symbols:delete-forever" size="18" mr-1 />
            重置
          </el-button>
          <el-button
            v-if="showCollapse"
            class="search-isOpen"
            link
            @click="collapsed = !collapsed"
          >
            {{ collapsed ? '展开' : '收起' }}
            <Icon
              :icon="collapsed ? 'ant-design:down-outlined' : 'ant-design:up-outlined'"
              size="18"
            />
          </el-button>
        </div>
      </GridItem>
    </Grid>
  </el-form>
</template>
