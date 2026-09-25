import { ASSETS } from './assets'

export type CelebrationVariant = 'like' | 'laugh'

export interface CelebrationTheme {
  src: string
  glow: string
  ring: string
  confetti: string[]
}

export const CELEBRATIONS: Record<CelebrationVariant, CelebrationTheme> = {
  like: {
    src: ASSETS.likeGif,
    glow: 'rgb(140 126 224 / 32%)',
    ring: 'rgb(140 126 224 / 55%)',
    confetti: ['#8c7ee0', '#b8adf2', '#6fbfa3', '#a7dcc8', '#ffd76a'],
  },
  laugh: {
    src: ASSETS.prophetGif,
    glow: 'rgb(255 196 92 / 34%)',
    ring: 'rgb(255 170 90 / 55%)',
    confetti: ['#ffc94d', '#ffe08a', '#ff9f7a', '#f7b5c8', '#8c7ee0'],
  },
}
