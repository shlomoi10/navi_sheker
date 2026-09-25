import type { LucideIcon } from 'lucide-react'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'

interface IconCursorOptions {
  size?: number
  color?: string
  outlineColor?: string
  mirror?: boolean
  hotspot?: [x: number, y: number]
}

function getIconPaths(Icon: LucideIcon): string {
  const container = document.createElement('div')
  const root = createRoot(container)
  flushSync(() => root.render(<Icon />))
  const paths = container.querySelector('svg')?.innerHTML ?? ''
  root.unmount()
  return paths
}

export function applyIconCursor(
  Icon: LucideIcon,
  { size = 32, color = '#3b3950', outlineColor = '#ffffff', mirror = false, hotspot = [0, 0] }: IconCursorOptions = {},
) {
  const paths = getIconPaths(Icon)
  const layer = (stroke: string, width: number) =>
    `<g fill="none" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round">${paths}</g>`
  const transform = mirror ? ' transform="matrix(-1 0 0 1 24 0)"' : ''
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">` +
    `<g${transform}>${layer(outlineColor, 4)}${layer(color, 2)}</g></svg>`

  document.body.style.cursor = `url("data:image/svg+xml,${encodeURIComponent(svg)}") ${hotspot[0]} ${hotspot[1]}, auto`
}
