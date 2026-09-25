import { useState } from 'react'
import { COMMUNITY_LINKS } from '../constants/content'
import { useTilt } from '../hooks/useTilt'
import { pickRandom } from '../lib/random'
import { MagicWand } from './MagicWand'

const TILT_OPTIONS = {
  max: 10,
  speed: 200,
  easing: 'cubic-bezier(.03,.98,.52,.99)',
  reverse: true,
  maxGlare: 0.1,
}

const TOOLTIP = 'רוצים להיות קוסמים מורשים?'

export function WandCard() {
  const [link] = useState(() => pickRandom(COMMUNITY_LINKS))
  const { elementRef, glareRef } = useTilt<HTMLDivElement>(TILT_OPTIONS)

  return (
    <div ref={elementRef} className="absolute bottom-[30px] left-[30px] z-13 rounded-[20px] transform-3d">
      <div className="absolute top-2.5 left-1.5 z-14 w-15 translate-z-20">
        <a
          href={link}
          target="_blank"
          rel="noopener"
          aria-label={TOOLTIP}
          data-tooltip={TOOLTIP}
          className="hover:after:absolute hover:after:bottom-[calc(100%+18px)] hover:after:left-0 hover:after:rounded-lg hover:after:bg-ink/90 hover:after:px-2.5 hover:after:py-1.5 hover:after:text-xs hover:after:whitespace-nowrap hover:after:text-white hover:after:shadow-soft hover:after:content-[attr(data-tooltip)]"
        >
          <MagicWand className="absolute top-1/2 left-1/2 z-11 [transform:translate(-40%,10%)_scaleX(-1)]" />
        </a>
      </div>
      <div className="relative z-12 size-[100px] rounded-[20px] border border-primary/20 bg-white/55 shadow-soft backdrop-blur-md" />
      <div className="pointer-events-none absolute inset-0 z-13 overflow-hidden rounded-[inherit]">
        <div
          ref={glareRef}
          className="pointer-events-none absolute top-1/2 left-1/2 origin-top-left bg-linear-to-t from-white/0 to-white opacity-0 [transform:rotate(180deg)_translate(-50%,-50%)]"
        />
      </div>
    </div>
  )
}
