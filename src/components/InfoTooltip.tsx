interface InfoTooltipProps {
  text: string
}

export function InfoTooltip({ text }: InfoTooltipProps) {
  return (
    <span
      tabIndex={0}
      aria-label={text}
      className="group relative ms-1.5 inline-flex size-[18px] cursor-pointer items-center justify-center rounded-full bg-primary-soft align-middle text-xs font-bold text-primary italic outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      i
      <span
        role="tooltip"
        className="invisible absolute bottom-[calc(100%+10px)] left-1/2 z-1 w-[220px] -translate-x-1/2 translate-y-1 rounded-xl bg-ink px-3 py-2.5 text-sm leading-relaxed font-normal text-white not-italic opacity-0 shadow-card transition duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:visible group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
      >
        {text}
      </span>
    </span>
  )
}
