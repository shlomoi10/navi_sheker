import { useCallback, useRef, useState } from 'react'
import { CELEBRATIONS, type CelebrationVariant } from '../constants/celebration'
import { FALLING_LOGO_COUNT, TIMINGS } from '../constants/content'
import { pickRandom } from '../lib/random'

type ConfettiShape = 'rect' | 'circle' | 'ribbon'

interface DropBase {
  id: number
  left: number
  size: number
  drift: number
  spin: number
  duration: number
}

export interface EmojiDrop extends DropBase {
  kind: 'emoji'
  src: string
}

export interface ConfettiDrop extends DropBase {
  kind: 'confetti'
  color: string
  shape: ConfettiShape
}

export type CelebrationDrop = EmojiDrop | ConfettiDrop

export interface CelebrationBurst {
  id: number
  variant: CelebrationVariant
}

const CONFETTI_SHAPES: ConfettiShape[] = ['rect', 'circle', 'ribbon']
const randomBetween = (min: number, max: number) => min + Math.random() * (max - min)

export function useCelebration() {
  const [drops, setDrops] = useState<CelebrationDrop[]>([])
  const [burst, setBurst] = useState<CelebrationBurst | null>(null)
  const stoppedRef = useRef(false)
  const nextIdRef = useRef(0)

  const start = useCallback((variant: CelebrationVariant) => {
    const theme = CELEBRATIONS[variant]
    setBurst({ id: nextIdRef.current++, variant })

    for (let i = 0; i < FALLING_LOGO_COUNT; i++) {
      setTimeout(() => {
        if (stoppedRef.current) return

        const emoji: EmojiDrop = {
          id: nextIdRef.current++,
          kind: 'emoji',
          src: theme.src,
          left: Math.random() * window.innerWidth,
          size: randomBetween(56, 112),
          drift: randomBetween(-60, 60),
          spin: randomBetween(-45, 45),
          duration: randomBetween(3.4, 4.2),
        }
        const confetti: ConfettiDrop = {
          id: nextIdRef.current++,
          kind: 'confetti',
          color: pickRandom(theme.confetti),
          shape: pickRandom(CONFETTI_SHAPES),
          left: Math.random() * window.innerWidth,
          size: randomBetween(8, 14),
          drift: randomBetween(-140, 140),
          spin: randomBetween(360, 1080) * (Math.random() < 0.5 ? -1 : 1),
          duration: randomBetween(3, 4.2),
        }

        setDrops((prev) => [...prev, emoji, confetti])
        setTimeout(() => {
          setDrops((prev) => prev.filter((drop) => drop.id !== emoji.id && drop.id !== confetti.id))
        }, TIMINGS.fallingLogoLifetime)
      }, i * TIMINGS.fallingLogoInterval)
    }
  }, [])

  const stop = useCallback(() => {
    stoppedRef.current = true
    setDrops([])
    setBurst(null)
  }, [])

  const resume = useCallback(() => {
    stoppedRef.current = false
  }, [])

  return { drops, burst, start, stop, resume }
}
