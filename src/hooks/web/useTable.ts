import { usePagination } from './usePagination'

interface Options<T> {
  formatResult?: (data: T[]) => any
  onSuccess?: () => void
  onError?: (error: any) => void
  pageiable?: boolean
  pageSize?: number
  immediate?: boolean
  rowKey?: keyof T
}

export interface PageParams { pageNum: number; pageSize: number }

// 表格分页数据格式
interface TableRes<T> {
  list: T
  total: number
}

type Api<T> = (params: any) => Promise<TableRes<T[]>>

export function useTable<T = any[]>(api?: Api<T>, options?: Options<T>) {
  const {
    formatResult,
    onSuccess,
    onError,
    pageiable = true,
    pageSize = 10,
    immediate,
  } = options || {}

  const loading = ref(true)
  const dataSource = ref<T[]>([])

  const { pagination, setPageSize, setCurrentPage, setTotal } = usePagination({
    pageiable,
    pageSize,
  })

  // 查询请求参数
  const searchParams = {}

  // 分页请求参数
  const pageParams: Ref<PageParams> = computed(() => {
    return {
      pageNum: pagination.currentPage,
      pageSize: pagination.pageSize,
    }
  })

  const getTableData = async () => {
    if (!api)
      return
    try {
      loading.value = true
      const res = await api({ ...searchParams, ...pageParams.value })
      dataSource.value = formatResult ? formatResult(res?.list) : res?.list
      setTotal(res?.total)
      onSuccess && onSuccess()
    }
    catch (error) {
      onError && onError(error)
    }
    finally {
      loading.value = false
    }
  }

  // 处理表格数据
  const tableData = computed(() => {
    if (!pagination.pageiable)
      return dataSource.value
    return dataSource.value.slice(
      (pagination.currentPage - 1) * pagination.pageSize,
      pagination.currentPage * pagination.pageSize,
    )
  })

  onMounted(() => {
    // 是否立即触发
    const isImmediate = immediate ?? true
    isImmediate && getTableData()
  })

  // 更新请求参数
  const updateParams = () => {}

  // 搜索
  const handleSearch = () => {
    setCurrentPage(1)
    // 更新请求参数
    updateParams()
    getTableData()
  }

  // 重置
  const handleReset = () => {
    setCurrentPage(1)
    setPageSize(pageSize)
    // 重置请求参数
    updateParams()
    getTableData()
  }

  // 每页条数改变
  const handleSizeChange = async (val: number) => {
    setCurrentPage(1)
    setPageSize(val)
    getTableData()
  }

  // 当前页改变
  const handleCurrentChange = async (val: number) => {
    setCurrentPage(val)
    getTableData()
  }

  return {
    loading,
    tableData,
    pagination,
    pageParams,
    getTableData,
    handleSizeChange,
    handleCurrentChange,
    handleSearch,
    handleReset,
  }
}
