/// <reference types="vite/client" />

declare module '*.glb' {
  const src: string
  export default src
}

declare module 'colorthief'

declare const window: any

declare global {
  interface Window {
    EyeDropper?: any
  }
}
