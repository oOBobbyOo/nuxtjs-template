import type { MockMethod } from 'vite-plugin-mock'
import { nanoid } from 'nanoid'
import { requestSuccess } from './_util'

const imgURL = [
  'https://i.imgtg.com/2023/01/16/QRBHS.jpg',
  'https://i.imgtg.com/2023/01/16/QRqMK.jpg',
  'https://i.imgtg.com/2023/01/16/QRa0s.jpg',
  'https://i.imgtg.com/2023/01/16/QR57a.jpg',
]

export default [
  {
    url: '/api/file/upload/img',
    method: 'post',
    response: () => {
      const idx = Math.floor(Math.random() * 4)
      return requestSuccess({
        fileUrl: imgURL[idx],
      })
    },
  },
  {
    url: '/api/file/upload/avatar',
    method: 'post',
    response: ({ body }) => {
      return requestSuccess({
        ...body,
        url: `https://api.multiavatar.com/${nanoid(8)}.png`,
      })
    },
  },
] as MockMethod[]
