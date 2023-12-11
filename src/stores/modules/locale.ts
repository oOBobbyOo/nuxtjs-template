import { defineStore } from 'pinia'
import type { LocaleSetting, LocaleType } from '@/typings/locale'

import { store } from '@/stores'

import { LOCALE_KEY } from '@/enums/cacheEnum'
import { createLocalStorage } from '@/utils/cache'
import { localeSetting } from '@/setting/localeSetting'

const ls = createLocalStorage()

const lsLocaleSetting = (ls.get(LOCALE_KEY) || localeSetting) as LocaleSetting

interface LocaleState {
  localeInfo: LocaleSetting
}

export const useLocaleStore = defineStore('locale', {
  state: (): LocaleState => ({
    localeInfo: lsLocaleSetting,
  }),
  getters: {
    getShowPicker(state): boolean {
      return !!state.localeInfo?.showPicker
    },
    getLocale(state): LocaleType {
      return state.localeInfo?.locale ?? 'zh_CN'
    },
  },
  actions: {
    /**
     * Set up multilingual information and cache
     * @param info multilingual info
     */
    setLocaleInfo(info: Partial<LocaleSetting>) {
      this.localeInfo = { ...this.localeInfo, ...info }
      ls.set(LOCALE_KEY, this.localeInfo)
    },
    /**
     * Initialize multilingual information and load the existing configuration from the local cache
     */
    initLocale() {
      this.setLocaleInfo({
        ...localeSetting,
        ...this.localeInfo,
      })
    },
  },
})

// Need to be used outside the setup
export function useLocaleStoreWithOut() {
  return useLocaleStore(store)
}
