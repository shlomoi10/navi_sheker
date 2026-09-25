import { useCallback, useRef, useState } from 'react'
import { FALLING_LOGO_COUNT, TIMINGS } from '../constants/content'

export interface FallingLogo {
  id: number
  left: number
  src: string
}

export function useFallingLogos() {
  const [logos, setLogos] = useState<FallingLogo[]>([])
  const stoppedRef = useRef(false)
  const nextIdRef = useRef(0)

  const start = useCallback((src: string) => {
    for (let i = 0; i < FALLING_LOGO_COUNT; i++) {
      setTimeout(() => {
        if (stoppedRef.current) return

        const id = nextIdRef.current++
        setLogos((prev) => [...prev, { id, left: Math.random() * window.innerWidth, src }])
        setTimeout(() => {
          setLogos((prev) => prev.filter((logo) => logo.id !== id))
        }, TIMINGS.fallingLogoLifetime)
      }, i * TIMINGS.fallingLogoInterval)
    }
  }, [])

  const stop = useCallback(() => {
    stoppedRef.current = true
    setLogos([])
  }, [])

  const resume = useCallback(() => {
    stoppedRef.current = false
  }, [])

  return { logos, start, stop, resume }
}
