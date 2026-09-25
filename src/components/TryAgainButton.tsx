import type { RefObject } from 'react'

interface TryAgainButtonProps {
  ref: RefObject<HTMLButtonElement | null>
  visible: boolean
  onClick: () => void
}

export function TryAgainButton({ ref, visible, onClick }: TryAgainButtonProps) {
  if (!visible) return null

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className="relative z-11 mx-auto my-6 block rounded-full bg-mint px-6 py-3 font-input font-semibold text-white shadow-[0_8px_20px_rgb(111_191_163/35%)] transition hover:-translate-y-px hover:bg-mint-hover"
    >
      רוצים לנסות שוב?
    </button>
  )
}
