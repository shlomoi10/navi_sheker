import { useEffect, useRef } from 'react'

export interface TiltOptions {
  max: number
  speed: number
  easing: string
  reverse?: boolean
  maxGlare?: number
  perspective?: number
  scale?: number
}

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1)

export function useTilt<T extends HTMLElement>({
  max,
  speed,
  easing,
  reverse = false,
  maxGlare = 0,
  perspective = 1000,
  scale = 1,
}: TiltOptions) {
  const elementRef = useRef<T>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return
    const glare = glareRef.current
    const direction = reverse ? -1 : 1
    let rect = element.getBoundingClientRect()
    let frame = 0
    let transitionTimeout: ReturnType<typeof setTimeout> | undefined

    const sizeGlare = () => {
      if (!glare) return
      const size = Math.max(element.offsetWidth, element.offsetHeight) * 2
      glare.style.width = `${size}px`
      glare.style.height = `${size}px`
    }

    const setTransition = () => {
      clearTimeout(transitionTimeout)
      element.style.transition = `${speed}ms ${easing}`
      if (glare) glare.style.transition = `opacity ${speed}ms ${easing}`
      transitionTimeout = setTimeout(() => {
        element.style.transition = ''
        if (glare) glare.style.transition = ''
      }, speed)
    }

    const update = (clientX: number, clientY: number, currentScale: number) => {
      const x = clamp01((clientX - rect.left) / rect.width)
      const y = clamp01((clientY - rect.top) / rect.height)
      const tiltX = (direction * (max - x * max * 2)).toFixed(2)
      const tiltY = (direction * (y * max * 2 - max)).toFixed(2)
      const angle =
        Math.atan2(clientX - (rect.left + rect.width / 2), -(clientY - (rect.top + rect.height / 2))) * (180 / Math.PI)

      element.style.transform =
        `perspective(${perspective}px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) ` +
        `scale3d(${currentScale}, ${currentScale}, ${currentScale})`

      if (glare) {
        glare.style.transform = `rotate(${angle}deg) translate(-50%, -50%)`
        glare.style.opacity = `${y * maxGlare}`
      }
    }

    const handleMouseEnter = () => {
      rect = element.getBoundingClientRect()
      element.style.willChange = 'transform'
      setTransition()
    }

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => update(e.clientX, e.clientY, scale))
    }

    const handleMouseLeave = () => {
      cancelAnimationFrame(frame)
      handleMouseEnter()
      update(rect.left + rect.width / 2, rect.top + rect.height / 2, 1)
      if (glare) {
        glare.style.transform = 'rotate(180deg) translate(-50%, -50%)'
        glare.style.opacity = '0'
      }
    }

    sizeGlare()
    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', sizeGlare)

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(transitionTimeout)
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', sizeGlare)
      element.style.transform = ''
      element.style.transition = ''
      element.style.willChange = ''
    }
  }, [max, speed, easing, reverse, maxGlare, perspective, scale])

  return { elementRef, glareRef }
}
