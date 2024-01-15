import { defineStore } from 'pinia'

const initialThemeState = {}

export const useThemeStore = defineStore('theme', {
  state: () => initialThemeState,
  actions: {},
})
