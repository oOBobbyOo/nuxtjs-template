import { locale } from 'dayjs'
import type { LocaleType } from '@/typings/locale'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'

import { LOCALE_KEY } from '@/enums/cacheEnum'
import { ls } from '@/stores/modules/locale'

export function setDayjsLocale(lang?: LocaleType) {
  const localMap = {
    zh_CN: 'zh-cn',
    en: 'en',
  } as Record<LocaleType, string>

  const l: LocaleType = lang || ls.get(LOCALE_KEY)?.locale || 'zh_CN'

  locale(localMap[l])
}
