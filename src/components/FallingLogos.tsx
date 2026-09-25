import { createPortal } from 'react-dom'
import type { FallingLogo } from '../hooks/useFallingLogos'

interface FallingLogosProps {
  logos: FallingLogo[]
}

export function FallingLogos({ logos }: FallingLogosProps) {
  return createPortal(
    logos.map(({ id, left, src }) => (
      <div
        key={id}
        className="pointer-events-none absolute z-12 size-[100px] animate-fall bg-contain bg-no-repeat"
        style={{ left: `${left}px`, top: '-50px', backgroundImage: `url('${src}')` }}
      />
    )),
    document.body,
  )
}
