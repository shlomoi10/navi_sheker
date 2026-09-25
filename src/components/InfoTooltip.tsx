import { Info } from 'lucide-react'

interface InfoTooltipProps {
  text: string
}

export function InfoTooltip({ text }: InfoTooltipProps) {
  return (
    <span
      tabIndex={0}
      aria-label={text}
      className="group relative ms-1.5 inline-flex cursor-pointer items-center justify-center rounded-full align-middle text-primary outline-none transition-colors hover:text-primary-hover focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      <Info className="size-[18px]" strokeWidth={2.25} aria-hidden="true" />
      <span
        role="tooltip"
        className="invisible absolute bottom-[calc(100%+10px)] left-1/2 z-1 w-[220px] -translate-x-1/2 translate-y-1 rounded-xl bg-ink px-3 py-2.5 text-sm leading-relaxed font-normal text-white opacity-0 shadow-card transition duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:visible group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
      >
        {text}
      </span>
    </span>
  )
}
