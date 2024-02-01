interface AnyKeyValue {
  [key: string]: any
}

/**
 * @description 表格多选数据操作
 * @param  {string} rowKey 当表格可以多选时，所指定的 id
 */
export function useTableSelection(rowKey: string = 'id') {
  const isSelected = ref<boolean>(false)
  const selectedList = ref<AnyKeyValue[]>([])

  // 当前选中的所有 ids 数组
  const selectedListIds = computed((): string[] => {
    const ids: string[] = []
    selectedList.value.forEach(item => ids.push(item[rowKey]))
    return ids
  })

  /**
   * @description 多选操作
   * @param {Array} rowArr 当前选择的所有数据
   * @return void
   */
  const selectionChange = (rowArr: AnyKeyValue[]) => {
    rowArr.length ? (isSelected.value = true) : (isSelected.value = false)
    selectedList.value = rowArr
  }

  /**
   * @description 全选操作
   * @param {Array} rowArr 当前全选的所有数据
   * @return void
   */
  const selectAll = (rowArr: AnyKeyValue[]) => {
    rowArr.length ? (isSelected.value = true) : (isSelected.value = false)
    selectedList.value = rowArr
  }

  return {
    isSelected,
    selectedList,
    selectedListIds,
    selectionChange,
    selectAll,
  }
}
