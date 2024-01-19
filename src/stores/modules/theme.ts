import { defineStore } from 'pinia'

const initialThemeState = {
  themeColor: '#646cff',
}

export const useThemeStore = defineStore('theme', {
  state: () => initialThemeState,
  actions: {
    setThemeColor(color: string) {
      this.themeColor = color
    },
  },
})
