import type { Params } from '@/typings/api'
import exportExcel from '@/utils/file/excel'
import { isValidArray } from '@/utils/is'

export interface Column {
  key?: string // 字段 key
  header?: string // 字段 标题
  excel?: boolean | Function // 允许导出 Excel 的， 如果有特定的 Excel 导出规则， 则需要自定义
}

interface DownloadProps {
  api: (params: Params) => Promise<any>
  params?: Params
  columns: Column[]
  title?: string
  isNotify?: boolean
}

export async function useDownload({
  api,
  params = {},
  columns,
  isNotify = true,
  title,
}: DownloadProps) {
  if (!isValidArray(columns)) {
    ElNotification({
      title: '温馨提示',
      message: '未配置数据导出的列!',
      type: 'warning',
      duration: 1000,
    })
    return
  }

  if (isNotify) {
    ElNotification({
      title: '温馨提示',
      message: '如果数据庞大会导致下载缓慢哦，请您耐心等待！😄',
      type: 'warning',
      duration: 3000,
    })
  }

  try {
    const { list: dataSource } = await api(params)

    // 触发下载导出文件
    exportExcel({
      dataSource,
      columns,
      title,
    })
  }
  catch (error) {
    console.log('>>: error', error)
    ElNotification({
      title: '温馨提示',
      message: '下载失败，请稍后重试！😭',
      type: 'error',
      duration: 3000,
    })
  }
}
