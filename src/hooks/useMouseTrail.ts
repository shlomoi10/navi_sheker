import { useEffect } from 'react'
import { TIMINGS } from '../constants/content'

// High-frequency effect: particles are appended directly to the DOM to avoid a React render per mousemove.
export function useMouseTrail(className: string) {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const glitter = document.createElement('div')
      glitter.className = className
      glitter.style.top = `${e.clientY + 60}px`
      glitter.style.left = `${e.clientX + 40}px`
      document.body.appendChild(glitter)
      setTimeout(() => glitter.remove(), TIMINGS.mouseTrailLifetime)
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [className])
}
