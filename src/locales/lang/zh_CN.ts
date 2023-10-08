import { genMessage } from '../helper'
import type { Recordable } from '@/typings'

const modules = import.meta.glob('./zh-CN/**/*.ts', { eager: true })
export default {
  message: {
    ...genMessage(modules as Recordable<Recordable>, 'zh-CN'),
  },
}
