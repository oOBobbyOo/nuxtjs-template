export interface ExampleProps {
  key: string
  title: string
  icon: string
  path: string
  img: string
  description: string
  star: number
  download: number
  fork: number
}

export interface IAddConfettiConfig {
  confettiRadius?: number
  confettiNumber?: number
  confettiColors?: string[]
  emojis?: string[]
  emojiSize?: number
}
