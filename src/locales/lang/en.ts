import { genMessage } from '../helper'
import type { Recordable } from '@/typings'

const modules = import.meta.glob('./en/**/*.ts', { eager: true })
export default {
  message: {
    ...genMessage(modules as Recordable<Recordable>, 'en'),
  },
}
