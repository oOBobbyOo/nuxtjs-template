import type { PiniaPlugin } from 'pinia'

export const piniaReset: PiniaPlugin = ({ store }) => {
  const initialState = JSON.parse(JSON.stringify(store.$state))
  store.$reset = () => {
    store.$patch(initialState)
  }
}
