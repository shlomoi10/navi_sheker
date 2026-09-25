import type { CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { CELEBRATIONS } from '../constants/celebration'
import type { CelebrationBurst, CelebrationDrop, ConfettiDrop, EmojiDrop } from '../hooks/useCelebration'

interface CelebrationProps {
  burst: CelebrationBurst | null
  drops: CelebrationDrop[]
}

const GRAVITY = 'cubic-bezier(0.45, 0.05, 0.75, 0.6)'

const dropStyle = ({ left, drift, spin, duration }: CelebrationDrop): CSSProperties =>
  ({
    left,
    '--drift': `${drift}px`,
    '--spin': `${spin}deg`,
    animation: `celebration-drop ${duration}s ${GRAVITY} forwards`,
  }) as CSSProperties

function Emoji({ drop }: { drop: EmojiDrop }) {
  const isFar = drop.size < 72

  return (
    <div className="absolute -top-32 will-change-transform" style={dropStyle(drop)}>
      <img
        src={drop.src}
        alt=""
        draggable={false}
        className="block select-none"
        style={{
          width: drop.size,
          height: drop.size,
          opacity: isFar ? 0.8 : 1,
          filter: isFar ? 'blur(0.8px)' : 'drop-shadow(0 12px 16px rgb(59 57 80 / 18%))',
          animation: `celebration-pop 0.45s ease-out, celebration-sway ${1.4 + drop.size / 80}s ease-in-out infinite alternate`,
        }}
      />
    </div>
  )
}

const CONFETTI_SHAPE_CLASS: Record<ConfettiDrop['shape'], string> = {
  rect: 'rounded-[2px]',
  circle: 'rounded-full',
  ribbon: 'rounded-full',
}

function Confetti({ drop }: { drop: ConfettiDrop }) {
  const width = drop.shape === 'ribbon' ? drop.size * 0.4 : drop.size
  const height = drop.shape === 'rect' ? drop.size * 0.55 : drop.shape === 'ribbon' ? drop.size * 1.5 : drop.size

  return (
    <div className="absolute -top-8 will-change-transform" style={dropStyle(drop)}>
      <div
        className={CONFETTI_SHAPE_CLASS[drop.shape]}
        style={{
          width,
          height,
          backgroundColor: drop.color,
          animation: `celebration-flutter ${0.6 + drop.size / 20}s linear infinite`,
        }}
      />
    </div>
  )
}

function Burst({ burst }: { burst: CelebrationBurst }) {
  const theme = CELEBRATIONS[burst.variant]

  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 42%, ${theme.glow}, transparent 60%)`,
          animation: 'celebration-glow 2.2s ease-out forwards',
        }}
      />
      <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2">
        {[0, 0.22].map((delay) => (
          <span
            key={delay}
            className="absolute inset-0 m-auto size-28 rounded-full border-2 opacity-0 sm:size-36"
            style={{ borderColor: theme.ring, animation: `celebration-ring 1.4s ease-out ${delay}s forwards` }}
          />
        ))}
        <img
          src={theme.src}
          alt=""
          draggable={false}
          className="relative size-28 opacity-0 drop-shadow-[0_18px_28px_rgb(59_57_80/22%)] select-none sm:size-36"
          style={{ animation: 'celebration-hero 2.2s cubic-bezier(0.22, 1, 0.36, 1) forwards' }}
        />
      </div>
    </>
  )
}

export function Celebration({ burst, drops }: CelebrationProps) {
  if (!burst && drops.length === 0) return null

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-12 overflow-hidden" aria-hidden="true">
      {burst && <Burst key={burst.id} burst={burst} />}
      {drops.map((drop) =>
        drop.kind === 'emoji' ? <Emoji key={drop.id} drop={drop} /> : <Confetti key={drop.id} drop={drop} />,
      )}
    </div>,
    document.body,
  )
}
