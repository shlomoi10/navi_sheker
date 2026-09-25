interface AnswerDisplayProps {
  text: string
  isTyping: boolean
  isShown: boolean
}

export function AnswerDisplay({ text, isTyping, isShown }: AnswerDisplayProps) {
  if (!isShown) return null

  return (
    <p
      aria-live="polite"
      className="relative z-11 mx-auto mt-6 w-fit max-w-[min(100%,36rem)] animate-answer-pulse rounded-3xl border border-line bg-white px-6 py-5 text-lg leading-relaxed font-medium shadow-card sm:text-xl"
    >
      {text}
      {isTyping && <span className="ms-0.5 inline-block h-[1em] w-[1.5px] animate-caret bg-ink align-middle" />}
    </p>
  )
}
