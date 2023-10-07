import { defineStore } from 'pinia'
import type { Nullable } from '@/typings'
import type { UserInfo } from '@/typings/store'

interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
  }),
  getters: {
    getUserInfo(state): Nullable<UserInfo> {
      return state.userInfo
    },
    getToken(state) {
      return state.token
    },
  },
  actions: {
    setUserInfo(info: UserInfo) {
      this.userInfo = info
    },
    setToken(token: string | undefined) {
      this.token = token || ''
    },
  },
})
