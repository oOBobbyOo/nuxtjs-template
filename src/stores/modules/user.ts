import { defineStore } from 'pinia'
import type { Nullable } from '@/typings'
import type { UserInfo } from '@/typings/store'
import { TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum'
import { getAuthCache, setAuthCache } from '@/utils/auth'

interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
  lastUpdateTime: number
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(state): Nullable<UserInfo> {
      return state.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {}
    },
    getToken(state): string {
      return state.token || getAuthCache<string>(TOKEN_KEY)
    },
    getLastUpdateTime(state): number {
      return state.lastUpdateTime
    },
  },
  actions: {
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
      setAuthCache(USER_INFO_KEY, info)
    },
    setToken(token: string | undefined) {
      this.token = token || ''
      setAuthCache(TOKEN_KEY, token)
    },
    async resetStore() {
      setAuthCache(USER_INFO_KEY, null)
      setAuthCache(TOKEN_KEY, undefined)
      this.setUserInfo(null)
      this.setToken(undefined)
      this.$reset()
    },
  },
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
