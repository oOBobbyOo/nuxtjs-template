import ExcelJS from 'exceljs'
import { downloadByData } from '.'

const prefix = 'Row_'

async function exportExcel({
  columns: orginColumns = [],
  dataSource = [],
  title = '数据导出',
}: {
  columns: any[]
  dataSource: any[]
  title?: string
}) {
  const workbook = new ExcelJS.Workbook()
  const sheet = workbook.addWorksheet(title)

  // 避免出现非常规的 key, 比如 0
  const columns = orginColumns.map(({ key, ...rest }) => ({
    key: `${prefix}${key}`,
    ...rest,
  }))

  // 添加表头
  sheet.columns = columns

  // 添加数据行
  const rows = dataSource.map(record => calcRow(record, columns))

  sheet.addRows(rows)

  // 转为 buffer
  const buffer = await workbook.xlsx.writeBuffer()

  // 下载
  downloadByData(buffer)
}

// 格式化每行数据
function calcRow(record: any, columns: any[]) {
  const row: any = {}

  for (const { key, excel } of columns) {
    if (typeof excel === 'function')
      row[key] = excel(record)
    else
      row[key] = record[key.slice(prefix.length)] // 转换为原始的 key
  }
  return row
}

export default exportExcel
